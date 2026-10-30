import type { Metadata } from "next";
import { site, inArea } from "@/content/site";
import { Photo } from "@/components/photo";
import { BookingCta, PageMasthead } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "About us",
  description: `The people behind ${site.name}: ${inArea("private boat charters")} run with care, local knowledge and a focus on safety.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Our passion for the water",
    body: "We do this because there is nowhere we would rather be. That shows in the boats we keep, the places we take guests and the time we take to get each day right.",
  },
  {
    title: "Your experience comes first",
    body: "Every charter starts with a conversation about what you want from the day. We listen, plan around it and stay flexible when the weather has other ideas.",
  },
  {
    title: "Safety and professionalism",
    body: "Every trip begins with a clear briefing, and our boats are kept ready before guests arrive. Being relaxed on board starts with trusting the people running it.",
  },
  {
    title: "What makes us different",
    body: "Replace this paragraph with the one thing guests mention most about you, in your own words.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageMasthead
        title="About us"
        lede="A small team who love the water and want every guest to leave planning their next trip."
      />

      <section className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo
                photo={{
                  alt: "The owners on the dock beside their boat",
                  scene: "glass",
                  shot: "Owner or crew portrait on the dock, natural light",
                }}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <h2 className="display-md">Our story</h2>
            <PlaceholderNote className="mt-6">
              Tell your real story here: who you are, how the company started,
              how long you have been on the water and why you love it. Do not
              list licences or certifications unless you hold them and can
              show them.
            </PlaceholderNote>
            <div className="mt-8 space-y-5 text-slate">
              <p>
                Some of our best days have been spent on this water, and
                sharing it is what we enjoy most. Whether it is a first-time
                visitor seeing dolphins up close or a family returning for
                their annual sandbar day, we want every charter to feel
                personal.
              </p>
              <p>
                We keep things simple: an honest conversation before you book,
                a boat ready when you arrive and a day planned around the
                people on board.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-mist py-20 md:py-28">
        <div className="shell">
          <h2 id="values-title" className="display-md max-w-2xl">
            What we care about
          </h2>
          <PlaceholderNote className="mt-6 max-w-xl">
            Draft copy. Edit so every statement is true for your business.
          </PlaceholderNote>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="border-t border-champagne pt-6">
                <h3 className="text-[1.5rem]">{v.title}</h3>
                <p className="mt-3 max-w-xl text-slate">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCta title="Come out on the water with us" />
    </>
  );
}
