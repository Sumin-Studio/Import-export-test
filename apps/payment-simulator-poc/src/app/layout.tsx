import type { Metadata } from "next";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Payment simulator | POC",
  description:
    "Compare checkout experiences and how they affect time-to-pay for small businesses.",
  robots: { index: false, follow: false },
};

/** Keep in sync with `package.json` → `@xero/xui` (same as mybills index.html). */
const XUI_VERSION = "23.1.0";
const XUI_STYLESHEET = `https://edge.xero.com/style/xui/${XUI_VERSION}/xui.min.css`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="xui-html">
      <head>
        <link rel="stylesheet" href={XUI_STYLESHEET} />
      </head>
      <body className="xui-body">
        <div className="pspoc-page">{children}</div>
      </body>
    </html>
  );
}
