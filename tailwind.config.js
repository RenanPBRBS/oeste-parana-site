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
        // Usaremos Roboto para tudo, variando o peso, como no G1
        sans: ['var(--font-roboto)', ...fontFamily.sans],
      },
      colors: {
        'g1': {
          'red': '#C4170C',   // O vermelho icônico do G1
          'blue': '#00589F',  // Azul para links de texto
          'bar': '#333333',   // Barra superior da Globo.com
        },
        'neutral': {
          '50': '#FFFFFF',   // Branco
          '100': '#F0F0F0',  // Fundo principal (cinza muito claro)
          '200': '#E6E6E6',  // Bordas
          '600': '#666666',  // Texto secundário/de apoio
          '800': '#333333',  // Texto principal
          '900': '#000000',  // Títulos fortes
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.800'),
            a: { color: theme('colors.g1.blue'), '&:hover': { textDecoration: 'underline' } },
            h1: { color: theme('colors.neutral.900') },
            h2: { color: theme('colors.neutral.900') },
            h3: { color: theme('colors.neutral.900') },
            strong: { color: theme('colors.neutral.900') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}