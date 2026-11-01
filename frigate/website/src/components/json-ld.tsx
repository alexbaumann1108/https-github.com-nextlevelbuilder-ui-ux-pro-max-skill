import { site, siteUrl } from "@/content/site";
import { experiences } from "@/content/fishery";
import { rates } from "@/content/rates";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** LocalBusiness structured data for search engines. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "@id": `${siteUrl}/#business`,
    name: site.name,
    description:
      "Fly fishing and light tackle charters on Sanibel Island, Florida: beach snook, tarpon and backcountry redfish.",
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    image: `${siteUrl}/photos/boat-action-craft-under-clouds.jpg`,
    logo: `${siteUrl}/brand/frigate-logo-black.png`,
    priceRange: "$600–$1,200",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sanibel",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [...site.serviceArea.map((name) => ({ "@type": "Place", name })), "Southwest Florida"],
    sameAs: [site.instagram.url],
    makesOffer: rates.map((r) => ({
      "@type": "Offer",
      name: `${r.name} fishing charter, ${r.hours} hours`,
      price: r.price,
      priceCurrency: "USD",
      itemOffered: {
        "@type": "Service",
        name: `${r.hours}-hour inshore fishing charter`,
        description: experiences.map((e) => e.name).join(", "),
      },
    })),
  };
  return <JsonLd data={data} />;
}
