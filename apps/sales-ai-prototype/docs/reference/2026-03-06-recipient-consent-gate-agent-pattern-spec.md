 # Agent Pattern Specification — Recipient Consent Gate

 **Source:** Draft pattern from Peter Binek (6 Mar 2026) for Bill AI / Payments agents.

 > Note: Assumption made in these requirements that requirements for recipient consent will be dependent on region, comms channel and legal requirements. Further discovery required for individual use-cases and regions.

 ---

 ## 1. Pattern framing (outcome first)

 ### 1.1 Pattern name

 **Deterministic Recipient Agentic Consent Gate**

 ### 1.2 One-sentence intent

 To capture, store, and validate the legal and ethical right for an AI agent to interact with a Recipient (Client, Customer, or Employee) via a binary “safety valve” before any communication occurs.

 ### 1.3 Primary user outcome

 The Xero Subscriber (Accountant/Owner) can scale “chasing” workflows with confidence, knowing the AI is Human-Led and will never contact a Recipient without prior authorization or continue after a request for human intervention.

 ### 1.4 System/agent outcome

 The orchestration engine operates behind a deterministic gate that prevents unauthorized outbound communication, ensuring the system is Trustworthy and protects the Subscriber’s professional reputation.

 ---

 ## 2. Autonomy & control model

 ### 2.1 Proposed autonomy level

 - **Act with confirmation** (for initial enablement)
 - **Act with notification** (for ongoing chasing)

 **Rationale:** Xero AI should be Human-Led, meaning no autonomy without awareness. Subscribers must “ignite” the agentic plan manually before it reaches any Recipient.

 ### 2.2 Control boundaries

 - **What the user decides:** Which Recipients are opted into agentic workflows and which tasks (Tax, Payroll, Payments) are delegated.
 - **What the agent decides:** The optimal drafting and timing of follow-up messages based on the record status.
 - **What requires confirmation:** The transition from a **Null** state to a **Pending** state (the initial manual “Enable” action).
 - **What must never be automated:** Overriding a **Revoked** consent status or resolving complex emotional/hostile feedback from a Recipient without human intervention.

 ---

 ## 3. Interaction & visibility model

 ### 3.1 Always visible

 - **Status:** Current consent state (**Active** / **Pending** / **Revoked**) on the Recipient record.
 - **Ownership:** Clear indication that the Agent acts on behalf of the Subscriber (for example, “I’m [AgentName], an assistant for [Subscriber]”). (TBC by Xero Agent content standards.)

 ### 3.2 Explainability requirements

 - **Data sources exposed?** Yes — the specific invoice, timesheet, or document being chased must be cited.
 - **Reasoning exposed?** Yes — messages must “translate AI-speak” into plain language explaining why the Recipient is being contacted.
 - **Confidence level surfaced?** No — interactions must be deterministic and definitive for the Recipient.

 ### 3.3 Trust strategy

 - **What builds trust?** Consistent identity disclosure, providing Safe Alternatives (easy route to a human), and managing by exception.
 - **What could erode it?** “Cold-starting” conversations without Subscriber intent or the Agent ignoring a Recipient’s “Stop” request.

 ---

 ## 4. State & behaviour model

 ### 4.1 Canonical states

 - **Null:** No consent requested; Agent is inactive for this Recipient.
 - **Pending:** Subscriber has initiated workflow; Agent is authorized for initial disclosure only.
 - **Active:** Recipient has been disclosed to and has not opted out (functional consent).
 - **Revoked:** Recipient requested manual intervention or opted out; Agent is hard-blocked.

 ### 4.2 State transitions

 - **Triggered by user:** Subscriber clicks “Enable Chasing” for a specific Recipient (**Null → Pending**).
 - **Triggered by system:** Delivery of the first message with explicit identity disclosure (**Pending → Active**).
 - **Triggered externally:** Recipient replies with negative keywords like “Stop”, “Unsubscribe”, or “Manual” (**Active → Revoked**).

 ### 4.3 Failure behaviour

 - **User-facing response:** “Agent paused: [Recipient Name] requested manual follow-up.”
 - **Retry logic:** Zero retries for consent-blocked states.
 - **Escalation rule:** If a state is **Revoked**, all future communication must be routed to the Subscriber’s manual task list immediately.

 ---

 ## 5. Risk hardening

 ### 5.1 Risk inventory

 | Risk type | Description | Severity | Mitigation |
 |-----------|-------------|----------|------------|
 | Compliance | Messaging Recipients without clear AI disclosure. | High | Deterministic Identity Injection in the message header. |
 | Legal | Contacting Recipients who have explicitly opted out. | High | Pre-flight consent bit-check before every execution step. |
 | Reputation | Agent appears intrusive or ignores Recipient context. | Medium | Human-Led initiation and “Relationship History” checks. |
 | UX harm | Recipient feels “trapped” in an automated loop. | Medium | Mandatory “Human Handover” keyword triggers. |

 ---

 ## 6. Reusability & system consistency

 ### 6.1 Must be consistent across agents

 - **Terminology:** **Active**, **Pending**, **Revoked** status names across all Xero client/contact/employee records or alternative location/report to access this information.
 - **States:** Binary consent check logic built into the core orchestration layer.
 - **Confirmation patterns:** Universal “Stop/Opt-out” keyword list (standardised for SMS, Email, and App).

 ---

 ## 7. Anti-patterns

 ### 7.1 What we must avoid

 - **Silent autonomy:** Agents starting “cold” conversations with a Recipient without Subscriber initiation.
 - **Hidden identity:** Agents masquerading as the Subscriber to trick the Recipient into responding.

 ---

 ## 8. Success criteria

 ### 8.1 User metrics

 - **Override frequency:** How often Subscribers manually silence an agent for a specific Recipient or plan.
 - **Opt-out rate:** Percentage of Recipients who transition to **Revoked** status.

 ### 8.2 System metrics

 - **Failure rate:** Frequency of the “Pre-flight check” catching an invalid consent state before an LLM call.

