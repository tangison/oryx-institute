# Ongwediva centre facts implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the confirmed planned Ongwediva centre and Corner Spa operating facts without changing the existing Windhoek office, accreditation, or public-address boundaries.

**Architecture:** Keep factual data in the English and Afrikaans content sources, then update route-local copy and machine-readable surfaces that render the same facts. Verify the rendered English and Afrikaans routes from a production build rather than relying only on source inspection.

**Tech Stack:** Next.js 16 App Router, TypeScript, React, existing static content modules, Node.js validation scripts

**Spec:** `docs/superpowers/specs/2026-11-13-ongwediva-centre-facts-design.md`

## Global Constraints

- Publish only the approved secured-planned-not-open wording for Untag Guest House in Ongwediva
- Retain current Windhoek office wording and do not print a public street address
- Do not add BIPA numbers, certificates, accreditation claims, course dates, fees, staff, outcome claims, or competition-form copy
- Keep English and Afrikaans content aligned
- Keep `理工` as a future visual-only master-artwork task; do not recreate it with live text
- Do not add language routes or machine-translated legal or accreditation text

## Review Focus

- Current office references must remain Windhoek while the training centre is described as planned and not open
- No route may imply that Untag Guest House is an open campus or publish its street address
- Corner Spa must not appear as both operating and in development on the same public surface
- English and Afrikaans route metadata, headers, canonicals, and alternates must stay consistent
- Markdown negotiation for `/af/...` must still return the matching English-first shelf document

---

### Task 1: Centralise the approved centre and venture facts

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/lib/site-af.ts`
- Modify: `src/lib/search-index.ts`
- Modify: `src/lib/md-shelf.ts`

**Interfaces:**
- Consumes: `site`, `ventures`, `siteAf`, `venturesAf`, and the existing search/shelf document data
- Produces: English and Afrikaans structured facts for a planned, not-open Ongwediva centre and an operating Corner Spa

- [ ] **Step 1: Add the approved planned-centre fact to both locale content sources**

Add a named factual field in `site` and `siteAf` that says the first dedicated training-centre site at Untag Guest House in Ongwediva is secured, planned, and not open yet. Do not replace the existing city or office fields.

- [ ] **Step 2: Replace the stale Corner Spa development state in both venture data objects**

Change the English and Afrikaans status labels and body copy so both say Corner Spa is the first operating venture with Mendozer. Remove future-opening and in-development statements while retaining the existing boundary around booking and service details.

- [ ] **Step 3: Align derived search and Markdown descriptions**

Update the Corner Spa search entry and Markdown shelf descriptions so they agree with the operating status. Add the planned-centre fact only where the shelf already describes institute status.

- [ ] **Step 4: Run the source regression scan**

Run:

```bash
rg -n -i 'Corner Spa.*in development|Until then, it is in|When it opens' src/lib public
```

Expected: no stale Corner Spa opening-state prose remains in public content sources.

- [ ] **Step 5: Commit the central content changes**

```bash
git add src/lib/site.ts src/lib/site-af.ts src/lib/search-index.ts src/lib/md-shelf.ts
git commit -m "Align planned centre and Corner Spa facts"
```

### Task 2: Update route and machine-readable copy

**Files:**
- Modify: `src/app/[lang]/(site)/about/page.tsx`
- Modify: `src/app/[lang]/(site)/contact/page.tsx`
- Modify: `src/app/[lang]/(site)/faq/page.tsx`
- Modify: `src/app/[lang]/(site)/ventures/page.tsx`
- Modify: `src/app/[lang]/(site)/ventures/corner-spa/page.tsx`
- Modify: `public/llms.txt`
- Modify: `public/humans.txt`

**Interfaces:**
- Consumes: structured facts added in Task 1
- Produces: factual public pages and machine-readable text that use the same planned-centre and operating-venture boundaries

- [ ] **Step 1: Add the planned-centre statement to the public institutional surfaces**

Place the approved sentence or an equivalent Afrikaans translation on pages that explain location, status, and contact. Put it next to the existing no-public-premises wording; do not turn it into a form-style sales proposition.

- [ ] **Step 2: Update Corner Spa route copy**

Ensure Ventures and the Corner Spa collaboration page call the spa operating. Keep Mendozer's role and the existing booking links intact.

- [ ] **Step 3: Align `llms.txt` and `humans.txt`**

Add the planned-centre fact and correct the spa state. Retain the Windhoek office statement and the absence of a public street address.

- [ ] **Step 4: Check the public-content boundary**

Run:

```bash
rg -n -i 'Unt[ae]g|Ongwediva|CC/2026/12517|street address' src public
```

Expected: the planned-centre wording appears, no BIPA number is added, and no specific Untag street address is published.

- [ ] **Step 5: Commit route and machine-readable copy**

```bash
git add src/app public/llms.txt public/humans.txt
git commit -m "Publish planned Ongwediva centre status"
```

### Task 3: Run production verification and publish a branch deployment

**Files:**
- Modify: none unless a validation failure identifies a defect

**Interfaces:**
- Consumes: Tasks 1 and 2
- Produces: a validated production build and a Vercel branch deployment tied to the current commit

- [ ] **Step 1: Run static validation**

Run:

```bash
npm run lint && npm run build && git diff --check
```

Expected: all commands exit 0 and the production build completes.

- [ ] **Step 2: Start the production server and verify changed routes**

Run the built site on an available local port, then check `/about`, `/af/about`, `/contact`, `/af/contact`, `/ventures`, `/af/ventures`, `/ventures/corner-spa`, and `/af/ventures/corner-spa`.

Expected: each returns 200; English routes return `Content-Language: en`; Afrikaans routes return `Content-Language: af-NA`; rendered content contains the approved planned-centre fact where intended and no stale in-development Corner Spa status.

- [ ] **Step 3: Re-run locale integrity checks**

Verify the sitemap has no `/zh` URLs, English and Afrikaans alternates remain present, `/zh/...` permanently redirects to English, and `Accept: text/markdown` on `/af/about` returns the matching English-first Markdown shelf document.

- [ ] **Step 4: Push the current branch and deploy the branch commit**

Push only `arena/5d54fa5b-oryx-institute`. Create or confirm the Vercel deployment for that exact commit in the `oryx-institute` project. Report the branch deployment URL and readiness state without fetching the deployment URL from the shell.

- [ ] **Step 5: Commit validation-only fixes, if any**

```bash
git status --short
git add <only-files-fixed-during-validation>
git commit -m "Fix planned centre publishing validation"
git push origin arena/5d54fa5b-oryx-institute
```

## Self-review

- **Spec coverage:** Task 1 updates single-source locale facts; Task 2 covers public route and machine-readable consumers; Task 3 proves rendered behaviour and deployment.
- **Step scan:** Each implementation action identifies the exact data or public surface and the exact prohibited claims.
- **Type consistency:** No new runtime interface is required; existing constant objects remain the data boundary.
- **Review focus:** Each factual boundary has a source scan or rendered-route check in Tasks 1 through 3.
- **Proportion:** The plan records implementation decisions and validation commands without prescribing component bodies.

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-11-13-ongwediva-centre-facts.md`. Please review the plan. Does it capture what you want?
