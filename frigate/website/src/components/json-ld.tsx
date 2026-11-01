import { site, siteUrl } from "@/content/site";
import { experiences } from "@/content/experiences";
import { rates } from "@/content/rates";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Structured data is only published once the business details in
 * src/content/site.ts are real (`verified: true`), so search engines never
 * receive placeholder facts.
 */
export function LocalBusinessJsonLd() {
  if (!site.verified) return null;

  const socials = Object.values(site.social).filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: "Inshore fly fishing and light tackle charters around Sanibel Island and Southwest Florida.",
    url: siteUrl,
    image: `${siteUrl}/photos/wading-the-mangroves-golden-light.jpg`,
    logo: `${siteUrl}/brand/frigate-logo-black.png`,
    makesOffer: rates.map((r) => ({
      "@type": "Offer",
      name: `${r.name} fishing charter (${r.hours} hours)`,
      price: r.price,
      priceCurrency: "USD",
      itemOffered: {
        "@type": "Service",
        name: `${r.hours}-hour inshore fishing charter`,
        description: experiences.map((e) => e.name).join(", "),
      },
    })),
  };
  if (site.phone) data.telephone = site.phone;
  if (site.email) data.email = site.email;
  if (site.serviceArea) data.areaServed = site.serviceArea;
  if (site.address)
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    };
  if (socials.length) data.sameAs = socials;

  return <JsonLd data={data} />;
}
