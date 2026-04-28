#!/bin/bash

# Remove Prototype Script
# Cleanly removes a prototype from the monorepo
# Usage: ./remove.sh [prototype-number]

set -e

PROTOTYPE_NUM=$1

echo "═══════════════════════════════════════════════════"
echo "  Remove Prototype"
echo "═══════════════════════════════════════════════════"
echo ""

# If no number provided, show available prototypes
if [ -z "$PROTOTYPE_NUM" ]; then
  echo "Available prototypes:"
  echo ""

  FOUND=0
  for dir in xc-*/; do
    if [ -d "$dir" ]; then
      FOUND=1
      if [ -f "$dir/src/config/prototype-meta.json" ]; then
        ID=$(grep -o '"id": "[^"]*"' "$dir/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
        PROBLEM=$(grep -o '"problemStatement": "[^"]*"' "$dir/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
        DESIGNER=$(grep -o '"designer": "[^"]*"' "$dir/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
        CODER=$(grep -o '"coder": "[^"]*"' "$dir/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
        echo "  #${ID}: ${PROBLEM}"
        echo "      Team: ${DESIGNER} & ${CODER}"
        echo "      Directory: ${dir%/}"
        echo ""
      else
        echo "  ${dir%/} (no metadata)"
        echo ""
      fi
    fi
  done

  if [ $FOUND -eq 0 ]; then
    echo "  (none found)"
    echo ""
  fi

  echo "Usage: ./remove.sh <prototype-number>"
  echo "Example: ./remove.sh 05"
  exit 0
fi

# Find the prototype directory
PROTOTYPE_DIR=$(find . -maxdepth 1 -type d -name "xc-${PROTOTYPE_NUM}-*" | head -1)

if [ -z "$PROTOTYPE_DIR" ]; then
  echo "❌ Error: No prototype found matching 'xc-${PROTOTYPE_NUM}-*'"
  echo ""
  echo "Run './remove.sh' without arguments to see available prototypes."
  exit 1
fi

# Show what we're about to remove
echo "Found: $PROTOTYPE_DIR"
echo ""

if [ -f "$PROTOTYPE_DIR/src/config/prototype-meta.json" ]; then
  echo "Prototype details:"
  ID=$(grep -o '"id": "[^"]*"' "$PROTOTYPE_DIR/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
  PROBLEM=$(grep -o '"problemStatement": "[^"]*"' "$PROTOTYPE_DIR/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
  DESIGNER=$(grep -o '"designer": "[^"]*"' "$PROTOTYPE_DIR/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
  CODER=$(grep -o '"coder": "[^"]*"' "$PROTOTYPE_DIR/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)
  CREATED=$(grep -o '"createdAt": "[^"]*"' "$PROTOTYPE_DIR/src/config/prototype-meta.json" | head -1 | cut -d'"' -f4)

  echo "  ID: #${ID}"
  echo "  Problem: ${PROBLEM}"
  echo "  Team: ${DESIGNER} & ${CODER}"
  echo "  Created: ${CREATED}"
  echo ""
fi

# Check for uncommitted changes
if [ -d ".git" ]; then
  cd "$PROTOTYPE_DIR"
  if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    echo "⚠️  WARNING: This prototype has uncommitted changes!"
    git status --short
    echo ""
  fi
  cd ..
fi

# Confirm removal
echo "⚠️  This will permanently delete the directory and all its contents."
echo ""
read -p "Are you sure you want to remove this prototype? (y/N): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled. Prototype not removed."
  exit 0
fi

# Remove the directory
echo "🗑️  Removing $PROTOTYPE_DIR..."
rm -rf "$PROTOTYPE_DIR"

# Update the lockfile now that the workspace package is gone
echo "📦 Updating pnpm lockfile..."
pnpm install

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ Prototype Removed"
echo "═══════════════════════════════════════════════════"
echo ""
echo "Removed: $PROTOTYPE_DIR"
echo ""
echo "If this was committed to git, you may want to:"
echo "  git add -A"
echo "  git commit -m 'Remove prototype ${PROTOTYPE_NUM}'"
echo ""
echo "═══════════════════════════════════════════════════"
