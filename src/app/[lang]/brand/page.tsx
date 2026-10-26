import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { approvedLines, voice, site } from "@/lib/site";
import { approvedLinesAf, siteAf } from "@/lib/site-af";
import { alternates, langFromParams } from "@/lib/i18n";

const copy = {
  en: {
    meta: {
      title: "The Brand Register",
      description:
        "The Oryx Institute brand: the three-script wordmark, the maroon shield, the exact colour codes, the print kit in full, the voice the site is written under, and the downloads, ready for any printer.",
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
      "Three scripts, one lockup. ORYX and INSTITUTE set in a classic serif, ink #181713; 理工, the characters for science and engineering, stands where the word Polytechnic sits in the full legal name, in maroon #71111F.",
    wordmarkB:
      "The characters align to the ORYX baseline and scale to the cap height of the X, exactly as the supplied artwork draws them. The wordmark is never redrawn, never restacked and never set in another typeface: the site renders it from the artwork's own vector paths.",
    emblemEyebrow: "The emblem",
    emblemA:
      "The maroon shield, with its horn-mark knocked through in white. On the business card's reverse the shield stands alone; on the notecard it centres on white; on the envelope it sits at the right of the lockup.",
    emblemB:
      "The emblem never carries text inside it, never tilts, and never appears in any colour but the maroon or the reverse ivory. On maroon grounds the mark stays ivory; on light grounds it stays white.",
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
    do2: "The reverse lockup, ivory on the maroon ground.",
    dont1: "Never recolour the mark. Terracotta is for bands and imagery, not the logo.",
    dont2: "Never skew or rotate the lockup.",
    dont3: "Never add a drop shadow. The mark prints flat, always.",
    dont4: "Never restack the lockup or rebuild it in another typeface.",
    kitEyebrow: "The print kit",
    kitBody:
      "The pieces the institute publishes while it is being established, photographed in the house register — hard daylight, walnut and cream grounds, one piece per frame.",
    specimensEyebrow: "Specimens",
    specimensBody:
      "The objects the identity is built from, one per plate, on cream and terracotta. Replaced with real Windhoek objects as they are collected.",
    shieldCaption: "Specimen · the shield",
    voiceEyebrow: "The voice, with a bar",
    approvedEyebrow: "Approved lines",
  },
  af: {
    meta: {
      title: "Die Handelsmerkregister",
      description:
        "Die Oryx Instituut-handelsmerk: die driedrift-woordmerk, die maroen-skild, die presiese kleurkodes, die drukpakket in volle lig, die stem waarin die werf geskryf is, en die aflaaiers, reg vir enige drukker.",
      ogTitle: "Die Handelsmerkregister | Oryx Instituut",
      ogDescription:
        "Die woordmerk, die embleem, die kodes, die stem: gedokumenteer, met die bates se aflaaiers.",
    },
    head: {
      eyebrow: "Die register",
      title: "Die handelsmerkregister.",
      lede: "Alles wat die instituut druk, van die flieër tot die sertifikaat, hou een register in stand. Hierdie bladsy dokumenteer dit sodat die identiteit heel bly: die merke, die kodes, die stem, en die lêers, reg om af te laai.",
    },
    dlEyebrow: "Bates en aflaaiers",
    dlBody:
      "Die merke as vektorlêers, die drukpakket vir drukkers, en die deursigtige PNG's vir skerms. Neem hulle; hou hulle heel.",
    download: "Laai af",
    onRequest: {
      pre: "Borduurlêers, seinvektore, medemerk-sjablone en die redigeerbare riglyndokument word op versoek uitgereik: ",
      link: "skryf aan die kantoor",
      post: ".",
    },
    wordmarkEyebrow: "Die woordmerk",
    wordmarkA:
      "Drie skrifte, een sluitstel. ORYX en INSTITUTE in 'n klassieke serif, ink #181713; 理工, die karakters vir wetenskap en ingenieurswese, staan waar die woord Polytechnic in die volle wetlike naam staan, in maroen #71111F.",
    wordmarkB:
      "Die karakters rig hulle op die ORYX-basislyn en skaal tot die X se kaphoogte, presies soos die verskafde kunswerk hulle teken. Die woordmerk word nooit herteken, nooit herstapel en nooit in 'n ander lettertipe geset nie: die werf render dit uit die kunswerk se eie vektorpaaie.",
    emblemEyebrow: "Die embleem",
    emblemA:
      "Die maroen-skild, met die horingmerk deur hom wit uitgeklop. Op die besigheidskaart se agterkant staan die skild alleen; op die notekaart sentreer hy op wit; op die koevert sit hy regs van die sluitstel.",
    emblemB:
      "Die embleem dra nooit teks binne-in hom nie, kant nooit, en verskyn nooit in enige kleur behalwe die maroen of die teëgestelde ivoor nie. Op maroen-geronde bly die merk ivoor; op ligte geronde bly hy wit.",
    colourEyebrow: "Kleur",
    colourBody:
      "Ses kodes, gemonster uit die logo-kunswerk en die register. Skakerings tussen hulle word slegs uit hierdie ankers gemeng, en terrakotta raak nooit 'n knoppie of die merk nie.",
    clearspaceEyebrow: "Skoonruimte",
    clearspaceA:
      "Die woordmerk hou 'n marge van een X-kaphoogte aan elke kant, gemerk deur die stippelraam. Niks gaan die raam binne nie: geen teks, geen lyne, geen kante van ander elemente nie.",
    clearspaceB:
      "Dieselfde marge regeer die embleem. As jy twyfel, verdubbel dit; die merk word nooit gekrow nie.",
    ddEyebrow: "Doen / moenie",
    ddBody: "Ses plate, drie van elk. Die verkeerdes is met opset verkeerd geteken.",
    do1: "Die sluitstel op papier, ink en maroen, in rus.",
    do2: "Die teëgestelde sluitstel, ivoor op die maroen-gerond.",
    dont1: "Kleur die merk nooit om nie. Terrakotta is vir bande en beelde, nie vir die logo nie.",
    dont2: "Skeef of roteer die sluitstel nooit nie.",
    dont3: "Voeg nooit 'n valskadu by nie. Die merk druk plat, altyd.",
    dont4: "Herstapel die sluitstel nooit, of bou dit nie in 'n ander lettertipe nie.",
    kitEyebrow: "Die drukpakket",
    kitBody:
      "Die stukke wat die instituut publiseer terwyl dit gestig word, gefotografeer in die huis se register — harde daglig, okkerneut- en crème-gronde, een stuk per raam.",
    specimensEyebrow: "Eksemplare",
    specimensBody:
      "Die voorwerpe waaruit die identiteit gebou is, een per plaat, op crème en terracotta. Vervang met werklike Windhoek-voorwerpe namate hulle versamel word.",
    shieldCaption: "Eksemplaar · die skild",
    voiceEyebrow: "Die stem, met 'n lat",
    approvedEyebrow: "Goedgekeurde reëls",
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
      name: af ? "Woordmerk (SVG)" : "Wordmark (SVG)",
      note: af
        ? "ORYX · 理工 · INSTITUTE, ink letters met die karakters in maroen. Deursigtig, vektor, drukgereed."
        : "ORYX · 理工 · INSTITUTE, ink letters with the characters in maroon. Transparent, vector, print-ready.",
      href: "/brand/oryx-wordmark.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-wordmark.svg", w: 300, h: 144, dark: false, wide: true },
    },
    {
      name: af ? "Woordmerk, teëgestel (SVG)" : "Wordmark, reverse (SVG)",
      note: af
        ? "Alle elemente in ivoor, vir donker geronde. Dieselfde geometrie, niks anders nie."
        : "All elements in ivory, for dark grounds. Same geometry, no other change.",
      href: "/brand/oryx-wordmark-ivory.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-wordmark-ivory.svg", w: 300, h: 144, dark: true, wide: true },
    },
    {
      name: af ? "Embleem / skild (SVG)" : "Emblem / Shield (SVG)",
      note: af
        ? "Die maroen-skild alleen. Geen teks binne-in hom, ooit nie; geen kanteling, geen omkleuring nie."
        : "The maroon shield alone. No text inside it, ever; no tilt, no recolour.",
      href: "/brand/oryx-emblem.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-emblem.svg", w: 106, h: 139, dark: false, wide: false },
    },
    {
      name: af ? "Embleem, teëgestel (SVG)" : "Emblem, reverse (SVG)",
      note: af
        ? "Die skild in ivoor, vir ink- en maroen-geronde."
        : "The shield in ivory, for ink and maroon grounds.",
      href: "/brand/oryx-emblem-ivory.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-emblem-ivory.svg", w: 106, h: 139, dark: true, wide: false },
    },
    {
      name: af ? "Drukpakket (PDF)" : "Print press kit (PDF)",
      note: af
        ? "Een bate per bladsy: woordmerk, teëgestel, embleem, kleurtokens, op papier-geronde met snymerke, reg vir die drukker."
        : "One asset per page: wordmark, reverse, emblem, colour tokens, on paper grounds with crop marks, ready for the printer.",
      href: "/brand/oryx-press-kit.pdf",
      format: "PDF · A4",
      preview: { src: "/brand/oryx-wordmark.svg", w: 240, h: 115, dark: false, wide: true },
    },
    {
      name: af ? "PNG-pak (ZIP)" : "PNG pack (ZIP)",
      note: af
        ? "Woordmerk en embleem, deursigtige agtergronde, by 256, 512, 1024 en 2048 px."
        : "Wordmark and emblem, transparent backgrounds, at 256, 512, 1024 and 2048 px.",
      href: "/brand/oryx-png-pack.zip",
      format: "ZIP · PNG",
      preview: { src: "/brand/oryx-emblem.svg", w: 106, h: 139, dark: false, wide: false },
    },
  ];
}

