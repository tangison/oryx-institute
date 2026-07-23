# Phase 4 — Audit & Comprehensive Redesign Plan

**Project:** Oryx Institute pre-launch website
**Phase:** 4 (Audit) of the Webman workflow
**Mode:** Planning (per user instruction)
**Authority documents:**
1. `/home/z/my-project/upload/DESIGN.md` (master design contract, v1.0, 23 July 2026)
2. `redesign-existing-projects` skill checklist (Taste Skill, leonxlnx)
3. `BRAND.md`, `BUILD_PLAN.md`, `PRODUCT.md`, `CONTENT_PLAN.md` (existing project artefacts)

**Audit date:** 24 July 2026
**Auditor:** Super Z (main agent) operating in ultra-think mode

---

## 1. Executive summary

The site is **structurally complete but visually non-compliant with DESIGN.md**. The previous build shipped a multi-page Next.js 16 architecture (19 routes, 41 generated pages), authentic logo extraction, form infrastructure, sitemap, robots, manifest, 404 and 500 — all functionally sound. The "ugly" verdict from the user is correct, and the root cause is **a complete typography and palette mismatch** with the master design contract.

The site was built against the older `BRAND.md` tokens, not the new `DESIGN.md` contract. The most consequential divergences are:

1. **Wrong fonts.** The site uses Fraunces (display serif) + Inter (body). DESIGN.md mandates **Cinzel** (or licensed Trajan) for display and **Source Sans 3** for body. This single substitution is responsible for most of the "ugly" verdict — Fraunces is warm and editorial; the brand wants institutional Roman capitals.
2. **Wrong palette.** Maroon is `#721220` but DESIGN.md mandates `#7A0F1E`. Cream is `#FCFBF9` but DESIGN.md mandates `#FFF8EF`. Ink is `#0F0E0D` but DESIGN.md mandates `#171717`. The differences look small in hex but read as "cooler, less warm, less institutional" on screen.
3. **Missing supporting systems.** DESIGN.md specifies an 11-step spacing scale, a 6-step neutral palette, a 4-step status palette, a 10-step type scale, four border tokens, two shadow tokens, three gradient tokens, and a two-layer focus ring. The current `globals.css` implements almost none of these as named tokens.
4. **Motion too slow.** Current durations are 600ms / 400ms / 200ms. DESIGN.md mandates 360ms / 200ms / 120ms — materially snappier, more institutional.
5. **Touch targets below 44px.** Header buttons and hero controls are 40px (`w-10 h-10`). DESIGN.md mandates 44 × 44 minimum.
6. **Container too narrow.** Current `max-width: 80rem` (1280px); DESIGN.md mandates `90rem` (1440px) with larger gutters on desktop.
7. **Status vocabulary misaligned.** Current uses `Planned / Subject to approval / TBA`. DESIGN.md mandates `Planned / Subject to accreditation / Applications not yet open / Approved`.

The plan below is structured into **eight waves**, ordered by the redesign-existing-projects skill's fix-priority rule (font swap → colour cleanup → interaction states → layout/spacing → component replacement → state design → typography polish → audit). Each wave lists exact file targets, the change, the verification method, and the stop condition.

---

## 2. Audit methodology

The audit applies three lenses simultaneously:

| Lens | Source | Question answered |
|---|---|---|
| **Contract compliance** | DESIGN.md Sections 5–21 | Does the implementation match the master design contract? |
| **Anti-generic quality** | redesign-existing-projects skill | Does the implementation avoid the documented AI design fingerprints? |
| **Functional completeness** | BUILD_PLAN.md + DESIGN.md Section 13 | Are all required routes, states, and components present and working? |

Each finding is graded:

- **CRITICAL** — violates an explicit DESIGN.md rule or breaks user trust.
- **MAJOR** — visible quality gap that materially affects perceived premium.
- **MINOR** — polish issue; fix opportunistically.
- **PASS** — confirmed compliant; no action.

---

## 3. Findings

### 3.1 Typography (CRITICAL)

**F1 — Wrong display font.**
- DESIGN.md §7.1: display face is **Trajan Pro 3** (licensed) or **Cinzel** (open fallback). All-capitals display.
- Current `layout.tsx`: `Fraunces` from `next/font/google`, weight 400/500/600/700, normal + italic.
- Impact: Fraunces is a soft warm humanist serif; the brand wants Roman-capital institutional gravitas. This is the single biggest visual reason the site "looks ugly".
- Files to change: `src/app/layout.tsx`, `src/app/globals.css` (rename `--font-serif` → `--font-display`).

**F2 — Wrong body font.**
- DESIGN.md §7.1: body and interface family is **Source Sans 3**.
- Current `layout.tsx`: `Inter` from `next/font/google`, weight 400/500/600/700.
- Impact: Inter is geometric and neutral; Source Sans 3 is more humanist and institutional. Subtle but persistent "wrongness".
- Files to change: `src/app/layout.tsx`, `src/app/globals.css` (rename `--font-sans` → `--font-body`).

**F3 — No formal type scale tokens.**
- DESIGN.md §7.3: 10 tokens (`display-xl` through `caption`) with explicit desktop + mobile sizes and line heights.
- Current: uses Tailwind utility classes (`text-5xl`, `text-base`, etc.) ad-hoc. No design-system scale.
- Files to change: `src/app/globals.css` (add type tokens), all section components and pages (adopt tokens).

**F4 — Tracking not enforced.**
- DESIGN.md §7.4: display titles `0.04em–0.12em` positive tracking; all-caps labels `0.10em–0.18em`.
- Current: headings use `tracking-tight` (-0.012em). Eyebrows use `0.18em`. Display titles should have **positive** tracking per Trajan/Cinzel practice, not negative.
- Files to change: `src/app/globals.css` (heading defaults), section components.

