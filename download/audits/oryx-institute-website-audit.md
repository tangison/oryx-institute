# Oryx Institute — Website Audit

> Audit date: 2026-07-25  
> Audited by: Super Z (UX & Content Audit — website-audit skill methodology)  
> Pages reviewed: 34  
> Site URL: https://oryx-institute.vercel.app  

---

## Executive Summary

Oryx Institute's website is an unusually honest and well-structured pre-launch institutional profile. The content voice is consistent, restrained, and credible — a rare achievement for a site that has no operating programmes yet. The biggest wins are the clarity of the "planned, not promised" positioning, the consistent brand voice across all 34 pages, and the thorough legal/compliance infrastructure (privacy, terms, accessibility statement, sitemap).

The biggest risks are technical: the canonical domain (oryxinstitute.na) does not resolve, creating a canonical mismatch that will confuse search engines once the noindex directive is lifted; OpenGraph URLs are hardcoded to the homepage instead of per-page paths; there is zero structured data (no JSON-LD); and several images on the homepage are rendered with empty alt attributes in addition to their descriptive ones, suggesting a rendering duplication issue that may affect CLS. There are also minor content issues: the Register Interest page lists "diploma programmes" in its blurb but none of the eight actual programmes are diplomas (all are certificates or short courses), and the hero heading uses period-separated words that may read oddly on mobile line breaks.

---

## Critical Issues (fix before launch)

### 1. 🔴 CRITICAL — Canonical domain does not resolve

**What**: All canonical URLs, og:url values, the robots.txt Host directive, and the sitemap.xml point to `https://oryxinstitute.na`, but this domain returns no response (DNS does not resolve). The live site is at `https://oryx-institute.vercel.app`.

**Why it matters**: Once the `noindex` directive is lifted for launch, search engines will see canonical tags pointing to a domain that doesn't exist. Google will either ignore the canonicals (leading to duplicate content between Vercel subdomain and future .na domain) or fail to index the site entirely. Social platforms sharing links with og:url pointing to oryxinstitute.na will also fail to resolve OpenGraph metadata.

**Fix**: Either configure DNS for oryxinstitute.na to point to the Vercel deployment (preferred), or temporarily change `metadataBase`, `alternates.canonical`, `og:url`, robots.txt Host, and sitemap.xml to use `oryx-institute.vercel.app` until the .na domain is ready.

---

### 2. 🔴 CRITICAL — OpenGraph URL hardcoded to homepage on every page

**What**: The layout.tsx `openGraph.url` is set to `"https://oryxinstitute.na"` as a global default. This means every page on the site — /about, /schools, /programmes, /founder, /contact, /register — reports its og:url as the homepage URL instead of its own.

**Why it matters**: When someone shares the About page on Facebook/LinkedIn, the OpenGraph crawler sees og:url = homepage URL, so it fetches the homepage's metadata instead. The shared link may show the homepage title, description, and image — not the about page. This breaks social sharing for every non-homepage URL.

**Fix**: Each page's metadata export should include its own `openGraph.url` pointing to the correct path (e.g. /about → `https://oryxinstitute.na/about`). The layout-level og:url should only apply to the homepage.

---

### 3. 🔴 CRITICAL — No structured data (JSON-LD)

**What**: The site has zero `<script type="application/ld+json">` blocks. There is no Organization, EducationalOrganization, WebSite, or WebPage schema.

**Why it matters**: For an educational institution, structured data is essential for search engine rich results. Google's Knowledge Panel, Bing's entity understanding, and AI agent readiness (the site has an llms.txt but no schema.org) all rely on JSON-LD. Without it, search engines cannot reliably identify this as an educational institution in Namibia.

**Fix**: Add at minimum:
- `Organization` / `EducationalOrganization` schema on every page (name, url, logo, address, foundingDate, sameAs)
- `WebSite` schema on homepage (name, url, potentialAction for search)
- `WebPage` schema on each sub-page (name, url, description, isPartOf)
- `Course` schema on each programme detail page (name, provider, courseCode, educationalLevel)

