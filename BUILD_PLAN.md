# BUILD_PLAN.md - Oryx Institute

> The complete build plan for the Oryx Institute pre-launch website. Read-only during Phase 1. No implementation begins until this document is approved. Ends with Confirmed, Assumptions, Needs confirmation, Milestones, Acceptance criteria, and an approval gate.

---

## 1. Repository state

| Property | Value |
|---|---|
| Path | `/home/z/my-project` |
| Git status | Initialised. 2 commits. Latest `2057fc9 731b004b-66f7-4fac-b70c-cc206e0e3939`. Working tree clean. |
| Git remote | None configured. |
| `package.json` | Not present. Project is greenfield for code. |
| `next.config.js` | Not present. |
| `tsconfig.json` | Not present. |
| `tailwind.config.ts` | Not present. |
| Existing source | None. Only `.env`, `.gitignore`, `download/`, `upload/`, `skills/` exist. |
| `.env` contents | Single key: `DATABASE_URL` (redacted). No GitHub, Vercel, Resend, analytics, or third-party secrets. |
| Skills directory | 60+ skills installed locally. All 8 Webman skills present. 5 external skills missing (superpowers, ponytail, impeccable, design-taste-frontend, taste-skill). Hallmark present but not authorised. |
| Supplied assets | 4 files in `upload/`: primary logo, shield icon, visual reference A, visual reference B. All verified. |
| Plan artefacts | `PRODUCT.md`, `BRAND.md`, `BUILD_PLAN.md`, `PROOF.md` (this document set). |

## 2. Stack

### 2.1 Framework and runtime

- **Framework:** Next.js 16 (App Router, React Server Components, Partial Prerendering where it improves performance without complicating form behaviour).
- **Language:** TypeScript 5.x, strict mode.
- **Runtime:** Node.js 24 (matches installed version v24.18.0).
- **Package manager:** pnpm (preferred for monorepeatability and disk efficiency). Needs installation approval.

### 2.2 Styling

- **CSS framework:** Tailwind CSS v4 (CSS-first configuration, brand tokens as CSS custom properties in `globals.css`).
- **No component library.** No shadcn/ui, no Astryx, no Material UI, no Chakra. The site is bespoke editorial marketing, not a component-heavy product UI. Per `skill-stack.md`: "Do not force it into a highly bespoke marketing site".
- **No icon library.** Custom SVG icons designed for the brand. Lucide, Heroicons, and Feather are prohibited due to visual character mismatch.

### 2.3 Typography

- **Fonts:** Fraunces (display serif) + Inter (body sans-serif), loaded via `next/font/google` for automatic optimisation, subsetting, and self-hosting. Pending user confirmation per BRAND.md section 11.2.
- **Fallbacks:** Per BRAND.md section 11.2 fallback stacks.

### 2.4 Image handling

- **Component:** Next.js `<Image>` with AVIF and WebP formats, responsive srcsets, lazy loading, priority loading.
- **Storage:** Generated images committed to `/public/images/<route>/<filename>.avif` with `.webp` and `.jpg` fallbacks.
- **Manifest:** `scripts/image_manifest.json` records every image with prompt, route, section, aspect ratio, filename, alt text, and generation status.

### 2.5 Data and persistence

- **No database in pre-launch.** Form submissions persisted to a local JSON file at `/data/submissions.json` with an audit log at `/data/submissions_audit.log`. Marked as mock behaviour in the UI ("Submitted locally. This is a pre-launch demo. No data is sent to a server.").
- **Swap path:** The persistence layer is abstracted behind a `SubmissionRepository` interface. Swapping to Vercel KV, Resend email, or a PostgreSQL table requires implementing the interface, not changing form code.
- **Content data:** Programme and update content stored as typed TypeScript data files in `/content/programmes/` and `/content/updates/`. CMS-ready schema: each programme and update is a typed object with a stable slug, metadata, and content fields. Swapping to a headless CMS (Sanity, Contentful, Strapi) requires changing the data loader, not the components.

### 2.6 Forms

- **Validation:** Zod schemas for every form. Server-side validation in the API route. Client-side validation via `react-hook-form` with `@hookform/resolvers/zod`.
- **Spam protection:** Honeypot field (hidden input named `website` that must remain empty). No CAPTCHA in pre-launch (deters users on slow connections). ReCAPTCHA or Turnstile can be added when authorised.
- **Submission:** `POST` to `/api/submissions` with the form type discriminator. Server validates, persists to local JSON, returns a success or error response.
- **Confirmation:** Inline confirmation replaces the form. Aria-live announcement. Email confirmation not sent in pre-launch (no email service).

### 2.7 Analytics

- **Built-in event interface:** `lib/analytics.ts` exposes `track(eventName, properties)`. Events: `hero_slide_change`, `hero_pause`, `programme_view`, `programme_filter`, `register_interest_submit`, `mailing_list_submit`, `employer_enquiry_submit`, `wil_enquiry_submit`, `corporate_training_enquiry_submit`, `research_advisory_enquiry_submit`, `funding_partnership_enquiry_submit`, `menu_open`, `menu_close`, `route_visit`.
- **Provider:** None in pre-launch unless user authorises. Built with Vercel Analytics as the default when authorised (free, privacy-respecting, built-in). Plausible or Fathom as alternatives.
- **No third-party tracking scripts.** No Google Analytics unless explicitly authorised.

### 2.8 SEO

- **Metadata:** Next.js Metadata API. Per-route `metadata` export with title, description, canonical URL, Open Graph, Twitter Card, structured data.
- **Sitemap:** `app/sitemap.ts` generating `/sitemap.xml` with all public routes.
- **Robots:** `app/robots.ts` generating `/robots.txt`. Pre-launch: `Disallow: /` until user authorises indexing. Production: `Allow: /` with sitemap reference.
- **Canonical:** Every page sets `<link rel="canonical">` to its absolute URL.
- **Structured data:** JSON-LD for `EducationalOrganization`, `WebSite`, `BreadcrumbList`, `FAQPage` (on `/faq`), and `Course` (on programme pages, with `availability` set to `PreOrder` while in pre-launch).
- **Open Graph images:** Per-route OG images generated at build time via `app/opengraph-image.tsx` using the brand system. 1200x630 px.
- **Favicon:** Shield icon. `app/favicon.ico`, `app/icon.png` (192x192, 512x512), `apple-icon.png` (180x180).
- **Manifest:** `app/manifest.ts` generating `/manifest.webmanifest` with the shield icon, brand colours, and short name "Oryx Institute".

### 2.9 Accessibility

- **Standard:** WCAG 2.2 AA minimum. AAA where achieved by the brand system (most pairings are AAA per BRAND.md section 10.2).
- **Keyboard:** All interactive elements reachable by Tab. Visible focus states (2 px outline in Oryx Maroon with 2 px offset). No keyboard traps except within open modals/menus (with Escape to close).
- **Screen readers:** Semantic HTML. ARIA labels where native semantics are insufficient. Aria-live regions for dynamic content (form submissions, hero slide changes).
- **Reduced motion:** All motion respects `prefers-reduced-motion: reduce` per BRAND.md section 16.3.
- **Colour contrast:** All colour pairings verified per BRAND.md section 10.2.
- **Forms:** Labels associated with inputs. Error messages associated via `aria-describedby`. Required fields marked with `aria-required="true"` and visible asterisk.
- **Images:** Descriptive alt text. Decorative images use empty alt.
- **Skip link:** Skip to main content link at the top of every page, visible on focus.

### 2.10 Performance

- **Target:** Lighthouse Performance 95+ on desktop, 90+ on mobile (on a fast connection). Core Web Vitals: LCP < 2.5s, FID < 100ms (or INB < 200ms), CLS < 0.1.
- **Namibian connection optimisation:** Images served as AVIF (smallest format). Lazy loading below the fold. Minimal JavaScript. No unnecessary third-party scripts. Static generation for all pages where possible.
- **Bundle size:** Target < 200 KB JS for the homepage. < 50 KB CSS.
- **Caching:** Static pages cached at the edge. Images cached for 1 year (immutable). Fonts cached for 1 year.

### 2.11 Security

