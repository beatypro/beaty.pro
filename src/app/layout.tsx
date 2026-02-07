import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Beaty.pro | Custom Software Solutions',
  description:
    'Full-stack development, real-time systems, and enterprise solutions by Christopher Beaty',
  keywords: [
    'software development',
    'full-stack',
    'Next.js',
    'React',
    'TypeScript',
    'Supabase',
    'PWA',
  ],
  authors: [{ name: 'Christopher Beaty' }],
  openGraph: {
    title: 'Beaty.pro | Custom Software Solutions',
    description:
      'Full-stack development, real-time systems, and enterprise solutions',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
