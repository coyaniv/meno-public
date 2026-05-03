"use client";

import { useEffect } from "react";

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
      const href = (el as HTMLAnchorElement).href;
      if (href) params.link_url = href;
      window.gtag?.("event", name, params);
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
  return null;
}
