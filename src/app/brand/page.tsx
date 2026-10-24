import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { approvedLines, voice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Brand Register",
  description:
    "The Oryx Institute brand: the three-script wordmark, the maroon shield, the exact colour codes, the print kit in full, the voice the site is written under — and the downloads, ready for any printer.",
  alternates: { canonical: "/brand" },
  openGraph: {
    title: "The Brand Register | Oryx Institute",
    description:
      "The wordmark, the emblem, the codes, the voice — documented, with the asset downloads.",
    images: [
      {
        url: "/brand/og/brand.png",
        width: 1200,
        height: 630,
        alt: "The Oryx Institute brand register",
      },
    ],
  },
};

/**
 * Logo plates render from the exported brand files (public/brand/*.svg)
 * rather than inline vector paths: the page's HTML stays light and the
 * marks arrive as one cached asset per variant.
 */

/** The six download cards. */
const downloads = [
  {
    name: "Wordmark (SVG)",
    note: "ORYX · 理工 · INSTITUTE, ink letters with the characters in maroon. Transparent, vector, print-ready.",
    href: "/brand/oryx-wordmark.svg",
    format: "SVG · vector",
    preview: { src: "/brand/oryx-wordmark.svg", w: 300, h: 144, dark: false },
  },
  {
    name: "Wordmark — reverse (SVG)",
    note: "All elements in ivory, for dark grounds. Same geometry, no other change.",
    href: "/brand/oryx-wordmark-ivory.svg",
    format: "SVG · vector",
    preview: { src: "/brand/oryx-wordmark-ivory.svg", w: 300, h: 144, dark: true },
  },
  {
    name: "Emblem / Shield (SVG)",
    note: "The maroon shield alone. No text inside it, ever; no tilt, no recolour.",
    href: "/brand/oryx-emblem.svg",
    format: "SVG · vector",
    preview: { src: "/brand/oryx-emblem.svg", w: 106, h: 139, dark: false },
  },
  {
    name: "Emblem — reverse (SVG)",
    note: "The shield in ivory, for ink and maroon grounds.",
    href: "/brand/oryx-emblem-ivory.svg",
    format: "SVG · vector",
    preview: { src: "/brand/oryx-emblem-ivory.svg", w: 106, h: 139, dark: true },
  },
  {
    name: "Print press kit (PDF)",
    note: "One asset per page — wordmark, reverse, emblem, colour tokens — on paper grounds with crop marks, ready for the printer.",
    href: "/brand/oryx-press-kit.pdf",
    format: "PDF · A4",
    preview: { src: "/brand/oryx-wordmark.svg", w: 240, h: 115, dark: false, meta: "A4 · crop marks · CMYK-ready" },
  },
  {
    name: "PNG pack (ZIP)",
    note: "Wordmark and emblem, transparent backgrounds, at 256, 512, 1024 and 2048 px.",
    href: "/brand/oryx-png-pack.zip",
    format: "ZIP · PNG",
    preview: { src: "/brand/oryx-emblem.svg", w: 106, h: 139, dark: false, meta: "256 / 512 / 1024 / 2048 px" },
  },
] as const;

/** The print kit, photographed as supplied. The flyer, the card reverse
 *  and the envelope are held back from the site: they print contact
 *  details and artwork the institute is not publishing while it is
 *  being established. */
const kitPieces = [
  { src: "/images/brand/kit-certificate.jpg", alt: "The certificate of achievement, double-rule border and signature line" },
  { src: "/images/brand/kit-letterhead.jpg", alt: "The letterhead: lockup top left, shield watermark, contact rule at the foot" },
  { src: "/images/brand/kit-card-front.jpg", alt: "The business card front, the maroon shield alone" },
  { src: "/images/brand/kit-notecard.jpg", alt: "The notecard with the shield emblem centered" },
  { src: "/images/brand/kit-folder.jpg", alt: "The presentation folder over the institute's own coastal frame" },
] as const;

/** The specimen wall: one object per full-bleed cream plate. */
const specimens = [
  {
    src: "/images/kinfolk/k02-stone.jpg",
    alt: "One weathered stone specimen, centred on cream paper",
    caption: "Specimen · stone",
  },
  {
    src: "/images/kinfolk/k09-horns.jpg",
    alt: "Two shed oryx horns, crossed, centred on cream paper",
    caption: "Specimen · horns",
  },
  {
    src: "/images/kinfolk/k10-wax.jpg",
    alt: "A maroon wax seal with ribbon, centred on cream paper",
    caption: "Specimen · seal",
  },
  {
    src: "/images/kinfolk/k05-notebook.jpg",
    alt: "A bound maroon notebook with ribbon, centred on cream paper",
    caption: "Specimen · notebook",
  },
] as const;

