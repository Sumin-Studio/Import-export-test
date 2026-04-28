import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { readFile } from "fs/promises";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// --- Tool definitions ---

export const transcriptionTools: Tool[] = [
  {
    name: "transcribe_file",
    description: "Transcribe a local audio/video file to text using OpenAI Whisper",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Absolute path to audio/video file (mp3, mp4, wav, webm, m4a)",
        },
        language: {
          type: "string",
          description: "Optional ISO 639-1 language code (e.g., 'en', 'ja')",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "transcribe_url",
    description: "Download and transcribe audio/video from a URL",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to audio/video file" },
        language: { type: "string", description: "Optional ISO 639-1 language code" },
      },
      required: ["url"],
    },
  },
];

// --- Whisper API call ---

async function whisperTranscribe(fileData: Blob, fileName: string, language?: string): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

  const form = new FormData();
  form.append("file", fileData, fileName);
  form.append("model", "whisper-1");
  form.append("response_format", "verbose_json");
  if (language) form.append("language", language);

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Whisper API ${res.status}: ${err}`);
  }

  return res.text();
}

// --- Tool handlers ---

export async function handleTranscriptionTool(name: string, args: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "transcribe_file": {
      const filePath = args.file_path as string;
      const language = args.language as string | undefined;
      const buffer = await readFile(filePath);
      const fileName = filePath.split("/").pop() ?? "audio.mp3";
      const blob = new Blob([buffer]);
      const result = await whisperTranscribe(blob, fileName, language);
      const parsed = JSON.parse(result);
      return JSON.stringify({
        text: parsed.text,
        language: parsed.language,
        duration_seconds: parsed.duration,
        segments: parsed.segments?.map((s: any) => ({
          start: s.start,
          end: s.end,
          text: s.text.trim(),
        })),
      }, null, 2);
    }

    case "transcribe_url": {
      const url = args.url as string;
      const language = args.language as string | undefined;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to download: ${res.status}`);
      const blob = await res.blob();
      const fileName = url.split("/").pop()?.split("?")[0] ?? "audio.mp3";
      const result = await whisperTranscribe(blob, fileName, language);
      const parsed = JSON.parse(result);
      return JSON.stringify({
        text: parsed.text,
        language: parsed.language,
        duration_seconds: parsed.duration,
        segments: parsed.segments?.map((s: any) => ({
          start: s.start,
          end: s.end,
          text: s.text.trim(),
        })),
      }, null, 2);
    }

    default:
      throw new Error(`Unknown transcription tool: ${name}`);
  }
}
