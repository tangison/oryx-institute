import { NextRequest, NextResponse } from "next/server";

/**
 * The edge proxy does three jobs, in order.
 *
 * 1. Locale routing, next-intl style, without the library. English is
 *    the default and keeps the clean URLs the site launched with: the
 *    proxy rewrites /practice to /en/practice internally, so no
 *    existing link, sitemap entry or search result ever breaks.
 *    Afrikaans lives at /af/... physically; anything that already
 *    carries a language prefix passes straight through.
 * 2. The /md shelf is an explicit, clean-markdown alternative for
 *    agents and readers. Each indexable HTML page advertises its shelf
 *    URL with a typed alternate link. Keeping it explicit avoids a
 *    cache serving markdown for a normal HTML request.
 * 3. The preview guard. Production hosts serve indexable pages; every
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

  /* Chinese is no longer a published language surface. Preserve legacy
     inbound links by redirecting them to their English equivalents. */
  if (first === "zh") {
    const target = new URL(
      pathname.replace(/^\/zh(?=\/|$)/, "") || "/",
      request.nextUrl.origin
    );
    target.search = request.nextUrl.search;
    return NextResponse.redirect(target, 308);
  }

  const markdownShelf = first === "md";
  const needsRewrite = !LANGS.includes(first) && !markdownShelf;

  const configured = process.env.PRODUCTION_HOST;
  const hosts = configured
    ? [configured, `www.${configured}`, "localhost"]
    : DEFAULT_PRODUCTION_HOSTS;

  const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "");
  const isProduction = hosts.includes(host);

  /* The rewrite carries the query string with it: deep links into
     /apply must survive the locale hop, or the server never sees
     which offer the visitor arrived on. */
  const target = `/en${pathname === "/" ? "" : pathname}`;
  const rewritten = new URL(target, request.nextUrl.origin);
  rewritten.search = request.nextUrl.search;

  /* The locale hint rides the internal request headers: the
     not-found boundary cannot read route params, so this is how a
     Afrikaans 404 knows to render in Afrikaans. */
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-oryx-lang", needsRewrite ? "en" : first);

  const response = needsRewrite
    ? NextResponse.rewrite(rewritten, { request: { headers: reqHeaders } })
    : NextResponse.next({ request: { headers: reqHeaders } });

  response.headers.set(
    "Content-Language",
    first === "af" ? "af-NA" : "en"
  );

  if (!isProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  } else if (markdownShelf) {
    /* The markdown shelf makes pages easier for agents to read, but it
       is not a second search corpus. The canonical HTML remains the
       indexable representation. */
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|icon.png|apple-icon.png|api|feed.xml|feed.json|.*\\..*).*)",
  ],
};
