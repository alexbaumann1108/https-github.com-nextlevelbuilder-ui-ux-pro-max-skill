import type { MetadataRoute } from "next";
import { fleet } from "@/content/fleet";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/charters", "/fleet", "/book", "/gallery", "/about", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({
      url: `${siteUrl}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/book" || p === "/charters" ? 0.9 : 0.6,
    })),
    ...fleet.map((v) => ({
      url: `${siteUrl}/fleet/${v.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
