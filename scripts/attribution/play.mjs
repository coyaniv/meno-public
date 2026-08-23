/**
 * Android downloads by source, from Google Play.
 *
 * There is no Play API for acquisition data. Play Console instead exports CSVs
 * to a Google Cloud Storage bucket named pubsite_prod_rev_<developer-id>, and a
 * service account with Storage Object Viewer can read them. The file that
 * answers "where do downloads come from" is:
 *
 *   stats/store_performance/store_performance_<package>_<YYYYMM>_country.csv
 *   stats/installs/installs_<package>_<YYYYMM>_overview.csv
 *
 * Play is the only one of the two stores that exposes the actual SEARCH TERMS
 * people typed — but only in the Console UI (Grow -> Store presence -> Store
 * listing acquisition -> Google Play search -> search terms), never in the export.
 * That page has to be read by hand; everything else here is automatable.
 *
 * Usage:
 *   node play.mjs status      check whether credentials + bucket are wired up
 *   node play.mjs list        list available report files
 *   node play.mjs installs    print daily installs by acquisition channel
 */
import { existsSync } from "fs";
import { CONFIG, googleToken, table } from "./lib.mjs";

const SETUP = `
  The bucket is configured but this account cannot read it yet.

  Play grants bucket access through Play Console, not through Google Cloud IAM:
    Play Console -> Users and permissions -> Invite new users
    Email: ${CONFIG.googleServiceAccountEmail}
    App permissions -> Meno -> "View app information and download bulk reports"

  That is the same service account already used for GA4 and Search Console, so
  there is no second key to create, store, or rotate.`;

function keyPath() {
  return CONFIG.playServiceAccount || CONFIG.googleServiceAccount;
}

function ready() {
  return existsSync(keyPath()) && Boolean(CONFIG.playBucket);
}

async function gcs(path, params = {}) {
  const token = await googleToken(
    "https://www.googleapis.com/auth/devstorage.read_only",
    keyPath()
  );
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(
    `https://storage.googleapis.com/storage/v1/b/${CONFIG.playBucket}/${path}${qs ? `?${qs}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res;
}

async function status() {
  const rows = [
    ["service account key", existsSync(keyPath()) ? keyPath().split("/").pop() : "MISSING"],
    ["reports bucket", CONFIG.playBucket || "MISSING"],
  ];
  if (ready()) {
    const res = await gcs("o", { maxResults: "1", prefix: "stats/" });
    rows.push(["bucket read access", res.ok ? "OK" : `HTTP ${res.status}`]);
  }
  console.log(table(rows, ["capability", "status"]));
  if (!ready()) console.log(SETUP);
}

async function list() {
  if (!ready()) return console.log(SETUP);
  const res = await gcs("o", { prefix: `stats/`, maxResults: "200" });
  const json = await res.json();
  for (const o of json.items || []) console.log(` ${o.name}  (${o.size} bytes)`);
}

async function installs() {
  if (!ready()) return console.log(SETUP);
  const month = new Date().toISOString().slice(0, 7).replace("-", "");
  const object = `stats/installs/installs_${CONFIG.androidPackage}_${month}_overview.csv`;
  const res = await gcs(`o/${encodeURIComponent(object)}`, { alt: "media" });
  if (!res.ok) return console.log(`Could not read ${object} (HTTP ${res.status})`);
  // Play writes these as UTF-16LE with a BOM, which trips a naive utf8 read.
  const csv = Buffer.from(await res.arrayBuffer()).toString("utf16le").replace(/^﻿/, "");
  const [head, ...rows] = csv.trim().split(/\r?\n/);
  const cols = head.split(",");
  const iDate = cols.indexOf("Date");
  const iInstalls = cols.findIndex((c) => /Daily Device Installs/i.test(c));
  console.log(table(
    rows.slice(-30).map((r) => { const c = r.split(","); return [c[iDate], c[iInstalls]]; }),
    ["date", "installs"]
  ));
}

const commands = { status, list, installs };
const cmd = process.argv[2] || "status";
if (commands[cmd]) await commands[cmd]();
else console.log("commands: status | list | installs");
