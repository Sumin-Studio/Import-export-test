# Slack updates — Cashflow, Safety Shield, ADRs, and rituals (11 Mar 2026)

**Source:** Bill AI / Making Payments Slack channel and DMs. Date: 11 Mar 2026 (captures conversations from 10–11 Mar).  
**Why captured:** Consolidates async updates on Bill Cashflow and Safety Shield, ADR/PRD expectations, agents documentation, and changes to team rituals so they are visible alongside existing Bill AI docs.

---

## Bill Cashflow / Bill Runner stream

- Dillon shared a refined framing of the **Bill Cashflow agent goals**:
  - **Primary goal:** Maintain a cash buffer of \(X\) days (or dollars) over a chosen period \(Y\) (e.g. 30/60/90 days).
  - **Secondary goal (fallback):** If the buffer target cannot be maintained, keep the business **above zero** for as long as possible within that period.
- From these goals, the team aligned on **four core scenarios** the model should reason about:
  - **Scenario 1 — Temporary dip (“V-shape” projection):**  
    The cash buffer dips below \(X\) days for a short period but is projected to recover within the horizon because AR inflows restore the buffer.
    - Option 1: Keep current bill due dates and “ride the wave”, with an explicit note to be cautious about discretionary spend in the dip window.
    - Option 2: Apply a conservative plan (delaying or reshuffling bill payments) to smooth the dip and stay at/above the buffer.
  - **Scenario 2 — Shortfall (“L-shape” projection):**  
    The buffer is trending down below \(X\) days toward zero and does not recover without intervention.
    - Only realistic option: **delay or reschedule bill payments** to avoid going negative; there is no safe “do nothing” path.
  - **Scenario 3 — Healthy business (buffer \> X days):**  
    The business is sitting on a materially higher buffer (e.g. 4× the target days).
    - Option 1: Keep paying bills as normal.
    - Option 2: Look for **“growth” plans**, such as taking available early-payment discounts, without pushing the buffer below the agreed threshold.
  - **Scenario 4 — Unsolvable (“my business is failing”):**  
    Even with aggressive bill reshuffling, mandatory or critical payments will push cash **below zero** in the near term and it does not recover within the horizon.
    - The model cannot produce a viable plan that avoids going negative; at best it can **delay** the moment of dipping below zero and flag that the situation is unsustainable.
- Dillon recorded a short explainer video walking through these four scenarios and how the graphs look (V, L, always-safe, and unsalvageable) to guide UX and modeling work.
- Next steps for the Bill Cashflow stream:
  - Model these four scenarios explicitly in the logic and data views.
  - Prototype visualisations that make each scenario easy to understand and act on (e.g. “ride the wave” vs “conservative plan”).
  - Continue validating whether additional scenarios are needed beyond these four.

---

## Safety Shield target scenarios and feedback

