"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ResearchFolioProps = {
  eyebrow: string;
  title: string;
  body: string;
  alt: string;
};

/**
 * The Research page's one page-specific scroll interaction. It is deliberately
 * local: the shared scroll engine stays generic, while this proof sheet
 * opens only on the page that announces the forthcoming publication.
 */
export function ResearchFolio({
  eyebrow,
  title,
  body,
  alt,
}: ResearchFolioProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + rect.height * 0.55;
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.78 - rect.top) / travel)
      );
      section.style.setProperty("--research-folio-p", progress.toFixed(3));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className="research-folio section"
      data-sc-act="flow"
      aria-labelledby="publication-title"
      ref={sectionRef}
    >
      <div className="shell research-folio__grid">
        <figure className="research-folio__figure" data-sc-in>
          <div className="research-folio__paper">
            <span className="research-folio__leaf research-folio__leaf--left" aria-hidden="true" />
            <Image
              src="/images/editorial/research-publication-coming-soon.jpg"
              alt={alt}
              width={1376}
              height={768}
              sizes="(min-width: 1024px) 34rem, 88vw"
              className="research-folio__image"
            />
            <span className="research-folio__leaf research-folio__leaf--right" aria-hidden="true" />
          </div>
        </figure>
        <div className="research-folio__copy" data-sc-in>
          <p className="eyebrow eyebrow--ink">{eyebrow}</p>
          <h2 id="publication-title" className="h-section mt-3 max-w-[18ch]">
            {title}
          </h2>
          <p className="measure mt-6 text-soft">{body}</p>
        </div>
      </div>
    </section>
  );
}
