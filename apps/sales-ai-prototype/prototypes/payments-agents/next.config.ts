import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  experimental: {
    optimizePackageImports: [
      "@headlessui/react",
      "highcharts",
      "highcharts-react-official",
    ],
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
