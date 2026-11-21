import type { Metadata } from "next";
import { alternates, langPath, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export type SocialImage = {
  /** Public path or absolute URL. */
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadataInput = {
  lang: Lang;
  path: string;
  /** Final, complete browser title. This helper deliberately uses an
   * absolute title so layout templates cannot duplicate the brand. */
  title: string;
  description: string;
  image: SocialImage;
  socialTitle?: string;
  socialDescription?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Utility and duplicate representations remain crawlable through
   * their links but must not enter the search index. */
  index?: boolean;
  /** Supply this only when a page canonically represents another path. */
  canonicalPath?: string;
  /** A noindex translation may canonicalize to its published English source. */
  canonicalLang?: Lang;
  /** No alternate-language cluster for a duplicate/noindex surface. */
  includeLanguageAlternates?: boolean;
};

export function publicUrl(lang: Lang, path: string): string {
  return `${site.url}${langPath(lang, path)}`;
}

function absoluteImage(image: SocialImage): SocialImage {
  return {
    ...image,
    url: image.url.startsWith("http") ? image.url : `${site.url}${image.url}`,
  };
}

/**
 * Standard metadata for every public page. Individual route modules own
 * their copy; this function owns the technical contract so canonicals,
 * robots, Open Graph and Twitter cannot drift apart.
 */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const index = input.index ?? true;
  const canonicalPath = input.canonicalPath ?? input.path;
  const canonicalLang = input.canonicalLang ?? input.lang;
  const canonical = publicUrl(canonicalLang, canonicalPath);
  const image = absoluteImage(input.image);
  const brand = input.lang === "af" ? "Oryx Instituut" : site.tradingName;
  const fullTitle = input.title.includes(brand) ? input.title : `${input.title} | ${brand}`;
  const socialTitle = input.socialTitle ?? fullTitle;
  const socialDescription = input.socialDescription ?? input.description;
  const locale = input.lang === "af" ? "af_NA" : "en_NA";
  const alternateLocale = input.lang === "af" ? "en_NA" : "af_NA";

  return {
    title: { absolute: fullTitle },
    description: input.description,
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true },
    alternates: input.includeLanguageAlternates === false
      ? { canonical }
      : alternates(input.lang, canonicalPath, site.url),
    openGraph: {
      type: input.type ?? "website",
      siteName: input.lang === "af" ? "Oryx Instituut" : site.tradingName,
      locale,
      alternateLocale,
      title: socialTitle,
      description: socialDescription,
      url: canonical,
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}

export const defaultSocialImage: SocialImage = {
  url: "/brand/og/default.png",
  width: 1200,
  height: 630,
  alt: "Oryx Institute, a new polytechnic for Namibia",
};
