# AgenticCloud – Setup guide (non-developers)

Follow these steps in order. You’ll need: a computer, a Dropbox account, and about 15 minutes.

---

## Step 1: Install Node.js (if you don’t have it)

1. Go to **https://nodejs.org**
2. Download the **LTS** version (green button).
3. Run the installer and accept the defaults.
4. Restart your computer (or at least close and reopen any Terminal window).

To check it worked: open **Terminal** (Mac) or **Command Prompt** (Windows), type:

```text
node -v
```

You should see a version number (e.g. `v20.10.0`). If you get “command not found”, Node.js is not installed or not in your PATH.

---

## Step 2: Create a Dropbox app and get your keys

1. Go to **https://www.dropbox.com/developers/apps**
2. Click **Create app**.
3. Choose **Scoped access** → **Next**.
4. Choose **App folder** (so the app only sees one folder) → **Next**.
5. Name the app (e.g. `AgenticCloud POC`) and check the box to agree → **Create app**.
6. On the app page, open the **Permissions** tab. Enable **files.metadata.read** and **files.content.read** (required for listing and reading files). Save if there is a **Submit** or **Save** button.
7. Scroll to **OAuth 2** → **Redirect URIs**.
8. Click **Add**, and enter exactly:
   ```text
   http://localhost:3000/api/auth/dropbox/callback
   ```
   Then **Add** again to save.
9. Still on the same page, find:
   - **App key** (long string of letters and numbers)
   - **App secret** – click **Show** to reveal it
10. **Copy both** and keep them somewhere safe (e.g. a text file). You’ll paste them in Step 4.

---

## Step 3: Install Ollama (the AI that classifies your files)

Ollama runs a small AI on your computer so the app can put files into categories (Tax, Payroll, Receipts, etc.) without sending data to the cloud.

1. Go to **https://ollama.com**
2. Click **Download** and install Ollama for your operating system.
3. Open the **Ollama** app (it may sit in your menu bar or system tray).
4. Open **Terminal** (Mac) or **Command Prompt** (Windows) and run:
   ```text
   ollama run llama3.2
   ```
   The first time it will download the model (about 2 GB). When you see “>>>”, the model is ready.
5. You can close that Terminal window, but **keep the Ollama app running** (menu bar or tray). The AgenticCloud app needs it to be running in the background.

---

## Step 4: Add your Dropbox keys to the project

1. Open the project folder in Finder (Mac) or File Explorer (Windows). It’s the folder that contains `package.json` and `README.md` (e.g. `docdemo` or `agenticcloud`).
2. Find the file named **`.env.example`**.  
   If you don’t see it, it may be hidden: on Mac, in Finder press **Cmd + Shift + .** to show hidden files.
3. **Duplicate** that file in the same folder and rename the copy to **`.env.local`** (with the dot at the start).
4. Open **`.env.local`** in a text editor (Notepad, TextEdit, VS Code, etc.).
5. Replace the contents so it looks like this, **pasting your real App key and App secret** where indicated:

   ```text
   DROPBOX_APP_KEY=paste_your_app_key_here
   DROPBOX_APP_SECRET=paste_your_app_secret_here
   APP_URL=http://localhost:3000
   ```

   - No spaces around the `=`.
   - Do not add quotes.
   - Save the file and close it.

---

## Step 5: Install the app and start it

1. Open **Terminal** (Mac) or **Command Prompt** (Windows).
2. Go into the project folder. Type (replace with your actual folder path if different):

   **Mac / Linux:**
   ```text
   cd /Users/thibault.michel/code/docdemo
   ```

   **Windows:**
   ```text
   cd C:\path\to\docdemo
   ```
   (Use the real path to your project folder.)

3. Install dependencies (only needed once):
   ```text
   npm install
   ```
   Wait until it finishes without errors.

4. Start the app:
   ```text
   npm run dev
   ```
   You should see something like: `Ready on http://localhost:3000`

5. **Leave this window open** while you use the app. Closing it stops the app.

---

## Step 6: Open the app in your browser

1. Open your web browser (Chrome, Safari, Edge, etc.).
2. In the address bar type:
   ```text
   http://localhost:3000/dashboard
   ```
   and press Enter.

You should see the AgenticCloud dashboard with a table of clients.

---

## Step 7: Connect Dropbox and run a scan

1. In the table, pick any client (e.g. “Memphis Music”).
2. Click **Connect Dropbox** for that client.
3. You’ll be sent to Dropbox. Log in if asked, then click **Allow** to let AgenticCloud access your Dropbox.
4. You’ll be sent back to the app. That client should now show **Connected** and you may be on that client’s page.
5. If you’re still on the dashboard, click the **client name** (or **View**) to open their page.
6. On the client page, click **Run agent scan**.
7. If you connected as the client (via the onboarding link), you will have chosen which folder the agent can scan. The app will list that folder and use Ollama to put each file into a category (Tax Documents, Payroll, Receipts, Bank Statements, or Other). You’ll see a live log and then a list of files by category with confidence scores.

**Note:** The client chooses which folder to share when they complete the onboarding flow (after connecting Dropbox).

---

## App not showing in the browser?

1. **Check the terminal** where you ran `npm run dev`. Look for a line like:
   ```text
   Local: http://localhost:3000
   ```
   (Sometimes it might say `3001` or `3002` if 3000 is already in use.)

2. **Use that exact address** in your browser. For the main screen use:
   ```text
   http://localhost:3000/dashboard
   ```
   (Replace `3000` with the port number from the terminal if it’s different.)

3. **If you see “This site can’t be reached”** – the dev server probably isn’t running. In the project folder run `npm run dev` again and leave that terminal window open.

4. **If port 3000 is in use** – another app is using it. Either close that app, or use the other port number (3001, 3002, …) that Next.js shows in the terminal.

---

## If something goes wrong

- **“Dropbox app not configured”** or **“clientId is required”**  
  Check that `.env.local` exists in the project folder, has the correct `DROPBOX_APP_KEY` and `DROPBOX_APP_SECRET`, and that you restarted the app (`npm run dev`) after changing it.

- **“Not connected. Connect Dropbox first.”**  
  You need to complete Step 7.1–7.4 (click Connect Dropbox and allow access in Dropbox).

- **Scan fails or files don’t get categories**  
  Make sure Ollama is running (Step 3) and you’ve run `ollama run llama3.2` at least once so the model is downloaded.

- **“Cannot GET /dashboard” or page not loading**  
  Make sure you started the app with `npm run dev` and that you’re opening `http://localhost:3000/dashboard` (not just `localhost`).

- **Redirect URI error from Dropbox**  
  The redirect in Dropbox must be exactly:  
  `http://localhost:3000/api/auth/dropbox/callback`  
  (no trailing slash, `http` not `https`, port 3000).

If you’re still stuck, share the exact message you see (or a screenshot) and which step you’re on.
