import { NextRequest, NextResponse } from "next/server";
import { getToken, syncStoreFromPersistence } from "@/lib/store";
import { listFolder } from "@/lib/dropbox";
import { listDemoSubfolders } from "@/lib/demo-storage";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path") ?? "";

  const connection = getToken(clientId);
  if (!connection) {
    return NextResponse.json(
      { error: "Not connected. Complete Dropbox auth first." },
      { status: 401 }
    );
  }

  const normalizedPath =
    path === "" ? "" : path.startsWith("/") ? path : `/${path}`;

  try {
    if (connection.isDemo) {
      const demoPath =
        normalizedPath === "" ? "" : normalizedPath.replace(/\/$/, "") || "";
      const folders = listDemoSubfolders(demoPath);
      return NextResponse.json({
        path: normalizedPath,
        folders,
        demoMode: true,
      });
    }

    const { entries } = await listFolder(connection.accessToken, normalizedPath);
    const folders = entries.filter((e) => e[".tag"] === "folder");
    return NextResponse.json({
      path: normalizedPath,
      folders: folders.map((f) => ({
        name: f.name,
        path_display: f.path_display,
      })),
    });
  } catch (e) {
    console.error("List folders error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list folders" },
      { status: 502 }
    );
  }
}
