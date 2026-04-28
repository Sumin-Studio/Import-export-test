import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";

/**
 * GET /api/auth/login
 *
 * Redirects the user to Vercel's OAuth consent page.
 * Generates a random `state` parameter stored in a short-lived cookie
 * to prevent CSRF attacks on the callback.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.VERCEL_APP_CLIENT_ID;
  if (!clientId) {
    return res.redirect(302, "/?auth_error=not_configured");
  }

  const state = crypto.randomBytes(16).toString("hex");

  // PKCE: generate code_verifier and derive code_challenge
  const codeVerifier = crypto.randomBytes(32).toString("hex");
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  // Capture return-to path from query string (must be a relative path)
  const redirectParam =
    typeof req.query.redirect === "string" && req.query.redirect.startsWith("/")
      ? req.query.redirect
      : "/";

  // Store state, code_verifier, and return-to path in short-lived httpOnly cookies
  res.setHeader("Set-Cookie", [
    `auth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    `auth_code_verifier=${codeVerifier}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    `auth_return_to=${encodeURIComponent(redirectParam)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  ]);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getCallbackUrl(req),
    scope: "openid email profile offline_access",
    response_type: "code",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(302, `https://vercel.com/oauth/authorize?${params.toString()}`);
}

function getCallbackUrl(req: VercelRequest): string {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}/api/auth/callback`;
}
