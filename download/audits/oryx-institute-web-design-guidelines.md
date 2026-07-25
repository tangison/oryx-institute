# Oryx Institute — Vercel Web Interface Guidelines Audit

> Assessment date: 2026-07-25  
> Methodology: web-design-guidelines skill (vercel-labs/agent-skills)  
> Site URL: https://oryx-institute.vercel.app  

---

## src/app/layout.tsx

- Missing `themeColor` in metadata matching site background (#FFF8EF); `<meta name="theme-color">` required per Dark Mode rule
- No `translate="no"` on brand names rendered by child components ("Oryx Institute", "ὄρυξ") — Locale rule

## src/app/globals.css

- `.input-oryx:focus` uses `outline: none` replaced by `border-color` + `box-shadow` BUT should use `:focus-visible` instead of `:focus` to avoid showing ring on mouse click
- Missing `touch-action: manipulation` on buttons and interactive elements (Touch rule)
- Missing `-webkit-tap-highlight-color: transparent` (Touch rule)
- Missing `overscroll-behavior: contain` on `.offcanvas-panel` and `.modal-panel` (Touch rule)
- Missing `scroll-margin-top` for heading anchor targets (Accessibility rule)
- Missing `env(safe-area-inset-*)` on `.offcanvas-panel` and full-bleed containers (Safe Areas rule)

## src/components/site/header.tsx

- `transition-all duration-200` on `<header>` — anti-pattern; should transition specific properties (background, box-shadow)
- `<img>` missing `width` and `height` attributes (Images rule)

## src/components/site/footer.tsx

- `<img>` missing `width` and `height` attributes (Images rule)
- `new Date().getFullYear()` — should use `Intl.DateTimeFormat` for locale-aware year (Locale rule)
- No `translate="no"` on "Tangison Studio" brand name in credit link (Locale rule)

## src/components/site/editorial-hero.tsx

- `<img>` (poster/LCP) missing `width` and `height` attributes (Images rule)

## src/components/site/editorial-index.tsx

- `transition-all duration-200` on arrow icon — anti-pattern; should transition specific properties

## src/components/site/oryx-logo.tsx

- SVG `aria-label="Oryx Institute"` on logo but no `translate="no"` on parent element

## src/components/site/image-page-header.tsx

- `<img>` (above-fold hero) missing `width` and `height` attributes

## src/app/page.tsx

- `transition-all duration-200` on "All Schools" link — anti-pattern
- School showcase `<img>` elements missing `width` and `height` attributes
- Vision section `<img>` missing `width` and `height` attributes
- `transition-all duration-200` on "Read the full vision" link — anti-pattern

## src/app/about/page.tsx

- No `translate="no"` on "Tangi Iigonda" brand/person name link

## src/app/schools/page.tsx

- School `<img>` elements missing `width` and `height` attributes

## src/app/register/page.tsx

- Numbered step labels (01, 02, 03) missing `tabular-nums`
- `<a href="/legal/privacy">` should use Next `<Link>` for internal navigation

## src/app/partners/page.tsx

- "Research and Advisory" headings should use "Research & Advisory" per Content rule

## src/app/legal/privacy/page.tsx

- Hardcoded date "July 2026" — should use `Intl.DateTimeFormat` for locale-aware date

## src/app/legal/terms/page.tsx

- Hardcoded date "July 2026" — should use `Intl.DateTimeFormat` for locale-aware date

## src/components/site/forms/register-form.tsx

- Email `<input>` missing `spellCheck={false}`
- Placeholder "e.g. Khomas, Windhoek" doesn't end with `…` ellipsis character
- Non-auth `<select>` elements missing `autocomplete="off"`

## src/components/site/forms/contact-form.tsx

- Email `<input>` missing `spellCheck={false}`
- Placeholder "Tell us what you need." doesn't end with `…` ellipsis character

## src/components/site/forms/enquiry-form.tsx

- Email `<input>` missing `spellCheck={false}`
- Placeholder "Tell us what you need." doesn't end with `…` ellipsis character

## src/components/ui/button.tsx, accordion.tsx, switch.tsx, input-otp.tsx, navigation-menu.tsx

- shadcn defaults: `outline-none` + `transition-all` — `outline-none` is paired with `focus-visible` ring ✓, `transition-all` is inherited from upstream library

---

## Cross-cutting Issues Summary

| Category | Count | Key Issues |
|---|---|---|
| Anti-patterns | 5 | `transition-all` in header, editorial-index, page.tsx links |
| Images | 6 files | Missing `width`/`height` on `<img>` elements — CLS risk |
| Forms | 6 | Email missing spellCheck, placeholders missing trailing `…`, selects missing autocomplete |
| Locale | 3 | Hardcoded dates, no Intl.DateTimeFormat, no translate="no" on brand names |
| Touch | 3 globals | Missing touch-action, tap-highlight, overscroll-behavior |
| Safe Areas | 1 | Missing env(safe-area-inset-*) on offcanvas |
| Dark Mode | 1 | Missing meta theme-color |
| Typography | 1 | Missing tabular-nums on numbered step labels |
| Content | 1 | "Research and Advisory" → "Research & Advisory" |
| Focus | 1 | .input-oryx:focus → :focus-visible |
| Navigation | 1 | Internal <a> should be <Link> |

**Passed checks:** No user-scalable=no, no onPaste preventDefault, no autoFocus misuse, no div/span onClick, icon buttons have aria-label, form inputs have labels, headings hierarchical, skip link present, prefers-reduced-motion respected, aria-live on async updates, semantic HTML, text-wrap:balance/pretty used, lazy loading on below-fold, fetchPriority on above-fold
