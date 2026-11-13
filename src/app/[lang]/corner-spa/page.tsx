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
  af: {
    /* An absolute title below preserves the Afrikaans brand form. */
    title: "Corner Spa, die eerste onderneming | Oryx Instituut",
    description:
      "Corner Spa, die eerste projek van Oryx Instituut. Massering, warmklipbehandelings, naels en waks in Windhoek. Bespreek op WhatsApp.",
    ogTitle: "Corner Spa | Oryx Instituut",
    h1: "Corner Spa, die eerste projek van Oryx Instituut",
    enLedger: { paras: [] as string[] },
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
    /* af prints absolute: its title already carries the locale brand. */
    title: lang === "af" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: alternates(lang, "/corner-spa", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `${site.url}${lang === "af" ? "/af" : ""}/corner-spa`,
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
