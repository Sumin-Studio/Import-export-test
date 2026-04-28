import { NextRequest, NextResponse } from "next/server";
import { getToken, getScanResult, syncStoreFromPersistence } from "@/lib/store";
import { runScanForClient } from "@/lib/scan";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  const result = getScanResult(clientId);
  if (!result) {
    return NextResponse.json({ log: [], files: [], scannedAt: null }, { status: 200 });
  }
  return NextResponse.json(result);
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  await syncStoreFromPersistence();
  if (!getToken(clientId)) {
    return NextResponse.json(
      { error: "Not connected. Connect Dropbox first." },
      { status: 401 }
    );
  }

  try {
    const result = await runScanForClient(clientId, { fullRescan: true });
    if (!result) {
      return NextResponse.json(
        { error: "Not connected. Connect Dropbox first." },
        { status: 401 }
      );
    }
    return NextResponse.json(result);
  } catch (e) {
    console.error("Scan error:", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Scan failed",
        log: [],
        files: [],
      },
      { status: 502 }
    );
  }
}
