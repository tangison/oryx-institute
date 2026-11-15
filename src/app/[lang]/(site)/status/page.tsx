import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { RouteArrowIcon } from "@/components/site/glyphs";
import { alternates, langFromParams } from "@/lib/i18n";
import { schemaIds, site } from "@/lib/site";

const copy = {
  en: {
    meta: {
      title: "Institutional Status",
      description:
        "Oryx Institute is working toward Namibia Training Authority registration. It is not registered or accredited, and does not offer accredited qualifications or NQF credits.",
    },
    head: {
      title: "Institutional status, stated plainly.",
      lede:
        "Oryx is building the evidence and systems required for training-provider registration. The work is public where it can be verified, and future where it cannot.",
    },
    asAt: "Status as at",
    current: "Current position",
    currentBody:
      "Oryx is working toward registration with the Namibia Training Authority. It is not registered with the NTA and it is not accredited by the Namibia Qualifications Authority.",
    noClaim: "What Oryx does not claim",
    noClaimBody:
      "Oryx does not offer accredited qualifications, NQF credits, accredited programmes or a public campus. A future qualification, intake, fee or start date will be published only when it is formally confirmed.",
    route: "The regulatory route",
    nta: {
      label: "NTA registration",
      body:
        "The current institutional work is directed toward training-provider registration with the Namibia Training Authority.",
      action: "Read the NTA registration route",
    },
    nqa: {
      label: "NQA accreditation",
      body:
        "Any later accreditation work will be stated with its approved scope only after formal confirmation by the relevant authority.",
      action: "View NQA accreditation information",
    },
    authorityNote:
      "The authorities named here are regulators, not partners or endorsers. Their marks are not used on this site while Oryx is unregistered and unaccredited.",
    collaboration: "Technical collaboration",
    tangisonBody:
      "Tangison Technologies provides the institute's identity, technology and learning-platform services. This is a disclosed working relationship, not an accreditation or regulatory endorsement.",
    tangisonAction: "Visit Tangison Technologies",
    register: "Read the public register",
    contact: "Contact Oryx",
  },
  af: {
    meta: {
      title: "Institusionele Status",
      description:
        "Oryx Instituut werk aan registrasie by die Namibia Training Authority. Dit is nie geregistreer of geakkrediteer nie en bied nie geakkrediteerde kwalifikasies of NQF-krediete aan nie.",
    },
    head: {
      title: "Institusionele status, eenvoudig gestel.",
      lede:
        "Oryx bou die bewyse en stelsels wat vir opleidingsverskafferregistrasie vereis word. Die werk is openbaar waar dit nagegaan kan word en toekomstig waar dit nog nie kan nie.",
    },
    asAt: "Status op",
    current: "Huidige posisie",
    currentBody:
      "Oryx werk aan registrasie by die Namibia Training Authority. Dit is nie by die NTA geregistreer nie en is nie deur die Namibia Qualifications Authority geakkrediteer nie.",
    noClaim: "Wat Oryx nie beweer nie",
    noClaimBody:
      "Oryx bied nie geakkrediteerde kwalifikasies, NQF-krediete, geakkrediteerde programme of 'n openbare kampus aan nie. 'n Toekomstige kwalifikasie, inname, fooi of begindatum word eers gepubliseer wanneer dit formeel bevestig is.",
    route: "Die regulatoriese roete",
    nta: {
      label: "NTA-registrasie",
      body:
        "Die huidige institusionele werk is op opleidingsverskafferregistrasie by die Namibia Training Authority gerig.",
      action: "Lees die NTA-registrasieroete",
    },
    nqa: {
      label: "NQA-akkreditasie",
      body:
        "Enige latere akkreditasiewerk word slegs met die goedgekeurde omvang daarvan gestel nadat dit formeel deur die toepaslike owerheid bevestig is.",
      action: "Lees NQA-akkreditasie-inligting",
    },
    authorityNote:
      "Die owerhede wat hier genoem word, is reguleerders, nie vennote of onderskrywers nie. Hul merke word nie op hierdie webwerf gebruik terwyl Oryx ongeregistreer en ongeakkrediteer is nie.",
    collaboration: "Tegniese samewerking",
    tangisonBody:
      "Tangison Technologies verskaf die instituut se identiteit-, tegnologie- en leerplatformdienste. Dit is 'n bekendgemaakte werksverhouding, nie 'n akkreditasie- of regulatoriese onderskrywing nie.",
    tangisonAction: "Besoek Tangison Technologies",
    register: "Lees die openbare register",
    contact: "Kontak Oryx",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const t = copy[lang];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates(lang, "/status", site.url),
    openGraph: {
      title: `${t.meta.title} | ${lang === "af" ? "Oryx Instituut" : "Oryx Institute"}`,
      description: t.meta.description,
      url: `${site.url}${lang === "af" ? "/af" : ""}/status`,
      images: [{ url: "/brand/og/about.png", width: 1200, height: 630, alt: t.meta.title }],
    },
  };
}

