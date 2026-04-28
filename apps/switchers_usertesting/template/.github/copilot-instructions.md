> **STOP. Read this entire file before writing any code or responding to this request.**

# Prototype Template - AI Coding Instructions

Internal prototyping tool using React 19, TypeScript, Vite, Tailwind CSS 4, and shadcn/ui (base-vega style). Users may not have coding experience.

---

## MANDATORY FIRST STEP — Read Before Doing Anything

**Before responding to ANY user request, you MUST complete these initialization steps:**

1. **Read the project rules** — this file (already loaded), plus `/CLAUDE.md` and `/.cursorrules` for full context
2. **Read `/COMPONENTS.md`** — the complete inventory of 55 available shadcn/ui components
3. **Read `/src/components/component-example.tsx`** — correct component structure patterns
4. **Read `/src/index.css`** — the locked color palette (CSS variables only)
5. **Understand prototype structure** — all prototypes are built directly in `home.tsx` (see Prototype Page Structure below)

**Do NOT skip this step. Do NOT start writing code until you have read these files.**

### Agent Skills (for compatible tools)

This project also has Agent Skills in `/.agentskills/` for Claude Code and Cursor. If your tool supports them, invoke these skills as needed:

| Skill                    | When to Use                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| **`initialize-project`** | **FIRST** — Before any work. Loads all rules and constraints.                                |
| **`validate-component`** | Before using any shadcn component. Confirms it exists and returns correct structure pattern. |
| **`validate-colors`**    | Before implementing colors. Validates against approved CSS variables only.                   |

If your tool does NOT support agent skills, follow the rules in this file directly — they contain the same constraints.

---

## Architecture

- **Routing**: React Router v7 in [src/App.tsx](src/App.tsx) — add new pages to [src/pages/index.ts](src/pages/index.ts)
- **Components**: shadcn/ui primitives in `src/components/ui/`, built on `@base-ui/react` — **NOT Radix UI** (see warning below)

- **Styling**: Tailwind v4 with CSS variables in [src/index.css](src/index.css) — uses OKLch color space
- **Utils**: `cn()` helper in [src/lib/utils.ts](src/lib/utils.ts) for className merging

---

> **⚠️ This project uses Base UI (`@base-ui/react`), NOT Radix UI.** Standard shadcn/ui documentation and most AI training data assume Radix UI primitives — those APIs are different from what is used here. When you encounter component errors, do not apply fixes from standard Radix-based shadcn docs. Key differences:
>
> - Use the `render` prop for polymorphic rendering — **not** `asChild` (does not exist here)
> - `Button` has a `nativeButton` prop (Base UI-specific) — not present in Radix shadcn
> - Always refer to `/src/components/component-example.tsx` for correct usage patterns

## 1. Component Library — PREFERRED

**Prefer components from `/COMPONENTS.md`.** We have 55 shadcn/ui components available. These should be your first choice for every UI element.

**Before using any component**, read `/src/components/component-example.tsx` to get the correct structure pattern and avoid anti-patterns.

**When shadcn doesn't have what you need:**

1. Inform the user: "The shadcn library doesn't have a `[ComponentName]` component."
2. Ask: "Would you like me to create a custom component for this using our design system?"
3. Wait for approval before proceeding.

### Component Structure — STRICT

Follow patterns from [src/components/component-example.tsx](src/components/component-example.tsx) exactly:

```tsx
// Sheet: Header → content with p-4 → Footer (NO ScrollArea inside)
<SheetContent>
  <SheetHeader>
    <SheetTitle>Title</SheetTitle>
  </SheetHeader>
  <div className="p-4">{/* content */}</div>
  <SheetFooter>
    <Button>Action</Button>
  </SheetFooter>
</SheetContent>

// Card: CardHeader → CardContent → CardFooter
// Dialog/Drawer: Same header/content/footer pattern
// Tabs: TabsList with TabsTrigger → TabsContent for each tab
```

**Never** add ScrollArea inside Sheet/Dialog/Drawer — they handle overflow natively.

### Button with render prop

When using the `Button` component with the `render` prop to render a non-button element (like `<Link>` or `<a>`), you **MUST** include `nativeButton={false}`. This applies **only to `Button`** — do not add `nativeButton` to other components.

