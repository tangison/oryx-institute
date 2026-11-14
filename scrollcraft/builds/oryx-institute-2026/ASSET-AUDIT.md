# Internal editorial image audit

**Scope:** 49 files under `public/images/kinfolk/`, inspected as an internal contact sheet on 14 November 2026. This is an audit only. No locked identity asset is included, edited or replaced. No generated imagery is used.

## Overall finding

The set has a coherent warm paper, terracotta, maroon and field palette. Its strongest work is where human activity, landscape, practical equipment or a material transition establishes place. The studio-object and blank-print series is visually consistent but risks reading as generic or artificial when promoted beyond a supporting editorial role.

Use real people, practical work, landscape and material texture for meaning. Keep isolated objects and blank print pieces as small instruments, dividers or reference-page support. Do not promote a generic object still life to a page’s emotional peak.

## Approved use classes

| Class | Files | Approved role | Guardrail |
|---|---|---|---|
| Strong human and practical proof | `people/30-founder-walking`, `people/31-hands-working`, `people/32-applicant-writing`, `people/35-bulletin-reader`, `safety/44-safety-officer`, `safety/48-hi-vis`, `core/05-hands-peak` | About, application, practice, safety and homepage proof | Preserve the visible human/action crop. Do not use a purely decorative colour overlay. |
| Strong place and transition | `core/01-hero-oryx`, `core/03-wood-rope-divider`, `core/07-windhoek-divider`, `inner/25-about-desert`, `texture/33-dust-trail`, `texture/37-windhoek-gate`, `texture/38-library-wall`, `texture/39-red-ground`, `texture/47-concrete` | Hero, chapter breaths, About and site transitions | Use full-bleed only when the image has enough open ground for copy. Mobile crop must be explicitly checked. |
| Useful practical instruments | `inner/16-journal-detail`, `inner/17-brass-calipers`, `inner/20-faq-pencil`, `inner/21-register-stamp`, `inner/22-legal-scale`, `inner/23-practice-wrench`, `inner/24-research-field-notes`, `inner/26-course-paper`, `inner/27-template-ruler`, `safety/40-green-helmet`, `safety/41-helmet-boots`, `safety/42-clipboard`, `safety/43-first-aid`, `safety/46-announcement-horn`, `texture/34-partner-nib` | Small supporting plate beside related factual content | Keep at a supporting scale. Name the object in accurate alt text where meaningful. |
| Brand and print props | `core/02-stone`, `core/04-notebook`, `core/06-game-board`, `core/09-horns`, `core/10-wax-seal`, `print/11-certificate`, `print/12-letterhead-blank`, `print/13-card-blank`, `print/14-notecard-blank`, `print/15-folder-blank`, `print/20-envelope-maroon`, `inner/18-cup`, `inner/19-mineral`, `inner/28-404-torn`, `inner/29-envelope-cream` | Brand Register, stationery or utility-page support | Do not use as evidence of campus, accreditation, teaching or a human service. Keep the blank/placeholder meaning explicit. |
| Venture-specific | `core/08-spa-dish`, `texture/36-corner-spa-towel` | Corner Spa only | Do not make wellness imagery stand in for the institute’s teaching or research work. |
| Placeholder only | `people/45-staff-placeholder` | Explicit vacant/awaiting-appointment staff placeholder | Retain clear placeholder alt text and never use as a portrait. |

## Implementation actions

1. Keep the homepage proof peak on `core/05-hands-peak.jpg`, not a stationery or object still life.
2. Retain the Oryx field image for the homepage opening and verify its portrait-to-mobile crop separately.
3. Add a fresh editorial pathway chapter through layout and interaction, not a new image. This avoids unnecessary artificial-looking image generation.
4. Continue to use practical/human images beside application, safety and staff claims. Their alt text remains specific to what is visible.
5. Keep blank-print images contained to Brand Register or supporting roles; do not scale them into generic full-screen “premium” decoration.
6. Preserve Corner Spa’s own media boundary and all `public/brand/` files exactly.

## Technical inspection

- All 49 audited files are JPEGs.
- Landscape images are generally around 1402 × 1122; portrait images generally around 1122 × 1402; square support plates are generally around 1254 × 1254.
- The smallest source in the set is `texture/39-red-ground.jpg` at 850 × 850. It is suitable as texture or a contained square, not a large high-density background on wide displays.
- `texture/38-library-wall.jpg` is 1086 × 1448 and should retain a vertical crop.
- The contact sheet and machine-readable dimensions were created in `/tmp` for the audit and are not product assets.
