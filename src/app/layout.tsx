// ./app/layout.tsx
import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat', weight: ['500', '600', '700', '800'], });
const openSans = Open_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-open-sans', weight: ['400', '600'], });

export const metadata: Metadata = {
    title: {
      template: '%s | Oeste Paraná Notícias',
      default: 'Oeste Paraná Notícias - As últimas notícias da sua região',
    },
    description: 'Fique por dentro das últimas notícias e acontecimentos do Oeste do Paraná.',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-neutral-50 font-body text-neutral-700 antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}