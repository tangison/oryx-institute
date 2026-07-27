# Oryx Institute — Brand Specification

## Name and identity

- **Full name**: Oryx Institute
- **Short name**: Oryx
- **Greek companion**: ὄρυξ (must remain lowercase, `lang="grc"`, `text-transform: none`)
- **Named after**: The gemsbok (oryx), a desert antelope native to Namibia. Resilient, adapted, unmistakable. Not a mascot. A reference.

## Core palette

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-maroon` | `#7A0F1E` | Primary accent, links, headings, CTA backgrounds |
| `--color-brand-maroon-dark` | `#4A0710` | Hover states, emphasis |
| `--color-brand-cream` | `#FFF8EF` | Page background, surface default |
| `--color-brand-ink` | `#171717` | Body text, ORYX wordmark on light backgrounds |
| `--color-white` | `#FFFFFF` | Cards, raised surfaces, text on dark/maroon |

### Prohibited colour pairings (fail WCAG AA)

- Ink (#171717) on maroon (#7A0F1E)
- Ink (#171717) on earth-tone backgrounds

## Typography

### Display typeface: Cinzel (Trajan Pro 3 fallback)

- All-capitals display headings
- Weights: 400-700
- Tracking: `0.04em` for uppercase headings
- Used for: page titles, section headings, school names, eyebrow labels

### Body typeface: Source Sans 3

- Weights: 300-700 for full hierarchy
- Used for: body text, form labels, navigation, metadata

### Greek serif: Noto Serif

- Used exclusively for ὄρυξ rendering where Cinzel lacks polytonic Greek diacritics
- Variable: `--font-noto-serif`

## Logo

- **Lockup**: ORYX + ὄρυξ + INSTITUTE + shield icon
- **Fixed viewBox**: 540×210, geometry never changes, only SVG width changes
- **Icon**: oryx-mark.png (or reversed version for dark backgrounds), never redrawn
- **ORYX text**: #171717 (black) on light backgrounds, #FFF8EF (cream) on dark backgrounds
- **INSTITUTE text**: lighter weight, spaced tracking, subordinate to ORYX

## Brand voice

- **Honest**: Describe what exists. Describe what is planned. Do not claim what is not.
- **Rigorous**: Precise language. No hype. No filler.
- **Rooted**: Shaped by Namibia's working realities, not imported templates.
- **Lasting**: Built to endure, not to impress momentarily.
- **Anti-slop**: No em dashes, no "leveraging", no "seamless", no "cutting-edge", no "world-class". The banned word list in the brand page is the authority.

## Prohibited language

world-class, revolutionary, cutting-edge, unlock, game-changing, seamless, unwavering, leveraging, streamlining, synergistic, transformative, innovative, best-in-class, end-to-end, groundbreaking, disciplined (overused), serious (overused), rooted in the Namibian landscape (overused).

## Visual principles

- **Restraint**: Collins-inspired minimalism. Ultra-minimalistic mobile, editorial desktop.
- **Rhythm**: Consistent vertical spacing via Section component. Grid-based layouts.
- **Imagery**: Portrait photography of campus, Namibian landscape, oryx. No stock clichés.
- **Grain**: SVG fractalNoise overlay at 2.5% opacity, mix-blend-mode: overlay.
- **Motion**: Intentional, not gratuitous. CSS for reveals, GSAP for storytelling, Anime.js for choreography.

## Credit requirement

"Made by Tangison Studio" link (href: https://studio.tangison.com) required on every public page. Present in footer on normal routes, inline on error/404 pages. May not be removed per terms of use.
