# Glossary Pages — Work Record

## Task Summary
Created SEO-optimized glossary pages for the Oryx Institute website covering Namibian vocational education terms (RPL, WIL, NQA, VET, Accreditation, NQF).

## Files Created
1. **`/src/lib/glossary.ts`** — Typed interfaces (`GlossarySlug`, `GlossaryEntry`) and content data for 6 glossary terms with Namibia-specific definitions, related terms, and related pages. Includes helper functions `getGlossaryEntry()` and `glossarySlugs()`.

2. **`/src/app/glossary/page.tsx`** — Listing page with alphabetical grouping, jump links, one-line summaries per term, and a general-information disclaimer. Uses PageShell, PageHeader, Section components. Includes organizationLd JSON-LD.

3. **`/src/app/glossary/[slug]/page.tsx`** — Individual glossary entry page with breadcrumbs (BreadcrumbList JSON-LD), definition prose, accreditation notice where relevant, related terms list, related pages links, and disclaimer. Uses PageShell, Breadcrumbs, BackLink, Section, Prose, ProseSection components. Includes generateStaticParams and generateMetadata.

## Files Modified
4. **`/src/lib/content.ts`** — Added "Glossary" link to secondaryNav (between Brand and Contact).

5. **`/src/app/sitemap.ts`** — Added `/glossary` static route and all 6 glossary entry routes to sitemap generation.

6. **`/src/app/site-map/page.tsx`** — Added Glossary column to the sitemap page grid, importing glossaryEntries.

## Verification
- ESLint: clean (no errors)
- All routes tested and returning HTTP 200:
  - `/glossary` → 200
  - `/glossary/rpl` → 200
  - `/glossary/nqf` → 200
  - `/site-map` → 200 (contains "Glossary" section)
- Sitemap.xml updated with glossary routes

## Design Notes
- Followed existing component patterns (PageShell, Section, PageHeader, Prose, Breadcrumbs, BackLink)
- Brand colors: maroon #7A0F1E for accents, cream #FFF8EF backgrounds, ink #171717 text
- Content voice: institutional restraint, no AI slop, Namibia-specific references
- Accreditation notice added on accreditation, NQA, and VET entries
- BreadcrumbList JSON-LD schema on each entry page
- Canonical URLs set for all pages
