---
name: initialize-project
description: Mandatory pre-flight check that reads all project rules, design system constraints, and component patterns before beginning any work. Use this FIRST before responding to any user request.
metadata:
  author: prototype-template
  version: "1.0"
allowed-tools: Read
---

# Initialize Project

**⚠️ CRITICAL: This skill MUST be invoked before responding to any user request.**

This skill loads all essential project rules, constraints, and patterns to ensure you understand the design system and coding conventions.

## What This Skill Does

1. Reads the prototype log to understand what has already been built
2. Confirms you have read the project rules (`/CLAUDE.md` or `/.cursorrules`)
3. Loads the component inventory from `/COMPONENTS.md`
4. Reviews component structure patterns from `/src/components/component-example.tsx`
5. Validates the prototype page structure
6. Returns a summary of key constraints

## Instructions

### Step 0: Read the Prototype Log

Read `/PROTOTYPE_LOG.md`. This file contains a running record of what has been built in previous sessions — components added, user requests, key decisions, and current prototype state. Use it to understand what already exists before doing any work.

If the file has no session entries yet, this is the first session — proceed normally.

### Step 1: Read Project Rules

Read the appropriate rules file for your AI tool:

- **Claude Code users**: Read `/CLAUDE.md`
- **Cursor users**: Read `/.cursorrules`
- **Other AI tools**: Read both files

### Step 2: Load Component Inventory

Read `/COMPONENTS.md` to understand all 55 available shadcn/ui components.

Key takeaway: **Always use existing shadcn components. Only create custom components if shadcn doesn't have what you need, and ask the user first.**

> **⚠️ Base UI, not Radix UI.** This project's shadcn components are built on `@base-ui/react`, NOT Radix UI. Standard shadcn docs online use Radix — those APIs differ. When you encounter errors, do not apply Radix-based fixes. Use `render` prop instead of `asChild`. Refer to `component-example.tsx` for correct patterns.

### Step 3: Review Component Patterns

Read `/src/components/component-example.tsx` to see correct component structure patterns.

Critical patterns to remember:

- **Sheet**: `SheetHeader` → content div with `p-4` → `SheetFooter` (NO ScrollArea)
- **Card**: `CardHeader` → `CardContent` → `CardFooter`
- **Dialog**: `DialogHeader` → content → `DialogFooter`
- **Tabs**: `TabsList` with `TabsTrigger` → `TabsContent` for each tab

### Step 4: Understand Prototype Structure

The home page (`/src/pages/home.tsx`) at the `/` route **is** the prototype canvas.

- **Single-page by default**: Build directly in `home.tsx`. This includes multi-step flows, wizards, onboarding sequences, and tabbed interfaces — even if the prototype has many steps or panels, it is single-page if users don't navigate to a different URL.
- **Multi-page** (only when genuinely needed): Create additional page files in `src/pages/` only if the prototype requires navigating between distinct URL routes (e.g., `/dashboard`, `/settings`). Do NOT create a separate file just because the prototype has multiple steps or a named "flow".
- Export additional pages from `src/pages/index.ts` and add routes to `src/App.tsx`

### Step 5: Load Color System

The project uses a **strict, locked color palette** defined in `/src/index.css`.

**Available color classes** (use ONLY these):

- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-secondary`, `text-secondary-foreground`
- `bg-accent`, `text-accent-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-destructive`, `text-destructive-foreground`
- `border-border`, `ring-ring`
- `bg-card`, `text-card-foreground`
- `bg-popover`, `text-popover-foreground`

**NEVER use**:

- Hex colors (`#3B82F6`)
- RGB values (`rgb(59, 130, 246)`)
- Named colors (`blue`, `red`)
- Arbitrary Tailwind colors (`bg-blue-500`)
- **NEVER modify `/src/index.css`**

When users request custom colors, politely decline and offer theme alternatives.

### Step 6: Load Written Content Standards

All UI copy and written content must follow these rules (from the Content Design System):

- **Sentence case** for all UI text — titles, headings, labels, descriptions. Only capitalise the first letter and proper nouns.
- **Plain language** — use simple, everyday words. Avoid jargon and formal language. Prefer "buy" not "purchase", "help" not "assist".
- **Active voice** most of the time. Use passive voice sparingly — mainly to soften bad news.
- **Contractions** — use everyday contractions ("you'll", "don't"). Don't turn nouns into contractions.
- **Pronouns** — use "we"/"our" in product UI, the product name in marketing copy. Use "you"/"your" for customers. Drop "you"/"your" on headings, buttons, and links.
- **Buttons and links** — sentence case, no full stop. Make link text meaningful. Put links at end of sentences.
- **Bold** only to reference UI elements. Never use italics. Never underline unless it's a link.
- **Tone** — default is practical (clear, concise, helpful). Formal for legal. Expressive for celebrations. Playful only rarely.

## Output Format

After completing these steps, confirm you've loaded the rules by outputting:

```
✅ Project initialized
- Read prototype log ([X sessions] / first session)
- Read project rules
- Loaded 55 shadcn/ui components from /COMPONENTS.md
- Reviewed component structure patterns
- Confirmed prototype structure (starts in home.tsx)
- Loaded strict color system (CSS variables only)
- Loaded written content standards (sentence case, plain language, active voice)

Ready to assist with prototyping.
```

If the prototype log has existing entries, briefly summarise the current state of the prototype after the confirmation block so the user knows you're up to speed.

## Key Constraints to Remember

1. **Components**: Prefer shadcn/ui components; ask before creating custom ones
2. **Colors**: Use CSS variables only; never modify theme colors; decline custom color requests
3. **Prototype pages**: Always start in `home.tsx` — this includes multi-step flows, wizards, and onboarding sequences. Only create additional page files for distinct URL routes (e.g. `/dashboard`, `/settings`)
4. **Component structure**: Check `component-example.tsx` before using any component
5. **Imports**: Always use `@/components/ui/*` alias
6. **TypeScript**: All files must be `.tsx` or `.ts`
7. **Icons**: Only `lucide-react` icons
8. **Written content**: Sentence case, plain language, active voice, contractions, practical tone
9. **Charts**: Use the most appropriate chart type for the data — BarChart, LineChart, AreaChart, and PieChart are all available. Always wrap charts in `ChartContainer` from `@/components/ui/chart` with an explicit pixel height (e.g. `className="h-[300px] w-full"`) — never use raw `ResponsiveContainer`. For stacked bar charts, apply radius to the topmost bar only.

## When to Re-invoke This Skill

Invoke this skill again if:

- You've forgotten key constraints
- The user asks you to "reload the rules"
- You need to confirm the design system requirements
