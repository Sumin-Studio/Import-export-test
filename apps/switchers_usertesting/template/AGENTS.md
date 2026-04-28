> **STOP. Read this entire file before writing any code or responding to this request.**

# Prototype Template - AI Agent Instructions

Internal prototyping tool using React 19, TypeScript, Vite, Tailwind CSS 4, and shadcn/ui. Users may not have coding experience.

---

## MANDATORY FIRST STEP

Before responding to ANY request, complete these steps:

1. Read `/COMPONENTS.md` — the complete inventory of 55 available shadcn/ui components
2. Read `/src/components/component-example.tsx` — correct component structure patterns
3. Read `/src/index.css` — the locked color palette (CSS variables only)
4. Understand prototype structure — all prototypes live in `prototype.tsx` (see below)

**If your tool supports Agent Skills** (`.agentskills/` directory), invoke `initialize-project` instead — it handles all of the above automatically.

---

## Architecture

- **Routing**: React Router v7 — `src/App.tsx`
- **Components**: shadcn/ui primitives in `src/components/ui/`, built on `@base-ui/react` — **NOT Radix UI** (see warning below)

- **Styling**: Tailwind v4 with CSS variables in `src/index.css` — OKLch color space
- **Utils**: `cn()` helper in `src/lib/utils.ts`

---

> **⚠️ This project uses Base UI (`@base-ui/react`), NOT Radix UI.** Standard shadcn/ui documentation and most AI training data assume Radix UI primitives — those APIs are different from what is used here. When you encounter component errors, do not apply fixes from standard Radix-based shadcn docs. Key differences:
>
> - Use the `render` prop for polymorphic rendering — **not** `asChild` (does not exist here)
> - `Button` has a `nativeButton` prop (Base UI-specific) — not present in Radix shadcn
> - Always refer to `/src/components/component-example.tsx` for correct usage patterns

## Rules

### 1. Components — Use shadcn First

We have 55 shadcn/ui components in `/COMPONENTS.md`. Always prefer these over custom solutions.

Read `/src/components/component-example.tsx` for the correct structure pattern before using any component.

**Critical patterns:**

```tsx
// Sheet: Header → content div with p-4 → Footer (NO ScrollArea inside)
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
// Dialog/Drawer: same header/content/footer pattern
// Tabs: TabsList with TabsTrigger → TabsContent per tab
```

**Button with render prop** — always include `nativeButton={false}` when the render element is not a `<button>`. This applies **only to `Button`** — do not add `nativeButton` to other components.

```tsx
// ✅ CORRECT
<Button render={<Link to="/path" />} nativeButton={false}>
  Link
</Button>
```

**DropdownMenuTrigger** — use the `render` prop to set the trigger element. Do NOT add `nativeButton` to `DropdownMenuTrigger`.

```tsx
// ✅ CORRECT
<DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
  <MoreVerticalIcon />
</DropdownMenuTrigger>
```

**Global components:**



**When shadcn doesn't have what you need:** Ask the user for approval before creating a custom component.

---

### 2. Colors — Strict, Locked Palette

**ONLY use CSS variable classes. NEVER modify `/src/index.css` or introduce custom colors.**

```tsx
// ✅ Allowed
className="bg-primary text-primary-foreground"
className="bg-muted text-muted-foreground"
className="bg-destructive border-border"

// ❌ Forbidden — refuse even if the user requests it
className="bg-blue-500"
className="bg-[#3B82F6]"
style={{ color: 'pink' }}
```

**Approved classes:**

| Category    | Classes                                                                                                                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backgrounds | `bg-background`, `bg-primary`, `bg-secondary`, `bg-accent`, `bg-muted`, `bg-destructive`, `bg-card`, `bg-popover`                                                                                              |
| Text        | `text-foreground`, `text-primary-foreground`, `text-secondary-foreground`, `text-accent-foreground`, `text-muted-foreground`, `text-destructive-foreground`, `text-card-foreground`, `text-popover-foreground` |
| Borders     | `border-border`, `ring-ring`                                                                                                                                                                                   |
| Charts      | `chart-1` through `chart-5`                                                                                                                                                                                    |

**When users request custom colors**, politely decline:

> "Our design system uses a locked color palette for consistency. I can use **primary**, **secondary**, **accent**, **muted**, or **destructive** — which works best?"

