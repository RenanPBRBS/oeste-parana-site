// ./components/ViewCounter.tsx
'use client';

import { useEffect } from 'react';

// A única função deste componente é fazer uma chamada à API em segundo plano
export default function ViewCounter({ noticiaId }: { noticiaId: number }) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/noticias/${noticiaId}/view`, {
          method: 'PUT',
        });
      } catch (error) {
        console.error("Falha ao registrar visualização:", error);
      }
    };

    incrementView();
  }, [noticiaId]); // O useEffect roda uma vez quando o componente é montado

  // Este componente não renderiza nada na tela
  return null;
}