import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';

/**
 * PageShell — standard page wrapper for all interior pages.
 * Includes skip link, header, main, footer.
 * Homepage uses its own structure (with ModalProvider) — does not use this.
 */
export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <SiteHeader />
      <main id="main" className={className}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
