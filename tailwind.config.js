/* eslint-disable @typescript-eslint/no-require-imports */
// ./tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [ './src/**/*.{js,ts,jsx,tsx,mdx}' ],
  theme: {
    extend: {
      colors: {
        // COLE SUAS CORES ESCOLHIDAS AQUI
        'primary': '#005f73',      // Cor principal para links, botões e destaques
        'primary-dark': '#003e4d', // Uma variação mais escura para efeitos de hover
        'background': '#f4f4f5',    // Cor de fundo geral do site (use um cinza bem claro ou off-white)
        'surface': '#ffffff',     // Cor de fundo dos cards e elementos "elevados"
        'text-title': '#18181b',  // Cor para títulos (use um cinza bem escuro)
        'text-body': '#52525b',   // Cor para parágrafos e textos comuns
        'border': '#e4e4e7',      // Cor para bordas sutis
      },
      fontFamily: {
        // As fontes serão definidas no próximo arquivo
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.dark.text-body'),
            '--tw-prose-headings': theme('colors.dark.text-title'),
            '--tw-prose-links': theme('colors.brand.amber'),
            '--tw-prose-bold': theme('colors.dark.text-title'),
            '--tw-prose-hr': theme('colors.dark.border'),
            '--tw-prose-quotes': theme('colors.dark.text-title'),
            '--tw-prose-quote-borders': theme('colors.brand.amber'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}