/** The print kit, photographed in the house register (Image Asset
 *  Manifest v4, print/): certificate, letterhead, business card
 *  reverse, notecard, folder — restaged on walnut and cream grounds,
 *  no contact details printed on any face shown. */
const kitPieces = [
  {
    src: "/images/print/01-certificate.jpg",
    alt: "The certificate: cream sheet, double-rule maroon border, on dark walnut",
    w: 864,
    h: 1152,
  },
  {
    src: "/images/print/02-letterhead.jpg",
    alt: "The letterhead: cream sheet, small maroon wordmark top left, on dark walnut",
    w: 864,
    h: 1152,
  },
  {
    src: "/images/print/03-business-card.jpg",
    alt: "The business card reverse: maroon stock, cream shield centred, on cream",
    w: 864,
    h: 1152,
  },
  {
    src: "/images/print/04-notecard.jpg",
    alt: "The folded notecard: cream stock, maroon shield centred, on dark walnut",
    w: 864,
    h: 1152,
  },
  {
    src: "/images/print/05-folder.jpg",
    alt: "The presentation folder: maroon stock, cream shield centred, on cream",
    w: 864,
    h: 1152,
  },
] as const;

/** The specimen wall: one object per full-bleed cream plate — the
 *  three plates manifest v4 assigns to this wall. */
