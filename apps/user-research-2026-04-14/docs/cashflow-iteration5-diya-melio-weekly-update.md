# Weekly update framing — Cashflow iteration 5, Melio, Diya / Chong

Use this copy as a starting point for Chong’s update to Diya and leadership.

## What we’re showing

- **Apply plan** on the cashflow action plan can hand off to a **Melio US bill payment prep** step (ACH-style checkout UI in prototype).
- This matches **prototype iteration 5** direction: plan in Xero → concrete pay step with the bill-pay partner.
- In **user-research-2026-04-14**, this path is **opt-in** via `?scenario=diya-demo` so default research sessions stay on the in-product-only Apply behaviour.

## Honest limitations (for trust)

- **Melio product support** for this exact orchestration (plan → pre-filled multi-bill pay, etc.) still needs validation; Rob/DG flagged gaps — position as **directional prototype**, not committed integration.
- **US-only framing** in the demo copy; global regions are out of scope for this slice.
- **Prototype** uses mocked data and a seeded JAX thread; no live Melio API calls from this app.

## Research angle

- We’re learning whether customers want **Xero to route them into a specific payment partner** after a plan vs **staying entirely in Xero** for execution.
- Tag sessions where facilitators used `?scenario=diya-demo` vs default when synthesising (Melio handoff vs in-product only).

## URLs (internal)

- Default: `/purchases-overview/prototype/4?scenario=diya-demo` (hub redirects and nav use this).
- **Make a plan** vs **Apply plan:** only **Apply plan** triggers JAX + Melio; facilitators should know the difference.
- Opt out: `?scenario=in-product`.
- Facilitators see a **banner** on Purchases overview explaining the flow (or the in-product-only variant when opted out).
