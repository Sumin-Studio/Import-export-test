# Xero-Style Color Palette

**Purpose:** Replace dark/black + red styling with greys, blues, and whites — aligned with Xero brand and the UX Design Mentorship Playbook aesthetic.

## Primary Palette

| Token | Hex | Use |
|-------|-----|-----|
| **Primary Blue** | `#06b3e8` | Accent, links, highlights, progress bars, active states |
| **Blue Light** | `#e3f4fd` | Light blue backgrounds, score 2 |
| **Blue Medium** | `#b8e5f8` | Score 3, subtle fills |
| **Blue Strong** | `#4dabf5` | Score 4 |
| **Blue Primary** | `#06b3e8` | Score 5, primary accent |

## Neutrals

| Token | Hex | Use |
|-------|-----|-----|
| **White** | `#ffffff` | Page background, score 1 |
| **Grey 50** | `#f8fafc` | Subtle section backgrounds |
| **Grey 100** | `#f1f5f9` | Card backgrounds, toggle bars |
| **Grey 200** | `#e2e8f0` | Borders, dividers |
| **Grey 400** | `#94a3b8` | Muted text |
| **Grey 500** | `#64748b` | Body text |
| **Grey 700** | `#334155` | Headings |
| **Grey 900** | `#0f172a` | Strong emphasis (replaces black) |

## Swimlane Colors (unchanged — already blue/green/orange)

- SL1 (Cash-Aware Planner): `#2e7d50` / `#f0faf5` / `#c8e6d4`
- SL2 (Approval Concierge): `#1565c0` / `#f0f4fa` / `#c8d6e8`
- SL3 (Just Pay): `#e65100` / `#fdf5f0` / `#f0d4c0`

## Scoring Scale (replaces red gradient)

| Score | Old (red) | New (blue) |
|-------|-----------|------------|
| 1 | `#ffffff` | `#ffffff` |
| 2 | `#ffcdd2` | `#e3f4fd` |
| 3 | `#ef9a9a` | `#b8e5f8` |
| 4 | `#e57373` | `#4dabf5` |
| 5 | `#c62828` | `#06b3e8` |

## Dark Surfaces → Light

| Old | New |
|-----|-----|
| `#0a0a0a` / `stone-950` | `#ffffff` or `#f8fafc` |
| `#1a1a1a` (headers) | `#334155` or `#0f172a` |
| `text-white` on dark | `text-[#0f172a]` or `text-[#334155]` |
| `border-white/5` | `border-[#e2e8f0]` |

## Implementation Notes

- Front page: Light background, grey text, blue accents
- Pugh chart: White/grey base, blue scoring scale, grey headers
- Walkthrough slides: Light backgrounds for all slides; blue progress bar and accents
- Selection highlight: `#06b3e8` with white text (replaces red)
