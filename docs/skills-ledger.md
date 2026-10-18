# Skills ledger — this round

Task: scroll-craft on every page, copywriting support, all master images placed
once, consulting/market-research content pivot, AI programme announcement,
SquirrelScan P1/P2 remediation.

## Capabilities and coverage

| Capability | Skill chosen | Source | Evidence | Runner-up |
|---|---|---|---|---|
| Scroll animation | gsap-scrolltrigger | greensock/gsap-skills (registry find, 66.9K installs) | SKILL.md fetched raw, vetted (MIT, no remote scripts), installed to ~/.claude/skills | rheinmir/css-scroll-driven-native (75 installs, unproven) |
| Copywriting | copywriting | coreyhaines31/marketingskills (227.4K installs) | SKILL.md fetched raw, vetted, installed | coreyhaines31/copy-editing (editing only) |
| Brand copy bar | tangison-copywriting | local Tangison pack (extracted, pre-approved) | installed from pack; Tangison rules win on voice | — |
| Design QA | web-design-guidelines | vercel-labs/agent-skills (official) | SKILL.md fetched raw, vetted, installed | pbakaus/impeccable@overdrive (same repo whose audit skill failed install twice previously) |
| Output rules | tangison-full-output-enforcement, tangison-webmaster-checklist, tangison-super-skills | local Tangison pack | installed | — |

## Failures (reported, per rules)

- `npx skills add` registry install timed out at 180 s (second registry hang in
  this environment; first was pbakaus/impeccable in the prior round). Fallback:
  raw.githubusercontent.com SKILL.md fetch + manual install. All three fetched
  files verified by content read before install. No unvetted installs.

## Gaps

- None. Scroll craft, copy, QA and output rules all covered.
