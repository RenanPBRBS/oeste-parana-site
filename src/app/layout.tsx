// ./app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configuração das novas fontes
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

// Seu metadata continua o mesmo
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
    <html lang="pt-BR" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col bg-neutral-50 font-serif text-neutral-800 antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        {/* Adicionando um Footer mais estilizado */}
        <Footer />
      </body>
    </html>
  );
}