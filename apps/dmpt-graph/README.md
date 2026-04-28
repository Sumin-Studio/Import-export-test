# DMPT Graph (web)

Package manager: **Yarn** (pinned via [`packageManager`](./package.json) for Corepack).

## Setup

```bash
corepack enable
cd web
yarn install
```

## Scripts

| Command        | Description      |
| -------------- | ---------------- |
| `yarn dev`     | Next.js dev server |
| `yarn build`   | Production build   |
| `yarn start`   | Run production build |
| `yarn lint`    | ESLint               |
| `yarn test`    | Node test runner     |

Registry/auth follows [`.npmrc`](./.npmrc) in this folder (e.g. Artifactory). Run installs on a machine where that auth works.

## Environment variables

Copy [`.env.example`](./.env.example) to **`.env.local`** inside `web/` for local development. **Never commit secrets.** After changing Jira variables, restart `yarn dev` so Next.js reloads env (leading/trailing spaces on values are trimmed automatically).

| Area | Purpose |
| --- | --- |
| `JIRA_*` | Server-side reads for `/api/graph` and `/api/issues/[key]`. |
| `JIRA_GRAPH_STATUSES`, `JIRA_GRAPH_JQL`, `JIRA_GRAPH_DEBUG` | Optional graph JQL tuning (comma-separated statuses, full JQL override, or `?debug=1` to echo the query). |
| `MAX_GRAPH_ISSUES` | Cap on Jira issues loaded for `/api/graph` (default **80**). |
| `PORTKEY_*` | Server-side AI summaries (optional). |
| `NEXT_PUBLIC_JIRA_BASE_URL` | Client “Open in Jira” links only. |

## Vercel (Hobby)

1. Import this GitHub repo in Vercel and set **Root Directory** to `web` (or deploy from the `web` folder only).
2. Add the same variables to **Production**; for hackathon demos, mirror them to **Preview** so PR previews are not fixture-only.
3. Keep **Preview deployments** enabled for review.

Post-MVP Jira writes (create/update/archive), webhooks, and cron are intentionally out of scope for this MVP.
