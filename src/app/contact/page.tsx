import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section } from '@/components/site/section';
import { ContactForm } from '@/components/site/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Oryx Institute. Prospective learners, employers, partners, and research clients are welcome. We will respond to serious enquiries.',
  alternates: { canonical: 'https://oryxinstitute.na/contact' },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Contact"
        title="Contact Oryx Institute."
        lede="Prospective learners, employers, partners, and research clients are welcome. We will respond to serious enquiries."
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
                <span>The institution is being established. We will respond to serious enquiries when we are able.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">02</span>
                <span>If you are a prospective learner, the Register Interest form is the fastest way to be contacted when admissions open.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-[var(--color-brand-maroon)] shrink-0">03</span>
                <span>If you are an employer, partner, or research client, please use the relevant partner enquiry form for a faster response.</span>
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
