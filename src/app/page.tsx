// ./app/page.tsx
import CardNoticia from "@/components/CardNoticia";
import BannerPublicitario from "@/components/BannerPublicitario";
import MostViewedPosts from "@/components/MostViewedPosts";
import RecentPosts from "@/components/RecentPosts";
import HeroPost from "@/components/HeroPost";

// --- DEFINIÇÕES DE TIPO CORRIGIDAS ---
// Estes são os tipos "planos" que usamos nos nossos componentes
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = { 
  id: number; 
  titulo: string; 
  resumo: string; 
  imagem_destaque: ImagemNoticia | null; 
  slug: string | null; 
  categoria: Categoria | null; 
  publishedAt: string;
};

// Estes tipos representam a estrutura ANINHADA real que vem da API
type StrapiCategoria = { data: { attributes: Categoria } | null };
type StrapiImagem = { data: { attributes: ImagemNoticia } | null };
type StrapiItemAttributes = { 
  titulo: string; 
  resumo: string; 
  slug: string | null; 
  categoria: StrapiCategoria; 
  imagem_destaque: StrapiImagem; 
  publishedAt: string;
};
type StrapiItem = { id: number; attributes: StrapiItemAttributes };
// --- FIM DAS DEFINIÇÕES DE TIPO ---


async function fetchNoticias(): Promise<Noticia[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?sort=publishedAt:desc&populate=*`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    const responseJson = await res.json();
    
    // Esta lógica de transformação agora está correta porque os tipos acima são precisos
    return responseJson.data.map((item: StrapiItem) => ({
      id: item.id,
      titulo: item.attributes.titulo,
      resumo: item.attributes.resumo,
      slug: item.attributes.slug,
      publishedAt: item.attributes.publishedAt,
      categoria: item.attributes.categoria?.data?.attributes || null,
      imagem_destaque: item.attributes.imagem_destaque?.data?.attributes || null,
    }));
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}

export default async function Homepage() {
  const noticias = await fetchNoticias();

  if (!noticias || noticias.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold font-heading">Nenhuma notícia encontrada.</h2>
      </div>
    );
  }

  const principalNoticia = noticias[0];
  const outrasNoticias = noticias.slice(1, 7);
  const placeholderImage = 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8">
      <BannerPublicitario local="topo-home" />

      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        <main className="w-full lg:w-[70%] space-y-12">
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