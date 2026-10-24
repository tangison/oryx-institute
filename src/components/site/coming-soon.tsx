import { OryxLogo } from "@/components/site/oryx-logo";
import { site } from "@/lib/site";

/**
 * The coming-soon screen, shared by the home page and the 404 so every
 * route on the domain lands on the same fact: the site is being
 * rebuilt, and the office still answers. Zero client JavaScript — the
 * grain is CSS, the movement is CSS, and every line is server HTML.
 */
export function ComingSoon() {
  return (
    <div className="coming">
      {/* The film-grain plane, drawn in CSS: the print-stock feel
          with zero script behind it. */}
      <div className="coming-grain" aria-hidden />

      <main id="main" className="coming-body">
        <p className="coming-eyebrow label-caps">
          Oryx Polytechnic Institute · Windhoek, Namibia
        </p>

        <OryxLogo
          variant="lockup"
          tone="brand"
          className="coming-mark"
          title={`${site.legalName} wordmark`}
        />

        <h1 className="coming-title display-hero">
          Coming <span className="em-serif text-accent">soon.</span>
        </h1>

        <p className="coming-line">
          The site is being rebuilt — properly. Until it returns, the
          office answers every message itself.
        </p>

        <a href={`mailto:${site.email}`} className="pill coming-mail">
          {site.email}
        </a>
      </main>

      <footer className="coming-foot">
        <p className="coming-tagline em-serif">
          You&rsquo;re only as good as your tools. We forge them.
        </p>
        <p className="coming-legal label-caps">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </footer>
    </div>
  );
}
