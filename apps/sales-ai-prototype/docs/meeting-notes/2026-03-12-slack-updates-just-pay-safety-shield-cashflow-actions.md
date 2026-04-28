## Slack updates — Just Pay UX, Safety Shield model, and Cashflow Actions weekly story (12 Mar 2026)

**Source:** Bill AI / Payments agents Slack threads  
**Date:** 12 Mar 2026  
**Participants mentioned:** Lili Kan, Dillon Gearing, Rory Baker, Tauqir, Merv, Robb Schiller, Mugdha, Chong Xu, Jon Bell, US cashflow homepage team, Syft team

### 1. Just Pay bill experience — beyond conversational text

- **File/photo input is critical for Just Pay:**
  - Lili reviewed the Just Pay PRD and emphasized that the experience must go beyond conversational text input.
  - She called out the need to **support file upload and photo capture**, similar to Gemini and ChatGPT mobile, so creators can:
    - Upload paper invoices that arrive by mail.
    - Capture screenshots/photos of informal email payment requests.
  - The input surface should not be limited to text; image/file-based entry is an important part of how real bills show up today.

- **Downstream UX after a "just-pay" bill is created:**
  - Lili asked for more clarity on **how the rest of the user experience works once a Just Pay bill has been created**.
  - She would like to see more of the post-creation flow: where the bill lands, how it is reviewed/approved, and how the agent’s work shows up in the surrounding experience.

### 2. Safety Shield vs Approval Agent — mental model refinement

- **Safety Shield as supplemental and adaptive guardrails:**
  - Dillon shared a video walking through his mental model for the **Safety Shield** agent versus the **Approval Agent**.
  - Lili agreed with his framing and added that:
    - Safety Shield **provides supplemental information** to approvers to support safer decisions.
    - Safety Shield can **augment the approval flow** by dynamically adding **additional approval guardrails** when extra risk is detected.

- **Always-on background evaluation:**
  - Lili described Safety Shield as an agent that **evaluates each bill in the background** when a trigger occurs (for example, when a bill moves from draft to the next stage).
  - The agent:
    - Produces **risk and insight assessments** that can be surfaced later.
    - Can show assessments to the **creator** (so they can fix issues) and/or to the **approver** (for better decision-making).
  - She explicitly agreed with the view that the agent is **“always on” with continuous evaluation in the background**, surfacing risks as needed.

### 3. Cashflow Actions — rebrand and weekly story

- **Rebrand from "Bill Runner" to "Cashflow Actions":**
  - Dillon announced that the **"bill runner" name is being retired**.
  - The feature is now called **Cashflow Actions**, positioned as a more powerful framing for what the agent is doing.

- **Dillon — cross-team alignment and MVP scope:**
  - Defined **four core scenarios** for Cashflow Actions, with a prototype available.
  - Met with the **US team** who are designing a **cashflow-focused homepage** that could be a launchpad for Cashflow Actions.
  - Ran a session with the **Cash Flow Manager (Syft) team** to align goals and identify integration points.
  - Tightened the **MVP scope**, explicitly:
    - Excluding the "healthy cash flow" scenario.
    - Excluding direct payroll/tax modifications for now.
    - Treating invoices and cash-in as inputs to the math, but not something this agent will act on in the first slice.
  - **Next:** Continue collaborating with the Syft team and support Mugdha with initial test cases; update the PRD with the latest information.

- **Robb — prototype and visual design:**
  - The **Vercel deployment** for the payments prototype is approved and live (protected with a simple password).
  - Robb shared **high-fidelity design mockups** showing:
    - End-to-end workflows for **cashflow alerts and actions**.
    - Explorations for how **suggested actions show up inside a JAX chat**.
  - **Next:** Continue to push hi-fi mockups and bring more of the design team into the loop for feedback.

- **Mugdha — logic and scenario design:**
  - Led scoping discussions to translate the Cashflow Actions concept into **deterministic logic and milestones**.
  - Centered alerting logic on:
    - **Cash buffer days**.
    - **Cash runway days**.
  - Introduced a **10-day limit** for bill deferral to keep recommendations practical and focused.
  - Defined a staged **MVP rollout**:
    - **MVP 1:** Raw deterministic logic surfaced in a simple UI.
    - **MVP 1.5:** Add an LLM that can clearly explain the recommended plan.
    - **MVP 2:** Fold the full solution into Robb’s hi-fi designs.
  - **Next:** Treat incoming money as a constant, and only recommend changes on the bills side; continue designing and testing scenarios against different logic variants.

### 4. Weekly update distribution — open question

- **Current weekly update vs including new progress:**
  - Jon highlighted that:
    - A **weekly update** (not yet including the big new items above) is ready for broader distribution.
    - A **Payments Platform Q4 Status and plans meeting** is happening in parallel.
    - Jon will be **out tomorrow**, so coordination is time-sensitive.
  - Jon asked Chong and the team whether:
    - To **send the existing weekly update as-is** (with Chong sharing to the Payments team), or
    - To **rewrite the update** to include the latest work on Cashflow Actions, Safety Shield, PRD alignment, and design progress before it goes out.

- **Open follow-ups:**
  - Decide with Chong whether to:
    - Ship the current weekly update unchanged, or
    - Expand it to capture the latest Cashflow Actions and Safety Shield progress before distribution.
  - If rewriting, coordinate on **what story to tell** and which artifacts (prototype links, PRD updates, design screenshots) should anchor the communication.

