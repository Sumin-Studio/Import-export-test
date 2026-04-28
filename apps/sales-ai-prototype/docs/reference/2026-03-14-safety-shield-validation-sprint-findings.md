# Safety Shield: Validation Sprint Findings

**Date:** 2026-03-14  
**Author:** Rory Baker (with AI research assistance)  
**Purpose:** Fill data gaps in the Safety Shield problem space, aligned to updated phasing:
- Alpha: first-time supplier + anomalous amount
- Beta: duplicates
- GA: fraud / bank detail changes

**Confluence source:** [Safety Shield Data Insights Report](https://xero.atlassian.net/wiki/spaces/XFS/pages/271916171331/Safety+Shield+Data+Insights+Report)

---

## Executive summary

- **Duplicate creation is common:** 19% of bill-paying orgs create at least one duplicate bill monthly (~163K orgs). Existing duplicate detection catches some issues after creation but does not reliably prevent payment and misses fuzzy duplicates.
- **Paid-then-voided is large as a ceiling metric:** 2.1M bills worth $4.4B were voided after payment in the last 12 months across 428K orgs. This includes non-Safety-Shield reasons; a conservative 5% relevance assumption is still ~$220M/year.
- **Issue detection is late:** ~80% of voids happen more than 7 days after bill creation; 52% happen after 30 days.
- **Customer pain is visible in support load:** ~1,050 CX cases/month (~1.5% of all CX volume) relate to duplicates, fraud/bank details, or payment errors.
- **Bank detail change demand is strong and unmet:** Fraud/bank-detail ideas hold 761 XPI votes (all open), with the top three ideas totaling 433 votes and no Xero response recorded.
- **Target segment is material:** ~396K orgs in named markets are in the 10-200 bills/month band (~44% of bill-paying orgs in named markets). GB + AU + NZ represent ~85% of that addressable segment.

---

## Findings by question

## Q1. XPI demand: strongest pull is bank detail change alerts

- AP-duplicate ideas show **245+ votes** across 4+ ideas, but **177 votes are on completed ideas**.
- Fraud/bank-detail ideas show **761 votes across 27 ideas**, all open.
- Anomalous-amount demand is not explicit in XPI (no direct ideas found despite broader keyword search).

**Interpretation:**
- **GA scope (bank detail changes)** has strongest direct customer pull.
- **Beta scope (duplicates)** is less about adding basic detection and more about improving quality: fewer false positives, fuzzy matching, and payment-flow integration.
- **Alpha anomalous amount** should be validated by data evidence and released as a lightweight, explainable rule-first capability.

---

## Q2. CX support volume: ~1,050 Safety Shield-related cases/month

- Fraud/bank details: ~800/month
- Duplicates/overpayments: ~340/month
- Anomalies: ~80/month
- Combined Safety Shield categories average ~1.6% of total CX case volume.

Representative verbatims reinforce duplicate misses, duplicate-payment incidents, and concern over unexpected bank detail changes/fraud-like events.

---

## Q3. Target segment sizing by market

Orgs in the 10-200 bills/month band (named markets):
- GB: 168,798 (42.6% of segment; 51.2% of GB bill-paying orgs)
- AU: 139,358 (35.2%; 37.7%)
- NZ: 47,116 (11.9%; 47.5%)
- ZA: 12,025 (3.0%; 48.5%)
- US: 8,531 (2.2%; 33.1%)
- SG: 7,582 (1.9%; 47.1%)
- IE: 4,245 (1.1%; 56.6%)
- CA: 5,139 (1.3%; 44.9%)

Named-market total is ~396K orgs, ~44% of bill-paying orgs in named markets. A large NULL market bucket remains, so named-market sizing is the most reliable base.

---

## Q4. Bills list reach is broad

Over a 3-month window:
- All/Paid tabs each reach ~1.2M orgs (~80% of bill-paying orgs)
- Awaiting payment reaches ~1.0M orgs (68%)
- Draft reaches ~448K orgs (30%)
- Awaiting approval reaches ~69K orgs (5%)

**Implication:** Awaiting payment is the highest-value pre-payment interception surface; draft provides earlier catch points.

---

## Q5a. Alpha signal 1: first-time supplier

- 6.7% of bills in the analysis window are to first-time suppliers.
- This pattern appears across ~569K orgs.

**Implication:** First-time supplier is large enough to matter and broad enough to be a credible first-layer signal.

## Q5b. Alpha signal 2: anomalous amount

For returning suppliers with sufficient history:
- 13.8% of bills are >70% above supplier historical average ("critical")
- 9.1% are 30-70% above average ("warning")

**Implication:** Raw 70% threshold likely over-flags; Alpha should likely tune higher (for example >100% or >150%) and/or combine with additional context (dormancy, ingestion channel, first-time relationship).

---

## Q6. Duplicate payments at scale need intelligent detection

Loose proxy result (same org + contact + amount within 30 days, both paid):
- 6.0M duplicate groups
- 14.4M bills in those groups
- 8.35M estimated excess payments

**Caveat:** This overcounts legitimate recurring payments.  
**Implication:** Simple rule matching is too noisy; Beta needs richer/fuzzy matching and better flow integration.

## Q6b. Existing duplicate detection context (Bills team)

Existing feature (global rollout complete Aug 2024):
- Matches on supplier + reference + total amount
- Detects post-creation (banner/list view flow), not payment-time prevention
- Data held in DynamoDB, not directly queryable via Snowflake workflows

**Implication for Safety Shield Beta:** fill structural gaps in timing, intelligence, and actionability inside payment-time decision points.

---

## Q7. Bank-detail-change sizing gap

Bank detail history is not available in the queried Snowflake bill dataset.  
GA quantification requires an engineering spike with Bills/data owners to identify authoritative change-history sources.

---

## Q8 + Q9. Time-to-void and paid-then-voided strengthen prevention story

- **Time to void:** 80% of voids occur after 7+ days; 52% after 30+ days.
- **Paid then voided:** 2.1M bills; trimmed value $4.4B over 12 months.

**Critical caveat:** no void reason field exists, so this is an upper-bound proxy and includes accounting corrections and other non-Safety-Shield causes.

Conservative framing from the report:
- 5% relevance: ~$220M/year
- 10% relevance: ~$440M/year
- 20% relevance: ~$880M/year

---

## Q10. Bill creation channel context (risk modifier)

Paid-bill distribution (3 months):
- Known contact + manual entry: 61.9%
- Known contact + auto channel: 27.7%
- New contact + manual entry: 7.0%
- New contact + auto channel: 3.5%

**Implication:** "New contact + auto channel" is the highest-risk combination and should be treated as a risk modifier in Alpha scoring.

---

## Q11. Internal fraud quantification gap

Glean search did not find internal AP fraud-loss quantification specific to bill payments.  
Current best available proxies remain CX case data and paid-then-voided analysis.

---

## Recommended framing for Safety Shield phases

- **Alpha (validated):** first-time supplier + anomalous amount, tuned for precision and explainability.
- **Beta (validated with caveats):** duplicate detection focused on fuzzy matching and payment-time intervention rather than basic exact-match alerts.
- **GA (direction validated, data gap remains):** bank-detail-change alerts have strongest customer demand, but sizing requires new data access.

---

## Known caveats to preserve in downstream PRDs and storytelling

- Paid-then-voided ($4.4B) is a **gross ceiling proxy**, not a direct loss estimate.
- Duplicate-payment SQL uses a **loose match** and includes legitimate recurring payments.
- Anomalous amount at >70% deviation yields a **high raw flag rate** and needs threshold/feature tuning.
- CX keyword matching is **imperfect** and includes some non-AP fraud/security events.
- XPI duplicate totals were narrowed to confirmed AP ideas; full AP-relevant total may be higher.

---

## Reproducibility notes

The report references SQL files under `sql/`, including:
- `00_explore_accpay_columns.sql`
- `01_xpi_ideas_by_risk_category.sql`
- `01b_xpi_top_ideas_comments.sql`
- `02a_cx_cases_volume_by_category.sql`
- `02b_cx_duplicates_verbatims.sql`
- `02c_cx_fraud_verbatims.sql`
- `03_target_segment_geo_breakdown.sql`
- `04_bills_list_reach.sql`
- `05a_alpha_first_time_supplier.sql`
- `05b_alpha_anomalous_amount.sql`
- `06_duplicate_payments_paid.sql`
- `08_time_to_void.sql`
- `09b_paid_then_voided.sql`
- `09c_paid_then_voided_usd.sql`
- `10_new_contact_auto_channel_fast_pay.sql`
- `11_xpi_top_ideas_detail.sql`
- `13_cx_total_vs_ss_cases.sql`
- `14_segment_vs_total_by_market.sql`
- `19_xpi_anomalous_amount_broader.sql`
- `20_xpi_bill_amount_anomaly.sql`
