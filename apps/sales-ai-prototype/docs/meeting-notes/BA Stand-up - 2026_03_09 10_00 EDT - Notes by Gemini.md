Mar 9, 2026

## BA Stand-up

Invited [Robb Schiller](mailto:robb.schiller@xero.com) [Dillon Gearing](mailto:dillon.gearing@xero.com) [Mugdha Kulkarni](mailto:mugdha.kulkarni@xero.com)

Attachments [BA Stand-up](https://www.google.com/calendar/event?eid=NGd0dWtvc2FqbnFvYjVpY3ZrcGxkaTlkdWlfMjAyNjAzMDlUMTQwMDAwWiBkaWxsb24uZ2VhcmluZ0B4ZXJvLmNvbQ) 

Meeting records [Transcript](?tab=t.plnq7xtyixb8) 

### Summary

Simplifying the optimization algorithm and BFF wiring resulted in a pause on token and deployment work for scenario development and Micro Frontend creation.

**Optimization Algorithm and BFF**  
The team decided to simplify the optimization algorithm selection, utilizing simple cash flow scenarios to expedite the Minimum Viable Product delivery. Uncertainty about the Backend for Frontend functionality and token configurations led to a decision to pause related deployment efforts.

**Scenario Development and MF**  
The team paused current work to focus on defining straightforward cash flow scenarios, including human reasoning and outcomes, to guide algorithm selection. Dillon Gearing will develop the scenarios while Robb Schiller begins building the Micro Frontend using the accelerator tool.

**Cortex Service and Repository Setup**  
Robb Schiller and Dillon Gearing initiated the creation of a new Micro Frontend repository and service called 'Cash Flow Actions MF' using the Cortex workflow. They successfully registered the service, defining its owners and pre-release lifecycle, despite encountering slowness and an accelerator setup error.

### Details

* **Simplifying the Optimization Algorithm and Utilizing Sift**: Mugdha Kulkarni is seeking concrete, simplistic cash flow scenarios to avoid selecting an overly complex optimization algorithm for the Minimum Viable Product (MVP). Having simpler use cases initially will help them choose an appropriate algorithm and allow for quicker delivery, with the ability to evolve the algorithm later. They also note that Sift is expected to release a newer version of their API next week, which may provide more information.

* **Back-Burner Exploration of the LLM Summary Wiring**: Mugdha Kulkarni mentioned a Kanban card related to the LLM summary generation, which involves exploring how the Large Language Model (LLM) is wired up to generate the summary, and what can be done on the input side. They decided to put this exploration on the back burner for the moment, prioritizing the algorithm choice and initial use cases ([00:01:13](?tab=t.plnq7xtyixb8#heading=h.k26aj5k33e9f)).

* **BFF Wiring and Environment Challenges**: Dillon Gearing reported uncertainty about whether the BFF (Backend for Frontend) is working because they require an organization with bad cash flow to test it, and they are unsure how to make it call the SIFT API ([00:01:13](?tab=t.plnq7xtyixb8#heading=h.k26aj5k33e9f)). Mugdha Kulkarni expressed confidence that the underlying code will work but predicted issues with tokens and identity configurations, and questioned if SIFT APIs are available on the User Acceptance Testing (UAT) environment ([00:02:18](?tab=t.plnq7xtyixb8#heading=h.d4l0f73bl7ju)).

* **Identity Token and Deployment Process**: Mugdha Kulkarni suggested that Dillon Gearing will need to figure out the Zero deployment process, specifically getting their branch deployed on UAT. The primary challenges are anticipated to be obtaining the correct identity token and ensuring both SIFT and R APIs can communicate, which requires registering with identity using a documented process, possibly aided by the Glean tool ([00:03:23](?tab=t.plnq7xtyixb8#heading=h.txq3egrdzt3z)).

* **BFF and SPA Proof of Concept Status**: Dillon Gearing confirmed that they hooked up the Single-Page Application (SPA) and has a ready pull request (PR), but the proof of concept no longer works since they removed the placeholder to call the BFF. After minimal wiring of the BFF with assistance from Cursor, Dillon Gearing now requires pairing assistance to understand the setup of OAuth tokens and related configurations, particularly for pushing them to GitHub ([00:04:31](?tab=t.plnq7xtyixb8#heading=h.wit2gyu9g0dz)).

* **Questioning the Value of Current Investment and Proposed Pause**: Dillon Gearing questioned the value of continuing to set up OAuth tokens and getting the current work to function in UAT, especially if the team ultimately decides to build their own API or move the components elsewhere ([00:05:37](?tab=t.plnq7xtyixb8#heading=h.pobdm9on9gou)). Mugdha Kulkarni agreed with this sentiment, suggesting they pause the current efforts related to tokens and deployment since the architecture for the backend API calls needs to be determined first. They concluded that utilizing Dillon Gearing's time elsewhere until the architecture is defined would be less frustrating and more aligned with the final plan ([00:07:13](?tab=t.plnq7xtyixb8#heading=h.vxrw1aop3zxb)).

* **Prioritizing SIFT Team Engagement and Scenario Development**: Mugdha Kulkarni emphasized that Dillon Gearing’s immediate, ongoing work should be maintaining conversations with the SIFT team to understand what they have built and how it integrates with the team's objectives, focusing on expectations around syncing data. Mugdha Kulkarni requires focused time until Wednesday to narrow down the possible optimization algorithms and options based on the scenarios ([00:08:26](?tab=t.plnq7xtyixb8#heading=h.euxuzblnmljk)).

* **Defining Scenario Requirements for Algorithm Selection**: Dillon Gearing asked for clarification on where to focus their time, and Mugdha Kulkarni confirmed that generating a few straightforward cash flow scenarios is the most valuable and crucial task for now. These scenarios should include both the input and the anticipated human reasoning and outcome, which will help Mugdha Kulkarni ensure the chosen algorithm can handle the expected functionality and define the scope of the cash flow manager MVP ([00:10:26](?tab=t.plnq7xtyixb8#heading=h.ffoj1pek56qf)).

* **Robb Schiller's Updates and Focus Areas**: Robb Schiller successfully debugged the updated SPA, though Quick View is still not loading. They have a meeting scheduled for Wednesday afternoon with Phil Cochrell and Jonathan Coaches to update stakeholders, who were unaware of the team’s current work ([00:12:32](?tab=t.plnq7xtyixb8#heading=h.e3j4xhcfjgd4)). Robb Schiller's primary focus for the week is chasing up SIFT design documentation, determining who the SIFT designer is, resolving Versel deployment permissions for the prototype, and exploring possibilities within the prototype environment ([00:13:55](?tab=t.plnq7xtyixb8#heading=h.4fb4gb4n26zf)).

* **Discussing Micro Frontends (MF) and Backends for Frontends (BFF)**: The team agreed that the ultimate delivery mechanism for this product should likely be a Micro Frontend (MF) for better decoupling and flexible UI placement across Zero ([00:16:58](?tab=t.plnq7xtyixb8#heading=h.jwkd439epwbv)). Dillon Gearing asked if the team could build the BFF later, to which Mugdha Kulkarni confirmed that they could, and suggested that starting to wire up the MF using the accelerator tool would be a good use of time ([00:19:08](?tab=t.plnq7xtyixb8#heading=h.stjrg7eqaglo)).

* **Micro Frontend Development and Scenario Mocking**: Dillon Gearing proposed that Robb Schiller could focus on building a new MF using the accelerator documentation while Dillon Gearing works on building out and mocking the scenarios ([00:19:08](?tab=t.plnq7xtyixb8#heading=h.stjrg7eqaglo)). Mugdha Kulkarni clarified that English sentences would suffice for the scenarios and that Dillon Gearing can start by mocking the data structure for invoices, bills, and payroll using the API accounting documentation ([00:20:24](?tab=t.plnq7xtyixb8#heading=h.anrfrffppxye)).

* **Action Items and Product Naming**: Robb Schiller and Dillon Gearing agreed to chase up the plan regarding the Spotlight feature, potentially leveraging Chong for these conversations ([00:21:32](?tab=t.plnq7xtyixb8#heading=h.tij8mr81239r)). Dillon Gearing outlined the immediate steps: creating user stories/scenarios, mocking those scenarios with data to resemble SIFT output, and starting the MF development using the accelerator ([00:22:42](?tab=t.plnq7xtyixb8#heading=h.2hq4qc627zgm)). Dillon Gearing suggested naming the product "Cash Flow Actions" as it accurately reflects that the output proposes actions for the user, rather than functioning as an agent ([00:25:15](?tab=t.plnq7xtyixb8#heading=h.vjyvthc8xyz6)).

* **Mugdha Kulkarni's Algorithm Focus and SIFT API Questions**: Mugdha Kulkarni plans to build out algorithm options, cross-check them with the provided scenarios, and aim to finalize this deterministic aspect by the standup the following day ([00:25:15](?tab=t.plnq7xtyixb8#heading=h.vjyvthc8xyz6)). They intend to clarify SIFT’s API capabilities and the required syncing to determine the scope of the MVP, particularly regarding cash flow negative customers and how far out the forecast should go ([00:26:32](?tab=t.plnq7xtyixb8#heading=h.hxbpzblu8gna)).

* **Plan for the Next Steps and Pairing Session**: Dillon Gearing summarized the plan: Mugdha Kulkarni will focus on algorithms and needs scenarios; Robb Schiller will focus on the MF accelerator, tracking down Spotlight, and SIFT design documentation ([00:27:40](?tab=t.plnq7xtyixb8#heading=h.rmd0relabn4e)). Dillon Gearing will develop the scenarios and outcomes and proposed pairing with Robb Schiller on the MF accelerator documentation immediately ([00:29:03](?tab=t.plnq7xtyixb8#heading=h.2n6k95d5yipj)).

* **Defining the Scope of Cash Flow Actions Versus Cash Flow Manager**: Mugdha Kulkarni asked about the ultimate goal of the cash flow insights, given SIFT’s existing sophisticated models and their current limitation in making changes in Zero ([00:30:48](?tab=t.plnq7xtyixb8#heading=h.68ew1txd67ga)). Dillon Gearing defined three things that SIFT’s Cash Flow Manager lacks: the ability to make changes, comprehensive data (e.g., payroll/tax), and the ability to proactively generate a plan for the user, which is the "magic sauce" of the current project ([00:31:59](?tab=t.plnq7xtyixb8#heading=h.v4i0ryy15tna)).

* **Clarifying the Focus of Cash Flow Actions MVP**: Dillon Gearing clarified that the current focus is on bills, and the Cash Flow Actions MVP will aim to inform the user of an impending shortfall and suggest bill payments to avoid it. Incorporating invoices and suggesting chasing agents is considered a step two or a bonus for later. The initial phase is strictly focused on bills and proposing actions based on bill payment modifications ([00:34:37](?tab=t.plnq7xtyixb8#heading=h.rm1vs5ewor19)).

* **Assumptions about SIFT API Availability**: The team confirmed the assumption that SIFT API is available to all US organizations using Zero, and that the team's insights will rely on the data syncing that has already occurred in SIFT. Dillon Gearing advised assuming that SIFT will be enhanced to cover data gaps like payroll and tax, but noted that the team's product may need to be self-aware of these data limitations ([00:36:32](?tab=t.plnq7xtyixb8#heading=h.5vora1gmbngj)).

* **Starting the Micro Frontend Accelerator Process**: Robb Schiller and Dillon Gearing began the process of creating a new Micro Frontend (MF) using the accelerator tool ([00:37:44](?tab=t.plnq7xtyixb8#heading=h.mrriiklj9cj)). They decided to create a new repository called "Cash Flow Actions MF" ([00:38:56](?tab=t.plnq7xtyixb8#heading=h.o1cv8ydumo52)). The initial attempt was halted when the accelerator requested a Universally Unique Identifier (UUID), leading the team to realize they first needed to create the repository through the Zero internal Cortex workflow ([00:45:20](?tab=t.plnq7xtyixb8#heading=h.ag5gxl1oa107)).

* **Repository Creation via Cortex Workflow**: Following the documentation, Robb Schiller deleted the improperly created repository and started the necessary Cortex workflow to create a new service and generate the required details, including the UUID, before proceeding with the MF accelerator ([00:49:20](?tab=t.plnq7xtyixb8#heading=h.z8per5ov76uf)). They determined that the service should be associated with the "Payments Agents" product in Cortex ([00:54:05](?tab=t.plnq7xtyixb8#heading=h.hzv66b16fw8o)).

* **Product Setup and Identification**: Dillon Gearing and Robb Schiller initiated the setup for a new product, which involved defining the name as "payments agents" and specifying that it is an AI agent product for payments experiences. They successfully navigated the product registration workflow, establishing a Slack channel for the product and completing the initial submission, though they noted that the Cortex system was slow during this process ([00:56:21](?tab=t.plnq7xtyixb8#heading=h.dojv6aavu7vy)). Dillon Gearing created a new pod for the product during the setup, and the team confirmed the product's name appeared after a refresh ([00:59:12](?tab=t.plnq7xtyixb8#heading=h.t3tmnr3f2jh9)).

* **Repository and Service Configuration**: The team proceeded to define the repository settings, using the name "cash flow actions a fee" for the repo and "main" as the default branch ([00:59:12](?tab=t.plnq7xtyixb8#heading=h.t3tmnr3f2jh9)). They categorized the service life cycle as "pre-release," the data sensitivity as "internal" because it would not contain personal data, and the service type as an MF, confirming that an MF is modeled as a service in Cortex terms. Robb Schiller added themself, Dillon Gearing, and Mugda as owners for the service within the Cortex system ([01:02:09](?tab=t.plnq7xtyixb8#heading=h.soe8ddwmf59o)) ([01:11:47](?tab=t.plnq7xtyixb8#heading=h.wmrz0bdt4du0)).

* **Post-Setup and Tool Integration**: Following the service setup, Robb Schiller wondered aloud about a potential Slack notification indicating the completion of the setup. The participants discussed whether to proceed with creating a project in SonarQube, which Robb Schiller suggested is typically for production elements and includes automated security and vulnerability testing ([01:04:53](?tab=t.plnq7xtyixb8#heading=h.6dir38ipnv7)). Dillon Gearing and Robb Schiller ultimately focused on accessing the open repo and the Cortex catalog ([01:07:33](?tab=t.plnq7xtyixb8#heading=h.xjvb85ej70if)).

* **UUID and Catalog Visibility Issues**: The team located the service's UID, which was identified as the \`XCortex tag\` in the Cortex YAML file, a fact they confirmed using an external search tool ([01:07:33](?tab=t.plnq7xtyixb8#heading=h.xjvb85ej70if)). However, Dillon Gearing noted that the newly created service was not immediately showing up in the Cortex catalog, leading Robb Schiller to express distrust in the speed of the Cortex system. Robb Schiller and Dillon Gearing verified the existence of the \`parents\` tag in the repo, which was necessary for catalog inclusion ([01:09:16](?tab=t.plnq7xtyixb8#heading=h.icpee1qj7gyi)).

* **Accelerator Setup and Error Resolution**: While attempting the accelerator setup, Robb Schiller encountered an error in the terminal stating, "Accelerator is already added to your project," which hindered the final configuration ([01:11:47](?tab=t.plnq7xtyixb8#heading=h.wmrz0bdt4du0)). Robb Schiller used an AI tool to attempt to resolve this issue by listing and deleting the existing accelerator setup to start over ([01:18:05](?tab=t.plnq7xtyixb8#heading=h.2d809w27wmob)). Dillon Gearing and Robb Schiller concluded the meeting with Robb Schiller committed to resolving the MF setup issue and providing an update ([01:21:14](?tab=t.plnq7xtyixb8#heading=h.aatliasc6193)).

### Suggested next steps

- [ ] Dillon Gearing will come up with a couple of simplistic cash flow scenarios, including input and human reasoning/outcome, to help Mugdha Kulkarni determine the right optimization algorithm for the MVP.  
- [ ] Robb Schiller will figure out who the designer is on Sift and follow up with Emma about the cash flow forecast stuff.  
- [ ] Robb Schiller will work out the Versel permissions with the enterprise team to resolve the prototype deployment issue.  
- [ ] Robb Schiller will chase up the plan with Spotlight and SIFT design documentation on where they are going.  
- [ ] Dillon Gearing will check if the pod can be renamed.  
- [ ] Robb Schiller will let Dillon Gearing know the outcome of attempting to delete and restart the accelerator setup.  
- [ ] Dillon Gearing and Robb Schiller will get the MFE set up.

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*Please provide feedback about using Gemini to take notes in a [short survey.](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=8RoVrYnQMscCFXeALMIaDxIQOAIIigIgABgBCA&detailid=standard)*