**F5 — Body measure uncontrolled.**
- DESIGN.md §7.5: ideal 55–75ch, max `72ch`.
- Current: body paragraphs use Tailwind `max-w-xl` (36rem ≈ 576px ≈ ~70ch at body size) — acceptable, but not enforced as a system. Prose blocks should explicitly cap at `72ch`.

### 3.2 Colour (CRITICAL)

**F6 — Wrong core palette.**
| Token | DESIGN.md | Current `globals.css` | Delta |
|---|---|---|---|
| `brand.maroon` | `#7A0F1E` | `#721220` (`--color-oryx-maroon`) | hue + saturation drift |
| `brand.maroon-dark` | `#4A0710` | `#4A231B` (`--color-oryx-maroon-deep`) | wrong — current is brown, not dark maroon |
| `brand.cream` | `#FFF8EF` | `#FCFBF9` (`--color-oryx-cream`) | cooler, less warm |
| `brand.ink` | `#171717` | `#0F0E0D` (`--color-oryx-ink`) | darker, slightly warm |
| `neutral.white` | `#FFFFFF` | `#FFFFFF` | PASS |

Files to change: `src/app/globals.css` (replace all `--oryx-*` and `--color-oryx-*` definitions). All references in components resolve through the tokens, so a single source-of-truth update propagates.

**F7 — Missing supporting neutral palette.**
- DESIGN.md §6.2 defines `neutral.900 / 700 / 500 / 300 / 150 / 075` (`#171717 / #4E4946 / #77706B / #CFC6BD / #E9E1D8 / #F5EEE6`).
- Current: only a single `--color-muted-foreground: #5C5147` and `--color-border: #D9CFC2` exist. No six-step scale.
- Impact: prevents layered hierarchy in body text, dividers, and quiet rules.

**F8 — Missing status palette.**
- DESIGN.md §6.2: `status.success #246B45`, `status.warning #8A5A00`, `status.error #A12622`, `status.info #315A73`. Must be paired with text/icon, not used alone.
- Current: only `--color-destructive: #8B1A1A` exists. No success/warning/info tokens.
- Impact: cannot implement DESIGN.md §12.9 notice component (info/success/warning/error).

**F9 — No gradient tokens.**
- DESIGN.md §6.4: `--gradient-maroon`, `--gradient-photo-dark`, `--gradient-cream` — only three approved.
- Current: hero uses inline `bg-gradient-to-t from-[rgba(15,14,13,0.92)] via-...`. The ink `15,14,13` is the old ink colour, not the new `23,23,23`.
- Impact: violates "no more than two gradients per viewport" rule because tokens aren't named and counted.

**F10 — Status vocabulary misaligned.**
- DESIGN.md §12.7: approved language is `Planned`, `Subject to accreditation`, `Applications not yet open`, `Approved`.
- Current: uses `Planned`, `Subject to approval`, `TBA`.
- Files to change: `src/lib/content.ts` (status strings), `src/components/site/section-schools.tsx` (status class mapper), `src/components/site/section-programmes.tsx`.

### 3.3 Layout and grid (MAJOR)

**F11 — Container too narrow.**
- DESIGN.md §8.1: `--container-max: 90rem` (1440px), gutters `1.25rem / 2rem / 4rem`.
- Current `globals.css` `.container-oryx`: `max-width: 80rem` (1280px), padding `1.5rem / 2.5rem / 3rem`.
- Files to change: `src/app/globals.css`.

**F12 — No formal grid system.**
- DESIGN.md §8.2: 4 columns (mobile, <640px, 16px gutter, 20px margin), 8 columns (tablet 640–1023px, 24px gutter, 32px margin), 12 columns (desktop ≥1024px, 24–32px gutter, 48–64px margin).
- Current: uses Tailwind `grid-cols-*` utilities ad-hoc. No documented grid.
- Files to change: `src/app/globals.css` (add grid tokens and helper classes), major layout-heavy sections.

**F13 — Spacing scale incomplete.**
- DESIGN.md §8.3: 11 tokens `--space-0` through `--space-10` (0 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128).
- Current: 10 tokens `--spacing-1` through `--spacing-32` (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128). Missing `--space-0`, renamed indices.
- Files to change: `src/app/globals.css`. Tailwind v4 reads `--spacing-*` for its spacing scale, so renaming requires care — see Wave 4 plan.

**F14 — Symmetric vertical padding.**
- redesign-skill: "Top and bottom padding are always identical. Adjust optically — bottom padding often needs to be slightly larger."
- Current `section-schools.tsx`: `py-20 md:py-28 lg:py-32`. Symmetric. Needs optical adjustment: bottom slightly larger.

### 3.4 Shape, border, depth (MAJOR)

**F15 — Radius too rigid.**
- DESIGN.md §9.1: default `0`, small functional `2px`, maximum normal `4px`. Circular reserved for portraits/status dots.
- Current: ALL radii forced to `0px` (sm/md/lg/xl). No allowance for the 2px/4px functional radius.
- Files to change: `src/app/globals.css` (`--radius-sm: 2px; --radius-md: 4px`), input fields and buttons that benefit from 2px.

**F16 — No border tokens.**
- DESIGN.md §9.3: `--border-subtle: 1px solid #E9E1D8`, `--border-default: 1px solid #CFC6BD`, `--border-strong: 2px solid #171717`, `--border-accent: 2px solid #7A0F1E`.
- Current: single `--color-border: #D9CFC2` used everywhere. No strong or accent borders.
- Files to change: `src/app/globals.css`, components needing visual hierarchy.

**F17 — No shadow tokens.**
- DESIGN.md §9.4: `--shadow-low: 0 1px 2px rgba(23,23,23,0.08)`, `--shadow-raised: 0 12px 30px rgba(23,23,23,0.10)`. Tinted to ink, not pure black.
- Current: no shadow tokens defined. Components use no shadows (which is mostly correct) but floating nav has no token to use.
- Files to change: `src/app/globals.css`, header when scrolled.

