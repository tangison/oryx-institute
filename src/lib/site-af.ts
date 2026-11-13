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
  heroSub: "'n Nuwe politegniese instituut vir Namibië. Navorsing, praktyk en die ondernemings wat die werk bewys.",
  closingLine:
    "Oryx Instituut-gegradueerdes los probleme stil op en voltooi dit beslissend.",
  credentialLine: "Uitnemendheid in innovasie en toegepaste probleemoplossing.",
  tagline: "Goeie werk begin met goeie gereedskap.",
  description:
    "Oryx Instituut, Windhoek: 'n nuwe politegniese instituut vir Namibië. Blits- en kortkursusse, besigheidsadvies, marknavorsing en die ondernemings wat die werk bewys. Die instituut stel sy stand eerlik: akkreditasie by NQA en NTA word nagestreef en daar is nog geen openbare perseel nie. Bel of WhatsApp 083 676 4338, of skryf aan info@oryxinstitute.org.",
  country: "Namibië",
  areaServed: "Windhoek, Namibië",
} as const;

export const statusAf = {
  stage: "Voorbekendstelling",
  accreditation:
    "Oryx streef akkreditasie by NQA en NTA na. Dit is nog nie geakkrediteer nie.",
  liveNow: [
    {
      name: "Die Eienaar se Lessenaars",
      line: "Een-tot-een besigheidsadvies. Die uitkoms word neergeskryf.",
    },
    {
      name: "Besigheidsadministrasie",
      line: "Blits- en kortkursusse in rekords, indienings en registers.",
    },
    {
      name: "Inligtingstegnologie en verwante velde",
      line: "Die stelsels waarop werk draai. Elke hulpmiddel het 'n naam.",
    },
    {
      name: "Marknavorsing en ontwikkeling",
      line: "Uitvoerbaarheid, groottebepaling, mededingers en roete-na-mark, op Namibiese grond nagevors.",
    },
    {
      name: "Vinnige-reaksie-opleiding",
      line: "Kry die kundige, bou die program, lewer volgens standaard.",
    },
    {
      name: "Die Oryx Directory",
      line: "Gratis Namibië-spesifieke blitskursusse en besigheidsjablone.",
    },
  ],
  inDevelopment: [
    {
      name: "KI-opleidingsprogram",
      line: "Saam met Tangison Technologies ontwikkel; op 18 Oktober 2026 aangekondig. Die kursusmateriaal en 'n vlagskipproduk is in ontwikkeling.",
    },
    {
      name: "Skills Camp by Karibib VTC",
      line: "'n Fisiese beroepsopleidingsentrum word ondersoek en beplan; 'n padkaart bestaan.",
    },
    {
      name: "Die grondslagstroom",
      line: "KI, besigheid, finansiële geletterdheid, leierskap en empatie as 'n verpligte stroom wanneer akkreditasie dit moontlik maak.",
    },
  ],
  partnerships:
    "Oryx is oop vir vennootskappe met organisasies wat soortgelyke doelwitte nastreef: opleidingsliggame, akkreditasievennote, korporatiewe borge en aanvullende ondernemings.",
  instructors: {
    title: "Smede",
    formalTitle: "Praktisyns",
    note: "Onderwysers staan as smede bekend, met praktisyn as die formele titel: ons bou die gereedskap waarmee die werk gedoen word.",
  },
} as const;

