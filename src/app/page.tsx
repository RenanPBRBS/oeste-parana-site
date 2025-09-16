// ./app/page.tsx
import CardNoticia from "@/components/CardNoticia";
import BannerPublicitario from "@/components/BannerPublicitario";
import Link from 'next/link';
import Image from 'next/image';

type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = { id: number; titulo: string; resumo: string; imagem_destaque: ImagemNoticia | null; slug: string | null; categoria: Categoria | null; };
async function fetchNoticias(): Promise<Noticia[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?sort=publishedAt:desc&populate=*&pagination[limit]=13`; // Puxa 13 notícias
  try {
    const res = await fetch(endpoint, { next: { revalidate: 300 } }); // Cache de 5 minutos
    if (!res.ok) return [];
    const responseJson = await res.json();
    return responseJson.data || [];
  } catch (error) { console.error("Erro ao buscar notícias:", error); return []; }
}

export default async function Homepage() {
  const noticias = await fetchNoticias();
  if (!noticias || noticias.length === 0) { return ( <div className="container mx-auto p-8"><h2 className="text-2xl font-bold">Nenhuma notícia encontrada.</h2></div> ); }

  const [principal, sec1, sec2, ...resto] = noticias;
  const placeholderImage = 'https://placehold.co/500x300/e6e6e6/333333?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
        
        {/* COLUNA PRINCIPAL (2/3 da largura) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Notícia Principal */}
          {principal && (
            <div className="border-b border-neutral-200 pb-8">
              <Link href={`/noticia/${principal.slug ?? '#'}`} className="block group">
                <Image
                  src={ principal.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${principal.imagem_destaque.url}` : placeholderImage }
                  alt={principal.titulo} width={800} height={450}
                  className="w-full rounded-md" priority
                />
                <h1 className="text-4xl font-black text-neutral-900 mt-4 leading-tight group-hover:text-g1-blue transition-colors">
                  {principal.titulo}
                </h1>
              </Link>
              <p className="text-neutral-600 mt-2 text-lg">{principal.resumo}</p>
            </div>
          )}

          {/* Duas notícias secundárias com imagem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sec1 && <CardNoticia titulo={sec1.titulo} categoria={sec1.categoria} resumo={sec1.resumo} imagemUrl={ sec1.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${sec1.imagem_destaque.url}` : placeholderImage } slug={sec1.slug ?? '#'} />}
            {sec2 && <CardNoticia titulo={sec2.titulo} categoria={sec2.categoria} resumo={sec2.resumo} imagemUrl={ sec2.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${sec2.imagem_destaque.url}` : placeholderImage } slug={sec2.slug ?? '#'} />}
          </div>
        </div>

        {/* COLUNA LATERAL (1/3 da largura) */}
        <aside className="lg:col-span-1 space-y-8">
            {/* Lista de notícias sem imagem */}
            <div className="space-y-4">
              {resto.slice(0, 5).map((noticia) => (
                <div key={noticia.id} className="border-b border-neutral-200 pb-4">
                  {noticia.categoria && (
                    <Link href={`/categoria/${noticia.categoria.slug}`} className="text-sm font-bold text-g1-red hover:underline">
                      {noticia.categoria.nome}
                    </Link>
                  )}
                  <h3 className="text-xl font-bold text-neutral-900 mt-1 leading-tight">
                    <Link href={`/noticia/${noticia.slug ?? '#'}`} className="hover:text-g1-blue">
                      {noticia.titulo}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
            <BannerPublicitario local="lateral-artigo" />
        </aside>
      </div>

      <hr className="my-8 border-neutral-300" />
      
      {/* GRID SECUNDÁRIO DE NOTÍCIAS COM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {resto.slice(5).map((noticia) => (
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