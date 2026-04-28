
# Repository Structure

## Key details

* Apps (also called "projects" or "prototypes") exist in self-contained folders under `apps/`.
* `apps.json` is the source of truth for all apps.
* `/apps/design-internal/` is a special app (also called "home" or "launcher") that handles the navigation to all other apps.


## Overview

```
/
├── .agents/                # Agent-specific instructions (referenced from this file)
│   └── housekeeping.md     # Post-PR cleanup instructions
├── apps/                   # All apps live here
│   ├── design-internal/    # Special app: renders an index of all apps from apps.json
│   ├── {app-name}/         # Each app is fully self-contained
│   └── ...
├── apps.json               # Registry of all apps (source of truth)
├── scripts/                # Repo utilities (e.g. XDL prototype scaffold)
├── AGENTS.md               # This file
├── CLAUDE.md               # Points to AGENTS.md for Claude Code compatibility
├── README.md               # Brief overview with pointer here
└── .github/workflows/      # CI/CD automation
```

## apps.json Schema

`apps.json` is the **source of truth** for all registered apps. It is a JSON object where each key is the app's folder name under `/apps/`, or a slug for **external** entries (prototypes hosted outside this repo; see Tags).

```json
{
  "my-app": {
    "name": "My App",
    "description": "What this app does",
    "latestUpdate": "2026 Jan 21",
    "vercelProjectId": null,
    "url": null,
    "tags": [],
    "authors": []
  }
}
```

| Field | Type | Description |
|---|---|---|
| `name` | string | Human-readable display name, short, ideally 1-3 words |
| `description` | string | Brief description of the app |
| `latestUpdate` | string | Latest update merged to main (format: YYYY MMM DD) |
| `vercelProjectId` | string \| null | Vercel project ID. Set to `null` when creating a new app — CI fills this automatically on first deploy. |
| `url` | string \| null | The live URL. Set to `null` when creating — CI fills this automatically. This is the source of truth for the app's URL. |
| `tags` | string[] | Array of tags for categorization and lifecycle. See "Tags" section below. |
| `authors` | string[] | List of contributor full names (e.g., "Erin Casali"). |
| `repositoryUrl` | string (optional) | URL of the source repository (e.g. GitHub). Useful for external prototypes so the showcase can link to the repo. |

### Tags

- `"prototype"` — the app is categorized as a prototype, referring to design work building Xero features or products.
- `"app"` — the app is categorized as a mini app that has some kind of functionality it fulfills, usually to improve the quality and speed of design work.
- `"deleted"` — the app has been decommissioned. Its folder has been removed but the entry remains in `apps.json` as a historical record. CI skips apps with this tag.
- `"external"` — the app or prototype is **not** in this monorepo; it lives in another repo (e.g. another GitHub repo) and is deployed elsewhere (e.g. Vercel). There is no folder under `/apps/`. The entry is only used so the design-internal showcase can list and link to it. Use `url` for the live URL and optionally `repositoryUrl` for the source repo. CI does not deploy external entries and the app-registry audit does not require a folder for them.
- `"repository-app"` - this trigger special deployment for the 'home' apps (such as copying before build `apps.json` in the app root)
- Additional tags may be added in the future for categorization.


## Special Apps

### design-internal

The `/apps/design-internal/` app — also referred to as the **home** or **launcher** app — is a special app that during build copies `apps.json` in its own folder and renders an index of all available apps. It is deployed like any other app.