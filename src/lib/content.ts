/**
 * Oryx Institute — typed content model.
 * Source of truth: PRODUCT.md, BRAND.md, BUILD_PLAN.md, CONTENT_PLAN.md.
 * No fabricated facts. All unknown fields are "To be confirmed" or omitted.
 */

export type ProgrammeStatus = "Planned" | "Subject to accreditation" | "Register your interest";
export type ProgrammeLevel = "Certificate" | "Diploma" | "Short Course" | "To be confirmed";
export type ProgrammeDelivery = "Classroom" | "Blended" | "Workplace" | "Online";
export type SchoolSlug = "safety" | "administration" | "hospitality" | "digital" | "future";

export interface School {
  slug: SchoolSlug;
  index: string;
  name: string;
  shortName: string;
  eyebrow: string;
  status: ProgrammeStatus | "Applications not yet open";
  image: string;
  alt: string;
  caption: string;
  blurb: string;
  detail: {
    what: string;
    who: string;
    pathways: string[];
    plannedProgrammes: string[];
  };
}

export interface Programme {
  slug: string;
  name: string;
  school: SchoolSlug;
  schoolName: string;
  level: ProgrammeLevel;
  delivery: ProgrammeDelivery;
  status: ProgrammeStatus;
  duration: string;
  description: string;
  outcomes: string[];
  assessment: string;
  progression: string;
  image?: string;
  alt?: string;
}

export interface Update {
  slug: string;
  title: string;
  date: string;
  category: "Establishment" | "Programme" | "Public Notice" | "Event";
  excerpt: string;
  body: string;
}

export interface FaqItem {
  slug: string;
  category: "Programmes" | "Admissions" | "RPL" | "WIL" | "Fees" | "Campus" | "General";
  question: string;
  answer: string;
}

export interface Pathway {
  index: string;
  title: string;
  caption: string;
  detail: string;
}

export interface ValueItem {
  title: string;
  body: string;
}

/* =========================================================
   Schools
   ========================================================= */
