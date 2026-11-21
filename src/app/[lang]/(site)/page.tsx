import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, offers, register, ventures } from "@/lib/site";
import { siteAf, offersAf, registerAf, venturesAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { chrome, langFromParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { CareersPopup } from "@/components/site/careers-popup";
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
 *   hero (scrub) · positioning (flow) ·
 *   03 silent divider (flow) · the three kinds of work (PIN) · what
 *   runs today (flow) · practice peak (PIN) · field notes (flow) ·
 *   research zigzag (flow) · ventures reverse-zigzag (flow) · 07 silent
 *   divider (flow) · the register
 *   (flow) · close (PIN) ·
 *   footer.
 *
 * Three pins, two silent dividers. The core plates run in act order:
 * 01, 03, 05, 04, 08, 07, 10 (Image Bible v6:
 * the stone is the /brand specimen only, so the positioning act
 * carries no image).
 */
const copy = {
  en: {
    meta: {
      title: "Oryx Institute: Research, Practice and Ventures in Namibia",
      description:
        "Oryx Institute is a new Namibian polytechnic with applied research, business practice and ventures. Explore current work or write to the office.",
    },
    positioning:
      "Oryx is a new polytechnic for Namibia, working toward NTA registration. Its current status and confirmed updates are recorded on the public register.",
    aboutLink: "About the institute",
    kinds: [
      {
        key: "research" as const,
        name: "Research",
        body: "Fieldwork and published notes on Namibia's working realities.",
        link: "Read the research",
      },
      {
        key: "practice" as const,
        name: "Practice",
        body: "Business counselling and market research, stated for what is currently available.",
        link: "See the practice",
      },
      {
        key: "ventures" as const,
        name: "Ventures",
        body: "Small companies through which the institute learns how a sector works with real customers.",
        link: "See the ventures",
      },
    ],
    kindsTitle: "How the institute works.",
    runsTitle: "What runs today.",
    runsBody:
      "The institute currently takes on business counselling and market-research work. Learning pathways remain in development while Oryx works toward registration.",
    researchTitle: "Research runs from day one.",
    researchLine:
      "Research can begin before a campus is open.",
    practiceTitle: "Practice.",
    practiceBody:
      "Advice and research with a defined scope and a written outcome.",
    venturesTitle: "Small companies, real customers.",
    registerMeta: "Dated as the work lands, public to read.",
    closeTitle: "One email starts it.",
    closeBody:
      "Write to the Oryx office about current work, research, partnerships or press. The reply will set out what is available.",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
    seeWhatRuns: "See what runs now",
    apply: "Enquire",
    read: "Read",
    dateTbc: "Date to be confirmed",
  },
  af: {
    meta: {
      title: "Oryx Instituut: Navorsing, Praktyk en Ondernemings",
      description:
        "Oryx Instituut is ’n nuwe Namibiese politegnikum met toegepaste navorsing, besigheidspraktyk en ondernemings. Verken huidige werk of skryf aan die kantoor.",
    },
    positioning:
      "Oryx is ’n nuwe politegniese instituut vir Namibië en werk aan NTA-registrasie. Die openbare register bevat die huidige status en bevestigde opdaterings.",
    aboutLink: "Oor die instituut",
    kinds: [
      {
        key: "research" as const,
        name: "Navorsing",
        body: "Veldwerk en gepubliseerde notas oor Namibië se werkswerklikhede.",
        link: "Lees die navorsing",
      },
      {
        key: "practice" as const,
        name: "Praktyk",
        body: "Besigheidsadvies en marknavorsing, gestel vir wat tans beskikbaar is.",
        link: "Sien die praktyk",
      },
      {
        key: "ventures" as const,
        name: "Ondernemings",
        body: "Klein maatskappye waardeur die instituut leer hoe ’n sektor met werklike kliënte werk.",
        link: "Sien die ondernemings",
      },
    ],
    kindsTitle: "Hoe die instituut werk.",
    runsTitle: "Wat vandag werk.",
    runsBody:
      "Die instituut neem tans besigheidsadvies- en marknavorsingswerk aan. Leerpaaie bly in ontwikkeling terwyl Oryx aan registrasie werk.",
    researchTitle: "Navorsing begin op dag een.",
    researchLine:
      "Navorsing kan begin voordat ’n kampus oop is.",
    practiceTitle: "Praktyk.",
    practiceBody:
      "Advies en navorsing met ’n duidelike omvang en ’n skriftelike uitkoms.",
    venturesTitle: "Klein maatskappye, werklike kliënte.",
    registerMeta: "Gedateer wanneer die werk land, en vir almal leesbaar.",
    closeTitle: "Een e-pos begin dit.",
    closeBody:
      "Skryf aan die Oryx-kantoor oor huidige werk, navorsing, vennootskappe of media. Die antwoord sal stel wat beskikbaar is.",
    writeOffice: "Skryf aan die kantoor",
    readFaq: "Lees die vrae",
    seeWhatRuns: "Sien wat nou werk",
    apply: "Doen navraag",
    read: "Lees",
    dateTbc: "Datum moet bevestig word",
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
  return pageMetadata({
    lang,
    path: "/",
    title: m.title,
    description: m.description,
    socialTitle: lang === "af" ? "Oryx Instituut" : "Oryx Institute",
    socialDescription: m.description,
    image: { url: "/brand/og/default.png", width: 1200, height: 630, alt: m.title },
  });
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
        headline: siteAf.headline,
        heroSub: siteAf.heroSub,
        offers: offersAf,
        register: registerAf,
        ventures: venturesAf,
      }
    : {
        headline: site.headline,
        heroSub: site.heroSub,
        offers,
        register,
        ventures,
      };
  const latest = insights[insights.length - 1];
  const kindHref: Record<string, string> = {
    research: af ? "/af/research" : "/research",
    practice: af ? "/af/practice" : "/practice",
    ventures: af ? "/af/ventures" : "/ventures",
  };

  const dateFmt = new Intl.DateTimeFormat(af ? "af-NA" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <CareersPopup lang={lang} />

      {/* Hero: the oryx on the terracotta field, three planes moving at
          three rates. The photograph breathes at its own depth; the
          nameplate recedes a hair; the line beneath it drifts. */}
      <section className="hero" data-sc-act="scrub">
        <div className="hero-media" data-sc-parallax="0.45" aria-hidden="true">
          <Image
            src="/images/kinfolk/core/01-hero-oryx.jpg"
            alt=""
            width={1122}
            height={1402}
            priority
            fetchPriority="high"
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content shell">
          <div data-sc-parallax="-0.06">
            <h1 className="hero-title max-w-[13ch]">{s.headline}</h1>
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

      {/* Positioning: the sentence, and the door into the about page.
          No plate: the stone is the /brand specimen now, and the
          homepage states itself in type (Image Bible v6, act 3). */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell positioning">
          <p className="lede measure text-ink">{t.positioning}</p>
          <Link
            href={af ? "/af/about" : "/about"}
            className="link-type mt-6 inline-block"
          >
            {t.aboutLink} <span className="arr" aria-hidden="true">→</span>
          </Link>
          <p className="meta mt-10">
            <Link href={af ? "/" : "/af"} className="link-type">
              {chrome[lang].langNote}
            </Link>
          </p>
        </div>
      </section>

      {/* First silent divider: wood and rope, a breath before the
          three kinds of work. No text, no overlay, one full viewport. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/core/03-wood-rope-divider.jpg"
            alt=""
            width={1122}
            height={1402}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* The three kinds of work, pinned: one row at a time,
          cross-faded. Ink ground, no cards, each row answers with its
          own page. */}
      <section
        className="on-ink"
        style={{ background: "var(--ink)", color: "var(--ivory)" }}
        data-sc-act="pin"
        data-sc-span="2.5"
      >
        <div className="sc-stage" data-sc-stage>
          <div className="shell flex h-full flex-col justify-center py-24">
            <h2 className="h-section max-w-[18ch]">{t.kindsTitle}</h2>
            <div className="engine-rows mt-16 md:mt-24" data-sc-rows>
              {t.kinds.map((e) => (
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
                      href={kindHref[e.key]}
                      className="btn--quiet btn--quiet--ivory mt-7"
                      aria-label={af ? `${e.link}${e.name}` : `${e.link} ${e.name}`}
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

      {/* What is available now: a short, factual ledger. Future learning
          stays out of this section until the relevant registration exists. */}
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
                      aria-label={af ? `${o.name}，${o.cta.label}` : `${o.cta.label} ${o.name}`}
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

      {/* Practice peak: an empty worktable, pinned for three viewports.
          The copy arrives on a small cream block, bottom left. */}
      <section className="peak" data-sc-act="pin" data-sc-span="3">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/careers/careers-hero.jpg"
              alt="An empty wood worktable with ivory cards and a dark notebook"
              width={1408}
              height={768}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="peak-scrim" data-sc-scrim>
            <h2 className="h-section">{t.practiceTitle}</h2>
            <p className="peak-line">{t.practiceBody}</p>
          </div>
        </div>
      </section>

      {/* Research pull: its own field folio plate, then the latest published note. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate-fig" data-sc-in>
            <Image
              src="/images/editorial/home-research-bulletin.jpg"
              alt="A closed maroon research folio with a pencil and stone sample on a cream table"
              width={1264}
              height={848}
              sizes="(min-width: 768px) 24rem, 88vw"
              className="h-auto w-full"
              loading="eager"
            />
          </figure>
          <div>
            <h2 className="h-section max-w-[20ch]">{t.researchTitle}</h2>
            {/* The Afrikaans page carries the panel in Afrikaans (the
                research-note excerpt is localised on the Afrikaans
                homepage); the notes themselves publish in English, and
                the link says so. */}
            <p className="measure mt-6 text-soft">
              {af ? latest.dekAf : latest.dek}
            </p>
            <div className="panel mt-8 p-7 md:p-9" data-sc-in>
              <p className="eyebrow--ink eyebrow">{latest.no}</p>
              <h3 className="h-sub mt-3">
                {af ? latest.titleAf : latest.title}
              </h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
                {af
                  ? `${latest.excerptAf}…`
                  : `${latest.body[0].slice(0, 220)}…`}
              </p>
              <Link
                href={af ? "/af/research#notes" : "/research#notes"}
                className="btn--quiet mt-6"
              >
                {af ? "Lees die navorsingsnotas" : "Read the research notes"}{" "}
                <span className="arr" aria-hidden="true">→</span>
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
              src="/images/kinfolk/core/08-spa-dish.jpg"
              alt="Folded linen, a stone and a ceramic bowl, centred on cream paper"
              width={1000}
              height={1000}
              sizes="(min-width: 768px) 24rem, 88vw"
              className="h-auto w-full"
              loading="eager"
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
              <div className="mt-5 flex flex-wrap items-center gap-5">
                <Link
                  href={af ? "/af/ventures" : "/ventures"}
                  className="btn--quiet"
                >
                  {af ? "Lees oor Corner Spa" : "Read about Corner Spa"}{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link
                  href={af ? "/af/blog/corner-spa" : "/blog/corner-spa"}
                  className="link-type"
                >
                  {af ? "Lees die blognota" : "Read the blog note"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second silent divider: a breath before the ledger. No text. */}
      <div
        className="divider divider--full overflow-hidden"
        data-sc-act="flow"
        aria-hidden="true"
      >
        <div className="absolute inset-[-10%]" data-sc-parallax="0.6">
          <Image
            src="/images/kinfolk/core/07-windhoek-divider.jpg"
            alt=""
            width={1250}
            height={1000}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
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

      {/* The English original, printed beneath the Afrikaans page: the
          institute is bilingual by declaration, and this is the text
          the rest of the site quotes. */}
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

      {/* Close: a distinct correspondence plate, pinned for two viewports.
          One email starts it, on a small cream block, maroon button. */}
      <section className="peak" data-sc-act="pin" data-sc-span="2">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/editorial/home-correspondence.jpg"
              alt="A sealed blank cream envelope and brass paper clip on a terracotta surface"
              width={1264}
              height={848}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
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
