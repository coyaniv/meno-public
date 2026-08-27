import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import LeadForm from "./lead-form";

export const metadata: Metadata = {
  title: "Meno לרופאות ומרפאות — מטופלות שמגיעות עם תיעוד מסודר",
  description:
    "גיל המעבר הוא תהליך; הביקור הוא נקודת זמן. Meno עוזרת למטופלת לתעד תסמינים, חומרה והשפעה לאורך זמן, ומביאה אותך לביקור עם תמונה במקום שחזור מהזיכרון. אינה מאבחנת ואינה מחליפה שיקול דעת קליני.",
  alternates: { canonical: "/for-clinicians" },
  openGraph: {
    title: "Meno לרופאות ומרפאות",
    description:
      "פחות זמן לאיסוף מידע, יותר זמן לטיפול. תמונה מסודרת של התסמינים לפני שהמטופלת נכנסת לחדר.",
    url: "https://menoapp.health/for-clinicians",
    type: "website",
  },
};

/**
 * The clinician page.
 *
 * Positioning, and it is the whole point of this page: Meno is a patient
 * insight layer, not clinical decision support. Tools in this space tend to aim
 * at the clinician's decision; aiming at the patient's preparation is both a
 * cleaner differentiator and the only claim the product can stand behind. Every
 * section is ordered so a gynaecologist reaches four conclusions in sequence:
 *
 *   1. the problem is real (recall bias across a months-long process)
 *   2. this does not replace me
 *   3. it saves me time and improves the quality of what I'm told
 *   4. there is reasonable science under it
 *
 * Deliberately much lighter on citations than /tracking. A clinician deciding
 * whether to recommend an app does not want eighteen studies here — she wants
 * the four conclusions and a link if she chooses to check. That is
 * /tracking#research.
 */

const WHAT_SHE_SEES = [
  { label: "אילו תסמינים מופיעים", detail: "ולא רק אלה שנזכרו בחדר" },
  { label: "באיזו תדירות", detail: "כמה ימים מתוך כמה" },
  { label: "מה חומרתם", detail: "עוצמה מדווחת, לא ״לפעמים חזק״" },
  { label: "מה משפיע על איכות החיים", detail: "שינה, עבודה, תפקוד יומיומי" },
  { label: "איך התמונה השתנתה", detail: "מאז הביקור הקודם, ומאז תחילת טיפול" },
];

const RECALL_GAPS = [
  "מתי בדיוק התחילו השינויים",
  "האם התסמינים מחמירים או משתפרים",
  "כמה פעמים בשבוע יש גלי חום",
  "האם ובאיזו מידה השינה נפגעה",
  "האם יש קשר לדפוס המחזור",
  "מה כבר נוסה, ומה קרה אחרי",
];

const NOT_DOING = [
  "לא מאבחנת מנופאוזה ולא קובעת שלב",
  "לא ממליצה על טיפול ולא משנה מינון",
  "לא מפרשת ממצאים ולא מחליפה שיקול דעת קליני",
];

const STEPS = [
  {
    title: "לפני הביקור.",
    body: "את ממליצה על האפליקציה בסוף הביקור הקודם, או למטופלת חדשה שממתינה לתור. היא מורידה אותה חינם, בעברית, ומתעדת תסמינים, מחזור והשפעה על היומיום.",
  },
  {
    title: "במהלך הביקור.",
    body: "בהסכמתה, התיק שלה נפתח לך בממשק — סיכום תקופה, מגמות, דפוסים, ודגלים אדומים שהיא דיווחה עליהם. הביקור מתחיל מנתונים במקום משחזור.",
  },
  {
    title: "אחרי הביקור.",
    body: "המעקב ממשיך — כולל אחרי התחלת טיפול, כך שבביקור הבא אפשר לראות מה השתנה ומתי, ולא להסתמך על ״נראה לי שקצת יותר טוב״.",
  },
];

