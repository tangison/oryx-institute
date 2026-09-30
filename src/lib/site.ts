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
  /** Approved flyer copy. */
  headline: "Looks harmless. Isn't.",
  /** Approved flyer line on graduates. */
  closingLine:
    "Oryx Institute graduates solve problems quietly and finish them decisively.",
  /** Approved certificate language. */
  credentialLine:
    "Excellence in innovation and applied problem-solving.",
  /** The approved tagline (strategy notes, decision 8): the inclusive
   * variant of the founder's original idiom. */
  tagline: "You're only as good as your tools. We forge them.",
  description:
    "Oryx Institute in Windhoek, Namibia. A polytechnic under development, built on innovation and applied problem-solving. Rapid Response Training and the Oryx Directory are live now; applications open by enquiry.",
  city: "Windhoek",
  country: "Namibia",
  address: "P.O. Box 1662, Windhoek, Namibia",
  /** The Principal's office address, exactly as the business card prints it. */
  email: "tangi@oryxinstitute.org",
  /** The general contact line, per the master package status note. */
  emailGeneral: "info@oryxinstitute.org",
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
    image: "/images/photo/specimen.jpg",
    imageAlt: "A rock specimen on a plinth, set in window light",
  },
  {
    id: "engineering",
    glyph: "工",
    name: "Engineering",
    summary:
      "The making core: work that holds, measured and finished to standard.",
    image: "/images/photo/roofline.jpg",
    imageAlt: "The roofline of a brick workshop building in iron sheeting",
  },
  {
    id: "technology",
    glyph: "TECH",
    name: "Technology",
    summary:
      "Modern tools taken apart and rebuilt until they are understood, not just used.",
    image: "/images/photo/stair-light.jpg",
    imageAlt: "Light falling down a concrete stairwell, a handrail crossing the frame",
  },
  {
    id: "applied",
    glyph: "SOLVE",
    name: "Applied problem-solving",
    summary:
      "The institute's own standard, named on every certificate: innovation in practice.",
    image: "/images/photo/lantern.jpg",
    imageAlt: "A brass lantern on concrete stairs",
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
    a: "Write to the Principal's office. Send one message on WhatsApp to +264 81 341 1522 or an email to tangi@oryxinstitute.org with your name, a contact for the reply, and your field of interest. The application starts with that message.",
  },
  {
    q: "What programmes does the institute offer?",
    a: "The education stands on four disciplines: science, engineering, technology and applied problem-solving. Programme and course offerings are confirmed by the Principal's office at the point of application, so the honest answer to anything more specific is: ask, in the application message.",
  },
  {
    q: "What does 理工 mean?",
    a: "Li gong: the Chinese characters for science and engineering. In the wordmark they stand exactly where the word Polytechnic sits in the institute's full legal name, set in maroon beside ORYX.",
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
  {
    q: "Is Oryx accredited?",
    a: "Not yet, and the institute says so plainly. Oryx is pursuing accreditation with the NQA and the NTA. What runs today is Rapid Response Training and the Oryx Directory, both of which work before accreditation matters. Nothing on this site claims a credential the institute does not hold.",
  },
  {
    q: "What is Rapid Response Training?",
    a: "A business needs a team trained on something new. Oryx sources the industry expert, structures the programme around that need, and delivers it. It is built for the gap between what a team knows and what it needs to know next. Enquire through the Principal's office.",
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
