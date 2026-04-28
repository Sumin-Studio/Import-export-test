import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const BASE_URL = process.env.CONFLUENCE_BASE_URL; // e.g., https://yoursite.atlassian.net
const EMAIL = process.env.CONFLUENCE_EMAIL;
const TOKEN = process.env.CONFLUENCE_TOKEN;

async function confluenceFetch(path: string) {
  if (!BASE_URL || !EMAIL || !TOKEN) {
    throw new Error("CONFLUENCE_BASE_URL, CONFLUENCE_EMAIL, and CONFLUENCE_TOKEN required");
  }
  const auth = Buffer.from(`${EMAIL}:${TOKEN}`).toString("base64");
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Confluence API ${res.status}: ${res.statusText}`);
  return res.json();
}

// --- Tool definitions ---

export const confluenceTools: Tool[] = [
  {
    name: "confluence_search",
    description: "Search Confluence pages using CQL (Confluence Query Language)",
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
    description: "Get a Confluence page content by ID, returned as structured text",
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
    description: "List all accessible Confluence spaces",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results (default 25)" },
      },
    },
  },
];

// --- Tool handlers ---

export async function handleConfluenceTool(name: string, args: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "confluence_search": {
      const cql = encodeURIComponent(args.cql as string);
      const limit = (args.limit as number) ?? 10;
      const data: any = await confluenceFetch(
        `/wiki/rest/api/content/search?cql=${cql}&limit=${limit}&expand=metadata.labels`
      );
      return JSON.stringify({
        total: data.totalSize,
        results: data.results?.map((r: any) => ({
          id: r.id,
          title: r.title,
          type: r.type,
          space: r.space?.name,
          url: r._links?.webui ? `${BASE_URL}/wiki${r._links.webui}` : null,
          labels: r.metadata?.labels?.results?.map((l: any) => l.name),
        })),
      }, null, 2);
    }

    case "confluence_get_page": {
      const pageId = args.page_id as string;
      const data: any = await confluenceFetch(
        `/wiki/rest/api/content/${pageId}?expand=body.storage,version,space`
      );
      // Strip HTML tags for a rough plain-text version
      const html = data.body?.storage?.value ?? "";
      const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      return JSON.stringify({
        id: data.id,
        title: data.title,
        space: data.space?.name,
        version: data.version?.number,
        last_updated: data.version?.when,
        content: text.slice(0, 10000), // cap at 10k chars
        url: data._links?.webui ? `${BASE_URL}/wiki${data._links.webui}` : null,
      }, null, 2);
    }

    case "confluence_list_spaces": {
      const limit = (args.limit as number) ?? 25;
      const data: any = await confluenceFetch(`/wiki/rest/api/space?limit=${limit}`);
      return JSON.stringify({
        total: data.size,
        spaces: data.results?.map((s: any) => ({
          key: s.key,
          name: s.name,
          type: s.type,
          url: s._links?.webui ? `${BASE_URL}/wiki${s._links.webui}` : null,
        })),
      }, null, 2);
    }

    default:
      throw new Error(`Unknown Confluence tool: ${name}`);
  }
}
