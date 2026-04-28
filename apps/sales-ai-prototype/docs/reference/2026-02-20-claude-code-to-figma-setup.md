# Claude Code to Figma — Setup and Process

**Date:** 2026-02-20  
**Source:** [Figma blog](https://www.figma.com/blog/introducing-claude-code-to-figma/), [Figma developer docs – Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)

## What it is

**Code to Canvas** captures a live UI from the browser (localhost, staging, or production) and turns it into **editable Figma frames** (layers, auto-layout, structure preserved), not just a screenshot. You can then paste into any Figma file or send directly to a new/existing Figma Design file.

## Important: Claude Code only

The **capture-to-Figma** flow uses the MCP tool `generate_figma_design`, which is **Claude Code only** and **remote Figma MCP server only**. It is not available in Cursor or other MCP clients at this time.

- **In Claude Code:** Full flow — capture browser UI → send to clipboard or to a Figma file.
- **In Cursor:** You have **figma-console** (Figma Desktop plugin bridge). You can do **Figma → code** (e.g. generate code from selection). Code → Figma capture is not available in Cursor; use Claude Code for that.

## Setup in Claude Code (for Code → Figma)

1. **Add the remote Figma MCP server**
   ```bash
   claude mcp add --transport http figma https://mcp.figma.com/mcp
   ```
   Optional: use `--scope user` to make it available in all projects:
   ```bash
   claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
   ```

2. **Restart Claude Code** so it picks up the new server.

3. **Authenticate**
   - In Claude Code, type `/mcp`.
   - Select the **figma** server.
   - Choose **Authenticate** and complete the Figma OAuth flow (Allow Access).

4. **Capture your UI**
   - Have your app running (e.g. `bun run dev` for this project).
   - In Claude Code, use prompts like:
     - **To clipboard:** “Start a local server for my app and capture the UI to my clipboard.”
     - **To existing file:** “Start a local server for my app and capture the UI in [Figma file URL].”
     - **To new file:** “Start a local server for my app and capture the UI in a new Figma file.”
   - If the server is already running, you can shorten to: “Capture the UI to my clipboard” (or “to this file” / “to a new file”).

5. **In the browser**
   - Claude starts the server (if needed), injects the Code-to-Figma script, and opens a browser.
   - Use the **Claude Code to Figma** toolbar in that window:
     - **Select element** — capture a specific element.
     - **Entire screen** — capture the full view.
   - When done: paste from clipboard into Figma, or click **Open file** if sending to a file.

## Optional: Figma MCP in Cursor (Figma → code only)

To get **design-to-code** in Cursor (e.g. “generate code from this Figma frame”), add the official Figma remote MCP in Cursor. That does **not** enable “send this to Figma” in Cursor; it only enables reading from Figma and generating code.

- **Cursor:** MCP → Install MCP Server → use Figma’s [deep link](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) or add to `mcp.json`:
  ```json
  "figma": {
    "url": "https://mcp.figma.com/mcp",
    "type": "http"
  }
  ```
- Then Connect → Allow Access. After that, paste a Figma frame/layer link and ask Cursor to implement it.

## References

- [From Claude Code to Figma (Figma blog)](https://www.figma.com/blog/introducing-claude-code-to-figma/)
- [Figma MCP server – Remote installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
- [Figma MCP – Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) (includes `generate_figma_design`)
- [Figma Help: Figma MCP collection / desktop server](https://help.figma.com/hc/en-us/articles/35281186390679)
