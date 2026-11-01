import Link from "next/link";
import { nav, site, showPlaceholders } from "@/content/site";
import { Logo } from "./logo";
import { Illustration } from "./illustration";

export function SiteFooter() {
  return (
    <footer className="bg-seafoam-night pb-28 text-parchment sm:pb-12">
      <div className="shell pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label={`${site.name}, home`} className="inline-block">
              <Logo tone="light" variant="full" className="w-[210px]" />
            </Link>
            <p className="label mt-6 text-seafoam">
              {site.location}
              <br />
              {site.geo.label}
            </p>
            <Link href="/book" className="btn btn-sun mt-8">
              Send a booking inquiry
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-7">
            <div>
              <h2 className="label text-seafoam">Explore</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="/" className="hover:text-orange">
                    Home
                  </Link>
                </li>
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-orange">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/book" className="hover:text-orange">
                    Book a trip
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="label text-seafoam">Get in touch</h2>
              <address className="mt-4 space-y-2.5 not-italic">
                <a className="block hover:text-orange" href={site.phoneHref}>
                  {site.phone}
                </a>
                <a className="block break-all hover:text-orange" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <a
                  className="block hover:text-orange"
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener"
                >
                  Instagram {site.instagram.handle}
                </a>
                <p className="pt-2 text-parchment/75">{site.serviceAreaSummary}.</p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between gap-6">
          <Illustration name="fly" className="w-32 text-parchment/50 md:w-40" />
          <Illustration name="bird" className="w-36 text-parchment/40 md:w-48" />
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-parchment/15 pt-6 text-sm text-parchment/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.name}</p>
          <Link href="/privacy" className="hover:text-orange">
            Privacy
          </Link>
        </div>
        {showPlaceholders && (
          <p className="mt-4 text-xs text-parchment/60">
            Preview mode: dashed notes mark details to fill in before launch.
          </p>
        )}
      </div>
    </footer>
  );
}
