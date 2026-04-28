import { NextRequest, NextResponse } from "next/server";
import { getToken, syncStoreFromPersistence } from "@/lib/store";
import { listFolderFiles } from "@/lib/dropbox";
import { listDemoFolderFilesRecursive } from "@/lib/demo-storage";

export async function GET(request: NextRequest) {
  await syncStoreFromPersistence();
  const searchParams = request.nextUrl.searchParams;
  const clientId = searchParams.get("clientId");
  const folderPathParam = searchParams.get("folderPath");

  if (!clientId) {
    return NextResponse.json(
      { error: "clientId is required" },
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

  const folderPath = folderPathParam ?? connection.folderPath;

  try {
    const fp =
      folderPath === "" ? "" : folderPath.startsWith("/") ? folderPath : `/${folderPath}`;
    const entries = connection.isDemo
      ? listDemoFolderFilesRecursive(fp)
      : await listFolderFiles(connection.accessToken, fp);
    return NextResponse.json({
      entries: entries.map((e) => ({
        name: e.name,
        path_display: e.path_display,
        ".tag": e[".tag"],
      })),
    });
  } catch (e) {
    console.error("Dropbox list_folder error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list folder" },
      { status: 502 }
    );
  }
}