---

### 3. Prototype Page Structure

The home page (`/src/pages/home.tsx`) at the `/` route **is** the prototype canvas — build directly here.

| Rule                                    | Detail                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single-page by default                  | Build directly in `home.tsx` — this includes multi-step flows, wizards, and onboarding sequences. Even if the prototype has many steps or panels, it is single-page if users don't navigate to a different URL.                                                                                                             |
| Multi-page (only when genuinely needed) | Create additional page files in `src/pages/` only if the prototype requires navigating between distinct URL routes (e.g. `/dashboard`, `/settings`). Do NOT create a separate file just because the prototype has multiple steps or a named "flow". Export new pages from `src/pages/index.ts` and add routes to `App.tsx`. |

**Route config for multi-page prototypes:**

```tsx
// ✅ Add routes as needed
<Route path="/" element={<HomePage />} />
<Route path="/dashboard" element={<DashboardPage />} />
<Route path="/settings" element={<SettingsPage />} />
```

---

### 4. Imports — Always Use Aliases

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Never: "../components/ui/button"
```

---

### 5. Conventions

| Aspect     | Convention                                           |
| ---------- | ---------------------------------------------------- |
| Files      | kebab-case: `user-profile.tsx`                       |
| Components | PascalCase: `UserProfile`                            |
| Variables  | camelCase                                            |
| Icons      | `lucide-react` only — no other libraries             |
| State      | React 19 hooks; `next-themes` for dark mode          |
| Types      | All files `.tsx`/`.ts` with explicit prop interfaces |

---

### 6. Charts

Use the most appropriate chart type for the data and context. All chart types from recharts are available.

| Chart Type  | Best for                                          |
|---|---|
| `BarChart`  | Comparing values across categories                |
| `LineChart` | Trends over time                                  |
| `AreaChart` | Trends with volume/magnitude emphasis             |
| `PieChart`  | Part-to-whole relationships (use sparingly)       |

**Stacked bar charts — radius on topmost bar only:**

```tsx
<Bar dataKey="overdue" stackId="a" fill="var(--color-overdue)" radius={[0, 0, 0, 0]} />
<Bar dataKey="upcoming" stackId="a" fill="var(--color-upcoming)" radius={[4, 4, 0, 0]} />
```

**Chart container — always use `ChartContainer`:**

Always wrap charts in `ChartContainer` from `@/components/ui/chart` with an explicit pixel height. Never use raw `ResponsiveContainer` — `ChartContainer` handles this internally.

```tsx
// ✅ CORRECT
<ChartContainer config={chartConfig} className="h-[300px] w-full">
  <BarChart data={data} accessibilityLayer>
    ...
  </BarChart>
</ChartContainer>

// ❌ WRONG — causes width/height errors
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>...</BarChart>
</ResponsiveContainer>
```

---

### 7. Written Content — STRICT

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

1. Read `/PROTOTYPE_LOG.md` to understand what's already been built
2. Read `/COMPONENTS.md` and `/src/components/component-example.tsx`
3. Read existing code before modifying anything
4. Validate components against `component-example.tsx` patterns
5. Validate colors against the approved CSS variable list
6. Check `src/App.tsx` if creating additional pages — add routes as needed
7. Write TypeScript with proper imports and types
8. Explain what you built
9. Append a session entry to `/PROTOTYPE_LOG.md`

---

## Quality Standards

**Always:** TypeScript interfaces, `@` alias imports, CSS variable colors, validated component patterns

**Never:** Custom hex/RGB colors, arbitrary Tailwind colors, ScrollArea inside Sheet/Dialog/Drawer, modifying `/src/index.css`

**Ask before:** External UI libraries, custom components, non-BarChart types, state libraries

---

## Reference Files

- `/PROTOTYPE_LOG.md` — Running session log (read this first)
- `/COMPONENTS.md` — Component inventory (55 components)
- `/src/components/component-example.tsx` — Structure patterns
- `/src/index.css` — Theme colors (locked)
- `/CLAUDE.md` — Claude Code instructions
- `/.cursorrules` / `.cursor/rules/` — Cursor instructions
- `/.agentskills/` — Agent Skills (for compatible tools)

---

**Consistency is valuable, but user needs come first. Validate against the design system, then ask before deviating.**
