// ./components/MostViewedPosts.tsx
import Link from 'next/link';
import Image from 'next/image';

type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type NoticiaMaisVista = { id: number; titulo: string; slug: string | null; categoria: Categoria | null; imagem_destaque: ImagemNoticia | null; }
async function fetchMostViewed(): Promise<NoticiaMaisVista[]> {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const endpoint = `${apiUrl}/api/noticias?sort=visualizacoes:desc&pagination[limit]=5&populate=*`;
    try {
        const res = await fetch(endpoint, { next: { revalidate: 600 } });
        if (!res.ok) return [];
        const responseJson = await res.json();
        return responseJson.data || [];
    } catch (error) { console.error("Erro ao buscar posts mais vistos:", error); return []; }
}

export default async function MostViewedPosts() {
  const noticias = await fetchMostViewed();
  if (noticias.length === 0) return null;
  const placeholderImage = 'https://placehold.co/150x150/e5e7eb/111827?text=Img';

  return (
    <div className="bg-neutral-100 p-6 rounded-lg">
      <h3 className="font-heading text-lg font-bold mb-4 pb-2 border-b border-neutral-200 text-neutral-900">
        🔥 Mais Vistos
      </h3>
      <ul className="space-y-4">
        {noticias.map((noticia) => (
          <li key={noticia.id} className="flex items-center gap-4 group">
            <Link href={`/noticia/${noticia.slug ?? '#'}`} className="flex-shrink-0">
              <div className="relative w-20 h-20 rounded-md overflow-hidden">
                <Image src={noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : placeholderImage} alt={noticia.titulo} fill style={{ objectFit: 'cover' }} sizes="80px" />
              </div>
            </Link>
            <div>
              <h4 className="font-heading text-base font-semibold leading-tight text-neutral-800 group-hover:text-primary transition-colors">
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