import { NextRequest, NextResponse } from "next/server";
import {
  getToken,
  removeToken,
  removeScanResult,
  syncStoreFromPersistence,
  persistStoreToBackend,
} from "@/lib/store";
import { resetClientStatusOnDisconnect } from "@/lib/engagements";

export const dynamic = "force-dynamic";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  await syncStoreFromPersistence();
  if (!getToken(clientId)) {
    return NextResponse.json(
      { error: "Client is not connected." },
      { status: 400 }
    );
  }

  // Full reset for demo: client is as if they were never connected
  removeToken(clientId);
  removeScanResult(clientId);
  resetClientStatusOnDisconnect(clientId);

  await persistStoreToBackend();
  return NextResponse.json({ ok: true });
}
