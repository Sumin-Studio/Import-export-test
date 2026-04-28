# XDL Design System

A Next.js 16 + React 19 component library and design system built with shadcn/ui, Tailwind CSS, and Radix UI.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the design system reference.

## Creating a New Project

Scaffold a new project using the XDL design system:

```bash
pnpm dlx github:xero-internal-actions-poc/xdl-components#v0.1.0 my-project
```

Replace `v0.1.0` with the latest release tag. You'll be prompted to choose a template:

- **Full** — includes design system docs & component showcase
- **Minimal** — components & design tokens only (no demo pages)

## Scripts

| Script              | Description                            |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Start dev server with Turbopack        |
| `pnpm build`        | Production build                       |
| `pnpm lint`         | Run ESLint                             |
| `pnpm create:build` | Build the CLI and regenerate templates |
| `pnpm release`      | Build, tag, and push a new release     |

## How Templates Work

The `packages/create-xdl-components/templates/` directory is **auto-generated** from the root `src/` by the `build-templates` script. Never edit template files directly — they will be overwritten.

When you push changes to `src/` on `main`, a GitHub Actions workflow automatically regenerates and commits the updated templates.

### Adding a New Component

1. Add your component to `src/components/ui/`
2. Push to `main`
3. CI auto-regenerates both templates (default and minimal)
4. Run `pnpm release` to tag a new version

Both the Full and Minimal templates receive all UI components. The Minimal template only differs by not including demo pages (`color-palette`, `icons`, `typography`, etc.).

## Releasing a New Version

Run the release script:

```bash
pnpm release
```

You'll be prompted to choose `patch`, `minor`, or `major`. The script will:

- Auto-bump the version in `package.json`
- Rebuild templates and the CLI from current `src/`
- Commit everything as `release: vX.Y.Z`
- Create a git tag and push

Alternatively, you can trigger the **Release** workflow from the GitHub Actions tab, which does the same thing via CI.

### Manual Release (Without the Script)

```bash
npm version minor --no-git-tag-version
pnpm create:build
git add package.json packages/create-xdl-components/templates/ packages/create-xdl-components/dist/
git commit -m "release: v0.2.0"
git tag v0.2.0
git push && git push --tags
```

## Project Structure

```
src/                          # Source of truth for all components
  components/ui/              # Reusable UI components (shadcn/ui)
  components/global/          # App-level providers
  components/design-system-tools/  # Demo/showcase components
  app/                        # Next.js pages
packages/
  create-xdl-components/      # CLI scaffolding tool
    scripts/build-templates.ts  # Generates templates from root src/
    templates/                  # Auto-generated (do not edit)
    dist/                       # Compiled CLI
```
