# Ongwediva centre and venture facts design

## Intent

Publish the confirmed planning facts from the BOOST Up submission without turning the website into a competition form or making accreditation, opening-date, address, learner-outcome, funding, or qualification claims that are not supported by the supplied evidence.

## Why now

The public website currently says the institute has no public premises and describes Corner Spa as still in development. The supplied submission summary says the first dedicated training-centre site is secured at Untag Guest House in Ongwediva, is not open yet, and that Corner Spa is operating.

## Goals

- State that the first dedicated training-centre site at Untag Guest House in Ongwediva is secured, planned, and not open yet
- Retain the existing Windhoek office and no-public-address wording
- Align the ventures surface with the stated operating status of Corner Spa
- Preserve the pre-launch, pre-accreditation, and non-NQF-credit boundaries
- Keep English and Afrikaans content in step
- Update machine-readable and LLM-facing material that presents the changed facts

## Non-goals

- Do not publish a street address, opening date, BIPA number, certificate image, NQA/NTA approval, course fee, instructor, learner result, funding result, or competition narrative
- Do not claim that every course ends in a venture
- Do not add new public language routes or machine-translated legal/academic copy
- Do not recreate the `理工` mark without the approved master artwork
- Do not change the office city from Windhoek to Ongwediva

## Approved facts and exact wording

### Planned training centre

Use this core sentence or a faithful Afrikaans equivalent:

> Oryx has secured its first dedicated training-centre site at Untag Guest House in Ongwediva. The centre is planned and is not open yet.

The sentence must sit beside the existing office wording so readers do not mistake a secured future centre for a currently open public campus.

### Corner Spa

Use this core sentence or a faithful Afrikaans equivalent:

> Corner Spa is Oryx's first operating venture, run with Mendozer Investments. It is a live setting for practical business and service work.

Keep the spa's own booking and service information with its existing source site. Do not make unverified licensing or learner-outcome claims.

## Approaches considered

1. **Replace all Windhoek references with Ongwediva:** Rejected. The owner selected the planned-centre-only rule, and the supplied information does not establish that the current office moved.
2. **Publish a full campus profile now:** Rejected. The centre is not open, the public street address has not been approved, and certificates will follow later.
3. **Add the planned-centre statement and align the operating venture status:** Selected. It corrects the public contradiction while keeping current evidence boundaries intact.

## Technical shape

The site already keeps repeated institutional facts in `src/lib/site.ts` and `src/lib/site-af.ts`, with route-level copy for About, Contact, FAQ, Ventures, the Markdown shelf, the search index, and `public/llms.txt`. The implementation should extend those existing structured content sources rather than spread new facts through components.

## Validation

- English and Afrikaans pages containing the changed facts return 200
- Their canonical URL, alternate links, and `Content-Language` headers remain correct
- Sitemap, rendered HTML, Markdown negotiation, and internal navigation checks still pass
- Source scan confirms no accidental public Chinese copy or unapproved public address was added
- Lint, production build, and whitespace validation pass

## Open follow-up

The visual-only `理工` mark awaits the approved master artwork. Additional local-language routes await the owner's selection of specific languages, translation reviewers, and a content scope that excludes unsafe machine translation of legal and accreditation material.
