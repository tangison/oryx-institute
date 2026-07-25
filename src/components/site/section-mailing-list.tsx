'use client';

import { useReveal } from '@/hooks/use-reveal';

export function MailingListSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="mailing-list" className="bg-white py-20 md:py-28 lg:py-32 border-y border-[var(--color-border)]">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-4">Mailing List</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              Follow the journey.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
              Receive verified updates by email. No spam. No fabricated announcements. Unsubscribe at
              any time.
            </p>
          </div>

          <div className="lg:col-span-6">
            <MailingListForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function MailingListForm() {
  return (
    <form
      data-form-type="mailing-list"
      className="bg-[var(--color-brand-cream)] p-6 md:p-8 border border-[var(--color-border)]"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ml-name" className="label-oryx">Name</label>
          <input id="ml-name" name="name" type="text" required className="input-oryx" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="ml-email" className="label-oryx">Email</label>
          <input id="ml-email" name="email" type="email" required className="input-oryx" autoComplete="email" />
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 accent-[var(--color-brand-maroon)]" />
          <span className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            I consent to receive verified email updates from Oryx Institute. I understand I can
            unsubscribe at any time.
          </span>
        </label>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="ml-website" aria-hidden="true">Website (leave empty)</label>
        <input id="ml-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
      </div>

      <button type="submit" className="mt-6 btn-primary w-full justify-center">
        Subscribe
      </button>

      <p
        className="mt-4 text-xs text-[var(--muted-foreground)]"
        data-role="form-result"
        role="status"
        aria-live="polite"
      />
    </form>
  );
}
