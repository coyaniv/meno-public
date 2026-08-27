import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title:
    "מעקב אחר תסמיני גיל המעבר — למה כדאי לתעד ומה אפשר ללמוד לאורך זמן",
  description:
    "מה שאת מרגישה היום הוא רק חלק מהתמונה. איך מעקב לאורך זמן עוזר לראות תדירות, עוצמה והשפעה — ומה המחקר אומר על זה, כולל המגבלות.",
  alternates: { canonical: "/tracking" },
  openGraph: {
    title: "מעקב אחר תסמיני גיל המעבר — מה אפשר ללמוד לאורך זמן",
    description:
      "מה שאת מרגישה היום הוא רק חלק מהתמונה. Meno עוזרת לך לראות איך התסמינים שלך משתנים לאורך זמן.",
    url: "https://menoapp.health/tracking",
    type: "article",
  },
};

/**
 * The tracking page, built in two layers, styled to the approved design.
 *
 * Two different people arrive here wanting opposite things. A woman deciding
 * whether tracking is worth her time wants to know what she gets out of it, in
 * about ninety seconds. A gynaecologist deciding whether to recommend Meno
 * wants the evidence, the funders and the limitations.
 *
 * So: layer one is the plain-language case. Layer two — "המחקר מאחורי המעקב" —
 * holds every study, funding statement and caveat inside <details>. Collapsed,
 * not deleted: the content stays in the DOM, so search and answer engines still
 * read it and the FAQ schema still resolves, while the default view stays short.
 *
 * Two things deliberately stay OUT of the accordion, because hiding them would
 * be hiding the wrong thing: the red-flag section, and the line that tracking is
 * not treatment and not a diagnosis.
 *
 * And no `reviewedBy` schema until Dr. Zehavi has actually reviewed the page.
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

const DIMENSIONS = [
  { title: "תדירות", body: "כמה פעמים זה קורה" },
  { title: "עוצמה", body: "כמה זה חזק כשזה קורה" },
  { title: "השפעה", body: "כמה זה מפריע לך בפועל" },
  { title: "מגמה", body: "האם זה משתנה לאורך זמן" },
  { title: "הקשר", body: "האם יש קשר למחזור" },
];

/**
 * What the app offers to track.
 *
 * This list must not be shorter than what the home page already tells women
 * Meno covers. Two entries were lost in an earlier pass and stay restored here:
 * urogenital symptoms (dropping "sexual desire" was deliberate; dropping
 * dryness, urgency and recurrent UTIs with it was not — those are the two
 * strongest physician-reviewed guides on the site), and brain fog, which had
 * been folded into "mood" although they are separate reviewed guides and
 * clinically distinct.
 *
 * Icons are inline stroke SVG rather than emoji: emoji resolve to a different
 * glyph per platform — a flame renders as a sun in some Hebrew font stacks —
 * and these have to sit in a fixed lavender tile.
 */
const TRACKED: { label: string; icon: React.ReactNode }[] = [
  {
    label: "גלי חום והזעות לילה",
    icon: (
      <>
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
  },
  { label: "שינה", icon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /> },
  { label: "אנרגיה ועייפות", icon: <path d="M13 2 5 13.5h6L10 22l8.5-11.5h-6z" /> },
  {
    label: "מצב רוח, עצבנות וחרדה",
    icon: (
      <path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2.5 5-1M2 18c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2.5 5-1" />
    ),
  },
  {
    label: "ערפול מוחי וריכוז",
    icon: (
      <path d="M12 4a6 6 0 0 0-6 6c0 1.5.5 2.6 1.2 3.6.6.8.8 1.4.8 2.4h8c0-1 .2-1.6.8-2.4.7-1 1.2-2.1 1.2-3.6a6 6 0 0 0-6-6zM9.5 19.5h5M10.5 22h3" />
    ),
  },
  { label: "כאבי שרירים ומפרקים", icon: <path d="M22 12h-4l-3 8L9 4l-3 8H2" /> },
  {
    label: "יובש ותסמינים גניטו־אורינריים",
    icon: (
      <>
        <path d="M12 3.5c3 4 6 7 6 10.5a6 6 0 0 1-12 0c0-3.5 3-6.5 6-10.5z" />
        <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
      </>
    ),
  },
  {
    label: "מחזור, דימום והכתמות",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
      </>
    ),
  },
  {
    label: "טיפולים, תרופות ותוספים",
    icon: (
      <>
        <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)" />
        <path d="M9.4 8 14.6 16" />
      </>
    ),
  },
];

