import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { experiences } from "@/content/fishery";
import { captain } from "@/content/captain";
import { boat } from "@/content/boat";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site";
import { getReports, formatDate } from "@/lib/reports";
import { FishSketch } from "@/components/fish-sketch";
import { Illustration } from "@/components/illustration";
import { BookingBand, Photo, RatesLedger, SectionHeading } from "@/components/ui";
import { LocationMap } from "@/components/location-map";

/**
 * Art-directed hero: the wide clouds shot on larger screens, and the
 * clear-flats shot (boat centered) on phones so the skiff stays in frame.
 */
function HeroPhoto() {
  const common = {
    alt: "The Frigate skiff on the shallow flats off Sanibel Island",
    sizes: "100vw",
    priority: true,
  };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: boat.photo.src, width: 1512, height: 2016, quality: 80 });
  const {
    props: { srcSet: tall, ...rest },
  } = getImageProps({ ...common, src: boat.photo2.src, width: 1512, height: 2016, quality: 75 });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wide} />
      <img
        {...rest}
        srcSet={tall}
        alt={common.alt}
        className="absolute inset-x-0 top-[-34%] -z-10 h-[134%] w-full object-cover object-[50%_45%] md:top-0 md:h-full md:object-[50%_62%]"
      />
    </picture>
  );
}

