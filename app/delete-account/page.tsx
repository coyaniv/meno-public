import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../site-chrome";
import { CookiePreferencesButton } from "../cookie-consent-banner";

export const metadata: Metadata = {
  title: "מחיקת חשבון",
  description:
    "הסבר על מחיקת חשבון, מידע אישי ונתוני מעקב באפליקציית Meno.",
  alternates: { canonical: "/delete-account" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "מחיקת חשבון · Meno",
    description: "מחיקת חשבון ונתונים באפליקציית Meno.",
    url: "/delete-account",
    type: "article",
    locale: "he_IL",
  },
};

export default function DeleteAccountPage() {
  return (
    <div className="lp">
      <SiteHeader />

      <main>
        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-section-header">
              <h1>מחיקת חשבון</h1>
              <p>
                באפשרותך למחוק את חשבונך ואת כל המידע המשויך אליו ישירות מתוך
                האפליקציה. הפעולה מיידית ולא ניתנת לשחזור.
              </p>
            </div>

            <div className="lp-trust-block" style={{ textAlign: "right" }}>
              <h3>כיצד למחוק את החשבון</h3>
              <ol>
                <li>פתחי את אפליקציית Meno</li>
                <li>עברי למסך הפרופיל (הגדרות)</li>
                <li>לחצי על &ldquo;מחיקת חשבון&rdquo;</li>
                <li>אשרי את המחיקה</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-soft">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>אילו נתונים נמחקים</h2>
              <p>מחיקת החשבון מוחקת את כל המידע שלך לצמיתות, כולל:</p>
            </div>

            <div className="lp-trust-block" style={{ textAlign: "right" }}>
              <ul>
                <li>פרטי החשבון (שם, מספר טלפון)</li>
                <li>יומן בריאות, סימפטומים ונתוני מעקב</li>
                <li>תוצאות שאלונים וסיכומים</li>
                <li>כל מידע אחר שהזנת באפליקציה</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>תוך כמה זמן</h2>
              <p>
                המחיקה מתבצעת באופן מיידי. לאחר המחיקה לא ניתן לשחזר את
                המידע.
              </p>
            </div>

            <div className="lp-trust-block" style={{ textAlign: "right" }}>
              <h3>צריכה עזרה?</h3>
              <p>
                אם אינך מצליחה למחוק את החשבון דרך האפליקציה, ניתן לפנות אלינו
                במייל{" "}
                <a href="mailto:support@menoapp.health">
                  support@menoapp.health
                </a>{" "}
                ונטפל בבקשתך.
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
