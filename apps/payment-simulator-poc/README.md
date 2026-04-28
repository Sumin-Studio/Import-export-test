# Payment simulator POC

Shipped from the **design-internal** monorepo at `apps/payment-simulator-poc` (sibling source in `~/Developer/payment-simulator-poc` is the working copy to mirror from).

### Vercel / CI

`@xero/*` packages install from **Artifactory**. In the Vercel project (**`payment-simulator-poc-xro`**), add an environment variable **`NPM_TOKEN`** with an Artifactory npm token that can read **`npm-dev`** and **`npm-upstream`** (same idea as local `npm` auth). Enable it for Production, Preview, and Development so **`npm ci`** succeeds on the build runner.

**Local dev:** after `npm run dev`, open **http://localhost:3000** (or the **Local** URL Next prints). If port **3000 is already in use**, stop the other process or run **`npm run dev:pick-port`** to auto-pick a free port.

Small **Next.js** app that mirrors **[mybills](https://github.com/xero-internal/mybills)**’s **XUI React** stack (`@xero/xui` + `@xero/xui-icon`), for a demo that contrasts a **typical** vs **optimized** payer checkout and illustrative **time-to-pay** outcomes.

## Alignment with mybills

| Area | mybills SPA | This POC |
|------|-------------|----------|
| XUI packages | `@xero/xui` **23.1.0**, `@xero/xui-icon` **6.9.0** | Same versions |
| Global XUI CSS | `https://edge.xero.com/style/xui/<version>/xui.min.css` in `index.html` | Same URL in `src/app/layout.tsx` |
| React bindings | `@xero/xui/react/*` | Same import style |
| Sass tokens (optional) | `@import "@xero/xui/sass/vars"` / `mixins` in component SCSS | `src/components/stripe/PocPaymentTile.scss` (payment tile dividers) |
| Stripe Elements | `StripeElementsWrapper`, `StripeExpressCheckout`, `CheckoutForm` (`PaymentElement`, wallets) | **With `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`:** Stripe SDK (`src/components/stripe/*`). **Without keys:** XUI mock. **Force mock:** `NEXT_PUBLIC_USE_MOCK_TILE=true`. |

## Payment tile (Stripe when keys are set)

The one-time invoice page (`/`) uses **Stripe Elements** when **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** is set in `.env.local` (plus secret key for `/api/create-payment-intent`). Otherwise it uses the **XUI mock** so the app runs without Stripe credentials.

To force the XUI mock even with keys: set **`NEXT_PUBLIC_USE_MOCK_TILE=true`**.

### Why the mock doesn’t use Stripe’s “public” SDK for the card field

Stripe’s card UI (**Payment Element**, **Card Element**, etc.) is **not** a set of React inputs you can drop in like `XUITextInput`. Stripe.js loads **hosted iframes** from Stripe’s servers so raw card numbers never touch your app. That requires:

1. A **publishable key** (`pk_test_…`) — free from a Stripe account, but Stripe still mints and validates it.
2. Usually a **client secret** from your backend (**PaymentIntent** or **SetupIntent**) so Elements can initialize in a supported mode.

Without those, Stripe.js cannot mount the real fields, so **automatic card-brand icons and PAN validation** only come from turning on the real Elements path below. There is no supported way to get Stripe’s brand detection on plain HTML inputs without their hosted Elements.

## Stripe setup (optional — enables real Elements instead of the mock)

1. Copy `.env.example` → `.env.local`.
2. Add **test** keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys):
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
3. Restart `npm run dev` after changing env vars.

