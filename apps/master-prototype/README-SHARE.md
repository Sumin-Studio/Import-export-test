## Master prototype

Starter **Next.js** shell for interactive business UI demos (dashboards, lists, panels, sample flows).
In **design-internal** it lives at `apps/master-prototype` and is listed on the internal app index once deployed. Replace branding, copy, and data with your own when you fork or duplicate the project.

### Run locally (this folder)

Install and start the dev server (any of these package managers is fine):

```bash
npm install
npm run dev
```

Or with **pnpm** / **bun** if you prefer (`pnpm install` / `bun install`, then `pnpm run dev` / `bun run dev`).

Open [http://localhost:3000](http://localhost:3000).

### Run from the design-internal repo root

```bash
cd apps/master-prototype
npm install
npm run dev
```

### Registry

This app is registered in the monorepo `apps.json` as `master-prototype`. After merge to `main`, CI deploys it to Vercel and fills in `url` and `vercelProjectId` in `apps.json`.

### Optional: zip only this app (from repo root)

```bash
cd apps
zip -r master-prototype.zip master-prototype
```
