# Proving ROI: Metrics Framework for Team MCP

## Why This Matters
The server needs to justify its existence across the org. "It's cool" isn't enough.
You need numbers that show: adoption is growing, time is being saved, and the investment pays off.

## Adoption Metrics

| Metric | What it shows | Query |
|--------|--------------|-------|
| DAU | Daily reliance | `COUNT(DISTINCT user_id) WHERE timestamp > now() - interval '1 day'` |
| WAU | Recurring use | `COUNT(DISTINCT user_id) WHERE timestamp > now() - interval '7 days'` |
| MAU | Broad adoption | `COUNT(DISTINCT user_id) WHERE timestamp > now() - interval '30 days'` |
| DAU/MAU ratio | Stickiness | Higher = more habitual use. >20% is good for internal tools |
| Feature adoption | Tool-level penetration | `COUNT(DISTINCT user_id) GROUP BY tool_name` |
| Activation rate | First-time value | % of new users who call a tool within first week |

## Performance Metrics

| Metric | What it shows | Target |
|--------|--------------|--------|
| p95 latency | User experience | <2s for most tools |
| Error rate | Reliability | <5% |
| Tool success rate | Task completion | >90% |
| Availability | Uptime | 99%+ |

## Value Metrics (The Money Slide)

### Time Saved
- Track average duration of manual process vs. MCP-assisted
- Example: "Pulling design tokens manually: ~30 min. Via MCP: 5 seconds."
- Multiply by frequency and team size

### Cost Reduction
- Integration costs drop 70-80% with standardized MCP (industry data)
- Average ROI: $3.70 per dollar invested
- Top performers: $10 return with structured adoption

### Quality Improvement
- Fewer errors from manual copy-paste
- Consistent outputs (same API, same format every time)
- Reduced context-switching (stay in IDE)

## Dashboard Queries (Supabase SQL)

### Most Popular Tools This Week
```sql
SELECT tool_name, COUNT(*) as calls, COUNT(DISTINCT user_id) as unique_users
FROM mcp_tool_calls
WHERE timestamp > now() - interval '7 days'
GROUP BY tool_name
ORDER BY calls DESC;
```

### Daily Active Users Trend
```sql
SELECT DATE(timestamp) as day, COUNT(DISTINCT user_id) as dau
FROM mcp_tool_calls
WHERE timestamp > now() - interval '30 days'
GROUP BY DATE(timestamp)
ORDER BY day;
```

### Error Rate by Tool
```sql
SELECT tool_name,
  COUNT(*) FILTER (WHERE status = 'error') * 100.0 / COUNT(*) as error_rate,
  COUNT(*) as total_calls
FROM mcp_tool_calls
WHERE timestamp > now() - interval '7 days'
GROUP BY tool_name
ORDER BY error_rate DESC;
```

### Team Usage Breakdown
```sql
SELECT team, tool_name, COUNT(*) as calls
FROM mcp_tool_calls
WHERE timestamp > now() - interval '30 days'
GROUP BY team, tool_name
ORDER BY team, calls DESC;
```

### Avg Response Time by Tool
```sql
SELECT tool_name,
  AVG(duration_ms) as avg_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_ms) as p95_ms
FROM mcp_tool_calls
WHERE timestamp > now() - interval '7 days'
GROUP BY tool_name;
```

## Industry Benchmarks
- 25% average performance improvement for AI applications
- 75% reduction in daily task time for engineering teams
- Positive ROI visible in 3-6 months
- 1,000+ community MCP servers created in first months of protocol

## Presentation Strategy
1. **Week 1-4:** Show adoption curve (DAU growing)
2. **Month 2:** Show most-used tools + time savings estimates
3. **Quarter 1:** Full ROI calculation with before/after comparison
4. **Ongoing:** Monthly dashboard email to stakeholders

Sources:
- https://www.mintmcp.com/blog/mcp-deployment-statistics
- https://zeo.org/resources/blog/mcp-server-economics-tco-analysis-business-models-roi
- https://www.agileanalytics.cloud/blog/measuring-ai-adoption-and-tool-usage-what-to-track-before-you-code
- https://mergescout.com/blog/how-to-track-ai-adoption-engineering-team/
