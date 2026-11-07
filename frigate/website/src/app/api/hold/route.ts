import { connection } from "next/server";
import { site } from "@/content/site";
import { rates, formatPrice } from "@/content/rates";
import { experienceOptions } from "@/lib/inquiry";
import { slotLabel } from "@/lib/availability";
import { confirmHold, findHold, releaseHold, type Hold } from "@/lib/holds";
import { calendarLink } from "@/lib/notify";

/**
 * The captain's links from a booking email.
 *
 * GET ?id&t            a page showing the held request, with a button to deny it
 * GET ?id&t&do=confirm marks it confirmed and opens Google Calendar
 * POST id, t           denies the request and reopens its time
 *
 * Denying only happens on POST, so link scanners in email apps that open
 * links can't deny a trip by accident.
 */

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  });
}

function describe(h: Hold) {
  const exp = experienceOptions.find((o) => o.value === h.experience)?.label ?? h.experience;
  const rate = rates.find((r) => String(r.hours) === h.tripLength);
  const when = h.tripLength === "4" ? `${slotLabel[h.slot || "am"]} half day` : rate?.name ?? "Trip";
  return { exp, rate, when };
}

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)} · Frigate</title></head>
<body style="margin:0;background:#f4eee1;color:#2a2721;font-family:Arial,sans-serif;padding:24px 16px">
<main style="max-width:560px;margin:0 auto;background:#fbf8f1;border:1px solid #d9cbb0;border-radius:6px;padding:24px">${body}</main></body></html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

const btn = (primary: boolean) =>
  `display:inline-block;margin:0 8px 10px 0;padding:14px 20px;border-radius:4px;font:700 15px Arial,sans-serif;text-decoration:none;cursor:pointer;${
    primary ? "background:#33594f;color:#fbf8f1;border:0" : "background:#fbf8f1;color:#2a2721;border:1.5px solid #2a2721"
  }`;

function details(h: Hold) {
  const { exp, rate, when } = describe(h);
  const rows: [string, string][] = [
    ["Date", longDate(h.date)],
    ["Time", when],
    ["Trip", rate ? `${rate.name}, ${formatPrice(rate.price)}` : h.tripLength],
    ["Fishing", exp],
    ["Anglers", String(h.guests)],
    ["Name", h.name],
    ["Phone", h.phone],
    ["Email", h.email],
    ["Reference", h.ref],
  ];
  return `<table style="width:100%;border-collapse:collapse;font-size:15px;margin:12px 0 20px">${rows
    .map(([k, v]) => `<tr><td style="padding:7px 12px 7px 0;border-top:1px solid #e9dfca;color:#5c574c">${k}</td><td style="padding:7px 0;border-top:1px solid #e9dfca;font-weight:700">${esc(v)}</td></tr>`)
    .join("")}</table>`;
}

const notFound = () =>
  page(
    "Request not found",
    `<h1 style="font:400 24px Georgia,serif;margin:0 0 8px">This request isn't held anymore</h1><p style="color:#5c574c;line-height:1.5">It may already have been denied, or the link is incomplete. Nothing else needs doing.</p>`,
    404,
  );

export async function GET(request: Request) {
  await connection();
  const q = new URL(request.url).searchParams;
  const hold = await findHold(q.get("id") ?? "", q.get("t") ?? "");
  if (!hold) return notFound();

  if (q.get("do") === "confirm") {
    await confirmHold(hold);
    return Response.redirect(calendarLink({ ...hold, kind: "booking" }), 303);
  }

  const { when } = describe(hold);
  const status =
    hold.status === "confirmed"
      ? "You confirmed this trip. Its time stays blocked on the website."
      : "Waiting for you to confirm. Its time is held on the website so nobody else can book it.";
  return page(
    "Booking request",
    `<p style="margin:0 0 4px;font:13px 'Courier New',monospace;color:#a85a2a">Booking request ${esc(hold.ref)}</p>
<h1 style="font:400 24px Georgia,serif;margin:0 0 8px">${esc(hold.name)}, ${esc(longDate(hold.date))}</h1>
<p style="color:#5c574c;line-height:1.5;margin:0">${status}</p>
${details(hold)}
<form method="post" action="/api/hold" style="margin:0">
<input type="hidden" name="id" value="${esc(hold.id)}"><input type="hidden" name="t" value="${esc(hold.token)}">
<button type="submit" style="${btn(false)}">${hold.status === "confirmed" ? "Cancel the trip &amp; reopen the date" : "Deny &amp; reopen the date"}</button>
</form>
<p style="font-size:13px;color:#5c574c;line-height:1.5;margin:6px 0 0">This frees the ${esc(when.toLowerCase())} on ${esc(longDate(hold.date))} on your website right away.${
      hold.status === "confirmed" ? " If you saved it to your calendar, delete that event too." : ""
    }</p>`,
  );
}

export async function POST(request: Request) {
  await connection();
  const form = await request.formData().catch(() => null);
  const hold = await findHold(String(form?.get("id") ?? ""), String(form?.get("t") ?? ""));
  if (!hold) return notFound();
  await releaseHold(hold);

  const { exp, when } = describe(hold);
  const first = hold.name.split(" ")[0];
  const mail = `mailto:${hold.email}?${new URLSearchParams({
    subject: `Your Frigate trip request for ${longDate(hold.date)}`,
    body: `Hi ${first},\n\nThanks so much for reaching out about ${exp.toLowerCase()} on ${longDate(hold.date)}. Unfortunately I'm not able to take that trip (${when.toLowerCase()}). I'd love to get you out on another day, so take a look at the calendar on the website or reply with a few dates that work for you.\n\nTight lines,\n${site.name}\n${site.phone}`,
  })
    .toString()
    .replace(/\+/g, "%20")}`;
  return page(
    "Date reopened",
    `<p style="margin:0 0 4px;font:13px 'Courier New',monospace;color:#a85a2a">Booking request ${esc(hold.ref)}</p>
<h1 style="font:400 24px Georgia,serif;margin:0 0 8px">Done. The date is open again.</h1>
<p style="color:#5c574c;line-height:1.5">The ${esc(when.toLowerCase())} on ${esc(longDate(hold.date))} can be booked on your website again.</p>
<a href="${esc(mail)}" style="${btn(true)}">Let ${esc(first)} know</a>`,
  );
}
