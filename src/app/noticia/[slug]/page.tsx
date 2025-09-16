// ./app/noticia/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from 'react'; // Importar React
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import MostViewedPosts from '@/components/MostViewedPosts';
import RecentPosts from '@/components/RecentPosts';
import BannerPublicitario from '@/components/BannerPublicitario';

type ImagemNoticia = { url: string; };
type Categoria = { nome: string; slug: string; };
type NoticiaDetalhe = {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem_destaque: ImagemNoticia | null;
  slug: string;
  categoria: Categoria | null;
  publishedAt: string;
};

async function fetchNoticia(slug: string): Promise<NoticiaDetalhe | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/noticias?filters[slug][$eq]=${slug}&populate=*`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 300 } }); // Revalidate a cada 5 minutos
    if (!res.ok) return null;
    const responseJson = await res.json();
    if (responseJson.data.length === 0) return null;
    return responseJson.data[0];
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return null;
  }
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const noticia = await fetchNoticia(params.slug);
  if (!noticia) {
    return { title: "Notícia não encontrada" };
  }
  return {
    title: noticia.titulo,
    description: noticia.resumo,
    openGraph: {
        title: noticia.titulo,
        description: noticia.resumo,
        images: [
            {
                url: noticia.imagem_destaque ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}` : 'https://placehold.co/1200x630/e2e8f0/64748b?text=Oeste+Paraná',
                width: 1200,
                height: 630,
                alt: noticia.titulo,
            },
        ],
        type: 'article',
        publishedTime: noticia.publishedAt,
        authors: ['Oeste Paraná Notícias'], // Se houver campo de autor, use-o
    },
  };
}


export default async function PaginaNoticia({ params }: { params: { slug: string } }) {
  const noticia = await fetchNoticia(params.slug);

  if (!noticia) {
    notFound();
  }

  const placeholderImage = 'https://placehold.co/1200x600/e2e8f0/64748b?text=Sem+Imagem';
  const dataPublicacao = new Date(noticia.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 font-body">
      {/* Conteúdo principal da notícia */}
      <article className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <h1 className="font-heading text-4xl font-extrabold text-neutral-900 mb-4 leading-tight">
          {noticia.titulo}
        </h1>
        <p className="text-neutral-500 text-lg mb-6 leading-relaxed">
          {noticia.resumo}
        </p>

        {noticia.categoria && (
          <Link href={`/categoria/${noticia.categoria.slug}`} className="font-heading text-sm font-bold uppercase bg-primary/10 text-primary px-3 py-1 rounded-full inline-block mb-6 hover:bg-primary-light/20 transition-colors">
            {noticia.categoria.nome}
          </Link>
        )}

        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={
              noticia.imagem_destaque
                ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${noticia.imagem_destaque.url}`
                : placeholderImage
            }
            alt={noticia.titulo}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="text-neutral-600 text-sm mb-8 border-b border-neutral-100 pb-6">
          Publicado em <time dateTime={noticia.publishedAt}>{dataPublicacao}</time>
        </div>

        <div className="prose prose-lg max-w-none text-neutral-800 leading-relaxed">
          {noticia.conteudo.includes('[AD-HERE]') ? (
            (() => {
              const parts = noticia.conteudo.split('[AD-HERE]');
              return (
                <>
                  <ReactMarkdown>{parts[0]}</ReactMarkdown>
                  <div className="my-8">
                    <BannerPublicitario local="artigo-meio-conteudo" />
                  </div>
                  <ReactMarkdown>{parts[1]}</ReactMarkdown>
                </>
              );
            })()
          ) : (
            <ReactMarkdown>{noticia.conteudo}</ReactMarkdown>
          )}
        </div>
      </article>

      {/* Sidebar - Coluna lateral com banners e notícias relacionadas */}
      <aside className="md:col-span-1 space-y-8">
        <BannerPublicitario local="lateral-artigo" />
        <RecentPosts currentPostSlug={noticia.slug} />
        <MostViewedPosts />
        {/* Podemos adicionar mais banners ou componentes aqui */}
      </aside>
    </div>
  );
}