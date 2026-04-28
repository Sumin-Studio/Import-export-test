# XDL layout kit (Xero Design Language — Web)

This folder is the **local copy** of the XDL web token kit used for product UI work in this repo.

| File | Purpose |
|------|---------|
| `layout.md` | Full spec: tokens, typography, spacing grid, rules, and usage guidance |
| `tokens.css` | Drop-in `:root` CSS custom properties (`--xdl-*`) |
| `tokens.json` | Structured token data for tooling |
| `kit.json` | Kit metadata |

**Consumption:** `tokens.css` is imported from `src/app/globals.css` so `--xdl-*` variables are available app-wide.

**Agents:** Follow `.cursor/rules/ui-xdl-layout.mdc` when editing UI.
