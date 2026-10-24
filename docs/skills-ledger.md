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

---

## Round 8 — coming-soon pivot: the website-auditing library (48 installed)

User command executed: `npx skills add https://github.com/vercel-labs/skills --skill find-skills`
(installed via the CLI's non-interactive flags; the TUI lingers after "Done!" and needs stdin dismissed).

Discovery ran through find-skills' documented flow: skills.sh API search sweep
(53 query terms → 4,430 unique registry skills), curated down to website-auditing
relevance, installed with `npx skills add <repo> --skill <name> -a claude-code -y -g`.

**Installed (48), all verified on disk under ~/.claude/skills/:**

| Domain | Skills |
|---|---|
| Audit engines | audit-website, squirrelscan, web-quality-audit, minimal-run-and-audit, ponytail-audit, production-grade |
| Performance | performance, core-web-vitals, web-perf, vercel-optimize, gsap-performance, shipping-and-launch |
| Accessibility | accessibility, best-practices |
| SEO | seo, seo-audit, ai-seo, programmatic-seo, schema, site-architecture |
| Analytics/CRO | analytics, conversion-tracking, cro, landing-page-conversion-audit, ab-testing |
| Review craft | code-review, requesting-code-review, receiving-code-review, triage, diagnosing-bugs, 21st-ui-review, ui-ux-pro-max |
| Browser/testing | agent-browser, browser-use, playwright-cli, playwright-best-practices, webapp-testing, browser-testing-with-devtools* |
| Security | firebase-security-rules-auditor, security-and-hardening* |
| Content/marketing | copy-editing, competitor-profiling, frontend-design, brand-guidelines, theme-factory, web-design-guidelines |
| Crawling | firecrawl-crawl, firecrawl-scrape |
| Meta | find-skills, vercel-react-best-practices |

\* installed earlier within the addyosmani/agent-skills batch.

**Rejected/failed:** ui-taste (uizze.sh — install fails from both repo forms and short name);
composition-patterns, schema-markup, analytics-tracking, react-best-practices (wrong-name/
transient misses; correct names installed where they existed).

**Audit engines run on the site this round:** SquirrelScan CLI (85/100 full site · 54/100
coming-soon), Lighthouse 13.5 (both targets), axe-core (10 full-site pages + live page),
header/meta verification via curl. Raw outputs: /home/z/oryx-audit/ (squirrel-*.txt, lh/*.json, axe-fullsite.json).
