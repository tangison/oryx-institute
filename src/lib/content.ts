/**
 * Oryx Institute · extended content.
 * Facts policy: every number carries its source inline. Nothing about
 * programmes, dates, fees, facilities or accreditation is asserted
 * beyond what the print kit and the Principal's office have published.
 * The images are the master package's own curated photographs. The
 * photographs stand on their own: no captions, no claims that a
 * picture is a photograph of the institute.
 */

/** The founder's rule, kept as the tagline's origin, one line. */
export const motto = {
  line: "You're only as good as your tools. We forge them.",
  source: "The Oryx tagline",
  origin:
    "The tagline keeps the founder's rule and widens the door: the brain is the biggest tool, and the institute trains the people who use it.",
} as const;

/** The four schools, phased. Dates are confirmed by the Principal's
 * office at the point of application, never printed in advance. The
 * school cards carry no photographs: there is no campus to photograph
 * yet, and the institute does not borrow one. */
export const schools = [
  {
    id: "technology",
    phase: "School I",
    name: "School of Technology",
    status: "Open for enquiry",
    lead: "The AI-native flagship. First in, because it needs the least: a bench, a meter, a machine that thinks with you.",
    body: "Technology is where the institute starts. The discipline covers the modern tool chain from the inside: how computing systems are taken apart, understood and rebuilt, and how to put AI tools to work without surrendering judgement to them. The study companion runs on the same stack the institute runs on, so students learn on the real thing from the first day.",
  },
  {
    id: "engineering",
    phase: "School II",
    name: "School of Engineering",
    status: "Coming soon",
    lead: "The making core: work that holds, measured and finished to standard.",
    body: "Engineering follows, because it is the most demanding to stand up properly: machine shops, measurement, the discipline of tolerances. The institute will not open a workshop it cannot staff with people who have cut metal for a living. When the school opens its doors, the certificate standard is already written: excellence in innovation and applied problem-solving.",
  },
  {
    id: "science",
    phase: "School III",
    name: "School of Science",
    status: "Coming soon",
    lead: "The reasoning core: observation, evidence and disciplined thought.",
    body: "Science is the long game. The laboratory takes time to build, and the institute will not present borrowed laboratories as its own. The school arrives when the benches are real, and it arrives with the same spine every other school carries: evidence first, decoration never, and a venture in every cohort.",
  },
] as const;

/** Applied problem-solving is not a school; it is the spine that runs
 * through all of them, and it is named on every certificate. */
export const appliedSpine = {
  name: "Applied problem-solving",
  line: "Not a school. The spine that runs through all three, and the standard named on every certificate.",
} as const;

/** The Oryx Tools List: what the institute actually runs on, published
 * openly. Three registers: the office stack, the learner's tool spine,
 * and the AI stack. Nothing listed is claimed as a campus facility. */
export const toolsList = [
  {
    register: "The office stack",
    intro: "How the institute itself runs, in the open. If it is on this list, it is really in use.",
    items: [
      {
        name: "One mailbox",
        what: "info@oryxinstitute.org, read in the Principal's office. It is the front desk: applications, questions and appointments all start there.",
      },
      {
        name: "The print kit",
        what: "Letterhead, certificate, business card. The institute's paper register, carried through every page of this site.",
      },
    ],
  },
  {
    register: "The learner's tool spine",
    intro: "The disciplined basics every course assumes, arranged per cohort where the course needs them.",
    items: [
      {
        name: "The brain",
        what: "The biggest tool, per the founder's rule. Everything else on this page is downstream of it.",
      },
      {
        name: "Pencil, ruler, compass",
        what: "Drafting by hand before drafting by machine. It is where the standard of finishing starts.",
      },
      {
        name: "Meter, iron, bench",
        what: "Measure, solder, make. Workshop access is arranged per cohort and stated plainly before enrolment, never implied by pictures.",
      },
      {
        name: "The notebook",
        what: "Every course keeps a written record. Graduates leave with their own evidence trail, in their own hand.",
      },
    ],
  },
  {
    register: "The AI stack",
    intro: "The institute is AI-native, and every tool is named.",
    items: [
      {
        name: "The AI study companion",
        what: "An AI-backed tutor that runs on the institute's own stack: practice questions, worked examples, patient repetition, in plain language. The model behind it is named in the course packs, not on a web page.",
      },
      {
        name: "Practice banks, generated per course",
        what: "Quiz sets and exercises produced from each course's own materials, checked by the teaching staff before they reach a student.",
      },
      {
        name: "Offline-first study packs",
        what: "Course packs that keep working when the connection does not. Windhoek taught the institute that lesson before the AI did.",
      },
    ],
  },
] as const;

/** The Oryx Bulletin: the institute's insights, written to be read.
 * Every figure carries its source. No fabricated statistics. */
