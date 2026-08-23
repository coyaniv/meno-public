import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site-chrome";
import ReferralBanner from "./referral-banner";
import { ARTICLES } from "./guide/articles";
import { APP_STORE_URL, GOOGLE_PLAY_URL, PHYSICIAN, appStoreLink, playStoreLink } from "./shared";

const FAQ: { q: string; a: string }[] = [
  {
    q: "מה זה גיל המעבר ומהי מנופאוזה?",
    a: "גיל המעבר הוא תקופה ממושכת של שינויים הורמונליים שמובילה להפסקת המחזור החודשי. מנופאוזה היא הנקודה שבה לא היה מחזור במשך 12 חודשים רצופים. אצל נשים רבות זה קורה סביב גיל 50, אך הטווח משתנה מאישה לאישה.",
  },
  {
    q: "מה ההבדל בין פרימנופאוזה, טרום גיל המעבר ומנופאוזה?",
    a: "פרימנופאוזה (טרום גיל המעבר) היא השלב שמתחיל שנים לפני המנופאוזה — הגוף מתחיל לייצר פחות אסטרוגן והמחזור הופך לפחות סדיר. מנופאוזה היא הנקודה שבה המחזור הפסיק לחלוטין. אחריה מתחילה תקופת הפוסט-מנופאוזה.",
  },
  {
    q: "מהם התסמינים הנפוצים של גיל המעבר?",
    a: "בין התסמינים השכיחים: גלי חום, הזעות לילה, שינה לא רציפה, שינויים במצב הרוח, עייפות, ערפול מוחי, שינויים במחזור, יובש, ירידה בריכוז וכאבי שרירים. כל אישה חווה צירוף שונה של תסמינים בעוצמות שונות.",
  },
  {
    q: "איך יודעים אם זה גיל המעבר או משהו אחר?",
    a: "אין דרך לאבחן זאת לבד. מעקב מסודר אחרי תסמינים, מחזור ודימום יכול לעזור לזהות דפוסים, אבל בכל תסמין חריג, דימום בלתי שגרתי או חשש — חשוב לפנות לרופאת נשים. Meno היא כלי תיעוד, לא כלי אבחון.",
  },
  {
    q: "כמה זמן צריך לעקוב כדי לראות דפוסים?",
    a: "בדרך כלל אחרי שלושה עד שישה שבועות מתחילים להופיע דפוסים — אילו תסמינים חוזרים, באיזה תזמון, ומה אולי משפיע. ככל שעוקבים יותר זמן, התמונה נעשית ברורה יותר ואפשר להבחין גם בשינויים שקרו אחרי טיפול.",
  },
  {
    q: "האם Meno מחליפה ייעוץ רפואי?",
    a: "לא. Meno היא כלי תיעוד ומעקב — לא כלי אבחון או טיפול. בכל החלטה רפואית, התאמת טיפול הורמונלי, תוספים, או תסמינים שמטרידים אותך — חשוב להיוועץ ברופאה או ברופא מוסמך.",
  },
  {
    q: "האם המידע באפליקציה פרטי?",
    a: "המידע הוא אישי ורגיש, ו-Meno נבנתה מתוך התייחסות לכך. את המדיניות המלאה אפשר לקרוא בעמוד מדיניות הפרטיות.",
  },
  {
    q: "האם Meno זמינה לאייפון ולאנדרואיד?",
    a: "כן. Meno זמינה לאייפון בחנות App Store ולאנדרואיד בחנות Google Play.",
  },
];

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Meno",
  url: "https://menoapp.health/",
  logo: "https://menoapp.health/logo.png",
  email: "contact@menoapp.health",
  areaServed: { "@type": "Country", name: "Israel" },
  inLanguage: "he",
  sameAs: [APP_STORE_URL, GOOGLE_PLAY_URL],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Meno",
  alternateName: ["מנו", "Meno — אפליקציה לגיל המעבר"],
  url: "https://menoapp.health/",
  inLanguage: "he",
  description:
    "אפליקציה בעברית למעקב אחרי תסמיני גיל המעבר, פרימנופאוזה, מחזור, דימום, שינה, מצב רוח, תרופות ותוספים.",
};