- **Secrets:** All secrets in environment variables. `.env` is gitignored. `.env.example` documents required variables without values.
- **Headers:** `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- **Content Security Policy:** Configured via Next.js `headers()` to allow self, Google Fonts (when authorised), and Vercel Analytics (when authorised).
- **Form spam:** Honeypot field. Rate limiting via Vercel Edge Middleware when deployed.
- **Dependency audit:** `pnpm audit` on every install. Gitleaks scan before every commit (needs installation approval).
- **No secrets in client code.** All API routes run server-side. Form submissions do not expose persistence details to the client.

### 2.12 Testing

- **Unit tests:** Vitest for utility functions, Zod schemas, and data loaders.
- **Component tests:** Vitest + React Testing Library for interactive components (hero slider, programme browser, forms, menu).
- **End-to-end tests:** Playwright for critical journeys: homepage load, programme browse, register interest submission, menu open/close, navigation between routes, 404 handling.
- **Visual regression:** Playwright screenshot comparison for representative pages at mobile and desktop.
- **Accessibility tests:** axe-core integrated into Playwright. Pa11y as a second check.
- **Performance tests:** Lighthouse CI on every deploy.

## 3. Route matrix

27 routes plus system pages. Each route has a defined purpose, audience, CTA, content, proof requirements, SEO intent, data source, access scope, and demo lock state.

| # | Route | Purpose | Primary CTA | Access | Demo |
|---|---|---|---|---|---|
| 1 | `/` | Present the institution and primary conversion | Register Interest | Public | Unlocked |
| 2 | `/coming-soon` | Status page for pre-launch milestones | Subscribe to updates | Public | Unlocked |
| 3 | `/institute` | Institutional introduction, mission, vision, values | Explore Schools | Public | Unlocked |
| 4 | `/founder` | Minimal founder page for Tangi Iigonda | Register Interest | Public | Unlocked |
| 5 | `/schools` | Overview of all planned schools | View a school | Public | Unlocked |
| 6 | `/schools/[school-slug]` | Single school detail with its planned programmes | View a programme | Public | Unlocked |
| 7 | `/programmes` | Programme browser with filters | View a programme | Public | Unlocked |
| 8 | `/programmes/[programme-slug]` | Single programme detail | Register Interest for this programme | Public | Unlocked |
| 9 | `/rpl` | Recognition of Prior Learning explanation | Submit RPL enquiry | Public | Unlocked |
| 10 | `/work-integrated-learning` | WIL explanation for learners and employers | Submit WIL enquiry | Public | Unlocked |
| 11 | `/research-advisory` | Research and advisory services | Submit research enquiry | Public | Unlocked |
| 12 | `/employer-training` | Corporate training services | Submit corporate enquiry | Public | Unlocked |
| 13 | `/campus` | Campus concept presentation | Register Interest | Public | Unlocked |
| 14 | `/admissions` | Admissions process overview | Register Interest | Public | Unlocked |
| 15 | `/fees-and-funding` | Fees and funding approach | Submit funding enquiry | Public | Unlocked |
| 16 | `/register-interest` | Primary register interest form | Submit | Public | Unlocked |
| 17 | `/updates` | Establishment updates feed | Read an update | Public | Unlocked |
| 18 | `/updates/[slug]` | Single update detail | View more updates | Public | Unlocked |
| 19 | `/events` | Events listing (empty in pre-launch) | Register Interest | Public | Unlocked |
| 20 | `/contact` | Contact form and contact details | Submit contact form | Public | Unlocked |
| 21 | `/faq` | Frequently asked questions | Submit a question | Public | Unlocked |
| 22 | `/brand` | Public brand book | Register Interest | Public | Unlocked |
| 23 | `/privacy` | Privacy policy | None | Public | Unlocked |
| 24 | `/terms` | Terms of use | None | Public | Unlocked |
| 25 | `/accessibility` | Accessibility statement | Contact us | Public | Unlocked |
| 26 | `/sitemap` | Human-readable sitemap | None | Public | Unlocked |
| 27 | `404` | Not found page | Go home | Public | Unlocked |
| 28 | `500` | Server error page | Go home | Public | Unlocked |
| 29 | `maintenance` | Maintenance page | None | Public | Unlocked |
| 30 | `offline` | Service worker offline page | Try again | Public | Unlocked |
| 31 | `locked` | Locked demo preview state | Register Interest | Public | Unlocked (used in demo mode if user chooses locked demo) |

### 3.1 Route detail specifications

Each route below specifies: purpose, audience, CTA, content sections, proof required, SEO intent, data source, and any special handling.

#### 3.1.1 `/` (Homepage)

- **Purpose:** Present the institution and capture primary conversion (Register Interest).
- **Audience:** All audiences. First touch for most visitors.
- **Primary CTA:** Register Interest.
- **Secondary CTA:** Explore the Institute.
- **Content sections:** Hero slider (5 slides), institutional introduction, schools overview, learning pathways, featured planned programmes, campus concept, research and advisory, establishment updates, final registration section, footer.
- **Proof required:** Verified brand colours and logo. Original commissioned photography. No fabricated metrics.
- **SEO intent:** Brand name "Oryx Institute", "vocational training Namibia", "Windhoek training institution".
- **Data source:** Static for most. Programmes from `/content/programmes/`. Updates from `/content/updates/`. Hero slider images from manifest items 1-5.
- **Special:** Hero slider requires manual controls, visible slide position, pause functionality, reduced-motion support. First hero image receives `priority` loading.

#### 3.1.2 `/coming-soon`

- **Purpose:** Status page for pre-launch milestones. Not a dead "coming soon" page. Explains what is being built, when public marketing begins, and how to register interest.
- **Audience:** All audiences. Especially first-time visitors who arrive before the institution is fully launched.
- **Primary CTA:** Register Interest.
- **Secondary CTA:** Subscribe to updates.
- **Content sections:** Pre-launch status statement, what is being built, timeline overview (without dates), register interest form, mailing list form.
- **Proof required:** No dates. No claims of accreditation or registration.
- **SEO intent:** "Oryx Institute coming soon", "pre-launch vocational training Namibia".
- **Data source:** Static.
- **Special:** This is not the entire website. The homepage is the primary entry point. This page is for visitors who specifically look for status.

#### 3.1.3 `/institute`

- **Purpose:** Institutional introduction. Mission, vision, values, what the institution is becoming.
- **Audience:** All audiences seeking to understand the institution.
- **Primary CTA:** Explore Schools.
- **Secondary CTA:** Register Interest.
- **Content sections:** Institutional introduction (40-60 words), mission statement, vision statement, values, founder mention (link to /founder), what the institution is becoming, what it is not, establishment journey timeline (without dates).
- **Proof required:** Verified facts only. Mission and vision are stated as intentions, not as achievements.
- **SEO intent:** "Oryx Institute mission", "vocational training institution Windhoek".
- **Data source:** Static.
- **Special:** Mission and vision copy to be drafted in Phase 2 (Content). Must avoid prohibited language.

#### 3.1.4 `/founder`

- **Purpose:** Minimal founder page.
- **Audience:** All audiences. Especially investors and partners evaluating the institution.
- **Primary CTA:** Register Interest.
- **Secondary CTA:** Contact.
- **Content sections:** Founder name (Tangi Iigonda), role (Founder), one-sentence statement about his intention for the institution. No biography. No photograph unless supplied. No claims about credentials or experience.
- **Proof required:** Founder name supplied. Minimal copy pending Phase 2.
- **SEO intent:** "Tangi Iigonda Oryx Institute", "Oryx Institute founder".
- **Data source:** Static.
- **Special:** Brief explicitly says "put very little about him". No fabricated credentials, no fabricated experience, no fabricated education.

#### 3.1.5 `/schools`

- **Purpose:** Overview of all planned schools.
- **Audience:** Prospective learners, employers, partners.
- **Primary CTA:** View a school.
- **Secondary CTA:** Register Interest.
- **Content sections:** Schools overview, large editorial image panels for each school (Safety, Administration and Commerce, Hospitality and Tourism, Information and Digital Skills, Future Schools), each linking to its school detail page.
- **Proof required:** All programmes presented as "Planned", "Subject to approval", or "Register your interest". No claim of approved qualifications.
- **SEO intent:** "vocational schools Namibia", "training schools Windhoek".
- **Data source:** Schools from `/content/schools/`. Images from manifest items 13-24.
- **Special:** Image panels are large and editorial, not identical cards. Each panel has a unique aspect ratio and composition.

#### 3.1.6 `/schools/[school-slug]`

- **Purpose:** Single school detail with its planned programmes.
- **Audience:** Prospective learners interested in a specific discipline.
- **Primary CTA:** View a programme.
- **Secondary CTA:** Register Interest for this school.
- **Content sections:** School introduction, planned programmes list (with status badges), career pathways, RPL suitability note, WIL opportunities, image gallery, register interest form pre-filled with the school.
- **Proof required:** Programme status labels. No invented programmes.
- **SEO intent:** "School of Safety Namibia", "Hospitality training Windhoek", etc.
- **Data source:** School from `/content/schools/[slug].ts`. Programmes filtered by school.
- **Special:** Each school has a unique visual treatment within the brand system. Not identical templates.

#### 3.1.7 `/programmes`

- **Purpose:** Programme browser with filters.
- **Audience:** Prospective learners, employers.
- **Primary CTA:** View a programme.
- **Secondary CTA:** Register Interest.
- **Content sections:** Programme browser with filters (school, level, delivery format, status), results list, empty state when no results, register interest CTA.
- **Proof required:** Programme status labels. Fees display "To be confirmed" until supplied. Intake date displays "To be confirmed".
- **SEO intent:** "vocational programmes Namibia", "training courses Windhoek".
- **Data source:** Programmes from `/content/programmes/`. Filters from programme metadata.
- **Special:** Filters update via URL search params for shareable filtered views. No JavaScript required for initial render (progressive enhancement).

#### 3.1.8 `/programmes/[programme-slug]`

- **Purpose:** Single programme detail.
- **Audience:** Prospective learners interested in a specific programme.
- **Primary CTA:** Register Interest for this programme.
- **Secondary CTA:** View related programmes.
- **Content sections:** Programme overview, planned level, entry requirements, learning outcomes, delivery format, duration, assessment approach, RPL suitability, WIL component, fees (To be confirmed), intake date (To be confirmed), approval status (Planned or Subject to approval), register interest form pre-filled with the programme.
- **Proof required:** Programme status labels. Unknown fields display "To be confirmed", not invented content.
- **SEO intent:** Programme name + Namibia / Windhoek.
- **Data source:** Programme from `/content/programmes/[slug].ts`.
- **Special:** Structured data as `Course` with `availability: PreOrder`. No structured data claiming the course is currently available.

#### 3.1.9 `/rpl`

- **Purpose:** Recognition of Prior Learning explanation.
- **Audience:** Experienced workers, employers.
- **Primary CTA:** Submit RPL enquiry.
- **Secondary CTA:** Register Interest.
- **Content sections:** What RPL is, how RPL works (portfolio, assessment, certification), what RPL is not (not automatic certification, not a shortcut), RPL suitability, RPL process timeline (without dates), RPL enquiry form.
- **Proof required:** Factual explanation of RPL. No claim that Oryx Institute is an accredited RPL assessment centre until verified.
- **SEO intent:** "Recognition of Prior Learning Namibia", "RPL Windhoek".
- **Data source:** Static. Images from manifest items 25-26.
- **Special:** Language is factual. RPL assesses demonstrated competence and is not automatic certification.

#### 3.1.10 `/work-integrated-learning`

- **Purpose:** WIL explanation for learners and employers.
- **Audience:** Prospective learners, employers, WIL partners.
- **Primary CTA:** Submit WIL enquiry.
- **Secondary CTA:** Register Interest.
- **Content sections:** What WIL is, how WIL works (placement, supervision, assessment), benefits for learners, benefits for employers, how to become a WIL partner, WIL enquiry form.
- **Proof required:** Factual explanation of WIL. No claim of existing WIL partnerships.
- **SEO intent:** "work-integrated learning Namibia", "workplace learning Windhoek".
- **Data source:** Static. Images from manifest items 27-32.
- **Special:** Separate enquiry paths for prospective learners (looking for WIL placement) and employers (offering WIL placement).

#### 3.1.11 `/research-advisory`

- **Purpose:** Research and advisory services introduction.
- **Audience:** Government, NGOs, industry associations, research clients.
- **Primary CTA:** Submit research enquiry.
- **Secondary CTA:** Contact.
- **Content sections:** Research and advisory introduction, applied research, workforce studies, organisational training, advisory services, small scale at launch statement, research enquiry form.
- **Proof required:** No claim of completed research that does not exist.
- **SEO intent:** "applied research Namibia", "workforce studies Windhoek", "organisational training".
- **Data source:** Static. Images from manifest items 41-43.
- **Special:** "Small at launch" is stated explicitly. No fabricated research portfolio.

#### 3.1.12 `/employer-training`

- **Purpose:** Corporate training services.
- **Audience:** Employers, HR managers, training managers.
- **Primary CTA:** Submit corporate enquiry.
- **Secondary CTA:** Contact.
- **Content sections:** Corporate training introduction, bespoke training approach, training areas (mapped to schools), delivery formats, how to commission training, corporate enquiry form.
- **Proof required:** No claim of existing corporate training clients.
- **SEO intent:** "corporate training Namibia", "workplace training Windhoek".
- **Data source:** Static. Images from manifest items 13-24 (reused where appropriate).
- **Special:** Training areas map to planned schools. No invented client logos or testimonials.

#### 3.1.13 `/campus`

- **Purpose:** Campus concept presentation.
- **Audience:** All audiences. Especially prospective learners visualising the learning environment.
- **Primary CTA:** Register Interest.
- **Secondary CTA:** Contact.
- **Content sections:** Campus concept introduction, lean Windhoek micro-campus overview, reception (with front-office training note), flexible classroom, mobile laptop laboratory, administration office, secure learner-record facilities, future modular classroom, courtyard, image gallery.
- **Proof required:** All images captioned as "architectural concept", not as completed facilities. No campus address.
- **SEO intent:** "Oryx Institute campus", "training facility Windhoek".
- **Data source:** Static. Images from manifest items 33-40.
- **Special:** Every architectural image has a caption explaining it is a concept. No claim of a completed or leased campus.

#### 3.1.14 `/admissions`

- **Purpose:** Admissions process overview.
- **Audience:** Prospective learners.
- **Primary CTA:** Register Interest.
- **Secondary CTA:** Contact.
- **Content sections:** Admissions approach, who can apply, how to express interest, what happens next (without specific dates), admissions FAQ, register interest form.
- **Proof required:** No claim of open admissions. No intake date. Process stated as "expression of interest" not "application".
- **SEO intent:** "vocational training admissions Namibia".
- **Data source:** Static.
- **Special:** "Register Interest" replaces "Apply Now" throughout pre-launch. The institution is not yet accepting applications.

#### 3.1.15 `/fees-and-funding`

- **Purpose:** Fees and funding approach.
- **Audience:** Prospective learners, funders.
- **Primary CTA:** Submit funding enquiry.
- **Secondary CTA:** Register Interest.
- **Content sections:** Fees approach (without specific fees), funding pathways (public skills funds, employer sponsorships, donor-funded places, self-funding), what fees will cover, when fees will be published, funding enquiry form.
- **Proof required:** No specific fees. No claim of approved funding partners.
- **SEO intent:** "vocational training fees Namibia", "training funding Windhoek".
- **Data source:** Static.
- **Special:** All fees display "To be confirmed". Funding pathways are described generically, not as confirmed partnerships.

#### 3.1.16 `/register-interest`

- **Purpose:** Primary register interest form.
- **Audience:** Prospective learners.
- **Primary CTA:** Submit.
- **Secondary CTA:** View programmes.
- **Content sections:** Form introduction, register interest form (Name, Email, Telephone or WhatsApp, Region or town, Programme of interest, Current education level, Employment status, Interest in RPL, Preferred study schedule, Consent to receive updates), success state, error states.
- **Proof required:** Form persists locally in pre-launch. No claim of server-side processing.
- **SEO intent:** "register interest Oryx Institute".
- **Data source:** Form submission to `/api/submissions`.
- **Special:** Programme of interest is a select populated from `/content/programmes/`. If accessed via a programme page, the field is pre-filled.

#### 3.1.17 `/updates`

- **Purpose:** Establishment updates feed.
- **Audience:** All audiences following the institution's establishment.
- **Primary CTA:** Read an update.
- **Secondary CTA:** Subscribe to mailing list.
- **Content sections:** Updates feed (reverse chronological), empty state ("No updates yet. Verified institutional updates will appear here as the institution is established."), category filter (announcements, programme updates, public notices, events), mailing list signup.
- **Proof required:** Only verified institutional updates. No fabricated announcements.
- **SEO intent:** "Oryx Institute updates", "vocational training news Namibia".
- **Data source:** Updates from `/content/updates/`.
- **Special:** This is not a general news outlet. Pre-launch, the feed may be empty with a clear empty state.

#### 3.1.18 `/updates/[slug]`

- **Purpose:** Single update detail.
- **Audience:** All audiences.
- **Primary CTA:** View more updates.
- **Secondary CTA:** Register Interest.
- **Content sections:** Update headline, date (when supplied), category, body content, related updates, register interest CTA.
- **Proof required:** Verified updates only. No fabricated dates or announcements.
- **SEO intent:** Update-specific.
- **Data source:** Update from `/content/updates/[slug].md`.
- **Special:** Updates are written in Phase 2 (Content) and approved before publication.

#### 3.1.19 `/events`

- **Purpose:** Events listing.
- **Audience:** All audiences.
- **Primary CTA:** Register Interest.
- **Secondary CTA:** Subscribe to updates.
- **Content sections:** Events listing (empty in pre-launch), empty state ("No events scheduled yet. Information sessions and open days will be announced here."), mailing list signup.
- **Proof required:** No fabricated events. No fabricated dates.
- **SEO intent:** "Oryx Institute events", "vocational training open day Windhoek".
- **Data source:** Events from `/content/events/` (empty initially).
- **Special:** Empty state is honest and helpful, not a dead end.

#### 3.1.20 `/contact`

- **Purpose:** Contact form and contact details.
- **Audience:** All audiences.
- **Primary CTA:** Submit contact form.
- **Secondary CTA:** View programmes.
- **Content sections:** Contact introduction, contact form (Name, Email, Subject, Message), alternative contact paths (phone, WhatsApp, email - all "To be confirmed" or supplied), contact form success state.
- **Proof required:** No fabricated phone number or address. Email may be a placeholder until supplied.
- **SEO intent:** "contact Oryx Institute".
- **Data source:** Form submission to `/api/submissions`.
- **Special:** Multiple enquiry paths (general, employer, WIL, corporate, research, funding) accessible from this page or linked from it.

#### 3.1.21 `/faq`

- **Purpose:** Frequently asked questions.
- **Audience:** All audiences.
- **Primary CTA:** Submit a question.
- **Secondary CTA:** Register Interest.
- **Content sections:** FAQ categories (About the Institute, Programmes, Admissions, RPL, WIL, Fees, Campus), question and answer pairs, "submit a question" form.
- **Proof required:** Factual answers. No fabricated details.
- **SEO intent:** "Oryx Institute FAQ", programme-specific FAQ queries.
- **Data source:** FAQ from `/content/faq/`. Structured data as `FAQPage`.
- **Special:** FAQ content drafted in Phase 2 (Content). Only questions that can be answered factually are included.

#### 3.1.22 `/brand`

- **Purpose:** Public brand book.
- **Audience:** Designers, partners, media, anyone seeking to understand the visual identity.
- **Primary CTA:** Register Interest.
- **Secondary CTA:** Contact.
- **Content sections:** Brand purpose, brand promise, brand personality, logo (primary and shield), logo rules (correct and incorrect use), colour palette with verified values and accessibility pairings, typography, photography treatment, motion principles, component principles, footer credit ("Made by Tangison Studio" linked to https://studio.tangison.com).
- **Proof required:** All brand facts from BRAND.md. No confidential internal rules.
- **SEO intent:** "Oryx Institute brand", "Oryx Institute identity".
- **Data source:** Static, derived from BRAND.md.
- **Special:** This is the public expression of BRAND.md. Confidential internal rules are excluded. Unlocked in demo mode alongside the homepage.

#### 3.1.23 `/privacy`

- **Purpose:** Privacy policy.
- **Audience:** All visitors.
- **Primary CTA:** None.
- **Content sections:** Privacy policy covering data collection (form submissions, analytics), data use, data retention, data sharing, user rights, contact for privacy enquiries.
- **Proof required:** Accurate description of actual data practices. No fabricated policy.
- **SEO intent:** "Oryx Institute privacy policy".
- **Data source:** Static.
- **Special:** Policy drafted in Phase 2 (Content) to match actual implementation.

#### 3.1.24 `/terms`

- **Purpose:** Terms of use.
- **Audience:** All visitors.
- **Primary CTA:** None.
- **Content sections:** Terms of use covering acceptable use, intellectual property (Oryx Institute brand and content), disclaimers (pre-launch status, no warranty), limitation of liability, governing law (Namibia), changes to terms, contact.
- **Proof required:** Accurate description. No fabricated legal entity until registration is verified.
- **SEO intent:** "Oryx Institute terms".
- **Data source:** Static.
- **Special:** Legal review recommended before production launch. Drafted in Phase 2 (Content).

#### 3.1.25 `/accessibility`

- **Purpose:** Accessibility statement.
- **Audience:** All visitors, especially those using assistive technologies.
- **Primary CTA:** Contact us.
- **Content sections:** Accessibility commitment (WCAG 2.2 AA), what we have done (verified colour contrast, keyboard navigation, screen reader support, reduced motion), known limitations, how to report an accessibility issue, contact for accessibility.
- **Proof required:** Accurate statement of actual accessibility features.
- **SEO intent:** "Oryx Institute accessibility".
- **Data source:** Static.
- **Special:** Statement must match actual implementation. Updated after audit.

#### 3.1.26 `/sitemap`

- **Purpose:** Human-readable sitemap.
- **Audience:** All visitors seeking to navigate the site.
- **Primary CTA:** None.
- **Content sections:** All public routes grouped by category (Institute, Schools and Programmes, Learning Pathways, Research and Advisory, Admissions, Updates, About, Legal).
- **Proof required:** Accurate route list.
- **SEO intent:** "Oryx Institute sitemap".
- **Data source:** Static, derived from route matrix.
- **Special:** This is the human-readable sitemap. `/sitemap.xml` is the machine-readable sitemap.

#### 3.1.27 `404`

- **Purpose:** Not found page.
- **Audience:** Visitors who reach a non-existent URL.
- **Primary CTA:** Go home.
- **Secondary CTA:** View sitemap.
- **Content sections:** Clear copy ("This page could not be found."), suggested destinations (home, programmes, register interest, contact), sitemap link.
- **Proof required:** None.
- **SEO intent:** None.
- **Data source:** Static.
- **Special:** No humour, no cutesy illustrations. Calm and helpful.

#### 3.1.28 `500`

- **Purpose:** Server error page.
- **Audience:** Visitors who encounter a server error.
- **Primary CTA:** Go home.
- **Secondary CTA:** Contact.
- **Content sections:** Clear copy ("Something went wrong. We have been notified."), suggested destinations, contact link.
- **Proof required:** None.
- **SEO intent:** None.
- **Data source:** Static.
- **Special:** No grovelling. Calm and helpful.

#### 3.1.29 `maintenance`

- **Purpose:** Maintenance page.
- **Audience:** All visitors during planned maintenance.
- **Primary CTA:** None.
- **Content sections:** Clear copy ("The website is undergoing planned maintenance."), expected restoration time when known, contact link for urgent enquiries.
- **Proof required:** None.
- **SEO intent:** None.
- **Data source:** Static.
- **Special:** Served by Vercel when the deployment is in maintenance mode.

#### 3.1.30 `offline`

- **Purpose:** Service worker offline page.
- **Audience:** Visitors who lose connectivity while browsing.
- **Primary CTA:** Try again.
- **Content sections:** Clear copy ("You appear to be offline."), explanation that previously visited pages may still be available, try again button.
- **Proof required:** None.
- **SEO intent:** None.
- **Data source:** Static, served by service worker.
- **Special:** Service worker caches the homepage, brand page, and offline page for offline access.

#### 3.1.31 `locked`

- **Purpose:** Locked demo preview state.
- **Audience:** Demo viewers (if user chooses locked demo mode).
- **Primary CTA:** Register Interest.
- **Content sections:** Clear copy ("This page is part of the planned Oryx Institute website. It will be unlocked when the institution is ready."), explanation of the planned content, register interest form.
- **Proof required:** None.
- **SEO intent:** None.
- **Data source:** Static.
- **Special:** Only used if user chooses locked demo mode. In full mode (current plan), this page is not used because all routes are unlocked with pre-launch content posture.

## 4. Image manifest

48 original images plus responsive crops. Each image generated separately. Manifest recorded in `scripts/image_manifest.json`. Photographic treatment per BRAND.md section 14.1.

### 4.1 Homepage images (12)

| # | Subject | Route | Section | Aspect ratio | Filename | Alt text | Status |
|---|---|---|---|---|---|---|---|
| 1 | Oryx standing alone on a dune at sunrise | / | Hero slide 1 | 16:9 | hero-1-oryx-dune.avif | An oryx stands alone on a Namibian dune at sunrise, with a wide pale sky above. | Planned |
| 2 | Sossusvlei-inspired dune field with uninterrupted negative sky | / | Hero slide 2 | 16:9 | hero-2-dune-field.avif | A wide dune field under a vast pale sky, with deep shadows on the sand. | Planned |
| 3 | Single camel-thorn tree in a dry Namibian landscape | / | Hero slide 3 | 16:9 | hero-3-camel-thorn.avif | A single camel-thorn tree stands in a dry Namibian landscape under soft morning light. | Planned |
| 4 | Quiet stone academic corridor lit by morning sunlight | / | Hero slide 4 | 16:9 | hero-4-stone-corridor.avif | A quiet stone corridor lit by morning sunlight, with long shadows on a polished floor. | Planned |
| 5 | Minimal classroom with warm plaster walls and dark wooden desks | / | Hero slide 5 | 16:9 | hero-5-classroom.avif | A minimal classroom with warm plaster walls and dark wooden desks, empty and quiet. | Planned |
| 6 | Open book on a sandstone desk | / | Institutional introduction | 3:2 | intro-book.avif | An open book rests on a sandstone desk in warm natural light. | Planned |
| 7 | Maroon notebook against cream plaster | / | Schools overview accent | 3:2 | schools-notebook.avif | A maroon notebook lies against a cream plaster wall in soft directional light. | Planned |
| 8 | Learner writing in a notebook, hands only | / | Learning pathways | 3:2 | pathway-writing.avif | A learner's hands write in a notebook with a pencil, in warm natural light. | Planned |
| 9 | Laptop on a minimal classroom desk | / | Learning pathways | 3:2 | pathway-laptop.avif | A laptop sits open on a minimal classroom desk in soft directional light. | Planned |
| 10 | Reception counter in warm natural light | / | Campus concept | 3:2 | campus-reception.avif | A reception counter in warm natural light, with a single maroon detail. | Planned |
| 11 | Namibian mountain landscape at dawn | / | Final registration section | 3:2 | final-mountains.avif | A Namibian mountain landscape at dawn, with soft warm light across the ridges. | Planned |
| 12 | Single graduation cap in maroon fabric | / | Final registration section accent | 3:2 | final-cap.avif | A single graduation cap in maroon fabric rests on a cream surface. | Planned |

### 4.2 Schools and programmes images (12)

| # | Subject | Route | Section | Aspect ratio | Filename | Alt text | Status |
|---|---|---|---|---|---|---|---|
| 13 | Safety helmet and inspection notebook | /schools/safety | School hero | 3:2 | school-safety-helmet.avif | A safety helmet and inspection notebook rest on a clean surface in warm light. | Planned |
| 14 | Reflective vest folded on a plain bench | /schools/safety | School detail | 3:2 | school-safety-vest.avif | A reflective vest is folded neatly on a plain wooden bench. | Planned |
| 15 | Office desk with organised files | /schools/administration-commerce | School hero | 3:2 | school-admin-desk.avif | An office desk with organised files and a closed laptop in soft natural light. | Planned |
| 16 | Reception bell on a stone counter | /schools/administration-commerce | School detail | 3:2 | school-admin-bell.avif | A reception bell rests on a stone counter in warm directional light. | Planned |
| 17 | Bookkeeping ledger and calculator | /schools/administration-commerce | Programme detail | 3:2 | programme-bookkeeping.avif | A bookkeeping ledger and calculator sit on a cream surface. | Planned |
| 18 | Retail counter with barcode scanner | /schools/administration-commerce | Programme detail | 3:2 | programme-retail.avif | A retail counter with a barcode scanner, in a quiet shop setting. | Planned |
| 19 | Tour guide studying a Namibian map | /schools/hospitality-tourism | School hero | 3:2 | school-hospitality-map.avif | A tour guide studies a Namibian map spread across a table, hands visible. | Planned |
| 20 | Camping tent being demonstrated in a clear open area | /schools/hospitality-tourism | Programme detail | 3:2 | programme-camping.avif | A camping tent is demonstrated in a clear open area under soft daylight. | Planned |
| 21 | Laptop repair tools arranged neatly | /schools/information-digital | School hero | 3:2 | school-digital-tools.avif | Laptop repair tools are arranged neatly on a clean surface. | Planned |
| 22 | Refurbished laptops in a classroom | /schools/information-digital | School detail | 3:2 | school-digital-laptops.avif | Refurbished laptops sit on classroom desks in warm natural light. | Planned |
| 23 | Small group discussion viewed naturally from the side | /schools/information-digital | Programme detail | 3:2 | programme-discussion.avif | A small group discusses around a table, viewed naturally from the side. | Planned |
| 24 | Trainer presenting at a whiteboard without visible text | /schools | Schools overview | 3:2 | schools-trainer.avif | A trainer presents at a whiteboard without visible text, viewed from the side. | Planned |

### 4.3 RPL and WIL images (8)

| # | Subject | Route | Section | Aspect ratio | Filename | Alt text | Status |
|---|---|---|---|---|---|---|---|
| 25 | Experienced worker assembling a portfolio | /rpl | Hero | 3:2 | rpl-portfolio.avif | An experienced worker assembles a portfolio of evidence on a desk, hands visible. | Planned |
| 26 | Assessor reviewing evidence at a desk | /rpl | Process section | 3:2 | rpl-assessor.avif | An assessor reviews evidence at a desk in warm natural light. | Planned |
| 27 | Workplace mentor speaking with a learner | /work-integrated-learning | Hero | 3:2 | wil-mentor.avif | A workplace mentor speaks with a learner in a professional setting, viewed from the side. | Planned |
| 28 | Learner entering a professional workplace | /work-integrated-learning | Process section | 3:2 | wil-entering.avif | A learner enters a professional workplace, viewed from behind. | Planned |
| 29 | Close-up of hands completing an assessment form | /work-integrated-learning | Assessment section | 3:2 | wil-assessment.avif | A close-up of hands completing an assessment form with a pen. | Planned |
| 30 | Work boots beside a notebook | /work-integrated-learning | Pathway accent | 3:2 | wil-boots.avif | Work boots rest beside a notebook on a cream surface. | Planned |
| 31 | Front-office learner at a real reception desk | /work-integrated-learning | Placement section | 3:2 | wil-reception.avif | A front-office learner works at a real reception desk, hands visible. | Planned |
| 32 | Employer and learner in a simple mentoring conversation | /work-integrated-learning | Benefits section | 3:2 | wil-conversation.avif | An employer and learner sit in a simple mentoring conversation, viewed from the side. | Planned |

### 4.4 Institute and campus images (8)

| # | Subject | Route | Section | Aspect ratio | Filename | Alt text | Status |
|---|---|---|---|---|---|---|---|
| 33 | Minimal Windhoek training-centre exterior concept | /campus | Hero | 3:2 | campus-exterior.avif | A minimal training-centre exterior concept with warm plaster walls and a native Namibian tree. | Planned |
| 34 | Flexible classroom set for lectures | /campus | Interior section | 3:2 | campus-classroom-lecture.avif | A flexible classroom set for lectures, with desks in rows and warm natural light. | Planned |
| 35 | Same classroom set for examinations | /campus | Interior section | 3:2 | campus-classroom-exam.avif | The same classroom reconfigured for examinations, with individual desks spaced apart. | Planned |
| 36 | Mobile laptop charging cabinet | /campus | Interior detail | 3:2 | campus-laptop-cabinet.avif | A mobile laptop charging cabinet in a corner of a classroom. | Planned |
| 37 | Small secure records office | /campus | Interior detail | 3:2 | campus-records.avif | A small secure records office with locked cabinets and a desk. | Planned |
| 38 | Cream reception with one maroon detail | /campus | Interior detail | 3:2 | campus-cream-reception.avif | A cream reception area with a single maroon detail on the wall. | Planned |
| 39 | Modular classroom exterior concept | /campus | Future section | 3:2 | campus-modular.avif | A modular classroom exterior concept showing future expansion potential. | Planned |
| 40 | Quiet courtyard with a native Namibian tree | /campus | Courtyard section | 3:2 | campus-courtyard.avif | A quiet courtyard with a native Namibian tree casting long shadows. | Planned |

### 4.5 Research, admissions and updates images (8)

| # | Subject | Route | Section | Aspect ratio | Filename | Alt text | Status |
|---|---|---|---|---|---|---|---|
| 41 | Research documents and pen on stone table | /research-advisory | Hero | 3:2 | research-documents.avif | Research documents and a pen rest on a stone table in warm directional light. | Planned |
| 42 | Interview recorder beside a notebook | /research-advisory | Methods section | 3:2 | research-recorder.avif | An interview recorder sits beside a notebook on a cream surface. | Planned |
| 43 | Small organisational workshop | /research-advisory | Advisory section | 3:2 | research-workshop.avif | A small organisational workshop in progress, viewed naturally from the side. | Planned |
| 44 | Application documents arranged neatly | /admissions | Hero | 3:2 | admissions-documents.avif | Application documents are arranged neatly on a cream surface. | Planned |
| 45 | Young Namibian applicant using a laptop | /admissions | Process section | 3:2 | admissions-applicant.avif | A young Namibian applicant uses a laptop, viewed naturally from the side. | Planned |
| 46 | Empty lecture space before an event | /events | Empty state accent | 3:2 | events-empty.avif | An empty lecture space before an event, with chairs arranged and soft natural light. | Planned |
| 47 | Institutional noticeboard without generated writing | /updates | Hero | 3:2 | updates-noticeboard.avif | An institutional noticeboard without readable text, in warm natural light. | Planned |
| 48 | Abstract close-up of Namibian stone and maroon fabric | / | Section accent | 3:2 | accent-stone-maroon.avif | An abstract close-up of Namibian stone with a fold of maroon fabric. | Planned |

### 4.6 Image generation rules

- Each image generated separately via the `image-generation` skill (z-ai-web-dev-sdk, available locally).
- Each prompt specifies one main subject, one controlled environment, generous negative space, the consistent photographic treatment (warm editorial realism, cream and sandstone cast, muted maroon accents, soft sepia undertone, strong but natural directional sunlight, minimal compositions, high-detail surfaces, no text, no logos, no fantasy architecture, no visibly artificial faces or hands).
- Each image is visually inspected after generation. Inconsistent results are rejected and regenerated with adjusted prompts.
- Each image is saved as AVIF primary, with WebP and JPEG fallbacks generated by Next.js Image.
- Responsive crops generated for mobile breakpoints where the original aspect ratio does not compose well at narrow widths.
- Original aspect ratios are never stretched or distorted.
- Manifest updated after each generation with status: `Planned`, `Generated`, `Inspected`, `Rejected`, `Regenerated`, `Approved`.

## 5. Sitemap

### 5.1 URL hierarchy

```
/
/coming-soon
/institute
/founder
/schools
  /schools/safety
  /schools/administration-and-commerce
  /schools/hospitality-and-tourism
  /schools/information-and-digital-skills
  /schools/future-schools
