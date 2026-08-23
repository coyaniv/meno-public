/**
 * Shared auth + helpers for every download-attribution source.
 *
 * No npm deps: Google service accounts are signed with RS256 and App Store
 * Connect with ES256, both via Node's built-in crypto.
 *
 * Credential locations are resolved here and NOWHERE else, so there is exactly
 * one file to edit when a key moves. See README.md for what each one unlocks.
 */
import { readFileSync, existsSync } from "fs";
import { createSign } from "crypto";
import { homedir } from "os";

export const CONFIG = {
  // ---- identity ----
  appleAppId: "6759288559",
  androidPackage: "health.menoapp.android",
  bundleId: "com.herahealth.app",
  site: "sc-domain:menoapp.health",
  ga4Property: "535480918",
  productionHost: "menoapp.health",

  // ---- credentials ----
  // Google service account. Shared with kupotguide; has GSC + GA4 read on the
  // "Yaniv Projects" GA account. Add it to any new property as a Viewer.
  googleServiceAccount:
    process.env.GSC_SA_PATH ||
    `${homedir()}/Documents/workspace/kupotisrael-agents/secrets/gsc-service-account.json`,
  googleServiceAccountEmail: "calude-test-sa@kupotguide.iam.gserviceaccount.com",

  // App Store Connect API key.
  //
  // Deliberately NOT the key manfuza-ios/scripts/asc.py uses ("Meno CLI Upload",
  // R5F372BA7R, App Manager). That one only uploads builds and edits metadata,
  // and App Manager is the right ceiling for it. Analytics reports need Admin,
  // and Apple cannot widen an existing key — so this is a second, separate key
  // whose only job is reading reports.
  appleKeyId: process.env.ASC_KEY_ID || "2JSB283ATJ",
  appleKeyPath:
    process.env.ASC_KEY_PATH ||
    `${homedir()}/.appstoreconnect/private_keys/AuthKey_${process.env.ASC_KEY_ID || "2JSB283ATJ"}.p8`,
  appleIssuerPath: `${homedir()}/.appstoreconnect/private_keys/issuer_id.txt`,

  // Sales & Trends vendor number. Unlike everything else here it has no API to
  // discover it — read it off App Store Connect -> Payments and Financial
  // Reports (shown as "Vendor #", 8-9 digits). Worth filling in: salesReports
  // returns full download history immediately, with none of the 48h wait or the
  // no-backfill limit that App Analytics reports carry.
  appleVendorNumber: process.env.ASC_VENDOR_NUMBER || "93666473",

  // Google Play exports its reports to this GCS bucket. Rather than a dedicated
  // key, the same Google service account above reads it — Play grants access by
  // inviting that account's email as a Play Console user, so no second key
  // needs to exist or be rotated.
  playServiceAccount: process.env.PLAY_SA_PATH || null, // null => reuse googleServiceAccount
  playBucket: process.env.PLAY_BUCKET || "pubsite_prod_5535419445433234631",
};

const b64url = (d) => Buffer.from(d).toString("base64url");

/** OAuth access token for a Google service account. */
export async function googleToken(scope, keyPath = CONFIG.googleServiceAccount) {
  if (!existsSync(keyPath)) throw new Error(`missing Google key: ${keyPath}`);
  const sa = JSON.parse(readFileSync(keyPath, "utf8"));
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  const assertion = `${header}.${payload}.${signer.sign(sa.private_key, "base64url")}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Google token failed: ${JSON.stringify(json)}`);
  return json.access_token;
}

/**
 * App Store Connect JWT. Note the missing `scope` claim — including one pins the
 * token to a single path and every other request 403s with
 * REQUEST_DOES_NOT_MATCH_SCOPE, which is easy to mistake for a permission problem.
 */
export function appleToken(ttl = 1200) {
  const key = readFileSync(CONFIG.appleKeyPath, "utf8");
  const issuer = readFileSync(CONFIG.appleIssuerPath, "utf8").trim();
  const header = b64url(JSON.stringify({ alg: "ES256", kid: CONFIG.appleKeyId, typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(
    JSON.stringify({ iss: issuer, iat: now, exp: now + ttl, aud: "appstoreconnect-v1" })
  );
  const signer = createSign("SHA256");
  signer.update(`${header}.${payload}`);
  const sig = signer.sign({ key, dsaEncoding: "ieee-p1363" }).toString("base64url");
  return `${header}.${payload}.${sig}`;
}

export async function appleApi(path, { method = "GET", body } = {}) {
  const url = path.startsWith("http") ? path : `https://api.appstoreconnect.apple.com${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${appleToken()}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* non-JSON error body */ }
  return { status: res.status, ok: res.ok, json, text };
}

/** Run a GA4 report against the marketing site's property. */
export async function ga4(body) {
  const token = await googleToken("https://www.googleapis.com/auth/analytics.readonly");
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${CONFIG.ga4Property}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

/** Search Console rows for one dimension. */
export async function gsc({ days = 28, dimension = "query", limit = 50 }) {
  const token = await googleToken("https://www.googleapis.com/auth/webmasters.readonly");
  // GSC data lags ~3 days; asking for today returns an empty tail.
  const end = new Date(Date.now() - 3 * 864e5);
  const start = new Date(end.getTime() - days * 864e5);
  const iso = (d) => d.toISOString().slice(0, 10);
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(CONFIG.site)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: iso(start),
        endDate: iso(end),
        dimensions: [dimension],
        rowLimit: limit,
      }),
    }
  );
  return res.json();
}

/** Only count traffic on the real domain — the GA tag also fires on previews. */
export const PRODUCTION_ONLY = {
  filter: {
    fieldName: "hostName",
    stringFilter: { matchType: "CONTAINS", value: CONFIG.productionHost },
  },
};

export function table(rows, headers) {
  if (!rows.length) return "  (no rows)";
  // Pad ragged rows — a row shorter than the header would otherwise throw here.
  const all = [headers, ...rows].map((r) =>
    headers.map((_, i) => String(r[i] ?? ""))
  );
  const widths = headers.map((_, i) => Math.max(...all.map((r) => r[i].length)));
  const line = (r) => "  " + r.map((c, i) => c.padEnd(widths[i])).join("  ");
  return [line(all[0]), "  " + widths.map((w) => "-".repeat(w)).join("  "), ...all.slice(1).map(line)].join("\n");
}
