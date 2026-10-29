import { resolveSlug, shelfSlugs } from "@/lib/md-shelf";

/**
 * /md/{slug} — one page or document as clean markdown.
 *
 * generateStaticParams covers the whole shelf (the index alias, every
 * site page and every Directory document), so the route is fully
 * static and a request never pays a cold render. Anything outside the
 * shelf answers 404 as plain text: no HTML error page, no redirect.
 */

export const dynamic = "force-static";

export function generateStaticParams(): { slug: string }[] {
  return shelfSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const { slug } = await params;
  const body = resolveSlug(slug);
  if (!body) {
    return new Response(
      `Not on the markdown shelf: /${slug}\nBrowse: /md\n`,
      {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
