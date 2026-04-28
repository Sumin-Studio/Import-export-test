import Portkey, { PORTKEY_GATEWAY_URL } from "portkey-ai";
import { z } from "zod";
import type { IssueAiInsights } from "../types";

function toStringList(v: unknown): unknown {
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (typeof v === "string" && v.trim()) return [v.trim()];
  return v;
}

function toOptionalStringList(v: unknown): unknown {
  if (v == null || v === "") return undefined;
  return toStringList(v);
}

const InsightSchema = z.object({
  keyPoints: z.preprocess(toStringList, z.array(z.string()).max(12)),
  risks: z.preprocess(toOptionalStringList, z.array(z.string()).max(8).optional()),
  asks: z.preprocess(toOptionalStringList, z.array(z.string()).max(8).optional()),
});

/** Normalise model output: markdown fences, leading prose, or a single JSON object substring. */
function extractJsonObjectFromModelContent(content: string): string {
  let s = content.trim();
  const fence = /^```(?:json)?\s*\r?\n?([\s\S]*?)\r?\n?```/im.exec(s);
  if (fence?.[1]) s = fence[1].trim();
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start >= 0 && end > start) return s.slice(start, end + 1);
  return s;
}

function messageContentToString(content: unknown): string | null {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    const text = content
      .map((part) => {
        if (part && typeof part === "object" && "text" in part && typeof (part as { text?: unknown }).text === "string") {
          return (part as { text: string }).text;
        }
        return "";
      })
      .join("");
    return text || null;
  }
  return null;
}

/**
 * Calls Portkey via the official `portkey-ai` client (OpenAI-compatible chat completions).
 * Same wire shape as curl: `POST {baseURL}/chat/completions` with `x-portkey-api-key`.
 * Set `PORTKEY_BASE_URL` to your gateway origin including `/v1` when not using Portkey cloud.
 */
export async function summarizeIssue(plainDescription: string): Promise<IssueAiInsights | null> {
  const apiKey = process.env.PORTKEY_API_KEY;
  if (!apiKey) return null;

  const baseURL = process.env.PORTKEY_BASE_URL?.trim().replace(/\/$/, "") || PORTKEY_GATEWAY_URL;
  const model = process.env.PORTKEY_MODEL?.trim() || "@vertexai-preview/gemini-3.1-flash-lite-preview";
  const text = plainDescription.trim().slice(0, 12_000);
  if (!text) return null;

  const vk = process.env.PORTKEY_VIRTUAL_KEY?.trim();
  const config = process.env.PORTKEY_CONFIG?.trim();

  const portkey = new Portkey({
    apiKey,
    baseURL,
    ...(vk ? { virtualKey: vk } : {}),
    ...(config ? { config } : {}),
  });

  let response: Awaited<ReturnType<Portkey["chat"]["completions"]["create"]>>;
  try {
    response = await portkey.chat.completions.create({
      model,
      temperature: 0.2,
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content:
            "You extract structured facts from internal Jira dependency descriptions. Respond with ONLY valid JSON: {\"keyPoints\": string[], \"risks\"?: string[], \"asks\"?: string[]}. keyPoints: 3–8 short bullets. risks/asks optional. No markdown, no preamble.",
        },
        { role: "user", content: text },
      ],
    });
  } catch (e) {
    // 403/033 etc. — misconfigured virtual key, API key scope, or model not allowed in workspace.
    console.error("[summarizeIssue] Portkey request failed:", e instanceof Error ? e.message : e);
    return null;
  }

  const content = response.choices?.[0]?.message?.content;
  const raw = messageContentToString(content);
  if (!raw) return null;
  const jsonBlob = extractJsonObjectFromModelContent(raw);
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonBlob);
  } catch {
    console.warn("[summarizeIssue] model output was not valid JSON (first 240 chars):", raw.slice(0, 240));
    return null;
  }
  const out = InsightSchema.safeParse(parsed);
  if (!out.success) {
    console.warn("[summarizeIssue] JSON did not match insight schema:", out.error.flatten());
    return null;
  }
  return out.data;
}
