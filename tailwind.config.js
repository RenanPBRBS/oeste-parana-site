/* eslint-disable @typescript-eslint/no-require-imports */
// ./tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Adicionamos nossas fontes customizadas aqui
      fontFamily: {
        sans: ['var(--font-lato)', ...fontFamily.sans],
        serif: ['var(--font-merriweather)', ...fontFamily.serif],
      },
      // Adicionamos nossa paleta de cores customizada aqui
      colors: {
        'primary': '#0057b8', // Um azul forte para links e destaques
        'primary-hover': '#00418a',
        'background': '#f8f9fa', // Um branco levemente acinzentado para o fundo
        'surface': '#ffffff', // Branco puro para o fundo dos cards
        'text-primary': '#212529', // Um cinza bem escuro para o texto principal
        'text-secondary': '#495057', // Um cinza mais claro para textos secundários
        'border': '#dee2e6', // Cor para bordas sutis
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}