**F18 — Diagonal motif absent.**
- DESIGN.md §9.2: "the diagonal motif comes from the authentic shield... use it as a crop, rule, reveal, image edge or transition... one strong diagonal event per composition."
- Current: no diagonal motif used anywhere. The site is purely rectilinear.
- Opportunity: introduce one diagonal crop or rule per major composition (hero divider, school panel reveal edge, section divider).

### 3.5 Motion (MAJOR)

**F19 — Durations too slow.**
- DESIGN.md §14: `--duration-fast: 120ms`, `--duration-standard: 200ms`, `--duration-slow: 360ms`, `--ease-standard: cubic-bezier(0.2,0,0,1)`.
- Current: `--duration-slow: 600ms`, `--duration-base: 400ms`, `--duration-fast: 200ms`, `--ease-oryx: cubic-bezier(0.22,1,0.36,1)`.
- Impact: site feels sluggish. The 600ms reveal is the most noticeable — should be 360ms.
- Files to change: `src/app/globals.css`, all components referencing durations.

**F20 — Marquee animation.**
- DESIGN.md §14 avoid list does not explicitly ban marquees, but does ban "decorative counters" and "rotating words". The slow 60s marquee is borderline.
- Decision: keep the school ticker marquee if it exists, but slow it further and ensure reduced-motion disables it. If it adds noise without information, replace with a static list.
- Verify: search for `marquee` usage and audit.

**F21 — Reduced-motion handling.**
- Current `globals.css` has a `@media (prefers-reduced-motion: reduce)` block that nulls `.reveal`, disables smooth scroll, and zeroes animation/transition durations.
- Hero slider has no reduced-motion guard. `useEffect` still fires `setInterval(next, 7000)` regardless of motion preference.
- DESIGN.md §14: "Disable automatic transitions when `prefers-reduced-motion: reduce` is active."
- Files to change: `src/components/site/hero.tsx` (check `matchMedia('(prefers-reduced-motion: reduce)')` and skip autoplay).

### 3.6 Interactivity and states (MAJOR)

**F22 — Touch targets below 44px.**
- DESIGN.md §15: "Keep touch targets at least 44 × 44 CSS px."
- Current `header.tsx`: mobile menu button `w-10 h-10` (40px). Below minimum.
- Current `hero.tsx`: prev/play/next buttons `w-10 h-10` (40px). Below minimum.
- Files to change: `header.tsx`, `hero.tsx` — bump to `w-11 h-11` (44px) minimum.

**F23 — Focus ring wrong spec.**
- DESIGN.md §13.1: `:focus-visible { outline: 3px solid #FFF8EF; box-shadow: 0 0 0 5px #171717; }` — two-layer, cream outline with ink halo.
- Current: `outline: 2px solid var(--oryx-maroon); outline-offset: 2px;` — single-layer maroon.
- Files to change: `src/app/globals.css`.

**F24 — Missing button states.**
- DESIGN.md §13: every interactive component must define default/hover/active/pressed/focus/disabled/loading/success/validation failure/server failure/timeout.
- Current `.btn-primary` / `.btn-secondary` / `.btn-ghost`: default ✓, hover ✓, disabled ✓ (primary only), focus ✓ (via `:focus-visible`). Missing: **active/pressed** (scale(0.98) or translateY(1px)), **loading** state.
- Files to change: `src/app/globals.css` (add `:active`), form components (add loading state on submit button).

**F25 — Missing route states.**
- DESIGN.md §13: every route should account for empty/no results/offline/maintenance/access denied/session expired/locked preview/404/500.
- Current: 404 ✓ (`not-found.tsx`), 500 ✓ (`error.tsx`), empty ✓ (`/updates`). Missing: offline, maintenance, access denied, session expired, locked preview.
- Plan: build a generic `<StateScreen variant="offline|maintenance|access-denied|session-expired|locked-preview" />` component. Wire `offline` to a service-worker check (or a simple `navigator.onLine` listener). The other states can be placeholder routes for now since pre-launch has no auth.

### 3.7 Components (MAJOR)

**F26 — Card pattern review.**
- DESIGN.md §12.5: "Cards are optional, not the default page structure. Use a card only when content represents a discrete object or action. Avoid identical card grids repeated in every section. Do not use nested cards. Do not use floating glass cards over photographs."
- Current `about/page.tsx`: values grid is `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]` with `bg-white p-8` cells — a 3-card row. This is the "generic AI layout" the redesign skill explicitly calls out.
- Plan: convert values to an editorial 2-column zig-zag or a single-column numbered list with diagonals. Audit other sections for the same pattern.

**F27 — Notice component missing.**
- DESIGN.md §12.9: "Notices use a left rule, clear heading and plain explanation. Information: blue-grey. Success: green. Warning: amber-brown. Error: red. Do not use maroon for every status."
- Current: no notice component. Pre-launch notice in footer is a plain paragraph.
- Plan: build `<Notice variant="info|success|warning|error" title=... body=... />` with a 4px left border in the status colour, a clear heading, and plain text.

**F28 — Forms need Source Sans 3 + 16px minimum.**
- DESIGN.md §12.6: "Use Source Sans 3 at 16px minimum for input text. Inputs have a minimum height of 48px. Borders remain visible in all states. Errors are shown beside the relevant field and summarised at the top. Preserve user input after validation failure. Do not use placeholders as labels."
- Current `.input-oryx`: `font-size: 0.9375rem` (15px) — below 16px minimum. `padding: 0.75rem 0.875rem` → total height ≈ 36–40px — below 48px.
- Files to change: `src/app/globals.css` (`.input-oryx`), all form components.

**F29 — Buttons below 48px height.**
- DESIGN.md §12.3: "Minimum height: 48px."
- Current `.btn-primary`: `padding: 0.75rem 1.5rem` → height ≈ 40–44px. Below 48px.
- Files to change: `src/app/globals.css` (`.btn-primary`, `.btn-secondary`).

### 3.8 Logo and identity (MAJOR)