- Rory shared a **Safety Shield Target Scenarios** Confluence page that defines a structured set of bill-risk scenarios for Safety Shield, scoped initially to **Bills-only** and risk categories of **fraud, duplicates, and anomalous/erroneous bills**.
- Each scenario is framed with **category, description, possible inputs, detection approach, Xero/network advantages, customer value, complexity, and phase/priority**. Representative scenarios include:
  - **Anomalous / erroneous**
    - *Bill from first-time vendor with large amount*  
      - Example: new contractor submits a \(~\$15,000\) bill; could be legitimate or fabricated.  
      - Inputs: vendor history, bill amount, contact creation date, org average bill amount, creation channel, batch distribution.  
      - Approach: rule-based; potential use of network data to see if the vendor is widely paid in Xero.
    - *Existing supplier abnormal amount spike*  
      - Example: regular \(~\$800\) cleaning bill jumps to \(~\$4,200\) with no clear reason.  
      - Inputs: historical amounts per vendor, current bill amount, line items.  
      - Approach: rule-based anomaly using historical ranges; likely high customer value, medium-to-high complexity due to historical data access.
    - *Bill pushes expense category over budget*  
      - Example: a marketing bill would push an account to 115% of budget; could be miscoding or unplanned spend.  
      - Inputs: bill amount and account code, current-period budget, YTD actuals, existing unpaid bills in same account.  
      - Approach: rule-based budget alignment; highlights bills needing review when they break budget expectations.
  - **Duplicates**
    - *Exact duplicate bill*  
      - Example: same supplier invoice enters via UI and Hubdoc with identical reference, amount, and date.  
      - Inputs: contact ID, invoice reference, amount, date, status, creation channel.  
      - Approach: deterministic rule-based duplicate detection.
    - *Fuzzy duplicate bill*  
      - Example: “INV-1234” vs “1234”, minor rounding differences, or date offsets; often caused by re-submissions or multiple ingestion channels.  
      - Inputs: normalised references (stripped prefixes/formatting), approximate amount and date windows, status, channel.  
      - Approach: rule-based fuzzy matching with tolerances.
  - **Fraud**
    - *Recent vendor bank detail change before bill review*  
      - Example: supplier bank details changed shortly before a payment run.  
      - Inputs: contact bank-detail history, change timestamps, actor, proximity to scheduled payments.  
      - Approach: rule-based; network checks can see if the new account is seen elsewhere in Xero.  
    - *Bill bank details differ from stored contact details*  
      - Example: BEC attack where account details on the PDF differ from the stored contact.  
      - Inputs: OCR-extracted bank details vs stored contact record, import channel.  
      - Approach: rule-based mismatch detection; network comparison across orgs.  
    - *Insider bill creation / ghost vendor*  
      - Example: a staff member creates a fictitious vendor with their own bank account and raises a bill to it.  
      - Inputs: who created the vendor vs the bill, vendor age, bank details vs network, bill frequency.  
      - Approach: risk comes from **combination of signals** (same user, no history, unseen bank account).
  - **PO / receipt mismatch**
    - *Bill exceeds PO* — billed amount higher than approved PO; requires explanation before paying.  
    - *Bill with no matching PO* — potentially maverick spend, if the org typically uses POs.  
    - *Goods not receipted against billed amount* — quantity or receipt status misaligned, implying overpayment risk.
  - **Below-the-line / future scenarios**
    - *Account takeover – anomalous bill creation velocity*  
      - Example: compromised account suddenly creates many more bills than normal or edits many vendor bank details.  
      - Approach: ML/time-series velocity modeling, supported by hard ceilings.
    - *Out-of-pattern billing frequency*  
      - Example: vendor that usually bills monthly suddenly sends multiple bills in a week.  
      - Approach: ML-based cadence modeling, potentially supported by network signals.
    - *Fabricated invoice via ingestion channel*  
      - Example: suspicious bill via email-to-bills from an unknown address, with no PO and no history.  
      - Approach: heuristic combination of channel, sender, first-time contact, high amount, and absence of PO.
- Feedback and considerations captured from Slack:
  - **Jenny:** suggested additional scenarios involving Xero-to-Xero payments and whether the supplier has an advisor, highlighting opportunities to use Xero network and partner data as risk signals.
  - **Dillon:** cautioned that **Purchase Orders are currently low-usage** in the broader Xero base, so PO-based flags should first confirm that a customer actually uses POs before raising strong alerts.
  - **Lili:** recommended involving experts in Xero’s **risk/compliance** teams (e.g. Apoorva) to validate and extend the scenarios.
  - **Chong:** noted that some anomaly scenarios, such as **amount spikes** and **billing frequency changes**, might be better modeled with **ML/time-series** approaches rather than solely rules.
- The Confluence page **“Safety Shield | Target Scenarios”** is emerging as a canonical list of detection ideas and is a strong candidate for future **Cursor↔Confluence sync automation** once the safety-shield docs stabilize.

---

## Architecture & ADR expectations

- A short thread between **Tauqir**, **Mugdha**, and **Lili** aligned expectations for architectural decision records (ADRs) in this workstream:
  - Mugdha’s ongoing architecture investigations are expected to result in an **ADR**.
  - In both Making Payments and CashGPT, ADRs are typically **reviewed by a Principal Engineer (PE)** and relevant Leads before being treated as accepted.
  - Tauqir and Mugdha agreed that this stream should follow a similar pattern, and Lili suggested involving **multiple Leads with strong architecture backgrounds**, plus Luke’s PE, once the draft is ready.
