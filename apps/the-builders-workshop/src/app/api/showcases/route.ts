import { getAuthUser } from "@/lib/supabase/auth";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { ensureUserExists } from "@/lib/supabase/milestones";
import type { CreateShowcaseInput } from "@/lib/showcases";

/**
 * GET /api/showcases
 * List all showcases with author info and iteration count
 */
export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: showcases, error } = await supabase
      .from("showcases")
      .select(`
        *,
        users!showcases_author_user_id_fkey(name, email),
        showcase_iterations(id)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching showcases:", error);
      return NextResponse.json(
        { error: "Failed to fetch showcases" },
        { status: 500 }
      );
    }

    const transformedShowcases = showcases?.map((showcase) => {
      const user = Array.isArray(showcase.users) ? showcase.users[0] : showcase.users;
      const iterations = showcase.showcase_iterations || [];

      return {
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
        iteration_count: iterations.length,
      };
    }) || [];

    return NextResponse.json({ showcases: transformedShowcases });
  } catch (error) {
    console.error("Error in GET /api/showcases:", error);
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
 * POST /api/showcases
 * Create a new showcase
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

    const body: CreateShowcaseInput & { is_local_only?: boolean } = await request.json();
    const {
      title,
      description,
      deployed_url,
      github_url,
      base_prototype_slug,
      initial_version_summary = "Initial release",
      is_local_only = false
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    if (!is_local_only && !deployed_url && !github_url) {
      return NextResponse.json(
        { error: "At least one URL (deployed or GitHub) is required" },
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

    const supabase = createServerClient();

    const avatarSeed = `${userId}-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const { data: showcase, error: showcaseError } = await supabase
      .from("showcases")
      .insert({
        title,
        description,
        deployed_url: deployed_url || null,
        github_url: github_url || null,
        base_prototype_slug: base_prototype_slug || null,
        author_user_id: userId,
        avatar_seed: avatarSeed,
      })
      .select()
      .single();

    if (showcaseError || !showcase) {
      console.error("Error creating showcase:", showcaseError);
      return NextResponse.json(
        { error: "Failed to create showcase" },
        { status: 500 }
      );
    }

    const { error: iterationError } = await supabase
      .from("showcase_iterations")
      .insert({
        showcase_id: showcase.id,
        version: "1.0",
        summary: initial_version_summary,
      });

    if (iterationError) {
      console.error("Error creating initial iteration:", iterationError);
    }

    return NextResponse.json({
      success: true,
      showcase: {
        ...showcase,
        author_name: name,
        author_email: email,
        iteration_count: 1,
      },
    });
  } catch (error) {
    console.error("Error in POST /api/showcases:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
