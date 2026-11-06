import { inquirySchema, toFieldErrors, type InquiryResponse } from "@/lib/inquiry";
import { getBookedDates } from "@/lib/booked-dates";

/**
 * Receives booking requests and contact messages.
 *
 * Delivery: set INQUIRY_WEBHOOK_URL to any endpoint that accepts a JSON
 * POST (Zapier, Make, n8n, Formspree, your CRM or booking system). Each
 * request is forwarded there. Without it, development accepts requests so
 * the flow can be tested, and production refuses them with a clear message
 * so no customer believes a request was sent when it was not.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function reply(body: InquiryResponse, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function makeRef() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "REQ-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return reply(
      { ok: false, error: "Too many requests from this connection. Wait a few minutes, then try again." },
      429,
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return reply({ ok: false, error: "The request could not be read. Refresh the page and try again." }, 400);
  }

  // Bots fill the hidden "website" field; accept silently and drop.
  if (json && typeof json === "object" && "website" in json && (json as { website?: string }).website) {
    return reply({ ok: true, ref: makeRef(), delivered: true });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return reply(
      { ok: false, error: "Some details need attention.", fieldErrors: toFieldErrors(parsed.error) },
      422,
    );
  }

  // A date can be booked between loading the form and sending it.
  if (parsed.data.kind === "booking") {
    const { dates } = await getBookedDates();
    if (dates.includes(parsed.data.date)) {
      return reply(
        {
          ok: false,
          error: "That date has just been booked.",
          fieldErrors: { date: "That date has just been booked. Choose another date." },
        },
        409,
      );
    }
  }

  const ref = makeRef();
  const { website: _honeypot, ...data } = parsed.data;
  void _honeypot;
  const payload = { ref, receivedAt: new Date().toISOString(), ...data };
  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      return reply(
        {
          ok: false,
          error:
            "Online requests are not switched on yet. Please call or email us and we will help you directly.",
        },
        503,
      );
    }
    console.info(`[inquiry] ${ref} (${data.kind}) received in development. Not delivered: INQUIRY_WEBHOOK_URL is not set.`);
    return reply({ ok: true, ref, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error(`[inquiry] ${ref} delivery failed:`, err instanceof Error ? err.message : err);
    return reply(
      {
        ok: false,
        error: "Your request could not be sent just now. Try again in a moment, or call or email us.",
      },
      502,
    );
  }

  return reply({ ok: true, ref, delivered: true });
}
