# Design

## Phase 2 — UX heuristic audit

- **Status:** Awaiting browser validation and implementation approval.
- **Reviewed:** 13 November 2026
- **Scope:** Source-level qualitative review of the bilingual public site: all route templates under `src/app/[lang]/(site)`, the shared header, off-canvas menu, search dialog, enquiry composer and the route/action model in `docs/WEBSITE.md`.
- **Method:** The installed `ux-heuristics` skill: Krug's Trunk Test, Nielsen's heuristics, a task walkthrough and the skill's 0–4 severity scale.
- **Boundary:** This is a heuristic review, not visitor research, analytics analysis, a conversion study or a live accessibility test. It does not establish traffic, task failure, visitor preferences or conversion impact. It authorizes no public-site change.

### Evidence limits

The findings below are supported by source inspection on 13 November 2026. A browser executable was not available for Playwright, so no desktop/mobile interaction, zoom, assistive-technology or visual rendering claim is made here. The existing accessibility audit records the same limitation in `docs/accessibility-audit-2026-11.md`.

The locale templates share the same chrome and components. Where a finding names a site-wide component, it applies to its English and Afrikaans instances unless a later browser check establishes otherwise.

## Severity and score

| Rating | Meaning in this audit |
|---:|---|
| 4 | Prevents a core task from being completed. |
| 3 | Creates a significant task failure or recovery burden. |
| 2 | Delays, confuses or frustrates a task. |
| 1 | A minor discoverability or presentation annoyance. |
| 0 | Not treated as a usability problem. |

**Qualitative heuristic score: 6/10.** This is a diagnostic summary, not a measured user score. There are no source-level severity-3 or severity-4 findings in this review. Three severity-2 findings and two severity-1 findings keep the experience out of the 9–10 band; live validation can confirm, reduce or retire them.

| Severity | Count |
|---:|---:|
| 4 — catastrophic | 0 |
| 3 — major | 0 |
| 2 — minor | 3 |
| 1 — cosmetic | 2 |

**Path to 10/10:** validate the current interaction model in a browser, then resolve or explicitly retain the three severity-2 decisions: current-location orientation, homepage action hierarchy and reply-channel semantics. Give small-screen visitors a discoverable search route if testing confirms search is a needed task, and make search state explicit if the client-side index remains lazy-loaded.

## Coverage and task context

The audit used the existing contextual action model rather than assuming one conversion action for every page. Coverage is source-based; “covered” means that the route template or shared component was inspected, not that a visitor successfully completed a task.

| Surface | Intended visitor task | Source-review result |
|---|---|---|
| Home | Understand the institute, reach current work or make a factual enquiry. | Covered; the hero action hierarchy is recorded as UX-02. |
| About | Understand the institutional model and continue to work or office contact. | Covered; shared navigation/orientation applies. |
| Research, Research Notes and individual notes | Read evidence-led work or continue to relevant current work. | Covered; shared navigation/orientation applies. |
| Practice | Understand current services and enquire with the office. | Covered; shared navigation/orientation applies. |
| Ventures and Corner Spa | Inspect confirmed venture information and, where relevant, contact Oryx. | Covered; shared navigation/orientation applies. The embedded third-party Corner Spa service remains outside Oryx source control. |
| Institutional Status and Register | Understand the dated disclosure and navigate between present status and record. | Covered; shared navigation/orientation applies. |
| Enquire | Prepare a factual message to the Oryx office. | Covered; reply-channel semantics are recorded as UX-03. |
| Contact and Links | Select an official contact route. | Covered; shared navigation/orientation applies. |
| FAQ | Find a factual answer or reach the office. | Covered; shared navigation/orientation applies. |
| Brand, privacy and terms | Complete the stated information task. | Covered; no additional source-level heuristic finding was recorded. |
| Header, menu and search | Move between major sections, orient, and find content. | Covered; orientation is UX-01 and mobile/search-state items are UX-04 and UX-05. |

## Heuristic review

