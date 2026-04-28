/**
 * Copy + routing for the fake xero.com shell. Edit here without touching app routes.
 */
export const fakeXeroComConfig = {
  /** Path to the checkout preview simulator (must match `app/preview/page.tsx`). */
  pocPreviewPath: "/preview",
  pocCtaLabel: "Try it yourself",
  heroCardTitle: "Experience the seamless checkout your customers will love.",
  heroCardBody:
    "Add your own branding and explore different payment options without sign up.",
  disclaimerLine:
    "Prototype UI for demonstration only — not the real xero.com website.",
  /** Hero card phone mockup (replace when Figma exports update). */
  heroPhoneMockupSrc: "/fake-xero-hero-phone-mockup.png",
  /** Intrinsic pixel size of the mockup asset (aspect ratio; display scales with CSS). */
  heroPhoneMockupWidth: 570,
  heroPhoneMockupHeight: 916,
} as const;
