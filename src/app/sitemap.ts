import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { directoryAll } from "@/lib/directory";
import { blogPosts } from "@/lib/blog";
import { APPLY_OFFER_SLUGS } from "@/lib/apply-offers";

type SitemapPage = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
  /** Only content with a real editorial date carries lastModified.
      Never use the deployment timestamp as a false change signal. */
  lastModified?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /** Only editorially dated content emits lastModified. The deployment
      date would stamp every URL identically and create a false crawl
      signal, so undated evergreen pages intentionally omit it. */

  const pages: SitemapPage[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/research", priority: 0.9, changeFrequency: "monthly" },
    { path: "/practice", priority: 0.9, changeFrequency: "monthly" },
    {
      path: "/practice/safety-officer-course",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/practice/safety-officer-course/level-1-induction",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/practice/safety-officer-course/level-2-officer",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/practice/safety-officer-course/level-3-management",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/ventures", priority: 0.9, changeFrequency: "monthly" },
    /* /corner-spa is the distraction-free embedded counter, not an
       editorial page. It is noindex and intentionally omitted here;
       /ventures/corner-spa is the canonical, indexable explanation. */
    { path: "/ventures/corner-spa", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "monthly" },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
      lastModified: post.dateISO,
    })),
    { path: "/register", priority: 0.8, changeFrequency: "monthly" },
    { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.8, changeFrequency: "monthly" },
    { path: "/brand", priority: 0.8, changeFrequency: "yearly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about/staff", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const docs: SitemapPage[] = directoryAll.map((d) => ({
    path: `/resources/${d.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: d.reviewedIso,
  }));

  /** The per-offer apply routes, one row each: real URLs with their
      own metadata, linked from every offer CTA on the site. */
  const applyOffers: SitemapPage[] = APPLY_OFFER_SLUGS.map((slug) => ({
    path: `/apply/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  /** Every URL carries its Afrikaans alternate, and every Afrikaans URL
      carries the English one back: one entity per page, two languages. */
  return [...pages, ...docs, ...applyOffers].flatMap((page) => [
    {
      url: `${site.url}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${site.url}${page.path}`,
          af: `${site.url}/af${page.path === "/" ? "" : page.path}`,
          "x-default": `${site.url}${page.path}`,
        },
      },
    },
    {
      url: `${site.url}/af${page.path === "/" ? "" : page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${site.url}${page.path}`,
          af: `${site.url}/af${page.path === "/" ? "" : page.path}`,
          "x-default": `${site.url}${page.path}`,
        },
      },
    },
  ]);
}
