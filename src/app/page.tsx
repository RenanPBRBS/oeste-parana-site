// ./app/page.tsx
import CardNoticia from "@/components/CardNoticia";
import BannerPublicitario from "@/components/BannerPublicitario";
import MostViewedPosts from "@/components/MostViewedPosts";
import RecentPosts from "@/components/RecentPosts";
import HeroPost from "@/components/HeroPost";

// Tipos e fetch (sem alterações da versão funcional)
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = { id: number; titulo: string; resumo: string; imagem_destaque: ImagemNoticia | null; slug: string | null; categoria: Categoria | null; };
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
// NENHUM METADATA AQUI PARA CORRIGIR O TÍTULO "HOMEPAGE"

export default async function Homepage() {
  const noticias = await fetchNoticias();
  if (!noticias || noticias.length === 0) { return ( <div className="container mx-auto p-8 text-center"><h2 className="text-2xl font-bold font-heading">Nenhuma notícia encontrada.</h2></div> ); }

  const principalNoticia = noticias[0];
  const outrasNoticias = noticias.slice(1, 5);
  const placeholderImage = 'https://placehold.co/600x400/e5e7eb/111827?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. ANÚNCIO DO TOPO, NO LUGAR CERTO */}
      <BannerPublicitario local="topo-home" />

      {/* 2. ESTRUTURA DE LAYOUT CORRIGIDA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
        
        {/* COLUNA PRINCIPAL */}
        <main className="lg:col-span-2 space-y-10">
          <HeroPost
            titulo={principalNoticia.titulo} categoria={principalNoticia.categoria} resumo={principalNoticia.resumo}
            imagemUrl={ principalNoticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${principalNoticia.imagem_destaque.url}` : placeholderImage }
            slug={principalNoticia.slug ?? '#'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outrasNoticias.map((noticia) => (
              <CardNoticia
                key={noticia.id} titulo={noticia.titulo} categoria={noticia.categoria} resumo={noticia.resumo}
                imagemUrl={ noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : placeholderImage }
                slug={noticia.slug ?? '#'}
              />
            ))}
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 space-y-8">
            <MostViewedPosts />
            <RecentPosts currentPostSlug={principalNoticia.slug ?? ''} />
          </div>
        </aside>
      </div>
    </div>
  );
}