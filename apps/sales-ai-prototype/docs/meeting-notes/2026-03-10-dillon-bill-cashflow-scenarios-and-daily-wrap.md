# Dillon update — Bill Cashflow scenarios and daily wrap (10 Mar 2026)

**Source:** Dillon Gearing (Slack). Date: 10 Mar 2026.

**Why captured:** Aligns the Bill Cashflow stream around concrete customer cash-flow scenarios, clarifies a key Syft modeling constraint, and records the current shift in implementation focus toward scenario definition, UI surfaces, and architecture.

---

## Cash-flow scenario request

- Dillon asked the team to review and challenge a working document of **easy, medium, and hard cash-flow scenarios** that the agent should eventually be able to navigate for customers.
- The intent is to use these scenarios to validate whether the team is solving the right problems and to shape both **UI thinking** and **agent architecture**.
- Dillon specifically asked **Jon, Lili, and Chong** to confirm that these are the kinds of scenarios the team has in mind for the agent to solve.
- Important Syft constraint: **buffer is calculated in days rather than dollars**, so the scenario framing in the document follows that model.

## Daily wrap update

### Progress

- Robb is in the process of spinning up an **MFE** to host the UI for the agent.
- Current thinking is that **plans will need to be surfaced in multiple places**, so an MFE is the preferred delivery direction for now.
- Dillon outlined the scenario set above to help drive both **UX ideation** and **architecture definition**.
- Mugdha continued investigating architecture and likely paths forward.

### Upcoming meetings

- Dillon is meeting with the **Syft PM** to discuss **algorithmic gaps** and plans to report back to the AI team on how those gaps might be bridged.
- Robb is connecting with **Syft designers** and the **Spotlight team** to understand where the UX may need to go.

### Paused work

- The team has already proved, at a conceptual level, that it can call the **Syft API**, surface the result in **Bills**, and then redirect customers to **Cash Flow Manager**.
- That implementation path is currently paused while effort shifts toward scenario definition, UX direction, and architecture exploration.

---

*Relevance for Bill AI:* This update sharpens the Bill Cashflow stream around scenario-based planning, confirms that Syft's current model affects how recommendations are framed, and signals that multi-surface delivery plus algorithm/architecture gaps are now the main near-term questions.