- Open questions remain around precisely **how approval and sign-off will work** for these cross-squad agents, given the new nature of the work, but the default is to consult Leads and PEs as with other major platform decisions.

---

## PRDs and agents hub

- **Areti** joined the channel and asked whether there is a **single PRD** covering all agents.
- **Jenny** clarified that:
  - There was an original combined **“AI Agents for Bill Pay” PRD**, but it was intentionally split into **separate PRDs** so work on different agents can progress in parallel.
  - Current PRDs include at least: **Just Pay**, **Safety Shield**, **Bill Runner**, with an Onboarding PRD in preparation.
- To reduce confusion and create a shared map, Jon created a **“Payments Agents Hub”** Confluence page structured around **agents rather than squads**:
  - Each agent (Bill Cashflow, Bill Workflow 1/Safety Shield, Bill Workflow 2/Just Pay, Onboarding, Approvals Foundations, etc.) has a section where teams can link the relevant PRDs, briefs, decks, and prototypes.
  - Teams are encouraged to **file their agent-specific PRDs under this page** so new stakeholders like Areti can quickly find the right documents.

---

## Agents suite — high-level framing

The following framing, shared in Slack for Areti, is being used as a **high-level description of the agents suite**:

- **Bill · Cash Flow (Bill Runner + enrichment + optimizer)**  
  Looks across upcoming bills, expected money in, and a chosen cash buffer to propose a 90‑day payment plan. It tells customers which bills to pay when so they are not constantly in spreadsheets or doing mental math about running out of cash.

- **Bill · Workflow (1) — Safety Shield / “Risk Radar” + approval automation**  
  Handles risk and routing around bills. Safety Shield / “Risk Radar” quietly scans bills and supplier history to spot duplicates, first‑time suppliers with big amounts, abnormal spikes, or suspicious changes, and explains why a bill has been paused. Approval automation handles who needs to review what and when.

- **Bill · Workflow (2) — Just Pay lane (exploratory)**  
  Focuses on making it actually easy to pay once decisions are made. The goal is a fast, confident path from “approved” to “paid” inside Xero, instead of bouncing out to bank portals and re‑entering data.

- **Approvals Foundations (Michael But’s pod)**  
  Builds the approvals engine and core plumbing that workflow agents depend on: rules, routing, auditing, and shared building blocks reused across surfaces.

- **Smart Payment Request Agent (placeholder stream)**  
  An exploratory lane for requesting and coordinating payments that can later plug into the same approvals and execution foundations.

This framing is intended to be re-used in PRDs, decks, and onboarding material for PMs and stakeholders.

---

## Ways of working and rituals

- Jon and Chong decided to **cancel the large weekly all-hands agents meeting** in favour of lighter-weight, higher-signal rituals:
  - The existing weekly session was large, multi-timezone, and at risk of becoming a “this could have been a Slack message” meeting.
  - Instead, each squad is expected to post **daily async updates** in the channel, even if the status is “nothing new to report”.
  - The weekly time slot will be replaced by **two smaller meetings** (NH and SH time zones) with a **Show & Tell** format:
    - Tighter participant lists.
    - Focus on sharing concrete artifacts (prototypes, decks, docs) rather than broad status.
    - Sessions will be video-recorded for those who cannot attend.
- This change is intended to:
  - Reduce meeting fatigue across time zones.
  - Make synchronous time feel clearly more valuable than async updates.
  - Keep progress visible in-channel while still giving room for higher-fidelity demos.

---

## Future automation notes

- The **Safety Shield | Target Scenarios** Confluence page, Dillon’s **four-scenario Bill Cashflow model**, and the **Payments Agents Hub** page are strong candidates for future **Cursor↔Confluence syncs**, but the immediate focus is on getting the scenarios and briefs stable in this repo.

