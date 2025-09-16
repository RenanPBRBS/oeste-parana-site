import Link from 'next/link';
import HeaderNavigation from './HeaderNavigation';
import SearchBar from './SearchBar';


type Categoria = {
  id: number;
  nome: string;
  slug: string;
}

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
    <header className="bg-white shadow-md p-4 sticky top-0 z-30 border-b border-neutral-100 font-heading">
      <div className="container mx-auto flex justify-between items-center py-2">
        <Link href="/" className="text-3xl font-extrabold text-neutral-900 hover:text-primary transition-colors">
          Oeste Paraná
        </Link>
        <div className="hidden md:block">
          <SearchBar /> {/* SearchBar aqui no desktop */}
        </div>
        <HeaderNavigation categorias={categorias} />
      </div>
      {/* Barra de categorias abaixo do header principal no desktop */}
      <nav className="hidden md:block bg-primary py-3">
        <div className="container mx-auto flex space-x-6">
          {categorias.map((categoria) => (
            <Link key={categoria.id} href={`/categoria/${categoria.slug}`} className="text-white text-sm font-semibold uppercase hover:text-neutral-200 transition-colors">
              {categoria.nome}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}