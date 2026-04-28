import { NextRequest, NextResponse } from "next/server";
import {
  getEngagementStore,
  getChaseStore,
  saveChaseStore,
  syncStoreFromPersistence,
  persistStoreToBackend,
} from "@/lib/store";
import { ANNUAL_TAX_TEMPLATES } from "@/lib/engagement-templates";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
  await syncStoreFromPersistence();
  let body: { engagementId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
  const engagementId = body.engagementId;
  if (!engagementId) {
    return NextResponse.json(
      { error: "engagementId is required" },
      { status: 400 }
    );
  }

  const store = getEngagementStore();
  const engagement = store.engagements.find(
    (e) => e.clientId === clientId && e.id === engagementId
  );
  if (!engagement) {
    return NextResponse.json(
      { error: "Engagement not found" },
      { status: 404 }
    );
  }

  const missingItems = store.expectedItems.filter(
    (ei) =>
      ei.clientId === clientId &&
      ei.engagementId === engagementId &&
      ei.status === "NOT_RECEIVED"
  );
  if (missingItems.length === 0) {
    return NextResponse.json(
      { error: "No missing items for this engagement. All required documents have been received or waived." },
      { status: 400 }
    );
  }

  const templateMap = new Map(ANNUAL_TAX_TEMPLATES.map((t) => [t.id, t]));
  const itemLabels = missingItems
    .map((ei) => templateMap.get(ei.templateId)?.label ?? ei.templateId)
    .filter(Boolean);

  const subject = `Documents needed for ${engagement.label}`;
  const bodyText = [
    "Hi,",
    "",
    "We still need the following documents to complete your engagement:",
    "",
    ...itemLabels.map((label) => `• ${label}`),
    "",
    "Please upload them into your usual shared folder in Dropbox.",
    "",
    "Thank you.",
  ].join("\n");

  const expectedItemIds = missingItems.map((ei) => ei.id);
  const now = new Date().toISOString();
  const chaseStore = getChaseStore();
  let plan = chaseStore.chasePlans.find(
    (p) => p.clientId === clientId && p.engagementId === engagementId
  );
  if (plan) {
    plan.status = "SENT";
    plan.expectedItemIds = expectedItemIds;
    plan.updatedAt = now;
  } else {
    plan = {
      id: `chase-${clientId}-${engagementId}`,
      clientId,
      engagementId,
      status: "SENT",
      createdAt: now,
      updatedAt: now,
      expectedItemIds,
    };
    chaseStore.chasePlans.push(plan);
  }
  saveChaseStore(chaseStore);
  await persistStoreToBackend();
  console.log("[chase] Draft created, chase plan updated:", {
    clientId,
    engagementId,
    expectedItemIds,
    planId: plan.id,
  });

  return NextResponse.json({
    subject,
    body: bodyText,
    items: missingItems.map((ei) => ({
      id: ei.id,
      templateId: ei.templateId,
      label: templateMap.get(ei.templateId)?.label ?? ei.templateId,
    })),
  });
}
