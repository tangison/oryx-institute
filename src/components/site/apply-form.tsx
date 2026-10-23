"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { disciplines, services, site } from "@/lib/site";

type Errors = { name?: string; contact?: string };

/**
 * Email-first application composer. The form builds a prefilled email
 * to the office's mailbox and hands off to the visitor's own mail
 * client. No data is stored on this site; nothing is sent anywhere
 * until the visitor presses send in their own client.
 *
 * The business telephone line is deliberately not published while the
 * institute is being established; when one lands, a phone field and a
 * tel handoff are added back here.
 */
export function ApplyForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [discipline, setDiscipline] = useState<string>(disciplines[0].name);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) {
      next.name = "Please tell us your name so we know who is applying.";
    }
    const c = contact.trim();
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
    const looksPhone = /^[+\d][\d\s()-]{5,}$/.test(c);
    if (!c) {
      next.contact =
        "Add one way to reach you: an email address, or a phone number if you prefer a call.";
    } else if (!looksEmail && !looksPhone) {
      next.contact =
        "That does not look complete. Use an email address (name@example.com) or a phone number with its country code.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `Application — ${name.trim()} — ${discipline}`;
    const body = [
      `Hello Oryx Institute,`,
      ``,
      `Name: ${name.trim()}`,
      `Reply to: ${contact.trim()}`,
      `Field of interest: ${discipline}`,
      message.trim() ? `Message: ${message.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
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
            enterKeyHint="next"
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
          <label htmlFor="af-contact" className="field-label">
            Email for the reply
          </label>
          <input
            id="af-contact"
            name="contact"
            type="email"
            autoComplete="email"
            enterKeyHint="next"
            className="field-input"
            placeholder="name@example.com"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? "af-contact-error" : undefined}
          />
          <p
            id="af-contact-error"
            className="field-error"
            role={errors.contact ? "alert" : undefined}
          >
            {errors.contact ?? ""}
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
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
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
          enterKeyHint="send"
          className="field-textarea resize-y"
          placeholder="Tell us where you are coming from and what you want to learn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="pill">
          Prepare the email
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </button>
        <p className="text-[0.85rem] text-soft">
          Opens your own mail client with the application addressed to{" "}
          {site.email}. Nothing is stored on this site.
        </p>
      </div>
    </form>
  );
}
