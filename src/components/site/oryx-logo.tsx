/**
 * The Oryx logo, served as the official artwork's own vector files
 * from /brand/*.svg: zero rasterization, zero font dependency, cached
 * by the browser after the first page. The previous build inlined the
 * path data twice on every route (header and footer), which put about
 * 67 KB of SVG into every HTML response; serving the same artwork as
 * files removes it from the document entirely.
 *
 * Variants:
 * - "lockup"  ORYX 理工 INSTITUTE with the shield
 * - "wordmark" ORYX 理工 INSTITUTE without the shield
 * - "emblem"   the shield alone
 *
 * Tones:
 * - "brand"   ink letters, maroon 理工 and shield (for light grounds)
 * - "reverse" all ivory (for ink and maroon grounds)
 * - "mono"    everything one colour; no route uses it, so it serves
 *             the brand files
 */

type Variant = "lockup" | "wordmark" | "emblem";
type Tone = "brand" | "reverse" | "mono";

const SRC: Record<Variant, Record<Tone, string>> = {
  lockup: {
    brand: "/brand/oryx-lockup.svg",
    reverse: "/brand/oryx-lockup-ivory.svg",
    mono: "/brand/oryx-lockup.svg",
  },
  wordmark: {
    brand: "/brand/oryx-wordmark.svg",
    reverse: "/brand/oryx-wordmark-ivory.svg",
    mono: "/brand/oryx-wordmark.svg",
  },
  emblem: {
    brand: "/brand/oryx-emblem.svg",
    reverse: "/brand/oryx-emblem-ivory.svg",
    mono: "/brand/oryx-emblem.svg",
  },
};

/* Intrinsic boxes from each artwork's viewBox, so the img carries
   width and height and reserves its place before the file lands. */
const BOX: Record<Variant, [number, number]> = {
  lockup: [646, 223],
  wordmark: [465, 223],
  emblem: [147, 192],
};

export function OryxLogo({
  variant = "lockup",
  tone = "brand",
  className,
  title,
  loading = "eager",
}: {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  title?: string;
  /** The header mark loads with the page; the footer mark sits below
   *  the fold on every route and loads as it approaches view. */
  loading?: "lazy" | "eager";
}) {
  const [w, h] = BOX[variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC[variant][tone]}
      width={w}
      height={h}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
}
