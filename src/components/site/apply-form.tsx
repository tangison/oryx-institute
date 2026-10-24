"use client";

import { useEffect, useState } from "react";
import { offers, site } from "@/lib/site";

type Errors = { name?: string; contact?: string };

/**
 * Email-first application composer. The form builds a prefilled email
 * to the office's mailbox and hands off to the visitor's own mail
 * client. No data is stored on this site; nothing is sent anywhere
 * until the visitor presses send in their own client.
 *
 * A ?for=<offer-id> query preselects the field of interest (e.g. the
 * CTAs on /programmes) — read client-side so the page stays static.
 *
 * The business telephone line is deliberately not published while the
 * institute is being established; when one lands, a phone field and a
 * tel handoff are added back here.
 */
export function ApplyForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [discipline, setDiscipline] = useState<string>(offers[0].name);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("for");
    if (!wanted) return;
    const hit = offers.find((o) => o.id === wanted);
    if (hit) setDiscipline(hit.name);
  }, []);

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
            {offers.map((o) => (
              <option key={o.id} value={o.name}>
                {o.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
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
          className="field-textarea"
          placeholder="Tell us where you are coming from and what you want to learn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn">
          Prepare the email
        </button>
        <p className="text-[0.85rem] text-soft">
          Opens your own mail client with the application addressed to{" "}
          {site.email}. Nothing is stored on this site.
        </p>
      </div>
      {/* With JavaScript off, the composer cannot run; the address
          itself is the application. */}
      <noscript>
        <p className="field-error">
          The composer needs JavaScript. Without it, the application is
          the same email written by hand:{" "}
          <a href={`mailto:${site.email}`} className="link-type">
            {site.email}
          </a>
        </p>
      </noscript>
    </form>
  );
}
