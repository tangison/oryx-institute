import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    /** 3840 dropped: nothing on the site renders at 4K, and the audit
        flagged oversized 3840px requests as dead payload. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    qualities: [75, 82],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
