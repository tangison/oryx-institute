import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { offers, site } from "@/lib/site";
import { offersAf, siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

/**
 * The practice states current commercial work plainly. Learning pathways
 * remain future-facing until formal approvals are confirmed.
 */
const copy = {
  en: {
    meta: {
      title: "Practice at Oryx Institute",
      description:
        "The practice at Oryx Institute: business counselling and market research, with future learning pathways stated separately from current work.",
      ogTitle: "Practice | Oryx Institute",
      ogDescription:
        "Business counselling and market research, with future learning pathways stated honestly.",
    },
    heroLine: "Practice.",
    heroSub: "Business counselling and market research with a defined scope and written outcome.",
    runsTitle: "What the practice runs.",
    holdsTitle: "The outcome is written down.",
    holdsBody: [
      "Counselling sessions end with a written record of the decision and the next step. Research engagements end with findings, options and the decision they support.",
      "The Oryx office confirms fees and scope when you enquire.",
    ],
    kitEyebrow: "How the work is kept",
    kitBody:
      "The practice uses ordinary, named tools: a metre rule, a bench, a published office stack and notebooks kept by the institute.",
    standsEyebrow: "Where the practice stands",
    standsBody:
      "The current practice is fee-for-service business counselling and market research. Oryx is working toward NTA training-provider registration. Formal vocational learning will be published after the relevant approvals are confirmed.",
    apprenticeship:
      "Future learning remains in development.",
    enquire: "Enquire about the Practice",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
  },
  af: {
    meta: {
      title: "Praktyk by Oryx Instituut",
      description:
        "Die praktyk by Oryx Instituut: besigheidsadvies en marknavorsing, met toekomstige leerpaaie apart van huidige werk gestel.",
      ogTitle: "Praktyk | Oryx Instituut",
      ogDescription:
        "Besigheidsadvies en marknavorsing, met toekomstige leerpaaie eerlik gestel.",
    },
    heroLine: "Praktyk.",
    heroSub: "Besigheidsadvies en marknavorsing met ’n duidelike omvang en skriftelike uitkoms.",
    runsTitle: "Wat die praktyk doen.",
    holdsTitle: "Die uitkoms word neergeskryf.",
    holdsBody: [
      "Adviesgesprekke eindig met ’n skriftelike rekord van die besluit en die volgende stap. Navorsingsopdragte eindig met bevindings, opsies en die besluit wat dit ondersteun.",
      "Die Oryx-kantoor bevestig fooie en omvang wanneer jy navraag doen.",
    ],
    kitEyebrow: "Hoe die werk gehou word",
    kitBody:
      "Die praktyk gebruik gewone, benoemde gereedskap: ’n meterliniaal, ’n bank, ’n gepubliseerde kantoorstapel en notaboeke wat deur die instituut gehou word.",
    standsEyebrow: "Waar die praktyk staan",
    standsBody:
      "Die huidige praktyk is besigheidsadvies en marknavorsing teen vergoeding. Oryx werk aan NTA-opleidingsverskafferregistrasie. Formele beroepsleer sal gepubliseer word nadat die toepaslike goedkeurings bevestig is.",
    apprenticeship:
      "Toekomstige leer bly in ontwikkeling.",
    enquire: "Doen navraag oor die praktyk",
    writeOffice: "Skryf aan die kantoor",
    readFaq: "Lees die vrae",
    enLedger: { paras: [] as string[] },
  },
} as const;

/** The current practice offers, by id. */
const PRACTICE_IDS = ["owners-desk", "market-rd"] as const;

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
      url: `${site.url}${lang === "af" ? "/af" : ""}/practice`,
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
    isPartOf: { "@type": "WebSite", "@id": `${site.url}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The head, on cream: the proposition in type, stated plainly. */}
      <section className="section-lg screen-intro" data-sc-act="flow">
        <div className="shell">
          <h1 className="h-display max-w-[14ch]">{t.heroLine}</h1>
          <p className="lede measure mt-6 text-soft">{t.heroSub}</p>
        </div>
      </section>

      {/* Current practice offers, in factual hairline rows. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.runsTitle}</h2>
          <div className="offers mt-14" data-sc-in data-sc-stagger="80">
            {rows.map((o) => (
              <div className="offer" key={o.id} id={o.id}>
                <div className="offer-main">
                  <h3 className="offer-name">{o.name}</h3>
                  <p className="offer-line">
                    {o.line}{" "}
                    <Link href={A("/apply")} className="offer-cta">
                      {t.enquire}{" "}
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

      {/* The working kit, held in a quiet object study rather than a
          hand-led scene, unmasking from its left edge. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16 lg:gap-24">
          <figure
            className="plate-fig md:order-2"
            data-sc-reveal
          >
            <Image
              src="/images/kinfolk/core/04-notebook.jpg"
              alt={af ? "’n Leë maroen notaboek op roompapier" : "A blank maroon notebook on cream paper"}
              width={1402}
              height={1122}
              sizes="(min-width: 768px) 20rem, 88vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div className="md:order-1" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.kitEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.kitBody}</p>
          </div>
        </div>
      </section>

      {/* What the practice holds. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <h2 className="h-section max-w-[20ch]">{t.holdsTitle}</h2>
          {t.holdsBody.map((p, i) => (
            <p key={i} className="measure mt-6 text-soft">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* The close: the wrench plate, full measure, drifting at its
          own rate. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.18">
            <Image
              src="/images/kinfolk/inner/23-practice-wrench.jpg"
              alt={
                af ? "A clean single-end wrench, centred on cream paper" : "A clean single-end wrench, centred on cream paper"
              }
              width={1402}
              height={1122}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      {/* Where the practice stands: the NTA sentence, exact. */}
      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-in>
          <div className="panel p-8 md:p-10">
            <p className="eyebrow eyebrow--ink">{t.standsEyebrow}</p>
            <p className="measure mt-5 text-soft">{t.standsBody}</p>
          </div>
        </div>
      </section>

      {/* The apprenticeship bench, stated as not ready. */}
      <section className="section" data-sc-act="flow">
        <div className="shell" data-sc-in>
          <p className="lede measure">{t.apprenticeship}</p>
        </div>
      </section>

      {/* The close: one public enquiry route. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell hair-t pt-14" data-sc-in>
          <div className="flex flex-wrap items-center gap-5">
            <Link href={A("/apply")} className="btn">
              {t.enquire}
            </Link>
            <a href={`mailto:${site.email}`} className="btn--quiet">
              {t.writeOffice} <span className="arr" aria-hidden="true">→</span>
            </a>
            <Link href={A("/faq")} className="btn--quiet">
              {t.readFaq} <span className="arr" aria-hidden="true">→</span>
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
