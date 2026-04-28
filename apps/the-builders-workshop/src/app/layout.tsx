import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/providers/auth-provider";
import { DatabaseStatusProvider } from "@/providers/database-status";
import "./globals.css";

const nora = Nunito({
  variable: "--font-nora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Builders Workshop",
  description:
    "Xero's workshop for designers leveling up as builders—with Cursor, GitHub, and AI-assisted prototyping.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nora.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen font-sans`}
        style={{ fontFamily: "var(--font-nora), system-ui, sans-serif" }}
      >
        <AuthProvider>
          <DatabaseStatusProvider>{children}</DatabaseStatusProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
