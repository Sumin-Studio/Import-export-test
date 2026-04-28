import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getFigmaToken } from "../lib/request-context.js";

const FIGMA_API = "https://api.figma.com/v1";

async function figmaFetch(path: string, init?: RequestInit) {
  const token = getFigmaToken();
  if (!token) {
    throw new Error(
      "No Figma token provided. Add X-Figma-Token header to your Cursor MCP config for this server."
    );
  }
  const res = await fetch(`${FIGMA_API}${path}`, {
    ...init,
    headers: {
      "X-Figma-Token": token,
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Figma API ${res.status}: ${res.statusText}${body ? ` — ${body.slice(0, 300)}` : ""}`);
  }
  return res.json();
}

export const figmaTools: Tool[] = [
  {
    name: "figma_get_tokens",
    description:
      "Extract design tokens (colors, typography, spacing) from a Figma file. READ-ONLY — cannot create or modify Figma content.",
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
    description:
      "List components and their metadata from a Figma file. READ-ONLY.",
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
    description:
      "Get the page/frame hierarchy of a Figma file. READ-ONLY. Pass a node_id to drill into a specific node.",
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
    name: "figma_export_images",
    description:
      "Request rendered image URLs for specific Figma nodes. Returns signed URLs the caller can download. Supports PNG, JPG, SVG, PDF. Use this when the user wants to 'download' Figma frames or layers as images.",
    inputSchema: {
      type: "object",
      properties: {
        file_key: { type: "string", description: "Figma file key (from URL)" },
        node_ids: {
          type: "array",
          items: { type: "string" },
          description: "One or more node IDs to render (from the Figma URL or from figma_get_file_structure)",
        },
        format: {
          type: "string",
          enum: ["png", "jpg", "svg", "pdf"],
          description: "Export format (default: png)",
        },
        scale: {
          type: "number",
          description: "Scale factor 0.01 – 4 (default 1). Only applies to png/jpg.",
        },
      },
      required: ["file_key", "node_ids"],
    },
  },
  {
    name: "figma_setup_guide",
    description:
      "Returns setup instructions for the official Figma MCP server (which can read AND write Figma designs), in case the caller needs design-to-code or capture-to-Figma workflows that this server does not provide.",
    inputSchema: { type: "object", properties: {} },
  },
];

export async function handleFigmaTool(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  const fileKey = args.file_key as string;

  switch (name) {
    case "figma_get_tokens": {
      const data: any = await figmaFetch(`/files/${fileKey}/styles`);
      const styles = data.meta?.styles ?? [];
      return JSON.stringify(
        {
          file_key: fileKey,
          token_count: styles.length,
          tokens: styles.map((s: any) => ({
            key: s.key,
            name: s.name,
            type: s.style_type,
            description: s.description,
          })),
        },
        null,
        2
      );
    }

    case "figma_get_components": {
      const data: any = await figmaFetch(`/files/${fileKey}/components`);
      const components = data.meta?.components ?? [];
      return JSON.stringify(
        {
          file_key: fileKey,
          component_count: components.length,
          components: components.map((c: any) => ({
            key: c.key,
            name: c.name,
            description: c.description,
            containing_frame: c.containing_frame?.name,
          })),
        },
        null,
        2
      );
    }

    case "figma_get_file_structure": {
      const nodeId = args.node_id as string | undefined;
      const path = nodeId
        ? `/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`
        : `/files/${fileKey}?depth=2`;
      const data: any = await figmaFetch(path);

      if (nodeId) return JSON.stringify(data.nodes, null, 2);

      const doc = data.document;
      return JSON.stringify(
        {
          name: data.name,
          pages: doc.children?.map((page: any) => ({
            id: page.id,
            name: page.name,
            frame_count: page.children?.length ?? 0,
            frames: page.children?.map((f: any) => ({
              id: f.id,
              name: f.name,
              type: f.type,
            })),
          })),
        },
        null,
        2
      );
    }

    case "figma_export_images": {
      const nodeIds = args.node_ids as string[];
      if (!Array.isArray(nodeIds) || nodeIds.length === 0) {
        throw new Error("node_ids must be a non-empty array");
      }
      const format = ((args.format as string) ?? "png").toLowerCase();
      const scale = (args.scale as number) ?? 1;
      const qs = new URLSearchParams({
        ids: nodeIds.join(","),
        format,
      });
      if (format === "png" || format === "jpg") qs.set("scale", String(scale));

      const data: any = await figmaFetch(`/images/${fileKey}?${qs.toString()}`);

      // Figma returns { err: null, images: { <nodeId>: <url>, ... } }
      const images = data.images ?? {};
      const rendered = Object.entries(images).map(([id, url]) => ({
        node_id: id,
        url: url as string | null,
      }));
      return JSON.stringify(
        {
          file_key: fileKey,
          format,
          scale: format === "png" || format === "jpg" ? scale : undefined,
          rendered,
          note:
            "URLs expire after ~30 days. To save locally, download each URL (they return the raw image bytes).",
        },
        null,
        2
      );
    }

    case "figma_setup_guide": {
      return JSON.stringify(
        {
          overview:
            "This server offers read-only Figma queries. For design-to-code or capture-to-Figma, use the official Figma MCP server:",
          design_to_code: {
            tool: "Official Figma MCP Server",
            package: "@anthropic-ai/figma-mcp",
            cursor_config: {
              mcpServers: {
                figma: {
                  command: "npx",
                  args: ["@anthropic-ai/figma-mcp", "--figma-api-key=YOUR_FIGMA_TOKEN"],
                },
              },
            },
            get_token: "https://www.figma.com/developers/api#access-tokens",
          },
          this_server: {
            name: "builders-kit-mcp",
            tools: [
              "figma_get_tokens",
              "figma_get_components",
              "figma_get_file_structure",
              "figma_export_images",
            ],
          },
        },
        null,
        2
      );
    }

    default:
      throw new Error(`Unknown Figma tool: ${name}`);
  }
}
