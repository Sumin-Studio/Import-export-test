import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getOpenAIKey } from "../lib/request-context.js";

// Note: `transcribe_file` from agentsMCP was intentionally NOT ported — it
// uses fs/promises to read a local path, which cannot work inside a Vercel
// serverless function. `transcribe_url` works since it fetches over HTTP.

export const transcriptionTools: Tool[] = [
  {
    name: "transcribe_url",
    description:
      "Download audio/video from a publicly reachable URL and transcribe it with OpenAI Whisper. Requires OPENAI_API_KEY on the server. Long files may exceed the Vercel function timeout.",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to audio/video file (mp3, mp4, wav, webm, m4a)" },
        language: {
          type: "string",
          description: "Optional ISO 639-1 language code (e.g., 'en', 'ja')",
        },
      },
      required: ["url"],
    },
  },
];

async function whisperTranscribe(
  fileData: Blob,
  fileName: string,
  language?: string
): Promise<string> {
  const apiKey = getOpenAIKey();
  if (!apiKey) {
    throw new Error(
      "No OpenAI API key provided. Add X-OpenAI-Api-Key header to your Cursor MCP config."
    );
  }

  const form = new FormData();
  form.append("file", fileData, fileName);
  form.append("model", "whisper-1");
  form.append("response_format", "verbose_json");
  if (language) form.append("language", language);

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Whisper API ${res.status}: ${err}`);
  }

  return res.text();
}

export async function handleTranscriptionTool(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  if (name !== "transcribe_url") {
    throw new Error(`Unknown transcription tool: ${name}`);
  }

  const url = args.url as string;
  const language = args.language as string | undefined;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const blob = await res.blob();
  const fileName = url.split("/").pop()?.split("?")[0] ?? "audio.mp3";
  const result = await whisperTranscribe(blob, fileName, language);
  const parsed = JSON.parse(result);
  return JSON.stringify(
    {
      text: parsed.text,
      language: parsed.language,
      duration_seconds: parsed.duration,
      segments: parsed.segments?.map((s: any) => ({
        start: s.start,
        end: s.end,
        text: s.text.trim(),
      })),
    },
    null,
    2
  );
}
