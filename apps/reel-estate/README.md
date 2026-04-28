# Reel estate

Internal browser tool for **screen recording** with optional microphone, webcam overlay, and live preview. Recordings can be saved as **WebM**, **MP4** (when the browser supports it), or **GIF** (encoded after capture). Everything runs in the page; nothing is uploaded to a server.

## How to run locally

This app is a **static site** (single `index.html` plus `manifest.webmanifest`, `sw.js`, and `icon.svg`). There is no install or build step.

Screen capture and microphone APIs require a **secure context**: use **`http://localhost`** or **`https://`**. Opening `index.html` directly as a `file://` URL usually **will not work** for recording.

### Option 1: Python (macOS / Linux / Windows)

From this folder (`apps/reel-estate`):

```bash
cd apps/reel-estate
python3 -m http.server 8000
```

Then open **http://localhost:8000** in Chrome, Edge, or another supported browser.

### Option 2: npx (Node.js)

```bash
cd apps/reel-estate
npx --yes serve -l 8000
```

Open **http://localhost:8000**.

### Option 3: VS Code Live Server

Use a “Live Server” style extension, point it at this folder, and open the served URL (must be localhost or HTTPS).

## What you need

- A **recent Chromium-based browser** or **Safari** for best results; Firefox supports many flows but codec and `MediaRecorder` behavior differ.
- Permission to use the **screen**, and optionally **microphone** and **camera** when you enable those options.
- **Network access** for Google Fonts, optional MediaPipe (webcam blur) from jsDelivr, and GIF encoding (gif.js from jsDelivr) when you use those features.

## Repo context

This directory lives inside the **design-internal** monorepo. Deployments to Vercel are handled by the root GitHub Actions workflows when changes are merged; you do not need to configure Vercel manually for local development.

Vibe coded by Mustafa :) 