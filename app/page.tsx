import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/il/app/meno-%D7%9C%D7%99%D7%95%D7%95%D7%99-%D7%90%D7%99%D7%A9%D7%99-%D7%9C%D7%92%D7%99%D7%9C-%D7%94%D7%9E%D7%A2%D7%91%D7%A8/id6759288559";

function buildAppStoreUrl(medium: string) {
  return `${APP_STORE_URL}?utm_source=landing_page&utm_medium=${medium}&utm_campaign=beta_launch`;
}

export default function HomePage() {
  return (
    <div className="lp">
      <div className="lp-top-banner">
        השקה ראשונית · אפליקציה בעברית למעקב תסמיני טרום גיל המעבר וגיל המעבר
      </div>

      <header className="lp-header">
        <div className="lp-container lp-nav">
          <Link href="/" className="lp-logo" aria-label="Meno home">
            <img src="/logo.png" alt="" className="lp-logo-img" />
            <span>Meno</span>
          </Link>
          <nav className="lp-nav-links" aria-label="ניווט ראשי">
            <a href="#why">למה לעקוב</a>
            <a href="#track">מה אפשר לעקוב</a>
            <a href="#patterns">דפוסים</a>
            <a href="#doctor">לרופאה</a>
            <a href="#privacy">פרטיות</a>
            <Link href="/support">תמיכה</Link>
          </nav>
          <a className="lp-btn lp-btn-primary" href="#download">
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
                עקבי אחרי תסמיני גיל המעבר לאורך זמן
              </h1>
              <p className="lp-hero-lead">
                מרכזת תסמינים, אירועים ונתוני שינה/פעילות, ווסת או דימומים,
                תרופות ותוספים — כדי לעזור לך לזהות דפוסים, להבין מה משפיע
                עלייך ולהגיע מוכנה יותר לרופאה.
              </p>
              <div className="lp-hero-actions">
                <a className="lp-btn lp-btn-primary" href="#download">
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
                בגיל המעבר ופרימנופאוזה, תסמינים יכולים להשתנות מיום ליום
                ובמהלך החודש. גלי חום, שינה לא רציפה, שינויי מצב רוח, עייפות,
                מחזור לא סדיר או דימום — קשה לזכור מה קרה, מתי, ומה אולי השפיע.
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
                <a className="lp-btn lp-btn-on-dark" href="#download">
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

        <section className="lp-section" id="privacy">
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
                >
                  <img src="/badge-appstore.svg" alt="App Store" />
                </a>
                <span
                  className="lp-store-link lp-store-link-coming"
                  aria-disabled="true"
                  aria-label="Google Play — בקרוב"
                >
                  <img src="/badge-googleplay.svg" alt="Google Play" />
                  <span className="lp-store-coming-pill">בקרוב</span>
                </span>
              </div>
              <p className="lp-download-note">
                Meno זמינה כעת לאייפון. גרסת אנדרויד תושק בקרוב.
              </p>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-disclaimer">
          <div className="lp-container">
            <div className="lp-disclaimer">
              <strong>חשוב לדעת:</strong> Meno אינה מחליפה ייעוץ רפואי, אבחון
              או טיפול. המידע נועד לעזור לך לעקוב, לזהות דפוסים ולהגיע מוכנה
              יותר לשיחה עם גורם רפואי. במקרה של תסמינים חריגים, דימום משמעותי,
              כאבים חזקים או חשש רפואי — יש לפנות לגורם רפואי מוסמך.
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-container lp-footer-grid">
          <div>© 2026 Meno. כל הזכויות שמורות.</div>
          <div className="lp-footer-links">
            <Link href="/privacy">מדיניות פרטיות</Link>
            <Link href="/terms">תנאי שימוש</Link>
            <Link href="/support">תמיכה</Link>
            <a href="mailto:contact@menoapp.health">צרי קשר</a>
          </div>
        </div>
      </footer>

      <div className="lp-mobile-sticky">
        <a className="lp-btn lp-btn-primary" href="#download">
          להורדת האפליקציה
        </a>
      </div>
    </div>
  );
}
