import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  /** Coming soon: the domain is one URL until the rebuilt site
      returns. No lastModified is emitted: the build date would stamp
      the URL identically on every deploy, which reads as a false
      signal to crawlers. */
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
