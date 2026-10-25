import type { ReactNode } from "react";

/**
 * Interior page head: eyebrow, Radley H1, lede paragraph, hairline
 * foot. One register on every page.
 */
export function PageHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="shell">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="h-display mt-4 max-w-[22ch]">{title}</h1>
        {children ? (
          <div className="measure mt-7 body-lg text-soft">{children}</div>
        ) : null}
      </div>
    </header>
  );
}
