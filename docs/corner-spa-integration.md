# Corner Spa × Mendozer — integration instructions

Status of this document: updated 5 November 2026, when the embed moved
to full bleed, the telephone line shipped and the blog note published.
It covers what is built on oryxinstitute.org, what Mendozer's side
must allow for the embed to work, and how to change things safely.

## 1. What is live on oryxinstitute.org

| Piece | Where | Notes |
|---|---|---|
| The full-screen embed | `/corner-spa` (English), `/af/corner-spa` (Afrikaans) | spa.mendozer.com fills the whole viewport: fixed, inset 0, no site header or footer, so the visit reads as one continuous site. A loading screen holds at least 1.4 seconds (Oryx lockup, running oryx, respects reduced motion), fades when the frame fires load, and a plain fallback link takes over after ten seconds. The page touches no history: one press of Back returns to the previous Oryx page. |
| The collaboration page | `/ventures/corner-spa` + `/af/ventures/corner-spa` | The content page: the roles (operations lead Oryx Institute, financing partner Mendozer Investments), the classroom, and the counter framed in-page. Linked from the embed's sibling routes and the ventures page. |
| Entry redirects | next.config.ts | 308s: `/spa`, `/cornerspa`, `/corner-spa/` and the `/af/` mirrors all land on the full-screen embed. |
| The telephone line | src/lib/site.ts | The institute's own line, 083 676 4338 (+264 83 676 4338): footer, contact page (primary route, with call and WhatsApp buttons), menu, FAQ, JSON-LD telephone and contactPoint, llms.txt, AGENTS.md, the markdown shelf and the search index. The spa keeps its own number, +264 81 623 4788; the two never cross. |
| The blog note | `/blog/corner-spa` + `/af/blog/corner-spa` | The approved copy: what the spa offers, the full price list in Namibian dollars, how booking runs on WhatsApp, one website two addresses. Article JSON-LD, in the sitemap, on the markdown shelf, in the search index. |
| Content-Security-Policy | vercel.json | `frame-src 'self' https://spa.mendozer.com;` allows the embed. If the counter URL changes, this directive changes with it. |
| Media | public/corner-spa/ | The spa's photographs carried from spa.mendozer.com at original dimensions (WebP), so no Oryx page depends on another host. The OG plate for the embed stays /brand/og/corner-spa.png. |

## 2. What Mendozer's side must allow (the one thing that can break it)

The embed only works if spa.mendozer.com does not refuse to be framed.
Verified live on 5 November 2026:

- `X-Frame-Options`: not set. Correct.
- `Content-Security-Policy: frame-ancestors 'self' https://oryxinstitute.org https://www.oryxinstitute.org`. Exactly right, and the apex form is covered too.

If either header ever changes to block framing, the full-screen embed
shows its fallback: the spa's own address as a plain link, plus the
blog note. No booking is lost, but the embed is the point.

Also worth confirming on Mendozer's side:

1. **Deep links.** If the counter grows routes (a booking step), tell
   Oryx the exact entry URL: the iframe `src` is one constant
   (`SPA_URL`) in `src/components/site/corner-spa-embed.tsx`, plus the
   same host in vercel.json's `frame-src`.
2. **Cookies / sessions inside the frame.** Any login or cart cookies
   must be `Secure; SameSite=None;` to work inside a cross-site
   iframe.
3. **Ping-back.** Optional but recommended: a `/health` path on
   spa.mendozer.com so both sides can verify the embed after every
   deploy of either site.

## 3. Verification checklist (both sides)

- [x] `curl -sI https://spa.mendozer.com` sends CSP frame-ancestors naming oryxinstitute.org and www, and no X-Frame-Options (verified live 5 Nov 2026).
- [x] `curl -sI https://www.oryxinstitute.org/corner-spa` carries `frame-src ... spa.mendozer.com`.
- [x] The embed answers 200 on both locales, in the sitemap, on the markdown shelf and in the search index.
- [ ] The frame renders in Chrome, Firefox and Safari on the live domain (Safari is the strictest about third-party frames; verified headless Chromium so far).
- [x] The fallback path: block spa.mendozer.com in devtools and reload; the plain link appears.
- [x] The redirects: /spa, /cornerspa, /corner-spa/ and the /af mirrors answer 308 to the embed.