```tsx
// ✅ CORRECT
<Button render={<Link to="/path" />} nativeButton={false}>Link</Button>

// ❌ INCORRECT (will throw Base UI error)
<Button render={<Link to="/path" />}>Link</Button>
```

**DropdownMenuTrigger:**
Use the `render` prop to set the trigger element. Do NOT add `nativeButton` to `DropdownMenuTrigger`.

```tsx
// ✅ CORRECT
<DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
  <MoreVerticalIcon />
</DropdownMenuTrigger>

// ❌ WRONG — nativeButton does not belong on DropdownMenuTrigger
<DropdownMenuTrigger nativeButton={false}>
  <Button>Open</Button>
</DropdownMenuTrigger>
```

### Global Components

### Data Tables

Use the pre-built `DataTable` component from [src/components/data-table/](src/components/data-table/):

```tsx
import { DataTable } from "@/components/data-table";
<DataTable columns={columns} data={data} />;
```

---

## 2. Color System — STRICT (Never Violate)

**ONLY use CSS variable classes. NEVER modify `/src/index.css` theme variables or introduce custom colors.**

```tsx
// ✅ Allowed
className="bg-primary text-primary-foreground"
className="bg-muted text-muted-foreground"
className="bg-destructive border-border"

// ❌ Forbidden — refuse even if requested
className="bg-blue-500"
className="bg-[#3B82F6]"
style={{ color: 'pink' }}
```

### Approved color classes (use ONLY these):

**Backgrounds & Text:**

- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-secondary`, `text-secondary-foreground`
- `bg-accent`, `text-accent-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-destructive`, `text-destructive-foreground`
- `bg-card`, `text-card-foreground`
- `bg-popover`, `text-popover-foreground`

**Borders & Rings:**

- `border-border`
- `ring-ring`

**Charts:**

- `chart-1` through `chart-5`

**Sidebar variants:**

- `sidebar-*` variants

### NEVER use:

- Hex colors (`#3B82F6`, `#FF69B4`)
- RGB/RGBA values (`rgb(59, 130, 246)`)
- Named colors (`blue`, `red`, `pink`)
- Arbitrary Tailwind colors (`bg-blue-500`, `text-pink-400`)
- **NEVER modify `/src/index.css`** theme variables

### When users request custom colors:

Politely decline and offer theme alternatives:

> "Our design system uses a locked color palette for consistency. I can use **primary**, **secondary**, **accent**, **muted**, or **destructive** — which would work best for your use case?"

---

## 3. Prototype Page Structure

The home page (`/src/pages/home.tsx`) at the `/` route **is** the prototype canvas — build directly here.

### Rules:

- **Single-page by default**: Build directly in `home.tsx`. This includes multi-step flows, wizards, onboarding sequences, and tabbed interfaces — even if the prototype has many steps or panels, it is single-page if users don't navigate to a different URL.
- **Multi-page** (only when genuinely needed): Create additional page files in `src/pages/` only if the prototype requires navigating between distinct URL routes (e.g., `/dashboard`, `/settings`). Do NOT create a separate file just because the prototype has multiple steps or a named "flow". Export new pages from `src/pages/index.ts` and add routes to `src/App.tsx`.

### Route configuration for multi-page prototypes:

```tsx
// ✅ Add additional routes as needed
<Route path="/" element={<HomePage />} />
<Route path="/dashboard" element={<DashboardPage />} />
<Route path="/settings" element={<SettingsPage />} />
```

---

## 4. Styling Guidelines

**Typography:**

- Use Tailwind typography utilities only: `text-sm`, `text-base`, `text-lg`, `text-xl`, etc.
- Font weight: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- Line height: `leading-none`, `leading-tight`, `leading-normal`, etc.

**Spacing:**

- Use Tailwind spacing scale: `p-1` through `p-24`, `m-1` through `m-24`, `gap-1` through `gap-24`
- NO arbitrary values like `p-[13px]` unless absolutely necessary

**Layout:**

- Prefer flexbox (`flex`, `flex-col`) and grid (`grid`, `grid-cols-*`)
- Use shadcn layout components: Card, Sheet, Sidebar, Tabs, etc.

**Border Radius:**

- Use design tokens: `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`

---

