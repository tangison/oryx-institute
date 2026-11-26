# Independent full-site audit — 13 November 2026

## Comparison boundary

This is an independent Oryx audit. `petersonacademy.com` was not retrieved because it is outside the workspace's permitted network access. The requested reference comparison is therefore not claimed. The audit reviews information architecture, conversion, visitor interaction and the technical implementation.

## Executive view

The site has a clear public position for a prelaunch institution. It separates current practice, research and ventures from future learning. Status language is repeated where a reader could otherwise infer accreditation or enrolment. Public contact routes are easy to find. The server-rendered baseline is healthy.

No critical server-rendered defect was found. The first work should be on production security controls, a more resilient enquiry handoff and browser-level verification. These are more valuable than a visual redesign at this stage.

## Evidence and limits

The audit ran against the local optimized production server using the canonical production host header. It checked the sitemap route set, server HTML, metadata, same-site links, forms, redirects, retired paths, response headers, source architecture and local asset inventory.

A Chromium executable is not present in this workspace. No browser screenshots, keyboard run, screen-reader pass, Core Web Vitals measurement or third-party service inspection was performed. The Corner Spa service and other external destinations were not requested. Header findings must also be confirmed on the live production host because a hosting edge can add controls not represented in source.

## What is working

| Area | Result |
| --- | --- |
| Public route health | All 52 sitemap routes returned `200`. Each rendered one main landmark, one non-empty `h1`, a declared language, title and description. |
| Discoverability | Sitemap titles and descriptions were unique. All required Open Graph and Twitter fields were present. Canonicals and Open Graph URLs matched their route, with the normal root-URL slash normalization. |
| Internal navigation | All 61 unique same-site destinations found in rendered public pages resolved without a `4xx` or `5xx` response. |
| Semantic baseline | Rendered images had an `alt` attribute, external new-tab links carried `noopener`, and JSON-LD blocks parsed successfully. |
| Forms | The enquiry form and sampled career form rendered labels for each visible input. Their mail-client handoff is explained before submission and has a no-JavaScript email fallback. |
| Public-status integrity | The home page, Careers and Status surfaces distinguish current work from prelaunch learning and state that Oryx is not registered or accredited. |
| Search controls | Canonical pages were indexable. The Markdown shelf was `noindex, follow`. Retired content returned `410` with `noindex, nofollow`, and legacy Chinese and trailing-slash paths returned `308` canonical redirects. |
| Dependency review | `npm audit --omit=dev --audit-level=high` reported zero known production dependency vulnerabilities. |
| Asset discipline | The largest original local raster is 0.35 MiB. The local image directory is 8.9 MiB and uses the framework image pipeline rather than remote image hosts. |

## Findings and recommended order

### P1 — Establish and verify a production security-header policy

