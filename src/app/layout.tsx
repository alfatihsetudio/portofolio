import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Portfolio | Clean & Dynamic',
  description: 'A cinematic and dynamic portfolio designed with a mobile-first approach.',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen selection:bg-white/20 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