---

### 4. 🟡 IMPORTANT — Homepage images rendered with empty alt + duplicate descriptive alt

**What**: The homepage HTML shows each school card image rendered twice: once with `alt=""` and once with a descriptive alt text like `alt="Safety training tools and equipment."`. The hero video poster image also appears with `alt=""`. This suggests either a component rendering bug or a Next.js Image component duplication issue.

**Why it matters**: Empty alt attributes on content images violate WCAG 2.2 AA (screen readers will skip meaningful images). Duplicate image rendering also increases page weight and may contribute to CLS if both versions load sequentially.

**Fix**: Ensure each school card renders exactly ONE `<img>` with a descriptive alt text. The hero video poster should have `alt=""` only if it is truly decorative (the video is the content). Audit the EditorialHero and homepage school card rendering to eliminate duplicate `<img>` elements.

---

## Content & Copy Issues

### 5. ⚠️ — "diploma programmes" referenced but none exist

**Where**: Homepage Explore index, entry 03: "Certificate and diploma programmes, short courses, and three learning pathways."

**Issue**: None of the eight planned programmes are diplomas. They are all certificates (6) or short courses (1). The one "Subject to accreditation" programme at Future Schools is "To be confirmed" — not a diploma. Mentioning diplomas that don't exist contradicts the site's honesty-first principle.

**Fix**: Change to: "Certificate programmes, short courses, and three learning pathways." Remove the word "diploma" until a diploma programme is actually planned.

---

### 6. ⚠️ — Hero heading "Education.Skills. Impact." may break awkwardly on mobile

**Where**: Homepage H1 hero heading

**Issue**: The heading uses period-separated single words. On narrow mobile screens, line breaks may split these words unpredictably (e.g. "Education.\nSkills. Imp\nact."). The `<br/>` tags in the HTML force breaks between each word, but the "Impact." portion may still break mid-word on very small viewports.

**Fix**: Consider using `<span>` elements with `display: block` or `white-space: nowrap` on each word to prevent mid-word breaks. Alternatively, adjust the typography scale so the heading fits on one line per word at the smallest viewport (320px).

---

### 7. 🟡 IMPORTANT — Register Interest page blurb inconsistency

**Where**: `/register` page, step 02 description: "Choose your programme — pick from catalogue or write your own interest"

**Issue**: The programme dropdown includes options like "Safety (other)", "Administration and Commerce (other)", "Hospitality and Tourism (other)", "Information and Digital Skills (other)", "Future Schools (register interest)", "Not sure yet" — but none of these are "writing your own interest". The field is a `<select>` dropdown, not a free-text field. The description implies a text input that doesn't exist.

**Fix**: Change step 02 description to: "Choose your programme — select from the planned catalogue or indicate a general area of interest."

---

### 8. 🟢 NICE TO HAVE — "From the founder" eyebrow on homepage vision section

**Where**: Homepage Vision section, `<p className="eyebrow">From the founder</p>`

**Issue**: This is a label, not the founder's name. A first-time visitor won't know who "the founder" is without clicking through. Since the founder page exists at `/founder`, the eyebrow could add more context.

**Fix**: Consider: "From the founder, Tangi Iigonda" or "From Tangi Iigonda, founder" — consistent with how the Founder page introduces him. This adds specificity without breaking restraint.

---

### 9. 🟢 NICE TO HAVE — FAQ categories use different label styles

**Where**: `/faq` page

**Issue**: The FAQ has 7 category labels (General, Programmes, Admissions, RPL, WIL, Fees, Campus). "RPL" and "WIL" are acronyms without explanation on first use. While the answer text explains them, the category label itself is opaque to first-time visitors.

**Fix**: Consider: "Recognition of Prior Learning (RPL)" and "Work-Integrated Learning (WIL)" as category headers, or add a brief one-line explanation under each category header.

---

### 10. ⚠️ — Founder page says "No photograph" but also has two large images

