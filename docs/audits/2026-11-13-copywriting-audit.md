# Public-site copywriting audit — 13 November 2026

## Purpose and method

This audit reviews the production English and Afrikaans public copy for clarity, useful hierarchy, action clarity, factual/status consistency, localisation and prelaunch/regulatory risk. It is a source-and-server-render audit, not legal advice or a factual verification of third-party services.

Reviewed production routes and shared copy include Home, About, Research, Practice, Ventures, Corner Spa, Careers and every current role detail page, Blog, Brand, Contact, Links, FAQ, Register, Institutional Status, Privacy and Terms; shared navigation, forms, metadata, JSON-LD, `llms.txt`, `src/lib/site.ts`, `src/lib/site-af.ts`, `src/lib/content.ts`, `src/lib/blog.ts` and `src/lib/careers.ts` were also reviewed.

Validation run after the narrow fixes below:

- `npm run lint` — passed.
- `npm run build` — passed; 87 pages generated.
- `git diff --check` — passed.
- Production-server render checks passed for the revised English/Afrikaans careers, venture, blog, FAQ, About and `llms.txt` copy, including absence checks for superseded wording.

Limits: no browser/device assistive-technology session was available, and the external Corner Spa/Mendozer site and source documents behind published research figures could not be independently inspected in this environment. Findings that require those sources are labelled as evidence/owner decisions rather than stated as factual errors.

## Summary

The core proposition is unusually clear where it matters most: current commercial work is separated from future learning, the NTA/NQA status is repeated consistently, and careers routes identify an email-first application path and a fixed closing time. The strongest copy is on `/status`, `/practice`, `/contact` and the current careers landing page after correction.

The most material remaining exposure is not stylistic. It is a combination of incomplete Afrikaans localisation, research and price claims that do not give a reader inspectable source or effective date, and legal/privacy wording that needs an owner-confirmed operational basis.

## Severity scale

- **P0 — corrected:** direct conflict with a stated prelaunch/recruitment guardrail or a material misleading claim.
- **P1 — resolve before relying on the copy as an institutional record:** a reader cannot verify a consequential claim, a locale substantially fails, or a privacy/legal statement needs an owner decision.
- **P2 — planned copy polish:** clear but less direct, inconsistent, or technically/localisation incomplete. These are not claims that should be invented or changed without approval.

## P0 corrections made and validated

| Area | Issue found | Narrow correction applied |
| --- | --- | --- |
| Planned Untag site | Public copy said Oryx **“will take over”** Untag Guesthouse. That asserted a completed/certain property transition, contrary to the prelaunch guardrail against asserting property control, executable lease or approved premises use. | `src/lib/site.ts`, `src/lib/site-af.ts` and `public/llms.txt` now say Oryx **identifies Untag Guesthouse as a planned future hospitality-focused site**. The existing non-open/no-course disclosure remains. |
| Recruitment role pages | The public pages displayed specific duties, selection behaviour, fee policy, access-arrangement process and a statement about administration under Namibian law although approved job specifications and selection criteria are not available. | Removed public duty lists and unsupported process/policy statements. Role summaries now identify the vacancy and say that full specifications, duties, thresholds and employment terms are not published. The pages retain the approved CV-by-email route and the deadline. |
| Recruitment email form | The form required a “relevant experience and fit” statement and solicited interview/access arrangements. Those fields created unapproved application criteria and invited sensitive information. | Name, reply contact, town/region and a short note are optional; the access-arrangement field and required fit statement were removed. The visitor still confirms the client-side mailto handoff and attaches a CV themselves. No site-side storage was introduced. |
| Ventures positioning | “Live classroom”, “live lab” and “classroom on the floor” could imply present teaching or training activity. | Replaced with operating-venture/operating-setting language across shared English/Afrikaans venture copy, Corner Spa metadata and blog copy. |
| Afrikaans legal terms | The Afrikaans terms mentioned admission, placement and study agreements, unlike the English page and contrary to the prelaunch status. | The passage now says an enquiry creates no place, intake or qualification claim and that the office states the current position in writing. |

## P1 findings requiring confirmation or an owner decision

### 1. The Afrikaans Brand Register is almost entirely English

**Evidence:** `src/app/[lang]/(site)/brand/page.tsx` has an Afrikaans route but its `copy.af` object, download descriptions and swatch usage descriptions are largely the English strings. This includes title, metadata, headings, body copy, calls to action and brand rules.

**Why it matters:** `/af/brand` is advertised through the language switch as a full Afrikaans page. A nearly English-only policy/asset page undermines that promise and can cause a reader using the declared `lang="af"` page to receive an inaccessible or misleading language experience.

**Required decision:** either provide an approved Afrikaans brand-register translation, or label the route/document clearly as English-only and do not present it as a parallel-language page. Brand rules should be translated by a fluent reviewer because “lockup”, clear-space and usage directives are implementation-sensitive.

### 2. The Afrikaans Corner Spa blog article is mostly English

**Evidence:** `src/lib/blog.ts` supplies a `bodyAf` article, but after its short Afrikaans opening it retains English headings, service descriptions, price table, booking instructions, contact section and links.

**Why it matters:** this is customer-facing transactional copy on `/af/blog/corner-spa`, not a deliberately English-first research note. It includes booking and price information, so partial translation is especially likely to impede action or invite misunderstanding.

