import { NextResponse } from "next/server";
import {
  getToken,
  setDemoConnection,
  syncStoreFromPersistence,
  persistStoreToBackend,
} from "@/lib/store";

export const dynamic = "force-dynamic";

/**
 * Start a simulated Dropbox session (no OAuth). Safe to call again if already in demo mode.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  const existing = getToken(clientId);
  if (existing && !existing.isDemo) {
    return NextResponse.json(
      {
        error:
          "This client is already connected to a real Dropbox account. Disconnect from the accountant dashboard to try the demo.",
      },
      { status: 409 }
    );
  }
  setDemoConnection(clientId);
  await persistStoreToBackend();
  return NextResponse.json({ ok: true, demo: true });
}
