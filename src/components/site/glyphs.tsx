/**
 * The three engine glyphs (Research / Practice / Ventures), redrawn as
 * quiet line marks after the build pack's SVGs: 1.4px strokes,
 * currentColor, no fills. They sit on the ink engines band, where they
 * take the ivory.
 */

export function GlyphResearch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Open book */}
      <path d="M10 44 Q32 34 54 44 L54 52 Q32 42 10 52 Z" />
      <path d="M32 37 L32 52" />
      <path d="M16 44.2 L28 41" />
      <path d="M16 48.2 L28 45" />
      <path d="M36 41 L48 44.2" />
      <path d="M36 45 L48 48.2" />
      {/* Magnifier */}
      <circle cx="45" cy="21" r="8" />
      <path d="M50.8 26.8 L57.5 33.5" strokeWidth="2" />
    </svg>
  );
}

export function GlyphPractice({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Anvil */}
      <path d="M14 42 H50" />
      <path d="M14 42 Q10 42 8 39 H14" />
      <path d="M22 48 H42" />
      <path d="M26 48 L24 55 H40 L38 48" />
      {/* Hammer */}
      <rect x="37" y="18" width="13" height="9" />
      <path d="M37 22.5 L20 39.5" strokeWidth="2" />
    </svg>
  );
}

export function GlyphVentures({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Ground */}
      <path d="M9 55 H55" strokeWidth="1.6" />
      {/* Stem */}
      <path d="M32 55 L32 27" strokeWidth="1.8" />
      {/* Three leaves */}
      <path d="M32 47 Q24 43 17.5 44.5 Q24 49 32 47 Z" />
      <path d="M32 39 Q40 34.5 47 36 Q40.5 41 32 39 Z" />
      <path d="M32 30 Q26.5 25.5 22 26.5 Q28 31.5 32 30 Z" />
      {/* Bud */}
      <circle cx="32" cy="22.5" r="2.2" />
    </svg>
  );
}