export default async function StatusPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const A = (href: string) => (af ? `/af${href}` : href);
  const statusDate = new Intl.DateTimeFormat(af ? "af-NA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${site.statusAsOf}T00:00:00Z`));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.title,
    url: `${site.url}${A("/status")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      name: site.tradingName,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
        <p className="mt-5 text-[0.78rem] font-[600] uppercase tracking-[0.12em] text-ink">
          {t.asAt}: <time dateTime={site.statusAsOf}>{statusDate}</time>
        </p>
      </PageHead>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,.72fr)]">
          <div className="panel p-8 md:p-12" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.current}</p>
            <p className="mt-5 max-w-[46ch] font-[var(--font-display)] text-[clamp(1.65rem,3vw,2.8rem)] leading-[1.08] text-ink">
              {t.currentBody}
            </p>
          </div>
          <div className="bg-ink p-8 text-ivory md:p-12" data-sc-in>
            <p className="eyebrow eyebrow--ivory">{t.noClaim}</p>
            <p className="mt-5 max-w-[35ch] leading-relaxed text-[var(--ivory-80)]">{t.noClaimBody}</p>
          </div>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell">
          <p className="eyebrow eyebrow--ink">{t.route}</p>
          <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-2" data-sc-in data-sc-stagger="80">
            <a
              className="group bg-ivory p-8 text-ink transition-colors hover:bg-white md:p-10"
              href={site.ntaRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-[0.72rem] font-[600] uppercase tracking-[0.15em] text-maroon">{t.nta.label}</p>
              <p className="mt-5 max-w-[36ch] leading-relaxed text-soft">{t.nta.body}</p>
              <span className="mt-8 inline-flex items-center gap-3 text-[0.78rem] font-[600] uppercase tracking-[0.12em]">
                {t.nta.action} <RouteArrowIcon className="h-4 w-4" />
              </span>
            </a>
            <a
              className="group bg-ivory p-8 text-ink transition-colors hover:bg-white md:p-10"
              href={site.nqaAccreditationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-[0.72rem] font-[600] uppercase tracking-[0.15em] text-maroon">{t.nqa.label}</p>
              <p className="mt-5 max-w-[36ch] leading-relaxed text-soft">{t.nqa.body}</p>
              <span className="mt-8 inline-flex items-center gap-3 text-[0.78rem] font-[600] uppercase tracking-[0.12em]">
                {t.nqa.action} <RouteArrowIcon className="h-4 w-4" />
              </span>
            </a>
          </div>
          <p className="measure mt-7 text-sm leading-relaxed text-soft">{t.authorityNote}</p>
        </div>
      </section>

      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-end">
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.collaboration}</p>
            <div className="mt-6 border-y border-rule py-8">
              <p className="text-[clamp(1.35rem,3vw,2.1rem)] font-[600] tracking-[-0.035em] text-ink">
                Tangison Technologies
              </p>
              <p className="mt-5 max-w-[45ch] leading-relaxed text-soft">{t.tangisonBody}</p>
              <a
                href={site.tangisonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-3 text-[0.78rem] font-[600] uppercase tracking-[0.12em] text-ink"
              >
                {t.tangisonAction} <RouteArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-4 text-[0.82rem] font-[600] uppercase tracking-[0.12em]" data-sc-in>
            <Link href={A("/register")} className="link-type">{t.register}</Link>
            <Link href={A("/contact")} className="link-type">{t.contact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
