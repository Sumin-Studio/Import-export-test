# Confluence MCP Implementations

## Official Atlassian Remote MCP Server
- **URL:** https://www.atlassian.com/platform/remote-mcp-server
- **Blog:** https://www.atlassian.com/blog/announcements/remote-mcp-server
- Cloud-based bridge for Jira, Compass, and Confluence
- OAuth 2.1 or API token authentication
- Permission-aware: respects existing project/space roles
- Currently free during early access

## Community: mcp-atlassian
- **Repo:** https://github.com/sooperset/mcp-atlassian
- Supports both Cloud and Server/Data Center
- Python implementation

## Community: mcp-server-atlassian-confluence
- **Repo:** https://github.com/aashari/mcp-server-atlassian-confluence
- Node.js/TypeScript implementation
- Features:
  - List/get spaces and pages (Markdown formatted)
  - Search via CQL (Confluence Query Language)
  - Bulk create pages and Jira items

## Recommended Approach for agentsMCP

### Tools to expose:
1. `confluence_search` — CQL search across spaces
2. `confluence_get_page` — Get page content as markdown
3. `confluence_list_spaces` — List accessible spaces

### Implementation strategy:
- Use Confluence REST API v2 directly
- Convert HTML content to Markdown for LLM consumption
- CQL for powerful search (supports text, labels, spaces, dates)

### API endpoints needed:
- `GET /wiki/api/v2/spaces` — List spaces
- `GET /wiki/api/v2/pages/:id` — Get page
- `GET /wiki/api/v2/pages/:id?body-format=atlas_doc_format` — Structured content
- `GET /wiki/rest/api/content/search?cql=...` — CQL search

### Auth:
- API token + email for POC (env vars: `CONFLUENCE_TOKEN`, `CONFLUENCE_EMAIL`, `CONFLUENCE_BASE_URL`)
- OAuth 2.0 for team deployment

### CQL Examples:
```
type=page AND space=DS AND text~"design tokens"
type=page AND label="component-spec"
type=page AND creator=currentUser() AND lastModified > now("-7d")
```
