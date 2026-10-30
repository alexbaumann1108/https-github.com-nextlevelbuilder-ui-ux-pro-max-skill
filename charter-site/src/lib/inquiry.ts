import { z } from "zod";
import { experiences } from "@/content/experiences";
import { fleet } from "@/content/fleet";

/** Shared by the booking form, the contact form and the API route. */

export const timeOptions = [
  { value: "morning", label: "Morning" },
  { value: "midday", label: "Midday" },
  { value: "afternoon", label: "Afternoon" },
  { value: "sunset", label: "Sunset" },
  { value: "flexible", label: "I'm flexible" },
] as const;

const experienceValues = [...experiences.map((e) => e.slug), "undecided"] as const;
const vesselValues = [...fleet.map((v) => v.slug), "any"] as const;

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

export const bookingSchema = z
  .object({
    kind: z.literal("booking"),
    experience: z.enum(experienceValues, { error: "Choose a charter, or pick “Not sure yet”." }),
    vessel: z.enum(vesselValues, { error: "Choose a boat, or pick “No preference”." }),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose your preferred date.")
      // One day of slack covers visitors in time zones ahead of the server.
      .refine((v) => v >= todayISO(-1), "Choose a date from today onwards.")
      .refine((v) => v <= todayISO(730), "Choose a date within the next two years."),
    time: z.enum(timeOptions.map((t) => t.value) as [string, ...string[]], {
      error: "Choose a preferred time of day.",
    }),
    guests: z.coerce
      .number({ error: "Enter the number of guests." })
      .int("Enter a whole number of guests.")
      .min(1, "At least 1 guest is needed.")
      .max(150, "For groups over 150, contact us directly."),
    name,
    email,
    phone: phone.refine((v) => v !== "", "Enter a phone number so we can reach you about the day."),
    message: z.string().trim().max(2000, "Keep your message under 2,000 characters.").default(""),
    website: z.string().max(0).optional(), // honeypot
  })
  .superRefine((data, ctx) => {
    const v = fleet.find((f) => f.slug === data.vessel);
    if (v?.capacity && data.guests > v.capacity) {
      ctx.addIssue({
        code: "custom",
        path: ["guests"],
        message: `${v.name} takes up to ${v.capacity} guests. Choose another boat or reduce the group.`,
      });
    }
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
