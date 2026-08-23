import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import LeadForm from "./lead-form";

export const metadata: Metadata = {
  title: "Meno לרופאות ומרפאות — מטופלות שמגיעות עם תיעוד מסודר",
  description:
    "ממשק לרופאה שמציג את תיק המטופלת לפני הביקור: מעקב תסמינים, מחזור ותרופות, סיכום תקופה והתראות על דגלים אדומים. מידע לרופאות נשים, רופאות משפחה ומרפאות גיל המעבר.",
  alternates: { canonical: "/for-clinicians" },
  openGraph: {
    title: "Meno לרופאות ומרפאות",
    description:
      "לפתוח את התיק ולראות את שלושת החודשים האחרונים — לפני שהמטופלת נכנסת לחדר.",
    url: "https://menoapp.health/for-clinicians",
    type: "website",
  },
};

const FAQ = [
  {
    q: "מה בדיוק אני רואה לפני הביקור?",
    a: "פרופיל המטופלת, את תשובות שאלון הפתיחה שלה, ואת המעקב שהיא ניהלה מאז: תסמינים ועוצמתם, מחזור ודימום, תרופות וטיפולים, ומה השתנה מאז הביקור הקודם. בנוסף יש סיכום קצר של התקופה, כדי שלא תצטרכי לקרוא הכול כדי להבין את התמונה.",
  },
  {
    q: "האם המטופלת צריכה להסכים?",
    a: "כן. הגישה לנתונים מותנית בהסכמת המטופלת. הנתונים הם שלה, והיא זו שמשתפת אותם איתך.",
  },
  {
    q: "מה זה עולה?",
    a: "האפליקציה חינמית למטופלות. לגבי הגישה למרפאה — נשמח לדבר, ההסדר נקבע מול כל מרפאה בנפרד.",
  },
  {
    q: "האם Meno מאבחנת או ממליצה על טיפול?",
    a: "לא, ובמכוון. המערכת מתעדת, מארגנת ומסמנת — היא לא מפרשת, לא מאבחנת ולא מציעה טיפול. הפרשנות הקלינית וההחלטה נשארות אצלך.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "he",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Meno", item: "https://menoapp.health/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "לרופאות ומרפאות",
      item: "https://menoapp.health/for-clinicians",
    },
  ],
};

