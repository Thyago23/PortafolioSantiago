/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blueblood': '#005187',      // Color principal
        'blue-vault': '#4d82bc',     // Secundario
        'fly-away': '#84b6f4',       // Acento
        'fly-kite': '#c4dafa',       // Fondos suaves
        'polar-blizzard': '#fcffff', // Fondo principal
      },
    },
  },
  plugins: [],
}