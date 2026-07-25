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
