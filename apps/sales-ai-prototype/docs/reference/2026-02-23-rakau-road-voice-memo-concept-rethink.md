# Rakau Road Voice Memo — Concept Rethink

**Date:** 2026-02-23 (Sunday morning walk)
**Source:** Voice memo, transcribed from `Rakau Road 19.m4a`
**Context:** Jon thinking out loud about how the three swim lanes should actually work, questioning whether the chatbot is the right frame for all of them.

---

## Raw Transcript

> All right, good morning. I'm feeling good. I'm feeling like a Viking. I can go take on the world. Let's do it. All right, so the first thing I need to do today is make a more direct three-click path for how it might be for a person going through some lane one. Now, you can imagine using the big screen the big dashboard screen, and we're literally talking about three clicks. So, right now, it's from lane one. It's basically like, hey, whoops. Morning. All right, so lane one is like, tell me what I need to know, and that's like, sure. Do you want to be conservative, standard, or not? And then, based on that, you get check boxes to turn things on and off. And then, you go ahead and you pay. So, so, but there's a question of like, right, but what's the what's the fast version of this? So, so, so we want to add a concept of being fast, but also learning. So, on the front page, you show some sort of indication of status. So, you want to pull things forward as far forward as possible, just to say, yeah, it looks good. Now, do you need progressive disclosure? So, you tap into it. And you'd see more more details. So, now, right now, we're throwing it into jacks on a sidebar. But so, so, so, so, okay. So, so, so, so, so, so, hmm. So, uh-oh. So, so, so, so, so, so, so, that's the first one. Find a way to get it out of the chatbot. So, and do it just in the dashboard, and then in the bills, in a specialized bill screen. That specialized bill screen can gather things up for you. So, now, we have to think about swim lane two. So, that would mean swim lane one isn't even using a chatbot. It's a third option. Now, swim lane two, I forget what it even is. Maybe we make it a chat GPT integration. Maybe it's a pure chat GPT integration story. Hey, I'm stressed about money this week. Well, blah, blah, blah. Would you like me to pay? These are low priority. You can get them out of the way. It won't affect your cash flow, but you can, of course, click in to learn more. Thanks. So, that's number three. That could just be pure chat GPT storytelling. And then number two is maybe in the chatbot, then you receive a WhatsApp message. Yeah, that's really powerful.

---

## Analysis: What Jon Is Saying

### The core provocation: not everything belongs in the chatbot

Up until now, all three concept demos live inside the "Just Ask Xero" chat panel. Jon is questioning that assumption. The chatbot is one interaction model, but it might not be the *right* one for every swim lane. Each swim lane might deserve its own native interaction pattern.

### SL1 — Bill Pay Planner: Pull it OUT of the chatbot

**Current state:** SL1 is a JAX chatbot experience where the user says "Help me pay the bills in this screen" and gets a plan.

**Proposed rethink:** SL1 should be a **dashboard-native experience** — no chatbot at all. The reasoning:

- It should be **three clicks**: (1) see status on the dashboard, (2) tap to see details / choose your strategy (conservative, standard, growth), (3) toggle checkboxes and pay.
- The key insight is **"pull things forward as far forward as possible."** Don't make the user open a sidebar and type a prompt to see what's going on. Surface the AI's recommendation directly on the bills dashboard — a status indicator that says "yeah, it looks good" or flags issues.
- **Progressive disclosure** handles complexity: the dashboard shows the summary, tapping in shows the details, and the details let you adjust.
- A **"specialized bill screen"** gathers everything up — what's due, what's risky, what's recommended — without wrapping it in a conversational interface.

**Why this matters:** A chatbot adds friction for something that should feel like a native part of the product. If the AI already knows what to recommend, why make the user ask? Just show it.

### SL2 — Intelligent Bill Approval: Keep it in the chatbot (maybe with WhatsApp)

**Current state:** SL2 is the submitter/approver flow inside JAX, with AI flags on unusual payments.

**Proposed rethink:** SL2 stays conversational, but adds a **proactive notification layer**. The chatbot does the detailed review, but you *receive a WhatsApp message* (or push notification) that says "Hey, there's a payment run ready for your review." Jon's reaction: "Yeah, that's really powerful."

**Why this matters:** Approval workflows are inherently asynchronous — someone submits, someone else reviews later. A notification pulls the approver in at the right moment rather than requiring them to check a dashboard. The chatbot is the right place for the detailed back-and-forth ("why is this flagged?"), but the trigger should be proactive.

### SL3 — No-Bill Bill Pay: Pure conversational AI story

**Current state:** SL3 is a JAX flow where you say "Pay someone without creating a bill first."

**Proposed rethink:** SL3 could be a **pure ChatGPT/conversational AI integration story** — not even inside Xero's UI. The example: "Hey, I'm stressed about money this week." The AI responds with context, suggests low-priority bills you can clear, reassures you it won't affect cash flow, and offers to let you click in for more detail.

**Why this matters:** This positions Xero-inside-AI (the MCP/ChatGPT app model that Ben White and Lisa Huang have been exploring) rather than AI-inside-Xero. It's the "system of action" vision taken to its logical conclusion — the user doesn't even need to be in Xero to take action.

---

## The Big Reframe: Three Interaction Models

| Swim Lane | Interaction Model | Where It Lives | User Posture |
|-----------|------------------|----------------|--------------|
| **SL1** Bill Pay Planner | Dashboard-native | Inside Xero bills screen | "Show me, I'll decide" |
| **SL2** Bill Approval | Chatbot + proactive notification | JAX sidebar + WhatsApp/push | "Alert me, I'll review" |
| **SL3** No-Bill Pay | Pure conversational AI | ChatGPT / external AI app | "I'll talk, you act" |

This is a much stronger story than "three things in a chatbot." Each swim lane demonstrates a different relationship between the user and the AI, from embedded intelligence (SL1) to proactive agent (SL2) to conversational partner (SL3).

---

## Implications for the Prototype

1. **SL1 needs a dashboard view** — not just the JAX panel. This is potentially a bigger build but a much more compelling demo.
2. **SL2 needs a notification moment** — even a mocked WhatsApp message or push notification screen would sell the proactive angle.
3. **SL3 could be reframed** as a ChatGPT-style interface rather than JAX — connecting to the Ben White MCP work.
4. **The JAX frame is still useful** but becomes one of three containers rather than the only one.

## Open Questions

- How much can we realistically change before the Diya review / Xerocon?
- Does the dashboard-native SL1 require new Figma work from Darryl/Maarten?
- Should SL3 literally use a ChatGPT-style UI, or is that too confusing for stakeholders who expect everything inside Xero?
