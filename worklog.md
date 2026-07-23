# Oryx Institute — Shared Work Log

---
Task ID: 3
Agent: main (super-z)
Task: Continue autonomous build per user instruction — remove wordmark from logo and use it BIG, convert single-page+modals to multi-page Next.js routes, improve design, run impeccable audit.

Work Log:
- Inspected workspace state. Confirmed prior session built a complete single-page homepage with 15 sections, 9 modals, content data layer, header, footer, form handler, API route. All 16 hero/school/campus/founder/institute/brand/research images generated successfully.
- Analyzed oryx-shield.png (412x545) via ASCII visualization — confirmed it is a clean shield silhouette with NO wordmark.
- Analyzed oryx-logo.png (612x408) via ASCII visualization — confirmed it contains [black wordmark "ORYX INSTITUTE" | maroon shield symbol] side by side.
- Extracted the maroon shield portion from oryx-logo.png: wrote /home/z/my-project/scripts/extract_mark.py, found black wordmark ends at col 374, maroon shield starts at col 396, cropped to cols 392-565 (with margin), saved as /home/z/my-project/public/oryx-mark.png (173x226, pure maroon, 0 black pixels verified).
- Updated content.ts navigation arrays from modal-based (target/type/modal) to real route hrefs. Added secondaryNav for footer.
- Rewrote header.tsx to use Next.js Link with real routes, big oryx-mark.png logo (h-10 md:h-12), active route highlighting, mobile menu with route links.
- Rewrote footer.tsx to use Next.js Link with real routes, oryx-mark.png in brand section, Tangison Studio credit preserved.
- Created shared page components: PageShell, PageHeader, Prose, ProseSection, Section, SectionHeader, BackLink, Breadcrumbs.
- Created shared form infrastructure: useFormSubmission hook, FormStatus, FieldError, ContactForm, RegisterForm, EnquiryForm (reusable for 5 partner types).
- Built 19 page routes: /about, /founder, /brand (mandatory), /schools, /schools/[slug] (5 SSG), /programmes, /programmes/[slug] (8 SSG), /updates (empty state), /faq, /research, /site-map, /contact, /register, /partners, /partners/[type] (5 SSG: employers, wil, corporate, research, funding), /legal/privacy, /legal/terms, /legal/accessibility.
- Built app-router metadata files: manifest.ts (PWA), robots.ts, sitemap.ts (XML, all 36 URLs).
- Built error pages: not-found.tsx (404, dark dramatic), error.tsx (500, with reset).
- Fixed pre-existing TypeScript errors: zod v4 API change in submissions.ts (errorMap -> error), form-handler type fixes, modal-router SchoolSlug cast.
- Fixed sitemap route conflict: renamed human-readable page from /sitemap to /site-map (conflicts with sitemap.ts XML route).
- Updated modal-sitemap.tsx to use Next.js Link with new href-based navigation.
- Improved hero: strengthened gradient overlay (0.78 -> 0.92 at bottom), added top gradient for header legibility, added text-shadow to headline and body text, changed buttons from scroll-to-section to Link to /register and /about.
- Ran VLM design audit: homepage 8.5/10 -> 9/10 after improvements, about 7/10, mobile 7-8/10.
- Production build passes: 41 pages generated (19 static, 18 SSG, 2 dynamic API, 2 metadata routes).

Stage Summary:
- Multi-page site: 19 page routes + manifest + robots + sitemap.xml + 404 + 500 = 24 route files, 41 generated pages.
- Logo: oryx-mark.png (173x226, clean maroon shield, no wordmark) used BIG in header (h-12), footer (h-12), 404, and 500 pages.
- Design: editorial premium layout with Fraunces display serif + Inter body, 0px radius, 1px borders, no shadows, Oryx Maroon #721220, cream/ink palette, big display headings, asymmetric grids.
- All forms use client-side fetch to /api/submissions with success/error states, honeypot, consent, validation.
- Build: passes. TypeScript: clean (0 project errors).
- VLM audit: homepage 9/10, mobile 7/10, about 7/10.

