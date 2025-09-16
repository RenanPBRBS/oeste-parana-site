// ./app/layout.tsx
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google'; // Nova fonte
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configuração da fonte Roboto
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
    title: {
      template: '%s | Oeste Paraná - G1', // Atualizamos o template
      default: 'Oeste Paraná - G1',
    },
    description: 'As últimas notícias do Oeste do Paraná.',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="pt-BR" className={roboto.variable}>
      <body className="min-h-screen flex flex-col bg-neutral-100 font-sans text-neutral-800 antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}