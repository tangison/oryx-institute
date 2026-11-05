import type { Metadata } from "next";
import { CornerSpaEmbed } from "@/components/site/corner-spa-embed";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * Corner Spa, full bleed. The chrome lives one level down in the
 * (site) group on purpose: this route renders inside the bare [lang]
 * layout, so the spa's own site fills the screen with no header, no
 * footer and no back-to-top widget. The visit reads as one continuous
 * site, and one press of Back returns to the previous Oryx page.
 */

const copy = {
  en: {
    title: "Corner Spa",
    description:
      "Corner Spa, the first project of Oryx Institute. Massage, hot stone treatments, nails and waxing in Windhoek. Book on WhatsApp.",
    ogTitle: "Corner Spa | Oryx Institute",
    h1: "Corner Spa, the first project of Oryx Institute",
  },
  zh: {
    title: "Corner Spa",
    description:
      "Corner Spa 是 Oryx Institute 的第一个项目。按摩、热石、美甲与脱毛，位于温得和克，通过 WhatsApp 预约。",
    ogTitle: "Corner Spa | Oryx Institute",
    h1: "Corner Spa：Oryx Institute 的第一个项目",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/corner-spa", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/corner-spa`,
      images: [
        {
          url: "/brand/og/corner-spa.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.description,
      images: ["/brand/og/corner-spa.png"],
    },
  };
}

export default async function CornerSpaEmbedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  return (
    <>
      <h1 className="sr-only">{copy[lang].h1}</h1>
      <CornerSpaEmbed lang={lang} />
    </>
  );
}
