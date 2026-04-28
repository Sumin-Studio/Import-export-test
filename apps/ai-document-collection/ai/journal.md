# AI / product journal

## 2025-03-05

### Summary of changes / discussion

- **Document-collection value proposition (accountant view)**  
  Clarified how the AgenticCloud POC compares to the market and why an accountant would use it over Zapier or connecting Dropbox directly in Xero:
  - **Scoped client consent**: Client explicitly picks which folder the agent can scan (good for engagement letters and data minimization).
  - **Pre-import workflow**: AI classification (Tax Documents, Payroll, Receipts, Bank Statements, Other) before anything is pushed to the ledger; accountant can review and correct before attaching in Xero.
  - **Privacy**: Classification runs locally via Ollama — no sending client documents to third-party cloud AI.
  - **Practice-centric**: One dashboard for many clients; each client connects their own Dropbox and chooses one folder.
  - **Cost**: No per-task Zapier cost; no per-call cloud AI cost for classification.

- **Framing: “Accountant view in Xero”**  
  Reframed the story assuming the accountant experience (client list, Connect Dropbox, Send onboarding, Run agent scan, categorized file list) lives **inside Xero** (even though the POC is not yet connected to Xero). Under that framing, the same benefits apply; the differentiator is that the full workflow is native to Xero instead of split across Zapier or a separate app.

- **No code or config changes** were made in this session; the work was discussion and documentation of the value proposition.

### Open questions

- **Xero integration**: When and how to add real Xero API integration (auth, push documents/attachments to contacts or transactions) so the “attach from categorized list” step happens in Xero.
- **Multi-storage**: POC is Dropbox-only; whether to support Google Drive, OneDrive, or others for client choice and parity with Zapier.
- **Hosting and ops**: How practices will run Ollama and the app (self-host vs managed); impact on “no code” positioning for non-technical accountants.
- **Classification depth**: Whether to use document content (e.g. text preview) in addition to file names for Ollama classification to improve accuracy; any UX for “reclassify” or bulk correct before attach.
