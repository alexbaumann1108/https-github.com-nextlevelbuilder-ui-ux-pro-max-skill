import Image from "next/image";
import Link from "next/link";
import type { Photo as PhotoType } from "@/content/fishery";
import { rates, formatPrice } from "@/content/rates";
import { fwc } from "@/content/links";
import { site } from "@/content/site";
import { FishSketch, type Species } from "./fish-sketch";
import { Illustration, type ArtName } from "./illustration";

/** A photo that fills its positioned parent. */
export function Photo({
  photo,
  sizes,
  priority,
  className = "",
}: {
  photo: PhotoType;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={photo.position ? { objectPosition: photo.position } : undefined}
    />
  );
}

/** Page opening for inner pages: a journal page heading with a sketch. */
export function PageHeader({
  label,
  title,
  lede,
  sketch,
  art,
  children,
}: {
  label: string;
  title: string;
  lede?: string;
  sketch?: Species;
  art?: ArtName;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-tan/40 pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="shell relative grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label rise text-orange-ink">{label}</p>
          <h1 className="display-lg rise mt-4" style={{ animationDelay: "0.08s" }}>
            {title}
          </h1>
          {lede && (
            <p className="lede rise mt-5 max-w-2xl text-ink-soft" style={{ animationDelay: "0.16s" }}>
              {lede}
            </p>
          )}
          {children}
        </div>
        <div className="hidden md:col-span-5 md:block">
          {sketch && <FishSketch species={sketch} className="ml-auto w-full max-w-md text-ink/85" />}
          {art && <Illustration name={art} className="ml-auto w-full max-w-sm text-ink/85" />}
        </div>
      </div>
    </header>
  );
}

export function SectionHeading({
  label,
  title,
  lede,
  id,
  action,
  tone = "light",
}: {
  label?: string;
  title: string;
  lede?: string;
  id?: string;
  action?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {label && (
          <p className={`label ${tone === "dark" ? "text-seafoam" : "text-orange-ink"}`}>{label}</p>
        )}
        <h2 id={id} className="display-md mt-3">
          {title}
        </h2>
        {lede && (
          <p className={`mt-4 ${tone === "dark" ? "text-parchment/80" : "text-ink-soft"}`}>{lede}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Trip rates set out like a ledger. */
export function RatesLedger({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div>
      <dl className="space-y-1">
        {rates.map((r) => (
          <div key={r.hours} className="flex items-baseline gap-3 py-2">
            <dt className="shrink-0">
              <span className="font-display text-[1.375rem] sm:text-[1.5rem]">{r.name}</span>
              <span className={`label ml-2 ${dark ? "text-parchment/70" : "text-ink-soft"}`}>
                {r.hours} hrs
              </span>
            </dt>
            <span
              aria-hidden="true"
              className={`min-w-6 flex-1 translate-y-[-0.3em] border-b-2 border-dotted ${dark ? "border-parchment/30" : "border-tan"}`}
            />
            <dd
              className="font-display text-[1.5rem] sm:text-[1.75rem]"
              style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
            >
              {formatPrice(r.price)}
            </dd>
          </div>
        ))}
      </dl>
      <p className={`mt-4 text-sm ${dark ? "text-parchment/75" : "text-ink-soft"}`}>
        Per trip, any fishery. Fishing license included through the captain.
      </p>
    </div>
  );
}

/** Links to the official FWC rules for the species we fish for. */
export function Regulations() {
  return (
    <section aria-labelledby="regs-title" className="py-20 md:py-24">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label text-orange-ink">Know the rules</p>
          <h2 id="regs-title" className="display-md mt-3">
            Fishing regulations
          </h2>
          <p className="mt-4 max-w-md text-ink-soft">
            Size limits, bag limits and closed seasons change by region and time
            of year. The current rules for each species come straight from the{" "}
            {fwc.name}.
          </p>
          <a href={fwc.allRules} target="_blank" rel="noopener" className="btn btn-ink mt-8">
            All FWC saltwater rules
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <ul className="divide-y divide-tan/50 border-y border-tan/50 lg:col-span-7">
          {fwc.species.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between gap-6 py-5"
              >
                <span className="font-display text-[1.5rem] leading-tight">{s.name}</span>
                <span className="label shrink-0 text-seafoam-deep group-hover:underline">
                  FWC rules
                  <span className="sr-only"> for {s.name} (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
          <li className="flex items-center justify-between gap-6 py-5">
            <span className="font-display text-[1.5rem] leading-tight">Fishing license</span>
            <span className="shrink-0 text-right">
              <span className="label block text-seafoam-deep">Included</span>
              <span className="block text-sm text-ink-soft">Provided through the captain</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** Closing call to action used at the foot of most pages. */
export function BookingBand({
  title = "Check the tide. Pack the sunscreen. Let's go fishing.",
}: {
  title?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-seafoam-deep text-parchment">
      <div className="shell relative grid gap-10 py-20 md:grid-cols-12 md:items-center md:py-24">
        <div className="md:col-span-7">
          <h2 className="display-lg">{title}</h2>
          <p className="lede mt-5 max-w-xl text-parchment/85">
            Tell us your dates, the fish you&apos;re after and who&apos;s coming. We&apos;ll
            check the tides and get back to you to plan the day.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="btn btn-sun">
              Book a trip
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              Call {site.phone}
            </a>
          </div>
        </div>
        <div className="md:col-span-5">
          <FishSketch species="tarpon" className="w-full text-parchment/70" />
        </div>
      </div>
      <Illustration name="palm-sunset" className="w-full text-parchment/25" />
    </section>
  );
}

/** Dashed note marking content that still needs the owner's details. */
export { PlaceholderNote } from "./placeholder-note";
