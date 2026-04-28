import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthState = "loading" | "logged-out" | "logged-in" | "error";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  state: AuthState;
  user: AuthUser | null;
  errorReason: string | null;
}

const AuthContext = createContext<AuthContextValue>({
  state: "loading",
  user: null,
  errorReason: null,
});

/* ------------------------------------------------------------------ */
/*  Root component                                                     */
/* ------------------------------------------------------------------ */

interface AuthGateProps {
  loginText?: string;
  children: ReactNode;
}

function AuthGateRoot({ loginText = "Log in", children }: AuthGateProps) {
  const [state, setState] = useState<AuthState>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [errorReason, setErrorReason] = useState<string | null>(null);

  useEffect(() => {
    // Check for auth errors from callback redirect
    const params = new URLSearchParams(window.location.search);
    const authError = params.get("auth_error");
    if (authError) {
      setErrorReason(authError);
      setState("error");
      // Clean up query string
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    fetch("/api/auth/status")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
          setState("logged-in");
        } else if (data.error) {
          setErrorReason(data.error);
          setState("error");
        } else {
          setState("logged-out");
        }
      })
      .catch(() => {
        setErrorReason("network");
        setState("error");
      });
  }, []);

  if (state === "loading") {
    return null;
  }

  if (state === "logged-out") {
    const loginHref =
      window.location.pathname !== "/"
        ? `/api/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`
        : "/api/auth/login";

    return (
      <AuthContext.Provider value={{ state, user, errorReason }}>
        {children}
        <a href={loginHref} className="open-button">
          {loginText}
        </a>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ state, user, errorReason }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LoggedIn({ children }: { children: ReactNode }) {
  const { state } = useContext(AuthContext);
  if (state !== "logged-in") return null;
  return <>{children}</>;
}

function LogIn({ children }: { children: ReactNode }) {
  const { state } = useContext(AuthContext);
  if (state !== "logged-out") return null;
  return <>{children}</>;
}

function Error({ children }: { children: ReactNode }) {
  const { state } = useContext(AuthContext);
  if (state !== "error") return null;
  return <>{children}</>;
}

/* ------------------------------------------------------------------ */
/*  Compound export                                                    */
/* ------------------------------------------------------------------ */

export const AuthGate = Object.assign(AuthGateRoot, {
  LoggedIn,
  LogIn,
  Error,
});

export { AuthContext };
