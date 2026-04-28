# The AI Design Swarm Technique

## Most teams use AI for 2 out of 7 design stages. Here's what happens when you use it for all of them.

---

We analyzed 61 studies on how design teams use AI in their process. The finding was stark: almost every team uses AI to generate ideas (61 out of 61) and most use it to refine them (39 out of 61). But almost nobody uses AI for scope definition (3 out of 61), and barely anyone uses it for multi-idea evaluation and selection (4 out of 61).

Teams are treating AI like a brainstorming intern — useful in the middle, ignored at the edges. They hand it a prompt, get a list of ideas, cherry-pick the ones that feel right, and move on.

We thought: what if we used AI *maximally* — across every single stage of the design process? Not as an intern, but as a co-designer with a seat at the table from scope definition through to final selection?

The result was a technique we're calling **The AI Design Swarm**. Three people, four days, 90 ideas, two rounds of real user testing, and output that spans both near-term buildable work and long-horizon vision. Here's why it matters.

---

## The problem with how most teams use AI in design

The typical AI-assisted design session looks like this: someone opens ChatGPT, types "give me 10 ideas for [problem]," gets a list, and presents the best three in the next meeting. Maybe they ask the model to refine one or two.

This approach has three fundamental problems:

**1. The model doesn't know what you know.** Without your strategy documents, user research, competitive analysis, and domain constraints, the AI is generating ideas from its general training data. The output is generic because the input is generic. You get "what if we added a dashboard" when you need "what if the agent negotiated payment plans with high-value B2B payers based on their historical payment patterns."

**2. You're only using it where you're already strong.** Designers are already good at generating ideas. Where they struggle — and where AI could help most — is in holding vast amounts of context simultaneously, evaluating ideas against multiple competing criteria, and pushing past the comfortable middle ground of conventional thinking. But those are exactly the stages where teams don't use AI at all.

**3. You lose the trail.** When a human picks three ideas from a list of ten, you lose the reasoning. When an AI evaluates 90 ideas against your personas, your business goals, and your "never do" constraints, and tells you which ones survive and why — you have a documented rationale for every cut. That changes the conversation with stakeholders entirely.

---

## What the AI Design Swarm actually is

The technique has three phases, seven stages, and a specific sequence of 11 structured prompts — all designed ahead of the sprint. It's a compressed design process where AI participates in every stage, but humans remain in control of every decision.

### Phase 1: Preparation (the most important part)

Before a single idea is generated, you build a **curated knowledge base** of markdown files. Not slides. Not PDFs. Not links to a wiki. Structured markdown that the model is *forced* to read and confirm before doing anything.

The knowledge base contains five types of context:

1. **Guidelines and criteria** — success metrics, design principles, scope, what's explicitly out of bounds.
2. **Background information** — the current product, its architecture, the competitive landscape, technical constraints.
3. **Personas** — and these aren't your standard personas. Each one includes a *Refinement & Critique Profile* (how this user evaluates ideas) and an *Evaluation & Testing Profile* (instructions for the AI to roleplay as this person). This is what makes synthetic user testing possible later.
4. **Data collections** — customer research, support cases, usage data.
5. **Ideation materials** — the company's vision for AI, agent playbooks, voice and tone guidelines, edge cases and failure scenarios.

This takes about a day to assemble with a small team. It's the single highest-leverage thing you do.

The critical instruction during knowledge base creation: **do not summarise — structure.** When you convert a research report into markdown, don't let the AI condense it into bullet points. Preserve the structure: headings, data points, quotes, relationships. Summarising loses signal. Structuring preserves it. This distinction is what separates a knowledge base that produces specific, grounded ideas from one that produces generic slop.

Why markdown at all? Because when you give an AI a 40-slide deck, it decides what's important. When you give it a structured markdown file with clear headings, defined terms, and explicit scope boundaries, it follows your lead. The model doesn't drift because you haven't given it room to drift.

> "Without accurate documents, the model over-indexes on the wrong things. Document accuracy is the most important thing you're going to do."

Scope definition itself follows four concrete steps:

1. **Write the core problem in plain language** — with evidence and data. What's broken? Who feels it? Why does it matter commercially?
2. **Define the primary outcome in measurable terms** — revenue, win rate, time-to-pay, retention, adoption. Avoid vague goals like "improve the experience."
3. **Define 3-5 experience goals** — the emotional and functional outcomes you're designing for (e.g. "proactive confidence," "reactive relief," "trust and transparency").
4. **Define IN and OUT of scope explicitly** — what must be designed, what must *not* be suggested, and key constraints. This prevents the AI from inventing unrealistic ideas.

