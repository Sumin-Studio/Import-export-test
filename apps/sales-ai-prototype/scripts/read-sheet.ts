#!/usr/bin/env bun
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const spreadsheetId = process.env.GOOGLE_SHEETS_ID || "1Dgu6ORnFMmKTR-SWsux1AcGAFds-A4Pl1rT37J_31WM";
const keyPath = process.env.SERVICE_ACCOUNT_KEY_PATH!;

async function main() {
  const auth = new GoogleAuth({ keyFile: keyPath, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  for (const sheet of meta.data.sheets ?? []) {
    const title = sheet.properties?.title ?? "";
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${title}!A1:Z100` });
    const values = (res.data.values ?? []) as string[][];
    console.log("\n--- Sheet:", title);
    values.forEach((row, i) => {
      const line = (row ?? []).map(c => String(c ?? "")).join(" | ");
      if (line) console.log(`${i + 1}: ${line}`);
    });
  }
}
main().catch(e => { console.error(e); process.exit(1); });
