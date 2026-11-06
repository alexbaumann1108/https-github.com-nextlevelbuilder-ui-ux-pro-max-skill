import type { Metadata } from "next";
import Link from "next/link";
import { boat } from "@/content/boat";
import { showPlaceholders } from "@/content/site";
import { Illustration } from "@/components/illustration";
import { BookingBand, PageHeader, Photo, RatesLedger } from "@/components/ui";

export const metadata: Metadata = {
  title: "The Boat: 1720 Action Craft Fly Fisher SE",
  description:
    "Fish Sanibel's beaches and backcountry from a 1720 Action Craft Fly Fisher SE, a shallow-water flats skiff with a 115 Mercury outboard, Minn Kota Terrova trolling motor and Power-Pole.",
  alternates: { canonical: "/boat" },
};

export default function BoatPage() {
  const specs = showPlaceholders ? boat.specs : boat.specs.filter((s) => s.value);
  return (
    <>
      <PageHeader label="The boat" title={boat.name} lede={boat.description[0]} art="boat-sketch" />

      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11] lg:aspect-[16/9]">
            <Photo photo={boat.photo} sizes="100vw" priority className="object-[50%_62%]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="specs-title" className="pb-20 md:pb-28">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="display-md">Built for skinny water</h2>
            <div className="mt-5 space-y-4 text-ink-soft">
              {boat.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[3px] border-[8px] border-paper shadow-[0_18px_40px_-24px_rgb(42_39_33/0.6)] sm:aspect-[4/3]">
              <Photo photo={boat.photo2} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-[3px] border-[1.5px] border-tan bg-paper/70 p-6 sm:p-8">
              <p className="label text-orange-ink">Specifications</p>
              <h2 id="specs-title" className="display-md mt-2">
                Equipment
              </h2>
              <dl className="mt-6 border-t border-tan/60">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-4 border-b border-tan/60 py-3.5">
                    <dt className="label shrink-0 text-ink-soft">{s.label}</dt>
                    <span aria-hidden="true" className="flex-1" />
                    <dd className={`text-right font-semibold ${s.value ? "" : "italic text-orange-ink"}`}>
                      {s.value ?? "To fill in"}
                    </dd>
                  </div>
                ))}
              </dl>
              <Illustration name="boat-sketch" className="mt-8 w-full text-ink/85" />
            </div>
            <div className="mt-12">
              <h2 className="display-md">Rates</h2>
              <div className="mt-4">
                <RatesLedger />
              </div>
              <Link href="/book" className="btn btn-primary mt-8">
                Book a trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BookingBand />
    </>
  );
}
