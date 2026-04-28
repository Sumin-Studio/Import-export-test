import { getAuthUser } from "@/lib/supabase/auth";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { UpdateShowcaseInput } from "@/lib/showcases";

/**
 * GET /api/showcases/[id]
 * Get a single showcase with all iterations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    const { data: showcase, error } = await supabase
      .from("showcases")
      .select(`
        *,
        users!showcases_author_user_id_fkey(name, email),
        showcase_iterations(*)
      `)
      .eq("id", id)
      .single();

    if (error || !showcase) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    const user = Array.isArray(showcase.users) ? showcase.users[0] : showcase.users;
    const iterations = (showcase.showcase_iterations || [])
      .sort((a: { created_at: string }, b: { created_at: string }) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    const transformedShowcase = {
      id: showcase.id,
      title: showcase.title,
      description: showcase.description,
      deployed_url: showcase.deployed_url,
      github_url: showcase.github_url,
      base_prototype_slug: showcase.base_prototype_slug,
      author_user_id: showcase.author_user_id,
      avatar_seed: showcase.avatar_seed,
      created_at: showcase.created_at,
      updated_at: showcase.updated_at,
      author_name: user?.name || null,
      author_email: user?.email || null,
      iterations,
    };

    return NextResponse.json({ showcase: transformedShowcase });
  } catch (error) {
    console.error("Error in GET /api/showcases/[id]:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/showcases/[id]
 * Update a showcase (owner only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const { id } = await params;
    const body: UpdateShowcaseInput = await request.json();
    const supabase = createServerClient();

    // Admin override
    const email = user.email ?? "";
    const adminEmails = new Set(["jon.bell@xero.com"]);
    const isAdmin = adminEmails.has(email.toLowerCase());

    const { data: showcase, error: fetchError } = await supabase
      .from("showcases")
      .select("author_user_id, deployed_url, github_url")
      .eq("id", id)
      .single();

    if (fetchError || !showcase) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    if (!isAdmin && showcase.author_user_id !== userId) {
      return NextResponse.json(
        { error: "You don't have permission to edit this showcase" },
        { status: 403 }
      );
    }

    const updateData: Record<string, string | null> = {
      updated_at: new Date().toISOString(),
    };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.deployed_url !== undefined) updateData.deployed_url = body.deployed_url;
    if (body.github_url !== undefined) updateData.github_url = body.github_url;
    if (body.base_prototype_slug !== undefined) updateData.base_prototype_slug = body.base_prototype_slug;

    const { data: updatedShowcase, error: updateError } = await supabase
      .from("showcases")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating showcase:", updateError);
      return NextResponse.json(
        { error: "Failed to update showcase" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      showcase: updatedShowcase,
    });
  } catch (error) {
    console.error("Error in PATCH /api/showcases/[id]:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/showcases/[id]
 * Delete a showcase (owner only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const { id } = await params;
    const supabase = createServerClient();

    // Admin override
    const email = user.email ?? "";
    const adminEmails = new Set(["jon.bell@xero.com"]);
    const isAdmin = adminEmails.has(email.toLowerCase());

    const { data: showcase, error: fetchError } = await supabase
      .from("showcases")
      .select("author_user_id")
      .eq("id", id)
      .single();

    if (fetchError || !showcase) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    if (!isAdmin && showcase.author_user_id !== userId) {
      return NextResponse.json(
        { error: "You don't have permission to delete this showcase" },
        { status: 403 }
      );
    }

    const { error: deleteError } = await supabase
      .from("showcases")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting showcase:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete showcase" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/showcases/[id]:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
