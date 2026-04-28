import type {
  ExpertReviewPlan,
  ExpertSupportOption,
  PricingPackage,
  SwitchConcept,
} from '../types/domain';

export const expertSupportOptions: ExpertSupportOption[] = [
  {
    id: 'chat',
    title: 'Chat with a payroll specialist',
    description:
      'Connect with someone who knows payroll migrations — helpful if you prefer quick answers while you work.',
    action: 'chat',
  },
  {
    id: 'schedule',
    title: 'Schedule a call',
    description:
      'Pick a time that suits you to talk through questions at your pace — no rush, no obligation.',
    action: 'schedule',
  },
  {
    id: 'specialist-review',
    title: 'Have a specialist review this for me',
    description:
      'Ask a payroll specialist to take a structured look at your import before you finalize the switch.',
    action: 'specialist_review',
  },
  {
    id: 'dismiss',
    title: 'Continue on my own',
    description: 'You can open this anytime from review if you change your mind.',
    action: 'dismiss',
  },
];

/** Calmer companion copy shown above the expert options list (concept testing — no pricing). */
export const expertHelpIntroCopy =
  'These are optional ways to connect with payroll specialists. Pick what feels right, or close and keep going — your switch stays on track either way.';

export const switchConcepts: SwitchConcept[] = [
  {
    id: 'self',
    title: 'Mostly automated, self-review',
    description:
      'You connect QuickBooks, review imported data, and complete the switch when you are satisfied.',
    benefits: [
      'Fastest path when data is clean',
      'You control every confirmation',
      'No additional service fees for the switch',
    ],
    tradeoffs: [
      'You own resolving flagged items',
      'Less hand-holding on complex tax setups',
    ],
    timeExpectation: 'About 20–45 minutes if few issues',
    userInvolvement: 'High — you review each section',
    expertInvolvement: 'None unless you request help',
  },
  {
    id: 'hybrid',
    title: 'Hybrid: automation with expert help if needed',
    description:
      'Start automated, bring in a payroll expert only for items you do not want to resolve yourself.',
    benefits: [
      'Keeps speed for straightforward data',
      'Human backup on tax and mapping questions',
      'Pay only if you use expert time',
    ],
    tradeoffs: [
      'Coordination may add a day if you escalate',
      'Pricing depends on support package',
    ],
    timeExpectation: 'Same day for you; +0–2 days if expert steps in',
    userInvolvement: 'Medium — you decide where to engage experts',
    expertInvolvement: 'On demand for flagged or complex items',
  },
  {
    id: 'expert-led',
    title: 'Fully expert-led switching service',
    description:
      'A payroll specialist leads the switch end-to-end and confirms filings setup with you.',
    benefits: [
      'Highest confidence for regulated payroll',
      'Less time spent in product for you',
      'Structured sign-off before go-live',
    ],
    tradeoffs: [
      'Takes longer to schedule',
      'Premium service cost',
    ],
    timeExpectation: 'Typically 2–5 business days',
    userInvolvement: 'Low — approvals and interviews only',
    expertInvolvement: 'High — specialist owns execution',
  },
];

export const expertReviewPlans: ExpertReviewPlan[] = [
  {
    id: 'line-review',
    name: 'Expert line review',
    price: '$79',
    billingNote: 'One-time fixed fee. Charged when your specialist starts the review.',
    summary: 'Specialist validates your import after you finish self-review.',
    includes: [
      'Review of pay items, employees, schedules, and YTD totals you imported',
      'Written summary of any remaining risks or follow-ups',
      'Up to one round of clarification messages',
    ],
    bestFor: 'Smaller teams who fixed flagged items and want a second set of eyes',
  },
  {
    id: 'full-verify',
    name: 'Full expert verification',
    price: '$199',
    popular: true,
    billingNote: 'Fixed fee. Charged when scope is confirmed and work begins.',
    summary: 'Deeper verification plus tax-setup alignment before you switch.',
    includes: [
      'Everything in Expert line review',
      'Cross-check of tax-related totals and filing context',
      'Live or async walkthrough of open questions',
      'Sign-off checklist you can keep for records',
    ],
    bestFor: 'Most businesses switching payroll for the first time on Xero',
  },
  {
    id: 'concierge',
    name: 'Concierge switch',
    price: 'From $399',
    billingNote: 'Final price confirmed on a short scope call before any charge.',
    summary: 'A specialist drives the switch with you from review through go-live.',
    includes: [
      'Everything in Full expert verification',
      'Hands-on help resolving complex mappings and history issues',
      'Coordination until you are ready to run payroll in Xero',
    ],
    bestFor: 'Multi-state, high headcount, or compliance-sensitive payroll',
  },
];

export function getExpertReviewPlan(id: string | null | undefined): ExpertReviewPlan | undefined {
  if (!id) return undefined;
  return expertReviewPlans.find((p) => p.id === id);
}

/** Final step — specialist follow-up (concept testing; no pricing). */
export const expertReviewModalCopy = {
  specialistLabel: 'Payroll specialist',
  specialistBlurb:
    'A payroll specialist can walk through your import with you and flag anything that deserves a second look before you go live.',
  timelineTitle: 'What usually happens next',
  timeline: [
    { label: 'Request received', detail: 'You get a confirmation with what you asked for.' },
    { label: 'Specialist assigned', detail: 'Usually within about one business day.' },
    { label: 'Review complete', detail: 'Often within a couple of business days for typical payrolls.' },
  ],
};

export const pricingPackages: PricingPackage[] = [
  {
    id: 'included',
    name: 'Automated switching included',
    headline: 'Included with Xero Payroll',
    description:
      'Connect QuickBooks, import data, and resolve flagged items yourself using guided review.',
    notes: 'For comparison only — not a binding quote.',
  },
  {
    id: 'optional-review',
    name: 'Automated switching + optional expert review',
    headline: 'Add expert review before you switch',
    description:
      'Complete your review, then have a certified payroll expert verify mappings and tax setup.',
    notes: 'Adds time for human verification before go-live.',
  },
  {
    id: 'full-service',
    name: 'Fully expert-led switching support',
    headline: 'Concierge-led switch',
    description:
      'A payroll specialist runs the switch with you, handles complex items, and documents sign-off.',
    notes: 'For teams that want maximum confidence and minimal self-serve time.',
    priceHint: 'Custom scope',
  },
];
