import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageMasthead } from "@/components/sections";
import { PlaceholderNote } from "@/components/placeholder-note";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${site.name} handles the details you send through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageMasthead title="Privacy notice" />
      <section className="py-16 md:py-24">
        <div className="shell max-w-3xl space-y-6 text-slate [&_h2]:mt-10 [&_h2]:text-[1.5rem] [&_h2]:text-ink">
          <PlaceholderNote>
            A starting point only. Have it reviewed for the laws that apply to
            your business, and name the services you use (for example your
            email or booking provider).
          </PlaceholderNote>
          <h2>What we collect</h2>
          <p>
            When you send a booking request or a message, we receive the
            details you enter: your name, email address, phone number, your
            preferred trip, date, time and group size, and anything you
            write in the message box.
          </p>
          <h2>How we use it</h2>
          <p>
            We use these details only to reply to you, check availability and
            arrange your trip. We do not sell your information or add you
            to marketing lists without asking.
          </p>
          <h2>How long we keep it</h2>
          <p>
            We keep booking correspondence for as long as needed to arrange
            your trip and meet our record-keeping obligations, then delete it.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct or delete the details we hold about
            you at any time
            {site.email ? (
              <>
                {" "}by emailing{" "}
                <a className="underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </>
            ) : (
              " using the contact page"
            )}
            .
          </p>
        </div>
      </section>
    </>
  );
}
