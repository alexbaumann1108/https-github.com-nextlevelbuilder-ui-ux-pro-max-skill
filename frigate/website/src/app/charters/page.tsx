import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/content/experiences";
import { inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { BookingCta, PageMasthead, Specs } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "Fishing trips",
  description: `${inArea("Inshore fly fishing, light tackle and wade fishing trips")}. Choose your trip and send a booking request.`,
  alternates: { canonical: "/charters" },
};

export default function ChartersPage() {
  return (
    <>
      <PageMasthead
        title="The trips"
        lede="Fly rod or spinning gear, from the boat or on foot. Every trip is tailored to you, the season and the tide."
      />

      <section aria-label="All charters" className="py-20 md:py-28">
        <div className="shell">
          <PlaceholderNote className="mb-14 max-w-2xl">
            Trip lengths, prices and how many anglers each trip takes show as
            &ldquo;To be confirmed&rdquo; until you add them in
            src/content/experiences.ts.
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
                      { label: "Anglers", value: e.guests },
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
        title="Not sure which trip fits?"
        body="Tell us what you'd like to catch and how you like to fish. We'll suggest the trip that suits you and the tides."
      />
    </>
  );
}
