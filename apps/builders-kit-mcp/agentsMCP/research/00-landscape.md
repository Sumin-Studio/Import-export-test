# MCP Ecosystem Landscape

## Official Resources
- **Spec:** https://modelcontextprotocol.io/specification/2025-11-25
- **Architecture:** https://modelcontextprotocol.io/docs/learn/architecture
- **Best Practices:** https://modelcontextprotocol.io/docs/best-practices/
- **Build a Server:** https://modelcontextprotocol.io/docs/develop/build-server

## Official SDKs

| SDK | Language | Repo | Notes |
|-----|----------|------|-------|
| TypeScript | TS/JS | `modelcontextprotocol/typescript-sdk` | Runs on Node, Bun, Deno. Stdio/HTTP/WS transports. |
| Python | Python | `modelcontextprotocol/python-sdk` | FastMCP built-in. Type hints = tool definitions. |
| FastMCP (TS) | TS | `punkpeye/fastmcp` | Rapid dev, built on official SDK |

## Top Repos (by stars)
- **modelcontextprotocol/servers** — 83.3k stars. Official collection (Filesystem, Git, Memory, etc.)
- **Composio** — 39k stars. 500+ app integrations in one server
- **Pipedream** — 11k stars. 2,500 APIs, 8,000+ prebuilt tools
- **GhidraMCP** — 8.2k stars. Reverse engineering for LLMs
- **GitHub MCP Server** — Official. 93+ tools
- **Figma MCP Server** — Official. Design tokens, components, code gen
- **Atlassian Remote MCP** — Official. Jira + Confluence, OAuth

## Curated Lists
- `wong2/awesome-mcp-servers` — 34 categories
- `tolkonepiu/best-of-mcp-servers` — Weekly-updated ranked list
- **Official Registry:** https://registry.modelcontextprotocol.io/

## Framework Selection Guide
- **TypeScript** — Best for OpenAPI spec auto-generation, Node/React teams
- **Python** — Best for data science, rapid prototyping, decorator-based dev
- **Go** — Best for high-performance microservices

## Transport Options
- **Stdio** — Local process communication (dev)
- **HTTP/HTTPS** — Network API access (remote/team)
- **WebSocket** — Real-time bidirectional
- **Streamable HTTP** — Session-aware with state persistence