**Where**: `/founder` page

**Issue**: The page states "No photograph of the founder is published at this stage" — which is correct (the images show a corridor and a student, not the founder). However, having two prominent images right next to the "no photograph" statement creates a slight visual confusion. A visitor scanning quickly might assume one of these IS the founder photo.

**Fix**: Either add a caption below each image explicitly stating what it shows (e.g. "Campus concept, not a photograph of the founder"), or move the images further from the "no photograph" text so the visual association is clearer.

---

## UX & Structure Issues

### 11. 🟡 IMPORTANT — No "How it works" or process explanation

**Where**: Entire site

**Issue**: There is no page or section explaining the learner journey: "How do I apply? What happens after I register interest? What does the assessment process look like? How does RPL work in practice?" The FAQ addresses individual questions but doesn't present a coherent step-by-step process.

**Why it matters**: For a pre-launch institution targeting first-time vocational learners (many of whom may be school leavers unfamiliar with VET processes), a clear process overview reduces anxiety and increases registration conversions.

**Fix**: Add a concise "How it works" section on the homepage or a dedicated `/process` page. Three to four steps: Register Interest → Programme Approval → Admissions Open → Enrolment & Assessment. This can be a simple numbered list with brief explanations, staying within the restraint voice.

---

### 12. 🟡 IMPORTANT — Navigation doesn't include Founder, Research, Partners in primary nav

**Where**: Header navigation

**Issue**: The primary header nav includes: About, Schools, Programmes, Updates, Brand, FAQ. Founder, Research, and Partners are only accessible via the footer "Institute" column. These are important pages for employer/partner/funder audiences who may never scroll to the footer.

**Fix**: Consider adding Founder, Research, and Partners to the primary nav. If the nav is getting too long, use a "More" dropdown or group them under an "Institute" section. At minimum, Partners should be in primary nav since it has 5 sub-pages with enquiry forms — a key conversion path.

---

### 13. 🟢 NICE TO HAVE — Schools section on homepage lacks the fifth school name

**Where**: Homepage Schools grid

**Issue**: The fifth school card ("Future Skills") uses the `arched-corridor` image (which is also used elsewhere on the site with different alt text). The card label "Future Skills" is the only school that doesn't match its official name "Future Schools" (as used on `/schools/future`). The inconsistency may confuse visitors who click through.

**Fix**: Change the homepage card label from "Future Skills" to "Future Schools" to match the school page title, or vice versa.

---

### 14. 🟢 NICE TO HAVE — Updates page is essentially empty

**Where**: `/updates` page

**Issue**: The page has no actual updates — just a "No updates yet" statement and a list of what to expect. While this is honest, an empty page feels like a dead end. Visitors who click "Updates" from the primary nav expect content and get nothing.

**Fix**: Consider: (a) merging the "what to expect" list into the homepage Pre-Launch section and removing the Updates page until there are actual updates; (b) or keeping the page but adding a more substantive "What we're working on now" section with a brief narrative about the establishment process (without claiming timelines).

---

## Conversion Issues

### 15. 🟡 IMPORTANT — Partner enquiry forms have no success state beyond local demo text

**Where**: All 5 partner enquiry sub-pages, Contact form, Register Interest form

**Issue**: All forms show "Submitted locally. This is a pre-launch demo. No data is sent to a server." after submission. This is honest, but it doesn't give the user confidence that their enquiry was recorded. A visitor who fills out a serious employer enquiry form and sees "demo" may wonder if anyone will ever read it.

**Fix**: The confirmation message should be more reassuring while remaining honest: "Your enquiry has been recorded. Oryx Institute is being established and will respond to serious enquiries when able. You will not receive an automatic reply." This tells the user their data exists somewhere and will be reviewed, without implying a timeline.

---

### 16. 🟢 NICE TO HAVE — No soft CTA for visitors not ready to register

**Where**: Entire site

**Issue**: The only conversion paths are "Register Interest" (requires personal data) and partner enquiry forms (requires organisation data). There is no lower-commitment option: no newsletter signup, no downloadable prospectus, no "save this page" or bookmark prompt.

