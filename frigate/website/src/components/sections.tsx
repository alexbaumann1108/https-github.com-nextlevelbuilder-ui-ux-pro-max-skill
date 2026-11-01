import Link from "next/link";
import type { Experience } from "@/content/types";
import { ctaPhoto, faqs, reviews } from "@/content/home";
import { rates, formatPrice, lowestRate } from "@/content/rates";
import { fwc } from "@/content/links";
import { site, showPlaceholders } from "@/content/site";
import { Photo } from "./photo";
import { PlaceholderNote } from "./placeholder-note";

/** Navy masthead used at the top of every inner page. */
export function PageMasthead({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-abyss pb-16 pt-36 text-white md:pb-20 md:pt-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_120%,rgb(139_100_64/0.5),transparent_60%),radial-gradient(ellipse_at_70%_-20%,rgb(201_164_122/0.14),transparent_55%)]"
      />
      <div className="shell relative">
        <h1 className="display-lg hero-rise max-w-3xl">{title}</h1>
        {lede && (
          <p
            className="lede hero-rise mt-6 max-w-2xl text-foam"
            style={{ animationDelay: "0.12s" }}
          >
            {lede}
          </p>
        )}
        {children}
        <div className="horizon hero-horizon mt-12 max-w-xl" />
      </div>
    </section>
  );
}

