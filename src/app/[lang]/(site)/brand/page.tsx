import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { approvedLines, voice, site } from "@/lib/site";
import { approvedLinesZh } from "@/lib/site-zh";
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
      "The pieces the institute publishes while it is being established, photographed in the house register, one piece per screen. Every mark you see is the real vector, set in code over the photograph.",
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
  zh: {
    meta: {
      title: "品牌登记册",
      description:
        "Oryx 理工学院的品牌：三体字标、栗色盾徽、精确色码、完整印刷套件、本站书写的文风，以及随时可交印厂的下载文件。",
      ogTitle: "品牌登记册 | Oryx 理工学院",
      ogDescription: "字标、徽记、色码、文风：全部成文，附资产下载。",
    },
    head: {
      eyebrow: "登记册",
      title: "品牌登记册。",
      lede: "学院印的每一样东西，从传单到证书，守同一种语域。本页把它写成文档，让身份完整地行走：标记、色码、文风，以及备好可下载的文件。",
    },
    dlEyebrow: "资产与下载",
    dlBody: "矢量标记、给印厂的印刷套件、给屏幕的透明 PNG。拿去；保持原样。",
    download: "下载",
    onRequest: {
      pre: "刺绣文件、招牌矢量、合署模板与可编辑的规范文档，按需提供：",
      link: "给办公室写信",
      post: "。",
    },
    wordmarkEyebrow: "字标",
    wordmarkA:
      "三种文字，一组锁定。ORYX 与 INSTITUTE 用古典衬线体，墨色 #181713；理工二字（科学与工程）立在法定全名中 Polytechnic 一词的位置，栗色 #71111F。",
    wordmarkB:
      "两个字符对齐 ORYX 基线，高度与 X 的大写字高一致，与来稿图样分毫不差。字标绝不重绘、绝不重排、绝不用别的字体：本站用图样自己的矢量路径渲染它。",
    emblemEyebrow: "徽记",
    emblemA:
      "栗色盾徽，角形记号以白色镂空。名片背面，盾徽独立；便签上，居中于白；信封上，位于锁定组右侧。",
    emblemB:
      "徽记内部永不载字，永不倾斜，除栗色与反转象牙色外不做任何颜色。栗色底上，徽记用象牙色；浅底上，用白。",
    colourEyebrow: "色彩",
    colourBody:
      "六个色码，取自标志图样与登记册。中间色调只从这些锚点调和；陶红永不触碰按钮或标记。",
    clearspaceEyebrow: "净空",
    clearspaceA:
      "字标四周各留一个 X 大写字高的边距，由虚线框标出。任何东西不得入框：字、线、别的元素的边缘都不行。",
    clearspaceB: "徽记同样守这条边距。拿不准就加倍；标记从不拥挤。",
    ddEyebrow: "可以 / 不可以",
    ddBody: "六块版，各三块。错的那些是故意画错的。",
    do1: "锁定组在纸上，墨色与栗色，安放。",
    do2: "反转锁定组，象牙色印在栗色底上。",
    dont1: "绝不给标记改色。陶红属于色带与图像，不属于标志。",
    dont2: "绝不倾斜或旋转锁定组。",
    dont3: "绝不加投影。标记永远平印。",
    dont4: "绝不重排锁定组，或用别的字体重搭。",
    kitEyebrow: "印刷套件",
    kitBody:
      "学院筹建期间印发的物件，按本站语域拍摄，一屏一件。你看到的每个标记都是真矢量，以代码叠在照片上。",
    specimensEyebrow: "标本",
    specimensBody:
      "身份所从出的物件，一板一件，奶油与陶红底。随实物在温得和克收齐而逐件替换。",
    shieldCaption: "标本 · 盾徽",
    specimenWord: "标本",
    voiceEyebrow: "文风，带一道横杆",
    approvedEyebrow: "已核准的句子",
    do: "可以",
    dont: "不可以",
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
function downloads(zh: boolean) {
  return [
    {
      name: zh ? "字标（SVG）" : "Wordmark (SVG)",
      note: zh
        ? "ORYX · 理工 · INSTITUTE，墨色字母，栗色字符。透明、矢量、可印。"
        : "ORYX · 理工 · INSTITUTE, ink letters with the characters in maroon. Transparent, vector, print-ready.",
      href: "/brand/oryx-wordmark.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-wordmark.svg", w: 300, h: 144, dark: false, wide: true },
    },
    {
      name: zh ? "字标，反转（SVG）" : "Wordmark, reverse (SVG)",
      note: zh
        ? "全部元素用象牙色，用于深底。几何完全一致，别无改动。"
        : "All elements in ivory, for dark grounds. Same geometry, no other change.",
      href: "/brand/oryx-wordmark-ivory.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-wordmark-ivory.svg", w: 300, h: 144, dark: true, wide: true },
    },
    {
      name: zh ? "徽记 / 盾徽（SVG）" : "Emblem / Shield (SVG)",
      note: zh
        ? "栗色盾徽独立。内部永不载字；不倾斜，不改色。"
        : "The maroon shield alone. No text inside it, ever; no tilt, no recolour.",
      href: "/brand/oryx-emblem.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-emblem.svg", w: 106, h: 139, dark: false, wide: false },
    },
    {
      name: zh ? "徽记，反转（SVG）" : "Emblem, reverse (SVG)",
      note: zh ? "象牙色盾徽，用于墨色与栗色底。" : "The shield in ivory, for ink and maroon grounds.",
      href: "/brand/oryx-emblem-ivory.svg",
      format: "SVG · vector",
      preview: { src: "/brand/oryx-emblem-ivory.svg", w: 106, h: 139, dark: true, wide: false },
    },
    {
      name: zh ? "印刷套件（PDF）" : "Print press kit (PDF)",
      note: zh
        ? "一页一资产：字标、反转、徽记、色码，纸底带出血线，直接交印厂。"
        : "One asset per page: wordmark, reverse, emblem, colour tokens, on paper grounds with crop marks, ready for the printer.",
      href: "/brand/oryx-press-kit.pdf",
      format: "PDF · A4",
      preview: { src: "/brand/oryx-wordmark.svg", w: 240, h: 115, dark: false, wide: true },
    },
    {
      name: zh ? "PNG 套装（ZIP）" : "PNG pack (ZIP)",
      note: zh
        ? "字标与徽记，透明底，256、512、1024 与 2048 px。"
        : "Wordmark and emblem, transparent backgrounds, at 256, 512, 1024 and 2048 px.",
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
    src: "/images/kinfolk/print/01-certificate.jpg",
    alt: "The certificate: cream sheet with a double-rule maroon border, on dark walnut",
    w: 864,
    h: 1152,
    overlay: {
      kind: "certificate" as const,
      /** The sheet spans 18%..82% horizontally, 15%..88% vertically. */
      sheet: { left: "18%", top: "15%", width: "64%", height: "73%" },
    },
  },
  {
    src: "/images/kinfolk/print/02-letterhead.jpg",
    alt: "The letterhead: cream sheet on dark walnut, the lockup set top left",
    w: 864,
    h: 1152,
    overlay: {
      kind: "lockup" as const,
      /** The lockup sits on the sheet, one clearspace in from the top
          left; it covers the placeholder line the stock photo carries. */
      box: { left: "26%", top: "25.5%", width: "30%" },
    },
  },
  {
    src: "/images/kinfolk/print/03-business-card.jpg",
    alt: "The business card reverse: maroon stock on cream, the shield centred",
    w: 864,
    h: 1152,
    overlay: {
      kind: "emblem-ivory" as const,
      box: { left: "49.2%", top: "49.6%", height: "20.5%" },
    },
  },
  {
    src: "/images/kinfolk/print/04-notecard.jpg",
    alt: "The folded notecard: cream stock on dark walnut, the shield centred high",
    w: 864,
    h: 1152,
    overlay: {
      kind: "emblem" as const,
      box: { left: "51.2%", top: "38.8%", height: "14%" },
    },
  },
  {
    src: "/images/kinfolk/print/05-folder.jpg",
    alt: "The presentation folder: maroon stock on cream, the shield centred",
    w: 864,
    h: 1152,
    overlay: {
      kind: "emblem-ivory" as const,
      box: { left: "50.6%", top: "42.4%", height: "23.5%" },
    },
  },
];

