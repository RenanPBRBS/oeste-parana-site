// ./app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Nossas importações
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Define um padrão para os títulos. %s será substituído pelo título da página específica.
  title: {
    template: '%s | Oeste Paraná Notícias',
    default: 'Oeste Paraná Notícias - As últimas notícias da sua região', // Título padrão (para a homepage)
  },
  description: 'Fique por dentro das últimas notícias e acontecimentos do Oeste do Paraná. Cobertura completa sobre agronegócio, política, esportes e cidades.',
  
  // Metadados para redes sociais (Open Graph)
  openGraph: {
    title: 'Oeste Paraná Notícias',
    description: 'As últimas notícias e acontecimentos do Oeste do Paraná.',
    url: 'https://www.oesteparana.com.br', // IMPORTANTE: Trocar pela URL real do seu site quando tiver uma
    siteName: 'Oeste Paraná Notícias',
    images: [
      {
        // IMPORTANTE: Criar e colocar uma imagem padrão para compartilhamento
        url: 'https://www.oesteparana.com.br/og-image.png', 
        width: 1200,
        height: 630,
      },
    ],
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
    <html lang="pt-BR">
      {/* Adicionamos classes aqui para garantir que o footer fique no final da página,
        mesmo em páginas com pouco conteúdo.
      */}
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        {/* A tag <main> representa o conteúdo principal da página */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}