#!/usr/bin/env bash
# Stops anything on :3000, removes a corrupted .next dev cache, then starts Next (webpack, not Turbopack).
# Use when:
#   - Internal Server Error (500) or pages never finish loading
#   - Pages look unstyled (plain HTML, no layout) — often the error fallback, not missing CSS
#   - Terminal shows: Cannot find module './NNNN.js' (stale chunk after switching branches or Turbopack)
# Deleting .next while the dev server is still running can leave the server broken; always restart after rm.
# Quick restart without killing the port (you already stopped the server): npm run clean && npm run dev:skip-clean
set -e
cd "$(dirname "$0")/.."
if lsof -ti :3000 >/dev/null 2>&1; then
  echo "Stopping process on port 3000..."
  lsof -ti :3000 | xargs kill -9 2>/dev/null || true
  sleep 1
fi
echo "Removing .next (dev cache)..."
npm run clean
echo "Starting Next.js at http://localhost:3000 ..."
exec npm run dev:skip-clean
