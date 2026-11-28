/**
 * Oryx Institute · Afrikaans content mirror.
 *
 * This keeps the same data shapes as site.ts so pages can render a
 * complete Afrikaans experience without carrying Afrikaans content.
 */

export const siteAf = {
  tradingName: "Oryx Instituut",
  legalName: "Oryx Polytechnic Institute",
  headline: "Oryx Instituut.",
  heroSub: "’n Nuwe politegniese instituut vir Namibië wat deur navorsing, praktyk en ondernemings werk.",
  closingLine:
    "Goeie werk begin met bewyse en word met sorg voltooi.",
  credentialLine: "Navorsing, praktyk en ondernemings wat op werklike werk gegrond is.",
  tagline: "Goeie werk begin met goeie gereedskap.",
  description:
    "’n Nuwe politegniese instituut vir Namibië wat deur navorsing, praktyk en ondernemings werk.",
  country: "Namibië",
  areaServed: "Namibië",
  postalAddressBox: "Posbus 1662",
  postalAddressLine: "Posbus 1662, Namibië",
  plannedCentre:
    "Ongwediva is 'n toekomstige inisiatief. Dit word beplan, is nie oop nie en word nie as 'n openbare kampus aangebied nie.",
  plannedCampus:
    "Oryx identifiseer die Untag Guest House-ligging wat in die Visit Namibia-gids aangeteken is — Omatando Village aan die Okatana–Onamutyi-pad in Oshana — as ’n beplande toekomstige terrein met ’n gasvryheidsfokus. Die terrein is nie oop nie. Gasvryheid, toerbegeleiding, veiligheid en administrasie is slegs moontlike toekomstige areas; Oryx bied tans geen kursusse, inskrywings, kwalifikasies of geakkrediteerde programme daar aan nie.",
} as const;

export const statusAf = {
  stage: "Voorbekendstelling",
  accreditation:
    "Oryx werk aan NTA-opleidingsverskafferregistrasie. Dit is nie geregistreer of geakkrediteer nie en bied nie geakkrediteerde kwalifikasies, NQF-krediete of 'n openbare kampus aan nie.",
  liveNow: [
    {
      name: "Die Eienaar se Lessenaars",
      line: "Een-tot-een besigheidsadvies. Die uitkoms word neergeskryf.",
    },
    {
      name: "Marknavorsing en ontwikkeling",
      line: "Uitvoerbaarheid, markgrootte, mededingernavorsing en roete-na-mark-werk vir Namibiese kontekste.",
    },
  ],
  inDevelopment: [],
  partnerships:
    "Oryx noem werksverhoudings slegs waar die werk openbaar is. 'n Genoemde verhouding is nie akkreditasie, regulatoriese onderskrywing of 'n vennootskap met die NTA of NQA nie.",
} as const;

export const offersAf = [
  {
    id: "owners-desk",
    name: "Die Eienaar se Lessenaars",
    tag: "Praktyk",
    line: "Een-tot-een besigheidsadvies. Die uitkoms word neergeskryf.",
    cta: { label: "Doen navraag by die Oryx-kantoor", href: "/apply" },
    body: "Besigheidsadvies vir Namibiese eienaars wanneer 'n duidelike besluit nodig is: begin, registreer, aanstel, prys, draai of ordentlik afsluit. Omvang word deur die Oryx-kantoor ooreengekom, en die uitkoms word neergeskryf.",
  },
  {
    id: "market-rd",
    name: "Marknavorsing en ontwikkeling",
    tag: "Navorsing",
    line: "Uitvoerbaarheid, groottebepaling, mededingerlesings en roete-na-mark-werk, op Namibiese grond nagevors.",
    cta: { label: "Doen navraag by die Oryx-kantoor", href: "/apply" },
    body: "Uitvoerbaarheidstudies, markgrootte, mededingernavorsing en roete-na-mark-werk vir Namibiese kontekste. Die Oryx-kantoor bevestig die omvang vir elke opdrag.",
  },
] as const;

