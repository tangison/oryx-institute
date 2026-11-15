import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { offers, partners, site, schemaIds } from "@/lib/site";
import { offersAf, partnersAf, siteAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { alternates, langFromParams } from "@/lib/i18n";
import { chrome } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Research & Development",
      description:
        "Research and development at Oryx Institute: market research engagements, published research notes and factual relationship disclosures.",
      ogTitle: "Research & Development | Oryx Institute",
      ogDescription:
        "Market research engagements, published research notes and factual relationship disclosures.",
    },
    head: {
      title: "Research runs from day one.",
      lede: "Evidence before money moves: for clients and for the institute's own decisions. Market research is taken on per engagement, and published notes state their sources.",
    },
    hireTitle: "The market side of the desk.",
    bring: "Bring a Market R&D problem",
    whatRuns: "See the Practice",
    how: [
      { k: "1 · The question.", v: "Written down as it stands, before any method is discussed." },
      { k: "2 · The ground.", v: "Evidence gathered on Namibian ground, sources named." },
      { k: "3 · The document.", v: "Written to be used: findings, options, and the decision they support. Not shelved." },
    ],
    streamsEyebrow: "Three streams",
    notesBody:
      "Published research notes on the numbers, the method and the tools. Every figure carries its source, or it does not ship.",
    read: "Read",
    readNotes: "Read the research notes",
    fieldLede:
      "Fieldwork notes open when fieldwork starts. The published research notes carry the writing until then.",
    papersLede:
      "Cited papers publish as the research programme produces them. None exist yet; none are claimed.",
    quote: "Evidence is useful only when it changes the next decision.",
    quoteMeta: "Oryx research principle",
    researchersBody:
      "Research is published in an Oryx office voice. Named contributors will appear only with their work and their permission.",
    partnersBody:
      "Named technical and venture collaborations, stated for the work they support and not enlarged into accreditation or endorsement.",
  },
  af: {
    meta: {
      title: "Navorsing en ontwikkeling",
      description:
        "Navorsing en ontwikkeling by Oryx Instituut: marknavorsingsopdragte, gepubliseerde navorsingsnotas en feitelike verhoudingverklarings.",
      ogTitle: "Navorsing en ontwikkeling | Oryx Instituut",
      ogDescription:
        "Marknavorsingsopdragte, gepubliseerde navorsingsnotas en feitelike verhoudingverklarings.",
    },
    head: {
      title: "Navorsing begin op dag een.",
      lede: "Bewyse voordat geld beweeg: vir kliënte en vir die instituut se eie besluite. Marknavorsing word per opdrag aangepak en gepubliseerde notas noem hul bronne.",
    },
    hireTitle: "Die markkant van die lessenaar.",
    bring: "Bring 'n marknavorsingsvraag",
    whatRuns: "Sien die praktyk",
    how: [
      { k: "1 · Die vraag.", v: "Neergeskryf soos dit staan, voordat enige metode bespreek word." },
      { k: "2 · Die grond.", v: "Bewyse op Namibiese grond versamel, met genoemde bronne." },
      { k: "3 · Die dokument.", v: "Vir gebruik geskryf: bevindings, opsies en die besluit wat dit ondersteun." },
    ],
    streamsEyebrow: "Drie strome",
    notesBody:
      "Gepubliseerde navorsingsnotas oor die syfers, metode en gereedskap. Elke syfer dra sy bron, of dit verskyn nie.",
    read: "Lees",
    readNotes: "Lees die navorsingsnotas",
    fieldLede:
      "Veldwerknotas open wanneer veldwerk begin. Die gepubliseerde navorsingsnotas dra die skryfwerk tot dan.",
    papersLede:
      "Aangehaalde studies verskyn namate die navorsingsprogram dit lewer. Geen bestaan nog nie en geen word beweer nie.",
    quote: "Bewyse is slegs nuttig wanneer dit die volgende besluit verander.",
    quoteMeta: "Oryx-navorsingsbeginsel",
    researchersBody:
      "Navorsing word in 'n Oryx-kantoorstem gepubliseer. Genoemde bydraers verskyn slegs saam met hul werk en toestemming.",
    partnersBody:
      "Genoemde tegniese en ondernemingverhoudings word gestel vir die werk wat dit ondersteun en nie vergroot tot akkreditasie of onderskrywing nie.",
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
    alternates: alternates(lang, "/research", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/research`,
      images: [
        {
          url: "/brand/og/research.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const marketRnD = (af ? offersAf : offers).find((o) => o.id === "market-rd");
  const partnerNote = (id: string) =>
    af ? partnersAf.find((p) => p.id === id)?.note : partners.find((p) => p.id === id)?.note;
  const A = (path: string) => (af ? `/af${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.meta.ogTitle,
    url: `${site.url}${A("/research")}`,
    description: t.meta.description,
    isPartOf: { "@type": "WebSite", "@id": schemaIds.website },
    about: {
      "@type": "Service",
      name: af ? "Market research and development" : "Market research and development",
      provider: {
        "@type": "EducationalOrganization",
        "@id": schemaIds.org,
        name: site.legalName,
      },
      areaServed: af ? siteAf.areaServed : site.areaServed,
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

      {/* The hero plate: a dedicated fieldwork arrangement, full measure,
          drifting at a gentle rate. Research starts with method, not a
          reused brand specimen. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure className="plate-fig" data-sc-parallax="0.18">
            <Image
              src="/images/editorial/research-ground-table.jpg"
              alt="Calipers, a stone sample, a pencil and a blank card on a weathered outdoor worktable"
              width={1264}
              height={848}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* For hire, the market side of the desk */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div data-sc-in data-sc-stagger="70">
            <h2 className="h-section max-w-[20ch]">{t.hireTitle}</h2>
            <p className="measure mt-6 text-soft">{marketRnD?.body}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href={A("/apply")} className="btn">
                {t.bring}
              </Link>
              <Link href={A("/practice")} className="btn--quiet">
                {t.whatRuns} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="panel p-8 md:p-10" data-sc-in>
            <ol className="grid gap-5 text-[0.98rem] leading-relaxed text-soft">
              {t.how.map((h) => (
                <li key={h.k}>
                  <span className="font-[500] text-ink">{h.k}</span> {h.v}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The three streams, hairline rows, one by one, with the field
          notes beside them: the work as it is actually kept. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,20rem)_1.15fr] lg:items-start">
          <figure className="plate-fig" data-sc-reveal>
            <Image
              src="/images/kinfolk/inner/24-research-field-notes.jpg"
              alt="A spread of handwritten field notes with a pencil, centred on cream"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 20rem, 88vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div>
            <p className="eyebrow eyebrow--ink">{t.streamsEyebrow}</p>
            <div className="ledger mt-8" data-sc-in data-sc-stagger="80">
              <div className="ledger-row">
                <p className="ledger-date">{af ? "Notas" : "Notes"}</p>
                <p className="max-w-[62ch] text-soft">{t.notesBody}</p>
              </div>
              <div className="ledger-row">
                <p className="ledger-date">{af ? "Fieldwork" : "Fieldwork"}</p>
                <p className="max-w-[62ch] text-soft">{t.fieldLede}</p>
              </div>
              <div className="ledger-row">
                <p className="ledger-date">{af ? "Papers" : "Papers"}</p>
                <p className="max-w-[62ch] text-soft">{t.papersLede}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page breath: a single caliper detail, no text or overlay. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/inner/17-brass-calipers.jpg"
            alt=""
            width={1122}
            height={1402}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The peak: a research principle, held over a field-ledger plate. */}
      <section
        className="peak"
        data-sc-act="pin"
        data-sc-span="2"
      >
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale aria-hidden="true">
            <Image
              src="/images/editorial/research-ledger-detail.jpg"
              alt=""
              width={1264}
              height={848}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="shell flex h-full flex-col justify-center py-24">
            <figure data-sc-scrim>
              <blockquote className="pull-quote max-w-[24ch]">
                {t.quote}
              </blockquote>
              <figcaption className="meta mt-8">{t.quoteMeta}</figcaption>
              <Link
                href={A("/research#notes")}
                className="btn--quiet mt-8"
              >
                {t.readNotes}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </figure>
          </div>
        </div>
      </section>

      {/* Published research notes live with the research programme, not
          inside a separate resource library. They remain English-first,
          with the Afrikaans page making that visible. */}
      <section className="section" id="notes" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">
              {af ? `${chrome.af.researchNotesInEnglish} ${t.notesBody}` : t.notesBody}
            </p>
          </div>
          <div className="mt-12 grid gap-16">
            {insights.map((a) => (
              <article
                id={`note-${a.id}`}
                key={a.id}
                className="hair-t grid gap-8 pt-10 scroll-mt-28 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16"
                data-sc-in
              >
                <div>
                  <p className="eyebrow">{a.no}</p>
                  <p className="meta mt-3">{a.date}</p>
                  <a
                    href="mailto:info@oryxinstitute.org?subject=Research%20note%20correction"
                    className="link-type meta mt-6 inline-block"
                  >
                    {af ? "Rapporteer 'n fout" : "Report an error"}
                  </a>
                </div>
                <div className="min-w-0">
                  <h2 className="h-section max-w-[26ch]">{a.title}</h2>
                  <p className="lede measure mt-5 text-soft">{a.dek}</p>
                  <div className="article mt-8">
                    {a.body.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners: named in text, carried as prose rows. The marks
          are gone: the credit is a line, not a logo
          (CONTENT-CORRECTIONS §5). */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">{t.partnersBody}</p>
          </div>
          <div className="ledger mt-12" data-sc-in data-sc-stagger="80">
            {partners.map((p) => (
              <div className="ledger-row" key={p.id}>
                <p className="ledger-date">{af ? "Verhouding" : "Relationship"}</p>
                <div>
                  <h3 className="h-sub">{p.name}</h3>
                  <p className="mt-2 max-w-[60ch] text-soft">{partnerNote(p.id)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hair-t mt-16 pt-10" data-sc-in>
            <Link href={A("/research#notes")} className="btn--quiet">
              {t.readNotes} <span className="arr" aria-hidden="true">→</span>
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
