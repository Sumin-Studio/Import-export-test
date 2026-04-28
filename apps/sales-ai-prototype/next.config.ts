import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /** Monorepo: set tracing root when Next is started from outside this app directory. */
  ...(process.cwd() !== path.join(__dirname)
    ? { outputFileTracingRoot: path.join(__dirname) }
    : {}),
  serverExternalPackages: ["react-grid-layout"],
  images: {
    dangerouslyAllowSVG: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /**
   * Dev stability: disable webpack persistent cache (belt). Default `npm run dev` also runs
   * `clean` first (suspenders) so `.next` never mixes webpack + Turbopack artifacts — that mix
   * is the usual cause of 500s, missing `/_next/static/chunks/*.js`, and pages with no CSS.
   *
   * Symptom: Xero shell markup (skip links, nav) but default browser fonts / no layout — often
   * failed or missing `/_next/static/css/*.css` requests from a bad dev cache. Fix: stop the
   * server, run `npm run dev:clean` or `npm run dev` / `npm run dev:fast` (both clean first).
   * Avoid `dev:skip-clean` / bare `next dev` after switching webpack ↔ Turbopack. Figma MCP
   * capture script is opt-in via `NEXT_PUBLIC_ENABLE_FIGMA_MCP_CAPTURE=true` (see `.env.example`).
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/accounting/bank-rules/import",
        destination: "/accounting/bank-rules?import=1",
        permanent: false,
      },
      {
        source: "/sales/new-invoice/enable-pay-by-bank",
        destination: "/enable-pay-by-bank",
        permanent: false,
      },
      { source: "/sales/new-invoice-v2", destination: "/sales/new-invoice", permanent: true },
      // Prototype widgets link here; no standalone page yet — send users to real routes.
      { source: "/accounts", destination: "/accounting/bank-reconciliation", permanent: false },
      { source: "/accounts/:path*", destination: "/accounting/bank-reconciliation", permanent: false },
      { source: "/purchases/expenses", destination: "/", permanent: false },
      {
        source: "/settings/online-payments",
        has: [{ type: "query", key: "tab", value: "connected" }],
        destination: "/settings/online-payments/connected-services",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
