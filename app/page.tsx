import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Nav */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo-link">
            <span className="nav-logo-text">Meno</span>
            <img src="/logo.png" alt="Meno" className="nav-logo-img" />
          </Link>
          <div className="nav-center">
            <Link href="/" className="nav-link">
              בית
            </Link>
            <Link href="/support" className="nav-link">
              תמיכה
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - centered layout with gradient */}
      <section className="hero">
        <div className="hero-gradient" />
        <div className="hero-inner">
          <h1 className="hero-title">להבין מה עובר על הגוף שלך</h1>
          <p className="hero-subtitle">
            תובנות אישיות ומעקב תסמינים
            <br />
            ליווי מותאם לגיל המעבר
            <br />
            הכל במקום אחד, בעברית.
          </p>

          {/* Phone mockup */}
          <div className="hero-phone">
            <div className="hero-phone-frame">
              <img
                src="/screenshot.png"
                alt="Meno App"
                className="hero-phone-screenshot"
              />
            </div>
          </div>

          {/* Download CTA */}
          <p className="hero-download-label">הורידי את האפליקציה עכשיו</p>
          <div className="hero-store-badges">
            <a
              href="https://play.google.com/store/apps/details?id=health.meno.app"
              className="store-badge"
            >
              <img src="/badge-googleplay.svg" alt="Google Play" width="180" height="53" />
            </a>
            <a
              href="https://apps.apple.com/app/meno"
              className="store-badge"
            >
              <img src="/badge-appstore.svg" alt="App Store" width="180" height="53" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-center">
            <Link href="/" className="nav-logo-link footer-logo-link">
              <span className="footer-brand">Meno</span>
              <img src="/logo.png" alt="Meno" className="nav-logo-img" />
            </Link>
          </div>
          <div className="footer-links-row">
            <Link href="/privacy" className="footer-link">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="footer-link">
              תנאי שימוש
            </Link>
            <a href="mailto:hello@menoapp.health" className="footer-link">
              צרי קשר
            </a>
          </div>
          <p className="footer-copyright">
            &copy; 2026 כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </>
  );
}
