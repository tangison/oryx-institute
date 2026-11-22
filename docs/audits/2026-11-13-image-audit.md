# Rendered-image audit — 13 November 2026

## Scope and method

This audit covers every image emitted by the current public routes: Next
`Image` and `img` elements, the Markdown image resolver used by the Corner Spa
note, shared identity assets, route social-card images, and the site manifest
icons. Decorative images with `alt=""` were checked as visual treatments; they
were not changed into content images solely to give them alt text.

Each image was checked against the section beside it for subject, place claim,
and whether it could imply a service or location that Oryx does not actually
offer. Files in `public/` with no current route reference are not rendered by
the website and were not treated as page imagery. The former homepage Windhoek
file is the exception: it was the reported divider and has been removed.

## Corrections made

| Route or shared surface | Previous issue | Resolution |
| --- | --- | --- |
| Homepage, divider before **The register** | A Windhoek skyline was being used as a generic institutional divider. It said nothing about the adjacent public register and was not the requested desert landscape. | Replaced it with a real Sossusvlei dune photograph. The retired `07-windhoek-divider.jpg` asset was removed. |
| Homepage Sossusvlei divider | A generic desert image could falsely imply a Namibian location. | The selected photograph is explicitly identified by its source as Sossusvlei, Namibia: Fabio Riccobono, [Pexels photo 34175035](https://www.pexels.com/photo/striking-sand-dune-at-sossusvlei-namibia-34175035/). Pexels permits website use and does not require attribution; the source, author and licence are recorded here. The image is decorative, so it remains hidden from assistive technology. |
| Careers: Occupational Health and Safety | The former key/fob/padlock still life read as security rather than occupational health and safety. | Replaced with a relevant, text-free PPE still life: hard hat, safety glasses, gloves and notebook. |
| Careers: Wholesale, Retail and Merchandising | The former hero was an unrelated multi-image contact sheet rather than one relevant page visual. | Replaced with a text-free stock-control and merchandising still life: product tags, scanner, carton and clipboard. |
| About: **Where the work begins** | The visible picture contains an oryx, but both caption translations described a person walking. The English alt also made an unverified place claim. | Captions and alt now describe the visible oryx and rocky ground only. |
| Brand: mineral specimen | The alt asserted that an unverified pink mineral was Namibian. | Alt now describes the visible mineral without a geographical claim. |

## Retained rendered editorial images

The following remain because their subjects match the surrounding section and
make no unsupported location or service claim.

| Surface | Images reviewed | Decision |
| --- | --- | --- |
| Homepage | `01-hero-oryx`, `03-wood-rope-divider`, `careers-hero`, `home-research-bulletin`, `08-spa-dish`, `home-correspondence` | Retained. They respectively establish the oryx/ground motif, act as an abstract material transition, show a worktable for Practice, a research folio for Research, a spa arrangement for the named venture, and correspondence for the contact close. |
| About | `25-about-desert`, `about-grounded-field` | Retained. Both are grounded oryx/landscape imagery; the inaccurate caption and location claim on the latter were corrected above. |
| Research | `research-ground-table`, `24-research-field-notes`, `17-brass-calipers`, `research-ledger-detail` | Retained. The objects and divider support research, field notes, measurement and a research-ledger principle respectively. |
| Practice | `04-notebook`, `23-practice-wrench` | Retained. The notebook and working-tool still lifes fit the section’s method and practical-work framing. |
| Ventures | `36-corner-spa-towel`, `33-dust-trail` | Retained. The first is a spa treatment scene for Corner Spa; the second is a decorative movement transition, not a place claim. |
| Apply, Register and FAQ | `29-envelope-cream`, `home-correspondence`, `21-register-stamp`, `20-faq-pencil` | Retained. Each directly supports enquiry, correspondence, register or question-answering context. |
| Careers landing and role pages | `careers-hero`; role still lifes for centre management, moderation, learner records, business administration, hospitality/tourism, cosmetology and entrepreneurship; the two corrected role images above | Retained after the two role-specific replacements. Every vacancy hero is now a single, relevant editorial still life. |
| Brand kit and specimens | The five `kinfolk/print` kit plates; `02-stone`, `09-horns`, `10-wax-seal`, `04-notebook`, `06-game-board`, `19-mineral`, `18-cup` | Retained. These are explicitly presented as brand specimens or print-kit mockups. The mineral’s alt was made location-neutral. |
| Corner Spa note | `hero-wide.webp`, `hot-stones-back.webp`, `people-stones-rest.webp`, `people-back-hands.webp` | Retained. They depict the named, live spa services discussed in the note. |

## Identity, utility and social images

- The header/footer/brand-page Oryx SVG marks, the Link Hub QR SVG, and the
  favicon/manifest icons are identity or utility assets and remain accurate to
  their functions.
- Route metadata uses the purpose-built `public/brand/og/` cards. Their copy
  and route association were inspected; retained cards match their current
  route purpose. The Corner Spa social card is the matching venture card.
- The full-screen Corner Spa entry point is an external live-site embed rather
  than a duplicate Oryx image gallery. The images in the associated published
  note are local, with descriptive alt text.

## Implementation notes

- The local divider is a 16:9 crop of the selected Pexels photograph. It is
  served from `public/images/kinfolk/core/07-sossusvlei-divider.jpg`, so the
  published page does not depend on an external image CDN.
- Pexels describes its licence at <https://www.pexels.com/license/>. At the
  time of audit it allows website use and says attribution is not required.
- The Sossusvlei divider intentionally uses an empty alt because it has no
  informational content beyond the immediately visible page treatment.

## Verification

After a production build, all 52 sitemap routes were rendered locally. Every
image asset emitted by those pages returned HTTP 200; the new Sossusvlei image
was present and the retired Windhoek divider was absent. Lint, TypeScript and
the production build also passed.
