import { getNews } from "@/lib/news";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** JSON Feed 1.1, the machine-readable twin of /feed.xml. */
export async function GET() {
  const news = await getNews();

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: `${site.tradingName} — News`,
    home_page_url: `${site.url}/news`,
    feed_url: `${site.url}/feed.json`,
    language: "en",
    description: site.description,
    items: news.map((n) => ({
      id: `${site.url}/announcements/${n.slug}`,
      url: `${site.url}/announcements/${n.slug}`,
      title: n.title,
      content_text: n.standfirst ?? n.description,
      summary: n.description,
      date_published: `${n.date}T00:00:00Z`,
      tags: [n.category],
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
