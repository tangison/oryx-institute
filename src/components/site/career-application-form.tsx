"use client";

import { useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Errors = {
  name?: string;
  contact?: string;
  statement?: string;
  confirmation?: string;
};

type Props = {
  lang: Lang;
  roleName: string;
  email: string;
  deadline: string;
};

const copy = {
  en: {
    name: "Full name",
    namePlaceholder: "Your full name",
    contact: "Best contact for a reply",
    contactPlaceholder: "name@example.com or +264 …",
    town: "Current town or region, optional",
    townPlaceholder: "For example: Ongwediva",
    statement: "Relevant experience and fit",
    statementPlaceholder:
      "Briefly describe your relevant experience, capabilities and why this role is a good fit.",
    accommodation: "Interview or access arrangement, optional",
    accommodationPlaceholder:
      "Tell us what arrangement would help. Do not include medical information.",
    confirmation:
      "I understand that this website does not submit or store my application. It will open an email in my own mail client, which I must review and send myself.",
    submit: "Prepare application email",
    deadline: (date: string) => `Apply by ${date}.`,
    note: (email: string) =>
      `The email will be addressed to ${email}. Attach your CV before you send it; do not attach identity, bank, medical or other highly sensitive records at this first stage.`,
    noScript: (email: string, roleName: string) => (
      <>
        The form needs JavaScript. You can apply by email instead: {" "}
        <a
          className="link-type"
          href={`mailto:${email}?subject=${encodeURIComponent(`Application: ${roleName}`)}`}
        >
          {email}
        </a>
        . Use the subject “Application: {roleName}”.
      </>
    ),
    nameError: "Please enter your full name.",
    contactEmpty: "Please add an email address or phone number for a reply.",
    contactInvalid: "Please use a complete email address or a phone number, including its country code where possible.",
    statementError: "Please give a short description of your relevant experience and fit.",
    confirmationError: "Please confirm how the email handoff works before continuing.",
    subject: (roleName: string) => `Application: ${roleName}`,
    body: (values: {
      roleName: string;
      name: string;
      contact: string;
      town: string;
      statement: string;
      accommodation: string;
      deadline: string;
    }) =>
      [
        "Hello Oryx recruitment team,",
        "",
        `Role: ${values.roleName}`,
        `Name: ${values.name}`,
        `Best contact: ${values.contact}`,
        values.town ? `Current town or region: ${values.town}` : null,
        "",
        "Relevant experience and fit:",
        values.statement,
        values.accommodation
          ? `\nInterview or access arrangement requested:\n${values.accommodation}`
          : null,
        "",
        "I will attach my CV before sending this email.",
        "I understand that I should not include identity, bank, medical or other highly sensitive records at this first stage unless Oryx specifically asks for them.",
        "",
        `I understand the published closing time is ${values.deadline}.`,
      ]
        .filter(Boolean)
        .join("\n"),
  },
  af: {
    name: "Volle naam",
    namePlaceholder: "Jou volle naam",
    contact: "Beste kontak vir ’n antwoord",
    contactPlaceholder: "naam@voorbeeld.com of +264 …",
    town: "Huidige dorp of streek, opsioneel",
    townPlaceholder: "Byvoorbeeld: Ongwediva",
    statement: "Relevante ervaring en pasvorm",
    statementPlaceholder:
      "Beskryf kortliks jou relevante ervaring, vermoëns en waarom hierdie rol goed by jou pas.",
    accommodation: "Onderhouds- of toegangsreëling, opsioneel",
    accommodationPlaceholder:
      "Sê watter reëling sal help. Moenie mediese inligting insluit nie.",
    confirmation:
      "Ek verstaan dat hierdie webwerf nie my aansoek stuur of stoor nie. Dit sal ’n e-pos in my eie e-posprogram oopmaak; ek moet dit self nagaan en stuur.",
    submit: "Stel aansoek-e-pos op",
    deadline: (date: string) => `Doen aansoek teen ${date}.`,
    note: (email: string) =>
      `Die e-pos sal aan ${email} geadresseer word. Heg jou CV aan voordat jy dit stuur; moenie identiteits-, bank-, mediese of ander hoogs sensitiewe rekords in hierdie eerste stadium heg nie.`,
    noScript: (email: string, roleName: string) => (
      <>
        Die vorm benodig JavaScript. Jy kan eerder per e-pos aansoek doen: {" "}
        <a
          className="link-type"
          href={`mailto:${email}?subject=${encodeURIComponent(`Aansoek: ${roleName}`)}`}
        >
          {email}
        </a>
        . Gebruik die onderwerp “Aansoek: {roleName}”.
      </>
    ),
    nameError: "Vul asseblief jou volle naam in.",
    contactEmpty: "Voeg asseblief ’n e-posadres of telefoonnommer vir ’n antwoord by.",
    contactInvalid: "Gebruik asseblief ’n volledige e-posadres of telefoonnommer, met ’n landkode waar moontlik.",
    statementError: "Gee asseblief ’n kort beskrywing van jou relevante ervaring en pasvorm.",
    confirmationError: "Bevestig asseblief eers hoe die e-posoorhandiging werk.",
    subject: (roleName: string) => `Aansoek: ${roleName}`,
    body: (values: {
      roleName: string;
      name: string;
      contact: string;
      town: string;
      statement: string;
      accommodation: string;
      deadline: string;
    }) =>
      [
        "Hallo Oryx-werwingspan,",
        "",
        `Rol: ${values.roleName}`,
        `Naam: ${values.name}`,
        `Beste kontak: ${values.contact}`,
        values.town ? `Huidige dorp of streek: ${values.town}` : null,
        "",
        "Relevante ervaring en pasvorm:",
        values.statement,
        values.accommodation
          ? `\nVersoek vir onderhouds- of toegangsreëling:\n${values.accommodation}`
          : null,
        "",
        "Ek sal my CV heg voordat ek hierdie e-pos stuur.",
        "Ek verstaan dat ek nie identiteits-, bank-, mediese of ander hoogs sensitiewe rekords in hierdie eerste stadium moet insluit nie, tensy Oryx dit spesifiek vra.",
        "",
        `Ek verstaan die gepubliseerde sluitingstyd is ${values.deadline}.`,
      ]
        .filter(Boolean)
        .join("\n"),
  },
} as const;

/**
 * An intentionally client-only handoff. The applicant's browser creates a
 * mailto draft; the site receives and persists nothing from the form.
 */
export function CareerApplicationForm({ lang, roleName, email, deadline }: Props) {
  const t = copy[lang];
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [town, setTown] = useState("");
  const [statement, setStatement] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const statementRef = useRef<HTMLTextAreaElement>(null);
  const confirmationRef = useRef<HTMLInputElement>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = t.nameError;

    const normalisedContact = contact.trim();
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalisedContact);
    const looksPhone = /^[+\d][\d\s().-]{5,}$/.test(normalisedContact);
    if (!normalisedContact) next.contact = t.contactEmpty;
    else if (!looksEmail && !looksPhone) next.contact = t.contactInvalid;

    if (!statement.trim()) next.statement = t.statementError;
    if (!confirmed) next.confirmation = t.confirmationError;
    return next;
  }

  function focusFirstError(next: Errors) {
    requestAnimationFrame(() => {
      if (next.name) nameRef.current?.focus();
      else if (next.contact) contactRef.current?.focus();
      else if (next.statement) statementRef.current?.focus();
      else if (next.confirmation) confirmationRef.current?.focus();
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      focusFirstError(next);
      return;
    }

    const subject = t.subject(roleName);
    const body = t.body({
      roleName,
      name: name.trim(),
      contact: contact.trim(),
      town: town.trim(),
      statement: statement.trim(),
      accommodation: accommodation.trim(),
      deadline,
    });
    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const link = document.createElement("a");
    link.href = href;
    link.dataset.mailto = "career-application-prepared";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => link.remove(), 8000);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-7">
      <div className="grid gap-7 md:grid-cols-2 md:gap-8">
        <div>
          <label htmlFor="career-name" className="field-label">{t.name}</label>
          <input
            ref={nameRef}
            id="career-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "career-name-error" : undefined}
          />
          <p id="career-name-error" className="field-error" role={errors.name ? "alert" : undefined}>{errors.name ?? ""}</p>
        </div>
        <div>
          <label htmlFor="career-contact" className="field-label">{t.contact}</label>
          <input
            ref={contactRef}
            id="career-contact"
            name="contact"
            type="text"
            inputMode="email"
            autoComplete="email"
            className="field-input"
            placeholder={t.contactPlaceholder}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? "career-contact-error" : undefined}
          />
          <p id="career-contact-error" className="field-error" role={errors.contact ? "alert" : undefined}>{errors.contact ?? ""}</p>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="career-town" className="field-label">{t.town}</label>
          <input
            id="career-town"
            name="town"
            type="text"
            autoComplete="address-level2"
            className="field-input"
            placeholder={t.townPlaceholder}
            value={town}
            onChange={(event) => setTown(event.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="career-statement" className="field-label">{t.statement}</label>
        <textarea
          ref={statementRef}
          id="career-statement"
          name="statement"
          rows={6}
          maxLength={1200}
          className="field-textarea"
          placeholder={t.statementPlaceholder}
          value={statement}
          onChange={(event) => setStatement(event.target.value)}
          aria-invalid={errors.statement ? true : undefined}
          aria-describedby={errors.statement ? "career-statement-error" : undefined}
        />
        <p id="career-statement-error" className="field-error" role={errors.statement ? "alert" : undefined}>{errors.statement ?? ""}</p>
      </div>

      <div>
        <label htmlFor="career-accommodation" className="field-label">{t.accommodation}</label>
        <textarea
          id="career-accommodation"
          name="accommodation"
          rows={3}
          maxLength={500}
          className="field-textarea"
          placeholder={t.accommodationPlaceholder}
          value={accommodation}
          onChange={(event) => setAccommodation(event.target.value)}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-soft" htmlFor="career-confirmation">
          <input
            ref={confirmationRef}
            id="career-confirmation"
            name="confirmation"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[var(--maroon)]"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            aria-invalid={errors.confirmation ? true : undefined}
            aria-describedby={errors.confirmation ? "career-confirmation-error" : undefined}
          />
          <span>{t.confirmation}</span>
        </label>
        <p id="career-confirmation-error" className="field-error" role={errors.confirmation ? "alert" : undefined}>{errors.confirmation ?? ""}</p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn">{t.submit}</button>
        <p className="text-[0.85rem] leading-relaxed text-soft">{t.deadline(deadline)}</p>
      </div>
      <p className="text-[0.85rem] leading-relaxed text-soft">{t.note(email)}</p>
      <noscript><p className="field-error">{t.noScript(email, roleName)}</p></noscript>
    </form>
  );
}
