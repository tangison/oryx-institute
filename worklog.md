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
