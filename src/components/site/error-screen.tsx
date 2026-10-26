import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";

/**
 * The error screen, shared by every status the site can return.
 * Cream paper, ink type, the maroon shield at ~120px, a wordmark
 * header with no MENU button, and a one-line footer. No dark grounds,
 * no glitch type, no illustrations.
 *
 * Status variants per the brief:
 *   404            Nothing stands at this address.       (two links)
 *   500            Something broke at the printer.       (two links)
 *   403 / 401      Not for public reading.               (two links)
 *   408/503/504    The line is busy.                     (one link)
 *   429            One at a time.                        (one link)
 */
export type ErrorStatus = 404 | 500 | 403 | 408 | 429;

const copy = {
  en: {
    home: "Back to the front page",
    office: "Write to the office",
    again: "Try again",
    apply: "Apply now",
    back: "Back",
    footerAria: "Oryx Institute, home",
    variants: {
      404: {
        title: "Nothing stands at this address.",
        body: "The page moved, or it was never printed. The register, the practice, and the office are one click away.",
        links: ["home", "apply"] as const,
      },
      500: {
        title: "Something broke at the printer.",
        body: "The server returned an error. Try again in a minute, or write to the office if it keeps happening.",
        links: ["home", "office"] as const,
      },
      403: {
        title: "Not for public reading.",
        body: "This address exists but it is not open. If you expected to reach something here, write to the office.",
        links: ["home", "office"] as const,
      },
      408: {
        title: "The line is busy.",
        body: "The server could not answer in time. Wait a moment and try again.",
        links: ["back"] as const,
      },
      429: {
        title: "One at a time.",
        body: "Too many requests too quickly. Slow down and try again in a minute.",
        links: ["back"] as const,
      },
    },
  },
  zh: {
    home: "回到首页",
    office: "给办公室写信",
    again: "重试",
    apply: "申请",
    back: "返回",
    footerAria: "Oryx 理工学院，首页",
    variants: {
      404: {
        title: "这个地址什么也没有。",
        body: "页面搬走了，或者从未印出。登记册、实务与办公室，各在一击之外。",
        links: ["home", "apply"] as const,
      },
      500: {
        title: "印厂那边出了故障。",
        body: "服务器返回了一个错误。稍等一分钟再试，或者给办公室写信。",
        links: ["home", "office"] as const,
      },
      403: {
        title: "不对公众开放。",
        body: "这个地址存在，但没有开放。如果你本想在这里找到什么，给办公室写信。",
        links: ["home", "office"] as const,
      },
      408: {
        title: "线路正忙。",
        body: "服务器没能及时应答。稍候片刻，再试一次。",
        links: ["back"] as const,
      },
      429: {
        title: "一次一件。",
        body: "请求来得太快太多。慢下来，一分钟后重试。",
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
  lang?: "en" | "zh";
  onReset?: () => void;
}) {
  const t = copy[lang];
  const v = t.variants[status];
  const p = lang === "zh" ? "/zh" : "";
  const linkFor = (kind: (typeof v.links)[number]) => {
    switch (kind) {
      case "home":
        return (
          <Link href={p === "/zh" ? "/zh" : "/"} className="btn--outline btn">
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
          <a href="mailto:info@oryxinstitute.org" className="btn--quiet">
            {t.office} <span className="arr" aria-hidden="true">→</span>
          </a>
        );
      case "back":
        return (
          <Link href={p === "/zh" ? "/zh" : "/"} className="btn--outline btn">
            {t.back}
          </Link>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--paper)] text-[var(--ink)]">
      <header className="shell flex items-center py-6">
        <Link href={p === "/zh" ? "/zh" : "/"} aria-label={t.footerAria} className="flex items-center">
          <OryxLogo variant="lockup" tone="brand" className="h-8 w-auto" />
        </Link>
      </header>

      <main className="shell flex flex-1 flex-col items-start justify-center pb-24">
        <OryxLogo variant="emblem" tone="brand" className="h-[120px] w-auto" />
        <h1 className="h-display mt-10 max-w-[18ch]">{v.title}</h1>
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

      <footer className="shell border-t border-[var(--rule)] py-5">
        <p className="meta">oryxinstitute.org</p>
      </footer>
    </div>
  );
}
