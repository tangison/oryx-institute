# Corner Spa × Mendozer — integration instructions

Status of this document: written when the page shipped (November 2026).
It covers what is already built on oryxinstitute.org, what Mendozer's
side must allow for the embed to work, and exactly what changes when
the final details arrive.

## 1. What is live on oryxinstitute.org

| Piece | Where | Notes |
|---|---|---|
| The Corner Spa page | `/corner-spa` (English), `/zh/corner-spa` (Chinese) | Static page, in the sitemap, on the markdown shelf (`/md/corner-spa`), in the search index, in the footer navigation, and linked from `/ventures`. |
| The embedded counter | `https://spa.mendozer.com` inside an `<iframe>` on `/corner-spa` | Loads lazily, `referrerPolicy: strict-origin-when-cross-origin`. A visible line under the frame always gives the spa's own address, spa.mendozer.com, as the fallback. |
| Content-Security-Policy | `vercel.json` | `frame-src 'self' https://spa.mendozer.com;` was added so the browser allows the embed. If the counter URL changes, this directive must change with it. |
| Copy and data | page content + `src/lib/site.ts` (`ventures.cornerSpa`) | Status reads "In development · with Mendozer". No opening date, prices or service list are printed anywhere, per the institute's rule: the opening is dated in the register the day it happens. |

## 2. What Mendozer's side must allow (the one thing that can break it)

The embed only works if `spa.mendozer.com` does not refuse to be
framed. When the platform goes live, check the response headers of
`https://spa.mendozer.com`:

- `X-Frame-Options` must **not** be `DENY` or `SAMEORIGIN`. Either omit
  the header or, if the framework insists on setting one, use
  `ALLOW-FROM`, which is deprecated — the correct modern control is CSP.
- `Content-Security-Policy` must either omit `frame-ancestors` or carry
  `frame-ancestors 'self' https://www.oryxinstitute.org;` (and
  `https://oryxinstitute.org` if the apex domain is ever served).

If either header blocks framing, the frame area on /corner-spa stays
empty in the visitor's browser (the visible fallback line with the
spa.mendozer.com link is exactly for that case, and no booking is
lost — but the embed is the point).

Also worth confirming on Mendozer's side when the counter is real:

1. **Deep links.** If the counter has routes (e.g. a booking step), tell
   Oryx the exact entry URL — the iframe `src` is one line to change in
   `src/app/[lang]/(site)/corner-spa/page.tsx` (`SPA_COUNTER`), plus the
   same URL in `vercel.json`'s `frame-src` if the host changes.
2. **Cookies / sessions inside the frame.** If the counter sets login
   or cart cookies, they must be `Secure; SameSite=None;` to work
   inside a cross-site iframe, or the counter must work without them.
3. **Mobile height.** The frame is `clamp(24rem, 72vh, 46rem)` tall and
   scrolls internally. If the counter needs more, the height is one CSS
   rule (`.spa-frame` in `src/app/globals.css`).
4. **Ping-back.** Optional but recommended: a test page or `/health`
   path on spa.mendozer.com so both sides can verify the embed after
   every deploy of either site.

## 3. What changes when the client sends the final details

The brief: the venture starts in collaboration with Mendozer.com, the
spa's online home is spa.mendozer.com, and oryxinstitute.org/corner-spa
frames it here. Details are to follow. When they land:

1. Swap `SPA_COUNTER` in `src/app/[lang]/(site)/corner-spa/page.tsx` if
   the embed URL differs from the bare domain (e.g. `/booking`,
   `?embed=oryx`, a locale path).
2. Update `frame-src` in `vercel.json` to match, deploy.
3. If a real opening date exists, add it to the register (`/register`)
   and update the status line from "In development · with Mendozer"
   (`src/lib/site.ts` and `src/lib/site-zh.ts`) — the register rule is
   that the date enters the register the day it happens, never before.
4. If service-menu facts arrive (treatments, hours, prices), they belong
   on Mendozer's counter, not duplicated here; this page only carries
   the collaboration, the classroom and the embed.
5. Re-run the site audit (`npm run build`, then the SquirrelScan pass)
   and check `/corner-spa` and `/zh/corner-spa` answer 200 with the
   frame present.

## 4. Verification checklist (both sides)

- [ ] `curl -sI https://spa.mendozer.com | grep -i -E "x-frame-options|content-security-policy"` — no frame-blocking header, or `frame-ancestors` naming oryxinstitute.org.
- [ ] `curl -sI https://www.oryxinstitute.org/corner-spa | grep -i content-security-policy` — contains `frame-src ... spa.mendozer.com`.
- [ ] The frame renders in Chrome, Firefox and Safari (Safari is the
      strictest about third-party frames).
- [ ] The fallback line under the frame still reads correctly when the
      counter is offline (devtools: block spa.mendozer.com and reload).
- [ ] `/md/corner-spa`, the sitemap entry and the search index all name
      the page (they are generated at build; no manual step, but check
      after the details land).
