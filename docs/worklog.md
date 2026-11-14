# Oryx Institute — repo worklog

---

## 2026-10-26 — Image Asset Manifest v4 applied

**Scope:** the founder's Image Asset Manifest (v4), applied end to end.

**Asset tree (now exactly the manifest):**

- `public/images/core/` — 01-hero-oryx (16:9), 02-stone (4:5), 03-wood-rope-divider
  (3:4), 04-notebook (3:4), 05-hands-peak (3:4), 06-game-board (1:1, replaced —
  see below), 07-windhoek-divider (16:9), 08-spa-dish (1:1, square-cropped),
  09-horns (4:5), 10-wax-seal (1:1).
- `public/images/print/` — 01-certificate, 02-letterhead, 03-business-card,
  04-notecard, 05-folder (all 3:4 portrait, Kinfolk register, walnut/cream
  grounds). Generated this round; letterhead wordmark composited
  programmatically ("ORYX INSTITUTE", Liberation Serif, maroon #71111F).

**Two core plates were not spec-true and were corrected, with evidence:**

- `06-game-board`: the previous file (k04-red-game, 1448x1086) had the board
  sliced off the right and top edges — it violated the manifest's own
  "nothing is sliced" rule and could not be cropped into a specimen plate.
  Regenerated to the written spec: square, board dead-centre on terracotta,
  traditional three-concentric-squares pattern, one springbok coin in the
  centre hollow, no lettering (three generation passes; the first two printed
  transcribed prompt words onto the wood). Old file retrievable from git
  history.
- `08-spa-dish`: was 3:4 portrait against the manifest's "square 1:1".
  Subject measured (bbox x51..809 y247..915 incl. shadow), square window
  centred on the subject, crop verified whole with margins on all four sides.

**Reference map in the shipped HTML (verified against the manifest):**

- 01 hero → home only. 02 stone → home act 2, /about, /brand wall.
- 03 wood-rope → home first silent divider, /research mid-page breath (added).
- 04 notebook → home research zigzag, /research hero.
- 05 hands → home pinned peak, /practice pinned hero.
- 06 game board → /research context divider, /brand wall, /resources Bulletin
  divider (added). Removed from /ventures, where the manifest never placed it.
- 07 windhoek → home second silent divider, /contact divider.
- 08 spa dish → home ventures reverse-zigzag, /ventures hero.
- 09 horns → /about, /brand wall, /faq plate.
- 10 wax seal → home close pin, /apply plate.
- print 01–05 → /brand print-kit gallery (one use each).

**Removed, per "Do NOT use any other images":**

- The 11 `studio/` plates (about, research, programmes, schools, tools) —
  each removal site carries a `{/* TODO image */}` comment describing the
  shot the founder would commission if the page wants its breath back.
- The 5 old `images/brand/kit-*.jpg` photographs (superseded by print/).
- The retired `kinfolk/` directory. All recoverable from git history.
- Dead CSS followed: `.register-grid`, `.register-plate`, `.plate-media`.

**Other changes that fell out of the manifest:**

- /register is now text-only (the register is a ledger, not a plate) — the
  stone plate and its grid CSS removed.
- /brand kit gallery copy no longer claims "photographed as supplied"; the
  pieces are now photographed in the house register (both languages).
- /brand specimen wall is the manifest's three plates: stone, game, horns
  (the seal and notebook plates left the wall — they live on /apply and
  /research).

**QA evidence (local production build, Next start on :3311):**

- 19 routes 200 (en + af sampling incl. /legal/*).
- Reference map above confirmed by grepping the built HTML — every core
  plate appears exactly in its manifest slots.
- Zero references to kinfolk/, studio/, cutout_, landscape_, register-hd,
  images/brand/kit in all shipped pages.
- Playwright, 14 pages: 0 broken images, 0 console/page errors, 0 px mobile
  overflow (390px), no TODO text leaking into the DOM.
- Full-page reduced-motion renders VLM-reviewed: research and resources
  rhythm confirmed continuous with both dividers sitting correctly;
  programmes/schools/tools read composed in type alone; brand gallery grid
  tidy (3-over-2) and specimen wall sequence correct.


---

## 2026-11-05 · Telephone line, full-bleed Corner Spa embed, blog note

- Telephone: the institute's line (083 676 4338, +264 83 676 4338) is
  defined once in site.ts and now reads everywhere: footer call and
  WhatsApp line, contact page as the primary route with call and
  WhatsApp buttons (the mailbox stays secondary), one quiet link in the
  menu, the FAQ answer, Organization JSON-LD telephone plus a customer
  service contactPoint, llms.txt, AGENTS.md, the markdown shelf and the
  search index, in both languages. NBSP between groups; the number
  never splits across lines.
- Corner Spa embed: /corner-spa and /af/corner-spa are now the
  full-bleed frame (bare [lang] route, no chrome, Oryx ink loader with
  the running oryx, 1.4 s minimum beat, ten-second fallback link, no
  history writes). The former content page moved to
  /ventures/corner-spa (+ af) with its status copy brought to the live
  facts. 308 redirects: /spa, /cornerspa, /corner-spa/ and the /af
  mirrors. Mendozer's live headers verified: frame-ancestors names both
  Oryx hosts, no X-Frame-Options.
- Blog: /blog and /blog/corner-spa (+ af) carry the approved copy as
  written, with the spa's photographs served from public/corner-spa/ at
  original dimensions, Article JSON-LD, and the price table rendered
  from the note itself. Wired into the footer nav, the ventures page,
  the home ventures block, the sitemap, the search index, llms.txt and
  the markdown shelf.
- Fixed on the way: md-shelf.ts blockToMd had a syntax error in the
  committed HEAD (return ead, ...); the repo could not build until it
  was repaired.
- Em dashes swept from every file this change set touches; Afrikaans
  double-dash punctuation in af copy is kept as written.
