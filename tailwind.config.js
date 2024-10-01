/** @type {import('tailwindcss').Config} */
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  darkMode: 'class',
  theme: {
    fontFamily: {},
    extend: {
      fontFamily: {
        sans: ['Zen Maru Gothic', 'sans-serif'],
        hand: ['Klee One', 'Zen Kurenaido', 'sans-serif'],
        logo: ['Oooh Baby', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['ph', 'fa6-brands']),
    }),
  ],
};
