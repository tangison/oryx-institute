# Release audit — 25 November 2026

## Scope

This audit covers the public production build after the forthcoming-publication
announcement and its editorial image were added to Research. It checks the
server-rendered site rather than making claims about search-console data,
third-party services or browser assistive technology.

## Checks completed

A local production server rendered every URL in the sitemap. The audit checked:

- HTTP 200 responses, a self-canonical URL, one `h1`, one `main` element and a
  declared document language on every indexable route.
- A title, meta description, required Open Graph fields and required Twitter
  card fields on every indexable route.
- Alternative text and working sources for rendered images and Open Graph
  images.
- Every unique, same-site route linked from rendered public pages.
- The publication image on both `/research` and `/af/research`.

## Result

| Check | Result |
| --- | --- |
| Sitemap routes rendered | 52 |
| Rendered image sources checked | 62 |
| Same-site links checked | 58 |
| Errors | 0 |
| Publication image references | One on `/research`; one on `/af/research` |

The image asset at
`/images/editorial/research-publication-coming-soon.jpg` returned HTTP 200 with
an image content type. Its descriptive alternative text was present in each
rendered Research locale.

## Finding corrected during the audit

The Links Hub page rendered a second, nested `main` element inside the shared
site `main`. The inner element was changed to a `div` while retaining its class
and visual styling. The final production render contains one `main` element on
both `/links` and `/af/links`.

## Build and copy checks

- `npm run lint` passed.
- `npm run build` passed and generated 87 static pages.
- `git diff --check` passed.
- The visible publication announcement and image description scored 5/5 in the
  SlopMonster checker. A second-model pass could not run because no rival model
  CLI is installed in this workspace.

## Limits

The Playwright package is present, but a Chromium binary is not available in
this workspace. The audit therefore does not replace live keyboard, screen
reader, colour-contrast, mobile-device or screenshot review. It also does not
verify the content or privacy practice of external services linked or embedded
by the site.
