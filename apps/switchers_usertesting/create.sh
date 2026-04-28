#!/bin/bash

# Prototype Template Setup Script
# Creates a new prototype with metadata and configuration

set -e

echo "═══════════════════════════════════════════════════"
echo "  Xero Conference 2026 - Prototype Setup"
echo "═══════════════════════════════════════════════════"
echo ""

# Get prototype details
echo "Prototype number (01, 02, 03, etc):"
read -r PROTOTYPE_NUM

echo ""
echo "Problem statement (short description):"
read -r PROBLEM_STATEMENT

echo ""
echo "Problem statement slug (kebab-case, e.g., 'invoice-payments'):"
read -r DESCRIPTION

echo ""
echo "Designer name:"
read -r DESIGNER_NAME

echo ""
echo "Coder name:"
read -r CODER_NAME

# Generate timestamp
TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S%z")
START_TIME=$(date +"%I:%M %p")
READABLE_DATE=$(date +"%d %b %Y, %I:%M %p")

# Create directory name
DIR_NAME="xc-${PROTOTYPE_NUM}-${DESCRIPTION}"

echo ""
echo "───────────────────────────────────────────────────"
echo "Creating: $DIR_NAME"
echo "───────────────────────────────────────────────────"

# Check if directory already exists
if [ -d "$DIR_NAME" ]; then
  echo "❌ Error: Directory $DIR_NAME already exists!"
  exit 1
fi

# Copy template
echo "📁 Copying template..."
cp -r template "$DIR_NAME"
cd "$DIR_NAME"

# Create prototype-meta.json
echo "📝 Generating prototype-meta.json..."
cat > src/config/prototype-meta.json <<EOF
{
  "id": "${PROTOTYPE_NUM}",
  "problemStatement": "${PROBLEM_STATEMENT}",
  "team": {
    "designer": "${DESIGNER_NAME}",
    "coder": "${CODER_NAME}"
  },
  "session": {
    "startTime": "${START_TIME}",
    "timestamp": "${TIMESTAMP}"
  },
  "createdAt": "${READABLE_DATE}"
}
EOF

# Create PROTOTYPE_LOG.md
echo "📋 Creating PROTOTYPE_LOG.md..."
cat > PROTOTYPE_LOG.md <<EOF
# Prototype Log — #${PROTOTYPE_NUM}: ${PROBLEM_STATEMENT}

**Team:** ${DESIGNER_NAME} (designer) · ${CODER_NAME} (coder)
**Started:** ${READABLE_DATE}

> This file is maintained by AI assistants. After each working session, the AI appends a summary of what was built, what was requested, and the current state of the prototype. Use it to get up to speed before continuing work.

---

<!-- Session entries are appended below by AI assistants -->
EOF

# Create .env.local
echo "⚙️  Creating .env.local..."
cat > .env.local <<EOF
VITE_PROTOTYPE_ID=${PROTOTYPE_NUM}
VITE_PROBLEM_STATEMENT=${DESCRIPTION}
VITE_DEPLOYMENT_URL=
EOF

# Update package.json name for monorepo
echo "📦 Updating package.json..."
if [ -f "package.json" ]; then
  # Use sed to update the name field
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/\"name\": \".*\"/\"name\": \"xc-${PROTOTYPE_NUM}-${DESCRIPTION}\"/" package.json
  else
    # Linux
    sed -i "s/\"name\": \".*\"/\"name\": \"xc-${PROTOTYPE_NUM}-${DESCRIPTION}\"/" package.json
  fi
fi

# Install dependencies from workspace root
echo "📦 Installing dependencies..."
cd ..
pnpm install
cd "$DIR_NAME"

# Initialize git (if not in monorepo)
if [ ! -d "../.git" ]; then
  echo "🔧 Initializing git..."
  git init
  git add .
  git commit -m "Initial commit: Prototype ${PROTOTYPE_NUM} - ${PROBLEM_STATEMENT}

Team: ${DESIGNER_NAME} & ${CODER_NAME}
Started: ${READABLE_DATE}"
fi

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ Prototype Ready!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "  Directory: $DIR_NAME"
echo "  ID: #${PROTOTYPE_NUM}"
echo "  Problem: ${PROBLEM_STATEMENT}"
echo "  Team: ${DESIGNER_NAME} & ${CODER_NAME}"
echo "  Started: ${READABLE_DATE}"
echo ""
echo "Next steps:"
echo "  1. cd $DIR_NAME"
echo "  2. pnpm dev"
echo "  4. Open Cursor and start coding!"
echo ""
echo "═══════════════════════════════════════════════════"
