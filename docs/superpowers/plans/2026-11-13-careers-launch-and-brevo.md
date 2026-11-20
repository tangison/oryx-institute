# Careers launch and recruitment-email plan

## Status and approved launch decisions

This plan records the public-web launch decisions confirmed on 13 November 2026.

| Decision | Confirmed approach |
| --- | --- |
| Initial public state | Publish a **Recruitment opens soon** page. Do not publish live vacancies or accept applications yet. |
| Public recruitment mailbox | `vacancies@oryxinstitute.org` is the primary address. |
| CV submission when recruitment opens | Candidates email their CV directly to the recruitment mailbox. No website CV upload in the first release. |
| Brevo data use | Transactional only. Applicants are **not** added to a Brevo marketing or contact list. |

The supplied hiring artwork is a creative and planning reference only. It must not be published unchanged while it says “Open positions”, invites CVs, includes a QR code, and contains `[DATE TO CONFIRM]`.

## Scope and public-status boundary

The public page will be a bilingual route:

- English: `/careers`
- Afrikaans: `/af/careers`

It will state only that recruitment information for Oryx’s planned work in Ongwediva will be published when the recruitment process opens. It may name **Ongwediva** as the broad location. It must not claim an open campus, current teaching, registration, accreditation, active courses, programme approvals, assessment delivery, learner intake, fees, or a confirmed opening date.

The page will not publish the four roles from the artwork until each role has an approved job specification and closing date. The roles currently held as draft recruitment material are:

1. Centre Manager
2. Independent Moderator
3. Lead Instructor
4. Learner Records Administrator

The Visit Namibia directory extract supplied by the user supports internal location research for Untag Guest House at Omatando Village on the Okatana–Onamutyi Road. It does not make its listed telephone number or Namibia Tourism email an Oryx contact. Do not publish a street-level location on the careers page without a separate explicit instruction.

## Release 1: public recruitment-comes-soon page

### Page content

1. A clear careers heading and short bilingual explanation that recruitment details are being prepared.
2. Ongwediva as the public location reference, without a property address.
3. A promise to publish each role’s requirements, duties, application method and closing date when the recruitment process opens.
4. A link to the existing institutional-status page so visitors can understand the current public status accurately.
5. A link to the privacy page.
6. No application form, no email-CV call to action, no closing date, no QR code, no vacancy titles or unapproved hiring claims.

### Site integration

1. Add the page to route metadata, English/Afrikaans alternates, the sitemap, markdown shelf and search index.
2. Add a restrained Careers link to the footer/menu structure; do not add a new pill-shaped action.
3. Create a square/landscape careers social asset only after the page wording is approved. The supplied portrait artwork may inform the design but is not an Open Graph image as-is.
4. Keep the route indexable because the selected state is a public announcement page, not a private draft.
5. Update machine-readable site material only once the page is live and its public wording is settled.

### Release-1 acceptance criteria

- Both language routes return `200`, have correct canonical and hreflang metadata, and contain one `h1`.
- The page does not contain `apply`, `send your CV`, `open positions`, a date placeholder, or a claim that recruitment is open.
- No user data is collected; the present privacy policy remains accurate for this release.
- `npm run lint`, `npm run build`, sitemap/link checks and a rendered-page inspection pass.

## Mailbox setup: required external work

Brevo is an outbound transactional-email service. It does **not** create or operate an inbound mailbox for `vacancies@oryxinstitute.org`.

An organisation administrator must first create the real mailbox with the chosen mail provider (for example, the organisation’s existing Microsoft 365, Google Workspace or other managed domain-email provider). The mailbox setup checklist is:

1. Create `vacancies@oryxinstitute.org` as a mailbox, not merely an unmonitored alias.
2. Name at least two authorised mailbox owners/reviewers and use individual accounts rather than a shared password.
3. Enable multi-factor authentication for every reviewer.
4. Configure mailbox storage, access removal and a documented recruitment-data retention/deletion procedure.
5. Configure the provider’s MX, SPF and DKIM records. Add DMARC only with an approved monitoring/enforcement plan.
6. Test incoming mail, attachments, mobile access, reply behaviour and access for each authorised reviewer.
7. Decide whether the mailbox provider should send an automatic receipt once recruitment is live. This is the appropriate way to acknowledge a CV sent directly by email.

