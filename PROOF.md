# PROOF.md - Oryx Institute

Evidence ledger for the Oryx Institute website project. Every material action is recorded with method, result, and reproducible evidence. Secrets are redacted.

Format: `Phase | Action | Target | Method | Result | Evidence | Timestamp | Status`

---

## Phase 0 - Harness and tool bootstrap

| Phase | Action | Target | Method | Result | Evidence | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| 0 | Inventory workspace | /home/z/my-project | `LS` + `Bash ls -la` | Project is greenfield. Only `.git`, `.env`, `.gitignore`, `download/`, `upload/`, `skills/` exist. No package.json, no Next.js project, no source code. | `/home/z/my-project/` listing | 2026-07-22 21:47 | PASS |
| 0 | Inspect git state | /home/z/my-project/.git | `git log --oneline -5` + `git status -s` | 2 commits. Latest `2057fc9 731b004b-66f7-4fac-b70c-cc206e0e3939`. No remote configured. Working tree clean. | git log output | 2026-07-22 21:47 | PASS |
| 0 | Verify toolchain versions | Node, npm, bun, git, python, Playwright | `node --version`, etc. | Node v24.18.0, npm 11.16.0, bun 1.3.14, git 2.47.3, python 3.12.13, Playwright 1.61.1. | Bash output | 2026-07-22 21:47 | PASS |
| 0 | Identify missing tools | pnpm, yarn, gh, vercel, axe, pa11y, lighthouse, gitleaks, squirrelscan | `which <tool>` for each | All nine missing. | Bash output | 2026-07-22 21:47 | PASS |
| 0 | Inspect .env keys (names only) | /home/z/my-project/.env | `sed 's/=.*/=<redacted>/'` | Single key only: `DATABASE_URL`. No GitHub, Vercel, Resend, analytics, or third-party secrets present. | Redacted env listing | 2026-07-22 21:47 | PASS |
| 0 | Verify Webman skill presence | /home/z/my-project/skills/tangison-web-* | Directory listing | All 8 Webman skills present: tangison-web-loop, tangison-web-plan, tangison-web-content, tangison-web-create, tangison-web-audit, tangison-web-deploy, tangison-documents, tangison-magazine. | skills/ directory listing | 2026-07-22 21:47 | PASS |
| 0 | Verify external skill absence | /home/z/my-project/skills/{superpowers,ponytail,impeccable,design-taste-frontend,taste-skill} | Directory listing | All 5 external skills MISSING from local skills directory. Need installation approval. | skills/ directory listing | 2026-07-22 21:47 | PASS |
| 0 | Verify Hallmark skill presence | /home/z/my-project/skills/hallmark | Directory listing | Present (67 KB SKILL.md + references). Will NOT invoke until user explicitly authorises primary repository and install name. | skills/hallmark listing | 2026-07-22 21:47 | PASS |
| 0 | Verify remote repository reachability | github.com/{tangison/webman,obra/superpowers,dietrichgebert/ponytail,pbakaus/impeccable,Leonxlnx/taste-skill} | `git ls-remote HEAD` for each | All 5 repositories reachable. HEAD SHAs recorded: webman=9fa5d59, superpowers=d884ae0, ponytail=16f2980, impeccable=9b7f7ff, taste-skill=98565e6. | git ls-remote output | 2026-07-22 21:47 | PASS |
| 0 | Confirm Hallmark primary source | tangison-web-loop/references/skill-stack.md | `Read` file | Webman skill-stack.md records Hallmark primary source as `https://github.com/Nutlope/hallmark`, install `npx skills add nutlope/hallmark`. Verification complete. User authorisation still PENDING. | skill-stack.md line 68-72 | 2026-07-22 22:00 | PASS - source verified, installation pending user authorisation |
| 0 | Confirm Taste Skill install name | tangison-web-loop/references/skill-stack.md | `Read` file | Webman skill-stack.md records install name as `design-taste-frontend` (not `full-output-enforcement`). The Skills marketplace page user pasted showed the wrong skill on the same repo. Will verify against actual repo contents before installing. | skill-stack.md line 60-67 | 2026-07-22 22:00 | PASS - install name verified, installation pending user authorisation |

## Phase 0 - Tool installation (approved by user 2026-07-22)

User approved installation of all external skills, all CLI tools, Hallmark, and Squirrelscan. Nothing omitted.

