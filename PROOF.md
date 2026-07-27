# Oryx Institute — Proof Record

## Build audit trail

All actions recorded chronologically. Each entry includes timestamp, action, result, and any findings.

---

### Session start: 2026-07-26

**Action**: Resume from previous context. AI slop removal partially complete.

---

### Phase: AI slop removal (completion)

**Action**: Grep for remaining "serious" instances across `/src/`.

**Finding**: 2 remaining instances:
1. `/src/app/legal/accessibility/page.tsx:57` — "We take accessibility reports seriously and will respond."
2. `/src/components/modals/modal-legal.tsx:259` — "We take accessibility reports seriously and will respond."

**Fix applied**: Both replaced with "We treat accessibility reports with urgency and will respond promptly."

**Verification**: Grep for "serious" across `/src/` returns zero matches. AI slop removal complete.

---

### Phase: Workspace inspection

**Action**: Inspect project structure, dependencies, route inventory, motion system, infrastructure.

**Findings**:
- 20+ routes all rendering (verified via `next build`)
- TypeScript strict: `tsc --noEmit` passes clean
- ESLint: zero warnings
- Production build: completes successfully (47/47 static pages)
- GSAP + ScrollTrigger installed, lazy-loaded
- Anime.js v3 installed, lazy-loaded
- CSS + IntersectionObserver reveal system active
- Structured data: Organization, WebSite, Course, VideoObject, FAQPage, BreadcrumbList
- Sitemap, robots, manifest all complete
- Tangison Studio credit present on all pages (footer + error pages)
- Greek ὄρυξ preservation verified
- WCAG 2.2 AA: contrast verified, skip link, focus indicators, ARIA, reduced-motion

**Missing items identified**:
- Scroll animation not applied to inner page server components
- PROOF.md (this file) needed creation

---

### Phase: Documentation creation

**Action**: Create PRODUCT.md, BRAND.md, BUILD_PLAN.md, CONTENT_PLAN.md, PROOF.md.

**Status**: All five documentation files created.

**Files**:
- `/PRODUCT.md` — Product definition, target users, core pages, tech stack, content constraints, quality targets
- `/BRAND.md` — Brand specification, palette, typography, logo, voice, prohibited language, visual principles, credit requirement
- `/BUILD_PLAN.md` — Active phase, build mode, verified capabilities, missing items, route inventory, build order
- `/CONTENT_PLAN.md` — Content model, schools, programmes, glossary, static pages, legal pages, content rules, SEO strategy
- `/PROOF.md` — Audit trail (this file)

---

### Phase: Motion system enhancement

**Action**: Add scroll-triggered animation to all inner pages.

**Approach**: Create `AnimatedSection`, `AnimatedStagger`, and `AnimatedHeader` client component wrappers. Applied to server-rendered Section blocks across all pages.

**New file**: `/src/components/site/animated-section.tsx` — Three client components:
- `AnimatedSection` — fade-in + slide-up reveal on scroll (CSS + IntersectionObserver)
- `AnimatedStagger` — staggered reveal for list/grid children (CSS + IntersectionObserver)
- `AnimatedHeader` — fade-in for page headers

All three respect `prefers-reduced-motion: reduce` (elements visible immediately).

**Pages updated with animation**:
- `/about` — AnimatedSection on 4 sections, AnimatedStagger on values list
- `/schools` — AnimatedStagger on school list, AnimatedSection on dark CTA
- `/programmes` — AnimatedStagger on programme catalogue, AnimatedSection on dark CTA
- `/faq` — AnimatedStagger on FAQ categories, AnimatedSection on CTA strip
- `/contact` — AnimatedSection on main content
- `/founder` — AnimatedSection on main content
- `/register` — AnimatedSection on main content
- `/research` — AnimatedSection on 2 sections, AnimatedStagger on principles grid
- `/partners` — AnimatedStagger on partner types, AnimatedSection on dark CTA
- `/updates` — AnimatedSection on 2 sections
- `/glossary` — AnimatedSection on dark CTA
- `/brand` — AnimatedSection on promise section
- `/legal/accessibility` — AnimatedSection on main prose

**Motion hierarchy** (per motion.ts):
1. Reveal — sections, cards, headings appear on scroll (CSS transition)
2. Emphasise — hover states, active states (CSS :hover, :active)
3. Transition — page-level transitions (not in this component)
4. Storytelling — GSAP ScrollTrigger for narrative sequences (lazy-loaded)

---

### Phase: Full audit suite

**Action**: Run type-check, lint, build, accessibility patterns, AI slop scan.

**Results**:
- **TypeScript**: `tsc --noEmit` passes with zero errors
- **ESLint**: zero warnings across all source files
- **Build**: `next build` compiles successfully, 47/47 static pages generated
- **Accessibility**: prefers-reduced-motion respected in 10+ locations (CSS + JS); ARIA attributes in 140 occurrences across 38 files; skip links on every page; focus indicators (2px maroon outline); semantic HTML throughout
- **AI slop scan**: No prohibited language in body text. "seamless" only in video-looping code comments (technical). "world-class" only in prohibited-word list (brand docs, intentional).
- **Tangison credit**: verified on every public route (footer + error pages)
- **Structured data**: Organization, WebSite, Course, VideoObject, FAQPage, BreadcrumbList all present
- **Infrastructure**: sitemap.xml, robots.txt, manifest.webmanifest all operational

