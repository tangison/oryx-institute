"use client";

import { useEffect, useState } from "react";
import { offers, site } from "@/lib/site";
import { offersAf } from "@/lib/site-af";
import type { Lang } from "@/lib/i18n";

type Errors = { name?: string; contact?: string };

const labels = {
  en: {
    name: "Name",
    namePlaceholder: "Your full name",
    nameError: "Please tell us your name so we know who is applying.",
    contact: "Email for the reply",
    contactErrorEmpty:
      "Add one way to reach you: an email address, or a phone number if you prefer a call.",
    contactErrorBad:
      "That does not look complete. Use an email address (name@example.com) or a phone number with its country code.",
    field: "Field of interest",
    notSure: "Not sure yet",
    message: "Message, optional",
    messagePlaceholder:
      "Tell us where you are coming from and what you want to learn",
    submit: "Prepare the email",
    submitNote: (email: string) =>
      `Opens your own mail client with the application addressed to ${email}. Nothing is stored on this site.`,
    noScript: (email: string) => (
      <>
        The composer needs JavaScript. Without it, the application is the
        same email written by hand:{" "}
        <a href={`mailto:${email}`} className="link-type">
          {email}
        </a>
      </>
    ),
    subject: (name: string, discipline: string) =>
      `Application: ${name} · ${discipline}`,
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
    nameError: "Vertel ons asseblief jou naam sodat ons weet wie aansoek doen.",
    contact: "E-pos vir die antwoord",
    contactErrorEmpty:
      "Voeg een manier by om jou te bereik: 'n e-posadres, of 'n telefoonnommer as jy liever 'n oproep wil hê.",
    contactErrorBad:
      "Dit lyk nie volledig nie. Gebruik 'n e-posadres (naam@voorbeeld.com) of 'n telefoonnommer met sy landkode.",
    field: "Belangstellingsveld",
    notSure: "Nog nie seker nie",
    message: "Boodskap, opsioneel",
    messagePlaceholder:
      "Vertel ons waarvandaan jy kom en wat jy wil leer",
    submit: "Berei die e-pos voor",
    submitNote: (email: string) =>
      `Maak jou eie e-poskliënt oop met die aansoek geadresseer aan ${email}. Niks word op hierdie werf gestoor nie.`,
    noScript: (email: string) => (
      <>
        Die komponeerder benodig JavaScript. Sonder dit is die aansoek
        dieselfde e-pos, met die hand geskryf:{" "}
        <a href={`mailto:${email}`} className="link-type">
          {email}
        </a>
      </>
    ),
    subject: (name: string, discipline: string) =>
      `Aansoek: ${name} · ${discipline}`,
    body: (
      name: string,
      contact: string,
      discipline: string,
      message: string
    ) =>
      [
        `Goeiedag Oryx Instituut,`,
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
 * Email-first application composer. The form builds a prefilled email
 * to the office's mailbox and hands off to the visitor's own mail
 * client. No data is stored on this site; nothing is sent anywhere
 * until the visitor presses send in their own client.
 *
 * A ?for=<offer-id> query preselects the field of interest (e.g. the
 * CTAs on /programmes): read client-side so the page stays static.
 *
 * The business telephone line is deliberately not published while the
 * institute is being established; when one lands, a phone field and a
 * tel handoff are added back here.
 */
export function ApplyForm({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const offerList = lang === "af" ? offersAf : offers;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [discipline, setDiscipline] = useState<string>(offerList[0].name);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("for");
    if (!wanted) return;
    const hit = offerList.find((o) => o.id === wanted);
    if (hit) setDiscipline(hit.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (Object.keys(next).length > 0) return;

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
      {/* With JavaScript off, the composer cannot run; the address
          itself is the application. */}
      <noscript>
        <p className="field-error">{t.noScript(site.email)}</p>
      </noscript>
    </form>
  );
}
