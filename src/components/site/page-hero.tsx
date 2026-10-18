import type { ReactNode } from "react";
import { HeroSplitTitle } from "@/components/site/hero-split-title";

/**
 * Inner-page header band. Generous top padding clears the fixed
 * header; the title sets in the display serif with an accent word in
 * the brand maroon; one-line description underneath. The title is
 * split and raised by GSAP on mount (HeroSplitTitle) on every route.
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
    <header data-reveal-group className="shell pb-10 pt-32 md:pb-14 md:pt-44">
      <HeroSplitTitle title={title} accent={accent} />
      {children ? (
        <div className="measure mt-6 text-[1.05rem] leading-relaxed text-soft">
          {children}
        </div>
      ) : null}
    </header>
  );
}
