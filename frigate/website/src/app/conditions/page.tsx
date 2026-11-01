import type { Metadata } from "next";
import Link from "next/link";
import { windfinder } from "@/content/links";
import { inArea } from "@/content/site";
import { BookingCta, PageMasthead } from "@/components/sections";

export const metadata: Metadata = {
  title: "Conditions",
  description: `${inArea("Wind, weather and tide forecasts for fishing")}, from Windfinder.`,
  alternates: { canonical: "/conditions" },
};

const sources = [
  {
    title: "Wind forecast",
    body: "Hourly wind speed, gusts and direction for the coming days.",
    href: windfinder.forecast,
  },
  {
    title: "Tides",
    body: "High and low tide times for Sanibel Island.",
    href: windfinder.tides,
  },
  {
    title: "Live wind",
    body: "What the wind is doing right now at the nearest Sanibel weather station.",
    href: windfinder.liveWind,
  },
  {
    title: "Superforecast",
    body: "Windfinder's higher-resolution forecast for the next few days.",
    href: windfinder.superforecast,
  },
];

export default function ConditionsPage() {
  return (
    <>
      <PageMasthead
        title="Conditions"
        lede="Wind and tide decide where we fish. Check the forecast for Sanibel before your trip."
      >
        <a
          href={windfinder.forecast}
          target="_blank"
          rel="noopener"
          className="btn btn-primary hero-rise mt-9"
          style={{ animationDelay: "0.2s" }}
        >
          Open the Sanibel forecast on Windfinder
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </PageMasthead>

      <section aria-labelledby="sources-title" className="py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="sources-title" className="display-md">
              Live forecasts
            </h2>
            <p className="mt-4 text-slate">
              Each link opens Windfinder&apos;s page for Sanibel Island in a new
              tab.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-8">
            {sources.map((s) => (
              <li key={s.title} className="bg-sail">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-mist sm:p-8"
                >
                  <span className="font-display text-[1.75rem] leading-tight">{s.title}</span>
                  <span className="mt-2 flex-1 text-slate">{s.body}</span>
                  <span className="mt-6 text-sm font-semibold text-ocean group-hover:underline">
                    View on Windfinder
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist py-16 md:py-20">
        <div className="shell max-w-3xl">
          <h2 className="display-md">If the weather turns</h2>
          <p className="mt-4 text-slate">
            Strong wind or storms can make the flats unfishable or unsafe. If
            the forecast looks doubtful for your date,{" "}
            <Link href="/contact" className="link-tide font-semibold text-ink">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
