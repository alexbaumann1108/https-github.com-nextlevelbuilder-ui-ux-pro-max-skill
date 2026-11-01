import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Old page addresses from earlier versions of the site.
  async redirects() {
    return [
      { source: "/charters", destination: "/fishery", permanent: true },
      { source: "/about", destination: "/captain", permanent: true },
      { source: "/contact", destination: "/book", permanent: true },
      { source: "/fleet", destination: "/boat", permanent: true },
      { source: "/fleet/:slug", destination: "/boat", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    // This app lives in a subfolder of a repo that has its own lockfile.
    root: path.resolve(process.cwd()),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
