// ./app/layout.tsx
import type { Metadata } from 'next';
// MUDE OS NOMES AQUI PARA AS FONTES QUE VOCÊ ESCOLHEU
import { Poppins, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// E AQUI
const headingFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

// E AQUI
const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '600'],
});

export const metadata: Metadata = { /* ... seu metadata ... */ };

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="pt-BR" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-background font-body text-text-body antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}