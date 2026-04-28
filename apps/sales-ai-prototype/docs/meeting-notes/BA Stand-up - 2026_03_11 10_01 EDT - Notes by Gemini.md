Mar 11, 2026

## BA Stand-up

Invited [Robb Schiller](mailto:robb.schiller@xero.com) [Dillon Gearing](mailto:dillon.gearing@xero.com) [Mugdha Kulkarni](mailto:mugdha.kulkarni@xero.com)

Attachments [BA Stand-up](https://www.google.com/calendar/event?eid=NGd0dWtvc2FqbnFvYjVpY3ZrcGxkaTlkdWlfMjAyNjAzMTFUMTQwMDAwWiBkaWxsb24uZ2VhcmluZ0B4ZXJvLmNvbQ) 

### Summary

US team interest was reported for cash flow redesign and payments agent prototype approval, aligning with agent architecture discussions for project validation.

**Project Alignment and Validation**  
The US team is focused on a homepage cash flow redesign, confirming the project's direction, and the payments agent prototype was approved and deployed. Team discussions confirmed that the project path is validated by shared ideas across other teams, making Jax the appropriate solution mechanism.

**Scope and Scenario Definition**  
The team outlined 4 cash flow scenarios but decided to exclude the 'healthy cash flow' scenario from the initial scope due to current system limitations and lack of invoice/loan capabilities. The primary goals are to maintain a cash buffer and stay above zero, with plans to consider inflows as constants while only recommending changes to outflows.

**Constraint and MVP Stages**  
Alerting logic was refined based on cash buffer days, and a 10-day limit was tentatively set for bill deferral window constraints needed for the optimizer logic. A multi-stage MVP approach was proposed, focusing first on raw deterministic logic and a simple UI, followed by LLM integration and eventual implementation within the Jax chat interface.

### Details

* **Discussion on Agent Capabilities and Meeting Structure**: Dillon Gearing shared excitement about successfully setting up Zadei inside Cursor, allowing for data analytics work, which they anticipate will be beneficial for their lending project. Mugdha Kulkarni initiated the standup, proposing to discuss yesterday's scoping, milestones, and scenarios for deterministic logic, followed by a post-scrum discussion on slices and integration with other AI agents. Robb Schiller noted the difficulty of working without Cursor or AI agents.

* **US Team Meeting and Cash Flow Focus**: Dillon Gearing reported on a meeting with the US team, noting that the team is more interested in the project's progress than providing assistance. The US team is focused on redesigning the homepage around cash flow, which led to the idea that the agent could potentially launch there initially. Robb Schiller clarified that the US team's efforts, led by Ton and Eli, are broader than just the cash flow widget, though there is some redundancy with existing efforts.

* **Prototype Deployment and Existing Design Explorations**: Robb Schiller confirmed that Versal was approved and the payments agent prototype is available on paymentsagents.vercel.app. Robb Schiller also shared that a designer on Fin sites provided exploration ideas for suggested actions within a Jax chat, specifically how to handle actions like showing bills that need payment. An example was provided where the chat suggests updating a plan date to align with preventing negative cash flow, though Dillon Gearing stressed the importance of adjusting plan dates, not due dates, as due dates are externally determined.

* **Alignment with Other Teams and Agent Architecture**: Mugdha Kulkarni questioned if their project needs to accommodate the designs and expectations of other teams, like Fin sites, which Dillon Gearing clarified is not duplicated effort but rather an alignment of shared ideas. Dillon Gearing intends to manage the stakeholder expectations and coordinate with the SIFT and Fin sites teams to identify gaps and opportunities for reusing agent infrastructure and architecture. Dillon Gearing advised that the team does not need to be concerned about interacting with other agents currently being built.

* **Validation of Project Direction and Design Mockups**: Mugdha Kulkarni acknowledged that many people sharing the same thoughts validates the project's worth. Robb Schiller presented a design mockup that was not funded but illustrates an end-to-end workflow similar to what they plan to build, focusing on alerts and actions related to cash flow projections. Dillon Gearing affirmed that the current project path is the right one, suggesting that Jax is the appropriate mechanism for solving this issue due to its deep consideration and modality.

* **Scenario Outlining and Initial Mockup Review**: Dillon Gearing shared a screen showing four scenarios they had outlined: cash flow running low, severe cash flow, healthy cash flow, and critical tax. A mockup based on Robb Schiller's AI Studio work was shown, demonstrating a modal that presents projected cash flow and suggests bill adjustments for applying a plan.

* **Defining Scope Exclusions for Initial Milestones**: Dillon Gearing proposed that considering critical suppliers and the "healthy cash flow" scenario should be out of scope for the first pass. The healthy scenario is difficult because Zero currently lacks the capability to capture discounts or comprehensive payment terms, and the current scope does not include invoices or loans.

* **Clarifying Goals and Plan Types**: Mugdha Kulkarni expressed agreement with the plan structure but emphasized the need for specific slices and clarification on terminology, such as the meaning of "standard" and "conservative" plans. The primary project goals are maintaining a cash buffer (measured in days or dollars) and staying above zero. The "standard plan" is essentially a "do nothing" approach if the customer is projected to return above their buffer.

* **Incorporating Inflows into Plan Generation**: Mugdha Kulkarni posed a critical question about factoring in invoices and their expected payment dates into the plan. Dillon Gearing confirmed that inflows must be considered, as they indicate the potential for the cash flow to recover, but the initial milestone should not suggest changes to the money coming in. Mugdha Kulkarni will rework their implementation board and test cases based on the clarity that they must consider inflows as constants while only recommending changes to outflows.

* **Refining Alerting Logic and SIFT API Constraints**: Mugdha Kulkarni and Dillon Gearing refined the alerting logic based on "cash buffer days" and "cash runway days," establishing criteria for alerting when the cash buffer days fall below zero or the cash runway days are less than a specific period. Mugdha Kulkarni noted the need to confirm with SIFT whether their API's full feature capability is restricted by organizational subscription tiers, and Dillon Gearing committed to asking this in the SIFT meeting.

* **Defining Outflows and Payment Constraints for Plans**: Dillon Gearing clarified that payroll and tax payments should be considered out of scope for modification in the first phase, though SIFT will enrich the cash flow forecast with this data. Mugdha Kulkarni expressed a concern that excluding payroll outflows could lead to inaccurate plans for customers with payroll, though they accepted the risk for the initial phase. It was decided that they will not consider partial payments, as they cannot currently schedule partial payments.

* **Establishing Bill Deferral Window**: The team discussed how far out from the due date a bill can be delayed. A soft goal is to pay bills on their due date, but a conservative plan would delay bills until money comes in. Mugdha Kulkarni required a set "wiggle room" constraint for the optimizer. They tentatively agreed to use a 10-day limit for delaying a bill, which can be adjusted later.

* **Next Steps for Logic Implementation and Agent Coordination**: Mugdha Kulkarni's immediate focus is modifying the logic and alerting based on the discussion, running test cases against different algorithms, and analyzing the outputs to establish a foundation for wordings and mockups. The team confirmed they do not need to worry about other agents, such as the Chasing Agent or Approval Agent, in the immediate scope. Dillon Gearing explained the Chasing Agent, which sends emails about unpaid invoices, and noted how their plan could eventually trigger the Chasing Agent.

* **Understanding Other Agents (Approval and Payment)**: Dillon Gearing described the Approval Agent, which uses an LLM output to provide context on whether to approve a bill based on various checks (history, price variance, etc.), and the Payment Agent, which allows automatic bill payment with a ramp card. Mugdha Kulkarni concluded that their plan output, which identifies bills and proposed plan dates, could be consumed by other agents as an add-on.

* **MVP Staging and Jax Integration**: Mugdha Kulkarni proposed a multi-stage approach: MVP 1 focuses on the raw deterministic logic and a simple UI. MVP 1.5 involves hooking up an LLM to explain the plan to the customer. MVP 2 involves integrating the solution within the Jax chat interface. If Jax is not the immediate entry point, the current plan can still be embedded in an entry point within Zero.

* **Final Commitments and UI Work**: Dillon Gearing agreed with the MVP staging and implementation plan. Mugdha Kulkarni confirmed that no engineering artifacts will be created yet, as they are still converging on a plan. Robb Schiller will mock up a UI similar to Dillon Gearing's spotlight prototype so they can evaluate both the widget and the Jax direction.

* **Embedding Actions and Display Components**: Dillon Gearing suggested that they should be able to embed a specific feature, the MF, with Jack making the call and the response being a display of the MF. Dillon Gearing also felt that they should be able to pop out a full-page modal from Jack's interface, referencing the existing "view plan" button as an example. Robb Schiller confirmed that a simultaneous stream of work is being led by the Jack's team and designers across different agent products to standardize how these interactions and definitions work.

* **Standardizing Agent Interactions**: Robb Schiller noted that the Jack's team and designers from various agent products are working to standardize the definition of interactions and how they talk about Jack's capabilities. This initiative focuses on defining how interactions work and what Jack is capable of doing.

* **Next Steps and Holding Patterns**: Dillon Gearing indicated that they had to leave the meeting and would primarily be in support mode for YouTube for the day. Dillon Gearing felt they were currently in a holding pattern on the current project but committed to thinking about it and informing the others if they came up with anything. Mugdha Kulkarni mentioned they would send Dillon Gearing the question to ask Sift.

* **Considering Buffer Days in the Graph**: Mugdha Kulkarni introduced the thought of considering the $X dollar amount for buffer days within the graph's horizon. They noted that this buffer should either be user configurable or have a good starting point assumption. Mugdha Kulkarni added that this is just something to keep in mind, and they will figure it out.

* **Scenario Scope Confirmation**: Robb Schiller asked for confirmation on which scenarios are out of scope. Dillon Gearing clarified that scenario three is the only one that is out of scope. Dillon Gearing explained that scenarios one and two are the most important, and noted that scenario four is a similar concern to scenario two, but in scenario four, they have no AR.

* **Future Consideration of Bill Types**: Mugdha Kulkarni raised questions about the inclusion of other bill types, such as credit notes and overpayment. Dillon Gearing advised against worrying about these types for now, suggesting they add a sticky note to expand the algorithm to include them later. Mugdha Kulkarni suggested that credit notes might already be covered since they are applied to a bill, which factors into the due amount.

### Suggested next steps

- [ ] Dillon Gearing will ask the SIFT team in the meeting today about the full feature capability for all organizations and whether it is capped by the tier or subscription.  
- [ ] Mugdha Kulkarni will modify the deterministic logic and alerting based on the discussion regarding inflows and run test cases through different algorithms to evaluate the plan outputs.  
- [ ] Robb Schiller will mock up a Jax chat version similar to Dillon Gearing's AI Studio plan mockup in his spotlight stuff.  
- [ ] Mugdha Kulkarni will send Dillon Gearing the question to ask Sift.

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*Please provide feedback about using Gemini to take notes in a [short survey.](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=kZyze3pRK_fxkq-sOD1pDxIQOAIIigIgABgBCA&detailid=standard)*