### Phase 2: Divergence (where volume replaces ego)

With the knowledge base loaded, you use a structured sequence of prompts to generate ideas. But not randomly — along **design spectrums**.

A design spectrum is a Pole A to Pole B dimension that forces the AI to explore the full range of possibilities. For example, if you're designing an AI agent:

- **Autonomy:** Fully autonomous (the agent acts alone) to Fully supervised (human approves every step)
- **Aggressiveness:** Protect the customer relationship at all costs to Get the job done at all costs
- **Adaptiveness:** Fixed plan to Self-adjusting based on signals
- **Voice:** Impersonal system notification to First-person, replicating the sender's tone

You define 8-10 of these dimensions. The AI generates ideas along each one, then you push it further: "Take Pole B of each spectrum and push it to the extreme." This is where the technique produces ideas that a room full of humans wouldn't reach — not because the AI is more creative, but because it can hold more context and explore more combinations without anchoring on the first decent idea.

Every idea follows a forced structure: **What** it is, **Who** it's for, and **How** it works. This consistency is what makes the ideas evaluatable instead of just a wall of text — and it's what makes rapid prototyping possible later, because you can hand a structured description to Figma Make or Cursor and get a wireframe in minutes.

After the initial round, you push further using eight expansion techniques: expansion, modification, substitution, rewriting, multiple perspectives, questioning, eliminating, and combining. Most teams only use two (generate and refine). Using all eight is what produces genuinely novel combinations instead of shallow variations.

In the original experiment, this produced around 90 ideas, of which 50-60 were genuinely distinct. The quality surprised the team: they weren't just dealing with volume, they were seeing approaches they hadn't considered.

**The key discipline:** After each round of divergence, you converge. The AI evaluates ideas against your personas (as synthetic users), your business goals, and your explicit constraints. Ideas that don't survive get cut — with documented reasoning. This prevents the volume from becoming noise.

### Phase 3: Convergence (where humans stay in charge)

Here's where the technique breaks from the "vibe coding" school of AI usage. You don't just take whatever the AI thinks is best.

Evaluation uses four structured lenses:

1. **Persona roleplay evaluation** — the AI simulates each persona's reaction using their success criteria, failure conditions, and gut-check filters. "Would this embarrass me?" "Would this actually work for trade accounts?" "Is this truly set-and-forget?"
2. **Business alignment check** — does this idea move the success metric (e.g. win rate)? Does it reduce overdue invoices? If it doesn't impact the metric, it gets cut.
3. **System feasibility check** — each surviving idea gets tagged: **MVP (Phase 1)**, **Dependent on foundational layer**, or **Advanced optimisation layer**. This prevents the "everything is equally far away" problem and gives stakeholders a sequencing story, not just a wish list.
4. **Risk scan** — four specific categories: trust risks, embarrassment risk, automation failure risk, and escalation failure risk. Not "is this risky?" but *how* and *to whom*.

You bring in stakeholders twice during the four days. You run at least two rounds of testing with real human users — not synthetic users, not the AI's opinion, but actual people interacting with prototypes. The prototypes themselves are generated rapidly (using tools like Figma Make or Cursor) from the rich What/Who/How descriptions the AI produced.

The convergence also happens across time horizons. In the original experiment, the team spent the first two days thinking about the 2-3 year future (Horizon 2), then used the final two days to apply current technical and product constraints (Horizon 1) to pull those ideas back to buildable reality. This meant stakeholders got both: a vision of where the product could go, and a concrete plan for what to build next.

---

## It's a playbook, not a workshop

Here's something that separates this from a one-off experiment: the team formalized it into a **self-service playbook** with step-by-step facilitation guides for every activity.

It starts with an "AI 101" module that teaches participants the fundamentals before the sprint begins: what human-in-the-loop evaluation means in practice, why markdown files matter, and when to start new prompt threads. There's even a question the playbook forces you to answer for every stage: *what does a good output look like here?*

Each activity — scope definition, knowledge base creation, opportunity prioritisation, idea generation and refinement, idea evaluation — has its own page specifying purpose, when to use it, inputs required, a step-by-step facilitation guide, and common pitfalls.

This means you don't need the people who invented the technique in the room. A designer who's never run one before can pick up the playbook and facilitate it. That's the difference between "cool thing a team did once" and "technique your organisation can adopt."

---

## The role shift that makes people uncomfortable

If you're a designer, the AI Design Swarm changes your job in an unsettling way.

You are no longer the person who comes up with the ideas. The AI does that, and it does it with more context, more volume, and more combinatorial range than you can hold in your head.

