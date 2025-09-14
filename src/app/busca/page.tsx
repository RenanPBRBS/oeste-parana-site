/* eslint-disable @typescript-eslint/no-unused-vars */
// ./app/busca/page.tsx

import CardNoticia from "@/components/CardNoticia";
import { notFound } from "next/navigation";

// Reutilizamos os tipos que já temos
type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type Noticia = { id: number; titulo: string; resumo: string; imagem_destaque: ImagemNoticia | null; slug: string | null; categoria: Categoria | null; };

// Função para buscar notícias com base em um termo de busca
async function searchNoticias(query: string): Promise<Noticia[]> {
  const apiUrl = process.env.STRAPI_API_URL;
  /*
    Este é um filtro complexo do Strapi:
    - [$or]: Busca em múltiplos campos (OU um OU outro).
    - [0], [1]: Índices para cada condição dentro do OU.
    - [titulo][$containsi]: Busca no campo 'titulo' um texto que CONTÉM o termo, sem diferenciar maiúsculas/minúsculas.
    - [resumo][$containsi]: Faz o mesmo para o campo 'resumo'.
  */
  const endpoint = `${apiUrl}/api/noticias?filters[$or][0][titulo][$containsi]=${query}&filters[$or][1][resumo][$containsi]=${query}&populate=*`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar notícias');

    const responseJson = await res.json();
    return responseJson.data || [];

  } catch (error) {
    console.error("Erro em searchNoticias:", error);
    return [];
  }
}

// A página de busca recebe 'searchParams' para ler os parâmetros da URL (ex: ?q=termo)
export default async function BuscaPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || '';
  const noticias = query ? await searchNoticias(query) : [];

  return (
    <div className="container mx-auto p-4 md:p-8">
      {query ? (
        <>
          <h1 className="text-4xl font-bold mb-8">
            Resultados para: <span className="text-blue-700">{query}</span>
          </h1>
          {noticias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia) => (
                <CardNoticia
                  key={noticia.id}
                  titulo={noticia.titulo}
                  categoria={noticia.categoria} 
                  resumo={noticia.resumo}
                  imagemUrl={
                    noticia.imagem_destaque
                      ? `${process.env.STRAPI_API_URL}${noticia.imagem_destaque.url}`
                      : 'https://placehold.co/600x400/e2e8f0/64748b?text=Sem+Imagem'
                  }
                  slug={noticia.slug ?? '#'}
                />
              ))}
            </div>
          ) : (
            <p>Nenhuma notícia encontrada para o termo pesquisado.</p>
          )}
        </>
      ) : (
        <h1 className="text-2xl font-bold text-center mt-12">
          Por favor, digite um termo na barra de busca.
        </h1>
      )}
    </div>
  );
}