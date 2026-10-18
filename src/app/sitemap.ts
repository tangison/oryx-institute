import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { directoryAll } from "@/lib/directory";
import { announcements } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  /** No lastModified is emitted: the build date would stamp every URL
      identically on every deploy, which reads as a false signal to
      crawlers. Pages carry their own visible dates instead. */

  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/programmes", priority: 0.9, changeFrequency: "monthly" },
    { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
    { path: "/schools", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.8, changeFrequency: "monthly" },
    { path: "/compare", priority: 0.7, changeFrequency: "monthly" },
    { path: "/tools", priority: 0.7, changeFrequency: "monthly" },
    { path: "/people", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/announcements", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/brand", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
  ];

  const docs = directoryAll.map((d) => ({
    path: `/resources/${d.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const news = announcements.map((a) => ({
    path: `/announcements/${a.slug}`,
    priority: 0.6,
    changeFrequency: "yearly" as const,
  }));

  return [...pages, ...docs, ...news].map((page) => ({
    url: `${site.url}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
