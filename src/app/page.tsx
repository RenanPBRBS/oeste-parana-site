// ./app/page.tsx
import CardNoticia from "@/components/CardNoticia";
import BannerPublicitario from "@/components/BannerPublicitario";
import MostViewedPosts from "@/components/MostViewedPosts";
import HeroPost from "@/components/HeroPost";

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
  } catch (error) { console.error("Erro ao buscar notícias:", error); return []; }
}

export default async function Homepage() {
  const noticias = await fetchNoticias();
  if (!noticias || noticias.length === 0) { return ( <div className="container mx-auto p-8 text-center"><h2 className="text-2xl font-bold font-heading">Nenhuma notícia encontrada.</h2></div> ); }

  const principalNoticia = noticias[0];
  const outrasNoticias = noticias.slice(1, 5); // 4 notícias na segunda seção
  const maisNoticias = noticias.slice(5, 11); // 6 notícias na grade principal
  const placeholderImage = 'https://placehold.co/600x400/0d1117/8b949e?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* SEÇÃO PRINCIPAL COM DESTAQUE E MAIS VISTOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HeroPost
            titulo={principalNoticia.titulo} categoria={principalNoticia.categoria} resumo={principalNoticia.resumo}
            imagemUrl={ principalNoticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${principalNoticia.imagem_destaque.url}` : placeholderImage }
            slug={principalNoticia.slug ?? '#'}
          />
        </div>
        <div className="lg:col-span-1">
          <MostViewedPosts />
        </div>
      </div>

      {/* SEÇÃO SECUNDÁRIA COM 4 NOTÍCIAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {outrasNoticias.map((noticia) => (
          <CardNoticia
            key={noticia.id} titulo={noticia.titulo} categoria={noticia.categoria} resumo={noticia.resumo}
            imagemUrl={ noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : placeholderImage }
            slug={noticia.slug ?? '#'}
          />
        ))}
      </div>
      
      {/* BANNER DE ANÚNCIO */}
      <BannerPublicitario local="topo-home" />

      {/* SEÇÃO PRINCIPAL DE NOTÍCIAS */}
      <section>
        <h2 className="font-heading text-3xl font-bold text-dark-text-title mb-6 pb-2 border-b-2 border-brand-amber">
          Últimas Notícias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {maisNoticias.map((noticia) => (
            <CardNoticia
              key={noticia.id} titulo={noticia.titulo} categoria={noticia.categoria} resumo={noticia.resumo}
              imagemUrl={ noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : placeholderImage }
              slug={noticia.slug ?? '#'}
            />
          ))}
        </div>
      </section>
    </div>
  );
}