**Fix**: Consider adding a lightweight newsletter signup ("Get updates by email") with just name + email, separate from the full registration form. This captures leads who are interested but not ready to commit to a specific programme.

---

### 17. 💡 — Contact page "Before you write" section could reduce friction

**Where**: `/contact` page

**Issue**: The four "before you write" notes are good but are presented as warnings rather than help. Note 01 says "Will respond to serious enquiries when able" — the word "serious" may discourage genuine but tentative enquiries.

**Fix**: Reframe: "We welcome all enquiries. The institution is being established and will respond as capacity allows." This removes the implied gatekeeping while remaining honest about response timelines.

---

## Content Improvements by Page

### Homepage `/`

- The Schools grid images could benefit from slightly more descriptive overlays — currently just the school name. A one-word descriptor (e.g. "Safety / Discipline", "Hospitality / Service") would add context without breaking the visual-led approach.
- The Vision section quote ("Quiet, disciplined, and rooted in the Namibian landscape") is powerful but brief. Consider adding a second sentence or a brief paragraph to give it more weight.
- The "Explore the Institute" index is well-structured but the numbering (01–07) suggests a sequence that doesn't exist — these are independent pages, not sequential steps.

### About `/about`

- Strong page. The "What it is not" section is excellent and unusual — most institutions wouldn't be this honest.
- The "At a glance" key facts table could benefit from a visual design upgrade (currently text-based). Cards or a horizontal strip would be more scannable.

### Schools `/schools`

- Each school card has a "Planned" badge. Consistent and honest. Good.
- The "A note on planning" section at the bottom is valuable but positioned after all five schools, meaning a visitor who stops reading after school 03 never sees it. Consider adding a brief disclaimer at the top of the page as well.

### Programmes `/programmes`

- The "Duration: To be confirmed" on every programme card is honest but makes the page feel more incomplete than it is. Consider adding a brief explanation: "Durations will be confirmed upon programme approval."
- The "Subject to accreditation" vs "Planned" badge distinction is useful but the difference is not explained on this page. A brief footnote would help.

### Register `/register`

- The form is thorough and well-structured. 11 fields capture useful segmentation data.
- The "Phone or WhatsApp" field being required may exclude learners who only have WhatsApp and no phone number. Consider making phone optional and WhatsApp a separate optional field, or rename to "Phone or WhatsApp (required)" to clarify.

### Brand `/brand`

- This is a comprehensive brand book — unusually detailed for a public website. It serves both as brand guidelines for internal use and as a transparency statement for external audiences.
- The prohibited language list is excellent and should be enforced across all pages.
- Consider: is the full brand book appropriate for public consumption? Some institutions keep this internal. The current approach is consistent with the transparency positioning.

---

## Technical Issues

### 18. 🔴 CRITICAL — robots.txt Host directive points to non-resolving domain

**What**: `robots.txt` contains `Host: https://oryxinstitute.na` and `Sitemap: https://oryxinstitute.na/sitemap.xml`, but oryxinstitute.na doesn't resolve.

**Fix**: Change to `Host: https://oryx-institute.vercel.app` and `Sitemap: https://oryx-institute.vercel.app/sitemap.xml` until oryxinstitute.na DNS is configured.

---

### 19. 🟡 IMPORTANT — Sitemap.xml uses oryxinstitute.na but site lives on Vercel subdomain

**What**: All 34 URLs in sitemap.xml use the `oryxinstitute.na` domain, which doesn't resolve. Google cannot crawl these URLs.

**Fix**: Either configure DNS for oryxinstitute.na, or regenerate sitemap.xml with oryx-institute.vercel.app URLs until the .na domain is live.

---

### 20. 🟡 IMPORTANT — `noindex, follow` on all pages prevents search indexing

**What**: Layout.tsx sets `robots: { index: false, follow: true }` globally. This means no page will appear in search results. This is intentional for pre-launch but should be changed before public launch.

