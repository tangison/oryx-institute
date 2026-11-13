/**
 * The Oryx Directory · the institute's free resource library.
 *
 * Each legal or regulatory statement is tied to a source in the public
 * source ledger. The pages are practical learning material, not advice.
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

export type DirectorySource = {
  id: string;
  title: string;
  authority: string;
  url: string;
  scope: string;
};

export type RelatedResource = {
  title: string;
  body: string;
  href: string;
};

export type Doc = {
  slug: string;
  kind: "course" | "template";
  no: string;
  title: string;
  standfirst: string;
  readMinutes: number;
  updated: string;
  reviewedIso: string;
  sections: Section[];
  sourceNote: string;
  sources?: DirectorySource[];
  related?: RelatedResource[];
};

export const COPYRIGHT_LINE =
  "© Oryx Polytechnic Institute. All rights reserved.";
export const FREE_LINE =
  "Free to access, copyrighted to Oryx Polytechnic Institute. Not open-source: use it, learn from it, do not republish it as your own.";

/**
 * Public legal sources used in this release. The canonical consolidated
 * documents are hosted by the Legal Assistance Centre and identify the
 * underlying Government Gazette. The research ledger records the scope,
 * retrieval date and verification decision for each source.
 */
export const directorySources: Record<string, DirectorySource> = {
  bipa: {
    id: "bipa",
    title: "Business and Intellectual Property Authority Act 8 of 2016",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Business%20and%20Intellectual%20Property%20Authority%20Act%208%20of%202016.docx",
    scope: "BIPA's Registration Office and functions for business registration.",
  },
  closeCorporations: {
    id: "close-corporations",
    title: "Close Corporations Act 26 of 1988",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Close%20Corporations%20Act%2026%20of%201988.docx",
    scope: "Close-corporation formation, registration and administration.",
  },
  companies: {
    id: "companies",
    title: "Companies Act 28 of 2004",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Companies%20Act%2028%20of%202004.docx",
    scope: "Companies, incorporation and administration.",
  },
  nqa: {
    id: "nqa",
    title: "Namibia Qualifications Authority Act 29 of 1996",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Namibia%20Qualifications%20Authority%20Act%2029%20of%201996.docx",
    scope: "NQA's qualifications-framework, standards and accreditation objects.",
  },
  vet: {
    id: "vet",
    title: "Vocational Education and Training Act 1 of 2008",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Vocational%20Education%20and%20Training%20Act%201%20of%202008.docx",
    scope: "NTA's vocational-training powers, funding powers and levy framework.",
  },
  labour: {
    id: "labour",
    title: "Labour Act 11 of 2007",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Labour%20Act%2011%20of%202007.docx",
    scope: "Basic conditions, working time, leave, termination and severance.",
  },
  fima: {
    id: "fima",
    title: "Financial Institutions and Markets Act 2 of 2021",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Financial%20Institutions%20and%20Markets%20Act%202%20of%202021.docx",
    scope: "Insurance, insurers, agents and brokers. The consolidated text records commencement on 1 May 2026, subject to listed exceptions.",
  },
  vat: {
    id: "vat",
    title: "Value-Added Tax Act 10 of 2000",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Value-Added%20Tax%20Act%2010%20of%202000.docx",
    scope: "VAT registration and record-keeping obligations.",
  },
  procurement: {
    id: "procurement",
    title: "Public Procurement Act 15 of 2015",
    authority: "Government Gazette of the Republic of Namibia, consolidated by the Legal Assistance Centre",
    url: "https://www.lac.org.na/laws/annoSTAT/Public%20Procurement%20Act%2015%20of%202015.docx",
    scope: "Public-procurement bid documents, submission, compliance documents and evaluation.",
  },
};

const withSources = (...ids: (keyof typeof directorySources)[]) =>
  ids.map((id) => directorySources[id]);

const reviewed = "13 November 2026";
const reviewedIso = "2026-11-13";

