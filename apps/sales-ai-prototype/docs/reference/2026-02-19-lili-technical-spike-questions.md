# Lili — Technical spike questions (AI / LLM feasibility)

**Created:** 2026-02-19  
**Source:** Slack (Lili to Tauqir / team).  
**Purpose:** Capture the most critical technical questions we want to answer, especially those that may be most unknown. Two buckets: (1) AI reasoning over structured financial context, (2) AI inference of supplier criticality.

---

## Q1: Can AI reliably reason over structured financial context?

**Can the agent produce deterministic, explainable outputs? Can the agent reliably interpret user goals?**

### Inputs (can be mock)

- Approved bills  
- Due dates  
- Cash balance  
- Payroll events  
- Cash buffer requirements  
- User goal (conservative vs growth)  

### Outputs

- Which bills to pay  
- Which to defer  
- When to pay  
- Why  

### Scenarios to run

- Low cash, high cash, many bills, discount scenarios, payroll risk  

### Goals to test

1. **LLM agent:** Ingest structured financial state → apply goal-based reasoning → produce logically consistent payment plans.  
2. **Consistency / explainability:** Produces consistent answers, logical explanations, does not hallucinate financial facts, does not contradict constraints.  
3. **Goal sensitivity:** Modifies recommendations based on goals (conservative vs growth); maintains internal consistency (e.g. Conservative → defer more bills; Growth → capture discounts).  
4. **Control:** Can we control hallucination and error rates?  

### Agent must never

- Recommend impossible payments  
- Ignore constraints  
- Fabricate discounts  
- Invent vendors  

### Spike goal — measure

- Logical correctness rate  
- Hallucination rate  
- Stability across runs  

---

## Q2: Can an AI agent reliably infer supplier criticality using historical data (and possibly vertical standards)?

**Classification + inference + explainability.**

### 1. Define “Supplier Criticality” (operational definition)

Example signals (adjustable for POC):

| Tier | Examples |
|------|----------|
| **Critical** | Payroll providers, rent/landlord, core inventory suppliers, utilities, suppliers whose delayed payment causes operational disruption |
| **Strategic** | Important but flexible; regular recurring business vendors; high spend but non-blocking |
| **Deferrable** | Marketing vendors, software tools, low-frequency vendors, non-operational spend |

### 2. Can criticality be inferred from historical payment behavior using heuristics?

- **Data:** One year (or some duration) of historical data: bank feeds, bills, payment dates, vendor names, amounts, chart of accounts.  
- **Features:** Payment timing vs due date, payment consistency, payment frequency, spend proportion, delay tolerance.  
- **Hypothesis (example):** If vendor is always paid before due date → likely critical; if frequently paid late → likely deferrable.  
- **Goal:** Run simple heuristics and see if patterns emerge clearly. Establish a **baseline**.

### 3. Can an LLM classify suppliers accurately using structured features?

- Prepare structured summary about vendors.  
- Run across many vendors using LLM.  
- **Measure:** Does AI classification make sense? Is reasoning logical? Is classification consistent?  

### 4. Examine AI classification quality

- Can AI improve classification beyond heuristics?  
- Can vertical context be integrated meaningfully? (e.g. construction vs retail org — does context improve supplier classification?)  

### 5. Can results be made explainable and stable?

- Run same classification multiple times.  
- **Check:** Does classification change randomly? Is the explanation consistent?  

### Success criteria for feasibility

- Can classification be done with reasonable accuracy?  
- Can AI add value beyond heuristics?  
- Can reasoning be trusted?  
- Can this be explained to users clearly?  

---

## Summary

| Bucket | Spike goal |
|--------|------------|
| **Q1** | Measure logical correctness, hallucination rate, and stability of payment-plan reasoning over structured financial context; ensure agent never recommends impossible payments or fabricates. |
| **Q2** | Establish heuristics baseline for supplier criticality; test whether LLM classification adds value, is consistent and explainable; test vertical context. |

**Slack thread summary:** [docs/meeting-notes/2026-02-19-slack-workshop-summary-and-status.md](../meeting-notes/2026-02-19-slack-workshop-summary-and-status.md)
