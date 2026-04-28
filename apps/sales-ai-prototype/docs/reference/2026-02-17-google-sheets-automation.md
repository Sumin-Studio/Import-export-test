# Google Sheets automation (how to update automatically)

## Where the existing work lives

Your recent automation uses the **Google Sheets API v4** with **service account** auth in two places:

| Location | Purpose | Write/update? |
|----------|--------|----------------|
| **`~/cmd/2025/audrey-spreadsheet-view/`** | Next.js app that reads (and can write) a sheet via API | Yes – `lib/google-sheets.ts` has `updateSheetData(range, values)`; the API route currently only exposes GET. |
| **`~/cmd/common/kaching/lib/google-sheets.ts`** | Full read/write sync (export/import transactions, update rows) | Yes – `spreadsheets.values.update`, `batchUpdate`, clear, etc. |

Both use:

- **Auth**: Service account (key file or JSON in env).
- **Libraries**: `googleapis` + `google-auth-library` (audrey) or `google.auth.JWT` (kaching).

## Updating your spreadsheet

**Spreadsheet:**  
<https://docs.google.com/spreadsheets/d/1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM/edit?gid=1081952226#gid=1081952226>

- **Spreadsheet ID:** `1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM`
- **Tab (gid):** `1081952226` (for the API you usually use the **sheet name** in the range, e.g. `"Sheet1!A1:D10"`).

### 1. Share the sheet with the service account

Use the same key as audrey-spreadsheet-view (or your own key):

1. Open the spreadsheet → Share.
2. Add the service account email (e.g. from the key’s `client_email`: `deck-automation@fleet-racer-423818-t8.iam.gserviceaccount.com` or from your key).
3. Give **Editor** if the script will write; **Viewer** is enough for read-only.

### 2. Run the update script (from this repo)

From `payments-agents-team`:

```bash
# One-time: install deps
bun install

# Set env (same key path as audrey-spreadsheet-view)
export GOOGLE_SHEETS_ID=1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM
export SERVICE_ACCOUNT_KEY_PATH=/path/to/your/service-account-key.json

# Update a range from a JSON file of rows (see scripts/update-google-sheet.ts usage)
bun run scripts/update-google-sheet.ts -- "Sheet1!A1:C3" ./data-to-write.json
```

Or use the script’s API from another script (see `scripts/update-google-sheet.ts`).

### 3. Alternative: use audrey-spreadsheet-view client

If you already run the viewer app and use the same key:

- Reuse `GoogleSheetsClient` from `~/cmd/2025/audrey-spreadsheet-view/lib/google-sheets.ts`.
- Set `GOOGLE_SHEETS_ID` to `1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM`.
- Call `client.updateSheetData(range, values)` (e.g. from a new API route or a one-off script in that repo).

## Auth reference (audrey-spreadsheet-view)

- **Env:** `GOOGLE_SHEETS_ID`, `SERVICE_ACCOUNT_KEY_PATH` (path to JSON key file).
- **Scopes:** `https://www.googleapis.com/auth/spreadsheets` (read + write).
- **Key file:** Google Cloud Console → IAM → Service accounts → Create key (JSON). Keep it out of git.
