/**
 * Oryx Institute · Afrikaans content mirror.
 *
 * Same shapes as site.ts, so any page can pick the language object and
 * keep its render code unchanged. Brand names, legal names and the
 * wordmark stay exactly as the master package prints them; every
 * sentence around them carries the institute's voice in Afrikaans:
 * state the fact, cite the source, stop.
 */

export const siteAf = {
  tradingName: "Oryx Instituut",
  legalName: "Oryx Polytechnic Institute",
  headline: "Oryx Instituut.",
  heroSub:
    "'n Nuwe politegniek vir Namibië. Navorsing, praktyk, en maatskappye wat die werk bewys.",
  closingLine:
    "Oryx Instituut-gegradueerdes los probleme stilletjies op en voltooi hulle beslissend.",
  credentialLine: "Uitmuntendheid in innovasie en toegepaste probleemoplossing.",
  tagline: "Jy is net so goed soos jou gereedskap. Ons smee dit.",
  description:
    "Oryx Instituut, Windhoek: 'n nuwe politegniek vir Namibië. Kondens- en kortkursusse, berading, marknavorsing en -ontwikkeling, en die ondernemings wat die werk bewys.",
  country: "Namibië",
  areaServed: "Windhoek, Namibië",
} as const;

export const statusAf = {
  stage: "Voorlansering",
  accreditation:
    "Oryx baan aansoek om akkreditering by die NQA en die NTA aan. Dit is nog nie geakkrediteer nie.",
  liveNow: [
    {
      name: "Eienaar se Lessenaar",
      line: "Een-op-een besigheidsberading. Die uitslag word neergeskryf.",
    },
    {
      name: "Besigheidsadministrasie",
      line: "Kondens- en kortkursusse in rekords, aanmeldings en registers.",
    },
    {
      name: "IT en verwante velde",
      line: "Kondens- en kortkursusse in die stelsels waarop werk loop. Elke gereedskap word genoem.",
    },
    {
      name: "Marknavorsing en -ontwikkeling",
      line: "Uitvoerbaarheid, markgrootte, mededingerlesings, roete na mark, bymekaargemaak op Namibiese grond.",
    },
    {
      name: "Spoedreaksie-opleiding",
      line: "Uitgesoekte kundiges, gestruktureerde programme, tot standaard gelewer.",
    },
    {
      name: "Die Oryx-gids",
      line: "Gratis Namibië-spesifieke kondenskursusse en besigheidssjablone.",
    },
  ],
  inDevelopment: [
    {
      name: "Die KI-opleidingsprogram",
      line: "Saam met Tangison Technologies gebou, aangekondig op 18 Oktober 2026. Nou in ontwikkeling: die kurrikulum word geskryf en 'n vlagskipproduk is onder konstruksie.",
    },
    {
      name: "Skills Camp (Karibib VTC)",
      line: "Die fisieke beroepsopleidingsentrum is in navorsing en ontwikkeling, op sy eie roete.",
    },
    {
      name: "Die grondslagkursus-ruggengraat",
      line: "KI, besigheid, finansiële geletterdheid, leierskap en empatie as die verpligte ruggengraat: werklik sodra akkreditering aankom.",
    },
  ],
  partnerships:
    "Oryx staan oop vir vennootskappe met organisasies wat soortgelyke doelwitte najag: opleidingsliggame, akkrediteringsvennote, korporatiewe borge en aanvullende besighede.",
  instructors: {
    title: "Smede",
    formalTitle: "Meesters",
    note: "Die personeel word Smede genoem, formeel Meesters, na aanleiding van die slagspreuk: ons smee ons eie gereedskap.",
  },
} as const;

