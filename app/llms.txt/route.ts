import { ARTICLES, CLUSTERS } from "../guide/articles";

export const dynamic = "force-static";

/**
 * llms.txt, generated from the same source as the sitemap.
 *
 * The previous version was a static file in public/ and had drifted badly: it
 * listed 9 of 18 guides, and every one of the nine it omitted was a
 * physician-reviewed article. A file whose whole purpose is presenting the
 * content to answer engines was showing only the weakest half of it.
 */
const BASE = "https://menoapp.health";

export function GET() {
  const reviewed = ARTICLES.filter((a) => a.reviewedDate);
  const byCluster = CLUSTERS.map((c) => ({
    cluster: c,
    items: ARTICLES.filter((a) => a.cluster === c.id),
  }));

  const body = `# Meno (menoapp.health)

> Meno is a Hebrew-language mobile app (iOS + Android) for tracking menopause and
> perimenopause symptoms — hot flashes, sleep, mood, periods and bleeding,
> medications, HRT and supplements — so women in Israel can spot patterns over time
> and arrive at doctor appointments with organized data instead of vague recall.
> Meno is a tracking tool, not a diagnostic or treatment tool.

Key facts:
- Name: Meno (מנו)
- Website: ${BASE}/ (Hebrew, RTL)
- Platforms: iPhone (App Store), Android (Google Play); free
- Audience: Hebrew-speaking women in perimenopause and menopause, in Israel
- Medical guidance: Dr. Zehavi Horowitz-Kugler — https://drzehavi.com/
- Guides: ${ARTICLES.length} total, ${reviewed.length} physician-reviewed

## Main pages

- [Home](${BASE}/): what Meno tracks and why.
- [Guides index](${BASE}/guide): practical Hebrew guides on menopause and perimenopause.
- [Self-assessment quiz](${BASE}/quiz): symptom questionnaire with a personal summary.
- [For clinicians](${BASE}/for-clinicians): the clinician-facing view of a patient's tracking.
- [Support](${BASE}/support) · [Privacy](${BASE}/privacy)

${byCluster
  .map(
    ({ cluster, items }) => `## ${cluster.title}

${cluster.description}

${items
  .map(
    (a) =>
      `- [${a.title}](${BASE}/guide/${a.slug})${a.reviewedDate ? " — physician-reviewed" : ""}: ${a.metaDescription}`
  )
  .join("\n")}`
  )
  .join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
