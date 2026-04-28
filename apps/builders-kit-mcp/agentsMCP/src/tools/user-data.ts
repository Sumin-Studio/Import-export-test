import type { Tool } from "@modelcontextprotocol/sdk/types.js";

// --- Tool definitions ---

export const userDataTools: Tool[] = [
  {
    name: "userdata_query",
    description: "Query user research data — search studies, sessions, transcripts, and insights",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Natural language search query" },
        filters: {
          type: "object",
          description: "Optional filters",
          properties: {
            study: { type: "string", description: "Filter to specific study name" },
            date_range: { type: "string", description: "e.g., 'last 30 days', '2024-01-01 to 2024-03-01'" },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Filter by tags/labels",
            },
          },
        },
      },
      required: ["query"],
    },
  },
  {
    name: "userdata_get_insights",
    description: "Get categorized insights on a topic from user research",
    inputSchema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "Topic to get insights about" },
        limit: { type: "number", description: "Max insights to return (default 10)" },
      },
      required: ["topic"],
    },
  },
];

// --- Tool handlers ---
// Stubbed — wire to real data source (Dovetail, Notion, Confluence, etc.) when ready

export async function handleUserDataTool(name: string, args: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "userdata_query": {
      const query = args.query as string;
      return JSON.stringify({
        status: "stub",
        message: `User data query received: "${query}"`,
        note: "This tool is stubbed. Wire it to your research data source (Dovetail, Notion, Confluence, internal DB).",
        example_response: {
          results: [
            {
              title: "Onboarding friction study — March 2025",
              summary: "Users struggle with the bank connection step. 60% drop off.",
              source: "Dovetail",
              date: "2025-03-15",
              tags: ["onboarding", "friction", "bank-connection"],
            },
          ],
        },
      }, null, 2);
    }

    case "userdata_get_insights": {
      const topic = args.topic as string;
      return JSON.stringify({
        status: "stub",
        message: `Insights requested for topic: "${topic}"`,
        note: "This tool is stubbed. Wire it to your research data source.",
        example_response: {
          insights: [
            {
              insight: "Users expect bank connection to take <30 seconds",
              evidence: "12/15 participants mentioned speed in interviews",
              source: "Q1 2025 Onboarding Study",
              confidence: "high",
            },
          ],
        },
      }, null, 2);
    }

    default:
      throw new Error(`Unknown user data tool: ${name}`);
  }
}
