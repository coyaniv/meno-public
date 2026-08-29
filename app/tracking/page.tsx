import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title:
    "מעקב אחר תסמיני גיל המעבר — למה כדאי לתעד ומה אפשר ללמוד לאורך זמן",
  description:
    "מה שאת מרגישה היום הוא רק חלק מהתמונה. איך מעקב לאורך זמן עוזר לראות תדירות, עוצמה והשפעה — מה כדאי לתעד, ומה אפשר ללמוד מזה.",
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

/** The one study still cited on this page. The full reference list moved to
 *  /for-clinicians#research, where the audience that reads it actually is. */
const CITE = {
  swanTrajectories: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5028150/",
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
  ],
};

function Ref({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
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
              <Ref href={CITE.swanTrajectories}>מחקר ארוך טווח</Ref> שעקב אחרי
              נשים לאורך המעבר מצא ארבעה דפוסים שונים של גלי חום. לא וריאציות על
              אותו קו — עקומות שנראות שונה לחלוטין זו מזו:
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
        <section className="lp-v2-section lp-v2-section-white lp-v2-research">
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
              לפני שמתחילים
            </div>

            <h2>שאלות נפוצות</h2>
            <p className="lp-v2-research-intro">
              מה שנשים שואלות לרוב לפני שהן מתחילות לעקוב. המקורות המחקריים
              המלאים, כולל המגבלות ופרטי המימון של כל מחקר, נמצאים{" "}
              <Link href="/for-clinicians#research" className="lp-v2-inline">
                בעמוד לרופאות
              </Link>
              .
            </p>

            <div className="lp-v2-stack">
              {/* One <details> per question, matching the guide pages and
                  /for-clinicians. Nesting all five inside a single accordion
                  cost a second click and gave each question no element of its
                  own — the answers stay in the DOM either way, but per-question
                  disclosure is what lets a reader (and an answer engine) land
                  on one question rather than a wall. */}
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

            <p className="lp-v2-legal" role="note">
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
