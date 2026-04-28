import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'New invoice | Xero',
  description: 'Automatic payments prototype',
  robots: { index: false, follow: false },
}

const XUI_VERSION = '23.1.0'
const XUI_STYLESHEET = `https://edge.xero.com/style/xui/${XUI_VERSION}/xui.min.css`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="xui-html">
      <head>
        <link rel="stylesheet" href={XUI_STYLESHEET} />
      </head>
      <body className="xui-body">
        <div className="ap-page">{children}</div>
      </body>
    </html>
  )
}
