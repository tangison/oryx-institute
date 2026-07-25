'use client';

import { useState } from 'react';
import { useFormSubmission, FormStatus, FieldError } from './use-form-submission';
import { programmes } from '@/lib/content';

export function RegisterForm() {
  const { state, submit } = useFormSubmission();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', region: '', programme: '',
    educationLevel: '', employmentStatus: '', rplInterest: 'unsure',
    preferredSchedule: '', consent: false, website: '',
  });
  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit('register-interest', form);
  };

  if (state.status === 'success') {
    return (
      <div className="bg-white border border-[var(--color-border)] p-8 md:p-10">
        <FormStatus state={state} />
        <button onClick={() => setForm({ name: '', email: '', phone: '', region: '', programme: '', educationLevel: '', employmentStatus: '', rplInterest: 'unsure', preferredSchedule: '', consent: false, website: '' })} className="mt-6 btn-ghost">
          Register another interest
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white text-[var(--color-brand-ink)] p-6 md:p-8 lg:p-10 border border-[var(--color-border)]" noValidate>
      <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-6">Register Interest</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="ri-name" className="label-oryx">Full name <span aria-hidden="true">*</span></label>
          <input id="ri-name" name="name" type="text" required className="input-oryx" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} />
          <FieldError error={state.errors.name} />
        </div>
        <div>
          <label htmlFor="ri-email" className="label-oryx">Email <span aria-hidden="true">*</span></label>
          <input id="ri-email" name="email" type="email" required className="input-oryx" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
          <FieldError error={state.errors.email} />
        </div>
        <div>
          <label htmlFor="ri-phone" className="label-oryx">Phone or WhatsApp <span aria-hidden="true">*</span></label>
          <input id="ri-phone" name="phone" type="tel" required className="input-oryx" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          <FieldError error={state.errors.phone} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ri-region" className="label-oryx">Region or town <span aria-hidden="true">*</span></label>
          <input id="ri-region" name="region" type="text" required className="input-oryx" placeholder="e.g. Khomas, Windhoek" value={form.region} onChange={(e) => update('region', e.target.value)} />
          <FieldError error={state.errors.region} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ri-programme" className="label-oryx">Programme of interest <span aria-hidden="true">*</span></label>
          <select id="ri-programme" name="programme" required className="input-oryx" value={form.programme} onChange={(e) => update('programme', e.target.value)}>
            <option value="" disabled>Select a programme</option>
            <optgroup label="By programme">
              {programmes.map((p) => (<option key={p.slug} value={p.slug}>{p.name}</option>))}
            </optgroup>
            <optgroup label="Other">
              <option value="other-safety">Safety (other)</option>
              <option value="other-admin">Administration and Commerce (other)</option>
              <option value="other-hospitality">Hospitality and Tourism (other)</option>
              <option value="other-digital">Information and Digital Skills (other)</option>
              <option value="other-future">Future Schools (register interest)</option>
              <option value="rpl">Recognition of Prior Learning</option>
              <option value="wil">Work-integrated Learning</option>
              <option value="unsure">Not sure yet</option>
            </optgroup>
          </select>
          <FieldError error={state.errors.programme} />
        </div>
        <div>
          <label htmlFor="ri-education" className="label-oryx">Current education level (optional)</label>
          <select id="ri-education" name="educationLevel" className="input-oryx" value={form.educationLevel} onChange={(e) => update('educationLevel', e.target.value)}>
            <option value="">Select</option>
            <option value="primary">Primary completed</option>
            <option value="junior">Junior secondary</option>
            <option value="senior">Senior secondary / Grade 12</option>
            <option value="certificate">Certificate</option>
            <option value="diploma">Diploma</option>
            <option value="degree">Degree</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="ri-employment" className="label-oryx">Employment status (optional)</label>
          <select id="ri-employment" name="employmentStatus" className="input-oryx" value={form.employmentStatus} onChange={(e) => update('employmentStatus', e.target.value)}>
            <option value="">Select</option>
            <option value="unemployed">Unemployed, seeking work</option>
            <option value="working">Working, seeking formal qualification</option>
            <option value="self">Self-employed</option>
            <option value="student">Student</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="ri-rpl" className="label-oryx">Interest in RPL (optional)</label>
          <select id="ri-rpl" name="rplInterest" className="input-oryx" value={form.rplInterest} onChange={(e) => update('rplInterest', e.target.value)}>
            <option value="yes">Yes, I have workplace experience</option>
            <option value="no">No</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="ri-schedule" className="label-oryx">Preferred schedule (optional)</label>
          <select id="ri-schedule" name="preferredSchedule" className="input-oryx" value={form.preferredSchedule} onChange={(e) => update('preferredSchedule', e.target.value)}>
            <option value="">Select</option>
            <option value="fulltime">Full-time</option>
            <option value="parttime-day">Part-time, day</option>
            <option value="parttime-evening">Part-time, evening</option>
            <option value="weekend">Weekend</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 accent-[var(--color-brand-maroon)]" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} />
          <span className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            I consent to receive updates from Oryx Institute about admissions, programmes, and the institution. I understand my data will be stored securely and used only to contact me about Oryx Institute. <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError error={state.errors.consent} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="ri-website" className="sr-only" aria-hidden="true">Website</label>
        <input id="ri-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" value={form.website} onChange={(e) => update('website', e.target.value)} />
      </div>
      <button type="submit" disabled={state.status === 'submitting'} className="mt-6 btn-primary w-full justify-center">
        {state.status === 'submitting' ? 'Submitting...' : 'Submit Registration'}
      </button>
      <FormStatus state={state} />
      <p className="mt-3 text-xs text-[var(--muted-foreground)]/80">
        Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in touch when the institution is established.
      </p>
    </form>
  );
}
