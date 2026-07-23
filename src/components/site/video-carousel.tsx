'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * VideoCarousel — seamless looping video carousel for the institutional profile.
 *
 * Each video uses the same dual-video cross-fade technique as the hero to
 * ensure NO visible stutter between loops. The carousel auto-advances with
 * a cross-fade between videos, and each video loops seamlessly within its slot.
 *
 * Uses the Oryx design system: Cinzel display headings, Source Sans 3 body,
 * maroon accent, cream backgrounds, editorial restraint.
 */

interface CarouselVideo {
  webm: string;
  mp4: string;
  poster: string;
  title: string;
  description: string;
}

const CAROUSEL_VIDEOS: CarouselVideo[] = [
  {
    webm: '/hero/oryx-campus.webm',
    mp4: '/hero/oryx-campus.mp4',
    poster: '/hero/oryx-campus-poster.jpg',
    title: 'The Campus',
    description: 'A glimpse of the spaces where learning will take shape: corridors, arches, and the quiet architecture of serious vocational training.'
  },
  {
    webm: '/hero/oryx-campus-reverse.webm',
    mp4: '/hero/oryx-campus-reverse.mp4',
    poster: '/hero/oryx-campus-reverse-poster.jpg',
    title: 'From Vision to Structure',
    description: 'The institutional vision moving from concept to physical reality. Every corridor, every classroom, every desk: built for impact.'
  },
  {
    webm: '/hero/oryx-campus-kenburns.webm',
    mp4: '/hero/oryx-campus-kenburns.mp4',
    poster: '/hero/oryx-campus-kenburns-poster.jpg',
    title: 'Where Namibia Learns',
    description: 'Arched corridors and windowed halls: the built environment of a vocational institution rooted in the Namibian landscape.'
  },
];

const AUTO_ADVANCE_MS = 8000;
const FADE_DURATION_MS = 400;

