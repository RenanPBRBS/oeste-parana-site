// ./app/page.tsx
import CardNoticia from "@/components/CardNoticia";
import BannerPublicitario from "@/components/BannerPublicitario";
import MostViewedPosts from "@/components/MostViewedPosts";
import RecentPosts from "@/components/RecentPosts";
import HeroPost from "@/components/HeroPost"; // Um novo componente para o destaque

// Tipos de dados (sem alterações)
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = { id: number; titulo: string; resumo: string; imagem_destaque: ImagemNoticia | null; slug: string | null; categoria: Categoria | null; publishedAt: string; };

// Função de busca (sem alterações, mas garantindo que está correta)
async function fetchNoticias(): Promise<Noticia[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
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

// REMOVEMOS O 'export const metadata' DAQUI PARA CORRIGIR O TÍTULO

export default async function Homepage() {
  const noticias = await fetchNoticias();

  if (!noticias || noticias.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Nenhuma notícia encontrada.</h2>
      </div>
    );
  }

  const principalNoticia = noticias[0];
  const outrasNoticias = noticias.slice(1, 7); // Pegamos apenas as 6 seguintes para a grade
  const placeholderImage = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* O anúncio do topo fica aqui, fora do layout principal */}
      <BannerPublicitario local="topo-home" />

      {/* Container de Layout Principal: Conteúdo à esquerda, Sidebar à direita */}
      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        
        {/* Coluna de Conteúdo Principal (70% da largura em telas grandes) */}
        <main className="w-full lg:w-[70%] space-y-12">
          {/* Componente da Notícia de Destaque */}
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

          {/* Seção de Últimas Notícias em Grade */}
          <section>
            <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-6 pb-2 border-b-2 border-primary">
              Últimas Notícias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {outrasNoticias.map((noticia) => (
                <CardNoticia
                  key={noticia.id}
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
              ))}
            </div>
          </section>
        </main>

        {/* Coluna da Sidebar (30% da largura em telas grandes) */}
        <aside className="w-full lg:w-[30%]">
          <div className="sticky top-28 space-y-8">
            <MostViewedPosts />
            <RecentPosts currentPostSlug={principalNoticia.slug ?? ''} />
            <BannerPublicitario local="lateral-artigo" />
          </div>
        </aside>
      </div>
    </div>
  );
}