export const registerAf = [
  {
    date: "2026-11-13",
    entry:
      "Openbare status bygewerk: Oryx werk aan NTA-opleidingsverskafferregistrasie. Dit is nie geregistreer of geakkrediteer nie.",
  },
  {
    date: "2026-10-25",
    entry:
      "Regsentiteit gepubliseer: Oryx Polytechnic Institute, ook handelend as Oryx Institute, Close Corporation CC/2026/12517.",
  },
  { date: "2026-10-25", entry: "Webwerf herbekendgestel." },
] as const;

export const venturesAf = {
  lead: "Klein ondernemings, werklike kliënte.",
  body: "Oryx kan ’n klein onderneming bedryf om ’n sektor deur diens en werklike kliënte te verstaan. Die register teken elke onderneming aan soos dit ontwikkel.",
  cornerSpa: {
    name: "Corner Spa",
    status: "In bedryf · saam met Mendozer",
    line: "Welstand- en diensbedrywighede: die eerste bedrywige onderneming.",
    body: "Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments bedryf. Dit is ’n bedrywige omgewing vir praktiese besigheids- en dienswerk in Windhoek. Die spa se eie toonbank is op Mendozer se platform by spa.mendozer.com en word op hierdie webwerf ingebed. Besprekings- en diensbesonderhede bly op die spa se eie webwerf.",
  },
  futureLine:
    "Die volgende onderneming het nog nie 'n naam nie. Wanneer een open, word die opening met 'n datum in die register aangeteken.",
} as const;

export const disciplinesAf = [
  {
    id: "science",
    glyph: "WETENSKAP",
    name: "Wetenskap",
    summary: "Waarneming, bewyse en gedissiplineerde denke in ’n politegniese opleiding.",
  },
  {
    id: "engineering",
    glyph: "INGENIEURS",
    name: "Ingenieurswese",
    summary: "Ontwerp en maak van werk wat gemeet en volgens standaard voltooi is.",
  },
  {
    id: "technology",
    glyph: "TEGNOLOGIE",
    name: "Tegnologie",
    summary: "Moderne gereedskap goed genoeg verstaan om dit te gebruik, ondersoek en verbeter.",
  },
  {
    id: "applied",
    glyph: "LOS OP",
    name: "Toegepaste probleemoplossing",
    summary: "Kennis en gereedskap gebruik om ’n duidelike praktiese probleem op te los.",
  },
] as const;

export const approvedLinesAf = [
  { line: "Lyk onskuldig. Is dit nie.", source: "Werwingspamflet" },
  {
    line: "Goeie werk begin met bewyse en word met sorg voltooi.",
    source: "Oryx Instituut",
  },
  {
    line: "Navorsing, praktyk en maatskappye wat die werk bewys.",
    source: "Oryx Instituut",
  },
  { line: "Stil werk, beslissende afwerkings.", source: "Strategienotas" },
  { line: "Besluite, nie skyfies nie.", source: "Die praktyk" },
  { line: "Bewyse voordat geld beweeg.", source: "Marknavorsing en ontwikkeling" },
  { line: "Elke syfer dra sy bron, of dit verskyn nie.", source: "Navorsingsnotas" },
  { line: "Wat nie gereed is nie, sê so.", source: "Die register" },
  { line: "Sê die ding. Hou op.", source: "Die stem" },
  { line: "Stil is 'n register, nie 'n volume nie.", source: "Die stem" },
  { line: "Moenie beweer wat die drukstuk nie druk nie.", source: "Die handelsmerk" },
] as const;

export const partnersAf = [
  {
    id: "tangison",
    note: "Identiteit-, tegnologie- en leerplatformdienste ingevolge ooreenkoms.",
  },
  {
    id: "mendozer",
    note: "Bedryfsverhouding met Corner Spa.",
  },
] as const;

