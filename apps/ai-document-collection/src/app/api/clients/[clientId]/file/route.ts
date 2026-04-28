import { NextRequest, NextResponse } from "next/server";
import { getToken, syncStoreFromPersistence } from "@/lib/store";
import { downloadFile } from "@/lib/dropbox";
import { getDemoFileResponse } from "@/lib/demo-storage";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "path query parameter is required" },
      { status: 400 }
    );
  }

  const connection = getToken(clientId);
  if (!connection) {
    return NextResponse.json(
      { error: "Not connected. Connect Dropbox first." },
      { status: 401 }
    );
  }

  try {
    if (connection.isDemo) {
      const demo = getDemoFileResponse(path);
      if (!demo) {
        return NextResponse.json({ error: "Unknown demo file path" }, { status: 404 });
      }
      return new NextResponse(new Uint8Array(demo.body), {
        headers: {
          "Content-Type": demo.contentType,
          "Content-Disposition": "inline",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    const { body, contentType } = await downloadFile(connection.accessToken, path);
    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    console.error("File proxy error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to load file" },
      { status: 502 }
    );
  }
}
