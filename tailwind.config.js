/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-purple': '#6316DB',
        'main-purple-shade': '#915BE5',
        'main-pink': 'rgb(251, 37, 118 )',
      },
    },
  },
  plugins: [],
};