export default function ForCliniciansPage() {
  return (
    <div className="lp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />

      <SiteHeader />

      <main>
        <section className="lp-section lp-page">
          <div className="lp-container lp-quiz-container">
            <nav className="lp-breadcrumbs" aria-label="ניווט">
              <Link href="/">Meno</Link> <span aria-hidden="true">›</span> לרופאות ומרפאות
            </nav>

            <div className="lp-eyebrow">לרופאות נשים, רופאות משפחה ומרפאות גיל המעבר</div>
            <h1>לפתוח את התיק ולראות את שלושת החודשים האחרונים</h1>
            <p className="lp-article-lead">
              &ldquo;נראה לי שהמחזור התקצר, ואולי גלי החום החמירו — קשה לי להגיד.&rdquo;
              זו נקודת הפתיחה של רוב הביקורים בגיל המעבר. Meno מחליפה אותה בתמונה
              שאפשר לקרוא לפני שהמטופלת נכנסת לחדר.
            </p>

            <div className="lp-clinic-compare">
              <div className="lp-clinic-col lp-clinic-col-before">
                <h3>בלי תיעוד</h3>
                <ul>
                  <li>שחזור מהזיכרון של 3 חודשים</li>
                  <li>&ldquo;לפעמים&rdquo;, &ldquo;נדמה לי&rdquo;, &ldquo;בערך&rdquo;</li>
                  <li>דפוס הדימום לא ברור</li>
                  <li>קשה לדעת אם טיפול עבד</li>
                  <li>הטיה לכיוון הימים הגרועים</li>
                </ul>
              </div>
              <div className="lp-clinic-col lp-clinic-col-after">
                <h3>עם Meno</h3>
                <ul>
                  <li>התיק פתוח לפנייך לפני הביקור</li>
                  <li>תדירות ועוצמה לכל תסמין</li>
                  <li>דפוס מחזור ודימום מתועד</li>
                  <li>מה השתנה מאז הביקור הקודם</li>
                  <li>דגלים אדומים מסומנים כהתראה</li>
                </ul>
              </div>
            </div>

            <section className="lp-quiz-context">
              <h2>מה יש בממשק</h2>
              <div className="lp-feature-grid">
                <div className="lp-feature">
                  <h3>תיק מטופלת</h3>
                  <p>
                    פרופיל, תשובות שאלון הפתיחה, ומעקב יומי: תסמינים ועוצמתם, מחזור
                    ודימום, תרופות וטיפולים — מסודר לפי תקופות ולא כערימת רשומות.
                  </p>
                </div>
                <div className="lp-feature">
                  <h3>סיכום תקופה</h3>
                  <p>
                    תקציר קצר של מה שקרה מאז הביקור הקודם, כדי שתדעי מאיפה להתחיל
                    בלי לקרוא הכול.
                  </p>
                </div>
                <div className="lp-feature">
                  <h3>התראות מדורגות</h3>
                  <p>
                    דגלים אדומים שהמטופלת דיווחה עליהם — למשל דימום חריג — מסומנים
                    לפי דחיפות וניתנים לסימון כנקראו.
                  </p>
                </div>
                <div className="lp-feature">
                  <h3>ניהול ביקורים</h3>
                  <p>
                    תלונה עיקרית, אבחנה, תוכנית טיפול והערות מעקב נשמרים לכל ביקור,
                    כך שהביקור הבא ממשיך מאיפה שהפסקתם.
                  </p>
                </div>
                <div className="lp-feature">
                  <h3>הערות פרטיות</h3>
                  <p>
                    הערות שלך על המטופלת, שנשארות אצלך ואינן גלויות לה.
                  </p>
                </div>
                <div className="lp-feature">
                  <h3>יומן ותמונת מצב</h3>
                  <p>
                    תורים להיום, ביקורים אחרונים ופעילות מטופלות במקום אחד.
                  </p>
                </div>
              </div>

              <h2>איך זה עובד</h2>
              <p>
                המעקב מתחיל עוד לפני הביקור הראשון, וממשיך בין הביקורים וגם אחרי
                התחלת טיפול תרופתי — כך שכל ביקור נפתח עם תמונה עדכנית.
              </p>
              <ol className="lp-clinic-steps">
                <li>
                  <strong>את ממליצה על האפליקציה בסוף הביקור.</strong> המטופלת מורידה
                  אותה חינם, בעברית, ל-iPhone או לאנדרואיד, וממלאת שאלון פתיחה קצר.
                </li>
                <li>
                  <strong>היא מתעדת דקה ביום</strong> — תסמינים ועוצמתם, מחזור ודימום,
                  תרופות ותוספים, שינה ופעילות.
                </li>
                <li>
                  <strong>בהסכמתה, התיק שלה נפתח לך בממשק.</strong> את רואה את המעקב,
                  את הסיכום, ואת מה שהשתנה — לפני שהיא נכנסת לחדר.
                </li>
                <li>
                  <strong>הביקור מתחיל מנתונים.</strong> הפרשנות הקלינית — שלך.
                </li>
              </ol>

              <h2>הנתונים של המטופלת</h2>
              <p>
                הנתונים שייכים למטופלת. הגישה שלך אליהם מותנית בהסכמתה, ואיננו מוכרות
                נתונים ואיננו משתפות אותם עם מפרסמים. הפירוט המלא ב
                <Link href="/privacy">מדיניות הפרטיות</Link>.
              </p>

              <h2>שאלות נפוצות</h2>
              {FAQ.map(({ q, a }, i) => (
                <details key={i} className="lp-faq-item">
                  <summary>
                    <span className="lp-faq-icon" aria-hidden="true" />
                    <span className="lp-faq-q">{q}</span>
                  </summary>
                  <div className="lp-faq-answer">
                    <p>{a}</p>
                  </div>
                </details>
              ))}

              <h2>רופאות שכבר עובדות עם Meno</h2>
              <div className="lp-doctor-card">
                <img
                  src="/dr-zehavi.webp"
                  alt="ד״ר זהבי הורוביץ-קוגלר"
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>ד״ר זהבי הורוביץ-קוגלר</strong>
                  <span>רופאת משפחה · גיל המעבר ופרימנופאוזה</span>
                  <p>
                    בוגרת תוכנית Women&apos;s Health &amp; Menopause של הרווארד
                    ולימודי המשך בגיל המעבר בטכניון. מלווה את התוכן והמעקב
                    ב-Meno ועובדת עם הממשק לרופאה.
                  </p>
                </div>
                <a
                  href="https://drzehavi.com/"
                  target="_blank"
                  rel="noopener"
                  className="lp-btn lp-btn-secondary"
                  data-event="click_advisor_site"
                >
                  לאתר של ד״ר זהבי ←
                </a>
              </div>

              <LeadForm />

              <div className="lp-faq-notice" role="note">
                Meno היא כלי מעקב ואינה מכשיר רפואי. היא אינה מיועדת לאבחון, לניטור
                קליני או לקבלת החלטות טיפוליות, ואינה מחליפה שיקול דעת קליני.
              </div>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
