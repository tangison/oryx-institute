# Oryx Institute — Content Plan

## Content model

All content lives in `/src/lib/content.ts` as typed data structures. No fabricated facts. All unknown fields are "To be confirmed" or omitted.

## Content types

### Schools (5)

| Slug | Name | Status |
|---|---|---|
| safety | School of Safety | Planned |
| administration | School of Administration and Commerce | Planned |
| hospitality | School of Hospitality and Tourism | Planned |
| digital | School of Information and Digital Skills | Planned |
| future | School of Future Schools | Register your interest |

### Programmes (8)

Each programme has unique voice, description, outcomes, assessment, and progression. Rewritten from template-swap AI slop to differentiated content.

| Slug | Name | School | Level |
|---|---|---|---|
| occupational-safety-foundations | Occupational Safety Foundations | safety | Certificate |
| site-safety-inspection | Site Safety Inspection | safety | Short Course |
| office-administration | Office Administration | administration | Certificate |
| bookkeeping-and-payroll | Bookkeeping and Payroll | administration | Certificate |
| food-and-beverage-service | Food and Beverage Service | hospitality | Certificate |
| front-office-reception | Front Office Reception | hospitality | Short Course |
| end-user-computing | End-User Computing | digital | Certificate |
| digital-literacy-and-productivity | Digital Literacy and Productivity | digital | Short Course |

### Glossary (6 VET terms)

| Slug | Term | Abbreviation |
|---|---|---|
| rpl | Recognition of Prior Learning | RPL |
| wil | Work-Integrated Learning | WIL |
| nqa | Namibia Qualifications Authority | NQA |
| nqf | National Qualifications Framework | NQF |
| vet | Vocational Education and Training | VET |
| tvet | Technical and Vocational Education and Training | TVET |

### Static content pages

- About page: mission, vision, values (8 values), institutional status
- Founder page: founder profile and vision
- Brand page: complete brand system documentation
- Partners page: five partnership types with detail pages
- FAQ page: 7 questions with accordion interaction
- Research page: research and advisory vision
- Updates page: milestone timeline (3 milestones)
- Contact/Register forms: genuine enquiries only

### Legal pages

- Privacy Policy: data collection, usage, storage, rights, cookies
- Terms of Use: institutional status, IP, liability, governing law
- Accessibility Statement: WCAG 2.2 AA target, known limitations, reporting

## Content rules

1. **No fabricated facts**: programme durations, fees, intake dates, accreditation numbers are "To be confirmed" or omitted.
2. **No template-swap**: each programme, school, glossary entry has unique voice and structure.
3. **No AI slop keywords**: "serious" replaced with "lasting", "genuine", "committed"; "disciplined" replaced with "rigorous", "methodical"; "rooted in the Namibian landscape" replaced with "shaped by Namibia's working realities".
4. **No em dashes in body text**: metadata titles may use em dashes (standard SEO practice); body text uses commas or rephrasing.
5. **Greek preservation**: ὄρυξ always `lang="grc"`, `text-transform: none`, Noto Serif font.

## SEO strategy (programmatic)

The glossary system provides the foundation for programmatic SEO:

- `/glossary` — index page (crawlable)
- `/glossary/[slug]` — 6 individual VET term pages with definitions, related terms, internal links
- Each glossary page has unique `title`, `description`, `canonical`, and `BreadcrumbList` structured data

Future expansion (not yet built):
- Industry landing pages
- Programme comparison pages
- Location-specific pages (Windhoek, Namibia)
- Integration pages (NQA, NQF, employer partnerships)
