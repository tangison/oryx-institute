/**
 * Oryx Institute · content source of truth, rebuild-hbr.
 *
 * Every fact is drawn from the approved master asset package and the
 * rebuild briefs: nothing here is invented. Names, contacts and status
 * match approved material; structural copy follows COPYWRITING-RULES.
 */

/**
 * The Oryx voice bar, applied to every line on the site. Declarative,
 * exact, unhurried: state the fact, cite the source, stop.
 */
export const voice = {
  register: "Declarative, exact, unhurried. State the fact; cite the source; stop.",
  rules: [
    "Approved public lines must stay factual, concise and current.",
    "Facts carry their source inline or they do not ship.",
    "No wisecracks, no self-annotation, no captions under images.",
    "Status is stated as it is: prelaunch, pre-accreditation, honest.",
  ],
} as const;

export const site = {
  /** The legal name, spelled per the master package documents. It is
   * used in legal notices, contracts and the footer only. */
  legalName: "Oryx Polytechnic Institute",
  /** The public-facing brand name, kept short per the business plan's
   * own recommendation. It carries the header, the titles and the day
   * to day copy. */
  tradingName: "Oryx Institute",
  shortName: "Oryx Institute",
  /** The supplied, immutable lockup places the 理工 visual mark between
   * ORYX and INSTITUTE. It represents science and engineering; it does
   * not add a Chinese-language public surface. */
  wordmark: {
    top: "ORYX",
    middle: "理工",
    middleMeaning: "science and engineering",
    bottom: "INSTITUTE",
  },
  /** The homepage hero, per the rebuild brief: the institute states
   * itself plainly, then says what it is made of. */
  headline: "Oryx Institute.",
  heroSub:
    "A new polytechnic for Namibia. Research, practice, and companies that prove the\u00A0work.",
  closingLine:
    "Good work begins with evidence and is finished with care.",
  credentialLine:
    "Research, practice and companies that prove the work.",
  /** Meta description, sized for search results (kept under 160
   * characters) and led by what the institute is. */
  description:
    "A new polytechnic for Namibia. Research, practice, and companies that prove the work.",
  /** Oryx publishes a postal address only. Future learning sites are not
   * presented as open campuses or public visiting locations. */
  city: "Windhoek",
  country: "Namibia",
  areaServed: "Namibia",
  legalLine:
    "Oryx Polytechnic Institute, also trading as Oryx Institute, Close Corporation CC/2026/12517",
  copyright: "© 2026 Oryx Polytechnic Institute. All rights reserved.",
  postalAddress: {
    postOfficeBox: "P.O. Box 1662",
    addressLocality: "Windhoek",
    addressCountry: "Namibia",
    line: "P.O. Box 1662, Windhoek, Namibia",
  },
  webAddress: "oryxinstitute.org",
  linksUrl: "https://www.oryxinstitute.org/links",
  plannedCentre:
    "Ongwediva is a future initiative. It is planned, not open, and is not presented as a public campus.",
  /** The one public mailbox. Enquiries, partnerships and press
     * correspondence start here unless a dedicated public channel is
     * published later. */
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
  /** Official regulatory information routes. These are information
   * sources only. They do not imply registration, accreditation,
   * endorsement or a partnership. */
  ntaRegistrationUrl: "https://www.nta.com.na/registration-tp/",
  nqaAccreditationUrl: "https://namqa.org/",
  tangisonUrl: "https://tangison.com/",
  /** A temporary Google Maps search route. It is deliberately not added
   * to sameAs while the new Business Profile is still absent from public
   * Maps results. Replace this with the verified profile Share link once
   * it is discoverable. */
  googleMapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Oryx%20Institute%2C%20Windhoek%2C%20Namibia",
  /** Social channels, icon-only links in the footer and on /contact.
   * Each opens in a new tab; nothing is embedded. */
  socials: [
    { label: "Instagram", href: "https://instagram.com/oryx_institute" },
    { label: "Facebook", href: "https://facebook.com/oryxinstitute" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/oryx-polytechnic-institute/",
    },
    { label: "X", href: "https://x.com/oryx_institute?s=11" },
    {
      label: "Threads",
      href: "https://www.threads.com/@oryx_institute?igshid=NTc4MTIwNjQ2YQ==",
    },
  ] as { label: string; href: string }[],
  /** The canonical serving domain. Vercel 308-redirects the apex to
   * www, so every canonical, hreflang, sitemap and OG URL names the
   * www host; otherwise crawlers see a site whose own map points at
   * a domain that never serves a page. */
  url: "https://www.oryxinstitute.org",
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

/** One reusable public-contact schema. Page-specific JSON-LD can attach
 * its own @id and locale, but names, channels, postal address and social
 * links always originate here. */
export const organizationContactSchema = {
  name: site.tradingName,
  legalName: site.legalName,
  email: site.email,
  telephone: site.phoneE164,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      contactType: "customer service",
      email: site.email,
    },
  ],
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: site.postalAddress.postOfficeBox,
    addressLocality: site.postalAddress.addressLocality,
    addressCountry: "NA",
  },
  sameAs: site.socials.map((channel) => channel.href),
} as const;

