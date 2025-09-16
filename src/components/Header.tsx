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
  } catch (error) { console.error("Erro ao buscar categorias:", error); return []; }
}

export default async function Header() {
  const categorias = await fetchCategorias();
  return (
    <header className="bg-dark-bg/80 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-dark-border font-heading">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-3xl font-extrabold text-dark-text-title hover:text-brand-amber transition-colors">
            Oeste Paraná
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <nav>
              <ul className="flex items-center gap-6">
                {categorias.map((categoria) => (
                  <li key={categoria.id}>
                    <Link href={`/categoria/${categoria.slug}`} className="text-dark-text-body font-semibold transition-colors hover:text-brand-amber pb-1">
                      {categoria.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <SearchBar />
          </div>
          <HeaderNavigation categorias={categorias} />
        </div>
      </div>
    </header>
  );
}