export function SectionIntro({
  title,
  lede,
  tone = "light",
  action,
  id,
}: {
  title: string;
  lede?: string;
  tone?: "light" | "dark";
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="display-md">
          {title}
        </h2>
        {lede && (
          <p className={`mt-4 ${tone === "dark" ? "text-foam" : "text-slate"}`}>{lede}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Small spec list shared by experience cards and the fleet showroom. */
export function Specs({
  items,
  tone = "light",
}: {
  items: { label: string; value?: string | number }[];
  tone?: "light" | "dark";
}) {
  // On the live site, unconfirmed details are simply left out.
  const shown = showPlaceholders ? items : items.filter((i) => i.value);
  if (shown.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
      {shown.map((i) => (
        <div key={i.label}>
          <dt className={tone === "dark" ? "text-foam/75" : "text-slate"}>{i.label}</dt>
          <dd className={`mt-0.5 ${i.value ? "" : "italic opacity-60"}`}>
            {i.value ?? "To be confirmed"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ExperienceCard({
  experience: e,
  large,
  headingLevel = "h3",
}: {
  experience: Experience;
  large?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const meta = [
    { label: "Trip length", value: rates.map((r) => r.hours).join(", ") + " hours" },
    { label: "From", value: formatPrice(lowestRate) },
  ];
  return (
    <article id={e.slug} className="group flex scroll-mt-28 flex-col">
      <Link
        href={`/book?experience=${e.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block overflow-hidden bg-mist ${
          large ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-[1.03]">
          <Photo
            photo={e.photo}
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <H className={large ? "display-md" : "text-[1.625rem]"}>{e.name}</H>
        <p className="mt-2 text-slate">{large ? e.description : e.summary}</p>
        <div className="mt-5">
          <Specs items={meta} />
        </div>
        <div className="mt-6 flex-1" />
        <Link
          href={`/book?experience=${e.slug}`}
          className="link-tide self-start text-[0.9375rem] font-semibold"
          aria-label={`Book ${e.name.toLowerCase()}`}
        >
          Book this trip
        </Link>
      </div>
    </article>
  );
}

export function FaqList() {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faqs
        .filter((f) => showPlaceholders || !f.needsDetails)
        .map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="relative h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-3 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
            />
          </summary>
          <div className="max-w-2xl pb-6 text-slate">
            {f.needsDetails ? <PlaceholderNote>{f.a}</PlaceholderNote> : <p>{f.a}</p>}
          </div>
        </details>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section aria-labelledby="reviews-title" className="bg-mist py-20 md:py-28">
      <div className="shell">
        <SectionIntro
          id="reviews-title"
          title="What guests say"
          lede="Every review shown here is from a real guest, copied word for word from where it was published."
        />
        {reviews.length > 0 ? (
          <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.name + r.quote.slice(0, 20)}>
                <figure className="flex h-full flex-col border-t border-champagne pt-6">
                  {r.rating && (
                    <p className="mb-4 text-champagne" aria-label={`Rated ${r.rating} out of 5`}>
                      {"★".repeat(r.rating)}
                      <span className="opacity-30">{"★".repeat(5 - r.rating)}</span>
                    </p>
                  )}
                  <blockquote className="font-display text-[1.375rem] leading-snug">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-slate">
                    {r.name}, via {r.source}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 grid gap-8 border-t border-champagne pt-8 md:grid-cols-[1fr_auto] md:items-center">
            <p className="max-w-xl font-display text-[1.5rem] leading-snug">
              Guest reviews will appear here.
            </p>
            {site.googleReviewsUrl ? (
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener"
                className="btn btn-dark"
              >
                Read our Google reviews
              </a>
            ) : (
              <PlaceholderNote className="max-w-md">
                Add verified reviews in src/content/home.ts and your Google
                review link in src/content/site.ts. Nothing is shown until
                then.
              </PlaceholderNote>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/** Closing call to action used at the foot of most pages. */
export function BookingCta({
  title = "Check the tide. Pack the sunscreen. Let's go fishing.",
  body = "Tell us the trip, the date and who's fishing. We'll check the tides and availability and reply to confirm.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss text-white">
      <div className="absolute inset-0 -z-10">
        <Photo photo={ctaPhoto} sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss/90 via-abyss/40 to-abyss/10" />
      <div className="shell flex min-h-[32rem] flex-col justify-end py-16 md:min-h-[36rem] md:py-20">
        <h2 className="display-lg max-w-3xl">{title}</h2>
        <p className="lede mt-5 max-w-xl text-white/85">{body}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/book" className="btn btn-primary">
            Book your trip
          </Link>
          <Link href="/contact" className="btn btn-light">
            Ask a question
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Trip lengths and prices, per trip. */
export function RatesTable({ tone = "light" }: { tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-foam" : "text-slate";
  return (
    <div>
      <ul className={`grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 ${tone === "dark" ? "divide-white/15 border-white/15" : "divide-ink/10 border-ink/10"} border-y`}>
        {rates.map((r) => (
          <li key={r.hours} className="flex items-baseline justify-between gap-4 py-5 sm:block sm:px-6 sm:py-7 sm:first:pl-0">
            <span>
              <span className="block font-display text-[1.625rem] leading-tight">{r.name}</span>
              <span className={`block text-sm ${muted}`}>{r.hours} hours</span>
            </span>
            <span className="font-display text-[2rem] leading-none sm:mt-4 sm:block sm:text-[2.5rem]" style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
              {formatPrice(r.price)}
            </span>
          </li>
        ))}
      </ul>
      <p className={`mt-4 text-sm ${muted}`}>Prices are per trip, for any trip type.</p>
    </div>
  );
}

/** Links to the official FWC rules for the species we target. */
export function RegulationsSection() {
  return (
    <section aria-labelledby="regs-title" className="py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="regs-title" className="display-md">
            Fishing regulations
          </h2>
          <p className="mt-4 max-w-md text-slate">
            Size limits, bag limits and closed seasons change by region and
            time of year. The current rules for each species are set by the{" "}
            {fwc.name}.
          </p>
          <a
            href={fwc.allRules}
            target="_blank"
            rel="noopener"
            className="btn btn-dark mt-8"
          >
            All FWC saltwater rules
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {fwc.species.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <span className="font-display text-[1.625rem] leading-tight">{s.name}</span>
                  <span className="shrink-0 text-sm font-semibold text-ocean group-hover:underline">
                    FWC rules
                    <span className="sr-only"> for {s.name} (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center justify-between gap-6 py-5">
              <span className="font-display text-[1.625rem] leading-tight">Fishing license</span>
              <span className="shrink-0 text-right text-sm font-semibold">
                Included with your trip
                <span className="block font-normal text-slate">Provided through the captain</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