const specimens = [
  {
    src: "/images/core/02-stone.jpg",
    alt: "One weathered stone specimen, centred on cream paper",
    caption: "stone",
    w: 1122,
    h: 1402,
  },
  {
    src: "/images/core/06-game-board.jpg",
    alt: "A carved morabaraba board, one springbok coin in its centre ring, on terracotta",
    caption: "game",
    w: 1024,
    h: 1024,
  },
  {
    src: "/images/core/09-horns.jpg",
    alt: "Two shed oryx horns, parallel, centred on cream paper",
    caption: "horns",
    w: 1122,
    h: 1402,
  },
] as const;

function swatches(af: boolean) {
  return [
    {
      name: af ? "Ink" : "Ink",
      hex: "#181713",
      usage: af
        ? "Woordmerkletters, lyfteks, donker geronde"
        : "Wordmark letters, body text, dark grounds",
      bg: "#181713",
      fg: "#FFF8EE",
      mark: "理工",
    },
    {
      name: af ? "Maroen" : "Maroon",
      hex: "#71111F",
      usage: af
        ? "Die skild, 理工, aksente, vullings, knoppies"
        : "The shield, 理工, accents, fills, CTAs",
      bg: "#71111F",
      fg: "#FFF8EE",
      mark: "理工",
    },
    {
      name: af ? "Crème" : "Cream",
      hex: "#F4EEE4",
      usage: af ? "Die verstekbladsy-gerond, papier" : "The default page ground, paper",
      bg: "#F4EEE4",
      fg: "#181713",
      mark: "Aa",
    },
    {
      name: af ? "Ivoor" : "Ivory",
      hex: "#FFF8EE",
      usage: af
        ? "Teks op ink en maroen, die teëgestelde logo"
        : "Text on ink and maroon, the reverse logo",
      bg: "#FFF8EE",
      fg: "#181713",
      mark: "Aa",
    },
    {
      name: af ? "Terrakotta" : "Terracotta",
      hex: "#B5533A",
      usage: af
        ? "Slegs beeldpalet en kleurbande: nooit UI nie, nooit die logo nie"
        : "Image palette and colour bands only: never UI, never the logo",
      bg: "#B5533A",
      fg: "#FFF8EE",
      mark: "Aa",
    },
    {
      name: af ? "Sand" : "Sand",
      hex: "#D8C6A8",
      usage: af ? "Die Corner Spa-seksiepalet" : "The Corner Spa section palette",
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
        register:
          "Deklaratories, presies, onhaastig. Stel die feit; noem die bron; hou op.",
        rules: [
          "Goedgekeurde reëls loop woordvir-word: Lyk onskuldig. Is dit nie. / gegradueerdes los probleme stilletjies op en voltooi hulle beslissend. / uitmuntendheid in innovasie en toegepaste probleemoplossing. / Jy is net so goed soos jou gereedskap. Ons smee dit.",
          "Feite dra hulle bron inlyn, of hulle gaan nie uit nie.",
          "Geen grappies, geen selfaantekening, geen opskrifte onder beelde nie.",
          "Status word gesê soos dit is: voorlansering, voor akkreditering, eerlik.",
        ],
      }
    : voice;

  return (
    <>
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* Assets and downloads, the reason the page exists */}
      <section id="downloads" className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.dlEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.dlBody}</p>
          </div>

          <div className="dl-grid mt-12" data-sc-in data-sc-stagger="60">
            {downloads(af).map((d) => (
              <a key={d.href} href={d.href} download className="dl-card">
                <span className={`dl-preview ${d.preview.dark ? "dl-preview--ink" : ""}`}>
                  <LogoPlate
                    src={d.preview.src}
                    w={d.preview.w}
                    h={d.preview.h}
                    alt=""
                    style={d.preview.wide ? { width: "72%" } : { height: "72%" }}
                  />
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
      <section className="section">
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
      <section className="section">
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

      {/* Colour codes */}
      <section className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.colourEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.colourBody}</p>
          </div>
          <div
            className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3"
            data-sc-in
            data-sc-stagger="60"
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

      {/* Clearspace */}
      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div className="clearspace" data-sc-in>
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
      <section className="section">
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
              <p className="offer-tag">{af ? "Doen" : "Do"}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.do1}</p>
            </div>
            <div className="dd-card">
              <span className="dd-plate dd-plate--maroon">
                <LogoPlate src="/brand/oryx-lockup-ivory.svg" w={260} h={90} alt="" />
              </span>
              <p className="offer-tag">{af ? "Doen" : "Do"}</p>
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
              <p className="offer-tag">{af ? "Moenie" : "Don't"}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.dont1}</p>
            </div>
            <div className="dd-card">
              <span className="dd-plate">
                <span style={{ transform: "rotate(-7deg)", display: "inline-block" }}>
                  <LogoPlate src="/brand/oryx-lockup.svg" w={260} h={90} alt="" />
                </span>
              </span>
              <p className="offer-tag">{af ? "Moenie" : "Don't"}</p>
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
              <p className="offer-tag">{af ? "Moenie" : "Don't"}</p>
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
              <p className="offer-tag">{af ? "Moenie" : "Don't"}</p>
              <p className="text-[0.88rem] leading-relaxed text-soft">{t.dont4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Print kit gallery: the one place a shadow is allowed */}
      <section className="section">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.kitEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.kitBody}</p>
          </div>
          <div className="kit-grid mt-12" data-sc-in data-sc-stagger="70">
            {kitPieces.map((k) => (
              <figure className="kit-figure" key={k.src}>
                <Image
                  src={k.src}
                  alt={k.alt}
                  width={k.w}
                  height={k.h}
                  sizes="(min-width: 80rem) 30vw, (min-width: 48rem) 45vw, 90vw"
                  className="h-auto w-full"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Specimen wall: one object per cream plate */}
      <section className="section" id="specimens">
        <div className="shell">
          <div className="hair-t pt-14">
            <h2 className="h-sub">{t.specimensEyebrow}</h2>
            <p className="measure text-soft mt-4">{t.specimensBody}</p>
          </div>
        </div>

        {/* The shield, first: the register's own object */}
        <div className="specimen" data-sc-in>
          <LogoPlate src="/brand/oryx-emblem.svg" w={200} h={262} alt="The maroon shield at large size" style={{ height: "clamp(18rem, 40vh, 26rem)", width: "auto" }} />
          <p className="caption">{af ? "Eksemplaar · die skild" : t.shieldCaption}</p>
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
            />
            <p className="caption">
              {af ? "Eksemplaar · " : "Specimen · "}
              {s.caption}
            </p>
          </div>
        ))}
      </section>

      {/* The voice, with its bar */}
      <section className="section-lg">
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
    </>
  );
}
