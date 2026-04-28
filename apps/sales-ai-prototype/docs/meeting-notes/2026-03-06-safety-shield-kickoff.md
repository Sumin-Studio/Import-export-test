# Safety Shield & Bill Approval Agent Kickoff

**Date:** 2026-03-06
**Attendees:** Jon Bell, Tauqir, Rory

## Team Introductions & Working Approach

- Jon Bell: Principal Product Designer at Xero, Wellington-based (8 years, dual citizen)
- Tauqir: Product manager working on Safety Shield agent
- Rory: Working on PRDs for Safety Shield and bill approval agents
- Jon's philosophy: Focus on helping stakeholders succeed, get them promoted
- Agreement to over-communicate in group chat moving forward

## Agent Architecture & Separation

- **Safety Shield agent**: Anomaly detection service for bills
  - Flags duplicates, unusual amounts, first-time suppliers
  - Provides metadata/insights on bills as separate service
  - Multiple UI consumers can call this service
- **Bill approval agent**: Separate entity handling approval workflows
  - Current non-agentic version only has user permission-based rules
  - No detailed approval workflow rules yet (like amount thresholds, supplier-specific rules)
  - First iteration: prepare payment vs make payment permissions only
- Mental model: Safety Shield detects issues, Bill Approval routes based on rules
  - Potential handoff point between agents identified
  - Compartmentalization preferred for faster shipping

## UI Prototypes & Entry Points

- Desktop prototype discovered showing "awaiting approval" screen with anomaly flags
  - Source: Either Chong or from Niraj's PRD
  - Shows bills with warning indicators and suggested actions
  - Represents another consumer of Safety Shield service
- Spotlight feature: New homepage suggestion box launching
  - Will highlight most important intelligent insights
  - Agents will periodically appear here as entry point
  - US market getting cash flow display instead initially
- Story framework: Homepage insight -> user interaction -> potential full automation

## Next Steps

- Rory: Share Safety Shield PRD focused on problem understanding (duplicates, fraud, anomalies)
- Team: Resolve "spiciest assumption" about whether these are separate agents vs integrated
- All: Maintain constant communication to avoid previous sprint alignment issues
- Follow-up meeting: Tuesday (Monday is holiday)
