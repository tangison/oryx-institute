import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrubReveal } from "@/components/site/scrub-reveal";
import { ScaleFigure } from "@/components/site/scale-figure";
import { PhotoFigure } from "@/components/site/photo-figure";
import { PhotoCarousel } from "@/components/site/photo-carousel";
import { HeroSplitTitle } from "@/components/site/hero-split-title";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import GradientText from "@/components/reactbits/GradientText/GradientText";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import Magnet from "@/components/reactbits/Magnet/Magnet";
import { motto } from "@/lib/content";
import { site, disciplines, services, announcements } from "@/lib/site";

export const metadata: Metadata = {
  title: "Oryx Institute | Looks harmless. Isn't.",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Oryx Institute | Looks harmless. Isn't.",
    description: site.description,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Oryx Institute: the wordmark over the wolf in sheep's clothing",
      },
    ],
  },
};

/**
 * EducationalOrganization structured data. Every field is a published
 * fact from the institute's own print kit: name, domain, contact and
 * postal address. Nothing is asserted beyond that.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.legalName,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/images/logo-lockup.svg`,
  email: site.email,
  telephone: site.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: "P.O. Box 1662",
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
};

/**
 * The photographic register: ten frames from the institute's curated
 * set, full resolution. Image-only slides; the photographs stand on
 * their own.
 */
const registerPhotos = [
  {
    src: "/images/photo/courtyard.jpg",
    alt: "A stone courtyard in daylight, passages leading off it",
  },
  {
    src: "/images/photo/red-door.jpg",
    alt: "A red door in a whitewashed wall, closed",
  },
  {
    src: "/images/photo/drafting.jpg",
    alt: "A pencil and a straightedge laid across a worktable beside a window",
  },
  {
    src: "/images/photo/stairwell.jpg",
    alt: "A concrete stairwell rising through the frame",
  },
  {
    src: "/images/photo/reading-room.jpg",
    alt: "A reading room with a long table and chairs in window light",
  },
  {
    src: "/images/photo/horns.jpg",
    alt: "The straight horns of an oryx against the sky",
  },
  {
    src: "/images/photo/walker.jpg",
    alt: "A figure walking away down a path, mid-stride",
  },
  {
    src: "/images/photo/quiver-tree.jpg",
    alt: "A quiver tree against a clear sky",
  },
  {
    src: "/images/photo/dune-curves.jpg",
    alt: "The curved crest of a Namib dune under raking light",
  },
  {
    src: "/images/photo/welwitschia.jpg",
    alt: "A welwitschia plant on open gravel ground",
  },
] as const;

/**
 * The working record: six of the master package's isolated objects,
 * shown at native scale on bordered tiles, image only, no captions.
 */
const workingRecord = [
  { src: "/images/register/cutouts/cutout_05.webp", w: 274, h: 184, alt: "An open ledger with ruled pages" },
  { src: "/images/register/cutouts/cutout_04.webp", w: 274, h: 184, alt: "A black fountain pen with a gold nib" },
  { src: "/images/register/cutouts/cutout_08.webp", w: 273, h: 184, alt: "A rolled parchment tied with cord" },
  { src: "/images/register/cutouts/cutout_09.webp", w: 274, h: 184, alt: "A brass theodolite and compass, surveying instruments" },
  { src: "/images/register/cutouts/cutout_07.webp", w: 274, h: 184, alt: "A leather satchel with buckle and strap" },
  { src: "/images/register/cutouts/cutout_19.webp", w: 274, h: 184, alt: "A maroon wax seal with ribbon" },
] as const;

/** Discipline cells carry the published palette as grounds: warm,
    blush, sand, and the maroon wash for the institute's own standard. */
const cellTints = ["tint-blush", "tint-sand", "tint-warm", "tint-rose"];

/** Service cells run the same palette, one step quieter. */
const serviceTints = ["tint-warm", "tint-sand", "tint-blush", "tint-rose"];

