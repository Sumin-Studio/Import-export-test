# Pratik Deep Dive: AB/SB Handover, Context Building, System Architecture

**Date:** 2026-02-24
**Participants:** Jon Bell, Pratik Rathod

---

## Current AI Design Challenges

- If we're not rooted in real user problems, we'll get L1 ideas
  - Diya talks to customers all the time — she understands this well
  - Surface level understanding leads to obvious solutions
- Competitors like Apron and Ramp have been doing similar features for years
- Team struggling with balance between "sizzle reel" presentations vs functional design
  - Need to show movie explosion in trailer vs writing the screenplay
  - Current approach feels like putting everything in "AI ghetto" instead of improving core product

## AB/SB Handover & Multi-Client Workflows

Focus needed on what AI really means for accountants managing multiple clients:
- Time-poor professionals doing low-margin work
- Need consistent workflows across ALL client businesses
- Reduce friction in "do it together" flows:
  - Chasing documents when bills don't have files attached
  - Verifying goods receipt before payment
  - Streamlining handover communications
- Accountants want to deploy workflow schemes across multiple clients
  - Same processes and tagging systems for all businesses they manage
  - Cross-client reporting capabilities

## Context Building & Data Integration

### Key insight: "The map is not the territory" (continued)

> "This is cool that you're trying to make assumptions, but you're wrong"

- Xero's data isn't the complete picture of business operations
- SBs have offshore accounts, inventory systems, CRMs
- **The "adding salt to the soup moment"** — gain right context iteratively
  - Not a failure state when AI makes wrong assumptions
  - Need mechanisms to learn and improve recommendations

### Cortana Notebook Approach
- Transparency in AI decision-making
- Users should understand what system thinks about them
- Ability to correct assumptions without connecting all data sources

### External System Integration
- Email integration to catch discount offers or disputes
- Inventory system connections to flag delivery issues
- **"I know you're seeing other people, I want to help"** philosophy

## System Architecture for Accounting Documents

Three core capabilities needed for all accounting documents:
1. Accountants overloading invoice/bill references with job site numbers
2. AI-powered tagging rules for recurring expenses, marketing costs
3. Tags particularly important for AB workflows

### Tags as Strategic Lever
- Deploy consistent tagging schemes across multiple clients
- Enable cross-client reporting and analysis
- Xero positioned to remain system of record while integrating with ecosystem
- **Accept that other tools exist and work with them**
- Focus on being the hub rather than trying to be everything
