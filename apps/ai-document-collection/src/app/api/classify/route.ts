import { NextRequest, NextResponse } from "next/server";
import { classifyDocument } from "@/lib/ollama";

export async function POST(request: NextRequest) {
  let body: { fileName: string; textPreview?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { fileName, textPreview } = body;
  if (!fileName || typeof fileName !== "string") {
    return NextResponse.json(
      { error: "fileName is required" },
      { status: 400 }
    );
  }

  try {
    const result = await classifyDocument(fileName, textPreview);
    return NextResponse.json(result);
  } catch (e) {
    console.error("Classify error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Classification failed" },
      { status: 502 }
    );
  }
}