export const offersAf = [
  {
    id: "owners-desk",
    name: "Die Eienaar se Lessenaars",
    tag: "Praktyk",
    line: "Een-tot-een besigheidsadvies. Die uitkoms word neergeskryf.",
    cta: { label: "Bespreek die Eienaar se Lessenaars", href: "/apply/owners-desk" },
    body: "Een-tot-een advies vir Namibiese eienaars op die oomblikke wat die meeste kos: begin, registreer, aanstel, prys, draai of ordentlik afsluit. Die gesprek vind by die kantoor van die Prinsipaal of per e-pos plaas. Die uitkoms word neergeskryf: wat besluit is en wat volgende gebeur.",
  },
  {
    id: "business-administration",
    name: "Besigheidsadministrasie",
    tag: "Onderrig",
    line: "Blits- en kortkursusse in rekords, indienings en registers.",
    cta: { label: "Doen navraag oor Besigheidsadministrasie", href: "/apply/business-administration" },
    body: "Hierdie afdeling leer hoe 'n besigheid loop: rekords, indienings, registers en die daaglikse stelsels daaragter. Slegs blits- en kortkursusse. Elke kursus is smal, bruikbaar en afgerond.",
  },
  {
    id: "it",
    name: "Inligtingstegnologie en verwante velde",
    tag: "Onderrig",
    line: "Die stelsels waarop werk draai. Elke hulpmiddel het 'n naam.",
    cta: { label: "Doen navraag oor IT", href: "/apply/it" },
    body: "Hierdie afdeling leer die stelsels en sagteware waarop besighede draai, van eerste beginsels tot selfversekerde gebruik. Slegs blits- en kortkursusse. Elke hulpmiddel het 'n naam.",
  },
  {
    id: "market-rd",
    name: "Marknavorsing en ontwikkeling",
    tag: "Navorsing",
    line: "Uitvoerbaarheid, groottebepaling, mededingers en roete-na-mark, op Namibiese grond nagevors.",
    cta: { label: "Gee opdrag vir marknavorsing", href: "/apply/market-rd" },
    body: "Uitvoerbaarheidstudies, markgrootte, mededinger-ontleding en roete-na-mark-planne word op Namibiese grond ondersoek en as werkbare dokumente gelewer. Die instituut se eie aansoekwerk het die metode geslyp; dieselfde noukeurigheid is beskikbaar vir kliënte.",
  },
  {
    id: "rapid-response",
    name: "Vinnige-reaksie-opleiding",
    tag: "Praktyk",
    line: "Kry die kundige, bou die program, lewer volgens standaard.",
    cta: { label: "Beskryf 'n vinnige-reaksie-opleidingsbehoefte", href: "/apply/rapid-response" },
    body: "Wanneer 'n besigheid 'n span iets nuuts moet leer, vind Oryx die kundige, bou 'n program om daardie behoefte en lewer dit. Dit bestaan vir die gaping tussen wat 'n span reeds weet en wat dit volgende moet weet.",
  },
  {
    id: "directory",
    name: "Die Oryx Directory",
    tag: "Gratis",
    line: "Gratis Namibië-spesifieke blitskursusse en besigheidsjablone.",
    cta: { label: "Open die Oryx Directory", href: "/resources" },
    body: "Namibië-spesifieke blitskursusse en besigheidsjablone, met kopiereg by die instituut en gratis beskikbaar. Dit wys hoe die instituut skryf, bronne nagaan en onderrig voordat enige fooi gevra word.",
  },
] as const;

export const registerAf = [
  {
    date: "2026-11-01",
    entry:
      "Veiligheidsbeampte-opleidingsprogram aangekondig. Die kurrikulum is gepubliseer; die hoofinstrukteur en eerste kohortdatums word bevestig voordat inskrywings open.",
  },
  {
    date: "2026-10-25",
    entry:
      "BIPA-registrasie bevestig: Oryx Polytechnic Institute. Die registrasienommer en sertifikaat word binne 14 dae ná afhaal by BIPA gepubliseer.",
  },
  { date: "2026-10-25", entry: "Webwerf herbekendgestel." },
  { date: "2026-10-18", entry: "KI-opleidingsprogram saam met Tangison Technologies aangekondig." },
  {
    date: "2026-11-13",
    entry:
      "Die Oryx Directory se bronhersiening en eerste golf gepubliseer: sewe Namibië-spesifieke blitskursusse en sewe besigheidsjablone, met naspeurbare bronverwysings op wetlike en regulatoriese bladsye.",
  },
  { date: null, entry: "Corner Spa-konsep aangekondig." },
] as const;

