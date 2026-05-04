"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "meno_cookie_consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(CONSENT_KEY, "dismissed");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="הודעת עוגיות" className="meno-cookie-banner">
      <p className="meno-cookie-banner-text">
        באתר זה נעשה שימוש בעוגיות (Cookies) לצורך מדידה ושיפור חוויית השימוש.
        המשך הגלישה מהווה הסכמה לכך.{" "}
        <Link href="/privacy#cookies" className="meno-cookie-banner-link">
          מדיניות פרטיות
        </Link>
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        className="meno-cookie-banner-btn"
      >
        אישור
      </button>
    </div>
  );
}

export function resetCookieConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_KEY);
  window.location.reload();
}

export function CookiePreferencesButton({
  children = "ניהול העדפות עוגיות",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={resetCookieConsent}
      className={className}
      style={{
        background: "none",
        border: 0,
        padding: 0,
        font: "inherit",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
