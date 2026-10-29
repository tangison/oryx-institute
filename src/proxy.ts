import { NextRequest, NextResponse } from "next/server";

/**
 * The edge proxy does three jobs, in order.
 *
 * 1. Locale routing, next-intl style, without the library. English is
 *    the default and keeps the clean URLs the site launched with: the
 *    proxy rewrites /practice to /en/practice internally, so no
 *    existing link, sitemap entry or search result ever breaks.
 *    Chinese lives at /zh/... physically; anything that already
 *    carries a language prefix passes straight through.
 * 2. Content negotiation for markdown. A client that asks for
 *    text/markdown (agents, LLM readers, curl-based tooling) is
 *    rewritten to the same path on the /md shelf, which serves the
 *    page as clean markdown. The URL the visitor asked for never
 *    changes; the representation follows the Accept header.
 * 3. The preview guard. Production hosts serve indexable pages; every
 *    other host (vercel.app aliases, preview deployments) is marked
 *    noindex so it cannot leak into search results. When the production
 *    domain changes, set the PRODUCTION_HOST environment variable.
 */

const LANGS = ["en", "zh"];

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
  const needsRewrite = !LANGS.includes(first) && first !== "md";

  const configured = process.env.PRODUCTION_HOST;
  const hosts = configured
    ? [configured, `www.${configured}`, "localhost"]
    : DEFAULT_PRODUCTION_HOSTS;

  const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "");
  const isProduction = hosts.includes(host);

  /* Markdown negotiation: only when the client explicitly prefers
     text/markdown and is not already on the shelf. HTML stays the
     default for every browser and for crawlers that accept anything. */
  const accept = request.headers.get("accept") ?? "";
  const wantsMarkdown =
    first !== "md" && accept.includes("text/markdown");

  /* The rewrite carries the query string with it: deep links into
     /apply must survive the locale hop, or the server never sees
     which offer the visitor arrived on. */
  const target = wantsMarkdown
    ? `/md${pathname === "/" ? "" : pathname}`
    : `/en${pathname === "/" ? "" : pathname}`;
  const rewritten = new URL(target, request.nextUrl.origin);
  rewritten.search = request.nextUrl.search;

  const response = needsRewrite
    ? NextResponse.rewrite(rewritten)
    : NextResponse.next();

  if (!isProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  } else if (wantsMarkdown) {
    /* The markdown shelf is a representation of the HTML pages, not a
       separate corpus; keep it out of the index so the canonical HTML
       stays the one that ranks. */
    response.headers.set("X-Robots-Tag", "noindex");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|icon.png|apple-icon.png|api|feed.xml|feed.json|.*\\..*).*)",
  ],
};
