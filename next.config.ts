import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Oryx Institute · rebuild-hbr (Kinfolk / HBR register).
 *
 * - MDX compiles the /news feed (content/news/*.mdx); nothing else.
 * - Images: AVIF + WebP variants at quality 62, 75 or 80, chosen per visual role.
 * - Redirects keep every URL printed since the first site stable:
 *   /announcements moved into /news, /compare folded into /programmes,
 *   /people and the imagery disclaimer folded into /about, and the old
 *   form thank-you folded into /apply (the enquiry composer is mailto now).
 */

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    qualities: [62, 75, 80],
  },
  /* The proxy also marks previews noindex. Keep this host-level rule as
     a response-header backstop when a dynamic server component consumes
     request headers, which can otherwise prevent the proxy header from
     reaching the final response. */
  headers: () => [
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value:
            "^(?!(?:oryxinstitute\\.org|www\\.oryxinstitute\\.org|localhost(?::\\d+)?)$).+",
        },
      ],
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
  ],
  redirects: () => [
    /* Afrikaans is live at /af. Legacy /zh links move permanently
       to their equivalent English URLs. */
    { source: "/zh", destination: "/", permanent: true },
    { source: "/zh/:path*", destination: "/:path*", permanent: true },
    /* Retired sections land only where their public work remains.
       The discontinued resource library itself is handled as 410 Gone
       in the edge proxy. */
    { source: "/programmes", destination: "/practice", permanent: true },
    { source: "/compare", destination: "/practice", permanent: true },
    { source: "/schools", destination: "/practice", permanent: true },
    { source: "/news", destination: "/status", permanent: true },
    { source: "/announcements", destination: "/status", permanent: true },
    { source: "/tools", destination: "/research", permanent: true },
    { source: "/af/news", destination: "/af/status", permanent: true },
    { source: "/af/announcements", destination: "/af/status", permanent: true },
    { source: "/af/tools", destination: "/af/research", permanent: true },
    { source: "/people", destination: "/about", permanent: true },
    { source: "/disclaimer", destination: "/about", permanent: true },
    { source: "/thank-you", destination: "/apply", permanent: true },
    /* Corner Spa entry points: permanent (308), mirrored under /af/.
       The trailing-slash variant keeps the embed address canonical. */
    { source: "/spa", destination: "/corner-spa", permanent: true },
    { source: "/cornerspa", destination: "/corner-spa", permanent: true },
    { source: "/corner-spa/", destination: "/corner-spa", permanent: true },
    { source: "/af/spa", destination: "/af/corner-spa", permanent: true },
    { source: "/af/cornerspa", destination: "/af/corner-spa", permanent: true },
    { source: "/af/corner-spa/", destination: "/af/corner-spa", permanent: true },
    /* Retained published essays now live with Research Notes. */
    { source: "/bulletin", destination: "/research#notes", permanent: true },
    { source: "/af/bulletin", destination: "/af/research#notes", permanent: true },
    /* Legal pages live under /legal; the launch URLs still resolve. */
    { source: "/privacy", destination: "/legal/privacy", permanent: true },
    { source: "/terms", destination: "/legal/terms", permanent: true },
    { source: "/af/privacy", destination: "/af/legal/privacy", permanent: true },
    { source: "/af/terms", destination: "/af/legal/terms", permanent: true },
  ],
};

const withMDX = createMDX({
  // The news MDX files are prose: no remark/rehype plugins are needed,
  // and none are added — the compile step stays build-time only.
  options: {},
});

export default withMDX(nextConfig);
