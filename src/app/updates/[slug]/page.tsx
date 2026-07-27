import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { updates } from '@/lib/content';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';
import { AnimatedSection } from '@/components/site/animated-section';
import { BackLink } from '@/components/site/back-link';

const categoryConfig: Record<string, { bg: string; text: string }> = {
  Establishment: { bg: 'bg-[var(--color-brand-maroon)]', text: 'text-[var(--color-brand-cream)]' },
  Programme: { bg: 'bg-[var(--color-brand-ink)]', text: 'text-[var(--color-brand-cream)]' },
  'Public Notice': { bg: 'bg-[var(--color-info)]', text: 'text-white' },
  Event: { bg: 'bg-[var(--color-warning)]', text: 'text-white' },
};

export async function generateStaticParams() {
  return updates.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const update = updates.find((u) => u.slug === slug);
  if (!update) return {};
  return {
    title: update.title,
    description: update.excerpt,
    alternates: { canonical: `https://oryxinstitute.org/updates/${update.slug}` },
  };
}

export default async function UpdateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const update = updates.find((u) => u.slug === slug);
  if (!update) notFound();

  const cat = categoryConfig[update.category] || categoryConfig.Establishment;

  return (
    <PageShell>
      <PageHeader
        eyebrow={`${update.category} · ${update.date}`}
        title={update.title}
      />

      <Section tone="cream">
        <AnimatedSection>
          <div className="max-w-3xl">
            <BackLink href="/updates" label="All Updates" />

            <div className="mt-6 flex items-center gap-3 mb-8">
              <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${cat.bg} ${cat.text}`}>
                {update.category}
              </span>
              <time className="font-display text-sm text-[var(--color-text-secondary)] tracking-[0.04em]" dateTime={update.date}>
                {update.date}
              </time>
            </div>

            <div className="prose-oryx">
              <p className="text-base md:text-[1.0625rem] leading-[1.65] text-[var(--color-text-secondary)] mb-6 text-pretty">
                {update.excerpt}
              </p>
              <div className="border-t border-[var(--color-border)] pt-8">
                <p className="text-[0.9375rem] md:text-base leading-[1.7] text-[var(--color-brand-ink)] text-pretty">
                  {update.body}
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
              <Link href="/register" className="btn-primary">
                Register Interest
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </PageShell>
  );
}
