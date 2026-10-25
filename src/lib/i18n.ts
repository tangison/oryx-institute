/**
 * Locale core + the interface chrome in both languages.
 *
 * English keeps the clean URLs it launched with; Afrikaans lives at
 * /af/. The middleware rewrites, this module only computes paths,
 * hreflang alternates and the chrome strings both languages share.
 * Content copy lives beside the pages that render it; interface copy
 * lives here, once, in both languages.
 */

export const LANGS = ["en", "af"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(x: string | undefined | null): x is Lang {
  return x === "en" || x === "af";
}

export function langFromParams(params: { lang?: string } | undefined | null): Lang {
  return isLang(params?.lang) ? params.lang : "en";
}

/** The path for a locale. English stays unprefixed, so every URL the
 * site shipped with keeps working byte for byte. */
export function langPath(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return p === "" ? "/" : p;
  return `/af${p === "/" ? "" : p}`;
}

/** The same page in the other language, for the header toggle. */
export function swapLang(lang: Lang, path: string): string {
  return langPath(lang === "en" ? "af" : "en", path);
}

/** Canonical + hreflang alternates for one page. */
export function alternates(lang: Lang, path: string, origin: string) {
  const p = path === "/" ? "/" : `/${path.replace(/^\//, "")}`;
  return {
    canonical: `${origin}${langPath(lang, p)}`,
    languages: {
      en: `${origin}${langPath("en", p)}`,
      af: `${origin}${langPath("af", p)}`,
      "x-default": `${origin}${langPath("en", p)}`,
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
    langToggle: "Afrikaans",
    langShort: "AF",
    langAria: "AF: lees hierdie blad in Afrikaans",
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
      "The page moved, or it was never printed. The register, the programmes and the office are one click away.",
  },
  af: {
    skip: "Slaan oor na inhoud",
    home: "Oryx Instituut, tuisblad",
    menu: "Kieslys",
    close: "Maak toe",
    search: "Soek",
    searchOpen: "Maak soek oop",
    searchPlaceholder: "Deursoek die instituut",
    searchEmpty: "Niks in die indeks pas nie. Probeer n korter woord.",
    searchLabelPages: "Bladsye",
    searchLabelOffers: "Aanbiedings",
    searchLabelReading: "Leesstof",
    searchHint: "Enter maak oop · Esc maak toe",
    langToggle: "English",
    langShort: "EN",
    langAria: "EN: read this page in English",
    primaryNav: "Primêr",
    footerNav: "Voetskrif",
    siteMenu: "Werf-kieslys",
    contactOffice: "Kontak die kantoor",
    madeBy: "Gemaak deur",
    rights: "Alle regte voorbehou.",
    dateToCome: "Ongedateer",
    anchorNote: "datum moet nog bevestig word",
    bulletinInEnglish: "Die Bulletin-opstelle verskyn in Engels.",
    directoryInEnglish:
      "Die kursusse en sjablone self verskyn in Engels.",
    newsInEnglish: "Aankondigings verskyn in Engels.",
    readMore: "Lees",
    backHome: "Terug na die voorblad",
    notFoundTitle: "Niks staan by hierdie adres nie.",
    notFoundBody:
      "Die bladsy het geskuif, of dit is nooit gedruk nie. Die register, die kursusse en die kantoor is een klik ver.",
  },
} as const;

export type Chrome = (typeof chrome)["en"];
