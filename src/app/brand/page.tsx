import type { Metadata } from 'next';
import { PageShell } from '@/components/site/page-shell';
import { ImagePageHeader } from '@/components/site/image-page-header';
import { Section, SectionHeader } from '@/components/site/section';

export const metadata: Metadata = {
  title: 'Brand',
  description:
    'The Oryx Institute brand book. Promise, logo, shield, colours, typography, layout, photography, voice, and motion principles.',
  alternates: { canonical: 'https://oryxinstitute.na/brand' },
};

const swatches = [
  { name: 'Oryx Maroon', hex: '#721220', role: 'Primary', usage: 'Logos, primary buttons, accents, links on light backgrounds.' },
  { name: 'Deep Maroon', hex: '#4A231B', role: 'Secondary', usage: 'Hover states, deep accents.' },
  { name: 'Cream', hex: '#FCFBF9', role: 'Background', usage: 'Page background, primary surface.' },
  { name: 'Warm White', hex: '#EADCCD', role: 'Surface', usage: 'Alternate sections, callout surfaces.' },
  { name: 'Sand', hex: '#D3C2B1', role: 'Muted', usage: 'Borders, dividers, low-emphasis surfaces.' },
  { name: 'Stone', hex: '#BFA68F', role: 'Muted', usage: 'Decorative elements, muted imagery.' },
  { name: 'Earth', hex: '#82664E', role: 'Muted', usage: 'Secondary text on light backgrounds.' },
  { name: 'Ink Black', hex: '#0F0E0D', role: 'Foreground', usage: 'Primary text, secondary buttons, dark sections.' },
];