export const venturesAf = {
  lead: "Klein ondernemings, werklike kliënte.",
  body: "Wanneer Oryx 'n sektor wil verstaan, begin dit 'n klein onderneming daarin. Kliënte besluit of dit werk, en die register publiseer die uitkoms.",
  cornerSpa: {
    name: "Corner Spa",
    status: "In ontwikkeling · saam met Mendozer",
    line: "Welstand- en diensbedrywighede: die eerste lewende laboratorium.",
    body: "Corner Spa is die instituut se eerste onderneming: 'n klein welstand- en diensbedryf wat saam met Mendozer ontwikkel word. Dit doen twee dinge: lewer 'n werklike diens aan werklike kliënte in Windhoek, en dien as 'n lewende klaskamer waar besigheidsadministrasie, diensstandaarde en ontvangsbedrywighede op die vloer geleer word. Die spa se eie toonbank is op Mendozer se platform en word op hierdie webwerf ingebed. Perseel, lisensiëring en die dienslys word in die regte volgorde afgehandel. Wanneer dit open, gaan die opening gedateerd in die register in. Tot dan is dit in ontwikkeling.",
  },
  futureLine:
    "Die volgende onderneming het nog nie 'n naam nie. Wanneer een open, word die opening met 'n datum in die register aangeteken.",
} as const;

export const disciplinesAf = [
  {
    id: "science",
    glyph: "WETENSKAP",
    name: "Wetenskap",
    summary: "Die redeneerkern van 'n politegniese opleiding: waarneming, bewyse en gedissiplineerde denke.",
  },
  {
    id: "engineering",
    glyph: "INGENIEURS",
    name: "Ingenieurswese",
    summary: "Die maakkern: werk wat hou, gemeet en volgens standaard voltooi.",
  },
  {
    id: "technology",
    glyph: "TEGNOLOGIE",
    name: "Tegnologie",
    summary: "Moderne gereedskap word uitmekaar gehaal en weer opgebou totdat dit verstaan word, nie net gebruik nie.",
  },
  {
    id: "applied",
    glyph: "LOS OP",
    name: "Toegepaste probleemoplossing",
    summary: "Die instituut se eie standaard, op elke sertifikaat genoem: innovasie in die praktyk.",
  },
] as const;

export const approvedLinesAf = [
  { line: "Lyk onskuldig. Is dit nie.", source: "Werwingspamflet" },
  {
    line: "Oryx Instituut-gegradueerdes los probleme stil op en voltooi dit beslissend.",
    source: "Werwingspamflet",
  },
  {
    line: "Uitnemendheid in innovasie en toegepaste probleemoplossing.",
    source: "Sertifikaat van bywoning",
  },
  { line: "Stil werk, beslissende afwerkings.", source: "Strategienotas" },
  { line: "Besluite, nie skyfies nie.", source: "Die praktyk" },
  { line: "Bewyse voordat geld beweeg.", source: "Marknavorsing en ontwikkeling" },
  { line: "Elke syfer dra sy bron, of dit verskyn nie.", source: "Die Bulletin" },
  { line: "Wat nie gereed is nie, sê so.", source: "Die register" },
  { line: "Sê die ding. Hou op.", source: "Die stem" },
  { line: "Stil is 'n register, nie 'n volume nie.", source: "Die stem" },
  { line: "Moenie beweer wat die drukstuk nie druk nie.", source: "Die handelsmerk" },
] as const;

export const partnersAf = [
  {
    id: "tangison",
    note: "Die KI-opleidingsprogram en die vlagskipproduk, saam gebou.",
  },
  {
    id: "mendozer",
    note: "Bou Corner Spa en die ondernemings daarna, saam.",
  },
] as const;

