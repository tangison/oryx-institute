# Oryx Research Proof verification

**Build date:** 25 November 2026

**Route:** `/research` and `/af/research`

**Build ID:** `oryx-research-proof-2026`

## Preflight and environment

| Check | Result |
| --- | --- |
| Scrollcraft workspace | Resolved to `scrollcraft/` |
| Scrollcraft `doctor.mjs` | Not available: the supplied skill package is not installed in this checkout |
| Node | `v22.22.3` |
| Playwright package | Available (`1.65.1`) |
| Chromium executable | Not available at Playwright’s expected executable path |
| ffmpeg | Not installed |
| KIE image-generation key | Not configured |
| Asset path | Existing local Oryx research images only. No generation or encoding was required. |

The missing skill package means its engine scripts, built-in preflight and remote reference-reading commands could not be run. The project’s existing GSAP/ScrollTrigger layer was retained and the new interaction is a small page-local component.

## Automated checks

| Check | Result |
| --- | --- |
| `npm ci --no-audit --no-fund` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed. Next.js generated 87 static pages. |
| `git diff --check` | Passed |
| Local production server | Started on `0.0.0.0:3109` |
| `/research` and `/af/research` | Both returned `200` |
| Main landmark | One `<main>` per route |
| Heading hierarchy baseline | One `<h1>` per route |
| New publication image | Descriptive English and Afrikaans `alt` text rendered |
| New asset delivery | All five page image paths returned `200 image/jpeg` |
| Fixed-header language control | No `EN | AF` header toggle found in rendered English HTML |

## Visual and responsive review

A browser screenshot pass was attempted by checking the installed Playwright executable path. Chromium is absent and the environment cannot fetch a browser binary from the package’s external browser-download host, so desktop, mobile and reduced-motion screenshots cannot be truthfully attached in this checkout.

The source-level responsive and motion review is complete:

- **Desktop:** the field-table, ledger and publication planes have independent widths and positions. The title reads from an opaque cream paper sheet rather than an opaque whole-frame layer.
- **Mobile:** below `48rem`, the middle ledger plane is removed, the front folio stays bounded at `64vw`, held acts become normal-height material scenes and the proof leaves disappear. This avoids a clipped or excessively zoomed subject.
- **Reduced motion:** the site’s existing global reduced-motion rule suppresses transitions and the proof leaves are removed, leaving all text, image content and actions visible in normal document flow.
- **Accessibility:** all page-specific imagery used only as atmosphere is `aria-hidden` or has empty alt text. The publication mock-up gets descriptive text. The page preserves semantic `section`, `figure`, `article`, `h1`, `h2`, ordered list and link elements.
- **Asset/context audit:** `research-ground-table.jpg`, `research-ledger-detail.jpg`, `research-publication-coming-soon.jpg`, `24-research-field-notes.jpg` and `17-brass-calipers.jpg` all support research, evidence, publication or a material pause. No unrelated divider image was introduced.

## Fingerprint result

The plan compares this build with `oryx-institute-2026` on all six required dimensions. It differs in grammar, navigation treatment, hero device, act sequence, close pattern and signature move: **6 / 6**, passing the required **4 / 6** gate. The append-only registry row is in `scrollcraft/FINGERPRINTS.md`.

## Screenshot follow-up

Run a desktop and mobile browser capture after a Chromium-capable environment is available, especially at approximately `1440px`, `768px` and `390px` widths with both normal and `prefers-reduced-motion: reduce` settings. The screenshots should be added here rather than fabricated from a non-browser renderer.
