# Frame of mind

Convert video files to GIF with drag-and-drop. Two ways to run:

### Chrome “Dangerous site” / Safe Browsing

If Google flags the deployed URL, it’s often because **official-looking branding on a non-official domain** (e.g. `*.vercel.app`) can be classified as *deceptive*. This app includes a **visible disclaimer** that it is an internal tool and not xero.com, and a clear **meta description**. If a URL stays flagged after deploy, use [Google Search Console](https://search.google.com/search-console) to verify the domain and request a review.

- **Static (browser-only)** — conversion in the browser with **canvas + gifenc** (pure JS, no WASM). Works on any static host: **Vercel**, **GitHub Pages**, Netlify, or just open the built files.
- **Local server** — uses ffmpeg on your machine (faster, higher quality).

## Deploy to Vercel or GitHub Pages (static page)

Conversion runs entirely in the browser; no backend or FFmpeg.wasm needed.

### Vercel

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. Leave **Build Command** as `npm run build` and **Output Directory** as `dist` (or use the included `vercel.json`).
4. Deploy. Your app will be at `https://your-project.vercel.app`.

**If deploy fails or the site won’t load:** open the project in Vercel → **Deployments** → latest build **Logs**. This app uses **Vite** (`framework` in `vercel.json`); Node **20+** is required (`engines` in `package.json`). Unused FFmpeg.wasm blobs were removed from `public/` so uploads stay small and reliable.

### GitHub Pages

1. Push the repo to GitHub.
2. **If your site is at `https://<user>.github.io/<repo>/`** (project site), set the base in `vite.config.js`:
   ```js
   base: "/frame-of-mind/",  // use your repo name
   ```
3. In the repo: **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/deploy-pages.yml` will build and deploy.  
   Your site will be at `https://<user>.github.io/<repo>/`.

   The workflow file is already in the repo (`.github/workflows/deploy-pages.yml`).

<details>
<summary>Alternative: peaceiris workflow</summary>

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Then in repo **Settings → Pages**, set **Source** to “GitHub Actions”.

---

## Run locally

### Option A: Static (browser FFmpeg.wasm)

Requires Node 18+ (or Bun).

```bash
npm install
npm run build
npm run preview
```

Open the URL shown (e.g. http://localhost:4173). First conversion will load FFmpeg.wasm (~31 MB) from the CDN.

### Option B: Local server (ffmpeg on your machine)

Faster and no WASM download; needs **ffmpeg** and **Bun**.

1. Install ffmpeg: `brew install ffmpeg`
2. Run:
   ```bash
   ./run.sh
   ```
   Or `bun start` if Bun is on your PATH. If port 3000 is in use: `PORT=3001 ./run.sh`
3. Open http://localhost:3000 (or the port shown).

---

## Settings

| Setting      | Description |
|-------------|-------------|
| **Max width** | Output width in px (height keeps aspect ratio). |
| **FPS**       | Frames per second. Lower = smaller file. |
| **Quality**   | Low / Medium / High (palette-based for better colors). |
| **Loop**      | Loop GIF or play once. |
| **Start time**| Start conversion from this many seconds. |
| **Duration**  | Convert only this many seconds (empty = full video). |
