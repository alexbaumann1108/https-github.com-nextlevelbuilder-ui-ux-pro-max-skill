import type { Metadata } from "next";
import { site, inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { BookingCta, PageMasthead } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: ${inArea("inshore fly fishing and light tackle charters")}.`,
  alternates: { canonical: "/about" },
};

/** Draft copy built from the brand board. Edit so every line is true. */
const values = [
  {
    title: "Fly fishing first",
    body: "Frigate is built around the fly rod: reading the water, making the cast count and sight-fishing for snook, redfish and tarpon in the shallows.",
  },
  {
    title: "Light tackle, too",
    body: "Not everyone wants to fish a fly. Light spinning tackle keeps the day simple and the action steady.",
  },
  {
    title: "Local waters",
    body: "Sanibel's beaches, flats and mangrove shorelines, and knowing which one is right for today's tide.",
  },
  {
    title: "Tailored trips",
    body: "Boat or wading, fly or spin, an early start or the evening tide. Each trip is planned around the angler.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageMasthead
        title="About Frigate"
        lede="Inshore fly fishing and light tackle around Sanibel Island and Southwest Florida."
      />

      <section className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo
                photo={{
                  src: "/photos/redfish-in-the-mangroves.jpg",
                  alt: "A guide holding a golden redfish beside the mangroves",
                  scene: "glass",
                  shot: "Redfish in the mangroves",
                }}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <h2 className="display-md">Our story</h2>
            <PlaceholderNote className="mt-6">
              Tell your story here in your own words: who you are, how you got
              into fly fishing, how long you&apos;ve fished Sanibel and why you
              started Frigate. List licences or certifications only if you
              hold them.
            </PlaceholderNote>
            <div className="mt-8 space-y-5 text-slate">
              <p>
                Frigate specializes in fly fishing and light tackle charters
                around Sanibel Island and Southwest Florida, from the boat and
                on foot along the beaches and mangroves.
              </p>
              <p>
                Every trip is tailored to the angler: the species you want, the
                way you like to fish and the tide that gives you the best shot.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-mist py-20 md:py-28">
        <div className="shell">
          <h2 id="values-title" className="display-md max-w-2xl">
            What Frigate is about
          </h2>
          <PlaceholderNote className="mt-6 max-w-xl">
            Draft copy. Edit so every statement is true for your business.
          </PlaceholderNote>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="border-t border-champagne pt-6">
                <h3 className="text-[1.625rem]">{v.title}</h3>
                <p className="mt-3 max-w-xl text-slate">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
