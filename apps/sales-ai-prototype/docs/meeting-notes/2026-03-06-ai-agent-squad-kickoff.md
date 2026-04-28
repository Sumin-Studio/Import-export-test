# AI Agent Squad Team kick-off — 6 Mar 2026

**Attendees:** Rory Baker, Dhruv Patel, Tauqir Ahmed, Dillon Gearing, David Brown, Mugdha Kulkarni, Chong Xu, Merv Joe, Mike Green, Lili Kan, Jon Bell (designer, Wellington).

---

## Summary

- AI Agent Squad kick-off for payments platform team.
- Aggressive timeline driven by market pressure and competitive landscape (QuickBooks, Sage, Ramp making significant AI announcements); goal to leapfrog competition, not just catch up. Half of features in beta before July Xero Con announcement.
- Squad approach: lean cross-functional teams moving in parallel; 100% allocation expected for key members (e.g. Tauqir, Mugdha; Dhruv delayed for wrap-up).
- Strategic vision: cash flow–centric AI; agents orchestrated to optimize same cash flow goals (e.g. payment chasing agent coordinates with bill deferral recommendations).
- Proposed agent suite (bill-side focus first): Bill Enrichment (Dhruv), Approval Automation (Jon/Tauqir squad), Bill Runner (Jon/Tauqir squad), Safety Shield/Compliance Manager, Zero Onboarding.
- Implementation: focus on bill-side automation (B2B); customer validation critical but maintain speed (real-time demos preferred); quality and trust paramount; feasibility testing and timeline validation needed.

---

## Team formation & context

- Chong: PM lead on payment platform and AI effort for payments; shift in speed/velocity since December; Diya expectations that agents are competitive and unique.
- David: Chasing agent gave learnings with data science/ML; will tee up time with Daryl’s team for their six months of techniques and thin-slice sprint (recording for async).
- Squads: lean teams with PM, engineering, design; move in parallel; flexibility on rituals (Slack channel to start); weekly updates to leadership for dependency surfacing.
- Comfort with ambiguity; “no ceilings”; leverage across company — this is above-everything priority.

---

## Strategic vision: cash flow–centric AI

- Three differentiators: (1) **One ledger, one cash flow** — agents coordinated/orchestrated (chasing agent + bill deferral example); (2) **Zero friction** — reduce 23+ clicks to one, learn from patterns, gain trust; (3) **AB/partner hub** — cross-client insights and bulk actions (later; agents on left need to be ready first).
- David: system of record + system of action; predict, optimize, execute, protect; orchestration of independent agents aware of each other and cash flow state.
- Payroll: acknowledged as important for cash flow; not immediate focus; cash flow manager hasn’t considered payroll/tax yet — need to talk to relevant teams. Dillon encouraged to keep finding those connections; cast web wide but also define thin slice for today.

---

## Proposed agent suite (bill-side)

| Agent | Lead / squad | Scope |
|-------|----------------|--------|
| **Bill Enrichment** | Dhruv | Auto-populate account codes, tax info from supplier patterns; reduce manual entry across recurring bills. |
| **Approval Automation** | Jon/Tauqir squad | Reduce 23+ clicks to single approval; pre-configure from business patterns and preferences. |
| **Bill Runner** | Jon/Tauqir squad | Intelligence on what bills to pay/defer, payment method optimization, anchored on cash flow position and projections. |
| **Safety Shield / Compliance Manager** | — | Error prevention, duplicate detection, threshold monitoring, PO matching validation. |
| **Zero Onboarding** | — | 30-second setup via chatbot with background automation (bank feeds, payment setup, subscriptions); review and 1–2 clicks. |

Also mentioned: **Doc In (batch/recurring)** — go into inbox, search past X days/weeks, create bills from recurring patterns (QuickBooks/Sage announced similar).

---

## Implementation approach

- **Focus:** Bill-side (B2B) first; more automation opportunity than consumer invoicing; Melio growth and US expansion.
- **Validation:** Customer validation critical; real-time demos preferred over concept-only; feature-by-feature vs bundled approach TBD. Merv: need a plan (user profiles, desirability per feature). David: conceptually they might say yes; need to see it — build fidelity for demos.
- **Quality/trust:** Competitors’ agents reportedly performing poorly; non-deterministic nature requires extensive testing; auto bank rec cited as successful precedent with high accuracy (still some anomalies). Feasibility testing and quality measurement need to be in timeline.
- **Timeline:** Aggressive; spreadsheet with Xero Con–focused months; ~half of features in beta before announcement, rest within 90 days. Chong: encourage PMs to get high confidence on delivery time in next couple of weeks; flag if timeline not realistic.
- **Architecture:** Merv asked for principal-engineer-level validation for architectural decisions/ADRs; Lili: reviewers don’t have to be on project (follow existing design review process).

---

## Decisions

- Squad model: lean cross-functional squads, move in parallel; key people 100% where confirmed (Tauqir, Mugdha; Dhruv delayed).
- Slack channel for whole team (updates, problems, best practice); Jon to set up / repurpose and rename (everyone already invited).
- Weekly updates to leadership for dependency surfacing.
- Customer research plan required (Merv/David coordinating); architectural validation process for engineering decisions.
- PRD development and feasibility testing to begin immediately; timeline validation needed.

---

## Action items

| Owner | Action |
|-------|--------|
| **Jon** | Set up / finalize Slack channel for squad coordination (rename; everyone invited). |
| **Chong / Lili / David** | Weekly updates to leadership; surface dependencies. |
| **PMs (e.g. Dillon, Rory)** | In next couple of weeks: high confidence on delivery timeline; flag if not realistic; backward milestones. |
| **Squads** | Define thin slice MVP; feasibilities; identify dependencies; link canvases / lightweight docs before full PRD where helpful. |
| **David / Lili** | Tee up session with Daryl’s team (chasing agent learnings); recording for async. |
| **Merv / David** | Customer research plan (how to validate: feature-by-feature vs bundled; user profiles; desirability). |
| **Lili / Kate** | Confirm engineering peer for Tauqir (capacity/timing TBD). |
| **Stakeholder map** | Create artifact so people know who to talk to (suggested in meeting). |

---

## Other notes

- **Competitor channel:** Lili noted a Competitor channel useful for seeing how competitors’ agents look; Ramp has compliance-manager-style and one-click approval; keep table stakes in mind (e.g. Intuit chasing has late fees we don’t).
- **OKRs:** No specific OKR for this yet; FY27 will have; currently Q4.
- **PMM:** Not in meeting but key for packaging and customer claims; early quantitative/qualitative feedback strengthens value proposition.
- **Diya (Chong):** “If this is not the time to go bold, there’s no other time.”
