// ./components/CardNoticia.tsx
import Image from 'next/image';
import Link from 'next/link';

// 1. Atualizamos o tipo da categoria
type Categoria = {
  nome: string;
  slug: string;
}

type CardNoticiaProps = {
  imagemUrl: string;
  categoria: Categoria | null;
  titulo: string;
  resumo: string;
  slug: string;
};

export default function CardNoticia({ imagemUrl, categoria, titulo, resumo, slug }: CardNoticiaProps) {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
      <Link href={`/noticia/${slug}`} className="block group">
        <div className="relative">
          <Image
            src={imagemUrl}
            alt={titulo}
            width={500}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        {categoria && (
          // 2. A tag da categoria agora é um link
          <Link href={`/categoria/${categoria.slug}`} className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full self-start hover:bg-blue-200">
            {categoria.nome}
          </Link>
        )}
        <h3 className="text-xl font-bold mt-2 mb-2 text-gray-800 flex-grow">
          <Link href={`/noticia/${slug}`} className="hover:text-blue-800 transition-colors">
            {titulo}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm">
          {resumo}
        </p>
      </div>
    </div>
  );
}