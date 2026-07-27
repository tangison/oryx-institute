import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';
import { AnimatedSection } from '@/components/site/animated-section';
import { faqs } from '@/lib/content';
import { organizationLd, faqLd, combineLd } from '@/lib/structured-data';
import { OryxFaqAccordion } from '@/components/site/faq-accordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Questions and answers about Oryx Institute. Programmes, admissions, RPL, work-integrated learning, fees, campus, and general information.',
  alternates: { canonical: 'https://oryxinstitute.org/faq' },
};

const categories = ['General', 'Programmes', 'Admissions', 'RPL', 'WIL', 'Fees', 'Campus'] as const;

export default function FaqPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combineLd([organizationLd(), faqLd(faqs)]) }}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Questions and answers."
        lede="Honest answers to common questions about Oryx Institute. If your question is not here, use the contact form."
      />

      <Section tone="cream">
        <AnimatedSection>
          <div className="space-y-12 md:space-y-16">
            {categories.map((cat) => {
              const items = faqs.filter((f) => f.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <div className="flex items-baseline gap-4 mb-6 pb-3 border-b border-[var(--color-border)]">
                    <span className="font-display text-sm text-[var(--color-brand-maroon)] uppercase tracking-wider">
                      {cat}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {items.length} {items.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>
                  <OryxFaqAccordion items={items} />
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="mt-12 bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)] p-8 md:p-12">
            <p className="eyebrow text-[var(--color-brand-cream)] mb-3">Still have questions?</p>
            <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
              Use the contact form. We will respond to genuine enquiries.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Contact</Link>
              <Link href="/register" className="btn-secondary-dark">Register Interest</Link>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </PageShell>
  );
}
