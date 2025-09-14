// ./components/Header.tsx
import Link from 'next/link';
import HeaderNavigation from './HeaderNavigation'; // Importamos nosso novo componente

type Categoria = {
  id: number;
  nome: string;
  slug: string;
}

// A função de busca continua a mesma
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

// O Header busca os dados e passa para o componente de navegação
export default async function Header() {
  const categorias = await fetchCategorias();

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-800 hover:opacity-80 transition-opacity">
          Oeste Paraná
        </Link>
        
        {/* Passamos as categorias como prop para o componente cliente */}
        <HeaderNavigation categorias={categorias} />
      </div>
    </header>
  );
}