---
name: validate-component
description: Validates that a component exists in the shadcn/ui library and returns the correct structure pattern. Use this before implementing any UI component to ensure proper usage.
metadata:
  author: prototype-template
  version: "1.0"
allowed-tools: Read Grep
---

# Validate Component

Use this skill to verify a component exists in the shadcn/ui library and get its correct usage pattern.

## When to Use This Skill

Invoke this skill when:

- You're about to use a shadcn component for the first time in this session
- You're unsure if a component exists in shadcn
- You need to confirm the correct structure pattern for a component
- The user requests a UI element and you need to pick the right component

## Instructions

### Step 1: Check if Component Exists

Read `/COMPONENTS.md` to verify the component is available in the shadcn/ui library.

If the component **exists**: Continue to Step 2.

If the component **does NOT exist**:

1. Inform the user: "The shadcn library doesn't have a `[ComponentName]` component."
2. Ask: "Would you like me to create a custom component for this using our design system?"
3. Wait for approval before proceeding with a custom component.

### Step 2: Get Component Structure Pattern

Read `/src/components/component-example.tsx` and search for the component you're validating.

Extract the correct structure pattern from the file.

### Step 3: Return the Pattern

Provide the correct usage pattern to follow.

## Common Component Patterns

### Sheet

```tsx
<Sheet>
  <SheetTrigger render={<Button />}>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    <div className="p-4">{/* Content goes here */}</div>
    <SheetFooter>
      <Button>Action</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**CRITICAL**: Do NOT add `ScrollArea` inside Sheet. Do NOT add complex flex layouts. Sheet handles overflow natively.

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>{/* Main content */}</CardContent>
  <CardFooter>{/* Footer actions */}</CardFooter>
</Card>
```

### Dialog

```tsx
<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Drawer

```tsx
<Drawer>
  <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    {/* Content */}
    <DrawerFooter>
      <Button>Action</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Tabs

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">{/* Tab 1 content */}</TabsContent>
  <TabsContent value="tab2">{/* Tab 2 content */}</TabsContent>
</Tabs>
```

### Button

```tsx
// Standard button
<Button variant="default" size="default">Click me</Button>

// Button rendering a link (CRITICAL: must include nativeButton={false})
<Button render={<Link to="/path" />} nativeButton={false}>
  Link Button
</Button>
```

## Anti-Patterns to Avoid

**NEVER do the following**:

- Add `ScrollArea` inside Sheet, Dialog, or Drawer (they handle overflow natively)
- Add complex flex/overflow layouts when the component handles it
- Wrap components in unnecessary containers
- Override default component behaviors with custom CSS hacks

**Why this matters**: Users may not be experienced coders. Following standard structure keeps code simple, predictable, and maintainable.

## Output Format

After validating a component, provide:

1. **Confirmation**: "✅ `ComponentName` exists in shadcn/ui"
2. **Correct pattern**: Show the structure to use
3. **Key warnings**: Highlight any anti-patterns to avoid

Example output:

```
✅ Sheet exists in shadcn/ui

Correct structure:
- SheetHeader → content div with p-4 → SheetFooter
- NO ScrollArea needed (Sheet handles overflow)
- NO complex flex layouts

Ready to implement.
```

## If Component Doesn't Exist

If the component is not in shadcn:

```
❌ ComponentName is not available in shadcn/ui

The shadcn library doesn't have a pre-built component for this.

Would you like me to:
1. Suggest an alternative shadcn component that could work?
2. Create a custom component following our design system?

Please confirm before I proceed.
```
