/**
 * Oryx Institute · content source of truth.
 * Every fact below is drawn from the approved master asset package:
 * logos, print kit, the published homepage, the business plan, the
 * directory roadmap and the strategy notes. Nothing here is invented:
 * names, contacts, status and lines match the approved material exactly.
 */

/**
 * The Oryx voice bar, applied to every line on the site.
 * Declarative, exact, unhurried: state the fact, cite the source,
 * stop. The institute's approved lines (the flyer headline, the
 * graduate line, the certificate language, the tagline) run verbatim
 * and are the only wit on the site. Nothing annotates its own
 * imagery; nothing explains itself twice.
 */
export const voice = {
  register: "Declarative, exact, unhurried. State the fact; cite the source; stop.",
  rules: [
    "Approved lines run verbatim: Looks harmless. Isn't. / graduates solve problems quietly and finish them decisively. / excellence in innovation and applied problem-solving. / You're only as good as your tools. We forge them.",
    "Facts carry their source inline or they do not ship.",
    "No wisecracks, no self-annotation, no captions under images.",
    "Status is stated as it is: prelaunch, pre-accreditation, honest.",
  ],
} as const;

export const site = {
  /** The legal name, spelled per the master package documents. It is
   * used on certificates, contracts and the footer only. */
  legalName: "Oryx Polytechnic Institute",
  /** The public-facing brand name, kept short per the business plan's
   * own recommendation. It carries the header, the titles and the day
   * to day copy. */
  tradingName: "Oryx Institute",
  shortName: "Oryx Institute",
  /** The wordmark, exactly as the logo renders it: three scripts. */
  wordmark: {
    top: "ORYX",
    chinese: "理工",
    chineseMeaning: "science and engineering",
    bottom: "INSTITUTE",
  },
  /** The homepage headline. The institute is stated by what it does,
   * in the city it works from. */
  headline: "Applied problem-solving, Windhoek.",
  /** Approved flyer line on graduates. */
  closingLine:
    "Oryx Institute graduates solve problems quietly and finish them decisively.",
  /** Approved certificate language. */
  credentialLine:
    "Excellence in innovation and applied problem-solving.",
  /** The approved tagline (strategy notes, decision 8): the inclusive
   * variant of the founder's original idiom. */
  tagline: "You're only as good as your tools. We forge them.",
  /** Meta description, sized for search results (kept under 160
   * characters) and led by what runs today: the consulting practice. */
  description:
    "Oryx Institute, Windhoek: business counselling, market research and development, and Rapid Response Training, live now. Free Directory; applications by enquiry.",
  /** Where the institute works from. There is no public premises yet:
   * no street address, no post box and no campus are claimed. When a
   * location exists, it is added here once and every page follows. */
  city: "Windhoek",
  country: "Namibia",
  areaServed: "Windhoek, Namibia",
  /** The one mailbox. Everything runs through it while the institute
   * is young: applications, partnerships, the press. */
  email: "info@oryxinstitute.org",
  /** The business telephone line is deliberately not printed. A
   * dedicated business number lands before launch; when it does, it is
   * added here once and the header, footer and FAQ follow. */
  phoneDisplay: null,
  phoneHref: null,
  /** Social channels, launching with the institute. Add each one here
   * as it goes live and the footer renders it; nothing is linked
   * before it exists. */
  socials: [] as { label: string; href: string }[],
  url: "https://oryxinstitute.org",
  principal: {
    name: "Tangi Iigonda",
    role: "Principal",
  },
  /** Exact brand codes from the logo artwork. */
  colors: {
    ink: "#181713",
    maroon: "#71111F",
    ivory: "#FFF8EE",
    white: "#FFFFFF",
  },
} as const;

/**
 * Where the institute stands, stated plainly. Every line is grounded in
 * the master package's own status note and strategy decisions. The site
 * never claims accreditation, a campus, or an intake date.
 */
export const status = {
  stage: "Prelaunch",
  accreditation:
    "Oryx is pursuing accreditation with the NQA and the NTA. It is not accredited yet, and it says so.",
  liveNow: [
    {
      name: "Business counselling",
      line: "One desk in the Principal's office: bring the problem as it stands, leave with a decision you can act on the same week. Namibian rates, Namibian context.",
    },
    {
      name: "Market research and development",
      line: "Evidence before money moves. Feasibility, market sizing and route-to-market work, gathered on the ground in Namibia and written to be used, not shelved.",
    },
    {
      name: "Rapid Response Training",
      line: "A business needs a team trained on something new. Oryx sources the industry expert, structures the programme, and delivers.",
    },
    {
      name: "The Oryx Directory",
      line: "Free, Namibia-specific crash courses and business templates, copyrighted to Oryx Polytechnic Institute, free to access.",
    },
  ],
  inDevelopment: [
    {
      name: "The AI training programme",
      line: "Built with Tangison Technologies, announced 18 October 2026. In development now; the curriculum is being written and a flagship product is under construction.",
    },
    {
      name: "Skills Camp (Karibib VTC)",
      line: "The physical vocational training centre is in research and development, on its own roadmap.",
    },
    {
      name: "The foundational course spine",
      line: "AI, business, financial literacy, leadership and empathy as the mandatory spine: real once accreditation lands.",
    },
  ],
  /** Strategy decision 9: the partnership stance is stated openly,
   * never left implicit. */
  partnerships:
    "Oryx is open to partnerships with organizations pursuing similar goals: training bodies, accreditation partners, corporate sponsors, and complementary businesses.",
  /** Strategy decision 7: what the institute calls its teaching staff. */
  instructors: {
    title: "Smiths",
    formalTitle: "Masters",
    note: "Never lecturers, not instructors. The name ties to the tagline: we forge our own tools.",
  },
} as const;

