import { NextResponse } from "next/server";
import { getAllClientIdsWithTokens, syncStoreFromPersistence } from "@/lib/store";
import { runScanForClient } from "@/lib/scan";

export async function POST() {
  await syncStoreFromPersistence();
  const clientIds = getAllClientIdsWithTokens();
  const results: Record<string, "ok" | "error"> = {};

  for (const clientId of clientIds) {
    try {
      await runScanForClient(clientId, { fullRescan: true });
      results[clientId] = "ok";
    } catch (e) {
      console.error(`Scan failed for client ${clientId}:`, e);
      results[clientId] = "error";
    }
  }

  return NextResponse.json({
    scanned: clientIds.length,
    results,
  });
}
