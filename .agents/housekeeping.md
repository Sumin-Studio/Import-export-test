# Housekeeping

Instructions for cleaning up after a branch/PR workflow is completed.

## When to Use

When the user asks to do "housekeeping" or "cleanup" after work on a branch has been completed and the PR has been merged.

## Steps

1. **Check the current branch.** Run `git branch --show-current` to identify the working branch.
   - If already on `main`, inform the user there is nothing to clean up.

2. **Check if the branch has been deleted on GitHub.** Run `git ls-remote --heads origin {branch-name}` to verify the remote branch no longer exists.
   - If the remote branch still exists, inform the user the branch has not been deleted on GitHub yet. Ask them to merge and delete the branch on GitHub first before running housekeeping.

3. **Switch to main and pull latest.** Run `git checkout main && git pull` to switch back to main and get the latest changes (including the merged PR).

4. **Delete the local branch.** Run `git branch -d {branch-name}` to remove the local working branch.
   - If the branch cannot be deleted (e.g., unmerged changes), inform the user and suggest using `git branch -D {branch-name}` only if they confirm the work is safe to discard.

5. **Inform the user.** Summarize what was done:
   - Switched back to `main`
   - Pulled latest changes
   - Deleted local branch `{branch-name}`
