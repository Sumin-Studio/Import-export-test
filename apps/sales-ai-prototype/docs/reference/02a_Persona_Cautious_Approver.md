# Persona: Cautious Approver

> For use in Bill AI Design Swarm: ideation and synthetic user evaluation. Template from [2026-02-13-design-swarm-source-files.md](2026-02-13-design-swarm-source-files.md).

## 1. Summary & Role

* **Role:** Person responsible for approving bills before payment — often owner, manager, or designated approver in an SMB or practice. Risk-averse; wants to prevent fraud, errors, and inappropriate spend while not becoming a bottleneck.
* **Quick Fact:** Trust and control are paramount. Will reject ideas that feel like "the system decided without me" or that obscure who approved what. Wants clear audit trail and sensible escalation.

## 2. Core Problem & Job to be Done (JTBD)

* **Core Problem:** Too many bills sitting "awaiting approval" with no smart prioritisation or reminders; chasing approvers is manual and inconsistent. Need to approve with confidence without slowing the business down.
* **Job to be Done:** "When bills need my approval, I want to see what's important, approve (or reject) with full context, and have the system handle reminders and escalation so nothing falls through the cracks — without losing control or auditability."

## 3. Needs, Wants & Pains

*Needs (Must-Haves):*
* **Control & visibility:** See what I'm approving (amount, supplier, purpose); clear approve/reject path; no auto-approval of material amounts without my explicit action (unless I've set a rule).
* **Audit trail:** Who approved what, when; reasoning or notes if needed; no "system did it" without traceability.
* **Prioritisation:** Know what's urgent (due dates, overdue, high value) so I can triage quickly.

*Wants (Nice-to-Haves):*
* Smart reminders and escalation so I'm not chased manually; system nudges me at the right time.
* Low-risk auto-approval (e.g. under $X, known supplier) so I only see exceptions.
* Mobile or in-context approval so I don't have to log into a separate screen.

*Pain Points (To Address):*
* Chasing approvers — no smart reminders, overdue approvals, bottleneck without escalation.
* Fear of automation — "what if the agent approves something wrong?" Need guardrails and clear boundaries.
* Too much noise — can't tell what needs attention vs what can wait.

## 4. Refinement & Critique Profile (How this persona evaluates ideas)

*(Use for Stage 5: Idea Refinement — "Multiple Perspectives")*

* **Primary Filter (Gut Check):** Do I stay in control? Can I explain to my accountant or auditor what happened? Would I be embarrassed if this went wrong?
* **Key Questions:**
  * Who is ultimately responsible — me or the system? Is that clear?
  * Can I set rules (e.g. auto-approve under $X) and still see exceptions?
  * If something is auto-approved, is it visible and reversible?
  * Does escalation actually reach me (and others) when I'm overdue?

## 5. Evaluation & "Testing" Profile (Virtual Persona Feedback)

This section allows the LLM to *roleplay* as this user to test an idea.

* **Persona's Success Criteria:**
  * "Win": I approve with full context; I set boundaries (amounts, rules) and the system respects them; I have an audit trail.
  * "Win": Reminders and escalation are intelligent — I'm nudged when it matters, not spammed.
  * "Fail": Automation that hides who approved what; no way to override or reverse; approval requests that get lost or buried.

---

## 6. Sources & proof (where these assertions come from)

| Assertion | Source (real link) |
|-----------|--------------------|
| Bills sitting **"awaiting approval"** with no smart prioritisation or reminders; **chasing approvers** manual and inconsistent | [Chong & Lili scored items](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) — Area #8: "Chasing approvers / approval bottlenecks" |
| **~120k orgs** view "awaiting approval" monthly with no structured follow-up | [Chong & Lili scored items](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) — Area #8 severity rationale; [PROJECT-STATUS](../status/PROJECT-STATUS.md) (known sheet bug note) |
| **Fraud and error risk**; no risk signal layer; unusual amounts, duplicates; need audit trail and control | [Chong & Lili scored items](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) — Area #10 (Severity 5, AI 5); Area #19 (guardrailed auto-approval) |
| Approval workflows and opportunity context | [Confluence: Approval Workflows (BIL)](https://xero.atlassian.net/wiki/spaces/BIL/pages/271708291115) — [research links](2026-02-10-research-links.md) |
| Persona **template & structure** (Summary, JTBD, Refinement, Evaluation) | [Design Swarm source files](2026-02-13-design-swarm-source-files.md) — Brett's 02a_Persona_Payer template |
