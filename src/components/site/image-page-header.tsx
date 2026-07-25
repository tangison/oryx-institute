import { cn } from '@/lib/utils';

/**
 * ImagePageHeader — editorial page header with a single image.
 *
 * Layout: full-bleed image with photo-dark gradient overlay, eyebrow + title +
 * lede typeset over it. Used on about, founder, research, partners, brand.
 *
 * DESIGN.md §11.3 (full-bleed image header) + §6.4 (gradient-photo-dark).
 *
 * Image should be a portrait 2:3 WebP from /images/. The component uses
 * object-cover so any aspect ratio works, but portrait sources compose best
 * because the headline sits left and the image breathes right.
 */
export function ImagePageHeader({
  eyebrow,
  title,
  lede,
  image,
  alt = '',
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  image: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'relative w-full pt-28 md:pt-36 pb-16 md:pb-24 min-h-[60svh] flex items-end overflow-hidden bg-[var(--color-brand-ink)]',
        className
      )}
      data-dark-surface
    >
      {/* Image layer */}
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      {/* Photo-dark gradient, left-weighted for text legibility — uses CSS token */}
      <div className="absolute inset-0 gradient-photo-dark-strong" />
      {/* Top fade for header legibility — CSS token */}
      <div className="absolute inset-x-0 top-0 h-32 gradient-fade-top" />
      {/* Bottom fade for section transition — CSS token */}
      <div className="absolute inset-x-0 bottom-0 h-32 gradient-fade-bottom" />

      <div className="relative w-full container-oryx">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow text-[var(--color-brand-cream)] mb-5">{eyebrow}</p>
          )}
          <h1 className="font-display uppercase text-[var(--color-brand-cream)] text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[0.04em] text-balance hero-headline-shadow">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-base md:text-[1.125rem] leading-[1.6] text-[var(--color-brand-cream)] text-pretty hero-body-shadow">
              {lede}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
