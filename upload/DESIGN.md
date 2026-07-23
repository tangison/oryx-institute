# Oryx Institute Design System

**Document:** `DESIGN.md`  
**Version:** 1.0  
**Status:** Foundational design specification  
**Owner:** Oryx Institute  
**Founder:** Tate-Ati Tangi Iigonda  
**Location:** Windhoek, Namibia  
**Website:** `oryxinstitute.org`  
**Email:** `contact@oryxinstitute.org`  
**Last updated:** 23 July 2026

## 1. Purpose and authority

This file is the master design contract for Oryx Institute. It defines how the institution should look, feel and behave across websites, learner systems, company profiles, prospectuses, forms, certificates, presentations, signage, campaigns and physical spaces.

`DESIGN.md` is a project-owned specification, not a universal file standard. Its rules are structured so that designers, developers, document producers and AI agents can apply the same decisions without inventing new styles.

When sources disagree, use this order of authority:

1. Approved, original Oryx logo files.
2. This `DESIGN.md`.
3. The approved Oryx brand guide.
4. Approved final publications and website screens.
5. The Oryx Establishment and Operations Blueprint.
6. Unapproved concepts, mock-ups and generated images.

The current approved email is `contact@oryxinstitute.org`. It supersedes email addresses appearing in earlier drafts.

## 2. Brand foundation

### 2.1 Institutional proposition

Oryx Institute makes experience, learning and potential count. It combines rigorous vocational delivery with the systems, technology and employer relationships required to convert learning into credible workplace performance.

The institution should feel familiar in what it teaches and modern in how it teaches, assesses, administers and supports learners.

### 2.2 Vision

A Namibia in which practical knowledge, work experience and digital capability become recognised pathways to dignity, mobility and enterprise.

### 2.3 Mission

To deliver credible, employer-connected vocational education; recognise existing competence; and strengthen every learner with responsible digital and AI capability.

### 2.4 Brand promise

**Recognised skills. Modern capability. Evidence that counts.**

### 2.5 Values

- Independent thought
- Rigour
- Impact
- Integrity
- Stewardship
- Community

### 2.6 Naming hierarchy

| Name | Role | Usage |
|---|---|---|
| Oryx Institute | Parent institution | Legal, institutional and public identity |
| Oryx Skills Camp | Learner-facing training division | Qualifications, short courses, RPL, WIL and learner services |
| Oryx Advisory & Research | Employer and research division | Consulting, workforce development, research and institutional services |

Do not introduce a media, news or publication division into the launch identity unless it is formally approved later.

## 3. Design thesis

Oryx Institute is **Namibian institutional modernism**.

The visual system combines:

- the authority of a serious academic institution;
- the clarity of a modern vocational service;
- the restraint and material warmth of Namibia;
- the confidence of a new institution that does not need visual noise to appear credible.

The governing visual idea is **the path cut through the landscape**. It appears through disciplined diagonal lines, cropped architectural forms, paths, thresholds, light and negative space. The diagonal is derived from the supplied shield, but the shield itself must never be reconstructed from layout elements.

The work should feel commissioned for Oryx. It must not look like a generic university template, an AI start-up, a bank, a government form or a collection of fashionable cards.

## 4. Design principles

### 4.1 Quiet authority

Use scale, proportion, typography and space before decoration. A page may be visually powerful while remaining calm.

### 4.2 Namibia without cliché

Use Namibian landscape, light, material, architecture and working life with dignity. Avoid flags as decoration, tourist stereotypes, wildlife collages and ornamental patterns unrelated to the institution.

### 4.3 Evidence over spectacle

Qualifications, outcomes, processes and claims must be precise. Design should help users understand evidence, not conceal weak information behind effects.

### 4.4 Familiar core, modern delivery

The interface may feel modern, but programmes must remain recognisable to learners, families, employers and regulators.

### 4.5 One strong idea per composition

Each page, spread, section or screen should have one dominant message and one dominant visual subject.

### 4.6 Restraint is not emptiness

Negative space must strengthen hierarchy. It must not be used to hide missing content or create unnecessarily long pages.

### 4.7 Accessible by default

Colour, type, motion, focus and component behaviour must meet the accessibility rules in this document from the first design, not as a correction at the end.

## 5. Logo system

### 5.1 Authoritative assets

Use only the supplied Oryx Institute assets:

- primary horizontal lock-up;
- approved stacked lock-up;
- shield or symbol-only mark;
- approved reversed variations.

