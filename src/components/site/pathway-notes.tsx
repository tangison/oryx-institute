"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";

type PathwayId = "research" | "practice" | "ventures";

type Pathway = {
  id: PathwayId;
  label: string;
  description: string;
  href: string;
  action: string;
};

const storageKey = "oryx-pathway-note";
const storageEvent = "oryx-pathway-note-change";

const copy = {
  en: {
    eyebrow: "Field note",
    title: "Choose the work you came to see.",
    body:
      "Keep one live path at the edge of this page, then take it when you are ready. This choice stays in this browser only.",
    choices: "Choose a pathway",
    note: "Your field note",
    privacy: "No account, tracking or message is created by this choice.",
    paths: [
      {
        id: "research",
        label: "Research",
        description: "Fieldwork, public notes and cited papers.",
        href: "/research",
        action: "Read the research",
      },
      {
        id: "practice",
        label: "Practice",
        description: "Courses, counsel and practical work to standard.",
        href: "/practice",
        action: "See the practice",
      },
      {
        id: "ventures",
        label: "Ventures",
        description: "Small operating companies as live classrooms.",
        href: "/ventures",
        action: "See the ventures",
      },
    ] satisfies Pathway[],
  },
  af: {
    eyebrow: "Veldnota",
    title: "Kies die werk waarvoor jy gekom het.",
    body:
      "Hou een lewende roete aan die rand van hierdie bladsy en volg dit wanneer jy gereed is. Hierdie keuse bly slegs in hierdie blaaier.",
    choices: "Kies 'n roete",
    note: "Jou veldnota",
    privacy: "Geen rekening, nasporing of boodskap word deur hierdie keuse geskep nie.",
    paths: [
      {
        id: "research",
        label: "Navorsing",
        description: "Veldwerk, openbare notas en aangehaalde navorsing.",
        href: "/af/research",
        action: "Lees die navorsing",
      },
      {
        id: "practice",
        label: "Praktyk",
        description: "Kursusse, advies en praktiese werk volgens standaard.",
        href: "/af/practice",
        action: "Sien die praktyk",
      },
      {
        id: "ventures",
        label: "Ondernemings",
        description: "Klein bedryfsmaatskappye as lewende klaskamers.",
        href: "/af/ventures",
        action: "Sien die ondernemings",
      },
    ] satisfies Pathway[],
  },
} as const;

function isPathwayId(value: string | null): value is PathwayId {
  return value === "research" || value === "practice" || value === "ventures";
}

function readStoredPathway(): PathwayId {
  try {
    const stored = window.sessionStorage.getItem(storageKey);
    return isPathwayId(stored) ? stored : "practice";
  } catch {
    return "practice";
  }
}

function subscribeToPathway(callback: () => void) {
  window.addEventListener(storageEvent, callback);
  return () => window.removeEventListener(storageEvent, callback);
}

/**
 * The homepage's signature interaction. It is intentionally local and
 * optional: a reader chooses one real Oryx route, gets a working link,
 * and that choice is retained only for the current browser session.
 */
export function PathwayNotes({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const selectedId = useSyncExternalStore(
    subscribeToPathway,
    readStoredPathway,
    () => "practice"
  );
  const selected = t.paths.find((path) => path.id === selectedId) ?? t.paths[1];

  const choose = (id: PathwayId) => {
    try {
      window.sessionStorage.setItem(storageKey, id);
    } catch {
      // A visible selection is still useful when session storage is unavailable.
    }
    window.dispatchEvent(new Event(storageEvent));
  };

  return (
    <section className="pathway-notes section-lg" data-sc-act="flow" aria-labelledby="pathway-notes-title">
      <div className="shell pathway-notes__grid">
        <div className="pathway-notes__intro" data-sc-in>
          <p className="eyebrow eyebrow--ink">{t.eyebrow}</p>
          <h2 id="pathway-notes-title" className="h-section mt-4 max-w-[16ch]">
            {t.title}
          </h2>
          <p className="measure mt-6 text-soft">{t.body}</p>
        </div>

        <div className="pathway-notes__work" data-sc-in>
          <div className="pathway-notes__choices" role="group" aria-label={t.choices}>
            {t.paths.map((path) => {
              const active = path.id === selectedId;
              return (
                <button
                  key={path.id}
                  type="button"
                  className={active ? "pathway-choice is-active" : "pathway-choice"}
                  onClick={() => choose(path.id)}
                  aria-pressed={active}
                >
                  <span className="pathway-choice__label">{path.label}</span>
                  <span className="pathway-choice__description">{path.description}</span>
                </button>
              );
            })}
          </div>
          <noscript>
            <ul className="pathway-notes__fallback" aria-label={t.choices}>
              {t.paths.map((path) => (
                <li key={path.id}>
                  <a href={path.href} className="link-type">
                    {path.label}: {path.description}
                  </a>
                </li>
              ))}
            </ul>
          </noscript>

          <aside className="pathway-note" aria-label={t.note}>
            <p className="meta">{t.note}</p>
            <p className="pathway-note__selected" aria-live="polite">
              {selected.label}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-soft">
              {selected.description}
            </p>
            <Link href={selected.href} className="btn--quiet mt-7">
              {selected.action} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </aside>
          <p className="pathway-notes__privacy">{t.privacy}</p>
        </div>
      </div>
    </section>
  );
}
