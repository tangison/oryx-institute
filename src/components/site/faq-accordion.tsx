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
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="faq-trigger">
              <span>{item.q}</span>
              <Plus className="faq-icon" strokeWidth={2} aria-hidden />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="faq-answer">
            <p className="measure pb-7 text-soft">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