/**
 * The consulting practice: what the institute sells today, while the
 * schools are phased in. Ordered as the office prefers enquiries to
 * arrive. Nothing here promises a credential; every line promises work.
 */
export const services = [
  {
    id: "counselling",
    name: "Business counselling",
    line: "Decisions, not decks.",
    body: "Owner-level counselling for Namibian businesses at the moments that cost the most: starting, registering, hiring, pricing, pivoting or closing cleanly. Sessions run from the Principal's office or on WhatsApp, and the outcome is written down: what was decided, and what happens next.",
  },
  {
    id: "research",
    name: "Market research and development",
    line: "Evidence before money moves.",
    body: "Feasibility studies, market sizing, competitor reads and route-to-market plans, gathered on Namibian ground and written to be used. The institute's own filings taught the method; the same rigor is for hire.",
  },
  {
    id: "rapid-response",
    name: "Rapid Response Training",
    line: "A team, brought up to standard.",
    body: "When a business needs a team trained on something new, Oryx sources the industry expert, structures the programme around that need, and delivers it. Built for the gap between what a team knows and what it needs to know next.",
  },
  {
    id: "directory",
    name: "The Oryx Directory",
    line: "Free, and it proves the standard.",
    body: "Namibia-specific crash courses and business templates, copyrighted to the institute and free to access. Published proof of how the institute writes, sources and teaches, available before any fee is discussed.",
  },
] as const;

/**
 * The four disciplines of a 理工 (science and engineering) education,
 * framed from the institute's own approved language. No programme
 * names, dates or fees are invented: each card routes to enquiry.
 */
export const disciplines = [
  {
    id: "science",
    glyph: "理",
    name: "Science",
    summary:
      "The reasoning core of a 理工 education: observation, evidence and disciplined thought.",
  },
  {
    id: "engineering",
    glyph: "工",
    name: "Engineering",
    summary:
      "The making core: work that holds, measured and finished to standard.",
  },
  {
    id: "technology",
    glyph: "TECH",
    name: "Technology",
    summary:
      "Modern tools taken apart and rebuilt until they are understood, not just used.",
  },
  {
    id: "applied",
    glyph: "SOLVE",
    name: "Applied problem-solving",
    summary:
      "The institute's own standard, named on every certificate: innovation in practice.",
  },
] as const;

/** Approved lines used across the site, verbatim from the brand assets. */
export const approvedLines = [
  {
    line: "Looks harmless. Isn't.",
    source: "Recruitment flyer",
  },
  {
    line:
      "Oryx Institute graduates solve problems quietly and finish them decisively.",
    source: "Recruitment flyer",
  },
  {
    line: "Excellence in innovation and applied problem-solving.",
    source: "Certificate of Achievement",
  },
] as const;

/** Primary navigation: two mega groups and the Apply action. */
export const navGroups = [
  {
    label: "Programmes",
    items: [
      {
        href: "/schools",
        name: "The Schools",
        desc: "Technology, Engineering, Science: three schools, one spine, phased.",
      },
      ...disciplines.map((d) => ({
        href: `/programmes#${d.id}`,
        name: d.name,
        desc: d.summary,
      })),
      {
        href: "/tools",
        name: "The Tools List",
        desc: "Every tool the institute runs on, published in the open.",
      },
    ],
  },
  {
    label: "Institute",
    items: [
      { href: "/about", name: "About", desc: "The institute, the name and the Principal." },
      { href: "/people", name: "People", desc: "The hiring bar, published before the titles." },
      { href: "/resources", name: "Resources", desc: "The Oryx Directory: free crash courses and templates, plus the Bulletin." },
      { href: "/announcements", name: "Announcements", desc: "What the institute has made public, dated as it was said." },
      { href: "/compare", name: "Compare", desc: "Oryx beside the alternatives, honestly." },
      { href: "/brand", name: "Brand", desc: "The wordmark, the emblem, the codes and the voice." },
      { href: "/faq", name: "FAQ", desc: "Applying, programmes and where to find us." },
    ],
  },
  { href: "/apply", label: "Apply" },
] as const;

