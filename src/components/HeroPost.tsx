// ./components/HeroPost.tsx
import Image from 'next/image';
import Link from 'next/link';

type Categoria = {
  nome: string;
  slug: string;
}

type HeroPostProps = {
  imagemUrl: string;
  categoria: Categoria | null;
  titulo: string;
  resumo: string;
  slug: string;
};

export default function HeroPost({ imagemUrl, categoria, titulo, resumo, slug }: HeroPostProps) {
  return (
    <div className="relative bg-white border border-neutral-100 rounded-lg overflow-hidden shadow-lg group">
      <Link href={`/noticia/${slug}`} className="block">
        <div className="relative aspect-video">
          <Image
            src={imagemUrl}
            alt={titulo}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        {categoria && (
          <Link href={`/categoria/${categoria.slug}`} className="font-heading text-xs font-bold uppercase bg-primary text-white px-3 py-1 rounded-full self-start hover:bg-primary-dark transition-colors duration-300 mb-3 inline-block">
            {categoria.nome}
          </Link>
        )}
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold leading-tight">
          <Link href={`/noticia/${slug}`} className="hover:text-neutral-200 transition-colors">
            {titulo}
          </Link>
        </h2>
        <p className="hidden md:block text-neutral-100 mt-2 text-lg font-body">
          {resumo}
        </p>
      </div>
    </div>
  );
}