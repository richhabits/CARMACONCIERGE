import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CARMACONCIERGE | UK Car Services',
  description: 'Professional car services across the UK. MOT, servicing, repairs, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="antialiased">{children}</body>
    </html>
  );
}