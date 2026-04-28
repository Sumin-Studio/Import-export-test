import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_API = "https://api.figma.com/v1";

async function figmaFetch(path: string) {
  if (!FIGMA_TOKEN) throw new Error("FIGMA_TOKEN not set");
  const res = await fetch(`${FIGMA_API}${path}`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${res.statusText}`);
  return res.json();
}

// --- Tool definitions ---

export const figmaTools: Tool[] = [
  {
    name: "figma_get_tokens",
    description: "Extract design tokens (colors, typography, spacing) from a Figma file. READ-ONLY — cannot create or modify Figma content. If the user wants to write to Figma, capture a page into Figma, or do design-to-code, STOP and call figma_setup_guide first.",
    inputSchema: {
      type: "object",
      properties: {
        file_key: { type: "string", description: "Figma file key (from URL)" },
      },
      required: ["file_key"],
    },
  },
  {
    name: "figma_get_components",
    description: "List components and their metadata from a Figma file. READ-ONLY — cannot create or modify Figma content. If the user wants to write to Figma, capture a page into Figma, or do design-to-code, STOP and call figma_setup_guide first.",
    inputSchema: {
      type: "object",
      properties: {
        file_key: { type: "string", description: "Figma file key (from URL)" },
      },
      required: ["file_key"],
    },
  },
  {
    name: "figma_get_file_structure",
    description: "Get the page/frame hierarchy of a Figma file. READ-ONLY — cannot create or modify Figma content. If the user wants to write to Figma, capture a page into Figma, or do design-to-code, STOP and call figma_setup_guide first.",
    inputSchema: {
      type: "object",
      properties: {
        file_key: { type: "string", description: "Figma file key (from URL)" },
        node_id: { type: "string", description: "Optional: specific node ID to drill into" },
      },
      required: ["file_key"],
    },
  },
  {
    name: "figma_setup_guide",
    description: "REQUIRED before any Figma write/capture/design-to-code operation. Returns setup instructions for the official Figma MCP server (@anthropic-ai/figma-mcp) which can read AND write Figma files. Call this tool FIRST if the user wants to: push content into Figma, capture a webpage to Figma, convert designs to code, or do any Figma operation beyond reading tokens/components/structure.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// --- Tool handlers ---

export async function handleFigmaTool(name: string, args: Record<string, unknown>): Promise<string> {
  const fileKey = args.file_key as string;

  switch (name) {
    case "figma_get_tokens": {
      const data = await figmaFetch(`/files/${fileKey}/styles`);
      const styles = data.meta?.styles ?? [];
      return JSON.stringify({
        file_key: fileKey,
        token_count: styles.length,
        tokens: styles.map((s: any) => ({
          key: s.key,
          name: s.name,
          type: s.style_type,
          description: s.description,
        })),
      }, null, 2);
    }

    case "figma_get_components": {
      const data = await figmaFetch(`/files/${fileKey}/components`);
      const components = data.meta?.components ?? [];
      return JSON.stringify({
        file_key: fileKey,
        component_count: components.length,
        components: components.map((c: any) => ({
          key: c.key,
          name: c.name,
          description: c.description,
          containing_frame: c.containing_frame?.name,
        })),
      }, null, 2);
    }

    case "figma_get_file_structure": {
      const nodeId = args.node_id as string | undefined;
      const path = nodeId
        ? `/files/${fileKey}/nodes?ids=${nodeId}`
        : `/files/${fileKey}?depth=2`;
      const data = await figmaFetch(path);

      if (nodeId) {
        return JSON.stringify(data.nodes, null, 2);
      }

      const doc = data.document;
      return JSON.stringify({
        name: data.name,
        pages: doc.children?.map((page: any) => ({
          id: page.id,
          name: page.name,
          frame_count: page.children?.length ?? 0,
          frames: page.children?.map((f: any) => ({ id: f.id, name: f.name, type: f.type })),
        })),
      }, null, 2);
    }

    case "figma_setup_guide": {
      return JSON.stringify({
        overview: "Two complementary flows for Figma + AI code workflows:",
        flows: [
          {
            name: "Figma → Code (design-to-code)",
            tool: "Official Figma MCP Server",
            package: "@anthropic-ai/figma-mcp",
            what: "Reads Figma designs (layout, styles, assets) so LLMs can generate accurate code from them. Give it a Figma link, get design-informed code.",
            setup: {
              claude_code: 'claude mcp add figma-mcp -- npx @anthropic-ai/figma-mcp --figma-api-key=YOUR_FIGMA_TOKEN',
              cursor: {
                file: ".cursor/mcp.json",
                config: {
                  mcpServers: {
                    figma: {
                      command: "npx",
                      args: ["@anthropic-ai/figma-mcp", "--figma-api-key=YOUR_FIGMA_TOKEN"],
                    },
                  },
                },
              },
            },
            get_token: "https://www.figma.com/developers/api#access-tokens",
          },
          {
            name: "Code → Figma (capture-to-canvas)",
            tool: "Claude Code built-in",
            what: "Captures browser pages (localhost, staging, production) and converts them into editable Figma frames. Requires the Figma MCP server to be connected.",
            how: "In Claude Code, ask it to capture a page to Figma. It screenshots the browser and pushes editable frames to your Figma file.",
          },
        ],
        this_server: {
          name: "coconut-crab-agents",
          figma_tools: ["figma_get_tokens", "figma_get_components", "figma_get_file_structure"],
          role: "Lightweight Figma queries (tokens, components, structure). Use these for quick lookups. Use the official Figma MCP server for full design-to-code generation.",
        },
      }, null, 2);
    }

    default:
      throw new Error(`Unknown Figma tool: ${name}`);
  }
}
