# Analytics & Telemetry Patterns for MCP

## Why From Day 1
- Can't prove ROI without baseline data
- Can't add retroactively — you lose the "before" picture
- Cost: minimal (one middleware wrapper + one DB table)
- Value: proves adoption, identifies popular tools, catches errors early

## Pattern 1: PostHog Wrapper (Simplest)

Wrap each tool handler function with analytics before passing to `server.tool()`.
Each tool call triggers tracking without modifying core business logic.

```typescript
class AnalyticsProvider {
  async trackToolCall(toolName: string, fn: () => Promise<any>) {
    const start = Date.now();
    try {
      const result = await fn();
      await this.log({ tool_name: toolName, duration_ms: Date.now() - start, status: "success" });
      return result;
    } catch (error) {
      await this.log({ tool_name: toolName, duration_ms: Date.now() - start, status: "error", error: error.message });
      throw error;
    }
  }
}
```

Source: https://posthog.com/tutorials/mcp-analytics

## Pattern 2: OpenTelemetry (Vendor-Neutral)

- Auto-creates spans for MCP Tool Calls: `mcp.tool:{toolName}`
- Tracks duration histograms: `mcp.server.operation.duration`
- Works with any backend: Jaeger, Zipkin, Datadog, New Relic
- TS library: `theharithsa/opentelemetry-instrumentation-mcp`
- Source: https://signoz.io/blog/mcp-observability-with-otel/

## Pattern 3: FastMCP Middleware (Python)

```python
from fastmcp import FastMCP
mcp = FastMCP("my-server")

# Middleware wraps high-level semantic handlers (tools, resources, prompts)
# Templates for logging, error handling, rate limiting, timing
```

Source: https://www.jlowin.dev/blog/fastmcp-2-9-middleware

## Pattern 4: Before/After Hooks

- `beforeMCPExecution`: governance, policy checking, logging call details
- `afterMCPExecution`: sanitize sensitive data, log results
- Used by Kong and Gravitee for traffic management
- Repos: `civicteam/mcp-hooks`, `crazyrabbitLTC/mcp-hooks`

## Our Approach: Supabase + Wrapper

**Table: `mcp_tool_calls`**
```sql
CREATE TABLE mcp_tool_calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  user_id TEXT NOT NULL,
  team TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  duration_ms INTEGER,
  status TEXT NOT NULL CHECK (status IN ('success', 'error')),
  error_message TEXT,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_tool_calls_tool ON mcp_tool_calls(tool_name);
CREATE INDEX idx_tool_calls_user ON mcp_tool_calls(user_id);
CREATE INDEX idx_tool_calls_time ON mcp_tool_calls(timestamp);
CREATE INDEX idx_tool_calls_team ON mcp_tool_calls(team);
```

**Why Supabase:**
- PostgreSQL = SQL queryable, views, functions
- Real-time subscriptions for live dashboards
- PostgREST API for easy querying
- Jon already has Supabase infrastructure
- Free tier handles proof-of-concept volume easily

## Key Metrics to Track

### Adoption
- DAU (Daily Active Users) — shows daily reliance
- WAU (Weekly Active Users) — captures recurring use
- MAU (Monthly Active Users) — reflects broad adoption
- Feature adoption rate — % of team integrating each tool

### Performance
- p95/p99 latencies per tool call
- Error rate per tool
- Request throughput

### Cost
- Input/output tokens per session
- Cost per request type
- LLM API cost attribution by team/feature

### Value (ROI Proof)
- Most-used tools across requests
- Cycle time before vs. after (engineering tasks)
- Tool hallucination rates (2-8% typical)
- Turns-to-completion (how many LLM iterations needed)

## Existing Analytics Platforms

| Platform | Features | URL |
|----------|----------|-----|
| Gravitee | Total requests, latency, tool usage, LLM tokens | gravitee.io |
| Kong Gateway | Real-time metrics, Prometheus export, Grafana | konghq.com |
| Grafana Cloud | Protocol health, tool analytics, usage patterns | grafana.com |
| Datadog | AI Agent observability, live telemetry | datadoghq.com |
| Tinybird | Event → SQL → Prometheus → Grafana pipeline | tinybird.co |

## ROI Statistics (from industry)
- Integration costs drop 70-80% with MCP
- Average ROI: $3.70 per dollar invested
- Top performers: $10 return with structured adoption
- 25% average performance improvement
- 75% reduction in daily task time (refactoring, unit tests)
- Positive ROI in 6-18 months (visible in 3-6 months)

Sources:
- https://www.mintmcp.com/blog/mcp-deployment-statistics
- https://zeo.org/resources/blog/mcp-server-economics-tco-analysis-business-models-roi
