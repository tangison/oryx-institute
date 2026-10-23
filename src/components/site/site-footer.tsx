import Link from "next/link";
import { OryxLogo } from "@/components/site/oryx-logo";
import { site, partners } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer hair-t mt-auto bg-paper text-ink">
      <div className="shell py-20 md:py-24">
        <p className="foot-statement">{site.closingLine}</p>
        <p className="measure mt-6 text-soft">
          {site.headline}
        </p>

        <div className="hair-t mt-14 grid gap-10 pt-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12">
          <Link
            href="/"
            className="flex items-center"
            aria-label={`${site.tradingName}, home`}
          >
            <OryxLogo
              variant="lockup"
              tone="brand"
              className="h-[2.2rem] w-auto"
            />
          </Link>

          <nav aria-label="Footer" className="md:justify-self-center">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: "/programmes", label: "Programmes" },
                { href: "/schools", label: "Schools" },
                { href: "/research", label: "Research" },
                { href: "/resources", label: "Resources" },
                { href: "/compare", label: "Compare" },
                { href: "/tools", label: "Tools" },
                { href: "/people", label: "People" },
                { href: "/about", label: "About" },
                { href: "/apply", label: "Apply" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="label-caps hover:text-accent-deep">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic text-[0.92rem] leading-relaxed text-soft md:text-right">
            <a href={`mailto:${site.email}`} className="link-type">
              {site.email}
            </a>
            <br />
            {site.city}, {site.country}
            {site.socials.length > 0 ? (
              <>
                <br />
                {site.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-type"
                  >
                    {s.label}
                  </a>
                ))}
              </>
            ) : null}
          </address>
        </div>

        {/* The partners, carried as their own marks: byte-exact from
            each partner's site, no recolouring. The currentColor mark
            takes the footer's ink; the self-coloured one stands as is. */}
        {partners.length > 0 ? (
          <div className="hair-t mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 pt-8">
            <p className="label-caps text-soft">In practice with</p>
            {partners.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} — ${p.href.replace("https://", "").replace("/", "")}`}
                className={`flex h-6 items-center transition-opacity hover:opacity-100 ${
                  p.tone === "ink"
                    ? "text-ink/60 hover:text-ink"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className="h-full w-auto"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-4 border-t border-rule-2 pt-6 text-[0.8rem] text-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-accent-deep">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent-deep">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-accent-deep">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-accent-deep">
                Brand
              </Link>
            </li>
          </ul>
          <p>
            Made by{" "}
            <a
              href="https://studio.tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-type"
            >
              Tangison Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