export default function Home() {
  const reports = getReports().slice(0, 3);
  const specs = boat.specs.filter((s) => s.value);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-seafoam-night text-paper">
        <HeroPhoto />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/45 to-transparent" />

        <div className="shell grid gap-10 pb-12 pt-32 md:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="display-xl rise max-w-[15ch] uppercase" style={{ animationDelay: "0.15s" }}>
              Fish Southwest Florida
            </h1>
            <p className="label rise mt-4 text-paper/85" style={{ animationDelay: "0.22s" }}>
              {site.location}
              <span className="mx-2 opacity-60">/</span>
              {site.geo.label}
            </p>
            <p className="lede rise mt-6 max-w-2xl text-paper/90" style={{ animationDelay: "0.3s" }}>
              Experience the incredible inshore fisheries of Sanibel and the
              surrounding islands with Frigate Fly &amp; Light Tackle Charters.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.45s" }}>
              <Link href="/book" className="btn btn-sun">
                Book a trip
              </Link>
              <Link href="/fishery" className="btn btn-ghost">
                Explore our fishery
              </Link>
            </div>
          </div>
          <figure className="hidden lg:col-span-4 lg:block">
            <FishSketch species="snook" draw className="w-full text-paper/85" />
            <figcaption className="label mt-1 text-right text-paper/75">
              Centropomus undecimalis, the common snook
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="intro-title" className="py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3 md:border-r md:border-tan/60 md:pr-8">
            <Illustration name="icon-florida" className="w-16 text-ink/85" />
            <p className="label mt-5 text-ink-soft">Waters we fish</p>
            <ul className="mt-2 space-y-1 font-display text-[1.2rem]">
              {site.serviceArea.map((a) => (
                <li key={a}>{a}</li>
              ))}
              <li className="text-ink-soft">and the surrounding Southwest Florida waters</li>
            </ul>
          </aside>
          <div className="md:col-span-9">
            <h2 id="intro-title" className="sr-only">
              About Frigate Fly &amp; Light Tackle Charters
            </h2>
            <p className="font-display text-[clamp(1.3rem,2.6vw,2.2rem)] leading-[1.4]">
              Frigate Fly &amp; Light Tackle Charters offers personalized inshore
              fishing experiences throughout the waters of Southwest Florida. From
              sight fishing for snook along the beaches to chasing tarpon across
              the backcountry, every trip is built around the conditions, the
              fish, and making the most of your time on the water.
            </p>
            <Illustration name="fly" className="mt-10 w-64 text-ink/85 md:w-80" />
          </div>
        </div>
      </section>

      {/* Fishing experiences */}
      <section aria-labelledby="fishery-title" className="pb-20 md:pb-28">
        <div className="shell">
          <SectionHeading
            id="fishery-title"
            label="The fishery"
            title="Three ways to fish Sanibel"
            lede="Each trip is shaped by the season, the tide and what the fish are doing."
          />
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {experiences.map((e, i) => (
              <article key={e.slug} className={`flex flex-col ${i === 1 ? "md:mt-16" : ""}`}>
                <Link href={`/fishery#${e.slug}`} tabIndex={-1} aria-hidden="true" className="group relative block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-seafoam-pale">
                    {e.photo ? (
                      <Photo
                        photo={e.photo}
                        sizes="(min-width: 768px) 32vw, 100vw"
                        className="transition-transform duration-700 ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <FishSketch species={e.sketch} className="w-full text-ink/85" />
                      </div>
                    )}
                  </div>
                  {e.photo && (
                    <div className="absolute -bottom-6 right-3 w-40 rounded-[3px] bg-parchment px-3 py-2 shadow-[0_1px_0_rgb(185_154_114/0.6)]">
                      <FishSketch species={e.sketch} className="w-full text-ink/85" />
                    </div>
                  )}
                </Link>
                <h3 className="mt-10 text-[1.9rem] uppercase tracking-[0.02em]">{e.name}</h3>
                <p className="mt-3 flex-1 text-ink-soft">{e.summary}</p>
                <Link href={`/fishery#${e.slug}`} className="link mt-5 self-start font-bold">
                  Learn more<span className="sr-only"> about {e.name}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Meet your captain */}
      <section aria-labelledby="captain-title" className="bg-seafoam-pale py-20 md:py-28">
        <div className="shell grid items-center gap-12 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] rotate-[-1.2deg] overflow-hidden rounded-[3px] border-[10px] border-paper shadow-[0_18px_40px_-24px_rgb(42_39_33/0.6)]">
              <Photo photo={captain.photo} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
            <span aria-hidden="true" className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[3deg] bg-tan/45" />
          </div>
          <div className="md:col-span-7 md:pl-6">
            <p className="label text-orange-ink">Meet your captain</p>
            <h2 id="captain-title" className="display-lg mt-3">
              {captain.name ?? "A local who knows these waters"}
            </h2>
            <p className="lede mt-5 text-ink-soft">{captain.intro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {captain.specialties.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <Illustration name="icon-fly" className="mt-0.5 w-6 shrink-0 text-ink/85" />
                  <span className="font-semibold">{s}</span>
                </li>
              ))}
            </ul>
            <Link href="/captain" className="btn btn-ink mt-10">
              Meet your captain
            </Link>
          </div>
        </div>
      </section>

      {/* The boat */}
      <section aria-labelledby="boat-title" className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] lg:col-span-7 lg:aspect-auto lg:min-h-[38rem]">
            <Photo photo={boat.photo} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="flex flex-col lg:col-span-5">
            <p className="label text-orange-ink">The boat</p>
            <h2 id="boat-title" className="display-md mt-3">
              {boat.name}
            </h2>
            <p className="mt-4 text-ink-soft">{boat.description[0]}</p>
            <dl className="mt-8 border-t border-tan/60">
              {specs.map((s) => (
                <div key={s.label} className="flex items-baseline gap-3 border-b border-tan/60 py-3">
                  <dt className="label shrink-0 text-ink-soft">{s.label}</dt>
                  <span aria-hidden="true" className="flex-1" />
                  <dd className="text-right font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
            <Illustration name="boat-sketch" className="mt-10 w-full max-w-sm self-end text-ink/85" />
            <Link href="/boat" className="link mt-6 self-start font-bold">
              More about the boat
            </Link>
          </div>
        </div>
      </section>

      {/* Rates */}
      <section aria-labelledby="rates-title" className="border-y border-tan/50 bg-parchment-deep/60 py-20 md:py-24">
        <div className="shell grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="label text-orange-ink">Trips &amp; rates</p>
            <h2 id="rates-title" className="display-md mt-3">
              Half, three-quarter or full day
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">
              One boat, one captain, your group. Pick the length of day and we&apos;ll
              plan it around the tides and the fish.
            </p>
            <Illustration name="fly-caster" className="mt-8 hidden w-56 text-ink/85 md:block" />
          </div>
          <div className="md:col-span-7">
            <RatesLedger />
            <Link href="/book" className="btn btn-primary mt-8">
              Book a trip
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section aria-labelledby="gallery-title" className="py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            id="gallery-title"
            label="From the water"
            title="Recent days on the water"
            action={
              <Link href="/gallery" className="link shrink-0 font-bold">
                See all {gallery.length} photos
              </Link>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
            {[
              { p: gallery[1], c: "col-span-2 aspect-[16/10] md:col-span-7 md:row-span-2 md:aspect-auto" },
              { p: gallery[0], c: "aspect-[4/5] md:col-span-5 md:aspect-[16/11]" },
              { p: gallery[2], c: "aspect-[4/5] md:col-span-5 md:aspect-[16/11]" },
            ].map(({ p, c }) => (
              <Link key={p.src} href={`/gallery#${p.category}`} className={`group relative block overflow-hidden rounded-[3px] ${c}`}>
                <span className="sr-only">Gallery: {p.alt}</span>
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-tide)] group-hover:scale-[1.04]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fishing reports */}
      <section aria-labelledby="reports-title" className="bg-paper/70 py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-orange-ink">Fishing reports</p>
            <h2 id="reports-title" className="display-md mt-3">
              Notes from the water
            </h2>
            <p className="mt-4 text-ink-soft">
              Conditions, seasonal patterns and recent catches from around Sanibel.
            </p>
            <Link href="/reports" className="link mt-6 inline-block font-bold">
              All fishing reports
            </Link>
          </div>
          <ul className="divide-y divide-tan/50 border-y border-tan/50 lg:col-span-8">
            {reports.map((r) => (
              <li key={r.slug}>
                <Link href={`/reports/${r.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr]">
                  <span className="label text-ink-soft">
                    {formatDate(r.date)}
                    <br />
                    {r.category}
                  </span>
                  <span>
                    <span className="block font-display text-[1.5rem] leading-snug group-hover:text-seafoam-deep">
                      {r.title}
                    </span>
                    <span className="mt-1 block text-ink-soft">{r.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationMap />

      <BookingBand />
    </>
  );
}
