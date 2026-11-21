import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RouteArrowIcon } from "@/components/site/glyphs";
import { OryxLogo } from "@/components/site/oryx-logo";
import { linkHub, organizationContactSchema, schemaIds, site } from "@/lib/site";
import { siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Oryx Links",
      description: "Every official Oryx Institute contact route, current work, research, venture and social channel in one mobile-first hub.",
      ogTitle: "Oryx Links | Oryx Institute",
      ogDescription: "Official Oryx Institute links, contact details and social channels in one place.",
    },
    eyebrow: "Oryx Institute",
    title: "The useful routes.\nAll in one place.",
    lede: "Official contact details, work, reading and social channels in one place.",
    qr: "Scan for every official Oryx link",
    groups: {
      direct: "Start here",
      enquiries: "Enquire or apply",
      reading: "Read the work",
      institute: "See the institute",
      social: "Follow Oryx",
    },
    links: {
      call: ["Call", "083 676 4338"],
      whatsapp: ["WhatsApp", "083 676 4338"],
      email: ["Email", "info@oryxinstitute.org"],
      careers: ["Careers", "Current vacancies and email-first applications"],
      apply: ["Enquire", "Write to the Oryx office"],
      research: ["Research", "Published work on Namibia's working realities"],
      practice: ["Practice", "Business counselling and market research"],
      ventures: ["Ventures", "Small companies, real customers"],
      "corner-spa": ["Corner Spa", "The first operating venture"],
      register: ["The Register", "Dated public institutional updates"],
      "planned-campus-site": ["Untag Guesthouse campus site", "Future site. Not open for courses or enrolment."],
      "google-business-profile": ["Oryx on Google Maps", "Official Google Business Profile"],
    } as Record<string, [string, string]>,
    footer: {
      note: "A new polytechnic for Namibia. Research, practice and companies that prove the work.",
      about: "About",
      status: "Status",
      contact: "Contact",
      faq: "FAQ",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
  af: {
    meta: {
      title: "Oryx Skakels",
      description: "Elke amptelike Oryx Instituut-kontakroete, huidige werk, navorsing, onderneming en sosiale kanaal in een mobiele spilpunt.",
      ogTitle: "Oryx Skakels | Oryx Instituut",
      ogDescription: "Amptelike Oryx Instituut-skakels, kontakbesonderhede en sosiale kanale op een plek.",
    },
    eyebrow: "Oryx Instituut",
    title: "Die bruikbare roetes.\nAlles op een plek.",
    lede: "Amptelike kontakbesonderhede, werk, leesstof en sosiale kanale op een plek.",
    qr: "Skandeer vir elke amptelike Oryx-skakel",
    groups: {
      direct: "Begin hier",
      enquiries: "Doen navraag of aansoek",
      reading: "Lees die werk",
      institute: "Sien die instituut",
      social: "Volg Oryx",
    },
    links: {
      call: ["Bel", "083 676 4338"],
      whatsapp: ["WhatsApp", "083 676 4338"],
      email: ["E-pos", "info@oryxinstitute.org"],
      careers: ["Loopbane", "Huidige vakatures en e-pos-eerste aansoeke"],
      apply: ["Doen navraag", "Skryf aan die Oryx-kantoor"],
      research: ["Navorsing", "Gepubliseerde werk oor Namibië se werkswerklikhede"],
      practice: ["Praktyk", "Besigheidsadvies en marknavorsing"],
      ventures: ["Ondernemings", "Klein maatskappye, werklike kliënte"],
      "corner-spa": ["Corner Spa", "Die eerste bedrywige onderneming"],
      register: ["Die Register", "Gedateerde openbare institusionele opdaterings"],
      "planned-campus-site": ["Untag Guesthouse-kampusterrein", "Toekomstige terrein. Nie oop vir kursusse of inskrywings nie."],
      "google-business-profile": ["Oryx op Google Maps", "Amptelike Google Besigheidsprofiel"],
    } as Record<string, [string, string]>,
    footer: {
      note: "’n Nuwe politegniese instituut vir Namibië. Navorsing, praktyk en ondernemings wat die werk bewys.",
      about: "Oor",
      status: "Status",
      contact: "Kontak",
      faq: "Vrae",
      privacy: "Privaatheid",
      terms: "Voorwaardes",
    },
  },
} as const;

