"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { analyticsEnabled } from "./analytics-enabled";

const POSTHOG_KEY = "phc_xcCFopv8wTVd79MM7nPNKpZrvsUcTJoePRT8JbCga2Bi";

// EU region. Verified against the token: us.i.posthog.com rejects it with a 401,
// eu.i.posthog.com accepts it. Pointing at the wrong region fails silently in
// the browser, so this is not a detail to guess at.
const POSTHOG_HOST = "https://eu.i.posthog.com";


/**
 * PostHog for the marketing site, deliberately configured tighter than the
 * defaults because this is a health site.
 *
 * - `autocapture: false`. The default records every click target, and /quiz is a
 *   menopause self-assessment — autocapture there would ship a woman's symptom
 *   answers to a third-party analytics vendor as element text. Events are
 *   explicit instead, via the `data-event` attributes AnalyticsTracker reads.
 * - `disable_session_recording`. Same reason, more so: a replay of the quiz or
 *   any future logged-in view is a recording of health data.
 * - `person_profiles: "identified_only"`. Anonymous visitors get events but no
 *   stored person profile, which keeps the profile store empty of people who
 *   only ever read an article.
 *
 * Loads only where `analyticsEnabled()` says so — see that module for why the
 * check is an allowlist.
 */
export default function PostHogProvider() {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!analyticsEnabled()) return;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      autocapture: false,
      disable_session_recording: true,
      capture_pageview: false, // handled below, so client-side routes count too
      capture_pageleave: true,
      sanitize_properties: (properties) => {
        // Query strings on this site carry campaign tags, never personal data —
        // but strip anything unexpected rather than trust that stays true.
        const allowed = new Set([
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_content",
          "utm_term",
        ]);
        const url = properties.$current_url;
        if (typeof url === "string" && url.includes("?")) {
          try {
            const parsed = new URL(url);
            for (const key of [...parsed.searchParams.keys()]) {
              if (!allowed.has(key)) parsed.searchParams.delete(key);
            }
            properties.$current_url = parsed.toString();
          } catch {
            /* leave it alone if it will not parse */
          }
        }
        return properties;
      },
    });
    setReady(true);
  }, []);

  // App Router navigations do not reload the page, so without this only the
  // first URL of a session is ever recorded.
  useEffect(() => {
    if (!ready || !analyticsEnabled()) return;
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname, ready]);

  return null;
}
