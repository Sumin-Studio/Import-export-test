# Vercel Build Issues & Solutions Guide

**Last Updated:** November 28, 2025  
**Branch:** `fix/remove-unused-import`

This document explains all the Vercel build issues encountered and how to prevent them in future deployments.

---

## Table of Contents

1. [Overview](#overview)
2. [Issues Encountered](#issues-encountered)
3. [Root Causes](#root-causes)
4. [Solutions Applied](#solutions-applied)
5. [Prevention Guidelines](#prevention-guidelines)
6. [Testing Before Deployment](#testing-before-deployment)
7. [Vercel-Specific Considerations](#vercel-specific-considerations)

---

## Overview

Vercel builds differ from local development in several critical ways:
- **Environment Variables**: May not be available during build time (even `NEXT_PUBLIC_*` vars)
- **TypeScript Strict Mode**: Vercel uses stricter type checking than local dev mode
- **Static Generation**: Pages are pre-rendered at build time, not runtime
- **Dependency Resolution**: All dependencies must be in `package.json`

---

## Issues Encountered

### Issue 1: TypeScript Narrowing Error in `color-bends.tsx`

**Error:**
```
Type error: Property 'addEventListener' does not exist on type 'never'.
  212 |       window.addEventListener("resize", handleResize);
      |              ^
```

**Problem:** TypeScript's control flow analysis narrowed `window` to type `never` in the else block when using the `"ResizeObserver" in window` check.

**Location:** `src/components/ui/color-bends.tsx:212`

---

### Issue 2: Missing Three.js Dependency

**Error:**
```
Module not found: Can't resolve 'three'
```

**Problem:** `three.js` was imported in components but not listed in `package.json` dependencies.

**Affected Files:**
- `src/components/ui/color-bends.tsx`
- `src/components/ui/curved-loop-text.tsx`

---

### Issue 3: Missing useRef Initial Value

**Error:**
```
Type error: Expected 1 arguments, but got 0.
  26 |   const rafRef = useRef<number>();
     |                  ^
```

**Problem:** TypeScript requires an initial value for `useRef` when not providing undefined as part of the type.

**Location:** `src/components/ui/curved-loop-text.tsx:26`

---

### Issue 4: Clerk Provider Missing During Build

**Error:**
```
Error: @clerk/clerk-react: UserButton can only be used within the <ClerkProvider /> component.
```

**Problem:** `UserButton` component was rendered on pages that were being statically generated, but `ClerkProvider` was conditionally rendered and not wrapping the app during build time.

**Location:** `src/app/layout.tsx`, `src/components/layout/site-layout.tsx`

---

### Issue 5: Missing Clerk Publishable Key

**Error:**
```
Error: @clerk/clerk-react: Missing publishableKey.
```

**Problem:** When `ClerkProvider` was made unconditional, it required the publishable key which wasn't available in the Vercel build environment.

**Location:** `src/app/layout.tsx`

---

### Issue 6: Unused Import Warning

**Error:**
```
Warning: 'ChevronLeft' is defined but never used.
```

**Problem:** Imported icon that was removed from the component but import statement remained.

**Location:** `src/components/home/getting-started-tab.tsx:4`

---

## Root Causes

### 1. **TypeScript Narrowing Issues**
TypeScript's type narrowing can be overly aggressive with certain patterns. The `in` operator check makes TypeScript assume the condition is always true in modern browsers, leading to the else block being typed as unreachable (`never`).

### 2. **Build-time vs Runtime Differences**
Components that work in development may fail during static generation because:
- Environment variables might not be available
- Provider contexts must be available during SSR/SSG
- Browser APIs aren't available during build

### 3. **Dependency Management**
If a dependency works locally but isn't in `package.json`, it's likely installed as a transitive dependency. Vercel may not have it available depending on how it resolves the dependency tree.

---

## Solutions Applied

### Solution 1: TypeScript-Safe Feature Detection

**Before:**
```typescript
if ("ResizeObserver" in window) {
  const ro = new ResizeObserver(handleResize);
  ro.observe(container);
  resizeObserverRef.current = ro;
} else {
  window.addEventListener("resize", handleResize);
}
```

**After:**
```typescript
if (typeof ResizeObserver !== "undefined") {
  const ro = new ResizeObserver(handleResize);
  ro.observe(container);
  resizeObserverRef.current = ro;
} else {
  window.addEventListener("resize", handleResize);
}
```

**Why:** Using `typeof` check prevents TypeScript from narrowing `window` to `never` type.

**Files Changed:**
- `src/components/ui/color-bends.tsx:207` (setup)
- `src/components/ui/color-bends.tsx:238` (cleanup)

---

### Solution 2: Add Missing Dependencies

**Action:** Added `three` package to `package.json`

```bash
bun add three
```

**Result:** `three@0.181.2` and `@types/three@0.181.0` added

---

### Solution 3: Proper useRef Initialization

**Before:**
```typescript
const rafRef = useRef<number>();
```

**After:**
```typescript
const rafRef = useRef<number | null>(null);
```

**Why:** TypeScript requires an initial value. Using `null` is appropriate for refs that will be assigned later.

**File Changed:** `src/components/ui/curved-loop-text.tsx:26`

---

### Solution 4: Conditional Clerk Integration

**Root Layout** (`src/app/layout.tsx`):
```typescript
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  return (
    <html lang="en">
      <body className={/* ... */}>
        {clerkPublishableKey ? (
          <ClerkProvider>
            {children}
          </ClerkProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
```

**Site Layout** (`src/components/layout/site-layout.tsx`):
```typescript
export function SiteLayout({ children }: SiteLayoutProps) {
  const hasClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-primary">
            The Builders Workshop
          </Link>
          {hasClerk && <UserButton /* ... */ />}
        </div>
      </header>
      {/* ... */}
    </div>
  );
}
```

**Why:** 
- App builds successfully even without Clerk configured
- Gracefully handles missing environment variables
- Allows for staged deployments or preview branches without auth

---

### Solution 5: Remove Unused Imports

**Before:**
```typescript
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Copy, Check, ExternalLink } from "lucide-react";
```

**After:**
```typescript
import { ChevronDown, ChevronUp, ChevronRight, Copy, Check, ExternalLink } from "lucide-react";
```

**File Changed:** `src/components/home/getting-started-tab.tsx:4`

---

## Prevention Guidelines

### 1. Always Test Builds Locally

Before pushing to Vercel, run a production build:

```bash
bun run build
```

This catches most TypeScript and build errors before they reach Vercel.

---

### 2. Simulate Missing Environment Variables

Test builds without environment variables to catch dependency issues:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="" bun run build
```

This simulates Vercel's build environment when env vars aren't configured.

---

### 3. Use TypeScript-Safe Feature Detection

**Prefer `typeof` checks over `in` operator:**

❌ **Avoid:**
```typescript
if ("ResizeObserver" in window) { /* ... */ }
if ("IntersectionObserver" in window) { /* ... */ }
```

✅ **Use:**
```typescript
if (typeof ResizeObserver !== "undefined") { /* ... */ }
if (typeof IntersectionObserver !== "undefined") { /* ... */ }
```

---

### 4. Make Third-Party Providers Optional

When integrating authentication or other services, always make them optional:

```typescript
const hasProvider = process.env.NEXT_PUBLIC_PROVIDER_KEY;

return (
  <html>
    <body>
      {hasProvider ? (
        <Provider>{children}</Provider>
      ) : (
        children
      )}
    </body>
  </html>
);
```

**Benefits:**
- Builds succeed without configuration
- Preview deployments work independently
- Easier local development
- Better error messages

---

### 5. Initialize useRef Properly

Always provide an initial value to `useRef`:

❌ **Avoid:**
```typescript
const rafRef = useRef<number>();
```

✅ **Use:**
```typescript
const rafRef = useRef<number | null>(null);
```

---

### 6. Keep Dependencies Explicit

If you import a package, add it to `package.json`:

```bash
bun add <package-name>
```

Don't rely on transitive dependencies.

---

### 7. Use ESLint and Fix Warnings

Run linting before committing:

```bash
bun run lint
```

Fix all warnings, especially unused imports. They indicate potential issues.

---

## Testing Before Deployment

### Pre-Deployment Checklist

Run these commands before pushing to Vercel:

```bash
# 1. Clean build
rm -rf .next
bun run build

# 2. Test without env vars
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="" bun run build

# 3. Type check
npx tsc --noEmit

# 4. Lint check
bun run lint

# 5. Run tests (if available)
bun run test
```

### Verify Build Output

Check the build output for:
- ✅ All pages successfully generated
- ✅ No TypeScript errors
- ✅ No ESLint warnings
- ✅ Reasonable bundle sizes

---

## Vercel-Specific Considerations

### Environment Variables

**Important:** Even `NEXT_PUBLIC_*` variables might not be available during build:

1. **Set in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and other vars
   - Set for all environments (Production, Preview, Development)

2. **Make Usage Optional:**
   - Always check if env var exists before using
   - Provide fallback behavior when missing
   - Don't crash the build if optional vars are missing

### Static Generation

Pages using `export const dynamic = 'force-static'` or being statically generated must:
- Not rely on runtime-only APIs
- Have all required data at build time
- Not use components requiring client-side context (unless wrapped in client components)

### Build Cache

Vercel caches builds. If issues persist after fixes:
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" → Check "Clear build cache"

---

## Summary of Changes Made

### Files Modified

1. **`src/components/ui/color-bends.tsx`**
   - Changed feature detection from `in` operator to `typeof` check
   - Lines 207, 238

2. **`src/components/ui/curved-loop-text.tsx`**
   - Added initial value to `rafRef`
   - Line 26

3. **`src/app/layout.tsx`**
   - Made `ClerkProvider` conditional based on env var
   - Lines 27-41

4. **`src/components/layout/site-layout.tsx`**
   - Made `UserButton` conditional
   - Lines 10, 21-30

5. **`src/components/home/getting-started-tab.tsx`**
   - Removed unused `ChevronLeft` import
   - Line 4

6. **`package.json`**
   - Added `three@0.181.2`
   - Added `@types/three@0.181.0`

### Dependencies Added

```json
{
  "dependencies": {
    "three": "^0.181.2"
  },
  "devDependencies": {
    "@types/three": "^0.181.0"
  }
}
```

---

## Future Recommendations

1. **Add a pre-commit hook** to run `bun run build` before allowing commits to main branches

2. **Create a GitHub Action** to test builds in CI/CD before merging PRs

3. **Document required environment variables** in a `.env.example` file

4. **Add build scripts** to `package.json` for testing without env vars:
   ```json
   {
     "scripts": {
       "build:no-env": "env -i bun run build"
     }
   }
   ```

5. **Consider feature flags** for optional integrations like Clerk, allowing them to be toggled without code changes

---

## Quick Reference

### Common Vercel Build Errors

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| `Property 'X' does not exist on type 'never'` | TypeScript narrowing issue | Use `typeof` instead of `in` operator |
| `Module not found: Can't resolve 'X'` | Missing dependency | Run `bun add X` |
| `Expected N arguments, but got M` | Missing function arguments | Check TypeScript signatures |
| `Missing publishableKey` | Clerk env var not set | Make provider conditional |
| `can only be used within Provider` | Component outside provider | Wrap in provider or make conditional |

---

## Contact & Support

If you encounter new Vercel build issues:
1. Check this document first
2. Run the pre-deployment checklist
3. Test build locally without env vars
4. Review Vercel build logs for specific errors
5. Update this document with new findings

---

**Document maintained by:** The Builders Workshop Team  
**Repository:** `xero-internal-actions-poc/design-internal` (app lives in `apps/the-builders-workshop`)



