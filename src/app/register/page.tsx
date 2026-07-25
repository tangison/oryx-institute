import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Section } from '@/components/site/section';
import { RegisterForm } from '@/components/site/forms/register-form';

export const metadata: Metadata = {
  title: 'Register Interest',
  description: 'Register your interest in Oryx Institute. Tell us what you want to study. We will contact you when admissions open.',
  alternates: { canonical: 'https://oryx-institute.vercel.app/register' },
};

export default function RegisterPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Register Interest"
        title="Register your interest."
        lede="Tell us what you want to study. We will contact you when admissions open. All programmes are planned and subject to approval."
      />
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">How it works</p>
            <p className="font-display text-xl md:text-2xl font-medium leading-tight text-balance mb-6">
              Three steps. No obligation.
            </p>
            <dl className="space-y-6">
              <div className="grid grid-cols-[auto_1fr] gap-5 items-start">
                <dt className="font-display text-3xl text-[var(--color-brand-maroon)] font-medium tabular-nums">01</dt>
                <dd>
                  <p className="font-display text-base mb-1">Tell us about you</p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Your name, contact, and where you are in Namibia.
                  </p>
                </dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-5 items-start">
                <dt className="font-display text-3xl text-[var(--color-brand-maroon)] font-medium tabular-nums">02</dt>
                <dd>
                  <p className="font-display text-base mb-1">Choose your programme</p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Select from the planned catalogue or indicate a general area of interest.
                  </p>
                </dd>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-5 items-start">
                <dt className="font-display text-3xl text-[var(--color-brand-maroon)] font-medium tabular-nums">03</dt>
                <dd>
                  <p className="font-display text-base mb-1">We will be in touch</p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    When admissions open, we will contact you with next steps.
                  </p>
                </dd>
              </div>
            </dl>
            <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Your data is stored securely and used only to contact you about Oryx Institute. You
                can ask us to delete your data at any time. See our{' '}
                <Link href="/legal/privacy" className="underline hover:text-[var(--color-brand-maroon)]">Privacy Policy</Link>.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <RegisterForm />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
