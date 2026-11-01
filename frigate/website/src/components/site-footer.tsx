import Link from "next/link";
import { nav, site, showPlaceholders, instagramHandle } from "@/content/site";
import { experiences } from "@/content/experiences";
import { Logo } from "./logo";
import { PlaceholderNote } from "./placeholder-note";

const socialLabels: Record<keyof typeof site.social, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export function SiteFooter() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[])
    .map((k) => ({ key: k, url: site.social[k], label: socialLabels[k] }))
    .filter((s): s is { key: keyof typeof site.social; url: string; label: string } => !!s.url);

  return (
    <footer className="bg-abyss pb-28 pt-20 text-foam sm:pb-12">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label={`${site.name} home`} className="inline-block">
              <Logo tone="light" variant="full" className="w-[220px]" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">
              Inshore fly fishing and light tackle
              {site.serviceArea ? ` around ${site.serviceArea}` : ""} and
              Southwest Florida.
            </p>
            <Link href="/book" className="btn btn-primary mt-8">
              Book your trip
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="font-sans text-sm font-semibold text-white">Explore</h2>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/book" className="hover:text-white">
                    Book
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-white">Trips</h2>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {experiences.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/charters#${e.slug}`} className="hover:text-white">
                      {e.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-white">Contact</h2>
              <address className="mt-4 space-y-2.5 text-[0.9375rem] not-italic">
                {site.phone && (
                  <a className="block hover:text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                    {site.phone}
                  </a>
                )}
                {site.email && (
                  <a className="block break-all hover:text-white" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                )}
                {site.serviceArea && <p>{site.serviceArea}</p>}
                {!site.phone && !site.email && (
                  <PlaceholderNote tone="dark">
                    Add phone, email and service area in src/content/site.ts.
                  </PlaceholderNote>
                )}
                <Link href="/contact" className="block hover:text-white">
                  Contact page
                </Link>
              </address>
              {socials.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[0.9375rem]">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a href={s.url} className="hover:text-white" rel="noopener" target="_blank">
                        {s.key === "instagram" ? `Instagram ${instagramHandle}` : s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="horizon mt-16" />
        <div className="mt-6 flex flex-col gap-3 text-sm text-foam/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.name}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
        {showPlaceholders && (
          <p className="mt-6 text-xs text-foam/70">
            Preview mode: dashed notes mark details to replace before launch.
            Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=false to hide them.
          </p>
        )}
      </div>
    </footer>
  );
}
