import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { directoryAll } from "@/lib/directory";
import { APPLY_OFFER_SLUGS } from "@/lib/apply-offers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /** No lastModified is emitted: the build date would stamp every URL
      identically on every deploy, which reads as a false signal to
      crawlers. Pages carry their own visible dates instead. */

  const pages: {
    path: string;
    priority: number;
    changeFrequency: "monthly" | "yearly";
  }[] = [
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
    { path: "/corner-spa", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ventures/corner-spa", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog/corner-spa", priority: 0.6, changeFrequency: "yearly" },
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

  const docs = directoryAll.map((d) => ({
    path: `/resources/${d.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  /** The per-offer apply routes, one row each: real URLs with their
      own metadata, linked from every offer CTA on the site. */
  const applyOffers = APPLY_OFFER_SLUGS.map((slug) => ({
    path: `/apply/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  /** Every URL carries its Chinese alternate, and every Chinese URL
      carries the English one back: one entity per page, two languages. */
  return [...pages, ...docs, ...applyOffers].flatMap((page) => [
    {
      url: `${site.url}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${site.url}${page.path}`,
          zh: `${site.url}/zh${page.path === "/" ? "" : page.path}`,
          "x-default": `${site.url}${page.path}`,
        },
      },
    },
    {
      url: `${site.url}/zh${page.path === "/" ? "" : page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${site.url}${page.path}`,
          zh: `${site.url}/zh${page.path === "/" ? "" : page.path}`,
          "x-default": `${site.url}${page.path}`,
        },
      },
    },
  ]);
}
