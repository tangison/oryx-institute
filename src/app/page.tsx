import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrubReveal } from "@/components/site/scrub-reveal";
import { HeroSplitTitle } from "@/components/site/hero-split-title";
import { AutoSlider } from "@/components/site/auto-slider";
import { HorizontalScroll } from "@/components/site/horizontal-scroll";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import GradientText from "@/components/reactbits/GradientText/GradientText";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import Magnet from "@/components/reactbits/Magnet/Magnet";
import { motto } from "@/lib/content";
import { site, disciplines, services, announcements } from "@/lib/site";

export const metadata: Metadata = {
  title: "Oryx Institute | Applied problem-solving, Windhoek",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Oryx Institute | Applied problem-solving, Windhoek",
    description: site.description,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "The Oryx Institute wordmark over the institute's certificate",
      },
    ],
  },
};

/**
 * EducationalOrganization + WebSite structured data. Every field is a
 * published fact: name, domain, the one mailbox. No telephone, no
 * street address and no campus are claimed while none exist; the sameAs
 * list stays empty until the social channels are live.
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/images/logo-lockup.svg`,
    email: site.email,
    areaServed: site.areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "NA",
    },
    /** AEO: the live practice, named as an offer catalog so answer
        engines can quote the offering list without guessing. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "The Oryx practice",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.line,
          areaServed: site.areaServed,
          provider: { "@type": "Organization", name: site.legalName },
        },
      })),
    },
    /** AEO: what the institute actually works in, plus the partners
        named in public. */
    knowsAbout: [
      ...new Set([
        ...disciplines.map((d) => d.name),
        "Business administration",
        "Information technology",
        "Market research and development",
        "Rapid Response Training",
      ]),
    ],
    ...(site.socials.length > 0
      ? { sameAs: site.socials.map((s) => s.href) }
      : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.tradingName,
    url: site.url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.legalName,
    },
  },
];

/**
 * The hero register: eight plates from the master package's landscape
 * set, at 2x for the plate size. The set opens on the one colour frame
 * and moves through the archival monochrome ground. Image only; the
 * photographs stand on their own.
 */
const heroSlides = [
  { src: "/images/register-hd/landscape/landscape_01.webp", alt: "An oryx on the crest of a red Namib dune" },
  { src: "/images/register-hd/landscape/landscape_02.webp", alt: "A bare tree on open desert ground" },
  { src: "/images/register-hd/landscape/landscape_03.webp", alt: "A desert road running flat to the horizon" },
  { src: "/images/register-hd/landscape/landscape_04.webp", alt: "The curved crest of a Namib dune under raking light" },
  { src: "/images/register-hd/landscape/landscape_05.webp", alt: "A quiver tree standing in a stone field" },
  { src: "/images/register-hd/landscape/landscape_07.webp", alt: "An oryx skull resting on cracked desert clay" },
  { src: "/images/register-hd/landscape/landscape_08.webp", alt: "Fog rolling over the Namibian coast" },
  { src: "/images/register-hd/landscape/landscape_10.webp", alt: "A figure walking away down a desert road, mid-stride" },
] as const;

/**
 * The working record: six of the master package's isolated objects,
 * shown at native scale on bordered plates, image only, no captions.
 */
const workingRecord = [
  { src: "/images/register/cutouts/cutout_05.webp", w: 274, h: 184, alt: "An open ledger with ruled pages" },
  { src: "/images/register/cutouts/cutout_04.webp", w: 274, h: 184, alt: "A black fountain pen with a gold nib" },
  { src: "/images/register/cutouts/cutout_08.webp", w: 273, h: 184, alt: "A rolled parchment tied with cord" },
  { src: "/images/register/cutouts/cutout_09.webp", w: 274, h: 184, alt: "A brass theodolite and compass, surveying instruments" },
  { src: "/images/register/cutouts/cutout_07.webp", w: 274, h: 184, alt: "A leather satchel with buckle and strap" },
  { src: "/images/register/cutouts/cutout_19.webp", w: 274, h: 184, alt: "A maroon wax seal with ribbon" },
] as const;

