/**
 * iOS downloads by source, from App Store Connect.
 *
 * The report that answers "where do downloads come from" is
 * APP_STORE_ENGAGEMENT → "App Store Discovery and Engagement", whose Source Type
 * column splits into App Store Search / App Store Browse / App Referrer /
 * Web Referrer / Institutional Purchase. Apple only generates it on request:
 * you POST an ONGOING analyticsReportRequest once, then instances appear daily
 * from that point forward — it does NOT backfill history, so the sooner the
 * request exists the sooner the data starts.
 *
 * Usage:
 *   node apple.mjs status     probe what the API key is allowed to do
 *   node apple.mjs enable     create the ONGOING request (one time, safe to repeat)
 *   node apple.mjs sources    print downloads by source type
 */
import { appleApi, appleToken, CONFIG, table } from "./lib.mjs";

const PERMISSION_HINT = `
  The API key ${CONFIG.appleKeyId} does not carry the Analytics role.

  Apple cannot widen an existing key ("can't be modified to access more services
  once created"), so this needs a SECOND key rather than a change to the first:

    App Store Connect -> Users and Access -> Integrations ->
    App Store Connect API -> Team Keys -> (+) -> Access: Admin

  Download the .p8 once (Apple never shows it again), drop it in
  ~/.appstoreconnect/private_keys/, and set the new key id in CONFIG.appleKeyId
  in lib.mjs. Leave the build/upload key alone — narrower is correct for it.`;

async function status() {
  const checks = [
    ["app metadata", `/v1/apps/${CONFIG.appleAppId}`],
    ["analytics reports", `/v1/apps/${CONFIG.appleAppId}/analyticsReportRequests?limit=1`],
    ["sales reports", `/v1/salesReports?filter[frequency]=DAILY&filter[reportSubType]=SUMMARY&filter[reportType]=SALES&filter[vendorNumber]=0&filter[reportDate]=2026-01-01`],
  ];
  const rows = [];
  for (const [name, path] of checks) {
    const r = await appleApi(path);
    // 400 means the request reached the handler, so the key is authorized here.
    const verdict = r.ok ? "OK" : r.status === 403 ? "FORBIDDEN (role too low)" : `HTTP ${r.status} (reachable)`;
    rows.push([name, verdict]);
  }
  console.log(table(rows, ["capability", "status"]));
  if (rows.some((r) => r[1].startsWith("FORBIDDEN"))) console.log(PERMISSION_HINT);
}