/** The ordered public hub. URLs live in this content source rather than
 * being repeated in the page, footer, menu or company material. Labels
 * may be localized by the surface that renders them. */
export const linkHub = {
  direct: [
    { id: "call", href: site.phoneHref },
    { id: "whatsapp", href: site.whatsappHref, external: true },
    { id: "email", href: `mailto:${site.email}` },
  ],
  enquiries: [{ id: "apply", href: "/apply" }],
  reading: [{ id: "research", href: "/research" }],
  institute: [
    { id: "practice", href: "/practice" },
    { id: "ventures", href: "/ventures" },
    { id: "corner-spa", href: "/corner-spa" },
    { id: "register", href: "/register" },
  ],
  googleMaps: [{ id: "google-maps", href: site.googleMapsSearchUrl, external: true }],
  utility: [
    { id: "about", href: "/about" },
    { id: "status", href: "/status" },
    { id: "contact", href: "/contact" },
    { id: "faq", href: "/faq" },
    { id: "privacy", href: "/legal/privacy" },
    { id: "terms", href: "/legal/terms" },
  ],
} as const;

/**
 * Where the institute stands, stated plainly. Every line is grounded in
 * the master package's own status note and strategy decisions. The site
 * never claims accreditation, a campus, or an intake date.
 */
export const status = {
  stage: "Prelaunch",
  accreditation:
    "Oryx is working toward NTA training-provider registration. It is not registered or accredited, and it does not offer accredited qualifications, NQF credits or a public campus.",
  liveNow: [
    {
      name: "Owner's Desk",
      line: "One-on-one business counselling. The outcome is written down.",
    },
    {
      name: "Market R&D",
      line: "Feasibility, sizing, competitor reads and route-to-market work, gathered on Namibian ground.",
    },
  ],
  inDevelopment: [],
  partnerships:
    "Oryx names working relationships only where the work is public. A named relationship is not accreditation, regulatory endorsement or a partnership with the NTA or NQA.",
} as const;

/**
 * What runs today: current commercial practice. It sits apart from future learning
 * pathways. Nothing here promises a credential; every line promises
 * only work that is available now.
 */
export const offers = [
  {
    id: "owners-desk",
    name: "Owner's Desk",
    tag: "Practice",
    line: "One-on-one business counselling. The outcome is written down.",
    cta: { label: "Enquire with the Oryx office", href: "/apply" },
    body: "Business counselling for Namibian owners at moments that need a clear decision: starting, registering, hiring, pricing, pivoting or closing cleanly. Scope is agreed through the Oryx office, and the outcome is written down.",
  },
  {
    id: "market-rd",
    name: "Market R&D",
    tag: "Research",
    line: "Feasibility, sizing, competitor reads and route-to-market work, gathered on Namibian ground.",
    cta: { label: "Enquire with the Oryx office", href: "/apply" },
    body: "Feasibility studies, market sizing, competitor reads and route-to-market work, gathered on Namibian ground and written to be used. Scope is confirmed for each engagement.",
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
    date: "2026-11-13",
    entry:
      "Public status updated: Oryx is working toward NTA training-provider registration. It is not registered or accredited.",
  },
  {
    date: "2026-10-25",
    entry:
      "Legal identity published: Oryx Polytechnic Institute, also trading as Oryx Institute, Close Corporation CC/2026/12517.",
  },
  { date: "2026-10-25", entry: "Website relaunched." },
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
      "The institute's working standard: innovation in practice.",
  },
] as const;

/** Approved lines used across the site, verbatim from the brand assets
 * and the copywriting rules. */
