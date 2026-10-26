import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, offers, register, ventures, schemaIds } from "@/lib/site";
import { siteAf, offersAf, registerAf, venturesAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { alternates, langFromParams } from "@/lib/i18n";
import {
  GlyphResearch,
  GlyphPractice,
  GlyphVentures,
} from "@/components/site/glyphs";

function Glyph({ name }: { name: "research" | "practice" | "ventures" }) {
  if (name === "research") return <GlyphResearch className="h-full w-full" />;
  if (name === "practice") return <GlyphPractice className="h-full w-full" />;
  return <GlyphVentures className="h-full w-full" />;
}

/**
 * The homepage, laid out as one scroll composition:
 *
 *   hero (scrub) · positioning (flow) · 03 silent divider (flow) ·
 *   three engines (PIN) · what runs today (flow) · practice peak
 *   (PIN) · research zigzag (flow) · ventures reverse-zigzag (flow) ·
 *   07 silent divider (flow) · the register (flow) · close (PIN) ·
 *   footer.
 *
 * Three pins, two silent dividers, one engineered peak. No device
 * twice in a row. The core plates run in act order: 01, 02, 03, 05,
 * 04, 08, 07, 10 (Image Asset Manifest v4).
 */
const copy = {
  en: {
    meta: {
      title: "A New Polytechnic for Namibia",
      description: site.description,
    },
    positioning:
      "A new polytechnic for Namibia, working from Windhoek. It is prelaunch and pursuing accreditation with the NQA and the NTA, and it says so plainly. Every step is dated on the register below.",
    engines: [
      {
        key: "research" as const,
        name: "Research",
        body: "Fieldwork, bulletin essays, and cited papers on Namibia's working realities. Free before anything is charged.",
        link: "Read",
      },
      {
        key: "practice" as const,
        name: "Practice",
        body: "Crash courses, business counselling, market R&D, rapid response training. Delivered to Namibian standards.",
        link: "See",
      },
      {
        key: "ventures" as const,
        name: "Ventures",
        body: "Small operating companies the institute opens to test sectors. Each one is a live classroom and a live lab.",
        link: "See",
      },
    ],
    /* TODO founder: positioning H2 for the engines block. */
    enginesTitle: "Three engines. One standard.",
    runsTitle: "What runs today.",
    runsBody:
      "Six offers, live from the office in Windhoek. Two teaching departments run crash and short courses only; the practice and the free Directory run beside them. Nothing here promises a credential; every line promises work.",
    researchTitle: "Research runs from day one.",
    researchLine:
      "Research is not a department that opens when buildings arrive. It is why the institute exists.",
    practiceTitle: "Practice.",
    practiceBody:
      "Work that holds. Measured and finished to standard. Every tool named, not magic.",
    venturesTitle: "Ventures are the proof.",
    registerMeta: "Dated. Public. Updated as the work lands.",
    closeTitle: "One email starts it.",
    closeBody:
      "Applications, research enquiries, partnerships, and press begin with one message. The reply is personal. Nothing is committed until both sides agree.",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
    seeWhatRuns: "See what runs now",
    apply: "Apply",
    read: "Read",
    dateTbc: "Date to be confirmed",
  },
  af: {
    meta: {
      title: "'n Nuwe politegniek vir Namibië",
      description: siteAf.description,
    },
    positioning:
      "'n Nuwe politegniek vir Namibië, werkend vanuit Windhoek. Dit is voor lansering en besig met akkreditering by die NQA en die NTA, en sê dit self so. Elke stap is gedateer op die register hieronder.",
    engines: [
      {
        key: "research" as const,
        name: "Navorsing",
        body: "Veldwerk, Bulletin-opstelle, en aangehaalde verhandelings oor Namibië se werklikhede. Gratis voordat enigiets gehef word.",
        link: "Lees",
      },
      {
        key: "practice" as const,
        name: "Praktyk",
        body: "Kondenskursusse, besigheidsberading, marknavorsing, spoedreaksie-opleiding. Volgens Namibiese standaarde gelewer.",
        link: "Sien",
      },
      {
        key: "ventures" as const,
        name: "Ondernemings",
        body: "Klein bedrywende maatskappye wat die instituut open om sektors toets. Elke een is 'n lewende klaskamer en 'n lewende laboratorium.",
        link: "Sien",
      },
    ],
    /* TODO founder: posisionerende H2 vir die enjins-blok. */
    enginesTitle: "Drie enjins. Een standaard.",
    runsTitle: "Wat vandag loop.",
    runsBody:
      "Ses aanbiedings, lewendig vanuit die kantoor in Windhoek. Twee onderrigdepartemente loop kondens- en kortkursusse alleen; die praktyk en die gratis Gids loop langs hulle. Niks hier belowe 'n kwalifikasie nie; elke reël belowe werk.",
    researchTitle: "Navorsing loop van dag een af.",
    researchLine:
      "Navorsing is nie 'n departement wat open wanneer geboue opdaag nie. Dit is hoekom die instituut bestaan.",
    practiceTitle: "Praktyk.",
    practiceBody:
      "Werk wat hou. Gemeet en tot standaard voltooi. Elke gereedskap by die naam genoem, nie as towerkrag nie.",
    venturesTitle: "Ondernemings is die bewys.",
    registerMeta: "Gedateer. Openbaar. Opgedateer namate die werk land.",
    closeTitle: "Een e-pos begin dit.",
    closeBody:
      "Aansoeke, navorsingsnavrae, vennootskappe en die pers begin met een boodskap. Die antwoord is persoonlik. Niks word bevestig voordat albei kante saamstem nie.",
    writeOffice: "Skryf aan die kantoor",
    readFaq: "Lees die gereelde vrae",
    seeWhatRuns: "Sien wat nou loop",
    apply: "Skryf in",
    read: "Lees",
    dateTbc: "Datum moet nog bevestig word",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = langFromParams(await params);
  return {
    title: copy[lang].meta.title,
    description: copy[lang].meta.description,
    alternates: alternates(lang, "/", site.url),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const s = af
    ? {
        heroTag: siteAf.heroTag,
        headline: siteAf.headline,
        heroSub: siteAf.heroSub,
        offers: offersAf,
        register: registerAf,
        ventures: venturesAf,
      }
    : {
        heroTag: site.heroTag,
        headline: site.headline,
        heroSub: site.heroSub,
        offers,
        register,
        ventures,
      };
  const latest = insights[insights.length - 1];
  const engineHref: Record<string, string> = {
    research: af ? "/af/research" : "/research",
    practice: af ? "/af/practice" : "/practice",
    ventures: af ? "/af/ventures" : "/ventures",
  };

  const dateFmt = new Intl.DateTimeFormat(af ? "af" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": schemaIds.org,
        name: site.legalName,
        alternateName: af ? siteAf.tradingName : site.tradingName,
        url: site.url,
        email: site.email,
        foundingDate: "2026",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "NA",
        },
        sameAs: site.socials.map((x) => x.href),
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.website,
        url: site.url,
        name: af ? siteAf.tradingName : site.tradingName,
        publisher: { "@id": schemaIds.org },
        inLanguage: lang,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Hero: the oryx on the terracotta field, three planes moving at
          three rates. The photograph breathes at its own depth; the
          nameplate recedes a hair; the line beneath it drifts. */}
      <section className="hero" data-sc-act="scrub">
        <div className="hero-media" data-sc-parallax="0.45" aria-hidden="true">
          <Image
            src="/images/core/01-hero-oryx.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-content shell">
          <div data-sc-parallax="-0.06">
            <p className="hero-tag">{s.heroTag}</p>
            <h1 className="hero-title mt-5 max-w-[13ch]">{s.headline}</h1>
          </div>
          <div className="mt-6" data-sc-parallax="0.08">
            <p className="hero-sub max-w-[44ch]">{s.heroSub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#what-runs" className="btn btn--cream">
                {t.seeWhatRuns}
              </a>
              <Link
                href={af ? "/af/apply" : "/apply"}
                className="btn btn--cream"
              >
                {t.apply}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning: the sentence, with the stone beside it. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell positioning">
          <p className="lede measure text-ink">{t.positioning}</p>
          <figure className="positioning-plate" data-sc-in>
            <Image
              src="/images/core/02-stone.jpg"
              alt="One weathered stone specimen, centred on cream paper"
              width={1122}
              height={1402}
              sizes="(min-width: 1024px) 22rem, min(78vw, 26rem)"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      {/* First silent divider: wood and rope, a breath before the
          engines. No text, no overlay, one full viewport. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/core/03-wood-rope-divider.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Three engines, pinned: one engine at a time, cross-faded.
          Ink ground, no cards, each engine answers with its page. */}
      <section
        className="on-ink"
        style={{ background: "var(--ink)", color: "var(--ivory)" }}
        data-sc-act="pin"
        data-sc-span="2.5"
      >
        <div className="sc-stage" data-sc-stage>
          <div className="shell flex h-full flex-col justify-center py-24">
            <h2 className="h-section max-w-[18ch]">{t.enginesTitle}</h2>
            <div className="engine-rows mt-16 md:mt-24" data-sc-rows>
              {t.engines.map((e) => (
                <article className="engine-row" data-sc-row key={e.key}>
                  <div className="engine-row-mark" aria-hidden="true">
                    <Glyph name={e.key} />
                  </div>
                  <div className="engine-row-body">
                    <h3 className="engine-row-name">{e.name}</h3>
                    <p className="mt-5 max-w-[46ch] body-lg leading-relaxed">
                      {e.body}
                    </p>
                    <Link
                      href={engineHref[e.key]}
                      className="btn--quiet btn--quiet--ivory mt-7"
                    >
                      {e.link}{" "}
                      <span className="arr" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What runs today: six offers, hairline ledger, no images.
          The tag sits far right; the verbal CTA ends the sentence. */}
      <section id="what-runs" className="section-lg">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.runsTitle}</h2>
          <p className="measure mt-6 text-soft">{t.runsBody}</p>
          <div className="offers mt-14" data-sc-in data-sc-stagger="80">
            {s.offers.map((o) => (
              <div className="offer" key={o.id} id={o.id}>
                <div className="offer-main">
                  <h3 className="offer-name">{o.name}</h3>
                  <p className="offer-line">
                    {o.line}{" "}
                    <Link
                      href={
                        o.cta.href.startsWith("/")
                          ? `${af ? "/af" : ""}${o.cta.href}`
                          : o.cta.href
                      }
                      className="offer-cta"
                    >
                      {o.cta.label}{" "}
                      <span className="arr" aria-hidden="true">→</span>
                    </Link>
                  </p>
                </div>
                <p className="offer-tag">{o.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice peak: maker's hands, pinned for three viewports.
          The copy arrives on a small cream block, bottom left. */}
      <section className="peak" data-sc-act="pin" data-sc-span="3">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/core/05-hands-peak.jpg"
              alt="A pair of hands mid-task in a shaft of hard daylight"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="peak-scrim" data-sc-scrim>
            <h2 className="h-section">{t.practiceTitle}</h2>
            <p className="peak-line">{t.practiceBody}</p>
          </div>
        </div>
      </section>

      {/* Research pull: the notebook plate, the latest Bulletin. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig" data-sc-in>
            <Image
              src="/images/core/04-notebook.jpg"
              alt="A bound maroon notebook with ribbon, centred on cream paper"
              width={1086}
              height={1448}
              sizes="(min-width: 768px) 24rem, 88vw"
              className="h-auto w-full"
            />
          </figure>
          <div>
            <h2 className="h-section max-w-[20ch]">{t.researchTitle}</h2>
            <p className="measure mt-6 text-soft">{latest.dek}</p>
            <div className="panel mt-8 p-7 md:p-9" data-sc-in>
              <p className="eyebrow--ink eyebrow">{latest.no} · 2026</p>
              <h3 className="h-sub mt-3">{latest.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
                {latest.body[0].slice(0, 220)}…
              </p>
              <Link
                href={af ? "/af/resources#bulletin" : "/resources#bulletin"}
                className="btn--quiet mt-6"
              >
                {t.read} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="lede measure mt-10 text-ink">{t.researchLine}</p>
          </div>
        </div>
      </section>

      {/* Ventures: paragraph left, the spa plate right. Corner Spa is
          the first venture lab, named. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig md:order-2" data-sc-in>
            <Image
              src="/images/core/08-spa-dish.jpg"
              alt="Folded linen, a stone and a ceramic bowl, centred on cream paper"
              width={810}
              height={810}
              sizes="(min-width: 768px) 24rem, 88vw"
              className="h-auto w-full"
            />
          </figure>
          <div className="md:order-1">
            <h2 className="h-section max-w-[16ch]">{t.venturesTitle}</h2>
            <p className="measure mt-6 text-soft">{s.ventures.body}</p>
            <div className="hair-t mt-10 pt-8" data-sc-in>
              <p className="offer-tag">{s.ventures.cornerSpa.status}</p>
              <h3 className="h-sub mt-2">{s.ventures.cornerSpa.name}</h3>
              <p className="mt-3 max-w-[44ch] text-soft">
                {s.ventures.cornerSpa.line}
              </p>
              <Link
                href={af ? "/af/ventures" : "/ventures"}
                className="btn--quiet mt-5"
              >
                {t.read} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Second silent divider: Windhoek, a breath before the
          ledger. No text. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/core/07-windhoek-divider.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* The register: dated, public, updated as the work lands. The
          ledger stamps in one row at a time. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section">
              {af ? "Die register." : "The register."}
            </h2>
            <p className="meta">{t.registerMeta}</p>
          </div>
          <div className="ledger mt-12" data-sc-in data-sc-stagger="60">
            {s.register.map((r, i) => (
              <div className="ledger-row" key={i}>
                <p className="ledger-date">
                  {r.date
                    ? dateFmt.format(new Date(`${r.date}T00:00:00Z`))
                    : t.dateTbc}
                </p>
                <p className="max-w-[62ch]">{r.entry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close: the wax seal, pinned for two viewports. One email
          starts it, on a small cream block, maroon button. */}
      <section className="peak" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/core/10-wax-seal.jpg"
              alt="A maroon wax seal with ribbon, centred on cream paper"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="peak-scrim" data-sc-scrim>
            <h2 className="h-section">{t.closeTitle}</h2>
            <p className="peak-line">{t.closeBody}</p>
            <a href={`mailto:${site.email}`} className="btn mt-8">
              {t.writeOffice}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
