// ./components/MostViewedPosts.tsx
import Link from 'next/link';
import Image from 'next/image';

// Tipos "planos"
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type NoticiaMaisVista = { id: number; titulo: string; slug: string | null; visualizacoes: number; categoria: Categoria | null; imagem_destaque: ImagemNoticia | null; }

// Função de busca SIMPLIFICADA
async function fetchMostViewed(): Promise<NoticiaMaisVista[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?sort=visualizacoes:desc&pagination[limit]=5&populate=*`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 600 } });
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
  if (noticias.length === 0) return null;
  const placeholderImage = 'https://placehold.co/150x150/e2e8f0/64748b?text=Img';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 font-body">
      <h3 className="font-heading text-xl font-bold mb-4 pb-2 border-b-2 border-neutral-200 text-neutral-900">
        🔥 Mais Vistos
      </h3>
      <ul className="space-y-5">
        {noticias.map((noticia) => (
          <li key={noticia.id} className="flex items-start gap-4 group">
            <Link href={`/noticia/${noticia.slug ?? '#'}`} className="flex-shrink-0">
              <div className="relative w-24 h-16 rounded-md overflow-hidden">
                <Image src={noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : placeholderImage} alt={noticia.titulo} fill style={{ objectFit: 'cover' }} sizes="96px" className="group-hover:scale-105 transition-transform duration-300" />
              </div>
            </Link>
            <div>
              {noticia.categoria && (
                 // ESTILO ATUALIZADO AQUI
                 <Link href={`/categoria/${noticia.categoria.slug}`} className="font-heading text-[10px] font-bold uppercase bg-primary-extra-light text-primary-dark px-2 py-1 rounded-md self-start hover:bg-primary/20 transition-colors duration-300 inline-flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h7A1.5 1.5 0 0 0 11 11.5v-7A1.5 1.5 0 0 0 9.5 3h-7Zm11.854 3.854a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L12.293 8l-2.647 2.646a.5.5 0 1 0 .708.708l3-3Z" /></svg>
                   <span>{noticia.categoria.nome}</span>
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