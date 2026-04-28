# Scripts

## `scaffold-xdl-prototype.mjs`

Scaffolds a new **XDL** prototype under `apps/{slug}/` using:

```bash
pnpm dlx github:xero-internal-actions-poc/xdl-components
```

The xdl-components tool is **interactive** (e.g. template selection). The script creates the app folder, runs that command with `stdio` inherited, then—on success—adds a `prototype` entry to root `apps.json`.

### Prerequisites

- [pnpm](https://pnpm.io/) on your `PATH`
- Network access to install/run the GitHub package

### Spike notes (CLI behaviour)

- `pnpm dlx github:xero-internal-actions-poc/xdl-components --help` may still open the interactive wizard rather than printing help only.
- Run the installer **inside** `apps/{slug}/` (this script sets `cwd` there).
- If the tool creates a nested directory or uses a different folder name, move or rename so the final app root is `apps/{slug}/` to match CI and `apps.json`.

### Usage

From the **repository root**:

```bash
node scripts/scaffold-xdl-prototype.mjs <slug> \
  --name "Display name" \
  --description "Short description" \
  [--authors "Full Name,Other Name"] \
  [--latest-update "2026 Apr 8"]
```

- **slug**: kebab-case folder name (must match the `apps.json` key and `apps/{slug}/` path).
- **authors**: comma-separated full names. Defaults to `git config user.name` if omitted.

Optional: pass extra args through to the installer after `--`:

```bash
node scripts/scaffold-xdl-prototype.mjs my-demo \
  --name "My demo" \
  --description "..." \
  --authors "You" \
  -- --some-flag
```

### After it runs

Follow the printed next steps: commit `apps/{slug}/` and `apps.json`, open a PR (e.g. branch `add-{slug}`). See [AGENTS.md](../AGENTS.md) for deploy and preview behaviour.

For non-XDL apps (plain HTML, hand-rolled Vite, etc.), use [.agents/add-app.md](../.agents/add-app.md) instead.
