// ./app/page.tsx
import React from 'react'; // Importar React para usar <React.Fragment>
import CardNoticia from "@/components/CardNoticia";
import HeroPost from "@/components/HeroPost"; // Novo componente para o post principal
import MostViewedPosts from "@/components/MostViewedPosts";
import BannerPublicitario from "@/components/BannerPublicitario";
import type { Metadata } from 'next';

type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = {
  id: number;
  titulo: string;
  resumo: string;
  imagem_destaque: ImagemNoticia | null;
  slug: string | null;
  categoria: Categoria | null;
  publishedAt: string; // Para ordenação
};

async function fetchNoticias(): Promise<Noticia[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // Ordena por data de publicação e popula tudo
  const endpoint = `${apiUrl}/api/noticias?sort=publishedAt:desc&populate=*`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    const responseJson = await res.json();
    return responseJson.data || [];
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}

// Seu metadata permanece o mesmo
export const metadata: Metadata = {
  title: 'Homepage',
  // ... (resto do seu metadata)
};

export default async function Homepage() {
  const noticias = await fetchNoticias();

  if (!noticias || noticias.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center text-neutral-700 font-body">
        <p>Nenhuma notícia encontrada no momento. Por favor, cadastre algumas no Strapi.</p>
      </div>
    );
  }

  const principalNoticia = noticias[0];
  const outrasNoticias = noticias.slice(1); // Todas as outras notícias

  const placeholderImage = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 font-body">
      {/* Coluna principal com a notícia em destaque */}
      <div className="md:col-span-2 space-y-8">
        {principalNoticia && (
          <HeroPost
            titulo={principalNoticia.titulo}
            categoria={principalNoticia.categoria}
            resumo={principalNoticia.resumo}
            imagemUrl={
              principalNoticia.imagem_destaque
                ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${principalNoticia.imagem_destaque.url}`
                : placeholderImage
            }
            slug={principalNoticia.slug ?? '#'}
          />
        )}

        {/* Seção "Mais Notícias" */}
        <section>
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-6 pb-2 border-b-2 border-primary">
            Últimas Notícias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* Anúncio no meio da lista, após o terceiro card */}
                {index === 2 && ( // Após o 3º item (índice 2)
                  <div className="md:col-span-2 lg:col-span-3 mt-8"> {/* Ocupa toda a largura */}
                    <BannerPublicitario local="home-meio-lista" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar - Coluna lateral */}
      <aside className="md:col-span-1 space-y-8">
        <BannerPublicitario local="lateral-artigo" />
        <MostViewedPosts />
        {/* Podemos adicionar mais banners ou componentes aqui */}
      </aside>
    </div>
  );
}