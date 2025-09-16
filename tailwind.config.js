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
        // 'Heading' para todos os títulos e elementos de UI
        heading: ['var(--font-montserrat)', ...fontFamily.sans],
        // 'Body' para o corpo do texto e parágrafos
        body: ['var(--font-open-sans)', ...fontFamily.sans],
      },
      colors: {
        // Paleta de cores principal
        'primary': {
          DEFAULT: '#0047AB', // Um azul profundo e confiável
          'dark': '#003380',
          'light': '#3366CC',
          'extra-light': '#E6F0FF', // Para fundos suaves
        },
        'accent': {
          DEFAULT: '#FF6F61', // Um toque de cor, se necessário para destaques
        },
        'neutral': {
          '50': '#f8f9fa', // Off-white para o fundo principal
          '100': '#e9ecef', // Para bordas e divisórias suaves
          '200': '#dee2e6', // Bordas mais visíveis
          '300': '#ced4da',
          '400': '#adb5bd', // Texto secundário, ícones
          '500': '#6c757d', // Texto de apoio
          '700': '#495057', // Texto principal mais escuro
          '800': '#343a40', // Títulos, texto forte
          '900': '#212529', // Preto quase absoluto para o máximo contraste
        },
      },
      // Configurações do plugin de tipografia para o conteúdo dos artigos
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.neutral.700'),
            '--tw-prose-headings': theme('colors.neutral.900'),
            '--tw-prose-lead': theme('colors.neutral.500'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.neutral.900'),
            '--tw-prose-counters': theme('colors.neutral.600'),
            '--tw-prose-bullets': theme('colors.neutral.400'),
            '--tw-prose-hr': theme('colors.neutral.200'),
            '--tw-prose-quotes': theme('colors.neutral.900'),
            '--tw-prose-quote-borders': theme('colors.primary.light'),
            '--tw-prose-captions': theme('colors.neutral.500'),
            '--tw-prose-code': theme('colors.neutral.900'),
            '--tw-prose-pre-code': theme('colors.neutral.100'),
            '--tw-prose-pre-bg': theme('colors.neutral.800'),
            '--tw-prose-th-borders': theme('colors.neutral.200'),
            '--tw-prose-td-borders': theme('colors.neutral.100'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}