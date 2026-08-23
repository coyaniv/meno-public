// ID-only form. The slug variant embeds the app name, which is changing to
// "Meno - מעקב גיל המעבר" — Apple redirects either way, but this one never goes stale.
export const APP_STORE_URL = "https://apps.apple.com/il/app/id6759288559";

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=health.menoapp.android";

/**
 * Provider Token from App Store Connect → App Analytics → Campaigns ("pt" in the
 * generated campaign link). Leave empty until you copy it from there.
 */
const APPLE_PROVIDER_TOKEN = "";

/**
 * App Store campaign link.
 *
 * Apple silently DROPS `utm_*` — it has never read those params. Web→App Store
 * attribution runs on `pt` (provider token) + `ct` (campaign text), and `ct` is
 * ignored unless `pt` is present, which is why this returns a bare link until
 * APPLE_PROVIDER_TOKEN is filled in.
 *
 * Even with no campaign link, App Store Connect → Analytics → Acquisition still
 * attributes these visits to Source Type "Web Referrer" with domain
 * menoapp.health, so the channel is never fully invisible — only uncampaigned.
 */
export function appStoreLink(campaign: string) {
  if (!APPLE_PROVIDER_TOKEN) return APP_STORE_URL;
  const params = new URLSearchParams({
    pt: APPLE_PROVIDER_TOKEN,
    ct: campaign,
    mt: "8",
  });
  return `${APP_STORE_URL}?${params.toString()}`;
}

/**
 * Google Play campaign link.
 *
 * Play reads a single `referrer` param holding a URL-encoded utm_* string — not
 * loose utm_* params. That one value feeds both Play Console → Grow → Store
 * listing acquisition (as a Third-party referrer) and the Install Referrer API
 * inside the Android app.
 */
export function playStoreLink(campaign: string) {
  const referrer = new URLSearchParams({
    utm_source: "menoapp.health",
    utm_medium: "referral",
    utm_campaign: campaign,
  }).toString();
  const separator = GOOGLE_PLAY_URL.includes("?") ? "&" : "?";
  return `${GOOGLE_PLAY_URL}${separator}referrer=${encodeURIComponent(referrer)}`;
}

/**
 * Shared Physician node. Referenced by @id from every page that carries a
 * medical-review signal, so Google resolves them to one entity.
 */
export const PHYSICIAN = {
  "@type": "Physician",
  "@id": "https://drzehavi.com/#physician",
  name: "Dr. Zehavi Horowitz-Kugler",
  alternateName: "ד״ר זהבי הורוביץ-קוגלר",
  url: "https://drzehavi.com/",
  image: "https://menoapp.health/dr-zehavi.webp",
  medicalSpecialty: ["FamilyMedicine"],
  knowsAbout: [
    "Menopause",
    "Perimenopause",
    "Hormone Replacement Therapy",
    "גיל המעבר",
    "פרימנופאוזה",
    "טיפול הורמונלי",
  ],
};
