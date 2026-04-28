# The AI Design Swarm Technique — a new way of working

**What it is:** A compressed, AI-maximized design process where AI is a **co-designer across every stage** — not just idea generation and refinement (where most teams stop), but also scope definition, material structuring, evaluation, and selection.

**Origin:** Brett Edmonds, Di Pierce, Darryl Powell — Nov/Dec 2025, payer-chasing agent.  
**Research basis:** 61 studies analyzed. Most teams use AI for idea generation (61/61) and refinement (39/61). Almost nobody uses it for scope definition (3/61) or multi-idea selection (4/61). The AI Design Swarm Technique uses it everywhere.  
**Why we're adopting it:** We want to imitate this approach for Bill AI. It produced ~90 ideas (50–60 unique) in 4 days with 3 people, covering both H2 vision and H1 buildable output, with two rounds of human testing — a level of exploration that would take weeks manually.

**Full meeting capture:** [Meeting note](../meeting-notes/2026-02-13-agent-ideation-walkthrough-brett.md) | [Video](https://drive.google.com/file/d/1CP3nk5Ne-93lJ3XE9wQ8-IDJAzTEqUPM/view) | [Google Doc](https://docs.google.com/document/d/1d8oyS19X8GA5TqqKo8WNOw3M7NZcvNjWZjikiXZR-vY/edit?tab=t.tw1medieyice)  
**Source files & templates:** [AI Design Swarm Technique source files](2026-02-13-design-swarm-source-files.md)  
**Slide images:** Stored in project `assets/` — see [visual reference](#visual-reference) below.

---

## The 3 phases, 7 stages

| Phase | Stage | What happens |
|-------|-------|-------------|
| **1. Preparation** | 1. Scope definition | Define problem, goals, metrics, scope, constraints, vocabulary |
| | 2. Foundational material collection (5 types) | Guidelines, background, personas, data, ideation materials — all as markdown |
| | 3. Foundational material structuring | Cluster, prioritize, filter; build OST first two layers |
| **2. Divergent** | 4. Idea generation | Wide-angle ideas per HMW using dimensions/spectrums |
| | 5. Idea refinement | Expand, substitute, modify, combine, eliminate; push to extremes |
| **3. Convergent** | 6. Idea evaluation | Synthetic users + business goals + constraints → converge |
| | 7. Multi-idea evaluation & selection | Cluster, rank, select; stakeholder review; H1 convergence |

All stages followed a **structured prompt designed ahead of the swarm** (the "Master Setup Prompt").

---

## The 11-prompt journey (from slides)

This is the actual sequence Brett's team ran over 4 days:

| # | Prompt / Event | Phase | What it does |
|---|----------------|-------|-------------|
| **P1** | Load and understand files | Prep | "Read these files, confirm, do nothing else." |
| **P2** | Create first 2 layers of OST | Prep | Business metric → opportunities, using all persona + scope files |
| **P3** | Refine and reframe core customer problems | Prep | Sharpen problems as opportunities |
| | **STAKEHOLDER SESSION 01** | Prep | Align on scope, refine opportunities |
| **P4** | Generate wide range of ideas for each HMW | Diverge | 5 ideas per HMW; who, what, how for each |
| **P5** | Consider business & customer goals; identify top 30 | Diverge→Converge | Evaluate on goals, innovation, exploration potential |
| **P6** | De-dupe, group, and synthesize all ideas | Converge | Cluster and clean |
| **P7** | Use ideation method spectrums to diverge again | Diverge | 3 ideas per idea group using dimensions (Pole A + Pole B) |
| **P8** | Use persona files to identify highest-risk ideas | Converge | Synthetic user evaluation → flag risk |
| | **FIGMA MAKE** | Prototype | Translate high-risk assumptions into discrete prototypes |
| | **HUMAN USER TESTING 01** | Test | Test the riskiest assumptions with real users |
| **P9** | Take Pole B of spectrums; push to extreme | Diverge | Force maximum exploration of each dimension |
| **P10** | Cluster all extreme ideas; write concept descriptions | Converge | Group into coherent concepts |
| | **STAKEHOLDER SESSION 02** | Evaluate | Stakeholders evaluate ideas |
| **P11** | Refine ideas on business goals, customer needs, H1 constraints | Converge | Bring future ideas back to buildable reality |
| | **FIGMA MAKE** | Prototype | Translate assumptions into basic user flow |
| | **HUMAN USER TESTING 02** | Test | Test assumptions, define CVP |
| | **FIGMA MAKE** | Prototype | Translate learnings into key interactions along the flow |

**Key pattern:** Diverge → converge → diverge → converge, with stakeholder and human-testing checkpoints breaking the loop. New chat at least per day; re-ground every time.

---

## Core principle

**Curate a trusted context base first.** Don't skip to "ask Glean for ideas." Build markdown files the model is forced to read and ground in. Quality of input = quality of output; document accuracy is the most important thing.

> "Without accurate documents, the model over-indexes on the wrong things." — Brett

---

## Play 1: Preparation (before divergence)

| What | How |
|------|-----|
| **Scope** | Success metric(s), "never do," design principles. |
| **Domain** | Sitemap, architecture, product constraints. |
| **User** | CJF, personas, modes — in **markdown**. Structured consistently. Each persona includes a "Refinement & Critique Profile" (how they evaluate ideas) and an "Evaluation & Testing Profile" (how AI roleplays them). |
| **Strategy / vision** | Agent vision, competitive, voice/tone, playbook patterns. |
| **Ideation methods** | Design spectrums/dimensions (Pole A ↔ Pole B). |
| **Output** | All of the above as markdown in one project/folder. Every new chat: "Read these files. Confirm. Do nothing else." |

**Bill AI adaptation:** Reuse strategy/principal brief, POC sprint doc, workshop outputs (top problems, Chong/Lili scores). Add: bill-specific personas with critique + testing profiles, current bill UX flow, Melio vs non-Melio boundaries, competitive (QBO, Ramp, BILL.com). Aim for a single "context pack" — see [source files doc](2026-02-13-design-swarm-source-files.md) for templates and our draft Bill AI file inventory.

---

## Play 2: Opportunity Solution Tree (OST)

| What | How |
|------|-----|
| **Layers** | Business metric → opportunities (customer needs) → "how might we" (ideas slot in later). |
| **AI role** | Feed context; ask for first two layers. Reframe with prompts. |
| **Human role** | Stakeholders validate: "Are these the right opportunities? Do we focus on 2–3?" Allow scope to shift. |

**Bill AI:** Top of tree = "Bills ready to pay on creation" or "Adoption of bill pay." Opportunities = from workshop (trust, fraud, data entry, approval speed, cash flow forecasting). HMWs flesh out each opportunity for ideation.

---

## Play 3: Divergence — dimensions + expansion

| What | How |
|------|-----|
| **Dimensions** | Define Pole A ↔ Pole B spectrums. AI ideates along these; push "more extreme." |
| **Volume control** | Cap ideas per HMW (e.g. 5). Tag/classify (no-brainer, novel, no) before expanding. |
| **Expansion** | 8 techniques: expansion, modification, substitution, rewriting, multiple perspectives, questioning, eliminating, combining. New chat when thread degrades. |

**Bill AI dimensions:** See [source files doc — Bill AI dimensions table](2026-02-13-design-swarm-source-files.md#adapting-these-for-bill-ai) for 10 drafted dimensions (entry autonomy, approval autonomy, data source, trust/fraud, supplier matching, payment timing, configurability, learning/adaptation, auditability, scope of action).

---

## Play 4: Convergence — synthetic users + constraints

| What | How |
|------|-----|
| **Synthetic users** | "You are [persona]. Evaluate these ideas by [value / risk]." Reduce volume. |
| **Criteria** | Business goals, customer goals, "never do," most innovative / exploration potential. |
| **Order** | **Value first, then risk** (Brett's retrospective improvement). |
| **Human testing** | Synthetic users don't replace real users. Plan at least one round. |

**Bill AI:** Segment-based personas (small high-volume, cautious approver, AP clerk). Constrain with "we're not building a CRM," "Melio has no APIs today," "baseline-first."

---

## Play 5: Prototyping and stakeholder expectations

| What | How |
|------|-----|
| **From text to UI** | Rich idea text (what, who for, how) → Figma Make / Cursor / Claude → wireframes for learning. |
| **Expectations** | Clarify up front: maximal learning vs high-fi vision vs buildable H1. |
| **Horizons** | Option: 2–3 days H2 vision + value testing, then 2 days pull back to H1. Show the exciting H2 bit before converging. |

**Bill AI:** Set Chong/product expectations up front. Prototype riskiest or highest-value ideas first. Use workshop problem list to drive HMWs.

---

## Play 6: Who's in the room and continuity

| What | How |
|------|-----|
| **Roles** | Domain expert, AI-fluent facilitator, design intuition. Designer = verifier, not generator. |
| **Continuity** | Whoever owns detailed design after the swarm should be in the room. |

**Bill AI:** Domain expert (Pratik, Michael, Jenny, or Rob for bills/AP/approval); design lead for continuity into detailed design.

---

## Checklist: before we run a Bill AI Design Swarm

- [ ] **Context pack built:** Scope, metrics, constraints, personas (with critique + testing profiles), journey maps, OST (or draft), strategy/vision, competitive, ideation dimensions — all as markdown.
- [ ] **Dimensions defined:** 8–10 Pole A ↔ Pole B spectrums for bills agent.
- [ ] **Master setup prompt written:** References all files; defines the stage sequence.
- [ ] **Stakeholder expectations set:** Vision vs buildable vs both; fidelity of output.
- [ ] **Domain expert + design owner identified** for verification and continuity.
- [ ] **Human testing planned:** At least one round (ideally two) with real users.
- [ ] **Chat hygiene:** New chat per major phase; always start with "read these files, confirm."

---

## Visual reference

Slide images from Brett's presentation are stored in the project assets folder:

| Slide | Description | File |
|-------|-------------|------|
| Slide 1 | "An experiment in design thinking" — 61 studies, usage breakdown | `assets/image-5c011690-8705-4c6d-aba1-6e717c46e12f.png` |
| Slide 2 | "The Plan" — 3 phases, 7 stages, master prompt screenshot | `assets/image-f8cf2fb9-b234-4017-a346-321b06e55cb7.png` |
| Slide 3 | "Feeding the model our full context" — 5 types, file tree | `assets/image-669f2c7a-f488-4511-9fe0-cf9df149a18d.png` |
| Slide 4 | "Our journey" — 11-prompt sequence with stakeholder + testing checkpoints | `assets/image-4910581d-71a6-4723-b87d-a071493c63a7.png` |
| Slide 5 | "AI-specific actions" — Preparation / Diverge / Converge detail with prompts | `assets/image-daff59fb-ddba-4222-803f-b157df2427cc.png` |
| Slide 6 | "AI-assisted ideation playbook" — cover: scope, foundations, ideation, evaluation | `assets/image-979d96ed-5055-4438-b517-f2d73fab7a55.png` |
| Slide 7 | "AI 101" — pre-sprint education: human-in-the-loop, markdown files, chat threads | `assets/image-a107868d-ba1a-4296-a8db-76a005718cce.png` |
| Slide 8 | "Activity 1: High-level scope definition" — facilitation guide, steps 1-4 | `assets/image-31644862-835c-4c49-8dfc-5ff03ee6801f.png` |
| Slide 9 | "Activity 2: Re-usable knowledge base creation" — facilitation guide, markdown conversion | `assets/image-f6c582de-2774-4fd0-90a4-5914ade1a285.png` |
| Slide 10 | "Activity 3: Opportunity prioritisation" — OST creation, HMWs, SME engagement | `assets/image-1a9dda83-1efc-4cf2-b471-08c3f5753d1f.png` |
| Slide 11 | "Activity 4: Idea generation and refinement" — spectrums, 8 techniques, persona critique | `assets/image-4195477c-d3b5-4795-93ea-6a3f9c3887a8.png` |
| Slide 12 | "Activity 4: Idea evaluation" — persona roleplay, feasibility phasing, risk scan | `assets/image-331c9042-1a71-49f8-9681-a4c27887bd94.png` |

---

*The AI Design Swarm Technique is a new way of working. We want to imitate this approach: curate the context, let AI co-design, verify with humans, and iterate fast. Better prep, clearer convergence, and explicit expectations so Bill AI ideation is both ambitious and buildable.*
