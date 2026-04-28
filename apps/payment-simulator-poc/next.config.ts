import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@xero/xui", "@xero/xui-icon"],
  // Monorepo: parent lockfiles can confuse tracing; anchor to this app when built from here
  outputFileTracingRoot: path.resolve(process.cwd()),
  /** XUI SCSS uses `@import`; Next’s sass-loader still uses the legacy JS API — silence dev overlay noise. */
  sassOptions: {
    silenceDeprecations: ["import", "legacy-js-api"],
    quietDeps: true,
  },
  /** sass-loader still emits legacy-API + @import deprecations into the client overlay; filter them here. */
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      /Deprecation.*legacy JS API is deprecated/,
      /Deprecation Warning.*@import rules are deprecated/,
      /Sass @import rules are deprecated/,
    ];
    return config;
  },
};

export default nextConfig;
