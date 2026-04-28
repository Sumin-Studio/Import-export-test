# Changelog

## [Unreleased]

### Added
- **Design prototype**: `design-prototypes/get-paid-replica-starter` — Next.js invoice/payments UI prototype (tracked in-repo; removed nested `.git` so it is not a submodule).

### Fixed
- **Step rows (expand/collapse)**: Unified collapsed and expanded header layout on Getting Started, Building Stuff, and Connecting to GitHub so the title row and completion switch stay aligned when toggling; reserved a fixed-width slot for the “···” / Dismiss control to avoid horizontal jump.
- **Step rows (vertical alignment)**: Step number badge and title sit on one `items-center` row (removed `min-h-11` on the title strip); expanded body content is indented with `pl-12` so copy still lines up with the title.

### Changed
- **Slack Resources link**: Centralized in `src/lib/builders-workshop-slack.ts` so the sidebar and GitHub tab always share one label/URL (avoids drift and ensures redeploys pick up the same string).
- **Branding**: Remaining “Builders Initiative” / `#builders-initiative` references in UI, help copy, README, `.cursorrules`, SQL comment headers, and `VERCEL_BUILD_GUIDE.md` now use **The Builders Workshop** / `#builders-workshop`. `localStorage` key `builders_initiative_last_login` is unchanged for continuity. ESLint `no-restricted-syntax` now flags Initiative-style literals in favor of Workshop naming.
- **Common issues (help)**: “Common issues” accordions under each step start **collapsed** by default (`StepTroubleshooting` no longer opens the first item automatically).
- **Site header nav**: “Prototype” now links to `/prototype-playground` (same app) instead of the external design-internal URL; active tab highlights follow the current route.
- **Get Inspired**: Removed the Prototype Playground content; replaced with an under-construction message and a button linking to `design-internal.vercel.app`.
- **Figma MCP setup guidance**: Updated Prompt Guide and Making Stuff instructions to match the current Figma UI flow (`Cmd+K` → search `MCP` → open `MCP Servers`) instead of older Preferences-based steps.
- **Getting Started (Cursor install)**: Clarified that the **desktop app** is required; if people only see Cursor **in the browser**, instructions now point to the **bottom-left** profile menu → **Download Cursor** (macOS/Windows), in addition to Company Portal / Self Service+. Troubleshooting entries updated to match.
- **Optional: Request Admin Access**: Added a **You work in:** picker (design \| product \| marketing \| sales \| general) above the paste-in message so the template matches the person’s function; default remains design-focused copy.
- **Getting Started (Cursor)**: Aligned request/install steps with internal guidance — Okta Access Requests first, then install from Company Portal (Windows) or Self Service+ → Developer (Mac), with link to the Cursor Confluence page. Removed redundant copy-paste email template from the request step (Okta form is sufficient). Step titles in the UI: “Get Cursor from Okta” and “Open Cursor” (milestone keys unchanged). Shortened the “Get Cursor from Okta” step description; lead line is “Start here:” with an inline link to Okta.
- **Step checklist UI**: Expanded completed steps use a subtle **Dismiss** chip instead of a down chevron to collapse.
- **Step checklist UI**: Step index uses a number in a circle (brand when done). Completion is a **switch** on the right (Getting Started, Building Stuff, Connecting to GitHub). Expand/collapse chevrons sit inline by the title or in the collapsed row—no separate column next to the switch.
- **Prompt Guide tab**: Replaced content with a focused "Frontend Prototype Prompts" guide for designers building close to Figma — covers safety banner, Figma-to-code refinement loop, design system mapping, states/error handling, and a quick whole-feature prompt. Updated `docs/promptguide.md` to match.

### Technical
- **Git**: Added `clerk-user-migration-mapping.json` to `.gitignore` (local output from migration scripts; contains Clerk user IDs).
- `ChecklistStep` supports optional `copyableHeader` and syncs the textarea when `copyableContent` changes (role-specific admin request templates in `src/lib/admin-access-request-copy.ts`).
- Added `@radix-ui/react-switch` and `src/components/ui/switch.tsx` for accessible completion toggles.
- Step completion switches use local optimistic state for instant thumb movement; collapsed rows use a subtle “···” circle (spinner while saving) instead of a raw chevron.

