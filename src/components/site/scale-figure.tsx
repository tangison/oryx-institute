"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Image scale and fade: the figure enters at reduced scale and grows
 * to full as it crosses the viewport, then darkens and recedes as it
 * leaves. The image itself is a normal next/image with priority
 * control, so the effect costs nothing without JavaScript.
 */
export function ScaleFigure({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  imgClassName,
  caption,
  captionClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  caption?: string;
  captionClassName?: string;
}) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const img = scope.current?.querySelector(".scale-img");
      if (!img) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(img, { scale: 1, opacity: 1, filter: "none" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 88%",
          end: "bottom 24%",
          scrub: 0.5,
        },
      });
      tl.fromTo(
        img,
        { scale: 0.92, opacity: 0.86 },
        { scale: 1, opacity: 1, ease: "power1.out", duration: 0.6 },
        0
      ).to(
        img,
        { opacity: 0.35, filter: "brightness(0.62)", scale: 1.02, ease: "power1.in", duration: 0.4 },
        0.6
      );
    },
    { scope, revertOnUpdate: true }
  );

  return (
    <figure ref={scope as never} className={`photo-figure scale-figure ${className ?? ""}`}>
      <div className="scale-img relative">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={`h-auto w-full object-cover ${imgClassName ?? ""}`}
        />
      </div>
      {caption ? (
        <figcaption className={`photo-caption mt-3 ${captionClassName ?? ""}`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