export const faqsAf = [
  {
    q: "Watter werk is nou beskikbaar?",
    a: "Oryx neem tans besigheidsadvies deur die Eienaar se Lessenaars en marknavorsing- en ontwikkelingsopdragte aan. Omvang en fooie word deur die Oryx-kantoor vir elke navraag bevestig.",
  },
  {
    q: "Wanneer begin geakkrediteerde leer?",
    a: "Oryx werk aan NTA-opleidingsverskafferregistrasie. Dit is nie geregistreer of geakkrediteer nie en bied nie geakkrediteerde kwalifikasies of NQF-krediete aan nie. Toekomstige leerpaaie word eers gepubliseer wanneer die toepaslike goedkeurings formeel bevestig is.",
  },
  {
    q: "Hoe doen ek navraag?",
    a: "Skryf aan info@oryxinstitute.org met jou naam, 'n kontakbesonderheid vir die antwoord en die werk- of toekomstige leerarea wat jy wil bespreek. Die Oryx-kantoor sal noem wat tans beskikbaar is.",
  },
  {
    q: "Wat beteken Polytechnic?",
    a: "'n Politegniese instituut verbind wetenskap, ingenieurswese en tegnologie met toegepaste probleemoplossing. Oryx bou na daardie institusionele model toe en stel sy huidige status eenvoudig.",
  },
  {
    q: "Waar is die instituut?",
    a: "Oryx werk regoor Namibië en publiseer slegs 'n posadres: Posbus 1662, Namibië. Geen fisiese adres, openbare besoekinligting of openingstye word gepubliseer nie.",
  },
  {
    q: "Is Oryx geakkrediteer?",
    a: "Nee. Oryx werk aan NTA-opleidingsverskafferregistrasie. Dit is nie by die NTA geregistreer nie en is nie deur die NQA geakkrediteer nie. Dit beweer nie geakkrediteerde programme, NQF-krediete of 'n openbare kampus nie.",
  },
  {
    q: "Kan ek die kantoor besoek?",
    a: "Geen openbare besoekadres of besoekinligting word gepubliseer nie. Gebruik die goedgekeurde openbare kontakroetes vir 'n navraag.",
  },
  {
    q: "Kan ek die navorsing lees?",
    a: "Ja. Oryx publiseer navorsingsnotas op hierdie webwerf. Elke nota hoort by die navorsingsprogram en is sonder 'n rekening beskikbaar.",
  },
  {
    q: "Werk Oryx met vennote?",
    a: "Oryx noem werksverhoudings slegs waar die werk openbaar is. Tangison Technologies verskaf identiteit-, tegnologie- en leerplatformdienste. Corner Spa werk met Mendozer Investments. Geen verhouding is 'n akkreditasie- of regulatoriese onderskrywing nie.",
  },
  {
    q: "Wat is 'n onderneming?",
    a: "'n Onderneming is 'n bedryfsmaatskappy waarmee Oryx 'n sektor deur werklike diens en werklike kliënte verstaan. Elke onderneming word eerlik as 'n konsep of bedrywige werk gestel.",
  },
  {
    q: "Wat is Corner Spa?",
    a: "Corner Spa is Oryx se eerste bedrywige onderneming, saam met Mendozer Investments in Windhoek bedryf. Besprekings- en diensbesonderhede bly op die spa se eie webwerf.",
  },
] as const;

export const navAf = {
  navLinks: [
    { href: "/research", label: "Navorsing" },
    { href: "/practice", label: "Praktyk" },
    { href: "/ventures", label: "Ondernemings" },
    { href: "/status", label: "Status" },
    { href: "/apply", label: "Doen navraag" },
    { href: "/careers", label: "Loopbane" },
  ],
  footerNav: [
    { href: "/research", label: "Navorsing" },
    { href: "/practice", label: "Praktyk" },
    { href: "/ventures", label: "Ondernemings" },
    { href: "/corner-spa", label: "Corner Spa" },
    { href: "/register", label: "Die Register" },
    { href: "/about", label: "Oor" },
    { href: "/status", label: "Status" },
    { href: "/brand", label: "Handelsmerk" },
    { href: "/apply", label: "Doen navraag" },
    { href: "/careers", label: "Loopbane" },
    { href: "/links", label: "Skakels" },
    { href: "/contact", label: "Kontak" },
    { href: "/faq", label: "Vrae" },
    { href: "/legal/privacy", label: "Privaatheid" },
    { href: "/legal/terms", label: "Voorwaardes" },
  ],
} as const;
