import { getAuthUser } from "@/lib/supabase/auth";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { CreateIterationInput } from "@/lib/showcases";

/**
 * POST /api/showcases/[id]/iterations
 * Add a new iteration to a showcase (owner only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const { id: showcaseId } = await params;
    const body: CreateIterationInput = await request.json();
    const { version, summary, deployed_url, github_url } = body;

    if (!version || !summary) {
      return NextResponse.json(
        { error: "Version and summary are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data: showcase, error: fetchError } = await supabase
      .from("showcases")
      .select("author_user_id")
      .eq("id", showcaseId)
      .single();

    if (fetchError || !showcase) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    if (showcase.author_user_id !== userId) {
      return NextResponse.json(
        { error: "You don't have permission to add iterations to this showcase" },
        { status: 403 }
      );
    }

    const { data: iteration, error: iterationError } = await supabase
      .from("showcase_iterations")
      .insert({
        showcase_id: showcaseId,
        version,
        summary,
        deployed_url: deployed_url || null,
        github_url: github_url || null,
      })
      .select()
      .single();

    if (iterationError) {
      console.error("Error creating iteration:", iterationError);

      if (iterationError.code === '23505') {
        return NextResponse.json(
          { error: `Version ${version} already exists for this showcase` },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create iteration" },
        { status: 500 }
      );
    }

    await supabase
      .from("showcases")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", showcaseId);

    return NextResponse.json({
      success: true,
      iteration,
    });
  } catch (error) {
    console.error("Error in POST /api/showcases/[id]/iterations:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