**Fix**: When the institution is ready for public discovery, change `robots: { index: true, follow: true }`. Consider a graduated approach: index the homepage and key pages first, programme detail pages once they're approved.

---

### 21. 🟡 IMPORTANT — og:image references hero poster but no dedicated social image

**What**: The og:image uses `/hero/oryx-loop-poster.jpg` (1920×1080) which is a video poster frame. This may not render well as a social card — video posters often have motion blur or awkward framing that looks poor as a static thumbnail.

**Fix**: Create a dedicated social sharing image (1200×630 for Twitter/Facebook optimal ratio) with the Oryx Institute logo, tagline, and a clean visual. Save as `/og-image.jpg` and reference in metadata.

---

### 22. 🟢 NICE TO HAVE — No favicon.ico (only PNG shield)

**What**: The icons config only references `/oryx-shield.png`. Some browsers and older systems still request `/favicon.ico` automatically, which will return 404.

**Fix**: Add an `favicon.ico` file to `/public` alongside the PNG shield. Next.js will pick it up automatically.

---

### 23. 🟢 NICE TO HAVE — 13 async script bundles on homepage

**What**: The homepage loads 13 `<script>` tags. While all are async, the total JS payload may be significant for mobile performance (target: Lighthouse ≥ 85).

**Fix**: Review the JS bundle sizes. If the total is over 200KB, consider code-splitting more aggressively or deferring non-critical scripts.

---

### 24. 🟢 NICE TO HAVE — No `<h3>` or `<h4>` headings on homepage

**What**: The homepage uses only `<h1>` and `<h2>` headings. No sub-headings exist within sections. This is fine for the editorial style but means there's no semantic hierarchy within sections (e.g. the Schools section has an h2 "Five planned schools" but no h3 for each school name).

**Fix**: This is a stylistic choice. If the editorial minimalism requires no sub-headings, this is acceptable. But from a strict semantic HTML perspective, each school card could have an h3 with the school name.

---

## Priority Action Plan

| Priority | Action | Type | Page(s) |
|----------|--------|------|---------|
| 🔴 CRITICAL | Configure oryxinstitute.na DNS OR change all canonical/OG/robots/sitemap URLs to oryx-institute.vercel.app | Technical | All pages |
| 🔴 CRITICAL | Fix og:url per-page — each page must report its own URL, not homepage | Technical | All non-homepage pages |
| 🔴 CRITICAL | Add JSON-LD structured data (Organization, WebSite, Course) | Technical | Homepage + programme pages |
| 🟡 IMPORTANT | Fix duplicate/empty-alt image rendering on homepage | Accessibility + Technical | Homepage |
| 🟡 IMPORTANT | Remove "diploma" from programmes blurb | Content | Homepage |
| 🟡 IMPORTANT | Fix robots.txt Host and sitemap.xml domain | Technical | robots.txt, sitemap.xml |
| 🟡 IMPORTANT | Add Partners/Research/Founder to primary navigation | UX | Header |
| 🟡 IMPORTANT | Add "How it works" learner journey section | UX | Homepage or new page |
| 🟡 IMPORTANT | Improve form confirmation messaging | Conversion | All forms |
| 🟡 IMPORTANT | Create dedicated social sharing image (1200×630) | Technical | og:image metadata |
| 🟢 NICE TO HAVE | Fix "Future Skills" vs "Future Schools" naming | Content | Homepage, /schools |
| 🟢 NICE TO HAVE | Reframe contact page "serious enquiries" language | Content | /contact |
| 🟢 NICE TO HAVE | Add FAQ category label explanations | Content | /faq |
| 🟢 NICE TO HAVE | Add favicon.ico | Technical | /public |
| 🟢 NICE TO HAVE | Consider newsletter/soft CTA | Conversion | Homepage/Footer |

---

*Audit completed. 24 findings: 3 critical, 7 important, 8 nice-to-have, 4 text corrections, 2 strategic suggestions.*
