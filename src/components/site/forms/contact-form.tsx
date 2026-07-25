'use client';

import { useState } from 'react';
import { useFormSubmission, FormStatus, FieldError } from './use-form-submission';

export function ContactForm() {
  const { state, submit } = useFormSubmission();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', consent: false, website: '',
  });
  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit('contact', form);
  };

  if (state.status === 'success') {
    return (
      <div className="bg-white border border-[var(--color-border)] p-8 md:p-10">
        <FormStatus state={state} />
        <button onClick={() => setForm({ name: '', email: '', phone: '', message: '', consent: false, website: '' })} className="mt-6 btn-ghost">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-[var(--color-border)] p-6 md:p-8 lg:p-10 space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className="label-oryx">Full name <span aria-hidden="true">*</span></label>
          <input id="c-name" name="name" type="text" required className="input-oryx" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} />
          <FieldError error={state.errors.name} />
        </div>
        <div>
          <label htmlFor="c-email" className="label-oryx">Email <span aria-hidden="true">*</span></label>
          <input id="c-email" name="email" type="email" required className="input-oryx" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
          <FieldError error={state.errors.email} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-phone" className="label-oryx">Phone (optional)</label>
          <input id="c-phone" name="phone" type="tel" className="input-oryx" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="label-oryx">Message <span aria-hidden="true">*</span></label>
        <textarea id="c-message" name="message" required rows={6} className="input-oryx resize-y" placeholder="Tell us what you need." value={form.message} onChange={(e) => update('message', e.target.value)} />
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
        <label htmlFor="c-website" className="sr-only" aria-hidden="true">Website</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" value={form.website} onChange={(e) => update('website', e.target.value)} />
      </div>
      <button type="submit" disabled={state.status === 'submitting'} className="btn-primary w-full justify-center">
        {state.status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      <FormStatus state={state} />
      <p className="text-xs text-[var(--muted-foreground)]/80">
        Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in touch when the institution is established.
      </p>
    </form>
  );
}
