import { cookies } from "next/headers";

const COOKIE_NAME = "bw_user";

export interface ServerUser {
  id: string;
  email: string;
  user_metadata?: { full_name?: string };
}

/**
 * Returns the current user from the identity cookie, or null.
 * Server-side equivalent of useAuth().
 */
export async function getAuthUser(): Promise<ServerUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const email = decodeURIComponent(raw).toLowerCase();
  if (!email.includes("@")) return null;

  const local = email.split("@")[0];
  const name = local
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: email,
    email,
    user_metadata: { full_name: name },
  };
}
