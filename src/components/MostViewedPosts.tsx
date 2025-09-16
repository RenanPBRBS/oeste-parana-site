// ./components/MostViewedPosts.tsx
import Link from 'next/link';
import Image from 'next/image';

// Tipos para os dados que vamos usar
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; };
type NoticiaMaisVista = {
  id: number;
  titulo: string;
  slug: string | null;
  visualizacoes: number;
  categoria: Categoria | null;
  imagem_destaque: ImagemNoticia | null;
}

// Função para buscar as notícias mais vistas, agora com mais dados
async function fetchMostViewed(): Promise<NoticiaMaisVista[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // Usamos populate=* para trazer também a imagem e a categoria
  const endpoint = `${apiUrl}/api/noticias?sort=visualizacoes:desc&pagination[limit]=5&populate=*`;

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
  
  const placeholderImage = 'https://placehold.co/150x150/e2e8f0/64748b?text=Img';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
        🔥 Mais Vistos
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
            <div>
              {noticia.categoria && (
                 <span className="text-xs font-semibold text-blue-600">
                  {noticia.categoria.nome}
                </span>
              )}
              <h4 className="font-semibold leading-tight text-gray-800 hover:text-blue-700 transition-colors">
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