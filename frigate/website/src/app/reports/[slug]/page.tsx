import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReport, getReports, formatDate } from "@/lib/reports";
import { site, siteUrl } from "@/content/site";
import { JsonLd } from "@/components/json-ld";
import { BookingBand } from "@/components/ui";

export function generateStaticParams() {
  return getReports().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/reports/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.summary,
    alternates: { canonical: `/reports/${r.slug}` },
    openGraph: {
      type: "article",
      title: r.title,
      description: r.summary,
      publishedTime: r.date,
      images: r.cover ? [{ url: r.cover.src, alt: r.cover.alt }] : undefined,
    },
  };
}

export default async function ReportPage({ params }: PageProps<"/reports/[slug]">) {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) notFound();

  const others = getReports().filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <>
      <article className="pb-20 pt-32 md:pt-40">
        <header className="shell max-w-3xl">
          <nav aria-label="Breadcrumb" className="label text-ink-soft">
            <Link href="/reports" className="hover:text-ink">
              Fishing reports
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>{r.category}</span>
          </nav>
          <h1 className="display-lg mt-4">{r.title}</h1>
          <p className="label mt-5 text-orange-ink">
            <time dateTime={r.date}>{formatDate(r.date)}</time>
            <span className="mx-2">/</span>
            {r.readingMinutes} min read
            {r.species.length > 0 && (
              <>
                <span className="mx-2">/</span>
                {r.species.join(", ")}
              </>
            )}
          </p>
        </header>

        {r.cover && (
          <div className="shell mt-10 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[3px]">
              <Image src={r.cover.src} alt={r.cover.alt} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div
          className="prose-journal shell mt-12 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: r.html }}
        />

        <footer className="shell mt-16 max-w-3xl border-t border-tan/50 pt-8">
          <p className="text-ink-soft">
            Want to fish it?{" "}
            <Link href="/book" className="link font-bold text-ink">
              Send a booking inquiry
            </Link>{" "}
            or follow{" "}
            <a href={site.instagram.url} target="_blank" rel="noopener" className="link font-bold text-ink">
              {site.instagram.handle}
            </a>{" "}
            for daily updates.
          </p>
          {others.length > 0 && (
            <>
              <h2 className="mt-12 text-[1.5rem]">More reports</h2>
              <ul className="mt-4 divide-y divide-tan/50 border-y border-tan/50">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/reports/${o.slug}`} className="flex items-baseline justify-between gap-4 py-4 hover:text-seafoam-deep">
                      <span className="font-display text-[1.2rem]">{o.title}</span>
                      <span className="label shrink-0 text-ink-soft">{formatDate(o.date)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </footer>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: r.title,
          description: r.summary,
          datePublished: r.date,
          url: `${siteUrl}/reports/${r.slug}`,
          image: r.cover ? `${siteUrl}${r.cover.src}` : undefined,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": `${siteUrl}/#business` },
        }}
      />

      <BookingBand />
    </>
  );
}
