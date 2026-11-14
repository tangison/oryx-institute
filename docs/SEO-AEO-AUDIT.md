# SEO and AEO implementation audit

**Audited:** 13 November 2026
**Scope:** repository implementation, production-mode rendered markup, `robots.txt`, sitemap output, and the connected Vercel project. No Search Console, OpenSEO, backlink, keyword-volume, or live SERP data was available in this session, so this is a technical/content audit, not a ranking or traffic claim.

## Priority verdict

1. **Attach `oryxinstitute.org` and `www.oryxinstitute.org` to the Vercel project.** This is the only confirmed launch blocker outside the codebase. The site correctly declares `https://www.oryxinstitute.org` as its canonical origin, while the project currently has only `oryx-institute-olive.vercel.app` attached. The preview/alias guard deliberately serves those non-canonical hosts with `noindex`; do not replace the canonical origin with a Vercel URL.
2. **Keep the Directory and safety-course pages as the primary search-entry pages.** They contain specific, source-led answers and clear next steps. Their schema, canonicals, language signals, and sitemap dates were checked and corrected where needed.
3. **Keep the Markdown shelf explicit, not negotiated.** Every indexable page advertises its `/md` alternative for agents, while direct Markdown is `noindex`. This makes the same information readable to answer engines without creating a second indexable version or a cache-dependent content variant.

## Confirmed fixes

| Area | Observation | Change made |
| --- | --- | --- |
| Canonical site access | Vercel currently lists only `oryx-institute-olive.vercel.app` for the project, while site canonicals name `www.oryxinstitute.org`. | Documented as an external blocker. The code continues to protect previews from indexing rather than creating a competing Vercel-host index. |
| Preview index control | `vercel.json` set an unconditional `X-Robots-Tag: index, follow`, which could conflict with the host-aware preview guard. | Removed the global index instruction. The proxy is now the single authority: custom production hosts are indexable and Vercel aliases are `noindex`. |
| Markdown for answer engines | Direct `/md` URLs were not consistently marked `noindex` on the production host. The earlier `Accept: text/markdown` rewrite also depended on cache variance. | Kept `/md` as an explicit typed alternate, removed same-URL content negotiation, and send `X-Robots-Tag: noindex, follow` on the shelf. |
| Corner Spa duplication | `/corner-spa` is an iframe-focused route while `/ventures/corner-spa` is the complete editorial explanation. Both were eligible for sitemap discovery. | Made `/corner-spa` `noindex, follow`, canonicalized it to `/ventures/corner-spa`, removed it from the sitemap, and corrected the editorial page's JSON-LD URL. |
| Sitemap freshness | Blog post URLs were hard-coded and Directory review dates were absent. | Generate blog rows from `blogPosts`; emit only real `lastmod` dates for posts and reviewed Directory documents. |
| Structured data | Afrikaans safety-course schema still declared English and started breadcrumbs at the English home page. Afrikaans Directory schema URLs pointed to English pages. | Aligned `Course` language, course URL, breadcrumb home URL, and Directory schema IDs/URLs with each page's canonical locale. |
| Truthfulness | The Practice page implied a registered safety instructor was already teaching before an appointment is named. | Replaced the line with the published condition: a credentialed lead is named before Cohort 1. |
| Staff snippet | The staff description still referred to placeholder portraits after the site moved to appointment cards. | Updated the description to state open roles plainly. |

## What is already in good shape

- English, Afrikaans, and `x-default` alternates render on indexable pages.
- The homepage publishes one Organization and WebSite graph with contact, location, and official social identities.
- FAQ, article, resource, course, breadcrumb, contact, and service pages already expose matching structured data where it describes visible content.
- `robots.txt` points at the canonical sitemap; preview and Vercel alias hosts are protected from accidental indexing.
- The Directory carries source links and truthful review dates, which is stronger answer-engine material than generic course pages.
- The visual refresh deliberately avoids invented staff imagery and unsupported operational claims.

## External action required

The Vercel project must be able to attach the domain that the application already declares:

1. In the Vercel account/team that owns `oryxinstitute.org`, transfer the domain or grant this project access.
2. Attach `oryxinstitute.org` and `www.oryxinstitute.org` to the `oryx-institute` project.
3. Apply the DNS records Vercel supplies, then set the apex to redirect permanently to `https://www.oryxinstitute.org`.
4. Confirm the custom-domain responses serve HTTP 200, the canonical host is `www`, and the Vercel aliases continue to serve `X-Robots-Tag: noindex`.
5. Add the verified domain to Google Search Console and submit `https://www.oryxinstitute.org/sitemap.xml`.

## Validation run locally

Production-mode checks passed with the `www.oryxinstitute.org` host header:

- `npm run lint`
- `npm run build` with 138 generated static pages
- 15 key English/Afrikaans public routes returned HTTP 200
- canonical, language alternate, Organization/WebSite, Course, Breadcrumb, sitemap, robots, Markdown, and noindex assertions passed
- sitemap output: 88 URLs, 30 truthfully dated editorial entries
- `git diff --check`

## Evidence limits and next measurement step

No ranking, impressions, clicks, backlink, or query-demand data was available, so this audit does not claim traffic gains or positions. After the custom domain is live and Search Console has collected data, inspect the first queries and landing pages for the Directory, safety officer course, Owner's Desk, market research, and rapid-response training. Prioritize actual qualified impressions and enquiries over generic “polytechnic” visibility.
