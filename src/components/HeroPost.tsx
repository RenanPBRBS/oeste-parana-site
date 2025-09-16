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
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white font-body">
        {categoria && (
          // ESTILO ATUALIZADO AQUI
          <Link 
            href={`/categoria/${categoria.slug}`} 
            className="font-heading text-xs font-bold uppercase border border-white text-white px-3 py-1.5 rounded-full self-start hover:bg-white hover:text-primary transition-colors duration-300 mb-3 inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM2 6.25c0-.966.784-1.75 1.75-1.75h7.5c.966 0 1.75.784 1.75 1.75v7.5c0 .966-.784 1.75-1.75 1.75h-7.5A1.75 1.75 0 0 1 2 13.75v-7.5Zm14.78 4.28a.75.75 0 0 0-1.06-1.06l-4.25 4.25a.75.75 0 1 0 1.06 1.06l4.25-4.25Z" /></svg>
            <span>{categoria.nome}</span>
          </Link>
        )}
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold leading-tight">
          <Link href={`/noticia/${slug}`} className="hover:text-neutral-200 transition-colors">
            {titulo}
          </Link>
        </h2>
        <p className="hidden md:block text-neutral-100 mt-2 text-lg">
          {resumo}
        </p>
      </div>
    </div>
  );
}