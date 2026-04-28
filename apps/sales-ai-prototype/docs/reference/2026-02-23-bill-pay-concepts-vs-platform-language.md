# Bill Pay concepts vs Xero Agent Platform ubiquitous language

**Purpose:** Map our three product concepts (Bill Pay Planner, Intelligent Bill Approval, Just Pay) to Brett’s Agent Platform vocabulary so we use the same language in docs and with platform/Diya.

**Source for platform terms:** Confluence — “Ubiquitous language for Xero’s Agent Platform” (Brett Edmonds et al.).

---

## Our concepts (what we’re building)

| Our concept | One-line | Platform framing |
|-------------|----------|------------------|
| **Bill Pay Planner** | We recommend which bills to pay this week; you approve in 3 clicks (or tweak in plan mode). | An **Agent** (or Agent behaviour in JAX) pursuing a **Goal** (“get bills paid on time / within cash flow”) via a **Plan** over **Domain Objects** (Bills). **User Action** = approve; optional **Configure** (Conservative / Standard / Growth). **Reminder** / **Message** could be in-product. |
| **Intelligent Bill Approval** | We flag risk and send approval to the right person in WhatsApp; they tap to approve or open Xero. | **Agent** flags anomalies (**Signals**), proposes **Agent Action** (e.g. send batch for approval). **Escalation** to human (**Plan Target** = approver). **User Action** = authorise / hold. **Message** / **Reminder** delivered via WhatsApp (out-of-app channel). **Policy** e.g. “never auto-approve over $X.” |
| **Just Pay** | You say it (in Xero or in an agent); we create the bill and pay. No forms. | **Agent** (in JAX or external agent) uses **Tools** to create Bill (**Domain Object**) and execute **Agent Action** (payment). **User Action** = confirm amount/payee. **Message** (e.g. WhatsApp) for confirmation. Could be a **Workflow** (intent → create bill → pay) with **Decision Points**. |

---

## How our language lines up with platform terms

| Platform term | How it shows up in our concepts |
|---------------|----------------------------------|
| **JAX** | Customer-facing surface: Bill Pay Planner dashboard, JAX Chat for “help me pay the bills,” Just Pay in-agent. |
| **Agent** | The “we” in “we recommend,” “we flag,” “we create the bill and pay.” May be one Pay Out agent or multiple capabilities. |
| **Goal** | Get paid / pay bills on time; reduce manual entry; get approval in 30 seconds. |
| **Plan** | Bill Pay Planner “plan” (Conservative/Standard/Growth → which bills to pay); Approval “run” (Sarah’s batch → Alex’s review). |
| **Plan Target** | Bill Pay Planner: the user (business owner). Approval: Alex (approver). Just Pay: the user confirming. |
| **Domain Object** | **Bill**, Contact, Bank account. Bills are the core object we create, enrich, and pay. |
| **Policy** | “Never auto-approve over $X,” “escalate if anomaly,” “only these people can approve.” |
| **Signal** | Bill created, anomaly detected, due date, cash balance, “Swanston Security due monthly.” |
| **Agent Action** | Send reminder, create bill, schedule payment, send batch for approval, reconcile. |
| **User Action** | Approve plan, authorise/hold payment, confirm payee/amount, configure strategy. |
| **Escalation** | Sarah → Alex (AP clerk to manager); “needs attention” vs “looks good.” |
| **Reminder / Message** | In-product callouts; WhatsApp approval request; “Payment sent” confirmation. |
| **Configure** | User sets Conservative/Standard/Growth; (future) policies for approval thresholds. |
| **Tool** | Bill creation, payment execution, contact match, anomaly check — things the agent invokes. |
| **Workflow** | Approval run (batch → send → review → authorise); Just Pay (intent → create bill → pay). |
| **Blocked** | “Needs attention” — agent won’t auto-approve; needs human. |
| **Decision Point** | Anomaly yes/no; approver available; cash flow sufficient. |

---

## What we don’t need to rename

- **Bill Pay Planner**, **Intelligent Bill Approval**, **Just Pay** = our product/concept names. They’re the “what” we’re pitching; platform language is the “how” we describe behaviour (Agent, Plan, User Action, etc.).
- **Swim lanes** = our internal framing (three lanes). Brett’s doc uses **Workflow**, **Plan**, **Agent**; our swim lanes are product concepts that *use* those constructs.

---

## One-sentence alignment for Diya / platform discussions

- **Bill Pay Planner:** An Agent pursues a Goal (pay bills in line with cash flow) via a Plan over Bills; the user Configures strategy and takes User Action (approve).  
- **Intelligent Bill Approval:** An Agent uses Signals and Policies to flag risk, proposes Agent Actions (e.g. send batch), and Escalates to a Plan Target (approver); User Action (authorise/hold) and Messages (e.g. WhatsApp) complete the flow.  
- **Just Pay:** User expresses intent; an Agent uses Tools to create a Bill (Domain Object) and perform an Agent Action (pay); User Action (confirm); optional Message (e.g. WhatsApp) for confirmation.

---
