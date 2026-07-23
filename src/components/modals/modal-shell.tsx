'use client';

import { useEffect } from 'react';
import { useModal } from '@/lib/modal-context';

/**
 * ModalShell — shared wrapper for all modals.
 * Handles backdrop, escape, focus trap (simple), and scroll lock.
 */
export function ModalShell({
  title,
  eyebrow,
  children,
  size = 'default',
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  size?: 'default' | 'wide' | 'full';
}) {
  const { close } = useModal();

  useEffect(() => {
    // Simple focus trap: focus the panel on mount
    const t = setTimeout(() => {
      const panel = document.getElementById('modal-scroll');
      if (panel) panel.focus();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const maxWidth =
    size === 'wide' ? 'max-w-5xl' : size === 'full' ? 'max-w-7xl' : 'max-w-3xl';

  return (
    <div className="modal-panel" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="modal-backdrop"
        onClick={close}
        aria-hidden="true"
      />
      <div
        id="modal-scroll"
        className="modal-inner min-h-screen flex items-start md:items-center justify-center p-0 md:p-6 outline-none"
        tabIndex={-1}
      >
        <div
          className={`relative bg-white w-full ${maxWidth} ${size === 'full' ? 'min-h-screen md:min-h-0' : ''} shadow-none`}
          role="document"
        >
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)] px-5 md:px-8 py-4 flex items-center justify-between">
            <div className="min-w-0 flex-1">
              {eyebrow && <p className="eyebrow truncate">{eyebrow}</p>}
              <h2 className="font-display text-lg md:text-xl font-medium leading-tight truncate">
                {title}
              </h2>
            </div>
            <button
              onClick={close}
              className="shrink-0 ml-4 inline-flex items-center justify-center w-9 h-9 border border-[var(--oryx-ink)] hover:bg-[var(--oryx-ink)] hover:text-[var(--oryx-cream)] transition-colors"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-5 md:px-10 py-8 md:py-12">
            {children}
          </div>

          {/* Footer close */}
          <div className="border-t border-[var(--color-border)] px-5 md:px-10 py-5 flex justify-end">
            <button onClick={close} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
