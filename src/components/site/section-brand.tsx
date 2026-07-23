'use client';

import { useReveal } from '@/hooks/use-reveal';
import { useModal } from '@/lib/modal-context';

export function BrandSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { open } = useModal();

  const swatches = [
    { name: 'Oryx Maroon', hex: '#721220', role: 'Primary' },
    { name: 'Deep Maroon', hex: '#4A231B', role: 'Secondary' },
    { name: 'Cream', hex: '#FCFBF9', role: 'Background' },
    { name: 'Warm White', hex: '#EADCCD', role: 'Surface' },
    { name: 'Sand', hex: '#D3C2B1', role: 'Muted' },
    { name: 'Stone', hex: '#BFA68F', role: 'Muted' },
    { name: 'Earth', hex: '#82664E', role: 'Muted' },
    { name: 'Ink Black', hex: '#0F0E0D', role: 'Foreground' },
  ];

  return (
    <section id="brand" className="bg-[var(--color-brand-ink)] text-[var(--color-brand-cream)] py-20 md:py-28 lg:py-32">
      <div ref={ref} className={`container-oryx reveal ${visible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow text-[var(--color-brand-cream)] mb-4">Brand</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              The visual identity.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-brand-cream)]/80 text-pretty">
              The brand system is built from the Namibian landscape, the supplied oryx emblem, and a
              restrained editorial register. Maroon, cream, ink. Serif display, sans-serif body.
              Zero radius. One pixel borders. No shadows.
            </p>
            <p className="mt-4 font-display text-lg italic text-[var(--color-brand-cream)]/90">
              Knowledge shaped by the Namibian landscape.
            </p>
            <button onClick={() => open('brand')} className="mt-8 btn-secondary" style={{ color: 'var(--color-brand-cream)', borderColor: 'var(--color-brand-cream)' }}>
              Open the Brand Book
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--color-brand-cream)]/15">
              {swatches.map((s) => (
                <div key={s.hex} className="bg-[var(--color-brand-ink)] p-4">
                  <div
                    className="aspect-square mb-3 border border-[var(--color-brand-cream)]/20"
                    style={{ backgroundColor: s.hex }}
                    aria-hidden="true"
                  />
                  <p className="font-display text-sm">{s.name}</p>
                  <p className="text-xs text-[var(--color-brand-cream)]/60 uppercase tracking-wider mt-1">{s.role}</p>
                  <p className="text-xs text-[var(--color-brand-cream)]/60 mt-1 tabular-nums">{s.hex}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--color-brand-ink)] border border-[var(--color-brand-cream)]/20 p-6">
                <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-3">Display</p>
                <p className="font-display text-3xl md:text-4xl">Fraunces</p>
                <p className="text-xs text-[var(--color-brand-cream)]/60 mt-2">Editorial serif. 400, 500, 600, 700.</p>
              </div>
              <div className="bg-[var(--color-brand-ink)] border border-[var(--color-brand-cream)]/20 p-6">
                <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-3">Body</p>
                <p className="font-sans text-3xl md:text-4xl">Inter</p>
                <p className="text-xs text-[var(--color-brand-cream)]/60 mt-2">Restrained sans. 400, 500, 600, 700.</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-px bg-[var(--color-brand-cream)]/15">
              <div className="bg-[var(--color-brand-ink)] p-6">
                <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-2">Radius</p>
                <p className="font-display text-lg">0 px</p>
              </div>
              <div className="bg-[var(--color-brand-ink)] p-6">
                <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-2">Border</p>
                <p className="font-display text-lg">1 px</p>
              </div>
              <div className="bg-[var(--color-brand-ink)] p-6">
                <p className="eyebrow text-[var(--color-brand-cream)]/60 mb-2">Shadows</p>
                <p className="font-display text-lg">None</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
