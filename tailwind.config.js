/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'dashboardpc': '10rem auto 15rem',
        'dashboardtablet': '10% 50% auto',
        'dashboardmobile': '1fr'

      }
    },
  },
  plugins: [],
}