| Heuristic | Source-level result | Evidence and limitation |
|---|---|---|
| 1. Visibility of system status | Partial | Search has an empty/hint state, but not an explicit current-query loading state (UX-05). Form validation has inline error text and moves focus to the first invalid field. Mail-client handoff cannot confirm delivery from the site. |
| 2. Match between system and the real world | Partial | Plain route labels such as Research, Practice, Ventures, Status and Enquire are used. The one reply field accepts two real-world contact types but exposes email-specific input hints (UX-03). |
| 3. User control and freedom | Source indication: pass | The menu and search have close controls and Escape handling; source code restores focus when they close. Keyboard behaviour still needs browser and assistive-technology validation. |
| 4. Consistency and standards | Partial | Route labels are consistent across shared navigation. The CSS supports a current-page state, but the header links do not expose it (UX-01). |
| 5. Error prevention | Partial | The enquiry composer validates before opening a mail client, but its mixed email/telephone field cannot offer correct mobile keyboard and autocomplete semantics for both paths (UX-03). |
| 6. Recognition rather than recall | Partial | Persistent navigation and the off-canvas sitemap expose options, but visitors receive no active-route cue. Small-screen search is not visibly available (UX-01, UX-04). |
| 7. Flexibility and efficiency | Partial | `/` and Cmd/Ctrl+K are useful keyboard accelerators after hydration. They are not a discoverable replacement for a visible small-screen search route (UX-04). |
| 8. Aesthetic and minimalist design | Partial | The homepage hero presents two equal-weight filled actions, even though the approved action map distinguishes a primary enquiry action from a transitional current-work action (UX-02). |
| 9. Help users recognise, diagnose and recover from errors | Source indication: pass | Validation messages identify the affected field and retain entered values. Interaction and wording require browser validation. |
| 10. Help and documentation | Source indication: pass | FAQ, Contact and Links provide task-focused factual routes. This finding does not test whether visitors can find or understand every answer. |

## Findings and evidence-safe backlog

Priority below is driven by heuristic severity and implementation dependency, not predicted conversion impact. No item should enter public-site source until the user approves the proposed change and a browser-validation plan.

| ID | Finding and source evidence | Heuristic | Severity | Evidence-safe next step | Validation before closure |
|---|---|---|---:|---|---|
| UX-01 | `src/app/globals.css` styles `.nav-link[aria-current="page"]`, but the primary links in `src/components/site/site-header.tsx` do not set `aria-current` or another active-route cue. Deep routes also have no hierarchy cue. A visitor can see an H1 but may not be able to recognise their place in the shared structure at a glance. | Recognition rather than recall; consistency and standards | 2 | Define active-route behaviour for primary links, including an explicit rule for grouped routes. Add a lightweight hierarchy cue only where it would clarify a real parent/child relationship. | Test desktop and small-screen menu orientation, screen-reader current-page announcement and representative deep routes. |
| UX-02 | On the homepage, “See what runs now” and “Enquire” are adjacent links with the same `btn btn--cream` treatment. `docs/WEBSITE.md` names Enquire as the primary home action and current work as transitional. Equal visual weight makes the intended next step less self-evident. | Aesthetic and minimalist design | 2 | Keep both factual routes, but design one clear primary treatment for Enquire and a quieter transitional treatment for current work. This is a qualitative hierarchy recommendation, not a claim that either action underperforms. | Compare the first viewport at mobile and desktop widths; obtain visitor evidence before asserting an outcome or testing a conversion hypothesis. |
| UX-03 | `src/components/site/apply-form.tsx` accepts either an email address or a telephone number, while the single text input uses `inputMode="email"` and `autoComplete="email"`. Its validation recognises telephone numbers. The mobile keyboard and autofill hint cannot be correct for both reply channels. | Error prevention; match between system and the real world | 2 | Decide between an email-only reply field or separate optional Email and Phone fields that require one usable reply channel. Preserve the factual, mail-client handoff and no-storage model. | Test on mobile keyboards and browser autofill, then test invalid, email-only, phone-only and both-channel paths with keyboard and screen-reader users. |
| UX-04 | `.search-trigger` is `display: none` below the `75rem` breakpoint. The full menu exposes navigation but not a Search entry. `/` and Cmd/Ctrl+K can open search after hydration, but that requires prior knowledge and a keyboard. | Flexibility and efficiency; recognition rather than recall | 1 | Add a visible Search entry to the mobile menu, or retain navigation-only small screens deliberately after device/task testing. Do not assume that search is required without evidence. | Test touch-only discovery at small widths and confirm that menu/search focus hand-off remains correct. |
| UX-05 | `src/components/site/search-dialog.tsx` lazy-loads the static index when input changes, while the visible state is results, no-results or the two-character hint. It has no explicit in-progress state; a changed query can temporarily retain results from an earlier query while the current lazy import resolves. | Visibility of system status | 1 | If lazy loading remains, expose a brief polite search-in-progress state and clear or label stale results while the current query resolves. | Exercise cold-load and rapid query changes with keyboard, pointer and a screen reader. |

