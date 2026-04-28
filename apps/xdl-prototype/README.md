# XDL Prototype Boilerplate

A boilerplate for quickly building design prototypes using the Xero Design Language (XDL). It comes pre-configured with XDL design tokens, global navigation, brand theming, and dark mode support so you can jump straight into prototyping.

## Tech Stack

- **Next.js 16** (with Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** with XDL design tokens
- **Radix UI** + **shadcn/ui** components
- **next-themes** for light/dark mode

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm (comes with Node.js)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   ```

3. **Open the app** at [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start dev server with Turbopack    |
| `npm run build` | Create a production build          |
| `npm start`     | Serve the production build         |
| `npm run lint`  | Run ESLint                         |

## Project Structure

```
src/
├── app/
│   ├── contexts/       # Brand theme context (sb / xph)
│   ├── globals.css      # XDL design tokens & Tailwind config
│   ├── layout.tsx       # Root layout with providers & global nav
│   └── page.tsx         # Starter page — edit this to build your prototype
├── assets/
│   └── fonts/           # National 2 font files
├── components/
│   ├── global/          # Global navigation & theme provider
│   └── ui/              # Reusable UI components (icons, avatar, dropdown, etc.)
└── lib/
    └── utils.ts         # Utility helpers (cn, etc.)
```

## What's Included

- **XDL Design Tokens** — Full set of colour, typography, spacing, shadow, motion, and border radius tokens defined in `globals.css` and available as Tailwind utilities.
- **Typography Utilities** — Ready-made Tailwind classes like `text-heading-standard-bold`, `text-body-standard-regular`, `text-label`, etc.
- **Global Navigation** — A pre-built nav bar with Xero logo, menu items, and global tools.
- **Brand Theming** — Toggle between Standard Blue (`sb`) and Xero Practice Hub (`xph`) brand themes. Persists to localStorage.
- **Dark Mode** — System-aware light/dark mode via `next-themes`.

## Building Your Prototype

Edit `src/app/page.tsx` to start building. Use the XDL token-based Tailwind classes throughout your markup:

```tsx
<div className="bg-background-secondary p-6">
  <h1 className="text-heading-standard-bold text-text-default">
    My Prototype
  </h1>
  <p className="text-body-standard-regular text-text-muted mt-2">
    Description goes here.
  </p>
</div>
```

Add new pages by creating folders under `src/app/` following the Next.js App Router conventions.
