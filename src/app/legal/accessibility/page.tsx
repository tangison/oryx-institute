import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { PageHeader } from '@/components/site/page-header';
import { Prose, ProseSection } from '@/components/site/prose';
import { Section } from '@/components/site/section';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'The accessibility of the Oryx Institute pre-launch website. WCAG 2.2 AA target, known limitations, and how to report issues.',
  alternates: { canonical: 'https://oryx-institute.vercel.app/legal/accessibility' },
  openGraph: { url: 'https://oryx-institute.vercel.app/legal/accessibility' },
  robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Accessibility Statement"
        lede="Oryx Institute is committed to making this website accessible to everyone, including people with disabilities. This statement explains the accessibility of the pre-launch website."
      />
      <Section tone="cream">
        <div className="max-w-3xl">
          <Prose>
            <ProseSection eyebrow="Standard">
              <p>
                This website aims to meet WCAG 2.2 AA as a minimum. Where the brand system allows,
                the website also meets AAA. Most brand colour pairings achieve AAA contrast. Two
                pairings are prohibited under the brand system because they fail AA: ink on maroon
                and ink on earth.
              </p>
            </ProseSection>
            <ProseSection eyebrow="What we do">
              <ul className="space-y-2 list-disc pl-5">
                <li>Semantic HTML with proper heading hierarchy.</li>
                <li>Keyboard navigation for all interactive elements.</li>
                <li>Visible focus indicators (2 px maroon outline with 2 px offset).</li>
                <li>ARIA labels where native semantics are insufficient.</li>
                <li>Alt text for all meaningful images. Empty alt for decorative images.</li>
                <li>Form labels associated with inputs. Error messages associated via ARIA.</li>
                <li>Reduced-motion respected. All motion disabled when prefers-reduced-motion is set.</li>
                <li>Skip-to-content link at the top of every page.</li>
                <li>Live regions for dynamic form feedback.</li>
              </ul>
            </ProseSection>
            <ProseSection eyebrow="Known limitations">
              <p>
                Some third-party content or future integrations may not be fully accessible. The
                pre-launch website does not include video, audio, or complex interactive widgets.
                When such features are added, accessibility will be considered from the start.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Reporting an issue">
              <p>
                If you encounter an accessibility issue on this website, please use the contact form
                to report it. Include the page, the issue, and the assistive technology you are
                using. We take accessibility reports seriously and will respond.
              </p>
            </ProseSection>
            <ProseSection eyebrow="Compatibility">
              <p>
                This website is tested on current versions of Chrome, Firefox, Safari, and Edge at
                screen widths of 320, 375, 414, 768, 1024, 1280, and 1440 pixels. The website is
                designed to be usable with screen readers including NVDA, VoiceOver, and TalkBack.
              </p>
            </ProseSection>
          </Prose>
          <p className="mt-12 pt-6 border-t border-[var(--color-border)] text-xs text-[var(--muted-foreground)]">
            Last reviewed: July 2026. Pre-launch version.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