/programmes
  /programmes/[programme-slug]
/rpl
/work-integrated-learning
/research-advisory
/employer-training
/campus
/admissions
/fees-and-funding
/register-interest
/updates
  /updates/[slug]
/events
/contact
/faq
/brand
/privacy
/terms
/accessibility
/sitemap
404 (no URL, error page)
500 (no URL, error page)
maintenance (no URL, error page)
offline (no URL, service worker)
```

### 5.2 Machine-readable sitemap

`app/sitemap.ts` generates `/sitemap.xml` with all public routes. Pre-launch: sitemap includes all routes but `robots.txt` disallows indexing until authorised. Production: sitemap is submitted to Google Search Console and Bing Webmaster Tools when the domain is verified.

### 5.3 robots.txt

`app/robots.ts` generates `/robots.txt`:

```
# Pre-launch
User-agent: *
Disallow: /

Sitemap: https://www.oryxinstitute.na/sitemap.xml
```

When indexing is authorised, this becomes:

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.oryxinstitute.na/sitemap.xml
```

## 6. Component plan

Reusable editorial components. Each component is implemented once and composed across pages. Components are designed to avoid identical card grids and template repetition.

### 6.1 Layout components

| Component | Purpose | Used on |
|---|---|---|
| `RootLayout` | HTML root, fonts, metadata, skip link, navigation, footer | All pages |
| `FloatingNavigation` | Floating cream nav bar with logo, Register Interest, two-line menu icon | All pages |
| `OpenMenu` | Full-screen editorial menu composition | All pages (overlay) |
| `Footer` | Footer with logo, navigation, contact placeholders, social links, legal links, Tangison Studio credit | All pages |
| `TangisonCredit` | "Made by Tangison Studio" linked to https://studio.tangison.com | All pages (in footer) |