export const schools: School[] = [
  {
    slug: "safety",
    index: "01",
    name: "School of Safety",
    shortName: "Safety",
    eyebrow: "School 01",
    status: "Planned",
    image: "/images/schools/safety-01.webp",
    alt: "An open portfolio with photographs of safety tools and equipment.",
    caption: "Safety, inspection, and occupational practice.",
    blurb:
      "Occupational safety, inspection, and security practice. Programmes planned for industries that need disciplined, safety-conscious staff.",
    detail: {
      what:
        "The School of Safety is planned to deliver vocational training in occupational safety, site inspection, fire safety, first aid, and security practice. Programmes will combine classroom learning with practical drills and supervised workplace assessment.",
      who:
        "School leavers seeking safety officer roles, working adults who need formal certification for existing duties, and employers who need disciplined, safety-conscious staff in construction, mining, hospitality, and retail.",
      pathways: ["Classroom learning", "Recognition of Prior Learning", "Work-integrated learning"],
      plannedProgrammes: [
        "Occupational Safety Foundations (planned)",
        "Site Safety Inspection (planned)",
        "Fire Safety Practice (planned)",
        "Workplace First Aid (planned)",
      ],
    },
  },
  {
    slug: "administration",
    index: "02",
    name: "School of Administration and Commerce",
    shortName: "Administration and Commerce",
    eyebrow: "School 02",
    status: "Planned",
    image: "/images/schools/administration-01.webp",
    alt: "An open notebook with a pen and a smooth stone arranged on a concrete surface.",
    caption: "Office, finance, and retail skills for the formal economy.",
    blurb:
      "Office administration, bookkeeping, retail, and front-office practice. Skills for the formal economy.",
    detail: {
      what:
        "The School of Administration and Commerce is planned to deliver training in office administration, bookkeeping, payroll, retail operations, customer service, and front-office practice. Programmes will combine classroom learning with workplace simulation and supervised placement.",
      who:
        "School leavers seeking office and retail roles, working adults seeking formal recognition of existing experience, and small businesses that need trained administrative staff.",
      pathways: ["Classroom learning", "Recognition of Prior Learning", "Work-integrated learning"],
      plannedProgrammes: [
        "Office Administration (planned)",
        "Bookkeeping and Payroll (planned)",
        "Retail Operations (planned)",
        "Front Office Practice (planned)",
      ],
    },
  },
  {
    slug: "hospitality",
    index: "03",
    name: "School of Hospitality and Tourism",
    shortName: "Hospitality and Tourism",
    eyebrow: "School 03",
    status: "Planned",
    image: "/images/schools/hospitality-01.webp",
    alt: "A service bell and a set of guest keys arranged on a wooden counter.",
    caption: "Hospitality, guiding, and tourism for a substantial visitor market in southern Africa.",
    blurb:
      "Hospitality operations, tour guiding, and food and beverage service. For a substantial visitor market in southern Africa.",
    detail: {
      what:
        "The School of Hospitality and Tourism is planned to deliver training in food and beverage service, front-of-house operations, housekeeping supervision, tour guiding, and visitor experience. Programmes will combine classroom learning with practical service drills and supervised workplace placement in hospitality venues.",
      who:
        "School leavers entering hospitality, working hospitality staff seeking formal certification, and tour guides seeking recognised qualifications.",
      pathways: ["Classroom learning", "Recognition of Prior Learning", "Work-integrated learning"],
      plannedProgrammes: [
        "Food and Beverage Service (planned)",
        "Front of House Operations (planned)",
        "Tour Guiding Practice (planned)",
        "Hospitality Supervision (planned)",
      ],
    },
  },
  {
    slug: "digital",
    index: "04",
    name: "School of Information and Digital Skills",
    shortName: "Information and Digital Skills",
    eyebrow: "School 04",
    status: "Planned",
    image: "/images/schools/digital-01.webp",
    alt: "A fountain pen resting on an open notebook near a stack of binders.",
    caption: "Digital literacy, hardware, and workplace technology.",
    blurb:
      "Digital literacy, hardware repair, and workplace technology. Practical digital skills for work and enterprise.",
    detail: {
      what:
        "The School of Information and Digital Skills is planned to deliver training in digital literacy, computer hardware repair, workplace productivity software, basic networking, and introductory web practice. Programmes will combine classroom learning with hands-on workshop time and supervised workplace placement.",
      who:
        "School leavers entering digital roles, working adults who need formal digital skills, and small businesses that need in-house technical staff.",
      pathways: ["Classroom learning", "Recognition of Prior Learning", "Work-integrated learning"],
      plannedProgrammes: [
        "Digital Literacy Foundations (planned)",
        "Computer Hardware Repair (planned)",
        "Workplace Productivity Practice (planned)",
        "Basic Network Setup (planned)",
      ],
    },
  },
  {
    slug: "future",
    index: "05",
    name: "Future Schools",
    shortName: "Future Schools",
    eyebrow: "School 05",
    status: "Applications not yet open",
    image: "/images/campus/blueprint.webp",
    alt: "An architectural blueprint with drafting tools laid out on a desk.",
    caption: "New schools will be announced as the institution grows.",
    blurb:
      "New schools will be announced as the institution grows. No disciplines are confirmed beyond the four above.",
    detail: {
      what:
        "Future Schools is a placeholder for disciplines that will be added as the institution grows. Possible directions include construction trades, agricultural practice, and creative industries. No future school is confirmed at this stage.",
      who:
        "Prospective learners, employers, and partners with an interest in disciplines not yet announced. Register your interest to be informed when new schools are confirmed.",
      pathways: ["To be confirmed"],
      plannedProgrammes: ["To be confirmed"],
    },
  },
];

/* =========================================================
   Programmes (a representative planned catalogue)
   ========================================================= */
