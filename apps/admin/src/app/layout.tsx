import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CARMACONCIERGE Admin',
  description: 'Admin panel for CARMACONCIERGE vehicle management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
