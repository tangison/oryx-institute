# Oryx Institute — Design Specification (DESIGN.md)

Authority: This file is the source of truth for visual, structural, and content decisions.
Version: 1.0, 27 July 2026.

---

## 1. Overview

Oryx Institute is a pre-launch institutional website for a multidisciplinary vocational education and training institution being established in Windhoek, Namibia. The website describes what is planned, what is subject to approval, and what does not yet exist. It does not claim achievements that have not been verified.

Business positioning: A disciplined Namibian vocational institution combining recognised qualifications, RPL, WIL, employer-connected learning and responsible digital capability. Oryx is not presented as an AI-only school. AI and modern digital tools are embedded into familiar qualifications and workplace skills.

Training division: Oryx Skills Camp.
Employer and research division: Oryx Advisory & Research.
Brand promise: Recognised skills. Modern capability. Evidence that counts.

---

## 2. Brand Promise

"Recognised skills. Modern capability. Evidence that counts."

This promise appears only in approved brand contexts (brand page, official materials). Not used in body copy or navigation.

---

## 3. Colour Palette (§6)

### 3.1 Core palette

| Name | Hex | Role |
|---|---|---|
| Oryx Maroon | #7A0F1E | Primary: logos, primary buttons, accents, links on light backgrounds |
| Deep Maroon | #4A0710 | Secondary: hover states, deep accents |
| Cream | #FFF8EF | Background: page background, primary surface |
| Warm White | #F5EEE6 | Surface: alternate sections, callout surfaces |
| Sand | #CFC6BD | Border: borders, dividers, low-emphasis surfaces |
| Stone | #E9E1D8 | Subtle: subtle borders, decorative elements |
| Earth | #4E4946 | Secondary text: secondary text on light backgrounds |
| Ink Black | #171717 | Foreground: primary text, secondary buttons, dark sections |
| White | #FFFFFF | Surface: cards, raised surfaces, text on dark/maroon |

### 3.2 Prohibited pairings (fail WCAG AA)

