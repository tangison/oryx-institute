import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        /* The answer engines and AI crawlers, named so the intent is
         * legible: the institute wants to be read by agents, and the
         * markdown shelf at /md is theirs. */
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "CCBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