export default function BrandPage() {
  return (
    <PageShell>
      <ImagePageHeader
        eyebrow="Brand"
        title="Brand Book"
        lede="The visual and verbal system for Oryx Institute. Every choice is deliberate. Every rule is verified."
        image="/images/brand/oryx-chalkboard.webp"
        alt="A hand-drawn oryx shield motif sketched on a dark chalkboard surface."
      />

      <Section tone="dark">
        <div className="max-w-4xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Promise</p>
          <p className="font-display text-4xl md:text-5xl lg:text-6xl font-medium italic leading-[1.05] tracking-tight text-balance">
            Knowledge shaped by the Namibian landscape.
          </p>
          <p className="mt-6 text-[var(--color-brand-cream)]/75 text-lg leading-relaxed text-pretty max-w-2xl">
            The brand promise of Oryx Institute. Not used in body copy or navigation. The promise
            appears only on this page and in approved brand contexts.
          </p>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="Logo"
          title="The original transparent PNG only."
          lede="Two-colour ink: maroon illustration plus black wordmark. Never redrawn, regenerated, reinterpreted, cropped, distorted, recoloured, or placed under effects."
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-brand-cream)] p-12 border border-[var(--color-border)] flex items-center justify-center aspect-[3/2]">
            <img src="/oryx-logo.png" alt="Oryx Institute primary logo on cream" className="max-h-28 w-auto" />
          </div>
          <div className="bg-[var(--color-brand-ink)] p-12 border border-[var(--color-border)] flex items-center justify-center aspect-[3/2]">
            <img src="/oryx-logo.png" alt="Oryx Institute logo on dark background" className="max-h-28 w-auto" />
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--muted-foreground)]">
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Aspect ratio: 3:2 landscape (612 x 408 px supplied).</li>
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Two-colour ink: maroon illustration plus black wordmark.</li>
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Never inserted into generated images or used as a watermark.</li>
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Never redrawn, recoloured, distorted, or placed under effects.</li>
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Shield and Mark"
          title="The oryx emblem."
          lede="Single-colour ink: maroon only. Used as favicon, app icon, and decorative brand mark."
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-brand-cream)] p-12 border border-[var(--color-border)] flex items-center justify-center aspect-[3/2]">
            <img src="/oryx-shield.png" alt="Oryx Institute shield emblem" className="max-h-40 w-auto" />
          </div>
          <div className="bg-[var(--color-brand-cream)] p-12 border border-[var(--color-border)] flex items-center justify-center aspect-[3/2]">
            <img src="/oryx-mark.png" alt="Oryx Institute shield mark extracted from logo" className="max-h-40 w-auto" />
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--muted-foreground)]">
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Shield aspect ratio: 3:4 portrait (412 x 545 px supplied).</li>
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Mark: shield portion extracted from the primary logo, no wordmark.</li>
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Never recoloured. Never placed on a busy background without a solid container.</li>
          <li className="flex gap-3"><span className="text-[var(--color-brand-maroon)]">+</span> Used as favicon, app icon, and large decorative brand mark.</li>
        </ul>
      </Section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="Colours"
          title="Eight verified brand colours."
          lede="All colour pairings verified for WCAG 2.2 contrast. Two pairings are prohibited: ink-on-maroon and ink-on-earth. Both fail AA."
        />
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
          {swatches.map((s) => (
            <li key={s.hex} className="bg-white p-6 flex items-start gap-5">
              <div
                className="shrink-0 w-20 h-20 border border-[var(--color-border)]"
                style={{ backgroundColor: s.hex }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-medium">{s.name}</p>
                <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mt-1">{s.role}</p>
                <p className="text-xs text-[var(--muted-foreground)] tabular-nums mt-1">{s.hex}</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">{s.usage}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Typography"
          title="Editorial serif display. Restrained sans-serif body."
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-brand-cream)] p-10 border border-[var(--color-border)]">
            <p className="eyebrow mb-4">Display</p>
            <p className="font-display text-6xl md:text-7xl">Fraunces</p>
            <p className="font-display text-lg mt-3 italic">Editorial serif. 400, 500, 600, 700.</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-4 leading-relaxed">
              Used for all headlines, hero copy, pull quotes, and major numerals. Optical sizing
              enabled. Stylistic sets ss01 and ss02 active.
            </p>
          </div>
          <div className="bg-[var(--color-brand-cream)] p-10 border border-[var(--color-border)]">
            <p className="eyebrow mb-4">Body</p>
            <p className="font-sans text-6xl md:text-7xl">Inter</p>
            <p className="font-sans text-lg mt-3">Restrained sans. 400, 500, 600, 700.</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-4 leading-relaxed">
              Used for all body text, captions, labels, and UI controls. Features cv11 and ss01
              enabled for refined alternates.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="Layout"
          title="Disciplined grids. Deliberate asymmetry."
        />
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
          <li className="bg-white p-8">
            <p className="eyebrow mb-3">Grid</p>
            <p className="font-display text-2xl">12 / 8 / 4 column</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
              Desktop 12, tablet 8, mobile 4. Maximum content width 1280 px. Container padding
              scales with breakpoint.
            </p>
          </li>
          <li className="bg-white p-8">
            <p className="eyebrow mb-3">Spacing</p>
            <p className="font-display text-2xl">4 px modular</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
              4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Every margin and padding is a multiple of 4.
            </p>
          </li>
          <li className="bg-white p-8">
            <p className="eyebrow mb-3">Shapes</p>
            <p className="font-display text-2xl">0 px radius</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
              1 px borders. No shadows. Floating navigation excepted. Sharp corners throughout.
            </p>
          </li>
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Photography"
          title="Original commissioned imagery of Namibia."
          lede="Warm editorial realism. Cream and sandstone colour cast. Muted maroon accents. Soft sepia undertone. Strong but natural directional sunlight."
        />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { src: '/images/brand/oryx-portrait.png', alt: 'A single oryx in golden savanna grass.' },
            { src: '/images/hero/hero-1.png', alt: 'An oryx on a dune at sunrise.' },
            { src: '/images/hero/hero-3.png', alt: 'A stack of technical books on a desk.' },
            { src: '/images/campus/campus-1.png', alt: 'An architectural concept for the campus.' },
            { src: '/images/hero/hero-5.png', alt: 'Skilled hands working on a training bench.' },
            { src: '/images/research/research-1.png', alt: 'A research notebook on a warm surface.' },
          ].map((img) => (
            <figure key={img.src} className="relative aspect-[4/3] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--muted-foreground)] leading-relaxed max-w-3xl">
          Minimal compositions. One main subject per image. No text. No logos. No fantasy
          architecture. No visibly artificial faces or hands. Namibian people shown natural,
          dignified, contemporary.
        </p>
      </Section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="Voice"
          title="Sparse. Accurate. Credible. Namibian."
          lede="Active voice preferred. Short sentences for emphasis, longer sentences for explanation. Headlines are noun phrases or short statements."
        />
        <div className="mt-10 bg-white p-8 border border-[var(--color-border)]">
          <p className="eyebrow mb-4">Prohibited language</p>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            world-class, revolutionary, cutting-edge, unlock, game-changing, seamless, unwavering
            commitment, next generation, em dashes, generic AI language. No puffery. No
            superlatives. No jargon.
          </p>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="Motion"
          title="Slow. Cinematic. Restrained."
          tone="dark"
          lede="Every transition has a purpose. No decorative motion. No parallax. Reduced-motion respected everywhere."
        />
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {[
            { label: 'Page reveals', value: '600 ms ease cubic-bezier(0.22, 1, 0.36, 1)' },
            { label: 'Hover transitions', value: '200 ms' },
            { label: 'Hero slide transitions', value: '700 ms cross-fade' },
            { label: 'Auto-advance', value: '7000 ms per slide, pauseable' },
            { label: 'Reduced-motion', value: '0.001 ms. No parallax. No autoplay.' },
            { label: 'Primary engine', value: 'CSS transitions. GSAP for scroll-triggered sequences.' },
          ].map((m) => (
            <li key={m.label} className="flex items-start gap-4 pb-4 border-b border-[var(--color-brand-cream)]/15">
              <span className="text-[var(--color-brand-cream)]/60 text-xs uppercase tracking-wider w-32 shrink-0 pt-1">
                {m.label}
              </span>
              <span className="font-display text-base text-[var(--color-brand-cream)]">{m.value}</span>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