export const offersAf = [
  {
    id: "owners-desk",
    name: "Eienaar se Lessenaar",
    tag: "Praktyk",
    line: "Een-op-een besigheidsberading. Die uitslag word neergeskryf.",
    cta: { label: "Bespreek", href: "/apply?for=owners-desk" },
    body: "Eienaarvlak-berading vir Namibiese besighede op die oomblikke wat die duurste is: om te begin, te registreer, aan te stel, te prys, van rigting te verander of skoon te sluit. Sessies loop vanuit die Prinsipaal se kantoor of per e-pos, en die uitslag word neergeskryf: wat besluit is, en wat daarna gebeur.",
  },
  {
    id: "business-administration",
    name: "Besigheidsadministrasie",
    tag: "Onderrig",
    line: "Kondens- en kortkursusse in rekords, aanmeldings en registers.",
    cta: { label: "Doen navraag", href: "/apply?for=business-administration" },
    body: "Die departement onderrig hoe 'n besigheid loop: rekords, aanmeldings, registers en die alledaagse prosesse daaragter. Kondens- en kortkursusse alleen, elke kursus nou, prakties, en klaar.",
  },
  {
    id: "it",
    name: "IT en verwante velde",
    tag: "Onderrig",
    line: "Kondens- en kortkursusse in die stelsels waarop werk loop. Elke gereedskap word genoem.",
    cta: { label: "Doen navraag", href: "/apply?for=it" },
    body: "Die departement onderrig die stelsels en sagteware waarop 'n besigheid loop, van eerste beginsels tot seker gebruik. Kondens- en kortkursusse alleen, en elke gereedskap word by die naam genoem.",
  },
  {
    id: "market-rd",
    name: "Marknavorsing en -ontwikkeling",
    tag: "Navorsing",
    line: "Uitvoerbaarheid, markgrootte, mededingerlesings, roete na mark, bymekaargemaak op Namibiese grond.",
    cta: { label: "Trek ons in", href: "/apply?for=market-rd" },
    body: "Uitvoerbaarheidstudies, markgrootte, mededingerlesings en roete-na-mark-planne, bymekaargemaak op Namibiese grond en geskryf om gebruik te word. Die instituut se eie aanmeldings het die metode onderrig; dieselfde noukeurigheid is te huur.",
  },
  {
    id: "rapid-response",
    name: "Spoedreaksie-opleiding",
    tag: "Praktyk",
    line: "Uitgesoekte kundiges, gestruktureerde programme, tot standaard gelewer.",
    cta: { label: "Vertel ons", href: "/apply?for=rapid-response" },
    body: "As 'n besigheid 'n span oor iets nuuts moet oplei, soek Oryx die vakkundige uit, struktureer die program rondom daardie behoefte, en lewer dit. Gebou vir die tussenruimte tussen wat 'n span weet en wat dit volgende moet weet.",
  },
  {
    id: "directory",
    name: "Die Oryx-gids",
    tag: "Gratis",
    line: "Gratis Namibië-spesifieke kondenskursusse en besigheidssjablone.",
    cta: { label: "Neem dit", href: "/resources" },
    body: "Namibië-spesifieke kondenskursusse en besigheidssjablone, aan die instituut kopiereg en gratis toeganklik. Gepubliseerde bewys van hoe die instituut skryf, navorsing doen en onderrig, beskikbaar voordat enige fooi genoem word.",
  },
] as const;

export const registerAf = [
  { date: "2026-10-25", entry: "BIPA-registrasie bevestig: Oryx Polytechnic Institute." },
  { date: "2026-10-25", entry: "Webwerf herlaai." },
  { date: "2026-10-18", entry: "KI-opleidingsprogram aangekondig saam met Tangison Technologies." },
  /* TODO founder: Gids-publikasiedatum */
  { date: null, entry: "Die Oryx-gids gepubliseer: vier kondenskursusse, sewe besigheidssjablone." },
  /* TODO founder: Corner Spa-aankondigingsdatum */
  { date: null, entry: "Corner Spa-konsep aangekondig." },
] as const;

export const venturesAf = {
  lead: "Klein maatskappye, werklike kliënte.",
  body: "As Oryx 'n sektor wil verstaan, open dit 'n klein maatskappy binne-in daardie sektor. Die kliënte besluit of dit werk, en die register publiseer die uitslag.",
  cornerSpa: {
    name: "Corner Spa",
    status: "Konsep",
    line: "Welstand en diensbedrywighede: die eerste lewende laboratorium.",
    body: "Corner Spa is die instituut se eerste onderneming: 'n klein welstands- en diensbesigheid, aangekondig as 'n konsep en geopen as 'n besigheid. Die doel is tweevoudig: 'n werklike diens wat vir werklike kliënte in Windhoek loop, en 'n lewende klaskamer waar besigheidsadministrasie, diensstandaarde en ontvangsbedrywighede op die vloer van die besigheid self onderrig word. Die konsep is in ontwikkeling: persele, lisensies en die dienskaart word in orde gewerk. As dit open, kom die opening in die register op hierdie werf, gedateer. Tot daardie tyd bly dit 'n konsep.",
  },
  futureLine:
    "Die volgende onderneming het nog nie 'n naam nie. As een open, kom die opening met sy datum in die register.",
} as const;

export const disciplinesAf = [
  {
    id: "science",
    glyph: "理",
    name: "Wetenskap",
    summary:
      "Die redeneringskern van 'n 理工-opleiding: waarneming, bewys en gedissiplineerde denke.",
  },
  {
    id: "engineering",
    glyph: "工",
    name: "Ingenieurswese",
    summary: "Die maakkern: werk wat hou, gemeet en tot standaard voltooi.",
  },
  {
    id: "technology",
    glyph: "TECH",
    name: "Tegnologie",
    summary:
      "Moderne gereedskap wat uitmekaar gehaal en herbou word totdat dit verstaan word, nie net gebruik nie.",
  },
  {
    id: "applied",
    glyph: "SOLVE",
    name: "Toegepaste probleemoplossing",
    summary:
      "Die instituut se eie standaard, genoem op elke sertifikaat: innovasie in die praktyk.",
  },
] as const;

