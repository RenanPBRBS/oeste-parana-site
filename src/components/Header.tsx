// ./components/Header.tsx
import Link from 'next/link';
import HeaderNavigation from './HeaderNavigation';
import SearchBar from './SearchBar';

type Categoria = { id: number; nome: string; slug: string; };

async function fetchCategorias(): Promise<Categoria[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const endpoint = `${apiUrl}/api/categorias`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const responseJson = await res.json();
    return responseJson.data || [];
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}

export default async function Header() {
  const categorias = await fetchCategorias();

  return (
    // O header agora é uma única barra
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-neutral-100 font-heading">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo à esquerda */}
          <Link href="/" className="text-3xl font-extrabold text-neutral-900 hover:text-primary transition-colors">
            Oeste Paraná
          </Link>
          
          {/* Container para navegação e busca (aparece apenas no desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <nav>
              <ul className="flex items-center gap-8">
                {categorias.map((categoria) => (
                  <li key={categoria.id}>
                    {/* Links com alto contraste e animação de sublinhado */}
                    <Link 
                      href={`/categoria/${categoria.slug}`} 
                      className="text-neutral-700 font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 pb-1"
                    >
                      {categoria.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <SearchBar />
          </div>
          
          {/* O menu mobile continua sendo controlado pelo HeaderNavigation */}
          <HeaderNavigation categorias={categorias} />
        </div>
      </div>
    </header>
  );
}