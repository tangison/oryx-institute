/**
 * Oryx Institute · extended content.
 * Facts policy: every number carries its source inline. Nothing about
 * programmes, dates, fees, facilities or accreditation is asserted
 * beyond what the print kit and the Principal's office have published.
 * The images are the master package's own curated photographs. The
 * photographs stand on their own: no captions, no claims that a
 * picture is a photograph of the institute.
 */

export const insights = [
  {
    id: "what-a-polytechnic-is",
    no: "Bulletin No. 1",
    title: "What a polytechnic is, and what ours is\u00A0for",
    date: "2026",
    dek: "The word is old, the characters are older, and the idea is exactly right for\u00A0Windhoek.",
    body: [
      "A polytechnic institute teaches the made world: the sciences that explain it, the engineering that builds it, the technology that runs it. The word carries a Greek root, poli meaning many, techne meaning craft. Many crafts, one discipline. In the Oryx wordmark the idea stands in Chinese, 理工, li gong, science and engineering, set in maroon exactly where the word\u00A0belongs.",
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
      "Now the training side. The Namibia Training Authority's own strategic plan set a target of 45,000 vocational enrolments, recorded in the World Bank's skills policy note for Namibia. The most recent reported intake the NTA publicised was 13,500 new trainees. Those two numbers are the whole argument: the country planned for a river and is running on a\u00A0stream.",
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
      "The institute's interest in this is practical. An employer who sponsors seats at Oryx is not spending new money; it is directing money the Act already collects toward hands it actually needs. The institute will map the exact NTA grant and rebate rules before its first employer conversation, and will publish what it finds. If a rule turns out to be different from what everyone assumes, the institute will publish that here\u00A0first.",
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
      "Most schools bolt entrepreneurship onto the timetable as an optional extra. The research on Namibia keeps finding the same gap: entrepreneurship education exists on paper and thins out in practice, and the studies keep recommending it be made central rather than decorative. The institute took the recommendation\u00A0literally.",
      "The rule at Oryx is that every programme ends with something that works and something that sells. A working radio repaired to standard, a drafting set delivered to spec, a small service running for real customers. The venture is the exit exam: its customers decide whether it works and whether it is worth paying\u00A0for.",
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
