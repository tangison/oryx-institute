"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { SearchEntry } from "@/lib/search-index";
import { chrome, type Lang } from "@/lib/i18n";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * A client overlay over a static index: nothing is fetched and nothing is
 * sent anywhere. When open it behaves as a modal, with contained focus and
 * an inert reading surface. Results are ordinary links so browser and
 * assistive-technology link behaviour remains intact.
 */
export function SearchControl({ lang }: { lang: Lang }) {
  const t = chrome[lang];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /* The index lives in its own chunk with the content it draws from
     (research notes, public pages and answers): it loads once, on the
     first keystroke, never on the load path. */
  const indexRef = useRef<SearchEntry[] | null>(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    }
  }, []);

  const runSearch = useCallback(
    async (value: string) => {
      const mod = await import("@/lib/search-index");
      if (!indexRef.current) indexRef.current = mod.buildIndex(lang);
      setResults(mod.searchIndex(indexRef.current, value));
    },
    [lang]
  );

  const openPanel = useCallback(() => {
    document.dispatchEvent(new CustomEvent("oryx:search-open"));
    setOpen(true);
  }, []);

  /* Route change closes; the overlay never survives navigation. */
  useEffect(() => {
    const timeout = setTimeout(() => close(), 0);
    return () => clearTimeout(timeout);
  }, [pathname, close]);

  /* "/" and Cmd/Ctrl+K open from anywhere that is not a text field. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null;
      const typing =
        element &&
        (element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA" ||
          element.isContentEditable);
      if (
        !open &&
        !typing &&
        (event.key === "/" ||
          ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"))
      ) {
        event.preventDefault();
        openPanel();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, openPanel]);

  /* The menu overlay and the search overlay are exclusive. */
  useEffect(() => {
    const onMenu = () => close();
    document.addEventListener("oryx:menu-open", onMenu);
    return () => document.removeEventListener("oryx:menu-open", onMenu);
  }, [close]);

  /* A real modal needs to protect its focus order as well as its visual
     order. The header remains clickable so the menu can replace search;
     main, footer and skip link are made inert while this panel is open. */
  useEffect(() => {
    if (!open) return;

    const main = document.getElementById("main");
    const footer = document.querySelector(".site-footer");
    const skipLink = document.querySelector(".skip-link");
    const setInert = (element: Element | null, inert: boolean) => {
      if (!element) return;
      element.toggleAttribute("inert", inert);
    };
    setInert(main, true);
    setInert(footer, true);
    setInert(skipLink, true);

    const focusInput = requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.getClientRects().length > 0
      );
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(focusInput);
      document.removeEventListener("keydown", onKey);
      setInert(main, false);
      setInert(footer, false);
      setInert(skipLink, false);
    };
  }, [open, close]);

  /* Click outside the panel closes it. */
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        close(true);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="search-trigger"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="search-panel"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21" strokeLinecap="round" />
        </svg>
        <span>{t.search}</span>
      </button>

      {open ? (
        <div className="search-overlay" role="presentation">
          <div
            className="search-panel"
            id="search-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.search}
          >
            <div className="search-row">
              <input
                ref={inputRef}
                type="search"
                className="search-input"
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  setQuery(value);
                  runSearch(value);
                }}
                aria-controls="search-results"
                aria-label={t.search}
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="search-close" onClick={() => close(true)}>
                {t.close}
              </button>
            </div>

            {query.trim().length >= 2 ? (
              results.length > 0 ? (
                <ul id="search-results" className="search-results" aria-label={t.search}>
                  {results.map((result, index) => (
                    <li key={`${result.href}-${index}`}>
                      <a href={result.href}>
                        <span className="search-group">{result.group}</span>
                        <span className="search-title">{result.title}</span>
                        {result.excerpt ? (
                          <span className="search-excerpt">{result.excerpt}</span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="search-empty">{t.searchEmpty}</p>
              )
            ) : (
              <p className="search-empty search-hint">{t.searchHint}</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
