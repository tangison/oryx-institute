import { getNews, rfc822 } from "@/lib/news";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RSS 2.0, built from the same MDX register the /news index reads.
 *  The feed is the source of truth; social is distribution. */
export async function GET() {
  const news = await getNews();

  const items = news
    .map(
      (n) => `    <item>
      <title>${esc(n.title)}</title>
      <link>${site.url}/announcements/${n.slug}</link>
      <guid isPermaLink="true">${site.url}/announcements/${n.slug}</guid>
      <pubDate>${rfc822(n.date)}</pubDate>
      <description>${esc(n.description)}</description>
      <category>${esc(n.category)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.tradingName)} · News</title>
    <link>${site.url}/news</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
