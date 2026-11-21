"use client";

import { useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Errors = { confirmation?: string };

type Props = {
  lang: Lang;
  roleName: string;
  email: string;
  deadline: string;
};

const copy = {
  en: {
    name: "Full name, optional",
    namePlaceholder: "Your full name",
    contact: "Reply contact, optional",
    contactPlaceholder: "name@example.com or +264 …",
    town: "Current town or region, optional",
    townPlaceholder: "For example: Ongwediva",
    statement: "Short note, optional",
    statementPlaceholder:
      "Add any context you choose to include in your application email.",
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
    confirmationError: "Please confirm how the email handoff works before continuing.",
    subject: (roleName: string) => `Application: ${roleName}`,
    body: (values: {
      roleName: string;
      name: string;
      contact: string;
      town: string;
      statement: string;
      deadline: string;
    }) =>
      [
        "Hello Oryx recruitment team,",
        "",
        `Role: ${values.roleName}`,
        values.name ? `Name: ${values.name}` : null,
        values.contact ? `Reply contact: ${values.contact}` : null,
        values.town ? `Current town or region: ${values.town}` : null,
        values.statement ? `\nNote:\n${values.statement}` : null,
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
    name: "Volle naam, opsioneel",
    namePlaceholder: "Jou volle naam",
    contact: "Kontak vir ’n antwoord, opsioneel",
    contactPlaceholder: "naam@voorbeeld.com of +264 …",
    town: "Huidige dorp of streek, opsioneel",
    townPlaceholder: "Byvoorbeeld: Ongwediva",
    statement: "Kort nota, opsioneel",
    statementPlaceholder:
      "Voeg enige konteks by wat jy in jou aansoek-e-pos wil insluit.",
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
    confirmationError: "Bevestig asseblief eers hoe die e-posoorhandiging werk.",
    subject: (roleName: string) => `Aansoek: ${roleName}`,
    body: (values: {
      roleName: string;
      name: string;
      contact: string;
      town: string;
      statement: string;
      deadline: string;
    }) =>
      [
        "Hallo Oryx-werwingspan,",
        "",
        `Rol: ${values.roleName}`,
        values.name ? `Naam: ${values.name}` : null,
        values.contact ? `Kontak vir antwoord: ${values.contact}` : null,
        values.town ? `Huidige dorp of streek: ${values.town}` : null,
        values.statement ? `\nNota:\n${values.statement}` : null,
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
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const confirmationRef = useRef<HTMLInputElement>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!confirmed) next.confirmation = t.confirmationError;
    return next;
  }

  function focusFirstError(next: Errors) {
    requestAnimationFrame(() => {
      if (next.confirmation) confirmationRef.current?.focus();
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
            id="career-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="career-contact" className="field-label">{t.contact}</label>
          <input
            id="career-contact"
            name="contact"
            type="text"
            inputMode="email"
            autoComplete="email"
            className="field-input"
            placeholder={t.contactPlaceholder}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
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
          id="career-statement"
          name="statement"
          rows={6}
          maxLength={1200}
          className="field-textarea"
          placeholder={t.statementPlaceholder}
          value={statement}
          onChange={(event) => setStatement(event.target.value)}
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
