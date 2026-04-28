# Building a Team-Standard MCP Server With Agents for Design Workflows

## Background and the “one way” goal

You’re describing a very specific (and very proven) **standardization problem**: there are many possible ways to “pull down Figma,” “talk to Confluence,” “connect to user data,” “get transcriptions,” etc., and without an opinionated default, the organization drifts into **tool sprawl + inconsistent practices**. That exact problem is why platform engineering teams popularized **“golden paths”** (also called paved roads / happy paths): an **opinionated, supported, end-to-end workflow** that reduces cognitive load and encodes compliance and operational standards. citeturn10search1turn10search2turn10search27

For your design org at entity["organization","Xero","accounting software company"], an “agents MCP server” can be treated as a *design-platform golden path*: a curated integration layer that makes “how we do X” consistent, measurable, and secure across multiple agentic clients (IDE agents, chat agents, internal tools). citeturn10search1turn10search2turn3view1

A key nuance from the precedent: **a golden path isn’t just a doc**. At Spotify, the “Golden Path” is explicitly an “opinionated and supported” path, surfaced and maintained as part of an internal developer portal (Backstage), and it exists specifically because “ask a colleague” becomes the default when workflows fragment. citeturn10search1turn1search13

## What MCP standardizes and what it doesn’t

MCP is primarily an **integration protocol**. In the MCP spec, communication is JSON-RPC 2.0 over stateful connections between hosts, clients, and servers; servers expose **resources, prompts, and tools**, while clients may expose **sampling, roots, and elicitation**. citeturn3view1

That division matters for your “agents in it” goal:

- MCP gives you the *standardized surface area* for tools/resources/prompts. citeturn3view1turn6view0turn6view5  
- “Agents” (routing, orchestration, long-horizon deep research) are usually implemented *above* MCP (in the host/client) **or** *inside* specific MCP servers that use MCP primitives (especially sampling) to do multi-step work. citeturn6view3turn12view0

### Transport choices become architecture choices

The spec currently defines two standard transports: **stdio** (client launches server as subprocess) and **Streamable HTTP** (server runs independently; POST/GET; optional SSE for streaming). Streamable HTTP replaces the older HTTP+SSE transport and adds explicit security requirements like `Origin` validation to mitigate DNS rebinding. citeturn4view0

For your “personal proof of concept → team service” path, this maps cleanly:

- POC: stdio is extremely practical and matches how many local MCP workflows start. citeturn4view0  
- Team-scale: Streamable HTTP is the realistic baseline for a shared server, because it supports multiple clients and session concepts and is designed for remote deployments. citeturn4view0

### Authorization is now a first-class MCP concern

The MCP authorization spec is explicitly built around **OAuth 2.1**. It requires MCP servers to implement **Protected Resource Metadata** for authorization server discovery, and it requires clients to use **PKCE** (and to refuse authorization if PKCE support can’t be verified via metadata). citeturn5view0turn5view3turn5view2

This is important strategically: it points you toward a future where “team MCP” is not just a local dev tool—it’s an **enterprise integration surface**, with identity and “act on behalf of the user” semantics that must survive audit and governance. citeturn5view1turn2view2

## Ecosystem precedents that are directly relevant

The strongest “copy these patterns” precedents for your exact use case are vendor-run MCP servers for design and knowledge tools, plus agent frameworks that treat MCP integrations as building blocks.

### Vendor-run MCP servers as “how the big teams do it”

entity["company","Figma","design software company"] now documents an official “Figma MCP server” that brings design context (like variables and components) into dev environments and agentic tools. They also explicitly distinguish between a **desktop MCP server** and a **remote MCP server hosted by Figma** for browser usage—i.e., a first-party example of your “local POC → shared remote” evolution. citeturn9view1turn9view0

entity["company","Atlassian","software company"] provides a comparable precedent with its **Rovo MCP Server** positioning: it is described as a cloud-hosted gateway that enables external AI tools to securely access Jira/Compass/Confluence Cloud data and perform read/write actions via MCP. citeturn9view4turn9view3  
Notably, Atlassian’s public positioning includes: OAuth authentication, granular permission controls, admin control of trusted AI domains, and clear plan-based call limits. citeturn9view3

On the IDE side, entity["company","Microsoft","technology company"]’s VS Code MCP post frames “full MCP spec support” as including authorization, prompts/resources, and sampling—explicitly calling the authorization spec “the biggest leap forward” and emphasizing remote MCP servers that can scale while maintaining enterprise-grade security postures. citeturn2view2