export function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Seamless loop refs per video slot
  const videoARefs = useRef<(HTMLVideoElement | null)[]>([]);
  const videoBRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeAStates = useRef<boolean[]>(CAROUSEL_VIDEOS.map(() => true));
  const rafRefs = useRef<(number | null)[]>(CAROUSEL_VIDEOS.map(() => null));

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!playing || reducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % CAROUSEL_VIDEOS.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, reducedMotion]);

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % CAROUSEL_VIDEOS.length), []);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + CAROUSEL_VIDEOS.length) % CAROUSEL_VIDEOS.length), []);

  // Initialize seamless loops for all videos
  useEffect(() => {
    if (reducedMotion) return;

    CAROUSEL_VIDEOS.forEach((_, idx) => {
      const videoA = videoARefs.current[idx];
      const videoB = videoBRefs.current[idx];
      if (!videoA || !videoB) return;

      const initLoop = () => {
        const dur = videoA.duration;
        if (!dur || dur === Infinity) return;

        videoA.play().catch(() => {});
        videoB.currentTime = 0;
        videoB.pause();

        const checkLoop = () => {
          const isA = activeAStates.current[idx];
          const front = isA ? videoARefs.current[idx] : videoBRefs.current[idx];
          const back = isA ? videoBRefs.current[idx] : videoARefs.current[idx];
          if (!front || !back) return;

          const remaining = dur - front.currentTime;
          if (remaining <= 0.2) {
            back.currentTime = 0;
            back.play().catch(() => {});
            activeAStates.current[idx] = !isA;

            // Force re-render for the opacity swap
            setTimeout(() => {
              const oldFront = !isA ? videoARefs.current[idx] : videoBRefs.current[idx];
              if (oldFront) {
                oldFront.pause();
                oldFront.currentTime = 0;
              }
            }, FADE_DURATION_MS + 50);

            // Restart loop check for new active video
            setTimeout(() => {
              if (rafRefs.current[idx]) cancelAnimationFrame(rafRefs.current[idx]);
              const checkAgain = () => {
                const newIsA = activeAStates.current[idx];
                const newFront = newIsA ? videoARefs.current[idx] : videoBRefs.current[idx];
                const newBack = newIsA ? videoBRefs.current[idx] : videoARefs.current[idx];
                if (!newFront || !newBack) return;

                const rem = dur - newFront.currentTime;
                if (rem <= 0.2) {
                  newBack.currentTime = 0;
                  newBack.play().catch(() => {});
                  activeAStates.current[idx] = !newIsA;
                  setTimeout(() => {
                    const old = !newIsA ? videoARefs.current[idx] : videoBRefs.current[idx];
                    if (old) { old.pause(); old.currentTime = 0; }
                  }, FADE_DURATION_MS + 50);
                  setTimeout(() => {
                    if (rafRefs.current[idx]) cancelAnimationFrame(rafRefs.current[idx]);
                    rafRefs.current[idx] = requestAnimationFrame(checkAgain);
                  }, FADE_DURATION_MS + 100);
                  return;
                }
                rafRefs.current[idx] = requestAnimationFrame(checkAgain);
              };
              rafRefs.current[idx] = requestAnimationFrame(checkAgain);
            }, FADE_DURATION_MS + 100);
            return;
          }
          rafRefs.current[idx] = requestAnimationFrame(checkLoop);
        };

        rafRefs.current[idx] = requestAnimationFrame(checkLoop);
      };

      if (videoA.readyState >= 1 && videoA.duration > 0) {
        initLoop();
      } else {
        videoA.addEventListener('loadedmetadata', initLoop, { once: true });
      }
    });

    return () => {
      rafRefs.current.forEach((raf) => {
        if (raf) cancelAnimationFrame(raf);
      });
    };
  }, [reducedMotion]);

  // Fallback ended handler
  const handleVideoEnded = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!reducedMotion && video.paused) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Institutional video showcase"
      className="relative w-full overflow-hidden bg-[var(--color-brand-ink)]"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocus={() => setPlaying(false)}
      onBlur={() => setPlaying(true)}
    >
      {/* Video panels — only the active one is visible */}
      {CAROUSEL_VIDEOS.map((video, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={idx}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${FADE_DURATION_MS}ms ease-[cubic-bezier(0.2,0,0,1)]`,
              zIndex: isActive ? 1 : 0,
            }}
            aria-hidden={!isActive}
          >
            {/* Poster fallback */}
            <img
              src={video.poster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />

            {/* Video A */}
            <video
              ref={(el) => { videoARefs.current[idx] = el; }}
              className="absolute inset-0 w-full h-full object-cover hero-video"
              autoPlay={idx === 0}
              muted
              playsInline
              preload={idx === 0 ? 'metadata' : 'none'}
              aria-hidden="true"
              onEnded={handleVideoEnded}
              style={{
                opacity: 1,
              }}
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>

            {/* Gradient overlay — tokenised (Hallmark P0-1 fix) */}
            <div className="absolute inset-0 gradient-photo-dark-soft" />
            <div className="absolute inset-x-0 bottom-0 h-32 gradient-fade-bottom" />
            <div className="absolute inset-x-0 top-0 h-16 gradient-fade-top" />
          </div>
        );
      })}

      {/* Carousel content overlay */}
      <div className="relative w-full container-oryx py-16 md:py-20 min-h-[70svh] flex flex-col justify-end">
        <div className="max-w-2xl">
          <p className="eyebrow text-[var(--color-brand-cream)] mb-4">
            {CAROUSEL_VIDEOS[activeIndex].title}
          </p>
          <p className="text-base md:text-[1.0625rem] text-[var(--color-brand-cream)] leading-[1.6] text-pretty hero-body-shadow max-w-lg">
            {CAROUSEL_VIDEOS[activeIndex].description}
          </p>
        </div>
      </div>

      {/* Carousel controls — bottom right */}
      <div className="absolute bottom-6 md:bottom-8 right-0 container-oryx flex items-center justify-end gap-2 opacity-60 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <button
          onClick={prev}
          className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-brand-cream)]/30 text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-ink)] focus-visible:outline-3 focus-visible:outline-[var(--color-brand-cream)] focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_5px_var(--color-brand-ink)] transition-colors duration-200"
          aria-label="Previous video"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-brand-cream)]/30 text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-ink)] focus-visible:outline-3 focus-visible:outline-[var(--color-brand-cream)] focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_5px_var(--color-brand-ink)] transition-colors duration-200"
          aria-label={playing ? 'Pause carousel' : 'Play carousel'}
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="2" y="1" width="3" height="10" fill="currentColor" />
              <rect x="7" y="1" width="3" height="10" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 1L11 6L2 11V1Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button
          onClick={next}
          className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-brand-cream)]/30 text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-ink)] focus-visible:outline-3 focus-visible:outline-[var(--color-brand-cream)] focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_5px_var(--color-brand-ink)] transition-colors duration-200"
          aria-label="Next video"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      {/* Slide position indicator — bottom left */}
      <div
        className="absolute bottom-6 md:bottom-8 left-0 container-oryx flex items-center gap-3"
        aria-live="polite"
      >
        <span className="font-display text-[var(--color-brand-cream)] text-sm tabular-nums tracking-[0.04em]">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-[var(--color-brand-cream)]/40 text-sm">/</span>
        <span className="text-[var(--color-brand-cream)]/40 text-sm tabular-nums">
          {String(CAROUSEL_VIDEOS.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
