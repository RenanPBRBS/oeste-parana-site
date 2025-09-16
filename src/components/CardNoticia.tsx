// ./components/CardNoticia.tsx
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="flex flex-col bg-white border border-neutral-100 rounded-lg overflow-hidden transition-shadow duration-300 h-full hover:shadow-2xl">
      <Link href={`/noticia/${slug}`} className="block group">
        <div className="relative overflow-hidden">
          <Image
            src={imagemUrl}
            alt={titulo}
            width={500}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        {categoria && (
          <Link href={`/categoria/${categoria.slug}`} className="font-sans text-xs font-bold uppercase text-brand-blue hover:underline mb-2 self-start">
            {categoria.nome}
          </Link>
        )}
        <h3 className="font-sans text-xl font-bold text-neutral-900 flex-grow">
          <Link href={`/noticia/${slug}`} className="hover:text-brand-blue transition-colors duration-300">
            {titulo}
          </Link>
        </h3>
        <p className="text-neutral-800 text-sm mt-3">
          {resumo}
        </p>
      </div>
    </div>
  );
}