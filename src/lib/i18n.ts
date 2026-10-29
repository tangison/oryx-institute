/**
 * Locale core + the interface chrome in both languages.
 *
 * English keeps the clean URLs it launched with; Chinese lives at
 * /zh/. The middleware rewrites, this module only computes paths,
 * hreflang alternates and the chrome strings both languages share.
 * Content copy lives beside the pages that render it; interface copy
 * lives here, once, in both languages.
 */

export const LANGS = ["en", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(x: string | undefined | null): x is Lang {
  return x === "en" || x === "zh";
}

export function langFromParams(params: { lang?: string } | undefined | null): Lang {
  return isLang(params?.lang) ? params.lang : "en";
}

/** The path for a locale. English stays unprefixed, so every URL the
 * site shipped with keeps working byte for byte. */
export function langPath(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return p === "" ? "/" : p;
  return `/zh${p === "/" ? "" : p}`;
}

/** The same page in the other language, for the header toggle. */
export function swapLang(lang: Lang, path: string): string {
  return langPath(lang === "en" ? "zh" : "en", path);
}

/** Canonical + hreflang alternates for one page. The markdown mirror
 * rides along as a link alternate: every page is also served as clean
 * markdown from /md for any client that asks for it. */
export function alternates(lang: Lang, path: string, origin: string) {
  const p = path === "/" ? "/" : `/${path.replace(/^\//, "")}`;
  return {
    canonical: `${origin}${langPath(lang, p)}`,
    languages: {
      en: `${origin}${langPath("en", p)}`,
      zh: `${origin}${langPath("zh", p)}`,
      "x-default": `${origin}${langPath("en", p)}`,
    },
    types: {
      "text/markdown": `${origin}/md${p === "/" ? "" : p}`,
    },
  };
}

/**
 * Interface chrome. Every button, label and line the frame carries.
 * The register in both languages is the institute's own: state the
 * thing, then stop.
 */
export const chrome = {
  en: {
    skip: "Skip to content",
    home: "Oryx Institute, home",
    menu: "Menu",
    close: "Close",
    search: "Search",
    searchOpen: "Open search",
    searchPlaceholder: "Search the institute",
    searchEmpty: "Nothing in the index matches. Try a shorter word.",
    searchLabelPages: "Pages",
    searchLabelOffers: "Offers",
    searchLabelReading: "Reading",
    searchHint: "Enter opens · Esc closes",
    langToggle: "中文",
    langShort: "中文",
    langAria: "中文：阅读本页中文版",
    langEyebrow: "Language",
    langNote: "Every page, in both languages.",
    clockNote: "The office keeps Windhoek time.",
    primaryNav: "Primary",
    footerNav: "Footer",
    siteMenu: "Site menu",
    contactOffice: "Contact the office",
    madeBy: "Made by",
    rights: "All rights reserved.",
    dateToCome: "Undated",
    anchorNote: "date to be confirmed",
    bulletinInEnglish: "The Bulletin essays are published in English.",
    directoryInEnglish:
      "The courses and templates themselves are published in English.",
    newsInEnglish: "Announcements are published in English.",
    readMore: "Read",
    backHome: "Back to the front page",
    notFoundTitle: "Nothing stands at this address.",
    notFoundBody:
      "The page moved, or it was never printed. The register, the practice, and the office are one click away.",
  },
  zh: {
    skip: "跳到正文",
    home: "Oryx 理工学院，首页",
    menu: "菜单",
    close: "关闭",
    search: "搜索",
    searchOpen: "打开搜索",
    searchPlaceholder: "搜索本站",
    searchEmpty: "索引里没有匹配。换个更短的词试试。",
    searchLabelPages: "页面",
    searchLabelOffers: "服务",
    searchLabelReading: "阅读",
    searchHint: "回车打开 · Esc 关闭",
    langToggle: "English",
    langShort: "EN",
    langAria: "EN: read this page in English",
    langEyebrow: "语言",
    langNote: "每个页面，两种语言。",
    clockNote: "办公室按温得和克时间作息。",
    primaryNav: "主导航",
    footerNav: "页脚导航",
    siteMenu: "站点菜单",
    contactOffice: "联系办公室",
    madeBy: "出品",
    rights: "版权所有。",
    dateToCome: "日期待确认",
    anchorNote: "日期待确认",
    bulletinInEnglish: "公报文章以英文发表。",
    directoryInEnglish: "课程与模板本身以英文发布。",
    newsInEnglish: "公告以英文发布。",
    readMore: "阅读",
    backHome: "回到首页",
    notFoundTitle: "这个地址什么也没有。",
    notFoundBody:
      "页面搬走了，或者从未印出。登记册、实务与办公室，各在一击之外。",
  },
} as const;

export type Chrome = (typeof chrome)["en"];
