import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { directoryAll } from "@/lib/directory";
import { getNews } from "@/lib/news";

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
    { path: "/programmes", priority: 0.9, changeFrequency: "monthly" },
    { path: "/research", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ventures", priority: 0.9, changeFrequency: "monthly" },
    { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
    { path: "/news", priority: 0.8, changeFrequency: "monthly" },
    { path: "/brand", priority: 0.8, changeFrequency: "yearly" },
    { path: "/schools", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const docs = directoryAll.map((d) => ({
    path: `/resources/${d.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const news = (await getNews()).map((n) => ({
    path: `/announcements/${n.slug}`,
    priority: 0.6,
    changeFrequency: "yearly" as const,
  }));

  /** Every URL carries its Afrikaans alternate, and every Afrikaans URL
      carries the English one back: one entity per page, two languages. */
  return [...pages, ...docs, ...news].flatMap((page) => [
    {
      url: `${site.url}${page.path}`,
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