export const approvedLinesAf = [
  { line: "Lyk onskuldig. Is dit nie.", source: "Werwingspamflet" },
  {
    line: "Oryx Instituut-gegradueerdes los probleme stilletjies op en voltooi hulle beslissend.",
    source: "Werwingspamflet",
  },
  {
    line: "Uitmuntendheid in innovasie en toegepaste probleemoplossing.",
    source: "Sertifikaat van Prestasie",
  },
  { line: "Stille werk, beslisse eindes.", source: "Strategienotas" },
  { line: "Besluite, nie voorleggings nie.", source: "Die praktyk" },
  { line: "Bewys voor geld beweeg.", source: "Marknavorsing" },
  {
    line: "Elke syfer dra sy bron, of dit gaan nie uit nie.",
    source: "Die Bulletin",
  },
  { line: "Wat nie reg is nie, sê so.", source: "Die register" },
  { line: "Sê die ding. Hou op.", source: "Die stem" },
  { line: "Stilte is 'n register, nie 'n volume nie.", source: "Die stem" },
  {
    line: "Nooit beweer wat die drukpakket nie druk nie.",
    source: "Die handelsmerk",
  },
] as const;

export const partnersAf = [
  {
    id: "tangison",
    note: "Die KI-opleidingsprogram en die vlagskipproduk, saam gebou.",
  },
  {
    id: "mendozer",
    note: "Saam aan Corner Spa en die ondernemings daarna.",
  },
] as const;