/**
 * The four vasomotor-symptom trajectories from SWAN, drawn as shapes rather
 * than numbers. The percentages are real and stay in the research layer below;
 * up here the only point is that the four curves look nothing like each other.
 * The dashed line marks the final menstrual period.
 */
const TRAJECTORIES = [
  { label: "נמוך לאורך הדרך", d: "M0,34 C20,33 35,30 50,29 C65,30 80,33 100,34" },
  { label: "גבוה לאורך הדרך", d: "M0,13 C20,10 35,8 50,8 C65,9 80,11 100,13" },
  { label: "מתחיל מוקדם", d: "M0,30 C15,16 30,8 45,7 C60,10 80,22 100,31" },
  {
    label: "מתחיל מאוחר",
    d: "M0,34 C20,33 35,32 50,30 C58,15 66,8 74,9 C84,14 92,24 100,29",
  },
];

/**
 * An illustrative 28 days. Fixed values, not generated: a chart on a health site
 * reads as someone's real data unless it says otherwise, so the caption says so
 * and the numbers never change between builds. The shape is the point — hard
 * days cluster in the week before the period, which is exactly what a single
 * appointment cannot surface.
 */
const ILLUSTRATIVE_MONTH = [
  1, 0, 2, 1, 0, 0, 1, 2, 1, 3, 2, 1, 0, 1,
  2, 3, 4, 3, 4, 3, 2, 1, 0, 1, 0, 2, 1, 1,
];