export const directoryCourses: Doc[] = [
  {
    slug: "registering-a-business-in-namibia",
    kind: "course",
    no: "Course 01",
    title: "Registering a Business in Namibia",
    standfirst:
      "A careful map of the legal forms, the BIPA registration role, and the questions to settle before a filing is started.",
    readMinutes: 9,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Start with the work, not the form",
        walkaway:
          "A one-page description of the business you are actually building before you choose a registration path.",
        blocks: [
          {
            t: "p",
            text: "Write down the work first: what you sell, who pays, who owns the work, where money will be received, and whether you will employ anyone. A registration is a legal and administrative step, not a substitute for that operating decision. If ownership, liability, tax residence or investment is material, take tailored legal and tax advice before filing.",
          },
          {
            t: "list",
            items: [
              "The offer: one sentence describing the product or service and the customer.",
              "The people: owner, any co-owner, and who is allowed to bind the business.",
              "The money: expected first sale, expected costs, and the account or record system that will keep personal and business money distinguishable.",
              "The permissions: sector licences, professional rules, tax and employer obligations that may apply to the specific activity.",
            ],
          },
        ],
      },
      {
        heading: "Know the legal lanes",
        walkaway:
          "A plain distinction between doing business personally and choosing an entity governed by company or close-corporation law.",
        blocks: [
          {
            t: "p",
            text: "The Companies Act and the Close Corporations Act are separate legal frameworks. A close corporation and a company each have their own formation and administration rules. Working in your own name does not create that entity boundary. The right choice depends on the people involved, the risk of the work, money coming in, and the advice you receive. Do not treat a table like this as a legal recommendation.",
          },
          {
            t: "table",
            head: ["Route to investigate", "What it means for this course", "Question to settle before filing"],
            rows: [
              ["Business in your own name", "The owner and the work are not being presented here as a separate statutory entity.", "Can you document the money, contracts and risk clearly enough for this work?"],
              ["Close corporation", "A form governed by the Close Corporations Act and handled through the registration system.", "Who will be members, and what ongoing records and decisions will they keep?"],
              ["Company", "A form governed by the Companies Act and handled through the registration system.", "Who will own, direct and fund it, and what governance will the business need?"],
            ],
          },
        ],
      },
      {
        heading: "Use the right door",
        walkaway:
          "Why BIPA is the place to verify a current business-registration filing, while the governing Act tells you the legal frame.",
        blocks: [
          {
            t: "p",
            text: "The BIPA Act establishes BIPA and a Registration Office for business and industrial property. It names BIPA as the focal point for business registration and gives it functions including receiving, examining and keeping documents required under applicable legislation. Current forms, fees, online steps and processing arrangements are operational details. Check them directly with BIPA immediately before submitting anything; this course deliberately does not freeze them into a page that can go stale.",
          },
          {
            t: "list",
            items: [
              "Identify the entity route and read the current BIPA requirements for that route.",
              "Prepare the ownership, address and founding information that the current process asks for.",
              "Keep the submitted forms, confirmation, registration evidence and changes log together from day one.",
              "Do not assume a name, sector approval or tax position is settled until the responsible authority confirms it.",
            ],
          },
        ],
      },
      {
        heading: "Build the operating folder",
        walkaway:
          "A practical output: a small folder that makes the first month of trading legible.",
        blocks: [
          {
            t: "p",
            text: "Create one folder, paper or digital, with five sections: identity, sales, spending, people and permissions. Put every current registration record in identity; every quote and invoice in sales; receipts and supplier records in spending; contracts and onboarding documents in people; and authority correspondence in permissions. The folder is not a compliance guarantee. It is the evidence you need in order to ask a bookkeeper, adviser or regulator a clear question.",
          },
          {
            t: "list",
            items: [
              "Identity: current registration evidence and the people authorised to act.",
              "Sales: a sequential quote and invoice record, with a copy of the work agreed.",
              "Spending: receipts, supplier invoices and a note of what each cost was for.",
              "People: signed terms and a simple start-date record when you hire.",
              "Permissions: licences, registrations, renewal dates and the source that told you they apply.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "Legal orientation only, checked against the BIPA Act, Companies Act and Close Corporations Act. It does not prescribe a structure or state current forms, fees, tax thresholds or processing times. Confirm the current BIPA process and obtain tailored advice where a decision has legal, tax or investment consequences.",
    sources: withSources("bipa", "companies", "closeCorporations"),
    related: [
      {
        title: "Business Plan template",
        body: "Turn the one-page operating description into a short plan without inventing a market size or a forecast.",
        href: "/resources/business-plan-template",
      },
      {
        title: "Invoice / Quotation template",
        body: "Start a numbered sales record from the first quote, then keep the matching invoice.",
        href: "/resources/invoice-quotation-template",
      },
      {
        title: "Bookkeeping Without Fear",
        body: "Set up the cash record that lets you see what came in, what went out and what is still owed.",
        href: "/resources/bookkeeping-without-fear",
      },
    ],
  },
  {
    slug: "nqa-nta-accreditation-explained",
    kind: "course",
    no: "Course 02",
    title: "NQA & NTA Accreditation, Explained",
    standfirst:
      "Read the statutory roles first, then build an evidence map before you ask either authority about a training offer.",
    readMinutes: 9,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Two authorities, connected work",
        walkaway:
          "A more accurate starting point than treating NQA and NTA as interchangeable application counters.",
        blocks: [
          {
            t: "p",
            text: "The Namibia Qualifications Authority Act gives NQA objects that include administering a national qualifications framework, setting occupational and curriculum standards, and accrediting persons, institutions and organisations that provide education, instruction or training and meet the Act's requirements. The Vocational Education and Training Act establishes NTA. It allows NTA, in respect of vocational education and training and subject to policies and procedures determined by NQA, to develop standards and qualifications, accredit providers and programmes, register assessors, conduct assessments and quality audits, and issue awards and certificates.",
          },
          {
            t: "p",
            text: "That statutory wording matters. The question is not simply which body is easier. It is what you intend to offer, whether it is vocational education and training, which standards or qualifications are in play, and which current procedure the relevant authority tells you to use.",
          },
        ],
      },
      {
        heading: "Build an evidence map before an application",
        walkaway:
          "A reusable inventory of proof, rather than a last-minute collection of attachments.",
        blocks: [
          {
            t: "table",
            head: ["Evidence area", "Write down", "Keep as proof"],
            rows: [
              ["Offer", "Title, learner, outcome, duration and delivery mode.", "Current outline, lesson sequence and assessment plan."],
              ["Standards", "The occupational, curriculum or qualification reference you are working from.", "Source link, version and notes from the authority."],
              ["People", "Who teaches, assesses, moderates and manages quality.", "CVs, appointment terms and role descriptions."],
              ["Place and tools", "Every space, device, material and safety control required for the stated outcome.", "Inventory, access arrangements, maintenance and safety records."],
              ["Learner journey", "Admission, support, assessment, records, results, complaints and appeals.", "Policies, forms and an example record flow."],
            ],
          },
          {
            t: "p",
            text: "Do not call the map an accreditation application. It is a working file that exposes what is missing before you make a formal claim or submit a formal document.",
          },
        ],
      },
      {
        heading: "Funding is a possibility, not a promise",
        walkaway:
          "What the Act permits, without turning it into a funding commitment.",
        blocks: [
          {
            t: "p",
            text: "The VET Act establishes the National Training Fund. It permits NTA to provide financial and technical assistance and to fund vocational education and training programmes and projects in the circumstances described in the Act. It also provides a framework under which a levy may be imposed by Gazette notice. Those provisions do not mean that a provider is automatically funded, that a particular levy rate applies, or that a training place has been approved. Verify the live programme, notice, criteria and funding terms with NTA before budgeting against them.",
          },
        ],
      },
      {
        heading: "Your output: a route brief",
        walkaway:
          "One concise document you can take to an authority, partner or adviser without overstating what is approved.",
        blocks: [
          {
            t: "list",
            items: [
              "State the proposed training outcome in plain language and name the intended learner.",
              "List the standards or qualification references you have found, with links and dates checked.",
              "Attach the evidence map and mark each item ready, missing or needing confirmation.",
              "Write three questions for the current authority process: route, documents and applicable deadlines or fees.",
              "Keep all replies with the route brief. A phone answer is useful, but a written confirmation is easier to work from.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "This is a statutory orientation, not an accreditation decision or a promise of funding. It deliberately removes unsourced processing-time, validity-period, programme-category and funding claims. Confirm the current route, evidence requirements and any funding criteria directly with NQA and NTA before acting.",
    sources: withSources("nqa", "vet"),
  },
  {
    slug: "namibian-labour-law-basics",
    kind: "course",
    no: "Course 03",
    title: "Namibian Labour Law Basics",
    standfirst:
      "The statutory floor on hours, leave, notice, dismissal and severance, read from the Labour Act without invented payroll rules.",
    readMinutes: 11,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Put the terms on paper, then test the floor",
        walkaway:
          "Why a clear written agreement is good practice, and what the Act says about basic conditions.",
        blocks: [
          {
            t: "p",
            text: "A written employment agreement is a sensible working record: role, pay, hours, place of work, start date, leave, notice and who signs for the employer. The Labour Act's basic conditions form terms of a contract of employment unless the Act permits otherwise or a contract or collective agreement is more favourable to the employee. The Act text reviewed for this course does not say that every employment contract must itself be written. Do not turn a good practice into a false statutory quote.",
          },
          {
            t: "list",
            items: [
              "Write the actual ordinary days and hours, not only a weekly total.",
              "State remuneration and its payment cycle plainly.",
              "Record the agreed role, reporting line and place of work.",
              "Use a signed copy for each party, then keep a change log when terms are varied.",
              "Get professional advice for senior, unusual, cross-border, collective-agreement or dispute-sensitive arrangements.",
            ],
          },
        ],
      },
      {
        heading: "Hours and overtime",
        walkaway:
          "The normal ceiling, the stated exceptions, and why overtime needs an agreement.",
        blocks: [
          {
            t: "table",
            head: ["Labour Act rule", "Statutory position"],
            rows: [
              ["Ordinary hours for most employees", "No more than 45 hours a week; no more than 9 hours a day for a five-day-or-fewer week, or 8 hours a day where more than five days are worked."],
              ["Security officers and emergency health-care employees", "The Act sets a different ceiling of 60 hours a week, with stated daily limits. A minister may also designate a class of employee for this rule."],
              ["Overtime", "It must be in accordance with an agreement. The agreement may not require more than 10 overtime hours a week or more than 3 a day, subject to the Act's provisions."],
              ["Overtime pay", "At least one and a half times the hourly basic wage; at least double in the stated Sunday or public-holiday circumstance."],
            ],
          },
          {
            t: "p",
            text: "The Act provides routes for particular variations and exemptions. A generic template cannot decide whether one applies. Keep the agreement and any official approval with the roster records.",
          },
        ],
      },
      {
        heading: "Leave is more specific than a headline",
        walkaway:
          "The statutory calculation points that belong in a leave record.",
        blocks: [
          {
            t: "table",
            head: ["Leave", "What the Act states"],
            rows: [
              ["Annual leave", "At least four consecutive weeks with full remuneration per annual leave cycle. The Act's table gives 20 working days for a five-day ordinary work week and 24 for a six-day week."],
              ["Sick leave", "For a five-day ordinary work week, not less than 30 working days in a sick-leave cycle; for a six-day week, not less than 36. During the first year the entitlement is one day for every 26 days worked."],
              ["Compassionate leave", "Five working days with full remuneration during each period of 12 months of continuous employment, in the circumstances defined by the Act."],
              ["Maternity leave", "After six months' continuous service, not less than 12 weeks, calculated as the Act provides. The Act preserves contract terms and specifies the employer's non-basic-wage obligation during the leave; Social Security payment is governed separately."],
            ],
          },
          {
            t: "p",
            text: "The annual-leave section also sets when leave is to be taken and restricts payment instead of leave except on termination. Keep a leave ledger with the ordinary work week, cycle start, leave taken, public holidays inside leave and any written extension. Do not rely on a generic annual balance alone.",
          },
        ],
      },
      {
        heading: "Notice, fairness and severance",
        walkaway:
          "The baseline is not an employment-at-will rule.",
        blocks: [
          {
            t: "p",
            text: "Where a contract may be terminated on notice, the minimum notice is one day for employment of four weeks or less, one week for more than four weeks up to one year, and one month for more than one year. An employer's notice must be in writing and state the reason for termination. The Act also says an employer must not dismiss without a valid and fair reason and the applicable procedure.",
          },
          {
            t: "p",
            text: "After 12 months of continuous service, the Act generally requires severance pay on dismissal, death while employed, or resignation or retirement on reaching 65. It lists exceptions, including a fair dismissal for misconduct or poor work performance. The minimum amount is one week's remuneration for each year of continuous service. This is a high-stakes area: obtain timely, fact-specific labour advice rather than applying a summary to a live dispute.",
          },
        ],
      },
      {
        heading: "Your output: a terms-and-records check",
        walkaway:
          "A one-page check you can use before the first shift, not a substitute for employer registration or payroll advice.",
        blocks: [
          {
            t: "list",
            items: [
              "Record role, pay, ordinary days and hours, start date and payment cycle.",
              "Keep signed overtime agreements and a roster showing actual hours.",
              "Maintain annual, sick, compassionate and maternity leave records separately.",
              "Before ending employment, pause: identify the reason, notice route, procedure, final payments and whether specialist advice is needed.",
              "Check current wage orders, Social Security, tax, work-permit and sector requirements directly with the competent authority. They are not calculated by this course.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "Based on the Labour Act 11 of 2007, including sections 16, 17, 23 to 26, 30, 33 and 35. This is general legal information, not legal advice. Current wage orders, payroll contributions, employer registrations, permits and sector rules need a separate check with the responsible authority or a qualified Namibian labour professional.",
    sources: withSources("labour"),
    related: [
      {
        title: "Employment Contract template",
        body: "A fill-in record of agreed terms, designed to be reviewed and adapted before use.",
        href: "/resources/employment-contract-template",
      },
    ],
  },
  {
    slug: "insurance-in-namibia",
    kind: "course",
    no: "Course 04",
    title: "Insurance in Namibia",
    standfirst:
      "A buyer's boundary map: read the cover, identify the regulated role, and know what a policy question cannot answer.",
    readMinutes: 9,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Know which question you are asking",
        walkaway:
          "The difference between buying cover, giving advice, arranging cover and carrying on insurance business.",
        blocks: [
          {
            t: "p",
            text: "For a buyer, the immediate question is usually practical: what loss would stop the business, what is excluded, what evidence is needed for a claim, and what can you afford to retain? For a seller, adviser, agent or broker, the regulatory question is different. The Financial Institutions and Markets Act regulates insurance, insurers, agents and brokers. Do not use a consumer checklist as permission to give or sell regulated insurance advice.",
          },
          {
            t: "list",
            items: [
              "Property and equipment: what is insured, where it is insured and what evidence of value is required?",
              "Liability: whose claim could arise from the work, and what activity is actually described in the policy?",
              "Vehicle or mobile work: who drives, where the work happens and what conditions apply?",
              "People and continuity: what happens if a named person cannot work, and what is not covered?",
            ],
          },
        ],
      },
      {
        heading: "The legal boundary is real",
        walkaway:
          "Why registration and scope should be checked before someone markets insurance services.",
        blocks: [
          {
            t: "p",
            text: "FIMA section 5 says a person may not carry on insurance or reinsurance business in Namibia unless registered or deemed registered and acting within the class shown on its registration. Its Part 7 defines an insurance agent and an insurance broker, then says a person may not, for compensation, commission or another thing of value, carry on the activities of an agent or broker unless registered or deemed registered to do so. Contravention can be an offence. The Act's exact scope and exceptions matter, so do not infer a licence from a job title, a social-media profile or a business card.",
          },
          {
            t: "p",
            text: "Section 54 also restricts what an agent or broker may charge or receive for a service: other than the commission determined in standards. That is more precise than the old shorthand that every person connected to insurance must be paid 'commission only'. Employment terms, standards and a person's actual role need competent, current advice.",
          },
        ],
      },
      {
        heading: "Read the policy as a working document",
        walkaway:
          "A short evidence-first method for a policy or quote before you pay.",
        blocks: [
          {
            t: "table",
            head: ["Read this", "Ask this", "Keep this"],
            rows: [
              ["Insured party and activity", "Does the name, legal form, address and described activity match the real business?", "Quote, proposal, schedule and any correction request."],
              ["Cover and exclusions", "What event triggers cover, what is expressly excluded, and what limit or excess applies?", "The full wording, schedule and endorsements, not only a summary."],
              ["Duties and evidence", "What must be disclosed, maintained, reported or documented?", "Photos, valuations, service records, inventory and correspondence."],
              ["Claims route", "Who must be told, how quickly, and what should not be repaired or disposed of before instruction?", "Claim number, dated notice and every document sent."],
            ],
          },
        ],
      },
      {
        heading: "Your output: a cover brief",
        walkaway:
          "A one-page request that lets an authorised provider answer a defined business need.",
        blocks: [
          {
            t: "list",
            items: [
              "Describe the business activity in ordinary language, including where it happens.",
              "List the assets, people and third-party risks you want to understand, without guessing a policy class.",
              "State your evidence: inventory, invoices, photos, vehicle details and existing policy documents.",
              "Ask the provider to identify the proposed cover, material exclusions, excesses, conditions and cancellation route in writing.",
              "Verify the provider's current authority and seek independent professional advice where the decision is material.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "Based on the Financial Institutions and Markets Act 2 of 2021, whose consolidated text records commencement on 1 May 2026 subject to listed exceptions. This is not insurance, financial or legal advice, and it does not identify a provider or recommend a policy. Confirm current registration, standards and policy terms directly with NAMFISA and the authorised provider.",
    sources: withSources("fima"),
  },
  {
    slug: "start-a-one-person-business-in-namibia",
    kind: "course",
    no: "Course 05",
    title: "Start a One-Person Business in Namibia",
    standfirst:
      "Turn one useful skill into a small operating system: an offer, a proof trail, a cash habit and a legal question list you can act on.",
    readMinutes: 12,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Choose one buyer and one useful result",
        walkaway:
          "A sellable first sentence, not a broad description of everything you could do.",
        blocks: [
          {
            t: "p",
            text: "A one-person business begins with an observable result for a specific buyer. Write: 'I help [person or organisation] get [result] by [method], for [price or price basis].' This is a draft, not a slogan. It gives you something a real customer can correct. Keep the first offer narrow enough that you can deliver it personally and record what happened.",
          },
          {
            t: "list",
            items: [
              "Name one buyer with a real setting: a household, local shop, contractor, school or office.",
              "Name the result in the buyer's language: repaired, delivered, cleaned, recorded, trained, installed or designed.",
              "Set a clear boundary: what is included, what is not, when the work starts and what proof of completion looks like.",
              "Ask three potential buyers what they currently do instead, what it costs and what would make them switch.",
            ],
          },
        ],
      },
      {
        heading: "Run a small, visible test",
        walkaway:
          "A worked Namibian-dollar example that is labelled as an assumption, not market data.",
        blocks: [
          {
            t: "p",
            text: "Worked example, illustrative only: a sole operator offers a two-hour basic digital filing clean-up to a neighbourhood business. They quote N$600 for the session. Their transport and printing budget is N$120. The gross cash left before any other cost is N$480. Those figures are assumptions for a test, not a price recommendation, wage claim, tax calculation or a statement about the local market. The useful question is whether the customer will accept the scope, pay on the agreed terms and ask for the result again.",
          },
          {
            t: "table",
            head: ["Before the test", "During the test", "After the test"],
            rows: [
              ["Write the scope, price basis, date and what the customer must provide.", "Record time, materials, travel, customer changes and proof of work completed.", "Issue the invoice, record payment, total the direct costs and ask what the customer would change."],
            ],
          },
        ],
      },
      {
        heading: "Keep business money legible",
        walkaway:
          "A first-day habit that makes a later registration, tax or funding question easier to answer.",
        blocks: [
          {
            t: "p",
            text: "Use a sequential quote number, sequential invoice number and one cash record. Keep the customer agreement, invoice, payment evidence and receipt for every job together. If you take money out for yourself, label it rather than hiding it inside a supplier cost. The habit is useful before and after any entity registration. It does not decide your tax status, and it is not a substitute for professional bookkeeping or tax advice.",
          },
          {
            t: "list",
            items: [
              "Money in: date, customer, invoice number, amount received and payment method.",
              "Money out: date, supplier, reason, amount and receipt location.",
              "Money still owed: invoice number, due date, reminder date and outcome.",
              "Owner movement: a distinct note for money introduced or taken out by the owner.",
            ],
          },
        ],
      },
      {
        heading: "Treat registration as a decision gate",
        walkaway:
          "A question list for BIPA, NamRA, an employer or a sector regulator, without pretending one checklist fits every activity.",
        blocks: [
          {
            t: "p",
            text: "Business registration, tax, employment and sector permissions have different purposes. BIPA's legislation makes it the focal point for business registration; company and close-corporation law govern those statutory forms. Other obligations depend on the activity and facts. Make a question list, take the actual offer and ownership facts to the competent authority or adviser, and keep the reply. A training provider, food business, transport operator, financial-services business and home-based service will not necessarily have the same path.",
          },
          {
            t: "list",
            items: [
              "Which legal form, if any, matches the ownership and risk of this specific work?",
              "Which current BIPA forms, fees and registration requirements apply to that route?",
              "What tax registration, record-keeping or invoicing position applies before I quote tax or add a tax line?",
              "Do I need an employer, municipal, professional or sector permission before I start?",
              "What event changes the answer: turnover, hiring, a new premises, a regulated service or a new owner?",
            ],
          },
        ],
      },
      {
        heading: "Your output: the first-business pack",
        walkaway:
          "Four pages that are useful even if you decide not to register or launch yet.",
        blocks: [
          {
            t: "list",
            items: [
              "A one-page offer and scope.",
              "A completed quotation and invoice draft, with no tax claimed unless your position is confirmed.",
              "A one-page cash book for the test job.",
              "A dated registration-and-permissions question list with the source of every answer.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "Practical business-learning material, not legal, tax, financial or investment advice. The worked Namibian-dollar example is explicitly illustrative. The legal orientation is limited to BIPA's role and the existence of company and close-corporation frameworks; verify current procedures and any activity-specific obligation with the responsible authority or a qualified adviser.",
    sources: withSources("bipa", "companies", "closeCorporations"),
    related: [
      {
        title: "Business Plan template",
        body: "Use it to turn the test into a written operating plan. Label every number as an assumption until it is an actual.",
        href: "/resources/business-plan-template",
      },
      {
        title: "Invoice / Quotation template",
        body: "Create the first customer-facing record without adding a tax line you have not confirmed.",
        href: "/resources/invoice-quotation-template",
      },
      {
        title: "Financial Projections template",
        body: "Move from one test job to a cautious twelve-month cash view.",
        href: "/resources/financial-projections-template",
      },
      {
        title: "Meeting Minutes template",
        body: "Use it for an owner check-in, supplier meeting or partnership conversation so decisions do not disappear.",
        href: "/resources/meeting-minutes-template",
      },
    ],
  },
  {
    slug: "bookkeeping-without-fear",
    kind: "course",
    no: "Course 06",
    title: "Bookkeeping Without Fear",
    standfirst:
      "From one cash record to a monthly view of sales, spending, money owed and the question your accountant needs answered.",
    readMinutes: 12,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Bookkeeping is a trail, not a performance",
        walkaway:
          "The minimum records that let you reconstruct a month without trusting your memory.",
        blocks: [
          {
            t: "p",
            text: "Bookkeeping answers four basic questions: what came in, what went out, what is still owed, and what evidence supports each number. Start with a cash book, invoice list and receipt folder. Use the same reference number across the quote, invoice, payment record and customer conversation. A spreadsheet is acceptable if it is complete, backed up and reconciled to what actually happened.",
          },
          {
            t: "table",
            head: ["Record", "Minimum columns", "Evidence"],
            rows: [
              ["Cash book", "Date, reference, description, money in, money out, running balance.", "Bank, mobile-money or cash evidence."],
              ["Sales list", "Invoice number, customer, date, amount, due date, paid date.", "Quote, invoice and acceptance or delivery evidence."],
              ["Spend list", "Receipt number, supplier, category, date, amount, paid status.", "Supplier invoice, receipt and payment evidence."],
              ["Money owed", "Who owes whom, amount, due date, next action.", "Invoice or supplier statement and correspondence."],
            ],
          },
        ],
      },
      {
        heading: "Work one transaction through",
        walkaway:
          "A small example that shows the method, with every amount clearly labelled as an assumption.",
        blocks: [
          {
            t: "p",
            text: "Illustrative example only: on 3 June, a one-person service business invoices a client N$1,200 for completed work. On 5 June, N$1,200 arrives by transfer. On 6 June, it pays N$180 for travel and N$90 for printing. The cash book records N$1,200 in, N$270 out and N$930 net cash movement for those three transactions. That is not profit: it ignores the operator's time and any other costs. It is also not a tax calculation. It is simply a trail from invoice to payment to receipt.",
          },
          {
            t: "table",
            head: ["Date", "Reference", "Description", "In (N$)", "Out (N$)", "Evidence"],
            rows: [
              ["3 June", "INV-001", "Service invoiced", "", "", "Copy of invoice"],
              ["5 June", "RCV-001", "Customer payment", "1,200", "", "Bank or mobile-money record"],
              ["6 June", "EXP-001", "Travel", "", "180", "Receipt"],
              ["6 June", "EXP-002", "Printing", "", "90", "Receipt"],
            ],
          },
        ],
      },
      {
        heading: "Close the month",
        walkaway:
          "A repeatable 30-minute routine that produces a usable management snapshot.",
        blocks: [
          {
            t: "list",
            items: [
              "Enter every payment and receipt, then sort unfiled evidence by reference number.",
              "Compare the cash-book balance to the bank, mobile-money or cash evidence. Write down every difference rather than forcing the numbers to agree.",
              "List unpaid customer invoices and unpaid supplier bills separately from money already received or paid.",
              "Group spending into a small number of honest categories such as materials, travel, tools, rent, communications and owner movement.",
              "Write one sentence on the next month's cash pressure: a large bill, a late customer, a seasonal gap or an uncertain quote.",
            ],
          },
        ],
      },
      {
        heading: "VAT records need more care, not less",
        walkaway:
          "The statutory record rule without guessing your registration status or rate.",
        blocks: [
          {
            t: "p",
            text: "The VAT Act requires a registered person, and a person liable for tax under the Act, to maintain specified records in English at the business place in Namibia, including originals of received tax invoices, copies of issued tax invoices and accounting records. It says records required under that section must be retained for at least five years after the relevant tax period. That does not mean every startup is VAT-registered or may add VAT to an invoice. Confirm registration, rate, invoicing and return requirements directly with NamRA or a qualified tax professional before you label a document as a tax invoice or claim input tax.",
          },
        ],
      },
      {
        heading: "Your output: a one-page monthly view",
        walkaway:
          "A page you can use to make the next decision, then take to a bookkeeper when the work becomes more complex.",
        blocks: [
          {
            t: "list",
            items: [
              "Cash received this month, with the evidence reconciled.",
              "Cash paid this month, grouped by an honest category.",
              "Customer money still due, with a next action and date.",
              "Supplier bills still due, with a payment date or question.",
              "A short note on the balance: available cash is not automatically profit, and it is not automatically money free to take out.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "Education on record-keeping, not accounting, audit or tax advice. The monetary example is an assumption-based teaching example, not a pricing or tax illustration. VAT requirements are limited here to the record-keeping rule in section 48 of the Value-Added Tax Act; confirm your current NamRA position before charging, describing or recovering VAT.",
    sources: withSources("vat"),
    related: [
      {
        title: "Financial Projections template",
        body: "Use real monthly records to replace early assumptions in the forward view.",
        href: "/resources/financial-projections-template",
      },
      {
        title: "Invoice / Quotation template",
        body: "Keep the customer-facing documents aligned with the references in the cash book.",
        href: "/resources/invoice-quotation-template",
      },
    ],
  },
  {
    slug: "write-a-bid-that-can-win",
    kind: "course",
    no: "Course 07",
    title: "Write a Bid That Can Win",
    standfirst:
      "Tender literacy for public opportunities: read the document, meet every stated requirement, price the scope and submit a complete record.",
    readMinutes: 13,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "A bid is a response to a stated test",
        walkaway:
          "Why persuasive prose cannot repair a missing compulsory document, signature or deadline.",
        blocks: [
          {
            t: "p",
            text: "The Public Procurement Act requires a bidding document to state clear process instructions, a clear statement of requirements, the evaluation methodology and criteria, and the proposed contract form or conditions. It also requires bids to be evaluated according to the stated criteria and methodology. Your first task is therefore not to write an impressive introduction. It is to turn the document into a complete compliance list and answer only what it asks.",
          },
          {
            t: "list",
            items: [
              "Create a line for every mandatory form, certificate, signature, price schedule, technical response and deadline.",
              "Copy the exact requirement and page reference before deciding who will provide it.",
              "Mark each item mandatory, scored, explanatory or not applicable only where the document permits that conclusion.",
              "Use the stated clarification route and date. Do not rely on informal assurances.",
            ],
          },
        ],
      },
      {
        heading: "Build a compliance matrix",
        walkaway:
          "A working document that keeps the bid team from discovering a gap on submission day.",
        blocks: [
          {
            t: "table",
            head: ["Requirement", "Evidence or answer", "Owner", "Status"],
            rows: [
              ["Legal and eligibility documents", "Current document named in the bidding document, checked for expiry and entity name.", "Owner or administrator", "Ready / question / missing"],
              ["Technical response", "Method, schedule, people, equipment and proof mapped to the stated requirement.", "Technical lead", "Ready / question / missing"],
              ["Price schedule", "Every line priced or completed exactly as instructed; arithmetic independently checked.", "Commercial lead", "Ready / question / missing"],
              ["Declarations and signatures", "Correct version, authorised signatory and date.", "Authorised signatory", "Ready / question / missing"],
              ["Submission", "Method, address or platform, file naming, copies, deadline and receipt evidence.", "Submission owner", "Ready / question / missing"],
            ],
          },
          {
            t: "p",
            text: "The Act identifies documents that a bidder or supplier must submit in the public-procurement setting described in section 50, including specified tax, Social Security, affirmative-action, labour-undertaking and business-registration evidence, with a distinct rule for sole proprietors. The invitation and current law control. Do not copy an old tender's document pack into a new bid without checking the new document and current authority requirements.",
          },
        ],
      },
      {
        heading: "Write to the evaluation, not around it",
        walkaway:
          "A method statement that is easy to match against the buyer's stated criteria.",
        blocks: [
          {
            t: "p",
            text: "For every technical criterion, use the same order: requirement, method, person responsible, timing, proof and risk control. If a criterion asks for experience, show the relevant work, your role, dates and evidence. If it asks for a schedule, state the sequence, dependencies and who owns each handover. Do not claim capacity you cannot demonstrate. An honest limitation with a workable mitigation is safer than an unsupported promise.",
          },
          {
            t: "list",
            items: [
              "Requirement: restate the buyer's need in a short heading.",
              "Method: state the steps you will take and the output the buyer receives.",
              "People and tools: name only resources that are actually available or properly committed.",
              "Proof: attach or cite the document that supports the claim.",
              "Risk: identify the practical risk and the action that reduces it, without inventing a guarantee.",
            ],
          },
        ],
      },
      {
        heading: "Price the scope before you price the competition",
        walkaway:
          "A defensible price basis, not a race to the lowest number.",
        blocks: [
          {
            t: "p",
            text: "Public-procurement evaluation under the Act looks for the lowest evaluated substantially responsive bid that meets the qualification criteria, using the criteria and methodology in the bidding documents. That is not the same as 'write the lowest price you can imagine'. Build the price from labour, materials, travel, equipment, administration, contingencies allowed by the document and the contract conditions. Have a second person check quantities, extensions, totals and words against figures. If the tender specifies a price schedule, use it exactly.",
          },
        ],
      },
      {
        heading: "Submit, preserve, learn",
        walkaway:
          "The final proof trail and a repeatable improvement loop.",
        blocks: [
          {
            t: "p",
            text: "The Act sets a written, signed and sealed-envelope default at the specified address, while allowing other methods where the bidding documents authorise them. Late sealed-envelope bids must be returned unopened. Follow the actual invitation's method and deadline, not this sentence. Save the final PDF or paper copy, all attachments, the submission receipt or screenshot, clarification record and a short after-action note. A failed bid can still improve the next one if you can see exactly what was submitted.",
          },
          {
            t: "list",
            items: [
              "Finish the compliance matrix before formatting polish.",
              "Run a red-team check: someone not involved reads only against the invitation.",
              "Submit early enough to correct a technical failure, where the process permits it.",
              "Archive the exact submission and proof of delivery.",
              "After the outcome, record what was reusable, what was missing and what must be renewed before the next opportunity.",
            ],
          },
        ],
      },
    ],
    sourceNote:
      "Tender-literacy material, not procurement, legal, tax or commercial advice and not a promise of an award. Legal statements are limited to the Public Procurement Act's public-procurement provisions. Each invitation, current regulations, standard document, authority instruction and contract controls; verify them before bidding.",
    sources: withSources("procurement"),
    related: [
      {
        title: "Business Plan template",
        body: "Use the operations and risk sections to gather the evidence a bid asks you to demonstrate.",
        href: "/resources/business-plan-template",
      },
      {
        title: "Financial Projections template",
        body: "Use the assumptions sheet to test whether a proposed price can support the work you promise.",
        href: "/resources/financial-projections-template",
      },
      {
        title: "Meeting Minutes template",
        body: "Record bid/no-bid decisions, owners, clarification questions and the final submission review.",
        href: "/resources/meeting-minutes-template",
      },
    ],
  },
];

export const directoryTemplates: Doc[] = [
  {
    slug: "letterhead-template",
    kind: "template",
    no: "Template 01",
    title: "Letterhead",
    standfirst:
      "A clean correspondence header and a short check before you put a business claim into print.",
    readMinutes: 3,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "What belongs on the page",
        blocks: [
          {
            t: "list",
            items: [
              "[Business name] exactly as you use it in the relevant records.",
              "A single contact line: address or postal address, town, phone, email and website where applicable.",
              "Optional one-line activity description that says what you do without claiming a licence, accreditation or registration you have not confirmed.",
              "Date, recipient, subject and a clear sign-off for the letter itself.",
            ],
          },
          {
            t: "p",
            text: "Remove every bracket before sending. Keep the printed and digital versions consistent, and keep a copy of any version used for a formal quotation, contract or authority correspondence.",
          },
        ],
      },
    ],
    sourceNote:
      "A correspondence structure, not a legal document. Confirm any registration number, legal form, address or status claim before placing it on letterhead.",
  },
  {
    slug: "business-plan-template",
    kind: "template",
    no: "Template 02",
    title: "Business Plan",
    standfirst:
      "A practical ten-section plan that makes assumptions visible and turns a business idea into questions you can test.",
    readMinutes: 7,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Write it in the order that keeps you honest",
        blocks: [
          {
            t: "list",
            items: [
              "Company overview: name, operating stage, ownership question, location and how work is delivered.",
              "Customer problem: who has it, what they do now, and what evidence you have beyond your own opinion.",
              "Offer: the result, scope, price basis, delivery time and what is excluded.",
              "Market and competition: named alternatives, their strengths, your evidence and what you still do not know.",
              "Operations: people, tools, suppliers, repeatable process and the first point at which capacity breaks.",
              "Sales: first customer route, quote process, proof of delivery and follow-up method.",
              "Numbers: unit price, direct cost, recurring cost, cash timing and every assumption labelled.",
              "Risk: risk, early warning, mitigation and the owner of the next action.",
              "Ask: what support, money, partner, permission or decision you are requesting and what it will be used for.",
              "Executive summary: write last, after the evidence is on the page.",
            ],
          },
          {
            t: "p",
            text: "The downloadable template has space for each section. An empty evidence field is more useful than a fabricated number. Label estimates as assumptions and replace them as sales and records arrive.",
          },
        ],
      },
    ],
    sourceNote:
      "A planning structure, not financial, investment, legal or tax advice. It does not certify a business, guarantee funding or replace a sector-specific feasibility study.",
    related: [
      {
        title: "Start a One-Person Business in Namibia",
        body: "Use the course's first-business pack to give the plan a real customer test and a source trail.",
        href: "/resources/start-a-one-person-business-in-namibia",
      },
    ],
  },
  {
    slug: "financial-projections-template",
    kind: "template",
    no: "Template 03",
    title: "Financial Projections",
    standfirst:
      "A twelve-month view that keeps assumptions, actual cash and tax questions separate instead of blending them into a hopeful total.",
    readMinutes: 5,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Assumptions first",
        blocks: [
          {
            t: "list",
            items: [
              "Price per job, unit or customer: N$[amount], marked as assumption or actual.",
              "Expected customer count by month, with the evidence behind the first few months.",
              "Direct delivery cost per sale and the receipt or supplier quote that supports it.",
              "Recurring costs: tools, data, rent, transport, contractor or staff cost, and when each is paid.",
              "Cash timing: deposit, invoice date, due date and likely date money reaches the account.",
            ],
          },
          {
            t: "p",
            text: "Keep any tax line separate and blank until you have confirmed the relevant position. A projection is not a return, invoice or tax calculation.",
          },
        ],
      },
      {
        heading: "Read the sheet three ways",
        blocks: [
          {
            t: "table",
            head: ["View", "Question"],
            rows: [
              ["Sales", "How many real customers or units does this month assume, and what makes that plausible?"],
              ["Cash", "When does the money arrive and when do unavoidable costs leave?"],
              ["Runway", "If the conservative case happens, how many months can the business keep delivering?"],
            ],
          },
          {
            t: "p",
            text: "The download supplies a monthly first-year structure and a later scenario view. Update it with actuals at month end. Never overwrite the original assumption without noting what changed and why.",
          },
        ],
      },
    ],
    sourceNote:
      "A planning tool, not accounting, tax, credit or investment advice. All N$ fields are placeholders. Confirm VAT registration, rate, invoice wording and record-keeping with NamRA or a qualified tax professional before using a VAT amount.",
    sources: withSources("vat"),
    related: [
      {
        title: "Bookkeeping Without Fear",
        body: "Use actual monthly records to revise the forecast rather than defending an old assumption.",
        href: "/resources/bookkeeping-without-fear",
      },
    ],
  },
  {
    slug: "invoice-quotation-template",
    kind: "template",
    no: "Template 04",
    title: "Invoice / Quotation",
    standfirst:
      "Two fill-in documents that make scope, price, payment timing and the evidence trail visible without making an unverified tax claim.",
    readMinutes: 4,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Quotation: make the promise inspectable",
        blocks: [
          {
            t: "list",
            items: [
              "Quote number, issue date and a validity date or period.",
              "Customer name and contact, your business contact and the work location where relevant.",
              "Line-by-line description, quantity, unit price, total, assumptions and exclusions.",
              "Timing, acceptance method, payment terms and the point at which a scope change needs a new quote.",
            ],
          },
        ],
      },
      {
        heading: "Invoice: show what is now due",
        blocks: [
          {
            t: "p",
            text: "Use a different sequential invoice number, reference the accepted quote where useful, state the issue date and due date, and list the delivered goods or services. Keep a copy with the evidence of delivery and payment. Do not call a document a tax invoice, add a VAT registration number or add a VAT amount unless you have confirmed that your current registration and invoicing position permits it.",
          },
        ],
      },
      {
        heading: "The record behind the document",
        blocks: [
          {
            t: "p",
            text: "The VAT Act requires specified invoices and accounting records from a registered person, and from a person liable for tax under the Act, in the circumstances it sets out. The practical habit is useful for every small business: keep the quotation, invoice, receipt, payment evidence and customer correspondence together under the same reference. It makes a later tax or debt question answerable without guessing.",
          },
        ],
      },
    ],
    sourceNote:
      "A document structure, not tax, legal or debt-collection advice. The VAT Act source supports the record-keeping orientation only. Confirm current registration, VAT rate, tax-invoice content and recovery position with NamRA or a qualified professional before making a tax representation.",
    sources: withSources("vat"),
    related: [
      {
        title: "Bookkeeping Without Fear",
        body: "Match every quote and invoice to the cash book so a payment cannot disappear into memory.",
        href: "/resources/bookkeeping-without-fear",
      },
    ],
  },
  {
    slug: "nda-template",
    kind: "template",
    no: "Template 05",
    title: "Non-Disclosure Agreement",
    standfirst:
      "A short fill-in structure for a defined conversation, with the limits and review points made explicit before anyone signs.",
    readMinutes: 4,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Use it only after defining the conversation",
        blocks: [
          {
            t: "list",
            items: [
              "Name the disclosing and receiving parties accurately, including the person authorised to sign.",
              "State the specific purpose: for example, discussing a proposed project, engagement or partnership.",
              "Define confidential information and the exclusions that should not be treated as confidential.",
              "Set permitted use, handling, permitted recipients, return or destruction expectations and the term.",
              "Record the governing-law and dispute clause only after a qualified reviewer has considered the actual deal.",
            ],
          },
          {
            t: "p",
            text: "An NDA is not a substitute for a contract that defines payment, deliverables, intellectual property, warranty, liability or a business relationship. Do not use a one-page template to hide a complicated arrangement.",
          },
        ],
      },
    ],
    sourceNote:
      "Template for reference only, not legal advice. Have a qualified Namibian legal practitioner adapt and review it for a specific transaction, especially where personal data, intellectual property, employment, funding or cross-border parties are involved.",
  },
  {
    slug: "employment-contract-template",
    kind: "template",
    no: "Template 06",
    title: "Employment Contract",
    standfirst:
      "A fill-in record of role, pay, hours and leave, designed to sit beside the Labour Act rather than pretend to replace it.",
    readMinutes: 5,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "What the template records",
        blocks: [
          {
            t: "list",
            items: [
              "Employer and employee identity, role, start date, place of work and reporting arrangement.",
              "Remuneration, payment cycle and only those deductions that have been properly confirmed.",
              "Ordinary days and hours, with a separate written overtime arrangement where applicable.",
              "Leave record basis, notice terms, probation if used, confidentiality and any benefits.",
              "Signatures, dates and a copy for each party.",
            ],
          },
          {
            t: "p",
            text: "The Labour Act sets basic conditions that form terms of a contract unless the Act permits otherwise or a term is more favourable to the employee. It also sets particular rules on normal hours, overtime, leave, notice, dismissal and severance. This short document cannot decide an exception, wage order, Social Security position, tax withholding, permit issue or fair procedure for your facts.",
          },
        ],
      },
    ],
    sourceNote:
      "Template for reference only, informed by the Labour Act 11 of 2007. It is not legal, payroll, immigration or tax advice. Have a qualified Namibian labour professional review it before use, particularly for a fixed term, senior role, non-standard hours, dismissal, collective agreement or cross-border work.",
    sources: withSources("labour"),
    related: [
      {
        title: "Namibian Labour Law Basics",
        body: "Read the statutory floor and the areas that need a current professional check before relying on the template.",
        href: "/resources/namibian-labour-law-basics",
      },
    ],
  },
  {
    slug: "meeting-minutes-template",
    kind: "template",
    no: "Template 07",
    title: "Meeting Minutes",
    standfirst:
      "A one-page decision record: who met, what was decided, who owns the action and when the next check happens.",
    readMinutes: 3,
    updated: reviewed,
    reviewedIso,
    sections: [
      {
        heading: "Minutes are a tool for the next action",
        blocks: [
          {
            t: "list",
            items: [
              "Header: meeting title, date, time, location or platform, attendees and apologies.",
              "Agenda: numbered items in the order considered.",
              "Decision record: one sentence on the decision, the rationale where useful, owner and due date.",
              "Action register: action, owner, due date, status and the evidence that closes it.",
              "Next meeting: date, purpose and what must be ready before it.",
            ],
          },
          {
            t: "p",
            text: "Record decisions and actions, not a transcript. Circulate the draft promptly, correct factual errors, then save the approved version with any documents it refers to. Formal company, board, procurement or employment records may have additional requirements; obtain appropriate advice rather than relying on this general template.",
          },
        ],
      },
    ],
    sourceNote:
      "A working record structure, not legal, company-secretarial or procurement advice. Check any statutory, constitutional, contract or tender-specific minute requirement that applies to your meeting.",
  },
];

/**
 * Editable downloads are direct and ungated. The linked files are the
 * current printable companion formats for each template.
 */
export const templateDownloads: Record<string, { file: string; label: string }[]> = {
  "letterhead-template": [{ file: "letterhead.pdf", label: "Letterhead (PDF, A4)" }],
  "business-plan-template": [{ file: "business-plan.docx", label: "Business plan (DOCX)" }],
  "financial-projections-template": [
    { file: "financial-projections.xlsx", label: "Financial projections (XLSX)" },
  ],
  "invoice-quotation-template": [
    { file: "invoice.docx", label: "Invoice (DOCX)" },
    { file: "invoice.xlsx", label: "Invoice (XLSX)" },
    { file: "quotation.docx", label: "Quotation (DOCX)" },
    { file: "quotation.xlsx", label: "Quotation (XLSX)" },
  ],
  "nda-template": [{ file: "nda.docx", label: "Non-disclosure agreement (DOCX)" }],
  "employment-contract-template": [{ file: "employment-contract.docx", label: "Employment contract (DOCX)" }],
  "meeting-minutes-template": [{ file: "meeting-minutes.docx", label: "Meeting minutes (DOCX)" }],
};

/** All Directory documents, courses first. */
export const directoryAll: Doc[] = [...directoryCourses, ...directoryTemplates];

export function getDoc(slug: string): Doc | undefined {
  return directoryAll.find((d) => d.slug === slug);
}

/** Chinese search metadata. Directory documents publish in English. */
export const directoryZhMeta: Record<string, { title: string; description: string }> = {
  "registering-a-business-in-namibia": {
    title: "在纳米比亚注册企业 | Oryx 理工学院",
    description: "免费速成课：从业务本身开始，理解 BIPA 的登记角色、公司与 CC 的法律框架，并整理提交前要核实的问题。内容以英文发布，不构成法律或税务意见。",
  },
  "nqa-nta-accreditation-explained": {
    title: "NQA 与 NTA 认证解读 | Oryx 理工学院",
    description: "免费速成课：先读 NQA 与 NTA 的法定职责，再为培训项目建立证据地图。内容以英文发布，不构成认证决定或资金承诺。",
  },
  "namibian-labour-law-basics": {
    title: "纳米比亚劳动法基础 | Oryx 理工学院",
    description: "免费速成课：工时、休假、通知、解雇与遣散费的法定底线，依据《劳动法》整理。内容以英文发布，不构成法律意见。",
  },
  "insurance-in-namibia": {
    title: "纳米比亚保险入门 | Oryx 理工学院",
    description: "免费速成课：读懂保单、确认受监管角色，并识别保险建议与销售的边界。内容以英文发布，不构成保险、金融或法律意见。",
  },
  "start-a-one-person-business-in-namibia": {
    title: "在纳米比亚开始一人企业 | Oryx 理工学院",
    description: "免费速成课：把一项技能变成一套小型运营系统，包括报价、记录、现金习惯和登记问题清单。内容以英文发布，不构成法律、税务或财务意见。",
  },
  "bookkeeping-without-fear": {
    title: "不再害怕记账 | Oryx 理工学院",
    description: "免费速成课：从现金簿到月度经营概览，整理销售、支出、应收应付与证据。内容以英文发布，不构成会计或税务意见。",
  },
  "write-a-bid-that-can-win": {
    title: "写一份能竞争的投标书 | Oryx 理工学院",
    description: "免费速成课：公共采购投标识读、合规矩阵、技术响应、报价和提交记录。内容以英文发布，不保证中标，也不构成采购意见。",
  },
  "letterhead-template": {
    title: "信笺模板 | Oryx 理工学院",
    description: "可填写的信笺模板：清楚列出名称、联系信息和经过核实的企业信息。内容以英文发布。",
  },
  "business-plan-template": {
    title: "商业计划模板 | Oryx 理工学院",
    description: "可填写的十部分商业计划模板，让假设、证据、运营与风险清楚可见。内容以英文发布，不构成财务或投资意见。",
  },
  "financial-projections-template": {
    title: "财务预测模板 | Oryx 理工学院",
    description: "可填写的十二个月预测模板，分开记录假设、实际现金与税务问题。内容以英文发布，不构成会计或税务意见。",
  },
  "invoice-quotation-template": {
    title: "报价单与发票模板 | Oryx 理工学院",
    description: "可填写的报价单与发票模板，让范围、价格、付款时间与证据记录清晰可查。内容以英文发布。",
  },
  "nda-template": {
    title: "保密协议模板 | Oryx 理工学院",
    description: "可填写的保密协议结构，用于明确的商务讨论，并标出签署前应复核的限制。内容以英文发布，不构成法律意见。",
  },
  "employment-contract-template": {
    title: "雇佣合同模板 | Oryx 理工学院",
    description: "可填写的雇佣合同记录角色、薪酬、工时与休假，并须结合纳米比亚劳动法审核。内容以英文发布，不构成法律或薪酬意见。",
  },
  "meeting-minutes-template": {
    title: "会议纪要模板 | Oryx 理工学院",
    description: "可填写的会议纪要模板，记录决定、负责人、期限与下一步。内容以英文发布。",
  },
};
