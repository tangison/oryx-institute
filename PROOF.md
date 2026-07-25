# PROOF.md — Oryx Institute Build Evidence Log

## Phase: Domain Migration + Motion + UI

| Phase | Action | Target | Command or method | Result | Evidence path | Timestamp | Status |
|-------|--------|--------|-------------------|--------|---------------|-----------|--------|
| Domain | Replace .na/.vercel.app → .org | 24 source files | Python script + manual edits | All canonical, OG, CSP, sitemap, robots updated | src/app/layout.tsx, src/middleware.ts | 2026-07-25 | Done |
| Motion | Create scroll reveal system | src/lib/motion.ts | New file with useScrollReveal, useStaggerReveal | CSS+IntersectionObserver, no external deps for simple reveal | src/lib/motion.ts | 2026-07-25 | Done |
| Motion | Homepage animated sections | src/components/site/animated-home.tsx | Client component wrapping 4 sections | Scroll reveal + stagger grid animation | scripts/mobile-footer-nav.png | 2026-07-25 | Done |
| Motion | Install Anime.js v3 + GSAP | package.json | npm install animejs@3 gsap @gsap/react | v3.2.2 + v3.15.0 installed | package.json | 2026-07-25 | Done |
| UI | Collins-style nav icon | src/components/site/header.tsx | Edit SVG + remove border class | Clean 3-line hamburger, no box | scripts/mobile-footer-nav.png | 2026-07-25 | Done |
| UI | Ultra-minimal mobile footer | src/components/site/footer.tsx | Rewrite with md:hidden/mobile split | Logo + tagline + email + legal only on mobile | scripts/mobile-footer-nav.png | 2026-07-25 | Done |
| UI | Remove duplicate CTA | src/components/site/footer.tsx | Remove maroon CTA strip | Homepage section is sole CTA source | Deployed site | 2026-07-25 | Done |
| Build | Production build | Next.js Turbopack | npx next build | SUCCESS (after fixing useCallback at module scope) | Build output | 2026-07-25 | Done |
| Deploy | Push + Vercel auto-deploy | GitHub main branch | git push origin main | Commit 45caa28 deployed | https://oryx-institute.vercel.app | 2026-07-25 | Done |
| Verify | Canonical domain check | Deployed site | curl + rg | oryxinstitute.org in all canonical URLs | curl output | 2026-07-25 | Done |
| Verify | Security headers | Deployed site | curl -sI | CSP, HSTS, X-Frame-Options all present | curl output | 2026-07-25 | Done |
| Verify | Mobile + desktop renders | Browser agent | agent-browser screenshots | Screenshots at 390px and 1366px | scripts/*.png | 2026-07-25 | Done |