const GOOD_FIT = [
  "מתחילות להרגיש שינויים סביב גיל המעבר",
  "חוות תסמינים משתנים שקשה להסביר",
  "רוצות להבין אם יש דפוס לאורך זמן",
  "מתכוננות לשיחה על אפשרויות טיפול",
  "נמצאות במעקב אחרי התחלת טיפול",
];

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
    q: "כמה זה עולה?",
    a: "האפליקציה חינמית למטופלות. לגבי הגישה למרפאה — נשמח לדבר, ההסדר נקבע מול כל מרפאה בנפרד.",
  },
  {
    q: "האם Meno מאבחנת או ממליצה על טיפול?",
    a: "לא, ובמכוון. המערכת מתעדת, מארגנת ומסמנת — היא לא מפרשת, לא מאבחנת ולא מציעה טיפול. הפרשנות הקלינית וההחלטה נשארות אצלך.",
  },
  {
    q: "מה אם המטופלת לא מתעדת בעקביות?",
    a: "גם תיעוד חלקי שימושי יותר משחזור מהזיכרון, והממשק מציג במפורש כמה ימים תועדו בפועל — כדי שתדעי על מה את מסתכלת. אנחנו לא מציגים תיעוד חלקי כאילו הוא מלא.",
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
    <div className="lp lp-v2">
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
        <section className="lp-v2-section" style={{ paddingBottom: 56 }}>
          <div className="lp-v2-wrap">
            <nav className="lp-v2-crumbs" aria-label="ניווט">
              <Link href="/">Meno</Link> <span aria-hidden="true">›</span> לרופאות ומרפאות
            </nav>

            <div className="lp-v2-chip">
              לרופאות נשים, רופאות משפחה ומרפאות גיל המעבר
            </div>

            <h1>פחות זמן לאיסוף מידע. יותר זמן לטיפול.</h1>

            <p className="lp-v2-lead" style={{ marginBottom: 20 }}>
              Meno עוזרת לנשים לתעד תסמיני גיל המעבר לאורך זמן ולהגיע לביקור עם
              תמונה ברורה יותר של התסמינים, החומרה וההשפעה על איכות החיים.
            </p>

            <p style={{ fontWeight: 600 }}>
              במקום לפתוח כל ביקור ב״מתי זה התחיל?״, את מקבלת:
            </p>

            <ul className="lp-v2-list lp-v2-grid-220">
              {WHAT_SHE_SEES.map((row) => (
                <li key={row.label} className="lp-v2-card lp-v2-card-wide">
                  <strong>{row.label}</strong>
                  <span>{row.detail}</span>
                </li>
              ))}
            </ul>

            <a href="#join" className="lp-v2-btn" data-event="cta_clinician_hero">
              הצטרפו לרשת הרופאות של Meno
            </a>
          </div>
        </section>

        <section
          className="lp-v2-section lp-v2-section-white"
          style={{ paddingTop: 56 }}
        >
          <div className="lp-v2-wrap">
            <h2>גיל המעבר הוא תהליך — אבל הביקור הוא נקודת זמן</h2>
            <p style={{ marginBottom: 14 }}>
              נשים מגיעות לביקור של 15–20 דקות אחרי שבועות או חודשים של תסמינים
              משתנים. לעיתים קרובות קשה להן לשחזר:
            </p>
            <ul className="lp-v2-ticks">
              {RECALL_GAPS.map((g) => (
                <li key={g}>
                  <span aria-hidden="true">·</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <p>
              וההחלטה הקלינית מתקבלת על בסיס תמונה חלקית — עם הטיה מוכרת לכיוון
              הימים הגרועים ולכיוון הימים האחרונים.
            </p>

            <h2 style={{ marginTop: 48 }}>מה מגיע אלייך בפועל</h2>
            <p style={{ marginBottom: 18 }}>
              ההבדל הוא לא כמות המידע אלא הצורה שלו. במקום תיאור חופשי, נתונים
              שהמטופלת עצמה תיעדה לאורך זמן:
            </p>

            <div className="lp-v2-grid lp-v2-grid-280">
              <div className="lp-v2-panel">
                <h3>בלי תיעוד</h3>
                <p>
                  ״יש לי גלי חום ואני לא ישנה טוב. נראה לי שזה החמיר, אבל קשה לי
                  להגיד מתי זה התחיל.״
                </p>
              </div>
              <div className="lp-v2-panel lp-v2-panel-lav">
                <h3>עם Meno</h3>
                <p>
                  גלי חום: 5–7 אפיזודות בשבוע, במגמת החמרה על פני 3 שבועות. הפרעת
                  שינה דווחה ב־8 מתוך 14 ימים. שינוי בדפוס המחזור בחודשיים
                  האחרונים.
                </p>
              </div>
            </div>
            <p className="lp-v2-caption" style={{ marginBottom: 0 }}>
              דוגמה להמחשה. הממשק מציג תמיד כמה ימים תועדו בפועל, כדי שיהיה ברור
              על איזה בסיס נתונים את מסתכלת.
            </p>

            <h2 style={{ marginTop: 48 }}>נבנה כדי לתמוך — לא להחליף</h2>
            <div className="lp-v2-guard">
              <ul>
                {NOT_DOING.map((n) => (
                  <li key={n}>
                    <span aria-hidden="true">✓</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
              <p>
                Meno אינה מכשיר רפואי ואינה כלי לתמיכה בהחלטות קליניות. היא שכבת
                מידע מהמטופלת: היא מתעדת, מארגנת ומסמנת. הפרשנות הקלינית וההחלטה
                נשארות אצלך.
              </p>
            </div>

            <h2 style={{ marginTop: 48, marginBottom: 18 }}>איך זה משתלב בביקור</h2>
            <ol className="lp-v2-steps">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="lp-v2-step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>
                    <strong>{s.title}</strong> {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <h2 style={{ marginTop: 48 }}>למי זה מתאים במיוחד</h2>
            <p style={{ marginBottom: 12 }}>מטופלות ש:</p>
            <ul className="lp-v2-ticks lp-v2-ticks-ok lp-v2-ticks-tight">
              {GOOD_FIT.map((f) => (
                <li key={f}>
                  <span aria-hidden="true">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <h2 style={{ marginTop: 48 }}>מה המחקר אומר</h2>
            <p style={{ marginBottom: 14 }}>
              מחקרים ארוכי טווח מראים שנשים חוות את המעבר במסלולים שונים מאוד.
              במחקר SWAN, שכלל מעקב רב־שנתי, נמצאו דפוסים נבדלים של הופעת גלי חום
              — חלק מהנשים חוות תסמינים שנים לפני המחזור האחרון, אחרות דווקא
              אחריו. לכן נקודת זמן אחת לא תמיד משקפת את התמונה המלאה.
            </p>
            <p style={{ marginBottom: 14 }}>
              מחקרים על symptom monitoring מצביעים על פוטנציאל לשיפור במודעות
              לתסמינים, בתקשורת בין מטופלת לאנשי מקצוע ובקבלת החלטות — אך הראיות
              לגבי השפעה ישירה על התסמינים עצמם עדיין מתפתחות, ואיננו טוענים
              אחרת.
            </p>
            <p>
              <Link href="/tracking#research" className="lp-v2-inline">
                המקורות המלאים, המגבלות ופרטי המימון של כל מחקר ←
              </Link>
            </p>

            <h2 style={{ marginTop: 48 }}>הנתונים של המטופלת</h2>
            <p>
              הנתונים שייכים למטופלת. הגישה שלך אליהם מותנית בהסכמתה, ואיננו
              מוכרות נתונים ואיננו משתפות אותם עם מפרסמים. הפירוט המלא ב
              <Link href="/privacy" className="lp-v2-inline">
                מדיניות הפרטיות
              </Link>
              .
            </p>

            <h2 style={{ marginTop: 48, marginBottom: 16 }}>שאלות נפוצות</h2>
            <div className="lp-v2-stack">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="lp-v2-details">
                  <summary>
                    <span className="lp-v2-plus" aria-hidden="true">
                      +
                    </span>
                    <span className="lp-v2-sum-text">{q}</span>
                  </summary>
                  <div className="lp-v2-body">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>

            <h2 style={{ marginTop: 48, marginBottom: 16 }}>
              רופאות שכבר עובדות עם Meno
            </h2>
            <div className="lp-v2-doc">
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
                  ולימודי המשך בגיל המעבר בטכניון. מלווה את התוכן והמעקב ב-Meno
                  ועובדת עם הממשק לרופאה.
                </p>
              </div>
              <a
                href="https://drzehavi.com/"
                target="_blank"
                rel="noopener"
                className="lp-v2-btn lp-v2-btn-ghost"
                data-event="click_advisor_site"
              >
                לאתר של ד״ר זהבי ←
              </a>
            </div>

            <div id="join">
              <LeadForm />
            </div>

            <div className="lp-v2-legal" role="note">
              Meno היא כלי מעקב ואינה מכשיר רפואי. היא אינה מיועדת לאבחון, לניטור
              קליני או לקבלת החלטות טיפוליות, ואינה מחליפה שיקול דעת קליני.
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
