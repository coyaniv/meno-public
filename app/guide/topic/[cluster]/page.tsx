import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, CLUSTERS } from "../../articles";
import { SiteFooter, SiteHeader } from "../../../site-chrome";

export function generateStaticParams() {
  return CLUSTERS.map((c) => ({ cluster: c.id }));
}

function getCluster(id: string) {
  return CLUSTERS.find((c) => c.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const c = getCluster(cluster);
  if (!c) return {};
  return {
    title: `${c.metaTitle} | Meno`,
    description: c.description,
    alternates: { canonical: `/guide/topic/${c.id}` },
    openGraph: {
      title: c.metaTitle,
      description: c.description,
      url: `https://menoapp.health/guide/topic/${c.id}`,
      type: "website",
    },
  };
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster } = await params;
  const c = getCluster(cluster);
  if (!c) notFound();

  const articles = ARTICLES.filter((a) => a.cluster === c.id);
  const pillar = articles.find((a) => a.slug === c.pillar);
  const rest = articles.filter((a) => a.slug !== c.pillar);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.metaTitle,
    description: c.description,
    url: `https://menoapp.health/guide/topic/${c.id}`,
    inLanguage: "he",
    isPartOf: { "@type": "WebSite", url: "https://menoapp.health/" },
    hasPart: articles.map((a) => ({
      "@type": "Article",
      headline: a.title,
      url: `https://menoapp.health/guide/${a.slug}`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Meno", item: "https://menoapp.health/" },
      { "@type": "ListItem", position: 2, name: "מדריכים", item: "https://menoapp.health/guide" },
      {
        "@type": "ListItem",
        position: 3,
        name: c.title,
        item: `https://menoapp.health/guide/topic/${c.id}`,
      },
    ],
  };

  return (
    <div className="lp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <SiteHeader />

      <main>
        <section className="lp-section">
          <div className="lp-container lp-quiz-container">
            <nav className="lp-breadcrumbs" aria-label="ניווט">
              <Link href="/">Meno</Link> <span aria-hidden="true">›</span>{" "}
              <Link href="/guide">מדריכים</Link> <span aria-hidden="true">›</span> {c.title}
            </nav>

            <h1>{c.title}</h1>
            <p className="lp-article-lead">{c.intro}</p>

            {pillar && (
              <Link href={`/guide/${pillar.slug}`} className="lp-cluster-pillar">
                <span className="lp-eyebrow">להתחיל מכאן</span>
                <h2>{pillar.title}</h2>
                <p>{pillar.metaDescription}</p>
                <span className="lp-guide-card-more">לקריאת המדריך ←</span>
              </Link>
            )}

            <div className="lp-grid-2" style={{ marginTop: 28 }}>
              {rest.map((a) => (
                <Link key={a.slug} href={`/guide/${a.slug}`} className="lp-card lp-guide-card">
                  <h3>{a.title}</h3>
                  <p>{a.metaDescription}</p>
                  <span className="lp-guide-card-more">לקריאת המדריך ←</span>
                </Link>
              ))}
            </div>

            <div className="lp-quiz-next" style={{ marginTop: 40 }}>
              <h3>לא בטוחה איפה את עומדת?</h3>
              <p>
                שאלון קצר שמארגן את התסמינים שלך לפי קטגוריות ומראה מה קשור למה.
                בלי אימייל, בלי שמירת נתונים.
              </p>
              <Link className="lp-btn lp-btn-primary" href="/quiz">
                לשאלון התסמינים
              </Link>
            </div>

            <div className="lp-faq-notice" role="note" style={{ marginTop: 28 }}>
              המדריכים כאן הם מידע כללי בלבד ואינם מחליפים ייעוץ רפואי אישי.
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
