import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplyBody } from "@/components/site/apply-body";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";
import {
  APPLY_OFFER_SLUGS,
  applyOfferMeta,
  isApplyOfferSlug,
  type ApplyOfferSlug,
} from "@/lib/apply-offers";

/**
 * One offer of the application page, as a real URL: /apply/owners-desk,
 * /apply/safety, /apply/safety-level-2 and the rest. Every offer CTA on
 * the site points here.
 *
 * The route replaces the two earlier deep-link forms. /apply?for=<id>
 * forced a server render per query and showed up as five slow-TTFB
 * errors in the first crawl; /apply#<id> kept the route static but made
 * every variant share one title, which the second crawl read as
 * duplicate titles and descriptions across ten pages. A route per offer
 * is static, fast, and carries its own title, description and
 * canonical — and the markdown shelf mirrors each one for agents.
 */

export function generateStaticParams(): { lang: string; offer: string }[] {
  return APPLY_OFFER_SLUGS.flatMap((offer) => [
    { lang: "en", offer },
    { lang: "zh", offer },
  ]);
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; offer: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, offer } = await params;
  const lang = langFromParams({ lang: rawLang });
  if (!isApplyOfferSlug(offer)) return {};
  const m = applyOfferMeta(offer, lang);
  const path = `/apply/${offer}`;

  return {
    /* Absolute: the titles already carry the brand in the site's own
       register; the root template would print it a second time. */
    title: { absolute: m.title },
    description: m.description,
    alternates: alternates(lang, path, site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}${path}`,
      images: [
        { url: "/brand/og/apply.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

export default async function ApplyOfferPage({
  params,
}: {
  params: Promise<{ lang: string; offer: string }>;
}) {
  const { lang: rawLang, offer } = await params;
  const lang = langFromParams({ lang: rawLang });
  if (!isApplyOfferSlug(offer)) notFound();
  return <ApplyBody lang={lang} preselect={offer as ApplyOfferSlug} />;
}
