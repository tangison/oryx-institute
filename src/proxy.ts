import { NextRequest, NextResponse } from "next/server";

/**
 * The edge proxy does two jobs, in order.
 *
 * 1. Locale routing, next-intl style, without the library. English is
 *    the default and keeps the clean URLs the site launched with: the
 *    proxy rewrites /programmes to /en/programmes internally, so no
 *    existing link, sitemap entry or search result ever breaks.
 *    Afrikaans lives at /af/... physically; anything that already
 *    carries a language prefix passes straight through.
 * 2. The preview guard. Production hosts serve indexable pages; every
 *    other host (vercel.app aliases, preview deployments) is marked
 *    noindex so it cannot leak into search results. When the production
 *    domain changes, set the PRODUCTION_HOST environment variable.
 */

const LANGS = ["en", "af"];

const DEFAULT_PRODUCTION_HOSTS = [
  "oryxinstitute.org",
  "www.oryxinstitute.org",
  "localhost",
  "127.0.0.1",
];

export default function proxy(request: NextRequest) {
  /* Locale layer first. Static assets, metadata routes and anything
     with a file extension bypass this via the matcher below. */
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  const needsRewrite = !LANGS.includes(first);

  const configured = process.env.PRODUCTION_HOST;
  const hosts = configured
    ? [configured, `www.${configured}`, "localhost"]
    : DEFAULT_PRODUCTION_HOSTS;

  const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "");
  const isProduction = hosts.includes(host);

  const response = needsRewrite
    ? NextResponse.rewrite(
        new URL(
          `/en${pathname === "/" ? "" : pathname}`,
          request.nextUrl.origin
        )
      )
    : NextResponse.next();

  if (!isProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|icon.png|apple-icon.png|api|feed.xml|feed.json|.*\\..*).*)",
  ],
};
