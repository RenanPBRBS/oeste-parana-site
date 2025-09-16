// ./app/layout.tsx
import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google'; // Novas fontes
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configuração das novas fontes
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'], // Pesos que usaremos
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '600'], // Pesos que usaremos
});

// Seu metadata continua o mesmo, com pequenas atualizações para OpenGraph
export const metadata: Metadata = {
    title: {
      template: '%s | Oeste Paraná Notícias',
      default: 'Oeste Paraná Notícias - As últimas notícias da sua região',
    },
    description: 'Fique por dentro das últimas notícias e acontecimentos do Oeste do Paraná. Cobertura completa sobre agronegócio, política, esportes e cidades.',
    openGraph: {
        title: 'Oeste Paraná Notícias',
        description: 'As últimas notícias e acontecimentos do Oeste do Paraná.',
        url: 'https://oeste-parana-site.vercel.app',
        siteName: 'Oeste Paraná Notícias',
        images: [{ url: 'https://oeste-parana-site.vercel.app/og-image.png', width: 1200, height: 630, }],
        locale: 'pt_BR',
        type: 'website',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${openSans.variable}`}>
      {/* Aplicamos as fontes globais e as novas cores de fundo e texto */}
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