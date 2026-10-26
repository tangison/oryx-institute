/**
 * Oryx Institute · content source of truth — rebuild-hbr.
 *
 * Every fact is drawn from the approved master asset package and the
 * rebuild briefs: nothing here is invented. Names, contacts, status and
 * the founder's approved lines match the approved material exactly; the
 * structural copy (eyebrows, CTAs, captions) follows COPYWRITING-RULES.
 */

/**
 * The Oryx voice bar, applied to every line on the site. Declarative,
 * exact, unhurried: state the fact, cite the source, stop.
 */
export const voice = {
  register: "Declarative, exact, unhurried. State the fact; cite the source; stop.",
  rules: [
    "Approved lines run verbatim: Looks harmless. Isn't. / graduates solve problems quietly and finish them decisively. / excellence in innovation and applied problem-solving.",
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
  /** The homepage hero, per the rebuild brief: the institute states
   * itself plainly, then says what it is made of. */
  headline: "Oryx Institute.",
  heroSub:
    "A new polytechnic for Namibia. Research, practice, and companies that prove the work.",
  /** Approved flyer line on graduates. */
  closingLine:
    "Oryx Institute graduates solve problems quietly and finish them decisively.",
  /** Approved certificate language. */
  credentialLine:
    "Excellence in innovation and applied problem-solving.",
  /** Meta description, sized for search results (kept under 160
   * characters) and led by what the institute is. */
  description:
    "Oryx Institute, Windhoek: a new polytechnic for Namibia. Crash and short courses, counselling, market R&D, and the ventures that prove the work.",
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
  /** Social channels, icon-only links in the footer and on /contact.
   * Each opens in a new tab; nothing is embedded. */
  socials: [
    { label: "Instagram", href: "https://instagram.com/oryx_institute" },
    { label: "Facebook", href: "https://facebook.com/oryxinstitute" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/oryx-polytechnic-institute/",
    },
  ] as { label: string; href: string }[],
  url: "https://oryxinstitute.org",
  principal: {
    name: "Tangi Iigonda",
    role: "Principal",
  },
  /** Exact brand codes from the logo artwork, plus the register's two
   * supporting anchors (terracotta belongs to imagery and colour bands
   * only; sand belongs to the Corner Spa section). */
  colors: {
    ink: "#181713",
    maroon: "#71111F",
    cream: "#F4EEE4",
    ivory: "#FFF8EE",
    white: "#FFFFFF",
    terracotta: "#B5533A",
    sand: "#D8C6A8",
  },
} as const;

/** Canonical schema node IDs, shared by every JSON-LD block on the
 * site so the Organization and the WebSite are ONE entity each, not
 * re-declared per page. */
export const schemaIds = {
  org: `${site.url}/#organization`,
  website: `${site.url}/#website`,
} as const;

/**
 * Where the institute stands, stated plainly. Every line is grounded in
 * the master package's own status note and strategy decisions. The site
 * never claims accreditation, a campus, or an intake date.
 */
export const status = {
  stage: "Prelaunch",
  accreditation:
    "Oryx is pursuing accreditation with the NQA and the NTA. It is not accredited yet.",
  liveNow: [
    {
      name: "Owner's Desk",
      line: "One-on-one business counselling. The outcome is written down.",
    },
    {
      name: "Business Administration",
      line: "Crash & short courses in records, filings, registers.",
    },
    {
      name: "IT & Related Fields",
      line: "Crash & short courses in the systems work runs on. Every tool named.",
    },
    {
      name: "Market R&D",
      line: "Feasibility, sizing, competitor reads, route-to-market, gathered on Namibian ground.",
    },
    {
      name: "Rapid Response Training",
      line: "Sourced experts, structured programmes, delivered to standard.",
    },
    {
      name: "The Oryx Directory",
      line: "Free Namibia-specific crash courses and business templates.",
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
    note: "The staff are called Smiths, formally Masters, after the founder's rule: we forge our own tools.",
  },
} as const;

/**
 * What runs today — the six offers, per the homepage "WHAT RUNS TODAY"
 * screen. Two teaching departments (crash and short courses only) beside
 * the practice and the free Directory. Nothing here promises a
 * credential; every line promises work.
 */
export const offers = [
  {
    id: "owners-desk",
    name: "Owner's Desk",
    tag: "Practice",
    line: "One-on-one business counselling. The outcome is written down.",
    cta: { label: "Book", href: "/apply?for=owners-desk" },
    body: "Owner-level counselling for Namibian businesses at the moments that cost the most: starting, registering, hiring, pricing, pivoting or closing cleanly. Sessions run from the Principal's office or by email, and the outcome is written down: what was decided, and what happens next.",
  },
  {
    id: "business-administration",
    name: "Business Administration",
    tag: "Teaching",
    line: "Crash & short courses in records, filings, registers.",
    cta: { label: "Enquire", href: "/apply?for=business-administration" },
    body: "The department teaches the running of a business: records, filings, registers and the everyday processes behind it. Crash and short courses only, each course narrow, practical, and finished.",
  },
  {
    id: "it",
    name: "IT & Related Fields",
    tag: "Teaching",
    line: "Crash & short courses in the systems work runs on. Every tool named.",
    cta: { label: "Enquire", href: "/apply?for=it" },
    body: "The department teaches the systems and software a business runs on, from first principles to confident use. Crash and short courses only, and every tool is named.",
  },
  {
    id: "market-rd",
    name: "Market R&D",
    tag: "Research",
    line: "Feasibility, sizing, competitor reads, route-to-market, gathered on Namibian ground.",
    cta: { label: "Engage", href: "/apply?for=market-rd" },
    body: "Feasibility studies, market sizing, competitor reads and route-to-market plans, gathered on Namibian ground and written to be used. The institute's own filings taught the method; the same rigor is for hire.",
  },
  {
    id: "rapid-response",
    name: "Rapid Response Training",
    tag: "Practice",
    line: "Sourced experts, structured programmes, delivered to standard.",
    cta: { label: "Brief us", href: "/apply?for=rapid-response" },
    body: "When a business needs a team trained on something new, Oryx sources the industry expert, structures the programme around that need, and delivers it. Built for the gap between what a team knows and what it needs to know next.",
  },
  {
    id: "directory",
    name: "The Oryx Directory",
    tag: "Free",
    line: "Free Namibia-specific crash courses and business templates.",
    cta: { label: "Take it", href: "/resources" },
    body: "Namibia-specific crash courses and business templates, copyrighted to the institute and free to access. Published proof of how the institute writes, sources and teaches, available before any fee is discussed.",
  },
] as const;

/**
 * The register: what the institute has made public, dated as it was
 * said, newest first. Rows with a null date print "Date to be
 * confirmed". Nothing is announced before it is certain, and nothing
 * here names a partner before that partner has agreed to be named.
 */
export const register = [
  { date: "2026-10-25", entry: "BIPA registration confirmed, Oryx Polytechnic Institute." },
  { date: "2026-10-25", entry: "Website relaunched." },
  { date: "2026-10-18", entry: "AI training programme announced with Tangison Technologies." },
  /* TODO founder: Directory publication date */
  { date: null, entry: "The Oryx Directory published: four crash courses, seven business templates." },
  /* TODO founder: Corner Spa announcement date */
  { date: null, entry: "Corner Spa concept announced." },
] as const;

/**
 * Ventures. A venture is a small operating company the institute opens
 * to test a sector — a live classroom and a live lab. Only what is real
 * is listed; the concept stage is stated as a concept.
 */
export const ventures = {
  lead: "Small companies, real customers.",
  body: "When Oryx wants to understand a sector, it opens a small company inside it. The customers decide whether it works, and the register publishes the result.",
  cornerSpa: {
    name: "Corner Spa",
    status: "Concept",
    line: "Wellness and service operations: the first live lab.",
    body: "Corner Spa is the institute's first venture: a small wellness and service operation, announced as a concept and opened as a business. Its purpose is twofold: a real service running for real customers in Windhoek, and a live classroom where business administration, service standards and front-of-house operations are taught on the floor of the business itself. The concept is in development: premises, licensing and the service menu are being worked through in order. When it opens, the opening enters the register on this site, dated. Until then, it is a concept.",
  },
  futureLine:
    "The next venture is not named yet. When one opens, the opening enters the register with its date.",
} as const;

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

/** Approved lines used across the site, verbatim from the brand assets
 * and the copywriting rules. */
export const approvedLines = [
  { line: "Looks harmless. Isn't.", source: "Recruitment flyer" },
  {
    line:
      "Oryx Institute graduates solve problems quietly and finish them decisively.",
    source: "Recruitment flyer",
  },
  {
    line: "Excellence in innovation and applied problem-solving.",
    source: "Certificate of Achievement",
  },
  { line: "Quiet work, decisive finishes.", source: "Strategy notes" },
  { line: "Decisions, not decks.", source: "The practice" },
  { line: "Evidence before money moves.", source: "Market R&D" },
  {
    line: "Every figure carries its source, or it does not ship.",
    source: "The Bulletin",
  },
  { line: "What is not ready, says so.", source: "The register" },
  { line: "Say the thing. Stop.", source: "The voice" },
  { line: "Quiet is a register, not a volume.", source: "The voice" },
  {
    line: "Never claim what the print kit does not print.",
    source: "The brand",
  },
] as const;

/**
 * The partners the institute names in public. Logos are carried
 * byte-exact from each partner's own site (see public/partners/);
 * nothing was recoloured or redrawn. The marks stand as content on
 * the research page: the institute does not link out to partner
 * sites from its own pages.
 */
export const partners = [
  {
    id: "tangison",
    name: "Tangison Technologies",
    logo: "/partners/tangison-logo.svg",
    alt: "Tangison Technologies",
    note: "The AI training programme and the flagship product, built together.",
    /** The mark is drawn in currentColor; it takes the page's ink. */
    tone: "ink" as const,
  },
  {
    id: "mendozer",
    name: "Mendozer",
    logo: "/partners/mendozer-logo.svg",
    alt: "Mendozer",
    note: "Building Corner Spa and the ventures beyond it, together.",
    /** The mark carries its own gradient; it stands unaltered. */
    tone: "self" as const,
  },
] as const;

/** Primary navigation: top bar and mobile list. The wordmark carries
 * Home; Apply is the last item and takes the maroon button on
 * desktop. Every href must resolve; nothing dead ships in the nav,
 * anywhere. */
export const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/practice", label: "Practice" },
  { href: "/ventures", label: "Ventures" },
  { href: "/resources", label: "The Directory" },
  { href: "/resources#bulletin", label: "Bulletin" },
  { href: "/register", label: "The Register" },
  { href: "/about", label: "About" },
  { href: "/brand", label: "Brand" },
  { href: "/apply", label: "Apply" },
] as const;

/** Footer navigation: the same links, plain text on ink ground, plus
 * the office pages and the legal pair. Socials and the mailto render
 * beside this list from site.socials and site.email. */
export const footerNav = [
  { href: "/research", label: "Research" },
  { href: "/practice", label: "Practice" },
  { href: "/ventures", label: "Ventures" },
  { href: "/resources", label: "The Directory" },
  { href: "/resources#bulletin", label: "Bulletin" },
  { href: "/register", label: "The Register" },
  { href: "/about", label: "About" },
  { href: "/brand", label: "Brand" },
  { href: "/apply", label: "Apply" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
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
    a: "Crash courses and short courses, in two departments: business administration, and IT and related fields. That is the teaching offer today, and all of it: no long programmes are offered. Beside the teaching, the practice runs: the Owner's Desk for one-on-one counselling, market research and development, and Rapid Response Training. The schools phase in as accreditation progresses. Courses are confirmed by the Principal's office at the point of application, so the honest answer to anything more specific is: ask, in the application message.",
  },
  {
    q: "Does Oryx consult for businesses?",
    a: "Yes, and it is the institute's live practice. The Owner's Desk runs one-on-one counselling from the Principal's office, and market research and development work (feasibility, sizing, route-to-market) is taken on per engagement. Write to the office with the problem as it stands; the first reply names what the institute can and cannot do for you.",
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
    a: "Not yet. Oryx is pursuing accreditation with the NQA and the NTA. What runs today (the crash and short courses, Rapid Response Training and the Oryx Directory) works before accreditation matters. Nothing on this site claims a credential the institute does not hold.",
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
    q: "What does the research and development practice cover?",
    a: "Two sides of the same desk. For clients: feasibility studies, market sizing, competitor reads and route-to-market plans, gathered on Namibian ground. For the institute itself: the AI training programme now being built with Tangison Technologies, the flagship product under construction on it, and the Skills Camp concept. The research page names what is live and what is in development.",
  },
  {
    q: "Does Oryx work with partners?",
    a: "Openly, and by name. The AI training programme runs with Tangison Technologies, and concept work runs with Mendozer. Beyond the named collaborations, the institute is open to partnerships with organizations pursuing similar goals: training bodies, accreditation partners, corporate sponsors, and complementary businesses. Write to the office and say what you have in mind.",
  },
  {
    q: "What is a venture?",
    a: "A small operating company the institute opens inside a sector it wants to understand. The venture doubles as a live classroom: students learn on its floor, and its customers decide whether it works. Ventures are announced as concepts and entered in the register when they open.",
  },
  {
    q: "What is Corner Spa?",
    a: "The institute's first venture, announced as a concept: a small wellness and service operation in Windhoek, built to teach business administration, service standards and front-of-house operations on a real floor. Premises, licensing and the service menu are being worked through in order. When it opens, the opening enters the register, dated.",
  },
  {
    q: "Can I read the research?",
    a: "Yes, and it is free. The Oryx Bulletin, the institute's essay series on Namibia's working realities with every figure carrying its source, is published in full on this site, no fee and no account. The Oryx Directory carries the free crash courses and templates beside it.",
  },
] as const;
