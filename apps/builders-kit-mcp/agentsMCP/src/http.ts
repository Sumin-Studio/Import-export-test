#!/usr/bin/env bun
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createServer } from "./server.js";

const PORT = Number(process.env.PORT) || 3001;

Bun.serve({
  port: PORT,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    // Health check
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", server: "agents-mcp" }), {
        headers: { "content-type": "application/json" },
      });
    }

    // MCP endpoint — stateless: each request gets a fresh server + transport
    if (url.pathname === "/mcp") {
      const server = createServer();
      const transport = new WebStandardStreamableHTTPServerTransport({
        sessionIdGenerator: undefined, // stateless
        enableJsonResponse: true, // simple JSON instead of SSE streaming
      });

      await server.connect(transport);

      try {
        return await transport.handleRequest(req);
      } catch (error) {
        return new Response(JSON.stringify({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        }), { status: 500, headers: { "content-type": "application/json" } });
      }
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`[agents-mcp] HTTP server listening on port ${PORT}`);
