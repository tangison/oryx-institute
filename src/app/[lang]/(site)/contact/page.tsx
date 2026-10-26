import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { SocialIcon } from "@/components/site/social-icon";
import { site } from "@/lib/site";
import { siteZh } from "@/lib/site-zh";
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
      lede: "One mailbox answers everything: applications, partnerships, the press. It is read in the Principal's office, and every message gets a reply from a person.",
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
    close: "One email starts it.",
  },
  zh: {
    meta: {
      title: "联系办公室",
      description:
        "Oryx 理工学院的一个邮箱回答一切：info@oryxinstitute.org。申请、合作与媒体，由院长办公室阅处。到访请预约。",
      ogTitle: "联系 | Oryx 理工学院",
      ogDescription:
        "一个邮箱回答一切：info@oryxinstitute.org。办公室阅读每封来信。温得和克，纳米比亚。",
      ldName: "联系办公室",
    },
    head: {
      eyebrow: "联系",
      title: "联系办公室。",
      lede: "一个邮箱回答一切：申请、合作、媒体。它在院长办公室被阅读，每封信都由一个人回复。",
    },
    addressEyebrow: "管用的地址",
    addressBody:
      "在第一封邮件里说明来意：申请、生意上的问题、合作，或者媒体提问。办公室亲自回复，通常在一周之内，第一封回信会讲明学院能做什么、不能做什么。",
    writeOffice: "给办公室写信",
    applyInstead: "去申请",
    channelsEyebrow: "渠道",
    statedEyebrow: "照实说",
    where: {
      dt: "办公室在哪里",
      dd: "。暂无对外场地，所以不印街道地址。",
    },
    visits: {
      dt: "到访",
      dd: "按预约。在第一封邮件里说明想见面，办公室会定一个双方都合适的温得和克的时间与地点。",
    },
    phone: {
      dt: "电话",
      dd: "暂不公布。专属业务电话会在开办前到位，到位当天就出现在这里和页脚。",
    },
    social: {
      dt: "社交",
      dd: "Instagram、Facebook 与 LinkedIn，以图标链接在页脚与上方。不内嵌任何东西；本站不跑第三方脚本。",
    },
    close: "一封邮件，事情就开始。",
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
  const zh = lang === "zh";
  const t = copy[lang];
  const A = (path: string) => (zh ? `/zh${path}` : path);

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
      areaServed: zh ? siteZh.areaServed : site.areaServed,
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

      <section className="section-lg" data-sc-act="flow">
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
                  {site.city}, {zh ? siteZh.country : site.country}
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

      {/* The place, held still: Windhoek as the page's one silent
          divider, no text over it. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.9">
          <Image
            src="/images/kinfolk/07-windhoek-divider.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
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
