# Next steps: Real prototype connection and design deck alignment

**Created:** 2026-02-17  
**Purpose:** Track two priorities: (1) connect the web app to the real Bills Payment Agent API, and (2) align all web visuals with the design deck / walkthrough look and feel.

---

## 1. Connect to the real prototype

**Goal:** The web app’s **Our prototype** experience (and any future prototype UI) should talk to the real **Bills Payment Agent API** in `api/`, not stay as a placeholder.

### Current state

- **API:** FastAPI service in `api/`. Run with `make dev` → http://localhost:8000. Endpoint: `POST /bills-agent/payment-plan` (see `api/README.md` for request/response and mock data).
- **Web:** `/prototype` is a placeholder page (“Stay tuned.”). No API calls yet.
- **CORS:** API already allows `http://localhost:3000` (and 3010, 8080) in `api/app/main.py`.

### Next steps

| Step | What | Notes |
|------|------|--------|
| 1 | Add API base URL to web app config | e.g. `NEXT_PUBLIC_BILLS_AGENT_API_URL` (default `http://localhost:8000` for local dev). Use for all calls to the agent. |
| 2 | Build a minimal prototype UI on `/prototype` | Load/send bills (or use mock payload from `api/README.md`), call `POST /bills-agent/payment-plan`, show returned plan (prioritized list, reasoning, cash impact). |
| 3 | Handle loading and error states | Network errors, 4xx/5xx, invalid response. Optional: “API unavailable” when env not set or endpoint unreachable. |
| 4 | (Optional) Deploy API for shared use | If you want the web app (e.g. on Vercel) to call the agent without everyone running the API locally, deploy `api/` (e.g. Railway, Fly, or internal host) and set production `NEXT_PUBLIC_BILLS_AGENT_API_URL`. |

### References

- API usage and mock payload: [api/README.md](../../api/README.md)
- API health: `GET http://localhost:8000/health`

---

## 2. Align visuals with the design deck

**Goal:** Homepage, explorations, and prototype UI should look and feel like the **design deck** (walkthrough slides) and use the same visual system.

### Current state

- **Design deck:** Walkthrough in `src/walkthrough/` (deployed from repo root). Slides define tone, layout, and structure.
- **Palette:** [docs/reference/2026-02-16-xero-style-color-palette.md](../reference/2026-02-16-xero-style-color-palette.md) — Primary Blue `#06b3e8`, greys, swimlane colors. Referenced in `src/app/globals.css` for prose.
- **Homepage:** Recently updated with solid colors and abstract shapes; uses accent blue and slate. Not yet audited against deck for type, spacing, and components.
- **Explorations / Prototype:** Different pages may diverge from the deck in typography, spacing, and component style.

### Next steps

| Step | What | Notes |
|------|------|--------|
| 1 | Audit design deck for tokens and patterns | From walkthrough slides: type scale, heading styles, card/panel style, buttons, spacing. Capture in a short “design deck spec” (or extend the Xero palette doc) so implementation has a single reference. |
| 2 | Apply design deck to homepage | Ensure type, colors, and spacing match the deck; keep or adjust abstract shapes so they feel part of the same system. |
| 3 | Apply design deck to explorations | Grid, cards, search UI, concept detail — same type scale, palette, and component style as the deck. |
| 4 | Apply design deck to prototype UI | When the prototype page gets real content (see §1), use the same components and tokens so it feels like one product with the walkthrough. |
| 5 | Centralise tokens in one place | Consider CSS variables or Tailwind theme in `globals.css` (and/or tailwind config) so Primary Blue, greys, and key spacing/sizes are defined once and used everywhere. |

### References

- Xero-style palette: [docs/reference/2026-02-16-xero-style-color-palette.md](../reference/2026-02-16-xero-style-color-palette.md)
- Walkthrough slides source: `src/walkthrough/` (data and slide components)
- App globals: `src/app/globals.css`

---

## Summary

| Priority | Owner | Next action |
|----------|--------|-------------|
| Connect to real prototype | Dev | Add `NEXT_PUBLIC_BILLS_AGENT_API_URL` and implement minimal `/prototype` UI that calls `POST /bills-agent/payment-plan`. |
| Align visuals with design deck | Design / Dev | Audit walkthrough for tokens and patterns; apply same system to homepage, explorations, and prototype. |

When these are updated, add a note to [PROJECT-STATUS.md](../status/PROJECT-STATUS.md) and optionally an entry in [CHANGELOG.md](../../CHANGELOG.md).