Never:

- redraw or regenerate the mark;
- type the wordmark manually;
- replace the Greek text;
- change proportions;
- rotate, skew, outline or add effects;
- add a watermark to the logo;
- allow image-generation tools to recreate it;
- place text or another symbol inside the shield;
- place the maroon logo on a maroon field.

Generated images must contain no logo. Add the authentic logo after image generation using deterministic layout software.

### 5.2 Logo-background pairings

| Background | Approved logo treatment |
|---|---|
| Cream or white | Black and maroon primary lock-up |
| Very light photography | Black and maroon only if contrast and clear space remain strong |
| Primary maroon | Cream or white reversed logo |
| Dark maroon | Cream or white reversed logo |
| Black | Cream or white reversed logo |
| Dark or detailed photography | Reversed logo on a controlled dark overlay or clear field |

Do not place the primary maroon shield directly on primary maroon, dark maroon or visually similar photography.

### 5.3 Clear space

Use the shield width as the base unit **S**.

- Minimum clear space around a full lock-up: `0.35S`.
- Preferred clear space: `0.5S`.
- Keep all type, trim lines, folds and image edges outside the minimum clear space.

Where an original vector guide supplies a different measured exclusion zone, the original vector guide takes precedence.

### 5.4 Minimum size

- Digital full lock-up: 144 CSS px wide minimum.
- Digital shield: 28 CSS px wide minimum.
- Print full lock-up: 35 mm wide minimum.
- Print shield: 9 mm wide minimum.

Below these sizes, use the shield only or an approved simplified lock-up. Never simplify the artwork manually.

### 5.5 Repetition

The logo should anchor a composition, not wallpaper it.

- Website: once in the navigation and once in the footer is normally enough.
- Editorial spread: once per spread unless a legal or document-control requirement justifies another use.
- Forms and institutional templates: logo in the header; a faint symbol may be used as a controlled watermark where necessary.
- Social artwork: one logo only.

## 6. Colour system

### 6.1 Core palette

| Token | Hex | RGB | Primary use |
|---|---:|---:|---|
| `brand.maroon` | `#7A0F1E` | `122, 15, 30` | Identity, headings, rules, decisive calls to action |
| `brand.maroon-dark` | `#4A0710` | `74, 7, 16` | High-contrast institutional fields and deep overlays |
| `brand.cream` | `#FFF8EF` | `255, 248, 239` | Warm paper, backgrounds and calm learner-facing surfaces |
| `brand.ink` | `#171717` | `23, 23, 23` | Body copy, navigation and sober authority |
| `neutral.white` | `#FFFFFF` | `255, 255, 255` | Reversed marks, high-clarity surfaces and print stock |

### 6.2 Supporting implementation colours

These colours support interfaces and documents. They do not replace the brand palette.

| Token | Hex | Use |
|---|---:|---|
| `neutral.900` | `#171717` | Primary text |
| `neutral.700` | `#4E4946` | Secondary text on light backgrounds |
| `neutral.500` | `#77706B` | Metadata with accessible sizing |
| `neutral.300` | `#CFC6BD` | Dividers and disabled borders |
| `neutral.150` | `#E9E1D8` | Quiet rules and input borders |
| `neutral.075` | `#F5EEE6` | Alternate warm surface |
| `status.success` | `#246B45` | Confirmed success |
| `status.warning` | `#8A5A00` | Warning requiring attention |
| `status.error` | `#A12622` | Errors and destructive warnings |
| `status.info` | `#315A73` | Neutral information |

Status colours must always be paired with text, an icon or another non-colour signal.

### 6.3 Verified contrast pairings

| Foreground | Background | Contrast ratio | Approved use |
|---|---|---:|---|
| `#171717` | `#FFF8EF` | 17.01:1 | All text sizes |
| `#7A0F1E` | `#FFF8EF` | 10.41:1 | All text sizes and controls |
| `#FFF8EF` | `#7A0F1E` | 10.41:1 | All text sizes and reversed identity |
| `#FFF8EF` | `#4A0710` | 14.99:1 | All text sizes |
| `#FFFFFF` | `#7A0F1E` | 10.97:1 | All text sizes |
| `#171717` | `#FFFFFF` | 17.93:1 | All text sizes |

### 6.4 Gradients

Gradients are allowed only when they add depth, improve text contrast or connect photography to the brand.

Approved families:

