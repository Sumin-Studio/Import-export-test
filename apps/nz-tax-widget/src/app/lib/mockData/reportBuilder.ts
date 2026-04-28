/**
 * Mock rows for the Report builder prototype (NZ Tax alerts → Missed payments link).
 * Volumes and copy are aligned to a typical XPM practice list.
 */

export type ReportBuilderMockRow = {
  title: string;
  type: string;
  layout: string;
  author: string;
  dateCreated: string;
  lastUsed: string;
};

export const REPORT_BUILDER_MOCK_ROWS: ReportBuilderMockRow[] = [
  {
    title: "Job To-do Report",
    type: "Job To-do",
    layout: "Table",
    author: "Rob Porter",
    dateCreated: "17 Dec 2024",
    lastUsed: "17 Dec 2024",
  },
  {
    title: "CLIENTS - All client fields data export (NZ XPM for Kiwi Practice)",
    type: "Client & Contact",
    layout: "Table",
    author: "Mandy Neal",
    dateCreated: "10 Nov 2021",
    lastUsed: "10 Nov 2021",
  },
  {
    title: "Custom Client Rates Monthly Summary",
    type: "Custom Client Rates",
    layout: "Monthly Summary",
    author: "Mandy Neal",
    dateCreated: "12 Aug 2020",
    lastUsed: "—",
  },
  {
    title: "Bens Report (copy, but who is the author)",
    type: "Client & Contact",
    layout: "Table",
    author: "Ben Allen",
    dateCreated: "5 Aug 2020",
    lastUsed: "22 Jul 2022",
  },
  {
    title: "JOB REPORT - Job Profitability - All Completed Jobs - Last Month",
    type: "Job",
    layout: "Table",
    author: "Fraser Killip",
    dateCreated: "24 Jul 2020",
    lastUsed: "22 Jul 2022",
  },
  {
    title: "JOB REPORT - Job Profitability - All Completed Jobs - Last Month",
    type: "Job",
    layout: "Table",
    author: "Mandy Neal",
    dateCreated: "17 Jul 2020",
    lastUsed: "—",
  },
  {
    title: "Bens Client Group Monthly Summary",
    type: "Client Group",
    layout: "Monthly Summary",
    author: "Ben Allen",
    dateCreated: "15 Jul 2020",
    lastUsed: "15 Jul 2020",
  },
  {
    title: "Client Note Report by Saif",
    type: "Client Note",
    layout: "Table",
    author: "Saif TWO",
    dateCreated: "13 Jul 2020",
    lastUsed: "—",
  },
  {
    title: "Bens Report",
    type: "Client & Contact",
    layout: "Table",
    author: "Ben Allen",
    dateCreated: "13 Jul 2020",
    lastUsed: "—",
  },
  {
    title: "Invoice Note Report",
    type: "Invoice Note",
    layout: "Table",
    author: "Mandy Neal",
    dateCreated: "30 Jun 2020",
    lastUsed: "—",
  },
  {
    title: "Report test",
    type: "Client Relationships",
    layout: "Pie Chart",
    author: "Yuliya Levchenko",
    dateCreated: "30 Jun 2020",
    lastUsed: "13 Jul 2020",
  },
  {
    title: "Quote Monthly Summary",
    type: "Quote",
    layout: "Monthly",
    author: "Mandy Neal",
    dateCreated: "30 Jun 2020",
    lastUsed: "22 Jul 2022",
  },
];
