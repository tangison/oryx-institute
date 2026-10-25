import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { ventures, site, schemaIds } from "@/lib/site";
import { venturesAf, siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Ventures",
      description:
        "Ventures are the proof: small operating companies Oryx Institute opens to test sectors. Corner Spa, wellness and service operations, is the first live lab.",
      ogTitle: "Ventures | Oryx Institute",
      ogDescription:
        "Small operating companies the institute opens to test sectors. Corner Spa is the first.",
      ldName: "Ventures",
      ldDescription:
        "The ventures engine at Oryx Institute: small operating companies opened to test sectors, starting with Corner Spa.",
    },
    exitEyebrow: "The exit exam",
    exitLede:
      "A venture cannot be faked. It works or it doesn't. A customer pays or doesn't.",
    exitBody:
      "Every course the institute teaches ends in something that works and something that sells. The ventures engine is the institute holding itself to its own exit exam: small companies, run to standard, their openings dated in the public register.",
    nextEyebrow: "Next",
    readRegister: "Read the register in the news",
    closeTitle: "A sector you think Oryx should test?",
    closeBody:
      "The office reads venture ideas the same way it reads applications: one message, answered personally. If the fit is real, the conversation starts there.",
    writeOffice: "Write to the office",
  },
  af: {
    meta: {
      title: "Ondernemings",
      description:
        "Ondernemings is die bewys: klein bedrywende maatskappye wat Oryx Instituut open om sektors toets. Corner Spa, welstand en diensbedrywighede, is die eerste lewende laboratorium.",
      ogTitle: "Ondernemings | Oryx Instituut",
      ogDescription:
        "Klein bedrywende maatskappye wat die instituut open om sektors toets. Corner Spa is die eerste.",
      ldName: "Ondernemings",
      ldDescription:
        "Die ondernemingsenjin by Oryx Instituut: klein bedrywende maatskappye geopen om sektors toets, beginnende met Corner Spa.",
    },
    exitEyebrow: "Die uitgangseksamen",
    exitLede:
      "'n Onderneming kan nie geveins word nie. Dit werk, of dit werk nie. 'n Kliënt betaal, of nie.",
    exitBody:
      "Elke kursus wat die instituut onderrig eindig in iets wat werk en iets wat verkoop. Die ondernemingsenjin is die instituut wat homself aan sy eie uitgangseksamen hou: klein maatskappye, tot standaard bedryf, hulle openings gedateer in die openbare register.",
    nextEyebrow: "Volgende",
    readRegister: "Lees die register in die nuus",
    closeTitle: "'n Sektor wat jy dink Oryx moet toets?",
    closeBody:
      "Die kantoor lees ondernemingsidees op dieselfde manier as aansoeke: een boodskap, persoonlik geantwoord. As die pas reg is, begin die gesprek daar.",
    writeOffice: "Skryf aan die kantoor",
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
    alternates: alternates(lang, "/ventures", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/brand/og/ventures.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function VenturesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const v = af ? venturesAf : ventures;
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ldName,
    url: `${site.url}${A("/ventures")}`,
    description: t.meta.ldDescription,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: { "@type": "Organization", "@id": schemaIds.org },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHead eyebrow={t.meta.ldName} title={v.lead}>
        <p>{v.body}</p>
      </PageHead>

      {/* Corner Spa, the first venture, on its own palette */}
      <section className="section-lg">
        <div className="shell">
          <div className="quiet-card lg:grid lg:grid-cols-[minmax(0,30rem)_1fr]" data-sc-in>
            <figure
              className="relative min-h-[20rem] overflow-hidden lg:min-h-full"
              style={{ background: "var(--sand)" }}
              data-sc-act="flow"
            >
              <div className="absolute inset-[-6%]" data-sc-parallax="0.5">
                <Image
                  src="/images/kinfolk/k08-spa.jpg"
                  alt="Folded linen, stone and a candle on a warm counter"
                  fill
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="p-8 md:p-12 lg:p-14">
              <p className="offer-tag">{v.cornerSpa.status}</p>
              <h2 className="h-section mt-4">{v.cornerSpa.name}</h2>
              <p className="lede mt-4 text-soft">{v.cornerSpa.line}</p>
              <p className="measure mt-6 text-soft">{v.cornerSpa.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What a venture is, and what comes next */}
      <section className="section-lg">
        <div className="shell grid gap-12 md:grid-cols-2" data-sc-in data-sc-stagger="80">
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.exitEyebrow}</p>
            <p className="lede measure mt-6">{t.exitLede}</p>
            <p className="measure mt-6 text-soft">{t.exitBody}</p>
          </div>
          <div className="hair-t pt-14">
            <p className="eyebrow eyebrow--ink">{t.nextEyebrow}</p>
            <p className="lede measure mt-6">{v.futureLine}</p>
            <div className="mt-8">
              <Link href={A("/news")} className="btn--quiet">
                {t.readRegister} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="cta-band section-lg on-ink">
        <div className="shell" data-sc-in data-sc-stagger="80">
          <h2 className="h-section max-w-[18ch]">{t.closeTitle}</h2>
          <p className="mt-6 max-w-[52ch] text-ivory-80">{t.closeBody}</p>
          <div className="mt-10">
            <a href={`mailto:${site.email}`} className="btn">
              {t.writeOffice}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
