import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Serverless function that reads the Vercel Authentication JWT from the
 * httpOnly `_vercel_jwt` cookie, decodes the payload, and returns user
 * details as JSON.
 *
 * GET /api/user → { email, id, exp } or { error }
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const token = parseCookie(req.headers.cookie ?? "", "_vercel_jwt");

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const payload = decodeJwtPayload(token);

    // Treat an expired token as unauthenticated
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      return res.status(401).json({ error: "Token expired" });
    }

    // Return the full decoded JWT payload as-is
    return res.status(200).json(payload);
  } catch {
    return res.status(500).json({ error: "Failed to decode token" });
  }
}

/** Extract a named value from a cookie header string. */
function parseCookie(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Decode the payload segment of a JWT (no signature verification). */
function decodeJwtPayload(token: string): Record<string, unknown> {
  const base64 = token.split(".")[1];
  if (!base64) throw new Error("Invalid JWT: missing payload segment");

  const padded = base64.replace(/-/g, "+").replace(/_/g, "/");
  const json = Buffer.from(padded, "base64").toString("utf-8");

  return JSON.parse(json) as Record<string, unknown>;
}
