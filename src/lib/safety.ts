/**
 * The safety officer training programme ("Smatrac" working codename),
 * delivered through the Practice engine. Curriculum, assessment and
 * delivery model per SAFETY-COURSE-PLAN.md; nothing here invents a
 * fee, a date, or an instructor. Fields that are not yet confirmed
 * print their publication date instead: 15 November 2026.
 *
 * The programme is positioned as industry-orientated professional
 * development. NTA provider registration and NQA accreditation are
 * pursued in parallel and stated plainly on every page, per
 * CONTENT-CORRECTIONS §3 and §4.
 */

export type SafetyModule = {
  no: string;
  name: string;
  line: string;
  /** The plate anchored to this module row, if the bible assigns one. */
  plate?: { src: string; alt: string; altAf: string };
};

export type SafetyLevel = {
  slug: "level-1-induction" | "level-2-officer" | "level-3-management";
  code: string;
  durationIso: "P1D" | "P5D" | "P10D";
  hero: { src: string; width: number; height: number };
  en: SafetyLevelCopy;
  af: SafetyLevelCopy;
};

type SafetyLevelCopy = {
  navName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  audience: { label: string; body: string };
  outlineEyebrow: string;
  modules: SafetyModule[];
  assessmentEyebrow: string;
  assessment: string[];
  outcomesEyebrow: string;
  outcomes: string[];
  credentialEyebrow: string;
  credential: string;
  credentialNote: string;
  feeEyebrow: string;
  fee: string;
  datesEyebrow: string;
  dates: string;
  applyCta: string;
};

export const SAFETY_LANDING_PATH = "/practice/safety-officer-course";