| Phase | Action | Target | Method | Result | Evidence | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| 0 | Clone superpowers skill | /home/z/my-project/skills/superpowers | `git clone --depth 1 https://github.com/obra/superpowers.git` | Cloned. AGENTS.md, CLAUDE.md, docs/, assets/ present. | skills/superpowers/ listing | 2026-07-22 22:50 | PASS |
| 0 | Clone ponytail skill | /home/z/my-project/skills/ponytail | `git clone --depth 1 https://github.com/dietrichgebert/ponytail.git` | Cloned. AGENTS.md, README.md, commands/, benchmarks/ present. | skills/ponytail/ listing | 2026-07-22 22:50 | PASS |
| 0 | Clone impeccable skill | /home/z/my-project/skills/impeccable | `git clone --depth 1 https://github.com/pbakaus/impeccable.git` | Cloned. AGENTS.md, CLAUDE.md, DESIGN.md, PRODUCT.md, README.md present. | skills/impeccable/ listing | 2026-07-22 22:50 | PASS |
| 0 | Clone taste-skill repo | /home/z/my-project/skills/taste-skill | `git clone --depth 1 https://github.com/Leonxlnx/taste-skill.git` | Cloned. Contains 14 skills including `taste-skill` (frontmatter name: `design-taste-frontend`) and `output-skill` (frontmatter name: `full-output-enforcement`). Verified `design-taste-frontend` exists per Webman skill-stack.md. | skills/taste-skill/skills/taste-skill/SKILL.md frontmatter | 2026-07-22 22:50 | PASS |
| 0 | Clone squirrelscan skills | /home/z/my-project/skills/squirrelscan-skills | `git clone --depth 1 https://github.com/squirrelscan/skills.git` | Cloned. `audit-website` skill present at skills/squirrelscan-skills/skills/audit-website/. | skills/squirrelscan-skills/ listing | 2026-07-22 22:50 | PASS |
| 0 | Verify Hallmark skill source | /home/z/my-project/skills/hallmark | Read SKILL.md frontmatter and body | SKILL.md frontmatter: `name: hallmark`, body states "Powered by Together AI". Matches Webman skill-stack.md verified source `https://github.com/Nutlope/hallmark`. Skill was already present locally (written 2026-07-22 21:42). | skills/hallmark/SKILL.md | 2026-07-22 22:51 | PASS - source verified, user authorised |
| 0 | Install pnpm globally | pnpm | `npm install -g pnpm` | Installed. Version: 11.16.0. | `pnpm --version` | 2026-07-22 22:50 | PASS |
| 0 | Install vercel CLI globally | vercel | `npm install -g vercel` | Installed. Version: Vercel CLI 56.5.0. | `vercel --version` | 2026-07-22 22:50 | PASS |
| 0 | Install gh CLI globally | gh | Downloaded official release v2.67.0 from github.com/cli/cli, installed to /usr/local/bin/gh | Installed. Version: gh 2.67.0 (2025-02-11). | `gh --version` | 2026-07-22 22:51 | PASS |
| 0 | Install gitleaks globally | gitleaks | Downloaded official release v8.21.2 from github.com/gitleaks/gitleaks, installed to /usr/local/bin/gitleaks | Installed. Version: 8.21.2. | `gitleaks version` | 2026-07-22 22:51 | PASS |
| 0 | Install axe-core CLI globally | axe | `npm install -g @axe-core/cli` (axe-core is a library; the CLI wrapper is @axe-core/cli) | Installed. Version: 4.12.1. | `axe --version` | 2026-07-22 22:52 | PASS |
| 0 | Install pa11y globally | pa11y | `npm install -g pa11y` | Installed. Version: 9.1.1. | `pa11y --version` | 2026-07-22 22:50 | PASS |
| 0 | Install lighthouse globally | lighthouse | `npm install -g lighthouse` | Installed. Version: 13.4.1. | `lighthouse --version` | 2026-07-22 22:50 | PASS |
| 0 | Verify playwright already installed | playwright | `npx playwright --version` | Already installed via Python venv. Version: 1.61.1. | `npx playwright --version` | 2026-07-22 22:52 | PASS |
| 0 | Gitleaks real scan test | /home/z/my-project git history | `gitleaks detect --source /home/z/my-project --no-banner --verbose` | 3 commits scanned. No leaks found. Exit 0. | gitleaks scan output | 2026-07-22 22:52 | PASS |
| 0 | Verify all external skills present | 6 skills | Directory listing check | All 6 verified: superpowers, ponytail, impeccable, taste-skill, squirrelscan-skills, hallmark. Each has SKILL.md or equivalent entry point. | Bash verification output | 2026-07-22 22:52 | PASS |

## Phase 1 - Plan (in progress)

