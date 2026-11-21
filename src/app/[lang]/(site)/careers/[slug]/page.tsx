import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { CareerApplicationForm } from "@/components/site/career-application-form";
import { PageHead } from "@/components/site/page-head";
import {
  careerNoticeLabel,
  careerRoleName,
  careerRoleOverview,
  careerRoleScope,
  careerRoleSummary,
  careerRoles,
  formatRecruitmentDeadline,
  getCareerRole,
  getCareerRoleRedirect,
  recruitment,
} from "@/lib/careers";
import { alternates, langFromParams } from "@/lib/i18n";
import { schemaIds, site } from "@/lib/site";

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }));
}

const copy = {
  en: {
    meta: {
      suffix: "Vacancy",
    },
    openRole: "Open role",
    advertisedLocation: "Advertised location",
    closing: "Applications close",
    campaignSource: "Notice type",
    consolidatedNote:
      "This position is named on the consolidated campaign notice. Its scope remains limited to that approved notice.",
    overview: "Role overview",
    scope: "Scope covered by this one role",
    scopeBody:
      "Apply once for this programme position. The entries below are a connected work scope, not separate vacancies.",
    requirements: "Published information",
    requirementsBody:
      "This notice does not publish role-specific minimum qualifications, licences, years of experience or selection criteria. Do not assume that an unannounced requirement applies. Attach your CV to your application email.",
    employment: "Employment terms",
    employmentBody:
      "This notice is not an employment contract or an offer of appointment. Pay, contract type, working arrangements, start date and any conditions are not published here and will be confirmed in writing only with a selected candidate.",
    apply: "Apply by email",
    applyBody: (email: string) =>
      `Complete the short form below to prepare an email to ${email}. The website does not submit or retain the form. Review the draft, attach your CV and send it from your own email client before the closing time.`,
    sourceTitle: "One programme position, one application",
    sourceBody:
      "Related level, strand and short-course source notices are gathered under one accountable Lead Instructor role. They describe an intended work scope, not separate vacancies or a claim that Oryx currently offers a course, accredited qualification, NQF credit, enrolment or a public campus.",
    individualSourceTitle: "About this position notice",
    individualSourceBody:
      "This is one individual position notice. It describes intended work and does not state that Oryx currently offers a course, accredited qualification, NQF credit, enrolment or a public campus.",
    process: "A clear process",
    processPoints: [
      "Use the email addressed to vacancies@oryxinstitute.org. Do not send applications through social-media messages.",
      "Review the email draft, attach your CV and send it from your own email client before the published closing time.",
      "Send only information you choose to include. Do not include identity, bank, medical or other highly sensitive records in a first email unless Oryx specifically asks for them.",
    ],
    privacy: "Privacy notice",
    back: "All vacancies",
  },
  af: {
    meta: {
      suffix: "Vakature",
    },
    openRole: "Oop rol",
    advertisedLocation: "Geadverteerde ligging",
    closing: "Aansoeke sluit",
    campaignSource: "Kennisgewingtipe",
    consolidatedNote:
      "Hierdie pos word op die gekonsolideerde veldtogkennisgewing genoem. Die omvang bly by daardie goedgekeurde kennisgewing beperk.",
    overview: "Roloorsig",
    scope: "Omvang wat deur hierdie een rol gedek word",
    scopeBody:
      "Doen een keer vir hierdie programpos aansoek. Die inskrywings hieronder is ’n gekoppelde werksomvang, nie afsonderlike vakatures nie.",
    requirements: "Gepubliseerde inligting",
    requirementsBody:
      "Hierdie kennisgewing publiseer nie rolspesifieke minimum kwalifikasies, lisensies, jare se ervaring of keuringskriteria nie. Moenie aanvaar dat ’n onaangekondigde vereiste geld nie. Heg jou CV aan jou aansoek-e-pos.",
    employment: "Diensvoorwaardes",
    employmentBody:
      "Hierdie kennisgewing is nie ’n dienskontrak of ’n aanbod van aanstelling nie. Salaris, kontraktipe, werksreëlings, begindatum en enige voorwaardes word nie hier gepubliseer nie en word slegs skriftelik met ’n gekose kandidaat bevestig.",
    apply: "Doen per e-pos aansoek",
    applyBody: (email: string) =>
      `Voltooi die kort vorm hieronder om ’n e-pos aan ${email} op te stel. Die webwerf stuur of behou nie die vorm nie. Gaan die konsep na, heg jou CV aan en stuur dit uit jou eie e-posprogram voor die sluitingstyd.`,
    sourceTitle: "Een programpos, een aansoek",
    sourceBody:
      "Verwante vlak-, rigting- en kortkursusbronkennisgewings word onder een verantwoordelike Lead Instructor-rol saamgevoeg. Dit beskryf ’n beoogde werksomvang, nie afsonderlike vakatures of ’n aanspraak dat Oryx tans ’n kursus, geakkrediteerde kwalifikasie, NQF-krediet, inskrywing of openbare kampus aanbied nie.",
    individualSourceTitle: "Oor hierdie poskennisgewing",
    individualSourceBody:
      "Dit is een individuele poskennisgewing. Dit beskryf beoogde werk en stel nie dat Oryx tans ’n kursus, geakkrediteerde kwalifikasie, NQF-krediet, inskrywing of openbare kampus aanbied nie.",
    process: "’n Duidelike proses",
    processPoints: [
      "Gebruik die e-pos wat aan vacancies@oryxinstitute.org gerig is. Moenie aansoeke deur sosialemedia-boodskappe stuur nie.",
      "Gaan die e-poskonsep na, heg jou CV aan en stuur dit uit jou eie e-posprogram voor die gepubliseerde sluitingstyd.",
      "Stuur slegs inligting wat jy kies om in te sluit. Moenie identiteits-, bank-, mediese of ander hoogs sensitiewe rekords in ’n eerste e-pos insluit nie, tensy Oryx dit spesifiek vra.",
    ],
    privacy: "Privaatheidskennisgewing",
    back: "Alle vakatures",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: requestedLang, slug } = await params;
  const lang = langFromParams({ lang: requestedLang });
  const role = getCareerRole(slug);
  if (!role) return {};

  const roleName = careerRoleName(role);
  const title = `${roleName} | ${copy[lang].meta.suffix}`;
  const description = `${careerRoleSummary(role, lang)} Apply to Oryx Institute by ${formatRecruitmentDeadline(lang)}.`;

  return {
    title,
    description,
    alternates: alternates(lang, `/careers/${role.slug}`, site.url),
    openGraph: {
      title: `${title} | ${lang === "af" ? "Oryx Instituut" : "Oryx Institute"}`,
      description,
      url: `${site.url}${lang === "af" ? "/af" : ""}/careers/${role.slug}`,
      images: [{ url: "/brand/og/default.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function CareerRolePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: requestedLang, slug } = await params;
  const lang = langFromParams({ lang: requestedLang });
  const af = lang === "af";
  const role = getCareerRole(slug);
  if (!role) {
    const target = getCareerRoleRedirect(slug);
    if (target) permanentRedirect(`${af ? "/af" : ""}/careers/${target}`);
    notFound();
  }

  const t = copy[lang];
  const A = (path: string) => (af ? `/af${path}` : path);
  const roleName = careerRoleName(role);
  const deadline = formatRecruitmentDeadline(lang);
  const source = careerNoticeLabel(role.noticeType, lang);
  const scope = careerRoleScope(role);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${roleName} | ${t.meta.suffix}`,
    url: `${site.url}${A(`/careers/${role.slug}`)}`,
    description: careerRoleSummary(role, lang),
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: { "@type": "Organization", "@id": schemaIds.org, name: site.tradingName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHead eyebrow={`${t.openRole} · ${recruitment.location}`} title={roleName}>
        <p>{careerRoleSummary(role, lang)}</p>
      </PageHead>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-px border border-rule bg-rule md:grid-cols-3" data-sc-in>
          <div className="bg-ivory p-7 md:p-9">
            <p className="eyebrow eyebrow--ink">{t.advertisedLocation}</p>
            <p className="mt-4 text-[1.1rem] font-[600] text-ink">{recruitment.location}</p>
          </div>
          <div className="bg-ink p-7 text-ivory md:p-9">
            <p className="eyebrow eyebrow--ivory">{t.closing}</p>
            <p className="mt-4 text-[1.1rem] font-[600] leading-snug">{deadline}</p>
          </div>
          <div className="bg-ivory p-7 md:p-9">
            <p className="eyebrow eyebrow--ink">{t.campaignSource}</p>
            <p className="mt-4 text-[1.1rem] font-[600] text-ink">{source}</p>
          </div>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.75fr)]">
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.overview}</p>
            <p className="mt-5 max-w-[64ch] text-[1.08rem] leading-relaxed text-soft">{careerRoleOverview(role, lang)}</p>
            {scope.length > 0 && (
              <div className="mt-8 max-w-[64ch] border-y border-rule py-6">
                <p className="eyebrow eyebrow--ink">{t.scope}</p>
                <p className="mt-3 leading-relaxed text-soft">{t.scopeBody}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {scope.map((item) => <li key={item} className="border-l-2 border-maroon pl-4 text-sm leading-relaxed text-soft">{item}</li>)}
                </ul>
              </div>
            )}
            {role.noticeType === "consolidated-campaign-notice" && <p className="mt-5 max-w-[64ch] border-l-2 border-maroon pl-5 leading-relaxed text-soft">{t.consolidatedNote}</p>}
          </div>
          <aside className="border-y border-rule py-7" data-sc-in>
            <p className="eyebrow eyebrow--ink">{role.kind === "lead-instructor" ? t.sourceTitle : t.individualSourceTitle}</p>
            <p className="mt-4 leading-relaxed text-soft">{role.kind === "lead-instructor" ? t.sourceBody : t.individualSourceBody}</p>
          </aside>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-8 lg:grid-cols-2">
          <div className="panel p-8 md:p-10" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.requirements}</p>
            <p className="mt-5 leading-relaxed text-soft">{t.requirementsBody}</p>
          </div>
          <div className="bg-ink p-8 text-ivory md:p-10" data-sc-in>
            <p className="eyebrow eyebrow--ivory">{t.employment}</p>
            <p className="mt-5 leading-relaxed text-[var(--ivory-80)]">{t.employmentBody}</p>
          </div>
        </div>
      </section>

      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,.7fr)] lg:items-start">
          <div className="panel p-6 sm:p-10" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.apply}</p>
            <h2 className="h-sub mt-4">{roleName}</h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-soft">{t.applyBody(recruitment.email)}</p>
            <div className="mt-8">
              <CareerApplicationForm
                lang={lang}
                roleName={roleName}
                email={recruitment.email}
                deadline={deadline}
              />
            </div>
          </div>

          <aside data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.process}</p>
            <ul className="mt-6 space-y-5 border-y border-rule py-6 leading-relaxed text-soft">
              {t.processPoints.map((point) => <li key={point} className="flex gap-4"><span className="mt-[0.64rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon" aria-hidden="true" />{point}</li>)}
            </ul>
            <Link href={A("/legal/privacy")} className="btn--quiet mt-7">{t.privacy} <span className="arr" aria-hidden="true">→</span></Link>
            <br />
            <Link href={A("/careers")} className="btn--quiet mt-5">{t.back} <span className="arr" aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>
    </>
  );
}
