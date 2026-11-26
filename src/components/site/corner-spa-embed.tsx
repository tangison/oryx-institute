"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

/** The Corner Spa counter belongs to Mendozer's separate service. */
export const CORNER_SPA_URL = "https://spa.mendozer.com/";
const MIN_MS = 1400;
const MAX_MS = 10000;

type FrameGateProps = {
  lang: Lang;
  title: string;
  onOpen: () => void;
  inline?: boolean;
};

const copy = {
  en: {
    external: "Corner Spa is served by Mendozer at spa.mendozer.com. Opening the counter loads that separate service.",
    load: "Load the Corner Spa counter",
    opening: "Opening Corner Spa",
    failed: "Corner Spa did not load.",
    open: "Open spa.mendozer.com",
    note: "Press Back once to return to the Oryx website.",
    read: "Read the note on Corner Spa",
  },
  af: {
    external: "Corner Spa word deur Mendozer by spa.mendozer.com bedien. Wanneer jy die toonbank oopmaak, laai daardie afsonderlike diens.",
    load: "Laai die Corner Spa-toonbank",
    opening: "Corner Spa maak oop",
    failed: "Corner Spa het nie gelaai nie.",
    open: "Maak spa.mendozer.com oop",
    note: "Druk een keer Terug om na die Oryx-webwerf terug te keer.",
    read: "Lees die nota oor Corner Spa",
  },
} as const;

function FrameGate({ lang, title, onOpen, inline = false }: FrameGateProps) {
  const t = copy[lang];
  return (
    <div className={inline ? "corner-spa-gate corner-spa-gate--inline" : "corner-spa-gate"}>
      <div className="corner-spa-gate__content">
        <p className="eyebrow eyebrow--ink">{title}</p>
        <p className="corner-spa-gate__note">{t.external}</p>
        <div className="corner-spa-gate__actions">
          <button type="button" className="btn" onClick={onOpen}>
            {t.load}
          </button>
          <a
            href={CORNER_SPA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn--quiet"
          >
            {t.open} <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * A deliberate, visitor-controlled entry into the separate Corner Spa
 * service. Nothing from spa.mendozer.com loads until the visitor chooses
 * the counter or its direct address. Once opened, the original loader and
 * failure route remain in place.
 */
export function CornerSpaEmbed({ lang = "en" }: { lang?: Lang }) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"loading" | "ready" | "failed">("loading");
  const mountedAt = useRef(0);
  const t = copy[lang];

  const activate = () => {
    delete (window as typeof window & { __spaFrameLoaded?: boolean }).__spaFrameLoaded;
    mountedAt.current = Date.now();
    setPhase("loading");
    setActive(true);
  };

  useEffect(() => {
    if (!active) return;
    const failTimer = window.setTimeout(() => {
      setPhase((current) => (current === "loading" ? "failed" : current));
    }, MAX_MS);
    return () => window.clearTimeout(failTimer);
  }, [active]);

  const reveal = () => {
    const wait = Math.max(0, MIN_MS - (Date.now() - mountedAt.current));
    window.setTimeout(() => setPhase("ready"), wait);
  };

  useEffect(() => {
    if (!active) return;
    if ((window as typeof window & { __spaFrameLoaded?: boolean }).__spaFrameLoaded) {
      reveal();
    }
  }, [active]);

  if (!active) {
    return <FrameGate lang={lang} title="Corner Spa" onOpen={activate} />;
  }

  return (
    <>
      <iframe
        src={CORNER_SPA_URL}
        title="Corner Spa"
        onLoad={reveal}
        referrerPolicy="strict-origin-when-cross-origin"
        loading="eager"
        className="corner-spa-frame"
      />
      {/* Parse-time listener: the frame starts loading before React may
          attach onLoad. The flag lets the client effect reveal a cached
          counter rather than holding the loading screen. */}
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
            href={CORNER_SPA_URL}
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

/** The inline venture page uses the same visitor-controlled boundary. */
export function CornerSpaInlineFrame({
  lang,
  title,
}: {
  lang: Lang;
  title: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <div className="spa-frame">
      {active ? (
        <iframe
          src={CORNER_SPA_URL}
          title={title}
          width={1200}
          height={800}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <FrameGate lang={lang} title={title} onOpen={() => setActive(true)} inline />
      )}
    </div>
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
