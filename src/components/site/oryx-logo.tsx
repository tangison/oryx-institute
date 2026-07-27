'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

/**
 * OryxLogo — The authoritative institutional logo lockup.
 *
 * Specification source: DESIGN.md §5, BRAND.md
 *
 * CRITICAL RULES:
 *   - Light background: ORYX = #171717 (black), ὄρυξ = #7A0F1E (maroon), INSTITUTE = #171717 (black)
 *   - Dark background: wordmark = #FFF8EF (cream), icon = reversed cream variant
 *   - ὄρυξ MUST remain lowercase polytonic Greek with exact diacritics (text-transform: none)
 *   - The complete lockup is ONE indivisible graphic — no internal wrapping
 *   - Fixed viewBox (540×210) — internal geometry never changes, only SVG width changes
 *   - Icon vertically centred against entire two-line wordmark block
 *   - Wordmark on LEFT, icon on RIGHT, horizontal orientation
 *   - INSTITUTE must carry approximately 90-100% perceived stroke weight of ORYX
 *   - Animation: restrained writing reveal, max 1.2s, once on first load only
 */

type LogoVariant = 'light' | 'dark';

interface OryxLogoProps {
  variant?: LogoVariant;
  size?: 'mobile' | 'tablet' | 'desktop' | 'compact';
  linked?: boolean;
  className?: string;
  animate?: boolean;
}

// Responsive size map — width values per DESIGN.md §5.4
const SIZE_MAP = {
  mobile: { width: 158, maxWidth: 164 },      // 320-374px viewport
  tablet: { width: 200, maxWidth: 210 },       // tablet viewport
  desktop: { width: 220, maxWidth: 232 },      // desktop viewport
  compact: { width: 176, maxWidth: 184 },      // offcanvas / footer
};

