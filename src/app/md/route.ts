import { pageIndexMd } from "@/lib/md-shelf";

/**
 * /md — the shelf root: the whole site as one markdown index.
 * Statically rendered; the proxy rewrites markdown-negotiated
 * requests for / here. Kept out of the index by the proxy's
 * X-Robots-Tag so the canonical HTML stays the one that ranks.
 */

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return new Response(pageIndexMd(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
