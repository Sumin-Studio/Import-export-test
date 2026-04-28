# How to test AgenticCloud

## Before you start

- **App URL:** http://localhost:3002  
  If the app is not running, open Terminal in the project folder and run: `npm run dev`
- **Dropbox:** You need a Dropbox app (App key + secret in `.env.local`) and the redirect URI `http://localhost:3002/api/auth/dropbox/callback` set in the Dropbox app settings.
- **Ollama:** Install and run `ollama run llama3.2` so the agent can classify files. Keep Ollama running in the background.

---

## 1. Open the accountant dashboard

1. In your browser go to: **http://localhost:3002/dashboard**
2. You should see the **Document collection** page with a table of clients (e.g. Memphis Music, Summit Ventures LLC, etc.).
3. Each row shows: **Client Name**, **Connection Status** (Connected or Pending), **Storage Source**, **Last Agent Scan**, and an **Action** button.

**Check:** The table loads and "Send Onboarding Request" and "Scan all clients" are visible at the top.

---

## 2. Send an onboarding request (accountant flow)

1. Click **Send Onboarding Request** (top right).
2. In the modal, **select a client** from the list (e.g. "Summit Ventures LLC").
3. You should see a second step: **"Link for your client"** with a URL like `http://localhost:3002/connect/2`.
4. Click **Copy link** (or copy the URL manually).
5. Close the modal.

**Check:** You get a client-specific link that you would send to the client by email in a real flow.

---

## 3. Simulate the client opening the link

1. Open a **new browser tab** (or a private/incognito window to simulate the client).
2. Paste the link you copied (e.g. `http://localhost:3002/connect/2`) and press Enter.
3. You should see an **email-style page**: message from your accountant requesting access, with a **Connect my storage** button.
4. Click **Connect my storage**.
5. You land on the **cloud storage selection** page (Google Drive, Dropbox, OneDrive, Box). Only **Dropbox** has a working **Connect** button; the others show "Coming soon".
6. Click **Connect** next to Dropbox. You are redirected to **Dropbox**. Sign in if needed and click **Allow** to authorize the app.
7. You are redirected to **Choose your main working folder**: browse your Dropbox folders and click **Use this folder** for the one the agent should scan.
8. You are then shown the **success page**: "You're all set. Your accountant can now see the relevant documents from [your chosen folder]."
9. You can close this tab.

**Check:** The client flow (link → email page → Connect my storage → Dropbox → choose folder → success) works. The first agent scan runs in the background after the client selects a folder.

---

## 4. See the result as the accountant

1. Go back to the **accountant tab**: http://localhost:3002/dashboard
2. **Refresh the page** (or click **Scan all clients** to run a new scan for all connected clients).
3. Find the client you used (e.g. Summit Ventures LLC). **Connection Status** should now show **Connected** (green badge), and **Last Agent Scan** should show a time (e.g. "Today" or "Just now").
4. Click the **client name** (or **View**) to open the **client detail** page.
5. You should see:
   - **Live Agent Activity:** A feed of lines like "Connecting to Dropbox…", "Scanning folder…", "Found N files", "Classifying …", etc. (from the real scan).
   - **Categorized files:** Sections (Tax Documents, Payroll, Receipts, Bank Statements, Other) with files from the folder the client selected, each with a **confidence score** and **Auto-Categorized** tag.

**Check:** The accountant sees the client as connected and sees the scanned and categorized files.

---

## 5. Run a new scan (refresh files)

1. On the **client detail** page, click **Run agent scan**.
2. Wait a few seconds. The **Live Agent Activity** feed updates and the **Categorized files** list refreshes with the latest scan.
3. Or go back to the **dashboard** and click **Scan all clients** to re-scan all connected clients; then open a client again to see updated files.

**Check:** Manual re-scan works; new or changed files in Dropbox can appear after a refresh.

---

## 6. Pending client (no link used yet)

1. On the dashboard, pick a client that still shows **Pending** (e.g. one you did not use in step 3).
2. Click their name to open the client detail page.
3. You should see: **"This client has not connected yet"** and the message that you need to send them the onboarding link from the dashboard. There is **no** "Connect Dropbox" button (only the client can connect via the link).

**Check:** Accountant cannot connect on behalf of the client; they must send the link.

---

## Quick checklist

| Step | What to do | What you should see |
|------|------------|----------------------|
| 1 | Open http://localhost:3002/dashboard | Table of clients, Send Onboarding Request, Scan all clients |
| 2 | Send Onboarding Request → select client → Copy link | Modal with client link |
| 3 | Open link → email page → Connect my storage → Dropbox → choose folder → Use this folder | Client success page "You're all set" |
| 4 | Back on dashboard, refresh, open that client | Connected, Last scan time, Live feed + Categorized files |
| 5 | On client detail: Run agent scan (or dashboard: Scan all clients) | Feed and file list update |
| 6 | Open a Pending client detail | "This client has not connected yet", no Connect Dropbox |

---

## CSS not loading or can't click anything

If the page appears but has no styling (plain white background, no layout) or buttons/links don't respond to clicks:

1. **Stop the dev server** (Ctrl+C in the terminal where `npm run dev` is running).
2. **Delete the Next.js cache:** in the project folder run:
   ```bash
   rm -rf .next
   ```
3. **Start again:** `npm run dev`
4. **Hard-refresh the browser:** Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac), or open the app in a new incognito/private window at http://localhost:3002/dashboard

If it still fails, check the browser console (F12 → Console) for red errors and the Network tab to see if the main document and any CSS/JS requests load (status 200).

---

## "files.metadata.read" or "not permitted to access this endpoint" (Dropbox 400)

Your Dropbox app does not have the right permissions, or the token was created before you enabled them.

1. Go to **https://www.dropbox.com/developers/apps** and open your app.
2. Open the **Permissions** tab.
3. Enable **files.metadata.read** and **files.content.read**. Save if needed.
4. **Re-authorize:** existing tokens do not get new scopes. Have the client open the connect link again and click **Connect storage** so Dropbox issues a new token with the new scopes.

---

## All files show as "Other" or 0% confidence (Ollama)

Classification is done by Ollama. If every file is "Other" with 0% confidence, Ollama is not running or the model is not available.

1. Install Ollama from **https://ollama.com** and keep the app running (menu bar / system tray).
2. In a terminal run: `ollama run llama3.2` (first time downloads the model). You can close the terminal; the Ollama service keeps running.
3. Run a new scan (client detail page → **Run agent scan**). Files should then get categories (Tax Documents, Payroll, Receipts, Bank Statements, Other) and confidence scores.

To use a different model, set `OLLAMA_MODEL=your-model` in `.env.local` and restart the app.

---

## If something fails

- **"Dropbox app not configured"** → Check `.env.local` has `DROPBOX_APP_KEY` and `DROPBOX_APP_SECRET`, and that the redirect URI in the Dropbox app is exactly `http://localhost:3002/api/auth/dropbox/callback`.
- **Scan shows no files or errors** → Ensure Ollama is running (`ollama run llama3.2`) and that the client selected a folder that contains files.
- **Page not loading** → Confirm the app is running: in the project folder run `npm run dev` and use http://localhost:3002 (or the port shown in the terminal).
