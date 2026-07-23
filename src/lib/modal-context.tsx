'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ModalId =
  | null
  | 'institute'
  | 'founder'
  | 'research'
  | 'brand'
  | 'faq'
  | 'contact'
  | 'partner-employer'
  | 'partner-wil'
  | 'partner-corporate'
  | 'partner-research'
  | 'partner-funding'
  | 'legal-privacy'
  | 'legal-terms'
  | 'legal-accessibility'
  | 'legal-sitemap'
  | { programme: string }
  | { school: string };

interface ModalContextValue {
  modal: ModalId;
  open: (id: Exclude<ModalId, null>) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalId>(null);

  const open = useCallback((id: Exclude<ModalId, null>) => {
    setModal(id);
  }, []);

  const close = useCallback(() => setModal(null), []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [modal, close]);

  // When opening a modal, scroll to top of panel
  useEffect(() => {
    if (modal) {
      const t = setTimeout(() => {
        const panel = document.getElementById('modal-scroll');
        if (panel) panel.scrollTop = 0;
      }, 0);
      return () => clearTimeout(t);
    }
  }, [modal]);

  return (
    <ModalContext.Provider value={{ modal, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}
