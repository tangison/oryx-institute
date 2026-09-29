/**
 * The Oryx Directory · the institute's free resource library.
 * Four Namibia-specific crash courses and seven business templates,
 * transcribed from the approved master package (05_Directory) with the
 * site's punctuation register applied. Every figure keeps its source
 * note. Nothing here is advice; every page says so.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "list"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] };

export type Section = {
  heading: string;
  walkaway?: string;
  blocks: Block[];
};

export type Doc = {
  slug: string;
  kind: "course" | "template";
  no: string;
  title: string;
  standfirst: string;
  readMinutes: number;
  updated: string;
  sections: Section[];
  sourceNote: string;
};

export const COPYRIGHT_LINE =
  "\u00A9 Oryx Polytechnic Institute. All rights reserved.";
export const FREE_LINE =
  "Free to access, copyrighted to Oryx Polytechnic Institute. Not open-source: use it, learn from it, do not republish it as your own.";

export const directoryCourses: Doc[] = [
  {
    slug: "registering-a-business-in-namibia",
    kind: "course",
    no: "Course 01",
    title: "Registering a Business in Namibia",
    standfirst:
      "Which legal form fits your business, how the BIPA name reservation really works, and the registrations that come after the certificate.",
    readMinutes: 9,
    updated: "September 2026",
    sections: [
      {
        heading: "Choosing a structure",
        walkaway:
          "Which legal form fits a business your size, before you file anything.",
        blocks: [
          {
            t: "p",
            text: "Namibia's common structures: a Sole Proprietorship (no separate legal entity, owner personally liable, simplest and cheapest to start), a Close Corporation or CC (separate legal entity, up to 10 members, simpler governance than a company, the long-standing default for small Namibian businesses), and a Private Company or Pty Ltd (separate legal entity, shareholders and directors, more formal governance, usually preferred once external investment or larger operations are involved).",
          },
          {
            t: "table",
            head: ["Structure", "Liability", "Best for"],
            rows: [
              ["Sole Proprietorship", "Personal, unlimited", "Solo consultants, very early testing"],
              ["Close Corporation (CC)", "Limited to the entity", "Small-to-mid businesses, the Namibian default"],
              ["Private Company (Pty Ltd)", "Limited to the entity", "Businesses planning investment or larger scale"],
            ],
          },
        ],
      },
      {
        heading: "Reserving your name",
        walkaway: "The exact form and the two ways it can go.",
        blocks: [
          {
            t: "p",
            text: "Name reservation is filed with the Business and Intellectual Property Authority (BIPA). The form requires: applicant details, the proposed name(s) in order of preference, the principal business activity, and a signature. Office use sections record whether the name is approved, and a reservation is valid for sixty days once approved. The entity must be registered within that window or the reservation lapses.",
          },
          {
            t: "p",
            text: "Worked example, from a real Oryx filing: the principal business activity was described plainly, \"Education and Training. Research and Development Advisory Services, Capacity Development, Support and Related Services\", broad enough to cover training delivery, consulting, and programme development under one registration, rather than needing separate entities for each.",
          },
        ],
      },
      {
        heading: "Registering the entity",
        walkaway: "What happens after the name is approved.",
        blocks: [
          {
            t: "p",
            text: "Once a name is reserved, the entity itself is registered with BIPA against that name. A CC or Pty Ltd requires founding documents (for a CC, a founding statement; for a Pty Ltd, a memorandum of incorporation), details of members or directors, and the registered address. Only after this step does the business legally exist as a separate entity, distinct from the applicant personally.",
          },
        ],
      },
      {
        heading: "What comes after registration",
        walkaway: "The registrations that follow, not just the one everyone remembers.",
        blocks: [
          {
            t: "p",
            text: "Registration with BIPA is the start, not the finish. Depending on the business:",
          },
          {
            t: "list",
            items: [
              "NamRA: income tax and, if turnover will exceed N$1,000,000, VAT.",
              "Social Security Commission: mandatory once you have employees.",
              "Sector regulators: NQA/NTA for training providers, NAMFISA for financial services, and others depending on industry.",
            ],
          },
        ],
      },
      {
        heading: "Common mistakes",
        blocks: [
          {
            t: "list",
            items: [
              "Filing a name reservation without checking the sixty-day clock, then losing it to a lapse.",
              "Registering as a sole proprietorship for a business that will clearly need investment or limited liability later: cheaper now, expensive to unwind later.",
              "Treating BIPA registration as the finish line rather than the first of several registrations a real operating business needs.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "Based on BIPA's standard Name Reservation application form and general BIPA registration procedure. For a specific filing, confirm current forms and fees directly with BIPA, as procedures are periodically updated.",
  },
  {
    slug: "nqa-nta-accreditation-explained",
    kind: "course",
    no: "Course 02",
    title: "NQA & NTA Accreditation, Explained",
    standfirst:
      "Two bodies, two different jobs: which authority governs which kind of training, what actually gets checked, and why the NTA route is funded, not just recognized.",
    readMinutes: 9,
    updated: "September 2026",
    sections: [
      {
        heading: "Two bodies, two different jobs",
        walkaway:
          "Which authority governs which kind of training, so you stop applying to the wrong one.",
        blocks: [
          {
            t: "p",
            text: "Namibia runs two separate accreditation systems, and confusing them wastes months. The Namibia Qualifications Authority (NQA) registers qualifications and quality-assures education and training broadly: the general system a new institution or curriculum typically works through. The Namibia Training Authority (NTA), established under the Vocational Education and Training Act of 2008, regulates vocational and skills-based training specifically, including short, employer-focused Skills Programmes, apprenticeships, and learnerships.",
          },
          {
            t: "table",
            head: ["Body", "Governs", "Typical fit"],
            rows: [
              ["NQA", "Qualifications broadly, quality assurance", "New institutions, formal multi-year qualifications"],
              ["NTA", "Vocational and skills training", "Short courses, trade skills, employer-driven programmes"],
            ],
          },
        ],
      },
      {
        heading: "What the NQA evaluates",
        walkaway: "What actually gets checked before a provider is registered.",
        blocks: [
          {
            t: "p",
            text: "NQA accreditation assesses a provider's staffing, facilities, and equipment against what the specific course requires. A lab- or workshop-based course (engineering, sciences) carries a materially higher accreditation bar than a laptop-based digital course, because the facilities and equipment evidence required is heavier. Processing, once an application is filed by a properly registered entity, typically runs three to six months. Accreditation is granted per course, not blanket for an institution, and is generally valid for a fixed period before renewal (commonly cited around three years).",
          },
        ],
      },
      {
        heading: "The NTA route: funded, not just recognized",
        walkaway: "Why this route matters even more than the credential itself.",
        blocks: [
          {
            t: "p",
            text: "The NTA does not only recognize training. It funds it, through a National Training Fund built from a VET levy Namibian employers already pay. Registered NTA providers can access funded training slots, meaning revenue is not only tuition from individual students; it can come from the levy pool itself. The NTA's National Vocational Certificate categories already include ICT (Foundation, Computer Systems Support, Web Development and Networking) and Preventative Health (Occupational Health and Safety), both directly relevant to programme lines already under consideration.",
          },
        ],
      },
      {
        heading: "Registering as a provider",
        walkaway: "The sequencing that avoids wasted paperwork.",
        blocks: [
          {
            t: "p",
            text: "The general order: legal entity registration (BIPA) first, since both the NQA and the NTA require a properly registered entity before an application is considered. Then the accreditation application itself, scoped to the specific courses being offered, with evidence of staffing, facilities and equipment, and curriculum design submitted for review.",
          },
        ],
      },
      {
        heading: "The practical takeaway",
        blocks: [
          {
            t: "p",
            text: "A digital-first course line (web development, digital marketing, computer literacy) is accreditation-light on the facilities and equipment criterion compared to a lab-based one. That is exactly why sequencing digital courses first, while a physical training center is still in planning, is the lower-risk path rather than a compromise.",
          },
        ],
      },
    ],
    sourceNote:
      "Based on NQA and NTA's publicly described mandates and accreditation criteria. Processing times and validity periods should be reconfirmed directly with NQA/NTA at the time of filing, as these are subject to change.",
  },
  {
    slug: "namibian-labour-law-basics",
    kind: "course",
    no: "Course 03",
    title: "Namibian Labour Law Basics",
    standfirst:
      "The written contract, the leave minimums, the overtime ceiling, and why Namibia is not an employment-at-will jurisdiction.",
    readMinutes: 10,
    updated: "September 2026",
    sections: [
      {
        heading: "The contract, in writing, always",
        walkaway: "What a valid Namibian employment contract must contain.",
        blocks: [
          {
            t: "p",
            text: "The Labour Act 11 of 2007 requires a written contract for every employee. This is not optional. At minimum it must state job title and duties, salary and payment cycle, working hours (statutory maximum 45 hours per week), leave entitlements, and termination terms. Contracts are either indefinite (no end date, the standard form) or fixed-term (a specific period or project). Repeated fixed-term contracts for the same ongoing work can be deemed indefinite by the Labour Court, so fixed-term status is not a loophole around permanent-employee rights.",
          },
        ],
      },
      {
        heading: "Leave, in full",
        walkaway: "The minimums that apply regardless of what a contract says.",
        blocks: [
          {
            t: "table",
            head: ["Leave type", "Minimum"],
            rows: [
              ["Annual leave", "24 consecutive days per 12-month cycle (pro-rated to days worked per week)"],
              ["Maternity leave", "12 weeks, paid at 80% via the Social Security Commission"],
              ["Sick leave", "Accumulates based on length of employment"],
              ["Public holidays", "Paid, per the national calendar"],
            ],
          },
          {
            t: "p",
            text: "Annual leave accrues through the first year but cannot be taken until that year completes. Unused leave generally must be used within four months of the cycle's end (extendable to six months by written agreement). An employer cannot let leave balances run indefinitely without a policy governing it.",
          },
        ],
      },
      {
        heading: "Pay and overtime",
        walkaway: "Where the legal floor actually sits.",
        blocks: [
          {
            t: "p",
            text: "Statutory minimum wage sits at roughly N$1,564/month in commonly cited figures. Confirm current gazetted rates before relying on this for payroll, as minimum wage determinations are sector-specific and periodically revised. Overtime may not exceed 10 hours per week or 3 hours per day, and must be agreed, not unilaterally imposed by the employer. It is paid at 1.5 times the basic hourly rate, rising to 2 times for Sundays and public holidays.",
          },
        ],
      },
      {
        heading: "Termination: notice and severance",
        walkaway: "Why Namibia is not an employment-at-will jurisdiction.",
        blocks: [
          {
            t: "p",
            text: "Termination requires a valid, fair reason and a fair procedure. Dismissal without both can be ruled unfair regardless of notice given. Minimum notice periods scale with service:",
          },
          {
            t: "table",
            head: ["Length of service", "Minimum notice"],
            rows: [
              ["Under 4 weeks", "1 day"],
              ["4 weeks to 1 year", "1 week"],
              ["Over 1 year", "1 month"],
            ],
          },
          {
            t: "p",
            text: "Severance pay is generally calculated at one week's pay per year of service, and is not payable where dismissal was for a valid reason properly conducted. It applies to termination generally, not as a penalty exclusive to unfair dismissal.",
          },
        ],
      },
      {
        heading: "Registration obligations as an employer",
        blocks: [
          {
            t: "p",
            text: "Before hiring, an employer must register with the Ministry of Labour, the Social Security Commission (SSC: 0.9% employee and 0.9% employer contribution in commonly cited figures), and NamRA for PAYE. Non-Namibian hires require a work permit through the Ministry of Home Affairs, arranged well in advance.",
          },
        ],
      },
    ],
    sourceNote:
      "Based on the Labour Act 11 of 2007 and commonly published employer guidance. This is not legal advice. For a specific dismissal, contract dispute, or sector-specific requirement, consult a qualified Namibian labour lawyer.",
  },
  {
    slug: "insurance-in-namibia",
    kind: "course",
    no: "Course 04",
    title: "Insurance in Namibia",
    standfirst:
      "Who regulates insurance, why there are two separate regimes, and the rule that surprises most people: commission only, no exceptions.",
    readMinutes: 10,
    updated: "September 2026",
    sections: [
      {
        heading: "Who regulates insurance here",
        walkaway: "The one name that matters before you trust anyone selling insurance.",
        blocks: [
          {
            t: "p",
            text: "The Namibia Financial Institutions Supervisory Authority (NAMFISA), established under Act No. 3 of 2001, regulates and supervises all financial institutions and services in Namibia, insurance included. As of 1 May 2026, insurers also operate under a new prudential framework set by the Financial Institutions and Markets Act (FIMA): a significant, recent shift in how capital adequacy and governance are assessed, not a legacy rulebook.",
          },
        ],
      },
      {
        heading: "Two separate insurance regimes",
        walkaway: "Why insurance is not one licence.",
        blocks: [
          {
            t: "p",
            text: "Namibia separates Long-Term Insurance (life, funeral, retirement-linked products) from Short-Term Insurance (motor, property, liability and similar), each governed by its own Act (the Long-Term Insurance Act and the Short-Term Insurance Act, both 1998, now operating alongside FIMA). A broker or agent typically registers against the specific category they operate in, not a single blanket insurance licence.",
          },
        ],
      },
      {
        heading: "Only registered intermediaries may operate. No exceptions.",
        walkaway: "Why this is a criminal matter, not just a compliance nicety.",
        blocks: [
          {
            t: "p",
            text: "Nobody may act as an insurance agent, broker, or reinsurance broker in Namibia unless registered with NAMFISA. This applies to anyone performing the duties, including clerks and salespeople, regardless of whether insurance is their core role or an occasional task. Transacting through an unregistered agent or broker is a criminal offence, with convictions carrying fines of up to N$150,000, up to 10 years' imprisonment, or both. The public can and should request proof of registration before transacting.",
          },
        ],
      },
      {
        heading: "How agents and brokers are paid",
        walkaway: "The one rule that surprises most people outside the industry.",
        blocks: [
          {
            t: "p",
            text: "Registered agents and brokers must be remunerated exclusively by commission, in monetary form. Salary-based compensation for this role is not permitted, and neither are non-monetary perks (overseas trips, expensive gifts) on top of commission. This has applied since the 2014 directives and remains a live compliance point NAMFISA actively enforces.",
          },
        ],
      },
      {
        heading: "Registering as a broker",
        walkaway: "The actual sequence, not just \"apply to NAMFISA\".",
        blocks: [
          {
            t: "p",
            text: "The process runs through NAMFISA's Online Electronic Regulatory System (ERS): create a profile, reserve the proposed entity name, then complete and submit the Application for Registration Form online, accompanied by the required supporting documents and the application fee. A submitted application shows as \"pending approval\" until processed. This is not instant.",
          },
        ],
      },
      {
        heading: "Why this matters beyond the insurance industry itself",
        blocks: [
          {
            t: "p",
            text: "For Oryx specifically: any future Oryx product involving insurance-linked advice or distribution would fall under this exact regime. This course is not only for people entering insurance as a career; it is a boundary map for what any business can and cannot say about insurance without a NAMFISA registration.",
          },
        ],
      },
    ],
    sourceNote:
      "Based on NAMFISA's published regulatory guidance, the Long-Term and Short-Term Insurance Acts, and FIMA (2021), in force from 1 May 2026. This is a plain-language reference, not financial or legal advice. Confirm current requirements directly with NAMFISA before acting.",
  },
];

export const directoryTemplates: Doc[] = [
  {
    slug: "letterhead-template",
    kind: "template",
    no: "Template 01",
    title: "Letterhead",
    standfirst:
      "The correspondence register: who you are, where you write from, one idea per paragraph.",
    readMinutes: 2,
    updated: "September 2026",
    sections: [
      {
        heading: "The template",
        blocks: [
          { t: "p", text: "Your business name, with a tagline or registered activity on one line, and your contact line: P.O. Box, town, Namibia, phone, email, website." },
          { t: "p", text: "Then the letter itself: date, recipient name and title, address, and \"Dear [Recipient]\". The body carries one idea per paragraph, plain language, no filler. It closes \"Yours sincerely\" over a signature, name and title." },
        ],
      },
    ],
    sourceNote: "A structure, not a legal document. Fill every bracket before use.",
  },
  {
    slug: "business-plan-template",
    kind: "template",
    no: "Template 02",
    title: "Business Plan",
    standfirst:
      "Ten sections, written in the order that keeps you honest: the executive summary comes last.",
    readMinutes: 6,
    updated: "September 2026",
    sections: [
      {
        heading: "The ten sections",
        blocks: [
          { t: "list", items: [
            "Executive summary, written last: what the business does in one sentence, the problem and for whom in two, the solution and why it is different in two, the market opportunity in one sentence with a number, and what you are asking for.",
            "Company overview: legal name and structure, stage (idea, pre-revenue, early revenue, growing), mission statement, location and operating model, founding date.",
            "Problem and solution: who feels the problem, how often, what it costs them, with evidence; the before and after; what changed that makes this the right time.",
            "Market analysis: market size with sources, the top three trends, primary customer segments, target segment size and reachability.",
            "Competitive landscape: a table of competitor, strength, and where you win; your wedge, the table stakes you must match, the gaps you fill.",
            "Business and revenue model: channels, sales flow, revenue streams and pricing, a bottom-up year one projection with the math shown, unit economics.",
            "Operations plan: delivery, technology stack, key recurring processes, automation plan, the outsourcing trigger.",
            "Marketing and sales plan: positioning statement, the first two to three channels and why, content strategy, sales approach, acquisition targets and CAC budget.",
            "Financial projections: monthly for year one, quarterly for years two and three, every projection labelled conservative or optimistic, never a bare number with no math shown. Break-even, runway, cash flow timing risks.",
            "Risk assessment: a table of risk, likelihood, impact, mitigation.",
          ] },
        ],
      },
    ],
    sourceNote: "A working structure, the same one the institute used for its own plan. Assumptions are labelled; none of it is financial advice.",
  },
  {
    slug: "financial-projections-template",
    kind: "template",
    no: "Template 03",
    title: "Financial Projections",
    standfirst:
      "Monthly for year one, quarterly for years two and three, with every figure marked as an assumption until it is an actual.",
    readMinutes: 4,
    updated: "September 2026",
    sections: [
      {
        heading: "Assumptions first",
        blocks: [
          { t: "list", items: [
            "Price per unit or customer: N$[amount]",
            "Customers acquired per month, year one: [number]",
            "Monthly growth rate assumption: [percent]",
            "Cost of delivery per customer: N$[amount]",
          ] },
        ],
      },
      {
        heading: "Year one, monthly",
        blocks: [
          { t: "table",
            head: ["Month", "Customers", "Revenue", "Cost of delivery", "Marketing", "Tools/Infra", "Contractors", "Gross profit", "Net profit/loss"],
            rows: [
              ["1 to 12", "", "", "", "", "", "", "", ""],
            ] },
          { t: "p", text: "One row per month, January to December. Every cell either carries a number you can point to or stays empty. An empty cell is honest; a guessed number is not." },
        ],
      },
      {
        heading: "Years two and three, quarterly",
        blocks: [
          { t: "table",
            head: ["Quarter", "Revenue", "Total costs", "Gross profit", "Net profit/loss"],
            rows: [
              ["Y2 Q1", "", "", "", ""],
              ["Y2 Q2", "", "", "", ""],
              ["Y2 Q3", "", "", "", ""],
              ["Y2 Q4", "", "", "", ""],
              ["Y3 Q1 to Q4", "", "", "", ""],
            ] },
        ],
      },
      {
        heading: "Scenarios and thresholds",
        blocks: [
          { t: "p", text: "A conservative scenario whose assumptions should still be a viable business, and an optimistic one, each with its assumptions written out. Then the three thresholds: break-even revenue, runway at current burn, and the known cash flow spikes (launch, seasonal)." },
        ],
      },
    ],
    sourceNote: "A working structure. None of it is financial advice; label every figure as an assumption unless it is an actual.",
  },
  {
    slug: "invoice-quotation-template",
    kind: "template",
    no: "Template 04",
    title: "Invoice / Quotation",
    standfirst:
      "One page, two documents: what you bill and what you promise, both with the VAT line handled correctly.",
    readMinutes: 3,
    updated: "September 2026",
    sections: [
      {
        heading: "The invoice",
        blocks: [
          { t: "p", text: "Your business name and contact line at the top, then invoice number, date, and due date. \"Bill to\" carries the client name and address. A table of description, quantity, unit price and total follows, then subtotal, VAT at 15% if you are registered, and the total due. Payment details close it: bank or mobile money." },
        ],
      },
      {
        heading: "The quotation",
        blocks: [
          { t: "p", text: "Quote number, date, and a validity date. \"Prepared for\" carries the client name. The same table of description, quantity, unit price and total, then subtotal, VAT at 15% if registered, and the total. One line closes it: this quotation is valid for [number] days from the date above." },
        ],
      },
    ],
    sourceNote: "VAT is 15% for VAT-registered businesses. If you are not registered, you do not charge VAT. Confirm your registration status with NamRA.",
  },
  {
    slug: "nda-template",
    kind: "template",
    no: "Template 05",
    title: "Non-Disclosure Agreement",
    standfirst:
      "Purpose, obligations, exclusions, term: the four clauses a working NDA needs, governed by Namibian law.",
    readMinutes: 3,
    updated: "September 2026",
    sections: [
      {
        heading: "The clauses",
        blocks: [
          { t: "list", items: [
            "Purpose: what the parties wish to discuss (a potential partnership, engagement, or project), during which confidential information may be shared.",
            "Confidential information: business, technical, financial or strategic information disclosed in connection with the purpose, written, verbal or observed, marked confidential or reasonably understood to be so.",
            "Obligations: use the information solely for the purpose, do not disclose it to third parties without written consent, protect it with at least the same care used for the receiver's own confidential information.",
            "Exclusions: information that is or becomes public through no fault of the receiving party, was already known before disclosure, or is independently developed without reference to the disclosed information.",
            "Term: the agreement remains in effect for a set number of years from the date, or until superseded by a further written agreement.",
            "Governing law: the laws of the Republic of Namibia.",
          ] },
          { t: "p", text: "Signature blocks for the disclosing and receiving parties close the agreement, each with a date." },
        ],
      },
    ],
    sourceNote: "Template for reference only. Have a qualified attorney review before use in a specific matter.",
  },
  {
    slug: "employment-contract-template",
    kind: "template",
    no: "Template 06",
    title: "Employment Contract",
    standfirst:
      "The statutory minimums built in: hours, overtime, leave and notice, per the Labour Act 11 of 2007.",
    readMinutes: 4,
    updated: "September 2026",
    sections: [
      {
        heading: "The clauses",
        blocks: [
          { t: "list", items: [
            "Position: job title and duties.",
            "Commencement and term: start date, indefinite or fixed-term with the end date or project named.",
            "Remuneration: basic salary per month or week and the payment cycle, with deductions stated (PAYE, the 0.9% Social Security Commission employee contribution, others).",
            "Working hours: per week up to the statutory maximum of 45. Overtime by agreement only, paid at 1.5 times the basic hourly rate (2 times on Sundays and public holidays), not exceeding 10 hours a week or 3 hours a day.",
            "Leave: 24 consecutive days annual leave per 12-month cycle (statutory minimum, pro-rated to days worked per week); sick leave, maternity leave and public holidays per the Labour Act 11 of 2007.",
            "Termination: the notice period per length of service under the Act (1 day, 1 week, or 1 month). Termination requires a valid, fair reason and a fair procedure.",
            "Other terms: probation period, confidentiality, place of work, any additional benefits.",
          ] },
          { t: "p", text: "Signature and date blocks for employer and employee close the contract." },
        ],
      },
    ],
    sourceNote: "Template for reference only, reflecting general requirements under the Labour Act 11 of 2007. Not legal advice: have a qualified Namibian labour lawyer review before use, especially for senior or non-standard roles.",
  },
  {
    slug: "meeting-minutes-template",
    kind: "template",
    no: "Template 07",
    title: "Meeting Minutes",
    standfirst:
      "Who met, what was decided, who owns it, when it is due. Nothing else survives the week.",
    readMinutes: 2,
    updated: "September 2026",
    sections: [
      {
        heading: "The structure",
        blocks: [
          { t: "list", items: [
            "Header: meeting title, date, time, location or platform, attendees, apologies.",
            "Agenda: numbered items.",
            "Discussion and decisions: a table of item, discussion summary, decision, owner, and due date.",
            "Action items: each action with its owner and due date, ticked off as done.",
            "Next meeting: date.",
          ] },
        ],
      },
    ],
    sourceNote: "A working structure. Minutes record decisions and actions, not conversation.",
  },
];

/** All eleven documents, courses first. */
export const directoryAll: Doc[] = [...directoryCourses, ...directoryTemplates];

export function getDoc(slug: string): Doc | undefined {
  return directoryAll.find((d) => d.slug === slug);
}