export const faqsAf = [
  {
    q: "Wanneer begin die veiligheidsbeamptekursus?",
    a: "Die kurrikulum en pryse word op 15 November 2026 gepubliseer. Kohort 1 word vir Januarie 2027 beplan. Registreer jou belangstelling deur in die aansoekvorm 'Safety training' te kies; ons sal jou kontak sodra inskrywings open.",
  },
  {
    q: "Wanneer begin geakkrediteerde programme?",
    a: "Die praktyk bied tans betaalde besigheidsadvies, marknavorsing en korporatiewe vinnige-reaksie-opleiding ingevolge kommersiële diensooreenkomste. Formele beroepsopleidingsprogramme begin eers nadat NTA-verskafferregistrasie toegestaan is. NQA-akkreditasie vir geregistreerde kwalifikasies word parallel nagestreef en sal in die openbare register aangekondig word.",
  },
  {
    q: "Hoe doen ek aansoek?",
    a: "Skryf aan die kantoor. Stuur een e-pos aan info@oryxinstitute.org met jou naam, 'n kontakbesonderheid vir die antwoord en jou belangstellingsveld. Die aansoek begin met daardie boodskap.",
  },
  {
    q: "Watter programme bied die instituut aan?",
    a: "Blits- en kortkursusse in twee afdelings: besigheidsadministrasie en inligtingstegnologie en verwante velde. Dit is die onderrigaanbod vandag: geen lang programme word aangebied nie. Langs die onderrig loop die praktyk: die Eienaar se Lessenaars vir een-tot-een advies, marknavorsing en ontwikkeling, en Vinnige-reaksie-opleiding. Skole fase in soos akkreditasie vorder. Kursusse word deur die kantoor van die Prinsipaal by aansoek bevestig; vra dus in die aansoekboodskap.",
  },
  {
    q: "Doen Oryx besigheidsadvies?",
    a: "Ja. Dit is die instituut se lewende praktyk. Die Eienaar se Lessenaars bied een-tot-een advies vanuit die kantoor van die Prinsipaal; marknavorsing en ontwikkelingswerk, insluitend uitvoerbaarheid, groottebepaling en roete-na-mark, word per opdrag aangepak. Skryf aan die kantoor met die probleem soos dit staan. Die eerste antwoord noem wat die instituut kan en nie kan doen nie.",
  },
  {
    q: "Wat beteken die woord Polytechnic?",
    a: "'n Politegniese instituut onderrig die gemaakte wêreld: die wetenskappe wat dit verklaar, die ingenieurswese wat dit bou en die tegnologie wat dit laat werk. Oryx maak toegepaste probleemoplossing die gemeenskaplike standaard.",
  },
  {
    q: "Waar is die instituut?",
    a: "Die instituut werk vanuit Windhoek, Namibië. Dit word gevestig en bedryf nog nie 'n openbare perseel nie; daarom word geen straatadres of posbus gepubliseer nie. Die kantoor antwoord navrae by info@oryxinstitute.org, of per telefoon of WhatsApp op 083 676 4338. Besoeke word op afspraak gereël.",
  },
  {
    q: "Wie lei die instituut?",
    a: "Tangi Iigonda is die Prinsipaal. Aansoeke word in die kantoor van die Prinsipaal gelees.",
  },
  {
    q: "Is daar 'n sertifikaat?",
    a: "Oryx reik twee soorte dokument na 'n kursus uit. Die Sertifikaat van Bywoning is 'n interne rekord van voltooiing vir elke kortkursus of werkswinkel, onderteken deur die Prinsipaal; dit is nie 'n NQF-kredietdraende kwalifikasie nie en kan nie as geakkrediteerde vorige leer by NQA ingedien word nie. 'n NQF-geregistreerde kwalifikasiesertifikaat word slegs uitgereik nadat Oryx NQA-akkreditasie vir die betrokke kwalifikasie ontvang het.",
  },
  {
    q: "Kan ek die kantoor besoek?",
    a: "Ja, op afspraak. Sê in jou eerste boodskap dat jy wil ontmoet en die kantoor bevestig 'n tyd en plek in Windhoek wat vir albei werk.",
  },
  {
    q: "Is Oryx geakkrediteer?",
    a: "Nog nie. Oryx streef akkreditasie by NQA en NTA na. Wat vandag werk, naamlik die blits- en kortkursusse, Vinnige-reaksie-opleiding en die Oryx Directory, is nuttig voordat akkreditasie ter sprake kom. Die webwerf beweer geen kwalifikasie wat die instituut nie hou nie.",
  },
  {
    q: "Wat is Vinnige-reaksie-opleiding?",
    a: "'n Besigheid moet 'n span iets nuuts leer. Oryx vind die kundige, bou die program om die behoefte en lewer dit. Dit is gemaak vir die gaping tussen wat 'n span weet en wat dit volgende moet weet. Doen navraag by die kantoor.",
  },
  {
    q: "Wat is die Oryx Directory?",
    a: "Die instituut se gratis hulpbronbiblioteek: Namibië-spesifieke blitskursusse en besigheidsjablone, met kopiereg by Oryx Polytechnic Institute en gratis beskikbaar. Dit is gepubliseerde bewys van die instituut se standaard voordat enige fooi bespreek word. Begin met die sewe blitskursusse of gebruik die sewe sjablone; wetlike en regulatoriese bladsye skakel na naspeurbare bronne.",
  },
  {
    q: "Wat dek die navorsings- en ontwikkelingspraktyk?",
    a: "Twee kante van dieselfde lessenaar. Vir kliënte: uitvoerbaarheidstudies, markgrootte, mededinger-ontleding en roete-na-mark-planne, op Namibiese grond nagevors. Vir die instituut: die KI-opleidingsprogram wat met Tangison Technologies gebou word, die vlagskipproduk daarop, en die Skills Camp-konsep. Die navorsingsblad noem wat lewendig en wat in ontwikkeling is.",
  },
  {
    q: "Werk Oryx met vennote?",
    a: "Openlik, en by naam. Die KI-opleidingsprogram loop met Tangison Technologies en konseptuele werk met Mendozer. Buiten die genoemde samewerkings is die instituut oop vir vennootskappe met organisasies wat soortgelyke doelwitte nastreef. Skryf aan die kantoor en sê wat jy in gedagte het.",
  },
  {
    q: "Wat is 'n onderneming?",
    a: "'n Klein bedryfsmaatskappy wat die instituut begin in 'n sektor wat dit wil verstaan. Die onderneming verdubbel as 'n lewende klaskamer: studente leer op die vloer en kliënte besluit of dit werk. Ondernemings word as konsepte aangekondig en gaan met 'n datum in die register in wanneer hulle open.",
  },
  {
    q: "Wat is Corner Spa?",
    a: "Die instituut se eerste onderneming, as konsep aangekondig: 'n klein welstand- en diensbedryf in Windhoek, gebou om besigheidsadministrasie, diensstandaarde en ontvangsbedrywighede op 'n werklike vloer te leer. Perseel, lisensiëring en die dienslys word in die regte volgorde afgehandel. Wanneer dit open, gaan die opening gedateerd in die register in.",
  },
  {
    q: "Kan ek die navorsing lees?",
    a: "Ja, en dit is gratis. Die Oryx Bulletin, die instituut se opstelreeks oor Namibië se werklikhede met 'n bron vir elke syfer, word volledig op hierdie webwerf gepubliseer. Die Oryx Directory dra die gratis blitskursusse en sjablone langsaan.",
  },
] as const;

export const navAf = {
  navLinks: [
    { href: "/research", label: "Navorsing" },
    { href: "/practice", label: "Praktyk" },
    { href: "/ventures", label: "Ondernemings" },
    { href: "/resources", label: "Die Directory" },
    { href: "/apply", label: "Doen aansoek" },
  ],
  footerNav: [
    { href: "/research", label: "Navorsing" },
    { href: "/practice", label: "Praktyk" },
    { href: "/ventures", label: "Ondernemings" },
    { href: "/corner-spa", label: "Corner Spa" },
    { href: "/resources", label: "Die Directory" },
    { href: "/resources#bulletin", label: "Bulletin" },
    { href: "/register", label: "Die Register" },
    { href: "/about", label: "Oor" },
    { href: "/brand", label: "Handelsmerk" },
    { href: "/apply", label: "Doen aansoek" },
    { href: "/contact", label: "Kontak" },
    { href: "/faq", label: "Vrae" },
    { href: "/legal/privacy", label: "Privaatheid" },
    { href: "/legal/terms", label: "Voorwaardes" },
  ],
} as const;