/** FAQ entries: every answer is grounded in the institute's published
 * contacts and print kit. Nothing promises what is not printed. */
export const faqs = [
  {
    q: "How do I apply?",
    a: "Write to the office. Send one email to info@oryxinstitute.org with your name, a contact for the reply, and your field of interest. The application starts with that message.",
  },
  {
    q: "What programmes does the institute offer?",
    a: "Today, the consulting practice: business counselling, market research and development, and Rapid Response Training. The education stands on four disciplines, science, engineering, technology and applied problem-solving, and it is phased in as accreditation progresses. Programme and course offerings are confirmed by the Principal's office at the point of application, so the honest answer to anything more specific is: ask, in the application message.",
  },
  {
    q: "Does Oryx consult for businesses?",
    a: "Yes, and it is the institute's live practice. Business counselling runs from the Principal's office, and market research and development work (feasibility, sizing, route-to-market) is taken on per engagement. Write to the office with the problem as it stands; the first reply names what the institute can and cannot do for you.",
  },
  {
    q: "What does 理工 mean?",
    a: "Li gong: the Chinese characters for science and engineering. In the wordmark they stand exactly where the word Polytechnic sits in the institute's full legal name, set in maroon beside ORYX.",
  },
  {
    q: "Where is the institute?",
    a: "The institute works from Windhoek, Namibia. It is being established and does not operate public premises yet, so no street address or post box is printed. The office answers every enquiry by email at info@oryxinstitute.org, and visits are arranged by appointment.",
  },
  {
    q: "Who leads the institute?",
    a: "Tangi Iigonda is the Principal. Applications are read in the Principal's office.",
  },
  {
    q: "Is there a certificate?",
    a: "Yes. The institute issues its Certificate of Achievement on completion, recognizing excellence in innovation and applied problem-solving. The certificate is signed by the Principal and dated by hand.",
  },
  {
    q: "Can I visit the office?",
    a: "Yes, by appointment. Say in your first message that you would like to meet, and the office will confirm a time and place in Windhoek that suits both sides.",
  },
  {
    q: "Is Oryx accredited?",
    a: "Not yet, and the institute says so plainly. Oryx is pursuing accreditation with the NQA and the NTA. What runs today is Rapid Response Training and the Oryx Directory, both of which work before accreditation matters. Nothing on this site claims a credential the institute does not hold.",
  },
  {
    q: "What is Rapid Response Training?",
    a: "A business needs a team trained on something new. Oryx sources the industry expert, structures the programme around that need, and delivers it. It is built for the gap between what a team knows and what it needs to know next. Enquire through the office.",
  },
  {
    q: "What is the Oryx Directory?",
    a: "The institute's free resource library: Namibia-specific crash courses and business templates, copyrighted to Oryx Polytechnic Institute and free to access. It is published proof of the institute's standard, available before any fee is discussed. Start with the four crash courses or help yourself to the seven templates.",
  },
  {
    q: "Does Oryx work with partners?",
    a: "Openly. The institute is open to partnerships with organizations pursuing similar goals: training bodies, accreditation partners, corporate sponsors, and complementary businesses. Write to the office and say what you have in mind.",
  },
] as const;

/**
 * Announcements: what the institute has made public, dated as it was
 * said. Nothing is announced before it is certain, and nothing here
 * names a partner before that partner has agreed to be named.
 */
export const announcements = [
  {
    slug: "ai-training-programme",
    date: "18 October 2026",
    dateISO: "2026-10-18",
    kicker: "Announcement",
    title: "An AI training programme with Tangison Technologies",
    standfirst:
      "Built with Tangison Technologies, for Namibian teams and learners. The partnership is confirmed, the curriculum is already under construction, and a flagship product is being built on it. The schedule lands when it is earned.",
    body: [
      "Oryx Institute will run an AI training programme in partnership with Tangison Technologies. The partnership is confirmed. The curriculum is not a sketch: it is being written now, module by module, to the institute's standing rule that tools are named, not magic, and that nothing is taught which cannot be demonstrated in front of the class.",
      "On top of that curriculum, a flagship product is in development with Tangison Technologies. It is the first thing learners and client teams will touch, and it is being built before the programme is advertised, not after. What it is, exactly, stays deliberately quiet until it can be shown; what can be said today is that it exists, it is under construction, and it sets the bar the whole programme will be judged against.",
      "Tangison Technologies is the right partner for this because the collaboration did not start as a partnership at all. It started as work: businesses kept coming to the institute's consulting practice asking for real AI capability, and the honest answer was to build the training and the tooling properly rather than improvise them. Tangison builds that tooling for a living. The programme is the result of that overlap.",
      "The schedule, the syllabus and the enrolment route are not final, so none of them are printed here yet. A second announcement will follow when they are, and it will be as plain as this one.",
      "Enquiries go to the office: one email to info@oryxinstitute.org. Organizations that want the programme brought to their teams early can say so in the first message; the office keeps a list, and nothing else.",
    ],
  },
] as const;
