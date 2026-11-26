"use client";

import { useRef, useState } from "react";
import { offers, site } from "@/lib/site";
import { offersAf } from "@/lib/site-af";
import type { Lang } from "@/lib/i18n";

type ContactMethod = "email" | "phone";
type Errors = { name?: string; contact?: string };

const labels = {
  en: {
    name: "Name",
    namePlaceholder: "Your full name",
    nameError: "Please tell us your name so we know who is enquiring.",
    replyMethod: "How should the office reply?",
    email: "Email",
    phone: "Phone",
    contact: (method: ContactMethod) =>
      method === "email" ? "Email address" : "Phone number",
    contactPlaceholder: (method: ContactMethod) =>
      method === "email" ? "name@example.com" : "+264 81 234 5678",
    contactErrorEmpty: (method: ContactMethod) =>
      method === "email" ? "Add an email address for the reply." : "Add a phone number for the reply.",
    contactErrorBad: (method: ContactMethod) =>
      method === "email"
        ? "That email address does not look complete. Use a form such as name@example.com."
        : "That phone number does not look complete. Include its country code.",
    field: "Field of interest",
    notSure: "Not sure yet",
    message: "Message, optional",
    messagePlaceholder: "Tell us what you need and any useful context",
    submit: "Prepare the email",
    submitNote: (email: string) =>
      `Opens your own mail client with the enquiry addressed to ${email}. Nothing is stored on this site.`,
    alternate: "No mail app?",
    call: "Call Oryx",
    whatsapp: "WhatsApp Oryx",
    or: "or",
    noScript: (email: string) => (
      <>
        The composer needs JavaScript. Without it, write the same enquiry by hand:{" "}
        <a href={`mailto:${email}`} className="link-type">
          {email}
        </a>
      </>
    ),
    subject: (name: string, discipline: string) => `Enquiry: ${name} · ${discipline}`,
    body: (
      name: string,
      contact: string,
      discipline: string,
      message: string
    ) =>
      [
        "Hello Oryx Institute,",
        "",
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
    replyMethod: "Hoe moet die kantoor antwoord?",
    email: "E-pos",
    phone: "Telefoon",
    contact: (method: ContactMethod) =>
      method === "email" ? "E-posadres" : "Telefoonnommer",
    contactPlaceholder: (method: ContactMethod) =>
      method === "email" ? "naam@voorbeeld.com" : "+264 81 234 5678",
    contactErrorEmpty: (method: ContactMethod) =>
      method === "email" ? "Voeg ’n e-posadres vir die antwoord by." : "Voeg ’n telefoonnommer vir die antwoord by.",
    contactErrorBad: (method: ContactMethod) =>
      method === "email"
        ? "Daardie e-posadres lyk nie volledig nie. Gebruik byvoorbeeld naam@voorbeeld.com."
        : "Daardie telefoonnommer lyk nie volledig nie. Sluit die landkode in.",
    field: "Belangstellingsveld",
    notSure: "Nog nie seker nie",
    message: "Boodskap, opsioneel",
    messagePlaceholder: "Vertel ons wat jy benodig en enige nuttige agtergrond",
    submit: "Stel die e-pos op",
    submitNote: (email: string) =>
      `Maak jou eie e-posprogram oop met die navraag aan ${email}. Niks word op hierdie webwerf gestoor nie.`,
    alternate: "Geen e-posprogram nie?",
    call: "Bel Oryx",
    whatsapp: "WhatsApp Oryx",
    or: "of",
    noScript: (email: string) => (
      <>
        Die samesteller vereis JavaScript. Daarsonder kan jy dieselfde navraag met die hand skryf:{" "}
        <a href={`mailto:${email}`} className="link-type">
          {email}
        </a>
      </>
    ),
    subject: (name: string, discipline: string) => `Navraag: ${name} · ${discipline}`,
    body: (
      name: string,
      contact: string,
      discipline: string,
      message: string
    ) =>
      [
        "Hallo Oryx Instituut,",
        "",
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
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
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
    if (!name.trim()) next.name = t.nameError;

    const value = contact.trim();
    const valid =
      contactMethod === "email"
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : /^[+\d][\d\s()-]{5,}$/.test(value);
    if (!value) next.contact = t.contactErrorEmpty(contactMethod);
    else if (!valid) next.contact = t.contactErrorBad(contactMethod);
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
    const url = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "af-name-error" : undefined}
          />
          <p id="af-name-error" className="field-error" role={errors.name ? "alert" : undefined}>
            {errors.name ?? ""}
          </p>
        </div>
        <div>
          <label htmlFor="af-contact-method" className="field-label">
            {t.replyMethod}
          </label>
          <select
            id="af-contact-method"
            name="contact-method"
            className="field-select"
            value={contactMethod}
            onChange={(event) => {
              setContactMethod(event.target.value as ContactMethod);
              setContact("");
              setErrors((current) => ({ ...current, contact: undefined }));
            }}
          >
            <option value="email">{t.email}</option>
            <option value="phone">{t.phone}</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="af-contact" className="field-label">
            {t.contact(contactMethod)}
          </label>
          <input
            ref={contactRef}
            id="af-contact"
            name="contact"
            type={contactMethod === "email" ? "email" : "tel"}
            inputMode={contactMethod === "email" ? "email" : "tel"}
            autoComplete={contactMethod === "email" ? "email" : "tel"}
            enterKeyHint="next"
            className="field-input"
            placeholder={t.contactPlaceholder(contactMethod)}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? "af-contact-error" : undefined}
          />
          <p id="af-contact-error" className="field-error" role={errors.contact ? "alert" : undefined}>
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
            onChange={(event) => setDiscipline(event.target.value)}
          >
            {offerList.map((offer) => (
              <option key={offer.id} value={offer.name}>
                {offer.name}
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
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn">
          {t.submit}
        </button>
        <p className="text-[0.85rem] text-soft">{t.submitNote(site.email)}</p>
      </div>
      <p className="text-[0.85rem] leading-relaxed text-soft">
        <span>{t.alternate} </span>
        <a href={site.phoneHref} className="link-type whitespace-nowrap">
          {t.call}
        </a>
        <span> {t.or} </span>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="link-type whitespace-nowrap"
        >
          {t.whatsapp}
        </a>
        <span>.</span>
      </p>
      {/* With JavaScript off, the public mailbox and phone routes remain available. */}
      <noscript>
        <p className="field-error">{t.noScript(site.email)}</p>
      </noscript>
    </form>
  );
}
