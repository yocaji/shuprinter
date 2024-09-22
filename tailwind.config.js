/** @type {import('tailwindcss').Config} */
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    fontFamily: {},
    extend: {
      fontFamily: {
        sans: ['Zen Kurenaido', 'sans-serif'],
        logo: ['Oooh Baby', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        solid: ['BIZ UDPGothic', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    iconsPlugin({
      collections: getIconCollections(['ph', 'fa6-brands']),
    }),
  ],
};
