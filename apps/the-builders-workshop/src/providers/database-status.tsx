"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "@/providers/auth-provider";
import { usePathname } from "next/navigation";
import { FailWhale } from "@/components/fail-whale";
import { checkDatabaseHealth, HealthCheckResult } from "@/lib/supabase/health";

interface DatabaseStatusContextValue {
  isHealthy: boolean;
  isChecking: boolean;
  lastCheck: HealthCheckResult | null;
  recheckHealth: () => Promise<void>;
}

const DatabaseStatusContext = createContext<DatabaseStatusContextValue | null>(
  null
);

const RECHECK_INTERVAL = 30000;

export function DatabaseStatusProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded: isUserLoaded } = useAuth();
  const pathname = usePathname();
  const [isHealthy, setIsHealthy] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<HealthCheckResult | null>(null);
  const [hasInitialCheck, setHasInitialCheck] = useState(false);

  const isPublicRoute =
    pathname === "/landing" ||
    pathname?.startsWith("/sign-in") ||
    pathname === "/unauthorized";
  const shouldCheckHealth = isUserLoaded && isSignedIn && !isPublicRoute;

  const recheckHealth = useCallback(async () => {
    setIsChecking(true);
    try {
      const result = await checkDatabaseHealth();
      setLastCheck(result);
      setIsHealthy(result.healthy);
    } catch {
      setIsHealthy(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldCheckHealth) {
      setHasInitialCheck(true);
      return;
    }
    const doInitialCheck = async () => {
      await recheckHealth();
      setHasInitialCheck(true);
    };
    doInitialCheck();
  }, [shouldCheckHealth, recheckHealth]);

  useEffect(() => {
    if (!shouldCheckHealth || isHealthy) return;
    const interval = setInterval(() => recheckHealth(), RECHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [shouldCheckHealth, isHealthy, recheckHealth]);

  const contextValue: DatabaseStatusContextValue = {
    isHealthy,
    isChecking,
    lastCheck,
    recheckHealth,
  };

  if (shouldCheckHealth && hasInitialCheck && !isHealthy) {
    return (
      <DatabaseStatusContext.Provider value={contextValue}>
        <FailWhale />
      </DatabaseStatusContext.Provider>
    );
  }

  return (
    <DatabaseStatusContext.Provider value={contextValue}>
      {children}
    </DatabaseStatusContext.Provider>
  );
}

export function useDatabaseStatus() {
  const context = useContext(DatabaseStatusContext);
  if (!context) {
    throw new Error(
      "useDatabaseStatus must be used within a DatabaseStatusProvider"
    );
  }
  return context;
}
