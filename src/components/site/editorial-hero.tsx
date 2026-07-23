import Link from 'next/link';

/**
 * EditorialHero — Collins-style restraint.
 * One image. One headline. One supporting line. Two actions.
 * No autoplay. No carousel. No indicators. Just the page.
 */
export function EditorialHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[88svh] flex items-end overflow-hidden bg-[var(--color-brand-ink)]"
    >
      {/* Single still image */}
      <img
        src="/images/hero/hero-1.png"
        alt="An oryx stands alone on a Namibian dune at sunrise, with a wide pale sky above."
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      {/* DESIGN.md §6.4 gradient-photo-dark — left-weighted for legibility */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(23, 23, 23, 0.86) 0%, rgba(74, 7, 16, 0.56) 52%, rgba(74, 7, 16, 0.10) 100%)',
        }}
      />
      {/* Top fade so the header reads cleanly over the image */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[rgba(23,23,23,0.55)] to-transparent" />

      {/* Content */}
      <div className="relative w-full container-oryx pb-16 md:pb-24 pt-32">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-5">
            Windhoek · Namibia · Pre-Launch
          </p>
          <h1
            id="hero-heading"
            className="font-display uppercase text-[var(--color-brand-cream)] text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[0.04em] text-balance hero-headline-shadow"
          >
            Education.<br />
            Skills. Impact.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-[1.0625rem] text-[var(--color-brand-cream)] leading-[1.6] text-pretty hero-body-shadow">
            A multidisciplinary vocational education and training institution
            being established in Windhoek, Namibia.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link href="/register" className="btn-primary justify-center">
              Register Interest
            </Link>
            <Link
              href="/about"
              className="btn-secondary justify-center hero-secondary-btn"
            >
              Explore the Institute
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