Your job becomes **verification**. You're the expert who decides which ideas are good, which are garbage, which are technically impossible, and which are strategically brilliant. You're the one who catches when the AI over-indexes on a persona need that was poorly specified in the source docs. You're the taste filter.

This requires three things in the room: **domain knowledge** (someone who deeply understands the problem space), **AI fluency** (someone who can evaluate model output and adjust prompts), and **design intuition** (someone who can translate text-based ideas into coherent experiences).

The team that ran the original experiment found this uncomfortable. The domain expert felt the weight of being the sole verifier. The designers felt the loss of generative ownership. But by day four, the context that had been overwhelming on day two started to crystallize, and the output — both in breadth and quality — exceeded what they could have achieved manually.

---

## Where teams get it wrong

The playbook documents common pitfalls at every stage. Here are the ones that matter most:

**Skipping the knowledge base.** The most common failure mode. Teams jump straight to "generate ideas" because building the markdown knowledge base feels like overhead. It's not overhead — it's the entire foundation. Without it, you're just prompting from vibes.

**Evaluating too early.** When ideas start flowing, the instinct is to immediately judge them. But evaluating during divergence kills novelty. The technique deliberately separates generation from evaluation — you push wide first, then converge.

**Generating shallow variations instead of pushing spectrums.** If your "exploration" produces ten ideas that are all slight tweaks on the same concept, you haven't used the design spectrums. The whole point is to force the AI to Pole A and Pole B of each dimension — fully autonomous *and* fully supervised, maximum aggression *and* maximum relationship protection. That's where the interesting ideas live.

**Using vague success metrics.** "Improve the experience" isn't a metric. "Reduce percentage of overdue invoices" is. Vague metrics produce vague ideas. The AI needs a measurable outcome to evaluate against.

**Not structuring ideas consistently.** If some ideas are a sentence and others are a paragraph, you can't compare them. The forced What/Who/How structure means every idea is evaluatable on the same terms.

---

## Why this matters now

Design sprints were invented to compress decision-making. But they still bottleneck on the humans in the room — their memory, their biases, their energy on day three.

The AI Design Swarm doesn't remove the humans. It changes what the humans do. Instead of generating and debating, they're curating context, verifying quality, and making decisions. The AI handles the part that scales (holding context, generating combinations, evaluating against criteria) and the humans handle the part that doesn't (judgment, taste, stakeholder politics, real-world testing).

Three people. Four days. Ninety ideas evaluated against real personas, real business goals, and real constraints — with documented reasoning for every decision. Two rounds of user testing. Output that spans vision and near-term delivery.

That's not a marginal improvement on the design sprint. It's a different kind of tool entirely.

---

## How to run one

**Day 0 (prep week):** Build your markdown knowledge base. Scope definition, personas with critique and testing profiles, journey maps, competitive analysis, technical constraints, vision documents, ideation dimensions. One day of focused work for 2-3 people. Remember: do not summarise — structure.

**Day 1:** Load the knowledge base into AI. Generate the Opportunity Solution Tree. Reframe problems. Bring stakeholders in to validate scope and opportunities.

**Day 2:** Generate ideas along your design spectrums (What/Who/How for each). Evaluate using synthetic users and business goals. De-dupe, cluster, and classify (no-brainer / novel / cut). Push to extremes using all eight expansion techniques.

**Day 3:** Generate rapid prototypes from the richest ideas. Test with real users. Cluster extreme ideas into coherent concepts. Bring stakeholders in to evaluate.

**Day 4:** Apply Horizon 1 constraints. Tag surviving ideas by feasibility phase (MVP / foundational / advanced). Run the four-lens risk scan. Refine against business goals, customer needs, and technical reality. Prototype the convergent flow. Test again with users. Define the core value proposition.

**Rules throughout:**
- New AI chat per major phase. Always start with "read these files, confirm you've read them, do nothing else."
- When the output starts feeling generic, start a fresh chat and re-ground.
- Converge on **value first**, then risk. (Evaluating on risk too early kills novel ideas.)
- Every decision is documented — which ideas survived, which were cut, and why.

---

## The uncomfortable truth

Most teams using AI in design are getting roughly the same output they'd get without it, just faster. They're using it as an accelerant for their existing process, not as a fundamentally different capability.

The AI Design Swarm Technique asks a harder question: what if the AI isn't just faster at your process — what if it enables a *different* process? One where you can hold more context than any human, explore more possibilities than any workshop, evaluate against more criteria than any post-it wall, and still ground everything in real user testing and stakeholder judgment?

The answer, based on one team's experiment: you get both more ambitious thinking and more buildable output, in less time, with better documentation of your reasoning.

That's worth paying attention to.
