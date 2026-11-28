import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { schemaIds, site } from "@/lib/site";

const copy = {
  en: {
    meta: {
      title: "Careers at Oryx",
      description:
        "Recruitment updates from Oryx Institute. There are currently no open vacancies.",
      ogTitle: "Careers at Oryx | Oryx Institute",
      ogDescription:
        "Recruitment updates from Oryx Institute. There are currently no open vacancies.",
    },
    head: {
      eyebrow: "Careers at Oryx",
      title: "No vacancies are currently open.",
      lede:
        "The previous recruitment campaign is closed. Oryx will publish a new campaign here only when applications are open.",
    },
    status: "Recruitment status",
    statusValue: "Closed",
    statusBody:
      "Oryx is not accepting applications for the previous role campaign. Please do not send a CV or application to the vacancies address at this time.",
    future: "Future opportunities",
    futureBody:
      "When a role opens, this page will state the role, application route and closing date. Until then, it should not be read as a call for applications.",
    institute: "About Oryx",
    instituteBody:
      "Oryx Institute is in its prelaunch phase and is working toward Namibia Training Authority registration. It is not registered or accredited and does not offer accredited qualifications, NQF credits or a public campus.",
    instituteAction: "Read the institutional status",
    enquiries: "General enquiries",
    enquiriesBody:
      "For a non-recruitment enquiry, write to the Oryx office. The office cannot accept an application while recruitment is closed.",
    officeAction: "Contact the Oryx office",
  },
  af: {
    meta: {
      title: "Loopbane by Oryx",
      description:
        "Werwingsopdaterings van Oryx Instituut. Daar is tans geen oop vakatures nie.",
      ogTitle: "Loopbane by Oryx | Oryx Instituut",
      ogDescription:
        "Werwingsopdaterings van Oryx Instituut. Daar is tans geen oop vakatures nie.",
    },
    head: {
      eyebrow: "Loopbane by Oryx",
      title: "Geen vakatures is tans oop nie.",
      lede:
        "Die vorige werwingsveldtog is gesluit. Oryx publiseer ’n nuwe veldtog slegs hier wanneer aansoeke oop is.",
    },
    status: "Werwingstatus",
    statusValue: "Gesluit",
    statusBody:
      "Oryx aanvaar tans nie aansoeke vir die vorige rolveldtog nie. Moenie op hierdie stadium ’n CV of aansoek na die vakature-adres stuur nie.",
    future: "Toekomstige geleenthede",
    futureBody:
      "Wanneer ’n rol oopmaak, sal hierdie bladsy die rol, aansoekroete en sluitingsdatum aandui. Tot dan is dit nie ’n oproep om aansoek te doen nie.",
    institute: "Oor Oryx",
    instituteBody:
      "Oryx Instituut is in sy voorbekendstellingsfase en werk aan registrasie by die Namibia Training Authority. Dit is nie geregistreer of geakkrediteer nie en bied nie geakkrediteerde kwalifikasies, NQF-krediete of ’n openbare kampus aan nie.",
    instituteAction: "Lees die institusionele status",
    enquiries: "Algemene navrae",
    enquiriesBody:
      "Skryf aan die Oryx-kantoor vir ’n nie-werwingsnavraag. Die kantoor kan nie ’n aansoek aanvaar terwyl werwing gesluit is nie.",
    officeAction: "Kontak die Oryx-kantoor",
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
    path: "/careers",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.ogDescription,
    image: { url: "/brand/og/default.png", width: 1200, height: 630, alt: m.ogTitle },
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/careers")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: { "@type": "Organization", "@id": schemaIds.org, name: site.tradingName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-in>
          <div className="grid gap-px border border-rule bg-rule lg:grid-cols-3">
            <div className="bg-ink p-8 text-ivory md:p-10">
              <p className="eyebrow eyebrow--ivory">{t.status}</p>
              <p className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] font-[600] leading-[1.1]">{t.statusValue}</p>
              <p className="mt-5 leading-relaxed text-[var(--ivory-80)]">{t.statusBody}</p>
            </div>
            <div className="bg-ivory p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">{t.future}</p>
              <p className="mt-5 leading-relaxed text-soft">{t.futureBody}</p>
            </div>
            <div className="bg-ivory p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">{t.enquiries}</p>
              <p className="mt-5 leading-relaxed text-soft">{t.enquiriesBody}</p>
              <Link href={A("/apply")} className="btn--quiet mt-7">
                {t.officeAction} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <aside className="bg-ink p-8 text-ivory md:p-10" data-sc-in>
            <p className="eyebrow eyebrow--ivory">{t.institute}</p>
            <p className="mt-5 max-w-[68ch] leading-relaxed text-[var(--ivory-80)]">{t.instituteBody}</p>
            <Link href={A("/status")} className="btn--quiet btn--quiet--ivory mt-7">
              {t.instituteAction} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
