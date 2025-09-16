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
    <div className="flex flex-col bg-surface border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
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
          <Link href={`/categoria/${categoria.slug}`} className="font-sans text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full self-start hover:bg-primary/20 transition-colors">
            {categoria.nome}
          </Link>
        )}
        <h3 className="font-sans text-xl font-bold mt-2 mb-2 text-text-primary flex-grow">
          <Link href={`/noticia/${slug}`} className="hover:text-primary transition-colors">
            {titulo}
          </Link>
        </h3>
        <p className="text-text-secondary text-sm">
          {resumo}
        </p>
      </div>
    </div>
  );
}