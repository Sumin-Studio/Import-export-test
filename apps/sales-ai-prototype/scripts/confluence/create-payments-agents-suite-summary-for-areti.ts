#!/usr/bin/env bun

import {
  findOrCreatePage,
  getConfluencePageUrl,
  getPageById,
  updatePage,
} from "../../src/lib/confluence/client";
import {
  getConfluenceConfig,
  getConfluenceRuntimeOptions,
  type ConfluenceConfig,
} from "../../src/lib/confluence/env";
import {
  type ManagedSection,
  upsertManagedSections,
} from "../../src/lib/confluence/managed-sections";

function readFlag(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index < 0) {
    return undefined;
  }
  return process.argv[index + 1];
}

interface EnsureDocArgs {
  title: string;
  parentId?: string;
  config: ConfluenceConfig;
}

async function ensureSummaryDoc(args: EnsureDocArgs) {
  const sections: ManagedSection[] = [
    {
      key: "body",
      format: "markdown",
      content: PAYMENTS_AGENTS_SUMMARY_MARKDOWN.trim(),
    },
  ];

  const initialContent = upsertManagedSections("", sections);
  const ensured = await findOrCreatePage({
    title: args.title,
    content: initialContent,
    parentId: args.parentId,
    config: args.config,
  });

  const existingPage = await getPageById(ensured.pageId, args.config);
  const existingHtml = existingPage.body.storage.value ?? "";
  const mergedContent = upsertManagedSections(existingHtml, sections);

  const shouldUpdate = mergedContent.trim() !== existingHtml.trim();

  let page = existingPage;
  if (shouldUpdate) {
    page = await updatePage({
      pageId: existingPage.id,
      title: args.title,
      content: mergedContent,
      version: existingPage.version.number,
      parentId: args.parentId,
      config: args.config,
    });
  }

  return {
    pageId: page.id,
    title: page.title,
    url: getConfluencePageUrl(page.id, args.config.baseUrl),
    created: ensured.created,
    updated: shouldUpdate,
  };
}

