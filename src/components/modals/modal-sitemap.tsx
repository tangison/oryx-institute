'use client';

import { ModalShell } from './modal-shell';
import { primaryNav, partnerNav, legalNav, schools, programmes } from '@/lib/content';
import { useModal } from '@/lib/modal-context';

export function SitemapModal() {
  const { open, close } = useModal();

  const goToSection = (target: string, type: 'section' | 'modal') => {
    close();
    setTimeout(() => {
      if (type === 'section') {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        open(target as Parameters<typeof open>[0]);
      }
    }, 100);
  };

  return (
    <ModalShell eyebrow="Sitemap" title="Complete Sitemap" size="wide">
      <div className="space-y-10">
        <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
          A complete map of the Oryx Institute pre-launch website. Click any link to navigate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
          <div className="bg-white p-6">
            <p className="eyebrow mb-4">Primary</p>
            <ul className="space-y-3">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => goToSection(item.target, item.type)}
                    className="text-sm text-[var(--oryx-ink)] hover:text-[var(--oryx-maroon)] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6">
            <p className="eyebrow mb-4">Partners and Contact</p>
            <ul className="space-y-3">
              {partnerNav.map((item) => (
                <li key={item.modal}>
                  <button
                    onClick={() => {
                      close();
                      setTimeout(() => open(item.modal as Parameters<typeof open>[0]), 100);
                    }}
                    className="text-sm text-[var(--oryx-ink)] hover:text-[var(--oryx-maroon)] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Schools</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {schools.map((s) => (
              <li key={s.slug} className="bg-white p-5">
                <button
                  onClick={() => {
                    close();
                    setTimeout(() => open({ school: s.slug }), 100);
                  }}
                  className="block text-left w-full"
                >
                  <span className="block eyebrow text-[var(--oryx-maroon)] mb-1">{s.eyebrow}</span>
                  <span className="font-display text-base font-medium">{s.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Programmes</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {programmes.map((p) => (
              <li key={p.slug} className="bg-white p-5">
                <button
                  onClick={() => {
                    close();
                    setTimeout(() => open({ programme: p.slug }), 100);
                  }}
                  className="block text-left w-full"
                >
                  <span className="block eyebrow text-[var(--oryx-maroon)] mb-1">{p.schoolName}</span>
                  <span className="font-display text-base font-medium">{p.name}</span>
                  <span className="block text-xs text-[var(--muted-foreground)] mt-1">
                    {p.level} · {p.delivery} · {p.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Legal</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
            {legalNav.map((item) => (
              <li key={item.modal} className="bg-white p-5">
                <button
                  onClick={() => {
                    close();
                    setTimeout(() => open(item.modal as Parameters<typeof open>[0]), 100);
                  }}
                  className="text-sm text-[var(--oryx-ink)] hover:text-[var(--oryx-maroon)] transition-colors text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModalShell>
  );
}
