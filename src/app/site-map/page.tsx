import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';
import { schools, programmes, primaryNav, secondaryNav, partnerNav, legalNav } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'A complete map of the Oryx Institute website. All pages, organised by category.',
  alternates: { canonical: 'https://oryxinstitute.na/site-map' },
};

export default function SitemapPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Navigation"
        title="Sitemap."
        lede="A complete map of the Oryx Institute website. Every public page, organised by category."
      />

      <Section tone="cream">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Main */}
          <div>
            <p className="eyebrow mb-4">Main</p>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">Home</Link></li>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Schools */}
          <div>
            <p className="eyebrow mb-4">Schools</p>
            <ul className="space-y-2">
              <li><Link href="/schools" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">All schools</Link></li>
              {schools.map((s) => (
                <li key={s.slug}>
                  <Link href={`/schools/${s.slug}`} className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <p className="eyebrow mb-4">Programmes</p>
            <ul className="space-y-2">
              <li><Link href="/programmes" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">All programmes</Link></li>
              {programmes.map((p) => (
                <li key={p.slug}>
                  <Link href={`/programmes/${p.slug}`} className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <p className="eyebrow mb-4">Partners</p>
            <ul className="space-y-2">
              <li><Link href="/partners" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">Partner with Oryx</Link></li>
              {partnerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="eyebrow mb-4">Legal</p>
            <ul className="space-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <p className="eyebrow mb-4">Other</p>
            <ul className="space-y-2">
              <li><Link href="/founder" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">Founder</Link></li>
              <li><Link href="/brand" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">Brand book</Link></li>
              <li><Link href="/research" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">Research</Link></li>
              <li><Link href="/updates" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">Updates</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-[var(--color-brand-maroon)] transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
