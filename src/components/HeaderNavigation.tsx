// ./components/HeaderNavigation.tsx
'use client'; // Define este como um Componente de Cliente para podermos usar estado e interatividade

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

// Recebemos a lista de categorias como uma propriedade (prop)
type Categoria = {
  id: number;
  nome: string;
  slug: string;
}

type HeaderNavigationProps = {
  categorias: Categoria[];
}

export default function HeaderNavigation({ categorias }: HeaderNavigationProps) {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* NAVEGAÇÃO PARA DESKTOP */}
      <nav className="hidden md:flex space-x-6 items-center">
        <ul className="flex space-x-6">
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <Link href={`/categoria/${categoria.slug}`} className="text-gray-700 hover:text-blue-800 transition-colors pb-1 border-b-2 border-transparent hover:border-blue-700">
                {categoria.nome}
              </Link>
            </li>
          ))}
        </ul>
        <SearchBar />
      </nav>

      {/* BOTÃO HAMBÚRGUER PARA MOBILE */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* MENU MOBILE (SLIDE-OUT) */}
      <div className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Fechar menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            <SearchBar />
            <ul className="flex flex-col space-y-4">
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <Link href={`/categoria/${categoria.slug}`} onClick={() => setIsMenuOpen(false)} className="text-lg text-gray-700 hover:text-blue-800">
                    {categoria.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Overlay escuro quando o menu está aberto */}
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 md:hidden"></div>
      )}
    </>
  );
}