# Agent ideation process walkthrough — Brett Edmonds, Di Pierce, Darryl Powell

**Date:** Feb 13, 2026  
**Attendees:** Brett Edmonds, Di Pierce, Darryl Powell, Angus Tait, Jenny Nedanovski, Maarten Idema, Dale Thornton, Robb Schiller, Chong Xu, David Brown, Neeraj Sahu, Prashant Ranchhod, Jon Bell, others (Platform, Payments)  
**Links:** [Video](https://drive.google.com/file/d/1CP3nk5Ne-93lJ3XE9wQ8-IDJAzTEqUPM/view) | [Google Doc](https://docs.google.com/document/d/1d8oyS19X8GA5TqqKo8WNOw3M7NZcvNjWZjikiXZR-vY/edit?tab=t.tw1medieyice)

---

## Purpose

Brett’s team ran an experimental **four-day sprint** (Nov/Dec) to maximize AI across the design process for the **payer chasing agent**. They shared the process so the Bill AI / agent sprint group can reuse and adapt it.

---

## Summary

- **Phases:** Preparation → Diverge → Converge (same as today, but with AI-specific activities in each).
- **Tools used:** ChatGPT (best quality), Gemini, Glean. All context was **markdown files** in a project folder; every chat started with “read these files, confirm, do not act.”
- **Volume:** ~90 ideas (50–60 unique); ideas were rich (what, who for, how). Designer role shifted from **generator → verifier**; domain expert (Darryl) was critical.
- **Convergence:** Personas as “synthetic users,” plus business goals and “never do” constraints. Two rounds of **real user testing**; Figma Make turned text ideas into wireframes in ~2 hours.
- **Horizons:** First two days H2 (future), then brought back to H1 (current constraints). Stakeholders found H1 output “underwhelming” (expected big vision); design wanted more vision, product was happy with buildable output.
- **Learning:** Document accuracy is paramount; AI over-indexed on one persona need until they fixed the source docs. Human-in-the-loop is non-negotiable.

---

## Key insights (for Bill AI)

### Preparation is the lever

- **Day 1 = gather + structure into markdown.** Scope, success metrics, “never do,” design principles, domain (sitemap, architecture), user (CJF, personas, modes), research, vision (e.g. Jack).
- **Everything as markdown** so the model doesn’t pick what matters from slides/docs and doesn’t drift; every step grounds in those files.
- **Quality of input = quality of output.** Bad or inconsistent persona needs → AI over-indexes; they had to refine docs mid-sprint.
- **Effort:** ~1 day with 3 people for gather+structure; more prep (master prompts, collation) before the sprint.

### Divergence: dimensions + expansion

- **Opportunity Solution Tree (OST):** Business metric → opportunities → “how might we.” AI built first two layers; stakeholders validated.
- **Ideation dimensions** (e.g. aggressiveness, configurability): AI ideated along 8–9 dimensions; they pushed “more extreme” on each.
- **Expansion techniques:** Substitute, modify, rewrite, combine, eliminate, etc. — volume explodes; need deliberate convergence.
- **Limit ideas per “how might we”** (e.g. 5 not 10) or humans can’t absorb. Tag/classify (e.g. “no-brainer,” “novel”) before expanding.

### Convergence: synthetic users + constraints

- **Personas as synthetic users:** “You are [persona]. Evaluate these ideas by risk/value.” Use to cut volume, not replace human testing.
- **Converge on value first, then risk** (they’d do value-first next time).
- **Use “never do” and scope** in evaluation (e.g. “we’re never building a CRM”).
- **Multiple chats:** At least one per day; when a chat degrades, start fresh and re-ground with “read these files, confirm.”

### Role shift and who’s in the room

- **Designer = verifier, not generator.** Experts become more important — only they can judge quality.
- **Domain expert in the room** is essential (Darryl for chasing); otherwise one person carries all domain decisions.
- **Continuity:** Whoever does detailed design after the swarm should be in the room so context carries forward.

### Stakeholder expectations and visuals

- **Set expectations:** Output was “maximal learning” via low-fi wireframes (Figma Make), not high-fi vision. Leaders expected “amazing future vision” and were underwhelmed by H1-focused, buildable output.
- **If iterating:** Spend first 2–3 days on H2 vision + value-based testing, then 2 days pulling back to H1 deliverable — and make the exciting H2 bit visible (e.g. narrative or visuals) before converging.

### Time horizons

- They did **H2 + H1 in one 4-day sprint:** diverge on future, then apply current sitemap/tech/product constraints to get to “what we can ship.”
- **Structured horizons help:** E.g. “Horizon 2: world in 3 years; Horizon 1: constrained by X, Y, Z.” Feed that in if you have it.

---

## Suggested next steps (from meeting)

- Di: Work with GG so research outputs are markdown by default.
- Brett/Di/Darryl: Package process into **plays** the group can pick up and use.
- Brett: Share materials (prompts, markdown examples) later that day.

---

## How we use this in Bill AI — The AI Design Swarm Technique

We're calling this method **The AI Design Swarm Technique** and adopting it as a new way of working for Bill AI.

- **Prep:** Build a curated markdown "database" for the bill agent (scope, success metrics, constraints, personas, CJF, strategy) — don't rely only on Glean.
- **Plays:** Use preparation → OST → dimension-based divergence → expansion → synthetic-user convergence → human testing as a repeatable sequence; adapt dimensions to bills (e.g. autonomy, approval level, Melio/API constraints).
- **Expectations:** Align with Chong/stakeholders up front: are we optimizing for vision narrative, buildable H1, or both, and what fidelity do we show when.
- **The AI Design Swarm Technique (plays + 11-prompt journey):** See [2026-02-13-brett-agent-ideation-process.md](../reference/2026-02-13-brett-agent-ideation-process.md).
- **Source files & templates:** See [2026-02-13-design-swarm-source-files.md](../reference/2026-02-13-design-swarm-source-files.md) for Brett's actual markdown files and our draft Bill AI adaptations.
