import type { Metadata } from "next";
import { ApplyBody } from "@/components/site/apply-body";
import { site } from "@/lib/site";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const copy = {
  en: {
    meta: {
      title: "Enquire About Oryx Practice and Research",
      description:
        "Contact Oryx Institute about business counselling, market research or future learning. Prepare an email to the office and choose what to send.",
      ogTitle: "Enquire with Oryx Institute",
      ogDescription:
        "Contact Oryx about business counselling, market research or the current position on future learning.",
    },
  },
  af: {
    meta: {
      title: "Doen Navraag oor Oryx Praktyk en Navorsing",
      description:
        "Kontak Oryx Instituut oor besigheidsadvies, marknavorsing of toekomstige leer. Berei ’n e-pos aan die kantoor voor en kies self wat jy stuur.",
      ogTitle: "Doen navraag by Oryx Instituut",
      ogDescription:
        "Kontak Oryx oor besigheidsadvies, marknavorsing of die huidige posisie oor toekomstige leer.",
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
  return pageMetadata({
    lang,
    path: "/apply",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.ogDescription,
    image: { url: "/brand/og/apply.png", width: 1200, height: 630, alt: m.ogTitle },
  });
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  return <ApplyBody lang={lang} />;
}
