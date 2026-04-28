# Conference Quick Start - Operator Cheat Sheet

**Xero Conference 2026** - Shared laptop workflow

---

## New Session

```bash
./create.sh
```

Prompts for: `#`, `problem statement`, `slug`, `designer`, `coder`, `day`

```bash
cd xc-01-*
pnpm dev
```

Open **Cursor** and start building on `src/pages/home.tsx`

---

## End Session

```bash
# Commit & push
git add xc-01-*/
git commit -m "Add prototype 01: [description]"
git push

```

---

## Commands

| Action | Command          |
| ------ | ---------------- |
| Setup  | `./create.sh`    |
| Dev    | `pnpm dev`       |
| Build  | `pnpm build`     |
| Remove | `./remove.sh 01` |

---

## Troubleshooting

| Issue       | Fix                           |
| ----------- | ----------------------------- |
| Port in use | `killall node`                |
| Build fails | `pnpm install` from repo root |

---

## Key Files

- **Build here**: `src/pages/home.tsx`
- **Metadata**: `src/config/prototype-meta.json`

**Need help?** → See [README.md](./README.md)
