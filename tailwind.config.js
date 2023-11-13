/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: 'rgb(var(--mainColor))',
        secondaryColor: 'rgb(var(--secondaryColor))',
        mainTextColor: 'rgb(var(--mainTextColor))',
        dimColor: 'rgb(var(--dimColor))',
        btnColor: 'rgb(var(--btnColor))'
      }
    },
  },
  plugins: [],  
}