### Community servers as implementation mines

The official MCP “servers” repository is explicit that it houses **reference implementations**, points people to the **official MCP Registry** for a broader list, and warns that these reference servers are not production-ready solutions by default. citeturn2view1turn8search1  
That repo (plus the registry) is useful for you specifically as precedent for: tool naming, capability negotiation, and packaging/deployment patterns. citeturn2view1turn8search7

For Figma and Confluence specifically, there are widely used open-source servers you can examine for conventions and edge-case handling, such as GLips’ Figma Context MCP server and community Confluence MCP servers. citeturn9view6turn9view7

### Agent frameworks built around MCP

A high-signal precedent for “agents inside/alongside MCP” is entity["company","GitHub","software platform"]-hosted open-source like LastMile AI’s `mcp-agent`, which explicitly describes MCP as “low-level” and positions itself as handling server connections, durable execution, human input signals, and even exposing an `MCPApp` as a standard MCP server (i.e., a “server-of-servers” / workflow façade). citeturn12view0

This is relevant because it shows a workable architecture where:
- your **team-standard connectors** can be MCP servers, and  
- your **team-standard workflows (“agents”)** can also be exposed as MCP tools/prompts (with durable execution, approvals, etc.). citeturn12view0

## Reference architecture for an “agentsMCP” server that enforces “one way”

The most robust way to interpret “ONE way to do X” is: **a governed tool surface** with stable semantics, backed by separate connector implementations, and fronted by a single entrypoint that can be used by different MCP clients.

A practical reference architecture, grounded in the current MCP spec and ecosystem patterns, looks like this:

### A single MCP entrypoint (gateway) plus modular connector servers

At small scale, it’s tempting to put everything in one server. But MCP tooling tends to grow quickly, and the ecosystem is already reacting to tool sprawl. entity["company","Anthropic","ai company"] describes a very concrete scaling pain: tool definitions and intermediate results can overwhelm context windows and increase cost/latency; their recommended mitigation includes tool discovery and “code execution with MCP” so tools can be loaded and used on demand rather than dumped into context. citeturn11view0

In practice, “team standardization” usually pushes you toward:

- **Connector servers**: `figma`, `confluence`, `user-data`, `transcription`, etc. Each encapsulates auth, rate limits, caching, and a minimal, stable tool set aligned to your team’s workflow. citeturn3view1turn4view0turn9view1  
- **A gateway MCP server**: a single MCP endpoint used by the team that federates/curates tools from those connector servers, centralizes policy and telemetry, and enforces naming/versioning conventions. This “gateway pattern” is being discussed explicitly in the MCP ecosystem as the difference between a demo and a sustainable internal platform. citeturn11view5

(If you later decide to avoid a custom gateway, the same “aggregation” idea also appears in frameworks like `mcp-agent` via an aggregator that can combine toolsets across multiple MCP servers. citeturn12view0)

### Standardizing “ONE way” means standardizing tool semantics, not just connectivity

MCP gives you protocol primitives, but your “ONE way” goal requires additional conventions that the protocol does not impose by itself, such as:

- Tool naming conventions and discoverability (the tools spec includes explicit recommendations for tool name character sets and uniqueness, plus the ability to signal tool list changes). citeturn6view5turn6view4  
- A decision of which operations are tools versus resources versus prompts (MCP defines all three, with prompts explicitly designed to be user-controlled and discoverable). citeturn6view0turn6view5turn3view1  
- How you represent “things” across systems (resources are URI-addressed and can be text or binary, with guidance on URI schemes and when to use `https://` vs custom schemes). citeturn5view7

A useful design principle from the spec’s safety framing: because tools can represent arbitrary code execution paths, hosts should require explicit user consent before tool invocation, and tool descriptions/annotations should be considered untrusted unless the server is trusted. citeturn3view1turn6view5  
For an internal Xero-wide rollout, that implies you’ll want to define what “trusted server” means (likely: official team gateway + vetted connector servers) and treat everything else as untrusted by default. citeturn3view1turn6view5turn9view3

### Vendor-specific constraints should influence your “one way” adapter design

**Figma API rate limiting** is explicitly different depending on OAuth apps vs personal access tokens, and is tracked per user/per plan/per app for OAuth (and per user/per plan for personal tokens). That strongly suggests that “ONE way to pull down Figma” should not be “everyone uses a shared token,” because shared-token designs concentrate rate limiting and create brittle failures. citeturn0search2turn0search6

