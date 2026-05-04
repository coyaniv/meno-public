import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferencesButton } from "../cookie-consent-banner";

export const metadata: Metadata = {
  title: "תמיכה",
  description:
    "מרכז התמיכה של Meno — שאלות נפוצות, פנייה אלינו, ועזרה בשימוש באפליקציה למעקב גיל המעבר ופרימנופאוזה.",
  alternates: { canonical: "/support" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "תמיכה · Meno",
    description: "שאלות נפוצות ופנייה לתמיכה של Meno.",
    url: "/support",
    type: "website",
    locale: "he_IL",
  },
};

const SUPPORT_FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "איך יוצרים חשבון ב־Meno?",
    a: "מורידים את Meno מ-App Store, פותחים את האפליקציה ועוקבים אחרי תהליך ההרשמה הקצר. כל המעקב מתחיל ישירות אחרי ההרשמה.",
  },
  {
    q: "האם המידע שלי פרטי?",
    a: (
      <>
        מידע על תסמינים, מחזור ודימום הוא מידע אישי ורגיש, ו־Meno נבנתה מתוך
        התייחסות לכך. את הפרטים המלאים — איך המידע נשמר, מתי הוא נמחק, ומה
        נמצא בשליטתך — אפשר לקרוא ב<Link href="/privacy">מדיניות הפרטיות</Link>.
      </>
    ),
  },
  {
    q: "איך מוחקים את החשבון?",
    a: (
      <>
        אפשר למחוק את החשבון דרך מסך הפרופיל באפליקציה, או לשלוח לנו בקשה
        למייל{" "}
        <a href="mailto:support@menoapp.health">support@menoapp.health</a> ונטפל
        בה תוך כמה ימי עסקים. ראי גם את עמוד{" "}
        <Link href="/delete-account">מחיקת חשבון</Link>.
      </>
    ),
  },
  {
    q: "האם Meno מחליפה ייעוץ רפואי?",
    a: "לא. Meno היא כלי תיעוד ומעקב — לא כלי אבחון או טיפול. בכל החלטה רפואית, התאמת טיפול הורמונלי, תוספים, או תסמינים שמטרידים אותך — חשוב להיוועץ ברופאה או ברופא מוסמך.",
  },
  {
    q: "האם Meno זמינה גם לאנדרואיד?",
    a: "כעת Meno זמינה ל-iPhone דרך App Store. גרסת אנדרואיד מתוכננת.",
  },
  {
    q: "מצאתי באג או יש לי בקשה לשיפור — איך להעביר אלייכם?",
    a: (
      <>
        נשמח לשמוע. שלחי מייל ל־
        <a href="mailto:support@menoapp.health">support@menoapp.health</a> עם
        תיאור קצר של מה שקרה, ואם אפשר גם צילום מסך. כל פנייה נקראת על־ידי
        הצוות שעובד ישירות על האפליקציה.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <div className="lp">
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
            <Link href="/#why">למה לעקוב</Link>
            <Link href="/#track">מה אפשר לעקוב</Link>
            <Link href="/#faq">שאלות נפוצות</Link>
            <Link href="/#privacy">פרטיות</Link>
            <Link href="/support">תמיכה</Link>
          </nav>
          <Link className="lp-btn lp-btn-primary" href="/#download">
            התחילי לעקוב
          </Link>
        </div>
      </header>

      <main>
        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-section-header">
              <h1>מרכז תמיכה</h1>
              <p>
                ריכזנו כאן את השאלות שאנחנו שומעות הכי הרבה. אם משהו לא מופיע
                — נשמח שתכתבי לנו.
              </p>
            </div>

            <div className="lp-trust-block" style={{ textAlign: "right" }}>
              <h3>צריכה עזרה? כתבי לנו</h3>
              <p>
                שלחי מייל ל־{" "}
                <a href="mailto:support@menoapp.health">
                  support@menoapp.health
                </a>{" "}
                ונחזור אלייך בהקדם. כל פנייה מגיעה ישירות לצוות שעובד על
                Meno — לא למוקד שירות חיצוני.
              </p>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft" id="faq">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>שאלות נפוצות</h2>
              <p>
                מידע מעשי על השימוש ב-Meno, פרטיות, ומה היא לא מתיימרת להחליף.
              </p>
            </div>

            <div className="lp-faq">
              {SUPPORT_FAQ.map(({ q, a }, i) => (
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
            <Link href="/#faq">שאלות נפוצות</Link>
            <Link href="/privacy">מדיניות פרטיות</Link>
            <Link href="/terms">תנאי שימוש</Link>
            <Link href="/support">תמיכה</Link>
            <a href="mailto:contact@menoapp.health">צרי קשר</a>
            <CookiePreferencesButton />
          </div>
        </div>
      </footer>
    </div>
  );
}
