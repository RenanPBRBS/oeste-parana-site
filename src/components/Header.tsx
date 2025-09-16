// ./components/Header.tsx
import Link from 'next/link';
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
    <header className="bg-white shadow-md sticky top-0 z-30">
      {/* Nível 1: Barra da Globo (simulada) */}
      <div className="bg-g1-bar text-white">
        <div className="container mx-auto px-4 h-8 flex items-center text-sm font-bold">
          GLOBO.COM
        </div>
      </div>

      {/* Nível 2: Barra Principal com Logo e Busca */}
      <div className="border-b border-neutral-200">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <Link href="/" className="text-4xl font-black text-g1-red tracking-tighter hover:opacity-80 transition-opacity">
            Oeste Paraná
          </Link>
          <div className="w-full max-w-sm">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Nível 3: Barra de Categorias */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-6 overflow-x-auto">
            {categorias.map((categoria) => (
              <li key={categoria.id} className="flex-shrink-0">
                <Link href={`/categoria/${categoria.slug}`} className="text-neutral-800 font-bold py-3 block border-b-4 border-transparent hover:border-g1-red transition-colors duration-200">
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