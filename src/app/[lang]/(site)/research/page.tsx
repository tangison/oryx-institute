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
    bring: "Bring a Market R&D problem",
    whatRuns: "See the Practice",
    how: [
      { k: "1 · The question.", v: "Written down as it stands, before any method is discussed." },
      { k: "2 · The ground.", v: "Evidence gathered on Namibian ground, sources named." },
      { k: "3 · The document.", v: "Written to be used: findings, options, and the decision they support. Not shelved." },
    ],
    streamsEyebrow: "Three streams",
    bulletinBody:
      "Cited essays on the numbers, the method and the tools, written the way the institute teaches: evidence first, decoration never. Every figure carries its source, or it does not\u00A0ship.",
    read: "Read",
    readBulletin: "Read the Bulletin",
    fieldLede:
      "Fieldwork notes open when fieldwork starts. The Bulletin carries the writing until then.",
    papersLede:
      "Cited papers publish as the research programme produces them. None exist yet; none are claimed.",
    quote: "Entrepreneurship is not a subject at Oryx. It is the exit\u00A0exam.",
    quoteMeta: "Bulletin No. 4 · Why every course here ends in a venture",
    researchersBody:
      "The research register at launch is one desk wide. It widens as researchers join, and each one is named here when they do.",
    principalBody:
      "Principal of the institute. Reads every application personally, writes the Bulletin's register, and holds the desk the research runs from.",
    partnersBody:
      "Named, and by their own marks: the collaborations the research runs with, carried as the partners print them.",
  },
  af: {
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
    bring: "Bring a Market R&D problem",
    whatRuns: "See the Practice",
    how: [
      { k: "1 · The question.", v: "Written down as it stands, before any method is discussed." },
      { k: "2 · The ground.", v: "Evidence gathered on Namibian ground, sources named." },
      { k: "3 · The document.", v: "Written to be used: findings, options, and the decision they support. Not shelved." },
    ],
    streamsEyebrow: "Three streams",
    bulletinBody:
      "Cited essays on the numbers, the method and the tools, written the way the institute teaches: evidence first, decoration never. Every figure carries its source, or it does not\u00A0ship.",
    read: "Read",
    readBulletin: "Read the Bulletin",
    fieldLede:
      "Fieldwork notes open when fieldwork starts. The Bulletin carries the writing until then.",
    papersLede:
      "Cited papers publish as the research programme produces them. None exist yet; none are claimed.",
    quote: "Entrepreneurship is not a subject at Oryx. It is the exit\u00A0exam.",
    quoteMeta: "Bulletin No. 4 · Why every course here ends in a venture",
    researchersBody:
      "The research register at launch is one desk wide. It widens as researchers join, and each one is named here when they do.",
    principalBody:
      "Principal of the institute. Reads every application personally, writes the Bulletin's register, and holds the desk the research runs from.",
    partnersBody:
      "Named, and by their own marks: the collaborations the research runs with, carried as the partners print them.",
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
  /* The quote pin points at Bulletin No. 4; the accessible name of its
     read link names the essay it opens. */
  const quoteEssay =
    insights.find((i) => i.id === "why-every-course-ends-in-a-venture")
      ?.title ?? "";
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
              <Link href={A("/apply/market-rd")} className="btn">
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
                <p className="ledger-date">Bulletin</p>
                <p className="max-w-[62ch] text-soft">{t.bulletinBody}</p>
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

      {/* The peak: the Bulletin quote, pinned for two viewports on
          a dedicated closed field-ledger plate: the working record held back until the evidence is ready. */}
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
                href={A("/resources#bulletin-why-every-course-ends-in-a-venture")}
                className="btn--quiet mt-8"
              >
                {af ? "Read the essay" : "Read the essay"}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </figure>
          </div>
        </div>
      </section>

      {/* The Bulletin, the published writing. The essays are the works
          themselves: they publish in English, and the AF page says so. */}
      <section className="section" data-sc-act="flow">
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
                  {/* The title is the link: one row, one door, the register
                      the Directory pages keep. */}
                  <h3 className="news-title">
                    <Link href={A(`/resources#bulletin-${a.id}`)}>{a.title}</Link>
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-soft">{a.dek}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research-context divider: the game plays out to an outcome.
          No text, no overlay. */}

      {/* Researchers, the Principal, at launch */}
      <section className="section" data-sc-act="flow">
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
              {/* Awaiting the founder: swap the shield emblem for the
                  Principal's portrait when the Windhoek photoshoot lands. */}
              <div className="grid place-items-center bg-white border-b border-rule p-14">
                <OryxLogo
                  variant="emblem"
                  tone="brand"
                  loading="lazy"
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
                <p className="ledger-date">{af ? "Partner" : "Partner"}</p>
                <div>
                  <h3 className="h-sub">{p.name}</h3>
                  <p className="mt-2 max-w-[60ch] text-soft">{partnerNote(p.id)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hair-t mt-16 pt-10" data-sc-in>
            <Link href={A("/resources#bulletin")} className="btn--quiet">
              {t.readBulletin} <span className="arr" aria-hidden="true">→</span>
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
