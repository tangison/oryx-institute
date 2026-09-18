import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrubReveal } from "@/components/site/scrub-reveal";
import { ScaleFigure } from "@/components/site/scale-figure";
import { ArtifactCarousel } from "@/components/site/artifact-carousel";
import { site, disciplines } from "@/lib/site";

export const metadata: Metadata = {
  title: "Oryx Politechnical Institute | Looks harmless. Isn't.",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Oryx Politechnical Institute | Looks harmless. Isn't.",
    description: site.description,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Oryx Politechnical Institute: the wordmark over the wolf in sheep's clothing",
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

const artifactItems = [
  {
    title: "Recruitment flyer",
    line: "Looks harmless. Isn't. The wolf in sheep's clothing, full bleed.",
    photo: "/images/brand/kit-flyer.jpg",
    alt: "The Oryx Institute recruitment flyer: a wolf in sheep's clothing",
    note: "Print kit",
  },
  {
    title: "Certificate of Achievement",
    line: "Awarded for excellence in innovation and applied problem-solving.",
    photo: "/images/brand/kit-certificate.jpg",
    alt: "An Oryx Institute certificate of achievement",
    note: "Print kit",
  },
  {
    title: "Letterhead",
    line: "P.O. Box 1662, Windhoek. The institute's own stationery register.",
    photo: "/images/brand/kit-letterhead.jpg",
    alt: "Oryx Institute letterhead",
    note: "Print kit",
  },
  {
    title: "Business card",
    line: "Tangi Iigonda, Principal. The card carries the shield alone.",
    photo: "/images/brand/kit-card-back.jpg",
    alt: "Oryx Institute business card, reverse with contact details",
    note: "Print kit",
  },
  {
    title: "Notecard and envelope",
    line: "The maroon shield, centered, on the institute's correspondence set.",
    photo: "/images/brand/kit-notecard.jpg",
    alt: "Oryx Institute notecard with the shield emblem",
    note: "Print kit",
  },
  {
    title: "Presentation folder",
    line: "A calm ocean under mist. The institute's presentation register.",
    photo: "/images/brand/kit-folder.jpg",
    alt: "Oryx Institute presentation folder over a misty ocean",
    note: "Print kit",
  },
] as const;

export default function HomePage() {
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
          <p className="kicker label-caps text-soft">
            Oryx Politechnical Institute · Windhoek
          </p>

          {/* The 2-line iron rule: wide container, two lines exactly. */}
          <h1 className="display-hero max-w-5xl text-ink">
            Looks harmless.{" "}
            <span className="em-serif text-accent">Isn&apos;t.</span>
          </h1>

          <p className="max-w-[36ch] text-[1.18rem] leading-[1.55] text-ink/80 md:text-[1.3rem]">
            Oryx Institute graduates solve problems quietly and finish them
            decisively.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/apply" className="pill">
              Apply now
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
            <Link href="/programmes" className="pill-ghost">
              View programmes
            </Link>
          </div>
        </div>

        {/* The wolf fills the full right column edge to edge; the text
            block hangs low and left. Asymmetry by placement. */}
        <div className="relative min-h-[64svh] lg:min-h-full">
          <Image
            src="/images/wolf.jpg"
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
          credential band. Dense flow, no voids, no meta-labels. */}
      <section className="chapter shell">
        <h2 className="display-section max-w-5xl text-ink">
          Four disciplines, one temperament:{" "}
          <span
            className="inline-img"
            style={{ backgroundImage: "url(/images/wolf.jpg)" }}
            aria-hidden
          />{" "}
          <span className="em-serif text-accent">quiet</span>, then{" "}
          <span
            className="inline-img"
            style={{ backgroundImage: "url(/images/ocean.jpg)" }}
            aria-hidden
          />{" "}
          decisive.
        </h2>

        <div className="bento mt-14">
          {disciplines.map((d, i) => (
            <Link
              key={d.id}
              href={`/programmes#${d.id}`}
              className={`bento-cell ${i % 2 === 0 ? "sm:col-span-7" : "sm:col-span-5"}`}
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
          <div className="bento-cell sm:col-span-12 bg-paper-2">
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

      {/* ------------------------------------------------ Desire */}
      {/* The scroll chapter: the graduate statement scrubs to full ink
          word by word, then the misty ocean grows and recedes. */}
      <section className="chapter shell-wide">
        <ScrubReveal
          text="Oryx Institute graduates solve problems quietly and finish them decisively."
          className="display-statement mx-auto max-w-4xl text-center text-ink"
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div className="keyline">
            <p className="label-caps text-soft">The standard</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-soft">
              The line is set by the institute&apos;s own certificate: work is
              judged on innovation and applied problem-solving, nothing
              else. Everything the institute prints, from the flyer to the
              letterhead, keeps the same register.
            </p>
          </div>

          <ScaleFigure
            src="/images/ocean.jpg"
            alt="A calm ocean under heavy mist"
            width={1920}
            height={1180}
            sizes="(min-width: 64rem) 56vw, 100vw"
            caption="Presentation folder, Oryx Institute print kit"
          />
        </div>
      </section>

      {/* ------------------------------------------------ The record */}
      {/* The institute's own printed matter, in the artifact carousel. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-section max-w-2xl text-ink">
            Printed matter, <span className="em-serif text-accent">kept</span>
          </h2>
          <Link href="/brand" className="link-type text-[0.95rem]">
            The full brand register
          </Link>
        </div>
        <div className="mt-12">
          <ArtifactCarousel items={artifactItems} />
        </div>
      </section>

      {/* ------------------------------------------------ Action */}
      <section className="chapter shell">
        <div className="relative overflow-hidden rounded-[var(--r-card)] bg-accent px-6 py-20 text-center sm:px-12 md:py-28">
          <h2 className="display-hero mx-auto max-w-5xl text-accent-ink">
            Apply <span className="em-serif">now.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[38ch] text-[1.05rem] leading-relaxed text-accent-ink opacity-90">
            Applications open by enquiry, addressed to the Principal&apos;s
            office. One message starts it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="pill"
              style={{ background: "#FFF8EE", color: "#71111F", borderColor: "#FFF8EE" }}
            >
              Start your application
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="pill pill-photo !border-accent-ink/40"
            >
              {site.email}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[0.85rem] text-accent-ink opacity-80">
            <a href={`tel:${site.phoneHref}`} className="underline underline-offset-4">
              {site.phoneDisplay}
            </a>
            <span>{site.address}</span>
          </div>
        </div>
      </section>
    </>
  );
}
