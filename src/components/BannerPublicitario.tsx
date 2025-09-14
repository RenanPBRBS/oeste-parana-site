// ./components/BannerPublicitario.tsx
import Image from 'next/image';
import Link from 'next/link';

type Anuncio = { link_destino: string; banner: { url: string; alternativeText: string | null; }};

// A função agora aceita um 'local' para buscar o anúncio correto
async function fetchAnuncioAtivo(local: string): Promise<Anuncio | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  // Adicionamos um novo filtro para buscar pelo 'local'
  const endpoint = `${apiUrl}/api/anuncios?filters[ativo][$eq]=true&filters[local][$eq]=${local}&populate=*`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) return null;
    const responseJson = await res.json();
    if (!responseJson.data || responseJson.data.length === 0) return null;
    
    // Podemos adicionar uma lógica para pegar um anúncio aleatório no futuro
    return responseJson.data[0];
  } catch (error) {
    console.error(`Erro ao buscar anúncio para o local "${local}":`, error);
    return null;
  }
}

// O componente agora recebe o 'local' como propriedade
export default async function BannerPublicitario({ local }: { local: string }) {
  const anuncio = await fetchAnuncioAtivo(local);

  if (!anuncio) return null;

  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${anuncio.banner.url}`;

  return (
    <div className="my-8">
      <Link href={anuncio.link_destino} target="_blank" rel="noopener noreferrer sponsored">
        <div className="relative w-full h-24 md:h-32 bg-gray-200 rounded-lg overflow-hidden shadow-md">
          <Image
            src={imageUrl}
            alt={anuncio.banner.alternativeText || 'Anúncio publicitário'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>
    </div>
  );
}