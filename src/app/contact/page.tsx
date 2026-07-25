import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section } from '@/components/site/section';
import { ContactForm } from '@/components/site/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Oryx Institute. Prospective learners, employers, partners, and research clients are welcome. We will respond to genuine enquiries.',
  alternates: { canonical: 'https://oryxinstitute.org/contact' },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Contact"
        title="Contact Oryx Institute."
        lede="Prospective learners, employers, partners, and research clients are welcome. We will respond to genuine enquiries."
        image="/images/campus/building-entrance.webp"
        alt="A modern campus building entrance with warm stone and glass facade."
      />
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Before you write</p>
            <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-4">
              A few notes on what to expect.
            </p>
            <ul className="space-y-4 text-[var(--muted-foreground)] leading-relaxed">
              <li className="flex gap-3">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">01</span>
                <span>The institution is being established. We will respond to genuine enquiries when we are able.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">02</span>
                <span>If you are a prospective learner, the Register Interest form is the fastest way to be contacted when admissions open.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">03</span>
                <span>If you are an employer, partner, or research client, please use the relevant partner enquiry form for a faster response:</span>
                <ul className="mt-2 ml-4 space-y-1 text-sm">
                  <li><Link href="/partners/employers" className="text-[var(--color-brand-maroon)] hover:underline">Employers</Link>: recruit trained staff, host WIL learners</li>
                  <li><Link href="/partners/wil" className="text-[var(--color-brand-maroon)] hover:underline">WIL Partners</Link>: work-integrated learning placements</li>
                  <li><Link href="/partners/corporate" className="text-[var(--color-brand-maroon)] hover:underline">Corporate Training</Link>: commission training for your team</li>
                  <li><Link href="/partners/research" className="text-[var(--color-brand-maroon)] hover:underline">Research & Advisory</Link>: collaborate on commissioned research</li>
                  <li><Link href="/partners/funding" className="text-[var(--color-brand-maroon)] hover:underline">Funding & Institutional</Link>: support institutional establishment</li>
                </ul>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">04</span>
                <span>Contact details such as phone and physical address will be published when the institution is established.</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
