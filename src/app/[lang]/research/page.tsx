import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/site/page-head";
import { OryxLogo } from "@/components/site/oryx-logo";
import { offers, partners, site, status, schemaIds } from "@/lib/site";
import { offersAf, partnersAf, siteAf, statusAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { alternates, langFromParams } from "@/lib/i18n";
import { chrome } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "Research & Development",
      description:
        "Research and development at Oryx Institute: market R&D for hire, the AI training programme built with Tangison Technologies, and concept work with Mendozer.",
      ogTitle: "Research & Development | Oryx Institute",
      ogDescription:
        "Market R&D for hire, the AI training programme with Tangison Technologies, and concept work with Mendozer.",
    },
    head: {
      title: "Research runs from day one.",
      lede: "Evidence before money moves: for clients, and for the institute's own builds. The same desk does both, market research taken on per engagement, and the programme and product work the institute runs with named partners.",
    },
    hireTitle: "The market side of the desk.",
    bring: "Bring a problem",
    whatRuns: "What runs today",
    how: [
      { k: "1 · The question.", v: "Written down as it stands, before any method is discussed." },
      { k: "2 · The ground.", v: "Evidence gathered on Namibian ground, sources named." },
      { k: "3 · The document.", v: "Written to be used: findings, options, and the decision they support. Not shelved." },
    ],
    bulletinBody:
      "Cited essays on the numbers, the method and the tools, written the way the institute teaches: evidence first, decoration never. Every figure carries its source, or it does not ship.",
    read: "Read",
    fieldLede:
      "Fieldwork notes open when fieldwork starts. The Bulletin carries the writing until then.",
    papersLede:
      "Cited papers publish as the research programme produces them. None exist yet; none are claimed.",
    researchersBody:
      "The research register at launch is one desk wide. It widens as researchers join, and each one is named here when they do.",
    principalBody:
      "Principal of the institute. Reads every application personally, writes the Bulletin's register, and holds the desk the research runs from.",
    partnersBody:
      "Named, and by their own marks: the collaborations the research runs with, carried as the partners print them.",
  },
  af: {
    meta: {
      title: "Navorsing en Ontwikkeling",
      description:
        "Navorsing en ontwikkeling by Oryx Instituut: marknavorsing te huur, die KI-opleidingsprogram saam met Tangison Technologies gebou, en konsepswerk saam met Mendozer.",
      ogTitle: "Navorsing en Ontwikkeling | Oryx Instituut",
      ogDescription:
        "Marknavorsing te huur, die KI-opleidingsprogram saam met Tangison Technologies, en konsepswerk saam met Mendozer.",
    },
    head: {
      title: "Navorsing loop van dag een af.",
      lede: "Bewys voor geld beweeg: vir kliënte, en vir die instituut se eie bouwerke. Dieselfde lessenaar doen albei, marknavorsing per opdrag aangeneem, en die program- en produksiewerk wat die instituut met genoemde vennote loop.",
    },
    hireTitle: "Die markkant van die lessenaar.",
    bring: "Bring 'n probleem",
    whatRuns: "Wat vandag loop",
    how: [
      { k: "1 · Die vraag.", v: "Neergeskryf soos dit staan, voordat enige metode bespreek word." },
      { k: "2 · Die grond.", v: "Bewys op Namibiese grond bymekaargemaak, bronne genoem." },
      { k: "3 · Die dokument.", v: "Geskrewe om gebruik te word: bevindinge, opsies, en die besluit wat hulle dra. Nie geskrap nie." },
    ],
    bulletinBody:
      "Aangehaalde opstelle oor die syfers, die metode en die gereedskap, geskryf soos die instituut onderrig: bewys eerste, versiering nooit. Elke syfer dra sy bron, of dit gaan nie uit nie.",
    read: "Lees",
    fieldLede:
      "Veldwerknotas open wanneer veldwerk begin. Die Bulletin dra die geskrewe tot daardie tyd.",
    papersLede:
      "Aangehaalde verhandelings verskyn namate die navorsingsprogram hulle voortbring. Nog bestaan daar geen; nog word daar geen geëis nie.",
    researchersBody:
      "Die navorsingsregister is by afskop een lessenaar breed. Dit verbreed namate navorsers aansluit, en elkeen word hier genoem sodra dit gebeur.",
    principalBody:
      "Prinsipaal van die instituut. Lees elke aansoek persoonlik, skryf die Bulletin se register, en hou die lessenaar waarvandaan die navorsing loop.",
    partnersBody:
      "Genoem, en met hulle eie merke: die samewerkings waarby die navorsing loop, gedra soos die vennote hulle druk.",
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
  const devList = af ? statusAf.inDevelopment : status.inDevelopment;
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
      name: af ? "Marknavorsing en -ontwikkeling" : "Market research and development",
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

      {/* The research register, opened at its own desk: the notebook,
          centred, held still. */}
      <section className="section-sm" data-sc-act="flow" data-sc-in>
        <div className="shell">
          <figure className="plate-fig">
            <Image
              src="/images/kinfolk/k05-notebook.jpg"
              alt="A bound maroon notebook with ribbon, centred on cream paper"
              width={1086}
              height={1448}
              sizes="(min-width: 1024px) 56rem, 92vw"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      </section>

      {/* For hire, the market side of the desk */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div data-sc-in data-sc-stagger="70">
            <h2 className="h-section max-w-[20ch]">{t.hireTitle}</h2>
            <p className="measure mt-6 text-soft">{marketRnD?.body}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href={A("/apply?for=market-rd")} className="btn">
                {t.bring}
              </Link>
              <Link href={A("/programmes")} className="btn--quiet">
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

      {/* The Bulletin, the published writing. The essays are the works
          themselves: they publish in English, and the AF page says so. */}
      <section className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">
              {af ? `${chrome.af.bulletinInEnglish} ${t.bulletinBody}` : t.bulletinBody}
            </p>
          </div>
          <div className="ledger mt-12" data-sc-in data-sc-stagger="60">
            {insights.map((a) => (
              <div className="ledger-row" key={a.id}>
                <p className="ledger-date">{a.no}</p>
                <div>
                  <h3 className="news-title">
                    <Link href={A(`/resources#bulletin-${a.id}`)}>{a.title}</Link>
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{a.dek}</p>
                  <Link
                    href={A(`/resources#bulletin-${a.id}`)}
                    className="btn--quiet mt-3"
                  >
                    {t.read} <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The instruments: the theodolite and the ground it reads,
          paired plates, held still. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16">
          <div className="grid grid-cols-2 items-start gap-4 sm:gap-6">
            <figure className="plate aspect-[3/4]">
              <div className="plate-media" data-sc-parallax="0.5">
                <Image
                  src="/images/studio/studio-theodolite.webp"
                  alt="A brass theodolite on its wooden tripod against a clay wall"
                  fill
                  sizes="(min-width: 768px) 12rem, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <figure className="plate mt-10 aspect-[3/4]">
              <div className="plate-media" data-sc-parallax="0.35">
                <Image
                  src="/images/studio/studio-stone.webp"
                  alt="A stone specimen resting on folded linen in hard light"
                  fill
                  sizes="(min-width: 768px) 12rem, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
          <div data-sc-in data-sc-stagger="70">
            <p className="lede measure">{t.fieldLede}</p>
            <p className="lede measure mt-10">{t.papersLede}</p>
          </div>
        </div>
      </section>

      {/* Research-context divider: the game plays out to an outcome.
          No text, no overlay. */}
      <div
        className="divider overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="1.0">
          <Image
            src="/images/kinfolk/k04-red-game.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Researchers, the Principal, at launch */}
      <section className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">{t.researchersBody}</p>
          </div>
          <div
            className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2"
            data-sc-in
            data-sc-stagger="80"
          >
            <div className="quiet-card">
              {/* TODO founder: replace the shield placeholder with the
                  Principal's portrait when the Windhoek photoshoot lands. */}
              <div className="grid place-items-center bg-white border-b border-rule p-14">
                <OryxLogo
                  variant="emblem"
                  tone="brand"
                  className="h-44 w-auto"
                  title=""
                />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="h-sub">
                  {site.principal.name}
                  <span className="ml-3 align-middle text-[0.72rem] font-[500] tracking-[0.14em] uppercase text-soft">
                    {af ? "Prinsipaal" : site.principal.role}
                  </span>
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
                  {t.principalBody}
                </p>
              </div>
            </div>
            <div className="quiet-card p-8 md:p-10">
              <ul className="grid gap-6">
                {devList.map((item) => (
                  <li key={item.name} className="hair-b hair-b--ink pb-6 last:border-0 last:pb-0">
                    <p className="font-[500]">{item.name}</p>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-soft">
                      {item.line}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners: named, carried as their own untampered marks, not
          as outgoing links. */}
      <section className="section-lg">
        <div className="shell">
          <div className="hair-t pt-14">
            <p className="measure text-soft">{t.partnersBody}</p>
          </div>
          <div
            className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2"
            data-sc-in
            data-sc-stagger="80"
          >
            {partners.map((p) => (
              <div key={p.id} className="bg-paper p-8 md:p-10">
                <span
                  className={`inline-flex h-8 items-center ${p.tone === "ink" ? "text-ink" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.id === "mendozer" ? "/partners/mendozer-logo-ink.svg" : p.logo}
                    alt={p.alt}
                    width={p.id === "tangison" ? 1383 : 1024}
                    height={p.id === "tangison" ? 296 : 401}
                    className="h-full w-auto"
                    loading="lazy"
                  />
                </span>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-soft">
                  {partnerNote(p.id)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
