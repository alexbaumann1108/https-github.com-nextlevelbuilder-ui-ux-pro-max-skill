import { site } from "@/content/site";
import { Illustration } from "./illustration";

/** Where we fish: a Google map of Sanibel with the service area. */
export function LocationMap() {
  return (
    <section aria-labelledby="where-title" className="py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="label text-orange-ink">Where we fish</p>
          <h2 id="where-title" className="display-md mt-3">
            Based on Sanibel Island
          </h2>
          <p className="mt-4 text-ink-soft">
            Trips cover {site.serviceAreaSummary}. We&apos;ll confirm the meeting
            spot when we plan your trip.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {site.serviceArea.map((a) => (
              <li key={a} className="label rounded-full border border-tan px-3 py-1.5">
                {a}
              </li>
            ))}
          </ul>
          <a
            href={site.mapLinkUrl}
            target="_blank"
            rel="noopener"
            className="link mt-8 inline-block font-bold"
          >
            Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Illustration name="icon-hook" className="mt-10 hidden w-8 text-ink/85 lg:block" />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] border-[8px] border-paper bg-seafoam-pale shadow-[0_18px_40px_-26px_rgb(42_39_33/0.6)] lg:col-span-7">
          <iframe
            src={site.mapEmbedUrl}
            title="Map of Sanibel Island and the surrounding waters"
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[12%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
