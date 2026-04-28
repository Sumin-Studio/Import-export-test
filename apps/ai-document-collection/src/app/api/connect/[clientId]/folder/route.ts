import { NextRequest, NextResponse } from "next/server";
import {
  getToken,
  updateFolderPath,
  syncStoreFromPersistence,
  persistStoreToBackend,
} from "@/lib/store";
import { runScanForClient } from "@/lib/scan";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  await syncStoreFromPersistence();
  const connection = getToken(clientId);
  if (!connection) {
    return NextResponse.json(
      { error: "Not connected. Complete Dropbox auth first." },
      { status: 401 }
    );
  }

  let body: { folderPath?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const rawPath = typeof body.folderPath === "string" ? body.folderPath.trim() : "";
  const folderPath = rawPath === "/" ? "" : rawPath;

  updateFolderPath(clientId, folderPath);
  await persistStoreToBackend();
  await runScanForClient(clientId);

  // Path only so the client stays on the current origin (avoids localhost from missing env on Vercel).
  return NextResponse.json({
    ok: true,
    redirect: `/connect/${clientId}/success`,
  });
}
