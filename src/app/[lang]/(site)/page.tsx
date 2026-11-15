import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, offers, register, ventures, schemaIds } from "@/lib/site";
import { siteAf, offersAf, registerAf, venturesAf } from "@/lib/site-af";
import { insights } from "@/lib/content";
import { alternates, chrome, langFromParams } from "@/lib/i18n";
import { safetyAnnouncement } from "@/lib/safety";
import {
  GlyphResearch,
  GlyphPractice,
  GlyphVentures,
} from "@/components/site/glyphs";
import { PathwayNotes } from "@/components/site/pathway-notes";

function Glyph({ name }: { name: "research" | "practice" | "ventures" }) {
  if (name === "research") return <GlyphResearch className="h-full w-full" />;
  if (name === "practice") return <GlyphPractice className="h-full w-full" />;
  return <GlyphVentures className="h-full w-full" />;
}

/**
 * The homepage, laid out as one scroll composition:
 *
 *   hero (scrub, with the announcement pill) · positioning (flow) ·
 *   03 silent divider (flow) · the three kinds of work (PIN) · what
 *   runs today (flow) · practice peak (PIN) · field notes (flow) ·
 *   research zigzag (flow) · ventures reverse-zigzag (flow) · 8b
 *   announcement pin (PIN) · 07 silent divider (flow) · the register
 *   (flow) · close (PIN) ·
 *   footer.
 *
 * Four pins, two silent dividers. The core plates run in act order:
 * 01, 03, 05, 04, 08, 46+40 (announcement), 07, 10 (Image Bible v6:
 * the stone is the /brand specimen only, so the positioning act
 * carries no image).
 */
