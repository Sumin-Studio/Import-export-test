import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { HealthCheckResult } from "@/lib/supabase/health";

/**
 * Server-side health check endpoint
 * Uses server-side Supabase client for reliable connectivity
 */
export async function GET() {
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json<HealthCheckResult>(
      {
        healthy: false,
        error: "Database configuration missing",
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }

  try {
    const supabase = createServerClient();

    // Perform a simple query to verify connectivity
    // Query the users table with a limit to keep it fast
    let { error, data } = await supabase
      .from("users")
      .select("id")
      .limit(1);

    // If we get a schema cache error, retry once after a short delay
    // Schema cache errors are transient Supabase issues that often resolve quickly
    if (error && (error.message?.includes("schema cache") || error.code === "PGRST002")) {
      console.log("Schema cache error detected, retrying after delay...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      const retryResult = await supabase
        .from("users")
        .select("id")
        .limit(1);
      error = retryResult.error;
      data = retryResult.data;
    }

    if (error) {
      // Log the full error for debugging
      console.error("Health check Supabase error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      // All errors after retry indicate real problems
      // We only return healthy if we successfully get data back
      return NextResponse.json<HealthCheckResult>(
        {
          healthy: false,
          error: error.message || `Database error: ${error.code || "Unknown"}`,
          timestamp: Date.now(),
        },
        { status: 503 }
      );
    }

    // Success - database is reachable and responding
    return NextResponse.json<HealthCheckResult>({
      healthy: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Health check error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json<HealthCheckResult>(
      {
        healthy: false,
        error: `Unable to reach database: ${errorMessage}`,
        timestamp: Date.now(),
      },
      { status: 503 }
    );
  }
}