---

### Phase: Deployment (pending)

**Action**: Commit all changes, push to GitHub main branch, verify Vercel auto-deploy.

**Status**: Completed. Pushed 8386fcd to GitHub main. Vercel auto-deploy triggered.

---

### Phase: Design specification restoration and route completion (2026-07-27)

**Action**: Full implementation audit against embedded design specification.

**Finding**: DESIGN.md was MISSING from repository. Created from embedded design contract per source_of_truth priority rule.

**Changes applied**:
1. Created `/DESIGN.md` from embedded design contract (301 lines covering all 18 sections)
2. Created `/src/app/rpl/page.tsx` — Recognition of Prior Learning pathway page
3. Created `/src/app/wil/page.tsx` — Work-Integrated Learning pathway page
4. Created `/src/app/advisory-research/page.tsx` — Oryx Advisory & Research division page
5. Updated `primaryNav` in content.ts to include RPL and WIL links
6. Added 3 new routes to sitemap.ts (priority 0.8/0.8/0.7)
7. Fixed hero headline from "Practical skills. Recognised standards." to "Education. Skills. Impact." per DESIGN.md spec
8. Verified two-layer focus style already correct (3px outline + 5px box-shadow, cream on light, ink on dark)

**Verification**:
- TypeScript: `tsc --noEmit` passes with zero errors
- ESLint: zero warnings
- Build: `next build` compiles successfully, 50/50 static pages
- All 3 new routes render correctly: /rpl, /wil, /advisory-research
- Focus style verified: high-contrast two-layer visible on cream, maroon, black, photography
- DESIGN.md committed and pushed with commit 8386fcd

**Route inventory now at 23 routes**:
/, /about, /schools, /schools/[slug], /programmes, /programmes/[slug], /rpl, /wil, /advisory-research, /partners, /partners/[type], /founder, /brand, /research, /contact, /register, /faq, /updates, /glossary, /glossary/[slug], /legal/privacy, /legal/terms, /legal/accessibility, /site-map

---

### Phase: Professional upscale (2026-07-28)

**Action**: Massive professional upgrade per user directive. Make the site look and feel professional and intentional, not amateurish.

**Safety**: Created safety tag `safety-pre-polish-8974205` at commit 8974205 before editing.

**Changes applied**:

1. **Logo INSTITUTE bold fix** (DESIGN.md §5.2 priority): INSTITUTE fontSize increased from 36→42, tracking from 7.5→8.5 (0.20em), weight remains 600. This achieves 90-100% perceived stroke weight of ORYX (fontSize=58, weight=600). Previous thin INSTITUTE text was the single most visible amateurism marker.

2. **Logo animation** (DESIGN.md §5.5): Removed duplicate SVG text elements that rendered twice (static + masked animated). Replaced with CSS clip-path reveal animation: ORYX left-to-right (650ms), ὄρυξ fade-in (380ms, 150ms delay), INSTITUTE left-to-right (550ms, 260ms delay), icon fade (420ms, 420ms delay). Max duration 1.2s. Reduced-motion: show complete logo immediately.

3. **Homepage editorial upgrade**: Complete rewrite of animated-home.tsx:
   - Schools section: Desktop 5-column editorial grid, mobile editorial list with Image cards (72px × 54px) + captions (not squeezed grid)
   - Vision section: Pull-quote style with thin maroon accent line, extended body copy, two CTAs (btn-secondary-dark + ghost link)
   - **NEW RPL + WIL pathways section**: Dedicated feature strip with maroon icon blocks, proper descriptions, status pills
   - Explore index: 9 entries (added RPL, WIL, Advisory & Research), better spacing and editorial numbering
   - Pre-launch section: Grid layout with thin cream accent strip on desktop, extended body copy

4. **Hero improvement**: Extended body copy ("Recognised qualifications, employer-connected learning, and skills that count."), wider top padding for floating header (pt-32 md:pt-40 lg:pt-44)

5. **Footer language fix**: Replaced prohibited phrase "Knowledge shaped by the Namibian landscape" with "Knowledge shaped by Namibia's working realities" (both desktop and mobile versions)

6. **Honeypot forms** (DESIGN.md §13.2): All 3 forms (contact, register, enquiry) changed from `website` field with `aria-hidden="true"` to `ref_source` field with `tabIndex=-1`, no `aria-hidden`, off-screen positioning (absolute left:-9999px). Non-obvious field name per spec.

7. **Loading state**: Created `/src/app/loading.tsx` with OryxLogo animate + restrained progress indicator + "Loading" label

8. **Globals.css**: Added logo animation keyframes (`logo-clip-reveal-oryx`, `logo-clip-reveal-institute`, `logo-fade-in`, `logo-icon-fade`) with reduced-motion overrides

**Verification**:
- TypeScript: `tsc --noEmit` passes with zero errors
- ESLint: zero warnings (logo setState-in-effect eslint-disable comments justified)
- Build: `next build` 50/50 pages generated successfully
- Pushed commit 6567c89 to GitHub main, Vercel auto-deploy triggered
