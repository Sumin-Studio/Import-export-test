/**
 * Safety Shield: User research basis and gaps — source for Confluence sync.
 * Date: 2026-03-10. Update this file to refresh the Confluence page.
 */
export const safetyShieldUserResearchAndGapsMarkdown = `**Date:** 2026-03-10  
**Purpose:** Single reference for what the Safety Shield working brief is based on (and what it is not), which existing research is relevant, and what we do not yet know. Use this when asked "what user research is Safety Shield based on?" or when planning validation work.

## Summary

The Safety Shield working brief is **not** based on cited user research. It is **hypothesis- and alignment-driven**: product reasoning, stakeholder alignment (Rory, Tauqir, Jon, Chong/Bharathi strategy), competitive framing (Ramp, BILL, QBO, Brex), and related approval/duplicate research that exists elsewhere. A **customer research plan** for the agent suite (including Safety Shield) was called out at the AI Agent Squad kickoff (2026-03-06) as required, owned by Merv/David — that plan is the intended follow-up to ground Safety Shield in user evidence.

## Related research (existing studies)

None of these are Safety Shield–specific. They touch approval workflows, duplicate detection, or AP risk and are the closest available evidence.

| Source | Owner | What it covers | Link / location |
|--------|--------|----------------|------------------|
| **Approvals in Bill Payment Workflows: Synthesis** | Jessica Nicholl | Six design research studies; approval as core step; visibility in bills workflow; status/findability; multi-user clarity | Confluence [XFS 271179252036](https://xero.atlassian.net/wiki/spaces/XFS/pages/271179252036) |
| **2026_01 Payments Melio Approvals Flows Research brief** | Natalie Kerschner | US Bill Pay approvals; bill vs payment approval mental model; journey mapping; 24 participants (US/AU/UK); usability (discovery, workflow, terminology) | [Google Doc](https://docs.google.com/document/d/1Ngx5Jiy5zphpajK_UEjEr7SPxrO2rx_r) |
| **PRD \\| Bill Payments Approval Workflows (Global)** | Neeraj Sahu / Jenny Nedanovski | Cites "usability research conducted in Dec 2025" — users view bill and payment approvals as single combined function | Confluence Payments space; links to US Bill Pay Usability Testing deck |
| **Business growth, delegation, and user permissions** | Lana Kinney (Jun 24) | Segregation of duties; fake bills / wrong accounts; bank-detail fraud (e.g. South Africa); approval needs in purchases/AP; competitor approval products | [Google Doc](https://docs.google.com/document/d/1Ce5NalRcz3OsQW6nufxbhL1s3ymZsy-BzxRFA1nVqHo) |
| **2025_07 \\| AU Bill Pay Phase 1 \\| Research report** | Jenny Nedanovski / Angus Tait | 10 interviews; "Needing to identify duplicate bills before payment" as customer challenge; risk of duplicate payments; trust/security | [Google Slides](https://docs.google.com/presentation/d/1n0HRpuzENKjT7HABmKNI2fDJL0jXTOmLIqCjvzDMN3I) |
| **2024 PRD - Bills - Duplicate detection** | Dillon Gearing | Duplicate detection feature; "outside of customer feedback we do not have significant data" on how often duplicates created/paid; customer testing with Product Ideas requesters | Confluence Bills space [270085455874](https://xero.atlassian.net/wiki/spaces/BIL/pages/270085455874); discussion guide + notes linked |
| **Approval Workflow Participant Research (e.g. P12)** | Natalie Kerschner (Design Research) | Journey maps; multi-step approval; thresholds; PO matching; payment runs; pain points (syncing, manual cash forecasting) | Referenced in Slack (Lili/Chong thread); summary in approvals research stream |

The Bill Pay PRD and workshop materials reference **problem scoring** (e.g. "Fraud and error risk with no risk signal layer" as a top problem) — that is internal prioritisation, not user research on Safety Shield behaviour or trust.

## Gaps (what we don't know yet)

Sources: Rory's PRD Lite "What we don't know yet" (Confluence); Safety Shield working brief "Open questions"; Glean synthesis (2026-03-10).

### Quantification / data

- **Duplicate payment dollar value** in Xero — how much is overpaid due to duplicates.
- **Invoice fraud incidence** among Xero customers.
- **Time spent on manual bill review** specifically for safety/risk (vs general approval).

### Behaviour and trust

- **Anomaly detection false positive rates** — no Xero data on anomalous-but-legitimate vs anomalous-but-fraudulent; wrong calibration would undermine trust.
- **How much evidence is "enough"** for users to trust an interruption (open question in the working brief).
- Whether users will accept **exception-based review** (elevate a few bills) vs flat review — not validated with research.

### Segments and adoption

- **Advisor adoption at portfolio scale** — no research on advisor appetite for AI-driven fraud screening across multiple clients (PRD Lite).
- **First-time supplier + large bill** and **familiar supplier + abnormal spike** — no dedicated validation that these scenarios match how SMBs/approvers think about risk.

### Product / scope

- **Which signals should hard-stop vs warn** (working brief open question).
- **Where the first release should live** (bills list, detail, approval queue, Spotlight, or combination).
- **How the system should learn from overrides** without becoming opaque.

### Competitive and market

- How Safety Shield compares in **user perception** to Ramp/BILL/QBO/Brex safety features — no direct comparative UX or attitude research cited.

## Next steps

- **Customer research plan:** When Merv/David's plan is available, link it here and prioritise validation of exception-based review and "enough evidence" before scaling Safety Shield messaging.
- **Before first release:** Consider at least one round of user testing focused on: (1) whether the three recommended scenarios (duplicates, first-time supplier + large bill, familiar supplier + spike) resonate, and (2) what level of evidence and explanation makes an interruption feel trustworthy.
`;
