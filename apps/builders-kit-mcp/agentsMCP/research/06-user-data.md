# User Research Data Access via MCP

## Great Question MCP
- Access to studies, sessions, transcripts, highlights, insights, participant data
- Role-based access controls
- Query: "Summarize everything we know about friction in the onboarding flow"

## survey-mcp-server
- **Repo:** https://github.com/cyanheads/survey-mcp-server
- Dynamic conversational surveys with skip logic
- Session resume, multi-tenancy

## Research MCP Server
- **URL:** https://glama.ai/mcp/servers/research-mcp-server
- Notion-based survey data retrieval/creation

## Analytics Platforms with MCP
- **Microsoft Clarity** — Query analytics with AI
- **DataHub** — Natural language data exploration
- **PostHog** — Product analytics for design validation

## Recommended Approach for agentsMCP

### Tools to expose:
1. `userdata_query` — Query user research data (flexible, natural language)
2. `userdata_get_insights` — Get tagged/categorized insights

### Implementation strategy:
- Start with a flexible interface that can wire to different backends
- POC: connect to whatever Xero uses for research (Dovetail? Notion? Confluence?)
- The tool interface stays stable; the backend adapter changes

### Interface design:
```typescript
// Stable tool interface
userdata_query({ query: string, filters?: { study?: string, date_range?: string, tags?: string[] } })
// Returns: { results: Array<{ title, summary, source, date, tags }> }

userdata_get_insights({ topic: string, limit?: number })
// Returns: { insights: Array<{ insight, evidence, source, confidence }> }
```

### Future enhancements:
- Connect to Dovetail, UserTesting, or similar platforms
- Aggregate across multiple research sources
- Sentiment analysis on research data
- Trend detection across studies
