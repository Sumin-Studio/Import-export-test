# Architecture Patterns for Team MCP Servers

## Pattern 1: Layered Architecture (Speakeasy)

```
┌─────────────────────────────────────┐
│   Optimizer Layer (pattern matching) │  Filters common requests
├─────────────────────────────────────┤
│   Router Model (complex routing)     │  Deep reasoning for ambiguous tasks
├─────────────────────────────────────┤
│   Tool Groups (organized specs)      │  Specialized capabilities
├─────────────────────────────────────┤
│   Single Endpoint (unified interface)│  Consolidates downstream API complexity
└─────────────────────────────────────┘
```
Source: https://www.speakeasy.com/mcp/using-mcp/ai-agents/architecture-patterns

## Pattern 2: Toolhost Pattern (glassBead)
- Consolidates many operations behind a single dispatcher tool
- Manages efficiency at scale
- Source: https://glassbead-tc.medium.com/design-patterns-in-mcp-toolhost-pattern-59e887885df3

## Pattern 3: Gateway Pattern (Microsoft)
- **Repo:** https://github.com/microsoft/mcp-gateway
- Reverse proxy = single entry point for all MCP servers
- Unified tool discovery across servers
- Auth: Entra ID, OAuth 2.0, OIDC, SAML
- Role-based authorization + Zero Trust
- Centralized audit logging
- Session-aware routing
- Kubernetes native

Other gateway implementations:
- **Kong MCP Gateway** — Enterprise API gateway integration
- **Portkey** — Managed MCP gateway with observability
- **Agentic Community Gateway** — Open-source with OAuth

## Pattern 4: Composable Tools
- Small, focused tools that do one thing well
- Named with service prefix: `slack_send_message`, not `send_message`
- Snake_case universally (90%+ of servers)
- LLMs compose tools into workflows

## Pattern 5: Stateful Sessions
- Session ID tracking across requests
- Server maintains context between calls
- External storage (Redis/DB) for distributed deployments

## Naming Conventions (Industry Standard)
- Format: `{service}_{action}_{object}` e.g., `figma_get_tokens`
- Length: 1-64 characters, case-sensitive
- Allowed: alphanumeric, underscores, dashes, dots, forward slashes
- Start with verb: get, list, search, create, delete, update
- Source: https://zazencodes.com/blog/mcp-server-naming-conventions

## Deployment Maturity Levels

| Level | Transport | Auth | Analytics | Example |
|-------|-----------|------|-----------|---------|
| Individual | stdio | env vars | local logs | Personal Claude server |
| Team Shared | HTTP | basic auth / gateway | Supabase/DB | Team Figma/Confluence server |
| Enterprise | Gateway | OAuth2, RBAC | OTel + dashboards | Atlassian Remote MCP |
| Platform | Registry | SLA, versioning | Full observability | Composio, MindsDB |

## Key Decision: Single Server vs. One-Per-Service

**Single server (our choice):**
- One config entry for the team
- Shared analytics middleware
- Easier to adopt — lower barrier
- Risk: becomes a monolith

**One-per-service:**
- Independent deployment/scaling
- Clear ownership boundaries
- More config overhead
- Better for large orgs with many teams

**Our approach:** Start single, split later if needed. The analytics middleware makes splitting easy because it's a wrapper, not embedded in tool logic.

## Reference: Block's MCP Playbook
- Outcome-oriented tools (bundle related API calls)
- Tool stratification (read vs. write separation)
- Start atomic, watch for repeated tool sequences → bundle
- Don't over-aggregate (50+ tools = agent confusion)
- Source: https://engineering.block.xyz/blog/blocks-playbook-for-designing-mcp-servers
