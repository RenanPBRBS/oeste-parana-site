// ./app/page.tsx
import CardNoticia from "@/components/CardNoticia";
import BannerPublicitario from "@/components/BannerPublicitario";
import Link from 'next/link';
import Image from 'next/image';
import MostViewedPosts from "@/components/MostViewedPosts"; // Adicione esta importação
import RecentPosts from "@/components/RecentPosts";     // Adicione esta importação

// Tipos "planos" que correspondem à sua API
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = { id: number; titulo: string; resumo: string; imagem_destaque: ImagemNoticia | null; slug: string | null; categoria: Categoria | null; };

// Função de busca SIMPLIFICADA E CORRIGIDA
async function fetchNoticias(): Promise<Noticia[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?sort=publishedAt:desc&populate=*&pagination[limit]=15`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 600 } });
    if (!res.ok) {
        console.error("API retornou um erro:", res.status, res.statusText);
        return [];
    };
    const responseJson = await res.json();
    // Apenas retornamos os dados "planos", sem nenhuma transformação
    return responseJson.data || [];
  } catch (error) { 
    console.error("Erro em fetchNoticias:", error); 
    return []; 
  }
}

export default async function Homepage() {
  const noticias = await fetchNoticias();
  if (!noticias || noticias.length === 0) { 
    return ( 
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Nenhuma notícia encontrada.</h2>
        <p>Verifique se há notícias publicadas no seu Strapi e se a API está acessível.</p>
      </div> 
    ); 
  }

  const [principal, sec1, sec2, ...resto] = noticias;
  const placeholderImage = 'https://placehold.co/500x300/e6e6e6/333333?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* GRID PRINCIPAL DA HOMEPAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA PRINCIPAL (2/3 da largura) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Notícia Principal */}
          {principal && (
            <div className="border-b border-neutral-200 pb-4">
              <Link href={`/noticia/${principal.slug ?? '#'}`}>
                <Image
                  src={ principal.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${principal.imagem_destaque.url}` : placeholderImage }
                  alt={principal.titulo}
                  width={800} height={450}
                  className="w-full rounded-md"
                  priority
                />
              </Link>
              <h1 className="text-4xl font-black text-neutral-900 mt-2 leading-tight">
                <Link href={`/noticia/${principal.slug ?? '#'}`} className="hover:text-g1-blue">
                  {principal.titulo}
                </Link>
              </h1>
              <p className="text-neutral-600 mt-2">{principal.resumo}</p>
            </div>
          )}

          {/* Duas notícias secundárias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {sec1 && <CardNoticia titulo={sec1.titulo} categoria={sec1.categoria} resumo={sec1.resumo} imagemUrl={ sec1.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${sec1.imagem_destaque.url}` : placeholderImage } slug={sec1.slug ?? '#'} />}
            {sec2 && <CardNoticia titulo={sec2.titulo} categoria={sec2.categoria} resumo={sec2.resumo} imagemUrl={ sec2.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${sec2.imagem_destaque.url}` : placeholderImage } slug={sec2.slug ?? '#'} />}
          </div>
        </div>

        {/* COLUNA LATERAL (1/3 da largura) */}
        <aside className="lg:col-span-1 space-y-8">
            <MostViewedPosts />
            <RecentPosts currentPostSlug={principal.slug ?? ''} />
            <BannerPublicitario local="lateral-artigo" />
        </aside>

      </div>

      <hr className="my-12 border-neutral-200" />
      
      {/* GRID SECUNDÁRIO DE NOTÍCIAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {resto.map((noticia) => (
          <CardNoticia
            key={noticia.id} titulo={noticia.titulo} categoria={noticia.categoria} resumo={noticia.resumo}
            imagemUrl={ noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : placeholderImage }
            slug={noticia.slug ?? '#'}
          />
        ))}
      </div>
    </div>
  );
}