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
  },
  af: {
    meta: {
      title: "Vrae en Antwoorde",
      description:
        "Aansoek doen by Oryx Instituut, die programme, die betekenis van 理工, ondernemings, die sertifikaat en waar die kantoor in Windhoek te vinde is.",
      ogTitle: "Gereelde vrae | Oryx Instituut",
      ogDescription: "Aansoeke, programme, ondernemings, die sertifikaat en die kantoor, geantwoord.",
      ldName: "Gereelde vrae, Oryx Instituut",
    },
    headTitle: "Vrae, geantwoord.",
    headLede:
      "Wat aansoekers vra voordat hulle skryf. Enigiets anders, sit dit in die aansoekboodskap self: die Prinsipaal se kantoor antwoord direk.",
    writeOffice: "Skryf aan die kantoor",
    applyNow: "Skryf nou in",
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

      {/* The horns, small, beside the questions. */}
      <section className="section-sm" data-sc-act="flow" data-sc-in>
        <div className="shell">
          <figure className="faq-plate">
            <Image
              src="/images/core/09-horns.jpg"
              alt="Two shed oryx horns, crossed, centred on cream paper"
              width={1122}
              height={1402}
              sizes="(min-width: 1024px) 18rem, min(70vw, 22rem)"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="section-lg">
        <div className="shell">
          <div className="faq-list" data-sc-in data-sc-stagger="40">
            {list.map((faq) => (
              <details key={faq.q} name="faq">
                <summary>
                  <span>{faq.q}</span>
                  <span className="faq-sign" aria-hidden="true">+</span>
                </summary>
                <p className="faq-a">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-6" data-sc-in>
            <a href={`mailto:${site.email}`} className="btn">
              {t.writeOffice}
            </a>
            <Link href={A("/apply")} className="btn--quiet">
              {t.applyNow} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
