import type { NewsMeta } from "./news-types";
import { newsMeta } from "./news-meta.generated";

export type { NewsCategory, NewsMeta } from "./news-types";

/**
 * News metadata accessors — pure data, no React imports, safe in
 * sitemaps, feeds and any server module. The post bodies live in
 * `news-content.ts`, which only the post route imports.
 *
 * Adding a news item: drop the MDX file in content/news/ (with its
 * `export const meta` block), add one import line to
 * src/lib/news-content.ts, and run `npm run prebuild` to regenerate
 * this module's data (prebuild runs automatically before every build).
 */

/** Every post, newest first. */
export function getNews(): NewsMeta[] {
  return [...newsMeta].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** One post's meta, or null. */
export function getNewsMeta(slug: string): NewsMeta | null {
  return getNews().find((n) => n.slug === slug) ?? null;
}

/** "2026-10-18" → "18 October 2026" (display register, en-GB long form). */
export function formatNewsDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** RFC 822 date for RSS. */
export function rfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}
