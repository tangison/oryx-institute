import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { RouteArrowIcon } from "@/components/site/glyphs";
import { SocialIcon } from "@/components/site/social-icon";
import { organizationContactSchema, schemaIds, site } from "@/lib/site";
import { siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Contact and Links",
      description: "Call, WhatsApp or email Oryx Institute. Find every official Oryx link, channel and public contact detail in one place.",
      ogTitle: "Contact and Links | Oryx Institute",
      ogDescription: "Official Oryx contact details, links and social channels in one place.",
    },
    head: {
      eyebrow: "One public contact source",
      title: "Contact, without the chase.",
      lede: "Call, WhatsApp or write. Every official Oryx route is collected in one clear place.",
    },
    direct: "Speak to Oryx",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    postal: "Postal correspondence",
    noPhysical: "No physical address or public visiting instructions are published.",
    hubTitle: "Every official link, one page.",
    hubBody: "Enquiries, current work, research, ventures and every official social channel live in the Oryx Link Hub.",
    hubAction: "Open the Link Hub",
    socials: "Official social channels",
    office: "For current-work, partnership, press and general enquiries, use the public office channels above. Separate public inboxes and opening hours have not been published.",
    legal: "Public particulars",
  },
  af: {
    meta: {
      title: "Kontak en Skakels",
      description: "Bel, WhatsApp of e-pos Oryx Instituut. Vind elke amptelike Oryx-skakel, kanaal en openbare kontakbesonderheid op een plek.",
      ogTitle: "Kontak en Skakels | Oryx Instituut",
      ogDescription: "Amptelike Oryx-kontakbesonderhede, skakels en sosiale kanale op een plek.",
    },
    head: {
      eyebrow: "Een openbare kontakbron",
      title: "Kontak, sonder die soektog.",
      lede: "Bel, WhatsApp of skryf. Elke amptelike Oryx-roete is op een duidelike plek versamel.",
    },
    direct: "Praat met Oryx",
    call: "Bel",
    whatsapp: "WhatsApp",
    email: "E-pos",
    postal: "Poskorrespondensie",
    noPhysical: "Geen fisiese adres of openbare besoekinligting word gepubliseer nie.",
    hubTitle: "Elke amptelike skakel, een blad.",
    hubBody: "Navrae, huidige werk, navorsing, ondernemings en elke amptelike sosiale kanaal woon in die Oryx Skakelhub.",
    hubAction: "Open die Skakelhub",
    socials: "Amptelike sosiale kanale",
    office: "Gebruik die openbare kantoorkanale hier bo vir huidige werk, vennootskappe, pers en algemene navrae. Afsonderlike openbare e-posadresse en openingstye is nie gepubliseer nie.",
    legal: "Openbare besonderhede",
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
    alternates: alternates(lang, "/contact", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/contact`,
      images: [{ url: "/brand/og/contact.png", width: 1200, height: 630, alt: m.ogTitle }],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const A = (path: string) => (af ? `/af${path}` : path);
  const postal = af ? siteAf.postalAddressLine : site.postalAddress.line;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/contact")}`,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: {
      "@type": "EducationalOrganization",
      "@id": schemaIds.org,
      ...organizationContactSchema,
      url: site.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="contact-desk section-lg" data-sc-act="flow">
        <div className="shell contact-desk__grid">
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.direct}</p>
            <div className="contact-desk__actions mt-6">
              <a href={site.phoneHref} className="contact-desk__action">
                <span>{t.call}</span>
                <strong className="tnum">{site.phoneDisplay}</strong>
                <RouteArrowIcon className="contact-desk__arrow" />
              </a>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="contact-desk__action">
                <span>{t.whatsapp}</span>
                <strong className="tnum">{site.phoneDisplay}</strong>
                <RouteArrowIcon className="contact-desk__arrow" />
              </a>
              <a href={`mailto:${site.email}`} className="contact-desk__action">
                <span>{t.email}</span>
                <strong>{site.email}</strong>
                <RouteArrowIcon className="contact-desk__arrow" />
              </a>
            </div>
          </div>

          <aside className="contact-desk__facts" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.legal}</p>
            <dl>
              <div>
                <dt>{t.postal}</dt>
                <dd>{postal}</dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd><a className="link-type" href={site.url}>{site.webAddress}</a></dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{af ? "Voorbekendstelling. Oryx werk aan NTA-opleidingsverskafferregistrasie en is nie geregistreer of geakkrediteer nie." : "Prelaunch. Oryx is working toward NTA training-provider registration and is not registered or accredited."}</dd>
              </div>
            </dl>
            <p className="contact-desk__note">{t.noPhysical}</p>
          </aside>
        </div>
      </section>

      <section className="contact-hub-callout section-lg on-ink" data-sc-act="flow">
        <div className="shell contact-hub-callout__grid" data-sc-in>
          <div>
            <p className="eyebrow eyebrow--ivory">Oryx Links</p>
            <h2 className="h-section mt-5 max-w-[16ch]">{t.hubTitle}</h2>
          </div>
          <div>
            <p className="measure text-[var(--ivory-80)]">{t.hubBody}</p>
            <Link href={A("/links")} className="btn--cream btn mt-8">{t.hubAction}</Link>
          </div>
        </div>
      </section>

      <section className="section-lg" data-sc-act="flow">
        <div className="shell contact-socials">
          <div data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.socials}</p>
            <p className="measure mt-5 text-soft">{t.office}</p>
          </div>
          <ul data-sc-in data-sc-stagger="45">
            {site.socials.map((channel) => (
              <li key={channel.href}>
                <a href={channel.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={channel.label as "Instagram" | "Facebook" | "LinkedIn" | "X" | "Threads"} />
                  <span>{channel.label}</span>
                  <RouteArrowIcon className="contact-socials__arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