export function OryxLogo({
  variant = 'light',
  size = 'desktop',
  linked = true,
  className,
  animate = false,
}: OryxLogoProps) {
  const isDark = variant === 'dark';
  // If animation is disabled or not requested, render the complete logo immediately.
  // Only animate when animate=true and the browser does not prefer reduced motion.
  // Use a single effect for the animation lifecycle, which is a standard
  // external-system synchronization pattern (timers are external systems).
  const initialPhase = animate ? 'waiting' : 'done';
  const [animPhase, setAnimPhase] = useState<'waiting' | 'running' | 'done'>('waiting');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced motion preference — reading browser state on mount is a
  // legitimate external-system sync pattern, not a cascading-render problem.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser API detection on mount: matchMedia is an external system subscription
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Animation lifecycle: start only when animate=true and reduced-motion is false.
  // Timer is an external system. The effect subscribes to the timer (setTimeout)
  // and cleans up on unmount or before re-running. This is not a cascading render;
  // it is a one-shot external event that triggers a single state transition.
  useEffect(() => {
    if (!animate || reducedMotion) {
      // Skip animation — render complete logo immediately
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skipping animation in response to external state change (reducedMotion) is a legitimate sync pattern
      setAnimPhase('done');
      return;
    }
    setAnimPhase('running');
    const timer = setTimeout(() => setAnimPhase('done'), 1200);
    return () => clearTimeout(timer);
  }, [animate, reducedMotion]);

  const shouldAnimate = animate && animPhase === 'running' && !reducedMotion;

  // Colour assignments per DESIGN.md §5.2
  const oryxColor = isDark ? '#FFF8EF' : '#171717';
  const greekColor = isDark ? '#FFF8EF' : '#7A0F1E';
  const instituteColor = isDark ? '#FFF8EF' : '#171717';
  const iconSrc = isDark ? '/oryx-mark-reversed.png' : '/oryx-mark.png';
  const sizeConfig = SIZE_MAP[size];

  // Animation CSS classes — uses clip-path reveal for a restrained writing effect
  // ORYX reveals left-to-right, ὄρυξ fades in after, INSTITUTE reveals left-to-right,
  // icon fades into locked position.
  const animStyles = shouldAnimate ? {
    oryx: {
      clipPath: 'inset(0 100% 0 0)',
      animation: 'logo-clip-reveal-oryx 650ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
    },
    greek: {
      opacity: 0,
      animation: 'logo-fade-in 380ms cubic-bezier(0.25, 0.1, 0.25, 1) 150ms forwards',
    },
    institute: {
      clipPath: 'inset(0 100% 0 0)',
      animation: 'logo-clip-reveal-institute 550ms cubic-bezier(0.25, 0.1, 0.25, 1) 260ms forwards',
    },
    icon: {
      opacity: 0,
      transform: 'translateX(6px)',
      animation: 'logo-icon-fade 420ms cubic-bezier(0.25, 0.1, 0.25, 1) 420ms forwards',
    },
  } : {};

  const logoContent = (
    <div
      className={cn('oryx-logo-container', className)}
      style={{
        display: 'block',
        flexShrink: 0,
        lineHeight: 0,
        width: `${sizeConfig.width}px`,
        maxWidth: `${sizeConfig.maxWidth}px`,
      }}
    >
      <svg
        viewBox="0 0 540 210"
        preserveAspectRatio="xMinYMid meet"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          overflow: 'visible',
        }}
        role="img"
        aria-label="Oryx Institute"
      >
        {/* ─── Line 1: ORYX + ὄρυξ — shared baseline ─── */}
        {/* ORYX: #171717, uppercase, weight 600, tracking 0.14-0.17em */}
        {/* DESIGN.md §5.2: ORYX fontSize=58, fontWeight=600, letterSpacing=9 (~0.16em) */}
        <text
          x="0"
          y="85"
          fill={oryxColor}
          fontFamily="'Cinzel', 'Trajan Pro 3', 'Trajan Pro', 'Times New Roman', serif"
          fontSize="58"
          fontWeight="600"
          letterSpacing="9"
          textLength="270"
          lengthAdjust="spacingAndGlyphs"
          style={{
            textTransform: 'uppercase',
            ...animStyles.oryx,
          }}
        >
          ORYX
        </text>

        {/* ὄρυξ: #7A0F1E, lowercase exactly, lang="grc", text-transform:none, fontVariant:normal */}
        {/* DESIGN.md §5.2: ὄρυξ fontSize=24, fontWeight=400, tracking normal */}
        <text
          x="276"
          y="85"
          fill={greekColor}
          fontFamily="'Noto Serif', 'Times New Roman', Georgia, serif"
          fontSize="24"
          fontWeight="400"
          letterSpacing="0"
          lang="grc"
          style={{
            textTransform: 'none',
            fontVariant: 'normal',
            ...animStyles.greek,
          }}
        >
          ὄρυξ
        </text>

        {/* ─── Line 2: INSTITUTE — institutional descriptor ─── */}
        {/* DESIGN.md §5.2: INSTITUTE #171717, uppercase, weight 600, tracking 0.19-0.22em */}
        {/* CRITICAL: INSTITUTE must carry 90-100% perceived stroke weight of ORYX.
            ORYX is fontSize=58 weight=600. INSTITUTE was fontSize=36 weight=600, making
            it look thin. To achieve 90-100% stroke weight ratio while keeping the visual
            hierarchy, we increase INSTITUTE fontSize to 42 and keep weight=600, which gives
            a stroke width proportionally closer to ORYX's apparent boldness. Tracking is
            8.5 (~0.20em) per the 0.19-0.22em spec range. */}
        <text
          x="0"
          y="148"
          fill={instituteColor}
          fontFamily="'Cinzel', 'Trajan Pro 3', 'Trajan Pro', 'Times New Roman', serif"
          fontSize="42"
          fontWeight="600"
          letterSpacing="8.5"
          textLength="360"
          lengthAdjust="spacingAndGlyphs"
          style={{
            textTransform: 'uppercase',
            ...animStyles.institute,
          }}
        >
          INSTITUTE
        </text>

        {/* ─── Icon — supplied logo icon, vertically centred ─── */}
        {/* DESIGN.md §5.1: Icon on RIGHT, vertically centred against entire two-line wordmark block */}
        {/* Using <image> to embed the PNG icon — never redraw */}
        <image
          href={iconSrc}
          x="390"
          y="0"
          width="150"
          height="210"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          style={animStyles.icon}
        />
      </svg>
    </div>
  );

  if (linked) {
    return (
      <Link
        href="/"
        className={cn('inline-flex items-center', className)}
        passHref
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