The invoice preview uses **`1,000.00`** in the selected currency → PaymentIntent amount **`100000`** minor units (e.g. `gbp`). Use [test cards](https://stripe.com/docs/testing) in the **Payment Element**.

### Pay button (default: demo only, no charge)

By default, **Pay** does **not** call `confirmPayment` — it validates the form via Stripe Elements and shows an alert. No charge. In demo mode, a **mock Apple Pay–style button** is shown in place of Stripe’s Express Checkout Element (which often renders empty when the device/domain doesn’t support real Apple Pay or Google Pay). Clicking the mock shows a demo message. To enable real test payments, set **`NEXT_PUBLIC_STRIPE_PAY_DEMO_ONLY=false`** in `.env.local`.

> **⚠️ Mock Apple Pay button — NOT for public use:** The mock uses Apple Pay–style branding for internal POC/demo only. Apple’s Acceptable Use Guidelines prohibit using Apple Pay branding for anything other than initiating real Apple Pay transactions. **Remove or replace `MockApplePayButton` before any public or production deployment.**

Optional **Stripe Connect** (like mybills’ `stripeAccount` in `StripeElementsWrapper`):

1. Set **`NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID=acct_...`** so `loadStripe` targets the connected account.
2. The API route **`POST /api/create-payment-intent`** creates the PaymentIntent on that same account when you also set **`STRIPE_CONNECTED_ACCOUNT_ID`** (preferred) or rely on the same `NEXT_PUBLIC_…` value (available server-side in Next.js).

If you only set `STRIPE_CONNECTED_ACCOUNT_ID` without the `NEXT_PUBLIC_` variable, the server intent and browser Elements account can mismatch—use both with the **same** `acct_` id, or only `NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID` for both sides.

## Setup

1. **npm auth** — Use the same **Artifactory** registry as mybills (copy `project/spa/.npmrc` or use the `.npmrc` in this folder). Authenticate per Xero internal docs so `@xero/*` packages resolve.

2. Install and run:

```bash
cd payment-simulator-poc
npm install
npm run dev
```

By default, `next dev` listens on **all interfaces** (`0.0.0.0`); use the **Local** URL from the terminal. If your environment breaks on `0.0.0.0`, set **`HOSTNAME=127.0.0.1`** before `npm run dev` (Next’s `-H` flag).

Use **http://localhost:3000** (or **http://127.0.0.1:3000**) for the **one-time invoice + payment** preview. The A/B simulator is at **`/simulator`** on the same origin.

If Turbopack misbehaves, use **`npm run dev:webpack`** (same host binding, webpack dev server).

### Still can’t preview?

- Use the exact URL from the terminal (`Local: http://127.0.0.1:…`), not only `localhost` if your browser or tooling treats them differently.
- Ensure **`@xero/*` packages installed** — without Artifactory auth, `npm install` fails and there is nothing to run.

### Card fields not showing in the payment tile?

- **Check for an error message** — the form now surfaces Stripe load errors. If you see "Payment form failed to load" or similar, check the browser console (F12 → Console) for details.
- **Key mismatch** — publishable and secret keys must be from the **same** Stripe account and environment (both test or both live).
- **Ad blockers / privacy extensions** — Stripe loads card fields in iframes from `js.stripe.com`. Disable uBlock Origin, Privacy Badger, or similar for `localhost` / `127.0.0.1`.
- **Stripe Dashboard** — ensure your account has **card payments** enabled (Settings → Payment methods).
- **Restart after env changes** — `npm run dev` must be restarted after editing `.env.local`.

## Project layout

- `src/app/layout.tsx` — `xui-html` / `xui-body` classes + XUI stylesheet link (matches mybills HTML shell).
- `src/components/CheckoutSimulatorGate.tsx` — Client mount gate + `CheckoutSimulator` (keeps XUI off SSR render, same idea as `HomePageClient`).
- `src/components/CheckoutSimulator.tsx` — Demo UI (`XUIPanel`, `XUIButton`, `XUIBanner`, `XUIRow` / `XUIColumn`).
- `src/components/PocMockMybillsPaymentTile.tsx` — XUI mock (when `NEXT_PUBLIC_USE_MOCK_TILE=true`).
- `src/components/stripe/MybillsStripeElementsWrapper.tsx` — `Elements` + `loadStripe`, adapted from mybills `StripeElementsWrapper` (client secret from this app’s API).
- `src/components/stripe/MockApplePayButton.tsx` — Demo-only mock Apple Pay–style button (NOT for public use).
- `src/components/stripe/PocStripeExpressCheckout.tsx` — Port of mybills `StripeExpressCheckout` (`ExpressCheckoutElement`).
- `src/components/stripe/PocStripeCheckoutForm.tsx` — `LinkAuthenticationElement`, `PaymentElement`, pay CTA + trust row (mybills `CheckoutForm` pattern).
- `src/app/api/create-payment-intent/route.ts` — Creates a test **PaymentIntent** (stand-in for mybills payment APIs).
- `next.config.ts` — `transpilePackages` for `@xero/xui` and `@xero/xui-icon`, plus `outputFileTracingRoot` when this app lives beside other lockfiles.

## Troubleshooting “This page isn’t working” / `127.0.0.1`

1. **Dev URL:** **`http://localhost:3000`** (see `npm run dev` in `package.json`). If nothing loads, confirm the dev server is running and the terminal says “Ready”.
2. **Production:** run **`npm run build`** before **`npm run start`** — Next needs a `.next` build for `next start`.
3. **Stale build:** delete `.next` and run `npm run build` again, then restart.
4. **First compile in dev:** the first request can take a few seconds while webpack compiles; wait for “Ready” in the terminal.
5. **`EADDRINUSE` on 3000:** another app (or a stuck `node`) is bound to that port — stop it, or run **`PORT=3001 npm run dev`**, or **`npm run dev:pick-port`** to find a free port automatically.
6. **Mystery 500 / broken dev after refactors:** stop the dev server, run **`rm -rf .next`**, then **`npm run dev`** again (stale webpack cache can serve a bad bundle).
7. **Before pushing changes:** run **`npm run verify`** (`eslint` + `next build`) so compile and typecheck failures show up locally instead of as a blank 500 in the browser.

## Next steps for the story

- Wire **real** metrics or research citations instead of placeholder numbers.
- Add **analytics** / **feature-flag** hooks if you integrate with internal platforms.
- Extend the API route for **surcharges**, **scheduling**, PayPal, and bank rails like full `PaymentTile` + `DocumentPay`.
