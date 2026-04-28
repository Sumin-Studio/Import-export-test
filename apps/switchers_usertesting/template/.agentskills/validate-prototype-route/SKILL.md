---
name: validate-prototype-route
description: Validates prototype page structure. The home page is the prototype canvas — confirm content goes in home.tsx, and that any additional pages are properly routed. Use before creating new prototype pages.
metadata:
  author: prototype-template
  version: "2.0"
allowed-tools: Read Glob
---

# Validate Prototype Route

This skill ensures prototype pages are structured correctly under the simplified routing model.

## The Prototype Structure Rules

### Core Principle

**The home page (`/src/pages/home.tsx`) at the `/` route IS the prototype canvas.**

Build directly in `home.tsx`. There is no separate `/prototype` route.

### Single-Page Prototypes

Build everything directly in `/src/pages/home.tsx`. No routing changes required.

### Multi-Page Prototypes

For prototypes that need multiple pages:

1. Create additional page files in `/src/pages/` with clear, descriptive names (e.g., `dashboard.tsx`, `settings.tsx`)
2. Export them from `/src/pages/index.ts`
3. Add routes to `/src/App.tsx`:
   ```tsx
   <Route path="/" element={<HomePage />} />
   <Route path="/dashboard" element={<DashboardPage />} />
   <Route path="/settings" element={<SettingsPage />} />
   ```
4. Use React Router's `<Link>` for navigation between pages

## Instructions

### Step 1: Determine Prototype Type

- Single-page? → Build in `home.tsx` directly
- Multi-page? → Plan the additional pages needed

### Step 2: For Multi-Page — Check Existing Routes

Read `/src/App.tsx` to see what routes already exist before adding new ones.

### Step 3: For Multi-Page — Validate File and Route Setup

Ensure:
- New page files are in `src/pages/` with clear names
- They are exported from `src/pages/index.ts`
- Routes are added to `src/App.tsx`

## Output Format

### Single-Page Prototype

```
✅ Prototype structure validated

Single-page prototype:
- Build directly in /src/pages/home.tsx (renders at /)
- No routing changes needed
```

### Multi-Page Prototype

```
✅ Prototype structure validated

Multi-page prototype:
- Home/entry: /src/pages/home.tsx → /
- Dashboard: /src/pages/dashboard.tsx → /dashboard
- Settings: /src/pages/settings.tsx → /settings

Actions required:
1. Create page files in src/pages/
2. Export from src/pages/index.ts
3. Add routes to src/App.tsx
```
