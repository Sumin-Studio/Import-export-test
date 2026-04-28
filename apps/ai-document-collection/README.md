# AgenticCloud POC

Proof-of-concept for accountants to automate document collection from client cloud storage (Dropbox). Clients connect via OAuth, choose which folder the agent can scan, and an AI agent lists and classifies files using **Ollama** (local, free).

## Setup

### 1. Environment

Copy `.env.example` to `.env.local` and set:

- **DROPBOX_APP_KEY** / **DROPBOX_APP_SECRET** – Create an app at [Dropbox App Console](https://www.dropbox.com/developers/apps). Under "Redirect URI" add `http://localhost:3002/api/auth/dropbox/callback` (match your APP_URL port).
- **APP_URL** – `http://localhost:3002` if you run on port 3002 (see `package.json` scripts).

### 2. Ollama (document classification)

The app uses **Ollama** to classify files. By default it **extracts content** from each file and sends a text preview to Ollama:
- **PDFs**: text is extracted with pdf-parse.
- **Images** (jpg, png, etc.): **OCR** is run with Tesseract.js, then the text is sent to Ollama.
- **Text files** (.txt, .html, etc.): content is read directly.

When a scan runs (automatically after the client picks a folder, or when you click **Run agent scan**), each file is classified into: **Tax Documents**, **Payroll**, **Receipts**, **Invoices**, **Bank Statements**, or **Other**. You can turn off content extraction in **Settings** (filename-only mode is faster but less accurate).

1. Install [Ollama](https://ollama.com) and pull a model:

   ```bash
   ollama run llama3.2
   ```

2. **Keep the Ollama app running** (menu bar / system tray). The app calls `http://localhost:11434` when classifying.

3. Optional: in `.env.local` set **OLLAMA_HOST** or **OLLAMA_MODEL** if you use a different host or model (e.g. `OLLAMA_MODEL=llama3.1`).

### 3. Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3002/dashboard](http://localhost:3002/dashboard) (port 3002 is set in `package.json`).

## Flow

1. **Dashboard** – Table of clients. For each client: **Connect Dropbox** (OAuth) or **Send Onboarding Request** (Xero-themed modal).
2. **Client onboarding** – The client opens the link, connects their storage (Dropbox), then chooses which folder the agent can scan. After that, the client is marked "Connected".
3. **Client detail** – If connected, **Run agent scan** lists the Dropbox folder and classifies each file with Ollama (Tax Documents, Payroll, Receipts, Bank Statements, Other). Live feed and categorized file list use real scan results.

## Testing (Playwright)

E2E tests use **Playwright**. You can run them via CLI or use the **Playwright MCP** server in Cursor to drive the browser from the agent.

### Run tests via CLI

```bash
npm run test:e2e
```

With UI: `npm run test:e2e:ui`

### Test with Playwright MCP (Cursor)

1. Ensure Playwright MCP is enabled in Cursor (Settings → MCP). The config should use `"command": "npx"` and `"args": ["@playwright/mcp@latest"]`.
2. In Composer, ask the agent to test the app using Playwright MCP: e.g. navigate to `http://localhost:3002/dashboard`, take a snapshot, and verify the dashboard loads.

Project-level MCP config is in `.cursor/mcp.json` (playwright server). After changing MCP settings, restart Cursor so the server connects.

## Data

- Tokens and scan results are stored under `.agenticcloud/` (created automatically). Add `.agenticcloud` to `.gitignore` (already listed) so secrets and cache are not committed.
