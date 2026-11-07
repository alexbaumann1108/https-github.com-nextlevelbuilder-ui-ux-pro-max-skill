import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/content/site";
import { BookingForm } from "@/components/forms/booking-form";
import { Illustration } from "@/components/illustration";
import { LocationMap } from "@/components/location-map";
import { PageHeader, RatesLedger } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a Trip: Sanibel Island Fishing Charter",
  description:
    "Send a booking inquiry for a fly or light tackle fishing charter on Sanibel Island. Half, three-quarter and full-day trips for snook, tarpon and redfish.",
  alternates: { canonical: "/book" },
};

const steps = [
  { title: "Pick an open date", body: "Crossed-out days aren't available. Trips run Monday mornings and Tuesday through Friday." },
  { title: "We confirm by email or phone", body: "We check the tides and get back to you to plan the day." },
  { title: "You're booked", body: "Once we've confirmed, your date comes off the calendar so no one else can request it." },
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        label="Book a trip"
        title="Send a booking inquiry"
        lede="Pick an open date and send your request. Capt. Alex will get back to you to confirm and plan the day."
        art="emblem"
        book={false}
      />

      <section className="py-14 md:py-20">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-[3px] border-[1.5px] border-tan bg-paper/80 p-6 shadow-[0_18px_40px_-30px_rgb(42_39_33/0.6)] sm:p-10">
              <Suspense fallback={<p className="text-ink-soft">Loading the booking form…</p>}>
                <BookingForm />
              </Suspense>
            </div>
            {site.bookingPlatformUrl && (
              <p className="mt-6 text-ink-soft">
                Prefer to book online?{" "}
                <a href={site.bookingPlatformUrl} className="link font-bold text-ink">
                  Book online
                </a>
              </p>
            )}
          </div>

          <aside className="space-y-12 lg:col-span-5">
            <div>
              <h2 className="display-md">Talk to us directly</h2>
              <ul className="mt-6 space-y-4">
                <li>
                  <p className="label text-ink-soft">Phone</p>
                  <a href={site.phoneHref} className="font-display text-[1.6rem] hover:text-seafoam-deep">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <p className="label text-ink-soft">Email</p>
                  <a href={`mailto:${site.email}`} className="break-all font-display text-[1.3rem] hover:text-seafoam-deep">
                    {site.email}
                  </a>
                </li>
              </ul>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener"
                className="mt-8 flex items-center gap-4 rounded-[3px] bg-seafoam-deep p-5 text-paper transition-colors hover:bg-seafoam-night"
              >
                <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>
                  <span className="block font-display text-[1.4rem] leading-tight">{site.instagram.handle}</span>
                  <span className="block text-sm text-paper/80">Recent catches and daily updates on Instagram</span>
                </span>
              </a>
            </div>

            <div>
              <h2 className="display-md">How booking works</h2>
              <ol className="mt-6 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.4rem_1fr] gap-4">
                    <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-orange font-display text-lg">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-bold">{s.title}</h3>
                      <p className="mt-1 text-ink-soft">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="display-md">Rates</h2>
              <div className="mt-4">
                <RatesLedger />
              </div>
            </div>
            <Illustration name="fly" className="w-64 text-ink/85" />
          </aside>
        </div>
      </section>

      <LocationMap />
    </>
  );
}