type HubLink = { id: string; href: string; external?: boolean };

function HubRow({
  link,
  label,
  path,
}: {
  link: HubLink;
  label: [string, string];
  path: (href: string) => string;
}) {
  const content = (
    <>
      <span className="link-hub__row-title">{label[0]}</span>
      <span className="link-hub__row-note">{label[1]}</span>
      <RouteArrowIcon className="link-hub__arrow" />
    </>
  );

  if (link.external || link.href.startsWith("mailto:") || link.href.startsWith("tel:")) {
    return (
      <a
        href={link.href}
        className="link-hub__row"
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <Link href={path(link.href)} className="link-hub__row">{content}</Link>;
}

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
    alternates: alternates(lang, "/links", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/links`,
      images: [{ url: "/brand/og/default.png", width: 1200, height: 630, alt: m.ogTitle }],
    },
  };
}

export default async function LinksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const A = (href: string) => (href.startsWith("/") ? (af ? `/af${href}` : href) : href);
  const postal = af ? siteAf.postalAddressLine : site.postalAddress.line;
  const sections = [
    { id: "direct", links: linkHub.direct },
    { id: "enquiries", links: linkHub.enquiries },
    { id: "reading", links: linkHub.reading },
    { id: "institute", links: linkHub.institute },
  ] as const;
  const utilityLabels = [t.footer.about, t.footer.status, t.footer.contact, t.footer.faq, t.footer.privacy, t.footer.terms];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/links")}`,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      ...organizationContactSchema,
      url: site.url,
    },
  };

  return (
    <div className="page-tone--ink on-ink link-hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="link-hub__hero">
        <div className="shell link-hub__hero-grid" data-sc-in>
          <div>
            <OryxLogo variant="lockup" tone="reverse" className="link-hub__logo" title="Oryx Institute" />
            <p className="eyebrow eyebrow--ivory mt-10">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="link-hub__lede">{t.lede}</p>
          </div>
          <figure className="link-hub__qr">
            <Image
              src="/images/links/oryx-links-qr.svg"
              alt={t.qr}
              width={256}
              height={256}
              priority
              sizes="(min-width: 64rem) 10rem, 8rem"
            />
            <figcaption>{t.qr}</figcaption>
          </figure>
        </div>
      </section>

      <main className="link-hub__main">
        <div className="shell">
          {sections.map((section) => (
            <section className="link-hub__section" key={section.id} data-sc-act="flow">
              <p className="eyebrow eyebrow--ivory">{t.groups[section.id]}</p>
              <div className="link-hub__rows" data-sc-in data-sc-stagger="35">
                {section.links.map((link) => (
                  <HubRow key={link.id} link={link} label={t.links[link.id]} path={A} />
                ))}
              </div>
            </section>
          ))}

          <section className="link-hub__section" data-sc-act="flow">
            <p className="eyebrow eyebrow--ivory">{t.groups.social}</p>
            <div className="link-hub__rows" data-sc-in data-sc-stagger="35">
              {site.socials.map((channel) => (
                <a className="link-hub__row" href={channel.href} target="_blank" rel="noopener noreferrer" key={channel.href}>
                  <span className="link-hub__row-title">{channel.label}</span>
                  <span className="link-hub__row-note">{af ? "Amptelike Oryx-kanaal" : "Official Oryx channel"}</span>
                  <RouteArrowIcon className="link-hub__arrow" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="link-hub__footer">
        <div className="shell">
          <p className="link-hub__footer-note">{t.footer.note}</p>
          <nav aria-label={af ? "Nuttige skakels" : "Useful links"}>
            {linkHub.utility.map((link, index) => (
              <Link href={A(link.href)} key={link.id}>{utilityLabels[index]}</Link>
            ))}
          </nav>
          <p>{postal}</p>
          <p>{site.legalLine}</p>
          <p>{site.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
