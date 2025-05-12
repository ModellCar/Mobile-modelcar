/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lamboYellow: '#FFD700',
        lamboBlack: '#191919',
        lamboGray: '#232323',
        lamboRed: '#D7263D',
      },
    },
  },
  plugins: [],
} 