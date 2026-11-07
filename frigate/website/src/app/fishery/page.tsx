import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/content/fishery";
import { FishSketch, scientificName } from "@/components/fish-sketch";
import { Illustration } from "@/components/illustration";
import { BookingBand, PageHeader, Photo, RatesLedger, Regulations } from "@/components/ui";

export const metadata: Metadata = {
  title: "The Fishery: Beach Snook, Tarpon & Backcountry Redfish",
  description:
    "Sight fishing for beach snook on Sanibel and Captiva, tarpon along the beaches and Pine Island Sound, and redfish in the backcountry. Fly and light tackle charters in Southwest Florida.",
  alternates: { canonical: "/fishery" },
};

export default function FisheryPage() {
  return (
    <>
      <PageHeader
        label="The fishery"
        title="Beach snook, tarpon and the backcountry"
        lede="Sanibel sits in the middle of one of Florida's great inshore fisheries. These are the three we build our trips around."
        sketch="tarpon"
      >
        <nav aria-label="On this page" className="rise mt-8 flex flex-wrap gap-2" style={{ animationDelay: "0.24s" }}>
          {experiences.map((e) => (
            <a key={e.slug} href={`#${e.slug}`} className="rounded-full border-[1.5px] border-tan px-4 py-2 text-sm font-bold hover:border-seafoam-deep">
              {e.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      {experiences.map((e, i) => (
        <section
          key={e.slug}
          id={e.slug}
          aria-labelledby={`${e.slug}-title`}
          className={`scroll-mt-24 py-20 md:py-28 ${i % 2 ? "bg-seafoam-pale/70" : ""}`}
        >
          <div className="shell grid items-center gap-12 lg:grid-cols-12">
            <div className={`relative lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="relative aspect-square overflow-hidden rounded-[3px] bg-seafoam-pale sm:aspect-[5/4] lg:aspect-square">
                {e.photo ? (
                  <Photo photo={e.photo} sizes="(min-width: 1024px) 50vw, 100vw" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 border-[1.5px] border-dashed border-tan p-8">
                    <FishSketch species={e.sketch} className="w-full max-w-lg text-ink/85" decorative={false} />
                    <p className="label text-center text-ink-soft">{scientificName[e.sketch]}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-6">
              <FishSketch species={e.sketch} className="w-40 text-ink/85" />
              <h2 id={`${e.slug}-title`} className="display-lg mt-4 uppercase">
                {e.name}
              </h2>
              <div className="mt-5 space-y-4 text-[1.0625rem] text-ink-soft">
                {e.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <dl className="mt-8 border-t border-tan/60">
                {e.notes.map((n) => (
                  <div key={n.label} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-tan/60 py-3">
                    <dt className="label pt-0.5 text-ink-soft">{n.label}</dt>
                    <dd className="font-semibold">{n.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/book?trip=${e.slug}`} data-book className="btn btn-primary mt-8">
                Book a {e.name.toLowerCase()} trip
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="rates-title" className="border-y border-tan/50 bg-parchment-deep/60 py-20 md:py-24">
        <div className="shell grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="label text-orange-ink">Trips &amp; rates</p>
            <h2 id="rates-title" className="display-md mt-3">
              Any fishery, three lengths of day
            </h2>
            <Illustration name="fly-small" className="mt-8 w-48 text-ink/85" />
          </div>
          <div className="md:col-span-7">
            <RatesLedger />
          </div>
        </div>
      </section>

      <Regulations />

      <BookingBand />
    </>
  );
}
