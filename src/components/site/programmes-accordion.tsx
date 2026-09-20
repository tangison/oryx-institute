"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { disciplines } from "@/lib/site";

/**
 * Horizontal accordion: on wide screens the four disciplines stand as
 * vertical slices that expand on hover and keyboard focus; on small
 * screens the slices stack and open on tap. Each slice is an anchor
 * target so the header dropdown can link straight to a discipline.
 */
export function ProgrammesAccordion() {
  const [open, setOpen] = useState<string | null>(disciplines[0].id);

  return (
    <div className="h-accordion">
      {disciplines.map((d) => {
        const isOpen = open === d.id;
        return (
          <section
            key={d.id}
            id={d.id}
            className="h-slice scroll-mt-24"
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