### 6.2 Hero components

| Component | Purpose | Used on |
|---|---|---|
| `HeroSlider` | Full-viewport background slider with 5 images, manual controls, visible slide position, pause, reduced-motion support | / |
| `HeroFull` | Full-viewport single hero with image background and short copy | /coming-soon, /institute, /schools, /rpl, /work-integrated-learning, /research-advisory, /employer-training, /campus, /admissions, /fees-and-funding, /register-interest, /updates, /events, /contact, /faq, /brand |
| `HeroSplit` | 7/5 or 5/7 split hero with image and text | /founder, /schools/[slug], /programmes/[slug], /updates/[slug] |

### 6.3 Section components

| Component | Purpose | Used on |
|---|---|---|
| `InstitutionalIntroduction` | Single image and 40-60 word institutional introduction | / |
| `SchoolsOverview` | Large editorial image panels for each school | /, /schools |
| `LearningPathways` | Horizontal visual story of 5 pathways | / |
| `FeaturedProgrammes` | Editorial programme browser with filters | / |
| `CampusConcept` | Campus concept presentation with captioned architectural images | /, /campus |
| `ResearchAdvisory` | Research and advisory introduction | /, /research-advisory |
| `UpdatesFeed` | Establishment updates feed with empty state | /, /updates |
| `FinalRegistrationSection` | Single image, short invitation, programme-interest form | / |
| `MailingListSignup` | Inline mailing list form | /coming-soon, /updates, /events |

