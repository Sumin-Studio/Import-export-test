# The Builders Workshop

Internal program hub for Xero designers leveling up as “builders” with Cursor, GitHub, and AI-powered prototyping.

## What's Included

- **Program overview home** with hero, goals, and "Why it matters" storytelling
- **Interactive Getting Started** with step-by-step checklist and completion tracking
- **Progress tracker** backed by `src/data/builders.json`, visualized with Recharts
- **Builder profiles** at `/builders/[slug]` featuring milestones, badges, and sandbox notes
- **Clerk authentication** (Xero emails only) enforced through middleware
- **Supabase integration** for persistent milestone completion tracking
- **Confetti celebrations** when all Getting Started steps are completed 🎉
- **Fully typed utilities** in `src/lib/builders.ts` for loading builders, aggregating milestones, and powering charts

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com/) with design tokens tuned for the pilot
- [Recharts](https://recharts.org/en-US) for progress visualizations
- [Clerk](https://clerk.com/) for authentication (restricted to `@xero.com`)
- [Supabase](https://supabase.com/) for database and milestone tracking
- [Bun](https://bun.sh/) for package and script management

## Getting Started

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Configure Environment Variables**
   - Create a `.env.local` file with:
     ```bash
     # Clerk Authentication
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
     CLERK_SECRET_KEY=your-clerk-secret
     
     # Supabase
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
     
     # OpenAI
     OPENAI_API_KEY=your-openai-api-key
     ```

3. **Set up Supabase**
   - Run the SQL seed script in your Supabase SQL Editor:
     ```bash
     cat seed-milestones.sql
     ```
   - See `SUPABASE_SETUP.md` for detailed setup instructions

4. **Run the dev server**
   ```bash
   bun run dev
   ```
   The site is available at http://localhost:3000 (authentication kicks in immediately).

## Authentication Notes

- Middleware in `src/middleware.ts` guards all non-public routes.
- The default configuration only permits Xero (`@xero.com`) email addresses.
- Update `ALLOWED_EMAIL_DOMAINS` or `ALLOWED_EMAILS` in `.env.local` to refine access.

## Data Model

### Builder Data (JSON)
- Builder records live in `src/data/builders.json`.
- Utility helpers in `src/lib/builders.ts` expose:
  - `getBuilders()`, `getBuilderBySlug()`
  - `getMilestoneCompletion()` for chart + table
  - `getBuilderMilestones()` and `getLastUpdatedForBuilder()` for profile timelines
- Add new participants by appending to the JSON; each record supports optional GitHub + prototype links.

### Milestone Tracking (Supabase)
- **users** table: Syncs with Clerk authentication
- **milestones** table: Getting Started step definitions
- **milestone_completions** table: Tracks which users completed which steps
- API routes in `src/app/api/milestones/` handle completion tracking
- Database utilities in `src/lib/supabase/` manage data operations

## Key Routes

| Route | Purpose |
| ----- | ------- |
| `/` | Program overview, progress tracker, cohort list |
| `/getting-started` | Interactive checklist with completion tracking |
| `/builders/[slug]` | Builder sandbox with timeline, badges, notes |
| `/prototype-playground` | Showcase of design prototypes with git clone commands |
| `/sign-in`, `/sign-up`, `/sso-callback`, `/unauthorized` | Clerk flows & gating |
| `/api/milestones/*` | Milestone completion API endpoints |

## Scripts

- `bun run dev` — start development server (Turbopack)
- `bun run build` — production build (includes prototype builds)
- `bun run build:prototypes` — rebuild all prototypes in `design-prototypes/`
- `bun run start` — production server
- `bun run lint` — ESLint
- `bun run test` — Run tests (Vitest)
- `bun run typecheck` — Run TypeScript type checking

### Prototype Build Notes

The build script automatically skips prototypes that already have `build/` output (for fast CI builds). To force a full rebuild:

```bash
FORCE_PROTOTYPE_BUILD=true bun run build:prototypes
```

## Features

### Getting Started Tracking
- Interactive step-by-step checklist for onboarding
- Mark steps as complete/incomplete with visual feedback
- Green checkmark indicators for completed steps
- Completion dates shown in tooltips
- Confetti celebration when all steps are completed
- Persistent tracking across sessions via Supabase

### User Experience
- User profile picture in header (synced from Google via Clerk)
- Copy-to-clipboard for setup commands
- Expandable sections for additional context
- Responsive design for all screen sizes

## Prototype Playground

The Prototype Playground (`/prototype-playground`) showcases design prototypes created by team members. Each prototype is stored in the `design-prototypes/` directory as a standalone project.

### How It Works

1. **Adding a New Prototype**: 
   - Export your prototype from Figma Make (or other tools) and place it in `design-prototypes/{folder-name}/`
   - Update `src/components/home/prototype-playground-tab.tsx` to add your prototype to the `prototypes` array with:
     - Designer name
     - Brief summary of unique features
     - Exact folder name (must match the directory name in `design-prototypes/`)
     - `hasLocalCode: true` if the prototype has local code files

2. **Viewing Prototypes**:
   - The playground displays a simple list format with designer names and summaries
   - Each prototype has a "View App" button that links to `/prototypes/{slug}` (requires deployment setup)
   - A "Git Clone" command is provided using git sparse-checkout, allowing users to clone only the specific prototype folder they need

3. **Git Sparse-Checkout Pattern**:
   - This solves the "repo in repo" problem by letting users download only the prototype they want
   - Commands are generated automatically and can be copied with one click
   - Format: `git clone --filter=blob:none --sparse {repo-url} && cd {repo} && git sparse-checkout set design-prototypes/{folder-name}`

### Updating Prototype Source Files

**Important:** After modifying any prototype source files, you must rebuild and commit:

```bash
# 1. Make your changes to files in design-prototypes/{folder-name}/src/

# 2. Rebuild the prototype(s)
bun run build:prototypes

# 3. Commit both source AND build output
git add design-prototypes/
git commit -m "feat: update prototype"
```

The pre-built outputs are committed to git so CI builds skip rebuilding unchanged prototypes.

### For AI Agents

When adding new prototypes or updating the playground:
- Always match the `folderName` exactly to the directory name in `design-prototypes/`
- Keep summaries brief and focused on unique features
- The folder name is used to generate both the git clone command and the view URL slug
- Prototypes without local code can be added with `hasLocalCode: false` (they won't show clone/view buttons)
- **Always run `bun run build:prototypes` after modifying prototype source files**

## Future Enhancements

The codebase is structured for quick evolution:

- Hook builder progress directly to GitHub events or AI Fluency Tracker exports
- Add authenticated editing for milestones/notes (Confluence SSO or Clerk org roles)
- Embed Loom/Granola demos in builder sandboxes
- Extend charts with historical snapshots or velocity metrics
- Add more milestone types beyond Getting Started
- Deploy prototypes as subdirectories under `/prototypes/{slug}` for live viewing

## Deployment

Deploy to [Vercel](https://vercel.com/) or any Next.js-friendly host, ensuring environment variables are configured:
- Clerk authentication keys
- Supabase connection details
- Any custom domain configurations

The site currently ships as an authenticated internal hub, but static export is possible if authentication is relaxed.
