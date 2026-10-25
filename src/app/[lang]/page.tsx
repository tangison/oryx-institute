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
 * The offer ledger's object plates: the tool each offer is done with.
 * One object per row, named in the image as it is named in the copy.
 */
const offerPlates: Record<string, { src: string; alt: string }> = {
  "owners-desk": {
    src: "/images/register/cutouts/cutout_04.webp",
    alt: "A black fountain pen with a gold nib on white ground",
  },
  "business-administration": {
    src: "/images/register/cutouts/cutout_05.webp",
    alt: "An open ledger with ruled pages",
  },
  it: {
    src: "/images/register/cutouts/cutout_03.webp",
    alt: "A slide rule, every notch of it named",
  },
  "market-rd": {
    src: "/images/register/cutouts/cutout_09.webp",
    alt: "A brass theodolite and compass, surveying instruments",
  },
  "rapid-response": {
    src: "/images/register/cutouts/cutout_07.webp",
    alt: "A leather satchel with buckle and strap",
  },
  directory: {
    src: "/images/register/cutouts/cutout_08.webp",
    alt: "A rolled parchment tied with cord",
  },
};

/** Page-local copy in both languages; the voice bar holds in each. */
const copy = {
  en: {
    meta: {
      title: "A New Polytechnic for Namibia",
      description: site.description,
    },
    engines: [
      {
        key: "research",
        eyebrow: "Research",
        body: "Fieldwork, bulletin essays, and cited papers on Namibia's working realities. Free before anything is charged.",
      },
      {
        key: "practice",
        eyebrow: "Practice",
        body: "Crash courses, business counselling, market R&D, rapid response training. Delivered to Namibian standards.",
      },
      {
        key: "ventures",
        eyebrow: "Ventures",
        body: "Small operating companies the institute opens to test sectors. Each one is a live classroom and a live lab.",
      },
    ],
    enginesTitle: "Three engines. One standard.",
    runsTitle: "What runs today.",
    runsBody:
      "Six offers, live from the office in Windhoek. Two teaching departments run crash and short courses only; the practice and the free Directory run beside them. Nothing here promises a credential; every line promises work.",
    bandWord: "Research.",
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
  },
  af: {
    meta: {
      title: "'n Nuwe politegniek vir Namibië",
      description: siteAf.description,
    },
    engines: [
      {
        key: "research",
        eyebrow: "Navorsing",
        body: "Veldwerk, Bulletin-opstelle, en aangehaalde verhandelings oor Namibië se werklikhede. Gratis voordat enigiets gehef word.",
      },
      {
        key: "practice",
        eyebrow: "Praktyk",
        body: "Kondenskursusse, besigheidsberading, marknavorsing, spoedreaksie-opleiding. Volgens Namibiese standaarde gelewer.",
      },
      {
        key: "ventures",
        eyebrow: "Ondernemings",
        body: "Klein bedrywende maatskappye wat die instituut open om sektors toets. Elke een is 'n lewende klaskamer en 'n lewende laboratorium.",
      },
    ],
    enginesTitle: "Drie enjins. Een standaard.",
    runsTitle: "Wat vandag loop.",
    runsBody:
      "Ses aanbiedings, lewendig vanuit die kantoor in Windhoek. Twee onderrigdepartemente loop kondens- en kortkursusse alleen; die praktyk en die gratis Gids loop langs hulle. Niks hier belowe 'n kwalifikasie nie; elke reël belowe werk.",
    bandWord: "Navorsing.",
    researchTitle: "Navorsing loop van dag een af.",
    researchLine:
      "Navorsing is nie 'n departement wat open wanneer geboue opdaag nie. Dit is hoekom die instituut bestaan.",
    practiceTitle: "Praktyk.",
    practiceBody:
      "Werk wat hou. Gemeet en tot standaard voltooi. Elke gereedskap by die naam genoem, nie as towerkrag nie.",
    venturesTitle: "Ondernemings is die bewys.",
    registerMeta: "Gedateer. Openbaar. Opgedateer namate die werk tank.",
    closeTitle: "Een e-pos begin dit.",
    closeBody:
      "Aansoeke, navorsingsnavrae, vennootskappe en die pers begin met een boodskap. Die antwoord is persoonlik. Niks word bevestig voordat albei kante saamstem nie.",
    writeOffice: "Skryf aan die kantoor",
    readFaq: "Lees die gereelde vrae",
    seeWhatRuns: "Sien wat nou loop",
    apply: "Skryf in",
    read: "Lees",
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

      {/* Hero: the oryx on the terracotta field, type held in the open
          sky. The photograph breathes at its own depth; the type lands
          still, by design. */}
      <section className="hero" data-sc-act="flow">
        <div className="hero-media" data-sc-parallax="0.45" aria-hidden="true">
          <Image
            src="/images/kinfolk/k01-oryx.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-content shell">
          <p className="hero-tag">{s.heroTag}</p>
          <h1 className="hero-title mt-5 max-w-[13ch]">{s.headline}</h1>
          <p className="hero-sub mt-6 max-w-[44ch]">{s.heroSub}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#what-runs" className="btn btn--cream">
              {t.seeWhatRuns}
            </a>
            <Link href={af ? "/af/apply" : "/apply"} className="btn btn--cream">
              {t.apply}
            </Link>
          </div>
        </div>
      </section>

      {/* Three engines. One standard. Ink band, hairline columns. */}
      <section
        className="on-ink section-lg"
        style={{ background: "var(--ink)", color: "var(--ivory)" }}
      >
        <div className="shell">
          <h2 className="h-caps h-section">{t.enginesTitle}</h2>
          <div className="engines mt-14 md:mt-20" data-sc-in data-sc-stagger="90">
            {t.engines.map((e) => (
              <div key={e.key}>
                <p className="eyebrow--ivory eyebrow">{e.eyebrow}</p>
                <div className="engine-glyph mt-6" aria-hidden="true">
                  <Glyph name={e.key as "research"} />
                </div>
                <p className="mt-7 max-w-[38ch] text-ivory body-lg leading-relaxed">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What runs today: six offers, hairline ledger. */}
      <section id="what-runs" className="section-lg">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]">{t.runsTitle}</h2>
          <p className="measure mt-6 text-soft">{t.runsBody}</p>
          <div className="offers mt-14" data-sc-in data-sc-stagger="70">
            {s.offers.map((o) => (
              <div className="offer" key={o.id} id={o.id}>
                <div className="offer-main">
                  <p className="offer-tag">{o.tag}</p>
                  <h3 className="offer-name">{o.name}</h3>
                  <p className="max-w-[44ch] text-soft">{o.line}</p>
                  <Link
                    href={o.cta.href.startsWith("/")
                      ? `${af ? "/af" : ""}${o.cta.href}`
                      : o.cta.href}
                    className="btn--quiet mt-2"
                  >
                    {o.cta.label} <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </div>
                {offerPlates[o.id] ? (
                  <figure className="offer-plate" aria-hidden="true">
                    <Image
                      src={offerPlates[o.id].src}
                      alt=""
                      width={274}
                      height={184}
                      sizes="104px"
                    />
                  </figure>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colour-band divider: pure terracotta, one centred word. */}
      <div className="band band--terracotta" data-sc-act="flow" aria-hidden="true">
        <p className="band-word" data-sc-cue="0.25 0.75 0.2 0.4" data-sc-kinetic="lines">
          {t.bandWord}
        </p>
      </div>

      {/* Research pull: the ground it is gathered on, latest Bulletin. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate plate--float aspect-[3/2]">
            <div className="plate-media" data-sc-parallax="0.5">
              <Image
                src="/images/register-hd/landscape/landscape_07.webp"
                alt="An oryx skull and desert flowers lying on cracked clay"
                fill
                sizes="(min-width: 768px) 26rem, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
          <div>
            <h2 className="h-section max-w-[20ch]">{t.researchTitle}</h2>
            <p className="measure mt-6 text-soft">{latest.dek}</p>
            <div className="panel mt-8 p-7 md:p-9" data-sc-in>
              <p className="eyebrow--ink eyebrow">
                {latest.no} · 2026
              </p>
              <h3 className="h-sub mt-3">{latest.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
                {latest.body[0].slice(0, 220)}…
              </p>
              <Link href={af ? "/af/resources#bulletin" : "/resources#bulletin"} className="btn--quiet mt-6">
                {t.read} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="lede measure mt-10 text-ink">{t.researchLine}</p>
          </div>
        </div>
      </section>

      {/* Practice: full-bleed, type over the light. The photograph moves
          at its own depth; the copy holds. */}
      <section className="relative" data-sc-act="flow">
        <div className="relative h-[68vh] min-h-[26rem] overflow-hidden">
          <div className="absolute inset-[-8%]" data-sc-parallax="0.8">
            <Image
              src="/images/kinfolk/k06-hands.jpg"
              alt="A pair of hands mid-task in a shaft of hard daylight"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-x-0 top-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(24,23,19,0.62) 0%, rgba(24,23,19,0.30) 52%, rgba(24,23,19,0) 100%)",
            }}
          >
            <div className="shell pt-14 pb-28 md:pt-20">
              <h2 className="h-section text-ivory">{t.practiceTitle}</h2>
              <p className="body-lg mt-5 max-w-[42ch] text-ivory">
                {t.practiceBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Material divider: wood and rope, no text, all depth. */}
      <div className="divider overflow-hidden" data-sc-act="flow" aria-hidden="true">
        <div className="absolute inset-[-10%]" data-sc-parallax="1.2">
          <Image
            src="/images/kinfolk/k03-wood-rope.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Ventures: the venture set out on open ground, the first live
          lab named beneath it. */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate plate--float aspect-[4/3] md:order-2">
            <div className="plate-media" data-sc-parallax="0.5">
              <Image
                src="/images/register-hd/landscape/landscape_02.webp"
                alt="A lone tree standing on open desert ground"
                fill
                sizes="(min-width: 768px) 26rem, 100vw"
                className="object-cover"
              />
            </div>
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

      {/* Place: Windhoek, held still, no text. */}
      <div className="divider overflow-hidden" data-sc-act="flow" aria-hidden="true">
        <div className="absolute inset-[-10%]" data-sc-parallax="1.2">
          <Image
            src="/images/kinfolk/k07-windhoek.jpg"
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
                  {r.date ? (
                    dateFmt.format(new Date(`${r.date}T00:00:00Z`))
                  ) : (
                    <>
                      {af ? "Ongedateer" : "Undated"}
                      <span className="sr-only">
                        {af
                          ? "datum moet nog bevestig word"
                          : "date to be confirmed"}
                      </span>
                    </>
                  )}
                </p>
                <p className="max-w-[62ch]">{r.entry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One email starts it. Ink close. */}
      <section className="cta-band section-lg on-ink">
        <div className="shell">
          <h2 className="h-section max-w-[16ch]">{t.closeTitle}</h2>
          <p className="mt-6 max-w-[52ch] text-ivory-80">{t.closeBody}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href={`mailto:${site.email}`} className="btn">
              {t.writeOffice}
            </a>
            <Link
              href={af ? "/af/faq" : "/faq"}
              className="btn--quiet btn--quiet--ivory"
            >
              {t.readFaq} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
