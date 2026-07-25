---
Task ID: 1
Agent: Super Z (main)
Task: Deploy, audit with 4 skills, and fix findings

Work Log:
- Pushed previous commits to GitHub, triggered Vercel auto-deploy, verified site live at oryx-institute.vercel.app
- Installed and ran website-audit skill (appariciojunior) — crawled 34 pages, produced comprehensive markdown audit at /home/z/my-project/download/audits/oryx-institute-website-audit.md
- Installed and ran squirrelscan v0.0.80 — scored 50/F overall, found 58 failures across SEO, accessibility, images, structured data
- Read website-structure skill (kostja94/marketing-skills) — produced website structure assessment at /home/z/my-project/download/audits/oryx-institute-website-structure.md
- Fetched and applied Vercel Web Interface Guidelines (vercel-labs/agent-skills) — produced design guidelines audit at /home/z/my-project/download/audits/oryx-institute-web-design-guidelines.md
- Fixed CRITICAL: domain mismatch (oryxinstitute.na DNS doesn't resolve) — switched all canonicals, og:url, robots.txt, sitemap.xml to oryx-institute.vercel.app temporarily
- Fixed CRITICAL: og:url per-page — added openGraph.url to every page that has alternates.canonical (18 pages including dynamic routes)
- Fixed CRITICAL: JSON-LD structured data — created /src/lib/structured-data.ts with Organization, WebSite, VideoObject, Course schemas; embedded Organization on every page, WebSite+VideoObject on homepage
- Fixed IMPORTANT: navigation restructure — moved Partners and Research to primary nav, Brand to footer secondary nav
- Fixed IMPORTANT: CSS improvements — input-oryx:focus→:focus-visible, touch-action:manipulation on all buttons/links, -webkit-tap-highlight-color:transparent, overscroll-behavior:contain on offcanvas/modal, scroll-margin-top:100px on [id] elements, env(safe-area-inset-*) on offcanvas, meta theme-color:#FFF8EF, transition-all→specific properties
- Fixed IMPORTANT: form improvements — spellCheck={false} on email inputs, autocomplete="off" on non-auth selects, trailing … in placeholders, readOnly on honeypot inputs (fixes focusable-in-aria-hidden SquirrelScan error), reassurance confirmation text instead of "demo" language, tabular-nums on step numbers, Link instead of a for internal privacy link
- Fixed IMPORTANT: content — "diploma programmes" → "certificate programmes", "Future Skills" → "Future Schools", "Research and Advisory" → "Research & Advisory"
- Fixed NICE: favicon.ico from PNG shield, Intl.DateTimeFormat for copyright year, translate="no" on Tangison Studio brand name
- All 3 commits pushed successfully, build verified, site verified live with correct og:url, canonicals, JSON-LD

Stage Summary:
- 4 audit reports produced (website-audit, squirrelscan, website-structure, web-design-guidelines)
- 3 CRITICAL issues fixed (domain mismatch, og:url per-page, JSON-LD structured data)
- 7 IMPORTANT issues fixed (CSS, nav, forms, content)
- 5 NICE-TO-HAVE issues fixed (favicon, locale, typography)
- SquirrelScan score expected to improve from 50/F after fixes (JSON-LD resolves structured data 44→target, canonical domain resolves crawlability 46→target)
---
Task ID: logo-weight-fix
Agent: Main Agent
Task: Correct SVG wordmark weight — INSTITUTE must be fontWeight 600 (not 400), ORYX must be 600 (not 500)

Work Log:
- Verified repo state: main branch, commit b4f0895, key files confirmed
- Created backup branch audit-backup-b4f0895
- Read OryxLogo SVG and OryxWordmark HTML components
- Identified the core bug: INSTITUTE fontWeight=400 (Regular) — visibly too thin per brand spec
- ORYX was fontWeight=500 (Medium) — spec requires 600 for both
- Cinzel font loads weights 400-700, so 600 (Semibold) IS available
- Changed OryxLogo SVG: ORYX 500→600, INSTITUTE 400→600 (both static + animated versions)
- Changed OryxWordmark HTML: ORYX 500→600, INSTITUTE 400→600
- Fixed ORYX color in wordmark: removed brand-orange reference, set to #171717 (black) on light bg
- Added lang="grc" to ὄρυξ text element per accessibility spec
- Updated INSTITUTE tracking comment to match spec (0.19-0.22em range)
- Ran production build: SUCCESS
- Ran TypeScript type check: PASS (0 errors)
- ESLint: 2 pre-existing React effect warnings (not from this change)
- Committed: d4205b9 "fix: lock Oryx wordmark weight and preserve audit improvements"
- Pushed to GitHub: 2f63733..d4205b9 main → main
- Vercel auto-deploy triggered, site live at https://oryx-institute.vercel.app/
- Verified deployed HTML: font-weight="600" on both ORYX and INSTITUTE ✓
- Verified Greek ὄρυξ preserved with lang="grc" ✓
- Captured desktop (1366px), mobile (390px), smallest (320px), 404 page screenshots

Stage Summary:
- INSTITUTE weight corrected from 400→600 (the key visual fix)
- ORYX weight corrected from 500→600 (brand spec alignment)
- Greek ὄρυξ now has lang="grc" for screen reader language identification
- OryxWordmark HTML component also corrected (ORYX color, INSTITUTE weight)
- Deployed and verified live at oryx-institute.vercel.app
- Commit SHA: d4205b9
---
Task ID: comprehensive-audit-fix-pass
Agent: Main Agent
Task: Run comprehensive accessibility/SEO/security audit on deployed site and fix critical issues

Work Log:
- Ran accessibility audit via web-reader subagent on 5 pages (/, /about, /contact, /schools, /programmes)
- Found 3 CRITICAL accessibility violations and 1 CRITICAL SEO issue
- Found missing security headers (CSP, HSTS, X-Frame-Options, etc.)
- Found inconsistent honeypot accessibility across 6 forms
- Fixed all issues and deployed in 3 progressive commits:

Commit 1915609: "fix: add security headers middleware and honeypot accessibility consistency"
- Created src/middleware.ts with full security header set (CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control)
- Fixed 3 static honeypot forms (aria-hidden on label+input, readOnly on input)

Commit 5d6497d: "docs: document canonical-domain decision and migration checklist"
- Documented why Vercel subdomain differs from future custom domain
- Listed all places that need updating when switching to oryxinstitute.na

Commit 4e5f376: "fix: enable search indexing, fix heading hierarchy, OG inheritance, and landmark labels"
- Removed noindex from all pages (robots: index, follow) — site now visible to search engines
- Fixed h1→h3 heading skip on /about: ProseSection now supports headingLevel prop, set to h2
- Fixed duplicate aria-label="Primary" → mobile nav now "Mobile navigation"
- Fixed duplicate <header> landmark: image-page-header changed from <header> to <section>
- Fixed consent checkbox: added id="c-consent" + aria-label
- Removed page-level openGraph overrides on 18 pages so layout OG (type, images) cascades
- Added googleBot max-video-preview, max-image-preview, max-snippet

Verified on deployed site:
- robots meta: "index, follow" (no noindex) ✓
- Heading hierarchy: h1→h2 on /about ✓
- Nav labels: "Primary" (desktop) + "Mobile navigation" (offcanvas) ✓
- Security headers: CSP, HSTS, X-Frame-Options, etc. all present ✓

Remaining advisory items (not critical for launch):
- CSP 'unsafe-inline'/'unsafe-eval' (Next.js limitation — nonce-based CSP recommended for production)
- No search functionality (expected for current scope)
- Sitemap domain mismatch (oryxinstitute.na vs vercel.app — intentional during pre-launch)
- Consider prefetch hints for common next-page navigations

Stage Summary:
- All P0 and P1 issues fixed and deployed
- Security headers fully implemented
- Site now indexable by search engines
- WCAG heading hierarchy violations resolved
- Landmark label conflicts resolved
- OG metadata inheritance corrected
- 4 commits pushed: d4205b9 → 1915609 → 5d6497d → 4e5f376
---
Task ID: domain-migration-motion-ui
Agent: Main Agent
Task: Domain migration (.na → .org), motion system, Collins-style nav icon, ultra-minimal mobile footer, remove duplicate CTA

Work Log:
- Fixed domain: oryxinstitute.na and oryx-institute.vercel.app → oryxinstitute.org across 24 source files
- Updated metadataBase, all canonical URLs, CSP origins, robots, sitemap to oryxinstitute.org
- Removed duplicate CTA strip from footer (homepage section already has Register Interest)
- Created ultra-minimalistic mobile footer: logo + tagline + email + legal + copyright only (no nav columns, no image)
- Desktop footer retains full editorial layout
- Changed nav menu icon from square-bordered 2-line box to Collins-style clean 3-line hamburger (no border, no box)
- Close button in offcanvas also uses matching clean X style
- Added "Made by Tangison Studio" linked credit in footer
- Created motion system (src/lib/motion.ts):
  - useScrollReveal: CSS+IntersectionObserver fade-in+slide-up (no external dependency)
  - useStaggerReveal: CSS stagger for grid/list children
  - useSectionFade: GSAP ScrollTrigger parallax (lazy-loaded)
  - animeTimeline: Anime.js v3 timeline choreography (lazy-loaded)
  - All motion respects prefers-reduced-motion
  - Fixed useCallback at module scope (root cause of SSR Invalid hook call)
- Created animated-home.tsx client component wrapping all homepage sections with scroll reveals
- Created reveal-section.tsx wrapper components
- Installed animejs@3.2.2 and gsap@3.15.0 + @gsap/react@2.1.2

Build passes. Pushed as commit 45caa28. Deployed to Vercel.

Verified:
- Canonical URLs: https://oryxinstitute.org ✓
- Security headers present ✓
- Mobile and desktop screenshots captured ✓
