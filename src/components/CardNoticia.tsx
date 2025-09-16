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
      <div className="p-5 flex flex-col flex-grow">
        {categoria && (
          // ESTILO ATUALIZADO AQUI
          <Link 
            href={`/categoria/${categoria.slug}`} 
            className="font-heading text-xs font-bold uppercase border border-primary text-primary px-3 py-1 rounded-full self-start hover:bg-primary hover:text-white transition-colors duration-300 mb-3 inline-flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM2 6.25c0-.966.784-1.75 1.75-1.75h7.5c.966 0 1.75.784 1.75 1.75v7.5c0 .966-.784 1.75-1.75 1.75h-7.5A1.75 1.75 0 0 1 2 13.75v-7.5Zm14.78 4.28a.75.75 0 0 0-1.06-1.06l-4.25 4.25a.75.75 0 1 0 1.06 1.06l4.25-4.25Z" /></svg>
            <span>{categoria.nome}</span>
          </Link>
        )}
        <h3 className="font-heading text-xl font-semibold leading-tight text-neutral-900 flex-grow">
          <Link href={`/noticia/${slug}`} className="hover:text-primary transition-colors duration-300">
            {titulo}
          </Link>
        </h3>
        <p className="font-body text-neutral-700 text-sm mt-2 leading-relaxed">
          {resumo}
        </p>
      </div>
    </div>
  );
}