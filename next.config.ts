// ./next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // Padrão que já tínhamos para o desenvolvimento LOCAL
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // ===== ADICIONE ESTE NOVO BLOCO PARA O SITE NO AR =====
      {
        protocol: 'https',
        hostname: 'oeste-parana-cms.onrender.com', // O endereço do seu Strapi na Render
        port: '', // A porta padrão (443 para https) fica em branco
        pathname: '/uploads/**', // Permite todas as imagens da pasta de uploads
      },
      // =======================================================
    ],
  },
};

module.exports = nextConfig;