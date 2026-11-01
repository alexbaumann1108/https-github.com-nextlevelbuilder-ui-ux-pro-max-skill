import type { MetadataRoute } from "next";
import { fleet } from "@/content/fleet";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/charters", "/book", "/gallery", "/conditions", "/about", "/contact", "/privacy"];
  // /fleet redirects to the boat's own page when there is only one boat.
  if (fleet.length > 1) pages.splice(2, 0, "/fleet");
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
