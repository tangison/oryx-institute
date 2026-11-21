import type { Metadata } from "next";
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
      title: "Careers at Oryx",
      description:
        "Nine current Oryx Institute vacancies in Ongwediva, with a clear email-first application route and a 27 November 2026 closing time.",
      ogTitle: "Careers at Oryx | Oryx Institute",
      ogDescription:
        "Nine current Oryx Institute vacancies in Ongwediva, with a clear email-first application route.",
    },
    head: {
      eyebrow: "CAREERS AT ORYX",
      title: "Build the foundation with us.",
      lede:
        "Oryx is recruiting for centre establishment, quality, records and programme leadership in Ongwediva. Nine focused roles bring related programme levels and short-course scopes together under one clear application route.",
    },
    closing: "Applications close",
    location: "Location",
    email: "Direct applications",
    current: "Status",
    statusTitle: "Before you apply",
    statusBody:
      "Oryx Institute is in its prelaunch phase and is working toward Namibia Training Authority registration. It is not registered or accredited, and it does not currently offer accredited qualifications, NQF credits or an open public campus. Each Lead Instructor notice defines one senior programme scope for planned work. It does not announce a current course or enrolment.",
    statusAction: "Read the full institutional status",
    roles: "Open positions",
    roleCount:
      "Nine distinct roles across centre operations, quality assurance, learner records and programme leadership.",
    viewRole: "View role and apply",
    apply: "How to apply",
    applyBody: (deadline: string, email: string) =>
      `Send your CV before ${deadline}. Selecting a role prepares an email draft in your own mail client, so nothing is stored on this website before you choose to send it. You can also write directly to ${email} with the role title in the subject line.`,
    published: "What is published",
    publishedBody:
      "This campaign does not publish minimum qualifications, licences, years-of-experience thresholds or selection criteria. Do not assume an unannounced requirement. The application instruction is to attach your CV.",
    privacy: "Keep your first email focused",
    privacyBody:
      "The website does not receive or store the form. Review the draft before sending, and do not include identity documents, bank details, medical records or other highly sensitive information in your first email unless Oryx specifically asks for it.",
    privacyAction: "Read the privacy notice",
    contact: "Questions about a role or the application route?",
    contactBody:
      "Write to the recruitment desk with the role title in your subject line. Please do not submit applications through social-media messages.",
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
        "Oryx werf vir sentrumvestiging, gehalte, rekords en programleierskap in Ongwediva. Nege gefokusde rolle bring verwante programvlakke en kortkursusomvang in een duidelike aansoekroete saam.",
    },
    closing: "Aansoeke sluit",
    location: "Ligging",
    email: "Direkte aansoeke",
    current: "Status",
    statusTitle: "Voordat jy aansoek doen",
    statusBody:
      "Oryx Instituut is in sy voorbekendstellingsfase en werk aan registrasie by die Namibia Training Authority. Dit is nie geregistreer of geakkrediteer nie en bied tans nie geakkrediteerde kwalifikasies, NQF-krediete of ’n oop openbare kampus aan nie. Elke Lead Instructor-kennisgewing omskryf een senior programomvang vir beplande werk. Dit kondig nie ’n huidige kursus of inskrywing aan nie.",
    statusAction: "Lees die volledige institusionele status",
    roles: "Oop poste",
    roleCount:
      "Nege afsonderlike rolle oor sentrumbedrywighede, gehalteversekering, leerderrekords en programleierskap.",
    viewRole: "Sien rol en doen aansoek",
    apply: "Hoe om aansoek te doen",
    applyBody: (deadline: string, email: string) =>
      `Stuur jou CV voor ${deadline}. Wanneer jy ’n rol kies, berei dit ’n e-poskonsep in jou eie e-posprogram voor, sodat niks op hierdie webwerf gestoor word voordat jy kies om te stuur nie. Jy kan ook direk aan ${email} skryf met die roltitel in die onderwerplyn.`,
    published: "Wat gepubliseer is",
    publishedBody:
      "Hierdie veldtog publiseer nie minimum kwalifikasies, lisensies, drempels vir jare se ervaring of keuringskriteria nie. Moenie ’n onaangekondigde vereiste veronderstel nie. Die aansoekinstruksie is om jou CV aan te heg.",
    privacy: "Hou jou eerste e-pos gefokus",
    privacyBody:
      "Die webwerf ontvang of stoor nie die vorm nie. Gaan die konsep na voordat jy stuur en moenie identiteitsdokumente, bankbesonderhede, mediese rekords of ander hoogs sensitiewe inligting in jou eerste e-pos insluit nie, tensy Oryx dit spesifiek vra.",
    privacyAction: "Lees die privaatheidskennisgewing",
    contact: "Vrae oor ’n rol of die aansoekroete?",
    contactBody:
      "Skryf aan die werwingskantoor met die roltitel in jou onderwerplyn. Moet asseblief nie aansoeke deur sosialemedia-boodskappe indien nie.",
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
                          {careerRoleTag(role, lang)}
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
