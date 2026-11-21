import type { Metadata } from "next";
import Image from "next/image";
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
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
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
      "This position is part of the consolidated campaign notice and covers the published scope below.",
    overview: "About this role",
    scope: "Programme scope covered by this role",
    scopeBody:
      "Apply once for this Lead Instructor role. The items below belong to its full programme scope and are not separate vacancies.",
    applicationDetails: "Application details",
    applicationDetailsBody:
      "Attach your CV to your application email. Oryx does not charge a recruitment fee. No role-specific qualifications, experience thresholds or selection criteria are published in this notice.",
    apply: "Apply by email",
    applyBody: (email: string) =>
      `Complete the short form below to prepare an email to ${email}. The website does not submit or retain the form. Review the draft, attach your CV and send it from your own email client before the closing time.`,
    sourceTitle: "One Lead Instructor role",
    sourceBody:
      "This role covers the related levels, strands and short courses as one programme scope. The list is for planned work and does not create separate posts or a current enrolment route.",
    individualSourceTitle: "One position notice",
    individualSourceBody:
      "This notice covers one position in Oryx’s centre-establishment recruitment.",
    statusNote:
      "Oryx is in prelaunch and is working toward NTA training-provider registration. It is not registered or accredited and does not offer accredited qualifications or NQF credits.",
    process: "Applying by email",
    processPoints: [
      "Use the email addressed to vacancies@oryxinstitute.org and include the role title in the subject line.",
      "Review the email draft, attach your CV and send it from your own email client before the published closing time.",
      "Share only information you choose to include. Keep identity, bank, medical and other highly sensitive records out of a first email unless Oryx specifically asks for them.",
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
      "Hierdie pos vorm deel van die gekonsolideerde veldtogkennisgewing en dek die gepubliseerde omvang hieronder.",
    overview: "Oor hierdie rol",
    scope: "Programomvang wat deur hierdie rol gedek word",
    scopeBody:
      "Doen een keer vir hierdie Lead Instructor-rol aansoek. Die items hieronder behoort aan die volle programomvang en is nie afsonderlike vakatures nie.",
    applicationDetails: "Aansoekbesonderhede",
    applicationDetailsBody:
      "Heg jou CV aan jou aansoek-e-pos. Oryx vra geen werwingsfooi nie. Geen rolspesifieke kwalifikasies, ervaringsdrempels of keuringskriteria word in hierdie kennisgewing gepubliseer nie.",
    apply: "Doen per e-pos aansoek",
    applyBody: (email: string) =>
      `Voltooi die kort vorm hieronder om ’n e-pos aan ${email} op te stel. Die webwerf stuur of behou nie die vorm nie. Gaan die konsep na, heg jou CV aan en stuur dit uit jou eie e-posprogram voor die sluitingstyd.`,
    sourceTitle: "Een Lead Instructor-rol",
    sourceBody:
      "Hierdie rol dek die verwante vlakke, rigtings en kortkursusse as een programomvang. Die lys is vir beplande werk en skep nie afsonderlike poste of ’n huidige inskrywingsroete nie.",
    individualSourceTitle: "Een poskennisgewing",
    individualSourceBody:
      "Hierdie kennisgewing dek een pos in Oryx se sentrumvestigingswerwing.",
    statusNote:
      "Oryx is in voorbekendstelling en werk aan NTA-opleidingsverskafferregistrasie. Dit is nie geregistreer of geakkrediteer nie en bied nie geakkrediteerde kwalifikasies of NQF-krediete aan nie.",
    process: "Aansoek per e-pos",
    processPoints: [
      "Gebruik die e-pos wat aan vacancies@oryxinstitute.org gerig is en sluit die roltitel in die onderwerplyn in.",
      "Gaan die e-poskonsep na, heg jou CV aan en stuur dit uit jou eie e-posprogram voor die gepubliseerde sluitingstyd.",
      "Deel slegs inligting wat jy kies om in te sluit. Hou identiteits-, bank-, mediese en ander hoogs sensitiewe rekords uit ’n eerste e-pos, tensy Oryx dit spesifiek vra.",
    ],
    privacy: "Privaatheidskennisgewing",
    back: "Alle vakatures",
  },
} as const;

/* Role-detail headings keep the full published scope. Search titles use
   concise, distinct role labels so a planned programme list cannot turn
   into a misleading course-offer snippet. */
const metaRoleLabels: Record<"en" | "af", Record<string, string>> = {
  en: {
    "centre-manager": "Centre manager vacancy",
    "independent-moderator": "Independent moderator vacancy",
    "learner-records-administrator": "Learner records administrator vacancy",
    "occupational-health-and-safety": "Occupational health and safety instructor",
    "business-services-and-administration": "Business services instructor",
    "hospitality-tourism-and-local-guiding": "Hospitality and tourism instructor",
    "cosmetology-hairdressing": "Hairdressing instructor",
    "wholesale-retail-and-merchandising": "Retail and merchandising instructor",
    entrepreneurship: "Entrepreneurship instructor",
  },
  af: {
    "centre-manager": "Sentrumbestuurder-vakature",
    "independent-moderator": "Onafhanklike moderator-vakature",
    "learner-records-administrator": "Leerderrekordadministrateur-vakature",
    "occupational-health-and-safety": "Instrukteur: beroepsgesondheid en veiligheid",
    "business-services-and-administration": "Instrukteur: besigheidsdienste",
    "hospitality-tourism-and-local-guiding": "Instrukteur: gasvryheid en toerisme",
    "cosmetology-hairdressing": "Haarkappery-instrukteur",
    "wholesale-retail-and-merchandising": "Instrukteur: kleinhandel en handelsware",
    entrepreneurship: "Entrepreneurskap-instrukteur",
  },
};

function careerMetadataDescription(label: string, lang: "en" | "af"): string {
  const deadline = formatRecruitmentDeadline(lang);
  return lang === "af"
    ? `Oryx Instituut-vakature: ${label.toLowerCase()} in Ongwediva. Doen aansoek teen ${deadline}.`
    : `Oryx Institute vacancy: ${label.toLowerCase()} in Ongwediva. Apply by ${deadline}.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: requestedLang, slug } = await params;
  const lang = langFromParams({ lang: requestedLang });
  const role = getCareerRole(slug);
  if (!role) return {};

  const title = metaRoleLabels[lang][role.slug] ?? careerRoleName(role);
  const description = careerMetadataDescription(title, lang);

  return pageMetadata({
    lang,
    path: `/careers/${role.slug}`,
    title,
    description,
    socialTitle: title,
    socialDescription: description,
    image: { url: "/brand/og/default.png", width: 1200, height: 630, alt: title },
  });
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
  const roleImageAlt = af
    ? `Redaksionele stillewe vir die ${roleName}-vakature`
    : `Editorial still life for the ${roleName} vacancy`;

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

      <figure className="career-role-hero" data-sc-act="scrub">
        <Image
          src={`/images/careers/${role.slug}.jpg`}
          alt={roleImageAlt}
          width={1408}
          height={768}
          priority
          sizes="100vw"
        />
      </figure>

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
            <p className="mt-5 text-sm leading-relaxed text-soft">{t.statusNote}</p>
          </aside>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="panel max-w-[68ch] p-8 md:p-10" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.applicationDetails}</p>
            <p className="mt-5 leading-relaxed text-soft">{t.applicationDetailsBody}</p>
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
