'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * VideoCarousel — seamless looping video carousel for the institutional profile.
 *
 * Each video uses the same dual-video cross-fade technique as the hero to
 * ensure NO visible stutter between loops. The carousel auto-advances with
 * a cross-fade between videos, and each video loops seamlessly within its slot.
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
const LOOP_FADE_TRIGGER_S = 0.25;
const LOOP_FADE_MS = 150;

export function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Seamless loop refs per video slot — each slot has two <video> elements
  const videoARefs = useRef<(HTMLVideoElement | null)[]>([]);
  const videoBRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeStates = useRef<('A' | 'B')[]>(CAROUSEL_VIDEOS.map(() => 'A'));
  const frontStates = useRef<('A' | 'B')[]>(CAROUSEL_VIDEOS.map(() => 'A'));
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

      const startLoop = () => {
        const dur = videoA.duration;
        if (!dur || dur === Infinity || dur <= 0) return;

        videoA.currentTime = 0;
        videoA.play().catch(() => {});
        videoB.currentTime = 0;
        videoB.pause();

        const monitor = () => {
          const currentActive = activeStates.current[idx];
          const front = currentActive === 'A' ? videoARefs.current[idx] : videoBRefs.current[idx];
          const back = currentActive === 'A' ? videoBRefs.current[idx] : videoARefs.current[idx];

          if (!front || !back) {
            rafRefs.current[idx] = requestAnimationFrame(monitor);
            return;
          }

          const remaining = dur - front.currentTime;

          if (remaining <= LOOP_FADE_TRIGGER_S) {
            // Cross-fade: start back video, swap active
            back.currentTime = 0;
            back.play().catch(() => {});

            const newActive = currentActive === 'A' ? 'B' : 'A';
            activeStates.current[idx] = newActive;
            frontStates.current[idx] = newActive;

            const oldFront = front;
            setTimeout(() => {
              oldFront.pause();
              oldFront.currentTime = 0;
            }, LOOP_FADE_MS + 80);

            // Continue monitoring after settling
            setTimeout(() => {
              if (rafRefs.current[idx]) cancelAnimationFrame(rafRefs.current[idx]);
              rafRefs.current[idx] = requestAnimationFrame(monitor);
            }, LOOP_FADE_MS + 120);
            return;
          }

          rafRefs.current[idx] = requestAnimationFrame(monitor);
        };

        rafRefs.current[idx] = requestAnimationFrame(monitor);
      };

      if (videoA.readyState >= 1 && videoA.duration > 0 && videoA.duration !== Infinity) {
        startLoop();
      } else {
        videoA.addEventListener('loadedmetadata', startLoop, { once: true });
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
    if (!reducedMotion) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  // When carousel switches to a new video, start that video playing
  useEffect(() => {
    if (reducedMotion) return;

    // Pause all non-active videos, start active video
    CAROUSEL_VIDEOS.forEach((_, idx) => {
      const videoA = videoARefs.current[idx];
      const videoB = videoBRefs.current[idx];
      if (!videoA || !videoB) return;

      if (idx === activeIndex) {
        const frontKey = frontStates.current[idx];
        const front = frontKey === 'A' ? videoA : videoB;
        front.play().catch(() => {});
      } else {
        videoA.pause();
        videoB.pause();
      }
    });
  }, [activeIndex, reducedMotion]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Institutional video showcase"
      aria-labelledby="profile-heading"
      className="relative w-full overflow-hidden bg-[var(--color-brand-ink)]"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocus={() => setPlaying(false)}
      onBlur={() => setPlaying(true)}
    >
      {/* Hidden heading for accessibility */}
      <h2 id="profile-heading" className="sr-only">Institutional Profile</h2>

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

            {/* Video A — seamless loop layer */}
            <video
              ref={(el) => { videoARefs.current[idx] = el; }}
              className="absolute inset-0 w-full h-full object-cover hero-video"
              autoPlay={idx === 0}
              muted
              playsInline
              preload={idx === 0 ? 'metadata' : 'none'}
              aria-hidden="true"
              onEnded={handleVideoEnded}
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>

            {/* Video B — seamless loop layer (hidden until cross-fade swap) */}
            <video
              ref={(el) => { videoBRefs.current[idx] = el; }}
              className="absolute inset-0 w-full h-full object-cover hero-video"
              muted
              playsInline
              preload={idx === 0 ? 'metadata' : 'none'}
              aria-hidden="true"
              onEnded={handleVideoEnded}
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>

            {/* Gradient overlay — tokenised */}
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