const swatches = [
  { name: "Ink", hex: "#181713", usage: "Wordmark letters, body text, dark grounds", bg: "#181713", fg: "#FFF8EE", mark: "理工" },
  { name: "Maroon", hex: "#71111F", usage: "The shield, 理工, accents, fills, CTAs", bg: "#71111F", fg: "#FFF8EE", mark: "理工" },
  { name: "Cream", hex: "#F4EEE4", usage: "The default page ground, paper", bg: "#F4EEE4", fg: "#181713", mark: "Aa" },
  { name: "Ivory", hex: "#FFF8EE", usage: "Text on ink and maroon, the reverse logo", bg: "#FFF8EE", fg: "#181713", mark: "Aa" },
  { name: "Terracotta", hex: "#B5533A", usage: "Image palette and colour bands only — never UI, never the logo", bg: "#B5533A", fg: "#FFF8EE", mark: "—" },
  { name: "Sand", hex: "#D8C6A8", usage: "The Corner Spa section palette", bg: "#D8C6A8", fg: "#181713", mark: "Aa" },
] as const;

function LogoPlate({
  src,
  w,
  h,
  alt,
  style,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  style?: React.CSSProperties;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      style={style}
      className="h-auto w-auto max-h-full max-w-full"
    />
  );
}

export default function BrandPage() {
  return (
    <>
      <PageHead eyebrow="The register" title="The brand register.">
        <p>
          Everything the institute prints, from the flyer to the
          certificate, keeps one register. This page documents it so the
          identity travels intact: the marks, the codes, the voice — and
          the files, ready to download.
        </p>
      </PageHead>

      {/* 1 · Assets and downloads — the reason the page exists */}
      <section id="downloads" className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">Assets &amp; downloads</p>
            <p className="measure text-soft" data-reveal>
              The marks as vector files, the press kit for printers, and
              the transparent PNGs for screens. Take them; keep them
              intact.
            </p>
          </div>

          <div className="dl-grid mt-12">
            {downloads.map((d) => (
              <a key={d.href} href={d.href} download className="dl-card" data-reveal>
                <span className={`dl-preview ${d.preview.dark ? "dl-preview--ink" : ""}`}>
                  <LogoPlate
                    src={d.preview.src}
                    w={d.preview.w}
                    h={d.preview.h}
                    alt=""
                    style={d.preview.w === 300 || d.preview.w === 240 ? { width: "72%" } : { height: "72%" }}
                  />
                </span>
                <span className="dl-name">{d.name}</span>
                <span className="dl-note">{d.note}</span>
                <span className="meta">
                  {d.format} · Download
                </span>
              </a>
            ))}
          </div>

          <p className="measure mt-8 text-[0.92rem] leading-relaxed text-soft" data-reveal>
            Embroidery files, signage vectors, co-branding templates and
            the editable guidelines document are issued on request —{" "}
            <a href={`mailto:${site.email}`} className="link-type">
              write to the office
            </a>
            .
          </p>
        </div>
      </section>

      {/* 2 · Wordmark rules */}
      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div className="panel grid place-items-center bg-white p-12 md:p-16" data-reveal>
            <LogoPlate src="/brand/oryx-lockup.svg" w={440} h={152} alt="The Oryx Institute lockup: ORYX, 理工, INSTITUTE, with the shield" />
          </div>
          <div className="grid gap-5">
            <p className="eyebrow eyebrow--ink">The wordmark</p>
            <p className="text-soft" data-reveal>
              Three scripts, one lockup.{" "}
              <strong className="text-ink">ORYX</strong> and{" "}
              <strong className="text-ink">INSTITUTE</strong> set in a
              classic serif, ink {"#181713"};{" "}
              <span className="wordmark-cjk">理工</span>, the characters
              for science and engineering, stands where the word
              Polytechnic sits in the full legal name, in maroon{" "}
              {"#71111F"}.
            </p>
            <p className="text-soft" data-reveal>
              The characters align to the ORYX baseline and scale to the
              cap height of the X, exactly as the supplied artwork draws
              them. The wordmark is never redrawn, never restacked and
              never set in another typeface: the site renders it from the
              artwork&apos;s own vector paths.
            </p>
          </div>
        </div>
      </section>

      {/* 3 · Emblem rules */}
      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
          <div className="grid place-items-center bg-ink p-12 md:p-16 order-2 lg:order-1" data-reveal>
            <LogoPlate src="/brand/oryx-emblem-ivory.svg" w={112} h={147} alt="The shield emblem, reverse" />
          </div>
          <div className="grid gap-5 order-1 lg:order-2">
            <p className="eyebrow eyebrow--ink">The emblem</p>
            <p className="text-soft" data-reveal>
              The maroon shield, with its horn-mark knocked through in
              white. On the business card&apos;s reverse the shield stands
              alone; on the notecard it centres on white; on the envelope
              it sits at the right of the lockup.
            </p>
            <p className="text-soft" data-reveal>
              The emblem never carries text inside it, never tilts, and
              never appears in any colour but the maroon or the reverse
              ivory. On maroon grounds the mark stays ivory; on light
              grounds it stays white.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Colour codes */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">Colour</p>
            <p className="measure text-soft" data-reveal>
              Six codes, sampled from the logo artwork and the register.
              Tints between them are mixed from these anchors only, and
              terracotta never touches a button or the mark.
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((c) => (
              <div className="swatch" key={c.hex} data-reveal>
                <div
                  className="swatch-chip"
                  style={{ background: c.bg, color: c.fg }}
                >
                  <span className={c.mark === "理工" ? "wordmark-cjk" : ""} style={c.mark === "理工" ? { color: c.fg } : undefined}>
                    {c.mark}
                  </span>
                </div>
                <div className="swatch-meta">
                  <p className="font-[500]">{c.name}</p>
                  <p className="tnum mt-1 text-[0.85rem] text-maroon">{c.hex}</p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-soft">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Clearspace */}
      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div className="clearspace" data-reveal>
            <div className="clearspace-frame">
              <LogoPlate src="/brand/oryx-lockup.svg" w={400} h={138} alt="" />
            </div>
          </div>
          <div className="grid gap-5">
            <p className="eyebrow eyebrow--ink">Clearspace</p>
            <p className="text-soft" data-reveal>
              The wordmark keeps a margin of one X cap-height on every
              side — the dashed frame marks it. Nothing enters the frame:
              no type, no rules, no edges of other elements.
            </p>
            <p className="text-soft" data-reveal>
              The same margin governs the emblem. When in doubt, double
              it; the mark is never crowded.
            </p>
          </div>
        </div>
      </section>

      {/* 6 · Do / don't */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">Do / don&apos;t</p>
            <p className="measure text-soft" data-reveal>
              Six plates, three of each. The wrong ones are drawn wrong on
              purpose.
            </p>
          </div>
          <div className="dd-grid mt-12">
            <div className="dd-card" data-reveal>
              <span className="dd-plate">
                <LogoPlate src="/brand/oryx-lockup.svg" w={260} h={90} alt="" />
              </span>
              <p className="offer-tag">Do</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">
                The lockup on paper, ink and maroon, at rest.
              </p>
            </div>
            <div className="dd-card" data-reveal>
              <span className="dd-plate dd-plate--maroon">
                <LogoPlate src="/brand/oryx-lockup-ivory.svg" w={260} h={90} alt="" />
              </span>
              <p className="offer-tag">Do</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">
                The reverse lockup, ivory on the maroon ground.
              </p>
            </div>
            <div className="dd-card" data-reveal>
              <span className="dd-plate">
                {/* The one deliberate inline path on the page: a shield
                    recoloured terracotta — the wrong colour, shown as
                    wrong. */}
                <svg viewBox="0 0 146.68 191.81" fill="none" style={{ height: "70%" }} aria-hidden="true">
                  <path d="M 148.89 3.54 L 4.42 3.76 C 4.54 17.77 3.61 67.70 5.09 87.83 C 6.56 107.96 10.10 114.82 13.27 124.56 C 16.45 134.29 19.80 139.38 24.12 146.24 C 28.43 153.10 30.46 157.52 39.16 165.71 C 47.86 173.89 70.13 190.41 76.33 195.35 C 79.83 192.88 90.78 185.95 97.35 180.53 C 103.91 175.11 112.65 165.78 115.71 162.83 C 112.06 158.89 99.96 148.08 93.81 139.16 C 87.65 130.24 81.27 114.27 78.76 109.29 L 66.37 107.96 L 50.66 118.36 L 39.82 106.86 L 125.66 18.36 L 134.07 27.88 L 78.10 86.50 L 141.81 121.24 C 143.03 114.38 147.94 99.71 149.12 80.09 C 150.29 60.47 148.93 16.30 148.89 3.54 Z" transform="translate(-3.61,-3.54)" fill="#B5533A"/>
                </svg>
              </span>
              <p className="offer-tag">Don&apos;t</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">
                Never recolour the mark. Terracotta is for bands and imagery, not the logo.
              </p>
            </div>
            <div className="dd-card" data-reveal>
              <span className="dd-plate">
                <span style={{ transform: "rotate(-7deg)", display: "inline-block" }}>
                  <LogoPlate src="/brand/oryx-lockup.svg" w={260} h={90} alt="" />
                </span>
              </span>
              <p className="offer-tag">Don&apos;t</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">
                Never skew or rotate the lockup.
              </p>
            </div>
            <div className="dd-card" data-reveal>
              <span className="dd-plate">
                <span
                  style={{
                    display: "inline-block",
                    filter: "drop-shadow(6px 6px 4px rgba(24,23,19,0.45))",
                  }}
                >
                  <LogoPlate src="/brand/oryx-lockup.svg" w={260} h={90} alt="" />
                </span>
              </span>
              <p className="offer-tag">Don&apos;t</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">
                Never add a drop shadow. The mark prints flat, always.
              </p>
            </div>
            <div className="dd-card" data-reveal>
              <span className="dd-plate">
                <span className="text-center" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="block text-[1.5rem] tracking-[0.35em]">ORYX</span>
                  <span className="wordmark-cjk my-1 block text-[1.1rem]">理工</span>
                  <span className="block text-[1.1rem] tracking-[0.3em]">INSTITUTE</span>
                </span>
              </span>
              <p className="offer-tag">Don&apos;t</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">
                Never restack the lockup or rebuild it in another typeface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Print kit gallery — the one place a shadow is allowed */}
      <section className="section">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">The print kit</p>
            <p className="measure text-soft" data-reveal>
              The pieces the institute publishes while it is being
              established, photographed as supplied. Hard daylight, one
              piece per frame.
            </p>
          </div>
          <div className="kit-grid mt-12">
            {kitPieces.map((k) => (
              <figure className="kit-figure" key={k.src} data-reveal>
                <Image
                  src={k.src}
                  alt={k.alt}
                  width={1000}
                  height={700}
                  sizes="(min-width: 80rem) 30vw, (min-width: 48rem) 45vw, 90vw"
                  className="h-auto w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · Specimen wall — one object per cream plate */}
      <section className="section" id="specimens">
        <div className="shell">
          <div className="hair-t grid gap-10 pt-14 md:grid-cols-[auto_1fr] md:items-baseline md:gap-16">
            <p className="eyebrow">Specimens</p>
            <p className="measure text-soft" data-reveal>
              The objects the identity is built from, one per plate, on
              cream. Replaced with real Windhoek objects as they are
              collected.
            </p>
          </div>
        </div>

        {/* The shield, first: the register's own object */}
        <div className="specimen" data-reveal>
          <LogoPlate src="/brand/oryx-emblem.svg" w={200} h={262} alt="The maroon shield at large size" style={{ height: "clamp(18rem, 40vh, 26rem)", width: "auto" }} />
          <p className="caption">Specimen · the shield</p>
        </div>

        {specimens.map((s) => (
          <div className="specimen" key={s.src} data-reveal>
            <Image
              src={s.src}
              alt={s.alt}
              width={1120}
              height={1400}
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="obj h-auto"
            />
            <p className="caption">{s.caption}</p>
          </div>
        ))}
      </section>

      {/* 9 · The voice, with its bar */}
      <section className="section-lg">
        <div className="shell">
          <div className="panel p-8 md:p-12">
            <p className="eyebrow eyebrow--ink">The voice, with a bar</p>
            <p className="h-section mt-5 max-w-[26ch]" data-reveal>
              {voice.register}
            </p>
            <ul className="mt-8 grid max-w-4xl gap-4">
              {voice.rules.map((r) => (
                <li
                  key={r}
                  className="flex gap-3 text-[1.0rem] leading-relaxed text-soft"
                >
                  <span
                    className="mt-[0.55em] h-[5px] w-[5px] shrink-0 bg-maroon"
                    aria-hidden="true"
                  />
                  {r}
                </li>
              ))}
            </ul>

            <div className="hair-t mt-10 pt-8">
              <p className="eyebrow eyebrow--ink">Approved lines</p>
              <ul className="mt-5 grid max-w-3xl gap-3 text-[0.95rem] leading-relaxed text-soft">
                {approvedLines.map((l) => (
                  <li key={l.line}>
                    &ldquo;{l.line}&rdquo; · {l.source}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