## [2026-03-11]

### Added
- **Clerk user migration scripts**: Tools to migrate users from development to production Clerk instances
  - `scripts/migrate-clerk-users.ts`: Migrates users from CSV export to production Clerk instance
  - `scripts/update-supabase-clerk-ids.ts`: Updates Supabase user IDs after Clerk migration
  - Handles foreign key constraints and related records (showcases, etc.)

### Changed
- **Sign-in page**: Improved error handling for missing Clerk configuration
  - Shows helpful error message when Clerk keys are not configured
  - Better handling of Clerk hooks when provider is missing
- **Domain redirect**: Added 301 permanent redirect from `builders-initiative.vercel.app` to `builders-initiative.lot23.com`
  - Preserves path and query parameters in redirect
  - Ensures all traffic goes to the custom domain

### Technical
- Added `csv-parse` dependency for CSV parsing in migration scripts

## [2026-03-10]

### Added
- **Comments system**: Thread-style comments on every prompt card in the Prompt Guide
  - Side panel drawer slides in from the right, linked to a specific prompt
  - Comment count badge visible on each card title row as a trigger
  - Any authenticated user can post; authors can edit and delete their own comments
  - Shared `CommentPanel` and `CommentTrigger` components in `src/components/shared/` — reusable on any page
- **Reactions (heart) system**: "Used it" heart button on every prompt card
  - Toggleable per user; optimistic UI for instant feedback
  - Count visible next to the heart icon
  - Shared `ReactionButton` component in `src/components/shared/`
- **Supabase tables**: `comments` and `reactions` with a generic `source_type`/`source_id` pattern for future reuse across showcases and other pages
- **API routes**: `/api/comments` (GET, POST), `/api/comments/[id]` (PATCH, DELETE), `/api/reactions` (GET, POST toggle)

## [2026-03-09]

### Added
- **Prompt Guide tab**: New "Prompt Guide" tab in the Learn page navigation, positioned after "Connecting to GitHub"
  - Full AI prompt library for designers adapted from `docs/promptguide.md`
  - Organised into Core Patterns (Lab, TC–EBC, WIRE+FRAME frameworks) and 7 workflow categories
  - Each prompt displayed as an expandable card with editable, copyable textarea
  - No milestone tracking — purely a reference library for reuse
  - New route at `/prompt-guide`

## [Unreleased]

### Changed
- **Header Component**: Replaced inline header in SiteLayout with new dedicated Header component
  - New `Header.tsx` and `Header.module.css` in `src/components/layout/`
  - Sticky header with top-level nav: "Prototypes" (links to design-internal) and "Build" (current app, always active)
  - Page-level tabs (Getting Started, Building Stuff, etc.) remain as existing sub-navigation via TabNavigation
  - User email popover with sign-out (Clerk auth)
  - Responsive mobile menu with hamburger toggle
  - CSS module styling adapted from design-internal system to use existing design tokens

### Fixed
- **Database Health Check**: Fixed fail whale appearing incorrectly by moving health check from client-side direct Supabase calls to server-side API route
  - Created `/api/health` endpoint that uses server-side Supabase client for reliable connectivity
  - Updated `checkDatabaseHealth()` to call API route instead of direct REST API calls
  - Eliminates CORS and network connectivity issues that caused false negatives

### Removed
- **Base Prototypes Cleanup**: Removed migrated prototypes from Prototype Playground
  - Removed XDL Template by Michael But (migrated to separate repo)
  - Removed UI Starter Kit by Jessica Nicholl (migrated to separate repo)
  - Removed Dashboard Template by Katrina Li (migrated to separate repo)
  - Removed SDL Header Template by Angus Tait (migrated to separate repo)
  - Removed Starter Kit by Ben White (migrated to separate repo)
  - Removed Accounting Dashboard by Adam Huskisson (temporarily removed)
  - All prototypes have been migrated to individual GitHub repos in `xero-internal-actions-poc` org
  - Remaining base prototypes: Builder Tool (James Buchanan) and Replit Dashboard (Angus Tait)

