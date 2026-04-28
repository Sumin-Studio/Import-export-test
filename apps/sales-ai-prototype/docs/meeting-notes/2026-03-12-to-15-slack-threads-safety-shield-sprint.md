# Safety Shield Sprint -- Slack Thread Compilation (March 12-15)

## Tauqir's Architecture Update (March 12)
- Refined scenarios with Rory. Two locked in: Anomalous bill detection, First time supplier detection
- Chat with Greg Rychlewski regarding Duplicate Bill Detection API
- Investigating architectural approaches: synchronous approach for beta vs event-driven "always on" Shield
- In active discussion with Lili Kan
- Reached out to #hello-accounting-domain-events team

## Jon's Design Priorities (March 12)
- Design deliverables in hand: Figma screens, live prototype, Payments Agents Hub, week one update
- Highest priority: writing design explanation document for the design team
- Skipped sync to focus on writing

## Rory's Questions
- "How do we bring this together into a thin slice we think is an EPIC experience for customers?"
- Jon's response: "Two boxes, one arrow" is the ultimate experience. Between the two boxes is the arrow -- that's where ALL the work is.

## Jon's Crawl/Walk/Run Framework
1. Show how the bills screen looks today with risk callouts and CTA -- this is "crawl"
2. From there, juice it. Magic wand it. That's walk.
3. From there, go bananas. That's run.
- Walk and run: consider JAX interaction, OpenClaw integration, cashflow US team connection, research

## Rory's Scenario Refinement (March 12)
Safety Shield Target Scenarios (Confluence) locked:

### Phasing:
- **P0 (Common & high impact):** First time supplier, Exact duplicate, Bill above historical avg
- **P1 (Rare but severe):** Recent contact bank details change, Mismatch in invoice bank details, Duplicates fuzzy match
- **P2 (Niche cases):** Budget checks, PO and goods receipted checks

### Key learnings:
- A bill must have an associated contact in Xero but does not need bank details at creation
- Bill stages: Create bill -> Draft -> Awaiting approval -> Awaiting payment
- User should be able to acknowledge and dismiss risks
- Actions should transcend bill stages
- Value in surfacing in All/Drafts/Awaiting Approval/Awaiting Payment lists
- Ignore credit notes initially

## Architecture Debate: Duplicate Detection Service

### Tauqir's meeting outcome (with DG/Greg)
- DG suggested extending existing Duplicates API to house Shield rather than building greenfield
- Benefits: fast-track via shared infra (DynamoDB, auth, resilience, observability, K8s)
- Concerns: Greg flagged stability issues, API runs against ICN events (unreliable), Shield designed for Bills Horizon events (event source mismatch), coupling Shield to production service

### Lili Kan's position
- If spinning up a new service is costly, figure out friction points so Shield teaches us how to make it better for future services
- Wants clarity: is Shield reusing Bill's service or calling the duplicate detection service? Two different things.

### Dillon Gearing's follow-up
- Wrote Confluence brief: "Accounting Documents Duplicates Services -- Horizon Migration Brief"
- Recommendation: look into what could be reused from duplicate detection
- Even if Shield uses a brand new event stream, duplicate service could listen to that stream instead
- Bills team owns these services

### Lili's two architectural patterns
1. Duplicate service as common capability (endpoint: "is this bill potentially a duplicate") -- Shield calls it
2. Duplicate service as library with algorithm -- Shield listens to events and invokes capability function
- Awaiting answer on which pattern Bills actually uses

## Draft Bills Debate

### Dillon: YES to drafts
- Most draft bills come through OCR or 3rd-party already complete
- We want to surface insights as early as possible
- It would be a shame for customer to review and approve a draft only for Shield to catch it after

### Lili: CAUTIOUS on drafts
- Drafts are noisy -- user still editing
- Suggests on-demand precheck or check-on-submit pattern

### Dillon's counter
- That assumes user creating from scratch. Most draft bills already have values from OCR/3rd-party
- Kevin Dias and Pratik's teams also working on auto-filling and auto-routing bills

### Chong: YES if data supports
- Agrees to scan from drafts if data supports it
- Good CTA: "Approve and Schedule Payment"

## Rory's EOW Wrap (March 14)
- Video walkthrough of prototype + scoping/phasing page
- Prototype shows Safety Shield in bills list view (always-on, flagging bills for second look)
- Risk flags with context and recommended next steps
- Bill detail screen with same messaging
- Most value in awaiting approval and awaiting payment stages
- Phasing: Alpha (knows which bills need second look), Beta (knows what to do), GA (AI-powered partner)

## Chong's Questions (March 15)
1. Does P0/P1/P2 map to Alpha/Beta/GA? (Needs confirmation)
2. Fuzzy matching: top VOC, can central AI team help?
3. Supplier network effect: can we start building supplier profiles?
4. Anomaly detection: any ML model we can adopt?
5. JAX interaction: is there a common design framework for user-to-JAX back-and-forth across agents?

## Tauqir's End-of-Week Reflection
"The more I dig deeper into the architecture, the more I realize there's a lot of plumbing work needed to get the service up and running. But if we get the architecture right the first time, adding subsequent detectors will not be as challenging. This is the reality of building a platform level service."
