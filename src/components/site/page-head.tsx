import type { ReactNode } from "react";

/**
 * Interior page head: eyebrow, Radley H1, lede paragraph, hairline
 * foot. One register on every page.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  tone = "paper",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  /** Dense reference pages may deliberately open on ink. */
  tone?: "paper" | "ink";
}) {
  return (
    <header className={`page-head page-head--screen page-head--${tone}`} data-sc-act="flow">
      <div className="shell page-head__inner" data-sc-in>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="h-display mt-4 max-w-[22ch]">{title}</h1>
        {children ? (
          <div className="measure mt-7 body-lg text-soft">{children}</div>
        ) : null}
      </div>
    </header>
  );
}
