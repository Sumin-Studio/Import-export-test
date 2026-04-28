Mar 10, 2026

## BA Stand-up

Invited [Robb Schiller](mailto:robb.schiller@xero.com) [Dillon Gearing](mailto:dillon.gearing@xero.com) [Mugdha Kulkarni](mailto:mugdha.kulkarni@xero.com)

Attachments [BA Stand-up](https://www.google.com/calendar/event?eid=NGd0dWtvc2FqbnFvYjVpY3ZrcGxkaTlkdWlfMjAyNjAzMTBUMTQwMDAwWiBkaWxsb24uZ2VhcmluZ0B4ZXJvLmNvbQ) 

### Summary

Incremental phasing for early product shipment was prioritized, with Linear Programming selected for core logic and scenario outlining refined for prototyping.

**Incremental Shipping Prioritized**  
The team decided to scope incremental phases and milestones to ship the product to production as soon as possible, even with limited initial features. This approach was agreed upon to facilitate an early release and manage stakeholder review processes with small, shippable slices.

**Core Logic and Scenario Refinement**  
Linear Programming was confirmed as the optimal approach for the core logic due to its flexibility in modeling complex factors for cash flow planning. Scenario outlining was further developed using a 2x3 matrix focusing on buffer status and goal scenarios, which will soon be mocked up for prototyping.

**Prototyping and UI Discussion**  
The spotlight widget was confirmed as a dashboard entry point to the Micro-Frontend UI, with prototyping work moved to a mega repo for deployment to Versal. Concerns were raised about integrating Jax Chat into the Minimum Viable Product, suggesting a simpler UI solution like a side panel or native split view for the first release.

### Details

* **Discussion of Incremental Phases and Shipping Goals**: Mugdha Kulkarni suggested that, based on Dillon Gearing's talk, the team should decide on incremental phases to ship to production as soon as possible, even if the initial features are limited. Mugdha Kulkarni recommended scoping phases or milestones to facilitate an early release, prioritizing shipping even if the product has limited features. The plan is to do a round table on everyone's current progress before discussing the proposed approach further.

* **Robb Schiller's Development Update**: Robb Schiller has made progress in debugging Versal for the prototype but is still awaiting a GitHub to Versal connection release from the internal GitHub management team. Robb Schiller also became a Versal zero account admin, which they found helpful, and connected with Emma, who provided the name of the design director on SIFT. Robb Schiller confirmed that the 'Fins sites' team, which is an amalgamation of financial insights, is looking at historical data for the first release in Jax, and the spotlight widget appears to be greenlit based on findings from Dillon Gearing and Emma.

* **Clarification of Spotlight Widget and MF Relationship**: The team discussed the relationship between the spotlight widget and the MF (Micro-Frontend), confirming that the spotlight widget will be a dashboard widget that serves as an entry point to open a UI, which will be the MF. Robb Schiller confirmed that the prototyping work they showed previously, including the spotlight widget, has been moved into a "mega repo" for payments agents, from which they will deploy to Versal, the prototype hosting platform at zero. Robb Schiller and Dillon Gearing have a meeting scheduled with Jonathan Coaches and Will Murray, who are working on the US homepage cash flow product, and they will document and share their findings from that meeting.

* **Mugdha Kulkarni's Core Logic Recommendation and Upcoming Tasks**: Based on Dillon Gearing's supplier talk and Chong's comments, Mugdha Kulkarni is convinced that Linear Programming (LP) is the best way forward for the heart of the logic due to its flexibility in modeling complex factors like timelines and data from other agents. Mugdha Kulkarni’s task for the day is to build test data based on scenarios and feed it to the proposed LP library to assess the ease of modeling, with the goal of creating an addendum document for the larger architectural document.

* **Dillon Gearing's Scenario Outlining Work**: Dillon Gearing is working on outlining the scenarios more concretely, referencing Chong's 2x3 matrix framing involving buffer status (buffer/below buffer) and scenarios (conservative, standard, growth). Dillon Gearing is testing this framework, noting that there are potentially more scenarios, such as being "totally underwater" or having zero use for the agent due to a large buffer. Dillon Gearing also noted a scenario where the user might want to smooth out cash flow by adjusting bill payment dates, regardless of the original due date.

* **Discussion on Scoping and Incremental Building**: Mugdha Kulkarni suggested that the team's primary task is to narrow down the scope of what to incrementally build and ship at each stage, aiming for a "sweet spot" that delivers value without being overly complex. Mugdha Kulkarni suggested that they need to constrain the LP model to a deterministic number of goals to present to the user, referencing Chong's possible hints at standard, growth, and conservative options. Mugdha Kulkarni proposed that the first pass should be a plain cash planner shipped with specific features, allowing the team to get rid of red tape and then build on top of it.

* **Agreement on Thin Slices and Future Planning**: Dillon Gearing agreed to find the "thinnest slice" possible and ship it, acknowledging that the initial version will be super basic, and they may not make it publicly available until it is more advanced. Dillon Gearing will finish the scenario document soon, and Dillon Gearing and Mugdha Kulkarni plan to meet later to break down the slices and phases for the MVP. Mugdha Kulkarni emphasized that having phases will help structure the review processes, making the large number of stakeholders more manageable by aligning them to small, shippable slices.

* **Prototyping Strategy and Jax Chat Exploration**: Robb Schiller affirmed that the current clarity of the scenarios makes them very suitable for prototyping using the Versal deployment. Dillon Gearing proposed integrating the cash flow feature within Jax Chat, suggesting that it would allow the user to carry the plan context throughout Zero, regardless of the page or device they are using. Mugdha Kulkarni noted that incorporating Jax with conversational ability (LLMs) would stretch the bounds of the MVP, suggesting that this belongs to an MVP 2 layer.

* **Focus on Context Carrying and UI Channels**: Dillon Gearing expressed a need for the plan context to travel with the user throughout Zero, suggesting that the goal is less about having a conversation with Jax and more about carrying the plan wherever they go. Robb Schiller explained that the spotlight widget is intended to have a primary action and a secondary action that is always "discuss with Jax," which stubs out the Jax widget and populates the question related to the insight. Robb Schiller agreed that Jax Chat could be a persistent sidebar where conversation history is saved, allowing the user to view the plan in context of other views, such as the bills list.

* **Engineering Concerns and Alternative UI Ideas**: Mugdha Kulkarni expressed concern that immediate reliance on Jax Chat could increase the surface area of changes, potentially leading to challenges and increased scrutiny from stakeholders and engineering teams. Mugdha Kulkarni suggested alternatives, such as using the plus icon menu to surface the cash flow plan or utilizing Chrome's native split view feature to open the plan on the side without building extra features for the MVP. Dillon Gearing suggested the idea of accessing agents through the Jax dropdown, perhaps via a separate icon or tab that shows agent activity and leads to the cash flow planning agent.

* **Final Decisions and Task Alignment**: Dillon Gearing stated that the team should not get too bogged down on the UI persistence problem yet, as the feature might ultimately live on a single page accessible through a side panel. Dillon Gearing confirmed that the Bills team has already received a heads-up and will be formally notified that AI exploration is happening, with lead engineers potentially being pulled in for Product Requirements Document reviews. Mugdha Kulkarni’s goal is to ensure that lead engineers are involved in reviewing the Entity Relationship Diagram and artifacts.

* **Summary of Next Steps and Planning**: Mugdha Kulkarni summarized that they will run samples through a program to finalize the core logic, Dillon Gearing will continue hashing out scenarios, and Robb Schiller will continue prototyping and preparing for upcoming meetings. Dillon Gearing, Robb Schiller, and Mugdha Kulkarni confirmed that tomorrow they should set aside time to cut down the shippable slices. Dillon Gearing will flesh out the scenarios, Robb Schiller will mock them up using the Versal prototype, and Dillon Gearing and Mugdha Kulkarni will meet later today to discuss the MVP slice.

### Suggested next steps

- [ ] Dillon Gearing will finish the scenario document soon.  
- [ ] Robb Schiller will work on the Versal prototype today so it works for the meeting tonight and provide the URL to look at the Jax interaction.  
- [ ] Mugdha Kulkarni will build out test data based on scenarios, feed it to the LP library to check the output, and produce an addendum document to the larger architectural document.  
- [ ] Dillon Gearing will give a stronger, more formal heads up to the bills team about the AI exploration and potential PRs.  
- [ ] Dillon Gearing will message Chong one to ask about the large standup.  
- [ ] Mugdha Kulkarni and Dillon Gearing will meet later today to think about what the MVP slice would be.  
- [ ] Dillon Gearing and Robb Schiller will document findings and share back from the meeting with Jonathan Coaches and Will Murray.

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*Please provide feedback about using Gemini to take notes in a [short survey.](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=3G6dWYV4ihT2ycJ4uWsmDxIQOAIIigIgABgBCA&detailid=standard)*