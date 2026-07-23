import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // On Vercel, output mode is handled automatically. "standalone" is kept
  // for self-hosting scenarios (e.g. preview deploys on a VPS) and is a
  // no-op on Vercel.
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // WebP and AVIF are served pre-optimized from /public/images; no remote
    // domains are used. This keeps the build self-contained.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