export default function HomePage() {
  const announcement = announcements[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------ Attention */}
      {/* Editorial split: the statement left, the automatic register
          right. Eight plates crossfade on their own; nothing to click. */}
      <section className="relative grid min-h-[94svh] lg:grid-cols-[1.18fr_1fr]">
        <div className="flex flex-col justify-end gap-8 px-[var(--gutter)] pb-24 pt-36 sm:gap-10 lg:justify-start lg:pb-28 lg:pt-[16vh] lg:pl-[max(var(--gutter),calc((100vw-84rem)/2+var(--gutter)))] lg:pr-16">
          {/* The 2-line statement: what the institute does, where it
              does it. SplitText raises the words on mount. */}
          <HeroSplitTitle
            title="Applied problem-solving,"
            accent="Windhoek."
            className="display-hero max-w-5xl text-ink"
          />

          <p className="max-w-[36ch] text-[1.18rem] leading-[1.55] text-ink/80 md:text-[1.3rem]">
            {site.closingLine}
          </p>

          {/* React Bits ShinyText: the offer line carries a slow rose
              sheen over the muted caps. */}
          <ShinyText
            text="Counselling · Business administration · IT · Market R&D · Rapid Response Training — live now in Windhoek"
            color="#57524A"
            shineColor="#D37084"
            speed={3}
            className="label-caps"
          />

          {/* React Bits Magnet: the primary pill leans toward the
              pointer within a small radius. */}
          <div className="flex flex-wrap items-center gap-4">
            <Magnet padding={40} magnetStrength={3} maxOffset={10}>
              <Link href="/apply" className="pill">
                Apply now
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
            </Magnet>
            <Link href="/programmes" className="pill-ghost">
              View programmes
            </Link>
          </div>
        </div>

        {/* The automatic register: full-image plates, crossfading on
            their own cadence. */}
        <AutoSlider
          slides={heroSlides}
          className="min-h-[64svh] lg:min-h-full"
        />

        {/* Scroll sentinel: the header turns solid when the hero clears. */}
        <div id="hero-sentinel" className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px]" aria-hidden />
      </section>

      {/* ------------------------------------------------ Interest */}
      {/* Gapless bento: the four disciplines interlock with the
          credential band. Dense flow, palette grounds, no voids. */}
      <section className="chapter shell">
        <h2 className="display-section max-w-5xl text-ink" data-reveal>
          Four disciplines, one measure: quiet work,{" "}
          <span className="em-serif text-accent">decisive finishes.</span>
        </h2>

        <div className="bento mt-14" data-reveal-group>
          {disciplines.map((d, i) => (
            <Link
              key={d.id}
              href={`/programmes#${d.id}`}
              className={`bento-cell hover-lift ${["tint-blush", "tint-sand", "tint-warm", "tint-rose"][i]} ${i % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}`}
            >
              <span
                className={`flex h-[2.75rem] items-end ${
                  d.glyph.length > 2
                    ? "bento-glyph-latin"
                    : "bento-glyph wordmark-cjk"
                }`}
                aria-hidden
              >
                {d.glyph}
              </span>
              <span className="bento-name">{d.name}</span>
              <span className="bento-desc">{d.summary}</span>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.85rem] font-semibold text-accent">
                Enquire
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </span>
            </Link>
          ))}

          {/* The credential band closes the grid: full width, the
              certificate's own language. */}
          <div className="bento-cell tint-rose md:col-span-12">
            <span className="label-caps text-accent">Named on every certificate</span>
            <p className="display-statement max-w-3xl text-ink">
              Excellence in innovation and{" "}
              <span className="em-serif text-accent">applied problem-solving.</span>
            </p>
            <Link
              href="/brand"
              className="mt-2 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-accent"
            >
              See the certificate
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ What runs now */}
      {/* The practice, scrubbed horizontally: six service cards
          travel the page sideways as the visitor scrolls down. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <h2 className="display-section max-w-3xl text-ink" data-reveal>
            What runs{" "}
            <GradientText colors={["#71111F", "#D37084", "#71111F"]} animationSpeed={7}>
              <span className="em-serif">now.</span>
            </GradientText>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            The practice is live: counselling, administration, IT,
            research, training. The schools are phased in behind it, in
            order, as accreditation progresses.
          </p>
        </div>

        <HorizontalScroll label="The practice, live now">
          {services.map((s, i) => (
            <article
              key={s.id}
              className={`hs-card hover-lift ${["tint-warm", "tint-sand", "tint-blush", "tint-rose"][i % 4]}`}
            >
              <p className="label-caps text-accent">{s.line}</p>
              <p className="mt-3 text-[1.15rem] font-semibold text-ink">{s.name}</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/75">{s.body}</p>
            </article>
          ))}
          <article className="hs-card hs-card--wide bg-ink text-paper">
            <p className="label-caps opacity-70">The free start</p>
            <p className="mt-3 text-[1.15rem] font-semibold">The Oryx Directory proves the standard before any fee.</p>
            <Link
              href="/resources"
              className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-pale-rose"
            >
              Take the Directory first
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </Link>
          </article>
        </HorizontalScroll>

        <div className="mt-10 flex flex-wrap gap-4">
          <Magnet padding={36} magnetStrength={3} maxOffset={9}>
            <Link href="/apply" className="pill">
              Book a counselling session
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </Magnet>
          <Link href="/resources" className="pill-ghost">
            Take the free Directory first
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ The standard */}
      {/* The founder's rule, scrubbed to full ink word by word. */}
      <section className="chapter shell-wide">
        <ScrubReveal
          text={motto.line}
          className="display-statement mx-auto max-w-4xl text-center text-ink"
        />

        <div className="keyline mx-auto mt-14 max-w-4xl" data-reveal>
          <p className="label-caps text-soft">The standard</p>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-soft">
            Work is judged on innovation and applied problem-solving,
            nothing else. The tools are named, the evidence is shown, and
            everything the institute prints holds that register.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ The working record */}
      {/* Six of the package's isolated objects, at native scale, image
          only, no captions. The institute's tools, named in objects. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The <span className="em-serif text-accent">working</span> record
          </h2>
          <Link href="/tools" className="link-type text-[0.95rem]">
            The Oryx Tools List
          </Link>
        </div>

        <HorizontalScroll label="The working record">
          {workingRecord.map((o) => (
            <figure
              key={o.src}
              className="hs-card hs-card--plate hover-lift"
            >
              <div className="plate-clip img-zoom w-full">
                <Image
                  src={o.src}
                  alt={o.alt}
                  width={o.w}
                  height={o.h}
                  sizes="420px"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          ))}
        </HorizontalScroll>
      </section>

      {/* ------------------------------------------------ Announcement */}
      {/* One dated line of news, on blush paper, inside a React Bits
          StarBorder: a slow maroon comet laps the card's edge. */}
      <section className="shell" data-reveal>
        <StarBorder
          as="div"
          theme="light"
          color="#71111F"
          trailColor="#D37084"
          borderColor="transparent"
          backgroundColor="transparent"
          radius={14}
          thickness={1.2}
          duration={7}
          glow={0.3}
          className="announce-band w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between !p-8 sm:!p-10"
          style={{ display: "flex" }}
        >
          <div className="flex items-start gap-4">
            <span className="announce-dot mt-3 shrink-0" aria-hidden />
            <div>
              <p className="label-caps text-accent">
                {announcement.kicker} · {announcement.date}
              </p>
              <p className="mt-2 max-w-2xl text-[1.1rem] font-semibold text-ink">
                {announcement.title}.
              </p>
              <p className="mt-1 max-w-2xl text-[0.95rem] leading-relaxed text-ink/70">
                The curriculum is already under construction and a flagship
                product is being built on it. The schedule lands when it is
                earned.
              </p>
            </div>
          </div>
          <Magnet padding={36} magnetStrength={3} maxOffset={9}>
            <Link
              href={`/announcements/${announcement.slug}`}
              className="pill"
            >
              Read the announcement
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </Magnet>
        </StarBorder>
      </section>

      {/* ------------------------------------------------ Action */}
      {/* Night band over the master set's monochrome ground: a full
          image background under a compliant scrim, the maroon pill on
          top. */}
      <section className="chapter shell">
        <div className="full-bleed scrim-night px-6 py-20 text-center text-paper sm:px-12 md:py-28">
          <div className="full-bleed-img" data-parallax>
            <Image
              src="/images/register-hd/landscape/landscape_09.webp"
              alt=""
              fill
              loading="lazy"
              sizes="(min-width: 64rem) 84rem, 100vw"
              aria-hidden
            />
          </div>
          <div className="relative">
            <h2 className="display-hero mx-auto max-w-5xl">
              Apply <span className="em-serif text-rose">now.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[38ch] text-[1.05rem] leading-relaxed opacity-90">
              Applications open by enquiry, addressed to the Principal&apos;s
              office. One email starts it.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnet padding={40} magnetStrength={3} maxOffset={10}>
                <Link href="/apply" className="pill">
                  Start your application
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </Link>
              </Magnet>
              <a href={`mailto:${site.email}`} className="pill-ghost-dark pill-ghost !px-6 !py-3">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
