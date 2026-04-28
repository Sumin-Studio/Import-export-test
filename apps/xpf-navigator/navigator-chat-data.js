/**
 * Xero Build Navigator copy — one phase per file section in PXX How we work logic reformatted.md
 */
window.NAVIGATOR_LOGIC = {
  phases: {
    Understand: {
      topicsBySlug: {
        "customer-insights": {
          title: "Customer insights",
          question:
            "Is your customer problem space clearly defined and understood? Have you clearly identified the customer needs, behaviours and challenges?",
          exampleMethodsHeading: "Example methods you can use to validate Customer Insights",
          responsible: "Design / Research",
          bullets: [
            "Customer interviews — finding & insights",
            "Existing research analysis",
            "Customer problem definition",
            "Experience principles",
            "Reference payment segments",
          ],
        },
        "market-analysis": {
          title: "Market analysis",
          question: "Do you clearly understand what our competitors and the market are doing, and how it affects Xero?",
          exampleMethodsHeading: "Example methods you can use to validate market analysis",
          responsible: "Product / Design / PMM",
          bullets: [
            "Competitive business analysis",
            "Competitor design analysis",
            "Market trends",
            "Indicative opportunity size (TAM/SAM/SOM)",
          ],
        },
        "technical-analysis": {
          title: "Technical analysis",
          question: "Have you defined what the capabilities are required to solve this problem?",
          exampleMethodsHeading: "Example methods you can use to validate technical analysis",
          responsible: "Engineering",
          bullets: [
            "Map of capabilities and gap analysis",
            "High level feasibility and architecture",
            "RAKU (Risks, Assumptions, Knowns, Unknowns)",
            "Xero engineering considerations",
            "Artefact: PRD technical section",
          ],
        },
        "xero-context": {
          title: "Xero context",
          question:
            "Have you confirmed this fits within Xero's platform, and what the dependencies and considerations are?",
          exampleMethodsHeading: "Example methods you can use to validate Xero context",
          responsible: "Core team",
          bullets: [
            "Dependency map",
            "Xero product considerations",
          ],
        },
        "business-drivers": {
          title: "Business drivers",
          question: "Have you defined how we will know that we’ve solved this problem?",
          exampleMethodsHeading: "Example methods you can use to validate business drivers",
          responsible: "Product",
          bullets: ["Measures of success"],
        },
      },
    },
    Define: {
      topicsBySlug: {
        "ideal-state-solution": {
          title: "Ideal state solution",
          question: "Have you defined what the ideal state solution is which solves customer needs?",
          exampleMethodsHeading: "Example methods you can use to validate ideal state solution",
          responsible: "Design",
          bullets: [
            "Ideation workshops",
            "Concept experimentation (Javelin board)",
            "Assumption based testing",
            "Concept prototype (low fidelity)",
            "User flows",
            "PMM/CX/Legal/Compliance inform",
          ],
        },
        planning: {
          title: "Planning",
          question: "Have you defined the product strategy and delivery plan?",
          exampleMethodsHeading: "Example methods you can use to validate planning",
          responsible: "Engineering / Product",
          bullets: [
            "Sequenced user story map",
            "Map of milestones and incremental value delivery",
            "Breakdown of deliverables (capabilities and features — customer experience) per milestone",
            "Revenue forecast",
          ],
        },
        "technical-solution": {
          title: "Technical solution",
          question:
            "Have you defined the high level technical solution? And the capabilities required to solve this problem?",
          exampleMethodsHeading: "Example methods you can use to validate technical solution",
          responsible: "Engineering",
          bullets: [
            "Scope / out-of-scope",
            "Alignment with high level architecture",
            "Component breakdown",
            "Data and API design",
            "Delivery plan (e.g. rollout strategy, observability)",
            "Failure scenarios mapped",
            "Artefacts: ERD and CAB",
          ],
        },
        "risks-dependencies": {
          title: "Risks and dependencies",
          question:
            "Have you defined the prioritised risks and dependencies? And how will they be addressed?",
          exampleMethodsHeading: "Example methods you can use to validate risks and dependencies",
          responsible: "Core team",
          bullets: [
            "RAKU (Risks, Assumptions, Knowns, Unknowns)",
            "Track of dependencies and risks to be reviewed by every trio",
          ],
        },
      },
    },
    Develop: {
      topicsBySlug: {
        "design-ready-for-build": {
          title: "Design ready for build",
          question: "Is the design solution ready for development?",
          exampleMethodsHeading: "Example methods you can use to validate design ready for build",
          responsible: "Design",
          bullets: [
            "Detail designs which are ready for dev",
            "User flow diagram and annotation",
            "Usability testing (if needed)",
            "Accessibility testing (if needed)",
          ],
        },
        requirements: {
          title: "Requirements",
          question: "Do you have 3+ sprints of user stories written?",
          exampleMethodsHeading: "Example methods you can use to validate requirements",
          responsible: "Product / Engineering",
          bullets: [
            "Write acceptance criteria",
            "Facilitate refinement",
            "Story level estimates",
          ],
        },
        "cross-functional-alignment": {
          title: "Cross-functional alignment",
          question:
            "Do you have alignment with cross-functional teams to ensure delivery?",
          exampleMethodsHeading: "Example methods you can use to validate cross-functional alignment",
          responsible: "Product",
          bullets: [
            "PMM alignment on GTM plan",
            "CX informed",
            "Legal and compliance review",
          ],
        },
      },
    },
    Deliver: {
      topicsBySlug: {
        "design-quality-check": {
          title: "Design quality check",
          question: "Do the deliverables match the design requirements?",
          exampleMethodsHeading: "Example methods you can use to validate design quality check",
          responsible: "Design",
          bullets: ["Design UX QA process"],
        },
        "definition-of-done": {
          title: "Definition of done",
          question: "Has the deliverable met the DoD?",
          exampleMethodsHeading: "Example methods you can use to validate definition of done",
          responsible: "POD",
          bullets: ["Mob testing"],
        },
        "release-plan": {
          title: "Release plan",
          question: "Are we ready and approved to launch?",
          exampleMethodsHeading: "Example methods you can use to validate release plan",
          responsible: "Engineering / PMM",
          bullets: [
            "GTM activities (RSG)",
            "CX knowledge articles",
            "Updated LaunchCal approval",
          ],
        },
      },
    },
    Nurture: {
      topicsBySlug: {
        performance: {
          title: "Performance",
          question:
            "Is usage hitting our expectations? Do we need to engage in growth activities?",
          exampleMethodsHeading: "Example methods you can use to validate performance",
          responsible: "Product / Design / Research",
          bullets: [
            "Beanie events and Mixpanel dashboards",
            "Financial reports",
            "Beta feedback",
            "Customer interviews / diary studies",
          ],
        },
        "customer-feedback": {
          title: "Customer feedback",
          question: "Do we know what our customers are saying about the product?",
          exampleMethodsHeading: "Example methods you can use to validate customer feedback",
          responsible: "Product",
          bullets: ["CSAT", "Customer feedback loops"],
        },
        reliability: {
          title: "Reliability",
          question: "Are we comfortable with the level of incidents?",
          exampleMethodsHeading: "Example methods you can use to validate reliability",
          responsible: "Engineering",
          bullets: ["Incident monitoring", "Service level objectives"],
        },
      },
    },
  },
};
