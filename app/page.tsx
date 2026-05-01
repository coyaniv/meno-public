import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/il/app/meno-%D7%9C%D7%99%D7%95%D7%95%D7%99-%D7%90%D7%99%D7%A9%D7%99-%D7%9C%D7%92%D7%99%D7%9C-%D7%94%D7%9E%D7%A2%D7%91%D7%A8/id6759288559";

function buildAppStoreUrl(medium: string) {
  return `${APP_STORE_URL}?utm_source=landing_page&utm_medium=${medium}&utm_campaign=beta_launch`;
}

const FAQ: { q: string; a: string }[] = [
  {
    q: "מה זה גיל המעבר ומהי מנופאוזה?",
    a: "גיל המעבר הוא תקופה ממושכת של שינויים הורמונליים שמובילה להפסקת המחזור החודשי. מנופאוזה היא הנקודה שבה לא היה מחזור במשך 12 חודשים רצופים. הגיל הממוצע בישראל נע סביב 50, אבל הוא משתנה מאישה לאישה.",
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
    q: "למה המחזור נהיה לא סדיר בפרימנופאוזה?",
    a: "במהלך הפרימנופאוזה רמות ההורמונים משתנות בצורה לא צפויה. זה גורם למחזור להופיע בתדירות שונה, להיות חזק או חלש יותר מהרגיל, ולפעמים לדלג על חודשים שלמים. תיעוד עוזר לראות את התבנית שמתגבשת לאורך זמן.",
  },
  {
    q: "האם כדאי לעקוב אחרי דימום ומחזור בגיל המעבר?",
    a: "כן — תיעוד מסודר של מחזור, דימום ושינויים בעוצמה הוא אחד הכלים השימושיים ביותר לשיחה עם רופאת נשים. במקרה של דימום אחרי הפסקת מחזור, דימום בין וסתות חזק או כל דימום חריג, חשוב לפנות לרופאה במקום להמתין.",
  },
  {
    q: "איך מעקב אחרי תסמינים יכול לעזור לרופאת נשים?",
    a: "במקום לתאר זיכרון מהשבועות האחרונים, אפשר להגיע עם תמונה ברורה של מה היה, באיזו תדירות, ואיך זה השתנה אחרי טיפול או שינוי באורח החיים. זה הופך את השיחה ממוקדת יותר ועוזר להתאים את הטיפול בצורה מדויקת יותר.",
  },
  {
    q: "כמה זמן צריך לעקוב כדי לראות דפוסים?",
    a: "בדרך כלל אחרי שלושה עד שישה שבועות מתחילים להופיע דפוסים — אילו תסמינים חוזרים, באיזה תזמון, ומה אולי משפיע. ככל שעוקבים יותר זמן, התמונה נעשית ברורה יותר ואפשר להבחין גם בשינויים שקרו אחרי טיפול.",
  },
  {
    q: "האם Meno מתאימה גם למי שעדיין מקבלת מחזור?",
    a: "כן. הרבה נשים בפרימנופאוזה ממשיכות לקבל מחזור — לעיתים סדיר, לעיתים לא. Meno עוזרת לתעד גם את המחזור עצמו וגם את התסמינים שמתחילים להופיע סביבו, כדי שתהיה לך תמונה רציפה לאורך כל השלב הזה.",
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
    a: "Meno זמינה כעת לאייפון בחנות App Store. גרסת אנדרואיד מתוכננת.",
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
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Meno",
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
  operatingSystem: "iOS",
  inLanguage: "he",
  url: APP_STORE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
  publisher: { "@type": "Organization", name: "Meno" },
};

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

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <div className="lp">
      <JsonLd data={ORGANIZATION_JSONLD} />
      <JsonLd data={WEBSITE_JSONLD} />
      <JsonLd data={MOBILE_APP_JSONLD} />
      <JsonLd data={FAQ_JSONLD} />

      <div className="lp-top-banner">
        השקה ראשונית · אפליקציה בעברית למעקב תסמיני טרום גיל המעבר וגיל המעבר
      </div>

      <header className="lp-header">
        <div className="lp-container lp-nav">
          <Link href="/" className="lp-logo" aria-label="Meno home">
            <img
              src="/logo.png"
              alt=""
              className="lp-logo-img"
              loading="lazy"
              decoding="async"
            />
            <span>Meno</span>
          </Link>
          <nav className="lp-nav-links" aria-label="ניווט ראשי">
            <a href="#why">למה לעקוב</a>
            <a href="#track">מה אפשר לעקוב</a>
            <a href="#patterns">דפוסים</a>
            <a href="#doctor">לרופאה</a>
            <a href="#faq">שאלות נפוצות</a>
            <a href="#privacy">פרטיות</a>
            <Link href="/support">תמיכה</Link>
          </nav>
          <a
            className="lp-btn lp-btn-primary"
            href="#download"
            data-event="click_app_store_header"
          >
            להורדת האפליקציה
          </a>
        </div>
      </header>

      <main id="top">
        <section className="lp-hero">
          <div className="lp-container lp-hero-grid">
            <div>
              <div className="lp-eyebrow">מעקב חכם לגיל המעבר · בעברית</div>
              <h1 className="lp-hero-title">
                אפליקציה בעברית למעקב אחרי תסמיני גיל המעבר ופרימנופאוזה
              </h1>
              <p className="lp-hero-lead">
                עקבי אחרי גלי חום, שינה, מצב רוח, מחזור, דימום, תרופות ותוספים
                — וראי דפוסים לאורך זמן במקום לנסות לזכור הכול לבד.
              </p>
              <div className="lp-hero-actions">
                <a
                  className="lp-btn lp-btn-primary"
                  href="#download"
                  data-event="click_app_store_hero"
                >
                  להורדת האפליקציה
                </a>
                <a className="lp-btn lp-btn-secondary" href="#why">
                  איך זה עובד?
                </a>
              </div>
              <div className="lp-trust-line">
                חינמית להתחלה · בעברית · לא מחליפה ייעוץ רפואי
              </div>
            </div>

            <div className="lp-phone-wrap" aria-hidden="true">
              <div className="lp-blob" />
              <div className="lp-phone">
                <div className="lp-phone-screen">
                  <div className="lp-phone-top">
                    <span>היום</span>
                    <span>המעקב שלך</span>
                  </div>
                  <div className="lp-phone-title">המעקב החודשי שלך</div>
                  <div className="lp-phone-subtitle">
                    תיעוד יומי קצר שעוזר לראות תמונה רחבה יותר
                  </div>

                  <div className="lp-track-card">
                    <strong>מה הרגשת היום?</strong>
                    <div className="lp-chips">
                      <span className="lp-chip">גלי חום</span>
                      <span className="lp-chip">שינה</span>
                      <span className="lp-chip">מצב רוח</span>
                      <span className="lp-chip">עייפות</span>
                      <span className="lp-chip">ערפול מוחי</span>
                    </div>
                  </div>

                  <div className="lp-track-card">
                    <strong>אירועים ואורח חיים</strong>
                    <div className="lp-chips">
                      <span className="lp-chip">סטרס</span>
                      <span className="lp-chip">נסיעה</span>
                      <span className="lp-chip">אלכוהול</span>
                      <span className="lp-chip">פעילות</span>
                    </div>
                  </div>

                  <div className="lp-track-card">
                    <strong>טרנד גלי חום</strong>
                    <div className="lp-mini-chart">
                      <span className="lp-bar" style={{ height: 34 }} />
                      <span className="lp-bar" style={{ height: 48 }} />
                      <span className="lp-bar" style={{ height: 28 }} />
                      <span className="lp-bar" style={{ height: 58 }} />
                      <span className="lp-bar" style={{ height: 43 }} />
                      <span className="lp-bar" style={{ height: 25 }} />
                    </div>
                  </div>

                  <div className="lp-track-card">
                    <strong>טיפול ותוספים</strong>
                    <div className="lp-chips">
                      <span className="lp-chip">התחלת טיפול</span>
                      <span className="lp-chip">תוסף חדש</span>
                      <span className="lp-chip">שינוי מינון</span>
                    </div>
                  </div>
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
                בגיל המעבר ובפרימנופאוזה (טרום גיל המעבר), תסמינים יכולים
                להשתנות מיום ליום ובמהלך החודש. גלי חום, שינה לא רציפה, שינויי
                מצב רוח, עייפות, מחזור לא סדיר או דימום — קשה לזכור מה קרה,
                מתי, ומה אולי השפיע. גם בשלב המנופאוזה עצמה התסמינים ממשיכים
                להשתנות לאורך זמן.
              </p>
              <p>
                מעקב של כמה שבועות עד חודשים יכול לעזור לראות את התמונה הרחבה:
                מה חוזר על עצמו ובאיזה תבנית, מה מחמיר, מה משתפר, ואיך
                התסמינים משפיעים על החיים. ואם את כבר נוטלת הורמונים או
                תוספים — איך הם משפיעים והאם זה מספיק טוב עבורך?
              </p>
            </div>
            <div className="lp-card">
              <div className="lp-icon">✓</div>
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
              <h2>כל מה שחשוב למעקב — במקום אחד</h2>
              <p>
                תיעוד פשוט של תסמינים, אירועים, טיפול ומדדים שיכולים לעזור להבין
                מה באמת קורה לאורך זמן.
              </p>
            </div>

            <div className="lp-grid-3">
              <div className="lp-card">
                <div className="lp-icon">🔥</div>
                <h3>תסמינים</h3>
                <p>
                  גלי חום, הזעות לילה, שינה, מצב רוח, עייפות, כאבים, ערפול מוחי
                  ועוד.
                </p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">🩸</div>
                <h3>מחזור ודימום</h3>
                <p>
                  תיעוד מחזור, דימום, שינויים בתדירות ובעוצמה לאורך זמן.
                </p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">🌿</div>
                <h3>אירועים ואורח חיים</h3>
                <p>
                  סטרס, נסיעות, אלכוהול, פעילות גופנית, שינויים בשגרה ועוד.
                </p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">💊</div>
                <h3>תרופות ותוספים</h3>
                <p>
                  מעקב אחרי טיפול תרופתי, טיפול הורמונלי אם רלוונטי, תוספים
                  ושינויים בטיפול.
                </p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">⌚</div>
                <h3>שינה ופעילות</h3>
                <p>
                  חיבור ל־Apple Health או שעון חכם כדי להוסיף נתוני שינה ופעילות
                  לתמונה הכוללת.
                </p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">📈</div>
                <h3>תמונה לאורך זמן</h3>
                <p>
                  מבט פשוט על טרנדים, קשרים אפשריים ושינויים אחרי טיפול או שינוי
                  באורח החיים.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="patterns">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>אחרי כמה שבועות, מתחילים לראות תמונה ברורה יותר</h2>
              <p>
                המעקב הופך תחושות יומיומיות למידע שאפשר להבין, להשוות ולשתף.
              </p>
            </div>

            <div className="lp-grid-3">
              <div className="lp-card">
                <div className="lp-icon">📊</div>
                <h3>זיהוי טרנדים</h3>
                <p>האם התסמינים משתפרים, מחמירים או חוזרים בדפוס מסוים.</p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">🔗</div>
                <h3>קשרים אפשריים</h3>
                <p>למשל בין שינה, סטרס, אלכוהול, נסיעה או פעילות לבין תסמינים.</p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">🧭</div>
                <h3>מעקב אחרי טיפול</h3>
                <p>ראי מה קרה אחרי התחלת תרופה, תוסף או שינוי בטיפול.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>בלי מעקב מסודר מול עם Meno</h2>
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
              <div className="lp-comparison-row" role="row">
                <div role="cell">מנסה לזכור מה קרה החודש</div>
                <div role="cell">רואה תיעוד יומי מסודר</div>
              </div>
              <div className="lp-comparison-row" role="row">
                <div role="cell">קשה להבין אם טיפול עזר</div>
                <div role="cell">רואה שינוי לאורך זמן</div>
              </div>
              <div className="lp-comparison-row" role="row">
                <div role="cell">שיחה כללית עם הרופאה</div>
                <div role="cell">מגיעה עם תמונה ברורה יותר</div>
              </div>
              <div className="lp-comparison-row" role="row">
                <div role="cell">תסמינים מנותקים מהקשר</div>
                <div role="cell">
                  רואה קשרים אפשריים לשינה, סטרס, אירועים וטיפול
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" id="doctor">
          <div className="lp-container">
            <div className="lp-doctor-box">
              <div>
                <h2>להגיע לרופאה עם תמונה מסודרת יותר</h2>
                <p>
                  אחרי תקופה של מעקב, תוכלי לשתף עם הרופאה המטפלת מידע ברור
                  יותר על התסמינים, התדירות, ההשפעה על החיים, טיפול שניסית
                  ושינויים שקרו לאורך זמן. זה יכול להפוך את השיחה לממוקדת
                  יותר, ואת התאמת הטיפול למדויקת יותר עבורך.
                </p>
                <p>
                  וגם אחרי שכבר התאזנת על טיפול מסוים — הדברים דינמיים
                  ומשתנים כל הזמן. במקום להיתקע על טיפול שכבר לא רלוונטי
                  עבורך, המעקב יעזור לך ולרופאה לזהות שאולי צריך לעשות שוב
                  שינוי והתאמה.
                </p>
                <a
                  className="lp-btn lp-btn-on-dark"
                  href="#download"
                  data-event="click_app_store_doctor"
                >
                  התחילי לבנות את המעקב שלך
                </a>
              </div>
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
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft">
          <div className="lp-container lp-split">
            <div>
              <h2>למי Meno יכולה להתאים?</h2>
              <p>
                אם את רוצה להבין טוב יותר מה קורה בגוף לאורך זמן, Meno יכולה
                לעזור לך לעשות סדר.
              </p>
            </div>
            <ul className="lp-bullets">
              <li>
                <span className="lp-check">✓</span>
                <span>את בפרימנופאוזה או בגיל המעבר ורוצה להבין מה קורה בגוף</span>
              </li>
              <li>
                <span className="lp-check">✓</span>
                <span>יש לך גלי חום, שינה לא טובה, מצב רוח משתנה או עייפות</span>
              </li>
              <li>
                <span className="lp-check">✓</span>
                <span>המחזור השתנה או שיש דימום שאת רוצה לתעד</span>
              </li>
              <li>
                <span className="lp-check">✓</span>
                <span>
                  התחלת טיפול או תוסף ורוצה לעקוב אחרי השפעה לאורך זמן, וגם
                  לעזור לרופאה להבין אם יש צורך בשינויים
                </span>
              </li>
              <li>
                <span className="lp-check">✓</span>
                <span>את רוצה להגיע לרופאה עם מידע מסודר ולא רק תחושה כללית</span>
              </li>
              <li>
                <span className="lp-check">✓</span>
                <span>יש לך שעון חכם ואת רוצה לשלב נתוני שינה ופעילות</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="lp-section" id="what-to-track">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>מה כדאי לעקוב בגיל המעבר?</h2>
              <p>
                ארבע קבוצות שמרכיבות יחד תמונה אמיתית של מה שעובר עלייך
                בפרימנופאוזה ובגיל המעבר.
              </p>
            </div>

            <div className="lp-grid-2">
              <div className="lp-card">
                <h3>תסמינים</h3>
                <p>
                  גלי חום, הזעות לילה, שינה לא רציפה, מצב רוח, עייפות, ערפול
                  מוחי וכאבים.
                </p>
              </div>
              <div className="lp-card">
                <h3>מחזור ודימום</h3>
                <p>
                  מחזור לא סדיר בפרימנופאוזה, דימום בין וסתות, שינוי בעוצמה,
                  וכל דימום חריג שחשוב לתעד ולדווח עליו לרופאה.
                </p>
              </div>
              <div className="lp-card">
                <h3>תרופות, הורמונים ותוספים</h3>
                <p>
                  טיפול הורמונלי, תרופות, תוספים, שינוי מינון, התחלה או הפסקה
                  של טיפול — מתי ואיך השפיעו על התסמינים.
                </p>
              </div>
              <div className="lp-card">
                <h3>טריגרים ואורח חיים</h3>
                <p>
                  סטרס, אלכוהול, קפה, פעילות גופנית, איכות שינה ונסיעות —
                  המרכיבים שלפעמים משפיעים יותר ממה שנראה.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="privacy">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>המידע שלך נשאר שלך</h2>
              <p>
                המעקב בגיל המעבר הוא אישי. Meno נבנתה כדי לאפשר לך לתעד מידע
                רגיש בצורה פשוטה, דיסקרטית וברורה.
              </p>
            </div>
            <div className="lp-grid-2">
              <div className="lp-card">
                <div className="lp-icon">🇮🇱</div>
                <h3>עברית מלאה</h3>
                <p>חוויה שמדברת בשפה שלך ומתאימה לנשים בישראל.</p>
              </div>
              <div className="lp-card">
                <div className="lp-icon">🔒</div>
                <h3>פרטיות ואמון</h3>
                <p>המידע הרגיש שלך צריך להיות ברור, נגיש ודיסקרטי.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" id="faq">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>שאלות נפוצות על גיל המעבר ופרימנופאוזה</h2>
              <p>
                התשובות כאן הן מידע כללי בלבד, ולא תחליף לייעוץ רפואי אישי.
              </p>
            </div>

            <div className="lp-faq">
              {FAQ.map(({ q, a }, i) => (
                <details key={i} className="lp-faq-item" data-event="click_faq_question" data-q-index={i}>
                  <summary>
                    <span>{q}</span>
                    <span className="lp-faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="lp-faq-answer">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="download">
          <div className="lp-container">
            <div className="lp-cta-final">
              <h2>התחילי היום מעקב שיעזור לך להבין את החודש הקרוב</h2>
              <p>
                כמה דקות ביום יכולות לעזור לך לבנות תמונה ברורה יותר של מה
                שקורה בגוף שלך.
              </p>
              <div className="lp-download-badges">
                <a
                  className="lp-store-link"
                  href={buildAppStoreUrl("download_section_apple")}
                  aria-label="הורדה מ-App Store"
                  data-event="click_app_store_download_section"
                >
                  <img
                    src="/badge-appstore.svg"
                    alt="App Store"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <span
                  className="lp-store-link lp-store-link-coming"
                  aria-disabled="true"
                  aria-label="Google Play — בקרוב"
                >
                  <img
                    src="/badge-googleplay.svg"
                    alt="Google Play"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="lp-store-coming-pill">בקרוב</span>
                </span>
              </div>
              <p className="lp-download-note">
                Meno זמינה כעת לאייפון. גרסת אנדרויד מתוכננת.
              </p>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-disclaimer">
          <div className="lp-container">
            <div className="lp-trust-block">
              <h3>נבנתה כדי לעזור לך לעקוב — לא כדי לאבחן</h3>
              <p>
                Meno עוזרת לך לתעד תסמינים, מחזור, דימום, תרופות, תוספים
                ושינויים לאורך זמן. היא אינה מחליפה ייעוץ רפואי, אבחון או
                טיפול. במקרה של דימום חריג, כאבים חזקים, תסמינים חדשים או חשש
                רפואי — יש לפנות לרופאה או לגורם רפואי מוסמך.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-container lp-footer-grid">
          <div>© 2026 Meno. כל הזכויות שמורות.</div>
          <div className="lp-footer-links">
            <a href="#faq">שאלות נפוצות</a>
            <Link href="/privacy">מדיניות פרטיות</Link>
            <Link href="/terms">תנאי שימוש</Link>
            <Link href="/support">תמיכה</Link>
            <a href="mailto:contact@menoapp.health">צרי קשר</a>
          </div>
        </div>
      </footer>

      <div className="lp-mobile-sticky">
        <a
          className="lp-btn lp-btn-primary"
          href="#download"
          data-event="click_app_store_mobile_sticky"
        >
          להורדת האפליקציה
        </a>
      </div>
    </div>
  );
}
