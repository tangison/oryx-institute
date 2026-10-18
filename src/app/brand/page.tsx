import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { BrandTabs } from "@/components/site/brand-tabs";
import { PhotoCarousel } from "@/components/site/photo-carousel";
import { voice } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Brand Register",
  description:
    "The Oryx Institute brand: the three-script wordmark, the maroon shield, the exact colour codes, the print kit in full and the voice the site is written under.",
  alternates: { canonical: "/brand" },
  openGraph: {
    title: "The Brand Register | Oryx Institute",
    description:
      "The wordmark, the emblem, the codes and the voice, documented.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "The Oryx Institute brand register",
      },
    ],
  },
};

const kitSlides = [
  { src: "/images/brand/kit-flyer.jpg", alt: "The recruitment flyer with the wolf in sheep's clothing" },
  { src: "/images/brand/kit-certificate.jpg", alt: "The certificate of achievement, double-rule border and signature line" },
  { src: "/images/brand/kit-letterhead.jpg", alt: "The letterhead: lockup top left, shield watermark, contact rule at the foot" },
  { src: "/images/brand/kit-card-front.jpg", alt: "The business card front, the maroon shield alone" },
  { src: "/images/brand/kit-card-back.jpg", alt: "The business card reverse with the Principal's contact details" },
  { src: "/images/brand/kit-notecard.jpg", alt: "The notecard with the shield emblem centered" },
  { src: "/images/brand/kit-envelope.jpg", alt: "The envelope with the wordmark and post box address" },
  { src: "/images/brand/kit-folder.jpg", alt: "The presentation folder over a misty ocean" },
] as const;

/** The specimen wall: twelve of the master package's isolated objects,
    shown at native scale, image only, no captions. */
const specimenTiles = [
  { src: "/images/register/cutouts/cutout_01.webp", alt: "Oryx horns, isolated" },
  { src: "/images/register/cutouts/cutout_02.webp", alt: "A brass drafting compass, isolated" },
  { src: "/images/register/cutouts/cutout_03.webp", alt: "A wooden slide rule, isolated" },
  { src: "/images/register/cutouts/cutout_06.webp", alt: "A brass storm lantern, isolated" },
  { src: "/images/register/cutouts/cutout_10.webp", alt: "A welwitschia plant, isolated" },
  { src: "/images/register/cutouts/cutout_11.webp", alt: "A single green leaf, isolated" },
  { src: "/images/register/cutouts/cutout_12.webp", alt: "A raw mineral specimen, isolated" },
  { src: "/images/register/cutouts/cutout_13.webp", alt: "A welding torch tip, isolated" },
  { src: "/images/register/cutouts/cutout_14.webp", alt: "A canvas sun helmet, isolated" },
  { src: "/images/register/cutouts/cutout_15.webp", alt: "A laboratory beaker, isolated" },
  { src: "/images/register/cutouts/cutout_17.webp", alt: "The oryx, full body, isolated" },
  { src: "/images/register/cutouts/cutout_18.webp", alt: "A wooden set square, isolated" },
] as const;

export default function BrandPage() {
  return (
    <>
      <PageHero title="The brand" accent="register.">
        <p>
          Everything the institute prints, from the flyer to the
          certificate, keeps one register. This page documents it so the
          identity travels intact: the marks, the codes, the voice.
        </p>
      </PageHero>

      <section className="chapter shell">
        <BrandTabs />
      </section>

      <section className="chapter shell">
        <h2 className="display-section max-w-2xl text-ink" data-reveal>
          The print kit, <span className="em-serif text-accent">in full</span>
        </h2>
        <p className="measure mt-4 text-[1.02rem] leading-relaxed text-soft" data-reveal>
          Eight pieces, printed and photographed. The site samples them
          exactly as supplied: the wolf from the flyer, the misty ocean
          from the folder, the layouts as they come.
        </p>
        <div className="mt-12" data-reveal>
          <PhotoCarousel photos={kitSlides} ariaLabel="print kit pieces" />
        </div>
      </section>

      {/* The muse: the animal the identity is drawn from, image only. */}
      <section className="shell" data-reveal>
        <div className="overflow-hidden rounded-[var(--r-card)] border border-rule">
          <Image
            src="/images/wolf.jpg"
            alt="The wolf in the sheep's fleece, the animal behind the flyer's headline"
            width={1920}
            height={1458}
            sizes="(min-width: 90rem) 1440px, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* The specimen wall: the emblem objects, isolated. */}
      <section className="chapter shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-section max-w-2xl text-ink" data-reveal>
            The specimen <span className="em-serif text-accent">wall.</span>
          </h2>
          <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-soft" data-reveal>
            Twelve objects from the master package&apos;s cutout set, the
            things the identity is built out of, isolated on paper.
          </p>
        </div>
        <ul className="specimen-grid mt-12 md:grid-cols-3 lg:grid-cols-4" data-reveal-group>
          {specimenTiles.map((t) => (
            <li key={t.src} className="specimen-tile">
              <Image
                src={t.src}
                alt={t.alt}
                width={273}
                height={184}
                sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 33vw, 50vw"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      

      {/* The voice, with its bar. The rules are the contract the site
          itself is written under. */}
      <section className="chapter shell">
        <div className="band-blush rounded-[var(--r-card)] p-8 md:p-12">
          <p className="label-caps text-accent">The voice, with a bar</p>
          <p className="display-statement mt-4 max-w-3xl text-ink">
            {voice.register}
          </p>
          <ul className="mt-8 grid max-w-4xl gap-4">
            {voice.rules.map((r) => (
              <li key={r} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink/85">
                <span className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
