# Rendered SEO audit and verification — 13 November 2026

## Scope and method

This is a server-rendered audit of the public production build, not a claim of Google Search Console, social-network or browser-device behaviour. Before implementation, the audit inspected the public English and Afrikaans route set, rendered `<head>` data, JSON-LD payloads, sitemap, robots response, redirects and retired-route responses. The post-change check ran the optimized build behind a local production server with `Host: www.oryxinstitute.org`.

The route set covered Home, About, Enquire, Research, Practice, Ventures, Corner Spa, Blog, Careers and every role detail page, Contact, FAQ, Register, Status, Brand, Links and legal pages in their published locales. It also checked `/robots.txt`, `/sitemap.xml`, `/md/apply`, `/corner-spa`, legacy `/zh/*`, retired route families and a missing route.

Limits: this does not independently verify third-party social profiles, the embedded Mendozer counter, crawl scheduling, rich-result eligibility, or client-side screen-reader behaviour. It does validate the server HTML and HTTP controls that crawlers receive.

## Pre-change rendered findings

| Area | Rendered finding | Risk | Resolution in this change |
| --- | --- | --- | --- |
| Twitter cards | Canonical pages had page-specific Open Graph fields, but inherited the site-layout Twitter title, description and image. For example, `/apply` rendered Enquire Open Graph data while its Twitter card used the homepage data. | Shared cards could describe the wrong page. | Every indexable route now uses the shared metadata contract, which emits complete page-level Open Graph and Twitter data from the same copy and image source. |
| Markdown discovery | Every public HTML page advertised a `text/markdown` alternate such as `/md/apply`. The Markdown shelf itself sent `X-Robots-Tag: noindex, follow`. | The noindex representation was still advertised as a competing alternate and could be discovered or selected by tools. | The shelf remains available at `/md/*` with its response header, but HTML pages no longer publish a Markdown alternate. |
| Hreflang quality | English, Afrikaans and `x-default` alternates were present, and legacy Chinese URLs redirected to English. However, the Afrikaans Brand Register and the Afrikaans Corner Spa article were incomplete or substantially English. | Indexable locale routes could act as duplicate or mixed-language pages. | Only complete translations remain in the language cluster. `/af/brand` and `/af/blog/corner-spa` are 200 utility routes with `noindex, follow`, canonicalize to their English sources, have no hreflang alternates and are omitted from the sitemap. The Afrikaans blog index now links the unfinished article to English and labels the action accordingly. |
| Canonicals and retired content | Sample indexable routes had absolute canonicals. Slash variants returned 308, `/zh/apply` returned 308 to `/apply`, the retired resource, safety-course and nested-apply families returned 410 with `X-Robots-Tag: noindex, nofollow`, and a missing route was a normal 404. | Low. These controls already reflected the published-content boundary. | Preserved and included in the final regression check. |
| Snippet noise | Header and footer navigation, language UI, skip link and repeated contact boilerplate had no `data-nosnippet` exclusion. | Search snippets could lead with chrome rather than page content. | Shared header, footer, skip link and menu language control now carry `data-nosnippet`. |
| Language control | The language change route was available in the full menu but not as a compact always-available desktop control. | English is the primary public surface; Afrikaans should remain available without taking header space. | Kept the accessible English/Afrikaans change route inside the existing menu. It deliberately does not advertise Chinese because `/zh/*` is a legacy redirect, not a translated surface. |
| Structured data | The homepage carried the organization and WebSite entities, while nested pages carried page-level types. The global identity graph was not consistently present on each independently crawlable page, and some page schemas repeated organization contact fields. | Entity reconciliation was weaker and created unnecessary duplication. | The site layout now emits one consistent `EducationalOrganization` and `WebSite` graph, with page schemas referring to its stable IDs. Nested indexable routes get a clean public-URL `BreadcrumbList`. |
| Unsupported entity claims | The source of truth confirms the legal identity, registration number, postal box, Namibia, phone, email, social profiles and Corner Spa/Mendozer relationship. It does not establish a public street address, Windhoek mailing locality or founder identity. | A schema assertion could create a false local or person claim. | The organization graph uses only P.O. Box 1662 and country `NA`; it includes `CC/2026/12517` as an identifier and contains no founder, founding date or locality field. |
| Semantic/image review | Sample public pages already rendered one descriptive H1. Informative images had alternative text and dimensions; decorative images used empty alt text. The logo component had intrinsic dimensions but could render without a descriptive fallback. | Minor accessibility and visual-stability gap. | The immutable logo artwork remains untouched. Its shared renderer now supplies a descriptive default alt and its intrinsic 646×223 dimensions; existing decorative-image treatment is retained. |
| Internal links | Current navigation connected Research, Practice, Ventures, Enquire, Status, Contact and the careers route. Retired `/resources/*` and safety-course URLs were not restored or linked as live offers. | Avoids false commercial or course availability signals. | Preserved. Metadata and schema describe current research, practice, ventures and factual article content only; no course or offer schema was added. |