export const programmes: Programme[] = [
  {
    slug: "occupational-safety-foundations",
    name: "Occupational Safety Foundations",
    school: "safety",
    schoolName: "School of Safety",
    level: "Certificate",
    delivery: "Classroom",
    status: "Planned",
    duration: "To be confirmed",
    description:
      "Occupational safety in Namibia demands more than rules on paper. This foundation programme teaches hazard recognition, incident reporting, and the habits that keep sites safe day to day. Classroom sessions build the knowledge; practical drills and supervised workplace assessment confirm that learners can act on it under real conditions.",
    outcomes: [
      "Identify common workplace hazards and apply correct reporting procedures",
      "Support site safety inspections under supervision",
      "Apply basic fire safety and first aid response procedures",
      "Communicate safety requirements to colleagues and contractors",
    ],
    assessment:
      "Assessment is planned around three pillars: written knowledge checks, practical drills under observation, and supervised workplace assessment against recognised standards. Experienced safety practitioners may apply for Recognition of Prior Learning (RPL) instead of repeating classroom modules they already command.",
    progression:
      "Learners who complete this foundation may progress to site safety inspection and workplace safety supervision. All progression depends on programme approval and accreditation.",
    image: "/images/programmes/clipboards-notebooks.webp",
    alt: "A row of clipboards and notebooks arranged on a counter.",
  },
  {
    slug: "site-safety-inspection",
    name: "Site Safety Inspection",
    school: "safety",
    schoolName: "School of Safety",
    level: "Certificate",
    delivery: "Blended",
    status: "Subject to accreditation",
    duration: "To be confirmed",
    description:
      "Construction sites, mines, and industrial plants need trained eyes that can spot trouble before it becomes an incident. This programme prepares learners for site safety inspection in those settings, mixing classroom regulatory knowledge with real site visits and supervised inspection practice where the hazards are live.",
    outcomes: [
      "Conduct systematic site safety inspections under supervision",
      "Document hazards, risks, and corrective actions",
      "Apply relevant safety regulations and codes of practice",
      "Communicate inspection findings to site management",
    ],
    assessment:
      "Candidates will be assessed through written regulatory checks, simulated inspection scenarios, and supervised live site inspections. Inspectors with documented field experience may seek RPL credit for competencies they already demonstrate.",
    progression:
      "The intended next step after this certificate is workplace safety supervision. Progression is contingent on programme approval by the relevant authority.",
    image: "/images/schools/safety-01.webp",
    alt: "An open portfolio with photographs of safety tools and equipment.",
  },
  {
    slug: "office-administration",
    name: "Office Administration",
    school: "administration",
    schoolName: "School of Administration and Commerce",
    level: "Certificate",
    delivery: "Classroom",
    status: "Planned",
    duration: "To be confirmed",
    description:
      "Every functioning office depends on people who keep communication flowing, records accurate, schedules coherent, and finances organised. This programme builds those practical skills through classroom instruction, workplace simulation exercises, and supervised placement in an operating office environment.",
    outcomes: [
      "Manage routine office communications and records",
      "Schedule appointments and coordinate meetings",
      "Apply basic bookkeeping and payroll procedures under supervision",
      "Use office productivity software to a working standard",
    ],
    assessment:
      "Verification of competence will involve written knowledge checks, practical office simulation tasks, and supervised workplace observation. Administrative staff with established workplace experience may apply for RPL to credit competencies already demonstrated.",
    progression:
      "Further study in office supervision and bookkeeping is planned for learners who complete this certificate. Accreditation must be confirmed before any progression pathway opens.",
    image: "/images/schools/administration-02.webp",
    alt: "A checklist, a rubber stamp, and a secure lockbox on a desk.",
  },
  {
    slug: "bookkeeping-and-payroll",
    name: "Bookkeeping and Payroll",
    school: "administration",
    schoolName: "School of Administration and Commerce",
    level: "Certificate",
    delivery: "Blended",
    status: "Subject to accreditation",
    duration: "To be confirmed",
    description:
      "Small businesses across Namibia rely on accurate bookkeeping and timely payroll, and both require more than entering numbers into a ledger. This programme covers the principles behind the entries, payroll processing obligations, and the financial reports managers actually need, with practical exercises on recognised accounting software throughout.",
    outcomes: [
      "Maintain accurate books of account for a small business",
      "Process payroll correctly and on time",
      "Prepare basic financial reports for management",
      "Apply relevant tax and labour regulations under supervision",
    ],
    assessment:
      "Learners will demonstrate competence through written checks, practical bookkeeping exercises on live accounting software, and supervised observation in a workplace setting. Experienced bookkeepers may apply for RPL, submitting portfolio evidence of competencies already held.",
    progression:
      "After completing this certificate, the intended progression path leads to payroll supervision and accounting technician practice. Each step requires confirmed accreditation before it becomes available.",
    image: "/images/schools/administration-04.webp",
    alt: "A laptop with a notebook and pen on a wooden desk.",
  },
  {
    slug: "food-and-beverage-service",
    name: "Food and Beverage Service",
    school: "hospitality",
    schoolName: "School of Hospitality and Tourism",
    level: "Certificate",
    delivery: "Workplace",
    status: "Planned",
    duration: "To be confirmed",
    description:
      "Serving food and drink well is a craft: timing, sequence, table awareness, and the ability to read a room. This programme trains learners in restaurant and event service through classroom sessions, practical service drills, and supervised placement in working hospitality venues where the pace is real.",
    outcomes: [
      "Provide attentive, professional food and beverage service",
      "Apply correct service sequence and table management",
      "Communicate confidently with guests and colleagues",
      "Maintain hygiene and safety standards during service",
    ],
    assessment:
      "Assessment is designed around written knowledge checks, practical service drills under trainer observation, and supervised workplace performance evaluation. Experienced hospitality staff may seek RPL credit for service competencies they already practise daily.",
    progression:
      "Completing this certificate opens the planned pathway to food and beverage supervision. Accreditation confirmation is required before the pathway activates.",
    image: "/images/schools/hospitality-01.webp",
    alt: "A service bell and a set of guest keys arranged on a wooden counter.",
  },
  {
    slug: "tour-guiding-practice",
    name: "Tour Guiding Practice",
    school: "hospitality",
    schoolName: "School of Hospitality and Tourism",
    level: "Certificate",
    delivery: "Blended",
    status: "Subject to accreditation",
    duration: "To be confirmed",
    description:
      "Namibia's landscapes, wildlife, and cultural heritage draw visitors from around the world, and those visitors need guides who can interpret what they see with accuracy and care. This programme covers guiding practice, visitor safety, and the natural and cultural knowledge that makes a tour meaningful, with classroom work, practical guiding drills, and supervised placement on live tours.",
    outcomes: [
      "Lead guided tours with confidence and care for visitors",
      "Interpret Namibian natural and cultural heritage accurately",
      "Apply safety procedures during tours",
      "Communicate professionally with guests, operators, and communities",
    ],
    assessment:
      "Candidates will demonstrate competence through written heritage and regulation checks, practical guiding drills, and supervised observation on actual tours. Guides with documented field experience may apply for RPL to credit competencies already demonstrated in practice.",
    progression:
      "The planned next step from this certificate is tour operations coordination and visitor experience supervision. Accreditation must be confirmed for this pathway to open.",
    image: "/images/programmes/student-portfolio.webp",
    alt: "A student reviewing a printed photo portfolio under warm light.",
  },
  {
    slug: "digital-literacy-foundations",
    name: "Digital Literacy Foundations",
    school: "digital",
    schoolName: "School of Information and Digital Skills",
    level: "Short Course",
    delivery: "Classroom",
    status: "Planned",
    duration: "To be confirmed",
    description:
      "For many working adults in Namibia, a computer is still an unfamiliar tool. This short course starts from the ground up: turning it on, managing files, using email, browsing safely, and running the productivity software offices expect. Classroom instruction pairs with hands-on workshop time so that every skill is practised until it sticks.",
    outcomes: [
      "Operate a computer confidently for routine workplace tasks",
      "Manage files and use productivity software to a working standard",
      "Use email and the internet safely and effectively",
      "Apply basic digital security practices",
    ],
    assessment:
      "Assessment will verify competence through written checks and practical exercises performed on a computer during workshop sessions. Adults who already use computers at work may apply for RPL to credit demonstrated digital skills.",
    progression:
      "Learners who complete this short course may move on to computer hardware repair or workplace productivity practice. Both progression options require confirmed accreditation.",
    image: "/images/schools/digital-02.webp",
    alt: "A minimalist flat-lay of a laptop and a stationery set on a warm surface.",
  },
  {
    slug: "computer-hardware-repair",
    name: "Computer Hardware Repair",
    school: "digital",
    schoolName: "School of Information and Digital Skills",
    level: "Certificate",
    delivery: "Classroom",
    status: "Subject to accreditation",
    duration: "To be confirmed",
    description:
      "When a desktop stops booting or a laptop screen flickers, someone needs to diagnose the fault, open the case, and fix it without guessing. This programme trains learners in hardware diagnosis, component repair, and preventative maintenance for personal computers and small office systems, with workshop time on real machines and supervised placement in a repair environment.",
    outcomes: [
      "Diagnose common computer hardware faults",
      "Repair and maintain personal computers and small office systems",
      "Apply correct safety and electrostatic protection procedures",
      "Communicate technical information to non-technical users",
    ],
    assessment:
      "Competence will be verified through written technical checks, practical repair exercises on live hardware, and supervised observation in a workplace repair setting. Technicians with proven workshop experience may apply for RPL to credit repair competencies already demonstrated.",
    progression:
      "From this certificate, the planned route leads to basic network setup and IT support practice. Accreditation must be confirmed before progression opens.",
    image: "/images/schools/digital-03.webp",
    alt: "A modern computer lab with laptops arranged on long desks.",
  },
];

