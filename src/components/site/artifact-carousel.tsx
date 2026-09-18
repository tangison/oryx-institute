"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export type ArtifactItem = {
  title: string;
  line: string;
  photo: string;
  alt: string;
  note?: string;
  href?: string;
};

/**
 * Artifact card carousel: embla track, circular prev and next arrows
 * in the Collins register, maroon active dot pagination. Cards link to
 * the brand register by default.
 */
export function ArtifactCarousel({
  items,
  ariaLabel = "Brand artifacts",
}: {
  items: readonly ArtifactItem[];
  ariaLabel?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Canonical embla + React pattern: the API only exists after mount,
    // so sync state from it here and on every select / reInit.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      {/* Controls above the track: dots left, arrows right, so the
          carousel is discoverable before the first swipe. */}
      <div className="mb-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="tablist" aria-label="Carousel position">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              className="carousel-dot"
              data-active={i === selected}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="carousel-arrow"
            disabled={prevDisabled}
            aria-label={`Previous ${ariaLabel}`}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowLeft className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            className="carousel-arrow"
            disabled={nextDisabled}
            aria-label={`Next ${ariaLabel}`}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowRight className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-track -mx-[var(--gutter)] px-[var(--gutter)]">
          {items.map((item) => (
            <div className="carousel-slide" key={item.title}>
              <Link
                href={item.href ?? "/brand"}
                className="artifact-card group block"
              >
                <span className="artifact-figure relative block aspect-[4/3]">
                  <Image
                    src={item.photo}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 72rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                    className="object-cover"
                  />
                </span>
                <span className="block p-5">
                  {item.note ? (
                    <span className="photo-caption tnum">{item.note}</span>
                  ) : null}
                  <span className="artifact-title mt-1 block">{item.title}</span>
                  <span className="artifact-line line-clamp-2 block">
                    {item.line}
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
