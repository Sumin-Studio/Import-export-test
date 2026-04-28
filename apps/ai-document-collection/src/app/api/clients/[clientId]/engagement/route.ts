import { NextResponse } from "next/server";
import {
  getToken,
  getEngagementStore,
  getChaseStore,
  syncStoreFromPersistence,
} from "@/lib/store";
import { ANNUAL_TAX_TEMPLATES } from "@/lib/engagement-templates";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  const connection = getToken(clientId);
  if (!connection) {
    return NextResponse.json(
      { engagement: null, expectedItems: [], templates: [], chasePlanStatus: null },
      { status: 200 }
    );
  }
  const store = getEngagementStore();
  const engagement = store.engagements.find(
    (e) => e.clientId === clientId && e.type === "ANNUAL_TAX"
  );
  if (!engagement) {
    return NextResponse.json(
      { engagement: null, expectedItems: [], templates: [], chasePlanStatus: null },
      { status: 200 }
    );
  }
  const expectedItems = store.expectedItems.filter(
    (ei) => ei.clientId === clientId && ei.engagementId === engagement.id
  );
  const chaseStore = getChaseStore();
  const chasePlan = chaseStore.chasePlans.find(
    (p) => p.clientId === clientId && p.engagementId === engagement.id
  );
  const chasePlanStatus = chasePlan?.status ?? "NONE";
  const engagementOut =
    connection?.isDemo && engagement.readinessStatus === "READY"
      ? { ...engagement, readinessStatus: "WAITING_ON_CLIENT" as const }
      : engagement;
  return NextResponse.json({
    engagement: engagementOut,
    expectedItems,
    templates: ANNUAL_TAX_TEMPLATES,
    chasePlanStatus,
  });
}
