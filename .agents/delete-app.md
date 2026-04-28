# How to delete an existing app

Instructions to delete an existing app.

## When to Use

When the user asks to delete / remove / shutdown an app.

## Steps

1. Delete the `/apps/{app-name}/` folder.
2. In `apps.json`, add `"deleted"` to the `tags` array for that app's entry. **Do NOT remove the entry** as it's used for tracking.
3. Inform the user they have to manually inform admins to delete the Vercel project from the Vercel dashboard (there is no automated teardown).
