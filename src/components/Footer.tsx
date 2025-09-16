// ./components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-10 mt-12 font-body">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-neutral-700 pb-8 mb-8">
          {/* Seção 1: Logo e Descrição */}
          <div>
            <Link href="/" className="text-3xl font-heading font-extrabold text-white hover:text-primary transition-colors">
              Oeste Paraná
            </Link>
            <p className="text-sm mt-4 leading-relaxed">
              As últimas notícias e acontecimentos do Oeste do Paraná. Cobertura completa sobre agronegócio, política, esportes e cidades.
            </p>
          </div>

          {/* Seção 2: Links Rápidos */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li> {/* Criar página "Sobre" futuramente */}
              <li><Link href="/contato" className="hover:text-primary transition-colors">Contato</Link></li> {/* Criar página "Contato" futuramente */}
              <li><Link href="/politica-de-privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link></li> {/* Criar página "Política" futuramente */}
            </ul>
          </div>

          {/* Seção 3: Redes Sociais ou Informações de Contato */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">Conecte-se</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="text-center text-sm text-neutral-400">
          © {currentYear} Oeste Paraná Notícias. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}