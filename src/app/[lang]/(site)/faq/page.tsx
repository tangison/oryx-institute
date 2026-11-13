import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { faqs, site } from "@/lib/site";
import { faqsAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Questions & Answers",
      description:
        "Applying to Oryx Institute, the programmes, the meaning of a polytechnic, ventures, the certificate and where to find the office in Windhoek.",
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
  af: {
    meta: {
      title: "Questions & Answers",
      description:
        "Applying to Oryx Institute, the programmes, the meaning of a polytechnic, ventures, the certificate and where to find the office in Windhoek.",
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
    alternates: alternates(lang, "/faq", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/faq`,
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
  const af = lang === "af";
  const t = copy[lang];
  const list = af ? faqsAf : faqs;
  const A = (path: string) => (af ? `/af${path}` : path);

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

      {/* The pencil, small and right-aligned above the questions:
          marking, answering, editing: the FAQ's own instrument.
          (Image Bible v6: the regenerated plain graphite.) */}
      <section className="section-sm" data-sc-act="flow" data-sc-in>
        <div className="shell flex justify-end">
          <figure className="faq-plate">
            <Image
              src="/images/kinfolk/inner/20-faq-pencil.jpg"
              alt="A plain unstained dark-graphite carpenter pencil with one wood shaving beside the tip, diagonal on cream"
              width={1122}
              height={1402}
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
            {af ? "If your question isn't answered here, write to the\u00A0office." : "If your question isn't answered here, write to the\u00A0office."}
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
    </>
  );
}