The mailbox address must not be placed on the careers page until it is created, monitored and tested.

## Brevo setup: prepare now, activate only with an approved application flow

Because Release 1 collects no data and CVs will later arrive directly by email, it does not need a Brevo API endpoint. Brevo should be prepared but not used to collect or market to applicants.

### Brevo account and DNS checklist

1. Create or use the organisation-owned Brevo account; do not use a personal account as the long-term owner.
2. Add and verify the Oryx sending domain in Brevo.
3. Authenticate the approved sender address, normally `vacancies@oryxinstitute.org`, using the DNS records Brevo supplies.
4. Verify SPF/DKIM alignment and test a message to external inboxes before using it publicly.
5. Limit Brevo account access to named staff and enable multi-factor authentication where available.
6. Keep API keys out of Git, browser code, screenshots and public documents.
7. Do not create a recruitment marketing list. An application is not consent to receive marketing.

### Future transactional application endpoint

Only after the recruitment opening pack is approved may the site add a server-side endpoint such as:

```text
POST /api/careers/application
```

The endpoint may send a transactional notification to the monitored recruitment mailbox and a receipt to the applicant. It must:

- run only on the server;
- read `BREVO_API_KEY` only from Vercel environment variables;
- use an authenticated, verified Oryx sender address;
- validate a tightly defined payload with Zod;
- reject unexpected fields and oversized input;
- use a honeypot, rate limit and human-verification control before sending mail;
- include the applicant’s email as reply-to only after validation;
- send no applicant details to a Brevo marketing list;
- log only operational event metadata, never CV or message content;
- fail closed with a neutral error message and an accessible email fallback.

Suggested future Vercel environment variables:

```text
BREVO_API_KEY
BREVO_SENDER_EMAIL
BREVO_SENDER_NAME
CAREERS_INBOX_EMAIL
CAREERS_APPLICATIONS_OPEN
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

Do not add these variables until their actual values and owners exist. Never commit any value file containing them.

## Recruitment-opening pack required before live vacancies

Before replacing the coming-soon page with live roles, collect and approve the following for every role:

1. Exact public job title and employment type.
2. Location wording and whether on-site, hybrid or travel is required.
3. Approved job summary, duties, reporting line and minimum/desired requirements.
4. Required application documents and whether a cover letter is needed.
5. Exact opening and closing date/time, Namibia time zone, and late-application policy.
6. Selection process, contact route and approved acknowledgement wording.
7. Salary/benefit disclosure decision, if any.
8. Equal-opportunity, eligibility, background-check and conflict-of-interest wording, reviewed by the organisation’s appropriate adviser.
9. Privacy retention period, access owners and deletion process for applications.
10. Final English and Afrikaans copy approval.

When a live vacancy page is approved, regenerate the QR code against the final canonical `https://www.oryxinstitute.org/careers` destination and test it on mobile. Do not reuse the draft poster QR code without validation.

## Security and privacy changes before data collection

The existing privacy page truthfully says that the current enquiry composer stores nothing on the site and hands a message to the visitor’s mail client. A server-side careers form would change that data flow.

Before enabling any careers form, update the privacy page in both languages to identify:

- the categories of application data collected;
- Brevo as a transactional processor, if it processes the form submission;
- the controlled recruitment mailbox and authorised reviewers;
- the approved purpose and retention period;
- how applicants request access, correction or deletion;
- the security/rate-limit approach; and
- the fact that marketing consent is separate and optional, if it is ever offered.

A CV-upload feature is out of scope for the first release. It requires protected file storage, upload-size/type validation, malware scanning, authorised HR-only access, download controls, retention/deletion automation and a reviewed privacy notice.

## Implementation and verification sequence

1. Build and review the bilingual coming-soon page with no collection or application claim.
2. Run lint, build, route/metadata/sitemap/internal-link tests and visual inspection.
3. Create and test the real `vacancies@` mailbox externally.
4. Authenticate the sender domain in Brevo and securely add production environment variables only if a future server-side form is approved.
5. Receive and approve the recruitment-opening pack for each role.
6. Update privacy copy and add the guarded transactional endpoint only when applications are truly open.
7. Test valid, invalid, spam, rate-limited and Brevo-failure paths without sending applicant data to a contact list.
8. Publish the vacancy details, canonical QR code and CV-email instruction only after all preceding checks pass.
