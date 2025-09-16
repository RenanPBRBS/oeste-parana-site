// ./components/HeaderNavigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

type Categoria = {
  id: number;
  nome: string;
  slug: string;
}

type HeaderNavigationProps = {
  categorias: Categoria[];
}

export default function HeaderNavigation({ categorias }: HeaderNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="hidden md:flex space-x-6 items-center font-sans">
        <ul className="flex space-x-6">
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <Link href={`/categoria/${categoria.slug}`} className="text-neutral-800 hover:text-brand-blue transition-colors text-sm font-medium">
                {categoria.nome}
              </Link>
            </li>
          ))}
        </ul>
        <SearchBar />
      </nav>

      {/* BOTÃO HAMBÚRGUER PARA MOBILE */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menu" className="text-text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* MENU MOBILE (SLIDE-OUT) */}
      <div className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-surface shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 font-sans">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-text-primary">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Fechar menu" className="text-text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <SearchBar />
            <ul className="flex flex-col space-y-4">
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <Link href={`/categoria/${categoria.slug}`} onClick={() => setIsMenuOpen(false)} className="text-lg text-text-secondary hover:text-primary">
                    {categoria.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 md:hidden"></div>
      )}
    </>
  );
}