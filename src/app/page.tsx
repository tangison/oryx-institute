import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, offers, register, ventures, schemaIds } from "@/lib/site";
import { insights } from "@/lib/content";
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** The three engines, verbatim from the plan's positioning screen. */
const engines = [
  {
    key: "research",
    eyebrow: "Research",
    title: "Research",
    body: "Fieldwork, bulletin essays, and cited papers on Namibia's working realities. Free before anything is charged.",
    glyph: "research",
  },
  {
    key: "practice",
    eyebrow: "Practice",
    title: "Practice",
    body: "Crash courses, business counselling, market R&D, rapid response training. Delivered to Namibian standards.",
    glyph: "practice",
  },
  {
    key: "ventures",
    eyebrow: "Ventures",
    title: "Ventures",
    body: "Small operating companies the institute opens to test sectors. Each one is a live classroom and a live lab.",
    glyph: "ventures",
  },
] as const;

function formatRegisterDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default function HomePage() {
  const latest = insights[insights.length - 1];

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": schemaIds.org,
        name: site.legalName,
        alternateName: site.tradingName,
        url: site.url,
        email: site.email,
        foundingDate: "2026",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "NA",
        },
        sameAs: site.socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.website,
        url: site.url,
        name: site.tradingName,
        publisher: { "@id": schemaIds.org },
        inLanguage: "en",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* 1 · Hero — the oryx on the terracotta field, type held in the open sky */}
      <section className="hero">
        <Image
          src="/images/kinfolk/k01-oryx.jpg"
          alt="An oryx stands on open gravel, small in a vast terracotta sky"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-content shell">
          <p className="hero-tag">{site.heroTag}</p>
          <h1 className="hero-title mt-5 max-w-[13ch]">{site.headline}</h1>
          <p className="hero-sub mt-6 max-w-[44ch]">{site.heroSub}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#what-runs" className="btn btn--cream">
              See what runs now
            </a>
            <Link href="/apply" className="btn btn--cream">
              Apply
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · Three engines. One standard. — ink band, hairline columns */}
      <section className="on-ink section-lg" style={{ background: "var(--ink)", color: "var(--ivory)" }}>
        <div className="shell">
          <h2 className="h-caps h-section" data-reveal>
            Three engines. One standard.
          </h2>
          <div className="engines mt-14 md:mt-20">
            {engines.map((e) => (
              <div key={e.key} data-reveal>
                <p className="eyebrow--ivory eyebrow">{e.eyebrow}</p>
                <div className="engine-glyph mt-6" aria-hidden="true">
                  {e.glyph === "research" && <Glyph name="research" />}
                  {e.glyph === "practice" && <Glyph name="practice" />}
                  {e.glyph === "ventures" && <Glyph name="ventures" />}
                </div>
                <p className="mt-7 max-w-[38ch] text-ivory body-lg leading-relaxed">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · What runs today — six offers, hairline ledger */}
      <section id="what-runs" className="section-lg">
        <div className="shell">
          <h2 className="h-section max-w-[18ch]" data-reveal>
            What runs today.
          </h2>
          <p className="measure mt-6 text-soft" data-reveal>
            Six offers, live from the office in Windhoek. Two teaching
            departments run crash and short courses only; the practice and
            the free Directory run beside them. Nothing here promises a
            credential — every line promises work.
          </p>
          <div className="offers mt-14">
            {offers.map((o) => (
              <div className="offer" key={o.id} id={o.id} data-reveal>
                <p className="offer-tag">{o.tag}</p>
                <h3 className="offer-name">{o.name}</h3>
                <p className="max-w-[44ch] text-soft">{o.line}</p>
                <Link href={o.cta.href} className="btn--quiet mt-2">
                  {o.cta.label} <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colour-band divider — pure terracotta, one centred word */}
      <div className="band band--terracotta" aria-hidden="true">
        <p className="band-word">Research.</p>
      </div>

      {/* 4 · Research pull — notebook, latest Bulletin */}
      <section className="section-lg">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate aspect-[3/4]" data-reveal>
            <Image
              src="/images/kinfolk/k05-notebook.jpg"
              alt="A maroon notebook lies open on cream paper, pen resting in the fold"
              fill
              sizes="(min-width: 768px) 26rem, 100vw"
              className="object-cover"
            />
          </figure>
          <div>
            <h2 className="h-section max-w-[20ch]" data-reveal>
              Research runs from day one.
            </h2>
            <p className="measure mt-6 text-soft" data-reveal>
              {latest.dek}
            </p>
            <div className="panel mt-8 p-7 md:p-9" data-reveal>
              <p className="eyebrow--ink eyebrow">{latest.no} · 2026</p>
              <h3 className="h-sub mt-3">{latest.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-soft">
                {latest.body[0].slice(0, 220)}…
              </p>
              <Link
                href="/resources#bulletin"
                className="btn--quiet mt-6"
              >
                Read <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="lede measure mt-10 text-ink" data-reveal>
              Research is not a department that opens when buildings
              arrive. It is why the institute exists.
            </p>
          </div>
        </div>
      </section>

      {/* 5 · Practice — full-bleed, type over the light */}
      <section className="relative">
        <div className="relative h-[68vh] min-h-[26rem]">
          <Image
            src="/images/kinfolk/k06-hands.jpg"
            alt="A pair of hands mid-task in a shaft of hard daylight"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-x-0 top-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(24,23,19,0.62) 0%, rgba(24,23,19,0.30) 52%, rgba(24,23,19,0) 100%)",
            }}
          >
            <div className="shell pt-14 pb-28 md:pt-20">
              <h2 className="h-section text-ivory">Practice.</h2>
              <p className="body-lg mt-5 max-w-[42ch] text-ivory">
                Work that holds. Measured and finished to standard. Every
                tool named, not magic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Material divider — wood and rope, no text */}
      <div className="divider" aria-hidden="true">
        <Image
          src="/images/kinfolk/k03-wood-rope.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 6 · Ventures — Corner Spa, the first live lab */}
      <section className="section-lg">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16 lg:gap-24">
          <figure className="plate aspect-[4/3] md:order-2 md:aspect-[3/4]" data-reveal>
            <Image
              src="/images/kinfolk/k08-spa.jpg"
              alt="Folded linen, stone and a candle on a warm counter"
              fill
              sizes="(min-width: 768px) 26rem, 100vw"
              className="object-cover"
            />
          </figure>
          <div className="md:order-1">
            <h2 className="h-section max-w-[16ch]" data-reveal>
              Ventures are the proof.
            </h2>
            <p className="measure mt-6 text-soft" data-reveal>
              {ventures.body}
            </p>
            <div className="hair-t mt-10 pt-8" data-reveal>
              <p className="offer-tag">{ventures.cornerSpa.status}</p>
              <h3 className="h-sub mt-2">{ventures.cornerSpa.name}</h3>
              <p className="mt-3 max-w-[44ch] text-soft">
                {ventures.cornerSpa.line}
              </p>
              <Link href="/ventures" className="btn--quiet mt-5">
                Read <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Place — Windhoek, held still, no text */}
      <div className="divider" aria-hidden="true">
        <Image
          src="/images/kinfolk/k07-windhoek.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 8 · The register — dated, public, updated as the work lands */}
      <section className="section-lg">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section" data-reveal>
              The register.
            </h2>
            <p className="meta" data-reveal>
              Dated. Public. Updated as the work lands.
            </p>
          </div>
          <div className="ledger mt-12">
            {register.map((r, i) => (
              <div className="ledger-row" key={i} data-reveal>
                <p className="ledger-date">
                  {r.date ? (
                    formatRegisterDate(r.date)
                  ) : (
                    <>
                      —<span className="sr-only">date to be confirmed</span>
                    </>
                  )}
                </p>
                <p className="max-w-[62ch]">{r.entry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 · One email starts it — ink close */}
      <section className="cta-band section-lg on-ink">
        <div className="shell">
          <h2 className="h-section max-w-[16ch]" data-reveal>
            One email starts it.
          </h2>
          <p className="mt-6 max-w-[52ch] text-ivory-80" data-reveal>
            Applications, research enquiries, partnerships, and press begin
            with one message. The reply is personal. Nothing is committed
            until both sides agree.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5" data-reveal>
            <a href={`mailto:${site.email}`} className="btn">
              Write to the office
            </a>
            <Link href="/faq" className="btn--quiet btn--quiet--ivory">
              Read the FAQ <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
