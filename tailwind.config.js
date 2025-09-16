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
      // NOVA PALETA DE CORES PARA O TEMA ESCURO
      colors: {
        'primary': {
          DEFAULT: '#3b82f6', // Um azul mais brilhante para bom contraste
          'dark': '#2563eb',
        },
        'neutral': {
          '50': '#f8fafc',  // Branco para texto de alto contraste
          '100': '#f1f5f9', // Branco para texto principal
          '200': '#e2e8f0', // Texto secundário
          '300': '#cbd5e1', // Bordas sutis
          '700': '#334155', // Fundo de cards e elementos "elevados"
          '800': '#1e293b', // Fundo principal um pouco mais claro
          '900': '#0f172a', // Tom mais escuro (ex: footer)
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Ajusta as cores do conteúdo dos artigos para o tema escuro
            '--tw-prose-body': theme('colors.neutral[200]'),
            '--tw-prose-headings': theme('colors.neutral[50]'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.neutral[100]'),
            '--tw-prose-hr': theme('colors.neutral[700]'),
            '--tw-prose-quotes': theme('colors.neutral[100]'),
            '--tw-prose-quote-borders': theme('colors.primary.DEFAULT'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}