/* =========================================================
   Pathways
   ========================================================= */
export const pathways: Pathway[] = [
  {
    index: "01",
    title: "Classroom learning",
    caption: "Structured learning in minimal, focused classrooms.",
    detail:
      "Classroom learning at Oryx Institute will be structured, focused, and methodical. Small cohorts. Minimal, warm classrooms. Trainers who combine teaching with current workplace practice. Every classroom module feeds into assessment and progression.",
  },
  {
    index: "02",
    title: "Recognition of Prior Learning",
    caption: "Your experience assessed. RPL is not automatic certification.",
    detail:
      "Recognition of Prior Learning (RPL) assesses demonstrated competence against recognised standards. RPL is for experienced workers who can show what they can do. RPL is not automatic certification. Every RPL candidate completes the same assessment as classroom learners.",
  },
  {
    index: "03",
    title: "Work-integrated learning",
    caption: "Real workplaces. Real supervision. Real assessment.",
    detail:
      "Work-integrated learning (WIL) places learners in real workplaces for supervised practice. WIL is not work experience. WIL is structured, assessed, and credited. Employer partners host learners, supervise their practice, and contribute to assessment.",
  },
  {
    index: "04",
    title: "Assessment",
    caption: "Competence verified against recognised standards.",
    detail:
      "Every pathway at Oryx Institute leads to assessment. Assessment is not automatic. Assessment verifies that a learner can demonstrate competence against recognised standards. Assessment methods depend on the programme and may include written checks, practical observation, and workplace evidence.",
  },
  {
    index: "05",
    title: "Progression",
    caption: "From short courses to qualifications. Subject to accreditation.",
    detail:
      "Oryx Institute intends to support progression from short courses to certificates to diplomas. Progression depends on programme approval, learner numbers, and institutional capacity. No progression is guaranteed until programmes are approved.",
  },
];

