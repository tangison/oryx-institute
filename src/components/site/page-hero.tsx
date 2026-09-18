import type { ReactNode } from "react";

/**
 * Inner-page header band. Generous top padding clears the fixed
 * header; the title sets in the display serif with an accent word in
 * the brand maroon; one-line description underneath.
 */
export function PageHero({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="shell pb-10 pt-32 md:pb-14 md:pt-44">
      <h1 className="display-hero max-w-[16ch] text-ink">
        {title}
        {accent ? <span className="em-serif text-accent"> {accent}</span> : null}
      </h1>
      {children ? (
        <div className="measure mt-6 text-[1.05rem] leading-relaxed text-soft">
          {children}
        </div>
      ) : null}
    </header>
  );
}
