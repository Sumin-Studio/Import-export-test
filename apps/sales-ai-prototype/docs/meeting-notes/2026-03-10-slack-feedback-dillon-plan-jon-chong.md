# Slack feedback on Dillon's plan (10 Mar 2026)

**Context:** Dillon shared his plan (cashflow algorithmic scenarios and logic flows) in the Bill AI channel. Jon and Chong replied with feedback.

**Source:** Slack (canonical Bill AI channel). No transcript links.

---

## Jon Bell (9:46 AM)

- Loves the plan. The prototype was a visual to understand how it feels; the document helps wrap his head around the specifics.
- **Two comments:**
  1. Would love to see a **visual representation of each [scenario] in a prototype** — how it feels, where it sits, etc.
  2. Getting **good enough data** to do several of these things is going to be the main sticking point (knows he's preaching to the choir).
- "Nice work, onward!"

---

## Chong Xu (6:23 PM)

Thanks Dillon for a well-thought-out write-up. Early observations:

1. **Override the plan:** We should always give customers the ability to over-ride the plan — also a good feedback loop to our algorithm.

2. **Bill due-date options (trust moment):** We should strive to have an accurate understanding of:
   - Early discount (when and how much)
   - Late fees (when and how much)
   - Grace period (how long), if available  
   This will be the **critical trust moment** we build for our users.

3. **Bill criticality:** We should start with a reasonable understanding of bill criticality:
   - By **supplier type** based on aggregate (e.g. landlord, insurance, past payments to this supplier across businesses)
   - By **customer preference** based on past bill payment history, etc.

With (2) and (3), we can layer in the **Syft projection** to understand what are the top scenarios.

---

## Repo links

- Dillon's scenario doc (repo summary): [../reference/2026-03-10-cashflow-algorithmic-scenarios-and-logic-flows.md](../reference/2026-03-10-cashflow-algorithmic-scenarios-and-logic-flows.md)
- Dillon's Bill Cashflow Slack wrap (same day): [2026-03-10-dillon-bill-cashflow-scenarios-and-daily-wrap.md](2026-03-10-dillon-bill-cashflow-scenarios-and-daily-wrap.md)
