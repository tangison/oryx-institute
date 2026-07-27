# Oryx Institute — Product Definition

## What is being built

Oryx Institute is a pre-launch institutional website for a multidisciplinary vocational education and training institution being established in Windhoek, Namibia. The website serves as the public face of an institution that does not yet operate. It describes what is planned, what is subject to approval, and what does not yet exist. It does not claim achievements that have not been verified.

## Product type

Pre-launch institutional presence website. Not an LMS. Not a portal. Not a commercial platform. The website informs, invites interest, and establishes the brand. When the institution opens, the website will evolve to support admissions, learner portals, and employer services. Until then, its role is: describe what is being built, invite genuine enquiries, and do so honestly.

## Target users

1. **Prospective learners** in Namibia seeking vocational training, skills assessment, or recognition of prior learning.
2. **Employers** in Namibia looking for trained staff, assessment services, or work-integrated learning partnerships.
3. **Researchers and advisors** interested in applied vocational research or institutional collaboration.
4. **Regulators and accreditors** evaluating the institution's readiness.
5. **The general public** encountering the brand for the first time.

## Core pages

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, schools overview, vision, explore, status |
| `/about` | Institution story, mission, vision, values, limits |
| `/schools` | Five planned schools index |
| `/schools/[slug]` | Individual school detail |
| `/programmes` | All planned programmes |
| `/programmes/[slug]` | Programme detail with outcomes and progression |
| `/founder` | Founder profile |
| `/brand` | Brand system and design guidelines |
| `/research` | Research and advisory vision |
| `/partners` | Partnership types |
| `/partners/[type]` | Specific partnership detail |
| `/contact` | Contact form |
| `/register` | Register interest form |
| `/faq` | Frequently asked questions |
| `/updates` | Institutional updates and milestones |
| `/glossary` | Glossary of Namibian VET terms |
| `/glossary/[slug]` | Individual glossary entry |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of use |
| `/legal/accessibility` | Accessibility statement |
| `/site-map` | Visual sitemap |

## Technical stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- React 19
- GSAP + ScrollTrigger (lazy-loaded, scroll storytelling)
- Anime.js v3 (lazy-loaded, choreography)
- CSS + IntersectionObserver (primary reveal engine)
- Prisma ORM (form submissions)
- Vercel deployment (GitHub auto-deploy from `main`)
- Canonical domain: oryxinstitute.org

## Content constraints

- No fabricated facts. All unknown fields are "To be confirmed" or omitted.
- No em dashes in body text (use comma, period, or rephrase).
- No generic AI language ("leveraging", "seamless", "cutting-edge", "world-class", "transformative", "innovative").
- No invented metrics, claims, or statistics.
- Greek polytonic ὄρυξ must use `lang="grc"` and `text-transform: none`.
- "Made by Tangison Studio" credit required on every public page.

## Quality targets

- WCAG 2.2 AA minimum, AAA where brand system allows
- Mobile Lighthouse: performance ≥ 85, accessibility ≥ 95, SEO ≥ 95
- No TypeScript errors, no ESLint warnings
- Reduced-motion respected on all animations
- Build passes, deploy succeeds, live site verified
