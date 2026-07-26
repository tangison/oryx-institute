# Oryx Institute — Build Plan

## Active Webman phase

Phase: Full Build (not demo). All routes complete. All error states present. All infrastructure (sitemap, robots, manifest, structured data) operational.

## Build mode

Autonomous vibe-coding build loop: inspect → implement → verify → audit → record → continue.

## Art-direction owner

Hallmark (anti-slop gate). Taste Skill (layout, motion, variance). Impeccable (responsive, critique). Ponytail (dependency pruning, unused package removal).

## Verified capabilities

| Capability | Status |
|---|---|
| Next.js 16 App Router | Verified — build passes, 20+ routes render |
| TypeScript strict | Verified — `tsc --noEmit` passes clean |
| ESLint | Verified — zero warnings |
| Production build | Verified — static + SSG pages generate correctly |
| GSAP + ScrollTrigger | Installed — lazy-loaded in `motion.ts` |
| Anime.js v3 | Installed — lazy-loaded in `motion.ts` |
| CSS + IntersectionObserver reveal | Active — `useReveal`, `useScrollReveal`, `useStaggerReveal` hooks |
| Prisma ORM | Installed — form submissions stored locally |
| Structured data | Complete — Organization, WebSite, Course, VideoObject, FAQPage, BreadcrumbList |
| Sitemap | Complete — all static + dynamic routes included |
| Robots.txt | Complete — allow all, disallow /api/ |
| Manifest | Complete — name, icons, theme_color, categories |
| WCAG 2.2 AA | Implemented — contrast verified, skip link, focus indicators, ARIA, reduced-motion |
| Grain texture | Implemented — SVG fractalNoise 2.5% overlay |
| Mobile offcanvas | Advanced — editorial imagery layout |
| Desktop mega-dropdown | Complete — imagery cards, hover-leave delay, keyboard support |
| 2-line hamburger | Complete — Collins premium style |
| Tangison Studio credit | Present on all pages — footer + error pages |
| Greek ὄρυξ preservation | Verified — lang="grc", text-transform:none, Noto Serif |

## Missing / incomplete items

| Item | Status |
|---|---|
| Scroll animation on inner pages | Needs implementation — server component pages lack motion |
| GSAP ScrollTrigger storytelling on hero sections | Partially implemented — `useSectionFade` hook exists but unused on inner pages |
| Anime.js choreography on inner pages | Not yet applied |
| favicon.ico | Present in public/ but may need enhancement |
| apple-touch-icon | Uses oryx-shield.png — adequate |
| Breadcrumb schema on all detail pages | Partially implemented |
| PROOF.md audit record | Needs creation and updating |

## Route inventory (20 routes)

All routes verified and rendering:

1. `/` — Homepage (editorial hero, animated sections)
2. `/about` — Institution story
3. `/brand` — Brand system
4. `/contact` — Contact form
5. `/faq` — FAQ with accordion
6. `/founder` — Founder profile
7. `/glossary` — VET glossary index
8. `/glossary/[slug]` — Glossary entries (6 terms)
9. `/legal/accessibility` — Accessibility statement
10. `/legal/privacy` — Privacy policy
11. `/legal/terms` — Terms of use
12. `/partners` — Partnership types
13. `/partners/[type]` — Partnership details (5 types)
14. `/programmes` — Programme index
15. `/programmes/[slug]` — Programme details (8 programmes)
16. `/register` — Register interest form
17. `/research` — Research vision
18. `/schools` — Five schools index
19. `/schools/[slug]` — School details (5 schools)
20. `/site-map` — Visual sitemap

Plus: `/updates`, `/error`, `/not-found`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/api/submissions`

## Build order for remaining work

1. Add `AnimatedSection` client wrapper to inner pages
2. Apply `useSectionFade` (GSAP ScrollTrigger) on hero sections
3. Add stagger reveals to list/grid content (schools, programmes, values)
4. Verify build still passes
5. Run Lighthouse-style audit (performance, a11y, SEO)
6. Record all actions in PROOF.md
7. Commit and push to GitHub
8. Verify Vercel deployment and live site
