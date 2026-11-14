import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { OryxLogo } from "@/components/site/oryx-logo";
import { approvedLines, voice, site } from "@/lib/site";
import { approvedLinesAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "The Brand Register",
      description:
        "The Oryx Institute brand: the ORYX · 理工 · INSTITUTE lockup, the maroon shield, the exact colour codes, the print kit, the voice, and the downloads.",
      ogTitle: "The Brand Register | Oryx Institute",
      ogDescription:
        "The wordmark, the emblem, the codes, the voice: documented, with the asset downloads.",
    },
    head: {
      eyebrow: "The register",
      title: "The brand register.",
      lede: "Everything the institute prints, from the flyer to the certificate, keeps one register. This page documents it so the identity travels intact: the marks, the codes, the voice, and the files, ready to download.",
    },
    dlEyebrow: "Assets & downloads",
    dlBody:
      "The marks as vector files, the press kit for printers, and the transparent PNGs for screens. Take them; keep them intact.",
    download: "Download",
    onRequest: {
      pre: "Embroidery files, signage vectors, co-branding templates and the editable guidelines document are issued on request: ",
      link: "write to the office",
      post: ".",
    },
    wordmarkEyebrow: "The wordmark",
    wordmarkA:
      "Three-part lockup. ORYX and INSTITUTE set in a classic serif, ink #181713; 理工, the characters for science and engineering, stands where Polytechnic sits in the legal name, in maroon #71111F.",
    wordmarkB:
      "理工 aligns to the ORYX baseline in the supplied artwork. The wordmark is immutable: never redraw, restack, substitute, or set it in another typeface. The site renders the supplied vector paths exactly.",
    emblemEyebrow: "The emblem",
    emblemA:
      "The maroon shield, with its horn-mark knocked through in white. On the business card's reverse the shield stands alone; on the notecard it centres on white; on the envelope it sits at the right of the lockup.",
    emblemB:
      "The emblem never carries text inside it, never tilts, and never appears in any colour but the maroon or the reverse ivory. On maroon grounds the mark stays ivory; on light grounds it stays\u00A0white.",
    colourEyebrow: "Colour",
    colourBody:
      "Six codes, sampled from the logo artwork and the register. Tints between them are mixed from these anchors only, and terracotta never touches a button or the mark.",
    clearspaceEyebrow: "Clearspace",
    clearspaceA:
      "The wordmark keeps a margin of one X cap-height on every side, marked by the dashed frame. Nothing enters the frame: no type, no rules, no edges of other elements.",
    clearspaceB:
      "The same margin governs the emblem. When in doubt, double it; the mark is never crowded.",
    ddEyebrow: "Do / don't",
    ddBody: "Six plates, three of each. The wrong ones are drawn wrong on purpose.",
    do1: "The lockup on paper, ink and maroon, at rest.",
    do2: "The reverse lockup, ivory on the maroon\u00A0ground.",
    dont1: "Never recolour the mark. Terracotta is for bands and imagery, not the logo.",
    dont2: "Never skew or rotate the lockup.",
    dont3: "Never add a drop shadow. The mark prints flat,\u00A0always.",
    dont4: "Never restack the lockup or rebuild it in another\u00A0typeface.",
    kitEyebrow: "The print kit",
    kitBody:
      "The pieces the institute publishes while it is being established, photographed in the house register, one piece per screen. Every mark you see is the real vector, set in code over the\u00A0photograph.",
    specimensEyebrow: "Specimens",
    specimensBody:
      "The objects the identity is built from, one per plate, on cream and terracotta. Replaced with real Windhoek objects as they are collected.",
    shieldCaption: "Specimen · the shield",
    specimenWord: "Specimen",
    voiceEyebrow: "The voice, with a bar",
    approvedEyebrow: "Approved lines",
    do: "Do",
    dont: "Don't",
  },
  af: {
    meta: {
      title: "The Brand Register",
      description:
        "The Oryx Institute brand: the ORYX · 理工 · INSTITUTE lockup, the maroon shield, the exact colour codes, the print kit, the voice, and the downloads.",
      ogTitle: "The Brand Register | Oryx Institute",
      ogDescription:
        "The wordmark, the emblem, the codes, the voice: documented, with the asset downloads.",
    },
    head: {
      eyebrow: "The register",
      title: "The brand register.",
      lede: "Everything the institute prints, from the flyer to the certificate, keeps one register. This page documents it so the identity travels intact: the marks, the codes, the voice, and the files, ready to download.",
    },
    dlEyebrow: "Assets & downloads",
    dlBody:
      "The marks as vector files, the press kit for printers, and the transparent PNGs for screens. Take them; keep them intact.",
    download: "Download",
    onRequest: {
      pre: "Embroidery files, signage vectors, co-branding templates and the editable guidelines document are issued on request: ",
      link: "write to the office",
      post: ".",
    },
    wordmarkEyebrow: "The wordmark",
    wordmarkA:
      "Three-part lockup. ORYX and INSTITUTE set in a classic serif, ink #181713; 理工, the characters for science and engineering, stands where Polytechnic sits in the legal name, in maroon #71111F.",
    wordmarkB:
      "理工 aligns to the ORYX baseline in the supplied artwork. The wordmark is immutable: never redraw, restack, substitute, or set it in another typeface. The site renders the supplied vector paths exactly.",
    emblemEyebrow: "The emblem",
    emblemA:
      "The maroon shield, with its horn-mark knocked through in white. On the business card's reverse the shield stands alone; on the notecard it centres on white; on the envelope it sits at the right of the lockup.",
    emblemB:
      "The emblem never carries text inside it, never tilts, and never appears in any colour but the maroon or the reverse ivory. On maroon grounds the mark stays ivory; on light grounds it stays\u00A0white.",
    colourEyebrow: "Colour",
    colourBody:
      "Six codes, sampled from the logo artwork and the register. Tints between them are mixed from these anchors only, and terracotta never touches a button or the mark.",
    clearspaceEyebrow: "Clearspace",
    clearspaceA:
      "The wordmark keeps a margin of one X cap-height on every side, marked by the dashed frame. Nothing enters the frame: no type, no rules, no edges of other elements.",
    clearspaceB:
      "The same margin governs the emblem. When in doubt, double it; the mark is never crowded.",
    ddEyebrow: "Do / don't",
    ddBody: "Six plates, three of each. The wrong ones are drawn wrong on purpose.",
    do1: "The lockup on paper, ink and maroon, at rest.",
    do2: "The reverse lockup, ivory on the maroon\u00A0ground.",
    dont1: "Never recolour the mark. Terracotta is for bands and imagery, not the logo.",
    dont2: "Never skew or rotate the lockup.",
    dont3: "Never add a drop shadow. The mark prints flat,\u00A0always.",
    dont4: "Never restack the lockup or rebuild it in another\u00A0typeface.",
    kitEyebrow: "The print kit",
    kitBody:
      "The pieces the institute publishes while it is being established, photographed in the house register, one piece per screen. Every mark you see is the real vector, set in code over the\u00A0photograph.",
    specimensEyebrow: "Specimens",
    specimensBody:
      "The objects the identity is built from, one per plate, on cream and terracotta. Replaced with real Windhoek objects as they are collected.",
    shieldCaption: "Specimen · the shield",
    specimenWord: "Specimen",
    voiceEyebrow: "The voice, with a bar",
    approvedEyebrow: "Approved lines",
    do: "Do",
    dont: "Don't",
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
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, "/brand", site.url),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${site.url}${lang === "af" ? "/af" : ""}/brand`,
      images: [
        { url: "/brand/og/brand.png", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
  };
}

/**
 * Logo plates render from the exported brand files (public/brand/*.svg)
 * rather than inline vector paths: the page's HTML stays light and the
 * marks arrive as one cached asset per variant.
 */

/** The download cards, per language. */
function downloads(af: boolean) {
  return [
    {
      name: af ? "Wordmark (SVG)" : "Wordmark (SVG)",
      note: "ORYX · 理工 · INSTITUTE, ink letters with 理工 in maroon. Transparent, vector, print-ready.",
      href: "/brand/oryx-wordmark.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-wordmark.svg", w: 300, h: 144, dark: false, wide: true },
    },
    {
      name: af ? "Wordmark, reverse (SVG)" : "Wordmark, reverse (SVG)",
      note: af ? "All elements in ivory, for dark grounds. Same geometry, no other change." : "All elements in ivory, for dark grounds. Same geometry, no other change.",
      href: "/brand/oryx-wordmark-ivory.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-wordmark-ivory.svg", w: 300, h: 144, dark: true, wide: true },
    },
    {
      name: af ? "Emblem / Shield (SVG)" : "Emblem / Shield (SVG)",
      note: af ? "The maroon shield alone. No text inside it, ever; no tilt, no recolour." : "The maroon shield alone. No text inside it, ever; no tilt, no recolour.",
      href: "/brand/oryx-emblem.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-emblem.svg", w: 106, h: 139, dark: false, wide: false },
    },
    {
      name: af ? "Emblem, reverse (SVG)" : "Emblem, reverse (SVG)",
      note: af ? "The shield in ivory, for ink and maroon grounds." : "The shield in ivory, for ink and maroon grounds.",
      href: "/brand/oryx-emblem-ivory.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-emblem-ivory.svg", w: 106, h: 139, dark: true, wide: false },
    },
    {
      name: af ? "PNG pack (ZIP)" : "PNG pack (ZIP)",
      note: af ? "Wordmark and emblem, transparent backgrounds, at 256, 512, 1024 and 2048 px." : "Wordmark and emblem, transparent backgrounds, at 256, 512, 1024 and 2048 px.",
      href: "/brand/oryx-png-pack.zip",
      format: "ZIP · PNG",
      preview: { src: "/brand/oryx-emblem.svg", w: 106, h: 139, dark: false, wide: false },
    },
  ];
}

/**
 * The print kit, photographed in the house register (Image Asset
 * Manifest v4, print/): certificate, letterhead, business card
 * reverse, notecard, folder. The stock photographs are blank or carry
 * placeholder marks; the REAL marks are composited on top in code, per
 * the brief: no photograph may carry an AI-drawn shield. Each entry
 * positions its overlay as a percentage of the frame.
 */
const kitPieces = [
  {
    src: "/images/kinfolk/print/11-certificate.jpg",
    alt: "The certificate: cream sheet with a double-rule maroon border, on dark walnut",
    w: 1402,
    h: 1122,
    overlay: {
      kind: "certificate" as const,
      /** The sheet spans 19%..81% horizontally, 21%..79% vertically. */
      sheet: { left: "19%", top: "21%", width: "62%", height: "58%" },
    },
  },
  {
    src: "/images/kinfolk/print/12-letterhead-blank.jpg",
    alt: "The letterhead: cream sheet on dark walnut, the lockup set top left",
    w: 1402,
    h: 1122,
    overlay: {
      kind: "letterhead" as const,
      /** The sheet spans 24.5%..74.5% horizontally, 14%..84.5%
          vertically. The lockup sits one clearspace in from the
          sheet's top left; the hairline rule and the office line sit
          near the sheet's bottom edge (Audit A5). */
      sheet: { left: "24.5%", top: "14%", width: "50%", height: "70.5%" },
    },
  },
  {
    src: "/images/kinfolk/print/13-card-blank.jpg",
    alt: "The business card reverse: maroon stock on cream, the shield centred",
    w: 1254,
    h: 1254,
    overlay: {
      kind: "emblem-ivory" as const,
      /** The card spans 22.5%..78.5% x 34%..67.5%; the emblem holds
          its centre at roughly 28% of the card's width. */
      box: { left: "50.5%", top: "50.6%", height: "16%" },
    },
  },
  {
    src: "/images/kinfolk/print/14-notecard-blank.jpg",
    alt: "The folded notecard: cream stock on dark walnut, the shield centred high",
    w: 1122,
    h: 1402,
    overlay: {
      kind: "emblem" as const,
      /** The card front spans 30%..70% x 20%..75%; the emblem sits
          centred in the upper half of the front, small. */
      box: { left: "50%", top: "39%", height: "12%" },
    },
  },
  {
    src: "/images/kinfolk/print/15-folder-blank.jpg",
    alt: "The presentation folder: maroon stock on cream, the shield centred",
    w: 1402,
    h: 1122,
    overlay: {
      kind: "emblem-ivory" as const,
      /** The folder spans 21.5%..81.5% x 12%..90.5%; the emblem
          holds its centre at roughly 20% of the folder's width. */
      box: { left: "51.5%", top: "50.3%", height: "15%" },
    },
  },
  {
    src: "/images/kinfolk/print/20-envelope-maroon.jpg",
    alt: "The envelope: maroon stock on cream, the wordmark set at the return position",
    w: 1254,
    h: 1254,
    overlay: {
      kind: "wordmark-ivory" as const,
      /** The envelope spans 22%..81% x 29%..72%; the ivory wordmark
          sits small at the top-left return position (Audit A1). */
      box: { left: "30%", top: "36.5%", width: "17%" },
    },
  },
];

/** The specimen wall: one object per full plate; manifest v4 assigns
 *  stone, horns, wax and notebook to this wall; the mineral plate is
 *  not commissioned yet. */
const specimens = [
  {
    src: "/images/kinfolk/core/02-stone.jpg",
    alt: "One weathered stone specimen, centred on cream paper",
    caption: { en: "stone", af: "klip" },
    w: 1254,
    h: 1254,
  },
  {
    src: "/images/kinfolk/core/09-horns.jpg",
    alt: "Two shed oryx horns lying parallel, centred on cream paper",
    caption: { en: "horns", af: "horings" },
    w: 1402,
    h: 1122,
  },
  {
    src: "/images/kinfolk/core/10-wax-seal.jpg",
    alt: "A cream envelope closed with a maroon wax seal and ribbon, centred on cream paper",
    caption: { en: "wax seal", af: "was-seël" },
    w: 1254,
    h: 1254,
  },
  {
    src: "/images/kinfolk/core/04-notebook.jpg",
    alt: "A bound maroon notebook with ribbon, centred on cream paper",
    caption: { en: "notebook", af: "notaboek" },
    w: 1402,
    h: 1122,
  },
  {
    src: "/images/kinfolk/core/06-game-board.jpg",
    alt: "A carved wooden morabaraba board with scattered counters, centred on terracotta cloth",
    caption: { en: "morabaraba board", af: "morabaraba-bord" },
    w: 1402,
    h: 1122,
  },
  {
    src: "/images/kinfolk/inner/19-mineral.jpg",
    alt: "A Namibian desert mineral specimen, centred on cream paper",
    caption: { en: "desert mineral", af: "woestynmineraal" },
    w: 1254,
    h: 1254,
  },
  {
    src: "/images/kinfolk/inner/18-cup.jpg",
    alt: "An enamel office cup, centred on cream paper",
    caption: { en: "cup", af: "beker" },
    w: 1254,
    h: 1254,
  },
];

function swatches(af: boolean) {
  return [
    {
      name: af ? "Ink" : "Ink",
      hex: "#181713",
      usage: af ? "Wordmark letters, body text, dark grounds" : "Wordmark letters, body text, dark grounds",
      bg: "#181713",
      fg: "#FFF8EE",
      /* Ink carries the Latin specimen: it is the colour the wordmark's
         letters are set in. The 理工 specimen belongs to Maroon. */
      mark: "Aa",
    },
    {
      name: af ? "Maroon" : "Maroon",
      hex: "#71111F",
      usage: "The shield, 理工, accents, fills, CTAs",
      bg: "#71111F",
      fg: "#FFF8EE",
      mark: "理工",
    },
    {
      name: af ? "Cream" : "Cream",
      hex: "#F4EEE4",
      usage: af ? "The default page ground, paper" : "The default page ground, paper",
      bg: "#F4EEE4",
      fg: "#181713",
      mark: "Aa",
    },
    {
      name: af ? "Ivory" : "Ivory",
      hex: "#FFF8EE",
      usage: af ? "Text on ink and maroon, the reverse logo" : "Text on ink and maroon, the reverse logo",
      bg: "#FFF8EE",
      fg: "#181713",
      mark: "Aa",
    },
    {
      name: af ? "Terracotta" : "Terracotta",
      hex: "#B5533A",
      usage: af ? "Image palette and colour bands only: never UI, never the\u00A0logo" : "Image palette and colour bands only: never UI, never the\u00A0logo",
      bg: "#B5533A",
      fg: "#FFF8EE",
      mark: "Aa",
    },
    {
      name: af ? "Sand" : "Sand",
      hex: "#D8C6A8",
      usage: af ? "The Corner Spa section palette" : "The Corner Spa section palette",
      bg: "#D8C6A8",
      fg: "#181713",
      mark: "Aa",
    },
  ];
}

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
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      style={style}
      /* The wordmark plates sit in the first viewport on small screens,
         so the marks load eagerly; the wall is small SVGs, not plates. */
      loading="eager"
      decoding="async"
      className="h-auto w-auto max-h-full max-w-full"
    />
  );
}

/** The real mark, absolutely positioned over a stock photograph.
 *  Percentages are of the figure frame; the mark stays in code, per
 *  the brief. */
function OverlayMark({ piece }: { piece: (typeof kitPieces)[number] }) {
  const o = piece.overlay;
  if (o.kind === "certificate") {
    return (
      <div
        className="absolute flex flex-col items-center justify-between text-center"
        style={{ ...o.sheet, padding: "6% 7%" }}
        aria-hidden="true"
      >
        <div>
          <p
            className="text-[0.72rem] font-[500] tracking-[0.42em]"
            style={{ color: "var(--maroon)" }}
          >
            CERTIFICATE
          </p>
          <span className="mx-auto mt-[7%] block w-[38%]">
            <LogoPlate
              src="/brand/oryx-emblem.svg"
              w={106}
              h={139}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </span>
        </div>
        <div className="w-full">
          <span className="mx-auto block w-[52%] border-t" style={{ borderColor: "#18171355" }} />
          <p className="mt-[3%] text-[0.6rem] tracking-[0.2em]" style={{ color: "#18171399" }}>
            PRINCIPAL
          </p>
        </div>
      </div>
    );
  }
  if (o.kind === "letterhead") {
    /* The letterhead carries two marks: the lockup one clearspace in
       from the sheet's top left, and a maroon hairline rule with the
       office line near the sheet's bottom edge (Audit A5). */
    return (
      <div className="absolute" style={o.sheet} aria-hidden="true">
        <span
          className="absolute"
          style={{ left: "9%", top: "9%", width: "46%" }}
        >
          <LogoPlate
            src="/brand/oryx-lockup.svg"
            w={440}
            h={152}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        </span>
        <span
          className="absolute border-t"
          style={{
            left: "9%",
            right: "9%",
            bottom: "9%",
            borderColor: "var(--maroon)",
          }}
        />
        <p
          className="absolute text-[0.55rem] tracking-[0.14em]"
          style={{ left: "9%", bottom: "5.5%", color: "#181713B3" }}
        >
          info@oryxinstitute.org · Windhoek · Namibia
        </p>
      </div>
    );
  }
  if (o.kind === "wordmark-ivory") {
    /* The envelope's return position: the ivory wordmark, small. */
    return (
      <span
        className="absolute"
        style={{ ...o.box }}
        aria-hidden="true"
      >
        <LogoPlate
          src="/brand/oryx-wordmark-ivory.svg"
          w={465}
          h={222}
          alt=""
          style={{ width: "100%", height: "auto" }}
        />
      </span>
    );
  }
  const src =
    o.kind === "emblem-ivory"
      ? "/brand/oryx-emblem-ivory.svg"
      : "/brand/oryx-emblem.svg";
  const w = 106;
  const h = 139;
  const style: React.CSSProperties = {
    height: o.box.height,
    position: "absolute",
    left: o.box.left,
    top: o.box.top,
    transform: "translate(-50%, -50%)",
  };
  return (
    <span className="absolute" style={style} aria-hidden="true">
      <LogoPlate src={src} w={w} h={h} alt="" style={{ width: "100%", height: "auto" }} />
    </span>
  );
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = langFromParams(await params);
  const af = lang === "af";
  const t = copy[lang];
  const lines = af ? approvedLinesAf : approvedLines;
  const voiceText = af
    ? {
        register: "Stellig, presies en onbehaas. Sê die feit; noem die bron; stop.",
        rules: [
          "Gebruik goedgekeurde sinne woord vir woord.",
          "Feite kry 'n bron in die sin, of word nie gepubliseer nie.",
          "Geen grappies, selfkommentaar of byskrifte onder beelde nie.",
          "Stel die status soos dit is: voor bekendstelling, voor akkreditasie, eerlik.",
        ],
      }
    : voice;

  return (
    <>
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* The opening is the supplied mark itself. Brand content starts
          with the identity it documents, not another decorative specimen. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure
            className="plate grid min-h-[24rem] place-items-center overflow-hidden p-10 md:min-h-[34rem] md:p-16"
            style={{ background: "var(--terracotta)" }}
          >
            <span data-sc-parallax="0.12" className="block w-[min(30rem,70%)]">
              <OryxLogo
                variant="lockup"
                tone="reverse"
                className="h-auto w-full"
                title="The Oryx Institute lockup"
              />
            </span>
          </figure>
        </div>
      </section>

      {/* Assets and downloads, the reason the page exists */}
      <section id="downloads" className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.dlEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.dlBody}</p>
          </div>

          <div className="dl-grid mt-12" data-sc-in data-sc-stagger="60">
            {downloads(af).map((d) => (
              <a key={d.href} href={d.href} download className="dl-card">
                <span className={`dl-preview ${d.preview.dark ? "dl-preview--ink" : ""}`}>
                  <span
                    className={`dl-preview-mark ${d.preview.wide ? "dl-preview-mark--wide" : "dl-preview-mark--tall"}`}
                  >
                    <LogoPlate
                      src={d.preview.src}
                      w={d.preview.w}
                      h={d.preview.h}
                      alt=""
                    />
                  </span>
                </span>
                <span className="dl-name">{d.name}</span>
                <span className="dl-note">{d.note}</span>
                <span className="meta">
                  {d.format} · {t.download}
                </span>
              </a>
            ))}
          </div>

          <p className="measure mt-8 text-[0.92rem] leading-relaxed text-soft">
            {t.onRequest.pre}
            <a href={`mailto:${site.email}`} className="link-type">
              {t.onRequest.link}
            </a>
            {t.onRequest.post}
          </p>
        </div>
      </section>

      {/* Wordmark rules */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div className="panel grid place-items-center bg-white p-12 md:p-16" data-sc-in>
            <LogoPlate src="/brand/oryx-lockup.svg" w={440} h={152} alt="The Oryx Institute lockup: ORYX, 理工, INSTITUTE, with the shield" />
          </div>
          <div className="grid gap-5" data-sc-in data-sc-stagger="70">
            <h2 className="h-sub">{t.wordmarkEyebrow}</h2>
            <p className="mt-4 text-soft">{t.wordmarkA}</p>
            <p className="text-soft">{t.wordmarkB}</p>
          </div>
        </div>
      </section>

      {/* Emblem rules */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
          <div className="grid place-items-center bg-ink p-12 md:p-16 order-2 lg:order-1" data-sc-in>
            <LogoPlate src="/brand/oryx-emblem-ivory.svg" w={112} h={147} alt="The shield emblem, reverse" />
          </div>
          <div className="grid gap-5 order-1 lg:order-2" data-sc-in data-sc-stagger="70">
            <h2 className="h-sub">{t.emblemEyebrow}</h2>
            <p className="mt-4 text-soft">{t.emblemA}</p>
            <p className="text-soft">{t.emblemB}</p>
          </div>
        </div>
      </section>

      {/* Colour codes: the chips rise one by one. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.colourEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.colourBody}</p>
          </div>
          <div
            className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3"
            data-sc-in
            data-sc-stagger="90"
          >
            {swatches(af).map((c) => (
              <div className="swatch" key={c.hex}>
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

      {/* Clearspace: the frame wipes in from the left. */}
      <section className="section" data-sc-act="flow">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div className="clearspace" data-sc-reveal>
            <div className="clearspace-frame">
              <LogoPlate src="/brand/oryx-lockup.svg" w={400} h={138} alt="" />
            </div>
          </div>
          <div className="grid gap-5" data-sc-in data-sc-stagger="70">
            <h2 className="h-sub">{t.clearspaceEyebrow}</h2>
            <p className="mt-4 text-soft">{t.clearspaceA}</p>
            <p className="text-soft">{t.clearspaceB}</p>
          </div>
        </div>
      </section>

      {/* Do / don't */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.ddEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.ddBody}</p>
          </div>
          <div className="dd-grid mt-12" data-sc-in data-sc-stagger="60">
            <div className="dd-card">
              <span className="dd-plate">
                <LogoPlate src="/brand/oryx-lockup.svg" w={260} h={90} alt="" />
              </span>
              <p className="offer-tag">{t.do}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.do1}</p>
            </div>
            <div className="dd-card">
              <span className="dd-plate dd-plate--maroon">
                <LogoPlate src="/brand/oryx-lockup-ivory.svg" w={260} h={90} alt="" />
              </span>
              <p className="offer-tag">{t.do}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.do2}</p>
            </div>
            <div className="dd-card">
              <span className="dd-plate">
                {/* The one deliberate inline path on the page: a shield
                    recoloured terracotta, the wrong colour, shown as
                    wrong. */}
                <svg viewBox="0 0 146.68 191.81" fill="none" style={{ height: "70%" }} aria-hidden="true">
                  <path d="M 148.89 3.54 L 4.42 3.76 C 4.54 17.77 3.61 67.70 5.09 87.83 C 6.56 107.96 10.10 114.82 13.27 124.56 C 16.45 134.29 19.80 139.38 24.12 146.24 C 28.43 153.10 30.46 157.52 39.16 165.71 C 47.86 173.89 70.13 190.41 76.33 195.35 C 79.83 192.88 90.78 185.95 97.35 180.53 C 103.91 175.11 112.65 165.78 115.71 162.83 C 112.06 158.89 99.96 148.08 93.81 139.16 C 87.65 130.24 81.27 114.27 78.76 109.29 L 66.37 107.96 L 50.66 118.36 L 39.82 106.86 L 125.66 18.36 L 134.07 27.88 L 78.10 86.50 L 141.81 121.24 C 143.03 114.38 147.94 99.71 149.12 80.09 C 150.29 60.47 148.93 16.30 148.89 3.54 Z" transform="translate(-3.61,-3.54)" fill="#B5533A"/>
                </svg>
              </span>
              <p className="offer-tag">{t.dont}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.dont1}</p>
            </div>
            <div className="dd-card">
              <span className="dd-plate">
                <span style={{ transform: "rotate(-7deg)", display: "inline-block" }}>
                  <LogoPlate src="/brand/oryx-lockup.svg" w={260} h={90} alt="" />
                </span>
              </span>
              <p className="offer-tag">{t.dont}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.dont2}</p>
            </div>
            <div className="dd-card">
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
              <p className="offer-tag">{t.dont}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.dont3}</p>
            </div>
            <div className="dd-card">
              <span className="dd-plate">
                <span className="text-center" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="block text-[1.5rem] tracking-[0.35em]">ORYX</span>
                  <span className="wordmark-cjk my-1 block text-[1.1rem]">理工</span>
                  <span className="block text-[1.1rem] tracking-[0.3em]">INSTITUTE</span>
                </span>
              </span>
              <p className="offer-tag">{t.dont}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.dont4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Print kit gallery: one piece per screen, the real marks set in
          code over the stock photographs. The one place a shadow is
          allowed, and it belongs to the photograph, not the CSS. */}
      <section className="section" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.kitEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.kitBody}</p>
          </div>
        </div>
        <div className="kit-stack mt-12">
          {kitPieces.map((k) => (
            <figure className="kit-plate" key={k.src} data-sc-in>
              <span className="kit-plate-frame">
                <Image
                  src={k.src}
                  alt={k.alt}
                  width={k.w}
                  height={k.h}
                  sizes="(min-width: 80rem) 44rem, 92vw"
                  quality={62}
                />
                <OverlayMark piece={k} />
              </span>
            </figure>
          ))}
        </div>
      </section>

      {/* Specimen wall: one object per plate */}
      <section className="section" id="specimens" data-sc-act="flow">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.specimensEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.specimensBody}</p>
          </div>
          {/* Image to commission (founder portrait): inner/19 mineral, a
              Namibian mineral specimen, dead centre on cream, hard
              upper-left light, as the wall's fifth plate. */}
        </div>

        {/* The shield, first: the register's own object */}
        <div className="specimen" data-sc-in>
          <LogoPlate src="/brand/oryx-emblem.svg" w={200} h={262} alt="The maroon shield at large size" style={{ height: "clamp(18rem, 40vh, 26rem)", width: "auto" }} />
          <p className="caption">{t.shieldCaption}</p>
        </div>

        {specimens.map((s) => (
          <div className="specimen" key={s.src} data-sc-in>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              sizes="(min-width: 1024px) 60vw, 90vw"
              className="obj h-auto"
              quality={62}
            />
            <p className="caption">
              {t.specimenWord} · {af ? s.caption.af : s.caption.en}
            </p>
          </div>
        ))}
      </section>

      {/* The voice, with its bar */}
      <section className="section-lg" data-sc-act="flow">
        <div className="shell">
          <div className="panel p-8 md:p-12" data-sc-in data-sc-stagger="70">
            <h3 className="h-sub">{t.voiceEyebrow}</h3>
            <p className="h-section mt-5 max-w-[26ch]">{voiceText.register}</p>
            <ul className="mt-8 grid max-w-4xl gap-4">
              {voiceText.rules.map((r) => (
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
              <h3 className="h-sub">{t.approvedEyebrow}</h3>
              <ul className="mt-5 grid max-w-3xl gap-3 text-[0.95rem] leading-relaxed text-soft">
                {lines.map((l) => (
                  <li key={l.line}>
                    &ldquo;{l.line}&rdquo; · {l.source}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The English original, printed beneath the Afrikaans page. */}
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
    </>
  );
}
