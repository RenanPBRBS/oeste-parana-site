// ./next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        // Não precisa de port e pathname se não especificado
      },
      // ADICIONAMOS ESTE NOVO BLOCO
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**', // Imagens do Strapi ficam nesta pasta
      },
    ],
  },
};

module.exports = nextConfig;