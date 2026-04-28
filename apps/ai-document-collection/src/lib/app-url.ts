import type { NextRequest } from "next/server";
import { headers } from "next/headers";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/**
 * Public origin (scheme + host, no path) for OAuth redirect URIs and absolute redirects.
 * Prefer APP_URL / NEXT_PUBLIC_APP_URL; on Vercel use VERCEL_URL; else infer from the request.
 */
export function getAppOriginFromRequest(request: NextRequest): string {
  const fromEnv =
    process.env.APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    (process.env.VERCEL_URL?.trim()
      ? `https://${process.env.VERCEL_URL.trim()}`
      : "");

  if (fromEnv) return trimTrailingSlash(fromEnv);

  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host")?.trim();
  if (host) {
    let proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    if (!proto || (proto !== "http" && proto !== "https")) {
      proto =
        host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https";
    }
    return trimTrailingSlash(`${proto}://${host}`);
  }

  return "http://localhost:3002";
}

/** Same resolution for Server Components (no Request object). */
export async function getAppOriginFromHeaders(): Promise<string> {
  const fromEnv =
    process.env.APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    (process.env.VERCEL_URL?.trim()
      ? `https://${process.env.VERCEL_URL.trim()}`
      : "");

  if (fromEnv) return trimTrailingSlash(fromEnv);

  const h = await headers();
  const host =
    h.get("x-forwarded-host")?.split(",")[0]?.trim() || h.get("host")?.trim();
  if (host) {
    let proto = h.get("x-forwarded-proto")?.split(",")[0]?.trim();
    if (!proto || (proto !== "http" && proto !== "https")) {
      proto =
        host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https";
    }
    return trimTrailingSlash(`${proto}://${host}`);
  }

  return "http://localhost:3002";
}
