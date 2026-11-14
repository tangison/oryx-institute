/**
 * Locale core + the shared interface chrome.
 *
 * English keeps the clean URLs it launched with; Afrikaans lives at
 * /af/. This module computes paths, hreflang alternates and the chrome
 * strings both languages share. Content copy lives beside each page.
 */

export const LANGS = ["en", "af"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(x: string | undefined | null): x is Lang {
  return x === "en" || x === "af";
}

export function langFromParams(params: { lang?: string } | undefined | null): Lang {
  return isLang(params?.lang) ? params.lang : "en";
}

/** English stays unprefixed so every launched English URL remains stable. */
export function langPath(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return p === "" ? "/" : p;
  return `/af${p === "/" ? "" : p}`;
}

/** The same page in the other published language. */
export function swapLang(lang: Lang, path: string): string {
  return langPath(lang === "en" ? "af" : "en", path);
}

/** Canonical, hreflang and markdown alternates for one page. */
export function alternates(lang: Lang, path: string, origin: string) {
  const p = path === "/" ? "/" : `/${path.replace(/^\//, "")}`;
  return {
    canonical: `${origin}${langPath(lang, p)}`,
    languages: {
      en: `${origin}${langPath("en", p)}`,
      af: `${origin}${langPath("af", p)}`,
      "x-default": `${origin}${langPath("en", p)}`,
    },
    types: {
      "text/markdown": `${origin}/md${p === "/" ? "" : p}`,
    },
  };
}

/** Shared interface language. */
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
    langToggle: "Afrikaans",
    langShort: "AF",
    langAria: "Afrikaans: read this page in Afrikaans",
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
    toTop: "Back to top",
    notFoundTitle: "Nothing stands at this address.",
    notFoundBody:
      "The page moved, or it was never printed. The register, the practice, and the office are one click away.",
  },
  af: {
    skip: "Spring na inhoud",
    home: "Oryx Institute, tuisblad",
    menu: "Kieslys",
    close: "Sluit",
    search: "Soek",
    searchOpen: "Open soek",
    searchPlaceholder: "Deursoek die instituut",
    searchEmpty: "Niks in die indeks pas nie. Probeer 'n korter woord.",
    searchLabelPages: "Bladsye",
    searchLabelOffers: "Aanbiedinge",
    searchLabelReading: "Leesstof",
    searchHint: "Enter open · Esc sluit",
    langToggle: "English",
    langShort: "EN",
    langAria: "English: read this page in English",
    langEyebrow: "Taal",
    langNote: "Elke bladsy, in albei tale.",
    clockNote: "Die kantoor hou Windhoek-tyd.",
    primaryNav: "Primêr",
    footerNav: "Voetstuk",
    siteMenu: "Webwerf-kieslys",
    contactOffice: "Kontak die kantoor",
    madeBy: "Gemaak deur",
    rights: "Alle regte voorbehou.",
    dateToCome: "Ongedateer",
    anchorNote: "datum moet bevestig word",
    bulletinInEnglish: "Die Bulletin-opstelle word in Engels gepubliseer.",
    directoryInEnglish:
      "Die kursusse en sjablone self word in Engels gepubliseer.",
    newsInEnglish: "Aankondigings word in Engels gepubliseer.",
    readMore: "Lees",
    backHome: "Terug na die voorblad",
    toTop: "Terug na bo",
    notFoundTitle: "Niks staan by hierdie adres nie.",
    notFoundBody:
      "Die bladsy het geskuif, of dit is nooit gepubliseer nie. Die register, die praktyk en die kantoor is een klik weg.",
  },
} as const;

export type Chrome = (typeof chrome)["en"];