- Ink (#171717) on Maroon (#7A0F1E)
- Ink (#171717) on Earth (#4E4946)

---

## 4. Typography (§7)

### 4.1 Display typeface

Licensed: Trajan Pro 3 or Trajan Pro. Open fallback: Cinzel.
Weights: 400-700 for display headings.
All-capitals display. Tracking: 0.04em to 0.17em depending on element.
Rule: Do not bundle or self-host Trajan unless a valid licence exists.

### 4.2 Body typeface

Source Sans 3 (formerly Source Sans Pro). Fallbacks: Segoe UI, Arial, sans-serif.
Weights: 300-700 for full hierarchy.
Minimum body text size: 15px. No body text below 15px.

### 4.3 Greek font

ὄρυξ MUST use a serif with verified polytonic Greek support: Noto Serif or Times New Roman.
Exact text: ὄρυξ (lowercase polytonic Greek, text-transform: none, font-variant: normal).
Prohibited: ὌΡΥΞ, ΟΡΥΞ, OPYE, OPΥΞ, ORYX, Latin transliterations, fake Greek-looking Latin.

---

## 5. Logo System (§5)

### 5.1 Layout

Orientation: Horizontal. Wordmark on LEFT, icon on RIGHT.
Line 1: ORYX + ὄρυξ (shared baseline).
Line 2: INSTITUTE (institutional descriptor).
Icon: Vertically centred against entire two-line wordmark block.

### 5.2 Light variant

- ORYX: #171717, uppercase, font-weight 600, tracking 0.14em to 0.17em
- ὄρυξ: #7A0F1E, lowercase exactly as supplied, font-weight 400, tracking normal, lang="grc"
- INSTITUTE: #171717, uppercase, font-weight 600, tracking 0.19em to 0.22em
- INSTITUTE must carry approximately 90% to 100% of the perceived stroke weight of ORYX
- Icon: official primary maroon icon

### 5.3 Dark variant

- Wordmark: #FFF8EF or #FFFFFF
- Icon: official reversed cream or white icon asset
- Warning: Do not place the ordinary transparent maroon icon directly on black or dark maroon

### 5.4 Responsive widths

| Viewport | Width |
|---|---|
| 320-374px | 152px to 164px |
| 375-479px | 164px to 184px |
| Tablet | 190px to 210px |
| Desktop | 210px to 232px |

Rule: Scale the complete logo as one indivisible unit. Never resize ORYX, ὄρυξ, INSTITUTE or the icon independently.

### 5.5 Logo animation

Style: Restrained writing reveal.
Sequence: Reveal ORYX left to right → Reveal ὄρυξ in maroon → Reveal bold INSTITUTE left to right → Fade icon into locked position (no more than 6px movement).
Maximum duration: 1.2 seconds. Once on first load only.
Reduced motion: Show complete logo immediately.
Prohibited: bouncing, rotation, glow, individual letter jumping, repeated animation on every route.

### 5.6 Accessibility

Accessible name: "Oryx Institute". SVG role: img. Home link: allow SVG name to label the link. Hide internal decorative paths from assistive technology.

---

## 6. Header (§8)

### 6.1 Desktop

- Position: fixed, top 16px, side margin clamp(24px, 4vw, 64px)
- Height: 80px to 88px
- Background: rgba(255, 248, 239, 0.97)
- Text: #171717
- Border: 1px solid rgba(23, 23, 23, 0.14)
- Shadow: 0 8px 30px rgba(23, 23, 23, 0.08)
- Logo variant: Primary light

### 6.2 Mobile

- Position: fixed, top 8px, full-width
- Height: 68px to 72px
- Side margin: 12px
- Padding: 14px to 16px
- Background: #FFF8EF
- Logo variant: Primary light
- Menu button: 44px by 44px, two horizontal lines only, border 1px solid rgba(23,23,23,0.35), radius 0-2px, accessible name "Open menu"

Rule: The complete header must fit at 320px without overlap, clipping or horizontal scrolling.

Prohibited: transparent white navigation over pale video, mobile header taller than 80px, mobile menu control larger than 48px.

---

## 7. Mobile Navigation (§9)

- Type: Right-side off-canvas
- Width: min(92vw, 420px)
- Height: 100dvh
- Background: #FFF8EF
- Padding: 88px 24px 32px
- Behaviour: Trap keyboard focus, close with Escape, close after route selection, lock body scrolling while open, restore focus to menu button, maintain 44px touch targets, allow vertical scrolling inside panel
- Content: Primary navigation, school links with editorial imagery, register interest action, contact email

---

## 8. Hero (§10)

- Headline: "Education. Skills. Impact."
- Desktop size: clamp(3.5rem, 6vw, 4.75rem)
- Mobile size: clamp(2.35rem, 11vw, 3.15rem)
- Placement: Bottom left inside safe grid
- Mobile width: 10ch to 12ch
- Desktop width: 12ch to 14ch
- Overlay: Desktop — permanent dark gradient from left and bottom. Mobile — stronger bottom-up gradient. Headline must remain legible on the brightest frame.

### 8.1 Video rules

- When only one unique video exists, render one video element with loop enabled
- Never load the same video source in two simultaneous video elements
- Attributes: muted, playsInline, preload="metadata", poster, autoplay only when permitted
- Desktop: wide video masters. Mobile: dedicated portrait crops or mobile posters.
- Pause video when hero leaves viewport. Only active video may play.

---

## 9. Homepage Sections (§11)

Maximum 6 major sections:
1. Video hero
2. Planned schools
3. Institutional proposition
4. RPL and WIL pathways
5. Explore the Institute
6. Pre-launch status and register interest

Schools section: Desktop — editorial image grid. Mobile — one-column editorial list with meaningful imagery. Do not squeeze five cards into a narrow screen.

Explore section: Combine related routes into numbered editorial rows (title, one-line explanation, arrow). Goal: preserve routes while reducing unnecessary scrolling.

Status section: Background #7A0F1E, text #FFF8EF. One status statement, one explanation, one action. No multiple competing CTAs.

---

## 10. Shape Language (§12)

- Rectilinear compositions
- Square or maximum 4px corner radius
- Restrained diagonal motif derived from the shield
- No random blobs, no repeated glass cards, no excessive pills, no purple gradients

---

## 11. Responsive System (§13)

- Mobile-first
- Test viewports: 320x568, 360x800, 375x812, 390x844, 412x915, 430x932, 768x1024, 1024x768, 1366x768, 1440x900
- Global rules: No horizontal overflow, no body text below 15px, no touch target below 44px, no desktop grid squeezed into mobile, no hover-only interaction, no oversized blank spaces
- Section padding: Mobile 56-72px, Tablet 72-96px, Desktop 96-128px
- Text measure: 55-75 characters per line

---

## 12. Content Governance (§14)

- Approved email: contact@oryxinstitute.org
- Founder: Tate-Ati Tangi Iigonda
- Location: Windhoek, Namibia
- Language: Namibian English (recognised, programme, organisation, labour)
- Currency: N$
- Prohibited claims: unverified accreditation, fake partners, fake testimonials, fake prices, fake addresses, fake launch dates
- Prohibited language: revolutionise, unlock, next generation, cutting edge, seamless, game changing, world class, unwavering commitment
- Style: lead with useful facts, concrete language, label plans and assumptions, avoid em dashes in public copy, no filler copy

---

## 13. Forms (§15)

- Visible labels above inputs
- Autocomplete attributes
- Persistent user input after validation errors
- Error summary and field-level errors
- Minimum 48px input height
- No placeholder-only labels
- Clear success, failure and timeout states
- Honeypot: remove from normal layout, tabIndex -1, avoid presenting to assistive technology, non-obvious field name

---

## 14. Accessibility (§16)

- Target: WCAG 2.2 AA
- Normal text contrast: 4.5:1 minimum
- Large text contrast: 3:1 minimum
- Interface contrast: 3:1 minimum
- Complete keyboard access
- Visible unobscured focus
- Logical heading hierarchy
- Semantic landmarks
- Descriptive links
- Correct alt text
- Decorative images: empty alt
- Motion alternatives
- Zoom and reflow without lost content
- Focus style: high-contrast two-layer focus that remains visible on cream, maroon, black and photography

---

## 15. SEO (§17)

- Canonical domain: https://oryxinstitute.org (approved future)
- Current preview: https://oryx-institute.vercel.app/
- Critical rule: Do not use oryxinstitute.na
- Implementation: Use NEXT_PUBLIC_SITE_URL environment variable for metadataBase, canonical URLs, Open Graph, sitemap
- Preview: Use current verified deployment URL or make preview deployments noindex
- Production: Switch to oryxinstitute.org only when domain is connected and verified

---

## 16. Route Inventory (§18)

Expected routes:
/, /about, /schools, /schools/[slug], /programmes, /programmes/[slug], /rpl, /wil, /advisory-research, /updates, /brand, /faq, /contact, /partner, /privacy, /terms, /accessibility, /sitemap, /404, /500

Note: /privacy, /terms, /accessibility currently exist as /legal/privacy, /legal/terms, /legal/accessibility. /partner exists as /partners. /sitemap exists as /site-map. Preserve valid existing routes.

---

## 17. Prohibited Design (§19)

- Generic AI card grids
- Purple gradients
- Glassmorphism
- Random floating shapes
- Fake dashboards
- Fake metrics
- Stock photographs of smiling office teams
- Repeated images used as filler
- Oversized mobile whitespace
- Thin low-contrast typography

---

## 18. Forgotten States (§20)

Loading, Success, Validation failure, Server failure, Timeout, Empty state, No results, Offline, Maintenance, Access denied, 404, 500.
