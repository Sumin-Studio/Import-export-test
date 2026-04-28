import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * GET /api/auth/logout
 *
 * Clears all auth cookies and redirects to the home page.
 */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Set-Cookie", [
    "auth_access_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    "auth_id_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    "auth_refresh_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    "auth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    "auth_code_verifier=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
  ]);
  res.redirect(302, "/");
}
