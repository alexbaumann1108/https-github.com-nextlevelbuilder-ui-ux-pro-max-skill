import type { Metadata } from "next";
import Link from "next/link";
import { captain } from "@/content/captain";
import { site } from "@/content/site";
import { Illustration } from "@/components/illustration";
import { BookingBand, PageHeader, Photo, PlaceholderNote } from "@/components/ui";

export const metadata: Metadata = {
  title: "Meet Your Captain",
  description:
    "Your Sanibel Island fishing guide: a young local Southwest Florida fisherman specializing in fly fishing for beach snook, tarpon, backcountry sight fishing and light tackle.",
  alternates: { canonical: "/captain" },
};

export default function CaptainPage() {
  return (
    <>
      <PageHeader
        label="Meet your captain"
        title={captain.name ?? "A local who knows these waters"}
        lede={captain.intro}
        art="fly-caster"
      />

      <section className="py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] rotate-[-1deg] overflow-hidden rounded-[3px] border-[10px] border-paper shadow-[0_18px_40px_-24px_rgb(42_39_33/0.6)]">
                <Photo photo={captain.photo} sizes="(min-width: 1024px) 40vw, 100vw" priority />
              </div>
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[3deg] bg-tan/45" />
            </div>
            <div className="relative mt-10 ml-auto aspect-[4/3] w-3/4 rotate-[1.4deg] overflow-hidden rounded-[3px] border-[8px] border-paper shadow-[0_18px_40px_-24px_rgb(42_39_33/0.6)]">
              <Photo photo={captain.photo2} sizes="(min-width: 1024px) 30vw, 75vw" />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <h2 className="display-md">The story</h2>
            {captain.bio.length > 0 ? (
              <div className="mt-6 space-y-4 text-[1.0625rem]">
                {captain.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-6 text-[1.0625rem]">
                  Years spent on the beaches, flats and backcountry around Sanibel
                  Island, learning where the fish go with each tide and season,
                  and how to put anglers on them with a fly rod or light tackle.
                </p>
                <PlaceholderNote className="mt-6">
                  Write your story in your own words in src/content/captain.ts
                  (the <code>bio</code> list): how you got into fishing, how long
                  you&apos;ve fished Sanibel, your favorite day on the water. You can
                  also set your name and swap the photos there.
                </PlaceholderNote>
              </>
            )}

            <h2 className="display-md mt-14">Specialties</h2>
            <ul className="mt-6 divide-y divide-tan/50 border-y border-tan/50">
              {captain.specialties.map((s) => (
                <li key={s} className="flex items-center gap-4 py-4">
                  <Illustration name="icon-fly" className="w-7 shrink-0 text-seafoam-deep" />
                  <span className="font-display text-[1.3rem]">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {captain.values.map((v) => (
                <div key={v.title} className="border-t-2 border-orange pt-4">
                  <h3 className="text-[1.3rem]">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{v.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn btn-primary">
                Book a trip
              </Link>
              <a href={site.instagram.url} target="_blank" rel="noopener" className="btn btn-ink">
                Follow {site.instagram.handle}
              </a>
            </div>
          </div>
        </div>
      </section>

      <BookingBand />
    </>
  );
}
