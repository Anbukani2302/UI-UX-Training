/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        venum: {
          primary: '#2c3e50',
          secondary: '#34495e',
          accent: '#3498db',
          light: '#ecf0f1',
        }
      },
    },
  },
  plugins: [],
}