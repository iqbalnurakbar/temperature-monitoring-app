/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        dashboardpc: '10rem auto 20rem',
        dashboardtablet: '5rem 50% auto',
        dashboardmobile: '1fr',
      },
      colors: {
        glass: 'rgba(255, 255, 255, 0.54)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
