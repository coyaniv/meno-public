/**
 * Where Meno sits in Israeli App Store search.
 *
 * Uses the public iTunes Search API against the IL storefront. That index is a
 * close cousin of the App Store's own search, not the same thing — treat a
 * position here as strong evidence, not proof. Apple rate-limits aggressively,
 * so terms are spaced out; running the whole list takes about a minute.
 */
import { CONFIG, table } from "./lib.mjs";

const TERMS = [
  "גיל המעבר",
  "מנופאוזה",
  "פרימנופאוזה",
  "גלי חום",
  "טיפול הורמונלי",
  "מעקב מחזור",
  "בריאות האישה",
  "menopause",
  "meno",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const rows = [];
for (const term of TERMS) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=il&entity=software&limit=50`;
  const res = await fetch(url, { headers: { "Accept-Encoding": "gzip" } });
  let results = [];
  try { results = (await res.json()).results || []; } catch { /* rate limited */ }
  const idx = results.findIndex((a) => String(a.trackId) === CONFIG.appleAppId);
  rows.push([
    term,
    results.length ? String(results.length) : "rate-limited",
    idx >= 0 ? `#${idx + 1}` : results.length ? "not in top 50" : "-",
    results[0]?.trackName?.slice(0, 28) || "",
  ]);
  await sleep(20_000);
}
console.log(table(rows, ["search term", "results", "Meno rank", "#1 result"]));
