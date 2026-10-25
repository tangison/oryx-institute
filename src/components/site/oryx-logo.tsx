import {
  ORYX_PATH,
  INSTITUTE_PATH,
  LI_GONG_PATH,
  SHIELD_PATH,
  VB_LOCKUP,
  VB_WORDMARK,
  VB_EMBLEM,
} from "./oryx-logo-data";

/**
 * The Oryx logo, rendered from the official artwork's own vector paths:
 * zero rasterization, zero font dependency, currentColor aware.
 *
 * Variants:
 * - "lockup"  ORYX 理工 INSTITUTE with the shield
 * - "wordmark" ORYX 理工 INSTITUTE without the shield
 * - "emblem"   the shield alone
 *
 * Tones:
 * - "brand"   ink letters, maroon 理工 and shield (for light grounds)
 * - "reverse" all ivory (for ink and maroon grounds)
 * - "mono"    everything one currentColor
 *
 * Geometry note: the shield path is authored in the wordmark's own
 * coordinate space; both the lockup and the emblem windows translate it
 * into place with TS. (The pre-rebuild emblem variant dropped that
 * translate and rendered outside its viewBox — fixed here.)
 */

type Variant = "lockup" | "wordmark" | "emblem";
type Tone = "brand" | "reverse" | "mono";

const VIEWBOX: Record<Variant, string> = {
  lockup: VB_LOCKUP,
  wordmark: VB_WORDMARK,
  emblem: VB_EMBLEM,
};

const T = "translate(0,113.111)";
const TS = "translate(465.774,0)";

export function OryxLogo({
  variant = "lockup",
  tone = "brand",
  className,
  title,
}: {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  title?: string;
}) {
  const box = VIEWBOX[variant];
  const ink = tone === "reverse" ? "#FFF8EE" : "currentColor";
  const mark = tone === "brand" ? "#71111F" : tone === "reverse" ? "#FFF8EE" : "currentColor";

  const letters = (
    <g fill={ink} aria-hidden="true">
      <path d={ORYX_PATH} transform={T} />
      {variant !== "emblem" && <path d={INSTITUTE_PATH} transform={T} />}
    </g>
  );

  const liGong =
    variant !== "emblem" ? (
      <g fill={mark} aria-hidden="true">
        <path d={LI_GONG_PATH} transform={T} />
      </g>
    ) : null;

  const shield =
    variant !== "wordmark" ? (
      <g aria-hidden="true">
        <path d={SHIELD_PATH} transform={TS} fill={mark} />
      </g>
    ) : null;

  return (
    <svg
      viewBox={box}
      className={className}
      role={title ? "img" : "presentation"}
      {...(title ? { "aria-label": title } : { "aria-hidden": "true" })}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {letters}
      {liGong}
      {shield}
    </svg>
  );
}
