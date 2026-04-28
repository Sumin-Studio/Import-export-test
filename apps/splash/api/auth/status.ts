import type { VercelRequest, VercelResponse } from "@vercel/node";
import { jwtVerify, createRemoteJWKSet } from "jose";

const jwks = createRemoteJWKSet(
  new URL("https://vercel.com/.well-known/jwks"),
);

/**
 * GET /api/auth/status
 *
 * Returns the current authentication state.
 * - If the user has a valid ID token: { authenticated: true, user: { name, email } }
 * - If the access token expired but a refresh token is present: refreshes and retries
 * - Otherwise: { authenticated: false }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.VERCEL_APP_CLIENT_ID;
  const clientSecret = process.env.VERCEL_APP_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(200).json({ authenticated: false, error: "not_configured" });
  }

  const cookies = req.headers.cookie ?? "";
  const idToken = parseCookie(cookies, "auth_id_token");
  const refreshToken = parseCookie(cookies, "auth_refresh_token");

  // Try the existing ID token first
  if (idToken) {
    const user = await verifyIdToken(idToken);
    if (user) {
      return res.status(200).json({ authenticated: true, user });
    }
  }

  // Try refreshing if we have a refresh token
  if (refreshToken) {
    const refreshed = await refreshTokens(refreshToken);
    if (refreshed) {
      const user = await verifyIdToken(refreshed.id_token);
      if (user) {
        const newCookies: string[] = [
          `auth_access_token=${refreshed.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
          `auth_id_token=${refreshed.id_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
        ];
        if (refreshed.refresh_token) {
          newCookies.push(
            `auth_refresh_token=${refreshed.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
          );
        }
        res.setHeader("Set-Cookie", newCookies);
        return res.status(200).json({ authenticated: true, user });
      }
    }
  }

  return res.status(200).json({ authenticated: false });
}

async function verifyIdToken(
  token: string,
): Promise<{ name: string; email: string } | null> {
  try {
    const clientId = process.env.VERCEL_APP_CLIENT_ID;
    const { payload } = await jwtVerify(token, jwks, {
      issuer: "https://vercel.com",
      audience: clientId ? [clientId] : undefined,
    });
    return {
      name: (payload.name as string) ?? "",
      email: (payload.email as string) ?? "",
    };
  } catch {
    return null;
  }
}

async function refreshTokens(refreshToken: string) {
  const clientId = process.env.VERCEL_APP_CLIENT_ID;
  const clientSecret = process.env.VERCEL_APP_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const response = await fetch("https://api.vercel.com/login/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function parseCookie(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match?.split("=").slice(1).join("=");
}