export const safetyLevels: SafetyLevel[] = [
  {
    slug: "level-1-induction",
    code: "ORYX-SAFETY-1",
    durationIso: "P1D",
    hero: {
      src: "/images/kinfolk/safety/40-green-helmet.jpg",
      width: 1254,
      height: 1254,
    },
    en: {
      navName: "Level 1 · Induction",
      metaTitle: "General Worker Safety Induction (1 day) · Oryx Institute",
      metaDescription:
        "One-day General Worker Safety Induction. Hazard identification, PPE, emergency procedures, and legal duties. Certificate issued on completion. Book your place.",
      h1: "General Worker Safety Induction.",
      lede: "One day, six contact hours, one outcome: a worker who can spot a hazard, wear the right protection, and raise the alarm the right way. The induction every new employee on any Namibian site should sit through before their first shift.",
      audience: {
        label: "Who sits this level",
        body: "Every new employee on any site: general workers, cleaners, drivers, contractors' labour. No prior training is assumed, and none is required.",
      },
      outlineEyebrow: "The day, module by module",
      modules: [
        {
          no: "01",
          name: "What occupational safety is, and why it matters",
          line: "The register of the day: what a hazard is, what harm looks like, and what the law expects of everyone on site.",
        },
        {
          no: "02",
          name: "Legal duties of employer and employee",
          line: "The Labour Act and its occupational health and safety regulations, stated as duties: what the employer must provide, what the worker must do.",
        },
        {
          no: "03",
          name: "Hazard identification and reporting",
          line: "Seeing the thing before it bites: spotting, naming and reporting hazards, and what happens to the report afterwards.",
        },
        {
          no: "04",
          name: "Personal protective equipment",
          line: "What PPE is, when each piece is worn, how it is checked, and why the cheapest helmet is the most expensive thing on site.",
          plate: {
            src: "/images/kinfolk/safety/48-hi-vis.jpg",
            alt: "A folded lime hi-vis vest with two reflective strips, resting on grey concrete",
            altAf: "A folded lime hi-vis vest with two reflective strips, resting on grey concrete",
          },
        },
        {
          no: "05",
          name: "Emergency procedures",
          line: "Fire, first aid and evacuation: who calls whom, where everyone goes, and how a drill differs from the real thing.",
        },
        {
          no: "06",
          name: "Manual handling and basic ergonomics",
          line: "Lifting, carrying and working positions that keep a back whole, demonstrated and practised on the day.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A 20-question multiple-choice test at the end of the day.",
        "Pass mark: 80 percent.",
        "Results within five working days of the sitting.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Identify and report hazards on a working site",
        "Select, inspect and wear the PPE a task requires",
        "Act correctly under fire, injury and evacuation procedures",
        "State the legal duties of employer and employee",
        "Lift and handle loads without injury",
      ],
      credentialEyebrow: "The document",
      credential: "Certificate of Attendance",
      credentialNote:
        "An internal record of completion, signed by the Principal. It is not an NQF-credit-bearing qualification and cannot be submitted to NQA as accredited prior learning. It is a record that you completed an Oryx course.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest in Level 1 Safety Training",
    },
    af: {
      navName: "Level 1 · Induction",
      metaTitle: "General Worker Safety Induction (1 day) · Oryx Institute",
      metaDescription:
        "One-day General Worker Safety Induction. Hazard identification, PPE, emergency procedures, and legal duties. Certificate issued on completion. Book your place.",
      h1: "General Worker Safety Induction.",
      lede: "One day, six contact hours, one outcome: a worker who can spot a hazard, wear the right protection, and raise the alarm the right way. The induction every new employee on any Namibian site should sit through before their first shift.",
      audience: {
        label: "Who sits this level",
        body: "Every new employee on any site: general workers, cleaners, drivers, contractors' labour. No prior training is assumed, and none is required.",
      },
      outlineEyebrow: "The day, module by module",
      modules: [
        {
          no: "01",
          name: "What occupational safety is, and why it matters",
          line: "The register of the day: what a hazard is, what harm looks like, and what the law expects of everyone on site.",
        },
        {
          no: "02",
          name: "Legal duties of employer and employee",
          line: "The Labour Act and its occupational health and safety regulations, stated as duties: what the employer must provide, what the worker must do.",
        },
        {
          no: "03",
          name: "Hazard identification and reporting",
          line: "Seeing the thing before it bites: spotting, naming and reporting hazards, and what happens to the report afterwards.",
        },
        {
          no: "04",
          name: "Personal protective equipment",
          line: "What PPE is, when each piece is worn, how it is checked, and why the cheapest helmet is the most expensive thing on site.",
          plate: {
            src: "/images/kinfolk/safety/48-hi-vis.jpg",
            alt: "A folded lime hi-vis vest with two reflective strips, resting on grey concrete",
            altAf: "A folded lime hi-vis vest with two reflective strips, resting on grey concrete",
          },
        },
        {
          no: "05",
          name: "Emergency procedures",
          line: "Fire, first aid and evacuation: who calls whom, where everyone goes, and how a drill differs from the real thing.",
        },
        {
          no: "06",
          name: "Manual handling and basic ergonomics",
          line: "Lifting, carrying and working positions that keep a back whole, demonstrated and practised on the day.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A 20-question multiple-choice test at the end of the day.",
        "Pass mark: 80 percent.",
        "Results within five working days of the sitting.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Identify and report hazards on a working site",
        "Select, inspect and wear the PPE a task requires",
        "Act correctly under fire, injury and evacuation procedures",
        "State the legal duties of employer and employee",
        "Lift and handle loads without injury",
      ],
      credentialEyebrow: "The document",
      credential: "Certificate of Attendance",
      credentialNote:
        "An internal record of completion, signed by the Principal. It is not an NQF-credit-bearing qualification and cannot be submitted to NQA as accredited prior learning. It is a record that you completed an Oryx course.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest in Level 1 Safety Training",
    },
  },
  {
    slug: "level-2-officer",
    code: "ORYX-SAFETY-2",
    durationIso: "P5D",
    hero: {
      src: "/images/kinfolk/safety/41-helmet-boots.jpg",
      width: 1122,
      height: 1402,
    },
    en: {
      navName: "Level 2 · Officer",
      metaTitle: "Safety Officer course (5 days), Windhoek · Oryx Institute",
      metaDescription:
        "Five-day Safety Officer course. HIRA, incident investigation, construction hazards, first aid awareness, and a practical site assessment. Enrol with Oryx.",
      h1: "Safety Representative and Site Safety Officer.",
      lede: "Five days that end in an officer the site can use: the legal framework, the HIRA method, the incident file, the toolbox talk, and a practical walkthrough assessed on a live site. For the person the law expects to know why, not just what.",
      audience: {
        label: "Who sits this level",
        body: "Designated workplace representatives, junior officers, and supervisors who carry the safety responsibility beside their own trade.",
      },
      outlineEyebrow: "The week, module by module",
      modules: [
        {
          no: "01",
          name: "The Namibian legal framework",
          line: "The Labour Act and the sector regulations that follow it: construction, mining, factories. What each demands of a site, and who is answerable.",
        },
        {
          no: "02",
          name: "Hazard identification and risk assessment",
          line: "HIRA methodology: scoring likelihood against severity, writing the assessment a supervisor can act on, and revisiting it when the site changes.",
        },
        {
          no: "03",
          name: "Incident investigation and reporting",
          line: "Near-miss, injury and fatality: securing the scene, taking statements, and the paperwork that must exist afterwards.",
        },
        {
          no: "04",
          name: "PPE inspection and management",
          line: "Issuing, inspecting, recording and replacing: running a PPE store that passes an audit.",
        },
        {
          no: "05",
          name: "Emergency preparedness and fire safety",
          line: "Preparedness planning, and the practical: extinguisher use, live, with the theory behind each class of fire.",
        },
        {
          no: "06",
          name: "First aid awareness",
          line: "What to do in the first minutes and how to support a first aider. This is awareness, not certification: the Level 1 first-aid course itself is delivered by a registered training partner.",
          plate: {
            src: "/images/kinfolk/safety/43-first-aid.jpg",
            alt: "A plain matte green metal first-aid box, centred on cream paper",
            altAf: "A plain matte green metal first-aid box, centred on cream paper",
          },
        },
        {
          no: "07",
          name: "Construction-site hazards",
          line: "Scaffolds, working at heights, excavation and electrical awareness: the four that hurt most, taught as inspection points.",
        },
        {
          no: "08",
          name: "Toolbox talks and crew briefings",
          line: "Running the ten minutes that keep a week safe: preparing, delivering and recording a talk that workers actually keep.",
        },
        {
          no: "09",
          name: "Safety file management and records",
          line: "The file an inspector asks for first: registers, permits, certificates, and how to keep them current without heroics.",
        },
        {
          no: "10",
          name: "Practical site walkthrough",
          line: "A guided walkthrough at a partner site, closed by observation against the rubric you saw in advance.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A 50-question written examination. Pass mark: 80 percent.",
        "A practical risk-assessment exercise at the partner worksite.",
        "A ten-minute toolbox talk, delivered to the cohort.",
        "A walkthrough observation, scored against the published rubric.",
        "Results within five working days of the final exercise.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Run a HIRA on a working site and write it up",
        "Investigate and document an incident to statutory standard",
        "Inspect, issue and manage PPE across a workforce",
        "Deliver a recorded toolbox talk and chair the weekly meeting",
        "Keep a safety file that stands up to inspection",
        "Act as the designated representative on a Namibian site",
      ],
      credentialEyebrow: "The document",
      credential: "Certificate of Completion, Safety Officer Level 2",
      credentialNote:
        "An internal credential, non-NQF at launch. When accreditation is awarded, the level maps to NQF-aligned unit standards and the mapping is announced on the register.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest in Level 2 Safety Training",
    },
    af: {
      navName: "Level 2 · Officer",
      metaTitle: "Safety Officer course (5 days), Windhoek · Oryx Institute",
      metaDescription:
        "Five-day Safety Officer course. HIRA, incident investigation, construction hazards, first aid awareness, and a practical site assessment. Enrol with Oryx.",
      h1: "Safety Representative and Site Safety Officer.",
      lede: "Five days that end in an officer the site can use: the legal framework, the HIRA method, the incident file, the toolbox talk, and a practical walkthrough assessed on a live site. For the person the law expects to know why, not just what.",
      audience: {
        label: "Who sits this level",
        body: "Designated workplace representatives, junior officers, and supervisors who carry the safety responsibility beside their own trade.",
      },
      outlineEyebrow: "The week, module by module",
      modules: [
        {
          no: "01",
          name: "The Namibian legal framework",
          line: "The Labour Act and the sector regulations that follow it: construction, mining, factories. What each demands of a site, and who is answerable.",
        },
        {
          no: "02",
          name: "Hazard identification and risk assessment",
          line: "HIRA methodology: scoring likelihood against severity, writing the assessment a supervisor can act on, and revisiting it when the site changes.",
        },
        {
          no: "03",
          name: "Incident investigation and reporting",
          line: "Near-miss, injury and fatality: securing the scene, taking statements, and the paperwork that must exist afterwards.",
        },
        {
          no: "04",
          name: "PPE inspection and management",
          line: "Issuing, inspecting, recording and replacing: running a PPE store that passes an audit.",
        },
        {
          no: "05",
          name: "Emergency preparedness and fire safety",
          line: "Preparedness planning, and the practical: extinguisher use, live, with the theory behind each class of fire.",
        },
        {
          no: "06",
          name: "First aid awareness",
          line: "What to do in the first minutes and how to support a first aider. This is awareness, not certification: the Level 1 first-aid course itself is delivered by a registered training partner.",
          plate: {
            src: "/images/kinfolk/safety/43-first-aid.jpg",
            alt: "A plain matte green metal first-aid box, centred on cream paper",
            altAf: "A plain matte green metal first-aid box, centred on cream paper",
          },
        },
        {
          no: "07",
          name: "Construction-site hazards",
          line: "Scaffolds, working at heights, excavation and electrical awareness: the four that hurt most, taught as inspection points.",
        },
        {
          no: "08",
          name: "Toolbox talks and crew briefings",
          line: "Running the ten minutes that keep a week safe: preparing, delivering and recording a talk that workers actually keep.",
        },
        {
          no: "09",
          name: "Safety file management and records",
          line: "The file an inspector asks for first: registers, permits, certificates, and how to keep them current without heroics.",
        },
        {
          no: "10",
          name: "Practical site walkthrough",
          line: "A guided walkthrough at a partner site, closed by observation against the rubric you saw in advance.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A 50-question written examination. Pass mark: 80 percent.",
        "A practical risk-assessment exercise at the partner worksite.",
        "A ten-minute toolbox talk, delivered to the cohort.",
        "A walkthrough observation, scored against the published rubric.",
        "Results within five working days of the final exercise.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Run a HIRA on a working site and write it up",
        "Investigate and document an incident to statutory standard",
        "Inspect, issue and manage PPE across a workforce",
        "Deliver a recorded toolbox talk and chair the weekly meeting",
        "Keep a safety file that stands up to inspection",
        "Act as the designated representative on a Namibian site",
      ],
      credentialEyebrow: "The document",
      credential: "Certificate of Completion, Safety Officer Level 2",
      credentialNote:
        "An internal credential, non-NQF at launch. When accreditation is awarded, the level maps to NQF-aligned unit standards and the mapping is announced on the register.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest in Level 2 Safety Training",
    },
  },
  {
    slug: "level-3-management",
    code: "ORYX-SAFETY-3",
    durationIso: "P10D",
    hero: {
      src: "/images/kinfolk/safety/42-clipboard.jpg",
      width: 1254,
      height: 1254,
    },
    en: {
      navName: "Level 3 · Management",
      metaTitle: "Advanced Safety Management course · Oryx Institute",
      metaDescription:
        "Advanced Safety Management. SHEQ systems, construction regulations, contractor management, auditing, and train-the-trainer. Modular ten-day programme.",
      h1: "Advanced Safety Management.",
      lede: "Ten days, modular: the systems layer above the officer. SHEQ management, regulation in depth, contractor control, root-cause investigation and audit. Modules can be taken separately; the certificate wants them all.",
      audience: {
        label: "Who sits this level",
        body: "Senior safety officers, SHE managers and compliance managers: the people who sign off systems, not just shifts.",
      },
      outlineEyebrow: "The programme, module by module",
      modules: [
        {
          no: "01",
          name: "SHEQ management systems",
          line: "Safety, health, environment and quality as one system: the SANS and ISO 45001 family read as a working manual, not a binder on a shelf.",
        },
        {
          no: "02",
          name: "Construction regulations in depth",
          line: "SANS 10400 and the construction regulations where they apply: permits, notifications, and the paperwork that precedes a pour.",
        },
        {
          no: "03",
          name: "Mining safety regulations",
          line: "For clients in mining: the additional duties, the additional paperwork, and where the thresholds bite.",
        },
        {
          no: "04",
          name: "Occupational hygiene and environmental monitoring",
          line: "Noise, dust, ventilation and exposure: what to measure, how often, and what the numbers oblige you to do.",
        },
        {
          no: "05",
          name: "Contractor management",
          line: "Selecting, inducting, supervising and closing out contractors so their safety file is as good as yours.",
        },
        {
          no: "06",
          name: "Accident investigation",
          line: "Root cause analysis, with ICAM and TapRooT fundamentals: finding the failure in the system, not the person to blame.",
        },
        {
          no: "07",
          name: "Training of trainers",
          line: "Feeding instructors back into Levels 1 and 2: teaching technique, assessment design, and keeping a room.",
        },
        {
          no: "08",
          name: "Auditing and inspection techniques",
          line: "Building and running an audit programme: checklists, evidence, findings, and the follow-up that makes the next audit shorter.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A written examination at the end of each module. Pass mark: 80 percent.",
        "A practical audit report, produced against a live site.",
        "A management-system assignment, marked to the rubric you saw in advance.",
        "Results within five working days of each sitting.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Design and maintain a SHEQ management system",
        "Audit a site or a contractor and write findings that hold",
        "Lead a root-cause investigation after a serious incident",
        "Manage contractor safety from tender to close-out",
        "Instruct others: deliver Level 1 and 2 material to standard",
      ],
      credentialEyebrow: "The document",
      credential: "Advanced Safety Management Certificate",
      credentialNote:
        "An internal credential. It is written to serve as CPD recognition once the institute aligns with the relevant professional bodies; that alignment will be announced on the register.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars. Modules can be taken separately and priced singly.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest in Level 3 Safety Training",
    },
    af: {
      navName: "Level 3 · Management",
      metaTitle: "Advanced Safety Management course · Oryx Institute",
      metaDescription:
        "Advanced Safety Management. SHEQ systems, construction regulations, contractor management, auditing, and train-the-trainer. Modular ten-day programme.",
      h1: "Advanced Safety Management.",
      lede: "Ten days, modular: the systems layer above the officer. SHEQ management, regulation in depth, contractor control, root-cause investigation and audit. Modules can be taken separately; the certificate wants them all.",
      audience: {
        label: "Who sits this level",
        body: "Senior safety officers, SHE managers and compliance managers: the people who sign off systems, not just shifts.",
      },
      outlineEyebrow: "The programme, module by module",
      modules: [
        {
          no: "01",
          name: "SHEQ management systems",
          line: "Safety, health, environment and quality as one system: the SANS and ISO 45001 family read as a working manual, not a binder on a shelf.",
        },
        {
          no: "02",
          name: "Construction regulations in depth",
          line: "SANS 10400 and the construction regulations where they apply: permits, notifications, and the paperwork that precedes a pour.",
        },
        {
          no: "03",
          name: "Mining safety regulations",
          line: "For clients in mining: the additional duties, the additional paperwork, and where the thresholds bite.",
        },
        {
          no: "04",
          name: "Occupational hygiene and environmental monitoring",
          line: "Noise, dust, ventilation and exposure: what to measure, how often, and what the numbers oblige you to do.",
        },
        {
          no: "05",
          name: "Contractor management",
          line: "Selecting, inducting, supervising and closing out contractors so their safety file is as good as yours.",
        },
        {
          no: "06",
          name: "Accident investigation",
          line: "Root cause analysis, with ICAM and TapRooT fundamentals: finding the failure in the system, not the person to blame.",
        },
        {
          no: "07",
          name: "Training of trainers",
          line: "Feeding instructors back into Levels 1 and 2: teaching technique, assessment design, and keeping a room.",
        },
        {
          no: "08",
          name: "Auditing and inspection techniques",
          line: "Building and running an audit programme: checklists, evidence, findings, and the follow-up that makes the next audit shorter.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A written examination at the end of each module. Pass mark: 80 percent.",
        "A practical audit report, produced against a live site.",
        "A management-system assignment, marked to the rubric you saw in advance.",
        "Results within five working days of each sitting.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Design and maintain a SHEQ management system",
        "Audit a site or a contractor and write findings that hold",
        "Lead a root-cause investigation after a serious incident",
        "Manage contractor safety from tender to close-out",
        "Instruct others: deliver Level 1 and 2 material to standard",
      ],
      credentialEyebrow: "The document",
      credential: "Advanced Safety Management Certificate",
      credentialNote:
        "An internal credential. It is written to serve as CPD recognition once the institute aligns with the relevant professional bodies; that alignment will be announced on the register.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars. Modules can be taken separately and priced singly.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest in Level 3 Safety Training",
    },
  },
];

export function getSafetyLevel(slug: string): SafetyLevel | undefined {
  return safetyLevels.find((l) => l.slug === slug);
}

/* ------------------------------------------------------------------ */
/* The landing page copy                                               */
/* ------------------------------------------------------------------ */

export const safetyLanding = {
  en: {
    metaTitle: "Safety officer training, Windhoek · Oryx Institute",
    metaDescription:
      "One, five, and ten-day occupational training in Windhoek for Namibian sites: worker induction, safety officer certification, and SHEQ management. Enrol now.",
    ogTitle: "Safety officer training, Windhoek | Oryx Institute",
    h1: "Safety officer training for Namibian sites.",
    lede: "A Namibian occupational programme, taught in Windhoek by a registered professional and examined on paper and on site: one day of worker induction, five days to a safety officer, ten days to advanced safety management.",
    statusLine:
      "Curriculum and pricing publish on 15 November 2026. Register your interest now and the office contacts you the day enrolments open.",
    levelsEyebrow: "Three levels",
    levelsTitle: "Induction, officer, management.",
    howEyebrow: "How we teach",
    howBody: [
      "Examinations are written on paper, not clicked through online. Practical assessments run against a rubric the learner sees in advance, and results arrive within five working days. Every learner receives the printed course manual, a clipboard and a pen on day one; Level 2 upwards adds the green hard hat.",
      "Courses run at a hired training venue in Windhoek, disclosed as a hired venue. The practical walkthroughs happen at a real partner site. The lead instructor is a Namibian professional with recognised credentials, hired and named before Cohort 1 opens.",
    ],
    instructorEyebrow: "The instructor",
    instructorName: "The lead instructor.",
    instructorRole: "LEAD INSTRUCTOR · SAFETY PROGRAMME",
    instructorBody:
      "Appointed once curriculum sign-off is complete. Credentials and biography publish alongside the course outline on 15 November 2026. Oryx does not teach the subject without a credentialed lead instructor.",
    knowEyebrow: "What you need to know",
    knowNta:
      "This programme is industry-orientated professional development. The Practice engine currently offers fee-for-service business counselling, market research, and corporate Rapid Response Training under commercial services agreements. Formal vocational training programmes, including the National Occupational Standards in Business Administration, will commence only after NTA provider registration has been granted. NQA accreditation for registered qualifications is being pursued in parallel and will be announced on the public register.",
    knowCertificate:
      "Certificates issued before accreditation are internal records of completion: the Certificate of Attendance for short courses, the Certificate of Completion for the officer levels. They are not NQF-credit-bearing qualifications and cannot be submitted to NQA as accredited prior learning. First Aid Level 1, where required, is certified by a registered Namibian first-aid training partner, not by Oryx.",
    applyCta: "Register interest in Safety Officer Training",
    seeCurriculum: "See the Safety Officer Training curriculum",
    outlineLabel: "Outline",
    durationLabel: "Duration",
  },
  af: {
    metaTitle: "Safety officer training, Windhoek · Oryx Institute",
    metaDescription:
      "One, five, and ten-day occupational training in Windhoek for Namibian sites: worker induction, safety officer certification, and SHEQ management. Enrol now.",
    ogTitle: "Safety officer training, Windhoek | Oryx Institute",
    h1: "Safety officer training for Namibian sites.",
    lede: "A Namibian occupational programme, taught in Windhoek by a registered professional and examined on paper and on site: one day of worker induction, five days to a safety officer, ten days to advanced safety management.",
    statusLine:
      "Curriculum and pricing publish on 15 November 2026. Register your interest now and the office contacts you the day enrolments open.",
    levelsEyebrow: "Three levels",
    levelsTitle: "Induction, officer, management.",
    howEyebrow: "How we teach",
    howBody: [
      "Examinations are written on paper, not clicked through online. Practical assessments run against a rubric the learner sees in advance, and results arrive within five working days. Every learner receives the printed course manual, a clipboard and a pen on day one; Level 2 upwards adds the green hard hat.",
      "Courses run at a hired training venue in Windhoek, disclosed as a hired venue. The practical walkthroughs happen at a real partner site. The lead instructor is a Namibian professional with recognised credentials, hired and named before Cohort 1 opens.",
    ],
    instructorEyebrow: "The instructor",
    instructorName: "The lead instructor.",
    instructorRole: "LEAD INSTRUCTOR · SAFETY PROGRAMME",
    instructorBody:
      "Appointed once curriculum sign-off is complete. Credentials and biography publish alongside the course outline on 15 November 2026. Oryx does not teach the subject without a credentialed lead instructor.",
    knowEyebrow: "What you need to know",
    knowNta:
      "This programme is industry-orientated professional development. The Practice engine currently offers fee-for-service business counselling, market research, and corporate Rapid Response Training under commercial services agreements. Formal vocational training programmes, including the National Occupational Standards in Business Administration, will commence only after NTA provider registration has been granted. NQA accreditation for registered qualifications is being pursued in parallel and will be announced on the public register.",
    knowCertificate:
      "Certificates issued before accreditation are internal records of completion: the Certificate of Attendance for short courses, the Certificate of Completion for the officer levels. They are not NQF-credit-bearing qualifications and cannot be submitted to NQA as accredited prior learning. First Aid Level 1, where required, is certified by a registered Namibian first-aid training partner, not by Oryx.",
    applyCta: "Register interest in Safety Officer Training",
    seeCurriculum: "See the Safety Officer Training curriculum",
    outlineLabel: "Outline",
    durationLabel: "Duration",
  },
} as const;

/* The homepage announcement pin, ANNOUNCEMENT.md verbatim structure. */
export const safetyAnnouncement = {
  en: {
    eyebrow: "Announcement · 01 Nov 2026",
    title: "Safety officer training, starting soon.",
    body: "Oryx Institute is opening enrolments for a Namibian occupational safety programme: one-day worker induction, five-day safety officer certification, and a ten-day advanced safety management course. Taught by a registered safety professional, examined on paper and on site. Cohort 1 intake dates and fees are published on the Practice page.",
    seeCurriculum: "See the Safety Officer Training curriculum",
    registerInterest: "Register interest in Safety Officer Training",
    pill: "New · Safety officer training",
    helmetAlt:
      "A matte forest-green hard hat seen from underneath, the X-strap suspension centred on cream",
    hornAlt:
      "A brass horn resting on cream paper, photographed as a quiet announcement object",
  },
  af: {
    eyebrow: "Announcement · 01 Nov 2026",
    title: "Safety officer training, starting soon.",
    body: "Oryx Institute is opening enrolments for a Namibian occupational safety programme: one-day worker induction, five-day safety officer certification, and a ten-day advanced safety management course. Taught by a registered safety professional, examined on paper and on site. Cohort 1 intake dates and fees are published on the Practice page.",
    seeCurriculum: "See the Safety Officer Training curriculum",
    registerInterest: "Register interest in Safety Officer Training",
    pill: "New · Safety officer training",
    helmetAlt:
      "A matte forest-green hard hat seen from underneath, the X-strap suspension centred on cream",
    hornAlt:
      "A brass horn resting on cream paper, photographed as a quiet announcement object",
  },
} as const;