| Phase | Action | Target | Method | Result | Evidence | Timestamp | Status |
|---|---|---|---|---|---|---|---|
| 1 | Inspect supplied primary logo | /home/z/my-project/upload/file_000000003d9471f4b2b8767331585476-removebg-preview.png | `scripts/inspect_assets.py` (PIL + scikit-learn KMeans) | PNG, RGBA, 612x408 px (3:2 landscape), 66.8 KB, 89.5% transparent, 10.5% opaque. Two-colour ink: maroon `#72111F` + black `#060606`. | scripts/inspect_assets.py output | 2026-07-22 21:50 | PASS |
| 1 | Inspect supplied shield icon | /home/z/my-project/upload/oryx_symbol.png | `scripts/inspect_assets.py` | PNG, RGBA, 412x545 px (3:4 portrait), 115.9 KB, 34.1% transparent, 65.9% opaque. Single-colour ink: maroon `#721220`. | scripts/inspect_assets.py output | 2026-07-22 21:50 | PASS |
| 1 | Establish canonical Oryx Maroon | Both supplied assets | Cluster-mean comparison | Both files converge on maroon RGB 114,18,32. Canonical Oryx Maroon = `#721220`. | inspect_assets.py dominant cluster | 2026-07-22 21:50 | PASS |
| 1 | Inspect supplied visual reference A | /home/z/my-project/upload/file_00000000a2c481fda3f9ff586c4a2fdc.png | `scripts/inspect_references.py` | PNG, RGB, 1536x1024 (3:2 landscape), 2123.6 KB. Mid brightness (129.2), warm (+42.2). Palette: cream `#D3C2B1`, deep maroon `#4A231B`, deep maroon `#664632`, cream `#EADCCD`, sand `#BFA68F`, rust `#82664E`, sand `#A2876E`, black `#1F0E08`. Confirms warm earthy Namibian palette. | scripts/inspect_references.py output | 2026-07-22 22:01 | PASS |
| 1 | Inspect supplied visual reference B | /home/z/my-project/upload/file_00000000210871f492b750e9ec3b6bf0.png | `scripts/inspect_references.py` | PNG, RGB, 1536x1024 (3:2 landscape), 1455.5 KB. Light brightness (199.3), mildly warm (+18.5). Palette: white `#FCFBF9` (66.1%), maroon `#730E1B` (14.3%), cream `#E2DAD8`, sand `#C6B9B6`, maroon `#825655`, black, neutral, black. Maroon `#730E1B` is essentially identical to verified brand maroon `#721220` (delta-E < 1.5). Confirms minimal white-dominant composition with maroon accent. | scripts/inspect_references.py output | 2026-07-22 22:01 | PASS |
| 1 | Compute WCAG 2.2 contrast ratios | All brand colour pairings | `scripts/contrast_audit.py` (WCAG luminance formula) | 20 pairings tested. 18 pass (most at AAA). 2 FAIL: black-on-maroon (1.67:1), black-on-earth (3.64:1). Both prohibited in BRAND.md. | scripts/contrast_audit.py output | 2026-07-22 22:03 | PASS |
| 1 | Load Webman orchestrator | tangison-web-loop | `Skill` tool | Skill instructions loaded. Phase 0-8 workflow confirmed. Conflict order established. Proof contract accepted. | Skill output in conversation | 2026-07-22 22:05 | PASS |
| 1 | Load Webman Plan skill | tangison-web-plan | `Skill` tool | Skill instructions loaded. Required outputs: PRODUCT.md, BRAND.md, BUILD_PLAN.md. Read-only mandate accepted. | Skill output in conversation | 2026-07-22 22:06 | PASS |
| 1 | Read Webman reference files | operating-foundation.md, harness-setup.md, skill-stack.md | `Read` tool | All three reference files read completely. Conflict order, install verification rules, and design skill ownership rules confirmed. | File contents in conversation | 2026-07-22 22:07 | PASS |

## Phase 2 - Content

Not started. Pending Phase 1 approval.

## Phase 3 - Create

Not started. Pending Phase 1 approval and Phase 2 content.

## Phase 4 - Audit and fix

Not started. Pending Phase 3 build.

## Phase 5 - Demo deployment

Not started. User instruction: "Do not deploy until instructed."

## Phase 6 - Approval and full build

Not started.

## Phase 7 - Production deployment

Not started. User instruction: "Do not deploy until instructed."

## Phase 8 - Live audit

Not started.

---

## Pending approvals (blocking Phase 3 onward)

1. Approval of `PRODUCT.md`, `BRAND.md`, `BUILD_PLAN.md` (Phase 1 gate).
2. Approval to install external skills: `obra/superpowers`, `dietrichgebert/ponytail`, `pbakaus/impeccable`, `Leonxlnx/taste-skill` (install name `design-taste-frontend`).
3. Approval to install global CLI tools: `pnpm`, `gh`, `vercel`, `gitleaks`.
4. Approval to install project-local devDependencies: `axe-core`, `pa11y`, `lighthouse`.
5. Decision on Hallmark: install `nutlope/hallmark` (verified primary source) or leave unused.
6. Decision on Squirrelscan: install `squirrelscan/skills --skill audit-website` or omit.
7. GitHub repository owner, repo name, visibility (public/private).
8. Vercel team name, project name, demo subdomain.
9. Production domain and DNS provider.
10. Email service for form submissions (Resend, Postmark, or local file persistence marked as mock).
11. Analytics provider (Vercel Analytics, Plausible, Fathom, or none).
12. Approved copy for `/founder` page beyond name and minimal bio statement.
13. Authorised facts: campus address (or omit), accreditation status (or "subject to approval"), programme fees (or "to be confirmed"), intake date (or omit), partner organisations (or omit).