const FAQ = [
  {
    q: "כמה זמן צריך לעקוב כדי שיהיה בזה ערך?",
    a: "אין מספר ימים שנקבע במחקר כסף הכניסה. ככל שהתיעוד מצטבר על פני יותר מחזורים, כך קל יותר להבחין בין תנודה רגילה לבין מגמה. כמה שבועות כבר נותנים בסיס לשיחה עם רופאה; כמה חודשים נותנים תמונה של מגמה.",
  },
  {
    q: "האם מעקב יכול להחליף בדיקות דם?",
    a: "לא, והוא גם לא נועד לכך. בדיקות דם חשובות כדי לשלול סיבות אחרות לאותם תסמינים — תת־פעילות של בלוטת התריס, אנמיה, חוסר בברזל או ב־B12. לפי הנחיות NICE, אצל נשים בריאות בגיל 45 ומעלה עם תסמינים אופייניים אפשר לזהות את השלב על בסיס תסמינים ודפוס מחזור, בלי בדיקות מעבדה לאישור האבחנה. זה לא אומר שבדיקות מיותרות; זה אומר שהן עונות על שאלה אחרת.",
  },
  {
    q: "האם מעקב מפחית תסמינים?",
    a: "יש עדויות מוקדמות לכיוון הזה, אבל הן עדיין לא חזקות מספיק כדי להציג אותן כעובדה. סקירה שיטתית מ־2021 מצאה ממצאים מבטיחים, ובמקביל ציינה שמספר המחקרים קטן, שרבים מהם מוגבלים מתודולוגית ושקיים סיכון גבוה להטיה. מעקב אינו טיפול, ואינו תחליף לאבחון או לייעוץ רפואי.",
  },
  {
    q: "מה אם לא דיווחתי כל יום?",
    a: "זה בסדר. המטרה אינה בהכרח 100% דיווחים אלא תמונה אמינה דיה כדי לזהות דפוס. גם כשמפספסים ימים, הנתונים המצטברים יכולים לעזור לראות כיצד התסמינים משתנים לאורך זמן.",
  },
  {
    q: "אני מתאמנת באופן קבוע — האם זה בכלל רלוונטי לי?",
    a: "כן. סקר שנערך ב־2025 בקרב 187 ספורטאיות סבולת בנות 40–60, שכולן התאמנו לפחות שלוש פעמים בשבוע במשך חמש שנים ומעלה, מצא שיעורי תסמינים גבוהים: 88% דיווחו על הפרעות שינה ו־83% על תשישות פיזית ומנטלית. הציון הכולל הגבוה ביותר נמדד דווקא אצל המשתתפות בפרימנופאוזה. פעילות גופנית מיטיבה מסיבות רבות, אבל היא לא מבטלת את התסמינים.",
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

const PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "מעקב אחר תסמיני גיל המעבר — למה כדאי לתעד ומה אפשר ללמוד לאורך זמן",
  inLanguage: "he",
  url: "https://menoapp.health/tracking",
  publisher: { "@type": "Organization", name: "Meno", url: "https://menoapp.health/" },
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

export default function TrackingPage() {
  return (
    <div className="lp lp-v2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      <SiteHeader />

      <main>
        {/* ---------- Layer 1: the plain-language case ---------- */}
        <section className="lp-v2-section">
          <div className="lp-v2-wrap">
            <nav className="lp-v2-crumbs" aria-label="ניווט">
              <Link href="/">Meno</Link> <span aria-hidden="true">›</span> מעקב תסמינים
            </nav>

            <h1>מעקב אחר תסמיני גיל המעבר</h1>

            <p className="lp-v2-lead">
              מה שאת מרגישה היום הוא רק חלק מהתמונה. Meno עוזרת לך לראות איך
              התסמינים שלך משתנים לאורך זמן — ומה באמת משפיע על החיים שלך.
            </p>

            <Link
              className="lp-v2-btn"
              href="/#download"
              data-event="cta_download_tracking_hero"
            >
              התחילי מעקב
            </Link>

            <h2>למה לעקוב?</h2>
            <p>
              גיל המעבר אינו אירוע של יום אחד. התסמינים משתנים בעוצמה, בתדירות
              ובשילוב ביניהם — משהו שהיה השבוע יכול להיות מקרה חד־פעמי, או חלק
              מדפוס שחוזר על עצמו. מנקודת זמן אחת קשה לדעת מה מהשניים.
            </p>
            <p style={{ marginBottom: 18 }}>
              מעקב קצר לאורך זמן מאפשר לראות את התמונה, ולא רק את היום שבו את
              נמצאת עכשיו:
            </p>

            <div className="lp-v2-grid lp-v2-grid-130">
              {DIMENSIONS.map((d) => (
                <div key={d.title} className="lp-v2-card">
                  <strong>{d.title}</strong>
                  <span>{d.body}</span>
                </div>
              ))}
            </div>

            <p>
              ובמקום להגיע לרופאה עם ״נדמה לי שזה התחיל לפני כמה חודשים״, אפשר
              להגיע עם תמונה הרבה יותר ברורה.
            </p>

            <h2>נשים חוות את המעבר בדרכים שונות</h2>
            <p style={{ marginBottom: 18 }}>
              מחקר ארוך טווח שעקב אחרי נשים לאורך המעבר מצא ארבעה דפוסים שונים של
              גלי חום. לא וריאציות על אותו קו — עקומות שנראות שונה לחלוטין זו
              מזו:
            </p>

            <div className="lp-v2-grid lp-v2-grid-160">
              {TRAJECTORIES.map((t) => (
                <figure key={t.label} className="lp-v2-fig">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                    <line x1="50" y1="2" x2="50" y2="38" className="lp-v2-fmp" />
                    <path d={t.d} className="lp-v2-curve" />
                  </svg>
                  <figcaption>{t.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="lp-v2-caption">
              הקו המקווקו מסמן את המחזור האחרון. הצורות להמחשה בלבד.
            </p>

            <p>
              זו בדיוק הסיבה שנקודת זמן אחת לא תמיד מספרת את הסיפור. ביקור אחד לא
              יכול להראות לאיזו מהעקומות האלה את משתייכת — רק הצטברות לאורך זמן
              יכולה להראות איך התסמינים שלך משתנים.
            </p>

            <h2>מה Meno מבקשת ממך לתעד?</h2>
            <p style={{ marginBottom: 18 }}>
              Meno לא מבקשת ממך למלא שאלון ארוך בכל יום. היא מתמקדת בכמה מדדים
              מרכזיים שחוזרים לאורך זמן — לפי מה שרלוונטי לך:
            </p>

            <ul className="lp-v2-list lp-v2-grid-210">
              {TRACKED.map((t) => (
                <li key={t.label} className="lp-v2-list-item">
                  <span className="lp-v2-tile" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {t.icon}
                    </svg>
                  </span>
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>

            <p>
              Meno לא נועדה להפוך את המעקב למטלה. המטרה אינה בהכרח 100% דיווחים —
              גם כשמפספסים ימים, הנתונים המצטברים יכולים לעזור לזהות דפוסים לאורך
              זמן.
            </p>

            <h2>מה אפשר ללמוד אחרי שהמידע מצטבר</h2>
            <p style={{ marginBottom: 18 }}>
              המטרה אינה לתת ״ציון גיל מעבר״. Meno אינה תחליף לאבחון רפואי ואינה
              קובעת לבדה אם אישה זקוקה לטיפול. היא מסכמת את המידע שהצטבר ועוזרת
              לך לראות דפוסים בתסמינים ובמחזור שלך — למשל שגלי החום מופיעים
              בעיקר בשבוע מסוים בחודש, שהשינה נפגעת בעקביות, או שמשהו התחיל
              להשתנות מאז הביקור הקודם.
            </p>

            <div className="lp-v2-month">
              <div className="lp-v2-month-title">גלי חום — 28 ימים</div>
              <div className="lp-v2-month-strip" aria-hidden="true">
                {ILLUSTRATIVE_MONTH.map((level, i) => (
                  <div key={i} className={`lp-v2-d${level}`} />
                ))}
              </div>
              <div className="lp-v2-month-legend">
                <span>לפני חודש</span>
                <span className="lp-v2-period">▲ תחילת מחזור</span>
                <span>היום</span>
              </div>
              <p>
                להמחשה בלבד. כך נראה חודש אחד של תיעוד — הימים הקשים מתקבצים
                בשבוע שלפני המחזור. זה דפוס שקשה לראות מיום אחד, וקל לראות
                מארבעה שבועות.
              </p>
            </div>

            <p>
              וכשהתמונה מצביעה על תסמינים מתמשכים שמשפיעים על החיים, זה יכול
              להיות מידע חשוב לשיחה עם רופאה.
            </p>

            <p className="lp-v2-soft-note">
              מעקב אינו טיפול, אינו אבחנה, ואינו תחליף לייעוץ רפואי. המטרה היא לא
              לאבחן את עצמך, אלא להגיע להבנה טובה יותר של מה שקורה לך ולשיחה
              רפואית עם מידע מדויק יותר.
            </p>

            <h2>מתי לפנות לרופאה בלי קשר למעקב</h2>
            <div className="lp-v2-alert" role="note">
              יש דברים שלא מחכים לדפוס. פני לרופא/ה אם יש דימום לאחר שנה ומעלה
              ללא מחזור, דימום כבד במיוחד או ממושך, דימום אחרי יחסים, או תסמינים
              חדשים ומשמעותיים שמדאיגים אותך. תיעוד עוזר לשיחה — הוא לא מחליף
              בירור.
            </div>

            <div className="lp-v2-cta">
              <h3>התחילי לבנות את התמונה שלך</h3>
              <p>
                Meno עוזרת לך לתעד תסמינים, מחזור ושינויים לאורך זמן — כדי שתוכלי
                להבין את הדפוסים שלך ולהגיע לשיחה עם הרופאה עם מידע מסודר.
              </p>
              <Link
                className="lp-v2-btn"
                href="/#download"
                data-event="cta_download_tracking"
              >
                התחילי מעקב
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Layer 2: the evidence, collapsed by default ---------- */}
        <section className="lp-v2-section lp-v2-section-white lp-v2-research" id="research">
          <div className="lp-v2-wrap">
            <div className="lp-v2-chip">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 16, height: 16 }}
                aria-hidden="true"
              >
                <path d="M9 3h6M10 3v5.5L5 17a3.5 3.5 0 0 0 3.2 5h7.6A3.5 3.5 0 0 0 19 17l-5-8.5V3M7.5 14h9" />
              </svg>
              המחקר מאחורי המעקב
            </div>

            <h2>על מה העמוד הזה מבוסס</h2>
            <p className="lp-v2-research-intro">
              Meno מבוססת על מחקר והנחיות מקצועיות. כאן אפשר לקרוא את המקורות, את
              מה שהם מראים — ואת מה שהם עדיין לא מוכיחים. לצד כל מחקר מצוין מי
              מימן אותו.
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

              <Research title="שאלות ותשובות">
                <div className="lp-v2-qa">
                  {FAQ.map(({ q, a }) => (
                    <div key={q}>
                      <strong>{q}</strong>
                      <p>{a}</p>
                    </div>
                  ))}
                </div>
              </Research>
            </div>

            <p className="lp-v2-legal">
              המידע בעמוד זה הוא מידע כללי בלבד ואינו מהווה ייעוץ רפואי, אבחנה או
              המלצה לטיפול. בכל שאלה או החלטה רפואית יש לפנות לרופא/ה.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
