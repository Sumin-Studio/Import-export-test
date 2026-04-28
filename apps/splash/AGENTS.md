# Splash Screen Redirect

## How It Works

A single-page React Router app (SPA mode, no SSR) that shows a random greeting and an action button. Users must authenticate via **Sign in with Vercel** (OAuth 2.0 + PKCE) before seeing the redirect button. If not authenticated, a "Sign in with Vercel" button is shown instead.

## Key Files

- `app/config.ts` — Contains `REDIRECT_URL` (where the "Open" button goes) and `MESSAGES` (the greeting pool). Edit this file to change the destination or messages.
- `app/components/AuthGate.tsx` — Compound component managing auth state. Renders `<AuthGate.LoggedIn>` or `<AuthGate.Error>` based on session status.
- `app/routes/home.tsx` — The main page. Uses `AuthGate` to gate the redirect button behind auth.
- `app/app.css` — All styles.

## Auth Flow

All OAuth logic is isolated in `api/auth/`:

| Route | Purpose |
|---|---|
| `api/auth/login.ts` | Generates PKCE challenge + CSRF state, redirects to Vercel consent page |
| `api/auth/callback.ts` | Exchanges auth code + code_verifier for tokens, stores in HttpOnly cookies |
| `api/auth/status.ts` | Checks cookies, refreshes expired tokens, returns `{ authenticated, user }` |
| `api/auth/logout.ts` | Clears all auth cookies |

Tokens are stored in `HttpOnly; Secure; SameSite=Lax` cookies:
- `auth_access_token` (1 hour)
- `auth_id_token` (1 hour)
- `auth_refresh_token` (30 days, auto-renewed)

## Environment Variables

Set in the **Vercel project dashboard** (Settings → Environment Variables), enabled for both Preview and Production:

| Variable | Source |
|---|---|
| `VERCEL_APP_CLIENT_ID` | Sign in with Vercel app → Client ID |
| `VERCEL_APP_CLIENT_SECRET` | Sign in with Vercel app → Client Secrets → Generate |

## Sign in with Vercel App Configuration

The OAuth app is configured in the **Vercel team dashboard** (Settings → Sign in with Vercel):

- **Scopes enabled:** `openid`, `email`, `profile`, `offline_access`
- **Callback URL:** Set by selecting the `splash-xro` project and adding `/api/auth/callback`

## Behavior

- A random greeting is picked on each page load (not animated).
- If authenticated: shows the "Open" button linking to `REDIRECT_URL`.
- If not authenticated: shows "Sign in with Vercel" button.
- If auth fails or isn't configured: shows a contextual error message.
- A fixed "Sensitive(np)" tag is pinned to the bottom of the viewport.
