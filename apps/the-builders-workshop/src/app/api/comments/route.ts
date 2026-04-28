import { getAuthUser } from "@/lib/supabase/auth";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { ensureUserExists } from "@/lib/supabase/milestones";

/**
 * GET /api/comments?source_type=prompt&source_id=xxx
 * List all comments for a given source, newest first
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source_type = searchParams.get("source_type");
    const source_id = searchParams.get("source_id");

    if (!source_type || !source_id) {
      return NextResponse.json(
        { error: "source_type and source_id are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("source_type", source_type)
      .eq("source_id", source_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    return NextResponse.json({ comments: comments ?? [] });
  } catch (error) {
    console.error("Error in GET /api/comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/comments
 * Create a new comment. Auth required.
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
    const { source_type, source_id, content } = body;

    if (!source_type || !source_id || !content?.trim()) {
      return NextResponse.json(
        { error: "source_type, source_id, and content are required" },
        { status: 400 }
      );
    }

    await ensureUserExists(userId, email, name);

    const supabase = createServerClient();

    const { data: comment, error } = await supabase
      .from("comments")
      .insert({
        source_type,
        source_id,
        user_id: userId,
        user_name: name,
        content: content.trim(),
      })
      .select()
      .single();

    if (error || !comment) {
      console.error("Error creating comment:", error);
      return NextResponse.json(
        { error: "Failed to create comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
