/** @type {import('tailwindcss').Config} */
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  darkMode: 'class',
  theme: {
    fontFamily: {},
    extend: {
      fontFamily: {
        sans: ['Zen Kurenaido', 'sans-serif'],
        logo: ['Oooh Baby', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        solid: ['Zen Maru Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['ph', 'fa6-brands']),
    }),
  ],
};
