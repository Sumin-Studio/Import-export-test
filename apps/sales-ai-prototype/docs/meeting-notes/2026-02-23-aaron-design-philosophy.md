# Aaron Chat: Design Philosophy & Prototype Strategy

**Date:** 2026-02-23

---

## Design Philosophy

### Entry Point Problem
- Current JAX implementation fails as primary interaction
- Nobody visits bills as a destination to click unlabeled buttons
- Need "shut up and take my money" moments that prove value immediately

### Dashboard Integration
- Show "higher than usual bills next week" directly in bills view
- Enable JAX discussion as secondary option, not primary path
- **Three-screen rule**: must demonstrate value without verbal explanation

## Product Strategy: Vegetables vs Candy

### Current approach is backwards
- 75% JAX, 25% product should be **reversed**
- Using AI to plug holes in poorly designed experiences
- Need foundational product improvements before AI enhancement

### Recommended approach
1. Fix core table functionality and row-level actions first
2. Add AI as 5% enhancement on top of solid foundation
3. Focus on gestural vs traditional interactions hierarchy

> "Xero could be 50-75% smaller with better design patterns"

## Prototype Concepts

### Bill approval workflow improvements
- Plan mode for cash flow management (standard/growth/conservative)
- Anomaly detection for 40% increases with contextual alerts
- Streamlined authorization flow for managers via mobile

### Three variations tested
1. Smart bill recommendations with inline actions
2. Authorization vs anomaly separation for different user roles
3. Repeat payment shortcuts bypassing formal contact/bill setup

### Team feedback
- Prototypes felt like "too many vegetables" despite good flows

## Implementation Strategy

### Weekend API rebuild concept
- Use existing Xero APIs to demonstrate simplified experience
- Side-by-side comparison with current product
- Highlight trade-offs: remove complexity to enable better core features

### Multiplayer orchestration vision
- Combine human and AI task assignments in unified dashboard
- Avoid separate "agent status" vs "people status" interfaces
- Bridge AB/SB relationship workflows to prevent customer confusion

### Key principle
- Focus on no-AI version first, then layer AI enhancements strategically