```css
--gradient-maroon:
  linear-gradient(135deg, #4A0710 0%, #7A0F1E 58%, #941B2D 100%);

--gradient-photo-dark:
  linear-gradient(90deg, rgba(23, 23, 23, 0.82) 0%, rgba(74, 7, 16, 0.54) 52%, rgba(74, 7, 16, 0.10) 100%);

--gradient-cream:
  linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 100%);
```

Rules:

- Use no more than two gradients in one viewport or one editorial spread.
- Do not create glossy, neon, rainbow or purple gradients.
- Never use a gradient inside the authentic logo.
- Print documents should prefer flat cream and white fields to reduce ink.

## 7. Typography

### 7.1 Font hierarchy

#### Display

**First choice:** Trajan Pro 3 or Trajan Pro, properly licensed through Adobe Fonts or another valid licence.

Use for:

- major institutional titles;
- cover titles;
- short section openers;
- ceremonial material;
- selected navigation or labels where all-capitals remain readable.

Do not use Trajan for:

- body paragraphs;
- long quotations;
- form labels and inputs;
- dense tables;
- small mobile text;
- sentence-case interface messages.

Trajan is primarily an all-capitals display face. Do not force it into roles requiring a complete lowercase reading experience.

#### Open fallback display

**Cinzel** is the approved open-source substitute when Trajan is unavailable or cannot legally be embedded.

Cinzel must be treated as a fallback, not mixed with Trajan in one product or publication.

#### Text and interface

**Source Sans 3** is the primary body and interface family.

Use it for:

- body copy;
- forms;
- buttons;
- labels;
- navigation support text;
- tables;
- captions;
- programme information;
- data and dashboards.

### 7.2 Font stacks

```css
:root {
  --font-display-licensed:
    "Trajan Pro 3",
    "Trajan Pro",
    "Cinzel",
    "Times New Roman",
    serif;

  --font-display-open:
    "Cinzel",
    "Times New Roman",
    Georgia,
    serif;

  --font-body:
    "Source Sans 3",
    "Source Sans Pro",
    "Segoe UI",
    Arial,
    sans-serif;
}
```

Implementation rule:

- Use `--font-display-licensed` only when Trajan is available under a valid licence.
- Use `--font-display-open` in public builds that cannot load Trajan legally.
- Never download an unverified Trajan file from a third-party font website.
- Self-host Source Sans 3 in WOFF2 where practical, or load it from a trusted provider.

### 7.3 Type scale

Use `rem` for digital type. The root remains `16px` unless a user preference overrides it.

| Token | Desktop | Mobile | Line height | Use |
|---|---:|---:|---:|---|
| `type.display-xl` | 4.5rem | 2.75rem | 0.98 | Large campaign or home hero |
| `type.display-lg` | 3.5rem | 2.25rem | 1.02 | Major page title |
| `type.h1` | 2.75rem | 2rem | 1.08 | Standard page heading |
| `type.h2` | 2rem | 1.625rem | 1.16 | Major section |
| `type.h3` | 1.5rem | 1.375rem | 1.25 | Subsection |
| `type.h4` | 1.25rem | 1.125rem | 1.3 | Component heading |
| `type.body-lg` | 1.25rem | 1.125rem | 1.55 | Introductory copy |
| `type.body` | 1.0625rem | 1rem | 1.6 | Primary reading text |
| `type.body-sm` | 0.9375rem | 0.9375rem | 1.5 | Supporting copy |
| `type.caption` | 0.8125rem | 0.8125rem | 1.45 | Caption and metadata |

Do not set essential digital text below `0.8125rem`. Forms and long-form text should normally remain at least `1rem`.

### 7.4 Tracking and casing

- Display titles: `0.04em` to `0.12em`, depending on length.
- Short all-capital labels: `0.10em` to `0.18em`.
- Source Sans 3 body copy: normal tracking.
- Never use all capitals for paragraphs, instructions or error messages.
- Avoid artificial small capitals if the font does not contain real small-cap glyphs.

### 7.5 Text measure and alignment

- Ideal body line length: 55 to 75 characters.
- Maximum long-form measure: `72ch`.
- Body copy is left-aligned on digital screens.
- Fully justified type is reserved for carefully typeset print editorial work and must not create visible rivers.
- Headings may be centred only for ceremonial, cover or short landing-page moments.

## 8. Grid and layout

### 8.1 Digital container

```css
--container-max: 90rem;       /* 1440px */
--container-reading: 72ch;
--page-gutter-mobile: 1.25rem;
--page-gutter-tablet: 2rem;
--page-gutter-desktop: 4rem;
```

