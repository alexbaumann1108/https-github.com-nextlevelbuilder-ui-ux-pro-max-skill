import type { Metadata } from "next";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site";
import { Photo } from "@/components/photo";
import { Seascape } from "@/components/seascape";
import { GalleryGrid } from "@/components/gallery-grid";
import { BookingCta, PageMasthead } from "@/components/sections";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from fly fishing and light tackle trips with ${site.name}${site.serviceArea ? ` on ${site.serviceArea}` : ""}.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  // Thumbnails and full-size views are rendered on the server and handed to
  // the client grid, so the lightbox stays a small client component.
  const items = gallery.map((g) => ({
    alt: g.alt,
    wide: !!g.wide,
    thumb: <Photo photo={g} sizes={g.wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} />,
    full: g.src ? (
      <Photo photo={g} sizes="100vw" hideLabel className="!object-contain" />
    ) : (
      <Seascape scene={g.scene} seed={g.shot} label={g.alt} className="h-full w-full" />
    ),
  }));

  return (
    <>
      <PageMasthead
        title="Gallery"
        lede="Snook, redfish and days on Sanibel's water. Select any photo to view it full screen."
      />
      <section className="py-16 md:py-24">
        <div className="shell">
          <GalleryGrid items={items} />
        </div>
      </section>
      <BookingCta />
    </>
  );
}
