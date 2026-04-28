import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discussion guide · User research",
  description:
    "Facilitator checklist for Xero Protect + Purchases Overview sessions.",
  robots: { index: false, follow: false },
};

export default function DiscussionGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#e8f2fc]">
      {children}
    </div>
  );
}
