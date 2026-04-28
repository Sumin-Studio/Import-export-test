import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  serverExternalPackages: ["react-grid-layout"],
  /** Vendored cashflow-actions charts use Highcharts internals not in bundled typings. */
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    devtoolSegmentExplorer: false,
  },
  async redirects() {
    return [
      {
        source: "/purchases-overview/prototype",
        destination: "/purchases-overview/prototype/4?scenario=diya-demo",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
