// ./components/Header.tsx
import Link from 'next/link';
import HeaderNavigation from './HeaderNavigation';

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
    <header className="bg-surface shadow-md p-4 sticky top-0 z-30 border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-sans font-bold text-primary hover:opacity-80 transition-opacity">
          Oeste Paraná
        </Link>
        
        <HeaderNavigation categorias={categorias} />
      </div>
    </header>
  );
}