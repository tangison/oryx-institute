"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Corner Spa frame, full bleed. One website serves the spa
 * (spa.mendozer.com); this component shows that one site fixed, inset
 * 0, no border and no chrome, so a visitor cannot tell they are on
 * another site. It is the same website, not a copy, so prices and
 * booking details are always identical wherever it is opened.
 *
 * Behaviour, exactly:
 * - A loading screen holds for at least 1.4 seconds: the Oryx lockup
 *   on the ink ground with the oryx running a dashed ground line. It
 *   fades out when the frame fires load.
 * - If nothing has loaded after ten seconds, a plain fallback link to
 *   spa.mendozer.com takes over, so nobody meets a blank screen.
 * - prefers-reduced-motion is respected: the runner stands still.
 * - The page never touches location or history: no hash changes, no
 *   pushed entries. One press of Back returns to the previous Oryx
 *   page.
 */

const SPA_URL = "https://spa.mendozer.com/";
const MIN_MS = 1400;
const MAX_MS = 10000;

const copy = {
  en: {
    opening: "Opening Corner Spa",
    failed: "Corner Spa did not load.",
    open: "Open spa.mendozer.com",
    note: "Press Back once to return to the Oryx website.",
    read: "Read the note on Corner Spa",
  },
  af: {
    opening: "Opening Corner Spa",
    failed: "Corner Spa did not load.",
    open: "Open spa.mendozer.com",
    note: "Press Back once to return to the Oryx website.",
    read: "Read the note on Corner Spa",
    enLedger: { paras: [] as string[] },
  },
} as const;

export function CornerSpaEmbed({ lang = "en" }: { lang?: "en" | "af" }) {
  /** loading: the loader is up. ready: the frame fired load and the
   * loader has faded. failed: nothing loaded inside ten seconds. */
  const [phase, setPhase] = useState<"loading" | "ready" | "failed">("loading");
  const mountedAt = useRef(0);
  const t = copy[lang];

  useEffect(() => {
    mountedAt.current = Date.now();
    const failTimer = window.setTimeout(() => {
      setPhase((p) => (p === "loading" ? "failed" : p));
    }, MAX_MS);
    return () => window.clearTimeout(failTimer);
  }, []);

  const reveal = () => {
    // Hold the loader for its minimum beat, then fade it out.
    const wait = Math.max(0, MIN_MS - (Date.now() - mountedAt.current));
    window.setTimeout(() => setPhase("ready"), wait);
  };

  useEffect(() => {
    // The frame may finish loading before React hydrates and attaches
    // onLoad. The parse-time listener beside the iframe (see the inline
    // script below) flips a flag the moment load fires; if it has
    // already fired by the time we mount, reveal now.
    if ((window as unknown as { __spaFrameLoaded?: boolean }).__spaFrameLoaded) {
      reveal();
    }
    }, []);

  const onFrameLoad = reveal;

  return (
    <>
      <iframe
        src={SPA_URL}
        title="Corner Spa"
        onLoad={onFrameLoad}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="clipboard-write"
        loading="eager"
        className="corner-spa-frame"
      />
      {/* Parse-time listener: the iframe starts loading as soon as the
          HTML is parsed, long before React hydrates. This script sits
          beside it and records the load the moment it fires, so the
          loader can never miss a fast frame. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "(function(){var s=document.currentScript;var f=s&&s.previousElementSibling;if(f&&f.tagName==='IFRAME'){f.addEventListener('load',function(){window.__spaFrameLoaded=true;});}})();",
        }}
      />

      <div
        className={`corner-spa-loader ${phase !== "loading" ? "is-done" : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className="corner-spa-brand">
          <OryxMark />
        </div>
        <svg
          className="corner-spa-track"
          viewBox="0 -14 120 92"
          aria-hidden="true"
          focusable="false"
        >
          <g className="embed-oryx">
            <g className="embed-leg embed-leg-f2">
              <line className="embed-limb" x1="72" y1="40" x2="72" y2="66" />
            </g>
            <g className="embed-leg embed-leg-r2">
              <line className="embed-limb" x1="38" y1="40" x2="38" y2="66" />
            </g>
            <ellipse className="embed-body" cx="55" cy="34" rx="25" ry="10" />
            <path className="embed-limb embed-neck" strokeWidth="7" d="M74 31 L88 19" />
            <ellipse
              className="embed-body"
              cx="93"
              cy="16"
              rx="8"
              ry="4"
              transform="rotate(28 93 16)"
            />
            <path className="embed-limb embed-horn" strokeWidth="1.8" d="M91 12 L66 -10" />
            <path className="embed-limb embed-horn" strokeWidth="1.8" d="M93 11 L70 -12" />
            <path className="embed-limb embed-tail" strokeWidth="2.4" d="M31 30 Q22 34 22 46" />
            <g className="embed-leg embed-leg-f1">
              <line className="embed-limb" x1="72" y1="40" x2="72" y2="66" />
            </g>
            <g className="embed-leg embed-leg-r1">
              <line className="embed-limb" x1="38" y1="40" x2="38" y2="66" />
            </g>
          </g>
          <line className="embed-ground" x1="0" y1="70" x2="120" y2="70" />
        </svg>
        <p className="corner-spa-note">{t.opening}</p>
      </div>

      {phase === "failed" ? (
        <div className="corner-spa-fail">
          <p className="corner-spa-fail-line">{t.failed}</p>
          <a
            href={SPA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="corner-spa-fail-link"
          >
            {t.open}
          </a>
          <a
            href={lang === "af" ? "/af/blog/corner-spa" : "/blog/corner-spa"}
            className="corner-spa-fail-link corner-spa-fail-link--quiet"
          >
            {t.read}
          </a>
          <p className="corner-spa-fail-note">{t.note}</p>
        </div>
      ) : null}
    </>
  );
}

/** The approved Oryx lockup, drawn at loader scale. 理工 is the supplied
 * visual mark for the Polytechnic position, not a language switch. */
function OryxMark() {
  return (
    <div className="corner-spa-lockup">
      <span className="corner-spa-lockup-latin">ORYX</span>
      <span className="corner-spa-lockup-cjk">理工</span>
      <span className="corner-spa-lockup-latin">INSTITUTE</span>
    </div>
  );
}