### 6.4 Content components

| Component | Purpose | Used on |
|---|---|---|
| `EditorialImage` | Single image with optional caption | All content pages |
| `EditorialQuote` | Pull quote in display serif | /institute, /brand |
| `StatBlock` | Verified fact display (no fabricated metrics) | /institute (only if verified facts supplied) |
| `ProseSection` | Long-form text section with optional images | /institute, /rpl, /work-integrated-learning, /research-advisory, /admissions, /fees-and-funding, /brand |
| `ProgrammeCard` | Single programme summary in programme browser | /programmes, /schools/[slug] |
| `ProgrammeDetail` | Full programme detail with all required fields | /programmes/[slug] |
| `UpdateCard` | Single update summary in feed | /updates |
| `EventCard` | Single event summary (empty state in pre-launch) | /events |
| `FAQAccordion` | Accordion of question and answer pairs | /faq |
| `BrandColourSwatch` | Colour swatch with name, hex, RGB, and pairing | /brand |
| `LogoShowcase` | Primary logo and shield icon with rules | /brand |

### 6.5 Form components

| Component | Purpose | Used on |
|---|---|---|
| `RegisterInterestForm` | Primary register interest form with all required fields | /, /register-interest, /programmes/[slug], /schools/[slug] |
| `MailingListForm` | Lightweight mailing list form | /coming-soon, /updates, /events |
| `ContactForm` | General contact form | /contact |
| `EmployerEnquiryForm` | Employer enquiry form | /employer-training, /contact |
| `WILEnquiryForm` | WIL partner enquiry form | /work-integrated-learning, /contact |
| `CorporateTrainingEnquiryForm` | Corporate training enquiry form | /employer-training, /contact |
| `ResearchAdvisoryEnquiryForm` | Research and advisory enquiry form | /research-advisory, /contact |
| `FundingPartnershipEnquiryForm` | Funding and institutional partnership enquiry form | /fees-and-funding, /contact |
| `FormFields` | Shared input, label, helper, error components | All forms |
| `FormSubmit` | Primary button with loading, success, error states | All forms |

