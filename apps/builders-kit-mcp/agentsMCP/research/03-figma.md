# Figma MCP Implementations

## Official Figma MCP Server
- **Docs:** https://developers.figma.com/docs/figma-mcp-server/
- **Blog:** https://www.figma.com/blog/introducing-figma-mcp-server/
- Two modes: Remote (cloud-hosted, recommended) and Desktop (local)
- Currently free during beta, will become usage-based paid
- Features: design tokens, components, styles, Code Connect mappings, code generation
- Works with: Cursor, VS Code Copilot, Windsurf, Claude Code

## Community: GLips/Figma-Context-MCP
- **Repo:** https://github.com/GLips/Figma-Context-MCP
- Provides Figma layout information to AI coding agents
- Good for design-to-code workflows

## Jon's Existing Implementation
- **File:** `~/cmd/2025/spotter/src/lib/figma-mcp.ts`
- Custom client library with methods:
  - `getDesignTokens()` — Extract colors, typography, spacing
  - `generateCode()` — React/Vue/HTML generation with TS/JS options
  - `getFileStructure()` — Parse Figma node hierarchies
  - `getCodeConnectMap()` — Map components to code
- Session management and error handling with retries

## Jon's Figma Capture Tool
- **File:** `~/cmd/common/claudecode-config/commands/figma-capture.md`
- Captures web pages into Figma as editable frames
- Supports local and external URL capture via Playwright
- Handles Chrome CDP connections for authenticated sites

## Recommended Approach for agentsMCP

### Tools to expose:
1. `figma_get_tokens` — Extract design tokens from a file/frame
2. `figma_get_components` — List components with metadata
3. `figma_generate_code` — Generate code from a frame (React/HTML/CSS)
4. `figma_get_file_structure` — Parse node hierarchy

### Implementation strategy:
- **Option A:** Wrap the official Figma MCP via REST API
- **Option B:** Use Figma REST API directly (more control, no dependency on their MCP)
- **Recommended:** Option B — direct API access gives us analytics wrapping and custom response shaping

### API endpoints needed:
- `GET /v1/files/:file_key` — File structure
- `GET /v1/files/:file_key/nodes?ids=:node_ids` — Specific nodes
- `GET /v1/files/:file_key/styles` — Styles/tokens
- `GET /v1/files/:file_key/components` — Components

### Auth:
- Personal access token for POC (env var: `FIGMA_TOKEN`)
- OAuth 2.0 for team deployment later
