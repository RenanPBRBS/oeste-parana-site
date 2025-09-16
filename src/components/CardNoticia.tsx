// ./components/CardNoticia.tsx
import Image from 'next/image';
import Link from 'next/link';

type Categoria = { nome: string; slug: string; };
type CardNoticiaProps = { imagemUrl: string; categoria: Categoria | null; titulo: string; resumo: string; slug: string; };

export default function CardNoticia({ imagemUrl, categoria, titulo, resumo, slug }: CardNoticiaProps) {
  return (
    // O container do card. Mude a sombra, a borda, etc. aqui.
    <div className="flex flex-col bg-surface border border-border rounded-md overflow-hidden h-full">
      <Link href={`/noticia/${slug}`} className="block group">
        <div className="relative aspect-video">
          <Image
            src={imagemUrl} alt={titulo} fill sizes="100vw"
            // Efeito de zoom na imagem ao passar o mouse
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      {/* Área de texto do card */}
      <div className="p-5 flex flex-col flex-grow">
        {categoria && (
          <Link 
            href={`/categoria/${categoria.slug}`} 
            // Estilo da tag de categoria. Use text-primary, bg-primary, etc.
            className="font-heading text-xs font-semibold text-primary mb-2 self-start hover:underline"
          >
            {categoria.nome}
          </Link>
        )}
        
        {/* Título da notícia */}
        <h3 className="font-heading text-lg font-bold text-text-title flex-grow">
          <Link href={`/noticia/${slug}`} className="hover:text-primary transition-colors">
            {titulo}
          </Link>
        </h3>
        
        {/* Resumo da notícia */}
        <p className="font-body text-text-body text-sm mt-2">
          {resumo}
        </p>
      </div>
    </div>
  );
}