### 6.6 State components

| Component | Purpose | Used on |
|---|---|---|
| `LoadingState` | Skeleton screen in Sand | All dynamic content |
| `EmptyState` | Clear empty-state copy with next action | /updates, /events, /programmes (no results) |
| `SuccessState` | Inline confirmation with next steps | All forms |
| `ErrorState` | Inline error with retry | All forms |
| `OfflineState` | Service worker offline page | /offline |
| `MaintenanceState` | Maintenance page | /maintenance |
| `LockedDemoState` | Locked demo preview (if used) | /locked |

### 6.7 System pages

| Component | Purpose | Used on |
|---|---|---|
| `NotFoundPage` | 404 page | 404 |
| `ServerErrorPage` | 500 page | 500 |
| `MaintenancePage` | Maintenance page | /maintenance |
| `OfflinePage` | Offline page | /offline |

## 7. Content model

Typed TypeScript data structures. CMS-ready: each model can be migrated to a headless CMS by changing the data loader.

### 7.1 School

```typescript
type School = {
  slug: string;
  name: string;
  shortDescription: string;
  heroImage: string;
  heroImageAlt: string;
  overview: string;
  plannedProgrammes: string[];
  careerPathways: string[];
  rplSuitability: string;
  wilOpportunities: string;
  status: 'planned' | 'subject_to_approval';
  imageGallery: Array<{
    src: string;
    alt: string;
    caption: string;
    isArchitecturalConcept: boolean;
  }>;
};
```

### 7.2 Programme

```typescript
type Programme = {
  slug: string;
  name: string;
  schoolSlug: string;
  shortDescription: string;
  overview: string;
  plannedLevel: string | 'To be confirmed';
  entryRequirements: string | 'To be confirmed';
  learningOutcomes: string[];
  deliveryFormat: 'classroom' | 'blended' | 'workplace' | 'online' | 'To be confirmed';
  duration: string | 'To be confirmed';
  assessmentApproach: string;
  rplSuitability: string;
  wilComponent: string;
  fees: 'To be confirmed' | string;
  intakeDate: 'To be confirmed' | string;
  approvalStatus: 'planned' | 'subject_to_approval';
  image: string;
  imageAlt: string;
};
```

### 7.3 Update

```typescript
type Update = {
  slug: string;
  title: string;
  date: string | null;
  category: 'announcement' | 'programme_update' | 'public_notice' | 'event';
  excerpt: string;
  body: string;
  image?: string;
  imageAlt?: string;
};
```

### 7.4 Event

```typescript
type Event = {
  slug: string;
  title: string;
  date: string;
  location: string | 'To be confirmed';
  excerpt: string;
  body: string;
  image?: string;
  imageAlt?: string;
  registrationRequired: boolean;
};
```

### 7.5 FAQ

```typescript
type FAQ = {
  slug: string;
  category: 'about' | 'programmes' | 'admissions' | 'rpl' | 'wil' | 'fees' | 'campus';
  question: string;
  answer: string;
};
```

### 7.6 Submission

```typescript
type Submission = {
  id: string;
  type: 'register_interest' | 'mailing_list' | 'contact' | 'employer_enquiry' | 'wil_enquiry' | 'corporate_training_enquiry' | 'research_advisory_enquiry' | 'funding_partnership_enquiry';
  timestamp: string;
  data: {
    name?: string;
    email?: string;
    telephone?: string;
    region?: string;
    programmeOfInterest?: string;
    currentEducationLevel?: string;
    employmentStatus?: string;
    interestInRPL?: boolean;
    preferredStudySchedule?: string;
    consentToReceiveUpdates?: boolean;
    subject?: string;
    message?: string;
    organisation?: string;
    role?: string;
  };
  status: 'pending' | 'reviewed' | 'contacted' | 'closed';
};
```

## 8. User journeys

Critical journeys mapped end-to-end. Each defines entry, intent, information, decision points, errors, empty states, conversion, confirmation, follow-up, and analytics.

### 8.1 Register Interest journey

- **Entry:** Homepage hero "Register Interest" button, or any CTA across the site, or direct visit to `/register-interest`.
- **Intent:** Prospective learner expresses interest in a programme.
- **Information:** Form fields per section 3.1.16.
- **Decision points:** Programme selection, RPL interest yes/no, consent to receive updates.
- **Errors:** Validation failures (missing required fields, invalid email, invalid phone). Server failure. Timeout.
- **Empty states:** Programme select shows "Select a programme" placeholder.
- **Conversion:** Form submission persisted locally. Success state replaces form.
- **Confirmation:** Inline confirmation "Your interest has been recorded. We will be in touch when admissions open." Aria-live announcement.
- **Follow-up:** Email confirmation not sent in pre-launch (no email service). Mailing list signup suggested.
- **Analytics:** `register_interest_submit` event with programme property.

### 8.2 Programme browsing journey

- **Entry:** Homepage "Featured planned programmes" section, or "Programmes" in the main menu, or direct visit to `/programmes`.
- **Intent:** Visitor explores planned programmes.
- **Information:** Filter options (school, level, delivery format, status). Programme cards with name, school, level, status.
- **Decision points:** Filter selection. Programme selection.
- **Errors:** No errors.
- **Empty states:** "No programmes match your filters. Try adjusting or clearing filters."
- **Conversion:** Click on programme card to view detail page.
- **Confirmation:** Programme detail page renders.
- **Follow-up:** Register Interest CTA on programme detail page.
- **Analytics:** `programme_filter` event with filter properties. `programme_view` event with programme slug.

### 8.3 Employer enquiry journey

- **Entry:** Homepage footer, main menu, or `/employer-training` page.
- **Intent:** Employer seeks training or placement partnership.
- **Information:** Employer enquiry form (organisation, contact name, email, phone, training need, timeline).
- **Decision points:** Training need selection. Timeline selection.
- **Errors:** Validation failures. Server failure.
- **Empty states:** None.
- **Conversion:** Form submission persisted locally.
- **Confirmation:** Inline confirmation. Aria-live announcement.
- **Follow-up:** Email confirmation not sent in pre-launch.
- **Analytics:** `employer_enquiry_submit` event.

### 8.4 Navigation journey (open menu)

- **Entry:** Click or keyboard activation of the two-line menu icon in the floating navigation.
- **Intent:** Visitor explores the site structure.
- **Information:** Full-screen editorial menu with all main routes, featured photograph, pre-launch notice.
- **Decision points:** Route selection.
- **Errors:** None.
- **Empty states:** None.
- **Conversion:** Click or keyboard activation of a route.
- **Confirmation:** Menu closes. Route renders.
- **Follow-up:** None.
- **Analytics:** `menu_open` event. `menu_close` event. `route_visit` event on route render.

### 8.5 404 journey

- **Entry:** Visitor reaches a non-existent URL.
- **Intent:** Visitor seeks to recover and continue.
- **Information:** Clear copy, suggested destinations.
- **Decision points:** Destination selection.
- **Errors:** None.
- **Empty states:** None.
- **Conversion:** Click on suggested destination.
- **Confirmation:** Destination renders.
- **Follow-up:** None.
- **Analytics:** `route_visit` event with `404` property.

## 9. Demo locks

