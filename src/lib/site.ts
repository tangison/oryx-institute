/**
 * Oryx Institute · content source of truth, rebuild-hbr.
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
  /** The wordmark is intentionally English-only: ORYX INSTITUTE. */
  wordmark: {
    top: "ORYX",
    middle: "POLYTECHNIC",
    middleMeaning: "science and engineering",
    bottom: "INSTITUTE",
  },
  /** The homepage hero, per the rebuild brief: the institute states
   * itself plainly, then says what it is made of. */
  headline: "Oryx Institute.",
  heroSub:
    "A new polytechnic for Namibia. Research, practice, and companies that prove the\u00A0work.",
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
  /** The office remains in Windhoek. The first dedicated training centre
   * has a secured future site, but it is not open and has no public
   * street address on this site. */
  city: "Windhoek",
  country: "Namibia",
  areaServed: "Windhoek, Namibia",
  plannedCentre:
    "Oryx has secured its first dedicated training-centre site at Untag Guest House in Ongwediva. The centre is planned and is not open yet.",
  /** The one mailbox. Everything runs through it while the institute
   * is young: applications, partnerships, the press. */
  email: "info@oryxinstitute.org",
  /** The institute's own line. Local format for Namibian readers,
   * international format for structured data and machine readers. The
   * \u00A0 no-break spaces keep the number on one line everywhere it
   * renders. The tel and WhatsApp links use the E.164 form: the leading
   * 0 drops when the +264 country code is added. Defined once; the
   * footer, contact page, menu, FAQ and structured data read it. */
  phoneDisplay: "083\u00A0676\u00A04338",
  phoneInternational: "+264\u00A083\u00A0676\u00A04338",
  phoneE164: "+264836764338",
  phoneHref: "tel:+264836764338",
  whatsappHref: "https://wa.me/264836764338",
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
  /** The canonical serving domain. Vercel 308-redirects the apex to
   * www, so every canonical, hreflang, sitemap and OG URL names the
   * www host; otherwise crawlers see a site whose own map points at
   * a domain that never serves a page. */
  url: "https://www.oryxinstitute.org",
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
      line: "Crash & short courses in records, filings,\u00A0registers.",
    },
    {
      name: "IT & Related Fields",
      line: "Crash & short courses in the systems work runs on. Every tool named.",
    },
    {
      name: "Market R&D",
      line: "Feasibility, sizing, competitor reads, route-to-market, gathered on Namibian\u00A0ground.",
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
      line: "Built with Tangison Technologies, announced 18 October 2026. In development now; the curriculum is being written and a flagship product is under\u00A0construction.",
    },
    {
      name: "Skills Camp (Karibib VTC)",
      line: "The physical vocational training centre is in research and development, on its own\u00A0roadmap.",
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
 * What runs today: the six offers, per the homepage "WHAT RUNS TODAY"
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
    cta: { label: "Book the Owner's Desk", href: "/apply/owners-desk" },
    body: "Owner-level counselling for Namibian businesses at the moments that cost the most: starting, registering, hiring, pricing, pivoting or closing cleanly. Sessions run from the Principal's office or by email, and the outcome is written down: what was decided, and what happens\u00A0next.",
  },
  {
    id: "business-administration",
    name: "Business Administration",
    tag: "Teaching",
    line: "Crash & short courses in records, filings,\u00A0registers.",
    cta: { label: "Enquire about Business Administration", href: "/apply/business-administration" },
    body: "The department teaches the running of a business: records, filings, registers and the everyday processes behind it. Crash and short courses only, each course narrow, practical, and\u00A0finished.",
  },
  {
    id: "it",
    name: "IT & Related Fields",
    tag: "Teaching",
    line: "Crash & short courses in the systems work runs on. Every tool named.",
    cta: { label: "Enquire about Information Technology", href: "/apply/it" },
    body: "The department teaches the systems and software a business runs on, from first principles to confident use. Crash and short courses only, and every tool is named.",
  },
  {
    id: "market-rd",
    name: "Market R&D",
    tag: "Research",
    line: "Feasibility, sizing, competitor reads, route-to-market, gathered on Namibian\u00A0ground.",
    cta: { label: "Engage Market Research & Development", href: "/apply/market-rd" },
    body: "Feasibility studies, market sizing, competitor reads and route-to-market plans, gathered on Namibian ground and written to be used. The institute's own filings taught the method; the same rigor is for hire.",
  },
  {
    id: "rapid-response",
    name: "Rapid Response Training",
    tag: "Practice",
    line: "Sourced experts, structured programmes, delivered to standard.",
    cta: { label: "Brief us on Rapid Response Training", href: "/apply/rapid-response" },
    body: "When a business needs a team trained on something new, Oryx sources the industry expert, structures the programme around that need, and delivers it. Built for the gap between what a team knows and what it needs to know\u00A0next.",
  },
  {
    id: "directory",
    name: "The Oryx Directory",
    tag: "Free",
    line: "Free Namibia-specific crash courses and business templates.",
    cta: { label: "Open the Oryx Directory", href: "/resources" },
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
  {
    date: "2026-11-01",
    entry:
      "Safety officer training programme announced. Curriculum published; lead instructor and first cohort dates to be confirmed before enrolments open.",
  },
  {
    date: "2026-10-25",
    entry:
      "BIPA registration confirmed, Oryx Polytechnic Institute. Registration number and certificate will be published within 14 days of collection from BIPA.",
  },
  { date: "2026-10-25", entry: "Website relaunched." },
  { date: "2026-10-18", entry: "AI training programme announced with Tangison\u00A0Technologies." },
  {
    date: "2026-11-13",
    entry:
      "The Oryx Directory source review and Wave 1 published: seven Namibia-specific crash courses and seven business templates, with checkable source links on legal and regulatory pages.",
  },
] as const;

  /**
 * Ventures. A venture is a small operating company the institute opens
 * to test a sector: a live classroom and a live lab. Only what is real
 * is listed, with its current operating status stated plainly.
 */