/* =========================================================
   Values
   ========================================================= */
export const values: ValueItem[] = [
  {
    title: "Discipline",
    body: "Structured learning, real assessment, no shortcuts.",
  },
  {
    title: "Honesty",
    body: "Verified facts only. No fabricated claims. No inflated language.",
  },
  {
    title: "Namibia",
    body: "Rooted in place. Serving Namibian learners and employers.",
  },
  {
    title: "Multiple pathways",
    body: "Classroom, RPL, WIL. Not one size fits all.",
  },
  {
    title: "Restraint",
    body: "Quiet, minimal, architectural. Not loud, not generic.",
  },
];

/* =========================================================
   Updates (empty in pre-launch with honest empty state)
   ========================================================= */
export const updates: Update[] = [];

/* =========================================================
   FAQ
   ========================================================= */
export const faqs: FaqItem[] = [
  {
    slug: "is-oryx-open",
    category: "General",
    question: "Is Oryx Institute open?",
    answer:
      "No. Oryx Institute is being established. It is not yet operating. Programmes are planned and subject to approval. No learners are enrolled at this stage. Register your interest to be informed when the institution reaches its next milestone.",
  },
  {
    slug: "where-is-oryx-located",
    category: "Campus",
    question: "Where is Oryx Institute located?",
    answer:
      "Oryx Institute is being established in Windhoek, Namibia. The exact campus address has not been confirmed. The campus concept on this site is an architectural concept, not a completed facility.",
  },
  {
    slug: "when-do-admissions-open",
    category: "Admissions",
    question: "When do admissions open?",
    answer:
      "Admissions will open when the institution is established and programmes are approved. No date is published yet. Public marketing begins approximately four months before classes open. Register your interest to be informed when admissions open.",
  },
  {
    slug: "what-programmes-are-offered",
    category: "Programmes",
    question: "What programmes are offered?",
    answer:
      "Programmes are planned across five schools: Safety, Administration and Commerce, Hospitality and Tourism, Information and Digital Skills, and Future Schools. Every programme is planned and subject to approval. Browse the programme catalogue on the Programmes page.",
  },
  {
    slug: "are-programmes-accredited",
    category: "Programmes",
    question: "Are programmes accredited?",
    answer:
      "No. Programmes are planned and subject to approval. No accreditation is claimed until verified. Any status label on this site reflects the current planning status, not formal accreditation.",
  },
  {
    slug: "what-is-rpl",
    category: "RPL",
    question: "What is Recognition of Prior Learning?",
    answer:
      "Recognition of Prior Learning (RPL) assesses demonstrated competence against recognised standards. RPL is for experienced workers who can show what they can do. RPL is not automatic certification. Every RPL candidate completes the same assessment as classroom learners.",
  },
  {
    slug: "what-is-wil",
    category: "WIL",
    question: "What is work-integrated learning?",
    answer:
      "Work-integrated learning (WIL) places learners in real workplaces for supervised practice. WIL is not work experience. WIL is structured, assessed, and credited. Employer partners host learners, supervise their practice, and contribute to assessment.",
  },
  {
    slug: "what-are-the-fees",
    category: "Fees",
    question: "What are the fees?",
    answer:
      "Fees are to be confirmed. No fee schedule is published yet. Funding pathways are under exploration. Register your interest for updates when fees are confirmed.",
  },
  {
    slug: "can-i-register-interest",
    category: "Admissions",
    question: "Can I register my interest now?",
    answer:
      "Yes. The Register Interest form on this page captures your name, contact details, programme of interest, and a few optional questions about your background. We will contact you when admissions open. Your data is stored securely and used only to contact you about Oryx Institute.",
  },
  {
    slug: "how-can-employers-partner",
    category: "General",
    question: "How can employers partner with Oryx Institute?",
    answer:
      "Employers can register interest in hosting WIL placements, commissioning organisational training, or contributing to programme design. Use the relevant enquiry form on this page. We will respond to genuine enquiries.",
  },
];

