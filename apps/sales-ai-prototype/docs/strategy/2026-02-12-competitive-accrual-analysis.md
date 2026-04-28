# Accrual accounting — preliminary analysis (from Glean)

**Source:** [Google Slides](https://docs.google.com/presentation/d/1yDhL6yCvwsjIHKiU0HYNit4Sn3mZI5YDameC1nHpqWs/edit)  
**Author:** Nimish Chauhan (Global product marketing / AI PMM)  
**Date:** 6 February 2026  
**Note:** Analysis based on website; product not available without contacting sales.

---

## What Accrual is

- **Positioning:** “AI-native” infrastructure for accounting firms (vs “retrofitted” legacy). Core proposition = “Augmented Accounting Intelligence” — AI agents as tireless preparers (reading docs, identifying missing info, drafting returns) to amplify human judgment.
- **Customer problem:** Firms constrained by manual coordination and repetitive work; systems fragmented; humans must organize inputs before work can begin.
- **Target:** Accounting firms. Launch partners include H&R Block, Armanino, other Top 100 US firms. Focus = individual tax returns; plans to expand.
- **Availability:** Live in pilot with few US firms; enterprise sales motion.

---

## What stands out

- **Infrastructure:** “AI-native” from first principles vs legacy “retrofitting” AI onto old codebases.
- **Quality:** AI produces return drafts ready for manager review (skipping junior-associate prep).
- **Transparency:** Every AI-generated figure hyperlinked to source document; audit trail; claims data not used to train models.
- **Differentiators:** Unstructured data (K-1s, 1099s, emails, photos, long statements without manual sorting); integration with existing tax engines (prior-year, final filing).

---

## Workflow (and overlap with Xero vision)

1. **Plan and data ingest** — Central “Binder” (focused inbox); ingest and classify unstructured inputs; client portal upload → AI structures and flags missing items; draft return from AI “preparers”; audit trail (citations); automated issue detection; export to tax engine; variance analysis; share summary to clients.
2. **Request and extract docs from clients** — Client binders that adapt to prior-year data; client portal for requirements/docs/answers; email automation (extract, identify notices, file in correct place).
3. **Export, analyse, share** — Sync with tax software; automated variance analysis; export audit-ready reports.

**Preliminary analysis (from deck):**  
- Workflows “very similar to our vision for bookkeeping automation and client readiness including some features of chasing docs.”  
- “Request and extract” is similar to planned “client info and doc chasing” workflow — “automating the chase is a critical component to remain competitive.”  
- They integrate with legacy tax engines rather than replacing them (lower barrier; legacy as backend utility).

---

## Potential implications for Xero

**Risks:**  
- Displacement of practice tools (if Accrual becomes the “OS” for firms → Xero Tax / XPH at risk).  
- Commoditization of the GL (value captured closer to final output; GL as commodity data source).  
- “Legacy” brand narrative (Accrual frames existing cloud platforms as legacy).

**Gaps (opportunity for Xero):**  
- Enterprise/firms only; no direct SMB owner relationship — “Xero the opportunity to bring AI automation directly to business owners.”  
- Narrow scope: individual tax only; no day-to-day bookkeeping, invoicing, or payroll; “annual cycle rather than daily operations.” Operates as infrastructure pulling data from QuickBooks rather than as accounting software.

---

## Claims (from deck)

- Preparation time down >85%; review time down up to 60%; “dozens of returns with the effort once required for just one.”  
- “Every 50 complex returns effectively adds the capacity of one accountant.”  
- Higher accuracy, faster turnaround, review process that raises quality.  
- Commentary: claims seem from US pilot; Xero has both SB and AB — opportunity to build bolder claims for both.

---

## Relevance to Bill Automation Agent / POC sprint

- **Doc chasing / client readiness:** Accrual’s “request and extract” and “Binder” map to Xero’s client info and doc chasing; deck explicitly says automating the chase is critical to stay competitive.  
- **Agent as “preparer”:** Similar to “ready to pay” / “ready to approve” — AI does mechanical work so humans review and decide.  
- **Transparency / audit trail:** Relevant for approval and compliance (citations, who approved, when).  
- **Scope:** Accrual is tax/firms; our sprint is bill workflow (post-approval, pay bills). Different slice but same pattern: automate low-value mechanical work, humans do high-value judgment.
