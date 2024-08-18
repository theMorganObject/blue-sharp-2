import type { Metadata } from 'next';
import { Explora } from 'next/font/google';
import './globals.css';

const explora = Explora({ weight: '400', display: 'swap', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blue Sharp no. 2',
  description: 'Echoes of a Venetian Moment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={explora.className}>{children}</body>
    </html>
  );
}
