import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ResearchFolio } from "@/components/site/research-folio";
import { offers, partners, site, schemaIds } from "@/lib/site";
import { offersAf, partnersAf, siteAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { chrome, langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const copy = {
  en: {
    meta: {
      title: "Namibian Market Research and Research Notes",
      description:
        "Explore Oryx market research engagements and sourced Namibian research notes. Bring a defined question to the office and read the published work.",
      ogTitle: "Namibian market research and research notes",
      ogDescription:
        "Oryx takes on market research and publishes sourced notes for Namibian decisions.",
    },
    researchLabel: "Research",
    head: {
      title: "Research starts now.",
      lede: "Oryx takes on market-research engagements and publishes notes with their sources.",
    },
    heroFolioAlt:
      "An unmarked folded cream publication mock-up, a pencil and maroon binding thread on a wooden table",
    hireTitle: "Market research for a defined question.",
    bring: "Bring a Market R&D problem",
    how: [
      { k: "The question", v: "The question is written down before a method is discussed." },
      { k: "The evidence", v: "The work identifies the relevant evidence and its sources." },
      { k: "The document", v: "Findings and options are written for the decision at hand." },
    ],
    streamsEyebrow: "Research material",
    notesBody:
      "Published notes show how the work was done and name the sources behind each figure.",
    notesIntro:
      "The notes below are published in English. Each identifies its sources and provides a route to report a correction.",
    fieldLede:
      "Fieldwork notes will be published when fieldwork begins. Until then, the published research notes are available to read.",
    papersLede:
      "Cited papers will be published as the research programme produces them.",
    publicationEyebrow: "Coming soon",
    publicationTitle: "A new Oryx publication is in development.",
    publicationBody:
      "We are working on it now. Its format and first release will be announced here.",
    partnersBody:
      "Technical and venture collaborations are named for the work they support.",
    replyEyebrow: "Research office",
    replyTitle: "Bring a question that needs an answer.",
  },
  af: {
    meta: {
      title: "Namibiese Marknavorsing en Navorsingsnotas",
      description:
        "Verken Oryx se marknavorsingsopdragte en navorsingsnotas met bronne. Bring ’n duidelike vraag na die kantoor en lees die gepubliseerde werk.",
      ogTitle: "Namibiese marknavorsing en navorsingsnotas",
      ogDescription:
        "Oryx neem marknavorsing aan en publiseer notas met bronne vir Namibiese besluite.",
    },
    researchLabel: "Navorsing",
    head: {
      title: "Navorsing begin nou.",
      lede: "Oryx neem marknavorsingsopdragte aan en publiseer notas met hul bronne.",
    },
    heroFolioAlt:
      "’n Ongemerkte gevoude roomkleurige publikasieproef, ’n potlood en maroen binddraad op ’n houttafel",
    hireTitle: "Marknavorsing vir ’n duidelike vraag.",
    bring: "Bring 'n marknavorsingsvraag",
    how: [
      { k: "Die vraag", v: "Die vraag word neergeskryf voordat ’n metode bespreek word." },
      { k: "Die bewyse", v: "Die werk bepaal die toepaslike bewyse en hul bronne." },
      { k: "Die dokument", v: "Bevindings en opsies word vir die betrokke besluit neergeskryf." },
    ],
    streamsEyebrow: "Navorsingsmateriaal",
    notesBody:
      "Gepubliseerde notas wys hoe die werk gedoen is en noem die bronne agter elke syfer.",
    notesIntro:
      "Elke nota noem sy bronne en bied ’n roete om ’n fout te rapporteer.",
    fieldLede:
      "Veldwerknotas sal gepubliseer word wanneer veldwerk begin. Tot dan is die gepubliseerde navorsingsnotas beskikbaar om te lees.",
    papersLede:
      "Aangehaalde studies sal verskyn namate die navorsingsprogram dit lewer.",
    publicationEyebrow: "Kom binnekort",
    publicationTitle: "’n Nuwe Oryx-publikasie is in ontwikkeling.",
    publicationBody:
      "Ons werk nou daaraan. Die formaat en eerste vrystelling sal hier aangekondig word.",
    partnersBody:
      "Tegniese en ondernemingverhoudings word genoem vir die werk wat dit ondersteun.",
    replyEyebrow: "Navorsingskantoor",
    replyTitle: "Bring ’n vraag wat beantwoord moet word.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  const m = copy[lang].meta;
  return pageMetadata({
    lang,
    path: "/research",
    title: m.title,
    description: m.description,
    socialTitle: m.ogTitle,
    socialDescription: m.ogDescription,
    image: { url: "/brand/og/research.png", width: 1200, height: 630, alt: m.ogTitle },
  });
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
      name: "Market research and development",
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

      {/* Three photographic planes make the research opening tangible: field
          table behind, ledger detail in the middle and a paper folio in front.
          The title sits on its own local sheet, never a full-frame dark wash. */}
      <section className="research-hero" data-sc-act="scrub">
        <div className="research-hero__field" data-sc-parallax="0.24" aria-hidden="true">
          <Image
            src="/images/editorial/research-ground-table.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="research-hero__ledger" data-sc-parallax="-0.12" aria-hidden="true">
          <Image
            src="/images/editorial/research-ledger-detail.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 42vw, 0px"
            className="object-cover"
          />
        </div>
        <div className="research-hero__folio" data-sc-parallax="0.08" aria-hidden="true">
          <Image
            src="/images/editorial/research-publication-coming-soon.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 34vw, 68vw"
            className="object-cover"
          />
        </div>
        <div className="shell research-hero__content">
          <div className="research-hero__paper" data-sc-in>
            <p className="eyebrow eyebrow--ink">{t.researchLabel}</p>
            <h1 className="research-hero__title">{t.head.title}</h1>
            <p className="research-hero__lede">{t.head.lede}</p>
            <Link href={A("/apply")} className="btn mt-8">
              {t.bring} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* A concise method chapter before the held material act. */}
      <section className="research-question section" data-sc-act="flow">
        <div className="shell research-question__grid">
          <div data-sc-reveal>
            <h2 className="h-section max-w-[20ch]">{t.hireTitle}</h2>
            <p className="measure mt-6 text-soft">{marketRnD?.body}</p>
            <Link href={A("/apply")} className="btn mt-8">
              {t.bring} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
          <ol className="research-question__steps" data-sc-in data-sc-stagger="100">
            {t.how.map((h) => (
              <li key={h.k}>
                <span>{h.k}</span>
                <p>{h.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Each row gets a held reading moment. Without motion, the same rows
          remain in ordinary document flow over the field-note image. */}
      <section className="research-materials" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div className="research-materials__media" data-sc-scale aria-hidden="true">
            <Image
              src="/images/kinfolk/inner/24-research-field-notes.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="shell research-materials__content">
            <div className="research-materials__panel" data-sc-rows>
              <p className="eyebrow eyebrow--ink">{t.streamsEyebrow}</p>
              <article data-sc-row>
                <h2 className="h-section">{af ? "Notas" : "Notes"}</h2>
                <p>{t.notesBody}</p>
              </article>
              <article data-sc-row>
                <h2 className="h-section">{af ? "Veldwerk" : "Fieldwork"}</h2>
                <p>{t.fieldLede}</p>
              </article>
              <article data-sc-row>
                <h2 className="h-section">{af ? "Studie" : "Papers"}</h2>
                <p>{t.papersLede}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <ResearchFolio
        eyebrow={t.publicationEyebrow}
        title={t.publicationTitle}
        body={t.publicationBody}
        alt={t.heroFolioAlt}
      />

      {/* A material cut before the dated work. It carries no information beyond
          the page rhythm, so it remains hidden from assistive technology. */}
      <div className="divider research-divider overflow-hidden" data-sc-act="flow" aria-hidden="true">
        <div className="absolute inset-[-10%]" data-sc-parallax="0.45">
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

      {/* Dated notes stay in continuous, unpinned reading order. */}
      <section className="research-notes section" id="notes" data-sc-act="flow">
        <div className="shell">
          <div className="research-notes__intro hair-t pt-14">
            <p className="measure text-soft">
              {af ? `${chrome.af.researchNotesInEnglish} ${t.notesIntro}` : t.notesIntro}
            </p>
          </div>
          <div className="mt-12 grid gap-16">
            {insights.map((a) => (
              <article
                id={`note-${a.id}`}
                key={a.id}
                className="research-note hair-t grid gap-8 pt-10 scroll-mt-28 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16"
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

      <section className="research-partners section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14" data-sc-in>
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
        </div>
      </section>

      {/* The reply slip resolves the page around the same factual action used
          at entry. It is a close, not a second offer or a false contact form. */}
      <section className="research-reply" data-sc-act="pin" data-sc-span="1.8">
        <div className="sc-stage" data-sc-stage>
          <div className="research-reply__media" data-sc-scale aria-hidden="true">
            <Image
              src="/images/editorial/research-ledger-detail.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="shell research-reply__content">
            <div className="research-reply__slip" data-sc-scrim>
              <p className="eyebrow eyebrow--ink">{t.replyEyebrow}</p>
              <h2 className="h-section mt-3 max-w-[18ch]">{t.replyTitle}</h2>
              <p className="measure mt-6 text-soft">{marketRnD?.body}</p>
              <Link href={A("/apply")} className="btn mt-8">
                {t.bring} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
