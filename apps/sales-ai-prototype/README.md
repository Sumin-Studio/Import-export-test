# Bill AI Automation

We're running a design sprint for Bill AI Automation at Xero. Stay tuned.

**Where to start:** [docs/status/PROJECT-STATUS.md](docs/status/PROJECT-STATUS.md) (latest state) · [docs/status/INDEX-whats-stored-and-next-steps.md](docs/status/INDEX-whats-stored-and-next-steps.md) (inventory) · [CHANGELOG.md](CHANGELOG.md) (recent changes)

**What’s live:** Only the [walkthrough (slides)](#walkthrough-slides) is deployed on Vercel. The API and concept explorer run locally.

**Next.js app (repo root):** Serves at **http://localhost:3000** while the dev server is running (Next default port).

1. In Cursor: **Terminal → New Terminal** (or menu **View → Terminal**). If the shortcut did nothing, use the menu so the bottom panel opens.
2. Run: `./scripts/dev-local.sh` from the repo root (adds Bun to PATH, then starts Next), or **`npm run dev`** from the repo root.

**`npm run dev`**, **`npm run dev:fast`**, and **`bun dev`** all delete `.next` before starting webpack dev, so you do not reuse a stale or mixed webpack/Turbopack cache (the usual cause of Internal Server Error, missing `/_next` chunks, and pages with no CSS). **Turbopack:** `npm run dev:turbo` also cleans first (via `clean-next.mjs`). For a faster restart only when you are sure the cache is good (same mode, no branch switch): **`npm run dev:skip-clean`**.

The Figma MCP **capture.js** script is **opt-in** (`NEXT_PUBLIC_ENABLE_FIGMA_MCP_CAPTURE=true` in `.env.local`) so a blocked or failed third-party load does not destabilise everyday dev.

**If the app is still broken:** Run **`npm run dev:clean`** (stops port 3000, removes `.next`, starts webpack dev). Or manually: stop the dev terminal, `npm run clean`, then `npm run dev:skip-clean`. Avoid running two dev servers on the same port. As a fallback: `npm run build && npm run start:3000` (production mode, no dev cache).

Or manually without the helper script: `export PATH="$HOME/.bun/bin:$PATH"` then `bun dev`. If `bun: command not found` persists, install Bun or run `npm run dev` after `npm install --legacy-peer-deps`.

## Confluence hub

This repo now includes a shared Cursor-to-Confluence workflow for the payments agents hub.

- Source of truth: `src/data/agent-hub.ts`
- Local setup: copy `.env.example` to `.env.local`
- Preview changes: `bun run confluence:bootstrap-hub --dry-run`
- Sync changes: `bun run confluence:bootstrap-hub`
- Read back a page: `bun run confluence:read-page <pageId>`

See [docs/reference/2026-03-09-cursor-confluence-agent-hub.md](docs/reference/2026-03-09-cursor-confluence-agent-hub.md) and [scripts/confluence/README.md](scripts/confluence/README.md).

## Prototype (Bills Payment Agent API)

Tauqir’s prototype lives in **`api/`**: a FastAPI service that uses the Xero LLM Gateway to generate cash-aware payment plans for bills.

**Run the API:**

```bash
cd api
make install   # first time: creates venv, installs deps
cp .env.example .env
# Edit .env and set LLM_GATEWAY_API_KEY (and optional LLM_GATEWAY_BASE_URL / model)
make dev
```

- **API base:** http://localhost:8000  
- **Swagger UI:** http://localhost:8000/docs  
- **Health:** http://localhost:8000/health  

**Try the agent:** `POST /bills-agent/payment-plan` with a list of bills and an optional user message; see `api/README.md` for request/response shape and mock data.

The **web app** at `/prototype` (when you run `web/`) is a placeholder for a future UI that will call this API.

## Explorations catalog (web app)

The concept explorer lives in the Next.js app under `web/`.

**Run locally:**

```bash
cd web
bun run dev
```

Then open **http://localhost:3000** for a links page; **Explorations** is the main entry. Sign in with Clerk if prompted (e.g. `@xero.com`).

- **Grid:** All 99 concepts (33 per swim lane) in a responsive grid.
- **Query:** Use the search box and submit — matching concepts **light up** (amber highlight), non-matches dim. Matches are sorted to the top by recommendation rank.

## Walkthrough and app (Vercel)

The Next.js app (walkthrough, explorations, prototypes) deploys from the repo root.

- **Deploy:** `vercel --prod` from repo root (or connect the repo in Vercel for auto-deploys).
- **Clerk (login):** In Vercel → Project → Settings → Environment Variables, add:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (from [Clerk Dashboard](https://dashboard.clerk.com))
  - `CLERK_SECRET_KEY`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/app/sign-in` (so protected routes redirect to our sign-in page)
  Without the Clerk keys, the app still runs but sign-in is disabled (WIP banner only). Without the sign-in URL, redirects may go to Clerk’s default path instead of `/app/sign-in`.
- **Allow any email on deploy:** To let non-@xero.com users sign in (e.g. for demos), add:
  - `NEXT_PUBLIC_ALLOW_ALL_EMAIL_DOMAINS=true`
  Leave unset to keep @xero.com-only access.
