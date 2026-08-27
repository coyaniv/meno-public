"use client";

import Link from "next/link";
import { useState } from "react";
import { CookiePreferencesButton } from "./cookie-consent-banner";

const PAGE_LINKS = [
  { href: "/guide", label: "מדריכים" },
  { href: "/quiz", label: "שאלון" },
  { href: "/for-clinicians", label: "לרופאות" },
];

const HOME_LINKS = [
  { href: "/#why", label: "למה לעקוב" },
  { href: "/#track", label: "מה מתעדים" },
  { href: "/guide", label: "מדריכים" },
  { href: "/quiz", label: "שאלון" },
  { href: "/#faq", label: "שאלות נפוצות" },
  { href: "/for-clinicians", label: "לרופאות" },
];

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = home ? HOME_LINKS : PAGE_LINKS;

  return (
    <>
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
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="lp-nav-actions">
            <Link
              className="lp-btn lp-btn-primary lp-nav-cta"
              href="/#download"
              data-event="cta_download_header"
            >
              להורדת האפליקציה
            </Link>

            <button
              type="button"
              className="lp-nav-toggle"
              aria-expanded={open}
              aria-controls="lp-mobile-menu"
              aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav id="lp-mobile-menu" className="lp-mobile-menu" aria-label="ניווט">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              className="lp-btn lp-btn-primary"
              href="/#download"
              data-event="cta_download_header"
              onClick={() => setOpen(false)}
            >
              להורדת האפליקציה
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <p className="lp-footer-disclaimer">
          Meno מסייעת לך לעקוב אחר תסמינים ושינויים לאורך זמן ולהגיע מוכנה
          יותר לשיחה עם הרופא/ה. המידע באפליקציה אינו מהווה ייעוץ רפואי,
          אבחון או טיפול.
        </p>
        <div className="lp-footer-grid">
          <div>© 2026 Meno. כל הזכויות שמורות.</div>
          <div className="lp-footer-links">
            <Link href="/guide">מדריכים</Link>
            <Link href="/quiz">שאלון תסמינים</Link>
            <Link href="/tracking">למה לעקוב</Link>
            <Link href="/for-clinicians">לרופאות ומרפאות</Link>
            <Link href="/privacy">מדיניות פרטיות</Link>
            <Link href="/terms">תנאי שימוש</Link>
            <Link href="/support">תמיכה</Link>
            <a href="mailto:contact@menoapp.health">צרי קשר</a>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
