#!/usr/bin/env bun
/**
 * Read sheet, find text, replace in that cell. Same auth as update-google-sheet.ts.
 * Usage: bun run scripts/find-and-replace-sheet.ts "find this" "replace with this"
 */

import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const spreadsheetId =
  process.env.GOOGLE_SHEETS_ID ||
  "1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM";
const keyPath = process.env.SERVICE_ACCOUNT_KEY_PATH!;

async function getSheetsClient() {
  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return google.sheets({ version: "v4", auth: authClient });
}

function columnToLetter(col: number): string {
  let letter = "";
  while (col >= 0) {
    letter = String.fromCharCode((col % 26) + 65) + letter;
    col = Math.floor(col / 26) - 1;
  }
  return letter;
}

async function main() {
  const findText = process.argv[2];
  const replaceText = process.argv[3];
  if (!findText || !replaceText) {
    console.error("Usage: bun run scripts/find-and-replace-sheet.ts \"find\" \"replace\"");
    process.exit(1);
  }

  const sheets = await getSheetsClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetList = meta.data.sheets ?? [];

  for (const sheet of sheetList) {
    const title = sheet.properties?.title ?? "";
    const range = `${title}!A1:Z500`;
    let values: string[][];
    try {
      const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      values = (res.data.values ?? []) as string[][];
    } catch {
      continue;
    }
    for (let r = 0; r < values.length; r++) {
      const row = values[r];
      for (let c = 0; c < (row?.length ?? 0); c++) {
        const cell = String(row[c] ?? "");
        if (cell.includes(findText)) {
          const newVal = cell.replace(findText, replaceText);
          const cellRef = `${title}!${columnToLetter(c)}${r + 1}`;
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: cellRef,
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [[newVal]] },
          });
          console.log(`Updated ${cellRef}: "${findText}" → "${replaceText}"`);
          return;
        }
      }
    }
  }
  console.error(`"${findText}" not found in any sheet.`);
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
