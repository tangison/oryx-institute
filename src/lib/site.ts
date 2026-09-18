/**
 * Oryx Politechnical Institute · content source of truth.
 * Every fact below is drawn from the brand assets supplied by the client
 * (logos, print kit, flyer, letterhead, business card, certificate).
 * Nothing here is invented: names, contacts and lines match the
 * approved source material exactly.
 */

export const site = {
  legalName: "Oryx Politechnical Institute",
  tradingName: "Oryx Politechnical Institute",
  shortName: "Oryx Institute",
  /** The wordmark, exactly as the logo renders it: three scripts. */
  wordmark: {
    top: "ORYX",
    chinese: "理工",
    chineseMeaning: "science and engineering",
    bottom: "INSTITUTE",
  },
  /** Approved flyer copy. */
  headline: "Looks harmless. Isn't.",
  /** Approved flyer line on graduates. */
  closingLine:
    "Oryx Institute graduates solve problems quietly and finish them decisively.",
  /** Approved certificate language. */
  credentialLine:
    "Excellence in innovation and applied problem-solving.",
  description:
    "Oryx Politechnical Institute in Windhoek, Namibia. A politechnical institute built on innovation and applied problem-solving. Applications open by enquiry.",
  city: "Windhoek",
  country: "Namibia",
  address: "P.O. Box 1662, Windhoek, Namibia",
  email: "tangi@oryxinstitute.org",
  phoneDisplay: "+264 81 341 1522",
  phoneHref: "+264813411522",
  whatsapp: "https://wa.me/264813411522",
  whatsappText:
    "Hello Oryx Institute, I would like to apply. My name is ",
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
    items: disciplines.map((d) => ({
      href: `/programmes#${d.id}`,
      name: d.name,
      desc: d.summary,
    })),
  },
  {
    label: "Institute",
    items: [
      { href: "/about", name: "About", desc: "The institute, the name and the Principal." },
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
    a: "Write to the Principal's office. Send one message on WhatsApp to +264 81 341 1522 or an email to tangi@oryxinstitute.org with your name, a contact for the reply, and your field of interest. The application starts with that message.",
  },
  {
    q: "What programmes does the institute offer?",
    a: "The education stands on four disciplines: science, engineering, technology and applied problem-solving. Programme and course offerings are confirmed by the Principal's office at the point of application, so the honest answer to anything more specific is: ask, in the application message.",
  },
  {
    q: "What does 理工 mean?",
    a: "Li gong: the Chinese characters for science and engineering. In the wordmark they stand exactly where the word Politechnical sits in the institute's full name, set in maroon beside ORYX.",
  },
  {
    q: "Where is the institute?",
    a: "In Windhoek, Namibia. The office answers by post at P.O. Box 1662, Windhoek, by telephone on +264 81 341 1522, and by email at tangi@oryxinstitute.org.",
  },
  {
    q: "Who leads the institute?",
    a: "Tangi Iigonda is the Principal. Applications are read in the Principal's office, and the business card carries no other name.",
  },
  {
    q: "Is there a certificate?",
    a: "Yes. The institute issues its Certificate of Achievement on completion, recognizing excellence in innovation and applied problem-solving. The certificate is signed by the Principal and dated by hand.",
  },
  {
    q: "Can I visit the campus?",
    a: "Arrange it in your first message. The office will confirm where and when to come; the institute's published address is a post box, so appointments are made before visits.",
  },
] as const;
