import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { offers, site, schemaIds } from "@/lib/site";
import { offersAf, siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * The practice, on its own page: counselling, market R&D and
 * rapid response training. The maker's hands open the page as the
 * pinned peak; the offers run as hairline rows; the wood and rope
 * close the argument.
 */
const copy = {
  en: {
    meta: {
      title: "Practice",
      description:
        "The practice at Oryx Institute: Owner's Desk counselling, market R&D, and Rapid Response Training, delivered to Namibian standards from Windhoek.",
      ogTitle: "Practice | Oryx Institute",
      ogDescription:
        "Owner's Desk counselling, market R&D, and Rapid Response Training, delivered to standard.",
    },
    head: {
      title: "Practice.",
      lede: "The practice: one-on-one counselling, market research and development, and rapid response training, run from the Principal's office in Windhoek beside the teaching departments. Delivered to Namibian standards.",
    },
    peakLine:
      "Work measured and finished to standard, with every tool named.",
    runsTitle: "What the practice runs.",
    holdsTitle: "The outcome is written down.",
    holdsBody: [
      "Every engagement ends the same way: on paper. Counselling sessions close with what was decided and what happens next, written down. Research engagements close with findings, options and the decision they support, gathered on Namibian ground with sources named. Training engagements close with a programme structured around the need that asked for it, delivered by the industry expert the need calls for.",
      "Nothing here promises a credential; the promise is the work itself. Fees are confirmed by the Principal's office at the point of enquiry, and the first reply names what the institute can and cannot do for you.",
    ],
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
  },
  af: {
    meta: {
      title: "Praktyk",
      description:
        "Die praktyk by Oryx Instituut: Eienaar se Lessenaar-berading, marknavorsing, en spoedreaksie-opleiding, volgens Namibiese standaarde gelewer vanuit Windhoek.",
      ogTitle: "Praktyk | Oryx Instituut",
      ogDescription:
        "Eienaar se Lessenaar-berading, marknavorsing, en spoedreaksie-opleiding, tot standaard gelewer.",
    },
    head: {
      title: "Praktyk.",
      lede: "Die praktyk: een-tot-een berading, marknavorsing en -ontwikkeling, en spoedreaksie-opleiding, vanuit die Prinsipaal se kantoor in Windhoek langs die onderrigdepartemente. Volgens Namibiese standaarde gelewer.",
    },
    peakLine:
      "Werk wat gemeet en tot standaard voltooi word, met elke gereedskap by die naam genoem.",
    runsTitle: "Wat die praktyk loop.",
    holdsTitle: "Die uitkoms word neergeskryf.",
    holdsBody: [
      "Elke opdrag eindig op dieselfde manier: op papier. Beradingsessies sluit met wat besluit is en wat volg, neergeskryf. Navorsingsopdragte sluit met bevindinge, opsies en die besluit wat hulle dra, op Namibiese grond bymekaargemaak met bronne genoem. Opleidingsopdragte sluit met 'n program rondom die behoefte wat dit gevra het, gelewer deur die bedryfskenner wat die behoefte roep.",
      "Niks hier belowe 'n kwalifikasie nie; die belofte is die werk self. Fooie word deur die Prinsipaal se kantoor by navraag bevestig, en die eerste antwoord noem wat die instituut vir jou kan en nie kan doen nie.",
    ],
    writeOffice: "Skryf aan die kantoor",
    readFaq: "Lees die gereelde vrae",
  },
} as const;

/** The three practice-facing offers, by id. */
const PRACTICE_IDS = ["owners-desk", "market-rd", "rapid-response"] as const;

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
    alternates: alternates(lang, "/practice", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const all = af ? offersAf : offers;
  const rows = PRACTICE_IDS.map((id) => all.find((o) => o.id === id)!);
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/practice")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
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

      {/* The maker's hands, pinned: the practice stated over the work
          it names. */}
      <section className="peak" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/core/05-hands-peak.jpg"
              alt="A pair of hands mid-task in a shaft of hard daylight"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="peak-scrim" data-sc-scrim>
            <p className="lede">{t.peakLine}</p>
          </div>
        </div>
      </section>

      {/* The practice offers: hairline rows, no images. */}
      <section className="section-lg">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.runsTitle}</h2>
          <div className="offers mt-14" data-sc-in data-sc-stagger="80">
            {rows.map((o) => (
              <div className="offer" key={o.id} id={o.id}>
                <div className="offer-main">
                  <h3 className="offer-name">{o.name}</h3>
                  <p className="offer-line">
                    {o.line}{" "}
                    <Link href={A(o.cta.href)} className="offer-cta">
                      {o.cta.label}{" "}
                      <span className="arr" aria-hidden="true">→</span>
                    </Link>
                  </p>
                  <p className="mt-4 max-w-[56ch] text-soft">{o.body}</p>
                </div>
                <p className="offer-tag">{o.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The practice holds its own weight in type; the manifest v4
          assigns no plate here. TODO image (founder to commission, if
          wanted): a material divider in the site register — e.g. whetstone
          and honing oil on cream, hard upper-left light — to breathe
          between the offers and what the practice holds. */}

      {/* What the practice holds, and the close. */}
      <section className="section-lg">
        <div className="shell">
          <h2 className="h-section max-w-[20ch]">{t.holdsTitle}</h2>
          {t.holdsBody.map((p, i) => (
            <p key={i} className="measure mt-6 text-soft">
              {p}
            </p>
          ))}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href={`mailto:${site.email}`} className="btn">
              {t.writeOffice}
            </a>
            <Link href={A("/faq")} className="btn--quiet">
              {t.readFaq} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