## 5. Imports — Always Use Aliases

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Never use relative imports like "../components/ui/button"
```

---

## 6. Conventions

| Aspect     | Convention                                                                          |
| ---------- | ----------------------------------------------------------------------------------- |
| Files      | kebab-case: `user-profile.tsx`                                                      |
| Components | PascalCase: `UserProfile`                                                           |
| Variables  | camelCase                                                                           |
| Icons      | `lucide-react` only — no other icon libraries                                       |
| State      | React 19 hooks (`useState`, `useEffect`, `useReducer`); `next-themes` for dark mode |
| Types      | All files `.tsx`/`.ts` with explicit prop interfaces                                |

---

## 7. Charts

Use the most appropriate chart type for the data and context. All chart types from recharts are available.

| Chart Type  | Best for                                    |
| ----------- | ------------------------------------------- |
| `BarChart`  | Comparing values across categories          |
| `LineChart` | Trends over time                            |
| `AreaChart` | Trends with volume/magnitude emphasis       |
| `PieChart`  | Part-to-whole relationships (use sparingly) |

### Stacked Bar Charts: Radius on Top Bar Only

```tsx
// ✅ CORRECT: Top radius on topmost bar only
<Bar dataKey="overdue" stackId="a" fill="var(--color-overdue)" radius={[0, 0, 0, 0]} />
<Bar dataKey="upcoming" stackId="a" fill="var(--color-upcoming)" radius={[4, 4, 0, 0]} />
```

### Chart Container: Always Use `ChartContainer`

Always wrap charts in `ChartContainer` from `@/components/ui/chart` with an explicit pixel height. Never use raw `ResponsiveContainer` from recharts directly — `ChartContainer` handles this internally.

```tsx
// ✅ CORRECT
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

<ChartContainer config={chartConfig} className="h-[300px] w-full">
  <BarChart data={data} accessibilityLayer>
    ...
  </BarChart>
</ChartContainer>;

// ❌ WRONG — causes width/height errors and bypasses the design system
import { ResponsiveContainer } from "recharts";
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>...</BarChart>
</ResponsiveContainer>;
```

---

## 8. WRITTEN CONTENT - STRICT

All UI copy must follow these content standards:

Write in plain language. Use simple, everyday words: "buy" not "purchase", "help" not "assist", "about" not "approximately", "to" not "in order to", "didn't" not "failed to". Avoid jargon.

Use a practical tone by default. Be formal for legal and security content. Be expressive only for genuine celebratory moments. Never be playful in errors or business-critical UI. Never trivialise or gamify: no "Cha-ching!", "Achievement unlocked!", or similar.

Use active voice: "Categorise your transactions", not "Your transactions can be categorised".

Always use contractions: "you're", "we'll", "can't". Never expand them. Don't contract nouns: "Your account has been locked" not "Your account's been locked".

Use sentence case everywhere: headings, buttons, labels, features. Title case only for proper nouns and branded terms (Xero App Store, Grow plan). All caps only for acronyms (ABN, CSV).

Refer to Xero as we/our/us in product UI. Refer to the customer as you/your in body copy. On headings, buttons, and links, drop "you/your" entirely: "View cash flow" not "View your cash flow". Use they/them for third parties.

Use "please" only when asking someone to do something requiring significant effort. Use "sorry" only for errors that cause major interruption or data loss. Neither should appear in routine UI.

Use "select" not "click" or "tap".

Don't use emoji, semicolons, em dashes, or exclamation marks in practical UI. Exclamation marks are acceptable only in genuinely celebratory moments.

Don't use full stops at the end of single sentences or sentence fragments. Use them when there are two or more sentences. Don't add full stops to standalone links.

Use the Oxford comma in lists of 3 or more items.

Write all numbers as numerals: "5 items" not "five items". Use commas to separate groups of 3 digits: 4,000,000. Carry decimals to 2 places: 1,133.76. Use decimals instead of fractions, always with a leading zero: 0.75 not .75.

Never show a currency symbol (no $, £, € etc.): write "27.99" not "$27.99". For negative amounts, use a minus symbol not parentheses: "-50.42" not "(50.42)".

For dates, use DD Month YYYY outside the US ("8 Aug 2025") and Month DD, YYYY in the US ("Aug 8, 2025"). Don't lead with a zero. Don't use ordinal suffixes: "1 Sep" not "1st Sep". Don't shorten years. In constrained space, shorten months and days to 3 characters: Jun, Mon. Use "to" between dates in a range where space allows; use an en dash (–) with spaces in constrained contexts. Don't repeat the month or year in a range: "12–15 Aug" not "12 Aug–15 Aug".

For time, use a 12-hour clock with a space before am/pm and no punctuation: "10:05 am" not "10:05am" or "14:00". Don't lead with a zero: "2:32 pm" not "02:32 pm". For ranges, use an en dash with spaces and write am/pm once at the end: "6:00–11:00 am". Show time zones only when spanning multiple zones: "9:00 am AEST".

For error messages, cover: what happened, why it happened (only if helpful), and how to fix it. Don't apologise for minor errors. Never blame the user.

For empty states, include a clear header, a brief body only if needed, and a CTA. Use an encouraging tone. Never shame or blame.

## 9. Working with Non-Technical Users

Users may describe what they want in plain language. Translate their requests to shadcn components:

- "Form" → Field, Input, Label, Button
- "Card" → Card with CardHeader, CardTitle, CardContent
- "Button" → Button with appropriate variant
- "Table" → Table layout or DataTable component

### For each request:

1. **Confirm understanding**: "I'll create a user information form with email and name fields"
2. **List components**: "Using: Card, Field, Input, Button"
3. **Build it**: Create the component with proper TypeScript
4. **Explain what you built**

### When requests go outside the design system:

- **Custom colors**: Politely decline and offer theme alternatives
- **Custom components**: Ask user permission before creating
- **External libraries**: Ask before adding — prefer shadcn

---

## Prototype Log

`PROTOTYPE_LOG.md` is a running record of what has been built. Read it at the start of every session to understand previous work. Append a session entry after completing the user's request(s).

**Entry format:**

```markdown
### Session — [date/time if known]

