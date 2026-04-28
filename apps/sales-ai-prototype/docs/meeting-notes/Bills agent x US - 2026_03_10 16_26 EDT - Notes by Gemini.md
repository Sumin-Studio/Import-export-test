Mar 10, 2026

## Bills agent x US

Invited [Jonathan Kochis](mailto:jonathan.kochis@xero.com) [Will Murray](mailto:will.murray@xero.com) [Robb Schiller](mailto:robb.schiller@xero.com) [Dillon Gearing](mailto:dillon.gearing@xero.com)

Attachments [Bills agent x US](https://www.google.com/calendar/event?eid=N3JudnZkODFlaGsyYmQ2MmI2NTZqdWhobmwgam9uYXRoYW4ua29jaGlzQHhlcm8uY29t) 

Meeting records [Transcript](?tab=t.h5j4wi5nhchb) 

### Summary

Cash flow management strategy discussion centered on a proposed solution utilizing a cash flow predictor for customer alerts, four specific cash flow scenarios, and necessary data integration with SIFT.

**Cash Flow Prediction Solution**  
A proposed solution introduced a cash flow predictor that notifies customers via Spotlight when they are likely to run out of cash or dip below a predefined buffer. The solution narrowed the problem space into 4 distinct cash flow scenarios to determine appropriate customer actions, including conservative and unsolvable situations.

**Addressing Data Gaps**  
User trust in current cash flow projections is low because they exclude key financial data, such as all bank accounts and major money-out items like payroll and tax payments. Collaboration with the SIFT and Fins Insights AI teams is necessary to fill these data gaps and significantly improve projection accuracy.

**Component Development Priorities**  
The team agreed that immediate priorities are focusing on the total available cash, the cash projection over time, and the action flows that address what to do about the projection. Spotlight should be the area of least immediate focus, as it relies on having the current state and projection available first.

### Details

* **Proposed Solution for Cash Flow Management**: Dillon Gearing introduced a proposed solution focused on addressing cash flow crunches or opportunities, utilizing a cash flow predictor to notify customers via Spotlight when they are likely to run out of cash or dip below a predefined buffer ([00:00:00](?tab=t.h5j4wi5nhchb#heading=h.g4rqh0ympv17)). The initial focus of this effort is on bills, though future states could include managing invoices or applying for loans ([00:01:39](?tab=t.h5j4wi5nhchb#heading=h.my1btf5xuwcb)).

* **Four Scenarios for Cash Flow Planning**: The team has narrowed down the problem space into four distinct cash flow scenarios to determine the appropriate course of action for customers ([00:00:00](?tab=t.h5j4wi5nhchb#heading=h.g4rqh0ympv17)). The first scenario involves dipping below the cash buffer but not hitting zero, allowing for cash flow smoothing by delaying bill payments ([00:01:39](?tab=t.h5j4wi5nhchb#heading=h.my1btf5xuwcb)).

* **Conservative and Unsolvable Cash Flow Scenarios**: The second scenario addresses customers projected to hit zero cash balance before their Accounts Receivable (AR) comes in, requiring a highly conservative plan focused on delaying bill payments to remain above zero for as long as possible ([00:02:52](?tab=t.h5j4wi5nhchb#heading=h.shcvfogen1xt)). The fourth scenario is considered unsolvable, where a customer has no incoming AR, and the system can only alert them that they are underwater and will remain so ([00:03:53](?tab=t.h5j4wi5nhchb#heading=h.m9tbueeg7nu6)).

* **Cash Flow Opportunity Scenario**: The third scenario addresses customers who will never dip below their buffer and have excess cash, which presents an opportunity to offer insights on taking advantage of early payment discounts on purchase orders. This scenario requires a future capability to capture purchase order payment terms that offer discounts for paying within a specific timeframe, such as 10 days ([00:03:53](?tab=t.h5j4wi5nhchb#heading=h.m9tbueeg7nu6)).

* **Interaction Design via Spotlight**: The proposed interaction begins with a Spotlight alert that prompts the user to "Make a plan" ([00:04:58](?tab=t.h5j4wi5nhchb#heading=h.7aqw0qrqdk1s)). For Scenario One, the plan offers choices such as riding the wave (doing nothing) or a conservative plan to flatten out the dip by suggesting actions, which ultimately adjusts the planned dates on bills ([00:05:49](?tab=t.h5j4wi5nhchb#heading=h.o9659hohjry5)).

* **Impact and Implementation of Plan Adjustments**: The plan's action of adjusting planned dates on bills is intended to change the customer's cash flow projections ([00:05:49](?tab=t.h5j4wi5nhchb#heading=h.o9659hohjry5)). A future state would involve integrating with systems like Millio payments to automatically reschedule bills based on the new plan dates, while current challenges involve how an agent can authenticate a payment ([00:06:46](?tab=t.h5j4wi5nhchb#heading=h.sjn2posmeic7)).

* **Alignment with SIFT and Existing Cash Flow Tools**: Will Murray noted that the current action flows, which primarily interact with Millio online bill pay, already influence the projected balance in a similar manner, which suggests a potential disconnect if Spotlight's actions are based on different inputs ([00:07:46](?tab=t.h5j4wi5nhchb#heading=h.uug5o0khd9ce)). The team should evaluate if they can bypass the modal and have the action flow update the projection immediately upon the customer's action ([00:08:52](?tab=t.h5j4wi5nhchb#heading=h.s67f7t1i7yie)).

* **Addressing User Trust in Cash Flow Projections**: Concerns were raised about user trust in the current cash flow projections because they do not include all bank accounts or key money-out items like payroll and tax payments ([00:10:39](?tab=t.h5j4wi5nhchb#heading=h.7rjtbtcagbha)). Dillon Gearing is scheduled to meet with the SIFT team and the Fins Insights (AI) team to address these data gaps and improve the projection accuracy ([00:11:39](?tab=t.h5j4wi5nhchb#heading=h.224yaw8z5zr6)).

* **Goal Alignment and Collaboration with SIFT**: Will Murray and Jonathan Kochis's current goal is to determine the optimal visualization for the cash flow manager widget and how their action flows can interact with it, especially considering AR in addition to bills. They are trying to align their gut feelings on the solution with existing efforts by SIFT, which is already planning to release a cash position graph component ([00:13:34](?tab=t.h5j4wi5nhchb#heading=h.2hncfvu9uv63)).

* **Focus on Cash Flow Manager as the Future**: It was noted that the AI team appears to be heavily relying on the cash flow manager's prediction models and is working on expanding them. It was suggested that if cash flow manager or SIFT cannot meet their needs, the teams could collectively approach the AI team to leverage their ability to fill data gaps ([00:15:31](?tab=t.h5j4wi5nhchb#heading=h.l0gdf6727mic)).

* **Team Priorities and Component Development**: Will Murray stated that their immediate goal is to complete a slide deck detailing their proposed flows and onboarding by the end of the current week to present to Eli and Matan. Their proposed "action zone" component consists of four parts: the action flows, Spotlight, the total available cash, and the cash flow graph ([00:16:56](?tab=t.h5j4wi5nhchb#heading=h.3tu0b7e6u1r5)).

* **Identifying Key Contacts for Collaboration**: Will Murray sought out key contacts for the payment chasing agents project and the AI team to ensure proper collaboration ([00:17:45](?tab=t.h5j4wi5nhchb#heading=h.ly9jeymfx9fj)). Dillon Gearing identified the AI contact as Kobe (tag: KOB), a Principal Product Manager in the AI team, and suggested contacting Glean for the PM on payment chasing agents, whose project name is "Project Retriever" ([00:18:49](?tab=t.h5j4wi5nhchb#heading=h.q6xsycnjy7np)).

* **Prioritization of Spotlight Work**: The team agreed that Spotlight should be the area of least immediate focus, as the current priorities are the amount of money available now, the cash projection over time, and the action flows that address what to do about the projection ([00:19:56](?tab=t.h5j4wi5nhchb#heading=h.vobexsn427t5)). Spotlight, which generates insights about what can be done, relies on having the current state and projection available first ([00:21:01](?tab=t.h5j4wi5nhchb#heading=h.lmd7u6ro6ja)).

* **Collaboration on Agent Onramps and Data Needs**: Dillon Gearing stated that their primary reasons for reaching out were to identify action flow or graph components as potential on-ramps for the agent they are building, given the cash flow focus ([00:21:01](?tab=t.h5j4wi5nhchb#heading=h.lmd7u6ro6ja)). They also share a critical need for the underlying data that populates the cash flow graph and projections, which could be addressed by creating a wider business case for adding more data hookups to the cash flow manager ([00:22:40](?tab=t.h5j4wi5nhchb#heading=h.51wpxdxc3bj5)).

* **Identifying a Hero Metric**: When asked about a "hero metric" for the project, the team indicated they currently do not have one, but are facing pressure to define one ([00:22:40](?tab=t.h5j4wi5nhchb#heading=h.51wpxdxc3bj5)). Dillon Gearing humorously stated their current metric is that "payments doesn't sparkle enough," indicating a focus on increasing engagement ([00:23:50](?tab=t.h5j4wi5nhchb#heading=h.qah00obwoaf9)).

### Suggested next steps

- [ ] Dillon Gearing will add Will Murray to the meeting with Jodie tomorrow to discuss action flows and cash flow manager.  
- [ ] Will Murray will share the deck from the product marketing team for bills with Dillon Gearing.

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*Please provide feedback about using Gemini to take notes in a [short survey.](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=BohU-Eh0NiyW2YE7IetODxIPOAIIigIgABgBCA&detailid=standard)*