import { NextRequest, NextResponse } from "next/server";
import { getAgentConfig, setAgentConfig } from "@/lib/agent-config";

export async function GET() {
  const config = getAgentConfig();
  return NextResponse.json(config);
}

export async function PATCH(request: NextRequest) {
  let body: Partial<{
    ollamaHost: string;
    ollamaModel: string;
    scanDelayMs: number;
    lowConfidenceThreshold: number;
    maxFilesPerScan: number;
    classificationPreviewChars: number;
    useContentForClassification: boolean;
  }>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const updates: Partial<Parameters<typeof setAgentConfig>[0]> = {};
  if (typeof body.ollamaHost === "string") updates.ollamaHost = body.ollamaHost;
  if (typeof body.ollamaModel === "string") updates.ollamaModel = body.ollamaModel;
  if (typeof body.scanDelayMs === "number") updates.scanDelayMs = Math.max(0, body.scanDelayMs);
  if (typeof body.lowConfidenceThreshold === "number")
    updates.lowConfidenceThreshold = Math.min(100, Math.max(0, body.lowConfidenceThreshold));
  if (typeof body.maxFilesPerScan === "number") updates.maxFilesPerScan = Math.max(0, body.maxFilesPerScan);
  if (typeof body.classificationPreviewChars === "number")
    updates.classificationPreviewChars = Math.max(100, Math.min(2000, body.classificationPreviewChars));
  if (typeof body.useContentForClassification === "boolean")
    updates.useContentForClassification = body.useContentForClassification;

  const config = setAgentConfig(updates);
  return NextResponse.json(config);
}
