import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { faqs, site } from "@/lib/site";
import { faqsZh } from "@/lib/site-zh";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Questions & Answers",
      description:
        "Applying to Oryx Institute, the programmes, the meaning of 理工, ventures, the certificate and where to find the office in Windhoek.",
      ogTitle: "FAQ | Oryx Institute",
      ogDescription: "Applying, programmes, ventures, the certificate and the office, answered.",
      ldName: "Frequently asked questions, Oryx Institute",
    },
    headTitle: "Questions, answered.",
    headLede:
      "What applicants ask before they write. Anything else, put it in the application message itself: the Principal's office answers directly.",
    writeOffice: "Write to the office",
    applyNow: "Apply now",
    contactLink: "Contact the office",
  },
  zh: {
    meta: {
      title: "问题与回答",
      description:
        "常见问题，逐一回答：如何向 Oryx 理工学院申请（写一封邮件给院长办公室）、学院开设什么课程（工商管理与信息技术及相关领域的速成课和短期课程）、理工二字是什么意思、学院是否承接企业咨询、证书是什么、到哪里找到温得和克的办公室，以及学院是否已获认证。答案照实写，不夸口。",
      ogTitle: "常见问题 | Oryx 理工学院",
      ogDescription: "申请、课程、实业、证书与办公室，一一作答。",
      ldName: "Oryx 理工学院常见问题",
    },
    headTitle: "问题，都有回答。",
    headLede:
      "申请者动笔之前问的东西。别的，写进申请邮件里就好：院长办公室直接回复。",
    writeOffice: "给办公室写信",
    applyNow: "现在申请",
    contactLink: "联系办公室",
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
    alternates: alternates(lang, "/faq", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        { url: "/brand/og/faq.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const zh = lang === "zh";
  const t = copy[lang];
  const list = zh ? faqsZh : faqs;
  const A = (path: string) => (zh ? `/zh${path}` : path);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHead title={t.headTitle}>
        <p>{t.headLede}</p>
      </PageHead>

      {/* The stone, small, above the questions. */}
      <section className="section-sm" data-sc-act="flow" data-sc-in>
        <div className="shell">
          <figure className="faq-plate">
            <Image
              src="/images/kinfolk/02-stone.jpg"
              alt="One weathered stone specimen, centred on cream paper"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 16rem, min(60vw, 20rem)"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      <section className="section-lg">
        <div className="shell">
          <div className="faq-list" data-sc-in data-sc-stagger="40">
            {list.map((faq) => (
              <details key={faq.q} open>
                <summary>
                  <span>{faq.q}</span>
                  <span className="faq-sign" aria-hidden="true">+</span>
                </summary>
                <p className="faq-a">{faq.a}</p>
              </details>
            ))}
          </div>

          <p className="measure mt-14 text-soft" data-sc-in>
            {zh
              ? "这里没有你要的答案？给办公室写信。"
              : "If your question isn't answered here, write to the office."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6" data-sc-in>
            <a href={`mailto:${site.email}`} className="btn">
              {t.writeOffice}
            </a>
            <Link href={A("/apply")} className="btn--quiet">
              {t.applyNow} <span className="arr" aria-hidden="true">→</span>
            </Link>
            {/* The office page, from the page content: one route into
                /contact that is not the chrome. */}
            <Link href={A("/contact")} className="btn--quiet">
              {t.contactLink} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
