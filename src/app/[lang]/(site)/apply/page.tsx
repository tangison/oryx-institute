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
  zh: {
    meta: {
      title: "申请",
      description:
        "申请工商管理与信息技术的速成课和短期课程，或预约实务：经营者案头的一对一经营咨询、市场调研与快速响应培训。申请方式只有一种：给温得和克的院长办公室写一封邮件，写明姓名、回复方式与你感兴趣的领域。没有门户，也不排队；院长办公室亲自阅读每一封邮件，通常在一周之内回复。",
      ogTitle: "申请 | Oryx 理工学院",
      ogDescription: "给温得和克院长办公室的一封邮件，你的申请就开始了。",
    },
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
      url: `${site.url}${lang === "zh" ? "/zh" : ""}/apply`,
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
