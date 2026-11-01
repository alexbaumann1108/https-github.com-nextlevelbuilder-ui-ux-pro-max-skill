import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Fishing reports live as Markdown files in /content/reports. Add a file,
 * commit it (GitHub's website or app works fine), and the host rebuilds
 * the site automatically. See content/reports/_template.md.
 */

export const reportCategories = [
  "Monthly report",
  "Seasonal patterns",
  "Fishing tips",
  "Species",
  "Recent catches",
  "News",
] as const;
export type ReportCategory = (typeof reportCategories)[number];

export type Report = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: ReportCategory;
  species: string[];
  summary: string;
  cover?: { src: string; alt: string };
  html: string;
  readingMinutes: number;
};

const dir = path.join(process.cwd(), "content", "reports");

function load(file: string): (Report & { draft: boolean }) | null {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  if (!data.title || !data.date) return null;
  const category = reportCategories.includes(data.category) ? data.category : "News";
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date,
    category,
    species: Array.isArray(data.species) ? data.species.map(String) : [],
    summary: String(data.summary ?? ""),
    cover: data.cover ? { src: String(data.cover), alt: String(data.coverAlt ?? data.title) } : undefined,
    html: marked.parse(content, { async: false }) as string,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    draft: data.draft === true,
  };
}

/** Published reports, newest first. Files starting with "_" are ignored. */
export function getReports(): Report[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(load)
    .filter((r): r is Report & { draft: boolean } => !!r && !r.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getReport(slug: string) {
  return getReports().find((r) => r.slug === slug);
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