## [2025-12-16]

### Added
- **Unified Prototype Playground**: Combined Showcase and Prototype Playground into a single unified experience
  - All prototypes (base and community) now appear in one consistent list
  - Featured prototypes highlighted at the top
  - Community builds sorted by creation date (newest first)
  - Forked items visually indented to show relationships
- **Base Prototype Editing**: Admin-only editing capability for base prototypes
  - New `EditBasePrototypeModal` component for editing base prototype metadata
  - API endpoint `PATCH /api/prototypes/[slug]` for updating prototype JSON data
  - Admins can edit title, designer, summary, tool, featured status, and tags
- **Unified Card Component**: New `PlaygroundCard` component for consistent display
  - Row-based layout with title, author, description, and action buttons
  - Edit button appears on hover for editable items
  - View and Fork buttons with proper link handling
  - Consistent styling across all prototype types
- **Badge Component**: New reusable badge UI component for tags and labels
- **Admin Override**: Admin users (jon.bell@xero.com) can edit/delete any showcase
  - Enhanced permission checks in showcase API routes
  - Admin override for both PATCH and DELETE operations

### Changed
- **Prototype Data Model**: Extended prototypes.json with new fields
  - Added `title`, `hasLocalCode`, `featured`, and `tags` fields
  - Base prototypes now have placeholder dates for consistency
- **Showcase Forms**: Updated submit and edit forms to include all prototypes
  - Dropdown now shows both base prototypes and community builds
  - Improved labeling format: "Title (Designer)" for base prototypes
  - Community builds included in template selection dropdown
- **Navigation**: Removed "Showcase" tab, redirects to Prototype Playground
  - `/showcases` route now redirects to `/prototype-playground`
  - Tab navigation updated to reflect unified experience
- **Date Display**: Standardized date formatting using UTC to prevent hydration errors
  - Dates hidden from UI per design request but data maintained for consistency

### Fixed
- **ESLint Errors**: Fixed apostrophe escaping in connecting-to-github-tab component
- **Hydration Errors**: Fixed date formatting to use consistent UTC format
- **Edit Permissions**: Fixed edit button visibility for all community items
- **Date Consistency**: Added placeholder dates to base prototypes for uniform data model

## [2025-12-10]

### Added
- **Making Stuff Tab**: New tab for tracking "Making Stuff" milestones
  - Status grid showing completion progress
  - Integration with Supabase milestone tracking
- **Connecting to GitHub Tab**: New tab for GitHub connection workflow
  - Step-by-step instructions for connecting GitHub accounts
  - "Coming Soon" banner for upcoming features
- **Build Optimization**: Significant build time improvements
  - Expanded prototype skip list to exclude unused prototypes
  - Early exit for cached builds (skip dependency checks)
  - Build time reduced from 3+ minutes to ~1m 23s (56% faster)
  - Comprehensive BUILD_OPTIMIZATION.md documentation

### Changed
- **Navigation UX**: Improved tab navigation persistence
  - Tabs now persist on all pages including dropdown pages
  - Dropdown button shows active page name when on dropdown page
  - Inverted button colors when dropdown page is active
- **UI Polish**: Removed dimmed/greyed out UI from Making Stuff and Connecting to GitHub tabs
  - Removed "stay tuned" banners
  - Removed opacity-50 styling for better visual clarity

### Technical
- Added BUILD_OPTIMIZATION.md with performance metrics
- Added IMPLEMENTATION_SUMMARY.md with complete change log
- Updated .cursorrules with build optimization details

## [2025-12-03]

### Added
- **Designer Showcases Feature**: Complete showcase system for community builds
  - Users can submit their work with title, description, URLs, and base prototype reference
  - Showcase gallery with card-based layout
  - Iteration tracking with version history
  - Changelog modal for viewing version history
  - Edit and delete capabilities for showcase owners
  - Avatar generation using DiceBear API
- **Supabase Schema**: Added database schema and migration files for showcases
  - `showcases` table for storing showcase data
  - `showcase_iterations` table for version tracking
  - Foreign key relationships with users table
