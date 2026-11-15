# Public discoverability and answer-quality audit

**Reviewed:** 13 November 2026

## Current search posture

Oryx is prelaunch and working toward NTA training-provider registration. It is not registered or accredited. Search content must make that distinction clear and must not imply a qualification, campus, intake, NQF credit, regulator partnership or endorsement.

The current public entry points are:

- Research Notes and research pages
- Current practice: business counselling and market research
- Operating ventures, where confirmed
- Institutional Status and the dated Register
- Contact and the Link Hub

The discontinued Oryx Directory, course pages, resource templates, named-leadership pages and per-offer application routes are not search-entry pages. Retired routes return `410 Gone` with `X-Robots-Tag: noindex, nofollow` and are omitted from the sitemap.

## Completed corrections

- Status wording distinguishes NTA training-provider registration from future NQA accreditation.
- The Contact page and Link Hub use the approved contact and social data.
- The Link Hub’s Maps route is explicitly a temporary discovery search and does not claim an official Business Profile.
- The Link Hub omits the Directory and uses the public Register and Status routes instead.
- The Institutional Status page names official NTA and NQA information sources without their marks.
- The Register is a dated history; the Institutional Status page is the authority for the present regulatory disclosure.

## Ongoing checks

1. Keep canonical URLs, alternate-language URLs and sitemap rows aligned to public routes only.
2. Update the `Status as at` date only when the regulatory disclosure has been reviewed against a verifiable fact.
3. Replace the Maps discovery search with a verified Business Profile Share link only after verification.
4. Do not add regulator or partner marks without explicit permission and confirmed status.
5. Do not infer traffic, rankings, impressions, conversion or demand without measured data.

## Release check

Before publishing a public page or social post, verify that its wording agrees with `src/lib/site.ts`, `src/lib/site-af.ts`, the Institutional Status page and the Register. Where a claim has a regulatory or legal consequence, the source record and approval must be available before the claim is published.
