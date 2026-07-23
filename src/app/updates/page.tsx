import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';

export const metadata: Metadata = {
  title: 'Updates',
  description:
    'Institutional updates from Oryx Institute. The institution is being established. Updates will be published as milestones are reached.',
  alternates: { canonical: 'https://oryxinstitute.na/updates' },
};

export default function UpdatesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Updates"
        title="Institutional updates."
        lede="Updates will be published here as the institution reaches milestones. No updates yet. The institution is being established."
      />

      <Section tone="cream">
        <div className="max-w-2xl mx-auto text-center py-16 md:py-24">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-[var(--color-border)] mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[var(--color-brand-maroon)]">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </div>
          <p className="eyebrow mb-4">No updates yet</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-4">
            The institution is being established.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty mb-8">
            Updates will be published here as the institution reaches milestones. No dates are
            published until verified. Register your interest to be informed when updates are
            available.
          </p>
          <Link href="/register" className="btn-primary">
            Register Interest
          </Link>
        </div>
      </Section>

      <Section tone="dark">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">What to expect</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            Honest updates, published when there is something to say.
          </p>
          <ul className="space-y-4 text-[var(--color-brand-cream)]/80">
            <li className="flex gap-4">
              <span className="font-display text-[var(--color-brand-maroon)] shrink-0">01</span>
              <span className="leading-relaxed">Programme approval milestones, when reached.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-[var(--color-brand-maroon)] shrink-0">02</span>
              <span className="leading-relaxed">Campus and facility announcements, when confirmed.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-[var(--color-brand-maroon)] shrink-0">03</span>
              <span className="leading-relaxed">Admissions timelines, when published.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-[var(--color-brand-maroon)] shrink-0">04</span>
              <span className="leading-relaxed">Employer and institutional partnerships, when signed.</span>
            </li>
          </ul>
        </div>
      </Section>
    </PageShell>
  );
}