export const insights = [
  {
    id: "what-a-polytechnic-is",
    no: "Bulletin No. 1",
    title: "What a polytechnic is, and what ours is for",
    date: "2026",
    dek: "The word is old, the characters are older, and the idea is exactly right for Windhoek.",
    body: [
      "A polytechnic institute teaches the made world: the sciences that explain it, the engineering that builds it, the technology that runs it. The word carries a Greek root, poli meaning many, techne meaning craft. Many crafts, one discipline. In the Oryx wordmark the idea stands in Chinese, 理工, li gong, science and engineering, set in maroon exactly where the word belongs.",
      "The institute's version is built on four disciplines: science, engineering, technology, and applied problem-solving. The last one is the standard itself: it is named on every certificate the institute issues, and it is the reason the institute is small on purpose. A student who can take a problem apart, decide what is actually wrong, and finish a working answer is worth more to Namibia than a corridor of unapplied theory.",
      "What ours is for, then: the graduate the flyer promises. Solves problems quietly, finishes them decisively. The institute is new, and it holds itself to what the certificate prints.",
    ],
  },
  {
    id: "the-seats-question",
    no: "Bulletin No. 2",
    title: "38 percent, and the seats that could change it",
    date: "2026",
    dek: "The labour figures are published. The training gap is measurable.",
    body: [
      "Start with the facts on the record. Namibia's youth unemployment rate stood at 38.05 percent in 2025, on the ILO estimate carried by Statista and the St. Louis Fed. The Namibia Statistics Agency's labour survey of January 2025 counted 1,018,529 Namibians aged 15 to 34. Of those, 563,499 were outside the labour force entirely, and 202,144 were looking for work that was not there.",
      "Now the training side. The Namibia Training Authority's own strategic plan set a target of 45,000 vocational enrolments, recorded in the World Bank's skills policy note for Namibia. The most recent reported intake the NTA publicised was 13,500 new trainees. Those two numbers are the whole argument: the country planned for a river and is running on a stream.",
      "The seats question comes down to arithmetic. Every institute that opens honest, disciplined, applied seats takes direct pressure off those figures. Oryx starts small, with a first cohort that can be counted on one hand's worth of classrooms, and it grows on results, not on brochures. That is what a startup institute is for.",
    ],
  },
  {
    id: "the-levy-plainly",
    no: "Bulletin No. 3",
    title: "The levy, plainly: what employers are already paying",
    date: "2026",
    dek: "Namibian employers have funded vocational training since 2014. Here is why that matters to this institute.",
    body: [
      "Since 2014, Namibia's Vocational Education and Training Act of 2008 has carried a training levy on employers, recorded by UNESCO's TVET country profile. The levy's purpose is plain: the firms that need skilled hands pay toward the system that produces them.",
      "The institute's interest in this is practical. An employer who sponsors seats at Oryx is not spending new money; it is directing money the Act already collects toward hands it actually needs. The institute will map the exact NTA grant and rebate rules before its first employer conversation, and will publish what it finds. If a rule turns out to be different from what everyone assumes, the institute will publish that here first.",
      "What an employer can hold it to today: small cohorts, practitioner teachers, and graduates measured on applied problem-solving. What it cannot get yet is scale, and the institute will not pretend otherwise.",
    ],
  },
  {
    id: "why-every-course-ends-in-a-venture",
    no: "Bulletin No. 4",
    title: "Why every course here ends in a venture",
    date: "2026",
    dek: "Entrepreneurship is the exit exam here, and every course ends in one.",
    body: [
      "Most schools bolt entrepreneurship onto the timetable as an optional extra. The research on Namibia keeps finding the same gap: entrepreneurship education exists on paper and thins out in practice, and the studies keep recommending it be made central rather than decorative. The institute took the recommendation literally.",
      "The rule at Oryx is that every programme ends with something that works and something that sells. A working radio repaired to standard, a drafting set delivered to spec, a small service running for real customers. The venture is the exit exam: its customers decide whether it works and whether it is worth paying for.",
      "The founder's rule sits underneath all of it: a man is only as good as his tools, and the brain is the biggest tool. A venture is a tool too, the kind that pays rent. The institute trains brains that can build them.",
    ],
  },
] as const;

/** Resources: honest, no invented downloads. */
export const resources = [
  {
    name: "The Oryx Bulletin",
    what: "The institute's own insights, set below and on this page. Cited figures, plain language, no filler.",
    action: { label: "Read the Bulletin", href: "#bulletin" },
  },
  {
    name: "The Oryx Tools List",
    what: "Every tool the institute runs on, published in the open: the office stack, the learner's spine, the AI stack.",
    action: { label: "See the tools", href: "/tools" },
  },
  {
    name: "The application guide",
    what: "One message to the Principal's office starts an application. The guide walks through what to put in it.",
    action: { label: "Read the guide", href: "/apply" },
  },
  {
    name: "The prospectus",
    what: "Programme detail is confirmed by the Principal's office at the point of application, so the prospectus is issued on request rather than as a stale PDF.",
    action: { label: "Request it", href: "/apply" },
  },
  {
    name: "The brand register",
    what: "The wordmark, the emblem, the codes and the voice, published in full.",
    action: { label: "Open the register", href: "/brand" },
  },
] as const;
