import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { site } from "@/lib/site";

/**
 * The error screen is intentionally separate from the public-site chrome.
 * It is a monochrome recovery page: no decorative image, no menu, and no
 * attempt to turn a wrong address into a marketing moment.
 */
export type ErrorStatus = 404 | 500 | 403 | 408 | 429;

const copy = {
  en: {
    home: "Back to the front page",
    office: "Write to the office",
    phoneLabel: "Call or WhatsApp",
    again: "Try again",
    apply: "Enquire",
    back: "Back",
    footerAria: "Oryx Institute, home",
    variants: {
      404: {
        title: "This page is not here.",
        body: "It may have moved or may never have been published. Return to the front page or write to the office.",
        links: ["home", "apply"] as const,
      },
      500: {
        title: "The line broke.",
        body: "The server could not finish the request. Give it a moment, then try again or write to the office.",
        links: ["home", "office"] as const,
      },
      403: {
        title: "Not for public reading.",
        body: "This address exists, but it is not open. If you expected to find something here, write to the office.",
        links: ["home", "office"] as const,
      },
      408: {
        title: "The line is busy.",
        body: "The server could not answer in time. Wait a moment and try again.",
        links: ["back"] as const,
      },
      429: {
        title: "One at a time.",
        body: "Too many requests arrived too quickly. Slow down and try again in a minute.",
        links: ["back"] as const,
      },
    },
  },
  af: {
    home: "Terug na die tuisblad",
    office: "Skryf aan die kantoor",
    phoneLabel: "Bel of WhatsApp",
    again: "Probeer weer",
    apply: "Doen navraag",
    back: "Terug",
    footerAria: "Oryx Instituut, tuis",
    variants: {
      404: {
        title: "Hier is geen blad nie.",
        body: "Dit kon geskuif het of is nooit gepubliseer nie. Gaan terug na die tuisblad of skryf aan die kantoor.",
        links: ["home", "apply"] as const,
      },
      500: {
        title: "Die lyn het gebreek.",
        body: "Die bediener kon nie die versoek voltooi nie. Wag ’n oomblik, probeer weer, of skryf aan die kantoor.",
        links: ["home", "office"] as const,
      },
      403: {
        title: "Nie vir openbare lees nie.",
        body: "Hierdie adres bestaan, maar is nie oop nie. As jy iets hier verwag het, skryf aan die kantoor.",
        links: ["home", "office"] as const,
      },
      408: {
        title: "Die lyn is besig.",
        body: "Die bediener kon nie betyds antwoord nie. Wag ’n oomblik en probeer weer.",
        links: ["back"] as const,
      },
      429: {
        title: "Een op ’n slag.",
        body: "Te veel versoeke het te vinnig gekom. Wag ’n minuut en probeer weer.",
        links: ["back"] as const,
      },
    },
  },
} as const;

export function statusFromError(error: { status?: unknown; statusCode?: unknown; digest?: string }): ErrorStatus {
  const raw = error.status ?? error.statusCode;
  const n = typeof raw === "string" ? parseInt(raw, 10) : raw;
  if (n === 401 || n === 403) return 403;
  if (n === 408 || n === 502 || n === 503 || n === 504) return 408;
  if (n === 429) return 429;
  /* Platform statuses the edge may report through a digest prefix. */
  if (typeof error.digest === "string") {
    const m = error.digest.match(/(40[1348]|429|50[234])/);
    if (m) {
      const v = parseInt(m[1], 10);
      if (v === 401 || v === 403) return 403;
      if (v === 429) return 429;
      if (v === 404) return 404;
      return 408;
    }
  }
  return 500;
}

export function ErrorScreen({
  status,
  lang = "en",
  onReset,
}: {
  status: ErrorStatus;
  lang?: "en" | "af";
  onReset?: () => void;
}) {
  const t = copy[lang];
  const v = t.variants[status];
  const p = lang === "af" ? "/af" : "";
  const linkFor = (kind: (typeof v.links)[number]) => {
    switch (kind) {
      case "home":
        return (
          <Link href={p === "/af" ? "/af" : "/"} className="btn--outline btn">
            {t.home}
          </Link>
        );
      case "apply":
        return (
          <Link href={`${p}/apply`} className="btn--quiet">
            {t.apply} <span className="arr" aria-hidden="true">→</span>
          </Link>
        );
      case "office":
        return (
          <a href={`mailto:${site.email}`} className="btn--quiet">
            {t.office} <span className="arr" aria-hidden="true">→</span>
          </a>
        );
      case "back":
        return (
          <Link href={p === "/af" ? "/af" : "/"} className="btn--outline btn">
            {t.back}
          </Link>
        );
    }
  };

  return (
    <div className="error-screen on-ink flex min-h-screen flex-col">
      <header className="shell error-screen__header flex items-center py-6">
        <Link href={p === "/af" ? "/af" : "/"} aria-label={t.footerAria} className="flex items-center">
          <OryxLogo variant="lockup" tone="reverse" className="h-8 w-auto" />
        </Link>
      </header>

      <main className="shell error-screen__main flex flex-1 flex-col items-start justify-center pb-24">
        <p className="error-screen__status" aria-hidden="true">{status}</p>
        <h1 className="h-display mt-5 max-w-[15ch]">{v.title}</h1>
        <p className="measure mt-5 text-soft">{v.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-7">
          {v.links.map((k) => (
            <span key={k}>{linkFor(k)}</span>
          ))}
          {onReset ? (
            <button type="button" onClick={onReset} className="btn--quiet">
              {t.again}
            </button>
          ) : null}
        </div>
      </main>

      <footer className="shell error-screen__footer py-5">
        <p className="meta">oryxinstitute.org</p>
        <p className="meta mt-1">
          {t.phoneLabel}{" "}
          <a
            href={site.phoneHref}
            className="link-type whitespace-nowrap"
            aria-label={`Call ${site.tradingName} on ${site.phoneDisplay}`}
          >
            {site.phoneDisplay}
          </a>
        </p>
      </footer>
    </div>
  );
}
