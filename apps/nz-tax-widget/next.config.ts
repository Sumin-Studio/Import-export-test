import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  devIndicators: false,

  // Pin Turbopack to this app so a lockfile in $HOME is not used as the workspace root.
  turbopack: {
    root: appDir,
  },

  experimental: {
    optimizePackageImports: [
      "@headlessui/react",
      "highcharts",
      "highcharts-react-official",
    ],
  },

  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
