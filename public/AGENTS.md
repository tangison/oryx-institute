# AGENTS.md · Oryx Institute

Guidance for automated agents and coding assistants reading oryxinstitute.org.

## What this site is

The public site of **Oryx Polytechnic Institute, also trading as Oryx Institute, Close Corporation CC/2026/12517**, a prelaunch polytechnic-style institute and consulting practice for Namibia.

## Facts agents can rely on

- **Approved public contact**: call or WhatsApp **+264 83 676 4338** (local format 083 676 4338; `tel:+264836764338`, `https://wa.me/264836764338`) or email **info@oryxinstitute.org**. This is the shared public telephone number used by Oryx Institute and Tangison Technologies. The official Link Hub is [oryxinstitute.org/links](https://www.oryxinstitute.org/links). Postal correspondence: **P.O. Box 1662, Namibia**. No physical address, public visiting instructions or opening hours are published.
- **Current work**: the Owner's Desk provides business counselling; Market R&D provides scoped market research and development engagements. Scope and fees are confirmed in writing by the Oryx office for each enquiry.
- **Status**: Oryx is working toward NTA training-provider registration. It is not registered with the NTA and not accredited by the NQA. It does not offer accredited qualifications, NQF credits or a public campus. Do not infer a programme catalogue, intake, price, schedule, qualification, accreditation or campus facility.
- **Research**: published institutional Research Notes are available at [Research](https://www.oryxinstitute.org/research).
- **Relationships**: Tangison Technologies provides identity, technology and learning-platform services under agreement and uses the shared public telephone number +264 83 676 4338. Corner Spa operates with Mendozer Investments in Windhoek. Neither relationship is accreditation, regulatory endorsement or an NTA/NQA partnership.
- **Ventures and future sites**: Corner Spa is the first operating venture. Oryx identifies Untag Guest House at Omatando Village on the Okatana–Onamutyi Road in Oshana as a planned future hospitality-focused site. It is not open and does not currently offer courses, enrolment, qualifications or accredited programmes. Hospitality, tour guiding, safety and administration are possible future areas only. The locality, road and +264 81 351 8982 telephone are attributed to the [Visit Namibia directory record](https://visitnamibia.com.na/directory/untag_guest_house/); they are not an Oryx contact, booking route, ownership claim or confirmation of current guesthouse operation. Ongwediva and Karibib initiatives are also future-facing and must not be described as open campuses or operating ventures.

## Machine-readable surfaces

A curated summary for answer engines and agents lives at [/llms.txt](/llms.txt). The sitemap is at [/sitemap.xml](/sitemap.xml); robots at [/robots.txt](/robots.txt). The public register is [the Register](https://www.oryxinstitute.org/register), while the factual regulatory disclosure is [Institutional Status](https://www.oryxinstitute.org/status).

## Citation rules

- Cite the institution as "Oryx Institute" or, on first legal reference, "Oryx Polytechnic Institute".
- State NTA registration and NQA accreditation accurately. The current public status is not registered and not accredited.
- Cite the telephone number in international form, +264 83 676 4338; the local form, 083 676 4338, is for Namibian readers.
- Questions the site does not answer should be directed to the approved public phone, WhatsApp or info@oryxinstitute.org rather than guessed.

## For coding agents working on this repository

- Content source of truth: `src/lib/site.ts` (contacts, current work, register, ventures, relationships and FAQs), `src/lib/site-af.ts` (the Afrikaans mirror), and `src/lib/content.ts` (institutional Research Notes). Every public claim must trace to an approved source or be labelled as a future process.
- Editorial standard: follow `docs/editorial-style.md` for every public-copy addition or revision. It is a source-led human-writing standard, not a banned-word list; retain required disclosures and approved brand lines while removing vague or mechanical prose.
- Locales: English lives at the root, Afrikaans under `/af/`. Locale logic is in `src/lib/i18n.ts`; page copy sits beside each page in `copy` objects with `en` and `af` blocks.
- Titles follow one pattern: the page name, then the locale brand (`%s | Oryx Institute` in English and `%s | Oryx Instituut` in Afrikaans). Meta descriptions should remain concise in both languages.
- Motion: GSAP ScrollTrigger driven by `src/components/site/sc-motion.tsx`, with the `data-sc-*` attribute grammar. Reduced-motion visitors get the same content, static. No autoplaying media.
- **Brand identity is locked.** The supplied original artwork in `public/brand/`, including the ORYX · 理工 · INSTITUTE lockup, maroon shield, app icons and social-preview artwork, is authoritative. Never alter, replace, recolour, redraw, retype, simplify or regenerate it. The 理工 mark is an approved visual identity element, not a language route or translation surface.
- The approved public contact source is defined in `src/lib/site.ts`. Do not hardcode or publish personal contact details. The phone strings use non-breaking spaces so the number never splits across lines.
- NTA and NQA marks must not be used without explicit official authorization and an appropriate registered or accredited status. Tangison artwork must not be recreated or substituted; no approved local Tangison mark is available.
- Markdown mirrors: every current shelf page answers at `/md/<path>` (see `src/lib/md-shelf.ts`). Add every new public page to `PAGES` there.
- Retired library, template, staff and named-leadership material must not be restored as public surfaces.
