'use client';

import { updates } from '@/lib/content';
import { useReveal } from '@/hooks/use-reveal';

export function UpdatesSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="updates" className="bg-[var(--color-oryx-cream)] py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <header className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">Updates</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            The establishment journey.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
            Verified institutional updates, programme announcements, public notices, and events. No
            announcements yet. Updates will appear here.
          </p>
        </header>

        {updates.length === 0 ? (
          <div className="border border-[var(--color-border)] bg-white p-12 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 border border-[var(--color-border)]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
                <path d="M10 5V10L13 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-3">
              No updates yet.
            </h3>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto text-pretty">
              Verified institutional updates will appear here as the institution is established.
              No fabricated announcements. No speculation.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('mailing-list');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="mt-8 btn-secondary"
            >
              Subscribe to Updates
            </button>
          </div>
        ) : (
          <ol className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {updates.map((u) => (
              <li key={u.slug} className="py-6">
                <p className="eyebrow mb-2">{u.category} · {u.date}</p>
                <h3 className="font-display text-xl md:text-2xl font-medium leading-tight">{u.title}</h3>
                <p className="mt-2 text-[var(--muted-foreground)] text-pretty">{u.excerpt}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
