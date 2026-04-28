# New Starter Guide

Instructions for helping a user who wants to get started creating a new prototype or app in this repository.

## When to Use

When the user asks how to get started, how to create a prototype, how to create an app, or similar onboarding questions.

## Steps

1. **Explain what this repository is.** Tell the user:
   - This is a shared space for prototypes and internal tools. Each one lives in its own folder and is automatically deployed when merged — no manual setup needed.
   - The agent will handle all the scaffolding, registration, and setup. The user just needs to describe what they want to build.

2. **Gather what the user wants to build.** Ask the user:
   - What does it do? A brief description is enough.
   - What should it be called? Suggest a short name if the user doesn't have one.
   - Is it a **prototype** (exploring a Xero feature or product) or an **app** (a small tool with ongoing use)?
   - Who are the authors?

3. **Ask about the tech stack.** Help the user choose:
   - **Plain HTML/CSS/JS** — the simplest option, great for static prototypes. A single `index.html` is enough.
   - **Vite + React** — good for interactive UIs that benefit from components and state.
   - **XDL (xdl-components)** — use [`scripts/scaffold-xdl-prototype.mjs`](../scripts/scaffold-xdl-prototype.mjs) from the repo root; see [`scripts/README.md`](../scripts/README.md). Requires `pnpm` and an interactive run of the official installer.
   - Other frameworks are supported too — the only requirement is that the app is self-contained.

4. **Proceed with scaffolding.** Once the above is confirmed, follow `AGENTS.md` "How To: Add a New App" to scaffold the app, register it, and set up the branch/PR. The user does not need to know the details of these steps — just confirm that everything is being set up for them.

5. **Tell the user what's ready.** Once scaffolding is done, let them know:
   - Their app is set up and ready to work on.
   - They can start building by editing files in the app folder.
   - A preview deployment will be available on the PR.
   - When they're happy, merging the PR to `main` will deploy it live automatically.
