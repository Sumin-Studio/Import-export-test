# Jira ticket: Transaction allocation settings (tracking & allocation) – full specification

Use this to create a new **Story** under Epic **UKMTD-2956** (Joint ownership: Allow customers to specify ownership & calculate income & expenses) in project **UK Tax MTD IT**. Design work is tracked under **ED-460** ([MTDIT] M6 - Property joint-ownership).

---

## Summary of existing Jira specs (for context)

From existing property joint-ownership / MTD IT tickets:

| Ticket | What’s already specified |
|--------|---------------------------|
| **UKMTD-2956** | Epic: allow customers to specify ownership & calculate income & expenses. |
| **UKMTD-2187** | Milestone 6: Property joint-ownership initiative (Design label). |
| **DOCS-69304** | Multi-taxpayer; record ownership % at property level; digital record-keeping per owner’s share. |
| **UKMTD-3545** | Income and Expenses page must show allocation % (business vs tracking-option level); panel reflects “Allocate to business” vs “Allocate to tracking options”; link to settings. |
| **UKMTD-3715** | CX case: questions about both users setting % per tracking option. |

**Gap:** No ticket yet specifies the *settings* UI and behaviour for configuring transaction allocation (allocation method, tracking category/options, allocation changes over time, validation, or rate limits). The prototype in `apps/mtd-it-transaction-allocation` and the design decisions in `design-blog-excerpt.md` define this.

---

## New ticket (copy into Jira)

### **Title**
Transaction allocation settings: configure allocation method, tracking options, and allocation changes over time

### **Issue type**
Story

### **Parent**
UKMTD-2956 (Joint ownership: Allow customers to specify ownership & calculate income & expenses)

### **Description**

As a joint property business owner, I want to configure how income is allocated for MTD for Income Tax—either as a single business-wide percentage or by tracking option—and add allocation changes over time with effective dates, so that my ownership share is correctly reflected in tax calculations and I can change it when my situation changes.

This ticket specifies the settings screen and behaviour for **Transaction allocation** (tracking category selection, allocation method, allocation percentages, and allocation changes over time). It covers both “Allocate by business” and “Allocate by tracking options”, validation rules, rate limits, and when validation is shown. Design has been prototyped and documented in the design-internal repo (`apps/mtd-it-transaction-allocation` and `design-blog-excerpt.md`).

---

### **Acceptance criteria**

**Allocation method**

- Given a user is on the Transaction allocation settings for a UK property business, when they choose allocation method, then they can select either “Allocate by business” or “Allocate by tracking options”.
- Given “Allocate by business” is selected, then a single allocation percentage applies to all properties; no tracking category or options are required.
- Given “Allocate by tracking options” is selected, then a tracking category must be selected and each tracking option row has its own allocation percentage (and optional allocation changes over time).
- Given the user is on the settings page, when they view the “Transaction allocation” heading, then a tooltip explains when to use each method (same share for all properties → by business; share varies by tracking option → by tracking options).

**First allocation (no date)**

- Given the user is configuring allocation (business or per tracking option), when they see the first allocation row, then it shows only a percentage field (no effective date).
- Given the first allocation row is visible, when the user looks below it, then a link “+ Add allocation change” is always visible; clicking it adds a new row with both an effective date and a percentage.
- Given additional allocation change rows exist, when the user views them, then each has an effective date and a percentage (meaning “when this change took effect”).

**Multi-row allocation changes**

- Given the user has at least one allocation change row, when they click “+ Add allocation change”, then a new row is added with effective date and percentage fields.
- Given the user has additional allocation change rows, when they choose to remove one, then that row can be deleted; the first percentage row cannot be removed.
- Given the user has multiple allocation change rows, when they reorder or add/remove rows, then the system treats the sequence in display order (not sorted by date) for validation and display.

**Tracking category and options**

- Given “Allocate by tracking options” is selected, when the user has not yet set up a tracking category, then they can choose a tracking category (e.g. “MTD IT”, “Regions”) and add tracking option rows.
- Given a tracking category is selected, when the user adds or edits tracking option rows, then each row can have an option name (e.g. property name) and an allocation percentage; the user can add multiple options and remove options (with confirmation if the option has allocation changes).
- Given “Allocate by tracking options” is selected, when a row does not yet have an option chosen (placeholder row), then the percentage field is still shown so the user can set or adjust it; validation still requires an option to be chosen before save.
- Given the user changes or clears the tracking category when options are already selected, then a confirmation is shown (e.g. modal) before applying the change, as this may clear or replace options.

