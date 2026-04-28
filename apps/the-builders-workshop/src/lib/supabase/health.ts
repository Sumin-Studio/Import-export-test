/**
 * Database health check utility
 * Calls server-side API route for reliable connectivity checks
 */

export interface HealthCheckResult {
  healthy: boolean;
  error?: string;
  timestamp: number;
}

/**
 * Check if Supabase is reachable and responding
 * Uses server-side API route for reliable connectivity
 */
export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch("/api/health", {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Try to parse error response
      let errorData: HealthCheckResult;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          healthy: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          timestamp: Date.now(),
        };
      }
      return errorData;
    }

    const result: HealthCheckResult = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        healthy: false,
        error: "Database connection timed out",
        timestamp: Date.now(),
      };
    }

    return {
      healthy: false,
      error: error instanceof Error ? error.message : "Unable to reach database",
      timestamp: Date.now(),
    };
  }
}
