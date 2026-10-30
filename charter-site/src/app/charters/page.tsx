import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/content/experiences";
import { inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { BookingCta, PageMasthead, Specs } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "Charter experiences",
  description: `${inArea("Private boat charters, sunset cruises, sandbar trips, island hopping, dolphin watching and fishing charters")}. Choose your experience and send a booking request.`,
  alternates: { canonical: "/charters" },
};

export default function ChartersPage() {
  return (
    <>
      <PageMasthead
        title="Charter experiences"
        lede="Seven ways to spend a day on the water. Every charter is booked for your group alone, and the details are shaped around you."
      />

      <section aria-label="All charters" className="py-20 md:py-28">
        <div className="shell">
          <PlaceholderNote className="mb-14 max-w-2xl">
            Durations, prices and guest limits show as &ldquo;To be
            confirmed&rdquo; until you add them in src/content/experiences.ts.
            Nothing is invented.
          </PlaceholderNote>
          <div className="space-y-20 md:space-y-28">
            {experiences.map((e, i) => (
              <article
                key={e.slug}
                id={e.slug}
                aria-labelledby={`${e.slug}-title`}
                className="grid scroll-mt-28 items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden md:col-span-7 ${
                    i % 2 ? "md:order-2" : ""
                  }`}
                >
                  <Photo photo={e.photo} sizes="(min-width: 768px) 58vw, 100vw" />
                </div>
                <div className="md:col-span-5">
                  <h2 id={`${e.slug}-title`} className="display-md">
                    {e.name}
                  </h2>
                  <p className="lede mt-4">{e.summary}</p>
                  <p className="mt-4 text-slate">{e.description}</p>
                  <div className="horizon my-7" />
                  <Specs
                    items={[
                      { label: "Duration", value: e.duration },
                      { label: "Guests", value: e.guests },
                      { label: "Starting from", value: e.startingPrice },
                    ]}
                  />
                  <Link href={`/book?experience=${e.slug}`} className="btn btn-primary mt-8">
                    Book {e.name.toLowerCase()}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BookingCta
        title="Not sure which to choose?"
        body="Tell us what you have in mind. We will suggest the charter that fits your group, the season and the day."
      />
    </>
  );
}