export default function HomePage() {
  const announcement = announcements[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------ Attention */}
      {/* Editorial split, the flyer's own art direction: white ground,
          serif headline left, the wolf right. The split is asymmetric
          and the text block sits low: tension, not a mirror. */}
      <section className="relative grid min-h-[94svh] lg:grid-cols-[1.18fr_1fr]">
        <div className="flex flex-col justify-end gap-8 px-[var(--gutter)] pb-24 pt-36 sm:gap-10 lg:justify-start lg:pb-28 lg:pt-[16vh] lg:pl-[max(var(--gutter),calc((100vw-84rem)/2+var(--gutter)))] lg:pr-16">
          {/* The 2-line iron rule: wide container, two lines exactly.
              React Bits × GSAP SplitText raises the words on mount. */}
          <HeroSplitTitle
            title="Looks harmless."
            accent="Isn't."
            className="display-hero max-w-5xl text-ink"
          />

          <p className="max-w-[36ch] text-[1.18rem] leading-[1.55] text-ink/80 md:text-[1.3rem]">
            Oryx Institute graduates solve problems quietly and finish them
            decisively.
          </p>

          {/* React Bits ShinyText: the offer line carries a slow rose
              sheen over the muted caps. */}
          <ShinyText
            text="Business counselling · Market research and development · Rapid Response Training — live now in Windhoek"
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

        {/* The wolf fills the full right column edge to edge; the text
            block hangs low and left. Asymmetry by placement. */}
        <div className="relative min-h-[64svh] lg:min-h-full">
          <Image
            src="/images/photo/flyer-wolf.jpg"
            alt="A wolf wearing a sheep's fleece, staring straight out of the frame"
            fill
            priority
            sizes="(min-width: 64rem) 46vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </div>

        {/* Scroll sentinel: the header turns solid when the hero clears. */}
        <div id="hero-sentinel" className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px]" aria-hidden />
      </section>

      {/* ------------------------------------------------ Interest */}
      {/* Gapless bento: the four disciplines interlock with the
          credential band. Dense flow, palette grounds, no voids. */}
      <section className="chapter shell">
        <h2 className="display-section max-w-5xl text-ink" data-reveal>
          Four disciplines,{" "}
          <span
            className="inline-img"
            style={{ backgroundImage: "url(/images/photo/pill-wolf.jpg)" }}
            aria-hidden
          />{" "}
          one measure: quiet work,{" "}
          <span
            className="inline-img"
            style={{ backgroundImage: "url(/images/photo/pill-coast.jpg)" }}
            aria-hidden
          />{" "}
          <span className="em-serif text-accent">decisive finishes.</span>
        </h2>

        <div className="bento mt-14" data-reveal-group>
          {disciplines.map((d, i) => (
            <Link
              key={d.id}
              href={`/programmes#${d.id}`}
              className={`bento-cell ${cellTints[i]} ${i % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}`}
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
      {/* The consulting practice, first because it is first in real
          life: counselling, research and development, rapid response
          training, and the free Directory. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-section max-w-3xl text-ink" data-reveal>
            What runs <GradientText colors={["#71111F", "#D37084", "#71111F"]} animationSpeed={7}><span className="em-serif">now.</span></GradientText>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            The consulting practice is live. The schools are phased in
            behind it, in order, as accreditation progresses.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--r-card)] border border-rule bg-rule md:grid-cols-2" data-reveal-group>
          {services.map((s, i) => (
            <div key={s.id} className={`p-8 md:p-10 ${serviceTints[i]}`}>
              <p className="label-caps text-accent">{s.line}</p>
              <p className="mt-3 text-[1.15rem] font-semibold text-ink">{s.name}</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/75">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/apply" className="pill">
            Book a counselling session
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
          <Link href="/resources" className="pill-ghost">
            Take the free Directory first
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ Desire */}
      {/* The scroll chapter: the graduate statement scrubs to full ink
          word by word, then the sea storm holds the standard. */}
      <section className="chapter shell-wide">
        <ScrubReveal
          text="Oryx Institute graduates solve problems quietly and finish them decisively."
          className="display-statement mx-auto max-w-4xl text-center text-ink"
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div className="keyline" data-reveal>
            <p className="label-caps text-soft">The standard</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-soft">
              The line is set by the institute&apos;s own certificate: work
              is judged on innovation and applied problem-solving, nothing
              else. Everything the institute prints holds that register.
            </p>
          </div>

          <div data-reveal>
            <ScaleFigure
              src="/images/photo/coast-fog.jpg"
              alt="Fog rolling over the Namibian coast, the water calm beneath"
              width={1000}
              height={720}
              sizes="(min-width: 64rem) 56vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ The register */}
      {/* The curated landscape set, image-only, no captions. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The <span className="em-serif text-accent">photographic</span> register
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            Namibian ground, from the master set: dunes, coast, desert
            roads. Curated, not staged.
          </p>
        </div>
        <div className="mt-12" data-reveal>
          <PhotoCarousel photos={registerPhotos} ariaLabel="photographs" />
        </div>
      </section>

      {/* ------------------------------------------------ The working record */}
      {/* Six of the package's isolated objects, at native scale, image
          only, no captions. The institute's tools, named in objects. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The <span className="em-serif text-accent">working</span> record
          </h2>
          <Link href="/tools" className="link-type text-[0.95rem]">
            The Oryx Tools List
          </Link>
        </div>
        <ul className="specimen-grid mt-12 md:grid-cols-3 lg:grid-cols-6" data-reveal-group>
          {workingRecord.map((o) => (
            <li key={o.src} className="specimen-tile">
              <Image
                src={o.src}
                alt={o.alt}
                width={o.w}
                height={o.h}
                sizes="220px"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ The rule */}
      {/* The founder's rule and the documentary register: the tools are
          named, the faces are in motion, nothing is posed. */}
      <section className="chapter shell">
        <div className="keyline" data-reveal>
          <p className="label-caps text-soft">{motto.source}</p>
          <p className="display-statement mt-4 max-w-4xl text-ink">
            You&apos;re only as good as your tools.{" "}
            <span className="em-serif text-accent">We forge them.</span>
          </p>
          <p className="measure mt-5 text-[1.02rem] leading-relaxed text-soft">
            The institute publishes its own stack, the learner&apos;s spine
            and the AI stack in the open.
          </p>
          <div className="mt-7">
            <Link href="/tools" className="link-type text-[0.95rem]">
              The Oryx Tools List
            </Link>
          </div>
        </div>

        <div className="mt-14" data-reveal>
          <PhotoFigure
            src="/images/photo/people-door.jpg"
            alt="A staff member in khaki walking through a stone doorway, mid-step"
            sizes="(min-width: 90rem) 1440px, 100vw"
            ratio="aspect-[21/9]"
          />
        </div>
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
      {/* Night band over the misty ocean: the closing ground carries a
          full image background under a scrim, the maroon pill on top. */}
      <section className="chapter shell">
        <div className="band-night relative overflow-hidden rounded-[var(--r-card)] px-6 py-20 text-center sm:px-12 md:py-28">
          <div className="absolute inset-0" data-parallax>
            <Image
              src="/images/ocean.jpg"
              alt=""
              fill
              loading="lazy"
              sizes="(min-width: 64rem) 84rem, 100vw"
              className="object-cover opacity-40"
              aria-hidden
            />
          </div>
          <div className="photo-scrim" aria-hidden />
          <div className="relative">
            <h2 className="display-hero mx-auto max-w-5xl">
              Apply <span className="em-serif text-rose">now.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[38ch] text-[1.05rem] leading-relaxed opacity-90">
              Applications open by enquiry, addressed to the Principal&apos;s
              office. One message starts it.
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

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[0.85rem] opacity-80">
              <a href={`tel:${site.phoneHref}`} className="underline underline-offset-4">
                {site.phoneDisplay}
              </a>
              <span>{site.address}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