## Implementation record

- Added `src/lib/seo.ts` as the shared route-metadata contract. It creates absolute canonical URLs, robots directives, reciprocal alternates only for published translations, complete OG/Twitter fields, locale values and article timestamps.
- Moved all indexable public pages to that contract and rewrote repetitive, generic metadata with unique route-specific titles and descriptions. Long career scope lists remain in the on-page notice, while metadata uses concise distinct role labels so planned programme scope is not presented as a course offer.
- Added `src/lib/structured-data.ts` and the shared JSON-LD renderer. The global graph identifies Oryx Polytechnic Institute, its trading name, registration number `CC/2026/12517`, P.O. Box 1662, Namibia, public contact channels, canonical logo asset and public social profiles. Existing factual Article, FAQ, CollectionPage, ContactPage, AboutPage and WebPage schemas remain page-specific.
- Added structured-data breadcrumbs for nested canonical public pages. The proxy supplies the public path so English’s internal `/en` rewrite cannot leak into a breadcrumb URL.
- Updated the dynamic sitemap so it contains canonical 200, indexable URLs only. It has reciprocal English/Afrikaans alternates only where a complete translation exists, and retains dated entries only for the dated article and recruitment notices.
- Kept the Markdown shelf, legacy Chinese redirects, noindex Corner Spa embed, 410 routes and prelaunch/non-accreditation boundaries intact.

## Post-change route verification

The final production-server verification parsed every sitemap URL and checked status, canonical, robots meta, title, description, complete Open Graph/Twitter fields, Markdown-alternate absence, a single H1, image alt attributes plus dimensions or a deliberate Next `fill` layout, JSON-LD parsing, one global organization graph, chrome snippet exclusions and a breadcrumb on every nested route.

| Surface | Expected result | Result |
| --- | --- | --- |
| Sitemap | Canonical indexable public URLs only, with reciprocal alternates only for complete translations | Passed. 52 URLs returned; no `/md`, `/zh`, retired paths, Corner Spa embed, `/af/brand` or `/af/blog/corner-spa` entry was present. |
| All sitemap URLs | 200, self-canonical, `index, follow`, unique title/description, complete OG/Twitter, one H1 | Passed for all 52 URLs. |
| Nested sitemap URLs | Public-URL `BreadcrumbList` and one global `EducationalOrganization` graph | Passed for every nested URL. |
| Incomplete Afrikaans routes | 200 utility route, English canonical, `noindex, follow`, no hreflang cluster | Passed for `/af/brand` and `/af/blog/corner-spa`. |
| Markdown shelf | 200 with `X-Robots-Tag: noindex, follow`; no HTML typed Markdown alternate | Passed for `/md/apply` and the sitemap-route set. |
| Corner Spa embed | 200, canonical `/ventures/corner-spa`, `noindex, follow` | Passed. |
| Chinese legacy URL | 308 to the equivalent English route | Passed for `/zh/apply` → `/apply`. |
| Retired routes | 410 with `X-Robots-Tag: noindex, nofollow` | Passed for `/resources/old`, `/practice/safety-officer-course` and `/apply/old`. |
| Missing route | Normal 404 | Passed for `/missing-page`. |
| Slash normalization | 308 to the slashless canonical route | Passed for `/apply/` and `/af/apply/`. |
| Unsupported person/local claim | No founder, `addressLocality` or Windhoek mailing-locality schema | Passed. |

## Build checks

- `npm run lint` — passed.
- `npm run build` — passed; Next.js generated 87 static pages.
- `git diff --check` — passed.
- Local production route and metadata matrix — passed with zero failures.
