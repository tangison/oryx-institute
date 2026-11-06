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
    /* The title renders through the root template: "Corner Spa, the
       first venture | Oryx Institute". Kept in the 30-60 band. */
    title: "Corner Spa, the first venture",
    description:
      "Corner Spa, the first project of Oryx Institute. Massage, hot stone treatments, nails and waxing in Windhoek. Book on WhatsApp.",
    ogTitle: "Corner Spa | Oryx Institute",
    h1: "Corner Spa, the first project of Oryx Institute",
  },
  zh: {
    /* The zh title prints absolute (see generateMetadata): it carries
       the locale brand itself, so the template would print "Oryx
       Institute" a second time, and the two locales must not share
       one title string. */
    title: "Corner Spa，第一项实业 · Oryx 理工学院 · Oryx Institute",
    description:
      "Corner Spa 是 Oryx Institute 的第一个项目，Mendozer Investments 为融资伙伴。温得和克的按摩、热石、美甲与脱毛，价目清晰，通过 WhatsApp 预约；水疗自己的网站 spa.mendozer.com 直接嵌入本页，也可全屏打开。",
    ogTitle: "Corner Spa | Oryx 理工学院",
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
    /* zh prints absolute: its title already carries the locale brand. */
    title: lang === "zh" ? { absolute: m.title } : m.title,
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
    /* A main landmark: the bare [lang] layout provides no chrome, so
       this route owns its own landmark region. */
    <main>
      <h1 className="sr-only">{copy[lang].h1}</h1>
      <CornerSpaEmbed lang={lang} />
    </main>
  );
}
