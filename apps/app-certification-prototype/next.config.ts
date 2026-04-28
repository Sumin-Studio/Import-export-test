import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** This folder (the app root). Required when multiple package-lock files exist above this directory — otherwise Next may pick the wrong tracing root and the server bundle can fail at runtime. */
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingRoot: appRoot,
  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
};

export default nextConfig;
