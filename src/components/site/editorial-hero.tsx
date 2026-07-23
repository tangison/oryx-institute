import Link from 'next/link';

/**
 * EditorialHero — Collins-style restraint, now with a seamless video loop.
 *
 * Layering (back to front):
 *   1. <img> poster — always visible. Acts as the LCP element and as the
 *      permanent fallback if video cannot play (reduced motion, no JS,
 *      unsupported codec, slow connection).
 *   2. <video> on top — transparent until it plays, then covers the poster.
 *      WebM first (better compression), MP4 fallback. Muted/loop/playsInline
 *      for iOS autoplay. preload="metadata" keeps first paint fast.
 *   3. Photo-dark gradient (DESIGN.md §6.4) for left-weighted legibility.
 *   4. Top + bottom fades for header and headline legibility.
 *   5. Content: eyebrow, display headline, supporting line, two actions.
 *
 * Accessibility:
 *   - prefers-reduced-motion users get the static poster only (video is
 *     hidden via CSS in globals.css), satisfying DESIGN.md §14.
 *   - Video is aria-hidden — it is decorative; the heading carries meaning.
 */
export function EditorialHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[88svh] flex items-end overflow-hidden bg-[var(--color-brand-ink)]"
    >
      {/* Layer 1 — still poster (always visible, instant paint, LCP) */}
      <img
        src="/hero/oryx-loop-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />

      {/* Layer 2 — looping video on top. Portrait 2:3, object-cover so it
          scales cleanly across mobile (full bleed) and desktop (center
          column visible). Hidden under prefers-reduced-motion via CSS. */}
      <video
        className="absolute inset-0 w-full h-full object-cover hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero/oryx-loop.webm" type="video/webm" />
        <source src="/hero/oryx-loop.mp4" type="video/mp4" />
      </video>

      {/* Layer 3 — DESIGN.md §6.4 gradient-photo-dark, left-weighted */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(23, 23, 23, 0.86) 0%, rgba(74, 7, 16, 0.56) 52%, rgba(74, 7, 16, 0.10) 100%)',
        }}
      />
      {/* Layer 4a — bottom fade so the headline reads cleanly above the index */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgba(23,23,23,0.55)] to-transparent" />
      {/* Layer 4b — top fade so the header reads cleanly over the video */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[rgba(23,23,23,0.55)] to-transparent" />

      {/* Layer 5 — content */}
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
