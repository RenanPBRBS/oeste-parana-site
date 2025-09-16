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
    <div className="flex flex-col bg-white border border-neutral-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
      <Link href={`/noticia/${slug}`} className="block group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imagemUrl}
            alt={titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow font-body">
        {categoria && (
          // AQUI ESTÁ A MUDANÇA DE ESTILO PRINCIPAL
          <Link 
            href={`/categoria/${categoria.slug}`} 
            className="font-heading text-xs font-bold uppercase bg-primary text-white px-3 py-1 rounded-full self-start hover:bg-primary-dark transition-colors duration-300 mb-3"
          >
            {categoria.nome}
          </Link>
        )}
        <h3 className="font-heading text-xl font-semibold leading-tight text-neutral-900 flex-grow">
          <Link href={`/noticia/${slug}`} className="hover:text-primary transition-colors duration-300">
            {titulo}
          </Link>
        </h3>
        <p className="text-neutral-700 text-sm mt-2 leading-relaxed">
          {resumo}
        </p>
      </div>
    </div>
  );
}