const PAYMENTS_AGENTS_SUMMARY_MARKDOWN = `
## Payments Agents Suite — Summary for Areti

**Date:** 2026-03-11  
**Audience:** Product, Marketing, Design, Engineering, Leadership  
**Purpose:** Provide a concise, copy-pasteable narrative of the Payments agents suite so Areti, PMs, Marketing, and other stakeholders can align on scope, value, and responsibilities across streams.

---

## From ledger to active system for Pay Out

The Payments agents suite is designed to turn Xero from a mostly passive ledger into an **active system that helps small businesses plan cash, protect against bad payments, route approvals, and actually move money** — with humans handling the exceptions rather than every bill.

On the Pay Out side, that work is organised into a small number of agents and foundations that work together rather than as one big monolith.

---

## Bill · Cash Flow — Bill Runner + enrichment + optimizer

**What it is:**  
An agent that **looks across upcoming bills, expected money in, and a chosen cash buffer** to propose a forward-looking payment plan (e.g. 30–90 days). It suggests which bills to pay when so owners are not constantly in spreadsheets or doing mental math about whether they will run out of cash.

**Core responsibilities:**

- Maintain a configurable **cash buffer** (e.g. X days) over a given horizon where possible.
- When the ideal buffer cannot be maintained, keep the business **above zero for as long as possible**, and make that trade-off explicit.
- Generate clear **payment plans** (e.g. “pay these bills now, delay these ones”) that can be reviewed, adjusted, and committed.
- Explain why the plan changed (new invoices, changed AR, updated buffer).

**Where it shows up:**

- Cashflow-focused views in Bills and related dashboards.
- Future JAX conversations that need a “runway-aware” plan for paying suppliers.

---

## Bill · Workflow (1) — Safety Shield / “Risk Radar”

**What it is:**  
Safety Shield is a **bill-risk detection layer** that sits alongside approvals and payments. Its job is to spot duplicates, suspicious changes, abnormal amounts, and other signals that make a bill deserve a second look **before money moves**.

**Core responsibilities:**

- Monitor bills and related activity continuously (supplier history, bank details, POs/receipts where used).
- Detect:
  - obvious and fuzzy **duplicates**
  - **first-time suppliers** with unusually large bills
  - familiar suppliers with **abnormal amount spikes**
  - suspicious **bank-detail changes** and other fraud-like patterns
- Explain in plain language **why** a bill was flagged and how confident the system is.
- Route the bill into the safest next action lane (hold, request review, adjust, or proceed).

**Where it shows up:**

- Bills list and bill detail views (inline flags and evidence panels).
- Approval queues and payment preparation screens.
- Potentially in higher-level surfaces (e.g. Spotlight-style “issues to review”).

---

## Bill · Workflow (2) — Just Pay lane (exploratory)

**What it is:**  
An experience focused on the **last mile from “approved” to “paid”**. Once decisions are made, Just Pay aims to make it fast and confident to move money **inside Xero**, rather than bouncing out to bank portals and re-entering data.

**Core responsibilities:**

- Provide a **clear, low-friction path** to pay approved bills (singles and batches).
- Reduce duplicate data entry and context-switching between Xero and external banking tools.
- Surface key safety and approval signals inline so users can pay with confidence.

**Where it shows up:**

- Bills list, bill detail, and payment-run experiences for customers who already trust Xero as a place to initiate payments.

---

## Approvals Foundations — Michael But’s pod

**What it is:**  
The **shared approvals engine and plumbing** that workflow agents depend on. Approvals Foundations is not a standalone agent; it is the rules, routing, audit, and reusability layer underpinning bill approvals across surfaces.

**Core responsibilities:**

- Provide robust **rules and routing** for who needs to see which bills, and in what order.
- Maintain a consistent **audit trail** of decisions, overrides, and escalations.
- Offer reusable **components and patterns** (e.g. approval steps, states, notifications) that Bill Workflow 1/2 and other experiences can plug into.

**Where it shows up:**

- Shared approvals configuration and UI across Bills and related products.
- Under the hood of agent-led workflows that require human approval steps.

---

## Smart Payment Request Agent — exploratory stream

**What it is:**  
An exploratory lane for **requesting and coordinating payments**, especially in cases where approvals are distributed across people or organisations. Think of it as a smarter way to ask for, chase, and coordinate approvals and payment commitments.

**Core responsibilities (exploratory):**

- Send and track **smart approval / payment requests** across channels.
- Respect recipient consent and preferences (timing, channels, escalation).
- Plug into the same **Approvals Foundations** and execution rails as other agents.

**Where it could show up:**

- As an outbound-facing agent that coordinates with suppliers, accountants, or internal approvers.
- As part of future JAX or workflow experiences where Xero mediates between parties.

---

## Customer value — how the pieces fit together

Taken together, the Payments agents and foundations aim to deliver:

- **Less stress about short-term cash** and which bills to pay when (Bill · Cash Flow / Bill Runner).
- **Fewer nasty surprises** from duplicates, suspicious bills, or risky changes (Bill · Workflow (1) / Safety Shield).
- **Clearer and more trusted approval flows** with strong audit and shared patterns (Approvals Foundations + approval automation).
- **A smoother path from decision to money actually moving** inside Xero (Bill · Workflow (2) / Just Pay and future request agents).

All of this is anchored **inside Xero**, not scattered tools, so customers can see, decide, and act on their bills in one place.
`;

async function main() {
  const config = await getConfluenceConfig();
  const runtime = await getConfluenceRuntimeOptions();
  const explicitParentId = readFlag("--parent-id");
  const parentId = explicitParentId ?? runtime.parentPageId;

  const title = "Payments Agents Suite — Summary for Areti";

  const result = await ensureSummaryDoc({
    title,
    parentId,
    config,
  });

  console.log(
    JSON.stringify(
      {
        ...result,
        parentId,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

