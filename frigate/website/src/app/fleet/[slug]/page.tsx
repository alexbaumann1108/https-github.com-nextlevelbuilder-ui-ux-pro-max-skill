import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fleet, getVessel } from "@/content/fleet";
import { getExperience } from "@/content/experiences";
import { inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { BookingCta, Specs } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export function generateStaticParams() {
  return fleet.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fleet/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = getVessel(slug);
  if (!v) return {};
  return {
    title: v.model ?? v.name,
    description: `${v.tagline} ${inArea("Fly fishing and light tackle charters")}.`,
    alternates: { canonical: `/fleet/${v.slug}` },
  };
}

export default async function VesselPage({ params }: PageProps<"/fleet/[slug]">) {
  const { slug } = await params;
  const v = getVessel(slug);
  if (!v) notFound();

  const runs = v.experiences.map(getExperience).filter((e) => e !== undefined);

  return (
    <>
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-abyss text-white">
        <div className="absolute inset-0 -z-10">
          <Photo photo={v.photo} sizes="100vw" priority hideLabel />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss/90 via-abyss/20 to-abyss/50" />
        <div className="shell pb-12 pt-32 md:pb-16">
          {fleet.length > 1 && (
            <nav aria-label="Breadcrumb" className="hero-rise text-sm text-white/80">
              <Link href="/fleet" className="hover:text-white">
                The boats
              </Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">{v.name}</span>
            </nav>
          )}
          <h1 className="display-xl hero-rise mt-4" style={{ animationDelay: "0.15s" }}>
            {v.name}
          </h1>
          {v.model && <p className="lede mt-3 text-white/85">{v.model}</p>}
          <div className="horizon hero-horizon mt-8" />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug">
              {v.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-slate">{v.description}</p>
            {v.isPlaceholder && (
              <PlaceholderNote className="mt-6 max-w-xl">
                This boat is a placeholder. Add the real name, model,
                specifications and description in src/content/fleet.ts.
              </PlaceholderNote>
            )}

            <h2 className="mt-14 text-[1.75rem]">On board</h2>
            {v.amenities.length > 0 ? (
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {v.amenities.map((a) => (
                  <li key={a} className="flex gap-3 border-b border-ink/10 pb-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-champagne" />
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <PlaceholderNote className="mt-6 max-w-xl">
                List this boat&apos;s equipment and features.
              </PlaceholderNote>
            )}

            <h2 className="mt-14 text-[1.75rem]">Trips on this boat</h2>
            <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {runs.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/book?experience=${e.slug}`}
                    className="group flex items-center justify-between gap-6 py-4"
                  >
                    <span>
                      <span className="block text-lg font-medium">{e.name}</span>
                      <span className="block text-sm text-slate">{e.summary}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-ocean group-hover:underline">
                      Book
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-mist p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-[1.75rem]">Specifications</h2>
              <div className="horizon my-6" />
              <Specs
                items={[
                  { label: "Anglers", value: v.capacity ? `Up to ${v.capacity}` : undefined },
                  { label: "Length", value: v.length },
                  { label: "Model", value: v.model },
                  { label: "Rate", value: v.pricing },
                ]}
              />
              <Link href="/book" className="btn btn-primary mt-8 w-full">
                Book your trip
              </Link>
              <Link href="/contact" className="btn btn-dark mt-3 w-full">
                Ask about this boat
              </Link>
            </div>
          </aside>
        </div>

        {v.gallery.length > 0 && (
          <div className="shell mt-20 grid gap-4 sm:grid-cols-2">
            {v.gallery.map((g) => (
              <div key={g.shot} className="relative aspect-[4/3] overflow-hidden">
                <Photo photo={g} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        )}
      </section>

      <BookingCta />
    </>
  );
}
