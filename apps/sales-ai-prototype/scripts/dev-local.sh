#!/usr/bin/env bash
# Start the A2A Next.js app at http://localhost:3000 (Next default port).
# Works when `bun` is missing from PATH (e.g. some IDE terminals).
# Frees :3000 first so a stale dev server does not cause EADDRINUSE.
set -e
cd "$(dirname "$0")/.."
if command -v lsof >/dev/null 2>&1 && lsof -ti :3000 >/dev/null 2>&1; then
  echo "Port 3000 in use — stopping existing process..."
  lsof -ti :3000 | xargs kill -9 2>/dev/null || true
  sleep 1
fi
export PATH="${HOME}/.bun/bin:${PATH}"
if command -v bun >/dev/null 2>&1; then
  exec bun dev
fi
if [[ -x node_modules/.bin/next ]]; then
  # Match `npm run dev`: stale/mixed `.next` (webpack vs Turbopack) causes 500s and missing chunks.
  node scripts/clean-next.mjs
  exec ./node_modules/.bin/next dev -p 3000
fi
echo "No bun and no node_modules/.bin/next. Run one of:"
echo "  curl -fsSL https://bun.sh/install | bash"
echo "  then: bun install && bun dev"
echo "Or from repo root: npm install --legacy-peer-deps && npx next dev -p 3000"
exit 1
