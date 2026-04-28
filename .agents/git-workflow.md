# Git Workflow

Instructions for branching, committing, and opening pull requests.


## When to Use

When creating or updating apps, or any time changes need to be committed and pushed.


## Branching

- Always work on a feature branch, not directly on `main`.
- Create a branch before making changes (e.g., `git checkout -b {branch-name}`).
- Suggest going through a pull request so the user gets a preview deployment before merging to main.


## Committing

- **Do not commit on the user's behalf.** Let the user manually review staged changes and commit themselves.
- Before creating a PR, instruct the user to review, stage, and commit their changes.
- Once work is done, provide in a code block a suggested commit message following the standard below.


## Pull Requests

- After the user has committed and pushed, provide the link to open a new PR: `https://github.com/xero-internal-actions-poc/design-internal/pull/new/{branch-name}`
- Remind the user that a preview deployment will be available once the PR is created.



## Commit Message Prefixes

Use the following standard for commit messages:
{type}({scope}): {description}

Scope:
* "home": the commit concerns the `design-internal` app (`/apps/design-internal/`)
* "actions": the commit concerns any GitHub Action (`.github/workflows/`)
* "readme": the commit is exclusively or primarily about README changes
* "agents": the commit concerns agent instructions (`.agents/`, `AGENTS.md`, `CLAUDE.md`, etc.)
* Anything else should be the folder name of the app (i.e. "client-readiness-prototype")

Type:
* "fix": a bug fix
* "feat": a new feature
* "build": changes that affect the build system or external dependencies
* "chore": changes that are simply updates of libraries but don't affect functionality, build, fix bugs, or else
* "ci": changes to CI configuration (i.e. GitHub Actions)
* "docs": change that affect only documentation
* "style": change that do not affect the meaning of the code (white-space, formatting, etc)
* "refactor": change that neither fixes a bug nor adds a feature
* "perf": change that improves performance
* "test": change to add tests or correcting existing tests

When new apps get created for the first time, use "feat", scope as the app, and start the description with "new app:" followed by a short summary of the app scope.

Examples:
* fix(home): correct typo in apps.json failing build
* feat(mtd-it-transaction-allocation): introduced abilit to add/remove transactions
* feat(client-readiness-prototype): new app: prototype of the new generated insights feature


## Rebase

When asked to rebase:

1. Fetch, stash, rebase, and pop in one command:
   ```bash
   git fetch origin main && git stash && git rebase origin/main && git stash pop
   ```
   If there are no local changes, `git stash pop` may fail — that's fine.

2. If there are merge conflicts, resolve them, then:
   ```bash
   git add <conflicted-files>
   GIT_EDITOR=true git rebase --continue
   ```
   Make sure to inform the user what conflicts were resolved, and point out to double check.

3. After rebasing, force push with lease:
   ```bash
   git push --force-with-lease origin <branch-name>
   ```


## Default remote when `fork` exists

If a user is working from a fork, infom them that forks won't preview, and that the expectation is for users to work on a clone of the main repository, and use branches and PRs. This would also stop them to merge due to security reasons.

Some clones add a second remote (e.g. `fork`) pointing at a personal GitHub fork. **CI and Vercel previews run on `xero-internal-actions-poc/design-internal`**, not the fork.

- Set **`remote.pushDefault`** to **`origin`** in this repo so a plain `git push` goes to the org:  
  `git config remote.pushDefault origin`
- Set each feature branch’s **`branch.<name>.remote`** to **`origin`** (not `fork`) so tracking matches.
- Keep **`fork`** only if you still want `git push fork <branch>` occasionally; it is optional.
