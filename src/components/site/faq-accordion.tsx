"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export function FaqAccordion({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className="w-full"
    >
      {items.map((item, i) => (
        <AccordionPrimitive.Item
          key={i}
          value={`item-${i}`}
          className="faq-item"
        >
          {/* Radix renders its Header as h3 by default; asChild keeps
              the accordion semantics but emits an h2 so the page's
              heading order stays H1 -> H2. */}
          <AccordionPrimitive.Header asChild>
            <h2 className="m-0 font-[inherit] text-[inherit]">
              <AccordionPrimitive.Trigger className="faq-trigger">
                <span>{item.q}</span>
                <Plus className="faq-icon" strokeWidth={2} aria-hidden />
              </AccordionPrimitive.Trigger>
            </h2>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="faq-answer">
            <p className="measure pb-7 text-soft">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
