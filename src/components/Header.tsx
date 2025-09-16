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
    <header className="bg-neutral-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-neutral-700 font-heading">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-3xl font-extrabold text-neutral-50 hover:text-primary transition-colors">
            Oeste Paraná
          </Link>
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <HeaderNavigation categorias={categorias} />
        </div>
      </div>
      <nav className="hidden md:block bg-primary-dark">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-8">
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <Link href={`/categoria/${categoria.slug}`} className="text-white text-sm font-semibold uppercase py-3 block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {categoria.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}