The user's brief says "build all approved routes" with pre-launch content posture. This is full mode, not locked demo mode. All 27 routes are unlocked with pre-launch content (no dates, no fees, no accreditation claims, "To be confirmed" for unknown fields, empty states for updates and events).

If the user later chooses locked demo mode for client presentation, the locks would be:

- **Unlocked:** `/`, `/brand`, `/coming-soon`, all legal pages (`/privacy`, `/terms`, `/accessibility`), all error pages.
- **Locked:** All other routes display the `LockedDemoState` component with a clear preview message and Register Interest CTA.

Current plan: full mode with pre-launch content posture.

## 10. Integrations

### 10.1 Confirmed integrations

- **Next.js Image** for image optimisation.
- **next/font** for font loading.
- **Tailwind CSS v4** for styling.
- **Zod** for form validation.
- **react-hook-form** for form state.
- **Vitest** for unit and component tests.
- **Playwright** for end-to-end tests.
- **axe-core** for accessibility testing (needs installation approval).
- **pa11y** for accessibility testing (needs installation approval).
- **Lighthouse** for performance testing (needs installation approval).

### 10.2 Pending integrations

- **GitHub** for version control and deployment (needs `gh` CLI and user account).
- **Vercel** for deployment (needs `vercel` CLI and user account).
- **Vercel KV** or **Resend** for production form persistence (local JSON file in pre-launch).
- **Vercel Analytics** or **Plausible** for analytics (none in pre-launch).
- **Gitleaks** for secret scanning (needs installation approval).

### 10.3 Prohibited integrations

- No third-party analytics (Google Analytics, Mixpanel, Amplitude) unless explicitly authorised.
- No third-party form services (Typeform, JotForm) unless explicitly authorised.
- No third-party live chat (Intercom, Drift, Crisp) unless explicitly authorised.
- No third-party cookie banners (OneTrust, Cookiebot) unless explicitly authorised. The site does not use non-essential cookies in pre-launch.
- No third-party payment services (Stripe, PayPal) in pre-launch.

## 11. SEO

Per section 2.7. Specific SEO targets:

- **Pre-launch:** `robots.txt` disallows indexing. Sitemap is generated but not submitted to search engines.
- **Production launch:** `robots.txt` allows indexing. Sitemap submitted to Google Search Console and Bing Webmaster Tools. Canonical URLs verified. Open Graph images verified. Structured data verified.
- **Target keywords:** "Oryx Institute", "vocational training Namibia", "Windhoek training institution", programme-specific keywords. No keyword stuffing.
- **Content depth:** Each page has substantial, original content. No thin pages.
- **Internal linking:** Every page links to relevant pages. No orphan pages.
- **External linking:** No external links in pre-launch unless authorised.

## 12. Analytics

Per section 2.6. Specific analytics events:

| Event | Trigger | Properties |
|---|---|---|
| `route_visit` | Page view | `path`, `referrer` |
| `hero_slide_change` | Hero slider auto-advances or manual control | `slide_index`, `method` (auto, manual) |
| `hero_pause` | User pauses hero slider | none |
| `menu_open` | User opens the full-screen menu | none |
| `menu_close` | User closes the full-screen menu | `method` (escape, route_click, backdrop_click) |
| `programme_view` | User views a programme detail page | `programme_slug` |
| `programme_filter` | User applies a filter on the programmes page | `filter_type`, `filter_value` |
| `register_interest_submit` | User submits the register interest form | `programme_slug`, `interest_in_rpl` |
| `mailing_list_submit` | User submits the mailing list form | none |
| `employer_enquiry_submit` | User submits an employer enquiry | none |
| `wil_enquiry_submit` | User submits a WIL enquiry | none |
| `corporate_training_enquiry_submit` | User submits a corporate training enquiry | none |
| `research_advisory_enquiry_submit` | User submits a research and advisory enquiry | none |
| `funding_partnership_enquiry_submit` | User submits a funding partnership enquiry | none |

No personally identifiable information in analytics events. No tracking of individual users.

## 13. Security

Per section 2.11. Specific security measures:

- All secrets in environment variables. `.env` is gitignored.
- `.env.example` documents required variables without values.
- Content Security Policy configured via Next.js `headers()`.
- HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy headers.
- Honeypot field on all forms.
- Rate limiting on form submission API routes (when deployed to Vercel).
- Gitleaks scan before every commit (needs installation approval).
- No secrets in client code.
- No personally identifiable information in analytics.
- No third-party tracking scripts.
- HTTPS enforced by Vercel.
- Form submissions persisted locally in pre-launch. No external data transmission.

## 14. Deployment

### 14.1 Pre-launch (current phase)

- Local development only.
- No deployment.
- User instruction: "Do not deploy until instructed."

### 14.2 Demo deployment (Phase 5)

- GitHub repository prepared safely (private repository, no secrets in git history).
- Vercel preview connected to the GitHub repository.
- Demo subdomain attached (e.g. `oryx-preview.vercel.app` or a custom subdomain supplied by the user).
- Indexing disabled (`robots.txt` disallows all).
- Form submissions in test mode (local JSON file or Vercel KV test namespace).
- Only approved routes unlocked (full mode in current plan).
- Live smoke audit completed.

### 14.3 Production deployment (Phase 7)

- Run `tangison-web-deploy` against the exact audited commit.
- Verify domain connection (e.g. `oryxinstitute.na` or user-supplied domain).
- Verify TLS certificate.
- Verify redirects (www to non-www or vice versa, HTTP to HTTPS).
- Verify form submissions (production persistence, email notifications when authorised).
- Verify analytics (when authorised).
- Verify consent mechanism (when analytics are enabled).
- Verify indexing (`robots.txt` allows indexing, sitemap submitted).
- Verify sitemap, metadata, structured data.
- Verify integrations.
- Verify rollback path (previous deployment retained for instant rollback).
- Live audit (Phase 8).

### 14.4 DNS

- Connect only the exact approved subdomain.
- Preserve unrelated DNS records.
- Verify TLS and redirects.
- Retain rollback path.

## 15. Milestones

| # | Milestone | Phase | Exit criteria |
|---|---|---|---|
| M0 | Workspace inspected, skills verified, plan deliverables drafted | 0, 1 | This document set approved by user. |
| M1 | External skills and CLI tools installed with proof | 0 | All installations verified in PROOF.md. |
| M2 | Content plan and exact page copy produced | 2 | `CONTENT_PLAN.md` approved by user. |
| M3 | Next.js project scaffolded, brand tokens configured, fonts loaded, navigation and footer built | 3 | Development server runs. Homepage skeleton renders. Type check and lint pass. |
| M4 | All 48 images generated, inspected, approved | 3 | Image manifest shows all 48 images as `Approved`. |
| M5 | All 27 routes built with content and components | 3 | Every route renders correctly at mobile, tablet, desktop. Type check, lint, and tests pass. |
| M6 | All forms functional with local persistence | 3 | Form submissions persist to `/data/submissions.json`. Success and error states render correctly. |
| M7 | SEO, accessibility, performance verified | 4 | Lighthouse 95+ desktop, 90+ mobile. axe-core 0 violations. Pa11y 0 errors. All WCAG 2.2 AA verified. |
| M8 | Demo deployment to Vercel preview | 5 | Preview URL live. Smoke audit passed. User approval recorded. |
| M9 | Production deployment | 7 | Production domain live. All verifications passed. |
| M10 | Live audit | 8 | Live audit passed. No P0 issues. All P1 issues fixed or accepted. |

## 16. Audit targets

| Audit | Tool | Target | Notes |
|---|---|---|---|
| Type check | `tsc --noEmit` | 0 errors | Strict mode. |
| Lint | `eslint` | 0 errors, 0 warnings | Next.js recommended config + strict TypeScript rules. |
| Unit tests | `vitest` | 100% pass | All utility functions, schemas, data loaders. |
| Component tests | `vitest` + React Testing Library | 100% pass | All interactive components. |
| End-to-end tests | `playwright` | 100% pass | All critical journeys. |
| Accessibility | `axe-core` | 0 violations | WCAG 2.2 AA. |
| Accessibility | `pa11y` | 0 errors | Second check. |
| Performance | `lighthouse` | 95+ desktop, 90+ mobile | Performance score. |
| Core Web Vitals | `lighthouse` | LCP < 2.5s, INP < 200ms, CLS < 0.1 | Field data when deployed. |
| Security | `gitleaks` | 0 secrets | All commits. |
| Dependency audit | `pnpm audit` | 0 high/critical vulnerabilities | On every install. |
| Visual regression | Playwright screenshots | All representative pages match baseline | Mobile and desktop. |
| Manual journey check | Human | All critical journeys pass | Documented in PROOF.md. |
| Responsive inspection | Human + Playwright | All pages render correctly at 375, 768, 1024, 1440 px | Documented in PROOF.md. |
| Content comparison | Human | All copy matches approved CONTENT_PLAN.md | Documented in PROOF.md. |

