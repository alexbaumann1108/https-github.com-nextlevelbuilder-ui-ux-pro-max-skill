import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { fleet } from "@/content/fleet";
import { inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { BookingCta, PageMasthead, Specs } from "@/components/sections";

export const metadata: Metadata = {
  title: "The boat",
  description: `${inArea("The flats skiff we fish from")}. Equipment, specifications and the trips it runs.`,
  alternates: { canonical: "/fleet" },
};

export default function FleetPage() {
  // With a single boat, its own page is the fleet page.
  if (fleet.length === 1) permanentRedirect(`/fleet/${fleet[0].slug}`);

  return (
    <>
      <PageMasthead title="The boats" lede="Each boat suits a different kind of day." />
      <section aria-label="Boats" className="bg-abyss pb-24 text-white md:pb-32">
        <div className="shell space-y-6">
          {fleet.map((v) => (
            <article key={v.slug} className="grid overflow-hidden bg-harbor/60 lg:grid-cols-12">
              <div className="relative aspect-[16/10] lg:col-span-8">
                <Photo photo={v.photo} sizes="(min-width: 1024px) 66vw, 100vw" />
              </div>
              <div className="p-6 sm:p-8 lg:col-span-4 lg:p-10">
                <h2 className="display-md">{v.name}</h2>
                <p className="mt-4 text-foam">{v.tagline}</p>
                <div className="horizon my-7" />
                <Specs tone="dark" items={[{ label: "Anglers", value: v.capacity ? `Up to ${v.capacity}` : undefined }, { label: "Length", value: v.length }]} />
                <Link href={`/fleet/${v.slug}`} className="btn btn-light mt-8">
                  Full details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <BookingCta />
    </>
  );
}
