import type { ReactNode } from "react";

/**
 * Ink page ground: the text-heavy pages (privacy, terms, disclaimer)
 * run on the brand ink, with ivory body text and rose links. The fixed
 * header and the footer join the ground through body:has() rules in
 * globals.css.
 */
export function InkPage({ children }: { children: ReactNode }) {
  return (
    <div className="theme-ink bg-paper text-ink">
      <div className="prose-doc">{children}</div>
    </div>
  );
}
