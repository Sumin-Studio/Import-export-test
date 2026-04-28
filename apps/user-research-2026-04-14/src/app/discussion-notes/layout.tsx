import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discussion notes · User research",
  robots: { index: false, follow: false },
};

export default function DiscussionNotesLayout({
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
