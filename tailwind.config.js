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
        'brand': {
          'amber': '#f59e0b', // Nosso "sol" - a cor de destaque principal
          'amber-dark': '#d97706',
        },
        'dark': {
          'bg': '#0d1117',      // O fundo principal, um azul-chumbo profundo
          'surface': '#161b22', // O fundo dos cards, um pouco mais claro
          'border': '#30363d', // Bordas sutis
          'text-title': '#f0f6fc',   // Texto dos títulos (branco suave)
          'text-body': '#c9d1d9',    // Texto principal (cinza claro)
          'text-muted': '#8b949e',   // Texto de apoio (cinza mais escuro)
        },
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