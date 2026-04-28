# Synthetic user evaluation process

**Purpose:** Run each concept (area of opportunity) through the three Bill AI personas to get crisp, first-person quotes — what would this user say? Re-run when concepts or personas change.

**Output:** Raw data file of quotes: [../raw-data/2026-02-17-synthetic-user-quotes-by-concept.md](../raw-data/2026-02-17-synthetic-user-quotes-by-concept.md)

---

## When to re-run

- New concepts added (e.g. after a workshop or strategy update)
- Personas updated (new pains, criteria, or segments)
- New persona added (e.g. supplier/vendor, accountant)
- You want refreshed quotes after product or constraint changes

---

## Inputs

| Input | Location | Notes |
|-------|----------|--------|
| **Concept list** | [../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md](../workshop/2026-02-14-chong-lili-items-scored-with-rationale.md) or latest workshop/scored doc | Use the full "Area of opportunity" name and any short description or rationale so the evaluator has context. |
| **Personas** | [02a_Persona_Bill_Creator_Small_High_Volume.md](02a_Persona_Bill_Creator_Small_High_Volume.md), [02a_Persona_Cautious_Approver.md](02a_Persona_Cautious_Approver.md), [02a_Persona_AP_Clerk.md](02a_Persona_AP_Clerk.md) | Each has Summary & Role, JTBD, Needs/Wants/Pains, Refinement & Critique Profile, Evaluation & Testing Profile. |

---

## How to run (manual or with an LLM)

### Option A: Manual (human roleplay)

1. For each concept, read the concept name and any rationale.
2. For each persona, read that persona file (sections 1–5).
3. Roleplay as that persona: "If we built this concept, what would I say? Be a tough critic. If it's good, say why. If there are concerns, say them. No 'eh maybe' — crisp quotes."
4. Write 2–4 first-person quotes per persona per concept. Prefer short, punchy sentences.
5. Append or replace the concept block in the raw data file. Use the same structure: concept title (##), then three persona sub-sections with bullet quotes.

### Option B: LLM-assisted (reusable prompt)

1. **Prepare context:** Concatenate or reference the three persona files (full text or paths). Have the concept list with names and 1–2 sentence descriptions.
2. **Prompt template (per concept, or batch of concepts):**

```
You are evaluating a product concept through three synthetic users (personas). Your job is to produce crisp, first-person quotes — what would each user say about this concept? Be a tough critic. Assume the concept is good, so surface concerns and only endorse when it really lands. No "eh maybe" or vague feedback.

**Concept:** [CONCEPT_NAME]
[One or two sentences of context/rationale from the workshop or strategy doc.]

**Personas to roleplay:** Read these three persona documents. Each has a Role, JTBD, Needs/Wants/Pains, Refinement & Critique Profile, and Evaluation & Testing Profile. Use those to generate 2–4 first-person quotes per persona.

- Bill Creator (small high-volume): [path or paste 02a_Persona_Bill_Creator_Small_High_Volume.md]
- Cautious Approver: [path or paste 02a_Persona_Cautious_Approver.md]
- AP Clerk: [path or paste 02a_Persona_AP_Clerk.md]

**Output format:** For each persona, list 2–4 bullet quotes in first person. Short sentences. Mix positive and critical where appropriate. Be specific to the concept (e.g. "If the system doesn't learn from my corrections..." not "Learning is important.").
```

3. Run for each concept (or in batches of 3–5). Copy the output into the raw data file under the matching concept heading.
4. **Quality check:** Scan for vague or generic quotes. Replace with more specific, persona-grounded lines if needed.

### Option C: Script (future)

A script could:
- Read concept list from a JSON or markdown source (e.g. exported from the workshop sheet or a `concepts.json`).
- Read the three persona markdown files.
- Call an LLM API with the prompt above per concept.
- Append or write the raw data file (with date stamp or version in the filename).

If you add a script, document its location, inputs, and how to run it here.

---

## Output format and location

- **File:** `docs/raw-data/yyyy-mm-dd-synthetic-user-quotes-by-concept.md` (create a new dated file when you do a full re-run so we keep history; or overwrite the same file if you prefer a single "latest" artifact and track history in git).
- **Structure:** One `##` heading per concept (exact concept name). Under each, three sub-sections: **Bill Creator (small high-volume):**, **Cautious Approver:**, **AP Clerk:**. Each sub-section has 2–4 bullet quotes in first person.
- **Header:** At the top of the file, record: Generated date, source concepts doc, persona doc links, and link back to this process.

---

## Quality bar for quotes

- **Crisp:** Short sentences. No long paragraphs.
- **First person:** "I need…" "If the system…" "Don't give me…"
- **Tough critic:** Surface concerns, edge cases, and "what if it goes wrong." Only endorse when the concept clearly lands for that persona.
- **Specific to concept:** Quote should reference the concept or its implications, not generic persona traits.
- **No "eh maybe":** Avoid "could be useful" or "might help." Prefer "I'd use this if…" or "This fails if…"

---

## Links

- Persona template (Brett's Design Swarm): [2026-02-13-design-swarm-source-files.md](2026-02-13-design-swarm-source-files.md)
- Design Swarm technique (convergence with synthetic users): [2026-02-13-brett-agent-ideation-process.md](2026-02-13-brett-agent-ideation-process.md)
- Raw data folder: [../raw-data/](../raw-data/)
