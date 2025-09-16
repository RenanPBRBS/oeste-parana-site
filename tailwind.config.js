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
      fontFamily: {
        heading: ['var(--font-montserrat)', ...fontFamily.sans],
        body: ['var(--font-open-sans)', ...fontFamily.sans],
      },
      colors: {
        // Paleta de cores principal e consistente
        'primary': {
          DEFAULT: '#2563eb', // Azul para destaques e links
          'dark': '#1d4ed8',
        },
        'neutral': {
          '50': '#f9fafb',   // Fundo principal (cinza muito claro)
          '100': '#f3f4f6',  // Fundo de cards de sidebar
          '200': '#e5e7eb',  // Bordas
          '500': '#6b7280',  // Texto secundário
          '700': '#374151',  // Texto principal
          '900': '#111827',  // Títulos
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}