async function enable() {
  const existing = await appleApi(`/v1/apps/${CONFIG.appleAppId}/analyticsReportRequests?limit=50`);
  if (existing.status === 403) return console.log("Cannot read report requests." + PERMISSION_HINT);
  const ongoing = (existing.json?.data || []).find((d) => d.attributes?.accessType === "ONGOING");
  if (ongoing) return console.log(`ONGOING request already exists: ${ongoing.id}`);

  // accessType is the ONLY writable attribute here — sending a `name` gets the
  // whole request rejected with ENTITY_ERROR.ATTRIBUTE.UNKNOWN.
  const res = await fetch("https://api.appstoreconnect.apple.com/v1/analyticsReportRequests", {
    method: "POST",
    headers: { Authorization: `Bearer ${appleToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        type: "analyticsReportRequests",
        attributes: { accessType: "ONGOING" },
        relationships: { app: { data: { type: "apps", id: CONFIG.appleAppId } } },
      },
    }),
  });
  const text = await res.text();
  if (!res.ok) return console.log(`Failed (HTTP ${res.status}):\n${text}`);
  console.log(`Created: ${JSON.parse(text).data?.id}`);
  console.log("Apple produces the first daily instance within ~48h, and does not backfill.");
}

/** The ONGOING request id, discovered once and reused by the readers below. */
async function ongoingRequest() {
  const reqs = await appleApi(`/v1/apps/${CONFIG.appleAppId}/analyticsReportRequests?limit=50`);
  if (reqs.status === 403) { console.log("Blocked." + PERMISSION_HINT); return null; }
  const req = (reqs.json?.data || []).find((d) => d.attributes?.accessType === "ONGOING");
  if (!req) console.log("No ONGOING report request yet. Run: node apple.mjs enable");
  return req || null;
}

async function reports() {
  const req = await ongoingRequest();
  if (!req) return;
  const res = await appleApi(`/v1/analyticsReportRequests/${req.id}/reports?limit=200`);
  const rows = (res.json?.data || [])
    .map((r) => [r.attributes?.category, r.attributes?.name])
    .sort();
  console.log(table(rows, ["category", "report"]));
}

/**
 * Fetch one report's most recent daily instance as parsed rows.
 * Apple serves each instance as one or more gzipped, tab-separated segments.
 */
async function fetchReport(name) {
  const req = await ongoingRequest();
  if (!req) return null;

  const res = await appleApi(`/v1/analyticsReportRequests/${req.id}/reports?limit=200`);
  const report = (res.json?.data || []).find((r) => r.attributes?.name === name);
  if (!report) { console.log(`Report "${name}" not offered for this app.`); return null; }

  const instances = await appleApi(
    `/v1/analyticsReports/${report.id}/instances?filter[granularity]=DAILY&limit=1`
  );
  const latest = instances.json?.data?.[0];
  if (!latest) {
    console.log(`"${name}" has no instances yet — Apple needs up to 48h after the`);
    console.log(`report request was created, and does not backfill earlier days.`);
    return null;
  }

  const segments = await appleApi(`/v1/analyticsReportInstances/${latest.id}/segments`);
  const { gunzipSync } = await import("zlib");
  const rows = [];
  let header = null;
  for (const seg of segments.json?.data || []) {
    const buf = Buffer.from(await (await fetch(seg.attributes.url)).arrayBuffer());
    const lines = gunzipSync(buf).toString("utf8").trim().split("\n");
    const cols = lines[0].split("\t");
    header = header || cols;
    for (const line of lines.slice(1)) {
      const cells = line.split("\t");
      rows.push(Object.fromEntries(cols.map((c, i) => [c, cells[i]])));
    }
  }
  return { date: latest.attributes?.processingDate, header, rows };
}

/** Sum a numeric column grouped by one or more dimension columns. */
function pivot(rows, dims, metric) {
  const totals = new Map();
  for (const r of rows) {
    const key = dims.map((d) => r[d] ?? "").join(" | ");
    totals.set(key, (totals.get(key) || 0) + Number(r[metric] || 0));
  }
  const sorted = [...totals].sort((a, b) => b[1] - a[1]);
  const sum = sorted.reduce((n, [, v]) => n + v, 0) || 1;
  return sorted.map(([k, v]) => [...k.split(" | "), v, `${((v / sum) * 100).toFixed(1)}%`]);
}

async function sources() {
  const data = await fetchReport("App Downloads Detailed");
  if (!data) return;
  const metric = data.header.find((h) => /^counts$/i.test(h)) || "Counts";
  console.log(`iOS downloads by source — ${data.date}\n`);
  console.log(table(pivot(data.rows, ["Source Type"], metric), ["source type", "downloads", "share"]));
  console.log(`\nBy source detail (search terms are NOT included — Apple never exposes them):\n`);
  console.log(table(
    pivot(data.rows, ["Source Type", "Source Info", "Campaign"], metric).slice(0, 20),
    ["source type", "source info", "campaign", "downloads", "share"]
  ));
}

/**
 * Daily iOS units from Sales & Trends. This is the fast path: it has history
 * back to launch and needs no report request, but it counts units only — no
 * source breakdown. Use it for "how many", use sources() for "from where".
 */
async function downloads() {
  if (!CONFIG.appleVendorNumber) {
    return console.log(`No vendor number set.
  Find it in App Store Connect -> Payments and Financial Reports (top of the
  page, "Vendor #"), then set CONFIG.appleVendorNumber in lib.mjs.`);
  }
  const { gunzipSync } = await import("zlib");
  const totals = [];
  for (let back = 1; back <= 35; back++) {
    const day = new Date(Date.now() - back * 864e5).toISOString().slice(0, 10);
    const q = new URLSearchParams({
      "filter[frequency]": "DAILY",
      "filter[reportSubType]": "SUMMARY",
      "filter[reportType]": "SALES",
      "filter[vendorNumber]": CONFIG.appleVendorNumber,
      "filter[reportDate]": day,
    });
    const res = await fetch(`https://api.appstoreconnect.apple.com/v1/salesReports?${q}`, {
      headers: { Authorization: `Bearer ${appleToken()}`, Accept: "application/a-gzip" },
    });
    if (!res.ok) continue; // Apple 404s days with no sales at all
    const tsv = gunzipSync(Buffer.from(await res.arrayBuffer())).toString("utf8");
    const lines = tsv.trim().split("\n");
    const cols = lines[0].split("\t");
    const iUnits = cols.indexOf("Units");
    const iType = cols.indexOf("Product Type Identifier");
    // Product type 1/1F/1T = first-time install; 7/7F = update, which must not
    // be counted as a download.
    const units = lines.slice(1).reduce((n, l) => {
      const c = l.split("\t");
      return /^1/.test(c[iType] || "") ? n + Number(c[iUnits] || 0) : n;
    }, 0);
    totals.push([day, units]);
  }
  totals.reverse();
  const sum = totals.reduce((n, [, v]) => n + v, 0);
  console.log(table(totals, ["date", "iOS downloads"]));
  console.log(`\n  ${sum} downloads over ${totals.length} days with data (${(sum / 35).toFixed(2)}/day).`);
}

const commands = { status, enable, reports, sources, downloads };
const cmd = process.argv[2] || "status";
if (commands[cmd]) await commands[cmd]();
else console.log("commands: status | enable | reports | sources | downloads");
