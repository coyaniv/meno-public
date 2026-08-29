import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, CLUSTERS, RENDERABLE_ARTICLES, getArticle } from "../articles";
import { PHYSICIAN } from "../../shared";
import { SiteHeader, SiteFooter } from "../../site-chrome";

export function generateStaticParams() {
  return RENDERABLE_ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/guide/${article.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${article.metaTitle} · Meno`,
      description: article.metaDescription,
      url: `/guide/${article.slug}`,
      type: "article",
      locale: "he_IL",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  // MedicalWebPage rather than Article: this is health content, and the type is
  // what tells Google to expect a named clinical reviewer. `reviewedBy` +
  // `lastReviewed` are the E-E-A-T signals that matter on a YMYL page — but only
  // for articles a clinician actually reviewed, which is why they are emitted
  // conditionally instead of stamped on everything.
  const reviewed = Boolean(article.reviewedDate);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": reviewed ? "MedicalWebPage" : "Article",
    headline: article.title,
    description: article.metaDescription,
    inLanguage: "he",
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: `https://menoapp.health/guide/${article.slug}`,
    image: "https://menoapp.health/og-image.png",
    author: { "@type": "Organization", name: "Meno", url: "https://menoapp.health/" },
    publisher: {
      "@type": "Organization",
      name: "Meno",
      logo: { "@type": "ImageObject", url: "https://menoapp.health/logo.png" },
    },
    ...(reviewed
      ? { reviewedBy: PHYSICIAN, lastReviewed: article.reviewedDate }
      : {}),
  };

  const faqJsonLd = article.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "he",
        mainEntity: article.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null;

  const cluster = CLUSTERS.find((c) => c.id === article.cluster);
  const siblings = ARTICLES.filter(
    (a) => a.cluster === article.cluster && a.slug !== article.slug
  ).slice(0, 4);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Meno", item: "https://menoapp.health/" },
      { "@type": "ListItem", position: 2, name: "מדריכים", item: "https://menoapp.health/guide" },
      ...(cluster
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: cluster.title,
              item: `https://menoapp.health/guide/topic/${cluster.id}`,
            },
            { "@type": "ListItem", position: 4, name: article.title },
          ]
        : [{ "@type": "ListItem", position: 3, name: article.title }]),
    ],
  };

  const related = siblings;

  return (
    <div className="lp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <SiteHeader />

      <main>
        <article className="lp-section">
          <div className="lp-container lp-article">
            <nav className="lp-breadcrumbs" aria-label="פירורי לחם">
              <Link href="/">Meno</Link>
              <span aria-hidden="true"> › </span>
              <Link href="/guide">מדריכים</Link>
              {cluster && (
                <>
                  <span aria-hidden="true"> › </span>
                  <Link href={`/guide/topic/${cluster.id}`}>{cluster.title}</Link>
                </>
              )}
            </nav>

            <h1>{article.title}</h1>

            {article.intro.map((p, i) => (
              <p key={i} className="lp-article-lead">
                {p}
              </p>
            ))}

            {article.sections.map((section, i) => (
              <section key={i}>
                <h2>{section.h2}</h2>
                {section.paragraphs?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {section.bullets && (
                  <ul className="lp-bullets">
                    {section.bullets.map((b, j) => (
                      <li key={j}>
                        <span className="lp-check">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.afterBullets?.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            ))}

            {article.faq && (
              <section>
                <h2>שאלות נפוצות</h2>
                <div className="lp-faq">
                  {article.faq.map(({ q, a }, i) => (
                    <details key={i} className="lp-faq-item">
                      <summary>
                        <span className="lp-faq-q">{q}</span>
                        <span className="lp-faq-icon" aria-hidden="true" />
                      </summary>
                      <div className="lp-faq-answer">
                        <p>{a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div className="lp-trust-block">
              <h3>השורה התחתונה</h3>
              <p>{article.takeaway}</p>
            </div>

            <div className="lp-faq-notice" role="note">
              המידע בעמוד זה הוא מידע כללי בלבד. הוא אינו אבחון, אינו ייעוץ
              רפואי ואינו מחליף פנייה לרופא/ה. בכל תסמין חריג, דימום חריג, כאב
              משמעותי או חשש רפואי — יש לפנות לגורם רפואי מוסמך.
            </div>

            <div className="lp-article-cta">
              <h3>רוצה להתחיל לעקוב עוד היום?</h3>
              <p>
                Meno היא אפליקציה בעברית למעקב אחרי תסמינים, מחזור, דימום, שינה
                ותרופות — כדי שתגיעי לרופאה עם תמונה ברורה במקום זיכרון מעורפל.
              </p>
              <Link
                className="lp-btn lp-btn-primary"
                href="/#download"
                data-event="cta_download_article"
              >
                התחילי לעקוב
              </Link>
              <p className="lp-article-cta-links">
                <Link href="/quiz">לא בטוחה אם זה גיל המעבר? לשאלון התסמינים ←</Link>
                <br />
                <Link href="/tracking">למה בכלל לעקוב ומה אפשר ללמוד מזה ←</Link>
              </p>
            </div>

            {related.length > 0 && (
              <aside className="lp-article-related">
                <h3>{cluster ? `עוד ב״${cluster.title}״` : "מדריכים נוספים"}</h3>
                <ul>
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/guide/${a.slug}`}>{a.title}</Link>
                    </li>
                  ))}
                </ul>
                {cluster && (
                  <Link className="lp-guide-card-more" href={`/guide/topic/${cluster.id}`}>
                    לכל המדריכים בנושא ←
                  </Link>
                )}
              </aside>
            )}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
