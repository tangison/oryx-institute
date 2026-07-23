'use client';

import { faqs } from '@/lib/content';
import { useReveal } from '@/hooks/use-reveal';
import { useModal } from '@/lib/modal-context';
import { useState } from 'react';

export function FaqSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { open } = useModal();
  const [openItem, setOpenItem] = useState<string | null>(faqs[0]?.slug ?? null);

  return (
    <section id="faq" className="bg-white py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <header className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            Frequently asked questions.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
            Common questions about Oryx Institute, planned programmes, admissions, RPL,
            work-integrated learning, fees, and campus.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <ul className="lg:col-span-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {faqs.map((f) => {
              const isOpen = openItem === f.slug;
              return (
                <li key={f.slug}>
                  <button
                    onClick={() => setOpenItem(isOpen ? null : f.slug)}
                    className="w-full text-left py-5 md:py-6 flex items-start justify-between gap-6"
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1">
                      <span className="block eyebrow text-[var(--color-brand-maroon)] mb-2">{f.category}</span>
                      <span className="font-display text-lg md:text-xl font-medium leading-tight">
                        {f.question}
                      </span>
                    </span>
                    <span
                      className="shrink-0 w-8 h-8 border border-[var(--color-brand-ink)] inline-flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 200ms' }}
                      >
                        <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-6 md:pb-8 pr-12">
                      <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                        {f.answer}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <aside className="lg:col-span-4">
            <div className="bg-[var(--color-brand-cream)] p-6 md:p-8 border border-[var(--color-border)] sticky top-24">
              <h3 className="font-display text-xl md:text-2xl font-medium leading-tight">
                Have a different question?
              </h3>
              <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                Submit a question or contact the institution directly. We will respond to serious
                enquiries.
              </p>
              <button onClick={() => open('contact')} className="mt-6 btn-primary w-full justify-center">
                Contact
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('register-interest');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="mt-3 btn-secondary w-full justify-center"
              >
                Register Interest
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