The application-level production response did not include a Content Security Policy, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` or a framing policy. This was observed locally with the canonical host header, so it is an implementation gap until a direct live-host check proves that the deployment layer supplies those headers.

The site has a cross-origin Corner Spa frame, client-side overlays and external destinations. A tested header policy should name only the origins the site needs. In particular, any CSP must deliberately allow the Corner Spa frame, self-hosted framework assets and the current mailto workflow. Add HSTS only at the HTTPS production edge. Prefer CSP `frame-ancestors` over legacy `X-Frame-Options` where a framing policy is required.

**Next step:** inventory the exact runtime sources on the production host, add a report-only CSP first, then enforce it after observing violations. Recheck every public route and both Corner Spa experiences after the change.

### P1 — Make the primary enquiry route work when a mail client is unavailable

`/apply` validates inputs in the browser and opens a `mailto:` draft. It clearly explains that behaviour, but a visitor without a configured mail client has no completion state and no immediate alternative inside the composer. The same input accepts either email or telephone while declaring `inputMode="email"` and `autocomplete="email"`. That is not ideal for a phone-first visitor.

The public contact page already exposes telephone and WhatsApp. Bring an equivalent secondary contact choice into the enquiry panel without changing the truthful email-first privacy model. Split email and telephone only if the office needs both. Otherwise, offer an explicit choice between them so mobile keyboard and autocomplete semantics match the selected contact method.

**Next step:** test the composer on Android, iOS and desktop browsers with and without a registered mail handler. Track completed handoffs only if a privacy-approved measurement approach is adopted.

### P1 — Make the third-party Corner Spa boundary explicit before it loads

Corner Spa appears as a lazy embedded frame on `/ventures/corner-spa` and as an eager full-screen frame on `/corner-spa`. The full-screen component grants `clipboard-write` and neither frame uses a sandbox. The source describes a fallback after ten seconds, but the audit could not inspect the framed service's privacy, performance, keyboard behaviour or headers.

The broad statement that the site uses no third-party tracking needs a precise boundary where a visitor opens or loads this separate service. State that the Oryx shell does not run advertising tracking, while the framed Corner Spa service is operated separately and has its own handling. A click-to-load gate would give visitors a clear choice before the external frame starts. Any sandbox or permission reduction must be tested against the spa's booking flow before it is enforced.

**Next step:** confirm the spa service's privacy notice and required browser permissions with its owner. Then add an in-context disclosure and test a click-to-load version against the fallback route.

### P2 — Reduce below-the-fold eager images on the home and enquiry paths

The home page marks the hero image as high priority, which is appropriate. It also forces eager loading for images in later sections. The enquiry page similarly forces its side image eager. These images are below the initial reading position in the document structure and can contend with the first screen on constrained connections.

**Next step:** keep only the actual first-screen image at high priority. Restore default lazy loading for lower sections, then compare production LCP, image requests and layout stability on a mid-range mobile device.

### P2 — Close browser-level interaction and accessibility test gaps

The source provides a skip link, visible focus treatment, reduced-motion paths, modal focus management for search and menu, semantic form labels and no positive `tabindex` values. Those are good foundations. They do not establish that the experiences work in a browser.

The menu is CSS-first and its server markup sets `aria-expanded="false"` on a checkbox disclosure. The client code updates it after hydration. Verify the no-JavaScript and slow-hydration states with a screen reader. Also test the three pinned homepage acts, the Research proof-sheet fold, the careers notice and both Corner Spa frames at 390 px, 768 px and desktop widths. The fixed careers notice is especially worth checking for overlap with bottom controls on a small viewport.

**Next step:** add a browser-capable CI job with keyboard tests, an axe scan, reduced-motion coverage and viewport screenshots. Keep source checks as a supplement, not a substitute.

### P3 — Decide how the office will learn which public route is useful

No analytics, analytics SDK or error-monitoring SDK was found in the application source. That supports the no-tracking privacy posture, but it also means there is no observed evidence for which pathways lead to a contact, which search terms fail or whether the email handoff works.

**Next step:** make an explicit policy decision. If measurement is wanted, use a privacy-reviewed aggregate approach with a published purpose and retention boundary. If it is not wanted, keep the current model and use the public register, direct office feedback and periodic manual usability tests to guide changes.

## Experience assessment

### Information architecture and positioning

The primary navigation gives direct access to Research, Practice, Ventures, Status, Enquire and Careers. The homepage then explains what is available today before its prelaunch context can be mistaken for a course catalogue. This is appropriate for Oryx's current institutional status.

The only recurring comprehension risk is the distinction between Research and Practice: Market R&D appears in both the research proposition and the currently available practice offer. The prose is accurate, but a short navigation-level distinction would lower the time a first-time visitor needs to choose a route. For example, Research can mean published notes and research engagements, while Practice can mean counselling and scoped office work.

### Content, credibility and conversion

The site is unusually careful about factual status. The Status page, Register, FAQ, Careers page and enquiry copy consistently avoid claims of accreditation, public campus access or confirmed future learning. This is a major trust strength and should be retained.

The contact route is clear, with call, WhatsApp and email on Contact and Links. The weak point is not a missing contact method. It is the final mail-client handoff inside the main enquiry flow. Address that before adding more calls to action or content volume.

### Visual system and interaction

The design has a coherent visual language tied to paper and field documents, supported by a locked brand identity and local imagery. Motion has a declared reduced-motion route, and the research treatment is materially connected to its content. Browser verification remains necessary before changing the visual language: current source inspection cannot judge crop quality, scroll smoothness, focus visibility over imagery or mobile overlay collisions.

### Technical and discoverability posture

Server-rendered SEO fundamentals are strong: canonical metadata, unique titles and descriptions, image alternatives, structured data parsing, sitemap coverage and route controls all passed. The main technical work is protection and verification around the delivery edge and third-party frame, not a metadata rewrite.

## Suggested release gate

Before the next public release:

1. Fetch the live production host and record its actual security response.
2. Test the enquiry and career email handoffs on one desktop browser and one Android and iOS browser, including no configured mail client.
3. Run keyboard and screen-reader checks for the menu, search, forms, popup, pinned acts and Corner Spa fallback.
4. Capture normal and reduced-motion screenshots at 390 px, 768 px and desktop widths.
5. If security headers or an iframe gate change, rerun the full sitemap and link matrix.

## Audit result

**Status:** healthy server-rendered baseline. No critical release blocker was found in the audited local build.

**Priority:** resolve the three P1 items before treating the current design as a stable public conversion surface. The P2 browser verification and image-loading work should follow before any larger design comparison or redesign.
