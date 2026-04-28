# How to edit an existing app

Instructions to work on an existing app.

## When to use

When the user asks to work on an existing app.

## Preparation

1. Make sure you are working on a branch, not `main`. Only the repository managers should work directly in `main`, or when working only on non-app files.
2. If `main`:
  - Create a new branch. 
  - Inform the user the branch has been created and that all changes are happening there.
  - Provide the link to open a new PR: `https://github.com/xero-internal-actions-poc/design-internal/pull/new/{branch-name}`
  - Inform the user that they can preview work in the branch, and that once work is completed they need to merge the PR to main.
3. If already on a branch, provide the PR link, then continue.


## Work

* As work proceeds, commit and push updates to the branch, remind user to check the PR for preview deployment.
* Work inside the app folder.
* If there's an AGENTS.md, read it.
* If the user asks to change any file outside the app folder, ask if they are sure as this can affect others.
* Make sure there's an AGENTS.md inside the app folder that contains the outline of the work, so it's easier later to understand it. 
* Make sure that in in `apps.json` the latest update date field (i.e. `"latestUpdate"`) is up-to-date 

