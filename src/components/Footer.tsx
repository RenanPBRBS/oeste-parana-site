// ./components/Footer.tsx
export default function Footer() {
    return (
      // A tag <footer> é para rodapés
      // bg-gray-800 define um fundo cinza escuro e text-white define o texto como branco
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Oeste Paraná Notícias. Todos os direitos reservados.</p>
          <p className="mt-2">Palotina - Paraná</p>
        </div>
      </footer>
    );
  }