const MOBILE_APP_JSONLD = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Meno",
  description:
    "אפליקציה בעברית למעקב אחרי תסמיני גיל המעבר ופרימנופאוזה — מחזור, דימום, שינה, מצב רוח, תרופות ותוספים.",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Menopause symptom tracker",
  operatingSystem: "iOS, Android",
  inLanguage: "he",
  url: APP_STORE_URL,
  downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
  screenshot: "https://menoapp.health/screenshot.png",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
  publisher: { "@type": "Organization", name: "Meno" },
  contributor: PHYSICIAN,
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "he",
  reviewedBy: PHYSICIAN,
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const iconSvgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Icons = {
  pulse: (
    <svg {...iconSvgProps}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  ),
  drop: (
    <svg {...iconSvgProps}>
      <path d="M12 3.5c3 4 6 7 6 10.5a6 6 0 0 1-12 0c0-3.5 3-6.5 6-10.5z" />
    </svg>
  ),
  sparkle: (
    <svg {...iconSvgProps}>
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  pill: (
    <svg {...iconSvgProps}>
      <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)" />
      <path d="M9.4 8 14.6 16" />
    </svg>
  ),
  moon: (
    <svg {...iconSvgProps}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  ),
  trendUp: (
    <svg {...iconSvgProps}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  bars: (
    <svg {...iconSvgProps}>
      <path d="M5 20V11M12 20V4M19 20v-6" />
    </svg>
  ),
  link: (
    <svg {...iconSvgProps}>
      <path d="M9 15a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 6l-1 1" />
      <path d="M15 9a4 4 0 0 1 0 6l-2 2a4 4 0 0 1-6-6l1-1" />
    </svg>
  ),
  compass: (
    <svg {...iconSvgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
    </svg>
  ),
  globe: (
    <svg {...iconSvgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  lock: (
    <svg {...iconSvgProps}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
};

const TRACK_CARDS = [
  {
    icon: Icons.pulse,
    title: "תסמינים",
    text: "גלי חום, הזעות לילה, שינה, מצב רוח, עייפות, כאבים, ערפול מוחי ועוד.",
  },
  {
    icon: Icons.drop,
    title: "מחזור ודימום",
    text: "מחזור לא סדיר, דימום בין וסתות, שינויים בתדירות ובעוצמה — וכל דימום חריג שחשוב לדווח לרופאה.",
  },
  {
    icon: Icons.pill,
    title: "תרופות, הורמונים ותוספים",
    text: "טיפול הורמונלי, שינוי מינון, התחלה או הפסקה של טיפול — ומה השתנה בעקבותיהם.",
  },
  {
    icon: Icons.sparkle,
    title: "טריגרים ואורח חיים",
    text: "סטרס, אלכוהול, קפה, נסיעות ופעילות — המרכיבים שמשפיעים יותר ממה שנראה.",
  },
  {
    icon: Icons.moon,
    title: "שינה ופעילות",
    text: "חיבור ל־Apple Health או שעון חכם מוסיף נתוני שינה ופעילות לתמונה.",
  },
  {
    icon: Icons.trendUp,
    title: "תמונה לאורך זמן",
    text: "טרנדים, קשרים אפשריים ושינויים אחרי טיפול — במבט אחד.",
  },
];

const PATTERN_ROWS = [
  {
    icon: Icons.bars,
    title: "זיהוי טרנדים",
    text: "האם התסמינים משתפרים, מחמירים או חוזרים בדפוס מסוים.",
  },
  {
    icon: Icons.link,
    title: "קשרים אפשריים",
    text: "למשל בין שינה, סטרס, אלכוהול או פעילות לבין תסמינים.",
  },
  {
    icon: Icons.compass,
    title: "מעקב אחרי טיפול",
    text: "מה קרה אחרי התחלת תרופה, תוסף או שינוי בטיפול.",
  },
];

const COMPARE_ROWS = [
  { before: "מנסה לזכור מה קרה החודש", after: "רואה תיעוד יומי מסודר" },
  { before: "קשה להבין אם טיפול עזר", after: "רואה שינוי לאורך זמן" },
  { before: "שיחה כללית עם הרופאה", after: "מגיעה עם תמונה ברורה יותר" },
  {
    before: "תסמינים מנותקים מהקשר",
    after: "רואה קשרים אפשריים לשינה, סטרס, אירועים וטיפול",
  },
];

const AUDIENCE = [
  "את בפרימנופאוזה או בגיל המעבר ורוצה להבין מה קורה בגוף",
  "יש לך גלי חום, שינה לא טובה, מצב רוח משתנה או עייפות",
  "המחזור השתנה או שיש דימום שאת רוצה לתעד",
  "התחלת טיפול או תוסף ורוצה לעקוב אחרי ההשפעה לאורך זמן",
  "את רוצה להגיע לרופאה עם מידע מסודר ולא רק תחושה כללית",
  "יש לך שעון חכם ואת רוצה לשלב נתוני שינה ופעילות",
];

export default function HomePage() {
  return (
    <div className="lp">
      <link rel="preload" as="image" href="/meno_woman_phone.webp" />
      <JsonLd data={ORGANIZATION_JSONLD} />
      <JsonLd data={WEBSITE_JSONLD} />
      <JsonLd data={MOBILE_APP_JSONLD} />
      <JsonLd data={FAQ_JSONLD} />

      <ReferralBanner />

      <SiteHeader home />

      <main id="top">
        <section className="lp-hero">
          <div className="lp-container lp-hero-grid">
            <div>
              <div className="lp-eyebrow">
                אפליקציה בעברית למעקב גיל המעבר ופרימנופאוזה
              </div>
              <h1 className="lp-hero-title">לעשות סדר במה שהגוף שלך מספר בגיל המעבר</h1>
              <p className="lp-hero-lead">
                תיעוד פשוט של גלי חום, שינה, מצב רוח, מחזור ותרופות — כדי
                לראות דפוסים לאורך זמן ולהגיע לרופאה עם תמונה ברורה, לא עם
                זיכרון מעורפל.
              </p>
              <div className="lp-hero-actions">
                <a
                  className="lp-store-link"
                  href={appStoreLink("web_hero")}
                  aria-label="הורדה מ-App Store"
                  data-event="store_click"
                  data-store="ios"
                >
                  <img src="/badge-appstore.svg" alt="App Store" />
                </a>
                <a
                  className="lp-store-link"
                  href={playStoreLink("web_hero")}
                  aria-label="הורדה מ-Google Play"
                  data-event="store_click"
                  data-store="android"
                >
                  <img src="/badge-googleplay.svg" alt="Google Play" />
                </a>
                <a className="lp-btn lp-btn-secondary" href="#why">
                  איך זה עובד?
                </a>
              </div>
              <div className="lp-trust-line">
                חינמית · בעברית · לא מחליפה ייעוץ רפואי
              </div>
            </div>

            <div className="lp-hero-photo">
              <div className="lp-hero-photo-frame">
                <img
                  src="/meno_woman_phone.webp"
                  alt="אישה בגיל המעבר עוקבת אחרי תסמינים באפליקציית Meno"
                  width={1024}
                  height={1024}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              <div className="lp-hero-badge lp-hero-badge-trend" aria-hidden="true">
                <div className="lp-hero-badge-icon">{Icons.trendUp}</div>
                <div className="lp-hero-badge-text">
                  <small>טרנד גלי חום</small>
                  <strong>
                    <em>↘</em>
                    פחות מהשבוע שעבר
                  </strong>
                </div>
              </div>

              <div className="lp-hero-badge lp-hero-badge-checkin" aria-hidden="true">
                <small>היום · 14:32</small>
                <strong>מה הרגשת היום?</strong>
                <div className="lp-hero-badge-chips">
                  <span>גלי חום</span>
                  <span>שינה</span>
                  <span>מצב רוח</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="why">
          <div className="lp-container lp-split">
            <div>
              <h2>קשה להבין דפוסים מזיכרון בלבד</h2>
              <p>
                בגיל המעבר ובפרימנופאוזה, תסמינים משתנים מיום ליום ובמהלך
                החודש. גלי חום, שינה לא רציפה, שינויי מצב רוח, מחזור לא סדיר —
                קשה לזכור מה קרה, מתי, ומה אולי השפיע.
              </p>
              <p>
                מעקב של כמה שבועות מראה את התמונה הרחבה: מה חוזר, מה מחמיר,
                מה משתפר — ומה השתנה אחרי התחלת טיפול או תוסף, כדי שתוכלי
                לשוחח על כך עם הרופאה.
              </p>
            </div>
            <div className="lp-card lp-card-cream">
              <div className="lp-icon lp-icon-dark">✓</div>
              <h3>עקבי כמה שבועות. זהי דפוסים. הגיעי מוכנה יותר לרופאה.</h3>
              <p>
                במקום לנסות לשחזר הכל מהראש, Meno עוזרת לך לבנות תמונה מסודרת
                של החודש האחרון.
              </p>
            </div>
          </div>
        </section>

        <section className="lp-section" id="track">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>מה מתעדים ב-Meno?</h2>
              <p>
                תיעוד פשוט של תסמינים, מחזור, טיפול ואורח חיים — הקבוצות
                שמרכיבות יחד תמונה אמיתית לאורך זמן.
              </p>
            </div>

            <div className="lp-grid-3">
              {TRACK_CARDS.map((c) => (
                <div key={c.title} className="lp-card">
                  <div className="lp-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="patterns">
          <div className="lp-container lp-split lp-split-top">
            <div>
              <h2>אחרי כמה שבועות, רואים תמונה ברורה יותר</h2>
              <p>
                המעקב הופך תחושות יומיומיות למידע שאפשר להבין, להשוות ולשתף
                עם הרופאה.
              </p>
            </div>
            <div className="lp-pattern-rows">
              {PATTERN_ROWS.map((r) => (
                <div key={r.title} className="lp-pattern-row">
                  <div className="lp-icon lp-icon-dark">{r.icon}</div>
                  <div>
                    <strong>{r.title}</strong>
                    <span>{r.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>ההבדל שמעקב מסודר עושה</h2>
              <p>
                הפער הוא לא בעוד מידע — אלא בארגון נכון של מה שכבר קורה לך
                ביום־יום.
              </p>
            </div>

            <div
              className="lp-comparison"
              role="table"
              aria-label="השוואה בין מעקב לא מסודר לבין Meno"
            >
              <div className="lp-comparison-row lp-comparison-head" role="row">
                <div role="columnheader">בלי מעקב מסודר</div>
                <div role="columnheader">עם Meno</div>
              </div>
              {COMPARE_ROWS.map((r) => (
                <div key={r.before} className="lp-comparison-row" role="row">
                  <div role="cell">{r.before}</div>
                  <div role="cell">{r.after}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="doctor">
          <div className="lp-container">
            <div className="lp-doctor-box">
              <div className="lp-doctor-text">
                <h2>להגיע לרופאה עם תמונה מסודרת יותר</h2>
                <p>
                  אחרי תקופה של מעקב, תוכלי לשתף עם הרופאה מידע ברור על
                  התסמינים, התדירות, ההשפעה על החיים ושינויים אחרי טיפול —
                  שיחה ממוקדת יותר, החלטות מבוססות יותר.
                </p>
                <div className="lp-summary-card">
                  <strong>דוגמה לסיכום חודשי</strong>
                  <div className="lp-summary-line">
                    <span>גלי חום</span>
                    <span>12 ימים</span>
                  </div>
                  <div className="lp-summary-line">
                    <span>שינה לא רציפה</span>
                    <span>8 לילות</span>
                  </div>
                  <div className="lp-summary-line">
                    <span>אירועי סטרס</span>
                    <span>4 ימים</span>
                  </div>
                  <div className="lp-summary-line">
                    <span>שינוי בטיפול</span>
                    <span>סומן בציר הזמן</span>
                  </div>
                </div>
                <a
                  className="lp-btn lp-btn-on-dark"
                  href="#download"
                  data-event="cta_download_doctor"
                >
                  התחילי לבנות את המעקב שלך
                </a>
              </div>
              <div className="lp-doctor-photo">
                <img
                  src="/meno_doctor_patient.webp"
                  alt="אישה בגיל המעבר משוחחת עם רופאת נשים על תיעוד מסודר"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container lp-split">
            <div>
              <div className="lp-editorial-photo">
                <img
                  src="/meno_woman_relaxed.webp"
                  alt="אישה רגועה עם כוס קפה — עוקבת אחרי גיל המעבר בקצב שלה"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
                <div className="lp-editorial-photo-quote">
                  לא צריך לזכור הכל לבד — Meno עושה את הסדר בשבילך.
                </div>
              </div>
            </div>
            <div>
              <h2>למי Meno יכולה להתאים?</h2>
              <p>
                אם את רוצה להבין טוב יותר מה קורה בגוף לאורך זמן, Meno יכולה
                לעזור לך לעשות סדר.
              </p>
              <ul className="lp-bullets">
                {AUDIENCE.map((item) => (
                  <li key={item}>
                    <span className="lp-check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="guides">
          <div className="lp-container">
            <div className="lp-guides-head">
              <div>
                <h2>מדריכים על גיל המעבר ופרימנופאוזה</h2>
                <p>מידע מעשי בעברית — מה קורה בגוף, מה נורמלי, ומתי לפנות לרופאה.</p>
              </div>
              <Link href="/guide" className="lp-guides-all">
                לכל המדריכים ←
              </Link>
            </div>
            <div className="lp-grid-3">
              {ARTICLES.slice(0, 3).map((a) => (
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
          </div>
        </section>

        <section className="lp-section" id="privacy">
          <div className="lp-container lp-grid-2">
            <div className="lp-card">
              <div className="lp-icon">{Icons.globe}</div>
              <h3>עברית מלאה</h3>
              <p>חוויה שמדברת בשפה שלך ומתאימה לנשים בישראל.</p>
            </div>
            <div className="lp-card">
              <div className="lp-icon">{Icons.lock}</div>
              <h3>המידע שלך נשאר שלך</h3>
              <p>
                מידע על תסמינים, מחזור ודימום הוא אישי ורגיש. ב
                <Link href="/privacy">מדיניות הפרטיות</Link> מפורט כיצד המידע
                נשמר, מתי הוא נמחק, ומה בשליטתך.
              </p>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="faq">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>שאלות נפוצות</h2>
              <p>
                התשובות נכתבו בליווי{" "}
                <a href="https://drzehavi.com/" target="_blank" rel="noopener">
                  ד״ר זהבי הורוביץ-קוגלר, רופאת גיל המעבר
                </a>{" "}
                — מידע כללי בלבד, לא תחליף לייעוץ רפואי אישי.
              </p>
            </div>

            <div className="lp-faq">
              {FAQ.map(({ q, a }, i) => (
                <details
                  key={i}
                  className="lp-faq-item"
                  data-event="click_faq_question"
                  data-q-index={i}
                >
                  <summary>
                    <span className="lp-faq-icon" aria-hidden="true" />
                    <span className="lp-faq-q">{q}</span>
                  </summary>
                  <div className="lp-faq-answer">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div className="lp-faq-notice" role="note">
              המידע בעמוד זה הוא מידע כללי בלבד — אינו אבחון ואינו מחליף פנייה
              לרופא/ה. בכל תסמין או דימום חריג, כאב משמעותי או חשש רפואי — יש
              לפנות לגורם רפואי מוסמך.
            </div>
          </div>
        </section>

        <section className="lp-section" id="download">
          <div className="lp-container">
            <div className="lp-cta-final">
              <h2>התחילי היום מעקב שיעזור לך להבין את החודש הקרוב</h2>
              <p>כמה דקות ביום בונות תמונה ברורה יותר של מה שקורה בגוף שלך.</p>
              <div className="lp-download-badges">
                <a
                  className="lp-store-link"
                  href={appStoreLink("web_download_section")}
                  aria-label="הורדה מ-App Store"
                  data-event="store_click"
                  data-store="ios"
                >
                  <img
                    src="/badge-appstore.svg"
                    alt="App Store"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <a
                  className="lp-store-link"
                  href={playStoreLink("web_download_section")}
                  aria-label="הורדה מ-Google Play"
                  data-event="store_click"
                  data-store="android"
                >
                  <img
                    src="/badge-googleplay.svg"
                    alt="Google Play"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>
              <p className="lp-download-note">
                חינמית · זמינה לאייפון ולאנדרואיד · לא מחליפה ייעוץ רפואי
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="lp-mobile-sticky">
        <a
          className="lp-btn lp-btn-primary"
          href="#download"
          data-event="cta_download_sticky"
        >
          להורדת האפליקציה
        </a>
      </div>
    </div>
  );
}
