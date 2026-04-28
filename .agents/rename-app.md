# How to rename an app

Instructions to rename an existing app.

## When to Use

When the user asks to rename an existing app.

## Steps

Treat as a delete + add:
1. Tag the old entry in `apps.json` with `"deleted"` and `"renamed"`
2. Remove the old folder.
3. Create the new folder and new `apps.json` entry.

