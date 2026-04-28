import { getAuthUser } from "@/lib/supabase/auth";
import { NextResponse } from "next/server";
import { ensureUserExists, getUserCompletions } from "@/lib/supabase/milestones";

export async function GET() {
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

    if (!email) {
      return NextResponse.json(
        { error: "No email found in user account" },
        { status: 400 }
      );
    }

    await ensureUserExists(userId, email, name);

    const completions = await getUserCompletions(userId);

    return NextResponse.json({ completions });
  } catch (error) {
    console.error("Error in user route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