### Prioritised implementation order

1. **UX-01 — orientation:** low-complexity shared-navigation decision, then browser check.
2. **UX-03 — enquiry semantics:** decide the reply-channel model before changing a form that hands off to a mail client.
3. **UX-02 — homepage hierarchy:** make the action model visually explicit only after the design treatment is approved.
4. **UX-04 and UX-05 — search:** validate the real small-screen search need and cold-load behaviour before adding UI or state.

## Task walkthrough

| Task | Expected path | Source-review observation | Severity if applicable |
|---|---|---|---:|
| Find the work that runs now from the home page | Home hero → current work section or enquiry route. | Both available routes are present, but their identical treatment leaves the primary/secondary relationship to interpretation. | 2 — UX-02 |
| Send an office enquiry | Enquire → complete name, reply channel, topic and message → hand off to the visitor's mail client. | Required-field validation and error focus are present. The reply-channel field accepts a phone number despite email-specific mobile/autofill semantics. | 2 — UX-03 |
| Check current institutional status | Status → read disclosure → Register or Contact as needed. | Primary navigation includes Status and pages provide page headings; the shared navigation gives no active-route indicator. | 2 — UX-01 |
| Find a known topic | Use Search, or browse the menu/sitemap. | Desktop has a visible trigger. At smaller widths, search is not visibly exposed, while a keyboard shortcut remains an undiscoverable enhancement. | 1 — UX-04 |
| Change a search query while the index becomes available | Open Search → type a query → inspect results. | The index is lazy-loaded from the input handler with no explicit current-query progress status. | 1 — UX-05 |

## Navigation: Trunk Test

| Question | Source-review result | Notes |
|---|---|---|
| What site is this? | Pass | Persistent Oryx lockup and site metadata identify the institute. |
| What page am I on? | Pass | Public route templates provide clear page headings. |
| What are the major sections? | Pass | Desktop primary navigation and the menu expose the main sections. |
| What are my options here? | Pass | Page-level actions and contact routes are present for the reviewed contextual tasks. |
| Where am I in the structure? | Partial | Page heading supplies local orientation, but shared navigation does not identify the active route and deep routes have no hierarchy cue. |
| How can I search? | Partial | Search is visible on desktop. It is not a discoverable touch route below 75rem. |

## Required validation before a design verdict

1. Run the menu and search at desktop and mobile widths: initial focus, Tab and Shift+Tab cycling, Escape, return focus, route changes and touch use.
2. Test Home, Status, Register, Contact, Links and Enquire at 200% zoom and with a screen reader; include current-route announcement and the nested Link Hub landmark in the review.
3. Test the enquiry form with mobile email and telephone entry, browser autofill and an unavailable/default mail-client scenario.
4. Exercise Search on a cold load and during rapid input changes. Confirm whether small-screen visitors need content search before adding it to the menu.
5. If any source change is later approved, record its task, factual-status review, validation method and an evidence boundary in `docs/EXPERIMENTS.md` before claiming an outcome.

## Decision record

- Phase 1 remains **awaiting evidence**. Nothing in this qualitative audit is evidence of a blocked conversion path, visitor objection, traffic level or outcome.
- The user approved this audit for documentation on 13 November 2026, but did **not** approve public-site source changes.
- Phase 2 remains **awaiting browser validation**. A future implementation decision must review the factual-status guardrail: no unsupported registration, accreditation, programme, qualification, intake, fee, campus, leadership, partnership or endorsement claim may be introduced.
