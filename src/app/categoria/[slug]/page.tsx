// ./app/categoria/[slug]/page.tsx
import CardNoticia from "@/components/CardNoticia";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = { 
  id: number; 
  titulo: string; 
  resumo: string; 
  imagem_destaque: ImagemNoticia | null; 
  slug: string | null; 
  categoria: Categoria | null; 
};

async function fetchNoticiasPorCategoria(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?filters[categoria][slug][$eq]=${slug}&populate=*`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) return { data: null, categoryName: null };

    const responseJson = await res.json();
    const noticias = responseJson.data || [];

    if (noticias.length === 0) {
      const categoryRes = await fetch(`${apiUrl}/api/categorias?filters[slug][$eq]=${slug}`);
      const categoryJson = await categoryRes.json();
      const categoryName = categoryJson.data[0]?.nome || slug;
      return { data: [], categoryName };
    }

    const categoryName = noticias[0]?.categoria?.nome || slug;
    return { data: noticias, categoryName };

  } catch (error) {
    console.error("Erro em fetchNoticiasPorCategoria:", error);
    return { data: null, categoryName: null };
  }
}

type Props = { params: { slug: string } };

async function fetchCategoryName(slug: string): Promise<string | null> {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const endpoint = `${apiUrl}/api/categorias?filters[slug][$eq]=${slug}`;
    try {
        const res = await fetch(endpoint);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data[0]?.nome || null;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = await fetchCategoryName(params.slug);
  if (!categoryName) {
    return { title: "Categoria não encontrada" };
  }
  return {
    title: categoryName,
    description: `Veja as últimas notícias e atualizações sobre ${categoryName} no portal Oeste Paraná.`,
  };
}

export default async function PaginaCategoria({ params }: { params: { slug: string } }) {
  const { data: noticias, categoryName } = await fetchNoticiasPorCategoria(params.slug);
  if (!noticias) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8">
        Notícias sobre: <span className="text-blue-700">{categoryName}</span>
      </h1>
      {noticias.length === 0 ? (
        <p>Nenhuma notícia encontrada nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((noticia: Noticia) => (
             <CardNoticia
                key={noticia.id}
                titulo={noticia.titulo}
                categoria={noticia.categoria} 
                resumo={noticia.resumo}
                imagemUrl={
                  noticia.imagem_destaque
                    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}`
                    : 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem'
                }
                slug={noticia.slug ?? '#'}
              />
          ))}
        </div>
      )}
    </div>
  );
}