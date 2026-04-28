import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /**
   * Standalone app root for tracing when this folder is deployed/built on its own.
   * Do not add webpack `resolve.alias` for `react` here: it can split Next’s server vs
   * client React and cause “Invalid hook call” / `useState` on null in `RegionProvider`.
   */
  outputFileTracingRoot: path.join(__dirname),

  eslint: {
    ignoreDuringBuilds: true,
  },

  /** Ensures a single compatible bundle for Highcharts + React wrapper (avoids client chunk `.call` failures). */
  transpilePackages: ["highcharts", "highcharts-react-official"],

  devIndicators: false,

  experimental: {
    devtoolSegmentExplorer: false,
    // Highcharts is sensitive to barrel rewrites; keep only Headless UI here.
    optimizePackageImports: ["@headlessui/react"],
  },

  // Exclude react-grid-layout from server-side bundling to prevent localStorage access
  serverExternalPackages: ["react-grid-layout"],

  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  compress: true,

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|css|js|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
