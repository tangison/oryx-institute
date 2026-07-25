'use client';

import { ModalShell } from './modal-shell';

type EnquiryType =
  | 'employer-enquiry'
  | 'wil-enquiry'
  | 'corporate-training-enquiry'
  | 'research-advisory-enquiry'
  | 'funding-partnership-enquiry'
  | 'contact';

const config: Record<
  EnquiryType,
  { eyebrow: string; title: string; intro: string; submitLabel: string; showOrganisation: boolean; showRole: boolean; showPhone: boolean }
> = {
  'employer-enquiry': {
    eyebrow: 'For Employers',
    title: 'Employer Enquiry',
    intro:
      'Recruit trained staff, host WIL learners, or contribute to programme design. Tell us about your organisation and what you need. We will respond to serious enquiries.',
    submitLabel: 'Submit Employer Enquiry',
    showOrganisation: true,
    showRole: true,
    showPhone: true,
  },
  'wil-enquiry': {
    eyebrow: 'For WIL Partners',
    title: 'WIL Partner Enquiry',
    intro:
      'Host learners in real workplaces for supervised practice. WIL is structured, assessed, and credited. Tell us about your workplace and capacity to host.',
    submitLabel: 'Submit WIL Enquiry',
    showOrganisation: true,
    showRole: true,
    showPhone: true,
  },
  'corporate-training-enquiry': {
    eyebrow: 'For Corporate Training Clients',
    title: 'Corporate Training Enquiry',
    intro:
      'Commission bespoke organisational training designed and delivered for your workforce. Tell us what your team needs.',
    submitLabel: 'Submit Corporate Training Enquiry',
    showOrganisation: true,
    showRole: true,
    showPhone: true,
  },
  'research-advisory-enquiry': {
    eyebrow: 'For Research and Advisory Clients',
    title: 'Research and Advisory Enquiry',
    intro:
      'Commission applied research, workforce studies, or advisory services. Tell us about the question or challenge you need addressed.',
    submitLabel: 'Submit Research Enquiry',
    showOrganisation: true,
    showRole: true,
    showPhone: true,
  },
  'funding-partnership-enquiry': {
    eyebrow: 'For Funding and Institutional Partners',
    title: 'Funding and Partnership Enquiry',
    intro:
      'Support the establishment of a serious Namibian institution. Donors, development finance institutions, public skills funds, and academic partners are welcome to register interest.',
    submitLabel: 'Submit Funding Enquiry',
    showOrganisation: true,
    showRole: true,
    showPhone: true,
  },
  'contact': {
    eyebrow: 'Contact',
    title: 'Contact Oryx Institute',
    intro:
      'Submit an enquiry. Prospective learners, employers, partners, and research clients are all welcome. We will respond to serious enquiries.',
    submitLabel: 'Send Message',
    showOrganisation: false,
    showRole: false,
    showPhone: true,
  },
};

export function EnquiryModal({ type }: { type: EnquiryType }) {
  const c = config[type];

  return (
    <ModalShell eyebrow={c.eyebrow} title={c.title}>
      <div className="space-y-6">
        <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">{c.intro}</p>

        <form
          data-form-type={type}
          className="space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`enq-name-${type}`} className="label-oryx">Full name <span aria-hidden="true">*</span></label>
              <input id={`enq-name-${type}`} name="name" type="text" required className="input-oryx" autoComplete="name" />
            </div>
            <div>
              <label htmlFor={`enq-email-${type}`} className="label-oryx">Email <span aria-hidden="true">*</span></label>
              <input id={`enq-email-${type}`} name="email" type="email" required className="input-oryx" autoComplete="email" />
            </div>
            {c.showPhone && (
              <div>
                <label htmlFor={`enq-phone-${type}`} className="label-oryx">Phone (optional)</label>
                <input id={`enq-phone-${type}`} name="phone" type="tel" className="input-oryx" autoComplete="tel" />
              </div>
            )}
            {c.showOrganisation && (
              <div>
                <label htmlFor={`enq-org-${type}`} className="label-oryx">Organisation</label>
                <input id={`enq-org-${type}`} name="organisation" type="text" className="input-oryx" autoComplete="organization" />
              </div>
            )}
            {c.showRole && (
              <div>
                <label htmlFor={`enq-role-${type}`} className="label-oryx">Role</label>
                <input id={`enq-role-${type}`} name="role" type="text" className="input-oryx" autoComplete="organization-title" />
              </div>
            )}
          </div>

          <div>
            <label htmlFor={`enq-message-${type}`} className="label-oryx">Message <span aria-hidden="true">*</span></label>
            <textarea
              id={`enq-message-${type}`}
              name="message"
              required
              rows={5}
              className="input-oryx resize-y"
              placeholder="Tell us what you need."
            />
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 accent-[var(--color-brand-maroon)]" />
              <span className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                I consent to be contacted by Oryx Institute about this enquiry. <span aria-hidden="true">*</span>
              </span>
            </label>
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={`enq-website-${type}`} aria-hidden="true">Website (leave empty)</label>
            <input id={`enq-website-${type}`} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
          </div>

          <button type="submit" className="btn-primary w-full justify-center">
            {c.submitLabel}
          </button>

          <p
            className="text-xs text-[var(--muted-foreground)]"
            data-role="form-result"
            role="status"
            aria-live="polite"
          />

          <p className="text-xs text-[var(--muted-foreground)]/80">
            Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in
            touch when the institution is established.
          </p>
        </form>
      </div>
    </ModalShell>
  );
}
