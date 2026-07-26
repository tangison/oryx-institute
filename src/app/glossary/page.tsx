import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';
import { AnimatedStagger, AnimatedSection } from '@/components/site/animated-section';
import { glossaryEntries } from '@/lib/glossary';
import { organizationLd, combineLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Glossary',
  description:
    'Key Namibian vocational education terms explained: RPL, WIL, NQA, VET, accreditation, and the NQF. Definitions specific to the Namibian context.',
  alternates: { canonical: 'https://oryxinstitute.org/glossary' },
};

/* ─── Alphabet grouping ─── */
function groupByLetter(entries: typeof glossaryEntries) {
  const groups: Record<string, typeof glossaryEntries> = {};
  for (const entry of entries) {
    const letter = entry.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(entry);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function GlossaryPage() {
  const groups = groupByLetter(glossaryEntries);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combineLd([organizationLd()]) }}
      />
      <PageHeader
        eyebrow="Glossary"
        title="Namibian vocational education terms."
        lede="Key terms and definitions specific to the Namibian context. Each entry links to related terms and relevant pages on this site."
      />

      <Section tone="cream">
        {/* Alphabetical jump links */}
        <nav aria-label="Glossary alphabet" className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {groups.map(([letter]) => (
              <li key={letter}>
                <a
                  href={`#letter-${letter}`}
                  className="inline-flex items-center justify-center w-10 h-10 font-display text-lg text-[var(--color-brand-maroon)] border border-[var(--color-border)] hover:bg-[var(--color-brand-maroon)] hover:text-white transition-colors duration-200"
                >
                  {letter}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Alphabetical groups */}
        {groups.map(([letter, entries]) => (
          <div key={letter} id={`letter-${letter}`} className="mb-14 last:mb-0">
            <div className="flex items-baseline gap-4 mb-6 pb-3 border-b border-[var(--color-border)]">
              <span className="font-display text-sm text-[var(--color-brand-maroon)] uppercase tracking-wider">
                {letter}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {entries.length} {entries.length === 1 ? 'term' : 'terms'}
              </span>
            </div>

            <ul className="space-y-px bg-[var(--color-border)]">
              {entries.map((entry) => (
                <li key={entry.slug} className="bg-white">
                  <Link
                    href={`/glossary/${entry.slug}`}
                    className="flex items-start justify-between gap-6 p-6 md:p-8 hover:bg-[var(--color-brand-cream)]/40 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-lg md:text-xl font-medium leading-tight group-hover:text-[var(--color-brand-maroon)] transition-colors">
                        {entry.abbreviation ? (
                          <>
                            {entry.abbreviation} — {entry.term}
                          </>
                        ) : (
                          entry.term
                        )}
                      </h2>
                      <p className="mt-2 text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed text-pretty">
                        {entry.summary}
                      </p>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 mt-2 text-[var(--color-brand-ink)] group-hover:text-[var(--color-brand-maroon)] transition-colors"
                    >
                      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-8 bg-white p-6 border border-[var(--color-border)]">
          <p className="caption-oryx">
            Definitions on this page are for general information. They do not constitute official NQA
            guidance. Where an entry references accreditation status, that status reflects current
            planning only, not formal NQA confirmation.
          </p>
        </div>
      </Section>

      <Section tone="dark">
        <AnimatedSection>
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Related pages</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            Glossary terms connect to programmes, schools, and the FAQ.
          </p>
          <p className="text-[var(--color-brand-cream)]/80 leading-relaxed text-pretty mb-8">
            Each glossary entry links to relevant pages on this site. If you need clarification on
            a term, use the contact form or register your interest for updates.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/faq" className="btn-primary">
              FAQ
            </Link>
            <Link href="/programmes" className="btn-secondary-dark">
              Programmes
            </Link>
          </div>
        </div>
        </AnimatedSection>
      </Section>
    </PageShell>
  );
}
