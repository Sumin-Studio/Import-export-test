import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { helloTools, handleHelloTool } from "./tools/hello.js";
import { figmaTools, handleFigmaTool } from "./tools/figma.js";
import { confluenceTools, handleConfluenceTool } from "./tools/confluence.js";
import { transcriptionTools, handleTranscriptionTool } from "./tools/transcription.js";
import { userDataTools, handleUserDataTool } from "./tools/user-data.js";

type Handler = (name: string, args: Record<string, unknown>) => Promise<string>;

const toolRouter: Record<string, Handler> = {};

function register(tools: Tool[], handler: Handler) {
  for (const tool of tools) toolRouter[tool.name] = handler;
}

register(helloTools, handleHelloTool);
register(figmaTools, handleFigmaTool);
register(confluenceTools, handleConfluenceTool);
register(transcriptionTools, handleTranscriptionTool);
register(userDataTools, handleUserDataTool);

const allTools: Tool[] = [
  ...helloTools,
  ...figmaTools,
  ...confluenceTools,
  ...transcriptionTools,
  ...userDataTools,
];

export function createServer(): Server {
  const server = new Server(
    { name: "builders-kit-mcp", version: "0.2.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: allTools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const toolArgs = (args ?? {}) as Record<string, unknown>;

    const handler = toolRouter[name];
    if (!handler) {
      return {
        content: [{ type: "text" as const, text: `Unknown tool: ${name}` }],
        isError: true,
      };
    }

    try {
      const result = await handler(name, toolArgs);
      return { content: [{ type: "text" as const, text: result }] };
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
