import type { Metadata } from "next";
import { Suspense } from "react";
import { site, inArea } from "@/content/site";
import { BookingForm } from "@/components/forms/booking-form";
import { PageMasthead } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "Book your trip",
  description: `${inArea("Request a fly fishing or light tackle trip")}. Choose your trip, date and number of anglers, and we'll confirm.`,
  alternates: { canonical: "/book" },
};

const steps = [
  {
    title: "Send your request",
    body: "Choose the trip, your preferred date and how many are fishing. It takes about two minutes.",
  },
  {
    title: "We check the tides and confirm",
    body: `We check the date and the tides and reply${site.replyTime ? ` ${site.replyTime}` : ""} with the details, or suggest the nearest good day.`,
  },
  {
    title: "Your trip is booked",
    body: "Once you have agreed the details with us, your date is reserved and you will receive everything you need for the day.",
  },
];

export default function BookPage() {
  return (
    <>
      <PageMasthead
        title="Book your trip"
        lede="Send a request and we will confirm availability with you directly. Nothing is charged online."
      />
      <section className="bg-mist py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10">
              <Suspense fallback={<p className="text-slate">Loading the booking form…</p>}>
                <BookingForm />
              </Suspense>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-[1.75rem]">How booking works</h2>
              <ol className="mt-8 space-y-8">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne font-display text-lg"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold">{s.title}</h3>
                      <p className="mt-1 text-slate">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="horizon my-10" />
              <h2 className="text-[1.375rem]">Prefer to talk?</h2>
              {site.phone || site.email ? (
                <div className="mt-3 space-y-1">
                  {site.phone && (
                    <a className="link-tide inline-block font-semibold" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                      {site.phone}
                    </a>
                  )}
                  {site.email && (
                    <a className="block text-slate underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  )}
                </div>
              ) : (
                <PlaceholderNote className="mt-3">
                  Add your phone and email in src/content/site.ts so guests can
                  call instead.
                </PlaceholderNote>
              )}
              <PlaceholderNote className="mt-6">
                Booking requests are delivered to the address set in
                INQUIRY_WEBHOOK_URL (see README). Add your reply time and
                deposit terms once confirmed.
              </PlaceholderNote>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
