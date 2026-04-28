# Design decisions

## Allocation method: "Allocate by business" vs "Allocate by tracking options"

Users choose how to split income across properties:

- **Allocate by business** – A single allocation (with optional allocation changes over time) applies to all properties. No tracking category or options are required.
- **Allocate by tracking options** – Allocation is set per tracking option. A tracking category must be selected; each row is a tracking option with its own percentage and optional allocation-change rows.

The tooltip next to "Transaction allocation" explains when to use each: same share for all properties → by business; share varies by tracking option → by tracking options.

---

## No effective date on the first allocation

After exploring patterns that showed an effective date on the first allocation percentage, we changed approach to avoid a logical problem: if every percentage has an effective date, it’s unclear what applies *before* that date. We now treat the first percentage as applying for all time until the first change.

**Current pattern:**
- The initial allocation has **only** a percentage field (no date).
- A link **"+ Add allocation change"** is always visible below.
- When the user clicks it, a **new row** is added with both an effective date and a percentage.
- Dates only appear on these additional rows, so each date clearly means "when this change took effect" rather than "when this percentage started" (which would leave the earlier period undefined).

This keeps the model clear: the first percentage applies from the start; each additional row is a change (date + new percentage).

---

## Multi-row functionality

Users can add multiple allocation changes by:

1. **Entering the initial allocation** – A single percentage with no date (applies until the first change, or forever if none are added).
2. **Clicking "+ Add allocation change"** – Creates a new row with:
   - An effective date (when this percentage takes effect)
   - A percentage (the new allocation from that date)
3. **Adding further rows** – Each new row captures another date + percentage pair, building a chronological history.
4. **Deleting rows** – Any additional row can be removed. The first percentage row is always present.

This pattern lets users build a full history of allocation changes within the settings interface, without implying a gap "before" the first percentage.

---

## Tracking option rows: percentage on every row

When **Allocate by tracking options** is selected, every tracking option row shows the allocation percentage input—including the initial placeholder row and any newly added rows before a tracking option is chosen. This avoids a gap where a newly added row has no percentage field until the user selects an option. Users can set or adjust the percentage at any time; validation still requires a tracking option to be chosen before save.

---

## Rate limits (5 soft / 10 hard)

To keep configuration manageable, the system applies limits to the number of allocation items (tracking options + allocation changes). Both allocation methods contribute to the same conceptual limit:

- **Allocate by business:** (1 main business allocation + business allocation-change rows) + number of tracking options that have a name.
- **Allocate by tracking options:** number of tracking options that have a name + total allocation-change rows across all options.

Only tracking option rows that have a **name** (a chosen option) count. The initial placeholder row in "Categories Set Up"—and any row where the user hasn’t yet selected a tracking option—is **excluded** from the count, so users who aren’t using tracking options aren’t penalised. At 5 items a warning is shown; at 10, adding more allocation changes or tracking options is disabled. The warning/block appears in all scenarios (including "No Tracking Categories" when using business allocation).

---

## Validation

To maintain data integrity, the system validates as follows:

- **Chronological date order** – Each additional row’s effective date must be after the previous row’s date (checked in **display order**, not sorted order), so the sequence is clear and errors are reported on the correct row.
- **Empty allocations** – The main allocation and every additional allocation-change row must have a percentage. For **Allocate by tracking options**, only rows that have an option chosen are required to have a percentage; placeholder rows without a chosen option are not required to have a value until an option is selected.
- **Required dates** – For each additional allocation change row, the effective date is required (it marks when that percentage takes effect).
- **When validation is shown** – The validation banner and inline errors appear only **after the user attempts to save**. New rows don’t trigger the banner until the user saves again, so fixing an error and then adding another row doesn’t immediately show errors for the new, empty row.
- **Tracking options** – A tracking category can be left empty when saving. If a tracking category *is* selected, then every tracking option row must have an option chosen before save.

---

*Images (e.g. image-20260304-111805.png) can be updated to reflect the current UI: first allocation with percentage only and always-visible "+ Add allocation change" link, then additional rows with date + percentage; "Allocate by business" / "Allocate by tracking options" labels and tooltip.*
