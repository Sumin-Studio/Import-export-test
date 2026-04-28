import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * GET /api/auth/callback
 *
 * Handles the OAuth callback from Vercel. Exchanges the authorization code
 * for tokens and stores them in httpOnly cookies.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, state, error, error_description } = req.query;
  const clientId = process.env.VERCEL_APP_CLIENT_ID;
  const clientSecret = process.env.VERCEL_APP_CLIENT_SECRET;

  // Log received query params for debugging
  console.log("Callback query params:", { code: !!code, state: !!state, error, error_description });
  console.log("Full URL:", req.url);

  if (!clientId || !clientSecret) {
    return res.redirect(302, "/?auth_error=not_configured");
  }

  // If Vercel OAuth returned an error
  if (error) {
    console.log("OAuth error:", error, error_description);
    return res.redirect(302, `/?auth_error=oauth_${error}`);
  }

  // Validate CSRF state
  const storedState = parseCookie(req.headers.cookie ?? "", "auth_state");
  if (!state || state !== storedState) {
    console.log("State mismatch:", { received: state, stored: storedState });
    return res.redirect(302, "/?auth_error=invalid_state");
  }

  // Retrieve PKCE code_verifier
  const codeVerifier = parseCookie(req.headers.cookie ?? "", "auth_code_verifier");
  if (!codeVerifier) {
    console.log("Missing code_verifier cookie");
    return res.redirect(302, "/?auth_error=missing_verifier");
  }

  if (!code || typeof code !== "string") {
    return res.redirect(302, "/?auth_error=missing_code");
  }

  try {
    const redirectUri = getCallbackUrl(req);

    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const tokenResponse = await fetch(
      "https://api.vercel.com/login/oauth/token",
      {
        method: "POST",
        body,
      },
    );

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.log("Token exchange failed:", tokenResponse.status, errorBody);
      return res.redirect(302, "/?auth_error=token_exchange_failed");
    }

    const tokens = await tokenResponse.json();
    const { access_token, refresh_token, id_token } = tokens;
    console.log("Token exchange result:", { has_access: !!access_token, has_id: !!id_token, has_refresh: !!refresh_token });

    if (!access_token || !id_token) {
      return res.redirect(302, "/?auth_error=missing_tokens");
    }

    const cookies: string[] = [
      // Clear the CSRF state and PKCE cookies
      "auth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      "auth_code_verifier=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      // Store tokens in httpOnly cookies
      `auth_access_token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
      `auth_id_token=${id_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
    ];

    if (refresh_token) {
      cookies.push(
        `auth_refresh_token=${refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
      );
    }

    // Recover the return-to path set during login
    const returnTo = decodeURIComponent(
      parseCookie(req.headers.cookie ?? "", "auth_return_to") || "/",
    );
    // Clear the return-to cookie
    cookies.push("auth_return_to=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");

    res.setHeader("Set-Cookie", cookies);
    // Only allow relative redirects to prevent open-redirect attacks
    const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/";
    res.redirect(302, safeReturnTo);
  } catch (err) {
    console.log("Callback exception:", err instanceof Error ? err.message : err);
    res.redirect(302, "/?auth_error=callback_failed");
  }
}

function getCallbackUrl(req: VercelRequest): string {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}/api/auth/callback`;
}

function parseCookie(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match?.split("=").slice(1).join("=");
}
