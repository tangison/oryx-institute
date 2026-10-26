/**
 * Oryx Institute · Afrikaans mirror of content.ts.
 *
 * The Bulletin essays stay in English (they are the works themselves,
 * cited and dated); everything the interface says around them is
 * Afrikaans, and the AF pages say so plainly.
 */

export const mottoAf = {
  line: "Jy is net so goed soos jou gereedskap. Ons smee dit.",
  source: "Die Oryx-slagspreuk",
  origin:
    "Die slagspreuk hou die stigter se reël en maak die deur oop: die brein is die grootste gereedskap, en die instituut lei die mense wat dit gebruik.",
} as const;

export const schoolsAf = [
  {
    id: "technology",
    phase: "Skool I",
    name: "Skool vir Tegnologie",
    status: "Oop vir navraag",
    lead: "Die KI-vlagskip. Eerste in, omdat dit die minste benodig: 'n bank, 'n meter, 'n masjien wat saam met jou dink.",
    body: "Tegnologie is waar die instituut begin. Die dissipline dek die moderne gereedskapsketting van binne: hoe rekenaarstelsels uitmekaar gehaal, verstaan en herbou word, en hoe KI-gereedskap aangewend word sonder om oordeel aan hulle af te staan. Die studievennoot loop op dieselfde stelsel as die instituut self, so studente leer van die eerste dag af op die regte ding.",
  },
  {
    id: "engineering",
    phase: "Skool II",
    name: "Skool vir Ingenieurswese",
    status: "Binnekort",
    lead: "Die maakkern: werk wat hou, gemeet en tot standaard voltooi.",
    body: "Ingenieurswese volg, omdat dit die eisendste is om reg op te rig: masjienwerkplekke, meting, die dissipline van toleransies. Die instituut open geen werkswinkel wat dit nie kan beman met mense wat vir 'n lewe metaal gesny het nie. As die skool sy deure open, is die sertifikaatstandaard alreeds geskryf: uitmuntendheid in innovasie en toegepaste probleemoplossing.",
  },
  {
    id: "science",
    phase: "Skool III",
    name: "Skool vir Wetenskap",
    status: "Binnekort",
    lead: "Die redeneringskern: waarneming, bewys en gedissiplineerde denke.",
    body: "Wetenskap is die lang wedloop. Die laboratorium neem tyd om te bou, en die instituut sal geen geleende laboratorium as sy eie aanbied nie. Die skool kom wanneer die banke werklik is, en dit kom met dieselfde ruggengraat wat elke ander skool dra: bewys eerste, versiering nooit, en 'n onderneming in elke koers.",
  },
] as const;

export const appliedSpineAf = {
  name: "Toegepaste probleemoplossing",
  line: "Nie 'n skool nie. Die ruggengraat wat deur al drie loop, en die standaard wat op elke sertifikaat genoem word.",
} as const;

export const toolsListAf = [
  {
    register: "Die kantoorstelsel",
    intro: "Hoe die instituut self loop, in die oop. As dit op hierdie lys staan, word dit werklik gebruik.",
    items: [
      {
        name: "Een posbus",
        what: "info@oryxinstitute.org, gelees in die Prinsipaal se kantoor. Dit is die ontvangs: aansoeke, vrae en afsprake begin alles daar.",
      },
      {
        name: "Die drukpakket",
        what: "Briefhoof, sertifikaat, besigheidskaart. Die instituut se papierregister, deur elke bladsy van hierdie werf gedra.",
      },
    ],
  },
  {
    register: "Die leerder se gereedskapruggengraat",
    intro: "Die gedissiplineerde basiese waarvan elke kursus uitgaan, per koers gereël waar die kursus dit benodig.",
    items: [
      {
        name: "Die brein",
        what: "Die grootste gereedskap, volgens die stigter se reël. Alles anders op hierdie bladsy is daaragter.",
      },
      {
        name: "Potlood, liniaal, kompas",
        what: "Met die hand geteken voor die masjien teken. Dit is waar die standaard van voltooiing begin.",
      },
      {
        name: "Meter, soldeerbout, werkbank",
        what: "Meet, soldeer, maak. Werkswinkeltoegang word per koers gereël en voor inskrywing hardop genoem, nooit deur prente geïmpliseer nie.",
      },
      {
        name: "Die notaboek",
        what: "Elke kursus hou 'n geskrewe rekord. Gegradueerdes loop met hulle eie bewyspoor weg, in hulle eie handskrif.",
      },
    ],
  },
  {
    register: "Die KI-stelsel",
    intro: "Die instituut is KI-inheems, en elke gereedskap word by die naam genoem.",
    items: [
      {
        name: "Die KI-studievennoot",
        what: "'n KI-ondersteunde tutor wat op die instituut se eie stelsel loop: oefenvrae, gewerkte voorbeelde, geduldige herhaling, in eenvoudige taal. Die model daaragter word in die kursuspakke genoem, nie op 'n webblad nie.",
      },
      {
        name: "Oefenbanke, per kursus gegenereer",
        what: "Vraestelle en oefeninge uit elke kursus se eie materiaal geproduseer, deur die onderrigpersoneel gekontroleer voordat hulle 'n student bereik.",
      },
      {
        name: "Vanlyn-eerste studiepakke",
        what: "Kursuspakke wat bly werk wanneer die verbinding nie werk nie. Windhoek het die instituut daardie les geleer voor die KI dit gedoen het.",
      },
    ],
  },
] as const;

export const resourcesAf = [
  {
    name: "Die Oryx Bulletin",
    what: "Die instituut se eie insigte, hieronder en op hierdie bladsy. Aangehaalde syfers, eenvoudige taal, geen vullis nie.",
    action: { label: "Lees die Bulletin", href: "#bulletin" },
  },
  {
    name: "Die Oryx-gereedskapslys",
    what: "Elke gereedskap waarop die instituut loop, openlik gepubliseer: die kantoorstelsel, die leerder se ruggengraat, die KI-stelsel.",
    action: { label: "Sien die gereedskap", href: "/tools" },
  },
  {
    name: "Die aansoekgids",
    what: "Een boodskap aan die Prinsipaal se kantoor begin 'n aansoek. Die gids loop deur wat daarin hoort.",
    action: { label: "Lees die gids", href: "/apply" },
  },
  {
    name: "Die prospektus",
    what: "Programdetail word by aansoek deur die Prinsipaal se kantoor bevestig, so die prospektus word op versoek uitgereik eerder as 'n verouderde PDF.",
    action: { label: "Versoek dit", href: "/apply" },
  },
  {
    name: "Die handelsmerkregister",
    what: "Die woordmerk, die embleem, die kodes en die stem, in volle lig gepubliseer.",
    action: { label: "Open die register", href: "/brand" },
  },
] as const;
