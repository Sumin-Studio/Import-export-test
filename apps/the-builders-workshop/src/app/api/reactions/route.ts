import { getAuthUser } from "@/lib/supabase/auth";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { ensureUserExists } from "@/lib/supabase/milestones";

/**
 * GET /api/reactions?source_type=prompt&source_id=xxx&reaction_type=heart
 * Returns total count and whether the current user has reacted.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source_type = searchParams.get("source_type");
    const source_id = searchParams.get("source_id");
    const reaction_type = searchParams.get("reaction_type") ?? "heart";

    if (!source_type || !source_id) {
      return NextResponse.json(
        { error: "source_type and source_id are required" },
        { status: 400 }
      );
    }

    const user = await getAuthUser();
    const userId = user?.id ?? null;
    const supabase = createServerClient();

    const { count, error: countError } = await supabase
      .from("reactions")
      .select("*", { count: "exact", head: true })
      .eq("source_type", source_type)
      .eq("source_id", source_id)
      .eq("reaction_type", reaction_type);

    if (countError) {
      console.error("Error fetching reaction count:", countError);
      return NextResponse.json(
        { error: "Failed to fetch reactions" },
        { status: 500 }
      );
    }

    let userReacted = false;

    if (userId) {
      const { data: existing } = await supabase
        .from("reactions")
        .select("id")
        .eq("source_type", source_type)
        .eq("source_id", source_id)
        .eq("reaction_type", reaction_type)
        .eq("user_id", userId)
        .maybeSingle();

      userReacted = !!existing;
    }

    return NextResponse.json({ count: count ?? 0, userReacted });
  } catch (error) {
    console.error("Error in GET /api/reactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reactions
 * Toggle a reaction on/off. Auth required.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const email = user.email ?? "";
    const name = (user.user_metadata?.full_name as string) ?? null;

    const body = await request.json();
    const { source_type, source_id, reaction_type = "heart" } = body;

    if (!source_type || !source_id) {
      return NextResponse.json(
        { error: "source_type and source_id are required" },
        { status: 400 }
      );
    }

    await ensureUserExists(userId, email, name);

    const supabase = createServerClient();

    // Check if reaction already exists
    const { data: existing } = await supabase
      .from("reactions")
      .select("id")
      .eq("source_type", source_type)
      .eq("source_id", source_id)
      .eq("reaction_type", reaction_type)
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      // Toggle off
      await supabase.from("reactions").delete().eq("id", existing.id);
    } else {
      // Toggle on
      await supabase.from("reactions").insert({
        source_type,
        source_id,
        user_id: userId,
        reaction_type,
      });
    }

    // Return the fresh count
    const { count } = await supabase
      .from("reactions")
      .select("*", { count: "exact", head: true })
      .eq("source_type", source_type)
      .eq("source_id", source_id)
      .eq("reaction_type", reaction_type);

    return NextResponse.json({ count: count ?? 0, userReacted: !existing });
  } catch (error) {
    console.error("Error in POST /api/reactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
