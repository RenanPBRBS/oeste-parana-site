// ./components/CardNoticia.tsx
import Image from 'next/image';
import Link from 'next/link';

type Categoria = { nome: string; slug: string; }
type CardNoticiaProps = { imagemUrl: string; categoria: Categoria | null; titulo: string; resumo: string; slug: string; };

export default function CardNoticia({ imagemUrl, categoria, titulo, slug }: CardNoticiaProps) {
  return (
    <div className="flex flex-col group">
      <Link href={`/noticia/${slug}`}>
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            src={imagemUrl} alt={titulo} fill sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="mt-2">
        {categoria && (
          <Link href={`/categoria/${categoria.slug}`} className="text-sm font-bold text-g1-red hover:underline">
            {categoria.nome}
          </Link>
        )}
        <h3 className="text-xl font-bold text-neutral-900 mt-1 leading-tight">
          <Link href={`/noticia/${slug}`} className="hover:text-g1-blue">
            {titulo}
          </Link>
        </h3>
      </div>
    </div>
  );
}