**F30 — Extracted mark may not satisfy DESIGN.md authority hierarchy.**
- DESIGN.md §5.1: "Use only the supplied Oryx Institute assets: primary horizontal lock-up; approved stacked lock-up; shield or symbol-only mark; approved reversed variations. Never redraw or regenerate the mark."
- Current `oryx-mark.png` (173×226) is a **crop** of `oryx-logo.png`, not a redraw — so technically compliant. But DESIGN.md §1 authority order puts "approved, original Oryx logo files" at #1. The user has indicated they will supply more logo images.
- Plan: keep `oryx-mark.png` as the shield-only mark for now. When user supplies the additional images, replace it with the approved asset. Build the header and footer logo treatment to accept either horizontal lock-up OR shield-only mark.

**F31 — Clear space not enforced.**
- DESIGN.md §5.3: minimum clear space `0.35S` (S = shield width), preferred `0.5S`.
- Current `header.tsx`: logo `h-10 md:h-12` with `gap-3` (12px) to the wordmark. Shield width at `h-10` (40px tall) ≈ 30px wide. `0.35 × 30 = 10.5px`. Current 12px gap barely meets minimum, but the shield is bordered by header edges with no documented exclusion.
- Plan: add explicit padding/margin tokens for logo clear space, document in `globals.css`.

**F32 — Minimum lock-up width.**
- DESIGN.md §5.4: "Digital full lock-up: 144 CSS px wide minimum. Digital shield: 28 CSS px wide minimum."
- Current `header.tsx`: logo `h-10` (40px tall, ~30px wide shield) + `gap-3` + wordmark "Oryx Institute" at `text-base` (16px). Total lock-up width ≈ 30 + 12 + ~120 = ~162px. PASS on desktop. On mobile, may be tight — verify.
- Plan: ensure mobile lock-up width ≥ 144px by either reducing wordmark size proportionally or dropping wordmark on smallest screens (shield-only at ≥28px).

**F33 — User request: "make the logo very big".**
- DESIGN.md §5.5: "Website: once in the navigation and once in the footer is normally enough." The logo should anchor, not wallpaper.
- Resolution: keep ONE logo in header and ONE in footer (per DESIGN.md authority). Make them prominent in size — header shield at `h-14 md:h-16` (56–64px) instead of `h-10 md:h-12` (40–48px). This satisfies the user request without violating the brand rule.

### 3.9 Imagery (MINOR)

**F34 — No image register.**
- DESIGN.md §10.5: "Maintain an image register with filename, source, licence, subject, crop and pages or routes used. A repeated image must have a narrative reason."
- Current: 16 images in `/public/images/` and `/public/oryx-*.{png,svg}`. No register exists.
- Plan: create `/home/z/my-project/IMAGE_REGISTER.md` documenting every asset.

