'use client';

import { useState } from 'react';
import { useFormSubmission, FormStatus, FieldError } from './use-form-submission';

export type EnquiryType =
  | 'employer-enquiry'
  | 'wil-enquiry'
  | 'corporate-training-enquiry'
  | 'research-advisory-enquiry'
  | 'funding-partnership-enquiry';

export function EnquiryForm({ type }: { type: EnquiryType }) {
  const { state, submit } = useFormSubmission();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', organisation: '', role: '', message: '', consent: false, website: '',
  });
  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(type, form);
  };

  if (state.status === 'success') {
    return (
      <div className="bg-white border border-[var(--color-border)] p-8 md:p-10">
        <FormStatus state={state} />
        <button onClick={() => setForm({ name: '', email: '', phone: '', organisation: '', role: '', message: '', consent: false, website: '' })} className="mt-6 btn-ghost">
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-[var(--color-border)] p-6 md:p-8 lg:p-10 space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="e-name" className="label-oryx">Full name <span aria-hidden="true">*</span></label>
          <input id="e-name" name="name" type="text" required className="input-oryx" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} />
          <FieldError error={state.errors.name} />
        </div>
        <div>
          <label htmlFor="e-email" className="label-oryx">Email <span aria-hidden="true">*</span></label>
          <input id="e-email" name="email" type="email" required className="input-oryx" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
          <FieldError error={state.errors.email} />
        </div>
        <div>
          <label htmlFor="e-phone" className="label-oryx">Phone (optional)</label>
          <input id="e-phone" name="phone" type="tel" className="input-oryx" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
        <div>
          <label htmlFor="e-org" className="label-oryx">Organisation</label>
          <input id="e-org" name="organisation" type="text" className="input-oryx" autoComplete="organization" value={form.organisation} onChange={(e) => update('organisation', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="e-role" className="label-oryx">Role</label>
          <input id="e-role" name="role" type="text" className="input-oryx" autoComplete="organization-title" value={form.role} onChange={(e) => update('role', e.target.value)} />
        </div>
      </div>
      <div>
        <label htmlFor="e-message" className="label-oryx">Message <span aria-hidden="true">*</span></label>
        <textarea id="e-message" name="message" required rows={6} className="input-oryx resize-y" placeholder="Tell us what you need." value={form.message} onChange={(e) => update('message', e.target.value)} />
        <FieldError error={state.errors.message} />
      </div>
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 accent-[var(--color-brand-maroon)]" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} />
          <span className="text-sm text-[var(--muted-foreground)] leading-relaxed">I consent to be contacted by Oryx Institute about this enquiry. <span aria-hidden="true">*</span></span>
        </label>
        <FieldError error={state.errors.consent} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="e-website" className="sr-only" aria-hidden="true">Website</label>
        <input id="e-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" value={form.website} onChange={(e) => update('website', e.target.value)} />
      </div>
      <button type="submit" disabled={state.status === 'submitting'} className="btn-primary w-full justify-center">
        {state.status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
      </button>
      <FormStatus state={state} />
      <p className="text-xs text-[var(--muted-foreground)]/80">
        Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in touch when the institution is established.
      </p>
    </form>
  );
}
