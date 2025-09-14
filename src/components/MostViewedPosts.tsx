// ./components/MostViewedPosts.tsx
import Link from 'next/link';

type NoticiaMaisVista = {
  id: number;
  titulo: string;
  slug: string;
  visualizacoes: number;
}

// Função para buscar as notícias mais vistas
async function fetchMostViewed(): Promise<NoticiaMaisVista[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // Buscamos as 5 notícias com mais visualizações em ordem decrescente
  const endpoint = `${apiUrl}/api/noticias?sort=visualizacoes:desc&pagination[limit]=5`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 600 } }); // Cache de 10 minutos
    if (!res.ok) return [];
    const responseJson = await res.json();
    return responseJson.data || [];
  } catch (error) {
    console.error("Erro ao buscar posts mais vistos:", error);
    return [];
  }
}

export default async function MostViewedPosts() {
  const noticias = await fetchMostViewed();

  if (noticias.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
        🔥 Mais Vistos
      </h3>
      <ol className="space-y-3 list-decimal list-inside">
        {noticias.map((noticia) => (
          <li key={noticia.id}>
            <Link href={`/noticia/${noticia.slug}`} className="text-gray-700 hover:text-blue-800 transition-colors">
              {noticia.titulo}
            </Link>
            <span className="text-sm text-gray-500 ml-2">({noticia.visualizacoes} views)</span>
          </li>
        ))}
      </ol>
    </div>
  );
}