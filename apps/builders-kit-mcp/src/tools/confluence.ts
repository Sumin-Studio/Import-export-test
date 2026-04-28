import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { getConfluenceCreds } from "../lib/request-context.js";

async function confluenceFetch(path: string) {
  const { baseUrl, email, token } = getConfluenceCreds();
  if (!baseUrl || !email || !token) {
    throw new Error(
      "No Confluence credentials provided. Add X-Confluence-Base-Url, X-Confluence-Email and X-Confluence-Token headers to your Cursor MCP config."
    );
  }
  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Confluence API ${res.status}: ${res.statusText}`);
  return res.json();
}

export const confluenceTools: Tool[] = [
  {
    name: "confluence_search",
    description:
      "Search Confluence pages using CQL (Confluence Query Language). Requires CONFLUENCE_* env vars on the server.",
    inputSchema: {
      type: "object",
      properties: {
        cql: {
          type: "string",
          description: 'CQL query, e.g. type=page AND text~"design tokens"',
        },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["cql"],
    },
  },
  {
    name: "confluence_get_page",
    description:
      "Get a Confluence page's content by ID, returned as structured text (HTML stripped, capped at 10k chars).",
    inputSchema: {
      type: "object",
      properties: {
        page_id: { type: "string", description: "Confluence page ID" },
      },
      required: ["page_id"],
    },
  },
  {
    name: "confluence_list_spaces",
    description: "List accessible Confluence spaces.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results (default 25)" },
      },
    },
  },
];

export async function handleConfluenceTool(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  const { baseUrl } = getConfluenceCreds();

  switch (name) {
    case "confluence_search": {
      const cql = encodeURIComponent(args.cql as string);
      const limit = (args.limit as number) ?? 10;
      const data: any = await confluenceFetch(
        `/wiki/rest/api/content/search?cql=${cql}&limit=${limit}&expand=metadata.labels`
      );
      return JSON.stringify(
        {
          total: data.totalSize,
          results: data.results?.map((r: any) => ({
            id: r.id,
            title: r.title,
            type: r.type,
            space: r.space?.name,
            url: r._links?.webui ? `${baseUrl}/wiki${r._links.webui}` : null,
            labels: r.metadata?.labels?.results?.map((l: any) => l.name),
          })),
        },
        null,
        2
      );
    }

    case "confluence_get_page": {
      const pageId = args.page_id as string;
      const data: any = await confluenceFetch(
        `/wiki/rest/api/content/${pageId}?expand=body.storage,version,space`
      );
      const html = data.body?.storage?.value ?? "";
      const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      return JSON.stringify(
        {
          id: data.id,
          title: data.title,
          space: data.space?.name,
          version: data.version?.number,
          last_updated: data.version?.when,
          content: text.slice(0, 10000),
          url: data._links?.webui ? `${baseUrl}/wiki${data._links.webui}` : null,
        },
        null,
        2
      );
    }

    case "confluence_list_spaces": {
      const limit = (args.limit as number) ?? 25;
      const data: any = await confluenceFetch(
        `/wiki/rest/api/space?limit=${limit}`
      );
      return JSON.stringify(
        {
          total: data.size,
          spaces: data.results?.map((s: any) => ({
            key: s.key,
            name: s.name,
            type: s.type,
            url: s._links?.webui ? `${baseUrl}/wiki${s._links.webui}` : null,
          })),
        },
        null,
        2
      );
    }

    default:
      throw new Error(`Unknown Confluence tool: ${name}`);
  }
}
