import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { LANGS, langPath, type Lang } from "@/lib/i18n";
import { blogPosts } from "@/lib/blog";
import { careerRoles, hasOpenVacancies } from "@/lib/careers";

type SitemapPage = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
  /** Only content with a real editorial date carries lastModified.
      Never use the deployment timestamp as a false change signal. */
  lastModified?: string;
  /** Omit a locale until its page is a complete, publishable translation. */
  languages?: readonly Lang[];
};

function careerRolePaths(): SitemapPage[] {
  if (!hasOpenVacancies) return [];

  return careerRoles.map((role) => ({
    path: `/careers/${role.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: "2026-11-13",
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /** Only editorially dated content emits lastModified. The deployment
      date would stamp every URL identically and create a false crawl
      signal, so undated evergreen pages intentionally omit it. */

  const pages: SitemapPage[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/research", priority: 0.9, changeFrequency: "monthly" },
    { path: "/practice", priority: 0.9, changeFrequency: "monthly" },
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
      languages: post.languages,
    })),
    { path: "/register", priority: 0.8, changeFrequency: "monthly" },
    { path: "/apply", priority: 0.8, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-11-13" },
    ...careerRolePaths(),
    { path: "/status", priority: 0.8, changeFrequency: "monthly" },
    /* The long-form brand register has not been translated completely
       into Afrikaans. Its /af utility route remains noindex/canonical
       to English and must not be in the published hreflang cluster. */
    { path: "/brand", priority: 0.8, changeFrequency: "yearly", languages: ["en"] },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/links", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
  ];



  /** Every actually translated URL carries the reciprocal English /
      Afrikaans cluster. English-only pages omit that cluster entirely
      rather than advertising an untranslated duplicate. */
  return pages.flatMap((page) => {
    const languages = page.languages ?? LANGS;
    const hasBothPublishedLanguages =
      languages.includes("en") && languages.includes("af");
    const englishUrl = `${site.url}${langPath("en", page.path)}`;
    const afrikaansUrl = `${site.url}${langPath("af", page.path)}`;

    return languages.map((lang) => ({
      url: `${site.url}${langPath(lang, page.path)}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(hasBothPublishedLanguages
        ? {
            alternates: {
              languages: {
                en: englishUrl,
                af: afrikaansUrl,
                "x-default": englishUrl,
              },
            },
          }
        : {}),
    }));
  });
}
