#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

# Prompt for release type
echo ""
echo "Select release type:"
echo "  1) patch  (0.1.0 → 0.1.1)"
echo "  2) minor  (0.1.0 → 0.2.0)"
echo "  3) major  (0.1.0 → 1.0.0)"
echo ""
read -rp "Enter choice [1/2/3]: " choice

case "$choice" in
  1) bump="patch" ;;
  2) bump="minor" ;;
  3) bump="major" ;;
  *) echo "Invalid choice"; exit 1 ;;
esac

current=$(node -p "require('./package.json').version")
echo ""
echo "Current version: v$current"
echo "Bumping: $bump"
echo ""

# Bump version (no git tag — we tag after building)
npm version "$bump" --no-git-tag-version
new_version=$(node -p "require('./package.json').version")
echo "New version: v$new_version"

# Build templates and CLI
echo ""
echo "Building templates and CLI..."
pnpm --filter create-xdl-components build

# Stage and commit everything
git add package.json packages/create-xdl-components/templates/ packages/create-xdl-components/dist/
git commit -m "release: v$new_version"

# Tag and push
git tag "v$new_version"
git push
git push --tags

echo ""
echo "Released v$new_version"
echo ""
echo "Consumers can now use:"
echo "  pnpm dlx github:xero-internal-actions-poc/xdl-components#v$new_version my-project"
