# Three Hero Screens: Build Plan

**Date:** 2026-02-25
**Context:** Brett's "go bigger" feedback → zero taps → the agent just does it
**Target:** 12:30 PM checkpoint with David

---

## The Pitch (one slide, three screens)

Like the Bing pitch at Microsoft: one slide, three images, instantly understood.

### Screen 1: Phone Notification — "It's Done"
- iPhone lock screen style
- Notification: **"8 bills totalling $13,000 will auto-pay at 5pm today"**
- Tap in → list of bills with reasoning for each
- Ability to teach the system: "I'm buying a $5,000 purchase this week, protect that cash flow"
- System shows modified plan: "OK, I've adjusted. Here's the new plan."
- **User posture:** Glance, confirm, go back to life

### Screen 2: Web Dashboard — "Here's What's Next"
- Desktop bills view (not JAX sidebar)
- Shows next 8 bills to pay with reasoning
- Tap into any bill → explains why this is the next priority
- Progressive disclosure: summary → detail → full context
- **User posture:** Review when you have time, drill down if curious

### Screen 3: Voice Conversation — "Just Handle It"
- OpenClaw / conversational AI style
- Quick back-and-forth:
  - "Morning. Looks like you need to pay Lumber Cutter. Want me to handle that?" "Yep."
  - "Deer & Co says you need to pay. Want me to set that up for Thursday?" "Yep."
  - "Cool. I was gonna flag — you're getting pressed on cash this week. Want me to hold off on non-urgent ones?" "Yeah, do that."
- **User posture:** Talk, confirm, back to work

## Build Approach

Single page at `/app/heroes` showing all three screens side by side:
- Left: iPhone mockup (notification → expanded → teach)
- Center: Web dashboard mockup (bills list with reasoning)
- Right: Chat conversation mockup (voice-style quick exchanges)

Each screen is interactive — tap/click through states.

## Data

Reuse bill data from existing concepts but reframe:
- 8 bills, $13,000 total
- Auto-pay at 5pm
- Reasoning for each (supplier relationship, discount, overdue, etc.)
- One anomaly to flag (the "we weren't sure about this one" moment)
