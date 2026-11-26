# Priority remediation — 13 November 2026

This record follows the independent full-site audit. It implements the three P1 items that can be completed safely in the repository, plus two small P2 fixes. It does not claim a live-host or external-service audit.

## Completed P1 work

### Response protections

`next.config.ts` now sends these headers for all routes:

- a Content Security Policy limited to self-hosted assets and the one Corner Spa frame origin
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- a `Permissions-Policy` that denies camera, geolocation, microphone, payment and USB access

The existing non-production `X-Robots-Tag` guard remains in place and composes with the new headers. HSTS was not added at application level because it must be confirmed at the HTTPS production edge after validating the domain and subdomain policy.

### Enquiry handoff

The enquiry composer still keeps its email-first, no-storage design. It now asks the visitor to choose email or telephone before entering a reply contact. The selected control gets the matching input type, mobile keyboard and autocomplete value. A visible Call and WhatsApp alternative sits beside the mail-client handoff so visitors without a configured mail application still have an immediate contact route.

### Corner Spa boundary

Neither Corner Spa entry renders its external frame until the visitor chooses to load the counter. The full-screen route and the inline venture-page counter now show the same plain notice naming the separately served Mendozer service and offer a direct new-tab route. The full-screen frame no longer requests `clipboard-write`. The privacy notice now explains the boundary and states that the external service applies its own information handling after a visitor opens it.

## Completed P2 work

- Removed forced eager loading from the lower home-page and enquiry-page images. The initial hero remains the only high-priority home image.
- Removed the static `aria-expanded="false"` value from the server-rendered menu checkbox. Client behaviour writes the value only after it can keep disclosure state in sync.

## Verification

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run build` | Passed; 87 static pages generated |
| `git diff --check` | Passed |
| Sitemap matrix | 52 public routes rendered with zero route failures |
| Same-site links | Zero failed destinations |
| Enquiry labels | Every rendered visible enquiry input has a label |
| Security headers | Present on local production responses for canonical and preview-host requests |
| Preview indexing guard | `X-Robots-Tag: noindex, nofollow` remains present on a non-production host request |
| Corner Spa initial response | English and Afrikaans full-screen and inline routes render the visitor gate and no iframe markup before activation |

## Remaining release checks

A browser-capable environment must still test the load button, full-screen counter, inline counter, fallback after the timeout, mobile keyboard choices, focus order, reduced motion and small-screen layouts. Fetch and inspect the live production response before relying on its security-header posture. Confirm the Corner Spa service's own privacy policy and any permission it requires before tightening its sandbox further.
