import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Oryx Institute · rebuild-hbr (Kinfolk / HBR register).
 *
 * - MDX compiles the /news feed (content/news/*.mdx); nothing else.
 * - Images: AVIF + WebP variants, quality 75 (the design budget).
 * - Redirects keep every URL printed since the first site stable:
 *   /announcements moved into /news, /compare folded into /programmes,
 *   /people and the imagery disclaimer folded into /about, and the old
 *   form thank-you folded into /apply (the composer is mailto now).
 */

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    qualities: [75],
  },
  redirects: () => [
    /* Afrikaans retired: the second language is Chinese now. Every
       old /af link lands on its /zh equivalent. */
    { source: "/af", destination: "/zh", permanent: true },
    { source: "/af/:path*", destination: "/zh/:path*", permanent: true },
    /* Retired sections land on the page that now carries the work:
       the teaching offer lives on /practice, announcements live in
       the register, the free library lives in the Directory. */
    { source: "/programmes", destination: "/practice", permanent: true },
    { source: "/compare", destination: "/practice", permanent: true },
    { source: "/schools", destination: "/practice", permanent: true },
    { source: "/news", destination: "/register", permanent: true },
    { source: "/announcements", destination: "/register", permanent: true },
    { source: "/tools", destination: "/resources", permanent: true },
    { source: "/people", destination: "/about", permanent: true },
    { source: "/disclaimer", destination: "/about", permanent: true },
    { source: "/thank-you", destination: "/apply", permanent: true },
    /* The Bulletin's clean URL lands on its home in Resources. */
    { source: "/bulletin", destination: "/resources#bulletin", permanent: true },
    { source: "/zh/bulletin", destination: "/zh/resources#bulletin", permanent: true },
    /* Legal pages live under /legal; the launch URLs still resolve. */
    { source: "/privacy", destination: "/legal/privacy", permanent: true },
    { source: "/terms", destination: "/legal/terms", permanent: true },
    { source: "/zh/privacy", destination: "/zh/legal/privacy", permanent: true },
    { source: "/zh/terms", destination: "/zh/legal/terms", permanent: true },
  ],
};

const withMDX = createMDX({
  // The news MDX files are prose: no remark/rehype plugins are needed,
  // and none are added — the compile step stays build-time only.
  options: {},
});

export default withMDX(nextConfig);
