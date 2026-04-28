# XDL Design System - Copilot Instructions

## Project Overview

XDL Design System is a **Next.js 16 + React 19** component library and design system reference implementation. It showcases a comprehensive color palette, icon system, and reusable UI components built with shadcn/ui, Tailwind CSS, and Radix UI.

**Key Tech Stack:**

- **Framework:** Next.js 16.0.1 with Turbopack (via `next dev --turbopack`)
- **UI:** shadcn/ui (New York style, RSC-enabled)
- **Styling:** Tailwind CSS 4.x with CSS variables, PostCSS
- **Theme:** next-themes provider with light/dark mode support
- **Icons:** Custom SVG icon library with size mapping
- **Fonts:** National 2 (custom), Inter (secondary)

## Build & Development Workflow

### Essential Commands

```bash
pnpm dev              # Start dev server with Turbopack (localhost:3000)
pnpm build            # Production build with Turbopack
pnpm start            # Run production server
pnpm lint             # ESLint (flat config via eslint.config.mjs)
```

**Hot Reload:** Next.js fast refresh automatically updates changes. Theme changes apply instantly via next-themes provider.

## Architecture Patterns

### 1. **Component Organization**

- **`src/components/ui/`** — Shadcn UI components (Card, Accordion, Input) + custom Icon
- **`src/components/global/`** — App-level providers: ThemeProvider, ThemeSwitcher, FigmaOverlay
- **`src/components/design-system-tools/`** — Reference components (ColorSwatch) showcasing design tokens
- **`src/components/ui/icons/`** — 100+ SVG icons, organized alphabetically

**Pattern:** Use `"use client"` in client components; RSC-first by default.

### 2. **Design Token System**

> ⚠️ **IMPORTANT: Always prefer design tokens over arbitrary values.** Before using arbitrary Tailwind values like `text-[14px]`, `bg-[#1e3145]`, or `p-[12px]`, check if a design token exists in `globals.css`. This ensures consistency, theme support, and maintainability.

Use Tailwind utilities for all design tokens. The comprehensive token system is defined in `src/app/globals.css` and integrated with Tailwind via CSS variables.

#### Token Categories

| Category             | Token Examples                                                                   | Tailwind Usage                                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Semantic Colors**  | `--color-text-default`, `--color-background-primary`, `--color-action-default`   | `text-text-default`, `bg-background-primary`, `text-action-default`      |
| **Primitive Colors** | `--color-neutral-800`, `--color-blue-550`, `--color-red-600`                     | `bg-neutral-800`, `text-blue-550`, `border-red-600`                      |
| **Sentiment Colors** | `--color-sentiment-positive-foreground`, `--color-sentiment-negative-background` | `text-sentiment-positive-foreground`, `bg-sentiment-negative-background` |
| **Border Colors**    | `--color-border-soft`, `--color-border-subtle`, `--color-border-regular`         | `border-border-soft`, `border-border-subtle`                             |
| **Typography**       | `--text-size-14`, `--font-weight-medium`, `--tracking-tight`                     | `text-size-14`, `font-weight-medium`, `tracking-tight`                   |
| **Border Radius**    | `--radius-small`, `--radius-medium`, `--radius-large`, `--radius-max`            | `rounded-small`, `rounded-medium`, `rounded-large`, `rounded-max`        |
| **Shadows**          | `--shadow-lift`, `--shadow-pop`, `--shadow-border-all`                           | `shadow-lift`, `shadow-pop`, `shadow-border-all`                         |
| **Motion**           | `--motion-speed-fast`, `--motion-curve-standard`                                 | Use CSS variables directly in transitions                                |

#### Typography Utilities

Pre-composed text styles are available as Tailwind utilities:

```tsx
// Headings (use --font-primary / National 2)
<h1 className="text-heading-super-bold" />      // 64px, bold
<h2 className="text-heading-large-bold" />      // 44px, bold
<h3 className="text-heading-standard-bold" />   // 32px, bold
<h4 className="text-heading-small-bold" />      // 24px, bold

// Body text
<p className="text-body-standard-regular" />    // 15px, regular
<p className="text-body-small-semibold" />      // 13px, semibold

// Labels, data, navigation, buttons
<span className="text-label" />                 // 12px, semibold
<span className="text-data-large-bold" />       // 17px, bold
<span className="text-button-standard-medium" /> // 14px, medium
```

#### ❌ Don't Use Arbitrary Values When Tokens Exist

```tsx
// ❌ BAD - arbitrary values
<div className="text-[15px] text-[#1e3145] p-[12px] rounded-[6px]" />

// ✅ GOOD - design tokens
<div className="text-size-15 text-neutral-800 p-3 rounded-medium" />

// ❌ BAD - hardcoded colors
<button className="bg-[#1f68dd] hover:bg-[#1c5dc5]" />

// ✅ GOOD - semantic action colors (theme-aware)
<button className="bg-action-default hover:bg-action-hover" />
```

#### Color Families Available

