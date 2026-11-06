import { site } from "@/content/site";
import { rates, formatPrice } from "@/content/rates";
import { experienceOptions } from "@/lib/inquiry";
import { slotTimes } from "@/content/availability";
import { slotLabel, type Slot } from "@/lib/availability";

/**
 * Emails each inquiry to the owner through Resend (resend.com).
 *
 * RESEND_API_KEY  Resend API key.
 * OWNER_EMAIL     Where inquiries go (defaults to the site email).
 * EMAIL_FROM      Sender. Until you verify a domain with Resend, keep the
 *                 default; Resend then only delivers to your own account
 *                 email, which is all this needs.
 *
 * Booking emails include a "Confirm & add to my calendar" button that opens
 * Google Calendar with the trip filled in. Saving it to the bookings
 * calendar is what blocks the time on the website.
 */

type Booking = {
  ref: string;
  kind: "booking";
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  experience: string;
  tripLength: string;
  slot: "am" | "pm" | "";
  message: string;
};
type Contact = { ref: string; kind: "contact"; name: string; email: string; phone: string; message: string };
export type Inquiry = Booking | Contact;

export const emailConfigured = () => !!process.env.RESEND_API_KEY;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

const clock = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
};

/** Suggested start and end for the calendar event (editable before saving). */
export function tripTimes(b: Pick<Booking, "tripLength" | "slot">) {
  const key = b.tripLength === "4" ? (b.slot || "am") : `${b.tripLength}h`;
  return slotTimes[key] ?? slotTimes.am;
}

/** Google Calendar link that opens a new event with the trip filled in. */
export function calendarLink(b: Booking) {
  const exp = experienceOptions.find((o) => o.value === b.experience)?.label ?? b.experience;
  const { start, end } = tripTimes(b);
  const stamp = (t: string) => `${b.date.replace(/-/g, "")}T${t.replace(":", "")}00`;
  const details = [
    `${b.name}, ${b.guests} angler${b.guests === 1 ? "" : "s"}`,
    `Phone: ${b.phone}`,
    `Email: ${b.email}`,
    `Fishing: ${exp}`,
    b.message ? `Notes: ${b.message}` : "",
    `Website request ${b.ref}`,
  ]
    .filter(Boolean)
    .join("\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Frigate trip: ${b.name} (${exp})`,
    dates: `${stamp(start)}/${stamp(end)}`,
    ctz: "America/New_York",
    details,
    location: site.location,
  });
  const calId = bookingsCalendarId();
  if (calId) params.set("src", calId);
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** The bookings calendar's ID, read from its iCal address. */
function bookingsCalendarId() {
  const m = process.env.BOOKING_CALENDAR_ICS_URL?.match(/\/ical\/([^/]+)\//);
  return m ? decodeURIComponent(m[1]) : null;
}

function bookingEmail(b: Booking) {
  const exp = experienceOptions.find((o) => o.value === b.experience)?.label ?? b.experience;
  const rate = rates.find((r) => String(r.hours) === b.tripLength);
  const { start, end } = tripTimes(b);
  const when = b.slot ? `${slotLabel[b.slot as Slot]} half day` : `${rate?.name ?? "Trip"}`;
  const first = b.name.split(" ")[0];
  const subject = `Booking request: ${exp}, ${longDate(b.date)} (${when.toLowerCase()}) from ${b.name}`;

  const reply = `mailto:${b.email}?${new URLSearchParams({
    subject: `Your Frigate trip on ${longDate(b.date)} is confirmed`,
    body: `Hi ${first},\n\nYou're booked! ${exp}, ${when.toLowerCase()}, on ${longDate(b.date)}, for ${b.guests} angler${b.guests === 1 ? "" : "s"}${rate ? ` (${rate.name}, ${formatPrice(rate.price)})` : ""}.\n\nI'll be in touch the day before with the meeting spot and time.\n\nTight lines,\n${site.name}\n${site.phone}`,
  })
    .toString()
    .replace(/\+/g, "%20")}`;

  const rows: [string, string][] = [
    ["Date", longDate(b.date)],
    ["Time", `${when} (suggested ${clock(start)} to ${clock(end)})`],
    ["Trip", rate ? `${rate.name}, ${rate.hours} hours, ${formatPrice(rate.price)}` : b.tripLength],
    ["Fishing", exp],
    ["Anglers", String(b.guests)],
    ["Name", b.name],
    ["Phone", b.phone],
    ["Email", b.email],
    ["Notes", b.message || "None"],
    ["Reference", b.ref],
  ];

  const button = (href: string, label: string, primary: boolean) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 10px 0;padding:14px 20px;border-radius:4px;font:700 15px Arial,sans-serif;text-decoration:none;${
      primary ? "background:#33594f;color:#fbf8f1" : "background:#fbf8f1;color:#2a2721;border:1.5px solid #2a2721"
    }">${esc(label)}</a>`;

  const html = `<!doctype html><html><body style="margin:0;background:#f4eee1;padding:24px 12px;font-family:Arial,sans-serif;color:#2a2721">
<div style="max-width:560px;margin:0 auto;background:#fbf8f1;border:1px solid #d9cbb0;border-radius:6px;padding:24px">
<p style="margin:0 0 4px;font:13px 'Courier New',monospace;color:#a85a2a">New booking request</p>
<h1 style="margin:0 0 16px;font:400 24px Georgia,serif">${esc(b.name)} would like to fish ${esc(longDate(b.date))}</h1>
<table style="width:100%;border-collapse:collapse;font-size:15px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;border-top:1px solid #e9dfca;color:#5c574c;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 0;border-top:1px solid #e9dfca;font-weight:700">${
          k === "Phone"
            ? `<a href="tel:${esc(b.phone.replace(/[^\d+]/g, ""))}" style="color:#33594f">${esc(v)}</a>`
            : k === "Email"
              ? `<a href="mailto:${esc(b.email)}" style="color:#33594f">${esc(v)}</a>`
              : esc(v).replace(/\n/g, "<br>")
        }</td></tr>`,
    )
    .join("")}</table>