export const approvedLines = [
  { line: "Looks harmless. Isn't.", source: "Recruitment\u00A0flyer" },
  {
    line: "Good work begins with evidence and is finished with care.",
    source: "Oryx Institute",
  },
  {
    line: "Research, practice and companies that prove the work.",
    source: "Oryx Institute",
  },
  { line: "Quiet work, decisive finishes.", source: "Strategy\u00A0notes" },
  { line: "Decisions, not decks.", source: "The practice" },
  { line: "Evidence before money moves.", source: "Market R&D" },
  {
    line: "Every figure carries its source, or it does not ship.",
    source: "Research notes",
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
    note: "Identity, technology and learning-platform services under agreement.",
  },
  {
    id: "mendozer",
    name: "Mendozer",
    note: "Corner Spa operating relationship.",
  },
] as const;

/** Primary navigation: top bar and mobile list. The wordmark carries
 * Home; Enquire is the last item and takes the maroon button on
 * desktop. Every href must resolve; nothing dead ships in the nav,
 * anywhere. */
/* The brief's four links, plus the Enquire door. The register, the
   About and Brand stay in the menu slideover and the footer: the bar
   carries the four pillars, not the whole sitemap. */
export const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/practice", label: "Practice" },
  { href: "/ventures", label: "Ventures" },
  { href: "/status", label: "Status" },
  { href: "/apply", label: "Enquire" },
] as const;

/** Footer navigation: the same links, plain text on ink ground, plus
 * the office pages and the legal pair. Socials and the mailto render
 * beside this list from site.socials and site.email. */
export const footerNav = [
  { href: "/research", label: "Research" },
  { href: "/practice", label: "Practice" },
  { href: "/ventures", label: "Ventures" },
  { href: "/corner-spa", label: "Corner Spa" },
  { href: "/register", label: "The Register" },
  { href: "/about", label: "About" },
  { href: "/status", label: "Status" },
  { href: "/brand", label: "Brand" },
  { href: "/apply", label: "Enquire" },
  { href: "/links", label: "Links" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
] as const;

/** FAQ entries: every answer is grounded in the institute's published
 * contacts and print kit. Nothing promises what is not printed. */
export const faqs = [
  {
    q: "What work is available now?",
    a: "Oryx currently takes on business counselling through the Owner's Desk and market research and development engagements. Scope and fees are confirmed by the Oryx office for each enquiry.",
  },
  {
    q: "When will accredited learning begin?",
    a: "Oryx is working toward NTA training-provider registration. It is not registered or accredited, and it does not offer accredited qualifications or NQF credits. Future learning pathways will be published only after the relevant approvals are formally confirmed.",
  },
  {
    q: "How do I enquire?",
    a: "Write to info@oryxinstitute.org with your name, a contact for the reply and the work or future learning area you want to discuss. The Oryx office will state what is currently available.",
  },
  {
    q: "What does Polytechnic mean?",
    a: "A polytechnic institute connects science, engineering and technology with applied problem-solving. Oryx is building toward that institutional model, while stating its current status plainly.",
  },
  {
    q: "Where is the institute?",
    a: "Oryx is based in Namibia and publishes a postal address only: P.O. Box 1662, Windhoek, Namibia. No physical address, public visiting instructions or opening hours are published.",
  },
  {
    q: "Is Oryx accredited?",
    a: "No. Oryx is working toward NTA training-provider registration. It is not registered with the NTA and it is not accredited by the NQA. It does not claim accredited programmes, NQF credits or a public campus.",
  },
  {
    q: "Can I visit the office?",
    a: "No public visiting address or visiting instructions are published. Use the approved public contact routes for an enquiry.",
  },
  {
    q: "Can I read the research?",
    a: "Yes. Oryx publishes research notes on this site. Each note belongs with the research programme and is available without an account.",
  },
  {
    q: "Does Oryx work with partners?",
    a: "Oryx names working relationships only where the work is public. Tangison Technologies provides identity, technology and learning-platform services. Corner Spa operates with Mendozer Investments. Neither relationship is an accreditation or regulatory endorsement.",
  },
  {
    q: "What is a venture?",
    a: "A venture is an operating company Oryx uses to understand a sector through real service and real customers. Each venture is stated plainly as a concept or operating work, as it is.",
  },
  {
    q: "What is Corner Spa?",
    a: "Corner Spa is Oryx's first operating venture, run with Mendozer Investments in Windhoek. Booking and service details remain on the spa's own site.",
  },
] as const;
