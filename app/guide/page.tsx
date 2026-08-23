import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, CLUSTERS } from "./articles";
import { SiteHeader, SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "מדריכים — גיל המעבר ופרימנופאוזה",
  description:
    "מדריכים בעברית על גיל המעבר ופרימנופאוזה: תסמינים, מחזור לא סדיר, גלי חום, הכנה לביקור אצל רופאה, וטיפול הורמונלי — מה חשוב לדעת ומה כדאי לעקוב.",
  alternates: { canonical: "/guide" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "מדריכים — גיל המעבר ופרימנופאוזה · Meno",
    description:
      "מדריכים בעברית על גיל המעבר ופרימנופאוזה: תסמינים, מחזור, גלי חום, הכנה לביקור רופאה וטיפול הורמונלי.",
    url: "/guide",
    type: "website",
    locale: "he_IL",
  },
};

const COLLECTION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "מדריכים — גיל המעבר ופרימנופאוזה",
  url: "https://menoapp.health/guide",
  inLanguage: "he",
  hasPart: ARTICLES.map((a) => ({
    "@type": "Article",
    headline: a.title,
    url: `https://menoapp.health/guide/${a.slug}`,
  })),
};

export default function GuideIndexPage() {
  return (
    <div className="lp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_JSONLD) }}
      />

      <SiteHeader />

      <main>
        <section className="lp-section lp-page">
          <div className="lp-container">
            <div className="lp-page-header">
              <nav className="lp-breadcrumbs" aria-label="ניווט">
                <Link href="/">Meno</Link> <span aria-hidden="true">›</span> מדריכים
              </nav>
              <h1>מדריכים על גיל המעבר ופרימנופאוזה</h1>
              <p className="lp-article-lead">
                מידע מעשי בעברית — בלי הפחדות ובלי הבטחות: מה קורה בגוף, מה
                נורמלי, מתי לפנות לרופאה, ואיך מעקב מסודר עוזר להבין את התמונה.
              </p>
            </div>

            <a
              href="https://drzehavi.com/"
              target="_blank"
              rel="noopener"
              className="lp-advisor-strip"
              data-event="click_advisor_site"
            >
              <img
                src="/dr-zehavi.webp"
                alt="ד״ר זהבי הורוביץ-קוגלר"
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
              />
              <p>
                המדריכים נכתבים בליווי <strong>ד״ר זהבי הורוביץ-קוגלר</strong>{" "}
                — רופאת משפחה, בוגרת תוכנית Women&apos;s Health &amp; Menopause
                של הרווארד ולימודי המשך בגיל המעבר בטכניון.
              </p>
              <span className="lp-advisor-strip-more">לאתר של ד״ר זהבי ←</span>
            </a>

            {CLUSTERS.map((c) => {
              const inCluster = ARTICLES.filter((a) => a.cluster === c.id);
              if (inCluster.length === 0) return null;
              return (
                <section key={c.id} className="lp-cluster-block">
                  <div className="lp-cluster-head">
                    <h2>
                      <Link href={`/guide/topic/${c.id}`}>{c.title}</Link>
                    </h2>
                    <p>{c.description}</p>
                  </div>
                  <div className="lp-grid-2">
                    {inCluster.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/guide/${a.slug}`}
                        className="lp-card lp-guide-card"
                      >
                        <h3>{a.title}</h3>
                        <p>{a.metaDescription}</p>
                        <span className="lp-guide-card-more">לקריאת המדריך ←</span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="lp-faq-notice" role="note" style={{ marginTop: 32 }}>
              המדריכים כאן הם מידע כללי בלבד ואינם מחליפים ייעוץ רפואי אישי.
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
