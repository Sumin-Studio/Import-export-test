> [!IMPORTANT]
> **STOP. Invoke the `initialize-project` skill before writing any code or responding to this request. No exceptions.**

# Prototype Template - AI Assistant Instructions

This is an internal prototyping tool with **design system preferences**. Users may not have coding experience.

---

## MANDATORY FIRST STEP

**Before responding to ANY user request, invoke the `initialize-project` skill.**

This skill loads all project rules, component patterns, color system constraints, and prototype structure requirements. It ensures you understand the design system before you begin work.

```
Use the initialize-project skill to load project rules
```

## Available Agent Skills

This project uses Agent Skills to enforce design system rules. Invoke these skills as needed:

| Skill                    | When to Use                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| **`initialize-project`** | **FIRST** - Before any work. Loads all rules and constraints.                                |
| **`validate-component`** | Before using any shadcn component. Confirms it exists and returns correct structure pattern. |
| **`validate-colors`**    | Before implementing colors. Validates against approved CSS variables only.                   |

---

## Your Role

Help users build prototypes prioritizing our pre-approved shadcn/ui components and color scheme. Maintain consistency while being flexible when needed.

## Core Guidelines

> [!WARNING]
> **This project uses Base UI (`@base-ui/react`), NOT Radix UI.** Standard shadcn/ui documentation and most AI training data assume Radix UI primitives — those APIs are different from what is used here. When you encounter component errors, do not apply fixes from standard Radix-based shadcn docs. Key differences:
>
> - Use the `render` prop for polymorphic rendering — **not** `asChild` (does not exist here)
> - `Button` has a `nativeButton` prop (Base UI-specific) — not present in Radix shadcn
> - Always refer to `/src/components/component-example.tsx` for correct usage patterns

### 1. Component Library (PREFERRED)

**Prefer components from `/COMPONENTS.md`**

We have 55 shadcn/ui components available. These should be your first choice for every UI element.

**Before using any component, invoke the `validate-component` skill** to:

- Confirm the component exists in shadcn
- Get the correct structure pattern
- Avoid common anti-patterns (e.g., adding ScrollArea inside Sheet)

**When shadcn doesn't have what you need:**

1. The `validate-component` skill will inform you
2. Ask the user for approval to create a custom component
3. If approved, build it following our color system and styling patterns

**Button Component:**
When using the `Button` component with the `render` prop to render a non-button element (like a `<Link>` or `<a>` tag), you **MUST** include the `nativeButton={false}` prop to prevent Base UI accessibility errors. This applies **only to `Button`** — do not add `nativeButton` to other components.

```typescript
// ✅ CORRECT
<Button render={<Link to="/path" />} nativeButton={false}>Link</Button>
```

**DropdownMenuTrigger:**
Use the `render` prop to set the trigger element. Do NOT add `nativeButton` to `DropdownMenuTrigger`.

```typescript
// ✅ CORRECT
<DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
  <MoreVerticalIcon />
</DropdownMenuTrigger>

// ❌ WRONG — nativeButton does not belong on DropdownMenuTrigger
<DropdownMenuTrigger nativeButton={false}>
  <Button>Open</Button>
</DropdownMenuTrigger>
```

### 2. Color System (STRICT - NO MODIFICATIONS)

**Before implementing any colors, invoke the `validate-colors` skill.**

The color system is **locked and cannot be modified**. Only CSS variable classes are approved:

- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-secondary`, `text-secondary-foreground`
- `bg-accent`, `text-accent-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-destructive`, `text-destructive-foreground`
- `border-border`, `ring-ring`
- `bg-card`, `bg-popover` (with foreground variants)

**NEVER use**: Hex colors, RGB values, named colors, or arbitrary Tailwind colors (e.g., `bg-blue-500`).

**When users request custom colors**: The `validate-colors` skill will provide the polite decline template and offer theme alternatives.

### 3. Prototype Page Structure

The home page (`/src/pages/home.tsx`) at the `/` route **is** the prototype canvas — build directly here.

Key rules:

- **Single-page by default**: Build directly in `home.tsx`. This includes multi-step flows, wizards, onboarding sequences, and tabbed interfaces — even if the prototype has many steps or panels, it is single-page if users don't navigate to a different URL.
- **Multi-page** (only when genuinely needed): Create additional page files in `src/pages/` only if the prototype requires navigating between distinct URL routes (e.g., `/dashboard`, `/settings`). Do NOT create a separate file just because the prototype has multiple steps or a named "flow". Export new pages from `src/pages/index.ts` and add routes to `src/App.tsx`.

### 4. Import Conventions

Always use `@/components/ui/*` alias:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
```

Never use relative imports for components.

### 5. TypeScript Required

All files must be `.tsx` or `.ts` with proper types.

```typescript
interface ComponentNameProps {
  // Props with types
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Implementation
}
```

### 6. Icons

Only `lucide-react` icons (563 available):

```typescript
import { Check, ChevronDown, User } from "lucide-react";
```

### 7. Charts

Use the most appropriate chart type for the data and context. All chart types from recharts are available.

| Chart Type  | Best for                                          |
| ----------- | ------------------------------------------------- |
| `BarChart`  | Comparing values across categories                |
| `LineChart` | Trends over time                                  |
| `AreaChart` | Trends with volume/magnitude emphasis             |
| `PieChart`  | Part-to-whole relationships (use sparingly)       |

**Stacked Bar Charts: Radius on Top Bar Only**

```typescript
// ✅ CORRECT: Top radius on topmost bar only
<Bar dataKey="overdue" stackId="a" fill="var(--color-overdue)" radius={[0, 0, 0, 0]} />
<Bar dataKey="upcoming" stackId="a" fill="var(--color-upcoming)" radius={[4, 4, 0, 0]} />
```

**Chart Container: Always Use `ChartContainer`**

Always wrap charts in `ChartContainer` from `@/components/ui/chart` with an explicit pixel height. Never use raw `ResponsiveContainer` from recharts directly — `ChartContainer` handles this internally.

```typescript
// ✅ CORRECT
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

<ChartContainer config={chartConfig} className="h-[300px] w-full">
  <BarChart data={data} accessibilityLayer>
    ...
  </BarChart>
</ChartContainer>

// ❌ WRONG — causes width/height errors and bypasses the design system
import { ResponsiveContainer } from "recharts";
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>...</BarChart>
</ResponsiveContainer>
```

### 8. Written Content (STRICT)

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


### 9. Styling Guidelines

**Typography**: Use Tailwind utilities (`text-sm`, `text-base`, `font-medium`, etc.)
**Spacing**: Use Tailwind scale (`p-4`, `m-2`, `gap-4`, etc.)
**Layout**: Prefer flexbox and grid, use shadcn layout components
**Border Radius**: Use tokens (`rounded-sm`, `rounded-md`, `rounded-lg`)

## Working with Non-Technical Users

### Understand Plain Language

Users may say:

- "I need a form to collect user info"
- "Make a card with a title and some text"
- "Add a button that does something"
- "I want a table with data"

### Translate to Components

Map requests to shadcn components:

- "Form" → Field, Input, Label, Button
- "Card" → Card with CardHeader, CardTitle, CardContent
- "Button" → Button with appropriate variant
- "Table" → Table layout with proper components

Use the `validate-component` skill to get correct patterns.

### Always Explain What You're Building

For each request:

1. **Confirm understanding**: "I'll create a user information form with email and name fields"
2. **List components**: "Using: Card, Field, Input, Button"
3. **Build it**: Create the component with proper TypeScript
4. **Show result**: Present the code clearly

### Guide Users

When requests go outside our design system:

**For custom colors**:

- Use the `validate-colors` skill
- It provides the polite decline template
- Offers theme alternatives (primary, secondary, accent, muted, destructive)

**For custom components**:

- Use the `validate-component` skill
- It will flag when shadcn doesn't have the component
- Ask user permission before creating custom component

## Workflow for Every Request

1. **Invoke `initialize-project`** if you haven't already this session — this also reads the prototype log
2. **Read existing code** if modifying something
3. **Use `validate-component`** for components you're about to use
4. **Use `validate-colors`** before implementing colors
5. **Check `src/App.tsx`** if creating additional pages — add routes as needed
6. **Follow the patterns** provided by the skills
7. **Write TypeScript** with proper imports and types
8. **Explain what you built**
9. **Update `PROTOTYPE_LOG.md`** — append a session entry (see below)

## Prototype Log

`PROTOTYPE_LOG.md` is a running record of what has been built in this prototype. It lets the next person (or AI session) pick up exactly where things left off.

**After completing the user's request(s), append an entry to `PROTOTYPE_LOG.md`** using this format:

```markdown
### Session — [date and time if known, otherwise omit]

**Requests:**
- [Short summary of each thing the user asked for, in plain language]

**Built:**
- [Bullet list of what was created or changed — components, layouts, interactions]

**Key decisions:**
- [Any non-obvious choices made — why a particular component, layout approach, or data structure was used]

**Current state:**
[One or two sentences describing what the prototype does right now, as if explaining it to someone who hasn't seen it.]
```

Keep entries concise. The goal is a 30-second read that answers: "What does this prototype do and what was the last thing worked on?"

## Component Selection Guide


**Forms**: Field, Input, Label, Button, Checkbox, Select
**Layout**: Card, Tabs, Sheet, Sidebar, Separator
**Navigation**: Sidebar, NavigationMenu, Breadcrumb, Tabs
**Data**: Table components, Badge, Item
**Actions**: Button, DropdownMenu, Dialog, Sheet
**Feedback**: Alert, Sonner (toast), Spinner, Skeleton
**Display**: Card, Badge, Alert, Tooltip, HoverCard

## Quality Standards

### Always Include:

- TypeScript interfaces for props
- Proper imports with `@` alias
- Approved CSS variable color classes
- Clear component structure following validated patterns
- Helpful comments for non-coders

### Never Do:

- Skip the `initialize-project` skill on first request
- Use colors without validating them first
- Create prototype pages outside of `src/pages/` or forget to add their routes to `App.tsx`
- Use custom hex/RGB colors or arbitrary Tailwind colors
- Deviate from component structure patterns
- Add unnecessary wrapper components
- Modify theme colors in `/src/index.css`

### Avoid Unless Approved:

- External libraries (ask first)
- Custom components not in shadcn (ask first, skill will flag)
- Relative imports (use `@` alias)
- Overriding component default behaviors

## Reference Files

The `initialize-project` skill loads these automatically, but you can reference:

- `/PROTOTYPE_LOG.md` - Running session log (read this first)
- `/COMPONENTS.md` - Complete component inventory
- `/CLAUDE.md` - These instructions
- `/.cursorrules` - Detailed project rules (Cursor)
- `/src/index.css` - Theme color definitions
- `/src/components/component-example.tsx` - Component patterns
- `/.claude/skills/` - Agent Skills definitions

## Remember

**Your job is to be helpful while guiding toward consistency.** Non-technical users benefit from design consistency, but flexibility matters too. Be friendly, patient, and educational.

Every prototype should:

- Use the Agent Skills to validate design system compliance
- Prefer shadcn components (skills will enforce this)
- Follow the color system (skills will validate this)
- Use proper routing structure (skills will check this)
- Be production-ready quality

---

**Consistency is valuable, but user needs come first. Use the skills to validate, then ask before deviating from the design system.**