**Rate limits**

- Given the user is configuring allocation (either method), when the total number of “allocation items” reaches 5 (where items = main business allocation + business allocation-change rows + tracking options that have a name; or for “by tracking options”: tracking options with a name + all allocation-change rows across options), then a warning is shown (e.g. “Using more than 5 tracking options or allocation changes for a business may affect performance”) and can be dismissed.
- Given the total number of allocation items reaches 10, when the user tries to add more allocation changes or tracking options, then adding more is disabled and a message is shown (e.g. “You can't add more than 10 tracking options or allocation changes for a business”).
- Given “Allocate by business” with “No Tracking Categories”, when the user has 5 or 10 items (from business allocation + allocation-change rows only), then the same warning/block applies (rate limit is shared across scenarios).
- Only tracking option rows that have a chosen option name count toward the limit; placeholder rows without a chosen option do not count.

**Validation**

- Given the user attempts to save, when there are validation errors, then a validation banner is shown and inline errors appear on the relevant fields.
- Validation rules:
  - **Chronological date order:** Each additional allocation change row’s effective date must be after the previous row’s date (in display order). Errors are reported on the correct row.
  - **Empty allocations:** The main allocation and every additional allocation-change row must have a percentage. For “Allocate by tracking options”, only rows that have an option chosen are required to have a percentage.
  - **Required dates:** Every additional allocation change row must have an effective date.
  - **Tracking options:** If a tracking category is selected, every tracking option row must have an option chosen before save. A tracking category can be left empty when saving.
- Given the user has triggered validation (e.g. by attempting save), when they then add a new allocation change row or tracking option row, then the validation banner does not immediately show errors for that new row until the user attempts save again (errors are scoped to rows that existed at last save attempt).
- Given the user fixes an error and saves successfully, when the save completes, then the validation banner and inline errors are cleared.

**UI and navigation**

- Given the user is in MTD for Income Tax settings, when they open the Transaction allocation section for a UK property business, then they see the allocation method choice, tracking category/options setup (when applicable), and allocation percentages with “+ Add allocation change” where applicable.
- Given the user has made changes, when they click Save, then a confirmation (e.g. modal or inline) is shown before applying; on confirm, settings are saved and a success indication (e.g. toast) is shown.
- Given the user wants to see past allocation values, when a “History” or similar control is available, then they can view a read-only history of allocation changes (design may specify exact placement and format).
- Given the section is visible, when the user needs to manage tracking categories (e.g. create/edit categories in the org), then a link or button “Manage tracking categories” (or equivalent) is available and navigates to the appropriate place.

**Copy and labels**

- Transaction allocation section uses the label “Transaction allocation” (or product-approved equivalent) and the description copy aligns with the prototype (e.g. “Configure how transactions are included in MTD for Income Tax”).
- Inline validation messages are clear and consistent (e.g. “Date must be after the previous effective date”, “Enter an allocation percentage for each required field”, “All tracking options need to be assigned”, “Enter a valid effective date for each allocation”).

---

### **Feature flag details**

Remove or update as appropriate. For feature-flagged work, insert feature flag name. For work not behind a feature flag, add justification and add relevant `not-feature-flagged` or `feature-flag-n/a` label.

*(Leave for engineering to complete.)*

---

### **Risk assessment**

Add risk assessment as per [MTD IT Risk assessment guidelines](https://xero.atlassian.net/wiki/spaces/UKTAX/pages/270521533543/MTDIT-Riskassessmentguidelines).

---

### **Notes**

- Design reference: design-internal repo, `apps/mtd-it-transaction-allocation` (prototype) and `design-blog-excerpt.md` (design decisions and validation behaviour).
- Any code changes should be tested in alignment with the MTD ITSA Testing Strategy and Applying the Testing Strategy guidelines.
- This ticket focuses on the *settings* configuration; display of allocation on the Income and Expenses page is covered by UKMTD-3545.

---

### **Suggested labels**

- Design (if used in your project)
- Link to ED-460 or design doc in description or comments if useful

---

*Generated from design-internal app `mtd-it-transaction-allocation` and design-blog-excerpt.md. Adjust project, parent epic, and labels to match your board.*