The site may use the full viewport for photography, but readable content remains constrained.

### 8.2 Grid

| Viewport | Columns | Gutter | Outer margin |
|---|---:|---:|---:|
| Mobile, below 640px | 4 | 16px | 20px |
| Tablet, 640px to 1023px | 8 | 24px | 32px |
| Desktop, 1024px and above | 12 | 24px to 32px | 48px to 64px |

Start with one column on small screens. Introduce complexity only when content requires it.

### 8.3 Spacing scale

Use a consistent 4px base with an 8px working rhythm.

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4 */
--space-2: 0.5rem;   /* 8 */
--space-3: 0.75rem;  /* 12 */
--space-4: 1rem;     /* 16 */
--space-5: 1.5rem;   /* 24 */
--space-6: 2rem;     /* 32 */
--space-7: 3rem;     /* 48 */
--space-8: 4rem;     /* 64 */
--space-9: 6rem;     /* 96 */
--space-10: 8rem;    /* 128 */
```

Large digital sections may use `clamp()` between `--space-8` and `--space-10`. Do not introduce arbitrary one-off spacing without documenting the need.

### 8.4 Composition

- Prefer asymmetric editorial balance over perfect centring.
- Use large quiet fields beside one concentrated image or text block.
- Align elements to common axes.
- Let one image cross a grid boundary only when it strengthens the main idea.
- Do not repeat identical three-card or four-card rows down a page.
- Do not use decorative sidebars that contain no meaningful information.

## 9. Shape, border and depth

### 9.1 Shape language

Oryx is primarily rectilinear.

- Default corner radius: `0`.
- Small functional radius: `2px`.
- Maximum normal radius: `4px`.
- Circular shapes are reserved for portraits, status dots and genuinely circular data.
- Pill shapes are reserved for short status labels only.

### 9.2 Diagonal motif

The diagonal motif comes from the authentic shield.

- Sample the angle from the original vector asset.
- Use it as a crop, rule, reveal, image edge or transition.
- Use one strong diagonal event per composition.
- Never assemble diagonals into an imitation of the shield.
- Never use multiple random slashes as decoration.

### 9.3 Borders

```css
--border-subtle: 1px solid #E9E1D8;
--border-default: 1px solid #CFC6BD;
--border-strong: 2px solid #171717;
--border-accent: 2px solid #7A0F1E;
```

### 9.4 Shadows

Shadows should be nearly invisible.

```css
--shadow-low: 0 1px 2px rgba(23, 23, 23, 0.08);
--shadow-raised: 0 12px 30px rgba(23, 23, 23, 0.10);
```

Do not use glowing shadows, deep floating cards or glassmorphism.

## 10. Imagery

### 10.1 Image families

Build a broad image library so the same image is not repeated across unrelated sections.

1. **Namibian place**
   - desert ridges;
   - mountains and dry river landscapes;
   - Windhoek urban details;
   - northern towns and roads;
   - acacia, stone, sand and open sky.

2. **Institutional still life**
   - books;
   - notebooks;
   - pens;
   - folders and controlled records;
   - certificates and embossed stationery;
   - laptops and simple training tools;
   - safety equipment;
   - reception objects;
   - hospitality objects.

3. **Learning environments**
   - uncluttered classroom interiors;
   - reception simulation;
   - computer lab;
   - library or reading spaces;
   - workplace observation from a respectful distance.

4. **Architecture and material**
   - thresholds;
   - corridors;
   - institutional facades;
   - brick, plaster, metal, paper and textile;
   - light falling across plain surfaces.

5. **Authentic people**
   - the approved founder photograph;
   - commissioned or properly licensed documentary photography;
   - real Oryx learners and staff with consent.

### 10.2 Human imagery rules

People are not the default visual solution.

- Use the supplied founder photograph in the founder section.
- Do not generate a replacement founder or alter his age, face or identity.
- If the original background is distracting, make a careful cut-out and apply a restrained grade. Preserve the face, body proportions and clothing.
- Avoid generated close-ups of hands, crowds, smiling teams, graduation groups and posed classrooms.
- When generated people are unavoidable, show a distant, rear or side view with simple posture and limited visual detail.
- Never imply that generated people are actual learners, staff, partners or graduates.

### 10.3 Generation prompt rules

Generated supporting imagery must be:

- visually simple;
- one subject per frame;
- editorial and believable;
- naturally lit;
- warm-neutral with optional maroon grading;
- free of visible text, logos, watermarks and signage;
- free of complex fingers, hand interactions or crowded faces;
- high resolution and suitable for the intended crop.

Every generated asset must be visually inspected before use.

### 10.4 Image treatment

- Preserve natural skin tones in authentic photography.
- Use cream, warm grey, muted earth and maroon colour grading.
- Use dark maroon overlays at 20% to 65% only where required for legible text.
- Do not apply the same filter strength to every image.
- Do not use sepia so heavily that all images become brown and indistinguishable.
- Avoid staged stock photography and artificial campus claims.

### 10.5 Image reuse

- Do not repeat a hero image elsewhere on the same route or publication.
- Do not use one desert image as a universal background.
- Maintain an image register with filename, source, licence, subject, crop and pages or routes used.
- A repeated image must have a narrative reason, such as an opening and closing visual callback.

## 11. Iconography and illustration

### 11.1 Icons

Icons are simple, institutional line drawings.

- Base canvas: 24 × 24.
- Stroke: 1.5px to 2px.
- Colour: current text colour or brand maroon.
- Style: geometric, restrained and recognisable.
- End caps and joins must remain consistent within one family.
- Use labels when meaning is not universal.

Preferred subjects include:

- book;
- column;
- people;
- globe;
- inquiry;
- leadership;
- integrity;
- shield;
- certificate;
- workplace;
- computer;
- safety.

Do not mix filled app icons, emoji, hand-drawn doodles and classical line icons in one product.

### 11.2 Illustration

Use editorial line or cut-paper illustration only when photography cannot communicate the idea accurately.

- Keep scenes elementary.
- Use cream, maroon, black and muted earth tones.
- Avoid dense character scenes.
- Avoid cartoon mascots.
- Do not place generated words inside illustrations.

## 12. Digital components

### 12.1 Navigation

- Navigation may float above the hero on wide screens.
- Use the authentic horizontal logo on light fields and the reversed version on dark photography.
- Desktop navigation is concise and text-led.
- Mobile menu icon uses two horizontal lines, not three.
- The icon requires an accessible name such as `Open menu`.
- On open, the icon changes clearly and the focus remains managed.
- Avoid oversized navigation pills and translucent glass panels.

### 12.2 Hero

The home hero may use a controlled Namibia-inspired image sequence.

- Use three to five unique images.
- One visual subject per slide.
- Use short copy and one primary action.
- Do not auto-advance faster than seven seconds.
- Provide pause controls if motion starts automatically.
- Disable automatic transitions when `prefers-reduced-motion: reduce` is active.
- Do not place text over an uncontrolled bright or detailed area.

### 12.3 Buttons

#### Primary

- Maroon background.
- Cream or white text.
- Square or 2px corners.
- Minimum height: 48px.
- Clear hover, active, focus and disabled states.

#### Secondary

- Transparent or cream background.
- Maroon or ink text.
- 1px to 2px border.

#### Text action

- Text with a restrained directional arrow.
- Underline on hover and keyboard focus.

Button copy begins with a clear verb: `Explore programmes`, `Request information`, `Download profile`.

### 12.4 Links

- Links in running text are underlined.
- Colour alone must not identify a link.
- External links may receive a small icon and accessible description.
- Do not remove focus outlines.

### 12.5 Cards

Cards are optional, not the default page structure.

- Use a card only when content represents a discrete object or action.
- Prefer image, title, short descriptor and one action.
- Avoid identical card grids repeated in every section.
- Do not use nested cards.
- Do not use floating glass cards over photographs.

### 12.6 Forms

- Labels appear above fields.
- Required fields are explained in text.
- Inputs have a minimum height of 48px.
- Borders remain visible in all states.
- Errors are shown beside the relevant field and summarised at the top.
- Preserve user input after validation failure.
- Use Source Sans 3 at 16px minimum for input text.
- Do not use placeholders as labels.

### 12.7 Programme and qualification listings

Each listing should distinguish:

- programme or qualification title;
- school or division;
- NQF level where verified;
- delivery status;
- accreditation status;
- duration where approved;
- mode of study;
- entry requirements;
- application state.

Never present an unapproved programme as accredited or open for enrolment. Use precise status language such as `Planned`, `Subject to accreditation`, `Applications not yet open` or `Approved`.

### 12.8 Tables and data

- Use real HTML tables for tabular data.
- Left-align text and right-align comparable numbers.
- Repeat table headers where relevant.
- Use subtle horizontal rules.
- Avoid heavy full-cell maroon fills in print.
- Provide a responsive alternative for narrow screens without changing meaning.

### 12.9 Notices and status

Notices use a left rule, clear heading and plain explanation.

- Information: blue-grey.
- Success: green.
- Warning: amber-brown.
- Error: red.

Do not use maroon for every status because it will lose its institutional meaning.

## 13. Interaction states

Every interactive component must define:

- default;
- hover;
- active or pressed;
- keyboard focus;
- disabled;
- loading;
- success;
- validation failure;
- server failure;
- timeout.

Every route or system should account for:

- empty state;
- no results;
- offline;
- maintenance;
- access denied;
- session expired;
- locked preview;
- 404;
- 500.

### 13.1 Focus

Use a clearly visible two-layer focus treatment:

```css
:focus-visible {
  outline: 3px solid #FFF8EF;
  box-shadow: 0 0 0 5px #171717;
}
```

Reverse the colours where needed so the indicator remains visible. Focus must not be hidden behind sticky headers or overlays.

### 13.2 Loading

- Prefer content-shaped skeletons only when the wait is short and structure is known.
- Use text such as `Loading programmes` for important processes.
- Never use an endless spinner without an explanation or timeout path.

## 14. Motion

Motion is restrained and functional.

```css
--duration-fast: 120ms;
--duration-standard: 200ms;
--duration-slow: 360ms;
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

