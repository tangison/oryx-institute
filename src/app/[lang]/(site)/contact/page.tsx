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
        "Call or WhatsApp Oryx Institute on 083 676 4338, or write to info@oryxinstitute.org. Applications, partnerships and the press, read in the Principal's office.",
      ogTitle: "Contact | Oryx Institute",
      ogDescription:
        "Call or WhatsApp 083 676 4338, or write to info@oryxinstitute.org. The office reads every message, Windhoek, Namibia.",
      ldName: "Contact the Office",
    },
    head: {
      eyebrow: "Contact",
      title: "Contact the office.",
      lede: "Call, message on WhatsApp, or write: applications, partnerships, the press. Every message gets a reply from a person.",
    },
    addressEyebrow: "Call or WhatsApp, first",
    addressBody:
      "Say in your first message what the message is: an application, a business problem, a partnership, or a press question. The office replies personally, usually within the week, and the first reply names what the institute can and cannot do for you.",
    callNow: "Call the office",
    whatsapp: "WhatsApp the office",
    preferWrite: "Prefer to write? The mailbox stays the secondary route, and it suits applications and anything that should arrive as a document.",
    writeOffice: "Write to the office",
    applyInstead: "Apply instead",
    channelsEyebrow: "The channels",
    statedEyebrow: "Stated as it is",
    messageEyebrow: "What to put in the message",
    messageBody:
      "Three things, in any order: who you are, what the message is about, and what a reply should decide. A message that names its subject in the first line gets read first; formality is not needed, the facts are. If the matter is an application, say which of the six doors you are writing about. If the matter is a business problem, say what the business does and where it is stuck: one paragraph is enough, and the office will ask for what is missing.",
    methodEyebrow: "How the office works",
    methodBody:
      "Every message is read by a person, usually within the week. Replies are written, not templated: what you get back names what the institute can do, what it cannot, and what the next step would cost you in time. Nothing is stored on this site and nothing is shared; the conversation lives in your mailbox and the office's, like correspondence always has.",
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
      dd: ". Call, or message on WhatsApp. The same line and the same office.",
    },
    social: {
      dt: "Social",
      dd: "Instagram, Facebook, LinkedIn, X and Threads, linked as icons in the footer and above. Nothing is embedded; the site runs no third-party scripts.",
    },
    close: "One email starts it.",
  },
  af: {
    meta: {
      title: "Contact the Office",
      description:
        "Call or WhatsApp Oryx Institute on 083 676 4338, or write to info@oryxinstitute.org. Applications, partnerships and the press, read in the Principal's office.",
      ogTitle: "Contact | Oryx Institute",
      ogDescription:
        "Call or WhatsApp 083 676 4338, or write to info@oryxinstitute.org. The office reads every message, Windhoek, Namibia.",
      ldName: "Contact the Office",
    },
    head: {
      eyebrow: "Contact",
      title: "Contact the office.",
      lede: "Call, message on WhatsApp, or write: applications, partnerships, the press. Every message gets a reply from a person.",
    },
    addressEyebrow: "Call or WhatsApp, first",
    addressBody:
      "Say in your first message what the message is: an application, a business problem, a partnership, or a press question. The office replies personally, usually within the week, and the first reply names what the institute can and cannot do for you.",
    callNow: "Call the office",
    whatsapp: "WhatsApp the office",
    preferWrite: "Prefer to write? The mailbox stays the secondary route, and it suits applications and anything that should arrive as a document.",
    writeOffice: "Write to the office",
    applyInstead: "Apply instead",
    channelsEyebrow: "The channels",
    statedEyebrow: "Stated as it is",
    messageEyebrow: "What to put in the message",
    messageBody:
      "Three things, in any order: who you are, what the message is about, and what a reply should decide. A message that names its subject in the first line gets read first; formality is not needed, the facts are. If the matter is an application, say which of the six doors you are writing about. If the matter is a business problem, say what the business does and where it is stuck: one paragraph is enough, and the office will ask for what is missing.",
    methodEyebrow: "How the office works",
    methodBody:
      "Every message is read by a person, usually within the week. Replies are written, not templated: what you get back names what the institute can do, what it cannot, and what the next step would cost you in time. Nothing is stored on this site and nothing is shared; the conversation lives in your mailbox and the office's, like correspondence always has.",
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
      dd: ". Call, or message on WhatsApp. The same line and the same office.",
    },
    social: {
      dt: "Social",
      dd: "Instagram, Facebook, LinkedIn, X and Threads, linked as icons in the footer and above. Nothing is embedded; the site runs no third-party scripts.",
    },
    close: "One email starts it.",
    enLedger: { paras: [] as string[] },
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
  const plannedCentre = af ? siteAf.plannedCentre : site.plannedCentre;
  const plannedCentreLabel = af ? "Beplande opleidingsentrum" : "Planned training centre";
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
      telephone: site.phoneE164,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: site.phoneE164,
          contactType: "customer service",
          email: site.email,
        },
      ],
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

      {/* The opener plate: the library wall: a shelf of books and a
          glass of water, the office's own register. Full measure,
          drifting at a gentler rate than the page. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.18">
            <Image
              src="/images/kinfolk/texture/38-library-wall.jpg"
              alt="A wall of shelved books beside a glass of water on a wooden sill, lit from the left"
              width={1086}
              height={1448}
              priority
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="hair-t pt-14" data-sc-in data-sc-stagger="70">
            <p className="eyebrow eyebrow--ink">{t.addressEyebrow}</p>
            <h2 className="h-section mt-4 max-w-[24ch]">
              <a
                href={site.phoneHref}
                className="link-type whitespace-nowrap tnum"
                /* Label in Name (WCAG 2.5.3): reuse the visible string. */
                aria-label={`Call ${site.tradingName} on ${site.phoneDisplay}`}
              >
                {site.phoneDisplay}
              </a>
            </h2>
            <p className="measure mt-6 text-soft">{t.addressBody}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <a href={site.phoneHref} className="btn tnum">
                {t.callNow}
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                {t.whatsapp}
                <span className="arr ml-1" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
            <p className="measure mt-6 text-soft">
              {t.preferWrite}{" "}
              <a href={`mailto:${site.email}`} className="link-type">
                {site.email}
              </a>
            </p>

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
                      <SocialIcon
                        name={s.label as "Instagram" | "Facebook" | "LinkedIn" | "X" | "Threads"}
                        className={s.label === "X" ? "h-20 w-20 md:h-5 md:w-5" : undefined}
                      />
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
                <dt className="font-[500]">{plannedCentreLabel}</dt>
                <dd className="mt-1 text-soft">{plannedCentre}</dd>
              </div>
              <div>
                <dt className="font-[500]">{t.phone.dt}</dt>
                <dd className="mt-1 text-soft">
                  <a
                    href={site.phoneHref}
                    className="link-type whitespace-nowrap tnum"
                  >
                    {site.phoneDisplay}
                  </a>
                  <span className="tnum"> ({site.phoneInternational} international)</span>
                  {t.phone.dd}
                </dd>
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

      {/* The working rules of the mailbox: two entries, set like the
          ledger everywhere else on the site. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.messageEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.messageBody}</p>
          </div>
          <div className="hair-t mt-12 pt-12">
            <p className="eyebrow eyebrow--ink">{t.methodEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.methodBody}</p>
          </div>
        </div>
      </section>

      {/* The English original, printed beneath the Afrikaans page. */}
      {false && (
        <section className="section" data-sc-act="flow">
          <div className="shell">
            <div className="hair-t pt-14" data-sc-in>
              <p className="eyebrow eyebrow--ink">Engelse oorspronklike · The English original</p>
              <div className="measure mt-5 space-y-5 text-soft" lang="en">
                {copy.af.enLedger.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The place, held still: the Windhoek gate: arriving, a
          threshold: as the page's one silent divider, no text over
          it. (The acacia stays on the homepage; the gate is the
          contact's own.) */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.9">
          <Image
            src="/images/kinfolk/texture/37-windhoek-gate.jpg"
            alt=""
            width={1122}
            height={1402}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The close: one line, set in the serif. */}
      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-reveal>
          <p className="pull-quote max-w-[20ch]">{t.close}</p>
        </div>
      </section>
    </>
  );
}
