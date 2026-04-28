import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { withAnalytics } from "./middleware/analytics.js";
import { figmaTools, handleFigmaTool } from "./tools/figma.js";
import { confluenceTools, handleConfluenceTool } from "./tools/confluence.js";
import { transcriptionTools, handleTranscriptionTool } from "./tools/transcription.js";
import { userDataTools, handleUserDataTool } from "./tools/user-data.js";
import { getUsageStats } from "./lib/supabase.js";
import { helloTools, handleHelloTool } from "./tools/hello.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

// --- Meta tool: usage stats ---

const metaTools: Tool[] = [
  {
    name: "agents_mcp_usage_stats",
    description: "Get usage statistics for this MCP server — calls per tool, unique users, error rates",
    inputSchema: {
      type: "object",
      properties: {
        days: { type: "number", description: "Number of days to look back (default 7)" },
      },
    },
  },
];

// --- Route tool calls to the right handler ---

const toolRouter: Record<string, (name: string, args: Record<string, unknown>) => Promise<string>> = {};

// Register all tool handlers
for (const tool of figmaTools) toolRouter[tool.name] = handleFigmaTool;
for (const tool of confluenceTools) toolRouter[tool.name] = handleConfluenceTool;
for (const tool of transcriptionTools) toolRouter[tool.name] = handleTranscriptionTool;
for (const tool of userDataTools) toolRouter[tool.name] = handleUserDataTool;
for (const tool of helloTools) toolRouter[tool.name] = handleHelloTool;

// All tools combined
const allTools: Tool[] = [
  ...figmaTools,
  ...confluenceTools,
  ...transcriptionTools,
  ...userDataTools,
  ...helloTools,
  ...metaTools,
];

// --- Create server ---

export function createServer(): Server {
  const server = new Server(
    { name: "agents-mcp", version: "0.1.0" },
    { capabilities: { tools: {} } }
  );

  // List tools
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: allTools,
  }));

  // Call tools
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const toolArgs = (args ?? {}) as Record<string, unknown>;

    // Meta tool: usage stats
    if (name === "agents_mcp_usage_stats") {
      const days = (toolArgs.days as number) ?? 7;
      const stats = await getUsageStats(days);
      return {
        content: [{
          type: "text" as const,
          text: stats
            ? JSON.stringify({ period_days: days, tools: stats }, null, 2)
            : "Analytics not configured. Set AGENTS_MCP_SUPABASE_URL and AGENTS_MCP_SUPABASE_KEY.",
        }],
      };
    }

    // Route to handler
    const handler = toolRouter[name];
    if (!handler) {
      return {
        content: [{ type: "text" as const, text: `Unknown tool: ${name}` }],
        isError: true,
      };
    }

    // Wrap with analytics
    const trackedHandler = withAnalytics(name, (a: Record<string, unknown>) => handler(name, a));

    try {
      const result = await trackedHandler(toolArgs);
      return {
        content: [{ type: "text" as const, text: result }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text" as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  return server;
}