## 17. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Image generation produces inconsistent results | High | Medium | Generate in small batches. Inspect each. Reject and regenerate inconsistent results. Adjust prompts based on observed failures. |
| R2 | Image generation produces visibly artificial faces or hands | High | High | Compose prompts to show hands only or no person. Reject any image with artificial faces. |
| R3 | Brand colour rendering varies across browsers and devices | Medium | Low | Use verified hex values. Test on multiple browsers and devices. AVIF format preserves colour accurately. |
| R4 | Form submissions are lost in pre-launch | Low | Medium | Persist to local JSON file with audit log. Backup before any deployment. Swap to Vercel KV for production. |
| R5 | Performance targets not met on slow Namibian connections | Medium | High | Optimise images aggressively. Minimise JavaScript. Use static generation. Test on simulated 3G connection. |
| R6 | Accessibility targets not met | Low | High | Test with axe-core and pa11y throughout development. Manual keyboard and screen reader testing. WCAG 2.2 AA verified before audit. |
| R7 | Founder copy is too minimal and feels incomplete | Medium | Low | Accept this risk. Brief explicitly says "put very little about him". Founder page links to contact for serious enquiries. |
| R8 | Pre-launch content posture is misread as the institution not being serious | Medium | Medium | Use "Coming Soon" as an elegant status statement, not a dead page. Substantial content on every other page demonstrates seriousness. |
| R9 | External skills (superpowers, ponytail, impeccable, taste-skill) installation fails | Low | Medium | Verify each repo before installation. Use `git clone --depth 1` as fallback. Record proof in PROOF.md. |
| R10 | Vercel deployment fails or preview subdomain is unavailable | Low | High | Use Vercel CLI directly. Try alternative subdomain. Roll back to previous deployment. |
| R11 | User does not supply verified facts (fees, intake date, accreditation) before production launch | High | Medium | Pre-launch content posture handles this gracefully. All unknown fields display "To be confirmed". Production launch can proceed with pre-launch posture if user authorises. |
| R12 | Scope creep: user adds new routes, new programmes, new features mid-build | Medium | Medium | Update PRODUCT.md, BRAND.md, BUILD_PLAN.md, CONTENT_PLAN.md before implementing. Re-run audit after changes. |
| R13 | Image generation skill is unavailable or rate-limited | Low | High | Use `image-generation` skill (z-ai-web-dev-sdk, available locally). If unavailable, fall back to manual image sourcing or delay image generation until available. |

## 18. Acceptance criteria

The Phase 1 plan is accepted when:

1. `PRODUCT.md`, `BRAND.md`, `BUILD_PLAN.md`, and `PROOF.md` are complete and internally consistent.
2. The user explicitly approves the four documents.
3. The user explicitly approves the stack: Next.js 16, TypeScript, Tailwind CSS v4, no component library, no database in pre-launch, Vercel deployment.
4. The user explicitly approves the route matrix (27 routes plus system pages).
5. The user explicitly approves the image manifest (48 original images).
6. The user explicitly approves the typography pairing (Fraunces + Inter) or supplies an alternative.
7. The user explicitly approves the install list for external skills and CLI tools.
8. The user explicitly decides on Hallmark (install `nutlope/hallmark` or omit).
9. The user explicitly decides on Squirrelscan (install or omit).
10. The user explicitly decides on demo mode (locked demo or full mode with pre-launch content posture).

## 19. Human approval points

The following decisions require explicit user approval before proceeding:

| # | Decision | When |
|---|---|---|
| A1 | Approve PRODUCT.md, BRAND.md, BUILD_PLAN.md, PROOF.md | Now (Phase 1 gate) |
| A2 | Approve typography pairing (Fraunces + Inter or alternative) | Now (Phase 1 gate) |
| A3 | Approve installation of external skills (superpowers, ponytail, impeccable, taste-skill/design-taste-frontend) | Now (Phase 1 gate) |
| A4 | Approve installation of global CLI tools (pnpm, gh, vercel, gitleaks) | Now (Phase 1 gate) |
| A5 | Approve installation of project-local devDependencies (axe-core, pa11y, lighthouse) | Now (Phase 1 gate) |
| A6 | Decide on Hallmark (install nutlope/hallmark or omit) | Now (Phase 1 gate) |
| A7 | Decide on Squirrelscan (install or omit) | Now (Phase 1 gate) |
| A8 | Decide on demo mode (locked demo or full mode) | Now (Phase 1 gate) |
| A9 | Approve CONTENT_PLAN.md | Phase 2 gate |
| A10 | Approve all 48 generated images | Phase 3 gate (after image generation) |
| A11 | Approve all route builds | Phase 3 gate (after build) |
| A12 | Approve audit results | Phase 4 gate |
| A13 | Approve demo deployment | Phase 5 gate |
| A14 | Approve production deployment | Phase 7 gate |
| A15 | Approve live audit | Phase 8 gate |

## 20. Confirmed

These items are confirmed by the user:

- Institution: Oryx Institute, multidisciplinary vocational education and training institution being established in Windhoek, Namibia.
- Founder: Tangi Iigonda. Minimal copy on /founder page.
- Brand direction: Namibian, quietly prestigious, academic but contemporary, minimal, warm, architectural.
- Brand colours: cream, sand, stone, black, deep Oryx maroon. Canonical Oryx Maroon `#721220` verified from supplied assets.
- Logo: Original transparent PNG. Never redrawn, regenerated, reinterpreted, cropped incorrectly, distorted, recoloured, or placed under effects. Never inserted into generated images. Never used as a watermark.
- Pre-launch content posture: No dates, no fees, no accreditation claims, no registration number, no campus address, no partnerships, no learner numbers.
- 27 routes plus system pages: full route matrix per section 3.
- 48 original images: full image manifest per section 4.
- Footer credit: "Made by Tangison Studio" linked to https://studio.tangison.com on every public page.
- Deployment: "Do not deploy until instructed."
- Working method: Webman workflow (Plan, Content, Brand definition, Creation, Audit, Fixes, Re-audit, Demo deployment, Client approval, Production deployment, Live audit).
- Plan artefacts: PRODUCT.md, BRAND.md, BUILD_PLAN.md, CONTENT_PLAN.md, PROOF.md.
- Hallmark: Do not install or invoke until user provides exact primary repository and install name. (Verified source: `https://github.com/Nutlope/hallmark`, install `npx skills add nutlope/hallmark`. User authorisation still pending.)
- Full-output enforcement: No placeholders, no truncation, no "for brevity", no skeleton code. Every deliverable complete.
- Reject generic AI design: No purple gradients, no glassmorphism, no excessive cards, no pills, no generic startup illustrations, no blobs, no decorative dashboards, no fake metrics, no staged stock photographs, no mortarboard cliches, no pyramids, no generated text in images, no oversized maroon blocks, no em dashes, no generic AI language.
- Prohibited words: world-class, revolutionary, cutting edge, unlock, game changing, seamless, unwavering commitment, next generation.

## 21. Assumptions

These items are assumed in the absence of explicit user instruction. Each is flagged for confirmation at the Phase 1 approval gate:

- The website is greenfield. No existing project stack to preserve.
- Next.js 16 with App Router is the appropriate stack.
- Tailwind CSS v4 with brand tokens as CSS custom properties is the appropriate styling system.
- No component library (shadcn/ui, Astryx).
- No database in pre-launch. Local JSON file persistence marked as mock.
- No analytics in pre-launch unless user authorises.
- No authentication in pre-launch.
- Founder page contains minimal copy: name, role, single short paragraph.
- Programme pages display "To be confirmed" for every unknown field.
- Campus page clearly labels all imagery as architectural concept.
- Updates feed starts empty with a clear empty state.
- Tangison Studio footer credit is present on every public page.
- Typography pairing: Fraunces (display) + Inter (body). Pending user confirmation.
- Image generation: z-ai-web-dev-sdk image-generation skill, available locally.
- Persistence: local JSON file marked as mock for pre-launch.
- Analytics: none in pre-launch. Vercel Analytics as default when authorised.
- Demo mode: full mode with pre-launch content posture (not locked demo).
- Production domain: `oryxinstitute.na` (assumed; pending user confirmation).
- Repository: private GitHub repository (owner pending user confirmation).

## 22. Needs confirmation

These items need explicit user confirmation before Phase 3 (Create):

1. Approve PRODUCT.md, BRAND.md, BUILD_PLAN.md, PROOF.md.
2. Approve typography pairing: Fraunces (display) + Inter (body), or supply alternative.
3. Approve installation of: superpowers, ponytail, impeccable, taste-skill (design-taste-frontend), pnpm, gh, vercel, gitleaks, axe-core, pa11y, lighthouse.
4. Decide on Hallmark: install `nutlope/hallmark` (verified primary source) or omit.
5. Decide on Squirrelscan: install or omit.
6. Confirm demo mode: full mode with pre-launch content posture (recommended) or locked demo.
7. Confirm production domain (e.g. `oryxinstitute.na` or alternative).
8. Confirm GitHub repository owner and visibility.
9. Confirm Vercel team and project name.
10. Confirm email service for production form submissions (Resend, Postmark, or alternative).
11. Confirm analytics provider (Vercel Analytics, Plausible, Fathom, or none).
12. Supply or omit: campus address, accreditation status, programme fees, intake date, partner organisations.
13. Supply or omit: founder photograph for /founder page.
14. Supply or omit: social media links for footer.
15. Supply or omit: contact phone number and email for /contact page.

## 23. Approval gate

I will not begin Phase 2 (Content) or Phase 3 (Create) until the user explicitly approves:

- This BUILD_PLAN.md.
- PRODUCT.md.
- BRAND.md.
- The stack choice (Next.js 16, TypeScript, Tailwind CSS v4, no component library, no database in pre-launch, Vercel deployment).
- The route and state matrix (27 routes plus system pages).
- The image manifest (48 original images).
- The typography pairing (Fraunces + Inter or alternative).
- The install list for external skills and CLI tools.
- Decisions on Hallmark and Squirrelscan.
- Demo mode decision (full mode recommended).

Approval can be given as "approved, proceed to Phase 2" or with specific amendments.

---

**Status:** Draft, awaiting user approval.
**Phase:** 1 (Plan).
**Next specialist skill:** tangison-web-content (Phase 2), pending approval.
