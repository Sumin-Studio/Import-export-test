# Brett/Di Agent Ideation Sprint Playbook

Extracted from the Feb 13, 2026 "Agent ideation process walkthrough" session.
- **Gemini notes:** [Google Doc](https://docs.google.com/document/d/1d8oyS19X8GA5TqqKo8WNOw3M7NZcvNjWZjikiXZR-vY)
- **Video recording:** [Google Drive](https://drive.google.com/file/d/1CP3nk5Ne-93lJ3XE9wQ8-IDJAzTEqUPM/view)
- **Miro board:** Referenced in session (Di shared access)
- **Participants:** Brett Edmonds, Di Pierce, Darryl Powell, Angus Tait, Dale Thornton, Maarten Idema, Robb Schiller, Jon Bell, Neeraj Sahu, Jenny Nedanovski, Chong Xu, Kenny Jang, Prashant Ranchhod, Audrey Chen

## The Process (4 days, 3 people in a room)

### Day 0: Pre-Sprint Prep
- Build the "master prompt" — define scope, success metrics, exclusions
- Collect all foundational materials (CJF, personas, research, architecture, strategy)
- Convert everything into **markdown files** — this is the most critical step
- Markdown prevents AI from deciding what's important, prevents drift
- Di working with GG to establish markdown files as standard research outputs going forward

### Day 1: Context Structuring
- 3 people, full day dedicated to gathering and structuring materials into markdown files
- Materials fed to AI: project scope, business success metrics, design principles, domain info (sitemap, architecture), user data (CJF, personas, user modes), CX cases, research, JAX vision
- All converted to markdown — "the most important step"
- AI tools tested: **ChatGPT** (best quality), Gemini, Glean

### Days 2-3: Diverge
- AI generates ideas along defined **dimensions/spectrums**:
  - Aggressiveness (low to high)
  - Configurability (none to full)
  - Level of autonomy (fully autonomous to supervised)
  - + 5-6 more domain-specific dimensions
- Peak: ~90 ideas, 50-60 unique
- Ideas are rich: "what it is, who it's for, how it works" — not post-it scratchings
- **Expansion techniques:** substitution, modification, elimination, combination, rewriting
- Push AI to explore extreme concepts at both poles of each spectrum
- Constant convergence using synthetic users (personas) to evaluate ideas
- Multiple chat instances per day (context degrades in long conversations)
- Every new chat starts with: "confirm you've read and understood ALL files, do not do anything else"
- Classification: tag ideas as "no-brainer" or "novel/interesting"

### Day 4: Converge + Prototype
- Feed rich text ideas from ChatGPT into **Figma Make**
- Figma Make generated "good enough" wireframes for user testing in ~1.5-2 hours
- Two rounds of real human testing conducted
- H2 (vision) thinking brought back to H1 (deliverable) constraints
- Success metric as constant filter: "does this impact [win rate]? No? Cut it."

## Role Shift: Generator to Verifier

> "You go from being the idea generator to the verifier."
> — Brett Edmonds

- Designer's primary job becomes **evaluating quality of AI output**
- Requires domain experts in the room (Darryl was the domain champion)
- Human evaluation consumed most of the time, not idea generation
- Darryl's retro feedback: wished for others to challenge her domain decisions
- **Three competencies needed in the room:** domain knowledge, AI fluency, design intuition

## What Worked

- Markdown grounding prevents AI drift — forces it to use your data
- ChatGPT > Gemini > Glean for ideation quality
- Rich, well-rounded ideas (not shallow post-it notes)
- Expansion techniques along spectrums push past obvious ideas
- Success metric as constant convergence filter
- H2 thinking first, then constrain to H1
- Synthetic users for rapid idea evaluation
- Figma Make for fast wireframe generation from rich text

## What Didn't Work / Learnings

- **Text-only output overwhelmed stakeholders** — they couldn't absorb walls of text
- **Lo-fi wireframes underwhelmed design stakeholders** — expected hi-fi H2 vision
  - Product stakeholders were happy; design stakeholders wanted more
  - "We were really successful but it was underwhelming to stakeholders"
- **Scope kept changing** — stakeholders shifted priorities when brought in
- **One domain expert carrying too much** — Darryl wished for challengers
- **Converged on risk first** — should have been **value first, then risk**
- AI over-indexed on a persona need that was incorrect — had to refine source docs
  - "Document accuracy is the most important factor"
  - First realization about "human in the loop" necessity

## What They'd Do Differently

1. First 2-3 days on **H2 vision** (tested on value), bring human testers in
2. Last 1-2 days bringing back to **H1 reality** with constraints
3. Move out of text into **visuals earlier** in the process
4. Set **clearer stakeholder expectations** on deliverable fidelity
5. Evaluate first half on **customer value**, second half on **risk**
6. Share all materials as a series of **reusable plays** (promised to package up)

## Synthetic Users

- Personas converted to markdown files based on primary/secondary segmentation
- Used as evaluation agents: "You are this user. Evaluate these ideas based on risk."
- Limitations acknowledged: synthetic users won't replace real humans
- Two rounds of real human testing still conducted
- Di's synthetic user markdown files are [on Google Drive](https://drive.google.com/drive/folders/1C5bjds9gAx_XImu9eg3X52jta31UtEG0?usp=sharing) (check access)

## Next Steps from Session

- Di working with GG to establish markdown as standard research output format
- Brett, Di, and Darryl packaging process into series of reusable plays
- Brett to share materials (check `#designing-for-jax` or direct)

## Angus's Key Takeaway

> "The biggest thing I'm thinking about is just that first step of curating that data and creating your own database of information that you trust. We just skip that. We just rely on whatever's in Glean or whatever."

This validates the markdown-first approach.
