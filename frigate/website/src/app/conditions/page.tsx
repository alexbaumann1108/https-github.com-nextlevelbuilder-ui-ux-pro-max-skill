import type { Metadata } from "next";
import Link from "next/link";
import { windfinder } from "@/content/links";
import { BookingBand, PageHeader, Regulations } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conditions: Sanibel Wind, Weather & Tides",
  description:
    "Wind, weather and tide forecasts for fishing Sanibel Island, from Windfinder. Check the conditions before your trip.",
  alternates: { canonical: "/conditions" },
};

const sources = [
  { title: "Wind forecast", body: "Hourly wind speed, gusts and direction for the coming days.", href: windfinder.forecast },
  { title: "Tides", body: "High and low tide times for Sanibel Island.", href: windfinder.tides },
  { title: "Live wind", body: "What the wind is doing right now at the nearest Sanibel station.", href: windfinder.liveWind },
  { title: "Superforecast", body: "Windfinder's higher-resolution forecast for the next few days.", href: windfinder.superforecast },
];

export default function ConditionsPage() {
  return (
    <>
      <PageHeader
        label="Conditions"
        title="Wind, weather and tides"
        lede="Wind and tide decide where we fish. Check the forecast for Sanibel before your trip."
        art="palm-sunset"
      >
        <a
          href={windfinder.forecast}
          target="_blank"
          rel="noopener"
          className="btn btn-primary rise mt-8"
          style={{ animationDelay: "0.24s" }}
        >
          Sanibel forecast on Windfinder
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </PageHeader>

      <section aria-labelledby="sources-title" className="py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="sources-title" className="display-md">
              Live forecasts
            </h2>
            <p className="mt-4 text-ink-soft">
              Each link opens Windfinder&apos;s page for Sanibel Island in a new tab.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {sources.map((s) => (
              <li key={s.title}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col rounded-[3px] border-[1.5px] border-tan bg-paper/60 p-6 transition-colors hover:border-seafoam-deep hover:bg-paper sm:p-7"
                >
                  <span className="font-display text-[1.6rem] leading-tight">{s.title}</span>
                  <span className="mt-2 flex-1 text-ink-soft">{s.body}</span>
                  <span className="label mt-6 text-seafoam-deep group-hover:underline">
                    View on Windfinder<span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-tan/50 bg-seafoam-pale/70 py-16 md:py-20">
        <div className="shell max-w-3xl">
          <h2 className="display-md">If the weather turns</h2>
          <p className="mt-4 text-ink-soft">
            Strong wind or storms can make the flats unfishable or unsafe. If the
            forecast looks doubtful for your date,{" "}
            <Link href="/book" className="link font-bold text-ink">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <Regulations />

      <BookingBand />
    </>
  );
}