Approved motion:

- opacity change;
- short vertical reveal;
- subtle image crossfade;
- menu opening;
- focus and state transitions.

Avoid:

- continuous floating;
- parallax;
- scroll hijacking;
- bouncing icons;
- decorative counters;
- rotating words;
- large text that follows the pointer.

Respect `prefers-reduced-motion`. Essential information must not depend on animation.

## 15. Responsive behaviour

- Design mobile first.
- Preserve reading order when layouts collapse.
- Do not hide essential programme, fee, status or contact information on mobile.
- Convert multi-column editorial sections to one coherent column.
- Crop images around the same primary subject at every breakpoint.
- Keep touch targets at least 44 × 44 CSS px as an Oryx internal standard.
- Avoid horizontal scrolling except for clearly labelled data regions.
- Do not reduce body type merely to preserve a desktop composition.

## 16. Accessibility

The digital target is WCAG 2.2 AA.

Minimum requirements:

- Normal text contrast: 4.5:1.
- Large text contrast: 3:1.
- Interface and meaningful graphic contrast: 3:1.
- Keyboard access for every interactive function.
- Visible and unobscured focus.
- Logical heading order.
- Semantic landmarks.
- Descriptive link text.
- Useful alt text for informative images.
- Empty alt text for decorative images.
- Captions or transcripts for meaningful audio and video.
- Labels, instructions and errors that do not rely on colour alone.
- Zoom and reflow without lost content.
- Reduced-motion support.

