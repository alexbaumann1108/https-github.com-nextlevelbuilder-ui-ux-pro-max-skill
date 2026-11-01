import Link from "next/link";
import { experiences } from "@/content/experiences";
import { fleet } from "@/content/fleet";
import { heroPhoto, heroVideo, introPhoto, reasons, species } from "@/content/home";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site";
import { Photo } from "@/components/photo";
import {
  BookingCta,
  ExperienceCard,
  FaqList,
  ReviewsSection,
  SectionIntro,
  Specs,
} from "@/components/sections";

export default function Home() {
  const boat = fleet[0];
  const pictured = species.filter((s) => s.photo);
  const listed = species.filter((s) => !s.photo);

  return (
    <>
      {/* Hero: boat video on phones, mangrove photo on larger screens */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-abyss text-white">
        <div className="absolute inset-0 -z-10 hidden md:block">
          <Photo photo={heroPhoto} sizes="100vw" priority />
        </div>
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover md:hidden"
          src={heroVideo.src}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss/90 via-abyss/30 to-abyss/45" />
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-abyss/60 to-transparent md:block" />

        <div className="shell pb-10 pt-32 md:pb-16">
          <h1 className="display-xl hero-rise max-w-[12ch]" style={{ animationDelay: "0.35s" }}>
            Local waters. Unforgettable days.
          </h1>
          <div className="horizon hero-horizon mt-8 md:mt-10" />
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <p
              className="lede hero-rise text-white/90 md:col-span-6 lg:col-span-5"
              style={{ animationDelay: "0.6s" }}
            >
              Inshore fly fishing and light tackle charters around{" "}
              {site.serviceArea ?? "Sanibel Island"} and Southwest Florida.
              Snook, redfish, tarpon and more, from the boat or on foot.
            </p>
            <div
              className="hero-rise flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end lg:col-span-7"
              style={{ animationDelay: "0.75s" }}
            >
              <Link href="/book" className="btn btn-primary">
                Book your trip
              </Link>
              <Link href="/charters" className="btn btn-light">
                See the trips
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="intro-title" className="py-20 md:py-28">
        <div className="shell grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <h2 id="intro-title" className="display-lg">
              Fly and light tackle on Sanibel&apos;s flats, beaches and mangroves.
            </h2>
            <p className="lede mt-6 max-w-2xl text-slate">
              Every trip is tailored: fly rod or spinning gear, fishing the
              flats from the boat or wading the shoreline, early tide or evening tide. You
              bring the sunscreen; we&apos;ll bring the local knowledge.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/about" className="link-tide font-semibold">
                About Frigate
              </Link>
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener"
                  className="link-tide font-semibold"
                >
                  Follow along on Instagram
                </a>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden md:col-span-5">
            <Photo photo={introPhoto} sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Trips */}
      <section aria-labelledby="trips-title" className="pb-20 md:pb-28">
        <div className="shell">
          <SectionIntro
            id="trips-title"
            title="The trips"
            lede="Three ways to fish Sanibel. Pick a starting point and we'll tailor the rest."
            action={
              <Link href="/charters" className="link-tide shrink-0 font-semibold">
                Compare the trips
              </Link>
            }
          />
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((e) => (
              <ExperienceCard key={e.slug} experience={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Species */}
      <section aria-labelledby="species-title" className="bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionIntro
            id="species-title"
            title="What we fish for"
            lede="What's biting changes with the season and the tide. These are the regulars."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-12">
            {pictured.map((s) => (
              <figure key={s.name} className="relative aspect-[4/5] overflow-hidden md:col-span-4">
                <Photo photo={s.photo!} sizes="(min-width: 768px) 33vw, 100vw" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/90 to-transparent p-6 pt-24 text-white">
                  <span className="block font-display text-[2rem] leading-tight">{s.name}</span>
                  <span className="mt-1 block text-sm text-white/85">{s.note}</span>
                </figcaption>
              </figure>
            ))}
            <ul className="flex flex-col justify-end gap-6 border-t border-champagne pt-6 md:col-span-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {listed.map((s) => (
                <li key={s.name}>
                  <span className="block font-display text-[1.75rem] leading-tight">{s.name}</span>
                  <span className="mt-1 block text-slate">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The boat */}
      {boat && (
        <section aria-labelledby="boat-title" className="bg-abyss py-20 text-white md:py-28">
          <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Link
              href={`/fleet/${boat.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="group relative block aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:col-span-7 lg:aspect-[5/6]"
            >
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-[1.03]">
                <Photo photo={boat.photo} sizes="(min-width: 1024px) 58vw, 100vw" />
              </div>
            </Link>
            <div className="lg:col-span-5">
              <h2 id="boat-title" className="display-md">
                The boat
              </h2>
              <p className="mt-2 text-foam">{boat.model}</p>
              <p className="lede mt-5">{boat.tagline}</p>
              <div className="horizon my-7" />
              <ul className="space-y-2.5 text-foam">
                {boat.amenities.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-champagne" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Specs
                  tone="dark"
                  items={[
                    { label: "Anglers", value: boat.capacity ? `Up to ${boat.capacity}` : undefined },
                    { label: "Length", value: boat.length },
                  ]}
                />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/fleet/${boat.slug}`} className="btn btn-light">
                  More about the boat
                </Link>
                <Link href="/book" className="btn btn-primary">
                  Book your trip
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Frigate */}
      <section aria-labelledby="why-title" className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="why-title" className="display-md">
              How we fish
            </h2>
            <p className="mt-4 text-slate">Tailored trips, local knowledge, lasting memories.</p>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {reasons.map((r) => (
              <div key={r.title} className="border-t border-champagne pt-6">
                <h3 className="text-[1.625rem]">{r.title}</h3>
                <p className="mt-3 text-slate">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section aria-labelledby="gallery-title" className="pb-20 md:pb-28">
        <div className="shell">
          <SectionIntro
            id="gallery-title"
            title="From the water"
            action={
              <Link href="/gallery" className="link-tide shrink-0 font-semibold">
                See all {gallery.length} photos
              </Link>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
            {gallery.slice(0, 5).map((g, i) => (
              <Link
                key={g.src}
                href="/gallery"
                className={`relative block overflow-hidden ${
                  i === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-square"
                }`}
              >
                <span className="sr-only">Open the gallery: {g.alt}</span>
                <Photo photo={g} sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="display-md">
              Questions, answered
            </h2>
            <p className="mt-4 text-slate">
              Something else on your mind?{" "}
              <Link href="/contact" className="link-tide font-semibold text-ink">
                Ask us directly
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
