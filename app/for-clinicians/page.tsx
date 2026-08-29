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
 * The four conclusions come first and stay short. The full evidence base sits
 * below them at #research, collapsed — a clinician who wants to check the
 * funding and the caveats can, without that material displacing the argument.
 */

/**
 * The evidence base. This lived on /tracking, which is the consumer page — but
 * the reader who wants funding statements and methodological caveats is the
 * gynaecologist deciding whether to recommend Meno, and she is here. Collapsed
 * by default: it is reference material, not the argument.
 */
const CITE = {
  swanTrajectories: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5028150/",
  swanDuration: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4433164/",
  straw: "https://pubmed.ncbi.nlm.nih.gov/22344196/",
  nice: "https://www.nice.org.uk/guidance/ng23",
  basch: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5817466/",
  athletes:
    "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0335738",
  review:
    "https://www.frontiersin.org/journals/global-womens-health/articles/10.3389/fgwh.2021.757706/full",
  placebo: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10436555/",
};

function Ref({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Research({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="lp-v2-details">
      <summary>
        <span className="lp-v2-plus" aria-hidden="true">
          +
        </span>
        <span className="lp-v2-sum-text">{title}</span>
      </summary>
      <div className="lp-v2-body">{children}</div>
    </details>
  );
}

const RESEARCH_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://menoapp.health/for-clinicians#research",
  inLanguage: "he",
  citation: [
    {
      "@type": "ScholarlyArticle",
      name: "Characterizing the Trajectories of Vasomotor Symptoms Across the Menopausal Transition",
      url: CITE.swanTrajectories,
    },
    {
      "@type": "ScholarlyArticle",
      name: "Executive summary of the Stages of Reproductive Aging Workshop +10",
      url: CITE.straw,
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESEARCH_JSONLD) }}
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
              <a href="#research" className="lp-v2-inline">
                המקורות המלאים, המגבלות ופרטי המימון של כל מחקר ←
              </a>
            </p>

            <div id="research" style={{ scrollMarginTop: 24 }}>
              <h2 style={{ marginTop: 48 }}>המקורות המלאים</h2>
              <p style={{ marginBottom: 14 }}>
                כל מחקר שעליו נשענות הטענות באתר, מה הוא מראה — ומה הוא עדיין לא
                מוכיח. לצד כל אחד מצוין מי מימן אותו.
              </p>
              <div className="lp-v2-stack">
              <Research title="SWAN — ארבעה דפוסים שונים של תסמינים">
                <p>
                  מחקר SWAN עקב אחרי נשים לאורך המעבר עם חציון מעקב של 15.4 שנים.
                  בניתוח של 1,455 משתתפות ו־17,814 מדידות זוהו ארבעה דפוסים
                  נבדלים של גלי חום: נמוך מתמשך (27%), גבוה מתמשך (25.6%), הופעה
                  מוקדמת (18.4% — מתחיל כ־11 שנה לפני המחזור האחרון) והופעה
                  מאוחרת (29% — עלייה חדה דווקא אחריו).
                </p>
                <p>
                  חשוב לדייק: אלה קבוצות שנגזרו סטטיסטית מהנתונים, לא תווית שאפשר
                  להדביק לאישה מסוימת. ביקור אחד לא יכול להראות לאיזו מהעקומות
                  האלה אישה משתייכת.
                </p>
                <p>
                  SWAN מצא גם שמשך גלי החום ארוך בהרבה ממה שנהוג היה לחשוב —
                  חציון של כ־7.4 שנים, ואצל חלק מהנשים יותר מעשור.
                </p>
              </Research>

              <Research title="ההנחיות הקליניות נותנות משקל משמעותי לדפוס לאורך זמן">
                <p>
                  ב־STRAW+10, הסטנדרט הבינלאומי לסיווג שלבי המעבר, שינויים בדפוס
                  המחזור הם הקריטריון המרכזי — כשההורמונים משמשים כקריטריון תומך.
                  בשלב המאוחר של המעבר, למשל, מופיעות תקופות של 60 ימים ומעלה ללא
                  מחזור.
                </p>
                <p>
                  גם הנחיות NICE הבריטיות הולכות באותו כיוון: אצל נשים בריאות
                  בגיל 45 ומעלה עם תסמינים אופייניים, אפשר לזהות פרימנופאוזה על
                  בסיס תסמינים ושינויים במחזור, בלי בדיקות מעבדה לאישור האבחנה.
                  מנופאוזה מוגדרת לאחר 12 חודשים רצופים ללא מחזור.
                </p>
                <p>
                  ההנחיות אינן אומרות שצריך מעקב באפליקציה. הן משתמשות בהיסטוריה
                  של המחזור והתסמינים כחלק מההערכה — וזה בדיוק המידע שרק את יכולה
                  לאסוף.
                </p>
              </Research>

              <Research title="דיווח תסמינים מובנה — מה שידוע מתחומים אחרים">
                <p>
                  מחקרים בתחומים רפואיים אחרים מצאו שדיווח שיטתי על תסמינים בין
                  ביקורים יכול לשפר את הזיהוי והניהול של בעיות רפואיות. בניסוי
                  אקראי גדול באונקולוגיה, למשל, מעקב מובנה אחר תסמינים הוביל
                  להתערבות מוקדמת יותר ולשיפור בתוצאות.
                </p>
                <p>
                  זה אינו מחקר בגיל המעבר, ולכן הוא אינו מוכיח אפקט דומה ב־Meno.
                  הוא מדגים את העיקרון הרחב יותר של דיווח תסמינים מצד המטופלת.
                </p>
              </Research>

              <Research title="גם נשים פעילות מאוד חוות תסמינים משמעותיים">
                <p>
                  סקר שפורסם ב־2025 בחן 187 ספורטאיות סבולת בנות 40–60, שכולן
                  התאמנו לפחות שלוש פעמים בשבוע במשך חמש שנים לפחות. 88% דיווחו
                  על הפרעות שינה ו־83% על תשישות פיזית ומנטלית. הציון הכולל הגבוה
                  ביותר נמדד דווקא אצל המשתתפות בפרימנופאוזה.
                </p>
                <p>
                  זה לא מחקר על מעקב, והוא לא מוכיח שמעקב עוזר. הוא כן מראה
                  שהעומס הסימפטומטי יכול להיות משמעותי גם אצל נשים פעילות מאוד.
                </p>
              </Research>

              <Research title="מה הראיות אומרות — ומה הן עדיין לא מוכיחות">
                <p>
                  השאלה אם מעקב עצמו מפחית תסמינים נחקרה, אבל התשובה עדיין לא
                  מבוססת מספיק כדי להציג אותה כעובדה, ואנחנו לא מציגים אותה ככזו.
                </p>
                <p>
                  סקירה שיטתית ומטא־אנליזה מ־2021 בחנה 18 מחקרים ו־1,718 משתתפות
                  ומצאה קשר בין מעקב תסמינים לבין שיפור במודעות לבריאות, בתקשורת
                  בין מטופלת לרופא, בקבלת החלטות רפואיות ובהגדרת מטרות טיפול.
                  במטא־אנליזה של שלושה מחקרים בלבד נמצא אפקט על תדירות גלי חום
                  (0.73, רווח סמך 95%: 0.57–0.90).
                </p>
                <p>
                  <strong>אבל המחברים עצמם מסייגים חזק.</strong> הם מציינים שמספר
                  המחקרים הכשירים היה נמוך, שרבים מהם לקו באיכות מתודולוגית — רק
                  ארבעה מתוך 18 נחשבו בעלי תוקף מספק — ושעם שלושה מחקרים בלבד
                  במטא־אנליזה לא ניתן היה לחשב funnel plot או להעריך באופן אמין
                  את הסיכון להטיה. הם מגדירים את הממצאים כראשוניים וקוראים
                  למחקרים נוספים.
                </p>
                <p>
                  יש גם סיבה מתודולוגית להיזהר. גם במחקרי טיפול בגלי חום קיימת
                  תגובת פלצבו משמעותית, וחוקרים בתחום מציינים שעצם ניהול יומן
                  תסמינים עשוי לתרום להפחתה. לכן קשה להסיק ממחקרי מעקב בלבד
                  שהמעקב עצמו הוא שגרם לשיפור.
                </p>
                <div className="lp-v2-soft-note" role="note">
                  <strong>בשורה התחתונה:</strong> הראיות לגבי היתרונות של מעקב
                  תסמינים בגיל המעבר עדיין מתפתחות. מה שמבוסס היטב הוא שהמעבר
                  נראה שונה מאוד מאישה לאישה, שההנחיות הקליניות נותנות משקל
                  משמעותי לדפוס לאורך זמן, ושדיווח מסודר יכול לספק בסיס טוב יותר
                  לשיחה הרפואית.
                </div>
              </Research>

              <Research title="מקורות מלאים ופרטי מימון">
                <ol className="lp-v2-refs">
                  <li>
                    <strong>
                      Tepper PG, et al. Characterizing the Trajectories of
                      Vasomotor Symptoms Across the Menopausal Transition.
                    </strong>{" "}
                    <em>Menopause</em>, 2016.{" "}
                    <span className="lp-v2-fund">
                      מימון: National Institutes of Health (NIA, NINR, ORWH).
                    </span>{" "}
                    <Ref href={CITE.swanTrajectories}>לקריאת המחקר</Ref>
                  </li>
                  <li>
                    <strong>
                      Avis NE, et al. Duration of Menopausal Vasomotor Symptoms
                      Over the Menopause Transition.
                    </strong>{" "}
                    <em>JAMA Internal Medicine</em>, 2015.{" "}
                    <span className="lp-v2-fund">
                      מימון: National Institutes of Health.
                    </span>{" "}
                    <Ref href={CITE.swanDuration}>לקריאת המחקר</Ref>
                  </li>
                  <li>
                    <strong>
                      Harlow SD, et al. Executive summary of the Stages of
                      Reproductive Aging Workshop +10 (STRAW+10).
                    </strong>{" "}
                    2012.{" "}
                    <span className="lp-v2-fund">
                      מימון: National Institutes of Health (NIA, ORWH).
                    </span>{" "}
                    <Ref href={CITE.straw}>לקריאת התקציר</Ref>
                  </li>
                  <li>
                    <strong>
                      NICE. Menopause: identification and management (NG23).
                    </strong>{" "}
                    עודכנה לאחרונה באפריל 2026.{" "}
                    <span className="lp-v2-fund">
                      גוף ציבורי בריטי, ללא מימון מסחרי.
                    </span>{" "}
                    <Ref href={CITE.nice}>להנחיה המלאה</Ref>
                  </li>
                  <li>
                    <strong>
                      Basch E, et al. Patient-Reported Outcomes for Symptom
                      Monitoring During Routine Cancer Treatment.
                    </strong>{" "}
                    <em>JAMA</em>, 2017. ניסוי אקראי, 766 מטופלים.{" "}
                    <strong>אונקולוגיה, לא גיל המעבר.</strong>{" "}
                    <span className="lp-v2-fund">
                      מימון: Conquer Cancer Foundation (ASCO); המממן לא היה מעורב
                      בתכנון, בניתוח או בהחלטת הפרסום.
                    </span>{" "}
                    <Ref href={CITE.basch}>לקריאת המחקר</Ref>
                  </li>
                  <li>
                    <strong>
                      Hamilton HM, Yarish NM, Heron KE. Frequency and perceived
                      influence of menopausal symptoms on training and
                      performance in female endurance athletes.
                    </strong>{" "}
                    <em>PLOS One</em>, 2025.{" "}
                    <span className="lp-v2-fund">
                      מימון: מענק NHLBI (NIH) ותמיכת Old Dominion University;
                      המחברות הצהירו על היעדר ניגודי עניינים.
                    </span>{" "}
                    <Ref href={CITE.athletes}>לקריאת המחקר</Ref>
                  </li>
                  <li>
                    <strong>
                      Andrews R, Hale G, John B, Lancastle D. Evaluating the
                      Effects of Symptom Monitoring on Menopausal Health
                      Outcomes.
                    </strong>{" "}
                    <em>Frontiers in Global Women&apos;s Health</em>, 2021. 18
                    מחקרים, 1,718 משתתפות. המחברים מגדירים את הממצאים כראשוניים
                    ומציינים סיכון גבוה להטיה.{" "}
                    <span className="lp-v2-fund">
                      מימון: חלק מעבודת דוקטורט שמומנה על ידי אוניברסיטת דרום
                      ויילס (KESS 2) ועל ידי Health &amp; Her, חברה בתחום בריאות
                      הנשים.
                    </span>{" "}
                    <Ref href={CITE.review}>לקריאת המחקר</Ref>
                  </li>
                  <li>
                    <strong>
                      מטא־אנליזה של תגובת פלצבו בניסויים לתסמינים וזומוטוריים.
                    </strong>{" "}
                    <em>Frontiers in Psychiatry</em>, 2023.{" "}
                    <Ref href={CITE.placebo}>לקריאת המחקר</Ref>
                  </li>
                </ol>
              </Research>
              </div>
            </div>

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
