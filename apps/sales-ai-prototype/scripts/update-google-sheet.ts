#!/usr/bin/env bun
/**
 * Update a Google Sheet by range using the same auth pattern as
 * ~/cmd/2025/audrey-spreadsheet-view (service account key file).
 *
 * Prereqs:
 * 1. Share the spreadsheet with the service account email (from the key's client_email).
 * 2. Set env: GOOGLE_SHEETS_ID, SERVICE_ACCOUNT_KEY_PATH
 *
 * Usage:
 *   # Update range from a JSON file (array of rows)
 *   bun run scripts/update-google-sheet.ts "Sheet1!A1:C10" ./data.json
 *
 *   # Spreadsheet ID can be first arg to override env
 *   bun run scripts/update-google-sheet.ts 1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM "Sheet1!A1:B2" ./data.json
 *
 * JSON file format: array of rows, e.g. [ ["a","b"], ["c","d"] ]
 */

import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { readFileSync } from "fs";

const spreadsheetId =
  process.env.GOOGLE_SHEETS_ID ||
  "1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM";
const keyPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!keyPath) {
  console.error("Set SERVICE_ACCOUNT_KEY_PATH to your service account JSON key path.");
  process.exit(1);
}

async function getSheetsClient() {
  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return google.sheets({ version: "v4", auth: authClient });
}

export async function updateSheet(
  id: string,
  range: string,
  values: string[][]
): Promise<void> {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: id,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

async function main() {
  const args = process.argv.slice(2);
  let id = spreadsheetId;
  let range: string;
  let values: string[][];

  if (args.length >= 3 && !args[0].includes("!")) {
    id = args[0];
    range = args[1];
    const payload = args[2];
    if (payload.startsWith("[")) {
      values = JSON.parse(payload) as string[][];
    } else {
      values = JSON.parse(readFileSync(payload, "utf-8")) as string[][];
    }
  } else if (args.length >= 2) {
    range = args[0];
    const payload = args[1];
    if (payload.startsWith("[")) {
      values = JSON.parse(payload) as string[][];
    } else {
      values = JSON.parse(readFileSync(payload, "utf-8")) as string[][];
    }
  } else {
    console.log(`
Usage:
  bun run scripts/update-google-sheet.ts <range> <values.json>
  bun run scripts/update-google-sheet.ts <spreadsheetId> <range> <values.json>

Examples:
  bun run scripts/update-google-sheet.ts "Sheet1!A1:B2" ./data.json
  bun run scripts/update-google-sheet.ts "Sheet1!A1" '[[ "Hello", "World" ]]'

Env: GOOGLE_SHEETS_ID (optional), SERVICE_ACCOUNT_KEY_PATH (required)
`);
    process.exit(1);
  }

  await updateSheet(id, range, values);
  console.log(`Updated ${id} range ${range} with ${values.length} row(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
