/**
 * The download-attribution report: every source in one place, each one either
 * showing its numbers or saying exactly why it cannot.
 *
 *   node report.mjs [days]     default 30
 *
 * Reading it: the website's store clicks are an upper bound on how many
 * downloads the web channel could possibly have caused. Any gap between that
 * and real installs is store search, store browse, or word of mouth — and only
 * the Apple/Play sections below can tell those apart.
 */
import { CONFIG, ga4, gsc, table, PRODUCTION_ONLY } from "./lib.mjs";

const days = Number(process.argv[2] || 30);
const range = [{ startDate: `${days}daysAgo`, endDate: "today" }];
const rows = (r) => (r.rows || []).map((x) => [
  ...(x.dimensionValues || []).map((v) => v.value),
  ...(x.metricValues || []).map((v) => v.value),
]);

console.log(`\n${"=".repeat(64)}\nMENO — WHERE DOWNLOADS COME FROM — last ${days} days\n${"=".repeat(64)}`);

// ---------- 1. the website ----------
console.log(`\n[1] WEBSITE -> STORE  (menoapp.health, the only part we fully control)\n`);

// Event names changed when the landing page was rebuilt: the old build emitted
// click_*_download_section, the new one emits store_click with a store param.
// Both are counted so the series does not appear to collapse on deploy day.
const storeClicks = await ga4({
  dateRanges: range,
  dimensions: [{ name: "eventName" }, { name: "sessionSourceMedium" }],
  metrics: [{ name: "eventCount" }],
  dimensionFilter: {
    andGroup: {
      expressions: [
        PRODUCTION_ONLY,
        { filter: { fieldName: "eventName", inListFilter: { values: [
          "store_click",
          "click_app_store_download_section",
          "click_google_play_download_section",
        ] } } },
      ],
    },
  },
  orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  limit: 50,
});
const clickRows = rows(storeClicks);
const totalClicks = clickRows.reduce((n, r) => n + Number(r[2]), 0);
console.log(table(clickRows, ["event", "source / medium", "clicks"]));
console.log(`\n  Ceiling on web-driven downloads: ${totalClicks} in ${days} days (${(totalClicks / days).toFixed(2)}/day).`);

console.log(`\n[2] WHO REACHES THE SITE AT ALL\n`);
console.log(table(rows(await ga4({
  dateRanges: range,
  dimensions: [{ name: "sessionSourceMedium" }, { name: "sessionCampaignName" }],
  metrics: [{ name: "sessions" }],
  dimensionFilter: PRODUCTION_ONLY,
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 20,
})), ["source / medium", "campaign", "sessions"]));

console.log(`\n[3] GOOGLE SEARCH -> SITE  (Search Console, ${days}d, lags 3 days)\n`);
const queries = await gsc({ days, dimension: "query", limit: 25 });
console.log(table(
  (queries.rows || []).map((r) => [
    r.keys[0], r.clicks, r.impressions, `${(r.ctr * 100).toFixed(1)}%`, r.position.toFixed(1),
  ]),
  ["query", "clicks", "impr", "ctr", "pos"]
));
console.log(`\n  Google hides low-volume queries, so a short list here means low volume,\n  not a broken integration.`);

// ---------- 4 & 5. the stores ----------
console.log(`\n[4] iOS DOWNLOADS BY SOURCE\n`);
const { execSync } = await import("child_process");
const here = new URL(".", import.meta.url).pathname;
for (const [label, script, arg] of [["iOS", "apple.mjs", "sources"], ["Android", "play.mjs", "installs"]]) {
  if (label === "Android") console.log(`\n[5] ANDROID DOWNLOADS BY SOURCE\n`);
  try {
    console.log(execSync(`node ${here}${script} ${arg}`, { encoding: "utf8" }));
  } catch (e) {
    console.log(`  ${label} unavailable: ${e.message}`);
  }
}

console.log(`\n[6] THE CHANNEL NO TOOL CAN SEE\n`);
console.log(`  A woman told about Meno by her gynecologist searches the store by name and
  installs. Every system above records that as store search. The only way to
  separate it is an in-app "how did you hear about us?" at onboarding — which,
  given the B2B2C model, is the single most valuable number missing here.\n`);
