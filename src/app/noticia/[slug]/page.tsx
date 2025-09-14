// ./app/noticia/[slug]/page.tsx

import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import RecentPosts from '@/components/RecentPosts';
import BannerPublicitario from '@/components/BannerPublicitario';
import ViewCounter from '@/components/ViewCounter';

// Tipos 'planos' que correspondem à realidade da sua API (sem "attributes")
type ImagemNoticia = {
  url: string;
};

type Noticia = { 
  id: number; // <-- Adicionar esta linha
  titulo: string; 
  resumo: string; 
  conteudo: string; 
  imagem_destaque: ImagemNoticia | null; 
  slug: string; 
};

// Função de busca drasticamente simplificada para corresponder à API
async function fetchNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?filters[slug][$eq]=${slug}&populate=*`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) return null;

    const responseJson = await res.json();

    if (!responseJson.data || responseJson.data.length === 0) {
      return null; // Notícia não encontrada
    }
    
    // A API já retorna o objeto no formato que queremos.
    // Apenas retornamos o primeiro (e único) item do array 'data'.
    return responseJson.data[0];

  } catch (error) {
    console.error("Erro em fetchNoticiaBySlug:", error);
    return null;
  }
}

// ===================================================================
// 2. ADICIONAR ESTA NOVA FUNÇÃO PARA GERAR O SEO
// ===================================================================
type Props = {
    params: { slug: string }
  };
  
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Busca os dados da notícia novamente (Next.js otimiza isso para não fazer a mesma busca duas vezes)
    const noticia = await fetchNoticiaBySlug(params.slug);
  
    if (!noticia) {
      return {
        title: "Notícia não encontrada",
      }
    }
  
    return {
      title: noticia.titulo, 
      description: noticia.resumo, // O resumo da notícia será a descrição no Google!
    }
  }
  // ===================================================================

// O componente da página não precisa de alterações, pois ele já espera os dados 'planos'
export default async function PaginaNoticia({ params }: { params: { slug: string } }) {
  const noticia = await fetchNoticiaBySlug(params.slug);

  if (!noticia) { notFound(); }
  
  const placeholderImage = 'https://placehold.co/1200x600/e2e8f0/64748b?text=Sem+Imagem';
  const imageUrl = noticia.imagem_destaque
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}`
    : placeholderImage;

  return (
    <div className="container mx-auto px-4 py-8">
      <ViewCounter noticiaId={noticia.id} />
      {/* Container principal com Flexbox para criar o layout de 2 colunas em telas médias/grandes */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Coluna Principal (Conteúdo da Notícia) */}
        <main className="w-full md:w-2/3">
          <article>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{noticia.titulo}</h1>
            <p className="text-lg text-gray-600 mb-6">{noticia.resumo}</p>
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src={imageUrl} alt={noticia.titulo} fill style={{ objectFit: 'cover' }} priority />
            </div>
            <div className="prose lg:prose-xl max-w-none">
              <ReactMarkdown>{noticia.conteudo}</ReactMarkdown>
            </div>
          </article>
        </main>
        
        {/* Barra Lateral (Sidebar) */}
        <aside className="w-full md:w-1/3">
          <div className="sticky top-24 space-y-8"> {/* 'sticky top-24' faz a sidebar "seguir" o scroll */}
            <RecentPosts currentPostSlug={noticia.slug} />
            <BannerPublicitario local="lateral-artigo" />
          </div>
        </aside>

      </div>
    </div>
  );
}