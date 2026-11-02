import { resolveSlug, shelfSlugs } from "@/lib/md-shelf";

/**
 * /md/{slug} — one page or document as clean markdown. The route is a
 * catch-all so nested paths (/md/about/staff, /md/practice/
 * safety-officer-course) resolve exactly as the alternates link
 * prints them.
 *
 * generateStaticParams covers the whole shelf (the index alias, every
 * site page and every Directory document), so the route is fully
 * static and a request never pays a cold render. Anything outside the
 * shelf answers 404 as plain text: no HTML error page, no redirect.
 */

export const dynamic = "force-static";

export function generateStaticParams(): { slug: string[] }[] {
  return shelfSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export const dynamicParams = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Response> {
  const { slug } = await params;
  const path = slug.join("/");
  const body = resolveSlug(path);
  if (!body) {
    return new Response(
      `Not on the markdown shelf: /${path}\nBrowse: /md\n`,
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
