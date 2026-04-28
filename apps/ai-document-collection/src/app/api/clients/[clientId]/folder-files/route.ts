import { NextRequest, NextResponse } from "next/server";
import { getToken, syncStoreFromPersistence } from "@/lib/store";
import { listFolderFiles } from "@/lib/dropbox";
import { listDemoFolderFilesRecursive } from "@/lib/demo-storage";

/**
 * GET: Return current file paths in the client's connected Dropbox folder.
 * Used to detect new or removed files without running a full scan.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  const connection = getToken(clientId);

  if (!connection) {
    return NextResponse.json({ error: "Not connected", paths: [], count: 0 }, { status: 401 });
  }

  const folderPath =
    connection.folderPath === ""
      ? ""
      : connection.folderPath.startsWith("/")
        ? connection.folderPath
        : `/${connection.folderPath}`;

  try {
    const entries = connection.isDemo
      ? listDemoFolderFilesRecursive(folderPath)
      : await listFolderFiles(connection.accessToken, folderPath);
    const paths = entries.map((e) => e.path_display);
    return NextResponse.json({ paths, count: paths.length });
  } catch (e) {
    console.error("Folder list error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list folder", paths: [], count: 0 },
      { status: 502 }
    );
  }
}
