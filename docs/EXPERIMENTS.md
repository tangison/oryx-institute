# Experiments

## Evidence rule

No A/B test is approved in this backlog because the site has no verified baseline, traffic source, sample-size inputs or visitor-research evidence. The items below are evidence and decision work. They are not public product claims, and they do not authorize a tracking implementation.

## Experiment cards

### EXP-001 — Establish a privacy-compatible evidence baseline

- **Hypothesis:** We believe that Oryx can identify the most consequential public-site friction if it records approved aggregate route-to-handoff signals and consent-based enquiry themes, because these sources show where visitors stop and why without inventing a conversion narrative.
- **Type:** Research and measurement decision.
- **Primary metric and threshold:** Approved coverage definition for the contextual primary actions in `METRICS.md`; no threshold is set until a measurement method and baseline are approved.
- **Guardrail metric:** Zero new advertising pixels, personal profiling, unsupported traffic claims or changes to factual institutional-status wording.
- **Decision rule:** If an approved, privacy-compatible evidence approach exists, collect a baseline before ranking public-site change hypotheses. If it does not exist, retain Phase 1 as awaiting evidence and use qualitative UX review without conversion claims.
- **Result and verdict:** Awaiting decision and evidence.

### EXP-002 — Consent-based office-enquiry theme review

- **Hypothesis:** We believe that a small, consent-based review of recurring office-enquiry themes will reveal real visitor questions and objections, because office correspondence can provide direct language that site teams cannot infer from design review alone.
- **Type:** Qualitative research.
- **Primary metric and threshold:** A documented, approved set of anonymized themes; no numerical threshold is set.
- **Guardrail metric:** No personally identifying information, sensitive correspondence or unapproved testimonials is retained in the research artifact.
- **Decision rule:** If recurring themes are documented with approval, use them to complete the O/CO table and design a future hypothesis. If not, do not write objection-led copy.
- **Result and verdict:** Awaiting decision and evidence.

### EXP-003 — Validate the Phase 2 source-level UX findings

- **Hypothesis:** We believe that browser-based task checks can confirm, reduce or retire the qualitative Phase 2 findings, because source inspection cannot establish touch discovery, visual hierarchy, focus behaviour, screen-reader announcement or mobile keyboard behaviour.
- **Type:** Usability and accessibility-adjacent validation; not an A/B test.
- **Primary metric and threshold:** A documented pass, fail or needs-revision result for the five tasks in `docs/DESIGN.md`; no quantitative threshold is set and no task result should be generalized to all visitors.
- **Guardrail metric:** Zero unapproved public-site changes, tracking additions, personal-data capture or factual-status wording changes while validation is prepared or run.
- **Decision rule:** If validation confirms a finding, define one approved implementation proposal and its post-change verification. If it does not, update or retire the finding; do not preserve it as assumed visitor friction.
- **Result and verdict:** Awaiting a browser-capable environment. No public-site source change is approved.

## Experiment backlog

| Idea | ICE (impact/confidence/ease) | Status |
|---|---|---|
| Establish an approved aggregate route-to-handoff baseline. | Not scored: no implementation decision or baseline. | Awaiting decision |
| Review consent-based office-enquiry themes. | Not scored: no source material. | Awaiting decision |
| Validate the five Phase 2 source-level task findings. | Not scored: qualitative source review needs browser checks before implementation. | Awaiting browser-capable environment (EXP-003) |
| Resolve active-route orientation, reply-channel semantics, hero hierarchy or search discoverability. | Not scored: each is a qualitative candidate in `DESIGN.md`, not a measured conversion hypothesis. | Awaiting validation and user implementation approval |
| Test a contextual primary-action change. | Not scored: requires EXP-001 and EXP-002 evidence after an approved, validated design proposal. | Blocked by evidence |
| Test a visual-polish change. | Not scored: requires a defined change, browser validation and a metric. | Deferred to Phase 3 and evidence work |

## Pre-commitment for future tests

Before an A/B, before-and-after or rollout decision is recorded here, document:

1. The specific change and the visitor segment it serves.
2. The research evidence behind the hypothesis.
3. The primary metric, guardrail metric, baseline, minimum detectable effect, sample-size method and duration.
4. The decision rule before any results are observed.
5. The factual-status review needed to ensure that the change does not imply registration, accreditation, a programme, fee, intake, campus, leadership, partnership or endorsement.
