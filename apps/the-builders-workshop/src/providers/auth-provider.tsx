"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const COOKIE_NAME = "bw_user";

export interface AppUser {
  id: string;
  email: string;
  user_metadata?: { full_name?: string };
}

interface AuthContextValue {
  user: AppUser | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: (email: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function emailToUser(email: string): AppUser {
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = getCookie(COOKIE_NAME);
    if (stored) {
      setUser(emailToUser(stored));
    }
    setIsLoaded(true);
  }, []);

  const signIn = useCallback((email: string) => {
    setCookie(COOKIE_NAME, email.toLowerCase(), 365);
    setUser(emailToUser(email.toLowerCase()));
  }, []);

  const signOut = useCallback(async () => {
    deleteCookie(COOKIE_NAME);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        isSignedIn: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Client-side auth hook. Returns user identity from cookie.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
