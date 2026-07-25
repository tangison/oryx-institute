# Oryx Institute — Website Structure Assessment

> Assessment date: 2026-07-25  
> Methodology: website-structure skill (kostja94/marketing-skills)  
> Site URL: https://oryx-institute.vercel.app  

---

## Initial Assessment

**Website type**: Educational institution / B2B+B2C hybrid (serves learners + employers + funders)  
**Stage**: Existing site — pre-launch, extending  
**Growth strategy**: Education (institutional), B2B (employer partnerships, research commissions), community (Namibian workforce)  
**Constraints**: Solo founder, pre-accreditation, no operating programmes yet  

---

## Page Priority Framework Assessment

| Priority | Expected Pages | Oryx Institute Status | Gap |
|----------|---------------|----------------------|-----|
| **Must Have** | Home, Product/Features, Pricing, Blog, About, Privacy, Terms, Contact | ✅ Home, ✅ About, ✅ Privacy, ✅ Terms, ✅ Contact, ✅ Programmes (≈Features), ❌ Blog/Updates (empty page), ❌ Pricing/Fees | **Fees page missing** — FAQ says "To be confirmed" but there's no dedicated /fees page. Blog/Updates is empty but exists. |
| **Great to Have** | Testimonials, FAQ, Sitemap (HTML), 404, Refund/Returns | ✅ FAQ, ✅ Sitemap, ✅ 404, ❌ Testimonials, ❌ Refund/Returns | **Testimonials missing** — no student/employer testimonials anywhere. Pre-launch excuse valid, but placeholder section should exist. |
| **Optional** | Search Results, News, Careers, Disclosure | ❌ Search, ❌ Careers, ❌ News (Updates is placeholder), ✅ Disclosure (Terms of Use) | Careers not needed until operating. Search not needed at 34 pages. |
| **Traffic-driven** | Category/Collection pages | ✅ Schools (5 categories), ✅ Programmes (8 individual pages) | Good — school and programme pages follow category structure well. |

---

## Generic Template Mapping

### Root Pages

| Path | Current | Status | Recommendation |
|------|---------|--------|----------------|
| / | ✅ Homepage | Complete | Add JSON-LD, fix og:url |
| /about | ✅ About | Complete | Strong content, good structure |
| /programmes | ✅ Product/Features equivalent | Complete | Good catalogue structure |
| /register | ✅ Conversion CTA | Complete | Consider soft CTA (newsletter) alongside |
| /contact | ✅ Contact | Complete | Fix "serious enquiries" language |
| /pricing | ❌ Fees/Pricing | Missing | **Add /fees page** — even a "To be confirmed" page signals transparency |
| /demo | ❌ Not applicable | — | VET institution doesn't need demo |

### Resources Pages

| Path | Current | Status | Recommendation |
|------|---------|--------|----------------|
| /updates | ✅ Blog equivalent | Empty placeholder | **Add initial content** or merge into homepage until there are actual updates |
| /faq | ✅ FAQ | 10 questions | Expand with more admissions/process questions |
| /blog | ❌ Blog | Missing | Not needed pre-launch. /updates serves this purpose. |
| /glossary | ❌ | Missing | Consider for VET terminology (RPL, WIL, NQA, NOSS) — helps first-time VET learners |
| /changelog | ❌ | Missing | Not needed — /updates covers institutional milestones |

### Partnership Pages

| Path | Current | Status | Recommendation |
|------|---------|--------|----------------|
| /partners | ✅ Hub page | Complete | Good 5-category structure |
| /partners/employers | ✅ | Complete | ✅ |
| /partners/wil | ✅ | Complete | ✅ |
| /partners/corporate | ✅ | Complete | ✅ |
| /partners/research | ✅ | Complete | ✅ |
| /partners/funding | ✅ | Complete | ✅ |
| /affiliate | ❌ | — | Not applicable for VET |

### Legal Pages

| Path | Current | Status | Recommendation |
|------|---------|--------|----------------|
| /legal/privacy | ✅ | Complete | ✅ |
| /legal/terms | ✅ | Complete | ✅ |
| /legal/accessibility | ✅ | Complete | ✅ |
| /legal/fees | ❌ | Missing | **Add /legal/fees or /fees** with fee disclosure (even "to be confirmed") |
| /legal/refund | ❌ | Missing | Add refund/withdrawal policy before enrolment opens |

### Standalone Pages

| Path | Current | Status | Recommendation |
|------|---------|--------|----------------|
| /founder | ✅ | Complete | Good — unusual for institutional sites |
| /research | ✅ | Complete | Good — signals academic ambition |
| /brand | ✅ | Complete | Comprehensive — unusual to publish publicly |
| /site-map | ✅ | Complete | ✅ |
| /login | ❌ | — | Not needed pre-launch |
| /dashboard | ❌ | — | Not needed pre-launch |

