import { ARTICLES } from "../guide/articles";

export const dynamic = "force-static";

/**
 * The guides as structured JSON, for the mobile apps to render natively.
 *
 * The app shows a guide when the advisor cites one. Opening the website for
 * that drops her out of the conversation into a browser; rendering the same
 * content in SwiftUI keeps her in place, and gets RTL, Dynamic Type and the
 * app's own typography for free.
 *
 * Served from here rather than bundled into the app so that fixing a sentence
 * in a guide is a site deploy, not an App Store release. This file is the
 * contract that makes that true — it ships as a static asset alongside the
 * pages, generated from the same `articles.ts` the site renders from, so the
 * two can never disagree.
 *
 * Reviewed guides only, matching what the app is allowed to cite. `published`
 * is already enforced by ARTICLES; `reviewedDate` is the clinical sign-off, and
 * a guide without one must not reach a user through the app.
 */
export function GET() {
  const reviewed = ARTICLES.filter((a) => a.reviewedDate);

  // Lets the app skip the download when nothing has changed. The newest
  // dateModified across the set is enough: any edit moves one of them.
  const version = reviewed
    .map((a) => a.dateModified)
    .sort()
    .at(-1) ?? "";

  const body = {
    version,
    count: reviewed.length,
    guides: reviewed.map((a) => ({
      slug: a.slug,
      title: a.title,
      summary: a.metaDescription,
      cluster: a.cluster,
      reviewedDate: a.reviewedDate,
      dateModified: a.dateModified,
      intro: a.intro,
      sections: a.sections.map((s) => ({
        h2: s.h2,
        paragraphs: s.paragraphs ?? [],
        bullets: s.bullets ?? [],
        afterBullets: s.afterBullets ?? [],
      })),
      takeaway: a.takeaway,
      faq: a.faq ?? [],
    })),
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Short enough that a correction is live within the hour, long enough
      // that opening five guides in a session is one request.
      "Cache-Control": "public, max-age=900, stale-while-revalidate=86400",
    },
  });
}
