import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';
import { faqs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Questions and answers about Oryx Institute. Programmes, admissions, RPL, work-integrated learning, fees, campus, and general information.',
  alternates: { canonical: 'https://oryx-institute.vercel.app/faq' },
};

const categories = ['General', 'Programmes', 'Admissions', 'RPL', 'WIL', 'Fees', 'Campus'] as const;

export default function FaqPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="FAQ"
        title="Questions and answers."
        lede="Honest answers to common questions about Oryx Institute. If your question is not here, use the contact form."
      />

      <Section tone="cream">
        {categories.map((cat) => {
          const items = faqs.filter((f) => f.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-16 last:mb-0">
              <div className="flex items-baseline gap-4 mb-6 pb-3 border-b border-[var(--color-border)]">
                <span className="font-display text-sm text-[var(--color-brand-maroon)] uppercase tracking-wider">
                  {cat}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {items.length} {items.length === 1 ? 'question' : 'questions'}
                </span>
              </div>
              <ul className="space-y-px bg-[var(--color-border)]">
                {items.map((f) => (
                  <li key={f.slug} className="bg-white p-6 md:p-8">
                    <h2 className="font-display text-lg md:text-xl font-medium leading-tight mb-3">
                      {f.question}
                    </h2>
                    <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                      {f.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="mt-12 bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)] p-8 md:p-12">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-3">Still have questions?</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            Use the contact form. We will respond to serious enquiries.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Contact</Link>
            <Link
              href="/register"
              className="btn-secondary-dark"
            >
              Register Interest
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
