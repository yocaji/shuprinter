import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin'), daisyui],
  daisyui: {
    themes: ['bumblebee', 'coffee'],
    darkTheme: 'coffee',
  },
};
