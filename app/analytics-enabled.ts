/**
 * The single gate every analytics call goes through.
 *
 * Analytics must never fire from localhost, a LAN IP, or a Cloudflare Pages
 * preview deploy. An earlier split of the GA4 numbers found 89 localhost
 * pageviews and 20 preview users mixed into the totals, which is what this
 * exists to prevent.
 *
 * The check is an explicit allowlist rather than a "not localhost" denylist:
 * new preview domains and tunnel hostnames (ngrok, Tailscale, a phone hitting a
 * dev machine by IP) appear without warning, and every one of them would slip
 * through a denylist.
 *
 * Call sites guard on this themselves rather than relying on an SDK to ignore
 * calls made before it was initialised. That behaviour is undocumented for
 * posthog-js and could change in a minor release; some SDKs buffer such calls
 * and flush them on a later init instead of dropping them.
 */
const PRODUCTION_HOSTS = ["menoapp.health", "www.menoapp.health"];

export function analyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return PRODUCTION_HOSTS.includes(window.location.hostname);
}
