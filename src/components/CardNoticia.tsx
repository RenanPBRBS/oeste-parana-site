// ./components/CardNoticia.tsx
import Image from 'next/image';
import Link from 'next/link';

type Categoria = { nome: string; slug: string; }
type CardNoticiaProps = { imagemUrl: string; categoria: Categoria | null; titulo: string; resumo: string; slug: string; };

export default function CardNoticia({ imagemUrl, categoria, titulo, resumo, slug }: CardNoticiaProps) {
  return (
    <div className="flex flex-col bg-dark-surface border border-dark-border rounded-lg overflow-hidden group transition-all duration-300 hover:border-brand-amber/50 hover:shadow-2xl hover:shadow-brand-amber/5">
      <Link href={`/noticia/${slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imagemUrl} alt={titulo} fill sizes="(max-width: 768px) 100vw, 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        {categoria && (
          <Link href={`/categoria/${categoria.slug}`} className="font-heading text-xs font-bold uppercase text-brand-amber hover:text-brand-amber-dark transition-colors mb-3 self-start">
            {categoria.nome}
          </Link>
        )}
        <h3 className="font-heading text-xl font-semibold leading-tight text-dark-text-title flex-grow">
          <Link href={`/noticia/${slug}`} className="group-hover:text-brand-amber transition-colors duration-300">
            {titulo}
          </Link>
        </h3>
        <p className="font-body text-dark-text-muted text-sm mt-2 leading-relaxed">
          {resumo}
        </p>
      </div>
    </div>
  );
}