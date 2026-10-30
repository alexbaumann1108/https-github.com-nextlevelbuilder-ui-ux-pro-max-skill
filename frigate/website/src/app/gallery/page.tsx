import type { Metadata } from "next";
import { gallery } from "@/content/gallery";
import { site, inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { Seascape } from "@/components/seascape";
import { GalleryGrid } from "@/components/gallery-grid";
import { BookingCta, PageMasthead } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from ${site.name}: ${inArea("private charters, sunset cruises, sandbar days and island trips")}.`,
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
        lede="Days on the water, as guests saw them. Select any photo to view it full screen."
      />
      <section className="py-16 md:py-24">
        <div className="shell">
          <PlaceholderNote className="mb-10 max-w-2xl">
            Every image is a placeholder seascape labelled with the shot to
            take. Add your photos to /public/photos and list them in
            src/content/gallery.ts.
          </PlaceholderNote>
          <GalleryGrid items={items} />
        </div>
      </section>
      <BookingCta />
    </>
  );
}
