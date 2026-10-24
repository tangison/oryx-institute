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
    { source: "/announcements", destination: "/news", permanent: true },
    { source: "/compare", destination: "/programmes", permanent: true },
    { source: "/people", destination: "/about", permanent: true },
    { source: "/disclaimer", destination: "/about", permanent: true },
    { source: "/thank-you", destination: "/apply", permanent: true },
  ],
};

const withMDX = createMDX({
  // The news MDX files are prose: no remark/rehype plugins are needed,
  // and none are added — the compile step stays build-time only.
  options: {},
});

export default withMDX(nextConfig);
