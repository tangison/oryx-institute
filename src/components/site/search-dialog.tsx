"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SearchEntry } from "@/lib/search-index";
import { chrome, type Lang } from "@/lib/i18n";

/**
 * The desktop search system. A client overlay over a static index:
 * nothing is fetched, nothing is sent anywhere. The trigger renders
 * only at desktop widths; the overlay closes on Escape, on navigation,
 * on a click outside, and when the site menu opens.
 */
export function SearchControl({ lang }: { lang: Lang }) {
  const t = chrome[lang];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  /* The index lives in its own chunk with the content it draws from
     (the Directory, the Bulletin, the answers): it loads once, on the
     first keystroke, never on the load path. */
  const indexRef = useRef<SearchEntry[] | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setResults([]);
  }, []);

  const runSearch = useCallback(
    async (q: string) => {
      const mod = await import("@/lib/search-index");
      if (!indexRef.current) indexRef.current = mod.buildIndex(lang);
      setResults(mod.searchIndex(indexRef.current, q));
    },
    [lang]
  );

  const openPanel = useCallback(() => {
    setOpen(true);
    /* Let the menu close itself first; the panel mounts next frame. */
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  /* Route change closes; the overlay never survives navigation. */
  useEffect(() => {
    close();
  }, [pathname, close]);

  /* "/" and Cmd/Ctrl+K open from anywhere that is not a text field. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);
      if (!open && !typing && (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"))) {
        e.preventDefault();
        openPanel();
      }
      if (open && e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, openPanel, close]);

  /* The menu overlay and the search overlay are exclusive. */
  useEffect(() => {
    const onMenu = () => close();
    document.addEventListener("oryx:menu-open", onMenu);
    return () => document.removeEventListener("oryx:menu-open", onMenu);
  }, [close]);

  /* Click outside the panel closes it. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, close]);

  const go = (r: SearchEntry) => {
    close();
    router.push(r.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
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
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                  runSearch(e.target.value);
                }}
                onKeyDown={onKeyDown}
                aria-controls="search-results"
                aria-label={t.search}
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="search-close" onClick={close}>
                {t.close}
              </button>
            </div>

            {query.trim().length >= 2 ? (
              results.length > 0 ? (
                <ul
                  id="search-results"
                  className="search-results"
                  role="listbox"
                  aria-label={t.search}
                >
                  {results.map((r, i) => (
                    <li
                      key={`${r.href}-${i}`}
                      role="option"
                      aria-selected={i === active}
                      className={i === active ? "is-active" : undefined}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r)}
                    >
                      <a
                        href={r.href}
                        onClick={(e) => {
                          e.preventDefault();
                          go(r);
                        }}
                      >
                        <span className="search-group">{r.group}</span>
                        <span className="search-title">{r.title}</span>
                        {r.excerpt ? (
                          <span className="search-excerpt">{r.excerpt}</span>
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