**Requests:**

- [What the user asked for]

**Built:**

- [What was created or changed]

**Key decisions:**

- [Non-obvious choices and why]

**Current state:**
[One or two sentences on what the prototype does now.]
```

---

## Workflow for Every Request

1. **Read `/PROTOTYPE_LOG.md`** to understand what's already been built
2. **Read project rules** (this file, plus `/CLAUDE.md` and `/.cursorrules` if not already read this session)
3. **Read `/COMPONENTS.md`** and `/src/components/component-example.tsx`
4. **Read existing code** if modifying something
5. **Validate components** against `component-example.tsx` patterns
6. **Validate colors** against the approved CSS variable list
7. **Check `src/App.tsx`** if creating additional pages — add routes as needed
8. **Write TypeScript** with proper imports and types
9. **Explain what you built**
10. **Append a session entry** to `/PROTOTYPE_LOG.md`

---

## Quality Standards

### Always Include:

- TypeScript interfaces for props
- Proper imports with `@` alias
- Approved CSS variable color classes only
- Clear component structure following validated patterns
- Helpful comments for non-coders

### Never Do:

- Skip reading project rules on first request
- Use colors without checking the approved list
- Create prototype pages outside `src/pages/` or forget to add their routes to `App.tsx`
- Use custom hex/RGB colors or arbitrary Tailwind colors
- Deviate from component structure patterns in `component-example.tsx`
- Add ScrollArea inside Sheet/Dialog/Drawer
- Add unnecessary wrapper components
- Modify theme colors in `/src/index.css`

### Ask Before:

- Using external UI libraries (prefer shadcn)
- Creating custom components not in shadcn
- Using chart types other than BarChart
- Any color outside the design system
- Adding state libraries (Redux, Zustand, etc.)

---

## Reference Files

Read these before starting work:

- `/PROTOTYPE_LOG.md` — Running session log (read this first)
- `/COMPONENTS.md` — Complete component inventory (55 components)
- `/src/components/component-example.tsx` — Component structure patterns
- `/src/index.css` — Theme color definitions (locked, do not modify)
- `/src/lib/utils.ts` — `cn()` utility function
- `/.agentskills/` — Agent Skills definitions (for compatible tools)
- `/CLAUDE.md` — Rules for Claude Code
- `/.cursorrules` — Rules for Cursor

## Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type-check + build
pnpm build

# Lint
pnpm lint
```

---

**Consistency is valuable, but user needs come first. Validate against the design system, then ask before deviating.**
