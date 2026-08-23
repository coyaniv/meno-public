"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { analyticsEnabled } from "./analytics-enabled";

const REFERRAL_SOURCES = ["dr_zehavi", "drzehavi.com", "drzehavi"];

export default function ReferralBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = (params.get("utm_source") ?? "").toLowerCase();
    if (!REFERRAL_SOURCES.includes(source)) return;
    setVisible(true);
    if (!analyticsEnabled()) return;
    const props = {
      referral_source: source,
      referral_campaign: params.get("utm_campaign") ?? "",
    };
    window.gtag?.("event", "doctor_referral_visit", props);
    posthog.capture("doctor_referral_visit", props);
  }, []);

  if (!visible) return null;

  return (
    <div className="lp-referral-banner" role="status">
      <span>
        הגעת בהמלצת ד״ר זהבי הורוביץ-קוגלר 💜 Meno היא האפליקציה שמלווה את
        המעקב בייעוץ איתה.
      </span>
      <button
        type="button"
        aria-label="סגירת הודעה"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  );
}
