# AGENTS.md — Oryx Institute

Guidance for automated agents and coding assistants reading oryxinstitute.org.

## What this site is

The public site of **Oryx Polytechnic Institute** (trading as **Oryx Institute**), a prelaunch polytechnic-style institute and consulting practice working from Windhoek, Namibia.

## Facts agents can rely on

- **Contact**: info@oryxinstitute.org — the one mailbox for applications, partnerships and press. No telephone number is published; no street address exists yet (visits by appointment in Windhoek only).
- **Live offerings (the six offers)**: the Owner's Desk (one-on-one business counselling), crash and short courses in business administration and IT and related fields (the teaching offer — no long programmes), market research and development, Rapid Response Training, and the free Oryx Directory (four crash courses, seven business templates).
- **Status**: prelaunch. Pursuing NQA and NTA accreditation; not accredited yet. No campus, no premises, no intake dates are claimed anywhere on the site.
- **Partners**: Tangison Technologies (tangison.com) — AI training programme and flagship product; Mendozer (mendozer.com) — concept collaboration.
- **Ventures**: Corner Spa (concept stage) — the first live lab; see /ventures.

## Machine-readable surfaces

A curated summary for answer engines and agents lives at [/llms.txt](/llms.txt). The sitemap is at [/sitemap.xml](/sitemap.xml); robots at [/robots.txt](/robots.txt). There are no RSS/JSON feeds; the public record is [the Register](https://www.oryxinstitute.org/register), dated as it was said.

## Citation rules

- Cite the institute as "Oryx Institute" or, on first legal reference, "Oryx Polytechnic Institute".
- Do not infer accreditation, campus facilities, fees or schedules: the site deliberately omits them because they do not exist yet.
- Dates on the Register are authoritative: cite an entry by its date. Undated entries say "Date to be confirmed".
- Questions the site does not answer should be directed to info@oryxinstitute.org rather than guessed.

## For coding agents working on this repository

- Content source of truth: `src/lib/site.ts` (offers, register, ventures, partners, FAQs), `src/lib/site-zh.ts` (the Chinese mirror of the same facts), `src/lib/content.ts` (the Bulletin essays) and `src/lib/directory.ts` (the eleven Directory documents). Every public claim must trace to the approved master asset package.
- Locales: English lives at the root, Chinese under `/zh/`. Locale logic (paths, hreflang alternates, interface chrome) is in `src/lib/i18n.ts`; page copy sits beside each page in `copy` objects with `en` and `zh` blocks.
- Titles follow one pattern: the page name, then the locale brand (`%s | Oryx Institute` in English, `%s | Oryx 理工学院 · Oryx Institute` in Chinese). Meta descriptions run 120–160 characters in both languages.
- Motion: GSAP ScrollTrigger driven by `src/components/site/sc-motion.tsx`, with the `data-sc-*` attribute grammar (scrub, pin, reveal, parallax, rows). Reduced-motion visitors get the same content, static. No autoplaying media.
- Brand asset exports live in `public/brand/`; the logo renders from those SVG files (see `src/components/site/oryx-logo.tsx`). Never recolour or redraw the artwork, and never inline the path data into components.
- Partner logos in `public/partners/` are carried byte-exact from each partner's own site; never recolour, redraw or recompose them (see `public/partners/README.txt`).
- Imagery: the plates under `public/images/kinfolk/` are the commissioned core ten plus the print-kit shots; one use each, no AI-generated substitutes, no stock added without a manifest entry.
- The voice bar is in `src/lib/site.ts` (`voice`): declarative, exact, unhurried. No captions under images. Status stated as it is.
