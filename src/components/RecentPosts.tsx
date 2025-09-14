// ./components/RecentPosts.tsx
import Link from 'next/link';

type NoticiaSimples = {
  titulo: string;
  slug: string;
}

// Função para buscar as notícias mais recentes
async function fetchRecentNoticias(currentPostSlug: string): Promise<NoticiaSimples[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  /*
    Buscamos as 5 notícias mais recentes (sort=publishedAt:desc)
    E excluímos a notícia atual da lista (filters[slug][$ne]=currentPostSlug)
  */
  const endpoint = `${apiUrl}/api/noticias?sort=publishedAt:desc&pagination[limit]=5&filters[slug][$ne]=${currentPostSlug}`;

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

  if (noticias.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
        Notícias Recentes
      </h3>
      <ul className="space-y-3">
        {noticias.map((noticia) => (
          <li key={noticia.slug}>
            <Link href={`/noticia/${noticia.slug}`} className="text-gray-700 hover:text-blue-800 transition-colors">
              {noticia.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}