/* =========================================================
   Navigation — real Next.js routes (multi-page)
   ========================================================= */
export const primaryNav: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Schools", href: "/schools" },
  { label: "Programmes", href: "/programmes" },
  { label: "Partners", href: "/partners" },
  { label: "Research", href: "/research" },
  { label: "Updates", href: "/updates" },
  { label: "FAQ", href: "/faq" },
];

export const secondaryNav: { label: string; href: string }[] = [
  { label: "Founder", href: "/founder" },
  { label: "Brand", href: "/brand" },
  { label: "Contact", href: "/contact" },
  { label: "Register Interest", href: "/register" },
];

export const partnerNav: { label: string; href: string }[] = [
  { label: "Employer enquiry", href: "/partners/employers" },
  { label: "WIL partner enquiry", href: "/partners/wil" },
  { label: "Corporate training", href: "/partners/corporate" },
  { label: "Research & advisory", href: "/partners/research" },
  { label: "Funding & partnership", href: "/partners/funding" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: { label: string; href: string }[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Accessibility", href: "/legal/accessibility" },
  { label: "Sitemap", href: "/site-map" },
];

/* =========================================================
   Hero slides
   ========================================================= */
export const heroSlides: {
  image: string;
  alt: string;
  headline: string;
  supporting: string;
}[] = [
  {
    image: "/images/brand/oryx-dune.webp",
    alt: "An oryx stands alone on a Namibian dune at sunrise, with a wide pale sky above.",
    headline: "Practical skills. Recognised standards.",
    supporting:
      "A multidisciplinary vocational education and training institution being established in Windhoek, Namibia.",
  },
  {
    image: "/images/campus/arched-corridor.webp",
    alt: "An architectural detail of a warm sandstone wall with strong morning shadow.",
    headline: "Skills shaped by Namibia's realities.",
    supporting: "Quiet, rigorous, and built for the work Namibia needs.",
  },
  {
    image: "/images/research/leather-books.webp",
    alt: "A stack of well-worn technical books on a warm wooden desk in soft directional light.",
    headline: "One institution. Many pathways.",
    supporting:
      "Classroom learning, recognition of prior learning, and work-integrated learning.",
  },
  {
    image: "/images/campus/building-entrance.webp",
    alt: "A wide empty Windhoek highveld landscape at dawn with distant acacia trees.",
    headline: "A place for committed learning.",
    supporting: "Minimal, warm, and architectural. A campus designed for focus.",
  },
  {
    image: "/images/programmes/clipboards-notebooks.webp",
    alt: "Skilled hands working on a mechanical training bench in warm window light.",
    headline: "Learning shaped by Namibia.",
    supporting: "Programmes planned across five schools. Subject to accreditation.",
  },
];
