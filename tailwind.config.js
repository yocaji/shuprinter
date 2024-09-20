/** @type {import('tailwindcss').Config} */
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Zen Kurenaido', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    iconsPlugin({
      collections: getIconCollections(['ph']),
    }),
  ],
};