export const ventures = {
  lead: "Small companies, real customers.",
  body: "When Oryx wants to understand a sector, it opens a small company inside it. The customers decide whether it works, and the register publishes the\u00A0result.",
  cornerSpa: {
    name: "Corner Spa",
    status: "Operating · with Mendozer",
    line: "Wellness and service operations: the first live\u00A0lab.",
    body: "Corner Spa is Oryx's first operating venture, run in collaboration with Mendozer Investments. It is a live setting for practical business and service work in Windhoek. The spa's own counter lives on Mendozer's platform at spa.mendozer.com and is embedded on this site. Its booking and service details are kept on the spa's own site.",
  },
  futureLine:
    "The next venture is not named yet. When one opens, the opening enters the register with its date.",
} as const;

/**
 * The four disciplines of a polytechnic education, framed from the
 * institute's approved language. No programme names, dates or fees are
 * invented: each card routes to enquiry.
 */
export const disciplines = [
  {
    id: "science",
    glyph: "SCI",
    name: "Science",
    summary:
      "The reasoning core of a polytechnic education: observation, evidence and disciplined thought.",
  },
  {
    id: "engineering",
    glyph: "ENG",
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
  { line: "Looks harmless. Isn't.", source: "Recruitment\u00A0flyer" },
  {
    line:
      "Oryx Institute graduates solve problems quietly and finish them decisively.",
    source: "Recruitment\u00A0flyer",
  },
  {
    line: "Excellence in innovation and applied problem-solving.",
    source: "Certificate\u00A0of\u00A0Attendance",
  },
  { line: "Quiet work, decisive finishes.", source: "Strategy\u00A0notes" },
  { line: "Decisions, not decks.", source: "The practice" },
  { line: "Evidence before money moves.", source: "Market R&D" },
  {
    line: "Every figure carries its source, or it does not ship.",
    source: "The Bulletin",
  },
  { line: "What is not ready, says so.", source: "The\u00A0register" },
  { line: "Say the thing. Stop.", source: "The\u00A0voice" },
  { line: "Quiet is a register, not a volume.", source: "The\u00A0voice" },
  {
    line: "Never claim what the print kit does not print.",
    source: "The brand",
  },
] as const;

/**
 * The partners the institute names in public. The credit is text only:
 * no partner marks are carried on the site (the colophon states the
 * Tangison relationship in prose, per CONTENT-CORRECTIONS §5), and the
 * institute does not link out to partner sites from its own pages.
 */
export const partners = [
  {
    id: "tangison",
    name: "Tangison Technologies",
    note: "The AI training programme and the flagship product, built together.",
  },
  {
    id: "mendozer",
    name: "Mendozer",
    note: "Building Corner Spa and the ventures beyond it, together.",
  },
] as const;

/** Primary navigation: top bar and mobile list. The wordmark carries
 * Home; Apply is the last item and takes the maroon button on
 * desktop. Every href must resolve; nothing dead ships in the nav,
 * anywhere. */
/* The brief's four links, plus the Apply door. The register, the
   Bulletin, About and Brand stay in the menu slideover and the footer:
   the bar carries the four pillars, not the whole sitemap. */
export const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/practice", label: "Practice" },
  { href: "/ventures", label: "Ventures" },
  { href: "/resources", label: "The Directory" },
  { href: "/apply", label: "Apply" },
] as const;

/** Footer navigation: the same links, plain text on ink ground, plus
 * the office pages and the legal pair. Socials and the mailto render
 * beside this list from site.socials and site.email. */