**F35 — Founder photograph.**
- DESIGN.md §10.2: "Use the supplied founder photograph in the founder section. Do not generate a replacement founder."
- Current: `/public/images/founder/founder-1.png` is an AI-generated portrait. The user has indicated they will supply the authentic founder photograph.
- Plan: replace `founder-1.png` with the authentic photograph when supplied. Until then, mark the generated image as a placeholder in the image register and consider using a non-portrait treatment (silhouette, architectural shot of the founder's workspace) on `/founder`.

### 3.10 Content and voice (PASS with notes)

**F36 — Prohibited words scan: PASS.**
- Grep for `revolutionise|unlock|next generation|cutting edge|seamless|game changing|world class|unwavering commitment` returned no matches in `src/`.
- No action required; maintain discipline going forward.

**F37 — Em dash scan: needs verification.**
- DESIGN.md §19.2: "Avoid em dashes in public copy. Use an en dash for numeric ranges."
- The grep didn't return reliable results (type filter issue). Re-scan with `rg '—' src/` and replace with en dash `–` or restructure sentence.
- Files to change: any found instances.

**F38 — Namibian English: PASS.**
- Copy uses `recognised`, `programme`, `organisation`. Verified in `about/page.tsx` and content data.

**F39 — Email address.**
- DESIGN.md §1: "The current approved email is `contact@oryxinstitute.org`."
- Current `layout.tsx` metadata: `metadataBase: new URL("https://oryxinstitute.na")` and `authors: [{ name: "Oryx Institute", url: "https://oryxinstitute.na" }]`. No email visible.
- Need to verify `contact@oryxinstitute.org` is used on `/contact` and `/register` and footer. If `contact@oryxinstitute.na` exists anywhere, replace.

### 3.11 Accessibility (MAJOR)

**F40 — Heading order.**
- DESIGN.md §16: "Logical heading order."
- Need to verify each page has exactly one `h1` and `h2`/`h3` nest correctly. The `about/page.tsx` uses `h2` for "About Oryx Institute" via PageHeader, then `h2` for "What the institution stands for." — this may be acceptable but needs page-by-page audit.
- Plan: add an axe-core run as part of Wave 8.

**F41 — Alt text audit.**
- DESIGN.md §16: "Useful alt text for informative images. Empty alt text for decorative images."
- Current `header.tsx`: logo `alt=""` `aria-hidden="true"` — but the logo IS informative (it's the brand mark). Should have `alt="Oryx Institute"` or be paired with the visible wordmark (which it is — so empty alt is defensible).
- Current `hero.tsx`: slide images `alt={i === index ? s.alt : ''}` — only the active slide has alt. This is correct for a carousel.
- Current `section-schools.tsx`: school images `alt={school.alt}` — informative alt. PASS.
- Plan: spot-check `/founder`, `/brand`, `/campus`, `/research` for alt quality.

**F42 — Skip link.**
- Current `page.tsx`: `<a href="#main" className="skip-link">Skip to main content</a>` — PASS. But this is on the homepage only. The skip link should be in `layout.tsx` so it appears on every route.
- Files to change: `src/app/layout.tsx` (move skip link to layout, wrap children with `<main id="main">`).

### 3.12 Code quality (PASS with notes)

**F43 — Semantic HTML.**
- Current uses `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` appropriately. PASS.
- Need to verify the skip-link `#main` target exists on every route (currently in `page.tsx` only — see F42).

**F44 — Z-index scale.**
- Current uses ad-hoc `z-50`, `z-40`, `z-100`, `z-90`. No formal scale.
- Plan: define `--z-base`, `--z-header`, `--z-modal`, `--z-toast` in `globals.css`.

**F45 — Inline styles.**
- Current `hero.tsx` line 70: `style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}` — inline.
- Current `hero.tsx` line 91-94: inline `backgroundColor`, `color`, `borderColor`.
- These should be CSS classes. Plan: extract to `globals.css` as `.hero-headline-shadow` and `.btn-hero-secondary`.

### 3.13 Functional completeness (PASS)

**F46 — Multi-page architecture: PASS.**
- 19 page routes + manifest + robots + sitemap.xml + 404 + 500 = 24 route files, 41 generated pages. Matches user's explicit "multiple pages not just one page" instruction.

**F47 — Logo wordmark removed: PASS.**
- `oryx-mark.png` (173×226) is the cropped shield with no wordmark. Used in header, footer, 404, 500.

**F48 — Tangison Studio credit: PASS.**
- Footer includes "Made by Tangison Studio" linking to `https://studio.tangison.com`. DESIGN.md does not override this.

**F49 — Mandatory /brand page: PASS.**
- `/brand` route exists at `src/app/brand/page.tsx`.

**F50 — Pre-launch honesty: PASS.**
- All programme and school listings use "Planned" / "Subject to approval" language. No invented accreditations, numbers, or partners found in spot check.

---

## 4. Comprehensive fix plan

The plan is organised into **eight waves**. Each wave has a single theme, a list of file targets, a verification method, and a stop condition. Waves are sequential — do not parallelise waves that touch the same files.

### Wave 1 — Font swap (CRITICAL, lowest risk, biggest visual impact)

**Theme:** Replace Fraunces → Cinzel and Inter → Source Sans 3 across the entire site.

**Files:**
- `src/app/layout.tsx` — replace `Fraunces` and `Inter` imports with `Cinzel` and `Source_Sans_3` from `next/font/google`. Configure `variable: "--font-display"` and `variable: "--font-body"`. Cinzel weights: 400, 500, 600, 700. Source Sans 3 weights: 200, 300, 400, 500, 600, 700.
- `src/app/globals.css` — rename `--font-serif` → `--font-display` and `--font-sans` → `--font-body`. Update `--font-display` stack to `"Cinzel", "Times New Roman", Georgia, serif` per DESIGN.md §7.2 `--font-display-open`. Update `--font-body` stack to `"Source Sans 3", "Source Sans Pro", "Segoe UI", Arial, sans-serif`.
- `src/app/globals.css` `h1–h6` rule — set `font-family: var(--font-display)`. Add `text-transform: uppercase` for display headings (Cinzel is primarily all-caps; this is the brand intent). Add `letter-spacing: 0.04em` for display, `0.08em` for h2–h4.
- All section components and pages using `font-display` class — verify the class still resolves (it should, since it's defined in `@layer base`).

**Verification:**
- Visual: homepage hero, about page, schools section. Cinzel should render as Roman capitals.
- Build: `npm run build` must pass.
- Lighthouse: font display audit, no FOUT regression.

**Stop condition:** All headings render in Cinzel. All body text renders in Source Sans 3. No Fraunces or Inter references remain in `src/`.

---

### Wave 2 — Colour palette cleanup (CRITICAL)

**Theme:** Replace all `--oryx-*` and `--color-oryx-*` tokens with DESIGN.md §21 compliant tokens. Add the supporting neutral palette, status palette, gradient tokens, border tokens, shadow tokens.

**Files:**
- `src/app/globals.css` — full rewrite of the `@theme inline` and `:root` blocks. New token names per DESIGN.md §21:
  ```css
  --color-brand-maroon: #7A0F1E;
  --color-brand-maroon-dark: #4A0710;
  --color-brand-cream: #FFF8EF;
  --color-brand-ink: #171717;
  --color-white: #FFFFFF;

  --color-text: #171717;
  --color-text-secondary: #4E4946;
  --color-text-muted: #77706B;
  --color-surface: #FFF8EF;
  --color-surface-raised: #FFFFFF;
  --color-surface-alt: #F5EEE6;
  --color-border-subtle: #E9E1D8;
  --color-border: #CFC6BD;

  --color-success: #246B45;
  --color-warning: #8A5A00;
  --color-error: #A12622;
  --color-info: #315A73;

  --gradient-maroon: linear-gradient(135deg, #4A0710 0%, #7A0F1E 58%, #941B2D 100%);
  --gradient-photo-dark: linear-gradient(90deg, rgba(23,23,23,0.82) 0%, rgba(74,7,16,0.54) 52%, rgba(74,7,16,0.10) 100%);
  --gradient-cream: linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 100%);

  --border-subtle: 1px solid #E9E1D8;
  --border-default: 1px solid #CFC6BD;
  --border-strong: 2px solid #171717;
  --border-accent: 2px solid #7A0F1E;

  --shadow-low: 0 1px 2px rgba(23,23,23,0.08);
  --shadow-raised: 0 12px 30px rgba(23,23,23,0.10);
  ```
- All components and pages that reference `var(--oryx-maroon)`, `var(--oryx-cream)`, `var(--oryx-ink)`, `var(--oryx-warm-white)`, `var(--oryx-maroon-deep)`, `var(--color-oryx-*)` — find/replace with new token names. Use `rg "var\(--oryx-" src/` and `rg "var\(--color-oryx-" src/` to enumerate every reference.
- Update `::selection` to use `--color-brand-maroon`.
- Update `:focus-visible` to the two-layer treatment (see Wave 3).
- Update hero gradient overlay to use `--gradient-photo-dark` token instead of inline `rgba(15,14,13,...)`.

**Verification:**
- Visual: cream background should be visibly warmer (`#FFF8EF` vs `#FCFBF9`). Maroon should be slightly more saturated.
- WCAG: re-verify contrast ratios for all text-on-background pairings using the new hex values. Expected: ink-on-cream 17.01:1, maroon-on-cream 10.41:1, cream-on-maroon 10.41:1 — all pass AA.
- Build: `npm run build` must pass.

**Stop condition:** No `var(--oryx-` or `var(--color-oryx-` references remain in `src/`. All colour comes from DESIGN.md §21 tokens.

---

### Wave 3 — Interaction states (MAJOR)

**Theme:** Bring buttons, forms, and focus rings up to DESIGN.md §13 spec.

**Files:**
- `src/app/globals.css` `:focus-visible` — replace with two-layer treatment:
  ```css
  :focus-visible {
    outline: 3px solid #FFF8EF;
    box-shadow: 0 0 0 5px #171717;
    border-radius: 0;
  }
  /* Reverse on dark backgrounds */
  .dark-surface :focus-visible {
    outline: 3px solid #171717;
    box-shadow: 0 0 0 5px #FFF8EF;
  }
  ```
- `src/app/globals.css` `.btn-primary`, `.btn-secondary`, `.btn-ghost` — add `:active` state:
  ```css
  .btn-primary:active { transform: translateY(1px); }
  .btn-secondary:active { transform: translateY(1px); }
  ```
- Bump button height: `padding: 0.875rem 1.5rem` (was `0.75rem 1.5rem`) → height ≈ 48px.
- Bump input height: `.input-oryx` `padding: 0.875rem 1rem` (was `0.75rem 0.875rem`) and `font-size: 1rem` (was `0.9375rem`) → height ≈ 48px, font ≥ 16px.
- `src/components/site/header.tsx` — bump mobile menu button to `w-11 h-11` (44px).
- `src/components/site/hero.tsx` — bump prev/play/next buttons to `w-11 h-11` (44px).
- `src/components/site/forms/use-form-submission.tsx` — add `isSubmitting` state. Disable submit button while submitting. Show "Submitting..." text or a small inline spinner with text "Submitting" per DESIGN.md §13.2 ("Use text such as `Loading programmes`").
- `src/components/site/forms/register-form.tsx`, `contact-form.tsx`, `enquiry-form.tsx` — wire `isSubmitting` to button `disabled` and label change.

**Verification:**
- Manual: tab through every page, verify two-layer focus ring is visible on every interactive element.
- Manual: click buttons, verify translateY(1px) press feedback.
- Manual: submit a form, verify "Submitting..." state then success state.
- Lighthouse accessibility score ≥ 95.

**Stop condition:** Every interactive element has visible default/hover/active/focus/loading states. Touch targets ≥ 44px. Focus ring is two-layer.

---

### Wave 4 — Layout and spacing (MAJOR)

**Theme:** Adopt DESIGN.md §8 container, grid, and spacing tokens.

**Files:**
- `src/app/globals.css` `.container-oryx` — update to:
  ```css
  .container-oryx {
    width: 100%;
    margin-inline: auto;
    max-width: 90rem; /* 1440px per DESIGN.md §8.1 */
    padding-inline: 1.25rem; /* mobile gutter */
  }
  @media (min-width: 640px) {
    .container-oryx { padding-inline: 2rem; /* tablet */ }
  }
  @media (min-width: 1024px) {
    .container-oryx { padding-inline: 4rem; /* desktop */ }
  }
  ```
- `src/app/globals.css` spacing scale — rename to DESIGN.md §8.3 naming. **Careful:** Tailwind v4 generates spacing utilities from `--spacing-*` custom properties. Strategy: keep the Tailwind v4 default scale (which is already 4px-based) for `p-*`, `m-*`, `gap-*` utilities, AND add DESIGN.md-named tokens as additional custom properties for use in custom CSS:
  ```css
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;
  ```
- Add grid system documentation in `globals.css`:
  ```css
  /* Grid: 4 cols mobile / 8 cols tablet / 12 cols desktop (DESIGN.md §8.2) */
  .grid-oryx { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  @media (min-width: 640px) { .grid-oryx { grid-template-columns: repeat(8, 1fr); gap: 1.5rem; } }
  @media (min-width: 1024px) { .grid-oryx { grid-template-columns: repeat(12, 1fr); gap: 1.5rem; } }
  ```
- All section components using `py-20 md:py-28 lg:py-32` — review for optical asymmetry. Bottom padding should be slightly larger than top. Example: `pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-36`.
- Body text containers — enforce `max-w-[72ch]` on long-form prose blocks via `.prose-oryx` utility.

**Verification:**
- Visual at 320, 375, 414, 768, 1024, 1280, 1440 px — content should not stretch edge-to-edge on wide screens.
- Reading measure: longest body paragraphs should be 55–75 characters per line.
- Build: `npm run build` must pass.

**Stop condition:** Container is 1440px max with DESIGN.md gutters. Spacing tokens exist. Optical asymmetry applied to major sections.

---

### Wave 5 — Motion tightening (MAJOR)

**Theme:** Replace durations and easing with DESIGN.md §14 values. Add reduced-motion guard to hero.

**Files:**
- `src/app/globals.css` — replace motion tokens:
  ```css
  --duration-fast: 120ms;
  --duration-standard: 200ms;
  --duration-slow: 360ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  ```
- Remove old `--duration-base` and `--ease-oryx`. Find/replace all references: `var(--duration-base)` → `var(--duration-standard)`, `var(--ease-oryx)` → `var(--ease-standard)`.
- `src/components/site/hero.tsx` — add reduced-motion guard:
  ```tsx
  useEffect(() => {
    if (!playing) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // no autoplay
    timer.current = setInterval(next, 7000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [playing, next]);
  ```
- Hero crossfade duration: change `duration-700` to `duration-300` (closer to 360ms slow).
- Reveal: change `var(--duration-slow)` (now 360ms) — already correct after token update.
- Marquee: keep at 60s but ensure `@media (prefers-reduced-motion: reduce)` disables it (already does).
- Audit for parallax, scroll hijacking, rotating words, decorative counters, pointer-following text. Remove any found.

**Verification:**
- Manual with `prefers-reduced-motion: reduce` enabled in DevTools → hero should not autoplay, reveals should be instant.
- Visual: transitions should feel snappier (360ms max).
- No console warnings.

**Stop condition:** All durations ≤ 360ms. Hero respects reduced-motion. No parallax or scroll hijacking anywhere.

---

### Wave 6 — Component replacement and state design (MAJOR)

**Theme:** Replace generic card grids, add Notice component, add missing route states, align status vocabulary.

**Files:**
- **Notice component** — new `src/components/site/notice.tsx`:
  ```tsx
  export function Notice({ variant, title, children }: {
    variant: 'info' | 'success' | 'warning' | 'error';
    title: string;
    children: React.ReactNode;
  }) { /* 4px left border in variant colour, title, plain text */ }
  ```
  Use on `/updates` (info), `/register` success state (success), form errors (error), pre-launch notice (info).
- **Status vocabulary** — `src/lib/content.ts`: replace `'Subject to approval'` → `'Subject to accreditation'`, `'TBA'` → `'Applications not yet open'`. Add `'Approved'` as a future state. Update `section-schools.tsx` and `section-programmes.tsx` class mappers.
- **Values grid on /about** — convert from 3-card grid to editorial 2-column zig-zag: number + title on left, body on right, alternating sides. One diagonal rule between items.
- **Card audit** — scan all sections for `grid-cols-3` card rows. Replace with: asymmetric grids, horizontal scroll, masonry, or single-column editorial.
- **State screens** — new `src/components/site/state-screen.tsx`:
  ```tsx
  export function StateScreen({ variant, title, body, action }: {
    variant: 'offline' | 'maintenance' | 'access-denied' | 'session-expired' | 'locked-preview';
    ...
  })
  ```
  Add `/offline`, `/maintenance` placeholder routes (or wire to error boundaries). Add `navigator.onLine` listener in `layout.tsx` that swaps to offline state screen when offline.
- **Skip link** — move from `page.tsx` to `layout.tsx`. Wrap children with `<main id="main">`.

**Verification:**
- Visual: /about values section no longer looks like a generic 3-card row.
- Manual: disconnect network in DevTools → offline state screen appears.
- axe-core: no `color-contrast` or `aria-allowed-attr` violations.

**Stop condition:** No `grid-cols-3` card rows remain. Notice component used for all status messages. Status vocabulary matches DESIGN.md §12.7. Skip link on every route.

---

### Wave 7 — Typography polish and editorial rhythm (MINOR)

**Theme:** Apply tracking, measure, sentence case, and varied page architecture per DESIGN.md §7 and §17.4.

**Files:**
- `src/app/globals.css` — add type scale tokens:
  ```css
  --type-display-xl: clamp(2.75rem, 5vw + 1rem, 4.5rem); /* 44px → 72px */
  --type-display-lg: clamp(2.25rem, 4vw + 1rem, 3.5rem);
  --type-h1: clamp(2rem, 3vw + 1rem, 2.75rem);
  --type-h2: clamp(1.625rem, 2vw + 1rem, 2rem);
  --type-h3: clamp(1.375rem, 1vw + 1rem, 1.5rem);
  --type-h4: clamp(1.125rem, 0.5vw + 1rem, 1.25rem);
  --type-body-lg: clamp(1.125rem, 0.5vw + 0.5rem, 1.25rem);
  --type-body: 1.0625rem;
  --type-body-sm: 0.9375rem;
  --type-caption: 0.8125rem;
  ```
- Headings: apply `text-wrap: balance`. Body paragraphs: `text-wrap: pretty`.
- Scan all headings for Title Case → convert to sentence case (per redesign-skill: "Use sentence case instead"). Exception: proper nouns, programme names.
- Editorial rhythm: verify each page has a varied architecture. `/about` has 4 sections with different layouts — PASS. Audit `/schools`, `/programmes`, `/research`, `/founder`, `/brand`, `/campus` for template repetition.
- Em dash scan: `rg '—' src/` — replace with en dash `–` for ranges, or restructure sentence for asides.

**Verification:**
- Visual: headlines should look intentional, not uniformly huge.
- Manual: read every page, verify no template repetition.
- Build: `npm run build` passes.

**Stop condition:** Type scale tokens defined and used. Sentence case applied. No em dashes in public copy. Each page has a distinct rhythm.

---

### Wave 8 — Audit gate and proof (MAJOR)

**Theme:** Run the full pre-release audit gate per BUILD_PLAN.md and append everything to PROOF.md.

**Sequence:**
1. `npx tsc --noEmit` — TypeScript strict pass.
2. `npm run lint` — ESLint pass.
3. `npm run build` — production build pass.
4. Responsive check at 320, 375, 414, 768, 1024, 1280, 1440 px using Playwright or manual DevTools.
5. Reduced-motion check with `prefers-reduced-motion: reduce`.
6. axe-core scan via `@axe-core/playwright`.
7. Pa11y CLI scan.
8. Lighthouse run (performance, accessibility, best practices, SEO).
9. VLM design audit per page (homepage, about, schools, programmes, founder, brand, register).
10. Squirrelscan security scan.
11. SEO validation: sitemap.xml reachable, robots.txt correct, OG tags present, canonical URLs set.
12. IMAGE_REGISTER.md created and complete.
13. PROOF.md appended with every action in the specified row format.
14. worklog.md appended with Phase 4 summary.

**Stop condition:** All audits pass or have documented exceptions. PROOF.md is complete. Site is ready for user review (not deployment — user must explicitly authorise deployment).

---

## 5. Acceptance criteria

Phase 4 is complete when:

- [ ] All 50 findings (F1–F50) are either resolved or have a documented deferral.
- [ ] DESIGN.md §23 quality gate checklist passes (every checkbox ticked or explicitly deferred with reason).
- [ ] No `var(--oryx-` or `var(--color-oryx-` references remain in `src/`.
- [ ] No Fraunces or Inter references remain in `src/`.
- [ ] All headings render in Cinzel; all body in Source Sans 3.
- [ ] Maroon is `#7A0F1E`, cream is `#FFF8EF`, ink is `#171717`, maroon-dark is `#4A0710`.
- [ ] Container is 1440px max with 1.25rem/2rem/4rem gutters.
- [ ] Every interactive element has default/hover/active/focus/loading states.
- [ ] Touch targets ≥ 44px.
- [ ] Focus ring is two-layer (cream outline + ink halo).
- [ ] Hero respects `prefers-reduced-motion`.
- [ ] Motion durations ≤ 360ms.
- [ ] No generic 3-card grids.
- [ ] Notice component exists with four variants.
- [ ] Status vocabulary matches DESIGN.md §12.7.
- [ ] Skip link on every route.
- [ ] IMAGE_REGISTER.md exists and is complete.
- [ ] `npm run build` passes.
- [ ] axe-core: 0 violations.
- [ ] Lighthouse accessibility ≥ 95.
- [ ] PROOF.md appended with all Phase 4 actions.

---

## 6. Risk register

| ID | Risk | Mitigation |
|---|---|---|
| R1 | Cinzel all-caps may reduce readability for long headings | Use sentence case for h3-h4 body headings; reserve all-caps for display-xl and display-lg. Test with VLM audit. |
| R2 | Tailwind v4 spacing scale rename may break utilities | Don't rename Tailwind's `--spacing-*`. Add DESIGN.md tokens as parallel custom properties. |
| R3 | Source Sans 3 may not include all features Inter had (ss01, cv11) | Drop `font-feature-settings: "ss01", "cv11"` from body. Source Sans 3 has its own feature set. |
| R4 | Logo crop may not satisfy DESIGN.md authority | Keep crop until user supplies additional logo images. Document in IMAGE_REGISTER.md that the mark is a verified crop, not a redraw. |
| R5 | Removing `--oryx-*` tokens may break inline `style={{ color: 'var(--oryx-maroon)' }}` references | Find/replace pass before token deletion. Build will catch any misses. |
| R6 | Two-layer focus ring may look heavy on small elements | Test on all interactive elements. If too heavy, reduce to 2px outline + 3px box-shadow on inputs and small buttons. |
| R7 | 1440px container may feel too wide on 1366px laptops | Container is `max-width: 90rem` with auto margins — content centres on narrower screens. No action needed. |
| R8 | Status vocabulary change may break existing copy | Search for "Subject to approval" and "TBA" in all content files and replace. |
| R9 | Form input height change may break form layouts | Test all three forms (register, contact, enquiry) at mobile and desktop. |
| R10 | Cinzel italic doesn't exist (Cinzel is capitals-only) | Remove italic styling from display headings. Use Source Sans 3 italic for any italic body emphasis. |

---

## 7. Execution order

The waves are sequential. Each wave should be executed, verified, and committed (conceptually — actual git commits happen at deployment) before the next begins.

```
Wave 1 (Font swap)            →  Wave 2 (Colour cleanup)  →  Wave 3 (Interaction states)
                                                                      ↓
Wave 5 (Motion tightening)    ←  Wave 4 (Layout/spacing)  ←
        ↓
Wave 6 (Components/states)    →  Wave 7 (Typography polish) →  Wave 8 (Audit gate)
```

Estimated effort per wave (for planning, not commitment):
- Wave 1: 30 min (layout.tsx + globals.css + verification)
- Wave 2: 45 min (globals.css + find/replace + verification)
- Wave 3: 60 min (focus ring + button states + form loading + touch targets)
- Wave 4: 45 min (container + spacing + grid + optical asymmetry)
- Wave 5: 30 min (durations + easing + reduced-motion guard)
- Wave 6: 90 min (Notice + status vocab + values grid + state screens + skip link)
- Wave 7: 60 min (type scale + sentence case + em dash sweep + rhythm audit)
- Wave 8: 90 min (full audit gate + PROOF.md + worklog.md)

**Total estimated effort:** ~7.5 hours of focused work.

---

## 8. What I need from the user before / during execution

Per the user's message, they intend to supply "even more images to redo it" — specifically additional logo assets. The plan is structured so that:

1. **If the user supplies new logo images before Wave 1:** swap `oryx-mark.png` for the approved asset and proceed.
2. **If the user supplies new logo images during execution:** pause the current wave, swap the asset, resume.
3. **If the user supplies new logo images after execution:** swap the asset in a follow-up patch — no other changes needed since the logo is referenced by path, not embedded.

No other user input is required to proceed. The user said "execute on all suggested steps" — this plan is the suggested steps.

---

## 9. Stop conditions for the autonomous loop

Per the Webman specification:

1. **Three cycles without measurable improvement** — if three consecutive audit cycles produce no VLM score increase or no Lighthouse delta, stop and report.
2. **Ten cycles in one phase** — if Phase 4 audit + fixes exceed ten iterations, stop and report.
3. **Authority-required decision** — if a change requires brand-owner approval per DESIGN.md §24.1 (logo artwork, core colours, primary typefaces, institutional names, brand promise, design thesis, public accreditation language), stop and ask.

The colour change from `#721220` to `#7A0F1E` is a core colour change, but DESIGN.md (authority #2) explicitly mandates `#7A0F1E`, so this is contract compliance, not a brand-owner decision. Same for the font swap (DESIGN.md §7.1 explicitly mandates Cinzel + Source Sans 3). No authority escalation needed.

---

## 10. Next action

Begin **Wave 1 (Font swap)** immediately on user confirmation. The plan is comprehensive, the file targets are exact, and the verification methods are concrete. No further planning is required.
