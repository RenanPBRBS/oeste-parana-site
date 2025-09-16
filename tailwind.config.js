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
        // 'sans' será a fonte para títulos e UI (Inter)
        sans: ['var(--font-inter)', ...fontFamily.sans],
        // 'serif' será a fonte para o corpo do texto (Lora)
        serif: ['var(--font-lora)', ...fontFamily.serif],
      },
      colors: {
        'brand': {
          'blue': '#0d2544', // Nosso azul sóbrio e profundo
          'blue-light': '#1a4a8a',
        },
        'neutral': {
          '50': '#f8f9fa',  // Fundo principal (Off-white)
          '100': '#e9ecef', // Bordas e divisórias
          '400': '#adb5bd', // Texto de apoio
          '800': '#343a40', // Texto principal (Quase-preto)
          '900': '#212529', // Títulos
        },
      },
      // Vamos customizar a aparência dos artigos (plugin de tipografia)
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.neutral[800]'),
            '--tw-prose-headings': theme('colors.neutral[900]'),
            '--tw-prose-lead': theme('colors.neutral[700]'),
            '--tw-prose-links': theme('colors.brand.blue'),
            '--tw-prose-bold': theme('colors.neutral[900]'),
            '--tw-prose-counters': theme('colors.neutral[600]'),
            '--tw-prose-bullets': theme('colors.neutral[400]'),
            '--tw-prose-hr': theme('colors.neutral[300]'),
            '--tw-prose-quotes': theme('colors.neutral[900]'),
            '--tw-prose-quote-borders': theme('colors.neutral[300]'),
            '--tw-prose-captions': theme('colors.neutral[700]'),
            '--tw-prose-code': theme('colors.neutral[900]'),
            '--tw-prose-pre-code': theme('colors.neutral[100]'),
            '--tw-prose-pre-bg': theme('colors.neutral[900]'),
            '--tw-prose-th-borders': theme('colors.neutral[300]'),
            '--tw-prose-td-borders': theme('colors.neutral[200]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}