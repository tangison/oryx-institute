'use client';

import { useReveal } from '@/hooks/use-reveal';
import { programmes } from '@/lib/content';

export function RegisterInterestSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="register-interest" className="relative bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)] py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="/images/campus/building-entrance.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-ink)] via-[var(--color-brand-ink)]/80 to-[var(--color-brand-ink)]" />
      </div>

      <div ref={ref} className={`container-oryx relative reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Register Interest</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.0] tracking-tight text-balance">
              Be part of what is being built.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-brand-cream)]/80 text-pretty">
              Register your interest in planned programmes. Tell us what you want to study. We will
              contact you when admissions open.
            </p>

            <dl className="mt-12 space-y-6">
              <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
                <dt className="font-display text-2xl text-[var(--color-brand-maroon)] font-medium">01</dt>
                <dd>
                  <p className="font-display text-base mb-1">Tell us about you</p>
                  <p className="text-sm text-[var(--color-brand-cream)]/70 leading-relaxed">
                    Your name, contact, and where you are in Namibia.
                  </p>
                </dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
                <dt className="font-display text-2xl text-[var(--color-brand-maroon)] font-medium">02</dt>
                <dd>
                  <p className="font-display text-base mb-1">Choose your programme</p>
                  <p className="text-sm text-[var(--color-brand-cream)]/70 leading-relaxed">
                    Pick from the planned catalogue or write your own interest.
                  </p>
                </dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
                <dt className="font-display text-2xl text-[var(--color-brand-maroon)] font-medium">03</dt>
                <dd>
                  <p className="font-display text-base mb-1">We will be in touch</p>
                  <p className="text-sm text-[var(--color-brand-cream)]/70 leading-relaxed">
                    When admissions open, we will contact you with next steps.
                  </p>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <RegisterInterestForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function RegisterInterestForm() {
  return (
    <form
      data-form-type="register-interest"
      className="bg-white text-[var(--color-brand-ink)] p-6 md:p-8 lg:p-10 border border-[var(--color-border)]"
      noValidate
    >
      <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-6">
        Register Interest
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="ri-name" className="label-oryx">Full name <span aria-hidden="true">*</span></label>
          <input id="ri-name" name="name" type="text" required className="input-oryx" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="ri-email" className="label-oryx">Email <span aria-hidden="true">*</span></label>
          <input id="ri-email" name="email" type="email" required className="input-oryx" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="ri-phone" className="label-oryx">Phone or WhatsApp <span aria-hidden="true">*</span></label>
          <input id="ri-phone" name="phone" type="tel" required className="input-oryx" autoComplete="tel" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ri-region" className="label-oryx">Region or town <span aria-hidden="true">*</span></label>
          <input id="ri-region" name="region" type="text" required className="input-oryx" placeholder="e.g. Khomas, Windhoek" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ri-programme" className="label-oryx">Programme of interest <span aria-hidden="true">*</span></label>
          <select id="ri-programme" name="programme" required defaultValue="" className="input-oryx">
            <option value="" disabled>Select a programme</option>
            <optgroup label="By programme">
              {programmes.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
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
        </div>
        <div>
          <label htmlFor="ri-education" className="label-oryx">Current education level (optional)</label>
          <select id="ri-education" name="educationLevel" defaultValue="" className="input-oryx">
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
          <select id="ri-employment" name="employmentStatus" defaultValue="" className="input-oryx">
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
          <select id="ri-rpl" name="rplInterest" defaultValue="unsure" className="input-oryx">
            <option value="yes">Yes, I have workplace experience</option>
            <option value="no">No</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="ri-schedule" className="label-oryx">Preferred schedule (optional)</label>
          <select id="ri-schedule" name="preferredSchedule" defaultValue="" className="input-oryx">
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
          <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 accent-[var(--color-brand-maroon)]" />
          <span className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            I consent to receive updates from Oryx Institute about admissions, programmes, and the
            institution. I understand my data will be stored securely and used only to contact me
            about Oryx Institute. <span aria-hidden="true">*</span>
          </span>
        </label>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="ri-website">Website (leave empty)</label>
        <input id="ri-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="mt-6 btn-primary w-full justify-center">
        Submit Registration
      </button>

      <p
        className="mt-4 text-xs text-[var(--muted-foreground)]"
        data-role="form-result"
        role="status"
        aria-live="polite"
      />

      <p className="mt-3 text-xs text-[var(--muted-foreground)]/80">
        Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in
        touch when the institution is established.
      </p>
    </form>
  );
}
