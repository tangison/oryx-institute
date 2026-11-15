# Accessibility and interaction audit

**Reviewed:** 13 November 2026

**Scope:** Source review and production-mode route checks of the Next.js application. This is not a substitute for keyboard, screen-reader, mobile, colour-contrast or assistive-technology testing on the deployed site.

## Strengths already present

- A visible skip link exists in `src/app/[lang]/(site)/layout.tsx`.
- Global and component focus-visible styles exist in `src/app/globals.css`.
- Images reviewed use alternative text or are marked decorative.
- The application form has visible labels, names, autocomplete hints, inline error text and `aria-invalid`.
- Scroll and site-motion components check `prefers-reduced-motion`.
- The Corner Spa loader uses an accessible status region and has a fallback link.
- Site navigation uses links for navigation and buttons for actions.

## Completed in this pass

- The off-canvas menu now becomes a true modal after hydration: it moves focus to its first route, keeps Tab focus in the panel, makes the main reading surface inert and returns focus to the menu trigger after Escape or close.
- Search now contains focus while open, returns focus to its trigger when dismissed and makes the reading surface inert. Search and menu are mutually exclusive.
- Search results are now ordinary links rather than nested `listbox`/`option` controls, preserving normal browser link behaviour.
- The search row has a visible `:focus-within` treatment.
- The Link Hub footer’s utility links now meet the 48 px minimum target requirement.
- Existing external-arrow text glyphs on Contact, blog and Corner Spa were replaced with the local `RouteArrowIcon` SVG.
- The enquiry form now moves focus to the first invalid field after validation, while retaining its visible inline error message.

## Remaining review items

### Medium priority

- `src/components/site/apply-form.tsx:232-255` accepts either an email address or telephone number, but always requests an email keyboard and email autocomplete. A single field cannot offer the correct mobile keyboard and autocomplete semantics for both input types.
- Confirm deep links to every independently meaningful heading at mobile, tablet and desktop sizes. Global `scroll-padding-top` exists, but route-level verification is still required.

## Test gaps

- There is no automated browser accessibility test in the repository.
- Playwright is installed as a package, but the Chromium binary is not available in this workspace. The focus implementation was linted, type-checked and source-reviewed; it still needs live keyboard and screen-reader verification in a browser-capable environment.
- The Corner Spa is a third-party iframe. Oryx can provide a descriptive title, fallback link and reduced-motion loader, but it cannot guarantee the embedded site's accessibility without access to its source or an owner-led audit.

## Next verification session

1. Test menu and search keyboard behaviour on desktop and mobile-width layouts: initial focus, Tab and Shift+Tab cycling, Escape, return focus and route navigation.
2. Test the Link Hub, Contact, Status and Register pages at 200 percent zoom and with a screen reader.
3. Check contrast and non-text focus indicators against the deployed Vercel preview.
4. Add browser-level accessibility coverage when a browser-capable CI environment is available.
5. Decide whether to split email and telephone into separate fields before changing the current one-field enquiry flow.