<div style="margin:22px 0 6px">
${button(calendarLink(b), "Confirm & add to my calendar", true)}
${button(reply, `Reply to ${first} to confirm`, false)}
</div>
<p style="margin:10px 0 0;font-size:13px;line-height:1.5;color:#5c574c">The trip is not booked until you confirm. "Confirm &amp; add to my calendar" opens Google Calendar with the trip filled in: check the calendar is set to <b>Frigate Fly Bookings</b>, adjust the times if needed, and save. The website blocks that time within about 5 minutes.</p>
</div></body></html>`;

  const text = [
    `New booking request: ${b.name} would like to fish ${longDate(b.date)}.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `Confirm & add to my calendar: ${calendarLink(b)}`,
    `Reply to ${first}: ${b.email}`,
    "",
    "The trip is not booked until you confirm. Save the event to your Frigate Fly Bookings calendar to block the time on the website.",
  ].join("\n");

  return { subject, html, text };
}

function contactEmail(c: Contact) {
  const subject = `Website message from ${c.name}`;
  const text = `${c.name} (${c.email}${c.phone ? `, ${c.phone}` : ""}) wrote:\n\n${c.message}\n\nReference ${c.ref}`;
  const html = `<p>${esc(c.name)} (<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>${c.phone ? `, ${esc(c.phone)}` : ""}) wrote:</p><p>${esc(c.message).replace(/\n/g, "<br>")}</p><p style="color:#5c574c">Reference ${esc(c.ref)}</p>`;
  return { subject, html, text };
}

export async function emailOwner(inq: Inquiry) {
  const { subject, html, text } = inq.kind === "booking" ? bookingEmail(inq) : contactEmail(inq);
  const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Frigate Website <onboarding@resend.dev>",
      to: [process.env.OWNER_EMAIL || site.email],
      reply_to: inq.email,
      subject,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Email service responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
}
