import type { DropboxEntry } from "@/lib/dropbox";

/** Sentinel access token — never sent to Dropbox APIs; branches use `connection.isDemo`. */
export const DEMO_ACCESS_TOKEN = "__DEMO__";

export function normalizeDemoFolderPath(path: string): string {
  if (path === "" || path === "/") return "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return p.replace(/\/$/, "") || "";
}

type Subfolder = { name: string; path_display: string };

/** Immediate children folders only (mirrors Dropbox list_folder non-recursive). */
const DEMO_SUBFOLDERS: Record<string, Subfolder[]> = {
  "": [
    {
      name: "Documents for Smith & Co — FY25",
      path_display: "/Documents for Smith & Co — FY25",
    },
    { name: "Personal", path_display: "/Personal" },
    { name: "Camera uploads", path_display: "/Camera uploads" },
  ],
  "/Documents for Smith & Co — FY25": [
    {
      name: "01 Tax & compliance",
      path_display: "/Documents for Smith & Co — FY25/01 Tax & compliance",
    },
    {
      name: "02 Invoices & bills",
      path_display: "/Documents for Smith & Co — FY25/02 Invoices & bills",
    },
    {
      name: "03 Banking & payroll",
      path_display: "/Documents for Smith & Co — FY25/03 Banking & payroll",
    },
  ],
  "/Documents for Smith & Co — FY25/01 Tax & compliance": [
    {
      name: "Prior year",
      path_display: "/Documents for Smith & Co — FY25/01 Tax & compliance/Prior year",
    },
  ],
  "/Personal": [],
  "/Camera uploads": [],
  "/Documents for Smith & Co — FY25/02 Invoices & bills": [],
  "/Documents for Smith & Co — FY25/03 Banking & payroll": [],
  "/Documents for Smith & Co — FY25/01 Tax & compliance/Prior year": [],
};

/** All simulated files (full path_display), for recursive scan + file proxy allowlist. */
const DEMO_FILES: DropboxEntry[] = [
  {
    name: "FY24_Corporate_Return_signed.pdf",
    path_display:
      "/Documents for Smith & Co — FY25/01 Tax & compliance/FY24_Corporate_Return_signed.pdf",
    ".tag": "file",
  },
  {
    name: "W-9_Acme_Holdings_2025.pdf",
    path_display:
      "/Documents for Smith & Co — FY25/01 Tax & compliance/W-9_Acme_Holdings_2025.pdf",
    ".tag": "file",
  },
  {
    name: "Cap_Table_summary_Feb2025.xlsx",
    path_display:
      "/Documents for Smith & Co — FY25/01 Tax & compliance/Cap_Table_summary_Feb2025.xlsx",
    ".tag": "file",
  },
  {
    name: "FY23_return_for_reference.pdf",
    path_display:
      "/Documents for Smith & Co — FY25/01 Tax & compliance/Prior year/FY23_return_for_reference.pdf",
    ".tag": "file",
  },
  {
    name: "INV-8841_Staples_office_supplies.pdf",
    path_display:
      "/Documents for Smith & Co — FY25/02 Invoices & bills/INV-8841_Staples_office_supplies.pdf",
    ".tag": "file",
  },
  {
    name: "AWS_March_2025_invoice.pdf",
    path_display:
      "/Documents for Smith & Co — FY25/02 Invoices & bills/AWS_March_2025_invoice.pdf",
    ".tag": "file",
  },
  {
    name: "Receipt_coffee_meeting.png",
    path_display:
      "/Documents for Smith & Co — FY25/02 Invoices & bills/Receipt_coffee_meeting.png",
    ".tag": "file",
  },
  {
    name: "Chase_8372_Statement_Mar2025.pdf",
    path_display:
      "/Documents for Smith & Co — FY25/03 Banking & payroll/Chase_8372_Statement_Mar2025.pdf",
    ".tag": "file",
  },
  {
    name: "ADP_Payroll_summary_Q1.pdf",
    path_display:
      "/Documents for Smith & Co — FY25/03 Banking & payroll/ADP_Payroll_summary_Q1.pdf",
    ".tag": "file",
  },
];

const DEMO_PATH_SET = new Set(DEMO_FILES.map((f) => f.path_display));

export function listDemoSubfolders(parentPath: string): Subfolder[] {
  const key = normalizeDemoFolderPath(parentPath);
  return DEMO_SUBFOLDERS[key] ?? [];
}

/** Recursive file list under `folderPath` (Dropbox-style), same semantics as listFolderFiles. */
export function listDemoFolderFilesRecursive(folderPath: string): DropboxEntry[] {
  const root = normalizeDemoFolderPath(folderPath);
  if (root === "") {
    return [...DEMO_FILES];
  }
  return DEMO_FILES.filter(
    (f) => f.path_display === root || f.path_display.startsWith(`${root}/`)
  );
}

/** Minimal valid PDF so the dashboard iframe preview loads. */
function minimalDemoPdf(title: string): Buffer {
  const body = `BT /F1 14 Tf 48 760 Td (${title.replace(/[()\\]/g, "")}) Tj ET`;
  const objects = [
    "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n",
    "2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n",
    "3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n",
    `4 0 obj<</Length ${body.length}>>stream\n${body}\nendstream\nendobj\n`,
    "5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n",
  ];
  let off = 0;
  const xrefLines = ["0000000000 65535 f \n"];
  const parts: string[] = [];
  for (const o of objects) {
    xrefLines.push(`${String(off).padStart(10, "0")} 00000 n \n`);
    parts.push(o);
    off += o.length;
  }
  const bodyStr = parts.join("");
  const xrefStart = off;
  const xref = `xref\n0 ${xrefLines.length}\n${xrefLines.join("")}trailer<</Size ${xrefLines.length}/Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from(bodyStr + xref, "latin1");
}

const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  "base64"
);

export function getDemoFileResponse(path: string): { body: Buffer; contentType: string } | null {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!DEMO_PATH_SET.has(p)) return null;
  const name = p.split("/").pop() ?? "document";
  const lower = name.toLowerCase();
  if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".gif")) {
    return { body: PNG_1X1, contentType: "image/png" };
  }
  if (lower.endsWith(".pdf")) {
    return {
      body: minimalDemoPdf(`Demo: ${name}`),
      contentType: "application/pdf",
    };
  }
  return {
    body: Buffer.from(
      `Demo file (prototype)\n\n${name}\n\nNo real cloud file exists in demo mode.`,
      "utf-8"
    ),
    contentType: "text/plain; charset=utf-8",
  };
}
