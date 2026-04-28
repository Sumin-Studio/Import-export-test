# XDL (Xero Design Language) -- Web

> Xero's product design system. Clean, professional, light-theme, trust-focused accounting software UI.
> Source: Figma file `4YLjes8hJHKjWhHuwxYwG8` (XDL Web)

---

## Quick Reference

**Aesthetic:** Light backgrounds, clear hierarchy, Xero teal/blue accents. Dense data display for accounting workflows. Professional, approachable, accessible. No decorative flourishes.

**Font family:** Use `typography/fontFamily/base` token. In code: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`

**Base unit:** 4px grid. All spacing is multiples of 4.

---

## Design Tokens

All tokens below come from the XDL Web Figma library. Two variable collections:
- **web_colour** -- semantic color tokens
- **web_product** -- spacing, typography, sizing, border radius

### Text Colors

| Token | Role | Approximate Value |
|-------|------|-------------------|
| `color/text/default` | Primary body text | `#333333` |
| `color/text/muted` | Secondary text, labels | `#666666` |
| `color/text/faint` | Tertiary text, placeholders | `#999999` |
| `color/text/inverse` | Text on dark backgrounds | `#FFFFFF` |

### Action Colors

| Token | Role |
|-------|------|
| `color/action/default` | Primary action (buttons, links) |
| `color/action/hover` | Primary action hover state |
| `color/action/active` | Primary action pressed state |
| `color/action/focus` | Focus ring / focus state |
| `color/action/secondary/hover` | Secondary action hover |
| `color/action/secondary/active` | Secondary action pressed |
| `color/action/inverse/hover` | Inverse (dark bg) action hover |
| `color/action/inverse/active` | Inverse action pressed |
| `color/action/negative/hover` | Destructive action hover |
| `color/action/negative/active` | Destructive action pressed |
| `color/action/disabled/default` | Disabled state |
| `color/action/disabled/inverse` | Disabled on dark bg |
| `color/action/drag/dropzone` | Dropzone background |
| `color/action/drag/border/default` | Drag border rest |
| `color/action/drag/border/hover` | Drag border hover |

### Theme / Background Colors

| Token | Role |
|-------|------|
| `color/theme/ab` | App background (primary page bg) |
| `color/theme/sb` | Secondary background (panels, sidebars) |

### Border Colors

| Token | Role |
|-------|------|
| `color/border/subtle` | Lightest border, barely visible |
| `color/border/soft` | Soft dividers |
| `color/border/regular` | Default borders (inputs, cards) |
| `color/border/strong` | Strong borders, emphasis |

### Brand

| Token | Role |
|-------|------|
| `color/xero/logo` | Xero brand blue. **Only for the Xero logo.** Never use for UI elements. |

### Indicator Colors

Semantic status colors. Each has `/indicator` (3:1 contrast against bg) and `/default` variants.

| Color | Token prefix |
|-------|-------------|
| Red | `color/indicator/red/` |
| Pink | `color/indicator/pink/` |
| Orange | `color/indicator/orange/` |
| Yellow | `color/indicator/yellow/` |
| Green | `color/indicator/green/` |
| Mint | `color/indicator/mint/` |
| Turquoise | `color/indicator/turquoise/` |
| Blue | `color/indicator/blue/` |
| Violet | `color/indicator/violet/` |
| Grape | `color/indicator/grape/` |
| Grey | `color/indicator/grey/` |

### Data Visualization Colors

Tonal palette (`color/dataviz/tonal/fill 01`-`10`) and neutral palette (`color/dataviz/neutral/fill 01`-`10`) with matching border tokens.

---

## Spacing

Token pattern: `size/spacing/{value}` (collection: `web_product`)

| Token | Value |
|-------|-------|
| `size/spacing/0` | 0px |
| `size/spacing/2` | 2px |
| `size/spacing/4` | 4px |
| `size/spacing/8` | 8px |
| `size/spacing/12` | 12px |
| `size/spacing/16` | 16px |
| `size/spacing/20` | 20px |
| `size/spacing/24` | 24px |
| `size/spacing/32` | 32px |
| `size/spacing/48` | 48px |
| `size/spacing/64` | 64px |

---

## Typography

Token pattern: `typography/fontSize/{value}` (collection: `web_product`)

