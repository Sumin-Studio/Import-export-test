import type { AreaOfOpportunity } from "./types";

/** 20 areas of opportunity from Workshop 1 (Chong & Lili scored items) with synthetic user quotes. */
export const AREAS_OF_OPPORTUNITY: AreaOfOpportunity[] = [
  {
    num: 1,
    title: "No cash-aware payment planning or prioritization",
    sev: 4,
    feas: 3,
    ai: 5,
    rationaleSev:
      'High strategic pain: no proposal of which bills to pay, when, why, or cash impact; no view of reserve or projected position. Directly undermines "ready to pay" and cash confidence.',
    rationaleFeas:
      "Needs data (cash, terms, due dates) and UX; some logic can be built without Melio APIs (planning surface). Agent that proposes a plan is the differentiator.",
    rationaleAI:
      '"AI proposal" of what to pay and when is the value. Without agent = just a dashboard; with agent = proactive plan for review.',
    billCreator: [
      "If it actually tells me *which* bills to pay first and why, instead of me staring at a list, that's the first time I'd feel like the system is on my side.",
      "I need to see the impact. 'If you pay these three now you'll have $X left' — otherwise it's just another dashboard I'll ignore.",
      "Don't give me a 'plan' I can't change. If I override it, does it learn or just nag me again next week?",
    ],
    cautiousApprover: [
      "I want to know *why* it's suggesting this order. If I'm signing off on a payment run, 'the AI said so' isn't enough — show me cash position and due dates.",
      "If the plan auto-approves anything without me seeing it, we have a problem. The plan should inform me; I still approve.",
      "This could be huge — I triage by gut today. If the system surfaces 'these five are overdue and these two have early-pay discounts,' I can actually decide.",
    ],
    apClerk: [
      "Finally — a single place that says 'here's what we're paying this week and here's why.' Right now I'm the one building that in my head or in a spreadsheet.",
      "As long as I can still correct the plan before it goes to approval. If the agent locks in a run and I can't adjust, that's worse than no plan.",
      "If it doesn't learn from my overrides — e.g. I always push Supplier X to next week — it'll feel dumb fast.",
    ],
  },
  {
    num: 2,
    title: "Late bill entry undermines cash flow forecasting",
    sev: 5,
    feas: 3,
    ai: 4,
    rationaleSev:
      '25% created after paid; ~half paid ~1 week late. Distorts forecasting and planning. Core to "laborious → autonomous" and adoption story.',
    rationaleFeas:
      "Entry automation (OCR, matching, learn preferences) is buildable; ties to zero bill entry. Melio doesn't block entry.",
    rationaleAI:
      'Agent can learn defaults, match suppliers, suggest coding; but "fix" is also better UX and system that learns. High AI benefit for learning.',
    billCreator: [
      "25% of bills created after they're already paid — that's me. If automation gets bills in before payment, my forecast might actually be worth looking at.",
      "Speed of entry matters more than fancy planning. If I'm still typing everything in, the 'forecast' is still wrong because the data's late.",
      "I don't care about forecasting if the tool doesn't reduce how much I type. Fix entry first, then tell me about cash flow.",
    ],
    cautiousApprover: [
      "Late entry means I'm approving stuff that's already paid. That's embarrassing and it makes approval feel pointless.",
      "If bills show up on time, my queue is real. Right now half of 'awaiting approval' is noise because the bill was paid last week.",
      "Forecasting is the business owner's problem. My problem is 'don't make me approve something that's already done.'",
    ],
    apClerk: [
      "Late entry is why my reports are wrong and why we're always reconciling after the fact. Fix this and my job gets simpler.",
      "Automation has to include matching and learning. If we're still manually entering but 'faster,' we're not really fixing the 25%.",
      "I need to see what was auto-captured and what I need to fix. No black box — show me the source and the suggestion.",
    ],
  },
  {
    num: 3,
    title: "Time and cognitive load for high-volume bill processors",
    sev: 4,
    feas: 4,
    ai: 5,
    rationaleSev:
      "11–100 bills/month for 15%; real time and cognitive load. Direct efficiency and capacity story.",
    rationaleFeas:
      'Bulk operations, defaults, and "system learns" are largely in our control. Approval chasing and planning help.',
    rationaleAI:
      "Agent excels: reduce load by proposing batches, auto-coding, chasing approvers, suggesting payment timing. Clear agent opportunity.",
    billCreator: [
      "This is the one. If I'm doing 50+ bills a month and every one is 10 clicks, I'm not going to use bill pay — I'll pay another way and enter later.",
      "Cognitive load is real. I don't want to 'think' about each bill. Suggest, batch, let me approve in one go.",
      "If you add more screens or steps to 'reduce load,' I'm out. Fewer steps or don't bother.",
    ],
    cautiousApprover: [
      "I don't process the bills — I approve them. So 'reduce load' for me means: don't make me open 50 emails. One list, prioritised, approve in batch where it's safe.",
      "If the clerk's load goes down but my queue is still a mess with no prioritisation, my load goes up. Fix both.",
      "Batch approval for low-risk items is exactly what I want. But I need a clear rule: what's in the batch and why it's low risk.",
    ],
    apClerk: [
      "Time and cognitive load is my daily reality. If the system doesn't learn from my corrections and make the next 20 bills faster, this is just marketing.",
      "Bulk operations and smart defaults would cut my load in half. But if 'bulk' means I lose visibility into what I'm applying, I won't trust it.",
      "I need one screen: 'here's what needs your attention, here's what's ready to send for approval.' Not five tabs and three filters.",
    ],
  },
  {
    num: 4,
    title: "Late payments and due-date miss",
    sev: 4,
    feas: 3,
    ai: 4,
    rationaleSev:
      "Half of bills paid late, ~1 week after due; risk, supplier friction, missed discounts. Widely cited.",
    rationaleFeas:
      "Scheduling and reminders need data + notifications; payment execution touches Melio. Planning and nudges are feasible.",
    rationaleAI:
      'Agent can suggest "pay by X" and chase; also "just fix" with better due-date visibility and reminders. Agent adds proactive nudging.',
    billCreator: [
      "Paying late is embarrassing and I miss discounts. If the system nudge actually gets me to pay before due date, I'll use it.",
      "Reminders are useless if they're generic. 'You have 5 bills due' — which ones? When? What happens if I slip?",
      "I'm not going to open the app every day. Nudge me at the right time — e.g. 'Pay this by Friday or you lose the discount' — or I'll keep missing.",
    ],
    cautiousApprover: [
      "I'm often the bottleneck. If the system chases *me* so I don't hold up payment, that's good. But it has to be smart — not 10 reminders for the same bill.",
      "Due-date visibility should be in the approval queue. I shouldn't have to dig to see 'this is due in 2 days.'",
      "If something gets paid late because I sat on approval, I want to know. Accountability helps me clear the queue.",
    ],
    apClerk: [
      "Late payments are often because approvers didn't see it in time. So chasing approvers and due-date visibility have to go together.",
      "I need to see 'due in X days' and 'overdue' in my main view. If it's buried, we'll keep missing.",
      "Nudges are good only if they're actionable. 'Bill X is overdue' — fine. 'Consider paying' — not enough.",
    ],
  },
  {
    num: 5,
    title: 'Cash flow uncertainty and "caught short"',
    sev: 5,
    feas: 3,
    ai: 4,
    rationaleSev:
      '44% "caught short"; 35% say top challenge is having enough to pay bills. Core SMB pain.',
    rationaleFeas:
      "Needs cash position and simple guardrails; data and UX, not Melio-dependent for visibility.",
    rationaleAI:
      'Agent can surface "pay this vs that" and buffer impact; also fix with clear cash position and guardrails. AI helps prioritization.',
    billCreator: [
      "44% caught short — I've been there. If the system tells me 'paying these three today leaves you with $X' before I commit, I might stop getting caught.",
      "I don't need a fancy scenario model. I need 'you have $Y, these bills total $Z — proceed?' before I hit pay.",
      "If this is just another report I have to open and interpret, I won't use it when it matters. It has to be in the flow.",
    ],
    cautiousApprover: [
      "I don't want to approve a run and then find out we didn't have the cash. Show me the position before I approve.",
      "Guardrails matter. 'Warning: this run would bring balance below $X' — that's the kind of check I need.",
      "If the system lets me approve something that bounces or leaves us short, that's a failure. Block or warn, don't just inform after.",
    ],
    apClerk: [
      "I'm the one who has to fix the mess when we're caught short. Prevention in the approval or payment step is huge.",
      "Cash position has to be visible where we decide to pay — not in a separate dashboard nobody looks at.",
      "Uncertainty is the enemy. Give me a number: 'after this run, balance = $X.' Not 'your cash flow might be tight.'",
    ],
  },
  // 6–20: compact shape to keep file manageable
  {
    num: 6,
    title: "No clear cash position or simple guardrail before payment",
    sev: 4,
    feas: 4,
    ai: 3,
    rationaleSev:
      'Users don\'t see current/projected cash, major outflows, or impact of a payment run. No "paying this leaves $X buffer."',
    rationaleFeas:
      "Largely product + data: balance, projections, one guardrail view. No agent required for v1.",
    rationaleAI:
      '"Just fix" first: show position and a simple check. Agent later for "should you pay this now?" recommendations.',
    billCreator: [
      "I want one line: 'After this payment you'll have $X.' If I have to calculate it or open another screen, I'll skip it.",
      "Guardrail means: don't let me pay if it's stupid. 'You're about to go below your buffer' — yes, stop me or make me confirm.",
      "This is 'just fix' territory. Don't overthink it. Show the number, block or warn, done.",
    ],
    cautiousApprover: [
      "I need to see current balance and 'after this approval' balance. If I can't see it, I'm approving blind.",
      "Guardrail should apply at approval, not just at payment. Once I approve, it shouldn't execute if cash has dropped.",
      "Simple is good. Don't give me 10 metrics. One number: 'buffer after this run.'",
    ],
    apClerk: [
      "Cash position and guardrail are table stakes. If we're building an agent and we don't have this, we're building on sand.",
      "I need this in the same place I'm preparing the payment run. Context switch = I won't use it.",
      "Guardrail has to be configurable. My buffer might be $5k; another org might be $50k. Don't hardcode.",
    ],
  },
  {
    num: 7,
    title: "Manual, repetitive configuration (system doesn't learn)",
    sev: 4,
    feas: 4,
    ai: 5,
    rationaleSev:
      '"Customers expect the system to learn and automate against their preferences." Repeated entry of accounts, contacts, terms.',
    rationaleFeas: "We control product and data; learning defaults and applying them is buildable.",
    rationaleAI:
      '"learn and automate against preferences" is agentic by definition. Natural language rules (e.g. "all Amazon → 310-COGS") are AI.',
    billCreator: [
      "This is my biggest pain. I code the same supplier to the same account 50 times. If it doesn't learn after I do it twice, I'm done.",
      "Natural language rules — 'all Amazon goes to 310' — that's the dream. If I have to set up a form or dropdown every time, it's not learning.",
      "If I correct something and the system ignores it next time, I'll stop correcting. Then the data is wrong. Learning isn't optional.",
    ],
    cautiousApprover: [
      "I don't do the coding, but I see the mess when it's wrong. If the system learns from the clerk's corrections, fewer wrong codes hit my queue.",
      "I need to know what the system 'learned.' If it auto-applies a rule I didn't explicitly set, I want to see it and override.",
      "Learning is great as long as it's visible. No silent rules that change behaviour without me knowing.",
    ],
    apClerk: [
      "This is the one that would change my life. Same account, same supplier, same terms — I shouldn't type it again.",
      "Learning from corrections is non-negotiable. If I fix a code and the next bill for that supplier doesn't suggest it, the system is broken.",
      "I'm fine with the system proposing. I'm not fine with it applying without me seeing it. Show me what it learned and let me confirm.",
    ],
  },
  {
    num: 8,
    title: "Chasing approvers / approval bottlenecks",
    sev: 4,
    feas: 4,
    ai: 5,
    rationaleSev:
      'Chasing managers; overdue approvals; no smart reminders or escalation. ~120k orgs view "awaiting approval" monthly.',
    rationaleFeas:
      "Notifications, escalation rules, and in-product chase are in our scope. Payroll-chasing pattern exists.",
    rationaleAI:
      'Agent is the natural fit: proactive reminders, escalation, "who to chase," in-context nudge. High agent alignment.',
    billCreator: [
      "I'm not the approver — I'm the one waiting. If the system actually chases them so I don't have to send 'hey, can you approve?' emails, that's a win.",
      "~120k orgs see 'awaiting approval' every month and nothing happens. So either the system nudge works or we're just showing a number.",
      "Chasing has to be smart. Don't spam the approver. Nudge when it's due, escalate when it's overdue, and tell me when it's done.",
    ],
    cautiousApprover: [
      "I'm the one being chased. If the nudge is in-context — '3 bills need your approval, due in 2 days' — I'll do it. If it's another email I ignore, useless.",
      "Escalation is key. If I'm on leave, someone else needs to get it. If the system only nudge me and I'm the bottleneck, we're stuck.",
      "I don't want to be chased for low-risk stuff. Let me set 'auto-approve under $X' and chase me only for the rest.",
    ],
    apClerk: [
      "I'm the one who has to chase manually today. If the agent does it — reminders, escalation, 'who to chase' — I get my time back.",
      "Chasing has to be visible. I need to see 'reminder sent,' 'escalated to X,' so I know I don't have to pick up the phone.",
      "If the system chases but doesn't prioritise — e.g. chases for a $50 bill and ignores the $50k one — that's worse than no chasing.",
    ],
  },
  {
    num: 9,
    title: "Fragmented / single-step approval",
    sev: 4,
    feas: 2,
    ai: 3,
    rationaleSev:
      'No multi-step, conditions, or rules; approval before payment details. "Two signatories," Ramp envy.',
    rationaleFeas:
      "Baseline gap: needs event streaming, rules DB, Melio integration for multi-step execution. Hard in short term.",
    rationaleAI: 'Fix is "build the workflow" first; AI can then route and suggest. AI benefit comes after baseline.',
    billCreator: [
      "I need two signatories for some things. If the system can't do multi-step approval, I'll keep doing it outside Xero.",
      "This feels like a baseline fix, not an agent fix. Get the workflow right first, then add intelligence.",
      "Ramp has this. If we don't, we're behind. But don't promise it in the agent sprint if it's not buildable.",
    ],
    cautiousApprover: [
      "Multi-step and conditions are exactly what I need. One-step approval is why I'm either a bottleneck or we're under-controlled.",
      "If we're building approval and we don't have 'two signatories' or amount-based routing, we're building half a solution.",
      "Feasibility is the issue. I want it; I'm not sure we can ship it soon. Don't oversell.",
    ],
    apClerk: [
      "Single-step approval is why some bills sit with the wrong person and others fly through. We need routing and conditions.",
      "This is infrastructure. Agent can sit on top — e.g. 'route to X when amount > $Y' — but the plumbing has to exist.",
      "Until we have this, the 'chasing' problem is partly because the right person never got the request.",
    ],
  },
  {
    num: 10,
    title: "Fraud and error risk with no risk signal layer in approval",
    sev: 5,
    feas: 3,
    ai: 5,
    rationaleSev:
      "Real losses ($500k example); unusual amounts, duplicates, overpayment; no anomaly detection. Bills = where most fraud can happen.",
    rationaleFeas:
      "Anomaly detection and signals are buildable; surfacing in approval flow needs approval UX. Option C (Confluence) = AI-powered approval automation.",
    rationaleAI:
      '"risk signal layer" = AI/ML for anomaly, duplicate, vendor change. Human approver + AI context. Strong agent fit.',
    billCreator: [
      "I've heard the $500k story. If the system flags 'new supplier,' 'unusual amount,' or 'possible duplicate,' I want to see it before I approve or pay.",
      "I don't want to be the fraud detector. Give me signals; I'll decide. But don't let something obvious slip through.",
      "If the agent surfaces risk but I can't override with a reason, I'll get stuck. Flag, but let me say 'yes, I know, it's legit.'",
    ],
    cautiousApprover: [
      "This is why I'm cautious. I need a risk layer — anomaly, duplicate, new vendor, amount spike — before I approve. Without it, I'm signing blind.",
      "Audit trail has to include 'risk signals were reviewed.' If something goes wrong, I need to show we looked.",
      "Don't auto-approve anything without a risk check. Low risk + clean signals = fine. No signals = don't auto-approve.",
    ],
    apClerk: [
      "I'm the first line. If I'm entering 100 bills and one is a duplicate or a new supplier with a big amount, I need the system to flag it.",
      "Risk layer has to be visible in my workflow — not a separate report. Flag at entry or at approval, not after payment.",
      "I want to trust the system. If it misses an obvious duplicate and we pay twice, I'm the one explaining it. So the bar for 'good enough' is high.",
    ],
  },
  {
    num: 11,
    title: "Post-payment mess (reconciliation, verification)",
    sev: 4,
    feas: 4,
    ai: 3,
    rationaleSev:
      'Reconciliation "currently broken"; remittance advice and payment verification missing or weak. Clean-up painful.',
    rationaleFeas:
      "We own reconciliation and verification flows; product and integrations. Not primarily an agent problem.",
    rationaleAI:
      '"Just fix" reconciliation and verification first; agent could chase missing remittance or match payments later.',
    billCreator: [
      "Reconciliation is broken — I've given up on it being right. If the agent can chase missing remittance or match payments, that's a help.",
      "But don't sell me an agent for reconciliation if the core flow (matching, verification) is still manual. Fix the basics first.",
      "I care about 'did it get paid and do I have a record.' Fancy reconciliation is secondary.",
    ],
    cautiousApprover: [
      "I need to know payment was executed and I can verify it. Remittance advice and confirmation matter for audit.",
      "Reconciliation is the clerk's and accountant's problem. For me, 'payment confirmed' and 'here's the proof' is enough.",
      "If the agent only does pre-payment and reconciliation is still a mess, we've moved the problem, not solved it.",
    ],
    apClerk: [
      "Reconciliation is my nightmare. If the agent can match payments to bills and surface exceptions, I'll use it.",
      "This is 'just fix' first. Get verification and remittance in place; then agent can help with matching and chasing.",
      "Don't add agent complexity to reconciliation if we don't have clean data from the payment step. Garbage in, garbage out.",
    ],
  },
  {
    num: 12,
    title: "Low bill pay adoption (effort > value)",
    sev: 5,
    feas: 2,
    ai: 3,
    rationaleSev: "Only 10% create bills; 1% use bill payments. Strategic adoption gap.",
    rationaleFeas:
      "Fixing adoption touches journey, GTM, and value prop; Melio and baseline gaps make narrow PoC hard to tie to adoption.",
    rationaleAI:
      'AI can reduce effort (entry, approval, planning) and thus improve value; but "fix" is broad product/GTM. Agent supports, doesn\'t own adoption.',
    billCreator: [
      "Only 10% create bills, 1% use bill pay — because the effort is huge and the value isn't obvious. If you make entry and approval light, adoption follows.",
      "I won't adopt a feature that adds steps. You have to take steps away. Zero bill entry and smart approval is the pitch.",
      "Don't try to agent your way out of a value prop problem. Make the journey so light that using it is a no-brainer.",
    ],
    cautiousApprover: [
      "Adoption isn't my metric — control and audit are. But if more people use bill pay, I need the system to scale (routing, chasing, risk).",
      "If adoption goes up and we haven't fixed approval and risk, we're scaling a broken process. Fix the core first.",
      "I'm not the one who decides to adopt. But I'm the one who gets the queue when they do. So make sure the queue is manageable.",
    ],
    apClerk: [
      "More adoption = more volume for me. So reduce my load per bill or adoption just means more work.",
      "The adoption gap is real. Making entry and approval fast and trustworthy is how we close it. Agent can help; it can't do it alone.",
      "If we're selling 'zero bill entry' and adoption goes up, I need the system to learn and batch. Otherwise I'm drowning in exceptions.",
    ],
  },
  {
    num: 13,
    title: "No visibility into when/how bills will be paid",
    sev: 3,
    feas: 4,
    ai: 4,
    rationaleSev:
      'Users want clear "when and how" and chance to intervene. "Set and forget" without losing control.',
    rationaleFeas:
      "Visibility and control are product; scheduling and status can be improved without Melio APIs for planning.",
    rationaleAI:
      'Agent can "tell you the plan" and "let you intervene"; combines visibility with proactive communication.',
    billCreator: [
      "I want to know the plan — what's paying when, and can I change it? 'Set and forget' only works if I can peek and intervene.",
      "Visibility without control is frustrating. Show me the plan and let me move things or approve the run.",
      "If the agent 'tells me the plan' but it's in a report I never open, that's not visibility. Put it where I'm already looking.",
    ],
    cautiousApprover: [
      "I need to see what's scheduled before it goes. 'When and how' should be in the approval context — not a separate screen.",
      "If I approve and then the payment date changes without me knowing, that's a trust problem. Visibility = I see what's going to happen.",
      "Plan visibility is good. As long as I can still approve or reject the run; the plan shouldn't execute without me.",
    ],
    apClerk: [
      "One view: 'scheduled for payment,' 'pending approval,' 'on hold.' I shouldn't have to piece it together.",
      "When and how should be clear for each bill. If the agent proposes a date and I can adjust, that's the right level of control.",
      "Visibility has to be real-time. If the plan is stale because someone paid outside the system, show me the gap.",
    ],
  },
  {
    num: 14,
    title: "Bulk operations and repetitive edits",
    sev: 3,
    feas: 4,
    ai: 4,
    rationaleSev: "No bulk approve or bulk edit; lots of bill-by-bill work.",
    rationaleFeas: "Straightforward product: bulk actions, multi-select, batch apply.",
    rationaleAI:
      'Agent can suggest batches and apply in one go; also "just fix" with bulk UI. Agent adds intelligence to what to batch.',
    billCreator: [
      "Bulk approve, bulk edit, batch apply — yes. I don't want to click 50 times. But I need to see what I'm applying before I hit go.",
      "Agent suggesting *what* to batch is the upgrade. 'These 10 are same supplier, same account — approve together?' That's intelligence.",
      "If bulk is hidden or risky — e.g. I can't undo — I won't use it. Show me the list, let me deselect, then apply.",
    ],
    cautiousApprover: [
      "Bulk approval for low-risk items is exactly what I want. But the list has to be clear: what's in the batch and why it's low risk.",
      "I need an audit trail for bulk. 'Approved 10 bills in batch on [date] — criteria: amount < $X, known supplier.' Not just 'batch approved.'",
      "If bulk goes wrong, I need to be able to reverse or at least see what was in the batch. No black box.",
    ],
    apClerk: [
      "Bulk operations would cut my time in half. Multi-select, batch code, batch route — all of it.",
      "Agent suggesting batches is good — e.g. 'these 5 can go to the same approver.' But I need to confirm the batch before it's sent.",
      "Repetitive edits are the worst. If I change one field and can 'apply to all similar,' that's a win. As long as I can preview.",
    ],
  },
  {
    num: 15,
    title: "Melio / US flow constraints (feasibility ceiling)",
    sev: 4,
    feas: 1,
    ai: 2,
    rationaleSev:
      'Embedded, disconnected experience; no APIs for agentic "paying bills." Limits US automation.',
    rationaleFeas: 'Constraint, not something we "solve" in PoC. Design within it; API-free ideas vs future.',
    rationaleAI:
      "Without APIs, agent can't \"pay\" in Melio flow; agent fits planning, approval, chasing—not execution in US.",
    billCreator: [
      "If I'm in the US and the experience is disconnected, I don't care how good the agent is — I can't use it where it matters.",
      "Design for what we can do: planning, approval, chasing. Don't promise 'agent pays your bills' in Melio if the APIs aren't there.",
      "This is a constraint, not a concept. We need to be honest: US users get planning and approval; execution is Melio's world until that changes.",
    ],
    cautiousApprover: [
      "I approve in Xero; payment might happen in Melio. If the agent can't see execution status, my 'approved' queue is never accurate.",
      "Don't sell full automation in the US until we have the integration. Partial value — e.g. smarter approval queue — is still value.",
      "Constraint is real. I'd rather have a clear scope than a promise we can't keep.",
    ],
    apClerk: [
      "Melio constraint means I might be prepping in Xero and paying elsewhere. Agent can still help with prep, matching, chasing — just not execution in US.",
      "We have to be clear with users: 'agent helps you get ready to pay; payment runs in Melio.' No confusion.",
      "If we add more agent features and they don't work in the US flow, we're building for a subset. Document the boundary.",
    ],
  },
  {
    num: 16,
    title: "Early-pay discount value invisible",
    sev: 3,
    feas: 4,
    ai: 4,
    rationaleSev: 'No discount value, annualized return, or "early pay ROI" lens.',
    rationaleFeas: "Calculation and display are product + data.",
    rationaleAI:
      'Agent can "suggest take this discount" and explain ROI; combines visibility with recommendation.',
    billCreator: [
      "I leave money on the table because I don't see the discount. If the system shows 'pay by X, save $Y' or 'annualized return Z%,' I'll act.",
      "Don't just show the discount — tell me if it's worth it. '2% if you pay in 10 days' — what's that in dollars for this bill?",
      "If it's buried in a report, I won't look. Surface it where I'm deciding to pay.",
    ],
    cautiousApprover: [
      "I'll approve early if I see the value. 'Approving this early saves $X' — that's a clear reason to prioritise.",
      "Discount visibility should be in the approval context. I'm not going to open a separate screen to check.",
      "If the system suggests 'approve early for discount' and I can one-click, that's good. If I have to calculate, I'll skip.",
    ],
    apClerk: [
      "I'm the one who could be capturing discount data. If the system calculates and displays it, I can suggest early payment to the approver.",
      "Discount value has to be on the bill or in the payment run view. Not in a separate 'savings report.'",
      "Annualized return or simple $ saved — either works. Just make it obvious so we stop missing discounts.",
    ],
  },
  {
    num: 17,
    title: "Payment rail / PSP choice opaque",
    sev: 3,
    feas: 3,
    ai: 3,
    rationaleSev: "Users don't know cheapest vs fastest vs best for float; no optimization or PSP routing.",
    rationaleFeas: "Routing and optimization depend on PSP/Melio capabilities and data. Partly out of our hands.",
    rationaleAI: 'Could be "just fix" (explain options) or agent (recommend rail). Medium either way.',
    billCreator: [
      "I don't know which rail is cheapest or fastest. If the system recommends or explains, I might care. Right now I just pick one.",
      "This feels like a 'nice to have.' Fix entry, approval, and cash visibility first. Then we can optimise rail.",
      "If the agent recommends a rail and explains why — 'card is 2% but you get 30 days float' — I'd trust it. Vague recommendation = ignore.",
    ],
    cautiousApprover: [
      "I don't choose the rail — the clerk or system does. I just need to know the payment went through. So this is lower priority for me.",
      "If rail choice affects cost or timing, surface that at approval. 'This will be paid via X; cost $Y.' So I'm informed.",
      "Opaque is bad for audit. We should know how we paid and what it cost. Clarity over optimisation.",
    ],
    apClerk: [
      "I'd use a recommendation if it was clear — 'use ACH for this one, save $X vs card.' If it's opaque, I'll stick to habit.",
      "PSP choice might be out of our hands in Melio. So this might be a future-state concept until we have more control.",
      "Cost and speed matter. If the system can't show me the trade-off, I can't make a better choice.",
    ],
  },
  {
    num: 18,
    title: "No cash scenario or stress testing",
    sev: 3,
    feas: 3,
    ai: 4,
    rationaleSev: 'Can\'t ask "what if I delay top 5 / AR slips / FX moves?"',
    rationaleFeas: "Scenario modeling needs data and product; no Melio dependency.",
    rationaleAI:
      'Agent can run scenarios and summarize "if you delay these, here\'s the impact." Good agent use case.',
    billCreator: [
      "What if I delay these five? What if AR slips? I'd use that. But it has to be simple — 'if you delay, here's your position in 30 days.'",
      "Don't give me a full financial model. Give me one or two scenarios that matter for the next payment run.",
      "If the agent runs scenarios and summarizes, I'm in. If I have to build the scenario myself, I won't.",
    ],
    cautiousApprover: [
      "Scenario testing is useful for the business owner. For me, 'what if we approve everything in the queue' — cash impact — is enough.",
      "I want to know we're not approving into a cliff. 'If all these are paid, balance = X' is a simple scenario.",
      "Stress testing sounds like finance. Keep it simple for approval: buffer after this run, buffer if we delay.",
    ],
    apClerk: [
      "I'd run scenarios for planning — e.g. what if we take all early-pay discounts vs none. Agent could do that and summarize.",
      "Scenario has to be based on real data. If the model is wrong because bills were entered late, the scenario is wrong.",
      "Useful but not urgent. Get the basics right first — position, guardrail, plan — then add scenarios.",
    ],
  },
  {
    num: 19,
    title: "Guardrailed auto-approval missing",
    sev: 4,
    feas: 3,
    ai: 5,
    rationaleSev: 'Auto-approval is all-or-nothing. No "auto-approve when low risk" with clear audit.',
    rationaleFeas: "Needs rules engine, risk signals, and approval baseline. Feasibility tied to #9 and #10.",
    rationaleAI:
      '"when low risk (trusted vendor, in range, no anomaly, buffer OK)" = agent + rules.',
    billCreator: [
      "I want auto-approve when it's safe — known supplier, under $X, no red flags. I don't want to approve 50 subscriptions one by one.",
      "But I need to see what was auto-approved. If it's invisible, I'll turn it off. Audit trail is non-negotiable.",
      "Rules have to be mine. 'Auto-approve under $500 for these suppliers' — I set it, I can change it.",
    ],
    cautiousApprover: [
      "This is the dream: low-risk stuff goes through, I only see exceptions. But 'low risk' has to be defined — amount, supplier, no anomaly.",
      "If we auto-approve without a risk check, we're asking for trouble. Guardrails = risk layer + amount + my rules.",
      "I need to be able to reverse or override. And I need a report: 'here's what was auto-approved this week.' Full visibility.",
    ],
    apClerk: [
      "Auto-approval would clear my queue for the routine stuff. I'd still code and match; approval would be automatic for under-threshold.",
      "Guardrails have to include duplicate check and new-supplier flag. Don't auto-approve the first time we see a supplier.",
      "I want to see what's auto-approved so I can spot mistakes. If it's hidden, I can't fix it.",
    ],
  },
  {
    num: 20,
    title: 'Obligation detection / no "financial memory"',
    sev: 4,
    feas: 3,
    ai: 5,
    rationaleSev:
      "Invoices/obligations not detected from email, bank, subscriptions, SMS/photo. Things get missed or entered late.",
    rationaleFeas: 'Requires ingestion, matching, and "memory"; significant build.',
    rationaleAI: '"financial memory" and proactive detection are agentic. High AI benefit.',
    billCreator: [
      "If the system detected bills from email, bank, or photo and said 'you might have missed this,' I'd use it. Things slip today.",
      "Financial memory — the system knows my suppliers, my subscriptions, my patterns — that's the agent. Without it, we're just forms.",
      "Detection has to be accurate. False positives ('is this a bill?') and I'll turn it off. Show me confidence or let me confirm.",
    ],
    cautiousApprover: [
      "Obligation detection could flood my queue with 'maybe' bills. I need clear 'this is a bill, here's the amount' — not a pile of maybes.",
      "If the system detects and creates a draft, I'm fine. If it auto-approves detected items, we have a problem.",
      "Financial memory is powerful. I'd want to know what the system 'remembers' and how it's used. No silent inference.",
    ],
    apClerk: [
      "Detection from email and bank would reduce what I have to enter. But I need to verify before it becomes a bill — no auto-create without review.",
      "Learning and memory are the key. If the system remembers 'this supplier, this account, this approval path,' my job gets easier.",
      "Don't promise detection if we can't do it well. Half-baked detection = more work for me to correct. Do it right or don't do it.",
    ],
  },
];
