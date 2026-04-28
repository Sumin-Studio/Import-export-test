# How to work with GitHub Actions / CI

Instructions to work with GitHub Actions / CI scripts.

## When to Use

When the user asks any question or work related to GitHub Actions / CI scripts.


## Secrets

Secrets Required:

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel API token for deployments |
| `VERCEL_TEAM_ID` | Vercel team ID (used as org ID) |
| `VERCEL_ACCESS_GROUP_ID` | Vercel Access Group ID — projects are auto-added to this group on deploy |


## Workflows

### Automated (push / PR)

1. **deploy.yml** — Triggered on push to `main` (paths: `apps/**`, `apps.json`) **or manually via workflow_dispatch**. On push, detects changed and new apps automatically. On manual trigger, deploys a single app specified by folder name (`app_name` input). Creates Vercel projects if needed, deploys to production, and updates `apps.json` with Vercel metadata. When new apps are in the batch, `design-internal` is deferred to a separate `redeploy-home` job that runs after all matrix deploys finish (because `GITHUB_TOKEN` pushes don't trigger new workflow runs). After deploys complete, the `notify-pr` job updates the merged PR with per-app deploy results (success with URL, failure with link to the Actions run). To manually deploy: Actions → "Deploy Apps" → Run workflow → enter the app folder name.
2. **preview.yml** — Triggered on pull requests to `main` (paths: `apps/**`, `apps.json`). Skips bot PRs. Deploys preview builds for changed apps and posts preview URLs as PR comments.
3. **pr-check.yml** — Triggered on pull requests to `main`. Warns (does not block) if a PR touches files outside the app folder boundaries. `apps.json` is an allowed exception since apps need to modify it.
4. **pr-bot.yml** — Triggered on pull requests to `main`, runs only for `dependabot[bot]`. Comments on the PR with affected apps, skips preview deploy, and creates a passing `preview-deploy` status check so the PR is not blocked.
5. **pr-merge-comment.yml** — Triggered when a PR to `main` is closed and merged. Posts an immediate comment tagging the merger with revert instructions ("Revert" button + Vercel dashboard rollback) and a deploy status placeholder. The placeholder is later updated by the `notify-pr` job in `deploy.yml` with actual deploy results.

### Manual (workflow_dispatch)

6. **redeploy-home.yml** — Redeploys the `design-internal` home app. Called automatically by `deploy.yml` after new apps are deployed (so the home page picks up updated `apps.json` metadata). Can also be triggered manually if the automated deploy has failed; open an issue to document what went wrong.
7. **vercel-access-group-check.yml** — Audits all active apps and ensures they are members of the Vercel Access Group, adding any missing ones. Also detects stale projects in the group that are no longer in `apps.json`.
8. **vercel-security-check.yml** — Audits and enforces Vercel Deployment Protection (SSO/Vercel Authentication) across all active apps, enabling it for any unprotected apps.
9. **app-registry-audit.yml** — Audits `apps.json` against the filesystem and Vercel. Auto-tags apps whose folders no longer exist as `"deleted"` and reports status categories (ready / deployed / deleted / orphaned).
10. **vercel-verify-connection.yml** — Verifies that `VERCEL_TOKEN` and `VERCEL_TEAM_ID` secrets have the necessary permissions by testing token validity, team access, and a temporary project create/delete. Avoid running frequently.

> **Important:** `deploy.yml` and `preview.yml` share similar deployment logic (Vercel linking, root directory clearing, error handling). When modifying one, cross-reference the other to keep them in sync.