| Token | Size | Typical Use |
|-------|------|-------------|
| `typography/fontSize/10` | 10px | Fine print, labels |
| `typography/fontSize/11` | 11px | Small labels |
| `typography/fontSize/12` | 12px | Table data, secondary |
| `typography/fontSize/13` | 13px | Body small |
| `typography/fontSize/14` | 14px | Body default |
| `typography/fontSize/15` | 15px | Body large |
| `typography/fontSize/17` | 17px | Subheading |
| `typography/fontSize/22` | 22px | Heading 3 |
| `typography/fontSize/24` | 24px | Heading 2 |
| `typography/fontSize/28` | 28px | Heading 1 |
| `typography/fontSize/32` | 32px | Display small |
| `typography/fontSize/44` | 44px | Display medium |
| `typography/fontSize/64` | 64px | Display large |

Font: `typography/fontFamily/base`

---

## Icon Sizes

| Token | Use |
|-------|-----|
| `size/icon/small` | Inline icons, table cells |
| `size/icon/large` | Standard icons |
| `size/icon/xlarge` | Feature icons, empty states |

---

## Border Radius

Token pattern: `border/radius/{size}` (collection: `web_product`)

| Token | Use |
|-------|-----|
| `border/radius/none` | No rounding (tables, some inputs) |
| `border/radius/small` | Subtle rounding (tags, badges) |
| `border/radius/medium` | Default (buttons, inputs, cards) |
| `border/radius/large` | Prominent rounding (modals, panels) |
| `border/radius/xlarge` | Large containers |
| `border/radius/max` | Maximum (pills) |
| `border/radius/circle` | Circular (avatars) |

---

## Components

All components from the **XDL Web** library.

### Button
Use buttons for the most important actions on a page. Triggers an action such as submitting a form or showing/hiding an interface component.
- Variants: primary (filled action color), secondary (outlined), ghost
- Sizes: medium (default), small
- States: default, hover, active, focus, disabled

### Icon Button
A button using a graphic symbol to visually indicate its purpose or action.
- Same variants and states as Button

### Split Button
A button with a primary action and alternative similar actions via dropdown.

### Grouped Button
A collection of buttons grouped together.

### Dropdown Picklist
An expandable list of options or actions for a user to select.

### Action Menu
Shows a list of actions a user can perform on the current page.

### Switch Group
Used for significant binary decisions. Off/on state toggle.

### Stepper Inline
Shows a user's progress through a series of steps, guiding them toward completion.

### Toggle Button
Subcomponent used within toggle groups.

### Table / Advanced Table
Data table with specialized cell types:
- Cell/Data type/Button
- Cell/Data type/Icon Button
- Cell/Data type/Tag
- Editable Table with column components

### Global Navigation
Top navigation bar with Xero branding, primary nav items (Home, Sales, Purchases, Reporting, Payroll, Accounting, Tax, Contacts, Projects), search, and user menu.

### Form Controls
Form helper components in multiple variants:
- Size: small, medium
- Theme: default, inverted
- State: enabled, disabled

---

## Key Design Rules

1. **Light theme first.** White/near-white backgrounds. Dark text on light surfaces.
2. **Action color for interactive elements only.** Links, buttons, focused inputs. Never decorative.
3. **Xero logo blue is sacred.** `color/xero/logo` is only for the Xero logo mark. Do not use it for buttons or UI.
4. **Indicator colors carry meaning.** Red = error/overdue, green = success/paid, yellow = warning, blue = info.
5. **4px grid.** All spacing uses the `size/spacing/*` tokens.
6. **Accessible contrast.** Indicator tokens guarantee 3:1 contrast ratio against backgrounds.
7. **Dense data display.** Accounting UIs prioritize information density. Use 13-14px body text, tight row heights.
8. **Consistent border weight.** Use semantic border tokens (subtle, soft, regular, strong) not raw values.
9. **Font stack is system.** No custom web fonts in product UI.
10. **Border radius is conservative.** Accounting software, not a consumer app. `border/radius/medium` is the default.

---

## XUI Component Library Reference

The React implementation of XDL is called **XUI** (`@xero/xui`). Key mappings:

| Figma Component | XUI React Component |
|-----------------|---------------------|
| Button | `<XUIButton>` |
| Icon Button | `<XUIIconButton>` |
| Split Button | `<XUISplitButton>` |
| Dropdown Picklist | `<XUIDropdown>` / `<XUIPicklist>` |
| Action Menu | `<XUIActions>` |
| Switch Group | `<XUISwitch>` |
| Toggle Button | `<XUIToggle>` |
| Table | `<XUITable>` |

---

<!-- Generated from XDL Figma file by Layout Context CLI -->
<!-- Figma source: https://www.figma.com/design/4YLjes8hJHKjWhHuwxYwG8/XDL-Web -->