---
Task ID: 4
Agent: main (super-z)
Task: Run Phase 4 (Audit) — apply new DESIGN.md design system, use redesign-existing-projects skill principles, produce comprehensive plan in planning mode.

Work Log:
- Read user-supplied DESIGN.md (1155 lines, 44 KB) in 3 chunks. Identified as master design contract v1.0 dated 23 July 2026, supersedes earlier BRAND.md on conflicts.
- Inspected current state: layout.tsx (Fraunces+Inter via next/font/google), globals.css (old tokens #721220/#FCFBF9/#0F0E0D, 80rem container, 600/400/200ms motion, single-layer maroon focus ring), header.tsx (logo h-10/h-12, w-10 touch targets), hero.tsx (no reduced-motion autoplay guard), footer.tsx (Tangison credit present), section-schools.tsx (editorial panels with varied rhythm), about/page.tsx (3-card values grid).
- Confirmed multi-page architecture is in place: 19 page routes + manifest + robots + sitemap + 404 + 500 = 24 route files, 41 generated pages. Logo wordmark already removed (oryx-mark.png is clean crop). All 16 images generated. Pre-launch honesty preserved.
- Ran redesign-existing-projects audit checklist across 8 dimensions: typography, colour, layout, interactivity, content, components, iconography, code quality.
- Cross-referenced findings against DESIGN.md mandatory tokens (Section 21), quality gate (Section 23), and component specs (Section 12).
- Identified 50 findings: F1-F5 typography (CRITICAL: wrong fonts), F6-F10 colour (CRITICAL: wrong hex values + missing palettes), F11-F14 layout (MAJOR), F15-F18 shape/border (MAJOR), F19-F21 motion (MAJOR), F22-F25 interactivity (MAJOR: 40px touch targets, single-layer focus), F26-F29 components (MAJOR: 3-card grid, no Notice, undersized forms/buttons), F30-F33 logo (PASS w/ notes), F34-F35 imagery (MINOR), F36-F39 content (PASS), F40-F42 accessibility (MAJOR: skip link only on home), F43-F45 code quality (PASS w/ notes), F46-F50 functional (PASS).
- Produced comprehensive plan at /home/z/my-project/PHASE4_AUDIT_AND_PLAN.md with 8 prioritised waves: (1) Font swap Fraunces→Cinzel + Inter→Source Sans 3, (2) Colour palette cleanup to DESIGN.md §21 tokens, (3) Interaction states (two-layer focus, :active, loading, 44px touch targets, 48px buttons/inputs), (4) Layout (90rem container, gutters, grid system, optical asymmetry), (5) Motion tightening (360/200/120ms durations, reduced-motion hero guard), (6) Component replacement (Notice component, status vocabulary, values zig-zag, state screens, skip link in layout), (7) Typography polish (type scale tokens, sentence case, em dash sweep, editorial rhythm), (8) Audit gate (tsc, lint, build, responsive 320-1440, axe-core, Pa11y, Lighthouse, VLM, Squirrelscan, SEO, IMAGE_REGISTER.md, PROOF.md).
- Documented 10 risks (R1-R10) including Cinzel readability, Tailwind v4 spacing rename, Source Sans 3 feature set, logo crop authority, inline style cleanup, two-layer focus weight, status vocab breakage, form layout shift, Cinzel italic absence.
- Appended Phase 4 audit table to /home/z/my-project/PROOF.md with 16 evidence rows.

Stage Summary:
- Audit artefact: /home/z/my-project/PHASE4_AUDIT_AND_PLAN.md (10 sections, 50 findings, 8 waves, 10 risks).
- PROOF.md updated with Phase 4 evidence ledger.
- No code changes made — planning mode per user instruction.
- Ready to execute Wave 1 (Font swap) on user confirmation. Estimated total effort ~7.5 hours across all 8 waves.
- User note: "I will give you even more images to redo it" — additional logo assets expected. Plan structured to accept new logo at any point without rework.
