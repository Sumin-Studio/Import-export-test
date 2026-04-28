import { AsyncLocalStorage } from "node:async_hooks";

// Per-request secrets forwarded from the MCP client (Cursor) as HTTP headers.
// The server holds no tokens at rest — each caller brings their own.
// Falls back to process.env for local dev convenience.
export interface RequestSecrets {
  figmaToken?: string;
  openaiApiKey?: string;
  confluenceBaseUrl?: string;
  confluenceEmail?: string;
  confluenceToken?: string;
}

const storage = new AsyncLocalStorage<RequestSecrets>();

export function runWithSecrets<T>(secrets: RequestSecrets, fn: () => Promise<T>): Promise<T> {
  return storage.run(secrets, fn);
}

function fromRequest(key: keyof RequestSecrets): string | undefined {
  return storage.getStore()?.[key];
}

export function getFigmaToken(): string | undefined {
  return fromRequest("figmaToken") ?? process.env.FIGMA_TOKEN;
}

export function getOpenAIKey(): string | undefined {
  return fromRequest("openaiApiKey") ?? process.env.OPENAI_API_KEY;
}

export function getConfluenceCreds(): {
  baseUrl?: string;
  email?: string;
  token?: string;
} {
  return {
    baseUrl: fromRequest("confluenceBaseUrl") ?? process.env.CONFLUENCE_BASE_URL,
    email: fromRequest("confluenceEmail") ?? process.env.CONFLUENCE_EMAIL,
    token: fromRequest("confluenceToken") ?? process.env.CONFLUENCE_TOKEN,
  };
}
