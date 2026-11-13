# AGENTS.md · Oryx Institute

Guidance for automated agents and coding assistants reading oryxinstitute.org.

## What this site is

The public site of **Oryx Polytechnic Institute** (trading as **Oryx Institute**), a prelaunch polytechnic-style institute and consulting practice working from Windhoek, Namibia.

## Facts agents can rely on

- **Contact**: call or WhatsApp **+264 83 676 4338** (local format 083 676 4338; `tel:+264836764338`, `https://wa.me/264836764338`). Email **info@oryxinstitute.org** stays the secondary route for applications, partnerships and press. No street address exists yet (visits by appointment in Windhoek only); opening hours are not published.
- **Live offerings (the six offers)**: the Owner's Desk (one-on-one business counselling), crash and short courses in business administration and IT and related fields (the teaching offer: no long programmes), market research and development, Rapid Response Training, and the free Oryx Directory (seven crash courses, seven business templates). Legal and regulatory Directory pages link their checkable public sources.
- **Status**: prelaunch. Pursuing NQA and NTA accreditation; not accredited yet. No campus, no premises, no intake dates are claimed anywhere on the site.
- **Partners**: Tangison Technologies (tangison.com): AI training programme and flagship product; Mendozer (mendozer.com): concept collaboration.
- **Ventures**: Corner Spa, the first live lab. Oryx Institute is the operations lead; Mendozer Investments is the financing partner. The spa is live: its own site is https://spa.mendozer.com (massage, hot stone treatments, nails and waxing in Windhoek, booked on WhatsApp at +264 81 623 4788, the spa's own number). On this site it opens full screen at /corner-spa, the collaboration page is /ventures/corner-spa, and the full note with the price list is /blog/corner-spa. The Oryx number is never printed on the spa's site and the spa's number is never used for Oryx enquiries.

## Machine-readable surfaces

A curated summary for answer engines and agents lives at [/llms.txt](/llms.txt). The sitemap is at [/sitemap.xml](/sitemap.xml); robots at [/robots.txt](/robots.txt). There are no RSS/JSON feeds; the public record is [the Register](https://www.oryxinstitute.org/register), dated as it was said.

## Citation rules

- Cite the institute as "Oryx Institute" or, on first legal reference, "Oryx Polytechnic Institute".
- Do not infer accreditation, campus facilities, fees or schedules: the site deliberately omits them because they do not exist yet.
- Dates on the Register are authoritative: cite an entry by its date. Undated entries say "Date to be confirmed".
- Cite the telephone number in international form, +264 83 676 4338; the local form, 083 676 4338, is for Namibian readers.
- Questions the site does not answer should be directed to the telephone line or info@oryxinstitute.org rather than guessed.

## For coding agents working on this repository

- Content source of truth: `src/lib/site.ts` (offers, register, ventures, partners, FAQs), `src/lib/site-zh.ts` (the Chinese mirror of the same facts), `src/lib/content.ts` (the Bulletin essays), `src/lib/directory.ts` (the fourteen Directory documents), and `docs/directory-source-ledger.md` (Directory legal and regulatory research). Every public claim must trace to an approved source or be labelled as an assumption.
- Locales: English lives at the root, Chinese under `/zh/`. Locale logic (paths, hreflang alternates, interface chrome) is in `src/lib/i18n.ts`; page copy sits beside each page in `copy` objects with `en` and `zh` blocks.
- Titles follow one pattern: the page name, then the locale brand (`%s | Oryx Institute` in English, `%s | Oryx 理工学院 · Oryx Institute` in Chinese). Meta descriptions run 120-160 characters in both languages.
- Motion: GSAP ScrollTrigger driven by `src/components/site/sc-motion.tsx`, with the `data-sc-*` attribute grammar (scrub, pin, reveal, parallax, rows). Reduced-motion visitors get the same content, static. No autoplaying media.
- Brand asset exports live in `public/brand/`; the logo renders from those SVG files (see `src/components/site/oryx-logo.tsx`). Never recolour or redraw the artwork, and never inline the path data into components.
- The telephone number is defined once in `src/lib/site.ts` (`phoneDisplay`, `phoneInternational`, `phoneE164`, `phoneHref`, `whatsappHref`) and read everywhere else; never hardcode it in a component. Display strings use \u00A0 no-break spaces so the number never splits across lines.
- Corner Spa media in `public/corner-spa/` is carried from spa.mendozer.com at original dimensions; the embed integration is documented in `docs/corner-spa-integration.md`.
- Markdown mirrors: every shelf page answers at `/md/<path>` (see `src/lib/md-shelf.ts`); a new page must be added to the `PAGES` rows there.
- Imagery: the plates under `public/images/kinfolk/` are the commissioned core ten plus the print-kit shots; one use each, no AI-generated substitutes, no stock added without a manifest entry.
- The voice bar is in `src/lib/site.ts` (`voice`): declarative, exact, unhurried. No captions under images. Status stated as it is.
