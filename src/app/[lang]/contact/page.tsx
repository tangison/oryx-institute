import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { SocialIcon } from "@/components/site/social-icon";
import { site } from "@/lib/site";
import { siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Contact the Office",
      description:
        "One mailbox answers everything at Oryx Institute: info@oryxinstitute.org. Applications, partnerships and the press, read in the Principal's office. Visits by appointment.",
      ogTitle: "Contact | Oryx Institute",
      ogDescription:
        "One mailbox answers everything: info@oryxinstitute.org. The office reads every message, Windhoek, Namibia.",
      ldName: "Contact the Office",
    },
    head: {
      eyebrow: "Contact",
      title: "Contact the office.",
      lede: "One mailbox answers everything: applications, partnerships, the press. It is read in the Principal's office, and every message gets a reply from a person, not a queue.",
    },
    addressEyebrow: "The address that works",
    addressBody:
      "Say in your first message what the message is: an application, a business problem, a partnership, or a press question. The office replies personally, usually within the week, and the first reply names what the institute can and cannot do for you.",
    writeOffice: "Write to the office",
    applyInstead: "Apply instead",
    channelsEyebrow: "The channels",
    statedEyebrow: "Stated as it is",
    where: {
      dt: "Where the office is",
      dd: ". No public premises yet, so no street address is printed.",
    },
    visits: {
      dt: "Visits",
      dd: "By appointment. Say in your first message that you would like to meet, and the office confirms a time and place in Windhoek that suits both sides.",
    },
    phone: {
      dt: "Telephone",
      dd: "None published. A dedicated business line lands before launch, and it appears here and in the footer the day it exists.",
    },
    social: {
      dt: "Social",
      dd: "Instagram, Facebook and LinkedIn, linked as icons in the footer and above. Nothing is embedded; the site runs no third-party scripts.",
    },
  },
  af: {
    meta: {
      title: "Kontak die Kantoor",
      description:
        "Een posbus antwoord alles by Oryx Instituut: info@oryxinstitute.org. Aansoeke, vennootskappe en die pers, gelees in die Prinsipaal se kantoor. Besoeke per afspraak.",
      ogTitle: "Kontak | Oryx Instituut",
      ogDescription:
        "Een posbus antwoord alles: info@oryxinstitute.org. Die kantoor lees elke boodskap. Windhoek, Namibië.",
      ldName: "Kontak die Kantoor",
    },
    head: {
      eyebrow: "Kontak",
      title: "Kontak die kantoor.",
      lede: "Een posbus antwoord alles: aansoeke, vennootskappe, die pers. Dit word in die Prinsipaal se kantoor gelees, en elke boodskap kry 'n antwoord van 'n mens, nie van 'n tou nie.",
    },
    addressEyebrow: "Die adres wat werk",
    addressBody:
      "Sê in jou eerste boodskap wat die boodskap is: 'n aansoek, 'n besigheidsprobleem, 'n vennootskap, of 'n persvraag. Die kantoor antwoord persoonlik, gewoonlik binne die week, en die eerste antwoord noem wat die instituut vir jou kan en nie kan doen nie.",
    writeOffice: "Skryf aan die kantoor",
    applyInstead: "Meld liewer aan",
    channelsEyebrow: "Die kanale",
    statedEyebrow: "Gesê soos dit is",
    where: {
      dt: "Waar die kantoor is",
      dd: ". Nog geen openbare perseel nie, dus word geen straatadres gedruk nie.",
    },
    visits: {
      dt: "Besoeke",
      dd: "Per afspraak. Sê in jou eerste boodskap dat jy wil ontmoet, en die kantoor bevestig 'n tyd en plek in Windhoek wat albei kante pas.",
    },
    phone: {
      dt: "Telefoon",
      dd: "Geen gepubliseer nie. 'n Toegewyde besigheidslyn tank voor die afskop, en dit verskyn hier en in die voetskrif die dag dat dit bestaan.",
    },
    social: {
      dt: "Sosiaal",
      dd: "Instagram, Facebook en LinkedIn, geskakel as ikone in die voetskrif en hierbo. Niks word ingebed nie; die werf loop geen derdepartyskrifte nie.",
    },
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
      images: [
        { url: "/brand/og/contact.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/contact")}`,
    isPartOf: { "@type": "WebSite", "@id": `${site.url}/#website` },
    about: {
      "@type": "EducationalOrganization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      email: site.email,
      areaServed: af ? siteAf.areaServed : site.areaServed,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "NA",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      <section className="section-lg">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="hair-t pt-14" data-sc-in data-sc-stagger="70">
            <h2 className="h-section max-w-[24ch]">
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
            </h2>
            <p className="measure mt-6 text-soft">{t.addressBody}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <a href={`mailto:${site.email}`} className="btn">
                {t.writeOffice}
              </a>
              <Link href={A("/apply")} className="btn--quiet">
                {t.applyInstead} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-12">
              <ul className="flex flex-wrap gap-3">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-row-item inline-flex items-center gap-3 border border-rule px-4 py-3 text-[0.85rem] transition-colors hover:border-ink"
                    >
                      <SocialIcon name={s.label as "Instagram" | "Facebook" | "LinkedIn"} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="panel p-8 md:p-10" data-sc-in>
            <dl className="grid gap-6 text-[0.95rem] leading-relaxed">
              <div>
                <dt className="font-[500]">{t.where.dt}</dt>
                <dd className="mt-1 text-soft">
                  {site.city}, {af ? siteAf.country : site.country}
                  {t.where.dd}
                </dd>
              </div>
              <div>
                <dt className="font-[500]">{t.visits.dt}</dt>
                <dd className="mt-1 text-soft">{t.visits.dd}</dd>
              </div>
              <div>
                <dt className="font-[500]">{t.phone.dt}</dt>
                <dd className="mt-1 text-soft">{t.phone.dd}</dd>
              </div>
              <div>
                <dt className="font-[500]">{t.social.dt}</dt>
                <dd className="mt-1 text-soft">{t.social.dd}</dd>
              </div>
            </dl>
            </div>
          </div>
        </div>
      </section>

      {/* The place, held still: Windhoek below the contact block, no
          text over it. */}
      <div
        className="divider overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.9">
          <Image
            src="/images/kinfolk/k07-windhoek.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}
