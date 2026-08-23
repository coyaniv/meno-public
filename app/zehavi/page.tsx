import type { Metadata } from "next";
import ZehaviRedirect from "./redirect";

const TARGET =
  "/?utm_source=dr_zehavi&utm_medium=vanity_url&utm_campaign=doctor_referral";

export const metadata: Metadata = {
  title: "Meno — בהמלצת ד״ר זהבי הורוביץ-קוגלר",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function ZehaviPage() {
  return (
    <>
      {/* Fallback for browsers without JS — React hoists this to <head>. */}
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <ZehaviRedirect target={TARGET} />
      <p style={{ padding: 24, textAlign: "center" }}>
        מעבירה אותך ל־Meno… <a href={TARGET}>לחצי כאן אם הדף לא נטען</a>
      </p>
    </>
  );
}
