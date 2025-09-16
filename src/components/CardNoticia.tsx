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
    <div className="flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full group">
      <Link href={`/noticia/${slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imagemUrl}
            alt={titulo}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        {categoria && (
          <Link href={`/categoria/${categoria.slug}`} className="font-heading text-xs font-semibold bg-neutral-100 text-primary px-2.5 py-1 rounded-md self-start hover:bg-neutral-200 transition-colors mb-3">
            {categoria.nome}
          </Link>
        )}
        <h3 className="font-heading text-xl font-bold leading-tight text-neutral-900 flex-grow">
          <Link href={`/noticia/${slug}`} className="hover:text-primary transition-colors">
            {titulo}
          </Link>
        </h3>
        {/* PARÁGRAFO DO RESUMO ADICIONADO AQUI */}
        <p className="font-body text-neutral-500 text-sm mt-2 leading-relaxed">
          {resumo}
        </p>
      </div>
    </div>
  );
}