---

## Structure Principles Assessment

### Flat Structure ✅
- Max clicks from homepage to any page: 3 (e.g. Home → Schools → Safety → Occupational Safety Foundations)
- Programme detail pages: 3 clicks
- Partner enquiry pages: 2 clicks
- Legal pages: 2 clicks
- **Pass**: All pages reachable within 4 clicks.

### Sitelinks Potential 🟡
- Current primary nav has 6 items (About, Schools, Programmes, Updates, Brand, FAQ). This is sufficient for Google sitelinks.
- **Issue**: Partners, Research, and Founder are NOT in primary nav — they're only in the footer. Google may not surface these as sitelinks.
- **Fix**: Add Partners and Research to primary nav, or use a "More" dropdown to include all key pages.

### Orphan Prevention 🟡
- All pages are linked from either primary nav, footer, or sitemap.
- **Issue**: Individual programme pages (/programmes/occupational-safety-foundations etc.) are only reachable via the /programmes hub page. No cross-links from school pages to individual programmes exist in the primary nav.
- **Note**: School detail pages DO link to their programmes (each school page shows its programme cards). This is sufficient.
- **Pass**: No orphan pages detected.

### Clear Navigation 🔴
- **Critical issue**: Primary nav includes "Brand" but excludes "Partners" and "Research". For an institution seeking partners and funders, burying these in the footer is a structural mistake.
- **Brand page is internal**: The brand book at /brand is primarily an internal resource (logo rules, colour specs, voice guidelines). It doesn't belong in primary nav for public visitors. It should be moved to footer or a separate internal resources section.
- **Fix**: Replace "Brand" with "Partners" in primary nav. Move "Brand" to footer. Add "Research" to primary nav or a dropdown.

---

## Growth Strategy → Structure Mapping

| Goal | Current Path | Recommendation |
|------|-------------|----------------|
| **Education (learners)** | /register, /programmes, /schools | ✅ Good. Add /fees and /glossary for learner support. |
| **B2B (employers)** | /partners/employers, /partners/corporate | ✅ Good. Should be in primary nav for discoverability. |
| **B2B (funders/DFIs)** | /partners/funding, /partners/research | 🟡 Burying these in footer reduces discoverability for the audiences that matter most pre-launch. |
| **Research commissions** | /research, /partners/research | 🟡 Research is a footer-only page. Should be nav-visible. |
| **Community (Namibian workforce)** | /faq, /about | ❌ No newsletter, no community page, no alumni placeholder. |

---

## Recommended Structure (Prioritised)

### Must Have (fix now)

1. **Add Partners to primary nav** — replace Brand, or add alongside
2. **Add Research to primary nav** — or under "Institute" dropdown
3. **Create /fees page** — transparent fee disclosure (even "to be confirmed")
4. **Move Brand to footer** — it's an internal resource, not a public conversion page
5. **Fix og:url per-page** — every page needs its own og:url
6. **Configure oryxinstitute.na DNS** — or switch all URLs to Vercel domain
7. **Add JSON-LD** — Organization + EducationalOrganization on every page

### Great to Have (add before launch)

8. **Add /glossary page** — VET terminology explanations (RPL, WIL, NQA, NOSS)
9. **Add testimonials placeholder section** — on homepage or /about, with honest framing: "Testimonials will be added as the institution operates and graduates speak"
10. **Add refund/withdrawal policy** — /legal/refund, before enrolments open
11. **Expand FAQ** — add more process questions: "What happens after I register interest?", "How do I know which programme is right for me?"
12. **Add soft CTA** — newsletter signup (name + email) alongside Register Interest

### Optional (post-launch)

13. **Add /careers page** — when institution starts hiring staff
14. **Add search** — when content exceeds ~100 pages
15. **Add /docs or student handbook** — when programmes are accredited
16. **Add student dashboard/login** — when enrolment system exists

---

## URL Structure Assessment

| Assessment | Status |
|------------|--------|
| Lowercase URLs | ✅ All paths are lowercase |
| Hyphen-separated | ✅ e.g. /occupational-safety-foundations |
| Short, descriptive slugs | ✅ Most slugs are clear and keyword-rich |
| Keyword-rich | ✅ Programmes use descriptive names |
| Hierarchy clear | ✅ /schools/safety, /programmes/occupational-safety-foundations, /partners/employers |
| No encoded characters | ✅ |
| Consistent naming | 🟡 "Future Schools" vs "Future Skills" inconsistency on homepage vs school page |

---

*Website structure assessment completed. 7 must-have fixes, 5 great-to-have additions, 4 optional post-launch items.*
