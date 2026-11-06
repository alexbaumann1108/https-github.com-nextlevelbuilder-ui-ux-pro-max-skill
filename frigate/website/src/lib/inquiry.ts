import { z } from "zod";
import { experiences } from "@/content/fishery";
import { rates } from "@/content/rates";
import { availabilityProblem } from "@/lib/availability";

/** Shared by the booking form, the contact form and the API route. */

export const experienceOptions = [
  ...experiences.map((e) => ({ value: e.slug, label: e.name })),
  { value: "undecided", label: "Not sure yet, help me choose" },
] as const;

const experienceValues = experienceOptions.map((o) => o.value) as [string, ...string[]];

const name = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(100, "Keep your name under 100 characters.");

const email = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .max(200, "Enter a shorter email address.")
  .pipe(z.email("Enter an email address like name@example.com."));

const phone = z
  .string()
  .trim()
  .max(25, "Enter a shorter phone number.")
  .refine(
    (v) => v === "" || (/^[+()\d\s.-]+$/.test(v) && v.replace(/\D/g, "").length >= 7),
    "Enter a phone number with at least 7 digits.",
  );

/** Today's date as YYYY-MM-DD in the visitor's (or server's) local time. */
export function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export const bookingSchema = z.object({
  kind: z.literal("booking"),
  name,
  email,
  phone: phone.refine((v) => v !== "", "Enter a phone number so we can reach you about the trip."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose your preferred fishing date on the calendar."),
  guests: z.coerce
    .number({ error: "Enter the number of anglers." })
    .int("Enter a whole number of anglers.")
    .min(1, "At least 1 angler is needed.")
    .max(10, "For groups over 10, call us and we'll work it out."),
  experience: z.enum(experienceValues, {
    error: "Choose a type of fishing, or pick “Not sure yet”.",
  }),
  tripLength: z.enum(rates.map((r) => String(r.hours)) as [string, ...string[]], {
    error: "Choose how long you'd like to fish.",
  }),
  message: z.string().trim().max(2000, "Keep your message under 2,000 characters.").default(""),
  website: z.string().max(0).optional(), // honeypot
}).superRefine((data, ctx) => {
  // Weekly schedule (booked dates are checked on the server).
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return;
  const problem = availabilityProblem(data.date, Number(data.tripLength) || null);
  if (problem) ctx.addIssue({ code: "custom", path: [problem.field], message: problem.message });
});

export const contactSchema = z.object({
  kind: z.literal("contact"),
  name,
  email,
  phone,
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(2000, "Keep your message under 2,000 characters."),
  website: z.string().max(0).optional(),
});

export const inquirySchema = z.discriminatedUnion("kind", [bookingSchema, contactSchema]);

export type BookingInput = z.input<typeof bookingSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type FieldErrors = Partial<Record<string, string>>;

/** Flattens zod issues into one message per field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export type InquiryResponse =
  | { ok: true; ref: string; delivered: boolean }
  | { ok: false; error: string; fieldErrors?: FieldErrors };
