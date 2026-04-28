import { getAuthUser } from "@/lib/supabase/auth";
import { NextResponse } from "next/server";
import { getAllUsersCompletions, getAllMilestones } from "@/lib/supabase/milestones";

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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseCompletions = await getAllUsersCompletions();
    const gettingStartedMilestones = await getAllMilestones();

    const allUsersData: Array<{
      id: string;
      name: string;
      email: string;
      type: "supabase" | "builder";
      completions: Array<{
        milestoneKey: string;
        milestoneTitle: string;
        completedAt: string;
        type: "getting-started" | "builder";
      }>;
    }> = [];

    const milestoneOrder: Record<string, { order: number; title: string }> = {
      "request-admin-access": { order: 1, title: "Request Admin Access" },
      "install-cursor": { order: 2, title: "Request Cursor" },
      "receiving-admin-access": { order: 3, title: "Receive Admin Access" },
      "receiving-cursor-access": { order: 4, title: "Receive Cursor" },
      "setup-code-folder": { order: 5, title: "Set Up Your Code Folder" },
      "first-cursor-query": { order: 6, title: "Put Your First Query Into Cursor" },
      "create-first-html-file": { order: 7, title: "Create your first HTML file" },
      "create-first-web-app": { order: 8, title: "Create your first web app" },
      "connect-figma-mcp": { order: 9, title: "Connect Figma MCP" },
      "connect-glean-mcp": { order: 10, title: "Connect Glean MCP" },
      "github-request-access": { order: 11, title: "Request GitHub Access via Okta" },
      "github-setup-account": { order: 12, title: "Set Up Your GitHub Account" },
      "github-install-git": { order: 13, title: "Install Git" },
      "github-create-repository": { order: 14, title: "Create Your First Repository" },
      "request-cursor-access": { order: 2, title: "Request Cursor" },
    };

    supabaseCompletions.forEach(({ user, completions }) => {
      const filteredCompletions = completions
        .filter((c) => {
          const orderInfo = milestoneOrder[c.milestoneKey];
          return orderInfo && orderInfo.order <= 15 && c.milestoneKey !== "stay-tuned";
        })
        .map((c) => {
          const orderInfo = milestoneOrder[c.milestoneKey] || { order: 999, title: c.milestoneTitle };
          return {
            ...c,
            milestoneTitle: orderInfo.title,
            type: "getting-started" as const,
          };
        });

      if (filteredCompletions.length > 0) {
        allUsersData.push({
          id: user.id,
          name: user.name || user.email,
          email: user.email,
          type: "supabase",
          completions: filteredCompletions,
        });
      }
    });

    const allCompletionsForChangelog = allUsersData
      .flatMap((user) =>
        user.completions.map((completion) => ({
          userName: user.name,
          userEmail: user.email,
          milestoneKey: completion.milestoneKey,
          milestoneTitle: completion.milestoneTitle,
          completedAt: completion.completedAt,
          type: completion.type,
        }))
      )
      .filter((entry) => {
        const orderInfo = milestoneOrder[entry.milestoneKey];
        return orderInfo && orderInfo.order <= 15 && entry.milestoneKey !== "stay-tuned";
      })
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

    const allMilestoneKeys = gettingStartedMilestones
      .map((m) => {
        const orderInfo = milestoneOrder[m.key] || { order: 999, title: m.title || m.key };
        return {
          key: m.key,
          title: orderInfo.title,
          type: "getting-started" as const,
          displayOrder: orderInfo.order,
        };
      })
      .filter((m) => {
        return m.displayOrder <= 13 && m.key !== "stay-tuned";
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);

    return NextResponse.json({
      users: allUsersData.map(({ id, name, email, type }) => ({
        id,
        name,
        email,
        type,
      })),
      milestones: allMilestoneKeys,
      completions: allUsersData,
      changelog: allCompletionsForChangelog,
    });
  } catch (error) {
    console.error("Error in all route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
