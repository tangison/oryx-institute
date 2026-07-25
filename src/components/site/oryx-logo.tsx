'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

/**
 * OryxLogo — The authoritative institutional logo lockup.
 *
 * Specification source: Brand authority JSON spec provided by Tangison.
 *
 * CRITICAL RULES:
 *   - Light background: ORYX = #171717 (black), ὄρυξ = #7A0F1E (maroon), INSTITUTE = #171717 (black)
 *   - Dark background: wordmark = #FFF8EF (cream), icon = reversed cream variant
 *   - ὄρυξ MUST remain lowercase polytonic Greek with exact diacritics (text-transform: none)
 *   - The complete lockup is ONE indivisible graphic — no internal wrapping
 *   - Fixed viewBox (540×210) — internal geometry never changes, only SVG width changes
 *   - Icon vertically centred against entire two-line wordmark block
 *   - Wordmark on LEFT, icon on RIGHT, horizontal orientation
 *   - Icon = supplied oryx-mark.png (or reversed version for dark bg) — never altered
 *   - Gap ≈ 18%-22% of icon height
 */

type LogoVariant = 'light' | 'dark';

interface OryxLogoProps {
  variant?: LogoVariant;
  size?: 'mobile' | 'tablet' | 'desktop' | 'compact';
  linked?: boolean;
  className?: string;
  animate?: boolean;
}

// Responsive size map — width values per the spec
const SIZE_MAP = {
  mobile: { width: 158, maxWidth: 164 },      // 320-374px viewport range
  tablet: { width: 200, maxWidth: 210 },       // tablet viewport range
  desktop: { width: 220, maxWidth: 232 },      // desktop viewport range
  compact: { width: 176, maxWidth: 184 },      // offcanvas / footer compact size
};

// Animation sequence per spec
const ANIMATION_STEPS = [
  { id: 'anim-oryx', duration: 650, delay: 0 },
  { id: 'anim-greek', duration: 380, delay: 150 },
  { id: 'anim-institute', duration: 550, delay: 260 },
  { id: 'anim-icon', duration: 420, delay: 420 },
];

