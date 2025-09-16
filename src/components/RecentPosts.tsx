// ./components/RecentPosts.tsx
import Link from 'next/link';
import Image from 'next/image';

// --- DEFINIÇÕES DE TIPO CORRIGIDAS ---
// Tipos finais "planos" que usamos no componente
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type NoticiaRecente = {
  id: number;
  titulo: string;
  slug: string | null;
  categoria: Categoria | null;
  imagem_destaque: ImagemNoticia | null;
}

// Tipo que representa a estrutura aninhada REAL que vem da API
type StrapiItemAttributes = {
  titulo: string;
  slug: string | null;
  categoria: { data: { attributes: Categoria } | null };
  imagem_destaque: { data: { attributes: ImagemNoticia } | null };
}
type StrapiItem = { id: number; attributes: StrapiItemAttributes };
// --- FIM DAS DEFINIÇÕES DE TIPO ---


async function fetchRecentNoticias(currentPostSlug: string): Promise<NoticiaRecente[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?sort=publishedAt:desc&pagination[limit]=5&filters[slug][$ne]=${currentPostSlug}&populate=categoria,imagem_destaque`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const responseJson = await res.json();
    
    // A transformação de dados agora funciona, pois os tipos estão corretos
    return responseJson.data.map((item: StrapiItem) => ({
      id: item.id,
      ...item.attributes,
      categoria: item.attributes.categoria?.data?.attributes || null,
      imagem_destaque: item.attributes.imagem_destaque?.data?.attributes || null,
    }));
  } catch (error) {
    console.error("Erro ao buscar posts recentes:", error);
    return [];
  }
}

export default async function RecentPosts({ currentPostSlug }: { currentPostSlug: string }) {
  const noticias = await fetchRecentNoticias(currentPostSlug);
  if (noticias.length === 0) return null;
  const placeholderImage = 'https://placehold.co/150x150/e2e8f0/64748b?text=Img';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 font-body">
      <h3 className="font-heading text-xl font-bold mb-4 pb-2 border-b-2 border-neutral-200 text-neutral-900">
        Últimas Notícias
      </h3>
      <ul className="space-y-5">
        {noticias.map((noticia) => (
          <li key={noticia.id} className="flex items-start gap-4 group">
            <Link href={`/noticia/${noticia.slug ?? '#'}`} className="flex-shrink-0">
              <div className="relative w-24 h-16 rounded-md overflow-hidden">
                <Image
                  src={ noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : placeholderImage }
                  alt={noticia.titulo} fill style={{ objectFit: 'cover' }} sizes="96px"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div>
              {noticia.categoria && (
                 <Link href={`/categoria/${noticia.categoria.slug}`} className="font-heading text-[10px] font-bold uppercase bg-primary text-white px-2.5 py-1 rounded-full self-start hover:bg-primary-dark transition-colors duration-300">
                  {noticia.categoria.nome}
                </Link>
              )}
              <h4 className="font-heading text-base font-medium leading-tight text-neutral-800 group-hover:text-primary transition-colors mt-2">
                <Link href={`/noticia/${noticia.slug ?? '#'}`}>
                  {noticia.titulo}
                </Link>
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}