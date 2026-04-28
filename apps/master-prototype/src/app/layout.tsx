import type { Metadata } from "next";
import "@/lib/polyfills";
import "./globals.css";
import { cookies } from "next/headers";
import { REGIONS } from "./lib/regions";
import ClientRoot from "./ClientRoot";

export const metadata: Metadata = {
  title: "Design prototype",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const region = cookieStore.get("region")?.value || REGIONS.DEFAULT;
  return (
    <html className="scroll-pt-36 scroll-smooth" lang="en">
      <body className="bg-background-primary font-body antialiased motion-reduce:transition-none motion-reduce:hover:transform-none">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                let lastPathname = window.location.pathname;
                const scrollToTop = () => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                };
                const checkPathname = () => {
                  const currentPathname = window.location.pathname;
                  if (currentPathname !== lastPathname) {
                    lastPathname = currentPathname;
                    scrollToTop();
                  }
                };
                window.addEventListener('popstate', scrollToTop);
                setInterval(checkPathname, 100);
                scrollToTop();
              })();
            `,
          }}
        />
        <ClientRoot initialRegion={region}>{children}</ClientRoot>
      </body>
    </html>
  );
}
