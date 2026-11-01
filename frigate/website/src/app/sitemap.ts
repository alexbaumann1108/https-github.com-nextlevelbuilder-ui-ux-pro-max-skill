import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { getReports } from "@/lib/reports";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["", 1],
    ["/fishery", 0.9],
    ["/book", 0.9],
    ["/captain", 0.7],
    ["/boat", 0.7],
    ["/gallery", 0.7],
    ["/reports", 0.7],
    ["/conditions", 0.6],
    ["/privacy", 0.2],
  ];
  return [
    ...pages.map(([p, priority]) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority })),
    ...getReports().map((r) => ({
      url: `${siteUrl}/reports/${r.slug}`,
      lastModified: r.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