- **Prototype Template Dropdown**: Added prototype template selection to showcase forms
  - Dropdown includes all available base prototypes
  - Users can specify which prototype their work is based on

### Changed
- **Tab Labels**: Updated tab navigation labels for clarity
- **Prototype Playground**: Enhanced prototype playground tab with improved UI

### Fixed
- **Build Errors**: Fixed missing PrototypePlaygroundTab import
- **Tab References**: Fixed Fluency Status tab reference
- **Indentation**: Fixed indentation errors in prototype-playground-tab.tsx
- **Security**: Updated Next.js and React to patch CVE-2025-55182 and CVE-2025-66478

## [2025-12-02]

### Added
- **Prototype Build Workflow**: Comprehensive documentation for prototype build process
  - Build caching strategy documentation
  - Parallel execution for faster builds
  - Git workflow for committing build outputs

### Changed
- **Build Performance**: Optimized prototype builds with caching and parallel execution
  - Cached builds skip dependency installation
  - Parallel execution for multiple prototypes
  - Improved error messages for build failures

### Fixed
- **Prototype Links**: Fixed "View App" links in prototype playground
- **Lint Errors**: Resolved linting issues across prototype components
- **Data Model**: Removed createdDate from prototypes, updated UI components accordingly

## [2025-12-01]

### Changed
- **Tab Naming**: Renamed "Fluency Status" to "Fluency Progress"
- **Tab Ordering**: Reordered tabs for better navigation flow
- **Git Configuration**: Updated gitignore to allow design-prototypes build folders

### Fixed
- **Prototype Routing**: Fixed prototype routing and added changelog pages
- **Build Process**: Fixed build errors related to prototype directories
- **TypeScript**: Separated server-only code from client-safe prototypes module
- **Imports**: Removed version numbers from import statements in design-prototypes
- **Submodules**: Converted adams-prototype and angus-replit-v1 from submodules to regular directories

## [Unreleased]

