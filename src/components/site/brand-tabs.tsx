"use client";

import { useState } from "react";
import { OryxLogo } from "@/components/site/oryx-logo";

/**
 * Brand anatomy tabs: Wordmark, Emblem, Colour and Voice. The same
 * underline register the site uses everywhere, keyboard operable,
 * with the active panel wired to the aria pattern.
 */
export function BrandTabs() {
  const [tab, setTab] = useState<"wordmark" | "emblem" | "colour" | "voice">(
    "wordmark"
  );

  const tabs = [
    { id: "wordmark", label: "Wordmark" },
    { id: "emblem", label: "Emblem" },
    { id: "colour", label: "Colour" },
    { id: "voice", label: "Voice" },
  ] as const;

  return (
    <div>
      <div className="tab-list" role="tablist" aria-label="Brand anatomy">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`brand-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`brand-panel-${t.id}`}
            data-state={tab === t.id ? "active" : "inactive"}
            className="tab-trigger"
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="brand-panel-wordmark"
        aria-labelledby="brand-tab-wordmark"
        tabIndex={0}
        className="tab-panel pt-10"
        hidden={tab !== "wordmark"}
      >
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="rounded-[var(--r-card)] border border-rule bg-paper-2 p-10 md:p-16">
            <OryxLogo variant="lockup" tone="brand" className="h-20 w-auto md:h-28" />
          </div>
          <div className="grid gap-5">
            <p className="text-[1.02rem] leading-relaxed text-soft">
              Three scripts, one lockup.{" "}
              <strong className="text-ink">ORYX</strong> and{" "}
              <strong className="text-ink">INSTITUTE</strong> set in a
              classic serif, ink {"#181713"};{" "}
              <span className="wordmark-cjk text-accent">理工</span>, the
              characters for science and engineering, stands where the
              word Politechnical sits in the full name, in maroon{" "}
              {"#71111F"}.
            </p>
            <p className="text-[1.02rem] leading-relaxed text-soft">
              The characters align to the ORYX baseline and scale to the
              cap height of the X, exactly as the supplied artwork draws
              them. The wordmark is never redrawn, never restacked and
              never set in another typeface: the site renders it from the
              artwork&apos;s own vector paths.
            </p>
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id="brand-panel-emblem"
        aria-labelledby="brand-tab-emblem"
        tabIndex={0}
        className="tab-panel pt-10"
        hidden={tab !== "emblem"}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div className="grid place-items-center rounded-[var(--r-card)] bg-ink p-16">
            <OryxLogo variant="emblem" tone="reverse" className="h-40 w-auto" />
          </div>
          <div className="grid gap-5">
            <p className="text-[1.02rem] leading-relaxed text-soft">
              The maroon shield, with its horn-mark knocked through in
              white. On the business card&apos;s reverse the shield stands
              alone; on the notecard it centres on white; on the envelope
              it sits at the right of the lockup.
            </p>
            <p className="text-[1.02rem] leading-relaxed text-soft">
              The emblem never carries text inside it, never tilts, and
              never appears in any colour but the maroon or the reverse
              ivory. On maroon grounds the mark stays ivory; on light
              grounds it stays white.
            </p>
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id="brand-panel-colour"
        aria-labelledby="brand-tab-colour"
        tabIndex={0}
        className="tab-panel pt-10"
        hidden={tab !== "colour"}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Ink",
              hex: "#181713",
              usage: "Wordmark letters, body text, dark grounds",
              bg: "#181713",
              fg: "#FFF8EE",
            },
            {
              name: "Maroon",
              hex: "#71111F",
              usage: "The shield, 理工, accents, fills",
              bg: "#71111F",
              fg: "#FFF8EE",
            },
            {
              name: "Ivory",
              hex: "#FFF8EE",
              usage: "Text on maroon and ink, the reverse logo",
              bg: "#FFF8EE",
              fg: "#181713",
            },
            {
              name: "White",
              hex: "#FFFFFF",
              usage: "Paper, the print kit's ground",
              bg: "#FFFFFF",
              fg: "#181713",
            },
          ].map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-[var(--r-card)] border border-rule"
            >
              <div
                className="grid h-36 place-items-center"
                style={{ background: c.bg, color: c.fg }}
              >
                <span
                  className="wordmark-cjk text-[1.6rem]"
                  aria-hidden
                >
                  {c.name === "Ink" || c.name === "Maroon" ? "理工" : "Aa"}
                </span>
              </div>
              <div className="bg-paper p-5">
                <p className="font-semibold text-ink">{c.name}</p>
                <p className="tnum text-[0.85rem] text-accent">{c.hex}</p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-soft">
                  {c.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="measure mt-8 text-[0.95rem] leading-relaxed text-soft">
          Four codes, sampled from the logo artwork itself. Tints between
          them are mixed from these anchors only, and the rose used for
          accents on ink is derived from the maroon, never introduced
          from outside the palette.
        </p>
      </div>

      <div
        role="tabpanel"
        id="brand-panel-voice"
        aria-labelledby="brand-tab-voice"
        tabIndex={0}
        className="tab-panel pt-10"
        hidden={tab !== "voice"}
      >
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="grid gap-8">
            <p className="display-statement text-ink">
              Looks harmless.{" "}
              <span className="em-serif text-accent">Isn&apos;t.</span>
            </p>
            <p className="text-[1.02rem] leading-relaxed text-soft">
              The institute speaks the way the flyer speaks: short lines,
              declarative, no ornament. Three words are enough when the
              three words are true. Sentences end. Claims that need
              adjectives are cut.
            </p>
            <ul className="grid gap-2 text-[0.98rem] leading-relaxed text-soft">
              <li className="keyline">Say the thing. Stop.</li>
              <li className="keyline">Quiet is a register, not a volume.</li>
              <li className="keyline">Never claim what the print kit does not print.</li>
            </ul>
          </div>
          <div className="rounded-[var(--r-card)] bg-paper-2 p-8">
            <p className="label-caps text-soft">Approved lines</p>
            <ul className="mt-4 grid gap-4 text-[0.95rem] leading-relaxed text-soft">
              <li>
                &ldquo;Looks harmless. Isn&apos;t.&rdquo; · Recruitment
                flyer
              </li>
              <li>
                &ldquo;Oryx Institute graduates solve problems quietly and
                finish them decisively.&rdquo; · Recruitment flyer
              </li>
              <li>
                &ldquo;Excellence in innovation and applied
                problem-solving.&rdquo; · Certificate of Achievement
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
