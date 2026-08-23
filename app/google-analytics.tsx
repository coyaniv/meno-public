"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsEnabled } from "./analytics-enabled";

const GA_ID = "G-2FFG3DVB2K";

/**
 * Loads GA4 only on the production domain. Without this the tag also fires from
 * localhost and from Cloudflare Pages preview deployments, which inflates the
 * reports — the hostname split showed 89 localhost pageviews and 20 preview
 * users mixed into the totals.
 */
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(analyticsEnabled());
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
