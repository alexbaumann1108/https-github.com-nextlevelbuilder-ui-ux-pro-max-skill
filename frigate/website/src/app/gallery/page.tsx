import type { Metadata } from "next";
import { gallery } from "@/content/gallery";
import { GalleryGrid } from "@/components/gallery-grid";
import { BookingBand, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Photo Gallery: Snook, Tarpon & Redfish on Sanibel",
  description:
    "Photos from fly fishing and light tackle trips around Sanibel Island: beach snook, redfish, the boat and days on the water in Southwest Florida.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        label="Gallery"
        title="Days on the water"
        lede="Snook from the beaches, redfish from the backcountry and the boat that gets us there. Select any photo to see it full screen."
        sketch="redfish"
      />
      <section aria-label="Photos" className="py-14 md:py-20">
        <div className="shell">
          <GalleryGrid photos={gallery} />
        </div>
      </section>
      <BookingBand />
    </>
  );
}
