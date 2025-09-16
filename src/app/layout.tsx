// ./app/layout.tsx
import type { Metadata } from 'next';
// Importa as fontes do Google Fonts
import { Lato, Merriweather } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configuração das fontes
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato', // Define uma variável CSS para a fonte
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather', // Define uma variável CSS para a fonte
});

export const metadata: Metadata = {
  // ... (seu metadata continua o mesmo)
  title: {
    template: '%s | Oeste Paraná Notícias',
    default: 'Oeste Paraná Notícias - As últimas notícias da sua região',
  },
  description: 'Fique por dentro das últimas notícias e acontecimentos do Oeste do Paraná. Cobertura completa sobre agronegócio, política, esportes e cidades.',
  // ... (resto do seu metadata)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Aplicamos as variáveis das fontes e as novas cores base
    <html lang="pt-BR" className={`${lato.variable} ${merriweather.variable}`}>
      <body className="min-h-screen flex flex-col bg-background font-serif text-text-primary">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}