### Added
- **Landing Page**: Created new landing page at `/landing/` with animated background and curved text
  - ColorBends component using Three.js for animated gradient background with Xero blue colors (#13B5EA and #0B5D7A)
  - CurvedLoopText component using Three.js to display "THE BUILDERS INITIATIVE" text in a rotating circular animation
  - Mouse interaction with parallax effects on the background
  - Responsive design with proper z-index layering
- **Documentation**: Enhanced team members documentation with improved structure and access management details

### Fixed
- **Milestone Icons**: Fixed collapsed milestone chevron icon to point right instead of left for better visual consistency
- **Fluency Status Backend Integration**: Fixed Supabase foreign key join data parsing in `getAllUsersCompletions()`
  - Updated type handling to support both object and array response formats from Supabase
  - Fixed milestone completion data not displaying in Progress Grid and Changelog
  - Added defensive coding to handle potential Supabase API response variations

### Technical
- Added `three` dependency for WebGL-based animations
- Created `ColorBends` component with shader-based gradient effects
- Created `CurvedLoopText` component using Three.js sprites for Safari-compatible text animation

## [2025-11-27]

### Added
- **Supabase Integration**: Integrated Supabase for persistent milestone completion tracking
  - Added database tables: `users`, `milestones`, `milestone_completions`
  - Created Supabase client utilities for browser and server-side operations
  - Added TypeScript types for database schema
- **Step Completion Tracking**: Interactive completion tracking for Getting Started steps
  - "Mark as complete" button for each step
  - Toggle functionality to mark steps as complete/incomplete
  - Green checkmark indicator replaces step number when completed
  - Completion date shown in tooltip on hover over checkmark
- **Confetti Animation**: Fun celebration animation when all 5 steps are completed
  - Re-triggers every time user reaches 100% completion (supports marking incomplete and re-completing)
  - Uses canvas-confetti with custom animation patterns
- **API Routes**: RESTful endpoints for milestone management
  - `POST /api/milestones/complete` - Mark a step as complete
  - `POST /api/milestones/incomplete` - Mark a step as incomplete  
  - `GET /api/milestones/user` - Fetch user's completion status
- **User Profile UI**: Added Clerk UserButton component to header
  - Shows user's Google profile picture
  - Dropdown menu with account management and sign-out
  - Positioned in top-right corner with proper alignment
- **Database Seeding**: SQL script to populate milestones table with Getting Started steps

### Changed
- **Button Styling**: Changed completion toggle button to secondary/outline style
- **Button Placement**: Moved completion button next to "Copy to Clipboard" for better UX
- **Completion Display**: Removed emoji and moved completion date from inline text to tooltip
- **Header Layout**: Updated site header with space-between layout for logo and profile picture

### Technical
- Added `@supabase/supabase-js` and `@supabase/ssr` dependencies
- Added `canvas-confetti` for celebration animations
- Added MagicUI confetti component via shadcn
- Created database utility functions with error handling and logging
- Implemented automatic user sync between Clerk and Supabase
- Added environment variable validation in API routes

## [2025-11-26]

### Added
- **Getting Started Content**: Enhanced Getting Started tab with expanded content and improved styling.

### Changed
- **Typography**: Replaced Geist font with Inter font family for improved readability.
- **Global Styles**: Updated global styles with improved design tokens and spacing.

### Fixed
- **Clerk Authentication**: Fixed Clerk prerender errors by making unauthorized page dynamic.
- **SSO Callback**: Split sso-callback into server and client components for proper dynamic rendering.
- **TypeScript Build**: Excluded `vitest.config.ts` from TypeScript build process.
- **JSX Escaping**: Fixed special character escaping in JSX content.
- **Sign-in Title**: Updated sign-in page title to "The Builders Initiative".

### Removed
- **Dependencies**: Removed unused `tailwindcss-animate` dependency.
- **CSS Imports**: Removed `tw-animate-css` import from `globals.css`.

## [2025-11-24]

### Changed
- **Home Page Structure**: Refactored home page structure and components for improved organization.
- **Builder Components**: Updated BuilderPage and XeroFlowClickthrough components for improved async handling.
- **General Improvements**: Various improvements to code quality and component structure.

## [2025-11-21]

### Added
- **Testing Infrastructure**: Added `vitest`, `@testing-library/react`, and related dependencies.
- **Scripts**: Added `test` (`vitest`) and `typecheck` (`tsc --noEmit`) scripts to `package.json`.
- **Smoke Test**: Added `src/__tests__/Home.test.tsx` to verify the home page renders.
- **Data Integrity**: Added `zod` for runtime validation of `builders.json` and a dedicated test suite.
- **CI**: Added GitHub Actions workflow (`.github/workflows/ci.yml`) to run tests and linting on push.

### Changed
- **Application Architecture**: Reworked application to focus on a new home page, removing the old client/server architecture.

### Removed
- **Dead Code**: Deleted unused `server/`, `client/`, and `shared/` directories.
- **Legacy Config**: Deleted `vite.config.ts`, `drizzle.config.ts`, and `replit.md`.

### Fixed
- **Tailwind Config**: Fixed `darkMode` type error and removed invalid content paths in `tailwind.config.ts`.

## [2025-11-10]

### Added
- **Next.js Application**: Converted project to Next.js with App Router architecture.
- **Authentication**: Integrated Clerk authentication with Xero email domain restrictions.
- **Builder Pages**: Added builder profile pages at `/builders/[slug]` with timeline, badges, and sandbox notes.
- **Progress Tracking**: Added progress visualization components using Recharts.
- **Component Library**: Created reusable components for hero sections, two-column layouts, and progress charts.
- **Data Model**: Added `builders.json` data file with milestone tracking structure.
- **Builder Utilities**: Added utility functions in `src/lib/builders.ts` for loading and aggregating builder data.
- **Site Layout**: Added site layout component with header navigation.
- **Git Configuration**: Added `.gitignore` file.

### Changed
- **Project Structure**: Migrated from prototype template to full Next.js application structure.
- **Styling**: Updated global styles and PostCSS configuration for Tailwind CSS 4.

## [2025-09-02]

### Added
- **Initial Prototype**: Created initial Xero prototype template with dashboard functionality.
