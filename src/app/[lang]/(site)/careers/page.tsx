import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { RouteArrowIcon } from "@/components/site/glyphs";
import {
  careerGroupLabel,
  careerRoleName,
  careerRoleSummary,
  careerRoles,
  formatRecruitmentDeadline,
  recruitment,
  type CareerRoleGroup,
} from "@/lib/careers";
import { alternates, langFromParams } from "@/lib/i18n";
import { schemaIds, site } from "@/lib/site";

const groupOrder: readonly CareerRoleGroup[] = [
  "operations",
  "quality",
  "records",
  "instruction",
];

const copy = {
  en: {
    meta: {
      title: "Careers",
      description:
        "Current Oryx Institute vacancies in Ongwediva. Read each role, closing time and the email-first application process.",
      ogTitle: "Careers | Oryx Institute",
      ogDescription: "Current Oryx Institute vacancies in Ongwediva, with a clear email-first application route.",
    },
    head: {
      eyebrow: "Current vacancies",
      title: "Work that starts with care.",
      lede:
        "Oryx is recruiting for centre establishment, quality, records and planned instructional work in Ongwediva. Choose a role to read its scope and prepare an application email.",
    },
    closing: "Applications close",
    location: "Advertised location",
    email: "Application email",
    current: "Live recruitment notice",
    currentBody:
      "These vacancies are open now. Apply before the published closing time through the role-specific email composer or by writing directly to the recruitment mailbox.",
    statusTitle: "Read the vacancy correctly.",
    statusBody:
      "Oryx is working toward NTA training-provider registration. It is not registered or accredited, and it does not offer accredited qualifications, NQF credits or a public campus. The Lead Instructor specialisms state intended work scope only; they do not announce courses or enrolment.",
    statusAction: "Read institutional status",
    roles: "Open positions",
    roleCount: (count: number) => `${count} roles, each with its own application page.`,
    viewRole: "Read role and apply",
    sourceIndividual: "Individual position notice",
    sourceConsolidated: "Consolidated campaign notice",
    fairness: "A fair, email-first process",
    fairnessPoints: [
      "Initial review is based on job-relevant information and the operational needs of the role.",
      "No application, interview or placement fee is charged. Do not pay anyone who claims to act for Oryx recruitment.",
      "The public notice does not set pay, contract type, hours, start date or a guarantee of appointment. Any offer is confirmed in writing.",
      "You may request a reasonable interview or access arrangement. State the arrangement that would help; do not send medical information in your first email.",
    ],
    requirements: "Requirements and evidence",
    requirementsBody:
      "Role-specific minimum qualifications, licences and years of experience have not been published for this campaign. Do not assume an unannounced requirement. Send a CV and a short account of your relevant experience; Oryx may request role-relevant evidence from shortlisted candidates.",
    privacy: "Applicant information",
    privacyBody:
      "The website does not receive or store the form. It opens a draft in your own email client, and nothing is sent until you send it. Keep the first application proportionate: do not include identity, bank, medical or other highly sensitive records unless Oryx specifically asks for them.",
    privacyAction: "Read the privacy notice",
    contact: "Need help with access or the process?",
    contactBody: "Write to the recruitment mailbox and name the role. Do not send applications through social-media messages.",
  },
  af: {
    meta: {
      title: "Loopbane",
      description:
        "Huidige Oryx Instituut-vakatures in Ongwediva. Lees elke rol, sluitingstyd en die e-pos-eerste aansoekproses.",
      ogTitle: "Loopbane | Oryx Instituut",
      ogDescription: "Huidige Oryx Instituut-vakatures in Ongwediva, met ’n duidelike e-pos-eerste aansoekroete.",
    },
    head: {
      eyebrow: "Huidige vakatures",
      title: "Werk wat met sorg begin.",
      lede:
        "Oryx werf vir sentrumvestiging, gehalte, rekords en beplande onderrigwerk in Ongwediva. Kies ’n rol om die omvang te lees en ’n aansoek-e-pos op te stel.",
    },
    closing: "Aansoeke sluit",
    location: "Geadverteerde ligging",
    email: "Aansoek-e-pos",
    current: "Lewende werwingskennisgewing",
    currentBody:
      "Hierdie vakatures is nou oop. Doen voor die gepubliseerde sluitingstyd aansoek deur die rolspesifieke e-possamesteller of skryf direk aan die werwingsposbus.",
    statusTitle: "Lees die vakature korrek.",
    statusBody:
      "Oryx werk aan NTA-opleidingsverskafferregistrasie. Dit is nie geregistreer of geakkrediteer nie en bied nie geakkrediteerde kwalifikasies, NQF-krediete of ’n openbare kampus aan nie. Die Lead Instructor-spesialisasies stel slegs die beoogde werksomvang; dit kondig nie kursusse of inskrywing aan nie.",
    statusAction: "Lees institusionele status",
    roles: "Oop poste",
    roleCount: (count: number) => `${count} rolle, elk met ’n eie aansoekblad.`,
    viewRole: "Lees rol en doen aansoek",
    sourceIndividual: "Individuele poskennisgewing",
    sourceConsolidated: "Gekonsolideerde veldtogkennisgewing",
    fairness: "’n Billike, e-pos-eerste proses",
    fairnessPoints: [
      "Aanvanklike oorweging is op werksrelevante inligting en die bedryfsbehoeftes van die rol gegrond.",
      "Geen aansoek-, onderhoud- of plasingsfooi word gehef nie. Moenie iemand betaal wat beweer hulle tree vir Oryx-werwing op nie.",
      "Die openbare kennisgewing bepaal nie salaris, kontraktipe, ure, begindatum of ’n waarborg van aanstelling nie. Enige aanbod word skriftelik bevestig.",
      "Jy kan ’n redelike onderhouds- of toegangsreëling versoek. Noem die reëling wat sal help; moenie mediese inligting in jou eerste e-pos stuur nie.",
    ],
    requirements: "Vereistes en bewyse",
    requirementsBody:
      "Rolspesifieke minimum kwalifikasies, lisensies en jare se ervaring is nie vir hierdie veldtog gepubliseer nie. Moenie ’n onaangekondigde vereiste veronderstel nie. Stuur ’n CV en ’n kort uiteensetting van jou relevante ervaring; Oryx kan rolrelevante bewyse van gekortlyste kandidate aanvra.",
    privacy: "Aansoekerinligting",
    privacyBody:
      "Die webwerf ontvang of stoor nie die vorm nie. Dit maak ’n konsep in jou eie e-posprogram oop en niks word gestuur voordat jy dit self stuur nie. Hou die eerste aansoek gepas: moenie identiteits-, bank-, mediese of ander hoogs sensitiewe rekords insluit nie, tensy Oryx dit spesifiek vra.",
    privacyAction: "Lees die privaatheidskennisgewing",
    contact: "Benodig jy hulp met toegang of die proses?",
    contactBody: "Skryf aan die werwingsposbus en noem die rol. Moenie aansoeke deur sosialemedia-boodskappe stuur nie.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang].meta;
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/careers", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/careers`,
      images: [{ url: "/brand/og/default.png", width: 1200, height: 630, alt: m.ogTitle }],
    },
  };
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
  const deadline = formatRecruitmentDeadline(lang);
  const groups = groupOrder.map((group) => ({
    group,
    roles: careerRoles.filter((role) => role.group === group),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/careers")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: { "@type": "Organization", "@id": schemaIds.org, name: site.tradingName },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: careerRoles.length,
      itemListElement: careerRoles.map((role, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: careerRoleName(role),
        url: `${site.url}${A(`/careers/${role.slug}`)}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-px border border-rule bg-rule lg:grid-cols-3" data-sc-in>
          <div className="bg-ink p-7 text-ivory md:p-9">
            <p className="eyebrow eyebrow--ivory">{t.closing}</p>
            <p className="mt-4 text-[clamp(1.3rem,2.5vw,1.8rem)] font-[600] leading-[1.15]">{deadline}</p>
          </div>
          <div className="bg-ivory p-7 md:p-9">
            <p className="eyebrow eyebrow--ink">{t.location}</p>
            <p className="mt-4 text-[1.1rem] font-[600] text-ink">{recruitment.location}</p>
          </div>
          <div className="bg-ivory p-7 md:p-9">
            <p className="eyebrow eyebrow--ink">{t.email}</p>
            <a className="link-type mt-4 inline-block break-all text-[1.1rem] font-[600] text-ink" href={`mailto:${recruitment.email}`}>
              {recruitment.email}
            </a>
          </div>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,.8fr)]">
          <div className="panel p-8 md:p-12" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.current}</p>
            <p className="mt-5 max-w-[53ch] text-[1.08rem] leading-relaxed text-soft">{t.currentBody}</p>
          </div>
          <aside className="bg-ink p-8 text-ivory md:p-10" data-sc-in>
            <p className="eyebrow eyebrow--ivory">{t.statusTitle}</p>
            <p className="mt-5 leading-relaxed text-[var(--ivory-80)]">{t.statusBody}</p>
            <Link href={A("/status")} className="btn--quiet btn--quiet--ivory mt-7">
              {t.statusAction} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.roles}</p>
          <h2 className="h-section mt-4 max-w-[18ch]">{t.roleCount(careerRoles.length)}</h2>
          <div className="mt-10 grid gap-12">
            {groups.map(({ group, roles }) => (
              <div key={group} data-sc-in>
                <p className="eyebrow eyebrow--ink">{careerGroupLabel(group, lang)}</p>
                <div className="mt-4 border-y border-rule">
                  {roles.map((role) => (
                    <Link
                      key={role.slug}
                      href={A(`/careers/${role.slug}`)}
                      className="group grid gap-5 border-b border-rule py-6 last:border-b-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8 md:py-7"
                    >
                      <div>
                        <p className="text-[clamp(1.2rem,2.3vw,1.7rem)] font-[600] tracking-[-0.025em] text-ink">{careerRoleName(role)}</p>
                        <p className="mt-3 max-w-[65ch] leading-relaxed text-soft">{careerRoleSummary(role, lang)}</p>
                        <p className="mt-4 text-[0.72rem] font-[600] uppercase tracking-[0.12em] text-maroon">
                          {role.source === "individual-notice" ? t.sourceIndividual : t.sourceConsolidated}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-3 text-[0.76rem] font-[600] uppercase tracking-[0.12em] text-ink">
                        {t.viewRole} <RouteArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.fairness}</p>
            <ul className="mt-6 space-y-4 border-y border-rule py-6 leading-relaxed text-soft">
              {t.fairnessPoints.map((point) => <li key={point} className="flex gap-4"><span className="mt-[0.64rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon" aria-hidden="true" />{point}</li>)}
            </ul>
          </div>
          <div className="grid content-start gap-8" data-sc-in>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.requirements}</p>
              <p className="mt-4 leading-relaxed text-soft">{t.requirementsBody}</p>
            </div>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.privacy}</p>
              <p className="mt-4 leading-relaxed text-soft">{t.privacyBody}</p>
              <Link href={A("/legal/privacy")} className="btn--quiet mt-6">{t.privacyAction} <span className="arr" aria-hidden="true">→</span></Link>
            </div>
            <div className="hair-t pt-8">
              <p className="eyebrow eyebrow--ink">{t.contact}</p>
              <p className="mt-4 leading-relaxed text-soft">{t.contactBody}</p>
              <a href={`mailto:${recruitment.email}`} className="btn--quiet mt-6">{recruitment.email} <span className="arr" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
