/**
 * Oryx Politechnical Institute · extended content.
 * Facts policy: every number carries its source inline. Nothing about
 * programmes, dates, fees, facilities or accreditation is asserted
 * beyond what the print kit and the Principal's office have published.
 * The 1947 register images are period studies: captions never claim
 * they are photographs of the institute.
 */

export const motto = {
  line: "A man is only as good as his tools. The brain is the biggest tool.",
  source: "The founder's rule",
} as const;

/** The four schools, phased. Dates are confirmed by the Principal's
 * office at the point of application, never printed in advance. */
export const schools = [
  {
    id: "technology",
    phase: "School I",
    name: "School of Technology",
    status: "Open for enquiry",
    lead: "The AI-native flagship. First in, because it needs the least: a bench, a meter, a machine that thinks with you.",
    body: "Technology is where the institute starts. The discipline covers the modern tool chain from the inside: how computing systems are taken apart, understood and rebuilt, and how to put AI tools to work without surrendering judgement to them. The study companion runs on the same stack the institute runs on, so students learn on the real thing from the first day.",
    image: "/images/1947/schools-technology.jpg",
    alt: "Period study in the 1947 documentary register: students bent over valve radio sets in a workshop, soldering, one walking past with a chassis",
    caption: "Period study: the radio workshop, in the 1947 documentary register.",
  },
  {
    id: "engineering",
    phase: "School II",
    name: "School of Engineering",
    status: "Coming soon",
    lead: "The making core: work that holds, measured and finished to standard.",
    body: "Engineering follows, because it is the most demanding to stand up properly: machine shops, measurement, the discipline of tolerances. The institute will not open a workshop it cannot staff with people who have cut metal for a living. When the school opens its doors, the certificate standard is already written: excellence in innovation and applied problem-solving.",
    image: "/images/1947/schools-engineering.jpg",
    alt: "Period study in the 1947 documentary register: an apprentice at a belt-driven lathe, swarf curling off the tool, another measuring with calipers",
    caption: "Period study: the machine shop, in the 1947 documentary register.",
  },
  {
    id: "science",
    phase: "School III",
    name: "School of Science",
    status: "Coming soon",
    lead: "The reasoning core: observation, evidence and disciplined thought.",
    body: "Science is the long game. The laboratory takes time to build and the institute refuses to fake one with pictures of other people's benches. The school arrives when the benches are real, and it arrives with the same spine every other school carries: evidence first, decoration never, and a venture in every cohort.",
    image: "/images/1947/schools-science.jpg",
    alt: "Period study in the 1947 documentary register: a laboratory with glass beakers and brass instruments, a student pouring mid-motion",
    caption: "Period study: the laboratory bench, in the 1947 documentary register.",
  },
] as const;

/** Applied problem-solving is not a school; it is the spine that runs
 * through all of them, and it is named on every certificate. */