Oryx should exceed the minimum where practical. The approved core colour pairings in section 6.3 already provide strong text contrast.

## 17. Editorial and print system

### 17.1 Formats

- Primary institutional documents: A4 portrait.
- Editorial spreads and print masters: A3 landscape folded to A4 where planned.
- Posters: A3, A2 or larger.
- Social crops are derived from a master composition, not stretched from print pages.

### 17.2 Production

- Raster images: 300 ppi at final print size.
- Preferred logo format: vector PDF, SVG or EPS.
- Bleed: 3 mm unless the printer specifies otherwise.
- Safe area: at least 12 mm from trim; 15 mm preferred for binding.
- Keep essential content away from folds and gutters.
- Embed fonts only where licences permit.
- Export a press PDF using the printer's requested PDF/X profile.
- Obtain the printer's CMYK profile before final colour conversion.
- Review a physical proof before a high-volume run.

### 17.3 Print-friendly design

- Cream and white are the default page fields.
- Reserve full maroon pages for covers, section openers and deliberate moments.
- Use maroon rules, headings and small fields instead of ink-heavy boxes.
- Do not place the maroon logo on maroon.
- Maintain readable tonal contrast when printed in greyscale.
- Avoid very light body text.

### 17.4 Editorial rhythm

A profile or prospectus should vary its page architecture:

- image-led opener;
- quiet mission page;
- structured programme overview;
- full-width object image;
- data or process spread;
- founder page using the authentic supplied photograph;
- closing contact page.

Do not repeat one template across every page. Do not repeat images unless the repetition is a deliberate narrative callback.

