# How to add a new app

Instructions for creating a new app / project / prototype.

## When to Use

When the user asks to create a new app, new prototype, or new project.

## Steps

1. Create a new git branch named "add-{app-name}".
2. Create a folder: `/apps/{app-name}/`
   - At minimum, include an `index.html` file.
   - The app must be **fully self-contained** — it has its own dependencies, build system, and configuration, without referring to other files outside its own app folder.
   - Default stack is plain HTML/CSS/JS. Apps may use any framework (Next.js, Vite, etc.) by including their own `package.json`.
   - **XDL prototypes:** Prefer [`scripts/scaffold-xdl-prototype.mjs`](../scripts/scaffold-xdl-prototype.mjs) from the repo root (see [`scripts/README.md`](../scripts/README.md)). It runs `pnpm dlx github:xero-internal-actions-poc/xdl-components` in the new app folder, then registers `apps.json` when the installer succeeds.
3. Add an entry to `apps.json` with the folder name as the key, use the apps.json schema for details (the XDL scaffold script does this after a successful run).
4. Open a PR to track changes, do not commit directly to `main` unless instructed (see "How To: Update an App")