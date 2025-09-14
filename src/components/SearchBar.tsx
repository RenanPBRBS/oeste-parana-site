// ./components/SearchBar.tsx
'use client'; // MUITO IMPORTANTE: Define este como um Componente de Cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o recarregamento padrão da página
    if (!query.trim()) return; // Não faz a busca se o campo estiver vazio
    
    // Navega para a página de busca com o termo pesquisado como um parâmetro de URL
    router.push(`/busca?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar notícias..."
        className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-700 text-white rounded-r-md hover:bg-blue-800"
      >
        Buscar
      </button>
    </form>
  );
}