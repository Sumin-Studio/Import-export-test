import type { VercelRequest, VercelResponse } from "@vercel/node";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "../src/server.js";
import { runWithSecrets, type RequestSecrets } from "../src/lib/request-context.js";

function headerValue(req: VercelRequest, name: string): string | undefined {
  const raw = req.headers[name.toLowerCase()];
  if (Array.isArray(raw)) return raw[0];
  return raw;
}

function extractSecrets(req: VercelRequest): RequestSecrets {
  return {
    figmaToken: headerValue(req, "x-figma-token"),
    openaiApiKey: headerValue(req, "x-openai-api-key"),
    confluenceBaseUrl: headerValue(req, "x-confluence-base-url"),
    confluenceEmail: headerValue(req, "x-confluence-email"),
    confluenceToken: headerValue(req, "x-confluence-token"),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    [
      "Content-Type",
      "Accept",
      "Mcp-Session-Id",
      "MCP-Protocol-Version",
      "X-Figma-Token",
      "X-OpenAI-Api-Key",
      "X-Confluence-Base-Url",
      "X-Confluence-Email",
      "X-Confluence-Token",
    ].join(", ")
  );

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    // Stateless: each HTTP request spins up a fresh server + transport.
    // Simpler for a serverless function; we can add session support later.
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  await server.connect(transport);

  const secrets = extractSecrets(req);

  try {
    await runWithSecrets(secrets, () => transport.handleRequest(req, res, req.body));
  } catch {
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
}