export const faqsAf = [
  {
    q: "Hoe doen ek aansoek?",
    a: "Skryf aan die kantoor. Stuur een e-pos aan info@oryxinstitute.org met jou naam, 'n kontak vir die antwoord, en jou belangstellingsveld. Die aansoek begin met daardie boodskap.",
  },
  {
    q: "Watter programme bied die instituut aan?",
    a: "Kondenskursusse en kortkursusse, in twee departemente: besigheidsadministrasie, en IT en verwante velde. Dit is vandag die onderrig-aanbod, en dit alles: geen lang programme word aangebied nie. Naas die onderrig loop die praktyk: die Eienaar se Lessenaar vir een-op-een-berading, marknavorsing en -ontwikkeling, en Spoedreaksie-opleiding. Die skole tree in namate akkreditering vorder. Kursusse word by aansoek deur die Prinsipaal se kantoor bevestig, so die eerlike antwoord op enigiets meer spesifiek is: vra, in die aansoekboodskap.",
  },
  {
    q: "Doen Oryx konsultasiewerk vir besighede?",
    a: "Ja, en dit is die instituut se lewende praktyk. Die Eienaar se Lessenaar loop een-op-een-berading vanuit die Prinsipaal se kantoor, en marknavorsings- en -ontwikkelingswerk (uitvoerbaarheid, markgrootte, roete na mark) word per opdrag aangeneem. Skryf aan die kantoor met die probleem soos dit staan; die eerste antwoord noem wat die instituut vir jou kan en nie kan doen nie.",
  },
  {
    q: "Wat beteken 理工?",
    a: "Li gong: die Chinese karakters vir wetenskap en ingenieurswese. In die woordmerk staan hulle presies waar die woord Polytechnic in die instituut se volle wetlike naam staan, gedruk in maroen langs ORYX.",
  },
  {
    q: "Waar is die instituut?",
    a: "Die instituut werk vanuit Windhoek, Namibië. Dit word tans gestig en het nog geen openbare perseel nie, dus word geen straatadres of posbus gedruk nie. Die kantoor antwoord elke navraag per e-pos by info@oryxinstitute.org, en besoeke word per afspraak gereël.",
  },
  {
    q: "Wie lei die instituut?",
    a: "Tangi Iigonda is die Prinsipaal. Aansoeke word in die Prinsipaal se kantoor gelees.",
  },
  {
    q: "Is daar 'n sertifikaat?",
    a: "Ja. Die instituut reik sy Sertifikaat van Prestasie by voltooiing uit, vir uitmuntendheid in innovasie en toegepaste probleemoplossing. Die sertifikaat word deur die Prinsipaal onderteken en met die hand gedateer.",
  },
  {
    q: "Kan ek die kantoor besoek?",
    a: "Ja, per afspraak. Sê in jou eerste boodskap dat jy wil ontmoet, en die kantoor bevestig 'n tyd en plek in Windhoek wat albei kante pas.",
  },
  {
    q: "Is Oryx geakkrediteer?",
    a: "Nog nie. Oryx baan aansoek om akkreditering by die NQA en die NTA aan. Wat vandag loop, die kondens- en kortkursusse, Spoedreaksie-opleiding en die Oryx-gids, werk voordat akkreditering saak maak. Niks op hierdie werf beweer 'n kwalifikasie wat die instituut nie het nie.",
  },
  {
    q: "Wat is Spoedreaksie-opleiding?",
    a: "'n Besigheid moet 'n span oor iets nuuts oplei. Oryx soek die vakkundige uit, struktureer die program rondom daardie behoefte, en lewer dit. Dit is gebou vir die tussenruimte tussen wat 'n span weet en wat dit volgende moet weet. Doen navraag by die kantoor.",
  },
  {
    q: "Wat is die Oryx-gids?",
    a: "Die instituut se gratis hulpbronbiblioteek: Namibië-spesifieke kondenskursusse en besigheidssjablone, aan Oryx Polytechnic Institute kopiereg en gratis toeganklik. Dit is gepubliseerde bewys van die instituut se standaard, beskikbaar voordat enige fooi genoem word. Begin by die vier kondenskursusse, of help jouself aan die sewe sjablone.",
  },
  {
    q: "Wat dek die navorsings- en ontwikkelingspraktyk?",
    a: "Twee kante van dieselfde lessenaar. Vir kliënte: uitvoerbaarheidstudies, markgrootte, mededingerlesings en roete-na-mark-planne, bymekaargemaak op Namibiese grond. Vir die instituut self: die KI-opleidingsprogram wat nou saam met Tangison Technologies gebou word, die vlagskipproduk wat daarop onder konstruksie is, en die Skills Camp-konsep. Die navorsingsblad noem wat lewendig is en wat in ontwikkeling is.",
  },
  {
    q: "Werk Oryx met vennote?",
    a: "Oop, en by naam. Die KI-opleidingsprogram loop saam met Tangison Technologies, en konsepswerk loop saam met Mendozer. Buite die genoemde samewerkings staan die instituut oop vir vennootskappe met organisasies wat soortgelyke doelwitte najag: opleidingsliggame, akkrediteringsvennote, korporatiewe borge en aanvullende besighede. Skryf aan die kantoor en sê wat jy voor het.",
  },
  {
    q: "Wat is 'n onderneming?",
    a: "'n Klein bedrywende maatskappy wat die instituut binne-in 'n sektor open wat dit wil verstaan. Die onderneming dien terselfdertyd as 'n lewende klaskamer: studente leer op sy vloer, en sy kliënte besluit of dit werk. Ondernemings word as konsepte aangekondig en in die register geboek wanneer dit open.",
  },
  {
    q: "Wat is Corner Spa?",
    a: "Die instituut se eerste onderneming, aangekondig as 'n konsep: 'n klein welstands- en diensbesigheid in Windhoek, gebou om besigheidsadministrasie, diensstandaarde en ontvangsbedrywighede op 'n werklike vloer te onderrig. Persele, lisensies en die dienskaart word in orde gewerk. As dit open, kom die opening gedateer in die register.",
  },
  {
    q: "Kan ek die navorsing lees?",
    a: "Ja, en dit is gratis. Die Oryx Bulletin, die instituut se reeks opstelle oor Namibië se werklikhede, met elke syfer se bron aangehaal, word in volle lig op hierdie werf gepubliseer: geen fooi en geen rekening nie. Die Oryx-gids dra die gratis kondenskursusse en sjablone langs dit.",
  },
] as const;

export const navAf = {
  navLinks: [
    { href: "/programmes", label: "Programme" },
    { href: "/research", label: "Navorsing" },
    { href: "/news", label: "Nuus" },
    { href: "/apply", label: "Skryf in" },
  ],
  footerNav: [
    { href: "/programmes", label: "Programme" },
    { href: "/research", label: "Navorsing" },
    { href: "/practice", label: "Praktyk" },
    { href: "/ventures", label: "Ondernemings" },
    { href: "/register", label: "Register" },
    { href: "/schools", label: "Skole" },
    { href: "/resources", label: "Hulpbronne" },
    { href: "/tools", label: "Gereedskap" },
    { href: "/news", label: "Nuus" },
    { href: "/apply", label: "Skryf in" },
    { href: "/contact", label: "Kontak" },
    { href: "/about", label: "Oor" },
    { href: "/brand", label: "Handelsmerk" },
    { href: "/faq", label: "Gereelde vrae" },
  ],
} as const;
