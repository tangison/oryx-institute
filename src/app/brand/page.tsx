import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { BrandTabs } from "@/components/site/brand-tabs";
import { ArtifactCarousel } from "@/components/site/artifact-carousel";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Oryx Politechnical Institute brand: the three-script wordmark, the maroon shield, the exact colour codes and the voice the print kit sets.",
  alternates: { canonical: "/brand" },
  openGraph: {
    title: "Brand | Oryx Politechnical Institute",
    description:
      "The wordmark, the emblem, the codes and the voice, documented.",
    images: [
      {
        url: "/images/og-inner.jpg",
        width: 1200,
        height: 630,
        alt: "The Oryx Politechnical Institute brand register",
      },
    ],
  },
};

const kitItems = [
  {
    title: "Recruitment flyer",
    line: "Looks harmless. Isn't. Full-bleed wolf, three-word headline.",
    photo: "/images/brand/kit-flyer.jpg",
    alt: "The recruitment flyer with the wolf in sheep's clothing",
    note: "216 × 270",
  },
  {
    title: "Certificate of Achievement",
    line: "Double-rule border, Principal's signature line, dated by hand.",
    photo: "/images/brand/kit-certificate.jpg",
    alt: "The certificate of achievement",
    note: "Landscape",
  },
  {
    title: "Letterhead",
    line: "Lockup top left, shield watermark, contact rule at the foot.",
    photo: "/images/brand/kit-letterhead.jpg",
    alt: "The letterhead",
    note: "A4",
  },
  {
    title: "Business card",
    line: "The shield alone on the front; the Principal's card on the back.",
    photo: "/images/brand/kit-card-back.jpg",
    alt: "The business card reverse with the Principal's contact details",
    note: "DL",
  },
  {
    title: "Notecard",
    line: "The shield centered on white. Nothing else.",
    photo: "/images/brand/kit-notecard.jpg",
    alt: "The notecard with the shield emblem",
    note: "Correspondence",
  },
  {
    title: "Envelope",
    line: "Lockup and post box address, the shield at the right.",
    photo: "/images/brand/kit-envelope.jpg",
    alt: "The envelope with the wordmark and post box address",
    note: "DL",
  },
  {
    title: "Presentation folder",
    line: "The lockup over a misty ocean. Patience as paper.",
    photo: "/images/brand/kit-folder.jpg",
    alt: "The presentation folder over a misty ocean",
    note: "Presentation",
  },
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
        <h2 className="display-section max-w-2xl text-ink">
          The print kit, <span className="em-serif text-accent">in full</span>
        </h2>
        <p className="measure mt-4 text-[1.02rem] leading-relaxed text-soft">
          Seven pieces, printed and photographed. The site samples them
          exactly as supplied: the wolf from the flyer, the misty ocean
          from the folder, the layouts as they come.
        </p>
        <div className="mt-12">
          <ArtifactCarousel items={kitItems} ariaLabel="Print kit pieces" />
        </div>
      </section>

      <section className="chapter shell">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="overflow-hidden rounded-[var(--r-card)] border border-rule">
            <Image
              src="/images/brand/kit-flyer.jpg"
              alt="The recruitment flyer laid flat"
              width={1400}
              height={1750}
              sizes="(min-width: 64rem) 30vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-[var(--r-card)] border border-rule">
            <Image
              src="/images/brand/kit-certificate.jpg"
              alt="The certificate of achievement laid flat"
              width={1400}
              height={990}
              sizes="(min-width: 64rem) 30vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-[var(--r-card)] border border-rule">
            <Image
              src="/images/brand/kit-folder.jpg"
              alt="The presentation folder laid flat"
              width={1400}
              height={1930}
              sizes="(min-width: 64rem) 30vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
        <p className="photo-caption mt-6">
          Flyer, certificate and folder at actual proportion. The full kit
          also carries the letterhead, business card, notecard and
          envelope, shown in the carousel above.
        </p>
      </section>
    </>
  );
}