export function OryxLogo({
  variant = 'light',
  size = 'desktop',
  linked = true,
  className,
  animate = false,
}: OryxLogoProps) {
  const isDark = variant === 'dark';
  const [animDone, setAnimDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Run animation once on first page load only
  useEffect(() => {
    if (!animate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- animation completion state on mount
      setAnimDone(true);
      return;
    }
    const totalDuration = Math.max(...ANIMATION_STEPS.map(s => s.delay + s.duration));
    const timer = setTimeout(() => setAnimDone(true), totalDuration + 50);
    return () => clearTimeout(timer);
  }, [animate]);

  // Detect reduced motion — skip animation
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- legitimate browser API detection on mount
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const shouldAnimate = animate && !animDone && !reducedMotion;

  // Colour assignments per the brand spec
  // Light bg: ORYX = #171717, ὄρυξ = #7A0F1E, INSTITUTE = #171717
  // Dark bg: wordmark = #FFF8EF, icon = reversed cream
  const oryxColor = isDark ? '#FFF8EF' : '#171717';
  const greekColor = isDark ? '#FFF8EF' : '#7A0F1E';
  const instituteColor = isDark ? '#FFF8EF' : '#171717';

  const iconSrc = isDark ? '/oryx-mark-reversed.png' : '/oryx-mark.png';
  const sizeConfig = SIZE_MAP[size];

  const logoContent = (
    <div
      ref={containerRef}
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
        {/* Wordmark region: x=0, y=35, w=360, h=140 */}
        {/* Line 1: ORYX + ὄρυξ — shared baseline */}
        {/* ORYX tracking: 0.14em-0.17em, INSTITUTE tracking: 0.19em-0.22em */}

        {/* ORYX — primary English name */}
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
          style={{ textTransform: 'uppercase' }}
        >
          ORYX
        </text>

        {/* ὄρυξ — Greek companion name, MUST remain lowercase */}
        <text
          x="276"
          y="85"
          fill={greekColor}
          fontFamily="'Noto Serif', 'Times New Roman', Georgia, serif"
          fontSize="24"
          fontWeight="400"
          letterSpacing="0"
          lang="grc"
          style={{ textTransform: 'none', fontVariant: 'normal' }}
        >
          ὄρυξ
        </text>

        {/* INSTITUTE — institutional descriptor */}
        <text
          x="0"
          y="148"
          fill={instituteColor}
          fontFamily="'Cinzel', 'Trajan Pro 3', 'Trajan Pro', 'Times New Roman', serif"
          fontSize="36"
          fontWeight="600"
          letterSpacing="7.5"
          textLength="360"
          lengthAdjust="spacingAndGlyphs"
          style={{ textTransform: 'uppercase' }}
        >
          INSTITUTE
        </text>

        {/* Icon — supplied logo icon on the right, vertically centred */}
        {/* Icon region: x=390, y=0, w=150, h=210 */}
        {/* Using <image> to embed the PNG icon — never redraw */}
        <image
          href={iconSrc}
          x="390"
          y="0"
          width="150"
          height="210"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        />

        {/* Animation masks (SVG mask reveal) — only active when shouldAnimate */}
        {shouldAnimate && (
          <>
            {/* ORYX mask reveal — left to right */}
            <mask id="mask-oryx">
              <rect x="0" y="0" width="0" height="210" fill="white">
                <animate
                  attributeName="width"
                  from="0"
                  to="540"
                  dur="650ms"
                  begin="0ms"
                  fill="freeze"
                />
              </rect>
            </mask>
            {/* ὄρυξ mask reveal */}
            <mask id="mask-greek">
              <rect x="0" y="0" width="540" height="210" fill="white">
                <animate
                  attributeName="x"
                  from="540"
                  to="0"
                  dur="380ms"
                  begin="150ms"
                  fill="freeze"
                />
              </rect>
            </mask>
            {/* INSTITUTE mask reveal — thin horizontal mask */}
            <mask id="mask-institute">
              <rect x="0" y="0" width="0" height="210" fill="white">
                <animate
                  attributeName="width"
                  from="0"
                  to="540"
                  dur="550ms"
                  begin="260ms"
                  fill="freeze"
                />
              </rect>
            </mask>
            {/* Icon fade-in mask */}
            <mask id="mask-icon">
              <rect x="0" y="0" width="540" height="210" fill="white">
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="420ms"
                  begin="420ms"
                  fill="freeze"
                />
              </rect>
            </mask>

            {/* Animated group for ORYX */}
            <g mask="url(#mask-oryx)">
              <text x="0" y="85" fill={oryxColor}
                fontFamily="'Cinzel', 'Trajan Pro 3', 'Trajan Pro', 'Times New Roman', serif"
                fontSize="58" fontWeight="600" letterSpacing="9"
                textLength="270" lengthAdjust="spacingAndGlyphs">ORYX</text>
            </g>

            {/* Animated group for ὄρυξ */}
            <g mask="url(#mask-greek)">
              <text x="276" y="85" fill={greekColor}
                fontFamily="'Noto Serif', 'Times New Roman', Georgia, serif"
                fontSize="24" fontWeight="400" letterSpacing="0">ὄρυξ</text>
            </g>

            {/* Animated group for INSTITUTE */}
            <g mask="url(#mask-institute)">
              <text x="0" y="148" fill={instituteColor}
                fontFamily="'Cinzel', 'Trajan Pro 3', 'Trajan Pro', 'Times New Roman', serif"
                fontSize="36" fontWeight="600" letterSpacing="7.5"
                textLength="360" lengthAdjust="spacingAndGlyphs">INSTITUTE</text>
            </g>

            {/* Animated icon — fade from 0 to 1 */}
            <g mask="url(#mask-icon)">
              <image href={iconSrc} x="390" y="0" width="150" height="210"
                preserveAspectRatio="xMidYMid meet" aria-hidden="true" />
            </g>
          </>
        )}
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
