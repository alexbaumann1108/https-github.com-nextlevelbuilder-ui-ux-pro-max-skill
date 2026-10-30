import type { Metadata } from "next";
import Link from "next/link";
import { site, inArea } from "@/content/site";
import { ContactForm } from "@/components/forms/contact-form";
import { PageMasthead } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";
import { Seascape } from "@/components/seascape";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} about ${inArea("private boat charters")}. Ask a question or plan a custom trip.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const socials = Object.entries(site.social).filter(([, url]) => url) as [string, string][];

  return (
    <>
      <PageMasthead
        title="Contact us"
        lede="Questions about a charter, a custom idea or a large group? Send a message and a member of the team will reply."
      />
      <section className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-8 text-[1.75rem]">Send a message</h2>
            <ContactForm />
          </div>
          <aside className="space-y-10 lg:col-span-5">
            <div>
              <h2 className="text-[1.75rem]">Reach us directly</h2>
              <dl className="mt-6 space-y-5">
                {site.phone && (
                  <div>
                    <dt className="text-sm text-slate">Phone</dt>
                    <dd>
                      <a className="link-tide text-lg" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {site.email && (
                  <div>
                    <dt className="text-sm text-slate">Email</dt>
                    <dd>
                      <a className="link-tide break-all text-lg" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </dd>
                  </div>
                )}
                {(site.address || site.serviceArea) && (
                  <div>
                    <dt className="text-sm text-slate">Departing from</dt>
                    <dd className="text-lg">
                      {site.address
                        ? `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`
                        : site.serviceArea}
                    </dd>
                  </div>
                )}
                {socials.length > 0 && (
                  <div>
                    <dt className="text-sm text-slate">Follow along</dt>
                    <dd className="flex flex-wrap gap-x-5 gap-y-1">
                      {socials.map(([k, url]) => (
                        <a key={k} href={url} target="_blank" rel="noopener" className="link-tide capitalize">
                          {k}
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              {!site.phone && !site.email && (
                <PlaceholderNote className="mt-2">
                  Add phone, email, departure address and social links in
                  src/content/site.ts. Each appears here once set.
                </PlaceholderNote>
              )}
            </div>

            <div>
              <h2 className="text-[1.75rem]">Find us</h2>
              <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-mist">
                {site.mapEmbedUrl ? (
                  <iframe
                    src={site.mapEmbedUrl}
                    title={`Map showing ${site.name}`}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Seascape scene="glass" seed="map" className="absolute inset-0 h-full w-full opacity-60" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <PlaceholderNote className="bg-white/90">
                        Paste a Google Maps embed link into mapEmbedUrl in
                        src/content/site.ts to show your departure point.
                      </PlaceholderNote>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-abyss p-6 text-white sm:p-8">
              <h2 className="text-[1.5rem]">Ready to choose a date?</h2>
              <p className="mt-2 text-foam">The booking form takes about two minutes.</p>
              <Link href="/book" className="btn btn-primary mt-6">
                Book your charter
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
