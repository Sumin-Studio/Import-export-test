#!/usr/bin/env bun
/**
 * One-off: create/update the "Week 1: Storming" Confluence page in XFS folder 271936946177.
 * Usage: bun run scripts/confluence/create-page-2025-03-11.ts
 */

import {
  createPage,
  getConfluencePageUrl,
  getPageById,
  updatePage,
} from "../../src/lib/confluence/client";
import { getConfluenceConfig } from "../../src/lib/confluence/env";

const XFS_FOLDER_ID = "271936946177";
const PAGE_ID = "271936946182"; // existing page created earlier
const PAGE_TITLE = "Week 1: Storming";

const BODY_STORAGE = `<h2>Top-level Summary</h2>
<p><strong>For readers coming in from the outside:</strong> the <strong>Payment Agent vision</strong> is the umbrella. Under that sits the <strong>Bill Automation Agent</strong> portfolio — the set of workflows we're building to make bills ready to pay. From there you drill into specific agents: each has a squad, PoC, artifact links (PRDs, ADRs), and planned rollout. The <a href="https://xero.atlassian.net/wiki/spaces/XFS/pages/271929344649">Payments Agents Hub</a> is where that detail lives.</p>

<p>This was our first week. A few squads are shooting forward, most haven't started yet. We're deep in discovery mode, with lots of things happening and moving forward.</p>

<h2>Product Positioning</h2>
<p>This week was about collapsing ambiguity into a narrative that can travel. We now have a simple articulation of the problem: <strong>too much manual effort stands between "bill arrives" and "payment scheduled," and that drag undermines both product adoption and cash-flow insight.</strong></p>

<p>We framed the opportunity as a sequence of agent-powered workflows rather than a single "big bang" feature. That lets us de-risk three things in parallel: user value, integration constraints (Melio, banking, approvals), and organizational appetite for more autonomous behavior in core financial flows.</p>

<p>Importantly, <em>we are treating Xerocon as a forcing function, not a finish line.</em> The plan is to have something <em>visibly real</em> to show while keeping the long-term surface area small enough that we can pivot as we learn more about markets and platform constraints.</p>

<h2>Tech summary</h2>
<p>On the technical side, this week was storming in the best sense: we pushed hard on constraints instead of pretending they don't exist. The big one is familiar: <strong>Melio has limited APIs, and anything we design has to respect that reality.</strong> That means our first wins will come from the Xero side of the house — data extraction, matching, and workflow — while we prototype thinner integrations on the payments rail side.</p>

<p>We sketched a minimal architecture that keeps the "agent brain" separate from product surfaces:</p>
<ul>
  <li>An orchestration layer that owns state and safety rails for agent runs.</li>
  <li>Task-specific tools (invoice parsing, supplier lookup, terms inference, risk checks) that can evolve independently.</li>
  <li>Clear contracts to the existing approvals and payments flows so we can bolt the agent on without rewriting them.</li>
</ul>

<p>Nothing is over-engineered yet; we are deliberately choosing easy to delete/iterate-on prototypes over beautiful abstractions in week one. But we did come out of the week with shared language about what a responsible agent architecture looks like inside a financial system. Stay tuned.</p>

<h2>What we are building and why</h2>
<p>Here's how things are coming together so far, based on what we pitched to Areti a few weeks ago and what's starting to emerge from the PRDs.</p>

<p><strong>Bill Automation Agent</strong> — an opinionated workflow that takes an incoming bill (PDF, email, upload), extracts the right data, connects it to the right supplier, proposes payment timing that respects both terms and cash position, and hands a clean, low-friction decision to the approver.</p>

<p>We are deliberately staying close to three user promises:</p>
<ul>
  <li><strong>"Zero bill entry."</strong> The system handles the tedious parts of getting a bill into Xero.</li>
  <li><strong>"Confident cash-flow visibility."</strong> Bills show up in a way that makes forward-looking cash obvious, not opaque.</li>
  <li><strong>"Trustworthy autonomy."</strong> The agent behaves predictably, explains itself, and fails safe when it's not sure.</li>
</ul>

<p>Why this, why now? Because bill payment is the clearest, most immediate intersection of AI capability, customer pain, and Xero's strategic need to deepen payments usage. If we can make bills feel "handled" without making customers feel out of control, we unlock both product satisfaction and transaction volume. <a href="https://xero.atlassian.net/wiki/spaces/XFS/pages/271936520396">Learn more: Payments Agents Suite Summary for Areti</a>.</p>

<h2>Agent lineup and PRDs</h2>
<p>The full agent list — Bill Enrichment, Bill Runner, Cash Flow Optimizer, Approval Automation, Safety Shield, Just Pay, plus approval workflow and roster work — lives on the <a href="https://xero.atlassian.net/wiki/spaces/XFS/pages/271929344649">Payments Agents Hub</a>. Priorities (P0/P1/P2), squads, and PRD/ADR links are there. Some agents are already moving; others are still in definition. We're okay with that spread.</p>

<p>First-cut PRDs that Jenny called out (more to come):</p>
<ul>
  <li><a href="https://xero.atlassian.net/wiki/spaces/XFS/pages/271903392336">Just Pay for Bills</a></li>
  <li><a href="https://xero.atlassian.net/wiki/spaces/XFS/pages/271930622046">Safety Shield</a>, aka Risk Radar (PRD and ADR)</li>
  <li><a href="https://xero.atlassian.net/wiki/spaces/XFS/pages/271910174842/PRD+-+Payments+-+Bill+Runner+Agent+-+Global">Bill Runner</a></li>
</ul>

<h2>Rituals and meetings</h2>
<p>We're setting up NH and SH 30m syncs that lean heavily on Show &amp; Tell rather than meetings that feel like they could have been a Slack update. Speaking of Slack updates, we're quite active on <a href="https://xero.enterprise.slack.com/archives/C0AGMBC51U0">#payments-agents-team</a>. Each day we're doing asynchronous updates to make sure we're seeing everything holistically as we go.</p>

<h2>Foundational approvals engine (Michael But)</h2>
<p><strong>Michael But</strong> is leading work on the foundational approvals engine that underpins how bills (and other workflows) get routed, approved, and tracked. This is the plumbing that our agents will plug into — approval workflow enablement and approvals engine foundations sit on Squad 04's plate. Staying aligned with this work is critical so our agent experiences don't assume capabilities that aren't there yet.</p>

<h2>Agent Patterns across the company (Brett Edmonds)</h2>
<p>A separate team, run by <strong>Brett Edmonds</strong>, is defining <strong>agent patterns</strong> that apply across Xero — shared UX patterns, plan details, control centre, escalation, audit trail, and the JAX superagent mental model. That work is cross-domain and cross-surface; it's where "one coherent system" for agents gets designed. <strong>It's important to stay synced</strong> so payments agents align with those patterns as they firm up.</p>

<h2>Cursor and Confluence: omnidirectional sync</h2>
<p>We're running an <strong>omnidirectional sync</strong> between Cursor (where we edit in the repo) and Confluence (where the rest of the org reads). Source of truth for the hub and weekly updates lives in the repo; scripts push content into Confluence so the hub and pages like this one stay current. When we need to reflect Confluence edits back into the repo, we use a read-page flow and then merge by hand so history stays clear. The goal: one story, two surfaces — Confluence for visibility, repo for version control and agents. <a href="https://xero.atlassian.net/wiki/spaces/XFS/pages/271936290821">Learn more: Cursor–Confluence bi-directional sync</a>.</p>`;

async function main() {
  const config = await getConfluenceConfig();
  const existing = await getPageById(PAGE_ID, config);
  const page = await updatePage({
    pageId: PAGE_ID,
    title: PAGE_TITLE,
    content: BODY_STORAGE,
    version: existing.version.number,
    parentId: XFS_FOLDER_ID,
    config,
  });
  const url = getConfluencePageUrl(page.id, config.baseUrl);
  console.log("Updated page:", page.title, "(" + page.id + ")");
  console.log("URL:", url);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
