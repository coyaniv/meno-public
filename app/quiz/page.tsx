import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "./quiz";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { ARTICLES } from "../guide/articles";

const RELATED_SLUGS = [
  "perimenopause-symptoms",
  "irregular-period-after-40",
  "hot-flashes",
  "mood-perimenopause",
  "brain-fog-menopause",
  "prepare-doctor-visit",
];
const RELATED = RELATED_SLUGS.map((s) => ARTICLES.find((a) => a.slug === s)).filter(
  (a): a is NonNullable<typeof a> => Boolean(a),
).slice(0, 4);

export const metadata: Metadata = {
  title: "האם אני בגיל המעבר? שאלון תסמינים בעברית — סיכום לרופאה",
  description:
    "שאלון קצר בעברית שמארגן את תסמיני גיל המעבר והפרימנופאוזה שלך לפי קטגוריות, ומייצר סיכום להביא לרופאה. התשובות נשארות במכשיר שלך.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "האם אני בגיל המעבר? שאלון תסמינים בעברית",
    description:
      "שאלון קצר שמארגן את התסמינים שלך לקראת הביקור אצל הרופאה. שלוש דקות, בלי אימייל, בלי שמירת נתונים.",
    url: "https://menoapp.health/quiz",
    type: "website",
  },
};

const FAQ = [
  {
    q: "האם השאלון מאבחן גיל המעבר?",
    a: "לא. אין בדיקה אחת — כולל בדיקת דם — שמאבחנת פרימנופאוזה, כי רמות ההורמונים משתנות מיום ליום. האבחנה נשענת על הגיל, דפוס המחזור והתסמינים לאורך זמן. השאלון מארגן את המידע הזה כדי שתגיעי לרופאה עם תמונה מסודרת.",
  },
  {
    q: "מה קורה עם התשובות שלי?",
    a: "כלום. השאלון רץ כולו בדפדפן שלך — התשובות לא נשלחות לשרת, לא נשמרות ולא מקושרות אלייך. אנחנו גם לא מבקשים אימייל.",
  },
  {
    q: "מאיזה גיל השאלון רלוונטי?",
    a: "הוא נכתב עבור נשים שחוות שינויים שעשויים להיות קשורים לפרימנופאוזה או לגיל המעבר, לרוב מאמצע שנות ה-40. גיל המעבר יכול להתחיל מוקדם יותר — ואם המחזור נפסק לפני גיל 40, זה מצב שמחייב בירור רפואי בפני עצמו.",
  },
  {
    q: "אני נוטלת טיפול הורמונלי או אמצעי מניעה — השאלון עדיין רלוונטי?",
    a: "התסמינים כן, אבל דפוס הדימום לא יעיד על השלב שאת בו, כי הטיפול משפיע עליו ישירות. השאלון יסמן לך את זה בסיכום.",
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
      name: "שאלון תסמינים",
      item: "https://menoapp.health/quiz",
    },
  ],
};

export default function QuizPage() {
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
        <section className="lp-section">
          <div className="lp-container lp-quiz-container">
            <nav className="lp-breadcrumbs" aria-label="ניווט">
              <Link href="/">Meno</Link> <span aria-hidden="true">›</span> שאלון תסמינים
            </nav>

            <h1>האם אני בגיל המעבר?</h1>
            <p className="lp-article-lead">
              התשובה הכנה היא ששאלון לא יכול להכריע את זה — וגם בדיקת דם בודדת לא.
              מה שכן אפשר לעשות: לארגן את מה שאת מרגישה לתמונה אחת מסודרת, ולהגיע איתה
              לרופאה.
            </p>

            <Quiz />

            <section className="lp-quiz-context">
              <h2>אילו תסמינים בכלל קשורים לפרימנופאוזה?</h2>
              <p>
                פרימנופאוזה היא התקופה שלפני הפסקת המחזור, שבה השחלות מייצרות
                הורמונים בצורה פחות סדירה. היא מתחילה לרוב באמצע שנות ה-40, אבל
                הטווח רחב. הסימן המוקדם והשכיח ביותר הוא <strong>שינוי בדפוס
                המחזור</strong> — מרווחים שמתקצרים או מתארכים, דימום כבד או קל
                מהרגיל. לצידו מופיעים אצל רבות גלי חום והזעות לילה, שינה קטועה,
                שינויים במצב הרוח, קושי בריכוז ("ערפל מוחי"), יובש נרתיקי, כאבי
                מפרקים ושינויים בחשק המיני.
              </p>
              <p>
                אף אחד מהתסמינים האלה לא ייחודי לגיל המעבר — עייפות, שינה גרועה
                ושינויי מצב רוח יכולים לנבוע מבלוטת התריס, מחסר ברזל, מלחץ או
                מתרופות. לכן השאלון לא שואל "האם זה גיל המעבר" אלא "מה חוזר, מאז
                מתי, ובאיזו עוצמה" — השאלות שרופאה צריכה כדי להבחין בין האפשרויות.
                דימום כבד במיוחד, דימום אחרי יחסי מין, או מחזור שנפסק לפני גיל 40
                מצדיקים פנייה לרופאה בלי לחכות לתוצאות של שום שאלון.
              </p>

              <h2>למה אין בדיקה שתגיד לך</h2>
              <p>
                בשונה ממנופאוזה — שמוגדרת בדיעבד, אחרי 12 חודשים רצופים ללא מחזור —
                לפרימנופאוזה אין רגע התחלה ברור. רמות האסטרוגן וה-FSH משתנות מיום ליום
                ואף בתוך אותו יום, ולכן בדיקת דם בודדת יכולה לצאת תקינה לחלוטין אצל אישה
                שנמצאת עמוק בתוך המעבר, או להיפך.
              </p>
              <p>
                בפועל האבחנה היא קלינית: הגיל, דפוס המחזור, ואילו תסמינים חוזרים לאורך
                זמן. כלומר מה שקובע הוא לא מדידה אחת אלא <strong>דפוס</strong> — ודפוס,
                בהגדרה, אי אפשר לראות ביום אחד.{" "}
                <Link href="/tracking">מה המחקר אומר על מעקב תסמינים בגיל המעבר ←</Link>
              </p>
              <p>
                זו הסיבה שמעקב הוא לא הרגל בריאותי נחמד אלא המכשיר העיקרי שיש: הוא הדבר
                היחיד שהופך תחושות מעורפלות למשהו שאפשר לקרוא. שאלון כמו זה שלמעלה נותן
                לך את נקודת ההתחלה — כמה שבועות של תיעוד נותנים לך את התמונה.
              </p>

              <h2>שאלות נפוצות</h2>
              {FAQ.map(({ q, a }, i) => (
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

              <div className="lp-faq-notice" role="note">
                המידע בעמוד זה הוא מידע כללי בלבד. הוא אינו אבחון, אינו ייעוץ רפואי ואינו
                מחליף פנייה לרופא/ה. בכל תסמין חריג, דימום חריג, כאב משמעותי או חשש רפואי
                — יש לפנות לגורם רפואי מוסמך.
              </div>

              {RELATED.length > 0 && (
                <aside className="lp-article-related">
                  <h3>להמשך קריאה</h3>
                  <ul>
                    {RELATED.map((a) => (
                      <li key={a.slug}>
                        <Link href={`/guide/${a.slug}`}>{a.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="lp-guide-card-more" href="/guide">
                    לכל המדריכים ←
                  </Link>
                </aside>
              )}
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
