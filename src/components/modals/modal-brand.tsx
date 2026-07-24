'use client';

import { ModalShell } from './modal-shell';

export function BrandModal() {
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

  return (
    <ModalShell eyebrow="Brand" title="Brand Book" size="wide">
      <div className="space-y-12">
        {/* Promise */}
        <section>
          <p className="eyebrow mb-3">Promise</p>
          <p className="font-display text-2xl md:text-4xl font-medium italic leading-tight text-balance">
            Knowledge shaped by the Namibian landscape.
          </p>
          <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed text-pretty">
            The brand promise of Oryx Institute. Not used in body copy or navigation. The promise
            appears only on this page and in approved brand contexts.
          </p>
        </section>

        {/* Logo */}
        <section>
          <p className="eyebrow mb-3">Logo</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            The original transparent PNG only.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-brand-cream)] p-8 border border-[var(--color-border)] flex items-center justify-center aspect-[3/2]">
              { }
              <img src="/oryx-logo.png" alt="Oryx Institute primary logo" className="max-h-24 w-auto" />
            </div>
            <div className="bg-[var(--color-brand-ink)] p-8 border border-[var(--color-border)] flex items-center justify-center aspect-[3/2]">
              { }
              <img src="/oryx-logo.png" alt="Oryx Institute logo on dark background" className="max-h-24 w-auto" />
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-[var(--muted-foreground)]">
            <li>Two-colour ink: maroon illustration + black wordmark.</li>
            <li>Aspect ratio: 3:2 landscape (612 x 408 px supplied).</li>
            <li>Never redrawn, regenerated, reinterpreted, cropped incorrectly, distorted, recoloured, or placed under effects.</li>
            <li>Never inserted into generated images. Never used as a watermark.</li>
          </ul>
        </section>

        {/* Shield */}
        <section>
          <p className="eyebrow mb-3">Shield</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            The oryx emblem.
          </p>
          <div className="bg-[var(--color-brand-cream)] p-8 border border-[var(--color-border)] flex items-center justify-center aspect-[3/2]">
            { }
            <img src="/oryx-shield.png" alt="Oryx Institute shield emblem" className="max-h-32 w-auto" />
          </div>
          <ul className="mt-6 space-y-2 text-sm text-[var(--muted-foreground)]">
            <li>Single-colour ink: maroon only.</li>
            <li>Aspect ratio: 3:4 portrait (412 x 545 px supplied).</li>
            <li>Used as favicon, app icon, and decorative brand mark.</li>
            <li>Never recoloured. Never placed on a busy background without a solid container.</li>
          </ul>
        </section>

        {/* Colours */}
        <section>
          <p className="eyebrow mb-3">Colours</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            Eight verified brand colours.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {swatches.map((s) => (
              <li key={s.hex} className="bg-white p-5 flex items-start gap-4">
                <div
                  className="shrink-0 w-16 h-16 border border-[var(--color-border)]"
                  style={{ backgroundColor: s.hex }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-medium">{s.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mt-0.5">{s.role}</p>
                  <p className="text-xs text-[var(--muted-foreground)] tabular-nums mt-0.5">{s.hex}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">{s.usage}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[var(--muted-foreground)] leading-relaxed">
            All colour pairings verified for WCAG 2.2 contrast. Two pairings are prohibited:
            ink-on-maroon and ink-on-earth. Both fail AA contrast thresholds.
          </p>
        </section>

        {/* Typography */}
        <section>
          <p className="eyebrow mb-3">Typography</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            Editorial serif display. Restrained sans-serif body.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-brand-cream)] p-6 border border-[var(--color-border)]">
              <p className="eyebrow mb-3">Display</p>
              <p className="font-display text-4xl md:text-5xl">Cinzel</p>
              <p className="font-display text-base mt-2 italic">Editorial serif. 400, 500, 600, 700.</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-3 leading-relaxed">
                Used for all headlines, hero copy, pull quotes, and major numerals.
              </p>
            </div>
            <div className="bg-[var(--color-brand-cream)] p-6 border border-[var(--color-border)]">
              <p className="eyebrow mb-3">Body</p>
              <p className="font-sans text-4xl md:text-5xl">Source Sans 3</p>
              <p className="font-sans text-base mt-2">Restrained sans. 300, 400, 500, 600, 700.</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-3 leading-relaxed">
                Used for all body text, captions, labels, and UI controls.
              </p>
            </div>
          </div>
        </section>

        {/* Layout */}
        <section>
          <p className="eyebrow mb-3">Layout</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            Disciplined grids. Deliberate asymmetry.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
            <li className="bg-white p-6">
              <p className="eyebrow mb-2">Grid</p>
              <p className="font-display text-lg">12 / 8 / 4 column</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
                Desktop 12, tablet 8, mobile 4. Maximum content width 1280 px.
              </p>
            </li>
            <li className="bg-white p-6">
              <p className="eyebrow mb-2">Spacing</p>
              <p className="font-display text-lg">4 px modular</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
                4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
              </p>
            </li>
            <li className="bg-white p-6">
              <p className="eyebrow mb-2">Shapes</p>
              <p className="font-display text-lg">0 px radius</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
                1 px borders. No shadows. Floating navigation excepted.
              </p>
            </li>
          </ul>
        </section>

        {/* Photography */}
        <section>
          <p className="eyebrow mb-3">Photography</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            Original commissioned imagery of Namibia.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Warm editorial realism. Cream and sandstone colour cast. Muted maroon accents. Soft sepia
            undertone. Strong but natural directional sunlight. Minimal compositions. One main
            subject per image. No text. No logos. No fantasy architecture. No visibly artificial
            faces or hands. Namibian people shown natural, dignified, contemporary.
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { src: '/images/brand/oryx-dune.webp', alt: 'An oryx in golden savanna grass.' },
              { src: '/images/brand/oryx-chalkboard.webp', alt: 'The institutional crest on a chalkboard surface.' },
              { src: '/images/research/leather-books.webp', alt: 'A stack of technical books on a desk.' },
            ].map((img) => (
              <figure key={img.src} className="relative aspect-[4/3] overflow-hidden bg-[var(--color-brand-cream)] border border-[var(--color-border)]">
                { }
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        {/* Voice */}
        <section>
          <p className="eyebrow mb-3">Voice</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            Sparse. Accurate. Credible. Namibian.
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
            Active voice preferred. Short sentences for emphasis, longer sentences for explanation.
            Headlines are noun phrases or short statements. Calls to action are verbs. Captions
            explain what an image shows and why it matters. No puffery. No superlatives. No jargon.
            No em dashes.
          </p>
          <div className="mt-6 bg-[var(--color-brand-cream)] p-6 border border-[var(--color-border)]">
            <p className="eyebrow mb-3">Prohibited language</p>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              world-class, revolutionary, cutting-edge, unlock, game-changing, seamless, unwavering
              commitment, next generation, em dashes, generic AI language.
            </p>
          </div>
        </section>

        {/* Motion */}
        <section>
          <p className="eyebrow mb-3">Motion</p>
          <p className="font-display text-xl md:text-2xl font-medium leading-tight mb-4">
            Slow. Cinematic. Restrained.
          </p>
          <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
            <li>Page reveals: 600 ms ease cubic-bezier(0.22, 1, 0.36, 1).</li>
            <li>Hover transitions: 200 ms.</li>
            <li>Hero slide transitions: 700 ms cross-fade.</li>
            <li>Auto-advance: 7000 ms per slide, pauseable.</li>
            <li>Reduced-motion: all transitions reduced to 0.001 ms. No parallax. No autoplay.</li>
          </ul>
        </section>
      </div>
    </ModalShell>
  );
}
