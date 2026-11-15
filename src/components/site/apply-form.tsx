"use client";

import { useRef, useState } from "react";
import { offers, site } from "@/lib/site";
import { offersAf } from "@/lib/site-af";
import type { Lang } from "@/lib/i18n";

type Errors = { name?: string; contact?: string };

const labels = {
  en: {
    name: "Name",
    namePlaceholder: "Your full name",
    nameError: "Please tell us your name so we know who is enquiring.",
    contact: "Email for the reply",
    contactErrorEmpty:
      "Add one way to reach you: an email address, or a phone number if you prefer a call.",
    contactErrorBad:
      "That does not look complete. Use an email address (name@example.com) or a phone number with its country code.",
    field: "Field of interest",
    notSure: "Not sure yet",
    message: "Message, optional",
    messagePlaceholder:
      "Tell us what you need and any useful context",
    submit: "Prepare the email",
    submitNote: (email: string) =>
      `Opens your own mail client with the enquiry addressed to ${email}. Nothing is stored on this site.`,
    noScript: (email: string) => (
      <>
        The composer needs JavaScript. Without it, write the same enquiry
        by hand:{" "}
        <a href={`mailto:${email}`} className="link-type">
          {email}
        </a>
      </>
    ),
    subject: (name: string, discipline: string) =>
      `Enquiry: ${name} · ${discipline}`,
    body: (
      name: string,
      contact: string,
      discipline: string,
      message: string
    ) =>
      [
        `Hello Oryx Institute,`,
        ``,
        `Name: ${name}`,
        `Reply to: ${contact}`,
        `Field of interest: ${discipline}`,
        message ? `Message: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
  },
  af: {
    name: "Naam",
    namePlaceholder: "Jou volle naam",
    nameError: "Vertel ons jou naam sodat ons weet wie navraag doen.",
    contact: "E-posadres vir die antwoord",
    contactErrorEmpty: "Voeg een manier by om jou te bereik: 'n e-posadres of telefoonnommer.",
    contactErrorBad:
      "Dit lyk nie volledig nie. Gebruik 'n e-posadres (name@example.com) of 'n telefoonnommer met 'n landkode.",
    field: "Belangstellingsveld",
    notSure: "Nog nie seker nie",
    message: "Boodskap, opsioneel",
    messagePlaceholder: "Vertel ons wat jy benodig en enige nuttige agtergrond",
    submit: "Stel die e-pos op",
    submitNote: (email: string) =>
      `Maak jou eie e-posprogram oop met die navraag aan ${email}. Niks word op hierdie webwerf gestoor nie.`,
    noScript: (email: string) => (
      <>
        Die samesteller vereis JavaScript. Daarsonder kan jy dieselfde navraag met die hand skryf:{" "}
        <a href={`mailto:${email}`} className="link-type">
          {email}
        </a>
      </>
    ),
    subject: (name: string, discipline: string) =>
      `Navraag: ${name} · ${discipline}`,
    body: (
      name: string,
      contact: string,
      discipline: string,
      message: string
    ) =>
      [
        `Hallo Oryx Instituut,`,
        ``,
        `Naam: ${name}`,
        `Antwoord aan: ${contact}`,
        `Belangstellingsveld: ${discipline}`,
        message ? `Boodskap: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
  },
} as const;

/**
 * Email-first enquiry composer. The form builds a prefilled email to the
 * Oryx office and hands off to the visitor's own mail client. No data is
 * stored on this site; nothing is sent until the visitor presses send.
 */
export function ApplyForm({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const offerList = lang === "af" ? offersAf : offers;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  /* The select names current work only; it does not construct a
     programme catalogue or an enrolment pathway. */
  const [discipline, setDiscipline] = useState<string>(offerList[0].name);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) {
      next.name = t.nameError;
    }
    const c = contact.trim();
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
    const looksPhone = /^[+\d][\d\s()-]{5,}$/.test(c);
    if (!c) {
      next.contact = t.contactErrorEmpty;
    } else if (!looksEmail && !looksPhone) {
      next.contact = t.contactErrorBad;
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => {
        if (next.name) nameRef.current?.focus();
        else if (next.contact) contactRef.current?.focus();
      });
      return;
    }

    const subject = t.subject(name.trim(), discipline);
    const body = t.body(name.trim(), contact.trim(), discipline, message.trim());

    /* Hand off to the visitor's own mail client. A real anchor click
       is the one handoff every desktop and mobile client honours;
       window.location is not, in several of them. The anchor carries
       the built URL, so it can be read back after the click. */
    const url = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    const link = document.createElement("a");
    link.href = url;
    link.dataset.mailto = "prepared";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => link.remove(), 8000);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-7">
      <div className="grid gap-7 md:grid-cols-2 md:gap-8">
        <div>
          <label htmlFor="af-name" className="field-label">
            {t.name}
          </label>
          <input
            ref={nameRef}
            id="af-name"
            name="name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            className="field-input"
            placeholder={t.namePlaceholder}
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
            {t.contact}
          </label>
          <input
            ref={contactRef}
            id="af-contact"
            name="contact"
            /* Text, not email: the office takes a mailbox or a phone
               number here, and the form runs its own validation. The
               email keyboard still comes up via inputMode. */
            type="text"
            inputMode="email"
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
            {t.field}
          </label>
          <select
            id="af-discipline"
            name="discipline"
            className="field-select"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          >
            {offerList.map((o) => (
              <option key={o.id} value={o.name}>
                {o.name}
              </option>
            ))}
            <option value={t.notSure}>{t.notSure}</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="af-message" className="field-label">
          {t.message}
        </label>
        <textarea
          id="af-message"
          name="message"
          rows={5}
          enterKeyHint="send"
          className="field-textarea"
          placeholder={t.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn">
          {t.submit}
        </button>
        <p className="text-[0.85rem] text-soft">{t.submitNote(site.email)}</p>
      </div>
      {/* With JavaScript off, the public mailbox remains available. */}
      <noscript>
        <p className="field-error">{t.noScript(site.email)}</p>
      </noscript>
    </form>
  );
}