## 18. Physical environment

The spatial design follows the same principles.

- Cream or warm off-white walls.
- Maroon used at entrances, wayfinding, key doors or controlled feature areas.
- Ink-black text and signage.
- Honest materials such as sealed brick, plaster, timber, powder-coated steel and corrugated metal used carefully.
- Clear sightlines and uncluttered reception.
- Real learner notices separated from permanent brand signage.
- Accessible routes and legible directional signs.

Avoid covering walls with oversized motivational quotes, repeated logos or decorative gradients.

## 19. Content and voice

### 19.1 Voice

Oryx sounds:

- clear;
- calm;
- capable;
- evidence-led;
- respectful;
- ambitious without exaggeration.

### 19.2 Writing rules

- Lead with the useful fact.
- Use short sentences and concrete verbs.
- Explain acronyms on first use.
- Distinguish current facts, approved plans and assumptions.
- Use Namibian English consistently.
- Use `recognised`, `programme`, `organisation` and `labour`.
- Use `N$` for Namibia dollars.
- Use an en dash for numeric ranges where supported.
- Avoid em dashes in public copy.

### 19.3 Prohibited language

Do not use unsupported superlatives or generic AI copy such as:

- revolutionise;
- unlock;
- next generation;
- cutting edge;
- seamless;
- game changing;
- world class;
- unwavering commitment.

Do not invent:

- accreditations;
- learner numbers;
- placement rates;
- partners;
- testimonials;
- prices;
- dates;
- addresses;
- registration details;
- funding approvals;
- business results.

### 19.4 AI language

AI is an embedded productivity and responsibility layer, not the identity of every qualification. Explain what a learner will do with a tool and how work will be verified. Do not market familiar careers as experimental AI courses.

## 20. Data visualisation

- Use charts only when they communicate a relationship more clearly than prose or a table.
- Start with maroon, dark maroon, ink and warm neutrals.
- Add status colours only when needed.
- Label values directly where space permits.
- Do not rely on colour alone.
- Avoid 3D charts, decorative gauges and fake dashboards.
- Cite the source, period and methodology.
- Mark projections and assumptions visibly.

## 21. Implementation tokens

```css
:root {
  color-scheme: light;

  --color-brand-maroon: #7A0F1E;
  --color-brand-maroon-dark: #4A0710;
  --color-brand-cream: #FFF8EF;
  --color-brand-ink: #171717;
  --color-white: #FFFFFF;

  --color-text: #171717;
  --color-text-secondary: #4E4946;
  --color-text-muted: #77706B;
  --color-surface: #FFF8EF;
  --color-surface-raised: #FFFFFF;
  --color-surface-alt: #F5EEE6;
  --color-border-subtle: #E9E1D8;
  --color-border: #CFC6BD;

  --color-success: #246B45;
  --color-warning: #8A5A00;
  --color-error: #A12622;
  --color-info: #315A73;

  --font-display:
    "Trajan Pro 3",
    "Trajan Pro",
    "Cinzel",
    "Times New Roman",
    serif;

  --font-body:
    "Source Sans 3",
    "Source Sans Pro",
    "Segoe UI",
    Arial,
    sans-serif;

  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;

  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;

  --border-subtle: 1px solid #E9E1D8;
  --border-default: 1px solid #CFC6BD;
  --border-strong: 2px solid #171717;
  --border-accent: 2px solid #7A0F1E;

  --shadow-low: 0 1px 2px rgba(23, 23, 23, 0.08);
  --shadow-raised: 0 12px 30px rgba(23, 23, 23, 0.10);

  --duration-fast: 120ms;
  --duration-standard: 200ms;
  --duration-slow: 360ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  --container-max: 90rem;
  --container-reading: 72ch;
}
```

Token naming follows the principle that design decisions should remain portable across tools and platforms. If a formal token file is introduced, align its structure with the stable Design Tokens Community Group format and keep this document as the human-readable authority.

## 22. Correct and incorrect usage

| Correct | Incorrect |
|---|---|
| Authentic logo overlaid after image production | AI-generated or redrawn logo |
| Reversed cream logo on maroon | Maroon logo on maroon |
| One distinct image per major section | Same image repeated as filler |
| Books, pens, tools, architecture and landscape | Generic smiling team stock |
| Authentic founder photograph | Generated or age-altered founder |
| Trajan for short display titles | Trajan for long paragraphs |
| Source Sans 3 for interfaces | Multiple unrelated body fonts |
| Restrained gradient for depth or contrast | Purple, neon or glossy gradient |
| Rectilinear composition and sampled diagonal motif | Random blobs and decorative slashes |
| Clear status language | Unverified accreditation or enrolment claim |
| Varied editorial page architecture | One repeated card template |
| Visible keyboard focus | Removed focus outline |
| Cream-led print pages | Ink-heavy maroon boxes on every page |