export const appliedSpine = {
  name: "Applied problem-solving",
  line: "Not a school. The spine that runs through all three, and the standard named on every certificate.",
  image: "/images/1947/tools-hands.jpg",
  alt: "Period study in the 1947 documentary register: the hands of an apprentice holding a drafting compass over a technical drawing",
  caption: "Period study: the compass on the drawing, in the 1947 documentary register.",
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
        name: "One WhatsApp number",
        what: "The front desk. Applications, questions and appointments all start on +264 81 341 1522.",
      },
      {
        name: "One mailbox",
        what: "tangi@oryxinstitute.org, read in the Principal's office. Paper post answered at P.O. Box 1662, Windhoek.",
      },
      {
        name: "The print kit",
        what: "Letterhead, flyer, certificate, business card. The institute's paper register, carried through every page of this site.",
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
        what: "Drafting by hand before drafting by machine. The 1947 register on this site is not nostalgia; it is the standard of finishing.",
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
    intro: "The institute is AI-native, which means the tools are named, not magic.",
    items: [
      {
        name: "GLM study companion",
        what: "A GLM-backed tutor that runs on the institute's own stack: practice questions, worked examples, patient repetition, in plain language.",
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
    id: "what-a-politechnical-is",
    no: "Bulletin No. 1",
    title: "What a politechnical is, and what ours is for",
    date: "2026",
    dek: "The word is old, the characters are older, and the idea is exactly right for Windhoek.",
    body: [
      "A politechnical institute teaches the made world: the sciences that explain it, the engineering that builds it, the technology that runs it. The word carries a Greek root, poli meaning many, techne meaning craft. Many crafts, one discipline. In the Oryx wordmark the idea stands in Chinese, 理工, li gong, science and engineering, set in maroon exactly where the word belongs.",
      "The institute's version is built on four disciplines: science, engineering, technology, and applied problem-solving. The last one is not a subject, it is the standard. It is named on every certificate the institute issues, and it is the reason the institute is small on purpose. A student who can take a problem apart, decide what is actually wrong, and finish a working answer is worth more to Namibia than a corridor of unapplied theory.",
      "What ours is for, then: the graduate the flyer promises. Solves problems quietly, finishes them decisively. The institute is new, and it says so on every page. What it will not do is pretend to be anything other than what the certificate says.",
    ],
  },
  {
    id: "the-seats-question",
    no: "Bulletin No. 2",
    title: "38 percent, and the seats that could change it",
    date: "2026",
    dek: "The labour numbers are brutal. The training numbers do not have to be.",
    body: [
      "Start with the facts on the record. Namibia's youth unemployment rate stood at 38.05 percent in 2025, on the ILO estimate carried by Statista and the St. Louis Fed. The Namibia Statistics Agency's labour survey of January 2025 counted 1,018,529 Namibians aged 15 to 34. Of those, 563,499 were outside the labour force entirely, and 202,144 were looking for work that was not there.",
      "Now the training side. The Namibia Training Authority's own strategic plan set a target of 45,000 vocational enrolments, recorded in the World Bank's skills policy note for Namibia. The most recent reported intake the NTA publicised was 13,500 new trainees. Those two numbers are the whole argument: the country planned for a river and is running on a stream.",
      "The seats question is not a slogan, it is an arithmetic. Every institute that opens honest, disciplined, applied seats takes direct pressure off those figures. Oryx starts small, with a first cohort that can be counted on one hand's worth of classrooms, and it grows on results, not on brochures. That is what a startup institute is for.",
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
      "The institute's interest in this is practical, not political. An employer who sponsors seats at Oryx is not spending new money; it is directing money the Act already collects toward hands it actually needs. The institute will map the exact NTA grant and rebate rules before its first employer conversation, and will publish what it finds. If a rule turns out to be different from what everyone assumes, the institute will say so here first.",
      "What an employer can hold it to today: small cohorts, practitioner teachers, and graduates measured on applied problem-solving. What it cannot get yet is scale, and the institute will not pretend otherwise.",
    ],
  },
  {
    id: "why-every-course-ends-in-a-venture",
    no: "Bulletin No. 4",
    title: "Why every course here ends in a venture",
    date: "2026",
    dek: "Entrepreneurship is not a subject at Oryx. It is the exit exam.",
    body: [
      "Most schools bolt entrepreneurship onto the timetable as an optional extra. The research on Namibia keeps finding the same gap: entrepreneurship education exists on paper and thins out in practice, and the studies keep recommending it be made central rather than decorative. The institute took the recommendation literally.",
      "The rule at Oryx is that every programme ends with something that works and something that sells. A working radio repaired to standard, a drafting set delivered to spec, a small service running for real customers. The venture is the exit exam because it cannot be faked: a thing either works or it does not, and a customer either pays or does not.",
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

/** Comparison pages: the rules first, then the honest tables. Every
 * claim about other institutions is from their public record. Oryx
 * states its own status as a new, small, pre-accreditation institute. */
export const compareRules = [
  "Never disparage. Every comparison uses publicly verifiable facts, cited.",
  "Compare only on the axes where a small institute genuinely differs.",
  "State Oryx's own status as it is: new, small, honest certificates.",
] as const;

export const comparisons = [
  {
    id: "nust",
    title: "Oryx and NUST",
    intro:
      "The Namibia University of Science and Technology, the former Polytechnic of Namibia, is the country's public science and technology university, with a public record of roughly 10,500 students and admission based on completion of Grade 12 or an equivalent qualification. It is the institution Oryx is most often measured against, so here is the measurement.",
    rows: [
      { axis: "Scale", them: "A public university, roughly 10,500 students", us: "A startup institute, first cohort sized to a handful of rooms" },
      { axis: "Admission", them: "Matriculation certificate or equivalent", us: "One message to the Principal's office, read personally" },
      { axis: "Toolchain", them: "Established faculties and laboratories", us: "AI-native from day one, tools published openly" },
      { axis: "Entrepreneurship", them: "Programmes with business modules", us: "A venture as the exit exam in every programme" },
      { axis: "Status", them: "Established public university", us: "New institute, institute certificates, honest about it" },
    ],
  },
  {
    id: "vtc",
    title: "Oryx and the public VTCs",
    intro:
      "Namibia's vocational training centres operate under the Namibia Training Authority, which reported 13,500 new trainees in its most recent publicised intake against a strategic-plan target of 45,000. The VET levy, collected from employers since 2014 under the 2008 Act, funds the system.",
    rows: [
      { axis: "Scale", them: "The national system, levy-funded", us: "Small cohorts on purpose" },
      { axis: "Focus", them: "Trade qualifications at national scale", us: "Applied problem-solving with an AI-native spine" },
      { axis: "Entrepreneurship", them: "Trades toward employment", us: "Every programme ends in a working venture" },
      { axis: "Status", them: "Established public provision", us: "New institute, honest certificates" },
    ],
  },
  {
    id: "private",
    title: "Oryx and private colleges",
    intro:
      "Private colleges in Windhoek range from excellent to disposable, and the honest consumer advice is the same for every one of them, including this institute: ask for the accreditation status of any provider in writing, and treat any certificate that cannot explain its own standard as decoration.",
    rows: [
      { axis: "The question to ask", them: "Any college: who accredits this qualification?", us: "Oryx: the certificate is the institute's own, signed by the Principal, and the standard is printed on it" },
      { axis: "Class size", them: "Varies by provider", us: "Small by policy, and the policy is published" },
      { axis: "Teachers", them: "Varies by provider", us: "Practitioner-teachers only: people who do the work for a living" },
      { axis: "Test", them: "Ask for outcomes in writing", us: "Every cohort's ventures are the public outcome" },
    ],
  },
  {
    id: "self-taught",
    title: "Oryx and teaching yourself",
    intro:
      "Teaching yourself is a real path, and the institute will not pretend otherwise. The internet is full of the same knowledge the institute teaches. What it is not full of is a bench, a schedule, a cohort that expects you, and a person who has done the work checking it.",
    rows: [
      { axis: "Knowledge", them: "Free and abundant", us: "The same knowledge, sequenced and checked" },
      { axis: "Structure", them: "Self-discipline, alone", us: "A timetable, a cohort, a standard" },
      { axis: "The bench", them: "Whatever you can buy", us: "Arranged per cohort, stated before enrolment" },
      { axis: "Proof", them: "A portfolio you build alone", us: "A venture, a certificate, and your own notebook" },
    ],
  },
] as const;

/** People: the hiring philosophy, published before the staff are. */
export const peoplePage = {
  tracks: [
    {
      name: "Core faculty",
      what: "Small, senior, full-time. Each one owns a school's spine and teaches across programmes. Hired slowly, on evidence, and kept for the standard they hold.",
    },
    {
      name: "Practitioner adjuncts",
      what: "Working engineers, developers, accountants and tradespeople who teach one evening block, paid per block. A startup institute teaches wide this way without pretending to be large.",
    },
  ],
  hiringBar: [
    {
      q: "Can you do the thing?",
      a: "Recently, for real clients or employers. Practitioner first, teacher second, in that order.",
    },
    {
      q: "Can you teach it to someone who failed school?",
      a: "A demo lesson is part of the interview. If it cannot survive the room, it does not get the job.",
    },
    {
      q: "Do you use the tools?",
      a: "The AI-native bar. The institute teaches the stack it runs, so the staff have to run it first.",
    },
    {
      q: "Will you hold the voice?",
      a: "Honest, plain, no theatre. The same register this site is written in.",
    },
  ],
  adminLine:
    "one administrator plus agents. Admissions triage, scheduling, records and first-line communication run on the institute's own AI stack with human review, so the payroll goes to faculty, which is what families are actually buying.",
  invite:
    "The institute hires practitioner-teachers before it prints their titles. If you do the work for a living and the four questions above read like a description of you, the Principal's office reads applications for staff the same way it reads them for students: one message, name, trade, and the thing you have made.",
} as const;
