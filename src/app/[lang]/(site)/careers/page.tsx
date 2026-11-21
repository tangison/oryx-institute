import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { RouteArrowIcon } from "@/components/site/glyphs";
import {
  careerGroupLabel,
  careerRoleName,
  careerRoleTag,
  careerRoleSummary,
  careerRoles,
  formatRecruitmentDeadline,
  recruitment,
  type CareerRoleGroup,
} from "@/lib/careers";
import { langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
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
      title: "Careers at Oryx",
      description:
        "Nine current Oryx Institute vacancies in Ongwediva, with a clear email-first application route and a 27 November 2026 closing time.",
      ogTitle: "Careers at Oryx | Oryx Institute",
      ogDescription:
        "Nine current Oryx Institute vacancies in Ongwediva, with a clear email-first application route.",
    },
    head: {
      eyebrow: "Careers at Oryx",
      title: "Join the team building Oryx.",
      lede:
        "Oryx is recruiting in Ongwediva for centre operations, quality, learner records and programme leadership. Each Lead Instructor role brings its related levels and short-course scope into one post.",
    },
    heroImageAlt: "An empty wood worktable with ivory cards and a dark notebook",
    closing: "Applications close",
    location: "Location",
    email: "Direct applications",
    current: "Status",
    statusTitle: "Before you apply",
    statusBody:
      "Oryx Institute is in its prelaunch phase and is working toward Namibia Training Authority registration. It is not registered or accredited, and it does not offer accredited qualifications, NQF credits or a public campus. Lead Instructor posts describe planned programme work, not current enrolment.",
    statusAction: "Read the full institutional status",
    roles: "Open positions",
    roleCount:
      "Nine roles across centre operations, quality assurance, learner records and programme leadership.",
    viewRole: "View role details",
    emailRole: "Prepare application email",
    apply: "How to apply",
    applyBody: (deadline: string, email: string) =>
      `Send your CV by ${deadline}. Choosing a role prepares an email draft in your own mail client. You can also write directly to ${email} with the role title in the subject line.`,
    published: "What to know",
    publishedBody:
      "Attach your CV to your application email. Oryx does not charge a recruitment fee. This campaign does not publish role-specific qualifications, experience thresholds or selection criteria.",
    privacy: "Keep your first email focused",
    privacyBody:
      "The website does not receive or store the form. Review the draft before sending, and do not include identity documents, bank details, medical records or other highly sensitive information in your first email unless Oryx specifically asks for it.",
    privacyAction: "Read the privacy notice",
    contact: "Questions about a role or the application route?",
    contactBody:
      "Write to the recruitment desk with the role title in your subject line. Applications should be sent by email.",
  },
  af: {
    meta: {
      title: "Loopbane by Oryx",
      description:
        "Nege huidige Oryx Instituut-vakatures in Ongwediva, met ’n duidelike e-pos-eerste aansoekroete en ’n sluitingstyd op 27 November 2026.",
      ogTitle: "Loopbane by Oryx | Oryx Instituut",
      ogDescription:
        "Nege huidige Oryx Instituut-vakatures in Ongwediva, met ’n duidelike e-pos-eerste aansoekroete.",
    },
    head: {
      eyebrow: "Loopbane by Oryx",
      title: "Bou die grondslag saam met ons.",
      lede:
        "Oryx werf in Ongwediva vir sentrumbedrywighede, gehalte, leerderrekords en programleierskap. Elke Lead Instructor-rol bring die verwante vlakke en kortkursusomvang in een pos saam.",
    },
    heroImageAlt: "’n Leë houtwerktafel met ivoorkaartjies en ’n donker notaboek",
    closing: "Aansoeke sluit",
    location: "Ligging",
    email: "Direkte aansoeke",
    current: "Status",
    statusTitle: "Voordat jy aansoek doen",
    statusBody:
      "Oryx Instituut is in sy voorbekendstellingsfase en werk aan registrasie by die Namibia Training Authority. Dit is nie geregistreer of geakkrediteer nie en bied nie geakkrediteerde kwalifikasies, NQF-krediete of ’n openbare kampus aan nie. Lead Instructor-poste beskryf beplande programwerk, nie huidige inskrywing nie.",
    statusAction: "Lees die volledige institusionele status",
    roles: "Oop poste",
    roleCount:
      "Nege rolle oor sentrumbedrywighede, gehalteversekering, leerderrekords en programleierskap.",
    viewRole: "Sien rolbesonderhede",
    emailRole: "Stel aansoek-e-pos op",
    apply: "Hoe om aansoek te doen",
    applyBody: (deadline: string, email: string) =>
      `Stuur jou CV teen ${deadline}. Wanneer jy ’n rol kies, berei dit ’n e-poskonsep in jou eie e-posprogram voor. Jy kan ook direk aan ${email} skryf met die roltitel in die onderwerplyn.`,
    published: "Wat om te weet",
    publishedBody:
      "Heg jou CV aan jou aansoek-e-pos. Oryx vra geen werwingsfooi nie. Hierdie veldtog publiseer nie rolspesifieke kwalifikasies, ervaringsdrempels of keuringskriteria nie.",
    privacy: "Hou jou eerste e-pos gefokus",
    privacyBody:
      "Die webwerf ontvang of stoor nie die vorm nie. Gaan die konsep na voordat jy stuur en moenie identiteitsdokumente, bankbesonderhede, mediese rekords of ander hoogs sensitiewe inligting in jou eerste e-pos insluit nie, tensy Oryx dit spesifiek vra.",
    privacyAction: "Lees die privaatheidskennisgewing",
    contact: "Vrae oor ’n rol of die aansoekroete?",
    contactBody:
      "Skryf aan die werwingskantoor met die roltitel in jou onderwerplyn. Aansoeke moet per e-pos gestuur word.",
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

      <section className="careers-hero" data-sc-act="scrub">
        <Image
          src="/images/careers/careers-hero.jpg"
          alt={t.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="careers-hero__image"
        />
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-px border border-rule bg-rule lg:grid-cols-4" data-sc-in>
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
          <div className="bg-ivory p-7 md:p-9">
            <p className="eyebrow eyebrow--ink">{t.current}</p>
            <p className="mt-4 text-[1.1rem] font-[600] text-ink">{af ? "Nou oop" : "Open now"}</p>
          </div>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <aside className="bg-ink p-8 text-ivory md:p-10" data-sc-in>
            <p className="eyebrow eyebrow--ivory">{t.statusTitle}</p>
            <p className="mt-5 max-w-[68ch] leading-relaxed text-[var(--ivory-80)]">{t.statusBody}</p>
            <Link href={A("/status")} className="btn--quiet btn--quiet--ivory mt-7">
              {t.statusAction} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.roles}</p>
          <h2 className="h-section mt-4 max-w-[30ch]">{t.roleCount}</h2>
          <div className="mt-10 grid gap-12">
            {groups.map(({ group, roles }) => (
              <div key={group} data-sc-in>
                <p className="eyebrow eyebrow--ink">{careerGroupLabel(group, lang)}</p>
                <div className="mt-4 border-y border-rule">
                  {roles.map((role) => {
                    const roleName = careerRoleName(role);
                    const subject = af ? `Aansoek: ${roleName}` : `Application: ${roleName}`;
                    return (
                      <div className="border-b border-rule py-6 last:border-b-0 md:py-7" key={role.slug}>
                        <Link
                          href={A(`/careers/${role.slug}`)}
                          className="group grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8"
                        >
                          <div>
                            <p className="text-[clamp(1.2rem,2.3vw,1.7rem)] font-[600] tracking-[-0.025em] text-ink">{roleName}</p>
                            <p className="mt-3 max-w-[65ch] leading-relaxed text-soft">{careerRoleSummary(role, lang)}</p>
                            <p className="mt-4 text-[0.72rem] font-[600] uppercase tracking-[0.12em] text-maroon">
                              {careerRoleTag(role, lang)}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-3 text-[0.76rem] font-[600] uppercase tracking-[0.12em] text-ink">
                            {t.viewRole} <RouteArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                        <a
                          href={`mailto:${recruitment.email}?subject=${encodeURIComponent(subject)}`}
                          className="link-type mt-5 inline-block text-[0.78rem] font-[600] uppercase tracking-[0.12em]"
                        >
                          {t.emailRole} <span className="arr" aria-hidden="true">→</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-3" data-sc-in>
            <div className="panel p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">{t.apply}</p>
              <p className="mt-5 leading-relaxed text-soft">{t.applyBody(deadline, recruitment.email)}</p>
            </div>
            <div className="panel p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">{t.published}</p>
              <p className="mt-5 leading-relaxed text-soft">{t.publishedBody}</p>
            </div>
            <div className="panel p-8 md:p-10">
              <p className="eyebrow eyebrow--ink">{t.privacy}</p>
              <p className="mt-5 leading-relaxed text-soft">{t.privacyBody}</p>
              <Link href={A("/legal/privacy")} className="btn--quiet mt-6">{t.privacyAction} <span className="arr" aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="hair-t mt-12 pt-10" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.contact}</p>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-soft">{t.contactBody}</p>
            <a href={`mailto:${recruitment.email}`} className="btn--quiet mt-6">{recruitment.email} <span className="arr" aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
