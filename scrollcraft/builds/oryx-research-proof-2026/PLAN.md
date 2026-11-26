# Oryx Research Proof plan

This plan follows `BRIEF.md` and applies the Scrollcraft treatment to `/research` and `/af/research`.

## Grammar: Research proof folio

Research opens as a physical surface and resolves into an inspectable record. The page cuts between distinct scenes: an opening desk, a written method, field material, a publication proof, dated notes and a reply slip.

- **Navigation:** The shared masthead stays fixed and accessible. A local `#notes` reading link remains a normal document anchor, not a competing navigation system.
- **Hero:** Three existing layers move at different restrained rates: research table in back, ledger detail in the middle and publication sheet in front. The `h1` and action sit on cream paper rather than a dark whole-screen overlay.
- **Publication peak:** The proof-sheet fold is the largest act. It opens two graphic paper leaves with a local CSS variable driven by page-specific scroll code. Reduced-motion visitors receive the complete, static composition.
- **Close:** A reply-slip panel ends with the single `Bring a Market R&D problem` action. Partner rows remain inspectable, not ornamental.
- **Bans:** no full-screen section counters, no cards presented as metrics, no autoplay media, no image text, no synthetic visual assets and no duplicated CTA labels.

## Why the other grammars lost

- **Grounded field ledger:** Already claimed by the existing Oryx homepage. This build needs a different reading rhythm and a different peak.
- **Filmic one-shot and continuous world:** Research is a record with separable evidence, not a spatial sequence that needs a hidden cut.
- **Live surface:** The page is not software and should not imitate an application dashboard.
- **Typographic poster:** It would suppress the actual field and paper assets that make the research claim credible.
- **Gallery, catalogue and service-menu grammars:** They turn a research argument into browsing and offer no room for the publication reveal.
- **Chaptered editorial:** It is close in spirit but too generic. The proof-sheet fold and a research-specific source-to-reply structure make this a distinct grammar.

## Fingerprint gate

The new plan is compared with `oryx-institute-2026` in `scrollcraft/FINGERPRINTS.md`.

| Dimension | Existing build | Research proof folio | Different? |
| --- | --- | --- | --- |
| Grammar | Grounded field ledger | Research proof folio | Yes |
| Navigation treatment | Fixed masthead plus contextual pathway note | Fixed masthead plus ordinary document anchor | Yes |
| Hero device | Three-plane field observation | Three-plane proof-table stack with paper ground | Yes |
| Act-sequence shape | Observation → method → proof peak → choice → evidence → office | Desk → question → material hold → publication fold → notes → reply | Yes |
| Close pattern | Office/application line | Reply slip after named relationships | Yes |
| Signature move | Field notes trace | Proof-sheet fold | Yes |

**Result:** 6 of 6 dimensions differ. The plan clears the required 4 of 6 against the only registered build.

## Score and feeling curve

| Beat | Feeling | Device family | Why it earns its space |
| --- | --- | --- | --- |
| Desk | Focus | Layered scrub | The separate table, ledger and publication planes make a credible first surface without video. |
| Question | Confidence | Reveal | Method copy enters as a short, plain reading chapter. |
| Materials | Attention | Pinned crossfade | Each research material is held long enough to read against the field-note image. |
| Publication | Anticipation | Page-specific scroll fold | The scroll opens a physical proof-sheet composition. This is the peak and has the largest span. |
| Notes | Trust | Ledger flow | Dated notes need uninterrupted reading rather than spectacle. |
| Reply | Readiness | Pinned reply slip | A stable, direct final action closes the page after the evidence. |

The device family never repeats consecutively. The publication fold is the only engineered peak. The materials act quiets before it, while notes lower the energy after it.

## Implementation contract

- The existing shared ScrollCraft motion engine remains unchanged.
- `ResearchFolio` is a page-specific client component. It writes a custom property on its own section from scroll position and does not alter the shared engine.
- Existing local assets are reused and reviewed in place. The hero uses three assets as separate layers. The publication image receives descriptive alternative text in the folio itself. Background layers and divider remain decorative.
- The semantic order follows the page sequence listed above. Motion never gates text or links.
- On screens below 768px, the middle hero layer is removed, the front sheet enters normal flow and the proof-sheet fold stops moving.
- `prefers-reduced-motion` keeps the page static and fully visible.

## Verification plan

1. Run lint, production build and whitespace checks.
2. Render `/research` and `/af/research` in a local production server.
3. Assert one `h1`, the shared action label, descriptive publication image alt text, one `#notes` anchor and valid image responses.
4. Use browser screenshots if a Chromium binary is available. At present it is not, so record the gap and verify source, server HTML and reduced-motion CSS instead.
5. Inspect the desktop and mobile layouts through the generated CSS and document the exact limit in the final report.
