import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getReports, formatDate, reportCategories } from "@/lib/reports";
import { site } from "@/content/site";
import { BookingBand, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Fishing Reports: Sanibel & Southwest Florida",
  description:
    "Fishing reports from Sanibel Island: monthly conditions, seasonal patterns for snook, tarpon and redfish, fishing tips and recent catches.",
  alternates: { canonical: "/reports" },
};

export default function ReportsPage() {
  const reports = getReports();
  const [lead, ...rest] = reports;
  const used = reportCategories.filter((c) => reports.some((r) => r.category === c));

  return (
    <>
      <PageHeader
        label="Fishing reports"
        title="Notes from the water"
        lede="Monthly reports, seasonal patterns, fishing tips and recent catches from around Sanibel, Captiva and Pine Island Sound."
        sketch="baitfish"
      >
        {used.length > 1 && (
          <p className="label rise mt-6 text-ink-soft">Topics: {used.join(", ")}</p>
        )}
      </PageHeader>

      <section aria-label="Reports" className="py-16 md:py-24">
        <div className="shell">
          {!lead ? (
            <p className="text-ink-soft">The first report is on its way.</p>
          ) : (
            <>
              <article className="grid gap-8 md:grid-cols-12 md:items-center">
                {lead.cover && (
                  <Link href={`/reports/${lead.slug}`} tabIndex={-1} aria-hidden="true" className="group relative block aspect-[16/10] overflow-hidden rounded-[3px] md:col-span-7">
                    <Image src={lead.cover.src} alt="" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </Link>
                )}
                <div className={lead.cover ? "md:col-span-5" : "md:col-span-12"}>
                  <p className="label text-orange-ink">
                    {lead.category} / {formatDate(lead.date)}
                  </p>
                  <h2 className="display-md mt-3">
                    <Link href={`/reports/${lead.slug}`} className="hover:text-seafoam-deep">
                      {lead.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-ink-soft">{lead.summary}</p>
                  <Link href={`/reports/${lead.slug}`} className="link mt-6 inline-block font-bold">
                    Read the report<span className="sr-only">: {lead.title}</span>
                  </Link>
                </div>
              </article>

              {rest.length > 0 && (
                <ul className="mt-16 grid gap-10 border-t border-tan/50 pt-12 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((r) => (
                    <li key={r.slug}>
                      <article>
                        {r.cover && (
                          <Link href={`/reports/${r.slug}`} tabIndex={-1} aria-hidden="true" className="group relative mb-5 block aspect-[4/3] overflow-hidden rounded-[3px]">
                            <Image src={r.cover.src} alt="" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                          </Link>
                        )}
                        <p className="label text-orange-ink">
                          {r.category} / {formatDate(r.date)}
                        </p>
                        <h2 className="mt-2 text-[1.5rem] leading-snug">
                          <Link href={`/reports/${r.slug}`} className="hover:text-seafoam-deep">
                            {r.title}
                          </Link>
                        </h2>
                        <p className="mt-2 text-ink-soft">{r.summary}</p>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          <p className="mt-16 text-ink-soft">
            Daily updates between reports:{" "}
            <a href={site.instagram.url} target="_blank" rel="noopener" className="link font-bold text-ink">
              {site.instagram.handle} on Instagram
            </a>
          </p>
        </div>
      </section>

      <BookingBand />
    </>
  );
}