**Required decision:** publish a reviewed full Afrikaans article, or intentionally present the whole article in English with a prominent, early notice and a link to the English route. Do not machine-translate service names/prices without the service owner verifying the canonical menu.

### 3. Research notes assert source discipline without showing usable citations

**Evidence:** `/research` says “Every figure carries its source, or it does not ship.” `src/lib/content.ts` contains consequential labour, population, vocational-enrolment and levy claims, but the rendered notes name organisations in prose without URLs, publication titles, page/table references, publication dates or a source list.

**Why it matters:** the numbers may be correct, but a reader cannot audit the source trail from the page. This conflicts with the site’s own evidence promise and weakens an institutional research posture.

**Required decision:** before promoting the notes, add an inspectable source list for each note: publisher, exact document/dataset title, publication/release date, relevant table/page or series, URL and access date. Preserve uncertainty where the source is an estimate or a reported intake. Do not add citations until the original records are checked.

### 4. Corner Spa services and price claims lack a dated source in the Oryx article

**Evidence:** `src/lib/blog.ts` lists named treatments and prices as facts, while the article is dated 5 November 2026. The venture pages direct readers to `spa.mendozer.com`, but the Oryx page does not give an “as at” date, a source link beside the table or a change notice.

**Why it matters:** prices, menu availability and booking details are changeable commercial information. The audit could not independently inspect the external counter.

**Required decision:** either (a) make the external spa counter the sole price/menu source and remove the duplicated Oryx table, or (b) retain the table with an approved effective date, a direct source link and a clear “subject to the current Corner Spa menu” statement. Confirm the Corner Spa number and price list with the service owner before publication reliance.

### 5. Privacy copy needs a confirmed operational and embedded-service basis

**Evidence:** `src/app/[lang]/(site)/legal/privacy/page.tsx` says the organisation uses systems under its control, sets no advertising cookies and builds no profiles. Corner Spa routes embed `https://spa.mendozer.com` in an iframe, while the privacy page explains only the email handoff and does not explain the embedded third-party service.

**Why it matters:** no claim is made here that Mendozer tracks visitors, but the site cannot responsibly imply that an embedded external origin has the same handling as Oryx without confirming it. “Systems under our control”, retention periods and request handling are also operational/legal commitments that need a responsible owner.

**Required decision:** have the privacy owner confirm actual mailbox, access, retention, deletion and request-handling practice; then add a concise disclosure that the embedded Corner Spa counter is served by Mendozer and is governed by its own handling when loaded. Do not claim cookie/tracking status for the third-party service without evidence.

## P2 improvements for the next approved editorial pass

| Area | Finding | Recommended direction |
| --- | --- | --- |
| Afrikaans consistency | Some remaining Afrikaans UI/metadata strings are English, for example Brand Register, several image alternatives and small labels on Research, shared header/footer and older Corner Spa material. | Complete a route-by-route Afrikaans QA sweep after the P1 pages. Preserve official names and URLs where they are intentionally English. |
| Afrikaans careers names | Careers pages mix Afrikaans explanatory prose with English job titles and programme labels. That may be appropriate if the notices use official English titles, but the policy is not stated. | Confirm which titles must remain official English. Translate only explanatory labels and keep one consistent convention. |
| Research localisation | Research explicitly discloses that notes are published in English, which is clear and acceptable. At the same time `src/lib/content.ts` carries unused Afrikaans title/dek fields. | Keep the English-first disclosure, then either publish reviewed Afrikaans summaries or remove dormant locale fields so the implementation reflects the content policy. |
| CTA terminology | Most primary actions are clear (“Enquire”, “Apply by email”, “Read institutional status”). A few venture phrases such as “Brief the Market R&D desk” privilege internal terminology over visitor intent. | Test a plainer approved alternative such as “Discuss a market research project” only after the service owner confirms the intended enquiry scope. |
| Page hierarchy | The strongest pages lead with a current action and status. Some narrative pages place the actual task after institutional metaphor. | Retain the voice, but use a one-sentence factual orientation and one context-appropriate action above decorative or conceptual copy. This is a style opportunity, not a factual defect. |
| Accessible localisation | English image alt text on Afrikaans routes is lower-risk than customer-facing body copy, but is read in the declared Afrikaans document language. | Translate user-facing alt text where it communicates information; retain empty alt text for decorative images. |

## Positive checks retained

- Status copy consistently says Oryx is working toward NTA training-provider registration, is not registered/accredited, and does not offer accredited qualifications, NQF credits or a public campus.
- Current work is consistently separated from future learning pathways on Home, Practice, Apply, FAQ, About and Status.
- Careers preserves the approved deadline, `vacancies@oryxinstitute.org` route, role-level detail URLs and mailto-only handling. The website does not store a CV or form submission.
- Links correctly distinguish the official Google Business Profile from the planned Untag map destination, and the official Pinterest link remains a social destination rather than embedded content.
- Contact copy is direct and gives a single clear public source for phone, WhatsApp, email, links and postal correspondence.

## Recommended release gate

The narrow P0 corrections are safe to release after ordinary deployment checks. Before using the research, Corner Spa price copy, privacy language or `/af/brand` as a public institutional reference, complete the relevant P1 owner decision and evidence review. No broad tone rewrite is recommended until those factual and localisation gates are resolved.
