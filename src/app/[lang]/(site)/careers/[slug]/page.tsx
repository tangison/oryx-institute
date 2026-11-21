import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { CareerApplicationForm } from "@/components/site/career-application-form";
import { PageHead } from "@/components/site/page-head";
import {
  careerNoticeLabel,
  careerRoleContributions,
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
    contributions: "What you would contribute to",
    requirements: "Requirements and selection",
    requirementsBody:
      "No role-specific minimum qualifications, licences or years of experience have been published for this campaign. Oryx will consider the job-relevant information you provide and may request relevant evidence from shortlisted candidates. Do not assume that an unannounced requirement applies.",
    employment: "Employment terms",
    employmentBody:
      "This notice is not an employment contract or an offer of appointment. Pay, contract type, working arrangements, start date and any conditions are not published here and will be confirmed in writing only with a selected candidate. Recruitment is intended to be administered subject to applicable Namibian law.",
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
      "No application, interview or placement fee is charged. Oryx will not ask candidates to pay to progress an application.",
      "Send only information relevant to your application at first. Do not include identity, bank, medical or other highly sensitive records unless Oryx specifically asks for them.",
      "If you need a reasonable interview or access arrangement, say what would help. You do not need to disclose medical information in the first email.",
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
    contributions: "Waartoe jy sal bydra",
    requirements: "Vereistes en keuring",
    requirementsBody:
      "Geen rolspesifieke minimum kwalifikasies, lisensies of jare se ervaring is vir hierdie veldtog gepubliseer nie. Oryx sal die werksrelevante inligting wat jy verskaf oorweeg en kan relevante bewyse van gekortlyste kandidate aanvra. Moenie aanvaar dat ’n onaangekondigde vereiste geld nie.",
    employment: "Diensvoorwaardes",
    employmentBody:
      "Hierdie kennisgewing is nie ’n dienskontrak of ’n aanbod van aanstelling nie. Salaris, kontraktipe, werksreëlings, begindatum en enige voorwaardes word nie hier gepubliseer nie en word slegs skriftelik met ’n gekose kandidaat bevestig. Werwing is bedoel om onderhewig aan toepaslike Namibiese reg toegepas te word.",
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
      "Geen aansoek-, onderhoud- of plasingsfooi word gehef nie. Oryx sal nie kandidate vra om te betaal om met ’n aansoek voort te gaan nie.",
      "Stuur aanvanklik slegs inligting wat vir jou aansoek relevant is. Moenie identiteits-, bank-, mediese of ander hoogs sensitiewe rekords insluit nie, tensy Oryx dit spesifiek vra.",
      "As jy ’n redelike onderhouds- of toegangsreëling benodig, sê wat sal help. Jy hoef nie mediese inligting in die eerste e-pos bekend te maak nie.",
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
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.contributions}</p>
          <div className="mt-6 ledger" data-sc-in data-sc-stagger="55">
            {careerRoleContributions(role, lang).map((contribution, index) => (
              <div className="ledger-row ledger-row--flat" key={contribution}>
                <span className="offer-tag">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 max-w-[75ch] text-[1.05rem] leading-relaxed text-soft">{contribution}</p>
              </div>
            ))}
          </div>
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
