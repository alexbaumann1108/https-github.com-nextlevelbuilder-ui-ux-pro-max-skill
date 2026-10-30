import type { Metadata } from "next";
import Link from "next/link";
import { fleet } from "@/content/fleet";
import { getExperience } from "@/content/experiences";
import { inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { BookingCta, PageMasthead, Specs } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "Our fleet",
  description: `${inArea("Boats available for private charter")}. Compare capacity, features and the experiences each boat runs.`,
  alternates: { canonical: "/fleet" },
};

export default function FleetPage() {
  return (
    <>
      <PageMasthead
        title="The fleet"
        lede="Every boat is chosen for a particular kind of day. Compare them side by side, then book the one that suits your plans."
      />

      <section aria-label="Boats" className="bg-abyss pb-24 text-white md:pb-32">
        <div className="shell space-y-6">
          <PlaceholderNote tone="dark" className="max-w-2xl">
            These two boats are placeholders. Replace them with your real
            fleet in src/content/fleet.ts. Each boat gets its own page.
          </PlaceholderNote>
          {fleet.map((v) => (
            <article
              key={v.slug}
              aria-labelledby={`${v.slug}-title`}
              className="grid overflow-hidden bg-harbor/60 lg:grid-cols-12"
            >
              <Link
                href={`/fleet/${v.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="group relative block aspect-[16/10] overflow-hidden lg:col-span-8 lg:aspect-auto lg:min-h-[30rem]"
              >
                <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-[1.03]">
                  <Photo photo={v.photo} sizes="(min-width: 1024px) 66vw, 100vw" />
                </div>
              </Link>
              <div className="flex flex-col p-6 sm:p-8 lg:col-span-4 lg:p-10">
                <h2 id={`${v.slug}-title`} className="display-md">
                  {v.name}
                </h2>
                {v.model && <p className="mt-2 text-foam">{v.model}</p>}
                <p className="mt-4 text-foam">{v.tagline}</p>
                <div className="horizon my-7" />
                <Specs
                  tone="dark"
                  items={[
                    { label: "Guests", value: v.capacity ? `Up to ${v.capacity}` : undefined },
                    { label: "Length", value: v.length },
                    { label: "Rate", value: v.pricing },
                  ]}
                />
                <p className="mt-7 text-sm text-foam">
                  Runs:{" "}
                  {v.experiences
                    .map((s) => getExperience(s)?.name)
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <div className="mt-8 flex flex-1 flex-col justify-end gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link href={`/fleet/${v.slug}`} className="btn btn-light">
                    Full details
                  </Link>
                  <Link href={`/book?vessel=${v.slug}`} className="btn btn-primary">
                    Book this boat
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BookingCta
        title="Not sure which boat fits?"
        body="Tell us how many are coming and what kind of day you want. We will recommend the right boat."
      />
    </>
  );
}