export const footerNav = [
  { href: "/research", label: "Research" },
  { href: "/practice", label: "Practice" },
  { href: "/ventures", label: "Ventures" },
  { href: "/corner-spa", label: "Corner Spa" },
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
    q: "When does the safety officer course start?",
    a: "Curriculum and pricing will be published on 15 November 2026. Cohort 1 is planned for January 2027. Register your interest via the application form selecting 'Safety training' and we will contact you the moment enrolments open.",
  },
  {
    q: "When will accredited programmes start?",
    a: "The Practice engine currently offers fee-for-service business counselling, market research, and corporate Rapid Response Training under commercial services agreements. Formal vocational training programmes, including the National Occupational Standards in Business Administration, will commence only after NTA provider registration has been granted. NQA accreditation for registered qualifications is being pursued in parallel and will be announced on the public register.",
  },
  {
    q: "How do I apply?",
    a: "Write to the office. Send one email to info@oryxinstitute.org with your name, a contact for the reply, and your field of interest. The application starts with that message.",
  },
  {
    q: "What programmes does the institute offer?",
    a: "Crash courses and short courses, in two departments: business administration, and IT and related fields. That is the teaching offer today, and all of it: no long programmes are offered. Beside the teaching, the practice runs: the Owner's Desk for one-on-one counselling, market research and development, and Rapid Response Training. The schools phase in as accreditation progresses. Courses are confirmed by the Principal's office at the point of application, so the honest answer to anything more specific is: ask, in the application\u00A0message.",
  },
  {
    q: "Does Oryx consult for businesses?",
    a: "Yes, and it is the institute's live practice. The Owner's Desk runs one-on-one counselling from the Principal's office, and market research and development work (feasibility, sizing, route-to-market) is taken on per engagement. Write to the office with the problem as it stands; the first reply names what the institute can and cannot do for you.",
  },
  {
    q: "What does Polytechnic mean?",
    a: "A polytechnic institute teaches the made world: the sciences that explain it, the engineering that builds it, and the technology that runs it. At Oryx, applied problem-solving is the shared standard.",
  },
  {
    q: "Where is the institute?",
    a: "The institute works from Windhoek, Namibia. It is being established and does not operate public premises yet, so no street address or post box is printed. The office answers every enquiry by email at info@oryxinstitute.org, or by phone or WhatsApp on 083\u00A0676\u00A04338, and visits are arranged by appointment.",
  },
  {
    q: "Who leads the institute?",
    a: "Tangi Iigonda is the Principal. Applications are read in the Principal's office.",
  },
  {
    q: "Is there a certificate?",
    a: "Oryx issues two kinds of document after a course. The Certificate of Attendance is an internal record of completion for every short course or workshop, signed by the Principal; it is not an NQF-credit-bearing qualification and cannot be submitted to NQA as accredited prior learning; it is a record that you completed an Oryx course. The NQF-registered qualification certificate is issued only after Oryx receives NQA accreditation for the relevant qualification; those will carry NQA recognition and credit value, and that is what we are working toward.",
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
    a: "The institute's free resource library: Namibia-specific crash courses and business templates, copyrighted to Oryx Polytechnic Institute and free to access. It is published proof of the institute's standard, available before any fee is discussed. Start with the seven crash courses or help yourself to the seven templates; legal and regulatory pages link to their checkable sources.",
  },
  {
    q: "What does the research and development practice cover?",
    a: "Two sides of the same desk. For clients: feasibility studies, market sizing, competitor reads and route-to-market plans, gathered on Namibian ground. For the institute itself: the AI training programme now being built with Tangison Technologies, the flagship product under construction on it, and the Skills Camp concept. The research page names what is live and what is in development.",
  },
  {
    q: "Does Oryx work with partners?",
    a: "Openly, and by name. The AI training programme runs with Tangison Technologies, and Corner Spa is run with Mendozer Investments. Beyond the named collaborations, the institute is open to partnerships with organizations pursuing similar goals: training bodies, accreditation partners, corporate sponsors, and complementary businesses. Write to the office and say what you have in mind.",
  },
  {
    q: "What is a venture?",
    a: "A small operating company the institute opens inside a sector it wants to understand. The venture doubles as a live classroom: practical business and service work happens on its floor, and its customers decide whether it works. Each venture is stated plainly as a concept or operating work, as it is.",
  },
  {
    q: "What is Corner Spa?",
    a: "Oryx's first operating venture, run with Mendozer Investments. It is a live setting for practical business and service work in Windhoek. Booking and service details stay on the spa's own site.",
  },
  {
    q: "Can I read the research?",
    a: "Yes, and it is free. The Oryx Bulletin, the institute's essay series on Namibia's working realities with every figure carrying its source, is published in full on this site, no fee and no account. The Oryx Directory carries the free crash courses and templates beside it.",
  },
] as const;
