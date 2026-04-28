# Xero Homepage Public Beta - AI Coding Instructions

## Project Overview

This is a Next.js 15 prototype of a reimagined Xero dashboard experience featuring:

- **Multi-region support** (UK, USA, NZ, AU) with dynamic content localization
- **Draggable widget grid** system with customizable layouts
- **Sliding panel navigation** architecture with sub-panels
- **Chart visualizations** using Highcharts with custom theming
- **Sample data only** - no real customer data

## Tech Stack

- Next.js 15.5.4 with App Router, React 19, TypeScript
- Tailwind CSS v4 (inline `@theme` in `globals.css`, no `tailwind.config.*`)
- pnpm package manager
- Turbopack dev server (`pnpm dev`)
- Highcharts for data visualization
- react-grid-layout for draggable widgets
- Vercel Edge for geolocation middleware

## Architecture Patterns

### Region System

The app serves region-specific content using a three-layer system:

1. **Middleware detection** (`src/middleware.ts`) - Uses Vercel geolocation to detect country and set region cookie
2. **RegionContext** (`src/app/contexts/RegionContext.tsx`) - Client-side region state with cookie persistence
3. **RegionContent** (`src/app/lib/RegionContent.ts`) - Massive 2000+ line configuration file containing all region-specific data (financial periods, navigation menus, widget data)

**Usage patterns:**

- Access region: `const { region } = useRegion()`
- Get region data: `getRegionContent(category, key, region)` returns nested objects
- Display region text: `<RegionText textKey="category.key" fallback="..." />`
- Hotkeys: Alt+1/2/3/4 switch between UK/USA/NZ/AU

### Widget System

Widgets are self-contained React components in `src/app/components/widgets/`:

- Each exports named function (e.g., `export function BillableHours()`)
- Wrapped by `<CustomizationOverlay>` for drag/resize UI
- Standard props: `{ className, isCustomising, onToggleColSpan, colSpan }`
- Companion overflow menus in `widgets/overflow/` with kebab-case filenames
- All widgets exported via barrel file `widgets/index.ts`

**Widget structure:**

```tsx
export function WidgetName({
  className = "",
  isCustomising = false,
  onToggleColSpan,
  colSpan = 1,
}) {
  const { region } = useRegion();
  const regionData = getRegionContent("text", "widgetName", region);

  return (
    <CustomizationOverlay
      isCustomising={isCustomising}
      onToggleColSpan={onToggleColSpan}
      colSpan={colSpan}
    >
      <div
        className={`relative flex h-auto min-h-[521px] w-[440px] flex-col rounded-xl bg-white lg:h-[521px] ${className}`}
      >
        {/* Widget content */}
      </div>
    </CustomizationOverlay>
  );
}
```

### Navigation Architecture

Two-tier sliding panel system managed by `NavigationContext`:

1. **Primary panels** - Search, Jax, Help, To-Do, Notifications, Apps (components in `src/app/components/panels/`)
2. **Sub-panels** - Secondary content slides in from right (e.g., `SlidingSubPanel` in `global/`)
3. **Panel state** - Managed via `openPanel(type, subPanel?, isDirect?)` from `useNavigation()`

Panel positioning adapts to scroll: starts at `top: 104px`, moves to `top: 40px` when scrolled.

### Draggable Grid System

`DraggableGrid.tsx` implements responsive widget layout with breakpoints:

- **xxs** (<800px): Single column, full width
- **xs** (800-1000px): 1 column, 440px widgets
- **sm** (1000-1600px): 2 columns
- **md** (1600px+): 3 columns

Widgets have `colSpan` (1 or 2) for size variations. Grid persists to localStorage via `dashboard.tsx`.

### Highcharts Integration

Charts in `src/app/components/charts/`:

- Import: `import Highcharts from "highcharts"`
- Apply global theme: `setOptions(theme)` from `./Theme.tsx`
- Use `<HighchartsReact>` wrapper with region-specific data
- Common pattern: Donut charts with centered labels using absolute positioning overlay

## Path Aliases (tsconfig.json)

- `@/*` → `./src/*`
- `@/components/*` → `./src/app/components/*`
- `@/icons/*` → `./src/app/components/ui/icons/*`
- `@/lib/*` → `./src/lib/*`
- `@/app/*` → `./src/app/*`

## Styling Conventions

- **Tailwind v4 syntax**: Custom properties in `@theme` block in `globals.css` - NO `tailwind.config.*` file
- **Theme tokens**: Use semantic design tokens instead of arbitrary values where possible
  - Typography: `text-sm-relaxed` (13px/20px), `text-base-relaxed` (15px/24px), `text-md-tall` (17px/28px), `text-xl` (24px/28px)
  - Colors: `text-content-primary`, `bg-background-hover`, `text-brand-primary`, `border-background-tertiary`
  - Containers: `w-container-sm` (480px), `w-container-md` (964px), `w-container-lg` (1424px)
  - Radius: `rounded-sm` (3px), `rounded-pill` (48px), `rounded-md` (10px)
- **Avoid arbitrary values**: Only use `[value]` syntax for truly unique, one-off values where possible
- Responsive prefixes: `lg:`, `2xl:`, custom `nav-1049:` for navigation breakpoints
- Animations: `transition-all duration-200 ease-in-out` for hover states

## File Organization

- **Client components**: Mark with `"use client"` at top (most components due to interactivity)
- **Server components**: Only `layout.tsx` and initial page loader remain server-side
- **Dynamic imports**: `dashboard.tsx` uses `dynamic(() => import(), { ssr: false })` with loading skeleton
- **Barrel exports**: Use index files (`components/global/index.ts`, `widgets/index.ts`) for cleaner imports

## Development Workflow

```bash
pnpm install          # Install dependencies
pnpm dev             # Start dev server with Turbopack
pnpm build           # Production build
pnpm format          # Format with Prettier (includes Tailwind plugin)
pnpm lint            # ESLint check
```

## Key Gotchas

- **Hydration mismatches**: Use `useEffect` + state for scroll-dependent styles (see `Header.tsx` `isHydrated` pattern)
- **Grid layout**: Widgets must have exact pixel dimensions (`width`, `height`, `minWidth`, `minHeight`) for proper dragging
- **Region data**: Always provide fallback values when accessing nested region content
- **SSR**: Vercel middleware sets region cookie server-side, but client components read from context
- **Overflow menus**: Naming mismatch - PascalCase component names vs kebab-case filenames in `overflow/`

## Testing Region Changes

- Use hotkeys: Alt/Option + 1/2/3/4 for UK/USA/NZ/AU
- Or add `?force=true` query param to re-detect region from IP
- Check `RegionContent.ts` for available region-specific data paths
