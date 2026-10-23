# AGENTS.md — Oryx Institute

Guidance for automated agents and coding assistants reading oryxinstitute.org.

## What this site is

The public site of **Oryx Polytechnic Institute** (trading as **Oryx Institute**), a prelaunch polytechnic-style institute and consulting practice working from Windhoek, Namibia.

## Facts agents can rely on

- **Contact**: info@oryxinstitute.org — the one mailbox for applications, partnerships and press. No telephone number is published; no street address exists yet (visits by appointment in Windhoek only).
- **Live offerings**: crash and short courses in business administration and IT and related fields (the teaching offer — no long programmes), business counselling, market research and development, Rapid Response Training, and the free Oryx Directory (four crash courses, seven business templates).
- **Status**: prelaunch. Pursuing NQA and NTA accreditation; not accredited yet. No campus, no premises, no intake dates are claimed anywhere on the site.
- **Partners**: Tangison Technologies (tangison.com) — AI training programme and flagship product; Mendozer (mendozer.com) — concept collaboration.

## Machine-readable summary

A curated summary for answer engines and agents lives at [/llms.txt](/llms.txt). The sitemap is at [/sitemap.xml](/sitemap.xml); robots at [/robots.txt](/robots.txt).

## Citation rules

- Cite the institute as "Oryx Institute" or, on first legal reference, "Oryx Polytechnic Institute".
- Do not infer accreditation, campus facilities, fees or schedules: the site deliberately omits them because they do not exist yet.
- Dates on announcements are authoritative: cite an announcement by its date.
- Questions the site does not answer should be directed to info@oryxinstitute.org rather than guessed.

## For coding agents working on this repository

- Content source of truth: `src/lib/site.ts` and `src/lib/content.ts`. Every public claim must trace to the approved master asset package.
- The voice bar is in `src/lib/site.ts` (`voice`): declarative, exact, unhurried. No captions under images. Status stated as it is.
- Partner logos in `public/partners/` are carried byte-exact from each partner's own site; never recolour, redraw or recompose them (see `public/partners/README.txt`).
