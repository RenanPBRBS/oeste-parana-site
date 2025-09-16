// ./components/RecentPosts.tsx
import Link from 'next/link';
import Image from 'next/image';

type ImagemNoticia = { url: string; };
type Categoria = { nome: string; };
type NoticiaRecente = {
  id: number;
  titulo: string;
  slug: string | null;
  categoria: Categoria | null;
  imagem_destaque: ImagemNoticia | null;
}

async function fetchRecentNoticias(currentPostSlug: string): Promise<NoticiaRecente[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?sort=publishedAt:desc&pagination[limit]=5&filters[slug][$ne]=${currentPostSlug}&populate=*`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const responseJson = await res.json();
    return responseJson.data || [];
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
    <div className="bg-surface p-6 rounded-lg shadow-sm border border-border">
      <h3 className="font-sans text-xl font-bold mb-4 border-b-2 border-border pb-2 text-text-primary">
        Notícias Recentes
      </h3>
      <ul className="space-y-4">
        {noticias.map((noticia) => (
          <li key={noticia.id} className="flex items-start gap-4">
            <Link href={`/noticia/${noticia.slug ?? '#'}`} className="flex-shrink-0">
              <div className="relative w-20 h-16 rounded-md overflow-hidden">
                <Image
                  src={
                    noticia.imagem_destaque
                      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}`
                      : placeholderImage
                  }
                  alt={noticia.titulo}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="80px"
                />
              </div>
            </Link>
            <div className='font-sans'>
              {noticia.categoria && (
                 <span className="text-xs font-semibold text-primary">
                  {noticia.categoria.nome}
                </span>
              )}
              <h4 className="font-semibold leading-tight text-text-primary hover:text-primary transition-colors">
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