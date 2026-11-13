# Accessibility and interaction audit

**Reviewed:** 13 November 2026

**Scope:** Static review of the Next.js application against the Vercel Web Interface Guidelines. This is not a substitute for keyboard, screen-reader, mobile, colour-contrast, or assistive-technology testing on the deployed site.

## Strengths already present

- A visible skip link exists in `src/app/[lang]/(site)/layout.tsx`
- Global and component focus-visible styles exist in `src/app/globals.css`
- Images reviewed use alternative text or are marked decorative
- The application form has visible labels, names, autocomplete hints, inline error text, and `aria-invalid`
- Scroll and site-motion components check `prefers-reduced-motion`
- The Corner Spa loader uses an accessible status region and has a fallback link
- Site navigation uses links for navigation and buttons for actions

## Findings

### High priority

- `src/components/site/search-dialog.tsx:141-213` declares a modal dialog but does not keep keyboard focus inside it or restore focus to the search trigger on close. Tab can reach content behind a dialog marked `aria-modal="true"`.
- `src/components/site/site-header.tsx:91-97` and `src/components/site/menu-behaviour.tsx:24-65` declare the full-screen menu as a modal dialog. The menu moves focus to its first link and handles Escape, but it does not contain Tab focus or make background content inert while open.
- `src/components/site/apply-form.tsx:172-179` reports validation messages but does not move focus to the first invalid field. Keyboard and screen-reader visitors can miss where correction is required.

### Medium priority

- `src/components/site/search-dialog.tsx:182-203` attaches click behaviour to a `li` with `role="option"` while nesting a link inside it. The list item is not keyboard actionable, and the nested click handlers prevent normal link behaviour such as opening in a new tab.
- `src/app/globals.css:811-820` removes the search input outline without adding a focus-visible treatment to the input or its containing row. The border remains present but does not change when the input receives keyboard focus.
- `src/components/site/apply-form.tsx:232-255` accepts either an email address or telephone number, but always requests an email keyboard and email autocomplete. A single field cannot offer the correct mobile keyboard and autocomplete semantics for both input types.
- `src/app/globals.css` has no heading-anchor `scroll-margin-top` rule. Deep links can land behind the persistent header.

### Test gaps

- There is no automated browser accessibility test in the repository. The current smoke script exercises interaction, but not semantic and contrast violations.
- Chromium is not installed in this workspace, so an automated browser audit cannot run locally until the test environment supplies a browser.
- The Corner Spa is a third-party iframe. Oryx can provide a descriptive title, fallback link, and reduced-motion loader, but it cannot guarantee the embedded site's accessibility without access to its source or an owner-led audit.

## Remediation proposal

1. Add a small, reusable focus-containment utility for the menu and search dialog. Restore focus to the element that opened each overlay. Keep the existing no-JavaScript menu behaviour.
2. Make search results plain links, retain arrow-key selection on the search input, and avoid click handling on non-interactive list items.
3. Add `:focus-within` feedback to the search row and `scroll-margin-top` to heading anchors.
4. Move form focus to the first invalid control. Keep error messages polite and inline.
5. Decide whether to split email and telephone into separate controls. This is the semantically strongest solution, but changes the application flow and mailto template.
6. Add automated accessibility coverage when a browser-capable CI environment is available, then manually test keyboard navigation, 200% zoom, and screen-reader announcements against the Vercel preview.