## 23. Design quality gate

Before approval, confirm:

### Brand

- [ ] The logo is an authentic supplied asset.
- [ ] The correct logo variation is used for the background.
- [ ] The mark is not regenerated, stretched or recoloured.
- [ ] Institution and division names follow the approved hierarchy.

### Typography

- [ ] Trajan is licensed or replaced consistently by Cinzel.
- [ ] Source Sans 3 is used for body and interface text.
- [ ] Body text remains readable at the intended size.
- [ ] Line length and hierarchy are controlled.

### Colour

- [ ] Core brand colours match the exact hex values.
- [ ] Text and controls pass WCAG 2.2 AA contrast.
- [ ] Status is not communicated by colour alone.
- [ ] Gradients are restrained and purposeful.

### Imagery

- [ ] No image is repeated without a narrative reason.
- [ ] Generated images contain no logo or important text.
- [ ] Human imagery is authentic, distant or visually simple.
- [ ] The founder is represented only by the supplied approved photograph.
- [ ] Hands, crowds and AI-looking details have been inspected.

### Layout

- [ ] There is one dominant message per composition.
- [ ] The design uses a coherent grid and spacing scale.
- [ ] Mobile reading order is logical.
- [ ] Cards, pills, gradients and shadows are not overused.

### Content

- [ ] All facts and statuses are verified.
- [ ] Planned items are labelled as planned.
- [ ] The current email is `contact@oryxinstitute.org`.
- [ ] No fake metrics, testimonials, partners or accreditations appear.
- [ ] Public copy avoids prohibited generic language.

### Accessibility and function

- [ ] Keyboard navigation works.
- [ ] Focus is visible and unobscured.
- [ ] Images have correct alt treatment.
- [ ] Forms expose labels and errors.
- [ ] Reduced-motion behaviour works.
- [ ] Loading, error, empty and offline states are designed.

### Print

- [ ] Images are 300 ppi at final size.
- [ ] Bleed and safe areas are correct.
- [ ] Fonts and logo assets are embedded legally.
- [ ] Greyscale legibility has been checked.
- [ ] A physical proof is approved before volume printing.

## 24. Governance

### 24.1 Approval

Changes to any of the following require written approval from the Oryx Institute brand owner:

- logo artwork or lock-ups;
- core colours;
- primary typefaces;
- institutional names;
- brand promise;
- design thesis;
- public accreditation language.

### 24.2 Versioning

Use semantic versions:

- Patch, `1.0.1`: clarification with no visual change.
- Minor, `1.1.0`: additive component or token.
- Major, `2.0.0`: identity, typography, palette or structural change.

Record:

- decision;
- approver;
- date;
- affected files;
- migration requirements.

### 24.3 Asset register

Maintain a controlled register for:

- logos and their checksums;
- licensed fonts and proof of licence;
- image rights and consent;
- icon masters;
- templates;
- production colour profiles;
- approved generated imagery;
- retired assets.

## 25. Research basis

This specification uses:

- the approved Oryx Institute brand system and establishment blueprint;
- the supplied authentic Oryx logo and visual references;
- Adobe's official Trajan description and licensing guidance;
- Adobe's official Source Sans 3 repository and SIL Open Font License;
- the W3C Web Content Accessibility Guidelines 2.2;
- the stable Design Tokens Community Group 2025.10 format;
- established responsive typography, spacing and layout principles documented by the GOV.UK Design System.

### Primary references

- Adobe Fonts, Trajan: <https://fonts.adobe.com/fonts/trajan>
- Adobe Fonts, Source Sans 3: <https://github.com/adobe-fonts/source-sans>
- Google Fonts repository and font licensing guidance: <https://github.com/google/fonts>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Design Tokens Format Module 2025.10: <https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/>
- GOV.UK Design System, type scale: <https://design-system.service.gov.uk/styles/type-scale/>
- GOV.UK Design System, spacing: <https://design-system.service.gov.uk/styles/spacing/>
- GOV.UK Design System, layout: <https://design-system.service.gov.uk/styles/layout/>

