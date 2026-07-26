import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section } from '@/components/site/section';
import { AnimatedSection, AnimatedStagger } from '@/components/site/animated-section';
import { programmes, schools } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Programmes',
  description:
    'A representative planned catalogue across five schools. Every programme is planned and subject to approval. No programme is presented as approved until verified.',
  alternates: { canonical: 'https://oryxinstitute.org/programmes' },
};

export default function ProgrammesPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Programmes"
        title="Planned programmes."
        lede="A representative catalogue across five schools. Every programme is planned and subject to approval. No programme is presented as approved until verified."
        image="/images/programmes/student-classroom.webp"
        alt="A student in a beige fleece standing in a sunlit classroom."
      />

      <Section tone="cream">
        <AnimatedStagger stagger={100}>
        {schools.map((school) => {
          const schoolProgrammes = programmes.filter((p) => p.school === school.slug);
          return (
            <div key={school.slug} className="mb-16 last:mb-0">
              <div className="flex items-baseline justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border)]">
                <div>
                  <span className="font-display text-sm text-[var(--color-brand-maroon)] tabular-nums">
                    {school.index}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight mt-1">
                    {school.name}
                  </h2>
                </div>
                <Link
                  href={`/schools/${school.slug}`}
                  className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--color-brand-maroon)] transition-colors whitespace-nowrap"
                >
                  View school →
                </Link>
              </div>

              {schoolProgrammes.length === 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
                  {school.detail.plannedProgrammes.map((p) => (
                    <li key={p} className="bg-white p-6 flex items-start gap-4">
                      <span className="status-pill status-planned shrink-0 mt-1">Planned</span>
                      <span className="text-sm leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
                  {schoolProgrammes.map((p) => (
                    <li key={p.slug} className="bg-white">
                      <Link
                        href={`/programmes/${p.slug}`}
                        className="block p-6 h-full hover:bg-[var(--color-brand-cream)]/40 transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`status-pill text-[0.625rem] ${
                              p.status === 'Planned'
                                ? 'status-planned'
                                : p.status === 'Subject to accreditation'
                                  ? 'status-subject'
                                  : 'status-interest'
                            }`}
                          >
                            {p.status}
                          </span>
                          <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                            {p.level}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-medium leading-tight mb-3 group-hover:text-[var(--color-brand-maroon)] transition-colors">
                          {p.name}
                        </h3>
                        <dl className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <dt className="text-[var(--muted-foreground)] uppercase tracking-wider mb-0.5">Delivery</dt>
                            <dd className="font-medium">{p.delivery}</dd>
                          </div>
                          <div>
                            <dt className="text-[var(--muted-foreground)] uppercase tracking-wider mb-0.5">Duration</dt>
                            <dd className="font-medium">{p.duration}</dd>
                          </div>
                        </dl>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        </AnimatedStagger>
      </Section>

      <Section tone="dark">
        <AnimatedSection>
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">A note on the catalogue</p>
          <p className="font-display text-2xl md:text-3xl font-medium leading-tight text-balance mb-6">
            Programmes will be added, changed, and refined as the institution grows.
          </p>
          <p className="text-[var(--color-brand-cream)]/80 leading-relaxed text-pretty mb-8">
            This catalogue is representative, not final. Programmes will be added as the institution
            proves its capacity. Existing programmes may change in structure, duration, or delivery.
            No programme is guaranteed until approved. Register your interest to be informed when a
            programme reaches its next milestone.
          </p>
          <Link href="/register" className="btn-primary">
            Register Interest
          </Link>
        </div>
        </AnimatedSection>
      </Section>
    </PageShell>
  );
}
