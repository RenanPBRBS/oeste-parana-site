// ./app/page.tsx
import CardNoticia from "@/components/CardNoticia";
import BannerPublicitario from "@/components/BannerPublicitario";
import MostViewedPosts from '@/components/MostViewedPosts';
import RecentPosts from '@/components/RecentPosts';
import React from 'react';

// Tipos corretos para a API "plana" com a Categoria como um objeto de relação
type ImagemNoticia = {
  url: string;
};
type Categoria = {
  nome: string;
  slug: string;
};
type Noticia = {
  id: number;
  titulo: string;
  resumo: string;
  imagem_destaque: ImagemNoticia | null;
  slug: string | null;
  // A categoria agora é um objeto ou nulo
  categoria: Categoria | null;
};

// A função de busca de dados, usando populate=* e retornando os dados "planos"
async function fetchNoticias(): Promise<Noticia[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // Usamos populate=* para pegar todas as relações (imagem e categoria)
  const endpoint = `${apiUrl}/api/noticias?populate=*`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) {
      console.error("API Response Error. Verifique as permissões no Strapi, especialmente para o UPLOAD.", res.status, res.statusText);
      throw new Error('Falha ao buscar notícias da API');

    }
    
    const responseJson = await res.json();
    
    // A sua API já retorna os dados "planos", então apenas retornamos o array 'data'
    return responseJson.data || [];
  } catch (error) {
    console.error("Erro em fetchNoticias:", error);
    return [];
  }
}

export default async function Home() {
  const noticias = await fetchNoticias();

  if (!noticias || noticias.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Nenhuma notícia encontrada.</h2>
        <p className="mt-2 text-gray-600">Verifique se há notícias publicadas no seu painel Strapi.</p>
      </div>
    );
  }

  const noticiaDestaque = noticias[0];
  const outrasNoticias = noticias.slice(1);
  const placeholderImage = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem';

  return (
    <div className="container mx-auto p-4 md:p-8">
      <BannerPublicitario local="topo-home" />

      {/* Container principal com Flexbox */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        
        {/* Coluna Principal (Conteúdo da Homepage) */}
        <main className="w-full lg:w-2/3">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-700 pl-4 mb-6">
              Destaque Principal
            </h2>
            {/* CORREÇÃO AQUI: Preenchendo todas as props */}
            <CardNoticia
              titulo={noticiaDestaque.titulo}
              categoria={noticiaDestaque.categoria}
              resumo={noticiaDestaque.resumo}
              imagemUrl={
                noticiaDestaque.imagem_destaque
                  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticiaDestaque.imagem_destaque.url}`
                  : placeholderImage
              }
              slug={noticiaDestaque.slug ?? '#'}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-700 pl-4 mb-6">
              Últimas Notícias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outrasNoticias.map((noticia, index) => (
              <React.Fragment key={noticia.id}>
                <CardNoticia
                  titulo={noticia.titulo}
                  categoria={noticia.categoria}
                  resumo={noticia.resumo}
                  imagemUrl={
                    noticia.imagem_destaque
                      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}`
                      : placeholderImage
                  }
                  slug={noticia.slug ?? '#'}
                />
                {/* Se este for o segundo item da lista (index 1), adiciona um anúncio depois dele */}
                {index === 1 && (
                  <div className="md:col-span-2"> {/* Ocupa a largura de 2 colunas no desktop */}
                    <BannerPublicitario local="home-meio-lista" />
                  </div>
                )}
              </React.Fragment>
            ))}
            </div>
          </section>
        </main>

        {/* Barra Lateral (Sidebar) da Homepage */}
        <aside className="w-full lg:w-1/3">
          <div className="sticky top-24 space-y-8">
            <MostViewedPosts />
            <RecentPosts currentPostSlug={noticiaDestaque.slug ?? ''} />
          </div>
        </aside>

      </div>
    </div>
  );
}