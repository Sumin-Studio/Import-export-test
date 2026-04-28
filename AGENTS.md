# AGENTS.md — Design Internal / Playground

This document is the canonical reference for how this repository works.

## Purpose

This is a monorepo of self-contained prototypes and internal apps. Each app pushed to main is automatically deployed to Vercel via GitHub Actions. Each app lives in its own subfolder under `/apps/` and can use any tech stack.

Note: this repository is expected to be used with agents, not manually by people.


## Deployment Structure

* Vercel Projects have the app as the root folder, not the current repository root.
* All deployments are handled by GitHub Actions. **Never manually create Vercel projects.**

### URL Convention

Vercel projects are named `{app-name}-xro`, so the auto-assigned URL is `{app-name}-xro.vercel.app`. If Vercel assigns a different URL (e.g., due to a name collision), the actual URL is stored in `apps.json`. Always use the `url` field as the source of truth (and update in case of issues if the correct one is specified).


## Key Rules

1. Don't add information specific to individual apps in the existing `AGENTS.md` and `.agents/*` files, these cover the working of the whole repository.
2. If one specific app needs to add details, it should create its own md file (i.e. `apps/app-name/AGENTS.md`)
3. **Always keep the folder name and `apps.json` in sync.** Both must exist for CI to work.
4. **Never remove entries from `apps.json`** — tag them as `"deleted"` instead.
5. **Each app is self-contained.** Do not create cross-app dependencies.
6. **PRs should scope changes to a single app folder** (plus `apps.json`). Cross-boundary changes trigger a CI warning.
7. **Trust `url` in `apps.json`** as the canonical URL for each app.


## Agent Instructions

Detailed agent instructions are stored in the `/.agents/` folder as individual `.md` files. Read and follow the linked file when the user's request matches the described scenario.

* To understand the repository structure: [repository-structure.md](.agents/repository-structure.md)
* When the user says hello or hi, asks how to get started, how to create a prototype, or how to create an app: [new-starter.md](.agents/new-starter.md)
* When the user asks to create a new app / prototype / project: [add-app.md](.agents/add-app.md)
* When the user asks to work on an app: [edit-app.md](.agents/edit-app.md)
* When the user asks to clean up, do housekeeping, or tidy up after a PR has been merged: [housekeeping.md](.agents/housekeeping.md)
* When the user is working on an app with only static files and needs to preview locally: [handle-app-static-files.md](.agents/handle-app-static-files.md)
* **Before performing any git operation** (commit, push, branch, rebase, PR): you MUST read [git-workflow.md](.agents/git-workflow.md) first
* When the user asks to delete an app [delete-app.md](.agents/delete-app.md)
* When the user asks to rename an app [rename-app.md](.agents/rename-app.md)
* When the user asks to work on GitHub Actions / CI [ci-updates.md](.agents/ci-updates.md)