const copy = {
  en: {
    meta: {
      title: "A New Polytechnic for Namibia",
      description: site.description,
    },
    positioning:
      "A new polytechnic for Namibia, working from Windhoek. Prelaunch, and pursuing accreditation with the NQA and the NTA. Every step is dated on the register below.",
    aboutLink: "About the institute",
    kinds: [
      {
        key: "research" as const,
        name: "Research",
        body: "Fieldwork, bulletin essays, and cited papers on Namibia's working realities. Free before anything is charged.",
        link: "Read the research",
      },
      {
        key: "practice" as const,
        name: "Practice",
        body: "Crash courses, business counselling, market R&D, rapid response training. Delivered to Namibian standards.",
        link: "See the practice",
      },
      {
        key: "ventures" as const,
        name: "Ventures",
        body: "Small operating companies the institute opens to test sectors. Each one is a live classroom and a live lab.",
        link: "See the ventures",
      },
    ],
    kindsTitle: "How the institute works.",
    runsTitle: "What runs today.",
    runsBody:
      "Six offers, live from the office in Windhoek. Two teaching departments run crash and short courses only; the practice and the free Directory run beside them. What they promise is work, because credentials come only after\u00A0accreditation.",
    researchTitle: "Research runs from day one.",
    researchLine:
      "No buildings are needed for this work, so no buildings delay it.",
    practiceTitle: "Practice.",
    practiceBody:
      "Work measured and finished to standard, with every tool named.",
    venturesTitle: "Small companies, real customers.",
    registerMeta: "Dated as the work lands, public to read.",
    closeTitle: "One email starts it.",
    closeBody:
      "Applications, research enquiries, partnerships and press all begin with one message, and the reply comes from a person. Nothing is committed until both sides agree.",
    writeOffice: "Write to the office",
    readFaq: "Read the FAQ",
    seeWhatRuns: "See what runs now",
    apply: "Apply",
    read: "Read",
    dateTbc: "Date to be confirmed",
  },
  af: {
    meta: {
      title: "'n Nuwe Politegniese Instituut vir Namibië",
      description: siteAf.description,
    },
    positioning:
      "'n Nuwe politegniese instituut vir Namibië, werksaam vanuit Windhoek. Voor bekendstelling en besig om akkreditasie by die NQA en NTA na te streef. Elke stap word in die register gedateer.",
    aboutLink: "Oor die instituut",
    kinds: [
      {
        key: "research" as const,
        name: "Navorsing",
        body: "Veldwerk, Bulletin-opstelle en bronne oor Namibië se werkswerklikhede. Gratis voordat enigiets gehef word.",
        link: "Lees die navorsing",
      },
      {
        key: "practice" as const,
        name: "Praktyk",
        body: "Blitskursusse, besigheidsadvies, marknavorsing en vinnige-reaksie-opleiding. Volgens Namibiese standaarde gelewer.",
        link: "Sien die praktyk",
      },
      {
        key: "ventures" as const,
        name: "Ondernemings",
        body: "Klein bedryfsmaatskappye wat die instituut open om sektore te toets. Elkeen is 'n lewende klaskamer en laboratorium.",
        link: "Sien die ondernemings",
      },
    ],
    kindsTitle: "Hoe die instituut werk.",
    runsTitle: "Wat vandag werk.",
    runsBody:
      "Ses aanbiedinge werk vandag vanuit die kantoor in Windhoek. Twee onderrigafdelings bied slegs blits- en kortkursusse aan; die praktyk en gratis Directory werk saam daarmee. Geloofsbriewe volg eers ná akkreditasie.",
    researchTitle: "Navorsing begin op dag een.",
    researchLine:
      "Geen geboue is vir dié werk nodig nie; geen geboue vertraag dit nie.",
    practiceTitle: "Praktyk.",
    practiceBody:
      "Werk wat gemeet en volgens standaard voltooi is, met elke hulpmiddel benoem.",
    venturesTitle: "Klein maatskappye, werklike kliënte.",
    registerMeta: "Gedateer wanneer die werk land, en vir almal leesbaar.",
    closeTitle: "Een e-pos begin dit.",
    closeBody:
      "Aansoeke, navorsingsnavrae, vennootskappe en media begin met een boodskap; 'n mens antwoord. Niks word vasgelê voordat albei kante saamstem nie.",
    writeOffice: "Skryf aan die kantoor",
    readFaq: "Lees die vrae",
    seeWhatRuns: "Sien wat nou werk",
    apply: "Doen aansoek",
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
  return {
    /* The root layout also defines an English title template. Make the
       homepage title absolute so the Afrikaans brand form is preserved. */
    title: {
      absolute:
        lang === "af"
          ? `${copy[lang].meta.title} | Oryx Instituut`
          : `${copy[lang].meta.title} | Oryx Institute`,
    },
    description: copy[lang].meta.description,
    alternates: alternates(lang, "/", site.url),
    openGraph: {
      title: copy[lang].meta.title,
      description: copy[lang].meta.description,
      url: `${site.url}${lang === "af" ? "/af" : ""}/`,
      images: [
        {
          url: "/brand/og/default.png",
          width: 1200,
          height: 630,
          alt: copy[lang].meta.title,
        },
      ],
    },
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
        telephone: site.phoneE164,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phoneE164,
            contactType: "customer service",
            email: site.email,
          },
        ],
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
        /* One WebSite entity, one canonical name, in both locales:
           the localized name rides as alternateName so the graph does
           not disagree with itself. */
        name: site.tradingName,
        alternateName: siteAf.tradingName,
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
            {/* The announcement pill: one small door above the fold,
                nothing more. No popups, no banners, no slide-ins. */}
            <div className="mt-6">
              <Link
                href={af ? "/af/practice/safety-officer-course" : "/practice/safety-officer-course"}
                className="hero-pill"
              >
                {safetyAnnouncement[lang].pill}{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
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

      {/* Practice peak: maker's hands, pinned for three viewports.
          The copy arrives on a small cream block, bottom left. */}
      <section className="peak" data-sc-act="pin" data-sc-span="3">
        <div className="sc-stage" data-sc-stage>
          <div className="peak-media" data-sc-scale>
            <Image
              src="/images/kinfolk/core/05-hands-peak.jpg"
              alt="A pair of hands mid-task in a shaft of hard daylight"
              width={1250}
              height={1000}
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

      {/* The bespoke field-notes trace: an optional, local choice that
          holds one real pathway for the rest of the visit. */}
      <PathwayNotes lang={lang} />

      {/* Research pull: its own field folio plate, then the latest Bulletin. */}
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
                Bulletin correction: no mixed-language excerpt on the
                af homepage); the essays themselves publish in
                English, and the link says so. */}
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
                href={af ? "/af/resources#bulletin" : "/resources#bulletin"}
                className="btn--quiet mt-6"
              >
                {af ? "Read the Bulletin" : "Read the Bulletin"}{" "}
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
                  {af ? "Read about Corner Spa" : "Read about Corner Spa"}{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link
                  href={af ? "/af/blog/corner-spa" : "/blog/corner-spa"}
                  className="link-type"
                >
                  {af ? "Read the blog note" : "Read the blog note"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Act 8b, the announcement pin: the horn at low opacity
          behind a cream card, the helmet as the small focal plate.
          Atmosphere, not a banner: one pinned breath, then it scrolls
          away. (ANNOUNCEMENT.md, verbatim structure.) */}
      <section
        className="peak"
        data-sc-act="pin"
        data-sc-span="1.4"
      >
        <div className="sc-stage" data-sc-stage>
          <div className="announce-bg" data-sc-scale aria-hidden="true">
            <div className="absolute inset-[-8%]" data-sc-parallax="0.4">
              <Image
                src="/images/kinfolk/safety/46-announcement-horn.jpg"
                alt=""
                width={1254}
                height={1254}
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="sc-stage-inner flex h-full items-center">
            <div className="shell w-full">
              <div className="announce-card" data-sc-scrim>
                <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
                  <div>
                    <p className="eyebrow eyebrow--ink">
                      {safetyAnnouncement[lang].eyebrow}
                    </p>
                    <h2 className="h-section mt-4 max-w-[20ch]">
                      {safetyAnnouncement[lang].title}
                    </h2>
                    <p className="measure mt-5 text-soft">
                      {safetyAnnouncement[lang].body}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-5">
                      <Link
                        href={af ? "/af/practice/safety-officer-course" : "/practice/safety-officer-course"}
                        className="btn"
                      >
                        {safetyAnnouncement[lang].seeCurriculum}
                      </Link>
                      <Link
                        href={af ? "/af/apply/safety" : "/apply/safety"}
                        className="btn--quiet"
                      >
                        {safetyAnnouncement[lang].registerInterest}{" "}
                        <span className="arr" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
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
              {af ? "The register." : "The register."}
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
