import Link from "next/link";
import { experiences } from "@/content/experiences";
import { fleet } from "@/content/fleet";
import { destinations, heroPhoto, reasons } from "@/content/home";
import { gallery } from "@/content/gallery";
import { Photo } from "@/components/photo";
import { PlaceholderNote } from "@/components/placeholder-note";
import {
  BookingCta,
  ExperienceCard,
  FaqList,
  ReviewsSection,
  SectionIntro,
  Specs,
} from "@/components/sections";

export default function Home() {
  const [lead, ...rest] = experiences;
  const featured = rest.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-abyss text-white">
        <div className="absolute inset-0 -z-10">
          <Photo photo={heroPhoto} sizes="100vw" priority horizon={0.5} hideLabel />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss/85 via-abyss/25 to-abyss/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-abyss/55 to-transparent" />

        <div className="shell pb-10 pt-32 md:pb-16">
          <h1 className="display-xl hero-rise max-w-[11ch]" style={{ animationDelay: "0.35s" }}>
            The open water, privately yours.
          </h1>
          <div className="horizon hero-horizon mt-8 md:mt-10" />
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <p
              className="lede hero-rise text-white/90 md:col-span-6 lg:col-span-5"
              style={{ animationDelay: "0.6s" }}
            >
              Private boat charters, sunset cruises, sandbar days and island
              hopping, planned around your party and the day&apos;s conditions.
            </p>
            <div
              className="hero-rise flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end lg:col-span-7"
              style={{ animationDelay: "0.75s" }}
            >
              <Link href="/book" className="btn btn-primary">
                Book your charter
              </Link>
              <Link href="/charters" className="btn btn-light">
                Explore our charters
              </Link>
            </div>
          </div>
          <PlaceholderNote tone="dark" className="mt-8 max-w-xl">
            Hero photo: {heroPhoto.shot}. Set it in src/content/home.ts.
          </PlaceholderNote>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="intro-title" className="py-20 md:py-32">
        <div className="shell grid gap-10 md:grid-cols-12">
          <h2 id="intro-title" className="sr-only">
            About our charters
          </h2>
          <p className="font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.18] md:col-span-8">
            A charter should be the best day of the trip, not another thing to
            organise. So we keep it simple: the right boat, a route chosen for
            the day&apos;s water, and time to enjoy it.
          </p>
          <div className="space-y-6 md:col-span-4 md:pt-3">
            <p className="text-slate">
              Whether it is a sunset with someone special, a birthday at the
              sandbar or a full day exploring the islands, you tell us what
              matters and we plan the rest.
            </p>
            <Link href="/about" className="link-tide inline-block font-semibold">
              Read our story
            </Link>
            <PlaceholderNote>Draft introduction. Rewrite in your own words.</PlaceholderNote>
          </div>
        </div>
      </section>

      {/* Featured experiences */}
      <section aria-labelledby="experiences-title" className="pb-20 md:pb-32">
        <div className="shell">
          <SectionIntro
            id="experiences-title"
            title="Charter experiences"
            lede="Every trip is booked privately for your group. Choose a starting point and we will tailor the details."
            action={
              <Link href="/charters" className="link-tide shrink-0 font-semibold">
                See all {experiences.length} charters
              </Link>
            }
          />
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
            <div className="md:col-span-2 lg:col-span-7">
              <ExperienceCard experience={lead} large />
            </div>
            <div className="lg:col-span-5">
              <ExperienceCard experience={featured[0]} />
            </div>
            {featured.slice(1).map((e) => (
              <div key={e.slug} className="lg:col-span-4">
                <ExperienceCard experience={e} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section aria-labelledby="fleet-title" className="bg-abyss py-20 text-white md:py-32">
        <div className="shell">
          <SectionIntro
            id="fleet-title"
            tone="dark"
            title="The fleet"
            lede="Each boat suits a different kind of day. Compare them here, or ask us which fits your plans."
            action={
              <Link href="/fleet" className="link-tide shrink-0 font-semibold">
                View the fleet
              </Link>
            }
          />
          <div className="mt-14 space-y-20 md:space-y-28">
            {fleet.map((v, i) => (
              <article key={v.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <Link
                  href={`/fleet/${v.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={`group relative block aspect-[16/10] overflow-hidden lg:col-span-7 ${
                    i % 2 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-[1.03]">
                    <Photo photo={v.photo} sizes="(min-width: 1024px) 58vw, 100vw" />
                  </div>
                </Link>
                <div className="lg:col-span-5">
                  <h3 className="display-md">{v.name}</h3>
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
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/fleet/${v.slug}`} className="btn btn-light">
                      View {v.name.toLowerCase()}
                    </Link>
                    <Link href={`/book?vessel=${v.slug}`} className="btn btn-primary">
                      Book this boat
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlaceholderNote tone="dark" className="mt-14 max-w-xl">
            Both boats are placeholders. Add your real fleet in src/content/fleet.ts.
          </PlaceholderNote>
        </div>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-title" className="py-20 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="why-title" className="display-md">
              How we run a charter
            </h2>
            <p className="mt-4 text-slate">
              The small things that make a day on the water feel effortless.
            </p>
            <PlaceholderNote className="mt-6">
              Draft copy. Replace with what genuinely sets you apart.
            </PlaceholderNote>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {reasons.map((r) => (
              <div key={r.title} className="border-t border-champagne pt-6">
                <h3 className="text-[1.5rem]">{r.title}</h3>
                <p className="mt-3 text-slate">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section aria-labelledby="destinations-title" className="bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionIntro
            id="destinations-title"
            title="Where the day can take you"
            lede="A few of the places guests ask for most. Routes change with the tide and the weather, and we will suggest the best option on the day."
          />
          <PlaceholderNote className="mt-6 max-w-xl">
            Rename these to the real places you visit (src/content/home.ts).
          </PlaceholderNote>
        </div>
        <ul className="shell mt-12 grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto pb-4 sm:auto-cols-[45%] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible">
          {destinations.map((d) => (
            <li key={d.name} className="snap-start">
              <figure className="relative aspect-[3/4] overflow-hidden">
                <Photo photo={d.photo} sizes="(min-width: 1024px) 22vw, 78vw" hideLabel />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/85 to-transparent p-5 pt-20 text-white">
                  <span className="block font-display text-[1.625rem] leading-tight">{d.name}</span>
                  <span className="mt-1 block min-h-[2.8em] text-sm text-white/85">{d.note}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery preview */}
      <section aria-labelledby="gallery-title" className="py-20 md:py-32">
        <div className="shell">
          <SectionIntro
            id="gallery-title"
            title="From the deck"
            action={
              <Link href="/gallery" className="link-tide shrink-0 font-semibold">
                Open the gallery
              </Link>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
            {gallery.slice(0, 5).map((g, i) => (
              <Link
                key={g.shot}
                href="/gallery"
                className={`relative block overflow-hidden ${
                  i === 0
                    ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
                    : "aspect-square"
                }`}
              >
                <span className="sr-only">Open the gallery: </span>
                <Photo photo={g} sizes="(min-width: 768px) 25vw, 50vw" hideLabel={i !== 0} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="py-20 md:py-32">
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
