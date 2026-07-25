import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site/page-shell';
import { Breadcrumbs, BackLink } from '@/components/site/back-link';
import { Section } from '@/components/site/section';
import { Prose, ProseSection } from '@/components/site/prose';
import { glossaryEntries, getGlossaryEntry, glossarySlugs, type GlossarySlug } from '@/lib/glossary';
import { organizationLd, breadcrumbLd, combineLd } from '@/lib/structured-data';

export function generateStaticParams() {
  return glossarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) return { title: 'Term not found' };

  const title = entry.abbreviation
    ? `${entry.abbreviation} (${entry.term})`
    : entry.term;

  return {
    title: `${title} — Glossary`,
    description: entry.summary,
    alternates: { canonical: `https://oryxinstitute.org/glossary/${entry.slug}` },
  };
}

export default async function GlossaryEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();

  const related = entry.relatedTerms
    .map((t) => glossaryEntries.find((e) => e.slug === t))
    .filter(Boolean);

  const displayName = entry.abbreviation
    ? `${entry.abbreviation} — ${entry.term}`
    : entry.term;

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combineLd([
          organizationLd(),
          breadcrumbLd([
            { name: 'Home', url: 'https://oryxinstitute.org' },
            { name: 'Glossary', url: 'https://oryxinstitute.org/glossary' },
            { name: displayName, url: `https://oryxinstitute.org/glossary/${entry.slug}` },
          ]),
        ]) }}
      />

      <Section tone="cream" className="pt-28 md:pt-36 pb-0">
        <div className="container-oryx">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Glossary', href: '/glossary' },
              { label: displayName },
            ]}
            className="mb-8"
          />
        </div>
      </Section>

      <Section tone="cream" className="pt-0">
        <div className="max-w-4xl">
          {entry.abbreviation && (
            <p className="eyebrow mb-4">{entry.abbreviation}</p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight text-balance">
            {entry.term}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed text-pretty max-w-2xl">
            {entry.summary}
          </p>
        </div>
      </Section>

      <Section tone="light">
        <div className="max-w-3xl">
          <Prose>
            <ProseSection heading="Definition" headingLevel="h2">
              <p>{entry.definition}</p>
            </ProseSection>

            {/* Accreditation notice where relevant */}
            {(entry.slug === 'accreditation' || entry.slug === 'nqa' || entry.slug === 'vet') && (
              <div className="bg-[var(--color-brand-cream)] p-6 border border-[var(--color-border)]">
                <p className="caption-oryx">
                  Oryx Institute programmes are planned and subject to accreditation. No programme is
                  presented as accredited until the NQA confirms it. Any status label on this site
                  reflects current planning status, not formal accreditation.
                </p>
              </div>
            )}
          </Prose>
        </div>
      </Section>

      {/* Related glossary terms */}
      {related.length > 0 && (
        <Section tone="cream">
          <p className="eyebrow mb-4">Related terms</p>
          <ul className="space-y-px bg-[var(--color-border)]">
            {related.map((r) => (
              <li key={r!.slug} className="bg-white">
                <Link
                  href={`/glossary/${r!.slug}`}
                  className="flex items-center justify-between gap-4 p-5 hover:bg-[var(--color-brand-cream)]/40 transition-colors group"
                >
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-lg font-medium leading-tight group-hover:text-[var(--color-brand-maroon)] transition-colors">
                      {r!.abbreviation ? `${r!.abbreviation} — ${r!.term}` : r!.term}
                    </span>
                    <span className="block text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                      {r!.summary}
                    </span>
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors"
                  >
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Related pages */}
      {entry.relatedPages.length > 0 && (
        <Section tone="light">
          <p className="eyebrow mb-4">Related pages</p>
          <ul className="flex flex-wrap gap-3">
            {entry.relatedPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] text-sm bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-maroon)] hover:border-[var(--color-brand-maroon)] transition-colors duration-200"
                >
                  {page.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Disclaimer */}
      <Section tone="cream" className="py-8">
        <div className="bg-white p-6 border border-[var(--color-border)] mb-8">
          <p className="caption-oryx">
            This definition is for general information. It does not constitute official NQA guidance
            or legal advice. For authoritative definitions, consult the Namibian Qualifications
            Authority directly.
          </p>
        </div>
        <BackLink href="/glossary" label="All glossary terms" />
      </Section>
    </PageShell>
  );
}
