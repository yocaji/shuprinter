/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Zen Kurenaido', 'sans-serif'],
      },
    },
  },
  plugins: [require('preline/plugin')],
};