- **Primitive**: `neutral`, `red`, `orange`, `yellow`, `green`, `mint`, `turquoise`, `blue`, `violet`, `grape`, `pink` (each with shades 25–950)
- **Semantic**: `text-*`, `background-*`, `action-*`, `sentiment-*`, `border-*`, `icon-*`, `theme-*`, `pair-*`, `indicator-*`, `dataviz-*`
- **Alpha**: `alpha-darken-*`, `alpha-lighten-*` (5–95)

### 3. **Icon System (Icon Component)**

**File:** `src/components/ui/Icon.tsx`

Five preset sizes with predefined container/icon dimensions:

- `xsmall`: 20×20px
- `small`: 24×24px (20px icon + 2px padding)
- `medium`: 32×32px (20px icon + 6px padding)
- `large`: 40×40px (20px icon + 8px padding)
- `xlarge`: 48×48px (20px icon + 14px padding)

**Usage:**

```tsx
import Icon from "@/components/global/Icon";

<Icon name="Bell" size="medium" className="text-primary" />;
```

The `name` prop is type-safe and accepts any icon name from `src/components/ui/icons/`. TypeScript will autocomplete available icon names and catch typos at compile time.

### 4. **Theme Management**

- **Provider:** `ThemeProvider` wraps app via `next-themes` (RSC-compatible)
- **Switcher:** `ThemeSwitcher` component in `src/components/global/ThemeSwitcher.tsx` toggles `data-theme` attribute
- **CSS:** Light/dark mode variables defined in `globals.css` using `@custom-variant dark`
- **Storage:** Persists theme preference to localStorage

## Code Patterns & Conventions

### Naming & File Structure

- **Components:** PascalCase (e.g., `GlobalNavigation.tsx`, `IconsSection.tsx`)
- **Utilities:** camelCase (e.g., `lib/utils.ts`, `lib/colors.ts`)
- **CSS Classes:** Use `cn()` utility (clsx + twMerge) to combine Tailwind classes without conflicts
  ```tsx
  import { cn } from "@/lib/utils";
  <div className={cn("base-class", conditionalClass && "extra-class")} />;
  ```

### Shadcn/UI Component Pattern

> ⚠️ **IMPORTANT: Never import directly from Radix UI.** Always use shadcn/ui components from `@/components/ui/`. If a component doesn't exist, use the Shadcn MCP to install it first, then import from `@/components/ui/`.

```tsx
// ❌ BAD - Never import from Radix UI directly
import * as Dialog from "@radix-ui/react-dialog";
import { Checkbox } from "@radix-ui/react-checkbox";

// ✅ GOOD - Always import from shadcn ui directory
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
```

**Adding New Components:** If a shadcn component is not yet installed:

1. Use the Shadcn MCP to install the component from the registry
2. Import from `@/components/ui/` after installation

All shadcn components follow this structure (e.g., `card.tsx`):

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-card text-card-foreground rounded-xl", className)}
      {...props}
    />
  );
}

export { Card };
```

**Key traits:** `data-slot` attributes for styling hooks, `cn()` for className composition, spread `...props`.

### Client Components

Mark with `"use client"` when using:

- React hooks (useState, useContext, etc.)
- Event handlers (onClick, onChange)
- next-themes (ThemeProvider)

Example:

```tsx
"use client";

import { useState } from "react";

export default function IconsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  // ...
}
```

## Path Aliases (components.json)

```json
"@/components" → src/components
"@/lib"        → src/lib
"@/ui"         → src/components/ui
"@/hooks"      → src/app/hooks
```

Always use aliases; never relative imports within src/.

## Linting & Code Quality

**ESLint Config:** `eslint.config.mjs` (flat config format)

- Extends `eslint-config-next/core-web-vitals` + TypeScript
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

Run `pnpm lint` before commits.

## Common Tasks

### Adding a New Component

1. Create file in `src/components/ui/ComponentName.tsx`
2. Export named export (not default)
3. Use `cn()` for className composition
4. Include `"use client"` if stateful

### Adding an Icon

Don't add new icons manually. Use the closest match in `src/components/ui/icons/`.

### Updating Colors

Don't update colors manually. Use Tailwind CSS classes referencing design tokens in `globals.css`. Always prefer semantic tokens (e.g., `text-text-default`, `bg-action-default`) over primitive colors (e.g., `text-neutral-800`) when appropriate, as semantic tokens automatically adapt to light/dark themes.

### Dark Mode Support

Colors/components automatically respond to theme via CSS custom properties. Test with ThemeSwitcher in layout.

## Troubleshooting

| Issue                      | Solution                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Import errors              | Use `@/` aliases, check `components.json` paths                                                                                |
| Styles not applying        | Verify Tailwind class syntax; use `cn()` to merge conflicting classes                                                          |
| Icons missing              | Check `src/components/ui/icons/` directory; ensure export matches usage                                                        |
| Theme not persisting       | Verify `ThemeProvider` wraps `IframeProvider` in `layout.tsx`                                                                  |
| Build fails with Turbopack | Clear `.next/` and retry; check Next.js 16 compatibility                                                                       |
| Using arbitrary values     | Check `globals.css` for design tokens first; prefer `text-size-14` over `text-[14px]`, `bg-action-default` over `bg-[#1f68dd]` |

## Resources

- **Next.js 16 Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind CSS 4:** https://tailwindcss.com
