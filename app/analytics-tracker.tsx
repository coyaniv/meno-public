"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { analyticsEnabled } from "./analytics-enabled";

declare global {
  interface Window {
    gtag?: (command: string, name: string, params?: Record<string, unknown>) => void;
  }
}

export default function AnalyticsTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!el) return;
      const name = el.getAttribute("data-event");
      if (!name) return;
      const params: Record<string, unknown> = {};
      const qIndex = el.getAttribute("data-q-index");
      if (qIndex !== null) params.question_index = Number(qIndex);
      const store = el.getAttribute("data-store");
      if (store !== null) params.store = store;
      const href = (el as HTMLAnchorElement).href;
      if (href) params.link_url = href;
      // Same event to both destinations while GA4 and PostHog run side by side.
      // Gated here rather than trusting each SDK to drop pre-init calls.
      if (!analyticsEnabled()) return;
      window.gtag?.("event", name, params);
      posthog.capture(name, params);
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
  return null;
}
