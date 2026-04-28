# Safety Shield Prototype Review — 16 Mar 2026

Meeting notes. Attendees and source: see PROJECT-STATUS / INDEX.

---

## Safety Shield Prototype Review

- **Rory’s prototype** successfully demonstrates core UX flow:
  - New column in bills list with risk indicators
  - Hover popover shows risk details
  - Click-through to detailed bill view with risk information
- **Jon** strongly supports directional approach:
  - UX foundation likely set for long-term vision
  - Focus needed on specific actions (approve / dismiss / investigate)
  - Jacks integration point identified but not detailed yet

---

## Design Refinements Needed

- **Competitive analysis** would be helpful — especially Ramp video screenshots for stakeholder comparison
- **Quick view on bills page** compatibility check — ensure prototype holds up in split-screen view
- **Duplicates functionality integration** — need to understand existing duplicate detection capabilities and what’s available for free
- **Actions and suggested next steps with Jacks** — best practices exist for Jacks integration; Jon on team developing agent interaction standards

---

## Technical Architecture Discussion

- **Tauqir** exploring leveraging existing duplicate API:
  - Dylan’s document outlines transition from ICN to Horizon events
  - Potential to extend duplicate API for other risk detectors
  - Need session with **Sunny** (Bills engineer) for implementation review
- **Shield vs duplicate API** decision pending:
  - Pros/cons analysis needed for build vs leverage approach
  - Both systems need same data source (Horizon events)

---

## UX Philosophy and Approach

- **Jon’s design philosophy:** prototype-first with contextual annotations; prefers “cooking in open kitchen” approach over extensive Miro boards. Aims for progressive disclosure: column → popover → detailed page → Jacks handoff.
- **Three-button concern** (approve / dismiss / investigate):
  - Dismiss functionality should be more subtle (e.g. X in corner)
  - Avoid duplicate approve buttons by integrating with existing flow
- **End-to-end customer value focus** — Rory consistently emphasizing user value over feature delivery

---

## Stakeholder Strategy

- **Early and often sharing:** Jon plans to send 1-minute video immediately for feedback; “bike shedding” technique to generate productive discussion. Show and Tell Wednesday as demonstration, not approval gate.
- **Xero’s current environment:** Chong driving fast changes, creating organizational tension; success depends on impressive prototypes cutting through process (battle of the bands vs button-down process approach).

---

## Future Vision and Scope

- **UX foundation** potentially complete after current refinements — same pattern scales: list → detail → progressive disclosure → agent handoff. Walk/run versions focus on backend intelligence, not UX changes.
- **Hollywood vision** needed for stakeholder buy-in: voice interaction future state (person talking to phone); 3–5 slides showing magical end state; minimal effort for maximum stakeholder impact.

---

## Next Steps

| Owner | Action |
|-------|--------|
| **Jon** | Send prototype video with caveats to design team and stakeholders |
| **Jon** | Review Jacks integration patterns and best practices |
| **Jon** | Schedule session with **Andrew Goodman** re: LLM explanation layer |
| **Rory** | Continue prototype refinements based on feedback |
| **Rory** | Meeting with stakeholders on naming and storytelling |
| **Tauqir** | Complete architectural analysis with Dylan’s document |
| **Tauqir** | Session with **Chris** (new engineer on Just Pay agent team) |
| **Team** | Show and Tell presentation Wednesday (Tauqir unavailable) |
