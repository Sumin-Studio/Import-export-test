# Splash Screen Redirect

Landing page with rotating greetings that redirects designers to a configurable destination.

## Run Locally

```bash
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `build/client/`.

## Configuration

Edit `app/config.ts` to change the redirect URL or greeting messages.

## Custom Redirects

You can override the default redirect target by using the `/go/` path:

```
https://splash-xro.vercel.app/go/example.org
https://splash-xro.vercel.app/go/example.org/some/path
```

After signing in, the **Open** button will point to `https://example.org` (or `https://example.org/some/path`) instead of the default destination. If the URL is invalid, it falls back to the default redirect configured in `app/config.ts`.

## Authentication Setup (Sign in with Vercel)

The app uses [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel) to authenticate users via OAuth.

### 1. Create a Sign in with Vercel app

1. Go to your Vercel team dashboard
2. Navigate to **Settings → Apps**
3. Click **Create** to create an app
4. `VERCEL_APP_CLIENT_ID` is the **Client ID** shown, save it

### 2. Generate a Client Secret

1. On the app page, go to the **Authentication** section
2. In the **Client Secrets** section, click **Generate**
3. `VERCEL_APP_CLIENT_SECRET` is the secret, copy immediately (it's only shown once)

### 3. Configure the Callback URL

Add these as **Authorization Callback URLs** on the app page:

1. On the app page, go to the **General** section
2. In the **Authorization Callback URLs** section
3. Select in the dropdown the `splash-xro` domain (or else if it changed) and add `/api/auth/callback`


### 4. Set scopes

1. On the app page, go to the **Permissions** section
2. In the **Scopes** section, turn on "Email", "Profile", "Refresh Token"


### 5. Set Environment Variables

In the Vercel project dashboard (**Settings → Environment Variables**), add:

| Variable | Value |
|---|---|
| `VERCEL_APP_CLIENT_ID` | The Client ID from step 1 |
| `VERCEL_APP_CLIENT_SECRET` | The Client Secret from step 2 ⚠️ Save as Secret |

These are used by the serverless functions in `api/auth/` and are never exposed to the browser.
