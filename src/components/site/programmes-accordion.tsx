"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { disciplines } from "@/lib/site";

/** Slice grounds follow the published palette, matching the home
    bento: blush, sand, warm, and the maroon wash for the institute's
    own standard. */
const sliceTints = ["tint-blush", "tint-sand", "tint-warm", "tint-rose"];

/**
 * Horizontal accordion: on wide screens the four disciplines stand as
 * slices that expand on hover and keyboard focus; on small screens the
 * slices stack and open on tap. Names read horizontally on every
 * viewport. The open slice shows its photograph; no captions.
 */
export function ProgrammesAccordion() {
  const [open, setOpen] = useState<string | null>(disciplines[0].id);

  return (
    <div className="h-accordion">
      {disciplines.map((d, i) => {
        const isOpen = open === d.id;
        return (
          <section
            key={d.id}
            id={d.id}
            className={`h-slice scroll-mt-24 ${sliceTints[i]}`}
            data-open={isOpen}
            aria-labelledby={`${d.id}-head`}
          >
            <button
              type="button"
              id={`${d.id}-head`}
              className="h-head w-full text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : d.id)}
            >
              <span
                className={d.glyph.length > 2 ? "h-glyph-latin" : "h-glyph wordmark-cjk"}
                aria-hidden
              >
                {d.glyph}
              </span>
              <span className="h-name">{d.name}</span>
            </button>

            <div className="h-body">
              <p className="h-desc">{d.summary}</p>
              <div className="h-thumb">
                <Image
                  src={d.image}
                  alt={d.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 64rem) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <Link href="/apply" className="h-link">
                Apply in this field
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
