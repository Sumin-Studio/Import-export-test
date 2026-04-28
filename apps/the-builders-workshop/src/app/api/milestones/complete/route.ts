import { getAuthUser } from "@/lib/supabase/auth";
import { NextRequest, NextResponse } from "next/server";
import { ensureUserExists, markStepComplete } from "@/lib/supabase/milestones";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Server configuration error - missing Supabase credentials" },
        { status: 500 }
      );
    }

    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized - no user ID" }, { status: 401 });
    }

    const userId = user.id;
    const email = user.email ?? "";
    const name = (user.user_metadata?.full_name as string) ?? null;

    const body = await request.json();
    const { milestoneKey, notes } = body;

    if (!milestoneKey) {
      return NextResponse.json(
        { error: "milestoneKey is required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "No email found in user account" },
        { status: 400 }
      );
    }

    const dbUser = await ensureUserExists(userId, email, name);

    if (!dbUser) {
      return NextResponse.json(
        { error: "Failed to create user record" },
        { status: 500 }
      );
    }

    const result = await markStepComplete(userId, milestoneKey, notes);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to mark complete" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      completedAt: result.completedAt,
    });
  } catch (error) {
    console.error("Error in complete route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
