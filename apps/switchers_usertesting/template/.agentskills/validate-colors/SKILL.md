---
name: validate-colors
description: Validates color usage against the strict approved CSS variable palette. Rejects hex, RGB, named colors, and arbitrary Tailwind colors. Use before implementing any styling with colors.
metadata:
  author: prototype-template
  version: "1.0"
allowed-tools: Read
---

# Validate Colors

This skill enforces the **strict, locked color system** for Prototype Template prototypes.

## When to Use This Skill

Invoke this skill:
- Before implementing any component with color styling
- When a user requests custom colors (e.g., "make it pink", "change to blue")
- When you're unsure if a color class is approved
- If you need to validate existing color usage

## The Color System Rules

### ✅ ALLOWED: CSS Variable Classes Only

These are the **ONLY** approved color classes:

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

### ❌ NEVER ALLOWED

**Hex colors:**
```tsx
// ❌ WRONG
className="bg-[#3B82F6]"
style={{ backgroundColor: "#FF69B4" }}
```

**RGB/RGBA values:**
```tsx
// ❌ WRONG
className="bg-[rgb(59,130,246)]"
style={{ color: "rgba(255, 105, 180, 0.5)" }}
```

**Named colors:**
```tsx
// ❌ WRONG
className="text-blue"
style={{ color: "red" }}
```

**Arbitrary Tailwind colors:**
```tsx
// ❌ WRONG
className="bg-blue-500"
className="text-pink-400"
className="border-green-600"
```

**Modifying theme colors:**
```tsx
// ❌ NEVER modify /src/index.css theme variables
:root {
  --primary: #FF69B4; /* NEVER DO THIS */
}
```

## Instructions

### Step 1: Review Color Usage

Examine the proposed styling for any color-related classes or inline styles.

### Step 2: Validate Against Whitelist

Check if all colors use approved CSS variable classes:
- `bg-*` → Must be from allowed list
- `text-*` → Must be from allowed list
- `border-*` → Must be `border-border`
- `ring-*` → Must be `ring-ring`

### Step 3: Flag Violations

If any non-approved colors are found:
1. Identify the violation
2. Suggest the closest approved alternative
3. Explain why custom colors aren't allowed

### Step 4: Return Validation Result

Provide clear output about whether colors are valid.

## Output Format

### When Colors Are Valid

```
✅ Color validation passed

All colors use approved CSS variables:
- bg-primary, text-primary-foreground
- border-border

Safe to implement.
```

### When Colors Are Invalid

```
❌ Color validation failed

Found unapproved color usage:
- bg-blue-500 → Use bg-primary or bg-accent instead
- #FF69B4 → Use bg-primary, bg-secondary, bg-accent, or bg-destructive

Our design system uses a fixed color palette for consistency.
The theme colors are locked and cannot be modified.
```

## Handling User Color Requests

When a user asks for custom colors (e.g., "make it pink" or "change buttons to blue"):

### Response Template

```
I can't modify the theme colors—our design system uses a fixed palette to maintain consistency across the app.

However, I can apply one of our existing theme colors:

• **Primary** (dark) - for main actions and emphasis
• **Secondary** (light gray) - for secondary actions
• **Accent** (subtle highlight) - for hover states and highlights
• **Destructive** (red) - for warnings and delete actions
• **Muted** (very light) - for subtle backgrounds

Which of these would work best for what you have in mind?

If you need a specific brand color added to the theme, that would need to go through a designer to update the project's color system.
```

### Key Points

1. **Be polite but firm**: Never modify theme colors, even if the user insists
2. **Offer alternatives**: Present the 5 theme color options
3. **Explain the reason**: Consistency and design system integrity
4. **Redirect if needed**: Suggest talking to a designer for brand color changes

## Examples

### Valid Usage

```tsx
// ✅ CORRECT
<Card className="bg-card border-border">
  <CardHeader className="bg-primary">
    <CardTitle className="text-primary-foreground">Title</CardTitle>
  </CardHeader>
  <CardContent className="bg-background text-foreground">
    Content
  </CardContent>
  <CardFooter className="bg-muted">
    <Button variant="destructive">Delete</Button>
  </CardFooter>
</Card>
```

### Invalid Usage

```tsx
// ❌ WRONG
<Card className="bg-[#3B82F6] border-blue-500">
  <CardHeader style={{ backgroundColor: "#FF69B4" }}>
    <CardTitle className="text-blue-600">Title</CardTitle>
  </CardHeader>
  <CardContent className="bg-white text-gray-800">
    Content
  </CardContent>
</Card>
```

**Corrected version:**

```tsx
// ✅ CORRECTED
<Card className="bg-card border-border">
  <CardHeader className="bg-primary">
    <CardTitle className="text-primary-foreground">Title</CardTitle>
  </CardHeader>
  <CardContent className="bg-background text-foreground">
    Content
  </CardContent>
</Card>
```

## Edge Cases

### User insists on custom color

**Response**: "I understand you'd like a specific color, but I'm not able to modify the theme colors—it's a fundamental constraint of this design system. The approved colors are locked to maintain consistency. If this is a hard requirement, you'd need to work with a designer to update the project's theme configuration in `/src/index.css`, but that's outside the scope of prototype development."

### User wants to see the current theme colors

**Response**: "The current theme uses an OKLch-based color system with semantic variables. You can see the actual color values by viewing the app in light/dark mode, or by inspecting `/src/index.css`. The theme automatically adapts between light and dark modes."

### Component library uses inline styles

**Response**: "If you're integrating a third-party component that uses inline styles, try to override them with our CSS variable classes where possible. If that's not feasible, ask the user if the third-party component is acceptable to use as-is."