/** The specimen wall: one object per full plate — manifest v4 assigns
 *  stone, horns, wax and notebook to this wall; the mineral plate is
 *  not commissioned yet. */
const specimens = [
  {
    src: "/images/kinfolk/02-stone.jpg",
    alt: "One weathered stone specimen, centred on cream paper",
    caption: { en: "stone", zh: "河石" },
    w: 1254,
    h: 1254,
  },
  {
    src: "/images/kinfolk/09-horns.jpg",
    alt: "Two shed oryx horns lying parallel, centred on cream paper",
    caption: { en: "horns", zh: "羚羊角" },
    w: 1402,
    h: 1122,
  },
  {
    src: "/images/kinfolk/10-wax-seal.jpg",
    alt: "A cream envelope closed with a maroon wax seal and ribbon, centred on cream paper",
    caption: { en: "wax seal", zh: "火漆封缄" },
    w: 1254,
    h: 1254,
  },
  {
    src: "/images/kinfolk/04-notebook.jpg",
    alt: "A bound maroon notebook with ribbon, centred on cream paper",
    caption: { en: "notebook", zh: "笔记本" },
    w: 1402,
    h: 1122,
  },
];

function swatches(zh: boolean) {
  return [
    {
      name: zh ? "墨色" : "Ink",
      hex: "#181713",
      usage: zh ? "字标字母、正文、深底" : "Wordmark letters, body text, dark grounds",
      bg: "#181713",
      fg: "#FFF8EE",
      mark: "理工",
    },
    {
      name: zh ? "栗色" : "Maroon",
      hex: "#71111F",
      usage: zh ? "盾徽、理工、强调、填充、按钮" : "The shield, 理工, accents, fills, CTAs",
      bg: "#71111F",
      fg: "#FFF8EE",
      mark: "理工",
    },
    {
      name: zh ? "奶油" : "Cream",
      hex: "#F4EEE4",
      usage: zh ? "默认页底，纸" : "The default page ground, paper",
      bg: "#F4EEE4",
      fg: "#181713",
      mark: "Aa",
    },
    {
      name: zh ? "象牙" : "Ivory",
      hex: "#FFF8EE",
      usage: zh ? "墨色与栗色底上的文字，反转标志" : "Text on ink and maroon, the reverse logo",
      bg: "#FFF8EE",
      fg: "#181713",
      mark: "Aa",
    },
    {
      name: zh ? "陶红" : "Terracotta",
      hex: "#B5533A",
      usage: zh
        ? "只用于图像色板与色带：绝不用于界面，绝不用于标志"
        : "Image palette and colour bands only: never UI, never the logo",
      bg: "#B5533A",
      fg: "#FFF8EE",
      mark: "Aa",
    },
    {
      name: zh ? "沙色" : "Sand",
      hex: "#D8C6A8",
      usage: zh ? "Corner Spa 版块的专属色" : "The Corner Spa section palette",
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
  const src =
    o.kind === "lockup"
      ? "/brand/oryx-lockup.svg"
      : o.kind === "emblem-ivory"
        ? "/brand/oryx-emblem-ivory.svg"
        : "/brand/oryx-emblem.svg";
  const w = o.kind === "lockup" ? 440 : 106;
  const h = o.kind === "lockup" ? 152 : 139;
  const style: React.CSSProperties =
    o.kind === "lockup"
      ? { width: o.box.width, position: "absolute", left: o.box.left, top: o.box.top, transform: "translateY(-50%)" }
      : { height: o.box.height, position: "absolute", left: o.box.left, top: o.box.top, transform: "translate(-50%, -50%)" };
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
  const zh = lang === "zh";
  const t = copy[lang];
  const lines = zh ? approvedLinesZh : approvedLines;
  const voiceText = zh
    ? {
        register: "陈述式，精确，不慌不忙。说出事实；注明出处；停。",
        rules: [
          "已核准的句子逐字使用：看着无害，并不是。/ 毕业生安静地解决问题，决断地收尾。/ 以创新与实用解题见长。",
          "事实要么内联注明出处，要么不发。",
          "没有俏皮话，没有自我注解，图像下面没有说明。",
          "状态照实说：开办前，认证前，诚实。",
        ],
      }
    : voice;

  return (
    <>
      <PageHead eyebrow={t.head.eyebrow} title={t.head.title}>
        <p>{t.head.lede}</p>
      </PageHead>

      {/* The hero plate: the game board on its terracotta ground,
          drifting gently — the page's scrub act. */}
      <section className="section-sm" data-sc-act="scrub">
        <div className="shell" data-sc-in>
          <figure
            className="plate grid min-h-[24rem] place-items-center overflow-hidden p-10 md:min-h-[34rem] md:p-16"
            style={{ background: "var(--terracotta)" }}
          >
            <span data-sc-parallax="0.12" className="block w-[min(30rem,70%)]">
              <Image
                src="/images/kinfolk/06-game-board.jpg"
                alt="A carved morabaraba game board with one springbok coin in its centre ring, on terracotta"
                width={1402}
                height={1122}
                sizes="(min-width: 1024px) 30rem, 70vw"
                className="h-auto w-full"
                priority
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
            {downloads(zh).map((d) => (
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
            {swatches(zh).map((c) => (
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
          {/* TODO image (founder to commission): inner/19 mineral — a
              Namibian mineral specimen, dead centre on cream, hard
              upper-left light — as the wall's fifth plate. */}
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
            />
            <p className="caption">
              {t.specimenWord} · {zh ? s.caption.zh : s.caption.en}
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
    </>
  );
}
