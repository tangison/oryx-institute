import type { Metadata } from "next";
import { ApplyBody } from "@/components/site/apply-body";
import { site } from "@/lib/site";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Apply: Courses and the Practice",
      description:
        "Apply for crash and short courses in business administration and IT, or book the practice: the Owner's Desk, market research, Rapid Response Training.",
      ogTitle: "Apply | Oryx Institute",
      ogDescription:
        "One message to the Principal's office in Windhoek starts your application.",
    },
  },
  af: {
    meta: {
      title: "Apply: Courses and the Practice",
      description:
        "Apply for crash and short courses in business administration and IT, or book the practice: the Owner's Desk, market research, Rapid Response Training.",
      ogTitle: "Apply | Oryx Institute",
      ogDescription:
        "One message to the Principal's office in Windhoek starts your application.",
    },
    enLedger: { paras: [] as string[] },
  },
} as const;

/* The route stays statically generated. Per-offer deep links are real
   routes now: /apply/<offer> carries its own metadata at build time
   (see ../[offer]/page.tsx), so the legacy ?for= form renders the hub
   and the client-side ApplyOfferMeta still honours it. The clean URLs
   stay canonical. */
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
