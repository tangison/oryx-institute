import type { Metadata } from "next";
import { ApplyBody } from "@/components/site/apply-body";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Enquire",
      description:
        "Write to the Oryx office about current business counselling and market research, or ask for the current position on future learning pathways.",
      ogTitle: "Enquire | Oryx Institute",
      ogDescription:
        "Write directly to the Oryx office about current work or future learning.",
    },
  },
  af: {
    meta: {
      title: "Doen navraag",
      description:
        "Skryf aan die Oryx-kantoor oor huidige besigheidsadvies en marknavorsing, of vra na die huidige posisie oor toekomstige leerpaaie.",
      ogTitle: "Doen navraag | Oryx Instituut",
      ogDescription:
        "Skryf direk aan die Oryx-kantoor oor huidige werk of toekomstige leer.",
    },
    enLedger: { paras: [] as string[] },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang].meta;
  const ogTitle = m.ogTitle;

  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/apply", site.url),
    openGraph: {
      title: ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/apply`,
      images: [
        { url: "/brand/og/apply.png", width: 1200, height: 630, alt: ogTitle },
      ],
    },
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  return <ApplyBody lang={lang} />;
}