On the Atlassian side, Confluence Cloud’s rate limiting is actively evolving, with points-based and tiered quota enforcement described as beginning March 2, 2026, and Atlassian explicitly recommending developers review updated best practices for optimizing API usage. citeturn0search3turn0search11  
This reinforces the idea that your Confluence connector should implement caching/deduplication/backoff as part of the standard path, rather than leaving rate-limit handling as each consumer’s responsibility. citeturn0search3turn0search11turn4view0

## Observability and proving value across the org

Your requirement—“statistics proving how many people are using various calls”—is not an afterthought; it’s one of the main properties that separates a personal MCP sandbox from an org platform.

### Treat tool calls as product analytics events and as distributed telemetry

Two complementary precedents exist here:

- Internal developer platforms measure ROI and adoption via **event-based analytics**. Backstage, for example, ships an Analytics API that models usage as events with action/subject/attributes/context so adopters can pipe usage data into the analytics stack of choice. citeturn11view3  
- Observability stacks measure correctness/cost/performance via traces/metrics/logs. OpenTelemetry’s GenAI semantic conventions explicitly define signals for generative AI operations, and the GenAI metrics spec explicitly notes that an “operation” may be a request to an LLM **or a function call**—which maps neatly to MCP tool invocations. citeturn2view4turn2view5

A strong “team MCP” measurement model therefore looks like:

- **Product analytics lens** (adoption/engagement): unique users, unique clients, tool invocation counts per tool, retention (weekly active users), funnel-style completion for high-value workflows. citeturn11view3turn10search5  
- **Operational lens** (reliability/cost): latency distributions per tool, success/error rates, upstream 429 rate-limit events, cache hit rates, and (where available) LLM token usage tied to the workflows. citeturn2view5turn0search2turn0search3

### “Proving value” needs both usage and outcome framing

AWS prescriptive guidance on internal developer platforms is blunt that success measurement is not straightforward, and suggests using impact-oriented metrics like DORA (deployment frequency, lead time, change failure rate, MTTR) to connect platform investments to delivery outcomes. citeturn11view4  
For a design-team MCP server, the exact outcome metrics won’t be “deploy frequency,” but the principle carries: combine raw usage counts with **cycle-time or throughput outcomes** for a few high-value workflows that you can measure consistently. citeturn11view4turn10search5

Example outcome frames that tend to work well for design/platform tooling (because they can be instrumented without guessing intent) include: “time-to-first-usable-asset,” “time-to-draft-doc,” “time-to-request-ready research summary,” or percentage of workflows completed via the standard path vs bypassed. citeturn10search5turn10search2

## Security, privacy, and operational guardrails for team-scale MCP

MCP’s own spec is explicit that it enables powerful capabilities (arbitrary data access and code execution paths) and therefore requires strong attention to user consent, privacy, and tool safety. citeturn3view1

At team scale, the guardrails that consistently show up in real-world deployments are:

### Secure transport and localhost safety

The Streamable HTTP transport section explicitly requires Origin validation to prevent DNS rebinding attacks, recommends binding to localhost for local running, and calls out authentication as a must-have protection. citeturn4view0

This is not theoretical. The MCP TypeScript SDK published a security advisory noting that DNS rebinding protection was not enabled by default for HTTP-based servers running on localhost (pre-1.24.0), and that unauthenticated localhost servers are not recommended under MCP security best practices. citeturn11view1turn4view0

### OAuth by default for remote/team deployments

The MCP authorization spec’s reliance on OAuth 2.1, resource metadata discovery, and PKCE (with strict client requirements) implies your “team MCP” should treat OAuth as a baseline rather than an enhancement—particularly if you want per-user attribution for usage analytics and “on behalf of” access controls. citeturn5view0turn5view2turn5view3

This aligns with vendor practice: Atlassian positions its remote MCP server as OAuth-secured with granular permission controls and admin governance of trusted AI domains. citeturn9view3turn9view4

### Rate limits, caching, and backoff are not optional

Both Figma and Atlassian ecosystems explicitly document rate limits and evolving enforcement regimes, which means your standard connector implementations should include caching, deduplication, and backoff/retry discipline as a platform responsibility—not left to each agent author. citeturn0search2turn0search3turn0search11

## Artifacts created

A folder structure matching your request has been created and populated with a curated precedent dump and synthesis notes:

[Download agentsMCP.zip](sandbox:/mnt/data/agentsMCP.zip)