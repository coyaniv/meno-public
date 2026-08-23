/**
 * Cloudflare Pages Function — receives the clinician lead form.
 *
 * The site is a Next static export, so there is no Next API route to use. Pages
 * Functions run at the edge alongside the static output.
 *
 * It only writes the row. Notification is a Supabase Database Webhook on
 * clinic_leads → the notify-telegram edge function, which is the same notifier
 * the iOS app's consultation_requests uses. One notifier, two sources — nothing
 * to keep in sync here.
 *
 * This function holds the service-role key, so the browser never gets a
 * Supabase credential and the table cannot be written to directly.
 *
 * Environment variables (Pages project → Settings → Environment variables):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (encrypt this one)
 */

type Env = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
};

type Ctx = { request: Request; env: Env };

const MAX = 2000;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const clean = (v: unknown) => String(v ?? "").trim().slice(0, MAX) || null;

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }

  // Honeypot — the form ships a hidden "website" field no human fills in.
  // Answer 200 so bots get no signal that they were caught.
  if (data.website) return json({ ok: true });

  const name = clean(data.name);
  const email = clean(data.email);

  if (!name) return json({ error: "name" }, 400);
  if (!email || !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email) || email.length > 200) {
    return json({ error: "email" }, 400);
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "not configured" }, 500);
  }

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/clinic_leads`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      email,
      clinic: clean(data.clinic),
      role: clean(data.role),
      volume: clean(data.volume),
      phone: clean(data.phone),
      message: clean(data.message),
      source: "website",
    }),
  });

  if (!res.ok) {
    console.error("supabase insert failed", res.status, await res.text());
    return json({ error: "save failed" }, 502);
  }

  return json({ ok: true });
};
