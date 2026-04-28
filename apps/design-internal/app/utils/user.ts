import type { User } from "~/types/apps";

/**
 * Get the currently authenticated user, or `null` if not logged in.
 *
 * This is the public API for user identity. It calls the `/api/user`
 * serverless endpoint which reads the httpOnly JWT cookie server-side.
 * All auth-provider-specific logic is isolated on the server.
 */
export async function getUser(): Promise<User | null> {
  return getVercelUser();
}

// ---------------------------------------------------------------------------
// Vercel-specific implementation (not exported)
// ---------------------------------------------------------------------------

/**
 * Fetch user details from the `/api/user` serverless function.
 * The server reads the httpOnly `_vercel_jwt` cookie, decodes the JWT,
 * and returns the user payload as JSON.
 */
async function getVercelUser(): Promise<User | null> {
  try {
    const res = await fetch("/api/user", { credentials: "same-origin" });
    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (!data || typeof data !== "object") return null;

    return data as User;
  } catch {
    return null;
  }
}
