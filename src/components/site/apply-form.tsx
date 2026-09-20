"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { disciplines, site } from "@/lib/site";

type Errors = { name?: string; phone?: string };

/**
 * WhatsApp-first application composer. The form builds a prefilled
 * WhatsApp message addressed to the Principal's office and hands off
 * to the institute's primary channel. No data is stored on this site.
 */
export function ApplyForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [discipline, setDiscipline] = useState<string>(disciplines[0].name);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) {
      next.name = "Please tell us your name so we know who is applying.";
    }
    if (phone.trim() && !/^[+\d][\d\s()-]{5,}$/.test(phone.trim())) {
      next.phone =
        "That phone number does not look complete. Include the country code, for example +264 81 000 0000.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      `Name: ${name.trim()}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      `Field of interest: ${discipline}`,
      message.trim() ? `Message: ${message.trim()}` : null,
    ].filter(Boolean) as string[];

    const url = `${site.whatsapp}?text=${encodeURIComponent(
      `Hello Oryx Institute, I would like to apply.\n\n${lines.join("\n")}`
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-7">
      <div className="grid gap-7 md:grid-cols-2 md:gap-8">
        <div>
          <label htmlFor="af-name" className="field-label">
            Name
          </label>
          <input
            id="af-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "af-name-error" : undefined}
          />
          <p
            id="af-name-error"
            className="field-error"
            role={errors.name ? "alert" : undefined}
          >
            {errors.name ?? ""}
          </p>
        </div>
        <div>
          <label htmlFor="af-phone" className="field-label">
            Phone, optional
          </label>
          <input
            id="af-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field-input"
            placeholder="+264 81 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "af-phone-error" : undefined}
          />
          <p
            id="af-phone-error"
            className="field-error"
            role={errors.phone ? "alert" : undefined}
          >
            {errors.phone ?? ""}
          </p>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="af-discipline" className="field-label">
            Field of interest
          </label>
          <select
            id="af-discipline"
            name="discipline"
            className="field-select"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          >
            {disciplines.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
          <p className="field-error" aria-hidden>
            &nbsp;
          </p>
        </div>
      </div>
      <div>
        <label htmlFor="af-message" className="field-label">
          Message, optional
        </label>
        <textarea
          id="af-message"
          name="message"
          rows={5}
          className="field-textarea resize-y"
          placeholder="Tell us where you are coming from and what you want to learn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="pill">
          Send on WhatsApp
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </button>
        <p className="text-[0.85rem] text-soft">
          Opens WhatsApp with your application prefilled. Nothing is stored
          on this site.
        </p>
      </div>
    </form>
  );
}
